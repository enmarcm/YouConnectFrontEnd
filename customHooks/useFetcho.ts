import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";
import { FetchoParams } from "../types";
import fetcho from "../utils/fetcho";

const useFetcho = () => {
  const { setIsLoading } = useContext(LoadingContext);

  const fetchWithLoading = async (params: FetchoParams) => {
    setIsLoading(true);
    const data = await fetcho(params).catch((error) => {
      console.error(
        `An error occurred while fetching, the url was ${params.url} and the error was ${error.message}`
      );
      return false;
    });
    setIsLoading(false);
    return data;
  };

  return fetchWithLoading;
};

export default useFetcho;
