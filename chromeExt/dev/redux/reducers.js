// TODO: Install underscore

export const reducer = function(state, action) {
  switch(action.type) {
    case 'INIT_BOOKMARKS':
      return Object.assign({}, state, {rootTitles: action.rootTitles})
    case 'SELECT_ALL':
      return selectAll(state, action)
    default:
      return state
  }
}

function selectAll(state, action) {

  const rootTitles = state.rootTitles.map(i => {
    let q = [i];
    while (q.length) {
      let node = q.shift();
      node.clicked = action.clicked;
      q = q.concat(node.children || [])
    }

    return i;
  });

  return Object.assign({}, state,
    {
      rootTitles: rootTitles,
      allSelected: action.clicked
    }
  )
}