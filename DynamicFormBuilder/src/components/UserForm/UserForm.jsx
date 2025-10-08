import { useUserForm, useUserValidation } from "../../hooks";
import "./userForm.css";

function UserForm({ onSubmit }) {
  const {
    form,
    setForm,
    handleChange,
    AddSkills,
    removeSkills,
    addPhoneNumber,
    initialState,
    skillInput,
    setSkillInput,
  } = useUserForm();
  const { runErrorChecks, isFormValid, errorMessages, error } =
    useUserValidation(form, setForm);

  const inputClassName = (name) => {
    return `user-form-input ${
      error[name] && form.dirty[name] && form.touched[name] ? "input-error" : ""
    }`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(form.values);
      window.localStorage.setItem("userformData", JSON.stringify(form));
      setForm(initialState);
      // setError("");
    }
  };

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
      <div className="user-form-title">User Information Form</div>
      <div
        className="user-form-group"
        style={{ display: "flex", flexDirection: "column", gap: 18 }}
      >
        <label className="user-form-label" style={{ fontWeight: 500 }}>
          Name:
          <input
            name="name"
            value={form.values.name}
            className={inputClassName("name")}
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
            className={inputClassName("avatarUrl")}
            onChange={handleChange}
            required
            type="url"
            onBlur={runErrorChecks}
            placeholder="https://example.com/avatar.jpg"
          />
        </label>
        {error.avatarUrl && form.dirty.avatarUrl && form.touched.avatarUrl && (
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
            className={inputClassName("role")}
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
            className={inputClassName("location")}
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
            className={inputClassName("bio")}
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

        <label className="user-form-label">Phone Numbers:</label>
        <div className="user-form-phones">
          {form.values.phoneNumbers &&
            form.values.phoneNumbers.length > 0 &&
            form.values.phoneNumbers.map((phone, idx) => (
              <div key={idx} className="user-form-phone-entry">
                <input
                  name="phoneNumbers"
                  type="tel"
                  className={inputClassName("phoneNumbers")}
                  value={phone}
                  onBlur={runErrorChecks}
                  onChange={(e) => {
                    const { value } = e.target;
                    setForm((prev) => {
                      const updatedPhones = [...prev.values.phoneNumbers];
                      const dirty = { ...prev.dirty };
                      dirty.phoneNumbers = true;
                      updatedPhones[idx] = value;
                      return {
                        ...prev,
                        values: { ...prev.values, phoneNumbers: updatedPhones },
                        dirty,
                      };
                    });
                  }}
                  required
                  placeholder="+91-9876543210"
                />
                <button
                  type="button"
                  onClick={() => {
                    setForm((prev) => ({
                      ...prev,
                      values: {
                        ...prev.values,
                        phoneNumbers: prev.values.phoneNumbers.filter(
                          (_, i) => i !== idx
                        ),
                      },
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
          disabled={
            form.values.phoneNumbers && form.values.phoneNumbers.length >= 3
          }
          className="user-form-add-phone"
        >
          Add Phone Number
        </button>
        {form.dirty.phoneNumbers &&
          form.touched.phoneNumbers &&
          error.phoneNumbers && (
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
              className={inputClassName("skills")}
              value={skillInput}
              onBlur={runErrorChecks}
              onChange={(e) => {
                setSkillInput(e.target.value);
                setForm((prev) => {
                  const dirty = { ...prev.dirty };
                  dirty.skills = true;
                  return { ...prev, dirty };
                });
              }}
              disabled={form.values.skills && form.values.skills.length >= 5}
              onKeyDown={(e) => e.key === "Enter" && AddSkills(e)}
              placeholder="e.g. React"
            />

            <button
              type="button"
              onClick={AddSkills}
              className="user-form-add-skills"
              disabled={
                (form.values.skills && form.values.skills.length >= 5) ||
                skillInput.trim() === ""
              }
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
                    onClick={() => {removeSkills(idx)}}
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
            {error.skills.duplicate && (
              <div>{errorMessages.skills.duplicate}</div>
            )}
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
