import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";
import { FetchoParams } from "../types";
import fetcho from "../utils/fetcho";
import { ToastContext } from "../context/ToastContext";

const useFetcho = () => {
  const { setIsLoading, isLoading } = useContext(LoadingContext);
  const { showToast } = useContext(ToastContext);

  const fetchWithLoading = async (params: FetchoParams) => {
    try {
      setIsLoading(true);
      const data = await fetcho(params);
      return data;
    } catch (error) {
      console.error(
        `An error occurred while fetching, the url was ${params.url} and the error was ${error.message}`
      );
      showToast("Error while fetching", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return fetchWithLoading;
};

export default useFetcho;
