import { useSkillsField } from "../../hooks";

const SkillsField = ({ className, onBlur, updateForm, form }) => {
  const { addSkills, skillInput, removeSkills, setSkillInput } =
    useSkillsField(updateForm);
  return (
    <>
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
          onKeyDown={(e) => e.key === "Enter" && addSkills(e)}
          placeholder="e.g. React"
        />

        <button
          type="button"
          onClick={addSkills}
          className="user-form-add-skills"
          disabled={
            (form.values.skills && form.values.skills.length >= 5) ||
            skillInput.trim() === ""
          }
        >
          Add
        </button>
      </div>
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
    </>
  );
};

export { SkillsField };
