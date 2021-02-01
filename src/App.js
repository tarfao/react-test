import axios from "axios";
import { useEffect, useState } from "react";
import Filtros from "./componentes/Filtros";
import Playlists from "./componentes/Playlists";
import consts from "./consts";

function App() {
  const [dataPlaylists, setDataPlaylists] = useState({ carregando: false })

  const getDataPlaylists = async () => {
    try {
      setDataPlaylists({ carregando: true })
      const { data } = await axios.get(consts.url_dados, {
        headers: {
          Authorization: `Bearer ${consts.token}`
        }
      })
      setDataPlaylists({ ...data, carregando: false });
    } catch (error) {
      setDataPlaylists({ carregando: false })
      console.error(error);
    }
  }

  useEffect(() => {
    getDataPlaylists();
  }, [])

  return (
    <div>
      <h1>Playlists preferidas dos clientes</h1>
      <hr />
      <Filtros setDataPlaylists={setDataPlaylists} />
      <hr />
      <Playlists dados={dataPlaylists} />
    </div>
  );
}

export default App;
