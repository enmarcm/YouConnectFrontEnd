import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import useFetcho from "./useFetcho";
import { useEffect, useState } from "react";
import { URL_REQUEST } from "../enums";


const useGroups = () => {
    const { getItem } = useAsyncStorage("UserLogged");
    const fetchWithLoading = useFetcho();
    const [contactGroups, setContactGroups] = useState([] as any);
  
    const config: any = {
      method: "GET",
      credentials: "include",
      cors: false ? "cors" : "no-cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: {},
      },
    };
  
    const fetchAllGroups = async () => {
  let token = await getItem();
  if (typeof token === "string") {
    token = token.split("Bearer ")[1].split('"')[0];
    config.headers.Authorization = "Bearer " + token;

  try {
    const groups = await fetchWithLoading({
      url: URL_REQUEST.URL_GROUPS,
      config: config,
    });
      setContactGroups(groups);
      return groups;
  } catch (error) {
    console.error(error);
  }
}
};

useEffect(() => {
  fetchAllGroups();
}, []);
  
    return contactGroups;
  };
  
  export default useGroups;