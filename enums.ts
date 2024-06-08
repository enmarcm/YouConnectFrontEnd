export enum ROUTES {
  START = "/",
  AUTH = "/auth",
  HOME = "/home",
  CONTACTS = "/contacts",
  PROFILE = "/profile",
  SETTINGS = "/settings",
  NOT_FOUND = "*",
  ADDCONTACT = "/addContact",
}

export enum COLORS {
  PRIMARY = "#002C00",
  SECONDARY = "#194A15",
  TERTIARY = "#22531b",
  BUTTON = "#437A37",
  BG = "#326729",
  WHITE = "#FFFFFF",
  BLACK = "#000000",
}

export enum ICONS {
  userName = "person-outline",
  password = "lock-closed-outline",
  user = "person-outline",
  email = "mail-outline",
  dateOfBirth = "calendar-outline",
  Contacts = "search-outline",
  Settings = "settings-outline",
  Groups = "people-outline",
}

// const URL_BASE = "https://youconnect-production.up.railway.app";
const URL_BASE = "http://192.168.3.106:7878"

export enum URL_REQUEST {
  URL_LOGIN = `${URL_BASE}/auth/login`,
  URL_REGISTER = `${URL_BASE}/auth/register`,
  URL_CONTACTS = `${URL_BASE}/contact/allByUser`,
  URL_GROUPS = `${URL_BASE}/group/view/allByUser`,
  URL_CONTACT_GROUPS = `${URL_BASE}/group/view/allByGroup`,
  URL_ADD_CONTACT = `${URL_BASE}/contact/create`,
  URL_VIEW_CONTACT = `${URL_BASE}/contact/`,
  URL_ADD_GROUP = `${URL_BASE}/group/create`,
  URL_GROUP_PER_CONTACT = `${URL_BASE}/group/view/allByContact/`,
  URL_GROUP_ID = `${URL_BASE}/group/view/one/`,
  URL_UPDATE_CONTACT = `${URL_BASE}/contact/update/`,
  URL_DELETE_CONTACT = `${URL_BASE}/contact/delete`,
}
