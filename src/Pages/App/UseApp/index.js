import axios from 'axios';
import qs from 'qs'
import { useState } from 'react';
import consts from '../../../consts';

function UseApp() {
    const [dataPlaylists, setDataPlaylists] = useState({ carregando: false })
    const [token, setToken] = useState('');

    //OBJETIVO: BUSCAR AS PLAYLISTS PREFERIDAS COM OS PARÂMETROS PADRÕES
    const getDataPlaylists = async () => {
        try {
            setDataPlaylists({ carregando: true }) //informando a aplicação que estamos buscando os dados
            //busco o token do spotify
            const dados_body = { grant_type: "client_credentials" }
            const { data: { access_token } } = await axios({
                method: 'POST',
                url: consts.url_token,
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${consts.auth_secret}` //autho para conseguir um novo token
                },
                data: qs.stringify(dados_body),
            })
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
        getDataPlaylists, token, setDataPlaylists, dataPlaylists
    }
}

export default UseApp;