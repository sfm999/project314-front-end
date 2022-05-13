import { Button } from "@mui/material";

const CustomButton = ({ text, onClick, size }) => {
  return (
    <Button
    type="submit"
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
    >{text}</Button>
  );
}

export default CustomButton;