import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// Importando o componente para criar a navegação. 
import { createStackNavigator } from '@react-navigation/stack';

import Incidents from './pages/Incidents';

import Detail  from './pages/Detail';


// Criando a primeira navegação.
const AppStack = createStackNavigator();


export default function Routes() {

    return (

        // Precisa ir por volta das nossas rotas.    
        <NavigationContainer>

            {/** Remove o cabeçalho da página. */}
            <AppStack.Navigator screenOptions={{ headerShown: false }} >

                {/* Deve ser usado para cada rota. 
                * Recebe as páginas da nossa aplicação
                */}
                <AppStack.Screen name="Incidents" component= { Incidents } />

                <AppStack.Screen name="Detail" component= { Detail } />

            </AppStack.Navigator>

        </NavigationContainer>

    );

}