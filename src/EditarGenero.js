import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const EditarGenero = ({match}) => {
  const [name, setName] = useState('')
  const [success, setSuccess] = useState(false)
  
  useEffect(() => {
    axios
      .get('/api/genres/' + match.params.id)
      .then(res => {
        setName(res.data.name)
      })
  }, [match.params.id])

  const onchange = evt => {
    setName(evt.target.value)
  }

  const save = () => {
    axios
    .put('/api/genres/' + match.params.id, {
      name
    })
    .then(res => {
      setSuccess(true)
    })
  }

  if(success){
    return <Redirect to='/generos' />
  }

  return (
    <div className='container'>
      <h1>Editar Genero</h1>

      <form>
        <div className='form-group'>
          <label for='name'>Nome</label>
          <input type='text' value={name} onChange={onchange} className='form-control' placeholder='Nome do genero' />
        </div>
        <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
      </form>
    </div>
  )
}

export default EditarGenero
