const initialState = {
  request: false,
  persons: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case 'ADD_PERSON':
      state.persons.push({ id: Date.now(), name: action.name });
      break;
    case 'REQUEST':
      state.request = true;
      break;
    case 'REQUEST_DONE':
      state.request = false;
      break;
  }

  return Object.assign({}, state);
}
