import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import useFetcho from "./useFetcho";
import { useEffect, useState } from "react";
import { URL_REQUEST } from "../enums";
import fetcho from "../utils/fetcho";
import { addMethod } from "yup";

const useContactGroups = () => {
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
  
    const fetchAllContactGroups = async () => {
  let token = await getItem();
  if (typeof token === "string") {
    token = token.split("Bearer ")[1].split('"')[0];
    config.headers.Authorization = "Bearer " + token;
  }

  try {
    const groups = await fetchWithLoading({
      url: URL_REQUEST.URL_GROUPS,
      config: config,
    });
    // console.log(groups);

    if (!Array.isArray(groups)) {
        console.error('groups is not an array');
        return;
      }

      type ItemGroup = {
        idGroup: string;
        idUser: string;
        nameGroup: string;
      }
  
      const getGroup = (group:any): ItemGroup => ({
        idGroup: group.id,
        idUser:group.idUser,
        nameGroup: group.name,
      })
  
      const items = groups.map(getGroup);
      console.log(items)
      const newItems = await Promise.all(
        items.map(async (group) => {
          const contacts = await fetchWithLoading({
            url: URL_REQUEST.URL_CONTACT_GROUPS + `/${group.idGroup}`,
            config: config,
          });
          return { ...group, contacts };
        })
      );
      console.log(newItems);
      setContactGroups(newItems);
      return contactGroups;
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchAllContactGroups();
}, []);
  
    return contactGroups;
  };
  
  export default useContactGroups;