import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import useFetcho from "./useFetcho";
import { FC, useEffect, useState } from "react";
import { URL_REQUEST } from "../enums";

const useGroupsPage: FC<{id:any}> = ({id}) => {
    const { getItem } = useAsyncStorage("UserLogged");
    const fetchWithLoading = useFetcho();
    const [contactView, setContactView] = useState([] as any);
  
    const config: any = {
      method: "GET",
      credentials: "include",
      cors: false ? "cors" : "no-cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: {},
      },
    };
  
    const fetchContacts = async () => {
      let token = await getItem();
      if (typeof token === "string") {
        token = token.split("Bearer ")[1].split('"')[0];
        config.headers.Authorization = "Bearer " + token;
      }
  
      try {
        const data = await fetchWithLoading({
          url: URL_REQUEST.URL_GROUP_ID + id,
          config: config,
        });
        console.log(data)
        setContactView(data);
        return data;
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchContacts();
    }, []);
  
    return contactView;
  };
  
  export default useGroupsPage;