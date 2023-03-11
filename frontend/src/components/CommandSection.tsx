import { InfoBoxContainer } from "./InfoBoxContainer"
import { CustomButton } from "./CustomButton"
import axios from "axios";
import { SET_TAKT_TIME_URL, START_URL, STOP_URL } from "./ApiURL";

import { Stack } from "@mui/material";
import { useState } from "react";


interface CommandSectionProps {
    currentState: string
}

const createTaktTimeUrl = (taktTimeSeconds: number): string => {
    return `${SET_TAKT_TIME_URL}/${taktTimeSeconds}`
}


const callApi = (apiURL: string): void => {
    axios.get(apiURL).then((response) => {
        console.log(response)
    })
        .catch((error) => console.log(error))
}


export const CommandSection: React.FC<CommandSectionProps> = ({ currentState }) => {
    const isStop: boolean = currentState === "stop"
    const GET_URL = isStop ? START_URL : STOP_URL
    const buttonLabel = isStop ? "START" : "STOP"
    const buttonColor = isStop ? "lime" : "red"

    const handleClick = () => {
        callApi(GET_URL)
    }

    const partButtons = [
        {
            fontSize: "1rem",
            label: "Normal (18)",
            onClick: () => {
                callApi(createTaktTimeUrl(18))
            }

        },
        {
            fontSize: "1rem",
            label: "XX1 (29)",
            onClick: () => {
                callApi(createTaktTimeUrl(29))
            }
        }
    ]

    return (<>
        <Stack>
            {partButtons.map(
                ({ fontSize, label, onClick }, idx) => {
                    return <CustomButton key={idx} fontSize={fontSize} label={label} onClick={onClick} backgroundColor="white" />
                }
            )}
        </Stack>
        <InfoBoxContainer>
            <CustomButton fontSize={"2rem"} label={buttonLabel} onClick={handleClick} backgroundColor={buttonColor} />
        </InfoBoxContainer>
    </>)

}