import { useEffect, useState } from 'react';
import axios from 'axios';
import FieldMui from '../FieldMui';
import './styles.css';
import UseFiltros from './UseFiltros';
import { getToken } from '../utils';

function Filtros({ setDataPlaylists }) {
    const {
        getFiltros, token, getURI, values, country, offset, handleChange,
        locale, limit, setToken
    } = UseFiltros(setDataPlaylists);

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
                    if (error.response.data.error.message === "The access token expired") {
                        const access_token = await getToken();
                        setToken(access_token);
                    }
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