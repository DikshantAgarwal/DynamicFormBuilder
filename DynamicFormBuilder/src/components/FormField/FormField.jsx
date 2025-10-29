  import React from 'react'
  import { PhoneNumberFields } from "./PhoneNumberFields";

  import { SkillsField } from "./SkillField";

  const FormField = ({
    label,
    value,
    form,
    setForm,
    runErrorChecks,
    error,
    errorMessages,
    onchange,
    handleBlur,
  }) => {
   
    const isError = () =>{
      const isFieldVisited =  form.dirty[label] && form.touched[label];

      if(Array.isArray(error[label])){
        return  isFieldVisited && error[label].some((e)=>e!=="")
      }
      if(typeof error[label] ==="object" &&  error[label] !== null) {
      return  Object.values(error[label]).some((s)=>s)
      
      }
      return error[label] && isFieldVisited;
    }

   const inputClassName =`${ isError() ? "input-error" : ""}`;
   const inputProps = {
    name: label,
    value,
    onChange: onchange,
    onBlur: (e) => {
      runErrorChecks(e);
      handleBlur(label);
    },
    className: `user-form-input ${inputClassName}`,
   }

    const fields = (label) => {
      switch (label) {
        case "bio":
          return (
            <textarea
              {...inputProps}
              placeholder="A short bio about yourself"
              required
            />
          );
        case "phoneNumbers":
          return (
            <PhoneNumberFields
              className={inputClassName}
              onBlur={runErrorChecks}
              error={error.phoneNumbers}
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
              className={inputClassName}
              error={error.skills}
              errorMessages={errorMessages}
            />
          );

        default:
          return (
            <input
              {...inputProps}
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
