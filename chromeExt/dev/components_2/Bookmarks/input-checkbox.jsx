import React from 'react'

export default class InputCheckbox extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.input.checked = this.props.bookmark.clicked
  }

  componentWillUpdate() {
    this.input.checked = this.props.bookmark.clicked
  }

  handleClick(evt) {
    // Data handling
    let q = [];
    let node = this.props.bookmark;
    q = q.concat(node.children || []);
    const clicked = node.clicked = !node.clicked;

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
  }

  render() {

    return (
      <input id={`checkbox-${this.props.bookmark.id}`}
               ref={el => this.input = el }
               className='bookmark-checkbox' 
               type='checkbox'
               onClick={this.handleClick.bind(this)}
               defaultValue={this.props.bookmark.clicked} />
    )
  }
}

