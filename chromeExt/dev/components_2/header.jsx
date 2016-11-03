import React from 'react'

// import { connect } from 'react-redux'
import { actions } from '../redux/actions'

import { createBookmarks } from '../helpers/utils'

import SearchBar from './searchbar'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  exportSelected() {
    // TODO!!
  }

  importSelected(e) {
    e.preventDefault();

    const fileInput = document.getElementById('importFiles')

    const files = fileInput.files

    for (let file in files) {
      let reader = new FileReader()
      reader.onload = () => {
        const importedBookmarks = JSON.parse(reader.result);
        createBookmarks(importedBookmarks);

      }
      reader.readAsText(files[file])
    }
  }

  selectAll(evt) {
    const target = evt.target;
    this.props.dispatch(actions.selectAll(target.checked))
  }

  render() {
    return (
      <nav id='main-nav'>
        <div id='header'>
          <div id='title'>Bookmarks </div>
          <SearchBar />
        </div>
        <div id='file-options'>
          <div id='export-options'>
            <input id='select-all' type='checkbox' 
              onClick={this.selectAll.bind(this)} />
            <label>Select All</label>
            <button onClick={this.exportSelected.bind(this)}> Export Selected</button>
          </div>
          <div id='import-options'>
            <form onSubmit={this.importSelected.bind(this)}>
              <label><b>Import Options: </b></label>
              <input id="importFiles" type="file" accept=".json" />
              <input type='submit' value='Import'/>
            </form>
          </div>
        </div>
      </nav>
    )
  }
}

// function mapStateToProps(state) {
//   return state;
// }

// export default connect(mapStateToProps)(Header);