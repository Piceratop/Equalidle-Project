import { createContext, useReducer } from "react";

export const GameContext = createContext();

const initialState = {
  grid: [
    [0, 1, 0],
    [0, 2, 3],
    [0, 2, 0],
  ],
  currentPiece: 1,
  gridRendered: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_GRID":
      return { ...state, grid: action.payload };
    case "UPDATE_GRID_STATE":
      return { ...state, gridRendered: true };
    case "UPDATE_CURRENT_PIECE":
      return { ...state, currentPiece: action.payload };

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
