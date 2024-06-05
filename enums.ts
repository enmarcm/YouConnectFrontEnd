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

export enum URL_REQUEST {
  URL_BASE = "https://efficient-adaptation-production.up.railway.app/",
  URL_LOGIN = "https://efficient-adaptation-production.up.railway.app/auth/login",
  URL_REGISTER = "https://efficient-adaptation-production.up.railway.app/auth/register",
  URL_CONTACTS = "https://efficient-adaptation-production.up.railway.app/contact/allByUser",
  URL_GROUPS = "https://efficient-adaptation-production.up.railway.app/group/view/allByUser",
  URL_CONTACT_GROUPS = "https://efficient-adaptation-production.up.railway.app/group/view/allByGroup/",
  URL_ADD_CONTACT = "https://efficient-adaptation-production.up.railway.app/contact/create",
  URL_VIEW_CONTACT = "https://efficient-adaptation-production.up.railway.app/contact/"
}
