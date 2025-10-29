# DynamicFormBuilder AI Assistant Instructions

## Project Overview
This is a React-based dynamic form builder application using Vite as the build tool. The project implements a user information form with validation, custom hooks, and reusable components.

## Key Architecture Patterns

### Component Structure
- `UserForm`: Main container component that orchestrates form state and validation
- `FormField`: Reusable field component supporting different input types
- `SkillsField`: Special component for handling multiple skills with add/remove functionality

### Custom Hooks
1. `useUserForm`: Manages form state with:
   - Values, dirty state, and touched state tracking
   - Local storage persistence
   - Example usage:
   ```javascript
   const { form, handleBlur, setForm, handleChange } = useUserForm();
   ```

2. `useUserValidation`: Handles form validation with:
   - Field-specific validation rules
   - Real-time validation on blur/change
   - Memoized form validity checking
   ```javascript
   const { error, errorMessages, runErrorChecks, checkIsFormValid } = useUserValidation(values);
   ```

### Form State Management
- Form schema defined in `UserForm.jsx`: `["name", "avatarUrl", "role", "location", "bio", "phoneNumbers", "skills"]`
- State structure:
  ```javascript
  {
    values: { /* form values */ },
    dirty: { /* modified field flags */ },
    touched: { /* field interaction flags */ }
  }
  ```

## Development Workflow

### Setup and Running
```bash
npm install    # Install dependencies
npm run dev    # Start development server
npm run build  # Build for production
npm run lint   # Run ESLint checks
```

### Key Files
- `src/components/UserForm/UserForm.jsx`: Main form implementation
- `src/hooks/useUserValidation.js`: Validation logic and error messages
- `src/hooks/useUserForm.js`: Form state management
- `src/components/FormField/SkillField.jsx`: Skills input implementation

### Validation Patterns
- Field validation triggered on blur and change events
- Validators defined in `useUserValidation.js`
- Custom validation for URLs, phone numbers, and skills count

## Project-Specific Conventions

### Form Field Implementation
1. Use `FormField` component for new field types
2. Implement field-specific validation in `validators` object
3. Add error messages in `errorMessages` object

### State Updates
- Use the `setForm` updater function with previous state:
```javascript
setForm(prev => ({
  ...prev,
  values: { ...prev.values, [name]: value },
  dirty: { ...prev.dirty, [name]: true }
}));
```

### Validation Rules
- Name: Minimum 3 characters
- Role: Minimum 2 characters
- Bio: Minimum 10 characters
- Skills: Maximum 5 unique skills
- Phone Numbers: Must match regex `/^\+?[0-9\s\-]{7,15}$/`

## Common Gotchas
1. Form validation checks both value presence AND error absence
2. Skills are stored as an object but validated as an array
3. Phone numbers validation happens on the entire array
4. Local storage persists form state between sessions