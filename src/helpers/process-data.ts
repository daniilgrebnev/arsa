export function getAllItems(arrays: any[]) {
  let ar = arrays.length > 0 ? arrays : [[], []]
  return ar?.reduce((result, currentArray) => {
    return result.concat(currentArray)
  })
}

// allItems = getAllItems([finalArr.map(i => i.children)])
// console.info(allItems)
// export default allItems
