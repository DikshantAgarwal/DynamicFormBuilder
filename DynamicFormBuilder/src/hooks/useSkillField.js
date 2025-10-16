
import React from 'react'

function useSkillsField(setForm) {
  const [skillInput, setSkillInput] = React.useState("");
  const addSkills = (e) => {
    e.preventDefault();
    if (skillInput.trim() !== "") {
      setForm((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          skills: prev.values.skills
            ? [...prev.values.skills, skillInput]
            : [skillInput],
        },
      }));
      setSkillInput("");
    }
  };

  const removeSkills = (idx) => {
    setForm((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        skills: prev.values.skills.filter((_,id) => id !== idx),
      },
    }));
  };
  return { addSkills, removeSkills ,skillInput,setSkillInput};
}

export {useSkillsField}