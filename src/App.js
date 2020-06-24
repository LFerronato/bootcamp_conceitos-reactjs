import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api'

import matriz from './assets/bg.jpg'

function App() {
  const [ repositories, setRepositories ] = useState([])
  const [ title, setTitle ] = useState('')
  const [ url, setUrl ] = useState('')
  const [ techs, setTechs ] = useState([])

  useEffect(() => {
    api.get('repositories')
      .then(resp => {
        setRepositories(resp.data)
      })
      .catch(err => console.log(err))
  }, [])

  async function handleAddRepository() {
    console.log(techs.length);

    if (!title || !url || techs.length === 0) {
      return alert('há campos em branco!')
    }

    const data = {
      "title": title,
      "url": url,
      "techs": techs
    }
    try {
      const newRep = await api.post('repositories', data)

      setRepositories([ ...repositories, newRep.data ])
    } catch (error) { console.log(error) }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`)
      const newReps = repositories.filter(r => r.id !== id)
      setRepositories(newReps)
    } catch (error) { console.log(error) }
  }
  if (!repositories) {
    return null
  }
  return (
    <div className="container">
      <img src={matriz} alt="" />
      <p className="titulo">Meus Repositórios - SUPER LEGAL</p>
      <div className="content">
        <p>Title: </p>
        <input
          type="text"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <p>URL: </p>
        <input
          type="text"
          name="title"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <p>Techs: </p>
      ( separeted by comma )
      <input
          type="text"
          name="title"
          value={techs}
          onChange={e => setTechs(e.target.value ? e.target.value.split(',') : [])}
        />

        <button className="addButton" onClick={handleAddRepository}>Adicionar</button>

        <hr />
        <h2>List of Repositories </h2>({repositories.length} repositories!)<br />
        <ul data-testid="repository-list">
          {repositories.map(rep => (
            <li key={rep.id}>
              <p>{rep.title}</p>
              <a href={rep.url} target="_blank" rel="noopener noreferrer">Link</a>
              {rep.techs ? rep.techs.join(', ') : ''}

              <button onClick={() => handleRemoveRepository(rep.id)}>Remover</button>
            </li>
          ))}

        </ul>

      </div>
    </div >
  );
}

export default App;
