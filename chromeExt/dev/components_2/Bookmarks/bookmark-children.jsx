import React from 'react'

import Bookmark from './bookmark'

const RenderHTMLForChildren = function({ bookmark, addChildrenToProps, parentClicked, parent, parentComp, forceRenderParent }) {
  return <div className="bookmark-children">
          {
            bookmark.children.map((child,idx) => 
              <Bookmark key={idx} bookmark={child} 
                parentClicked={parentClicked} 
                parent={parent}
                parentComp={parentComp}
                forceRenderParent={forceRenderParent} />
            )
          }
          </div>
}


export default RenderHTMLForChildren;