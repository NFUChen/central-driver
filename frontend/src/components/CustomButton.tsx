import { Button, Typography } from "@mui/material";
import { ButtonProps, ButtonTextProps } from "./interface"



const ButtonText: React.FC<ButtonTextProps> = ({ label, fontSize }) => {




    return (
        <Typography
            sx={{
                fontWeight: "bold",
                fontSize: fontSize,
            }}
        >
            {label}
        </Typography>
    )
}

export const CustomButton: React.FC<ButtonProps> = ({ fontSize, label, onClick, backgroundColor }) => {

    const buttonStyle = {
        borderRadius: "1rem",
        color: "black",
        backgroundColor: backgroundColor,
        padding: "1rem 11.6rem",
        margin: "0.3rem",
    }

    return (
        <Button
            style={buttonStyle}
            onClick={onClick}
            size="large"
            variant="contained"
            fullWidth
        >
            <ButtonText label={label} fontSize={fontSize} />
        </Button>
    );
};
