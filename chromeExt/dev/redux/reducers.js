// TODO: Install underscore

export const reducer = function(state, action) {
  switch(action.type) {
    case 'INIT_BOOKMARKS':
      return Object.assign({}, state, {rootTitles: action.rootTitles})
    case 'UPDATE_TO_STORE':
      return updateToExpIgn(state, action)
    case 'SELECT_ALL':
      return selectAll(state, action)
    default:
      return state
  }
}

function selectAll(state, action) {

  console.log(action.clicked, '---CLICKED action')

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

function updateToExpIgn(state, action) {
  switch(action.method) {
    case 'remove':
      return removeFrom(action.store, action.bookmark, state)
    case 'add':
      return addTo(action.store, action.bookmark, state)
    default:
      return state;
  }
}

function removeFrom(objStore, bookmark, state) {
  const obj = {};
  let prop = ''

  if (objStore === 'EXPORT') {
    objStore = state.toExport
    prop = 'toExport'
  } else if (objStore === 'IGNORE') {
    objStore = state.toIgnore
    prop = 'toIgnore'
  }

  for (let key in objStore) {
    if (key !== bookmark.id) {
      obj[key] = objStore[key]
    }
  }
  return Object.assign({}, state, { [prop]: obj })
}

function addTo(objStore, bookmark, state) {
  const obj = {};
  let prop = '';
  if (objStore === 'EXPORT') {
    objStore = state.toExport
    prop = 'toExport'
  } else if (objStore === 'IGNORE') {
    objStore = state.toIgnore
    prop = 'toIgnore'
  }

  for (let key in objStore) {
    obj[key] = objStore[key]
  }

  obj[bookmark.id] = bookmark
  return Object.assign({}, state, { [prop] : obj })
}