import React, { useState } from 'react';
// Componente utilizado para n precisar carregar a página inteira ao clicar no link.
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
// Importar o serviço responsável pela integração com o backend.
import api from '../../services/api';

export default function Logon() {

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {

        // Utilizamos em todo formulário para evitar redirect.
        e.preventDefault();

        try {

            const response = await api.post('sessions', { id });

            //console.log(response.data.name);

            // Salvar as informações no histórico do navegador.   
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');


        } catch(err) {

            alert('Falha no Login, tente novamente.');


        }


    }

    return (

           <div className="logon-container">

            <section className="form">

               <img src= { logoImg } alt="Be The Hero"/>
               
               <form onSubmit={ handleLogin }>

                <h1> Faça seu logon </h1>

                <input 
                    placeholder= "Sua ID" 
                    value={id}
                    onChange= { e => setId(e.target.value) } 
                />

                <button className="button" type="submit"> Entrar </button>

                <Link className="back-link"  to="/register">

                    <FiLogIn size= {16} color="#E02041" />

                    Não tenho cadastro

                </Link>

               </form>

            </section>

            <img src= { heroesImg } alt="H'ssseroes" />

           </div>

    );

}