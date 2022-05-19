import { styled, TextField } from "@mui/material";

const CustomTextBox = ({ name, label, id, handleChange}) => {
  
  const TextBox = styled(TextField) ({
    '& input:valid + fieldset': {
        borderColor: '#c2c2c2',
        borderWidth: 2,
    },
    '& input:invalid + fieldset': {
        borderWidth: 2,
    },
    '& input:valid:focus + fieldset': {
        borderLeftWidth: 6,
        padding: '4px !important',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#c2c2c2',
        },
        '&:hover fieldset': {
            borderColor: '#f2f2f2',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#f2f2f2',
        },
      },
  });

  return (
    <TextBox
                margin="normal"
                required
                fullWidth
                name={name}
                label={label}
                type="text"
                id={id}
                onChange={handleChange}
                variant="outlined"           
            />
    );
}
 
export default CustomTextBox;