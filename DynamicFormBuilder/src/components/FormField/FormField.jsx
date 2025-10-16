import { PhoneNumberFields } from "./PhoneNumberFields";
import { SkillsField } from "./SkillField";
import { useSkillsField } from "../../hooks";
const FormField = ({
  label,
  value,
  formState,
  onchange,
  className,
  onBlur,
  validation,
  addPhoneNumber,
}) => {
  const { form, setForm } = formState;
  const { error, errorMessages } = validation;
  const isError = error[label] && form.dirty[label] && form.touched[label];

  const { removeSkills } = useSkillsField(setForm);
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
          <PhoneNumberFields
            className={className}
            onBlur={onBlur}
            updateForm={setForm}
            form={form}
          />
        );
      case "skills":
        return (
          <SkillsField
            form={form}
            updateForm={setForm}
            onBlur={onBlur}
            className={className}
            error={error.skills}
            errorMessages={errorMessages}
          />
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
      <label
        className={
          label === "skills" ? "user-form-label--skills" : "user-form-label"
        }
        style={{ fontWeight: 500 }}
      >
        {label}:{fields(label)}
      </label>

      {label === "phoneNumbers" && (
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
      )}

      {label === "skills" && (
        <div className="user-form-skills">
          {form.values.skills && form.values.skills.length > 0
            ? form.values.skills.map((skill, idx) => (
                <div key={idx} className="user-form-skills-entry">
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => {
                      removeSkills(idx);
                    }}
                    className="user-form-remove-skills"
                  >
                    x
                  </button>
                </div>
              ))
            : null}
        </div>
      )}

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
              {error.skills.duplicate && <div>{errorMessages.duplicate}</div>}
            </>
          ) : (
            errorMessages[label]
          )}
        </div>
      )}
    </>
  );
};

export { FormField };
