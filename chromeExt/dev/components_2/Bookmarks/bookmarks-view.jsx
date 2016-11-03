import React from 'react'

import Bookmark from './bookmark'

export default class BookmarksView extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id='bookmarks-view'>
        {
          this.props.bookmarks.map((bmark,idx) =>
            <Bookmark key={idx} bookmark={bmark} 
              parentClicked={this.props.allSelected}
              parent={ {} } />
          )
        }
      </div>
    )
  }
}