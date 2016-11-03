export const getTitles = function(node) {
  const arr = [];
  
  const children = node.children;

  children && children.forEach(child => {
    arr.push(child)
  })

  return arr;
}

export const createBookmarks = function(bookmarks, pId = "1") {
  bookmarks.forEach(bmark => {
    bmark.parentId = pId;
    delete bmark.id;
    delete bmark.dateAdded;
    const children = bmark.children;
    delete bmark.children;
    delete bmark.dateGroupModified;

    chrome.bookmarks.create(bmark, obj => {
      console.log('success creating? ', obj.id);
      if (children) {
        createBookmarks(children, obj.id);
      }
    });
  })
}