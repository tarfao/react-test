import ImgPlaylist from '../ImgPlaylist';
import './styles.css'

function Playlists({ dados }) {
    return (
        <>
            {
                dados.message ?
                    (
                        <div className='container-playlists'>
                            <h2 className='message-spotify'>{dados.message}</h2>
                            <div className='container-playlist-albums'>
                                {
                                    dados.playlists.items.map((item, index) => (
                                        <ImgPlaylist item={item} key={index} />
                                    ))
                                }
                            </div>
                        </div>
                    ) :
                    (<h3>Nenhuma playlist encontrada!</h3>)
            }
        </>
    )
}

export default Playlists;