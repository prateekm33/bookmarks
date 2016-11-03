import React from 'react'

import { connect } from 'react-redux'
import { actions } from '../../redux/actions'

import RenderHTMLForChildren from './bookmark-children'

class Bookmark extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      className: 'bookmark',
      showChildren: false,
      clicked: props.parentClicked
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

  handleCheckBoxClick(evt) {
    // Data handling
    let q = [];
    let node = this.props.bookmark;
    q = q.concat(node.children || []);
    const clicked = node.clicked = !node.clicked
    while (q.length) {
      node = q.shift();
      node.clicked = clicked;
      q = q.concat(node.children || []);
    }

    const parent = this.props.parent;
    // (2) parent clicked
    if (parent && parent.clicked) {
      // add/remove bookmark to/from parent `ignore` prop
      parent.ignore = parent.ignore || {}
      if (parent.ignore[this.props.bookmark.id]) {
        delete parent.ignore[this.props.bookmark.id];
      } else {
        parent.ignore[this.props.bookmark.id] = this.props.bookmark;
      }
    }

    // View Handling
      // iterate over visible children and turn on/off checkbox (children should match itself)
      const children = Array.prototype.slice.call(
                        this.containerEl.querySelectorAll('.bookmark-children .bookmark-container .bookmark-checkbox'))
      children.forEach(input => { input.checked = this.props.bookmark.clicked })
  }
  

  render() {

    return (
      <div className="bookmark-container" ref={containerEl => this.containerEl = containerEl } >
        <input id={`checkbox-${this.props.bookmark.id}`}
               className='bookmark-checkbox' 
               type='checkbox'
               onClick={this.handleCheckBoxClick.bind(this)}
               defaultChecked={this.props.bookmark.clicked} />
        <div className={this.state.className}
             onClick={this.showChildren.bind(this)}>
          {this.props.bookmark.title}
        </div>
        {
          this.state.showChildren ? 
            <RenderHTMLForChildren 
              bookmark={this.props.bookmark} 
              parentClicked={this.props.bookmark.clicked} 
              parent={this.props.bookmark} /> : null
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    toExport: state.toExport,
    toIgnore: state.toIgnore,
    allSelected: state.allSelected
  }
}

export default connect(mapStateToProps)(Bookmark)