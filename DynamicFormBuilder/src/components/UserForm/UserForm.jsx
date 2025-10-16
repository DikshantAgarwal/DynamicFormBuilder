import { useUserForm, useUserValidation } from "../../hooks";
import { FormField } from "../FormField/FormField";
import "./userForm.css";


const formSchema = [
    "name",
    "avatarUrl",
    "role",
    "location",
    "bio",
    "phoneNumbers",
    "skills",
]

function UserForm({ onSubmit }) {  
  const {
    form,
    setForm,
    handleChange,
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
      setForm(() => JSON.parse(JSON.stringify(initialState)));
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

       {
        formSchema.map((fieldName)=>{
          return <FormField
                  label={fieldName}
                  value={form.values[fieldName]}
                  formState= {{form,setForm}}
                  onchange={handleChange}
                  className={inputClassName(fieldName)}
                  onBlur={runErrorChecks}
                  validation ={{error,errorMessages}}
                  addPhoneNumber ={addPhoneNumber}
          />
        })
       }  
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
