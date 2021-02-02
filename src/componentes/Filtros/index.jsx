import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import FieldMui from '../FieldMui';
import AppContext from '../../AppContext';
import './styles.css';
import consts from '../../consts';

function Filtros({ setDataPlaylists }) {
    const [values, setValues] = useState({})
    const [country, setCountry] = useState({});
    const [locale, setLocale] = useState({});
    const [limit, setLimit] = useState({});
    const [offset, setOffset] = useState({});
    const { token } = useContext(AppContext)

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

    useEffect(() => {
        getFiltros();
    }, [])

    /*o useEffect sem o listen no token, nao consegue 
    obte-lo populado, e sem o values não consegue obter 
    os dados atuais de busca */
    useEffect(() => {
        if (token) {
            const interval = setInterval(async () => {
                try {
                    setDataPlaylists({ carregando: true });
                    const URI = await getURI();
                    const { data } = await axios.get(URI, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setDataPlaylists({ ...data, carregando: false });
                } catch (error) {
                    setDataPlaylists({ carregando: false })
                    console.error(error);
                }
            }, 30000)
            return () => clearInterval(interval)
        }
    }, [token, values])

    //como o offset eh populado por ultimo, eu valido se ele ja foi populado, para enfim renderizar os inputs
    return offset.id ? (
        <div className='container-filtros'>
            <FieldMui
                items={country.values}
                label={country.name}
                name={country.id}
                onChange={handleChange}
                value={values[country.id]}
            />
            <FieldMui
                items={locale.values}
                label={locale.name}
                name={locale.id}
                onChange={handleChange}
                value={values[locale.id]}
            />
            <FieldMui
                error={limit.validation && values[limit.id] !== '' ? values[limit.id] > limit.validation.max || values[limit.id] < limit.validation.min : false}
                label={limit.name}
                name={limit.id}
                onChange={handleChange}
                value={values[limit.id]}
                type="number"
                messageError={`Erro: Min: ${limit.validation ? limit.validation.min : 0} Max: ${limit.validation ? limit.validation.max : 1000}`}
            />
            <FieldMui
                label={offset.name}
                name={offset.id}
                onChange={handleChange}
                value={values[offset.id]}
                type="number"
            />
        </div>
    ) : (<h3>Carregando...</h3>)
}

export default Filtros;