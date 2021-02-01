import axios from "axios";
import { useEffect, useState } from "react";
import Filtros from "./componentes/Filtros";
import Playlists from "./componentes/Playlists";
import consts from "./consts";

function App() {
  const [dataPlaylists, setDataPlaylists] = useState({})

  const getDataPlaylists = async () => {
    const { data } = await axios.get(consts.url_dados, {
      headers: {
        Authorization: `Bearer ${consts.token}`
      }
    })
    console.log(data);
    setDataPlaylists(data);
  }

  useEffect(() => {
    getDataPlaylists();
  }, [])

  return (
    <div>
      <h1>Playlists preferidas dos clientes</h1>
      <hr />
      <Filtros setDataPlaylists={setDataPlaylists}/>
      <hr />
      <Playlists dados={dataPlaylists} />
    </div>
  );
}

export default App;
