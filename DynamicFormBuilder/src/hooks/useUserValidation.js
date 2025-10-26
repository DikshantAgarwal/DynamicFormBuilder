import React from "react";

const errorMessages = {
  bio: "Bio must be at least 10 characters long.",
  name: "Too short name, at least 3 characters required",
  role: "Min 2 characters required",
  email: "Invalid Email format",
  phoneNumbers: "Invalid Phone Number",
  avatarUrl: "Invalid URL format",
  skills: {
    max: "Maximum 5 skills can be added",
    min: "At least 1 skill is required",
    duplicate: "Duplicate skills are not allowed",
  },
};

const validators = {
  name: (value) => (value.trim().length < 3 ? errorMessages.name : ""),
  role: (value) => (value.trim().length < 2 ? errorMessages.role : ""),
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
    return phones.map((p) => (!phoneRegex.test(p) ? errorMessages.phoneNumbers : ""));
  },
  skills: (skills) => ({
    max: skills.length > 5,
    min: skills.length < 1,
    duplicate: new Set(skills.map((s) => s.toLowerCase())).size !== skills.length,
  }),
};

function useUserValidation(form, setForm) {
  const [error, setError] = React.useState({
    name: "",
    role: "",
    bio: "",
    avatarUrl: "",
    phoneNumbers: [],
    skills: { max: false, min: false, duplicate: false },
  });


 React.useEffect(() => {
  console.log("%cuseUserValidation MOUNTED", "color: orange;");
  return () => console.log("%cuseUserValidation UNMOUNTED", "color: red;");
});


  const runErrorChecks = (e) => {
    const { name, value } = e.target;
    const validator = validators[name];
    if (!validator) return;

    const errorResult =
      name === "skills"
        ? validator([...form.values.skills, value])
        : validator(name === "phoneNumbers" ? form.values.phoneNumbers : value);
     
    setError((prev) => {
      if (name === "skills") {
        return { ...prev, skills: { ...prev.skills, ...errorResult } };
      }
      if (name === "phoneNumbers") {
        return { ...prev, phoneNumbers: [...errorResult] };
      }
      return { ...prev, [name]: errorResult };
    });

    setForm((prev) => ({
      ...prev,
      touched: { ...prev.touched, [name]: true },
    }));
  };

  const checkIsFormValid = React.useMemo(()=>{
    const valuesValid = Object.values(form.values).every((val) => {
      if (Array.isArray(val)) return val.length > 0 && val.every((v) => v.trim() !== "");
      return val.trim() !== "";
    });

    const errorsValid = Object.values(error).every((err) => {
      if (Array.isArray(err)) return err.every((e) => e===""); // empty strings
      if (typeof err === "object" && err !== null) return Object.values(err).every((e) => e === false);
      return err === "";
    });
    return valuesValid && errorsValid;
  },[form.values,error]);

  return { error, errorMessages, runErrorChecks, checkIsFormValid };
}

export { useUserValidation };
