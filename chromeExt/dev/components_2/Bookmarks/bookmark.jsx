import React from 'react'

import { connect } from 'react-redux'
import { actions } from '../../redux/actions'

// Component Dependencies
import RenderHTMLForChildren from './bookmark-children'
import InputCheckbox from './input-checkbox'

class Bookmark extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      className: 'bookmark',
      showChildren: false
    }
  }

  genClassList() {
    if (this.props.bookmark.children) {
      return 'bookmark folder'
    }

    return 'bookmark url'
  }

  showChildren() {
    if (this.props.bookmark.url) {
      return chrome.tabs.create({url: this.props.bookmark.url})
    }

    this.setState({
      showChildren: !this.state.showChildren
    })
  }

  handleParentClicked(clickedState) {
    this.setState({
      clicked: clickedState
    });
  }

  render() {

    return (
      <div className="bookmark-container" ref={containerEl => this.containerEl = containerEl } >
        <InputCheckbox
          bookmark={this.props.bookmark}
          parent={this.props.parent}
          handleParentClicked={this.handleParentClicked.bind(this)} />
        <div className={this.state.className}
             onClick={this.showChildren.bind(this)}>
          {this.props.bookmark.title}
        </div>
        {
          this.state.showChildren ? 
            <RenderHTMLForChildren 
              bookmark={this.props.bookmark} 
              parentClicked={this.state.clicked} 
              parent={this.props.bookmark} /> : null
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    toExport: state.toExport,
    allSelected: state.allSelected
  }
}

export default connect(mapStateToProps)(Bookmark)