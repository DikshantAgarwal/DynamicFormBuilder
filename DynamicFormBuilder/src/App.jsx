import * as React from 'react'
import {UserCard} from './components/UserCard/UserCard';
import { UserForm} from './components/UserForm/UserForm';

import './App.css'

function App() {


  const initialUserData = {
    name: "John Doe",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "Software Engineer",
    location: "Bengaluru, Karnataka",
    phoneNumber:["+91-9876543210"],
    bio: "Love React & UI",
    skills: ["React", "Node.js", "TypeScript", "GraphQL"]
  }

  const [userData, setUserData] = React.useState( JSON.parse(window.localStorage.getItem("userformData")).values || initialUserData);

  const handleFormSubmit = (data) => {
    setUserData(data);
  }

  return (
    <>
      <div className="card">
        <UserForm onSubmit={handleFormSubmit}/>
        <UserCard 
          {...userData}
        />
      </div>
    </>
  )
}

export default App
