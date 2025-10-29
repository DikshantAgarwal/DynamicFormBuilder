import { useSkillsField } from "../../hooks";

const MAX_SKILLS = 5;

const SkillInput = ({ 
  className, 
  skillInput, 
  onBlur, 
  setSkillInput, 
  updateForm, 
  isDisabled, 
  onAdd, 
  onKeyDown 
}) => (
  <div className="user-form-skills">
    <input
      name="skills"
      type="text"
      className={`user-form-input ${className}`}
      value={skillInput}
      onBlur={onBlur}
      onChange={(e) => {
        setSkillInput(e.target.value);
        updateForm((prev) => ({
          ...prev,
          dirty: { ...prev.dirty, skills: true }
        }));
      }}
      disabled={isDisabled}
      onKeyDown={onKeyDown}
      placeholder="e.g. React"
    />
    <button
      type="button"
      onClick={onAdd}
      className="user-form-add-skills"
      disabled={isDisabled || !skillInput.trim()}
    >
      Add
    </button>
  </div>
);

const SkillTag = ({ skill, onRemove }) => (
  <div className="user-form-skills-entry">
    <span>{skill}</span>
    <button
      type="button"
      onClick={onRemove}
      className="user-form-remove-skills"
      aria-label={`Remove ${skill}`}
    >
      ×
    </button>
  </div>
);

const SkillsField = ({ className, onBlur, updateForm, form }) => {
  const { addSkills, skillInput, removeSkills, setSkillInput } = useSkillsField(updateForm);
  
  const isMaxSkillsReached = form.values.skills?.length >= MAX_SKILLS;
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkills(e);
    }
  };

  return (
    <>
      <SkillInput
        className={className}
        skillInput={skillInput}
        onBlur={onBlur}
        setSkillInput={setSkillInput}
        updateForm={updateForm}
        isDisabled={isMaxSkillsReached}
        onAdd={addSkills}
        onKeyDown={handleKeyDown}
      />
      <div className="user-form-skills">
        {form.values.skills?.length > 0 && 
          form.values.skills.map((skill, idx) => (
            <SkillTag
              key={`${skill}-${idx}`}
              skill={skill}
              onRemove={() => removeSkills(idx)}
            />
          ))}
      </div>
    </>
  );
};



export { SkillsField };
