import axios from "axios";
import { useEffect, useState } from "react";
import Filtros from "./componentes/Filtros";
import Playlists from "./componentes/Playlists";

function App() {
  const [dataPlaylists, setDataPlaylists] = useState({})

  const getDataPlaylists = async () => {
    const { data } = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
      headers: {
        Authorization: 'Bearer BQCyfPZt4jkyLV6LsXQpTbcPEPSJEL7dOUv1XiNR5LIdOk5ojegQNyjf1euzOiUroEMQltpkMCmyWL8WrjkZ_EKfceWZweksrth4mrDQzH9jj21T19-AF2gKxg-26TrqhyY6YP7_lSUNX1Q7v2yerA58Q_N5FELHQPjui28zsuV6ToOh54ktlLBrHxIfIScAlo0'
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
