import React, { useState } from "react";

const initialErrorState = {
  name: "",
  role: "",
  bio: "",
  avatarUrl: "",
  phoneNumbers: [],
  skills: { max: false, min: false, duplicate: false },
};

const errorMessages = {
  bio: "Bio must be at least 10 character long.",
  name: "Too short name,atleast  3 characters required",
  role: "min 2 characters required",
  email: "Invalid Email format",
  phoneNumbers: "Invalid Phone Number",
  avatarUrl: "Invalid URL format",
  skills: {
    max: "Maximum 5 skills can be added",
    min: "Atleast 1 skill is required",
    duplicate: "Duplicate skills are not allowed",
  },
};

const validators = {
  name: (value) => (value.trim().length < 3 ? errorMessages.name : ""),
  role: (value) => (value.trim().length < 3 ? errorMessages.role : ""),
  bio: (value) => (value.trim().length < 10 ? errorMessages.bio : ""),
  avatarUrl: (value) => {
    try {
      new URL(value);
      return "";
    } catch {
      return errorMessages.avatarUrl;
    }
  },
  phoneNumbers: (phones) => {
    const phoneRegex = /^\+?[0-9\s\-]{7,15}$/;
    return phones.some((p) => !phoneRegex.test(p))
      ? errorMessages.phoneNumbers
      : "";
  },
  skills: (skills) => ({
    max: skills.length > 5,
    min: skills.length < 1,
    duplicate:
      new Set(skills.map((s) => s.toLowerCase())).size !== skills.length,
  }),
};

function useUserValidation(form, setForm) {
  const [error, setError] = useState(initialErrorState);

  const runErrorChecks = (e) => {
    const { name, value } = e.target;
    const validator = validators[name];
    if (!validator) return;

    const errorResult =
      name === "skills"
        ? validator([...form.values.skills,value])
        : validator(name === "phoneNumbers" ? form.values.phoneNumbers : value);
        console.log(errorResult,value,value.trim.length)
        setError((prev) => ({ ...prev, [name]: errorResult }));
        setForm((prev) => ({
      ...prev,
      touched: { ...prev.touched, [name]: true },
    }));
  };

  const isFormValid =
    Object.values(form.values).every((val) => {
      if (Array.isArray(val)) {
        if (val.length === 0) {
          return false;
        } else {
          return val.every((item) => item.trim() !== "");
        }
      }
      return val.trim() !== "";
    }) &&
    Object.values(error).every((err) => {
      if (typeof err === "object") {
        return Object.values(err).every((e) => e === false);
      }
      return err === "";
    });

  return {
    errorMessages,
    runErrorChecks,
    isFormValid,
    error,
  };
}

export { useUserValidation };
