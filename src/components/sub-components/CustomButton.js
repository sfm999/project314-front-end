import { Button } from "@mui/material";

const CustomButton = ({ text, onClick, size, type }) => {
  return (
    <Button
      size={size}
      variant="outlined"
      sx={{
        color: "black",
        border: "1px solid black",
        "&:hover": {
          backgroundColor: "black",
          color: "white",
          border: "1px solid black",
        },
      }}
      onClick={onClick}
      type={type ? type : ""}
      fullWidth
    >
      {text}
    </Button>
  );
};

export default CustomButton;
