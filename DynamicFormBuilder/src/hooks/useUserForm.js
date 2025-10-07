import React, { useState } from "react";
const initialState = {
  values:{
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

const initialErrorState= {
  name: "",
  role: "",
  bio: "",
  avatarUrl: "",
  phoneNumbers: [],
  skills: { max: false, min: false, duplicate: false },
}

const errorMessages = {
  bio: "Bio must be at least 10 character long.",
  name: "Too short name,atleast  3 characters required",
  role: "min 2 characters required",
  email:"Invalid Email format",
  phoneNumbers:"Invalid Phone Number",
  avatarUrl: "Invalid URL format",
  skills: {
    max: "Maximum 5 skills can be added",
    min: "Atleast 1 skill is required",
    duplicate: "Duplicate skills are not allowed",
  }
}

export function useUserForm(onSubmit){
      const [form, setForm] = useState(()=>JSON.parse(window.localStorage.getItem("userformData"))||initialState);
      const [skillInput, setSkillInput] = useState("");
      const [error, setError] = useState(initialErrorState);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => {
        const values = {...prev.values}
        const dirty = {...prev.dirty}
        values[name] = value;
        dirty[name] = true;
        return {...prev,values,dirty};
        });
  };
  
  const AddSkills = (e) => {
    e.preventDefault();
    if (skillInput.trim() !== "") {
      setForm((prev) => ({
        ...prev,
        values: {...prev.values, skills:prev.values.skills ? [...prev.values.skills, skillInput] : [skillInput]},
      }));
      setSkillInput("");
    }
 
  };

  const removeSkills = (skillToRemove) => {
    setForm((prev) => ({
      ...prev,
       values: {...prev.values, skills:prev.values.skills.filter((skill) => skill !== skillToRemove)},
    }));
  };

  const addPhoneNumber = () => {
    setForm((prev) => {
      if (prev.values.phoneNumbers.length < 3) {
        const newValues = {...prev.values};
        newValues.phoneNumbers = prev.values.phoneNumbers ? [...prev.values.phoneNumbers, ""] : [""];
        return {
          ...prev,
          values: {...prev.values,...newValues},
          dirty: {...prev.dirty, phoneNumbers:true}
        };
      }
    });
  };
  
  const isFormValid = Object.values(form.values).every((val) => {
    if(Array.isArray(val)){
       if(val.length === 0){
        return false;
       } else {
         return val.every(item => item.trim() !== "");
       }
    }
    return val.trim() !== ""
  }) && Object.values(error).every((err)=>{
    if(typeof err === "object"){
      return Object.values(err).every(e => e === false);
    }
    return err === "";
  })




  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(form.values);
      window.localStorage.setItem("userformData",JSON.stringify(form));
      setForm(initialState);
      setError("");
    }
  };
    const runErrorChecks =(e)=>{
    const { name, value } = e.target;
    switch(name){
      case "name":
        if(value.trim().length < 3){
          setError((prev)=>({...prev,[name]: errorMessages[`${name}`]}))
          setForm((prev) =>({...prev,touched:{...prev.touched,name:true}}))
        }else{
          setError((prev)=>({...prev,[name]: ""}))
        }
        break;
      case "role":
        if(value.trim().length < 3){
             setError((prev)=>({...prev,[name]: errorMessages[`${name}`]}))
            setForm((prev) =>({...prev,touched:{...prev.touched,role:true}}))
        }else{
          setError((prev)=>({...prev,[name]: ""}))
        }
          break;
      case "bio":
        if(value.trim().length < 10){
          setError((prev)=>({...prev,[name]: errorMessages[`${name}`]}))
            setForm((prev) =>({...prev,touched:{...prev.touched,bio:true}}))
        }else{
          setError((prev)=>({...prev,[name]: ""}))
        }
          break;

      case "avatarUrl": 
        try {
          new URL(value);
           setError((prev)=>({...prev,[name]: ""}))
        } catch{
            setError((prev)=>({...prev,[name]: errorMessages[`${name}`]}))
            setForm((prev) =>({...prev,touched:{...prev.touched,avatarUrl:true}}))
        } 
          break;
      case "phoneNumbers":{   
          const phoneRegex = /^\+?[0-9\s\-]{7,15}$/;
          form.values.phoneNumbers.forEach((phone) => {
            if (!phoneRegex.test(phone)) {
              setError((prev)=>({...prev,[name]: errorMessages[`${name}`]}))
              setForm((prev) =>({...prev,touched:{...prev.touched,phoneNumbers:true}}))
            } else{
               setError((prev)=>({...prev,[name]: ""}))
            }
          });
       }
     break;
     case "skills":{
            const updatedSkills = [...form.values.skills,value];
            setError((prev)=>({...prev,skills:{
            ...prev.skills,
            max: updatedSkills.length > 5,
            min: updatedSkills.length < 1,
            duplicate: new Set(updatedSkills.map(s => s.toLowerCase())).size !== updatedSkills.length
            }
            })
          )
     }
    break;
      default:
        break;
           
  }
}
  return {form,error, handleChange, AddSkills,removeSkills, addPhoneNumber, setForm, setError,initialState, errorMessages,skillInput ,setSkillInput,runErrorChecks,handleSubmit,isFormValid};
}