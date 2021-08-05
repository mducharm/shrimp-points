import React, { Dispatch, ReactNode, Reducer, useContext, useReducer } from "react";
import { createContext } from "react";
import { Action, State, storeReducer } from "./actions";

type Props = {
  children: ReactNode;
};

const initialState = {
  isLoggedIn: false,
  displayName: "",
  email: "",
  authToken: "",
} as State;

export const StateContext = createContext<State>({} as State);
export const DispatchContext = createContext<Dispatch<Action>>({} as Dispatch<Action>);

export function Store({ children }: Props) {
  const authToken = localStorage.getItem("auth");
  if (authToken != null) {
    initialState.authToken = authToken;
    initialState.isLoggedIn = true;
  }
  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function useStore() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return { state, dispatch };
}
