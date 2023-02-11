import { Button, Typography } from "@mui/material";



interface CommandButtonProps {
    fontSize: string
    label: string
    isDisabled?: boolean
    onClick: () => void
}

interface ButtonTextProps {
    label: string
    fontSize: string
}

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

export const CommandButton: React.FC<CommandButtonProps> = ({ fontSize, label, onClick, isDisabled }) => {

    const buttonStyle = {
        borderRadius: "1rem",
        color: "black",
        backgroundColor: (label === "STOP") ? "red" : "lime",
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
