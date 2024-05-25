import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { LoadingContextProps, PropsChildren } from "../types";

const initialLoadingContext: LoadingContextProps = {
  isLoading: false,
  setIsLoading: () => {},
};

export const LoadingContext = createContext<LoadingContextProps>(
  initialLoadingContext
);


export const LoadingProvider = ({ children }: PropsChildren) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{ isLoading: loading, setIsLoading: setLoading }}
    >
      {children}
    </LoadingContext.Provider>
  );
};