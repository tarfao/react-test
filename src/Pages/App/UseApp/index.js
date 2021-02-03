import axios from 'axios';
import { useState } from 'react';
import { getToken } from '../../../componentes/utils';
import consts from '../../../consts';

function UseApp() {
    const [dataPlaylists, setDataPlaylists] = useState({ carregando: false })
    const [token, setToken] = useState('');

    //OBJETIVO: BUSCAR AS PLAYLISTS PREFERIDAS COM OS PARÂMETROS PADRÕES
    const getDataPlaylists = async () => {
        try {
            setDataPlaylists({ carregando: true }) //informando a aplicação que estamos buscando os dados
            //busco o token do spotify
            const access_token = await getToken();
            setToken(access_token)
            //faço a requisição inicial com base no token obtido
            const { data } = await axios.get(consts.url_dados, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            setDataPlaylists({ ...data, carregando: false });
        } catch (error) {
            setDataPlaylists({ carregando: false });
            setToken("");
            console.error(error);
        }
    }

    return {
        getDataPlaylists, token, setDataPlaylists, dataPlaylists, setToken
    }
}

export default UseApp;