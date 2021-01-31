import { useEffect, useState } from 'react';
import axios from 'axios';
import FieldMui from '../FieldMui';
import './styles.css';

function Filtros() {
    const [values, setValues] = useState({})
    const [country, setCountry] = useState({});
    const [locale, setLocale] = useState({});
    const [limit, setLimit] = useState({});
    const [offset, setOffset] = useState({});

    const handleChange = e => {
        const { value, name } = e.target;
        setValues({ ...values, [name]: value });
    }

    const getFiltros = async () => {
        const { data } = await axios.get("http://www.mocky.io/v2/5a25fade2e0000213aa90776");
        console.log(data);
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
    }

    useEffect(() => {
        getFiltros();
    }, [])

    return (
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
    )
}

export default Filtros;