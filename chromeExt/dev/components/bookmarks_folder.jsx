import React from 'react'

export default class BookmarksFolder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      children: false,
      showChildren: false
    }
  }

  componentWillMount() {
    this.setState({
      children: this.props.bookmark.children,
      URL: this.props.bookmark.url
    });

  }

  showChildrenClick() {
    console.log('ID: ', this.props.bookmark.id)
    if (this.state.URL) {
      chrome.tabs.create({url: this.state.URL})
    } else {
      this.setState({showChildren : !this.state.showChildren});
    }
  }

  render() {
    return (
      <div className="bookmark-container">
        <input type='checkbox' defaultChecked={!!(this.props.bookmark.id in this.props.toExport)} />
        <div onClick={this.showChildrenClick.bind(this)} className="bookmark" data-id={this.props.bookmark.id}>{this.props.bookmark.title}</div>
        <div className="bookmark-children">
          {
            !!this.state.showChildren ? 
              this.state.children.map((child, idx) => (
                <BookmarksFolder toExport={this.props.toExport} key={idx} bookmark={child} />
              ))
              : null
          }
        </div>
      </div>
    )
  }
}