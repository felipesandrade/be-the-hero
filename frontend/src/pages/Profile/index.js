//useEffect - dispara uma funcao num determinado momento do componente.
import React, { useState, useEffect } from "react";
import logoImg from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import api from "../../services/api";
import "./styles.css";

export default function Profile() {

  const [incidents, setIncidents] = useState([]);

  // Buscando informações do Local History do navegador. 
  // Não necessita buscar informações no servidor para exibir na página. 
  const ongName = localStorage.getItem("ongName");
  const ongId = localStorage.getItem("ongId");

  const history = useHistory();

  // 1 parametro é a função que queremos executar
  // 2 parametro é quando a funcao será executada 
  useEffect(() => {
    api.get('profile', {
        // Passar a organizacao que esta logada. Pegando o ongid do Local History
        headers: { Authorization: ongId }
      })
      .then(response => { // Recebendo a resposta e armazenando dentro um estado através da função setIncidents para atualizar.
        setIncidents(response.data); // Data é o array de retorno do backend.
      });
  }, [ongId]);

  // Função responsável por deletar um caso.
  // É necessário passar o id para deleção.  
  async function handleDeleteIncident(id) {

    try {

      // Comunicação com a api de backend para deleção do incident passando o id.
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      // Faz a varredura no array de incidents, procura o que tem o id que foi deletado e remove ele da lista na tela.
      // Compara o id do incident deletado com a relacao de incidents existentes. 
      setIncidents(incidents.filter(incident => incident.id !== id));

    } catch (err) {

      alert("Erro ao deletar o caso");

    }
  }

  // Function para realizar o logout na aplicação.
  function handleLogout() {

    // Limpa os dados do localStorage.
    localStorage.clear();

    // Envio o usuário de volta para a página de logon.  
    history.push("/");

  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>

        <Link to="/incidents/new" className="button">
          Cadastrar novo caso
        </Link>

        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1> Casos cadastrados</h1>

      <ul>
        {/** Percorrendo os incidents com o map e retornando algo. */}
        {incidents.map(incident => (
          // Sempre que fizermos uma repetição no Javascript devemos colocar a propriedade key
          // É necessáro para identificar e facilitar possíveis alterações.
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {/** Formantando valores com a classe global Intl.NumberFormat */}
              {Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </p>

            <button
              type="button"
              onClick={() => handleDeleteIncident(incident.id)} // Deve ser feito dessa forma para que n ocorra delecao de todos os incidentes. Nesse caso estamos passando um funcao e n o retorno de uma funcao após execução.
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}