let tmpID = 0

/**
 * Appends the second array to the first.
 * 
 * @memberof Utils
 * @template T
 * @param {T[]} arr1
 * @param {T[]} arr2
 */
export function appendArr(arr1, arr2) {
  for (var i = 0; i < arr2.length; i++) {
    arr1.push(arr2[i])
  }
}
/**
 * Clears an array
 * 
 * @memberof Utils
 * @template T
 * @param {T[]} arr
 */
export function clearArr(arr) {
  for (var i = arr.length; i > 0; i--) {
    arr.pop()
  }
}
/**
 * Removes a number of items at the end of an array
 * 
 * @memberof Utils
 * @template T
 * @param {T[]} arr
 * @param {number} number
 */
export function popArr(arr, number) {
  let length = arr.length
  for (var i = length; i > length - number; i--) {
    arr.pop()
  }
}
/**
 * Removes an element by its index from an array
 * 
 * @memberof Utils
 * @template T
 * @param {T[]} arr
 * @param {number} index
 */
export function removeElement(arr, index) {
  if (index == -1) return null
  if (arr.length - 1 == index) return arr.pop()
  const temp2 = arr.pop()
  if(!temp2)return 
  arr[index] = temp2
  return
}
/**
 * Generates a unique id when called
 * 
 * @memberof Utils
 */
export function generateID() {
  return (tmpID += 1)
}

/**
 * @param {any[]} _args
*/
export function noop(..._args){}

/**
 * @readonly
 * @enum {string}
 */
export const Dimension = {
  two: "2d",
  three: "3d",
  both: "both"
}