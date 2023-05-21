import { createContext, useReducer } from "react";

export const equalidownContext = createContext();

const initialState = {
  gameState: "playing",
  targetNumber: "Loading",
  numpadNumber: [],
  buttonState: [],
  equationState: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "NUMPAD_BUTTON_CLICK":
      switch (action.key[0]) {
        case "Backspace":
          if (state.equationState.length > 1) {
            return {
              ...state,
              buttonState: state.buttonState.slice(0, -1),
              equationState: state.equationState.slice(0, -1),
            };
          } else {
            return {
              ...state,
              buttonState: [],
              equationState: [],
            };
          }

        case "♼":
          return {
            ...state,
            buttonState: [],
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
              if (parseInt(result) === result) {
                return result;
              } else {
                throw new Error("Result is not an integer");
              }
            }
            const equationResult = evaluateExpression(
              state.equationState.join("")
            );
            const gameResult =
              equationResult === state.targetNumber
                ? "solved"
                : state.gameState;
            return {
              ...state,
              gameState: gameResult,
              equationState: [equationResult.toString()],
            };
          } catch (error) {
            return state;
          }
        default:
          return {
            ...state,
            buttonState: [...state.buttonState, action.key[1]],
            equationState: [...state.equationState, action.key[0]],
          };
      }
    case "SET_NUMPAD_NUMBER":
      if (action.payload) {
        return {
          ...state,
          numpadNumber: action.payload,
          targetNumber: "Loading",
        };
      }
      break;
    case "SET_TARGET_NUMBER":
      if (action.payload) {
        return {
          ...state,
          targetNumber: action.payload,
        };
      }
      break;
    default:
      return state;
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
