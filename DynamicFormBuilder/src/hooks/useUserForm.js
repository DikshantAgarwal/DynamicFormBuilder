import React, { useState } from "react";
const initialState = {
  values: {
    name: "",
    avatarUrl: "",
    role: "",
    location: "",
    bio: "",
    phoneNumbers: [""],
    skills: [],
  },
  dirty: {
    name: false,
    avatarUrl: false,
    role: false,
    location: false,
    bio: false,
    phoneNumbers: false,
    skills: false,
  },
  touched: {
    name: false,
    avatarUrl: false,
    role: false,
    location: false,
    bio: false,
    phoneNumbers: false,
    skills: false,
  },
};


function useUserForm() {
  const [form, setForm] = useState(
    () =>
      JSON.parse(window.localStorage.getItem("userformData")) || initialState
  );
 
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const values = { ...prev.values };
      const dirty = { ...prev.dirty };
      values[name] = value;
      dirty[name] = true;
      return { ...prev, values, dirty };
    });
  };


  const addPhoneNumber = () => {
    setForm((prev) => {
      if (prev.values.phoneNumbers.length < 3) {
        const newValues = { ...prev.values };
        newValues.phoneNumbers = prev.values.phoneNumbers
          ? [...prev.values.phoneNumbers, ""]
          : [""];
        return {
          ...prev,
          values: { ...prev.values, ...newValues },
          dirty: { ...prev.dirty, phoneNumbers: true },
        };
      }
    });
  };




  return {
    form,
    setForm,
    handleChange,
    addPhoneNumber,
    initialState,
  };
}

export { useUserForm };
