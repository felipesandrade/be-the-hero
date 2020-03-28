import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Logon from './pages/Logon';
import Register from './pages/Register'
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

export default function Routes() {

    return(
        
        <BrowserRouter>

            {/* Garante que apenas uma rota será executada por vez. */}
            <Switch>

                {/* Primeira rota da aplicação. Propriedade exact informa que o caminho tem que ser exato */}
                <Route path="/" exact component= { Logon } />

                {/* Rota para página register. */}
                <Route path="/register" component= { Register } />  

                <Route path="/profile" component= { Profile } />

                <Route path="/incidents/new" component= { NewIncident } />

            </Switch>
        
        </BrowserRouter>


    );


}