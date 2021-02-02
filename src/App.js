import axios from "axios";
import { useEffect, useState } from "react";
import Filtros from "./componentes/Filtros";
import Playlists from "./componentes/Playlists";
import consts from "./consts";
import AppContext from './AppContext';
import qs from 'qs'

function App() {
  const [dataPlaylists, setDataPlaylists] = useState({ carregando: false })
  const [token, setToken] = useState('');

  const getToken = async () => {
    try {
      const dados_body = { grant_type: "client_credentials" }
      const { data } = await axios({
        method: 'POST',
        url: consts.url_token,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${consts.auth_secret}` //autho para conseguir um novo token
        },
        data: qs.stringify(dados_body),
      })
      setToken(data.access_token)
      console.log(data)
    } catch (error) {
      console.error(error);
    }

  }

  const getDataPlaylists = async () => {
    try {
      setDataPlaylists({ carregando: true })
      const { data } = await axios.get(consts.url_dados, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setDataPlaylists({ ...data, carregando: false });
    } catch (error) {
      setDataPlaylists({ carregando: false })
      console.error(error);
    }
  }

  useEffect(() => {
    getToken()
    getDataPlaylists();
  }, [])

  return (
    <AppContext.Provider value={{ token }}>
      <h1>Playlists preferidas dos clientes</h1>
      <hr />
      <Filtros setDataPlaylists={setDataPlaylists} />
      <hr />
      <Playlists dados={dataPlaylists} />
    </AppContext.Provider>
  );
}

export default App;
