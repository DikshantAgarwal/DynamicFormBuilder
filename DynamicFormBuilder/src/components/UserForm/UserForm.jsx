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
];

function UserForm({ onSubmit }) {
  const { form, setForm, handleChange, addPhoneNumber, initialState } =
    useUserForm();

  const { checkIsFormValid  } = useUserValidation(form, setForm);
  console.log("isFormValid12",checkIsFormValid ())
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkIsFormValid ()) {
      onSubmit(form.values);
      window.localStorage.setItem("userformData", JSON.stringify(form));
      setForm(() => JSON.parse(JSON.stringify(initialState)));
      // setError("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form-container">
      <div className="user-form-title">User Information Form</div>
      <div
        className="user-form-group"
        style={{ display: "flex", flexDirection: "column", gap: 18 }}
      >
        {formSchema.map((fieldName) => {
          return (
            <FormField
              label={fieldName}
              value={form.values[fieldName]}
              formState={{ form, setForm }}
              onchange={handleChange}
              addPhoneNumber={addPhoneNumber}
            />
          );
        })}
      </div>
      <button
        type="submit"
        disabled={!checkIsFormValid ()}
        className="user-form-button"
      >
        Submit
      </button>
    </form>
  );
}

export { UserForm };
