import * as React from 'react'
import {UserCard} from './components/UserCard/UserCard';
import { UserForm} from './components/UserForm/UserForm';

import './App.css'

function App() {


  const [userData, setUserData] = React.useState( {
    name: "John Doe",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "Software Engineer",
    location: "Bengaluru, Karnataka",
    bio: ["React", "Node.js", "TypeScript", "GraphQL"]
  });

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
