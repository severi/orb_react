import { ADD_PERSON } from '../actions'

const initialState = [
    {
      id: "test1",
      name: "Petri"
    },
    {
      id: "test2",
      name: "Taija"
    }
  ]


const personsNearby = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PERSON:
      return [
        ...state,
        {
          id: action.id,
          name: action.name
        }
      ]
    default:
      return state
  }
}

export default personsNearby
