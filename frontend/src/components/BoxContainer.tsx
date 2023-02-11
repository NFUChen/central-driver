import { Box } from "@mui/material"

interface BoxContainerProps {
    children: React.ReactNode
}

export const BoxContainer: React.FC<BoxContainerProps> = ({ children }) => {

    return <Box sx={{
        minHeight: '100vh',
        minWidth: "100vw",
        backgroundColor: "black",
        color: "white"
    }}>
        {children}
    </Box>
}