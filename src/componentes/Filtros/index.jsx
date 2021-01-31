import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { useState } from 'react';
import FieldMui from '../FieldMui';
import './styles.css';

function Filtros() {
    const [values, setValues] = useState({
        country: '',
        locale: '',
        limit: '',
        offset: ''
    })

    const handleChange = e => {
        const { value, name } = e.target;
        setValues({ ...values, [name]: value });
    }

    return (
        <div className='container-filtros'>
            <FieldMui
                items={[{ label: "Brasil", value: "BR" }, { label: "Portugal", value: 'PT' }]}
                label="País"
                name='country'
                onChange={handleChange}
                value={values.country}
            />
            <FieldMui
                items={[{ label: "Brasileira", value: "pt_BR" }, { label: "Portugal", value: 'pt_PT' }]}
                label="Linguagem"
                name='locale'
                onChange={handleChange}
                value={values.locale}
            />
            <FieldMui
                label="Limite"
                name='limit'
                onChange={handleChange}
                value={values.limit}
                type="number"
            />
            <FieldMui
                label="Página"
                name='offset'
                onChange={handleChange}
                value={values.offset}
                type="number"
            />
        </div>
    )
}

export default Filtros;