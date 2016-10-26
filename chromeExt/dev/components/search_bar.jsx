import React from 'react'

export default class SearchBar extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id='search-bar-container'>
        <input id='bookmark-search' placeholder="SEARCH"/>
      </div>
    )
  }
}