export const getTitles = function(node) {
  const arr = [];
  
  const children = node.children;

  children && children.forEach(child => {
    arr.push(child)
  })

  return arr;
}