import React from 'react'

import { connect } from 'react-redux'
import { actions } from '../redux/actions'


import Header from './header'
import BookmarksView from './Bookmarks/bookmarks-view'

class App extends React.Component {
  constructor() {
    super()
  }

  componentWillMount() {
    chrome.bookmarks.getTree(roots => {
      const root = roots[0];
      this.props.dispatch(actions.initBookmarks(root));
    })
  }

  render() {
    return (
      <div id='app'>
        <Header dispatch={this.props.dispatch}/>
        <BookmarksView 
          bookmarks={this.props.rootTitles}
          allSelected={this.props.allSelected} />
      </div>
    )
  }
}


function mapStateToProps(state) {
  return state;
}


export default connect(mapStateToProps)(App);


