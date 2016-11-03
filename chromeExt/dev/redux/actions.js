import { getTitles } from '../helpers/utils'

export const actions = {
  initBookmarks,
  updateToExpIgn,
  selectAll
}

function selectAll(clicked) {
  return {
    type: 'SELECT_ALL',
    clicked: clicked
  }
}

function initBookmarks(root) {
  const rootTitles = getTitles(root)
  return {
    type: 'INIT_BOOKMARKS',
    rootTitles: rootTitles
  }
}


function updateToExpIgn(objStore, method, bookmark) {
  return {
    type: 'UPDATE_TO_STORE',
    method: method,
    bookmark: bookmark,
    store: objStore
  }
}