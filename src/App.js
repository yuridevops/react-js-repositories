import React, { useState, useEffect } from "react";
import "./styles.css";
import api from './services/api'

function App() {

  const [repositories, setRepositories] = useState([])


  useEffect(() => {
    api.get('repositories').then(repositories => {
      setRepositories(repositories.data)
    })
  }, [])


  async function handleAddRepository() {
    const response = await api.post('repositories',{
        title: "teste",
        url: "http://localhost:3333/repositories",
        techs: ["nodejs","react-js","react-native"]
    })

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    setRepositories(repositories.filter( repo => repo.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repo => (
            <li key={repo.id}>
              {
                repo.title
              }
          <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
          </button>
            </li>
          ))
        }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
