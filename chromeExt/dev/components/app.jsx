import React from 'react'
import { getTitles } from '../helpers/utils'

import BookmarksContainer from './bookmarks_container'
import SearchBar from './search_bar'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      rootTitles: [],
      toExport: {}
    }
  }

  componentWillMount() {
    chrome.bookmarks.getTree(roots => {
      const root = roots[0]
      this.setState({ rootTitles : getTitles(root) })
    })
    const app = document.getElementById('app')
    addEventListenersForSelections.call(this, app);
  }

  exportSelected() {
    const data = [];

    for (let id in this.state.toExport) {
      chrome.bookmarks.getSubTree(id, a => {
        data.push(a[0]);

        if (!Object.keys(this.state.toExport).length) {
          this.setState({ toExport: {} });

          var blob = new Blob([JSON.stringify(data)], {type : 'octet/stream'});
          blob = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.setAttribute('href', blob);
          a.setAttribute('download', 'bookmarks.json');
          a.click()
          window.URL.revokeObjectURL(blob)
        }
      })

      delete this.state.toExport[id];
    }

  }


  importSelected(e) {
    e.preventDefault()

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


  render() {
    return (
      <div id='app'>
        <nav id="main-nav">
          <div id='header'>
            <div id='title'>Bookmarks </div>
            <SearchBar />
          </div>
          <div id='file-options'>
            <div id='export-options'>
              <input id='select-all' type='checkbox' />
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
        <BookmarksContainer toExport={this.state.toExport} rootTitles={this.state.rootTitles}/>
      </div>
    )
  }
}

function addEventListenersForSelections(app) {
  app.addEventListener('click', e => {
    // e.preventDefault()
    const target = e.target;
    if (target.tagName === 'INPUT') {
      const id = target.nextElementSibling.dataset.id
      if (!(id in this.state.toExport)) {
        this.state.toExport[id] = id;
      }
    }
  })
}

function createBookmarks(bookmarks, pId = "1") {
    console.log(bookmarks, '!!')
    bookmarks.forEach(bmark => {
      bmark.parentId = pId;
      delete bmark.id;
      delete bmark.dateAdded;
      const children = bmark.children;
      delete bmark.children;
      delete bmark.dateGroupModified;

      chrome.bookmarks.create(bmark, obj => {
        console.log('success creating? ', obj.id);
        if (children) {
          createBookmarks(children, obj.id);
        }
      });
    })
  }