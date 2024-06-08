import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import useFetcho from "./useFetcho";
import { useEffect, useState } from "react";
import { URL_REQUEST } from "../enums";
import fetcho from "../utils/fetcho";
import { addMethod } from "yup";

const useGetUser = () => {
    const { getItem } = useAsyncStorage("UserLogged");
    const fetchWithLoading = useFetcho();
    const [user, setUser] = useState([] as any);
  
    const config: any = {
      method: "GET",
      credentials: "include",
      cors: false ? "cors" : "no-cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: {},
      },
    };
  
    const fetchUser = async () => {
  let token = await getItem();
  if (typeof token === "string") {
    token = token.split("Bearer ")[1].split('"')[0];
    config.headers.Authorization = "Bearer " + token;

  try {
    const userinfo = await fetchWithLoading({
      url: URL_REQUEST.URL_USER,
      config: config,
    });
    // console.log(groups);

      setUser(userinfo);
      return userinfo;
  } catch (error) {
    console.error(error);
  }
}
};

useEffect(() => {
  fetchUser();
}, []);
  
    return user;
  };
  
  export default useGetUser;