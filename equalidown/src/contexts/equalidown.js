import { createContext, useReducer } from "react";

export const equalidownContext = createContext();

const initialState = {
  targetNumber: 901,
  equationState: [],
};

const reducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "NUMPAD_BUTTON_CLICK":
      switch (action.key) {
        case "Backspace":
          return {
            ...state,
            equationState: state.equationState.slice(0, -1),
          };
        case "♼":
          return {
            ...state,
            equationState: [],
          };
        case "Enter":
          return state;
        default:
          return {
            ...state,
            equationState: [...state.equationState, action.key],
          };
      }
    default:
      break;
  }
  return state;
};

export const EqualidownProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);
  return (
    <equalidownContext.Provider value={value}>
      {children}
    </equalidownContext.Provider>
  );
};
