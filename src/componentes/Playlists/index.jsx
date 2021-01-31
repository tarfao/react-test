import './styles.css'

function Playlists({ dados }) {
    return (
        <div className='container-playlist'>
            {dados.length > 0 ? (<h3>Playlists</h3>) : (<h3>Nenhuma playlist encontrada!</h3>)}
        </div>
    )
}

export default Playlists;