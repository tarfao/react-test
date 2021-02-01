import ImgPlaylist from '../ImgPlaylist';
import './styles.css'

function Playlists({ dados }) {
    return (
        <div className='container-playlist'>
            {
                dados.message ?
                    (
                        <div>
                            <h2>{dados.message}</h2>
                            <ImgPlaylist />
                        </div>
                    ) :
                    (<h3>Nenhuma playlist encontrada!</h3>)
            }
        </div>
    )
}

export default Playlists;