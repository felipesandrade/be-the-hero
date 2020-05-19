//useEffect é uma função que será disparada quando variáveis que estão dentro do array mudarem.
import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import  { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

// Já importa a logo no melhor formato/tamanho.
import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {

    const [ incidents, setIncidents ] = useState([]);

    const [ total, setTotal ] = useState(0);

    //Controla o número da página no momento
    const [ page, setPage ] = useState(1);

    //Evita que os dados sejam buscados novamente
    const [ loading, setLoading] = useState(false);

    const navigation = useNavigation();

    // Função para realizar a navegação ao clicar no botão Detail 
    function navigateToDetail(incident) {

        //O parametro Detail foi passado no routes.js
        navigation.navigate('Detail', { incident });

    }

    async function loadIncidents() {

        //Evita q o sistema fique carregando a lista caso isso já esteja ocorrendo
        if(loading) {

            return;

        }

        //Evite q o sistema carregue a lista se todos os casos já foram carregados.    
        if(total > 0 && incidents.length == total) {

            return;

        }

        //Antes de iniciar o loading antera o status para true
        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        }); 

        //Anexar os novos casos de incidents ao invés de carregar tudo novamente.
        //Anexa vetores dentro de um único vetor
        setIncidents([... incidents, ... response.data]);
        setTotal(response.headers['x-total-count']);
        //Alterando as páginas a medida que o usuário solicita o loading
        setPage(page + 1);
        //Ao finalizar altera o status para false
        setLoading(false);

    }

    useEffect(() => {

        loadIncidents();

    }, []);

    return (

        <View style={styles.container}>

            <View style={styles.header}>

                <Image source={logoImg} />

                <Text style={styles.headerText}>

                    Total de <Text style={styles.headerTextBold}>{total} casos.</Text>

                </Text>

            </View>

           <Text style={styles.title}>Bem-vindo!</Text>

           <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList 
                data={incidents}
                style={styles.incidentList} 
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents} //Função disparada ao chegar no final da lista
                onEndReachedThreshold={0.2} //Quantos porcentos o usuario precisar estar para carregar novos itens
                renderItem={({ item: incident }) => (

                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                        
                            {Intl.NumberFormat('pt-BR', { 
                                style: 'currency', 
                                currency: 'BRL' 
                             }).format(incident.value)}
                        
                        </Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            // Chamando a função navigateToDetail. Sempre q for necessário passar parâmetro na função usar () =>
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View> 

                )}
           
            />

        </View>
    );

}