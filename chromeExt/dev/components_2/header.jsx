import React from 'react'

// Redux Imports
import { actions } from '../redux/actions'

// Utilities
import { createBookmarks, BookmarkTree } from '../helpers/utils'

// Component Dependencies
import SearchBar from './searchbar'
import UIMessageDisplay from './ui_message_display'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.closeDialogBox_Bound = closeDialogBox.bind(this);
    this.state = {
      message: '',
      messageType: ''
    }
  }

  resetState() {
    this.setState({
      message: '',
      messageType: ''    
    })
  }

  componentDidMount() {
    document.removeEventListener('click', this.closeDialogBox_Bound)
    document.addEventListener('click', this.closeDialogBox_Bound);

    this.importAsInputEl.onkeydown = evt => {
      if (evt.keyCode === 27) {
        evt.preventDefault()
        this.dialogEl.open = false;
      }
    }
  }

  exportSelected() {
    // TODO: Error handling....and UI
    const newTree = generateExportTree.call(this);
    downloadExportFile.call(this, newTree)
  }

  importSelected(evt) {
    evt.preventDefault();

    const fileInput = document.getElementById('importFiles')
    const files = fileInput.files

    if (!files.length) { 
      this.setState(
        { 
          message: 'import error! check to see if you have selected a file.',
          messageType: 'ERROR'
        },
        () => {
        setTimeout(this.resetState.bind(this), 5000)
      })
      return;
    }

    const importFolderName = this.importBookmarksAs();

    for (let file in files) {
      let reader = new FileReader()
      reader.onload = () => {
        const importedBookmarks = JSON.parse(reader.result);
        createBookmarks(importedBookmarks, importFolderName);

      }
      if (typeof files[file] !== 'object') { continue; }
      reader.readAsText(files[file])
    }

    this.setState({ message: 'IMPORT FINISHED!', messageType: 'SUCCESS'}, () => {
      setTimeout(this.resetState.bind(this), 5000)
    })

    this.dialogEl.open = false;

  }

  open_closeDialog(evt) {
    evt && evt.preventDefault();
    this.dialogEl.open = !this.dialogEl.open;
    this.importAsInputEl.focus();
  }

  importBookmarksAs() {
    const el = this.importAsInputEl;
    const folderName = el.value;
    el.value = '';
    this.open_closeDialog();
    return folderName;
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
          <UIMessageDisplay message={this.state.message} messageType={this.state.messageType} />
        </div>
        <div id='file-options'>
          <div id='export-options'>
            <input id='select-all' type='checkbox' 
              onClick={this.selectAll.bind(this)} />
            <label>Select All</label>
            <button onClick={this.exportSelected.bind(this)}> Export Selected</button>
          </div>
          <div id='import-options'>
            <form onSubmit={this.open_closeDialog.bind(this)}>
              <label><b>Import Options: </b></label>
              <input id="importFiles" type="file" accept=".json" />
              <input type='submit' value='Import'/>
            </form>
          </div>
          <dialog id='importAs' ref={el => this.dialogEl = el}>
            <div><b>Name these bookmarks</b></div>
            <br />
            <form onSubmit={this.importSelected.bind(this)}>
              <input 
                type='text' 
                id='importAs' 
                placeholder='Import as...' 
                ref={ el => this.importAsInputEl = el }/>
              <input type='submit' value='Save'/>
            </form>
          </dialog>
        </div>
      </nav>
    )
  }
}

function closeDialogBox() {
  this.dialogEl.open = false;
}


function generateExportTree() {
  const roots = this.props.rootTitles;

  const root = roots[0];
  root.children = [...root.children, roots[1]];
  // const newTree = new BookmarkTree(root.title, 0, [...root.children, roots[1]], null)


  // const newTree = new BookmarkTree('', 0, null, null);
  function helper(node) {
    if (node.clicked) {
      let nodeChildren = null;
      if (node.children) {
        nodeChildren = 
          node.children.map(child => helper(child))
                       .filter(child => child)
      }

      let newNode = new BookmarkTree(node.title, node.parentId, nodeChildren, node.url)
      return newNode;
    }

    return null;
  }

  return helper(root);

  // roots.forEach(root => { newTree.addChild(helper(root)) })

  // return newTree;
}


function downloadExportFile(bookmarkTree) {
  bookmarkTree = [bookmarkTree]
  var blob = new Blob([JSON.stringify(bookmarkTree)], {type : 'octet/stream'});
  blob = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', blob);
  a.setAttribute('download', 'bookmarks.json');
  a.click()
  window.URL.revokeObjectURL(blob)
}