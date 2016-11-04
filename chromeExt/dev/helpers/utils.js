export const getTitles = function(node) {
  const arr = [];
  
  const children = node.children;

  children && children.forEach(child => {
    arr.push(child)
  })

  return arr;
}

export const createBookmarks = function(bookmarks, title,  pId = "1") {
  bookmarks.forEach(bmark => {
    bmark.parentId = pId;
    delete bmark.id;
    delete bmark.dateAdded;
    const children = bmark.children;
    delete bmark.children;
    delete bmark.dateGroupModified;

    if (title) {
      bmark.title = title;
    }

    chrome.bookmarks.create(bmark, obj => {
      if (children) {
        createBookmarks(children, null, obj.id);
      }
    });
  })
}

export class BookmarkTree {
  constructor(title, parentId, children, url) {
    this.title = title;
    this.parentId = String(parentId);
    if (children) {
      this.children = children;
    }

    if (url) {
      this.url = url;
    }
  }

  addChild(node) {
    if (!node) { return null; }
    this.children = this.children || [];
    this.children.push(node)
  }
}