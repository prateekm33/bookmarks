import React from 'react'

import BookmarksFolder from './bookmarks_folder'

export default class BookmarksContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id='bookmarks-view'>
        {
          this.props.rootTitles.map((bookmark,idx) => (
            <BookmarksFolder toExport={this.props.toExport} key={idx} bookmark={bookmark}/>
          ))
        }
      </div>
    )
  }
}