import React from 'react'
import { PhoneNumberFields } from "./PhoneNumberFields";
import { useUserValidation } from "../../hooks";
import { SkillsField } from "./SkillField";

const FormField = ({
  label,
  value,
  formState,
  onchange,
}) => {
  const { form, setForm } = formState;
  const { runErrorChecks,  errorMessages, error } = useUserValidation(form, setForm);

  const inputClassName = () => {
    return `user-form-input ${
      isError() ? "input-error" : ""
    }`;
  };

 
  const isError = () =>{
    const isFieldVisited =  form.dirty[label] && form.touched[label];

    if(Array.isArray(error[label])){
      return error[label].length > 0 && isFieldVisited
    }
    if(typeof error[label] ==="object" &&  error[label] !== null) {
     return  Object.values(error[label]).some((s)=>s)
     
    }
    return error[label] && isFieldVisited;
  }

  const fields = (label) => {
    switch (label) {
      case "bio":
        return (
          <textarea
            name="bio"
            className={inputClassName()}
            value={value}
            onChange={onchange}
            onBlur={runErrorChecks}
            placeholder="A short bio about yourself"
            required
          />
        );
      case "phoneNumbers":
        return (
          <PhoneNumberFields
            className={inputClassName()}
            onBlur={runErrorChecks}
            updateForm={setForm}
            form={form}
          />
        );
      case "skills":
        return (
          <SkillsField
            form={form}
            updateForm={setForm}
            onBlur={runErrorChecks}
            className={inputClassName()}
            error={error.skills}
            errorMessages={errorMessages}
          />
        );

      default:
        return (
          <input
            name={label}
            type="text"
            className={inputClassName()}
            value={value}
            onBlur={runErrorChecks}
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
      >
        <span>{label}:</span>
        <span>{fields(label)}</span>
      </label>

      {isError() && (
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
              {error.skills.min && <div>{errorMessages.skills.min}</div>}
              {error.skills.max && <div>{errorMessages.skills.max}</div>}
              {error.skills.duplicate && (
                <div>{errorMessages.skills.duplicate}</div>
              )}
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
