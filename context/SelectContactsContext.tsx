import React, { createContext, useContext, useState } from "react";

const SelectedContactsContext = createContext(null);

export const useSelectedContacts = () => useContext(SelectedContactsContext);

export const SelectedContactsProvider = ({ children }) => {
  const [state, setState] = useState({
    selectedContacts: [],
    formValues: { name: '', description: '' }, // Nuevos valores de estado para los inputs
  });

  const setSelectedContacts = (contacts) => setState(prev => ({ ...prev, selectedContacts: contacts }));
  const setFormValues = (values) => setState(prev => ({ ...prev, formValues: values }));

  return (
    <SelectedContactsContext.Provider
      value={{ ...state, setSelectedContacts, setFormValues }}
    >
      {children}
    </SelectedContactsContext.Provider>
  );
};