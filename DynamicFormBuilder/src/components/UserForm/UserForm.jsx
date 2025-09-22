import React, { useState } from "react";
import "./userForm.css";

const initialState = {
  name: "",
  avatarUrl: "",
  role: "",
  location: "",
  bio: "",
  phoneNumbers: [""],
  skills: [],
};

function UserForm({ onSubmit }) {
  const [form, setForm] = useState(initialState);
  const [skillInput, setSkillInput] = useState("");
  const [bioError, setBioError] = useState("");

  const isFormValid =
    Object.values(form).every((val) => val.trim() !== "") && !bioError;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "skills") {
      setSkillInput(value);
      return;
    }
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const AddSkills = () => {
    if (skillInput.trim() !== "") {
      setForm((prev) => ({
        ...prev,
        skills: prev.skills ? [...prev.skills, skillInput] : [skillInput],
      }));
      setSkillInput("");
    }
  };

  const removeSkills = (skillToRemove) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const addPhoneNumber = () => {
    setForm((prev) => {
      if (prev.phoneNumbers.length < 3) {
        return {
          ...prev,
          phoneNumbers: prev.phoneNumbers ? [...prev.phoneNumbers, ""] : [""],
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(form);
      setForm(initialState);
      setBioError("");
    }
  };

  React.useEffect(() => {
    console.log(form,form.phoneNumbers.length);
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
            value={form.name}
            className="user-form-input"
            onChange={handleChange}
            required
            type="text"
            placeholder=""
          />
        </label>
        <label className="user-form-label" style={{ fontWeight: 500 }}>
          Avatar URL:
          <input
            name="avatarUrl"
            value={form.avatarUrl}
            className="user-form-input"
            onChange={handleChange}
            required
            type="url"
            placeholder="https://example.com/avatar.jpg"
          />
        </label>
        <label className="user-form-label" style={{ fontWeight: 500 }}>
          Role:
          <input
            name="role"
            value={form.role}
            className="user-form-input"
            onChange={handleChange}
            required
            type="text"
            placeholder="e.g. Software Engineer"
          />
        </label>
        <label className="user-form-label" style={{ fontWeight: 500 }}>
          Location:
          <input
            name="location"
            className="user-form-input"
            value={form.location}
            onChange={handleChange}
            required
            type="text"
            placeholder="e.g. Bengaluru, Karnataka"
          />
        </label>
        <label className="user-form-label" style={{ fontWeight: 500 }}>
          Bio:
          <textarea
            name="bio"
            className="user-form-input"
            value={form.bio}
            onChange={handleChange}
            placeholder="A short bio about yourself"
            required
          />
        </label>
        {bioError && (
          <div
            style={{
              color: "red",
              fontSize: "0.9em",
              marginTop: -12,
              marginBottom: 8,
            }}
          >
            {bioError}
          </div>
        )}

        <label className="user-form-label">
          Phone Numbers:
        </label>
        <div className="user-form-phones">
          {form.phoneNumbers && form.phoneNumbers.length > 0 && form.phoneNumbers.map((phone, idx) => (
                <div key={idx} className="user-form-phone-entry">
                  <input
                    name={`phoneNumber-${idx}`}
                    type="tel"
                    
                    className="user-form-input"
                    value={phone}
                    onChange={(e)=>{
                        const {value} = e.target;
                        setForm((prev)=>{
                            const updatedPhones = [...prev.phoneNumbers];
                            updatedPhones[idx] = value;
                            return {...prev, phoneNumbers: updatedPhones};
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
                        phoneNumbers: prev.phoneNumbers.filter(
                          (_, i) => i !== idx
                        ),
                      }));
                    }}
                    disabled={form.phoneNumbers.length === 1}
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
          disabled={form.phoneNumbers && form.phoneNumbers.length >= 3}
          className="user-form-add-phone"
        >
          Add Phone Number
        </button>

        <label className="user-form-label">
          Skills:
          <div className="user-form-skills">
            <input
              name="skills"
              type="text"
              className="user-form-input"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e)=>e.key==="Enter" && AddSkills()}
              required
              placeholder="e.g. React"
            />

                <button
                  type="button"
                  onClick={AddSkills}
           
                  className="user-form-add-skills"
                  disabled={form.skills && form.skills.length >= 5 ||   skillInput.trim() === ""}
                >
                  Add
                </button>
            </div>
        </label>

        <div className="user-form-skills">
          {form.skills && form.skills.length > 0
            ? form.skills.map((skill, idx) => (
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

        <button
          type="submit"
          disabled={!isFormValid}
          className="user-form-button"
          style={{
            marginTop: 18,
            background: isFormValid ? "#52c41a" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "10px 0",
            fontWeight: 600,
            fontSize: 16,
            cursor: isFormValid ? "pointer" : "not-allowed",
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export { UserForm };
