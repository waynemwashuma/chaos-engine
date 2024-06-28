/**
 * @template T
 */
class Node {
  /**
   * @type { Node<T>[] } 
   */
  paths = []
  /**
   * @type { T } 
   */
  value = null
  /**
   * @param {T} obj
   */
  constructor(obj) {
    this.value = obj
  }
}
/**
 * 
 * @template T
 */
export class Graph {
  /**
   * @private
   * @type { Node<T>[] } 
   */
  nodes = []
  /**
   * @param { T } obj
   * @returns {number} The index of the node.
   */
  add(obj) {
    return this.nodes.push(new Node(obj)) - 1
  }
  /**
   * @param {number} index
   * @returns {T}
   */
  get(index) {
    return this.nodes[index].value
  }
  getNode(index) {
    return this.nodes[index]
  }
  /**
   * @param { number } index The index of the node to remove.
   */
  remove(index) {
    const temp = this.nodes.pop()
    const node = this.nodes[index]

    for (let i = 0; i < node.paths.length; i++) {
      node.removePathTo(node.paths[i])
    }

    if (index !== this.nodes.length)
      this.nodes[index] = temp
  }
  size() {
    return this.nodes.length
  }
  existsNode(node1, node2) {
    for (let i = 0; i < node1.paths.length; i++)
      if (node1.paths[i] === node2)
        return true
    return false
  }
  exists(start, end) {
    const node1 = this.nodes[start]
    const node2 = this.nodes[end]

    this.existsNode(node1, node2)
  }
  /**
   * @param {number} node
   * @param {number} node
   */
  connect(start, end) {
    const node1 = this.nodes[start]
    const node2 = this.nodes[end]

    if (this.existsNode(node1, node2) || start == end) return
    node1.paths.push(node2)
  }
  /**
   * @param { number } start index of the first node
   * @param { number } start index of the second node
   */
  biconnect(start, end) {
    this.connect(start, end)
    this.connect(end, start)
  }
  /**
   * @param {Node<T>} node
   * @param {boolean} removed
   */
  disconnect(start, end) {
    const node1 = this.nodes[start]
    const node2 = this.nodes[end]

    if (!this.existsNode(node1, node2)) return
    Utils.removeElement(node1.paths, node1.paths.indexOf(node2))
  }
  /**
   * @param { number } start index of the first node
   * @param { number } start index of the second node
   */
  bidisconnect(start, end) {
    this.disconnect(start, end)
    this.disconnect(end, start)
  }
}