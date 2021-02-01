import ImgPlaylist from '../ImgPlaylist';
import './styles.css'

function Playlists({ dados }) {
    if (dados.carregando) {
        return (
            <h2 className='message-spotify'>Carregando...</h2>
        )
    } else {
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
                        (<h3 className='message-spotify'>Nenhuma playlist encontrada!</h3>)
                }
            </>
        )
    }
}

export default Playlists;