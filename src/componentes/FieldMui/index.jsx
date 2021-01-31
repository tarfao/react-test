import { FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import './styles.css'

function FieldMui({
    name, value, onChange, items = [], label, type, error, messageError
}) {
    return (
        <div className='container-field'>
            {items.length > 0 ?
                (
                    <FormControl className='formcontrol'>
                        <InputLabel className='input-label'>{label}</InputLabel>
                        <Select
                            value={value}
                            name={name}
                            onChange={onChange}
                        >
                            {items.map((item, index) => (
                                <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ) :
                (
                    <FormControl className='formcontrol'>
                        <TextField 
                        error={error} 
                        value={value} 
                        name={name} 
                        type={type} 
                        label={label} 
                        onChange={onChange}
                        helperText={error ? messageError : ''}
                        />
                    </FormControl>
                )}
        </div>
    )
}

export default FieldMui;