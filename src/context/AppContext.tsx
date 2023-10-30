import React, { createContext, useReducer, ReactNode, Dispatch } from "react";

interface State {
  user: null | any; 
  loading: boolean;
}

interface Action {
  type: string;
  payload?: any;  
}

interface AppContextProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const initialState: State = {
  user: null,
  loading: false,
};

const AppContext = createContext<AppContextProps>({
  state: initialState,
  dispatch: () => {},
});

const mainReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
