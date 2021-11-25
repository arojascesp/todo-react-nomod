import React, { useState } from 'react'
import { nanoid } from 'nanoid';

const Todo = () => {
  const [tarea, setTarea] = useState('');
  const [lista, setLista] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState('');
  const [error, setError] = useState(null);


  const agregarTarea = e => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log('Error! esta vacio');
      setError('Escriba algo por favor...')
      return
    }
    console.log(tarea);

    setLista([...lista,
      {
      id: nanoid(5),
      text: tarea,
    }])
    setTarea('');
    setError(null);
  }

  const eliminarTarea = id => {
    console.log(id)
    setLista()
    const arrayFiltrado = lista.filter(item => item.id !== id);
    setLista(arrayFiltrado);
  }

  const editar = item => {
    console.log(item);
    setModoEdicion(true)
    setTarea(item.text);
    setId(item.id);
  }

  const editarTarea = e => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log('Elemento Vacio');
      setError('Escriba algo por favor...')
      return
    }

    const arrayEditado = lista.map(item => item.id === id ? ({id, text:tarea}) : item);
    setLista(arrayEditado);
    setTarea('');
    setId('');
    setModoEdicion(false);
    setError(null);
  }


  return (
    <div className="container-fluid mt-5">
      <h1 className="text-center ">CRUD Simple</h1>
      <hr className="mb-5" />
      <div className="row">

      
      <div className="col-8">
          <h4 className="text-center">
            {lista.length === 0 ? ('No hay Tareas') : ('Lista de Tareas')}
        </h4>
          <ul className="list-group">
            {
              lista.map(item => (
                  <li className="list-group-item" key={item.id}>
                  <span className="lead">{item.text}</span>
                  <button
                    className="btn btn-danger btn-sm float-end mx-2"
                    onClick={() => eliminarTarea(item.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning btn-sm float-end mx-2"
                    onClick={() => editar(item)}
                  >
                    Editar
                    </button>
                </li>
                )
              )
            }
        </ul>
      </div>
      <div className="col-4">
        <h4 className="text-center">
            {
              modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
            }
        </h4>
          <form className="form-group d-grid gap-2" onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            {error ? (<span className="text-danger">{error}</span> ) : ''}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese Tarea"
              onChange={e => setTarea(e.target.value)}
              value={tarea}
            />
            {
              modoEdicion ? (
                <button className="btn btn-warning btn-block" type="submit">Editar</button>
              ) : (<button className="btn btn-dark btn-block" type="submit">Agregar</button>)
            }
            
        </form>
      </div>
      </div>
    </div>
  )
}

export default Todo
