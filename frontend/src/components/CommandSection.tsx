import { InfoBoxContainer } from "./InfoBoxContainer"
import { CommandButton } from "./CommandButton"
import axios from "axios";
import { START_URL, STOP_URL } from "./ApiURL";


interface CommandSectionProps {
    currentState: string
}


export const CommandSection: React.FC<CommandSectionProps> = ({ currentState }) => {

    const GET_URL = currentState === "stop" ? START_URL : STOP_URL
    const buttonLabel = currentState === "stop" ? "START" : "STOP"

    const handleClick = () => {
        axios.get(GET_URL).then((response) => {
            console.log(response)
        })
            .catch((error) => console.log(error))
    }

    return <InfoBoxContainer>
        <CommandButton fontSize={"2rem"} label={buttonLabel} onClick={handleClick} />

    </InfoBoxContainer>
}