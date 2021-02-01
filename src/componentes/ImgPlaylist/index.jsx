import './styles.css'

function ImgPlaylist({ item }) {
    const click = () => {
        window.open(`${item.external_urls.spotify}`, 'mywindow')
    }
    return (
        <div className='container-imagem-playlist' onClick={click}>
            <img width='400px' src={item.images[0].url} alt="imagem" />
            <div className='container-description'>
                <h3>{item.description}</h3>
            </div>
        </div>
    )
}

export default ImgPlaylist;