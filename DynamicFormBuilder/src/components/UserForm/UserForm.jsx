import React, { useState } from "react";
import "./userForm.css";

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

function UserForm({ onSubmit }) {
  const [form, setForm] = useState(initialState);
  const [skillInput, setSkillInput] = useState("");
  const [error, setError] = useState(initialErrorState);

  const isFormValid = Object.values(form.values).every((val) => {
    if(Array.isArray(val)){
       if(val.length === 0){
        return false;
       } else {
         return val.every(item => item.trim() !== "");
       }
    }
    return val.trim() !== ""
  })&& Object.values(error).every((err)=>{
    if(typeof err === "object"){
      return Object.values(err).every(e => e === false);
    }
    return err === "";
  })

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(form.values);
      setForm(initialState);
      setError("");
    }
  };

  const runErrorChecks =(e)=>{
    const { name, value } = e.target;
    console.log("run error",name,value);
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
            console.log("updatedSkills",updatedSkills);
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

  React.useEffect(() => {
    console.log("okk",form,error,isFormValid);
  }, [form]);

  return (
    <form
      onSubmit={handleSubmit}
      className="user-form-container"
      style={{
        maxWidth: 600,
        margin: "0 40px",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 12px #0001",
        padding: 32,
      }}
    >
      <div
        className="user-form-title"
      >
        User Information Form
      </div>
      <div
        className="user-form-group"
        style={{ display: "flex", flexDirection: "column", gap: 18 }}
      >
        <label className="user-form-label" style={{ fontWeight: 500 }}>
          Name:
          <input
            name="name"
            value={form.values.name}
            className="user-form-input"
            onChange={handleChange}
            required
            onBlur={runErrorChecks}
            type="text"
            placeholder="e.g. John Doe"
          />
        </label>
        {error.name && form.dirty.name && form.touched.name && (
          <div
            style={{
              color: "red",
              fontSize: "0.9em",
              marginTop: -12,
              marginBottom: 8,
            }}
          >
            {error.name}
          </div>
        )}
        <label className="user-form-label" style={{ fontWeight: 500 }}>
          Avatar URL:
          <input
            name="avatarUrl"
            value={form.values.avatarUrl}
            className="user-form-input"
            onChange={handleChange}
            required
            type="url"
            onBlur={runErrorChecks}
            placeholder="https://example.com/avatar.jpg"
          />
        </label>
        {error.avatarUrl&& form.dirty.avatarUrl && form.touched.avatarUrl && (
          <div
            style={{
              color: "red",
              fontSize: "0.9em",
              marginTop: -12,
              marginBottom: 8,
            }}
          >
            {errorMessages.avatarUrl}
          </div>
        )}
        <label className="user-form-label" style={{ fontWeight: 500 }}>
          Role:
          <input
            name="role"
            value={form.values.role}
            className="user-form-input"
            onChange={handleChange}
             onBlur={runErrorChecks}
            required
            type="text"
            placeholder="e.g. Software Engineer"
          />
        </label>
        {form.dirty.role && form.touched.role && error.role && (
          <div
            style={{
              color: "red",
              fontSize: "0.9em",
              marginTop: -12,
              marginBottom: 8,
            }}
          >
            {errorMessages.role}
          </div>
        )}
        <label className="user-form-label" style={{ fontWeight: 500 }}>
          Location:
          <input
            name="location"
            className="user-form-input"
            value={form.values.location}
            onChange={handleChange}
             onBlur={runErrorChecks}
            type="text"
            placeholder="e.g. Bengaluru, Karnataka"
          />
        </label>
        <label className="user-form-label" style={{ fontWeight: 500 }}>
          Bio:
          <textarea
            name="bio"
            className="user-form-input"
            value={form.values.bio}
            onChange={handleChange}
            onBlur={runErrorChecks}
            placeholder="A short bio about yourself"
            required
          />
        </label>
        {form.dirty.bio && form.touched.bio && error.bio && (
          <div
            style={{
              color: "red",
              fontSize: "0.9em",
              marginTop: -12,
              marginBottom: 8,
            }}
          >
            {errorMessages.bio}
          </div>
        )}

        <label className="user-form-label">
          Phone Numbers:
        </label>
        <div className="user-form-phones">
          {form.values.phoneNumbers && form.values.phoneNumbers.length > 0 && form.values.phoneNumbers.map((phone, idx) => (
                <div key={idx} className="user-form-phone-entry">
                  <input
                    name="phoneNumbers"
                    type="tel" 
                    className="user-form-input"
                    value={phone}
                    onBlur={runErrorChecks}
                    onChange={(e)=>{
                        const {value} = e.target;
                        setForm((prev)=>{
                            const updatedPhones = [...prev.values.phoneNumbers];
                            const dirty = {...prev.dirty};
                            dirty.phoneNumbers = true;
                            updatedPhones[idx] = value;
                            return {...prev, values: {...prev.values, phoneNumbers: updatedPhones}, dirty};
                        })

                    }}
                    required
                    placeholder="+91-9876543210"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({
                        ...prev,
                        values: {...prev.values , phoneNumbers: prev.values.phoneNumbers.filter(
                          (_, i) => i !== idx
                        ),
                      }
                      }));
                    }}
                    disabled={form.values.phoneNumbers.length === 1}
                    className="user-form-remove-phone"
                  >
                    Remove
                  </button>
                </div>
              ))}
        </div>
        <button
          type="button"
          onClick={addPhoneNumber}
          disabled={form.values.phoneNumbers && form.values.phoneNumbers.length >= 3}
          className="user-form-add-phone"
        >
          Add Phone Number
        </button>
        {form.dirty.phoneNumbers && form.touched.phoneNumbers && error.phoneNumbers && (
          <div
            style={{
              color: "red",
              fontSize: "0.9em",
              marginTop: -12,
              marginBottom: 8,
            }}
          >
            {errorMessages.phoneNumbers}
          </div>
        )}

        <label className="user-form-label">
          Skills:
          <div className="user-form-skills">
            <input
              name="skills"
              type="text"
              className="user-form-input"
              value={skillInput}
              onBlur={runErrorChecks}
              onChange={(e) => {setSkillInput(e.target.value); setForm((prev)=>{const dirty = {...prev.dirty}; dirty.skills = true; return {...prev, dirty};})}}
              disabled = {form.values.skills && form.values.skills.length >=5}
              onKeyDown={(e)=>e.key==="Enter" && AddSkills(e)}
              placeholder="e.g. React"
            />

                <button
                  type="button"
                  onClick={AddSkills}
                  className="user-form-add-skills"
                  disabled={form.values.skills && form.values.skills.length >= 5 ||   skillInput.trim() === ""}
                >
                  Add
                </button>
            </div>
        </label>

        <div className="user-form-skills">
          {form.values.skills && form.values.skills.length > 0
            ? form.values.skills.map((skill, idx) => (
                <div key={idx} className="user-form-skills-entry">
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkills(skill)}
                    className="user-form-remove-skills"
                  >
                    X
                  </button>
                </div>
              ))
            : null}
        </div>

        {error.skills && (
          <div
            style={{
              color: "red",
              fontSize: "0.9em",
              marginTop: -12,
              marginBottom: 8,
            }}
          >
            {error.skills.min && <div>{errorMessages.skills.min}</div>}
            {error.skills.max && <div>{errorMessages.skills.max}</div>}
            {error.skills.duplicate && <div>{errorMessages.skills.duplicate}</div>}
          </div>
        )}

        <button
          type="submit"
          disabled={!isFormValid}
          className="user-form-button"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export { UserForm };
