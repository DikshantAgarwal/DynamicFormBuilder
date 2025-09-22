import React, { useState } from "react";
import "./userForm.css";

const initialState = {
    name: "",
    avatarUrl: "",
    role: "",
    location: "",
    bio: "",
};

function UserForm({onSubmit}) {
    const [form, setForm] = useState(initialState);
    const [bioError, setBioError] = useState("");

    const isFormValid =
        Object.values(form).every((val) => val.trim() !== "") && !bioError;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        // No additional logic needed here for styling
        if (name === "bio") {
            if (value.trim() === "") {
                setBioError("Bio is required.");
            } else if (!value.includes(",")) {
                setBioError("Bio must be separated by commas.");
            } else {
                setBioError("");
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            const formattedData = {
                ...form,
                bio: form.bio.split(",").map((item) => item.trim()),
            };
            onSubmit(formattedData);
            setForm(initialState);
            setBioError("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="user-form-container">
            <div className="user-form-title">User Information Form</div>
            <div className="user-form-group">
                
           
                    <label className="user-form-label">
                        Name:
                        <input
                            name="name"
                            value={form.name}
                            className="user-form-input"
                            onChange={handleChange}
                            required
                        />
                    </label>
             
        
                    <label  className="user-form-label">
                        Avatar URL:
                        <input
                            name="avatarUrl"
                            value={form.avatarUrl}
                            className="user-form-input"
                            onChange={handleChange}
                            required
                            type="url"
                        />
                    </label>
   
                    <label className="user-form-label">
                        Role:
                        <input
                            name="role"
                            value={form.role}
                            className="user-form-input"
                            onChange={handleChange}
                            required
                        />
                    </label>
   
                    <label className="user-form-label">
                        Location:
                        <input
                            name="location"
                            className="user-form-input"
                            value={form.location}
                            onChange={handleChange}
                            required
                        />
                    </label>
  
                    <label className="user-form-label">
                        Bio (comma separated):
                        <input
                            name="bio"
                            className="user-form-input"
                            value={form.bio}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    {bioError && (
                        <div style={{ color: "red", fontSize: "0.9em" }}>{bioError}</div>
                    )}
       
                <button type="submit" disabled={!isFormValid} className="user-form-button">
                    Submit
                </button>
            </div>
        </form>
    );
}

export {UserForm}