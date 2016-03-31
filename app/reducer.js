const initialState = {
  persons: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case 'ADD_PERSON':
      state.persons.push({ id: Date.now(), name: action.name });
      break;
  }

  return Object.assign({}, state);
}
