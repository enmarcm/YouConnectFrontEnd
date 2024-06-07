import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import useFetcho from "./useFetcho";
import { useEffect, useState } from "react";
import { URL_REQUEST } from "../enums";

const useContacts = () => {
  const { getItem } = useAsyncStorage("UserLogged");
  const fetchWithLoading = useFetcho();
  const [contactView, setContactView] = useState([] as any);
  const [loading, setLoading] = useState(false);

  const config: any = {
    method: "GET",
    credentials: "include",
    cors: false ? "cors" : "no-cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: {},
    },
  };

  const fetchAllContacts = async () => {
    setLoading(true)
    let token = await getItem();
    if (typeof token === "string") {
      token = token.split("Bearer ")[1].split('"')[0];
      config.headers.Authorization = "Bearer " + token;
    }

    try {
      const data = await fetchWithLoading({
        url: URL_REQUEST.URL_CONTACTS,
        config: config,
      });

      console.log(data)
      setContactView(data);
      return data;
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchAllContacts();
  }, []);

  return {contactView, loading};
};

export default useContacts;
