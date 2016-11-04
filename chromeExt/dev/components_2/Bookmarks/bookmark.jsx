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

  forceRenderParent(clickedState) {
    this.props.bookmark.clicked = clickedState;

    const children = this.props.bookmark.children;
    if (children && children.filter(i => i.clicked).length) {
      this.props.bookmark.clicked = true;
    }

    if (!this.props.parentComp) {
      return this.forceUpdate();
    }

    this.props.forceRenderParent(clickedState);
  }

  render() {
    return (
      <div className="bookmark-container" ref={containerEl => this.containerEl = containerEl } >
        <InputCheckbox
          bookmark={this.props.bookmark}
          forceRender={this.forceRenderParent.bind(this)}
          parent={this.props.parent} />
        <div className={this.state.className}
             onClick={this.showChildren.bind(this)}>
          {this.props.bookmark.title}
        </div>
        {
          this.state.showChildren ? 
            <RenderHTMLForChildren 
              bookmark={this.props.bookmark} 
              parentClicked={this.props.bookmark.clicked}
              parentComp={this}
              forceRenderParent={this.forceRenderParent.bind(this)}
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