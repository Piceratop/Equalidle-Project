import { createContext, useReducer } from "react";

export const equalidownContext = createContext();

const initialState = {
  currentPage: "Menu",
  targetNumber: 901,
  equationState: [],
};

const reducer = (state, action) => {
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
          try {
            function evaluateExpression(expression) {
              expression = expression.replace(/÷/g, "/");
              expression = expression.replace(/×/g, "*");
              expression = expression.replace(/−/g, "-");
              expression = expression.replace(/\+/g, "+");
              const result = eval(expression);
              if (parseInt(result) == result) {
                return parseInt(result);
              } else {
                throw new Error("Result is not an integer");
              }
            }
            const equationResult = evaluateExpression(
              state.equationState.join("")
            );
            return {
              ...state,
              equationState: [equationResult.toString()],
            };
          } catch (error) {
            return state;
          }
        default:
          return {
            ...state,
            equationState: [...state.equationState, action.key],
          };
      }
    default:
      return state;
      break;
  }
};

export const EqualidownProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);
  return (
    <equalidownContext.Provider value={value}>
      {children}
    </equalidownContext.Provider>
  );
};
