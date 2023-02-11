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
}


const Text: React.FC<TextProps> = ({ text, color }) => {
    return <Typography fontSize={"5rem"} color={color}>{text}</Typography>
}

export const MachineInfo: React.FC<ColumInfoProps> = ({ label, info, color }) => {

    return (
        <InfoBoxContainer>
            <Text text={label} color={"white"} />
            <Text text={info} color={color} />
        </InfoBoxContainer>
    )

}