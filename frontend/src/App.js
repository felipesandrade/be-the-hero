import React from 'react';

import './global.css';

import Routes from './routes';

function App() { 

  return (

    <Routes />

  );
}

export default App;




/*
   Toda vez que o nosso componente precisar armazenar uma informação dentro dele devemos
   tilizar o conceito de estado. 
*/
/*   const [ counter, setCounter ] = useState(0);

  function increment() { 

   setCounter(counter + 1);

  } */

{/* <div>

  //Passando o parâmetro title.
  <Header title="Semana OmniStack"> 
  
    Semana OmniStack Children 

    Contador: { counter }

  </Header> 

  <button onClick={ increment }> Incrementar </button>

</div> */}
