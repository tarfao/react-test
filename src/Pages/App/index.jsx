import axios from "axios";
import { useEffect, useState } from "react";
import Filtros from "../../componentes/Filtros";
import Playlists from "../../componentes/Playlists";
import AppContext from './AppContext';
import UseApp from "./UseApp";

function App() {
  const { getDataPlaylists, token, setDataPlaylists, dataPlaylists } = UseApp();

  useEffect(() => {
    getDataPlaylists();
  }, [])

  return (
    <AppContext.Provider value={{ token }}>
      <h1>Playlis&shy;ts preferi&shy;das dos clientes</h1>
      <hr />
      <Filtros setDataPlaylists={setDataPlaylists} />
      <hr />
      <Playlists dados={dataPlaylists} />
    </AppContext.Provider>
  );
}

export default App;
