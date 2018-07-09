const initialState = {
  data: [],
  hello : 'hello there!',
  pollInterval: 2000
}

const action1 = {
  type: 'add_comment',
  comment: 'any comment here'
}

const action2 = {
  type: 'set_comments',
  data: ['comment 1', 'comment 2']
}

var reducer = function(state, action) {
  if(state === undefined) {
    return initialState;
  }
  var newState = state;
  switch(action.type) {
    case 'add_comment':
      var newComments = state.data.concat([action.comment]);
      newState = Object.assign({}, state, {data: newComments});
      break;
    case 'set_comments':
      newState = Object.assign({}, state, {data: action.data})
      break;
  }
  return newState;
}
