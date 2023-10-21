function swap(items, leftIndex, rightIndex) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}
function partition(items, left, right,func) {
  var pivot = items[Math.floor((right + left) / 2)],
    i = left,
    j = right;
  while (i <= j) {
    while (func(items[i],pivot)) {
      i++;
    }
    while (!func(items[j],pivot)) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j);
      i++;
      j--;
    }
  }
  return i;
}

function quickSortRecursive(items,func, left, right) {
  let index;
  if (items.length > 1) {
    index = partition(items, left, right,func);
    if (left <= index) {
      quickSort(items,func, left, index - 1);
    }
    if (index < right) {
      quickSort(items,func, index, right);
    }
  }
  return items;
}

function quickSortIterative(arr,func) {
  stack = [];

  stack.push(0);
  stack.push(arr.length - 1);

  while (stack[stack.length - 1] >= 0) {

    end = stack.pop();
    start = stack.pop();

    pivotIndex = partition(arr, start, end,func);
    
    if (pivotIndex - 1 > start) {
      stack.push(start);
      stack.push(pivotIndex - 1);
    }
    
    if (pivotIndex + 1 < end) {
      stack.push(pivotIndex + 1);
      stack.push(end);
    }
  }
}
export {
  quickSortRecursive,
  quickSortIterative
}