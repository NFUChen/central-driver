import { Box } from "@mui/material"

interface InfoBoxContainerProps {
    children: React.ReactNode
}

export const InfoBoxContainer: React.FC<InfoBoxContainerProps> = ({ children }) => {
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "2rem",
            paddingRight: "1rem"
        }}>
            {children}
        </Box>
    )
}