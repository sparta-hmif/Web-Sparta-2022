"use client";

import {
  Context,
  Dispatch,
  createContext,
  useContext,
  useReducer,
} from "react";

type PaginationAction = {
  type: "SET_PAGE";
  payload: number;
};

const PaginationContext: Context<number> = createContext(1);

const PaginationDispatchContext: Context<Dispatch<PaginationAction>> =
  createContext((value: PaginationAction): void => {});

function paginationReducer(page: number, action: PaginationAction) {
  switch (action.type) {
    case "SET_PAGE":
      return action.payload;
    default:
      throw Error("Unkonwn action type");
  }
}

export default function PaginationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [page, dispatch] = useReducer(paginationReducer, 1);

  return (
    <PaginationContext.Provider value={page}>
      <PaginationDispatchContext.Provider value={dispatch}>
        {children}
      </PaginationDispatchContext.Provider>
    </PaginationContext.Provider>
  );
}

export function usePagination() {
  return useContext(PaginationContext);
}

export function usePaginationDispatch() {
  return useContext(PaginationDispatchContext);
}
