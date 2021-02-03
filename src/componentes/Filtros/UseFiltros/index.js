import axios from "axios";
import { useContext, useState } from "react";
import consts from "../../../consts";
import AppContext from "../../../Pages/App/AppContext";

function UseFiltros(setDataPlaylists) {
    const [values, setValues] = useState({})
    const [country, setCountry] = useState({});
    const [locale, setLocale] = useState({});
    const [limit, setLimit] = useState({});
    const [offset, setOffset] = useState({});
    const { token, setToken } = useContext(AppContext)

    //OBJETIVO: buscar com base nos dados inseridos nos filtros, como deve o endereço de chamada a API
    const getURI = (name, value) => new Promise(async (resolve, reject) => {
        try {
            let URI = consts.url_dados;
            const nameData = ['country', 'locale', 'limit', 'offset'];
            let interrogacaoAdd = false;
            await nameData.map(n => {
                if (n !== name && values[n]) {
                    if (interrogacaoAdd) {
                        URI = `${URI}&${n}=${values[n]}`
                    } else {
                        URI = `${URI}?${n}=${values[n]}`
                        interrogacaoAdd = true;
                    }
                }
            })
            if (value) {
                if (interrogacaoAdd) {
                    URI = `${URI}&${name}=${value}`
                } else {
                    URI = `${URI}?${name}=${value}`
                }
            }
            resolve(URI)
        } catch (error) {
            reject(error)
        }
    })

    //OBJETIVO: IDENTIFICAR CADA ALTERAÇÃO DE DADOS DOS FILTROS
    const handleChange = async e => {
        try {
            const { value, name } = e.target;
            setValues({ ...values, [name]: value });
            setDataPlaylists({ carregando: true })
            const URI = await getURI(name, value)
            const { data } = await axios.get(URI, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setDataPlaylists({ ...data, carregando: false });
        } catch (error) {
            setDataPlaylists({ carregando: false })
            console.error(error);
            alert(error.response.data.error.message)
        }
    }

    //OBJETIVO: BUSCAR AS INFORMAÇÕES DOS FILTROS DE ENTRADA
    const getFiltros = async () => {
        try {
            const { data } = await axios.get(consts.url_filtros);
            const locales = data.filters.find(f => f.id === 'locale');
            const countrys = data.filters.find(f => f.id === 'country');
            const limits = data.filters.find(f => f.id === 'limit');
            const offsets = data.filters.find(f => f.id === 'offset');
            setValues({
                [locales.id]: '',
                [countrys.id]: '',
                [limits.id]: '',
                [offsets.id]: ''
            })
            setLocale(locales);
            setCountry(countrys);
            setLimit(limits);
            setOffset(offsets);
        } catch (error) {
            console.error(error);
        }
    }

    return {
        getFiltros, token, getURI, values, country, offset, handleChange,
        locale, limit, setToken
    }
}

export default UseFiltros;