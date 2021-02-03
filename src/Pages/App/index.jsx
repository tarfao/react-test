import { useEffect } from "react";
import Filtros from "../../componentes/Filtros";
import Playlists from "../../componentes/Playlists";
import AppContext from './AppContext';
import UseApp from "./UseApp";

function App() {
  const { 
    getDataPlaylists, token, setDataPlaylists, dataPlaylists,
    setToken
  } = UseApp();

  useEffect(() => {
    getDataPlaylists();
  }, [])

  return (
    <AppContext.Provider value={{ token, setToken }}>
      <h1>Playlis&shy;ts preferi&shy;das dos clientes</h1>
      <hr />
      <Filtros setDataPlaylists={setDataPlaylists} />
      <hr />
      <Playlists dados={dataPlaylists} />
    </AppContext.Provider>
  );
}

export default App;
