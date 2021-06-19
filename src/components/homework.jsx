import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import '../styles/style.css'


const Homework = () => {
    const [personagens, setPersonagem] = useState([])
    const [busca, setBusca] = useState('')
    const [filtro, setFiltro] = useState([])

    useEffect(() => {
        const getData = async () => {
            const response = await Axios.get('https://rickandmortyapi.com/api/character')
            const data = await response.data.results
            setPersonagem(data)
        }
        getData()
    }, [])

    console.log(personagens)

    useEffect(()=>{
        setFiltro(
            personagens.filter(personagem => {
                return personagem.name.includes(busca)
            })
        )
    },[busca, personagens])


    return (
        <div>

            <input type="text" onChange={
                e => { setBusca(e.target.value) }
            } placeholder="Digite o nome do personagem" />
            <button>Procurar</button>

            {filtro.map(personagem => {
               return <div key={personagem.id} className="personagens">
                    <img src={personagem.image} alt={personagem.name} />
                    <h4>Nome: {personagem.name}</h4>
                    <p>Status: {personagem.status}</p>
                </div>
            })}

        </div>
    )
}


export default Homework
