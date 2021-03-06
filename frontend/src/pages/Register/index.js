import React, { useState } from 'react';
import { Link , useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Register() {

        // Serve para fazer a navegação através de uma função Javascript.
        const history = useHistory();

        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [whatsapp, setWhatsapp] = useState('');
        const [city, setCity] = useState('');
        const [uf, setUf] = useState('');

        async function handleRegister(e) {

            // Previne o comportanmento de reload da página.
            e.preventDefault();

            const data = {
                name,
                email,
                whatsapp,
                city,
                uf
            };

            try {

                const response = await api.post('ongs', data);

                // Quando utilizamos crase podemos passar uma variável dentro do texto.
                alert(`Seu ID de acesso: ${response.data.id}`);

                // Após cadastro, envia o usuário de volta para a tela de logon.
                history.push('/');


            } catch(err) {

                alert(`Erro no cadastro, tente novamente.` );

            }           

        }

        return (

            <div className="register-container">

                <div className="content">

                    <section>

                        <img src={ logoImg } alt=" Be The Hero "/>

                        <h1>Cadastro</h1>

                        <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                        <Link className="back-link"  to="/">

                            <FiArrowLeft size= {16} color="#E02041" />

                            Já tenho cadastro

                        </Link>

                    </section>
                    {/* Chama a função ao realizar o submit do formulário */}
                    <form onSubmit={ handleRegister }>
                        
                        <input 
                            placeholder="Nome da ONG" 
                            value={ name }
                            onChange={e => setName(e.target.value)}
                        />
                        <input 
                            type="email" 
                            placeholder="E-mail" 
                            value={ email }
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input 
                            placeholder="WhatsApp" 
                            value={ whatsapp }
                            onChange={e => setWhatsapp(e.target.value)}
                        />

                        <div className="input-group">

                           <input 
                            placeholder="Cidade"
                            value={ city }
                            onChange={e => setCity(e.target.value)}
                           />
                           <input 
                            placeholder="UF" 
                            style={{ width: 80 }}
                            value={ uf }
                            onChange={e => setUf(e.target.value)}
                           />

                        </div>

                        <button className="button" type="submit">Cadastrar</button>


                    </form>

                </div>

            </div>

        );


}