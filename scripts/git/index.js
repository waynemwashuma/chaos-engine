import { exec } from "child_process";
import { writeFileSync } from "fs"
import { join } from "path";
/**
* @typedef Commit
* @property {string} hash
* @property {{name:string,email:string}} author
* @property {string} date
* @property {CommitMessage} message
*/
/**
 * @typedef CommitMessage
 * @property {string} scope
 * @property {string} message
 * @property {string[]} tags
 * 
 */
/**
 * @param {string} string 
 */
function findScope(string) {
    const i1 = string.search('\\[')
    const i2 = string.search("\\]")

    const scope = string.substring(i1 + 1, i2)
    return scope.trim().toLowerCase()
}
/**
 * @param {string} string 
 */
function findMessage(string) {
    const a = string.substring(string.search("\\]")).split(' ')
    const c = []
    for (let i = a.length - 1; i > 0; i--) {
        const b = a[i]
        if (b.includes("#")) continue
        c.unshift(b)
    }
    return c.join(" ").trim()
}
/**
 * @param {string} string 
 */
function findTags(string) {
    const a = string.split(' ')
    const c = []
    a.splice(0, 1)
    for (let i = a.length - 1; i > 0; i--) {
        const b = a[i];

        if (!b.includes("#")) continue
        c.push(b)
    }
    return c
}
/**
 * @param {string} commitMessage
 */
function parseCommitMessage(commitMessage) {
    const commit = commitMessage.trim()
    const scope = findScope(commit)
    const value = findMessage(commit)
    const tags = findTags(commit)

    return {
        scope,
        value,
        tags
    }
}
/**
 * @param {string[]} authorstring 
 */
function parseAuthor(authorstring) {
    for (let i = 0; i < authorstring.length; i++) {
        const element = authorstring[i];
        if(element.includes('Author')){
            const parts = element.split(" ")
            return {
                name: parts[1],
                email: parts[2]
            }
        } 
    }
}
/**
 * @param {string} raw 
 */
function parseDate(raw) {
    for (let i = 0; i < raw.length; i++) {
        const element = raw[i];
        if(element.includes('Date'))
            return element.split(' ').splice(1).join(' ').trim()
    }
}
/**
 * @param {string[]} raw 
 */
function parseMessage(raw) {
    let message = ''
    for (let i = 0; i < raw.length; i++) {
        const element = raw[i];
        if(
            element === "" ||
            element.includes('Date') ||
            element.includes('Author') ||
            element.includes("Merge")
        )continue
        message = message.concat(element.trim()).replace('\n', ' ')
    }
    return message
}
/**
 * @param {string} commit 
 * @returns {Commit}
 */
function parseCommit(commit) {
    const parts = commit.split('\n').filter(v => {
        if (v !== "") return v
    })
    if (parts.length < 4) return null
    const message = parseMessage(parts)
    return {
        hash: parts[0].trim(),
        author: parseAuthor(parts),
        date: parseDate(parts),
        message: parseCommitMessage(message)
    }
}
/**
 * @param {string} log
 * @returns {Commit[]}
 */
function parseGitLog(log) {
    const raw = log
        .split("commit")
        .filter((v) => v !== "")
    const processed = raw
        .map(v => parseCommit(v))
        .filter(v => v != void 0)
    return processed
}
/**
 * @param {Commit[]} log 
 * @returns {string}
 */
function getchangelog(log) {
    let changelog = ''
    for (let i = 0; i < log.length; i++) {
        const commit = log[i];
        const scope = commit.message.scope
        const tags = commit.message.tags
        if (
            scope === '' ||
            scope === 'documentation' ||
            scope === 'demos' ||
            tags.includes("#ignore") ||
            tags.includes("#internal") ||
            tags.includes("#refactor")
        ) continue
        if (scope === "build")
            changelog = changelog.concat("\n ## " + commit.message.value + "\n\n")
        else
            changelog = changelog.concat(" - " + commit.message.value + "\n")
    }
    return changelog
}

export function generateChangeLog() {
    exec("git log", (err, sdout, sderr) => {
        if (err) console.error(err)
        const log = parseGitLog(sdout)
        const changelog = getchangelog(log)
    
        writeFileSync(join(process.cwd(), '/changelog.md'), changelog)
    })
}
