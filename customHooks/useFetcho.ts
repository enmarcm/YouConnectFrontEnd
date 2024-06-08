import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";
import { FetchoParams } from "../types";
import fetcho from "../utils/fetcho";
import { ToastContext } from "../context/ToastContext";

const useFetcho = () => {
  const { setIsLoading } = useContext(LoadingContext);
  const { showToast } = useContext(ToastContext);

  const fetchWithLoading = async (params: FetchoParams) => {
    try {
      setIsLoading(true);
      // Crear una promesa que se rechaza después de 15 segundos
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("Request timed out after 15 seconds"));
        }, 15000); 
      });
  
      const data = await Promise.race([fetcho(params), timeoutPromise]);
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
