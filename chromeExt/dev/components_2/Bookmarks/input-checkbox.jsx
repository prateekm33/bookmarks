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
    clickNodeAndChildren.call(this)
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

function clickNodeAndChildren() {
  let q = [];
  let node = this.props.bookmark;
  q = q.concat(node.children || []);
  const clicked = node.clicked = !node.clicked;


  while (q.length) {
    node = q.shift();
    node.clicked = clicked;
    q = q.concat(node.children || []);
  }

  this.props.forceRender(clicked);
}