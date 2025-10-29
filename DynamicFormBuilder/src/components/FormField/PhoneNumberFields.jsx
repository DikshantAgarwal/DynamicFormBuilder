import React from "react";


const MAX_PHONE_NUMBERS = 3;

const PhoneNumberInput = ({ 
  className, 
  value, 
  onBlur, 
  onChange, 
  onRemove, 
  showRemoveButton 
}) => (
  <div className="user-form-phone-entry">
    <input
      name="phoneNumbers"
      type="tel"
      className={`user-form-input ${className}`}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      required
      placeholder="+91-9876543210"
      pattern="^\+?[0-9\s\-]{7,15}$"
      title="Phone number must be between 7-15 digits and may include +, spaces, or hyphens"
    />
    <button
      type="button"
      onClick={onRemove}
      disabled={!showRemoveButton}
      className="user-form-remove-phone"
      aria-label="Remove phone number"
    >
      Remove
    </button>
  </div>
);

const PhoneNumberFields = ({
  className,
  onBlur,
  error,
  updateForm,
  form,
}) => {
  const phoneNumbers = form.values.phoneNumbers || [""];
  const isMaxPhoneNumbersReached = phoneNumbers.length >= MAX_PHONE_NUMBERS;

  const addPhoneNumber = () => {
    updateForm((prev) => {
      if (prev.values.phoneNumbers?.length < MAX_PHONE_NUMBERS) {
        const updatedPhoneNumbers = [...(prev.values.phoneNumbers || []), ""];
        return {
          ...prev,
          values: { 
            ...prev.values, 
            phoneNumbers: updatedPhoneNumbers 
          },
          dirty: { 
            ...prev.dirty, 
            phoneNumbers: true 
          },
        };
      }
      return prev;
    });
  };

  const handlePhoneNumberChange = (index, value) => {
    updateForm((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        phoneNumbers: prev.values.phoneNumbers.map((phone, idx) =>
          idx === index ? value : phone
        ),
      },
      dirty: { 
        ...prev.dirty, 
        phoneNumbers: true 
      },
    }));
  };

  const removePhoneNumber = (index) => {
    updateForm((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        phoneNumbers: prev.values.phoneNumbers.filter((_, idx) => idx !== index),
      },
    }));
  };

  return (
    <>
      <div className="user-form-phones">
        {phoneNumbers.map((phone, idx) => (
          <PhoneNumberInput
            key={`phone-${idx}`}
            className={error?.[idx] ? className : ''}
            value={phone}
            onBlur={onBlur}
            onChange={(e) => handlePhoneNumberChange(idx, e.target.value)}
            onRemove={() => removePhoneNumber(idx)}
            showRemoveButton={phoneNumbers.length > 1}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={addPhoneNumber}
        disabled={isMaxPhoneNumbersReached}
        className="user-form-add-phone"
      >
        Add Phone Number
      </button>
    </>
  );
};

export { PhoneNumberFields };
