import React from 'react'

import Bookmark from './bookmark'

const RenderHTMLForChildren = function({ bookmark, addChildrenToProps, parentClicked, parent }) {
  return <div className="bookmark-children">
          {
            bookmark.children.map((child,idx) => 
              <Bookmark key={idx} bookmark={child} 
                parentClicked={parentClicked} 
                parent={parent} />
            )
          }
          </div>
}


export default RenderHTMLForChildren;