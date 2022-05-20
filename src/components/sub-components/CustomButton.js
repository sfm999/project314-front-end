import { Button } from "@mui/material";

const CustomButton = ({ text, onClick, size, type}) => {
  return (
    <Button
    size={size}
    variant="outlined"
    sx={{
      color: "black",
      border: "1px solid black",
      '&:hover': {
        backgroundColor: 'black',
        color: 'white',
        border: "none"
      },
      mb: 2,
    }}
    onClick={onClick}
    type={type ? type : ""}
    >{text}</Button>
  );
}

export default CustomButton;