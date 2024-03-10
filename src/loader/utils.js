/**
 * @param {string} url
 */
export function getURLName(url){
  const prelude = url.split("/").pop()
  if(!prelude)return ""
  return prelude.split(".")[0]
}
/**
 * @param {string} url
 */
export function getURLExtension(url){
  const prelude = url.split(".").pop()
  if(!prelude)return ""
  return prelude
}