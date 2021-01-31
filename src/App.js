import { useState } from "react";
import Filtros from "./componentes/Filtros";
import Playlists from "./componentes/Playlists";

function App() {
  const [dataPlaylists, setDataPlaylists] = useState([])

  return (
    <div>
      <h1>Playlists preferidas dos clientes</h1>
      <hr />
      <Filtros />
      <hr />
      <Playlists dados={dataPlaylists} />
    </div>
  );
}

export default App;
