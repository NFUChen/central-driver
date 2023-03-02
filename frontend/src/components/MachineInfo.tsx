import { Box, Typography } from "@mui/material"
import { InfoBoxContainer } from "./InfoBoxContainer"

interface ColumInfoProps {
    label: string
    info: string
    color: string
    children?: React.ReactNode
}

interface TextProps {
    text: string
    color: string
    fontSize: string
}


const Text: React.FC<TextProps> = ({ fontSize, text, color }) => {
    return <Typography fontSize={fontSize} color={color}>{text}</Typography>
}

export const MachineInfo: React.FC<ColumInfoProps> = ({ label, info, color }) => {

    return (
        <InfoBoxContainer>
            <Text fontSize={"3rem"} text={label} color={color} />
            <Text fontSize={"5rem"} text={info} color={color} />
        </InfoBoxContainer>
    )

}