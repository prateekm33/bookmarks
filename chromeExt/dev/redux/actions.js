import { getTitles } from '../helpers/utils'

export const actions = {
  initBookmarks,
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