const FormField = ({
  label,
  value,
  onchange,
  onBlur,
  isError,
  errorMessages,
  className,
  addPhoneNumber,
  form,
  updateForm,
  skillInput,
  setSkillInput,
  AddSkills,
  removeSkills,
  error,
}) => {

  const fields = (label) => {
    switch (label) {
      case "bio":
        return (
          <textarea
            name="bio"
            className={className}
            value={value}
            onChange={onchange}
            onBlur={onBlur}
            placeholder="A short bio about yourself"
            required
          />
        );
      case "phoneNumbers":
        return (
          <>
            <div className="user-form-phones">
              {form.values.phoneNumbers &&
                form.values.phoneNumbers.length > 0 &&
                form.values.phoneNumbers.map((phone, idx) => (
                  <div key={idx} className="user-form-phone-entry">
                    <input
                      name="phoneNumbers"
                      type="tel"
                      className={className}
                      value={phone}
                      onBlur={onBlur}
                      onChange={(e) => {
                        const { value } = e.target;
                        updateForm((prev) => {
                          const updatedPhones = [...prev.values.phoneNumbers];
                          const dirty = { ...prev.dirty };
                          dirty.phoneNumbers = true;
                          updatedPhones[idx] = value;
                          return {
                            ...prev,
                            values: {
                              ...prev.values,
                              phoneNumbers: updatedPhones,
                            },
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
                        updateForm((prev) => ({
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
          </>
        );
      case "skills":
        return (
          <div className="user-form-skills">
            <input
              name="skills"
              type="text"
              className={className}
              value={skillInput}
              onBlur={onBlur}
              onChange={(e) => {
                setSkillInput(e.target.value);
                updateForm((prev) => {
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
          </div>
        );

      default:
        return (
          <input
            name={label}
            type="text"
            className={className}
            value={value}
            onBlur={onBlur}
            onChange={onchange}
            required
          />
        );
    }
  };
  return (
    <>
      <label className="user-form-label" style={{ fontWeight: 500 }}>
        {label}:{fields(label)}
      </label>
      {isError && (
        <div
          style={{
            color: "red",
            fontSize: "0.9em",
            marginTop: -12,
            marginBottom: 8,
          }}
        >
          {label === "skills" ? (
            <>
              {error.skills.min && <div>{errorMessages.min}</div>}
              {error.skills.max && <div>{errorMessages.max}</div>}
              {error.skills.duplicate && (
                <div>{errorMessages.duplicate}</div>
              )}
            </>
          ) : (
            errorMessages
          )}
        </div>
      )}
    </>
  );
};

export { FormField };
