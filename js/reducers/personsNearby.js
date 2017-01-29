/* @flow */
type State = [{
  id: number,
  name: string
}]


import { ADD_PERSON } from '../actions'



const initialState = [
    {
      id: -1,
      name: "Petri"
    },
    {
      id: -2,
      name: "Taija"
    }
  ]


const personsNearby = (state: State = initialState, action: Object) => {
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
