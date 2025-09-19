
import {UserCard} from './components/UserCard/UserCard';

import './App.css'

function App() {

  const user = {
    name: "John Doe",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "Software Engineer",
    location: "Bengaluru, Karnataka",
    bio: ["React", "Node.js", "TypeScript", "GraphQL"]
  };

  return (
    <>
      <div className="card">
        <UserCard 
          {...user}
        />
      </div>
    </>
  )
}

export default App
