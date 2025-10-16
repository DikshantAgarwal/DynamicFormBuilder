const PhoneNumberFields = ({ className, onBlur, updateForm, form  }) => {
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
    </>
  );
};

export { PhoneNumberFields };
