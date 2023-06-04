import { createContext, useReducer } from "react";

export const GameContext = createContext();

const initialState = {
  grid: [
    [0, 1, 0, 0],
    [0, 2, 3, 0],
    [0, 2, 0, 0],
  ],
  currentPiece: 1,
  gridRendered: false,
  mousePosition: { x: 0, y: 0 },
  allowedMovement: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_GRID":
      return { ...state, grid: action.payload, allowedMovement: false };
    case "UPDATE_GRID_STATE":
      return { ...state, gridRendered: true };
    case "UPDATE_CURRENT_PIECE":
      return { ...state, currentPiece: action.payload, allowedMovement: false };
    case "UPDATE_MOUSE_POSITION":
      return { ...state, mousePosition: action.payload, allowedMovement: true };
    default:
      return state;
  }
};

export const GameContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
