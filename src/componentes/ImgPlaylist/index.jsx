import './styles.css'

function ImgPlaylist() {
    const click = () => {
        window.open('http://www.google.com', 'mywindow')
    }
    return (
        <div className='container-imagem-playlist' onClick={click}>
            <img width='400px' src="https://i.scdn.co/image/ab67706f00000003ec69f78942a99131ab104df5" alt="imagem" />
            <h3>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam voluptates impedit vitae fugiat</h3>
        </div>
    )
}

export default ImgPlaylist;