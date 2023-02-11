import { TextField, Typography, Box } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { SET_TAKT_TIME_URL } from "./ApiURL"

import { InfoBoxContainer } from "./InfoBoxContainer"



const TextFieldStyle = {
    input: { color: "white" },
    fieldset: { borderColor: "white" },
    color: "white",
    "& .MuiFormLabel-root": {
        color: "white",
    },
    "& .MuiFormLabel-root.Mui-focused": {
        color: "white",
    },
    "& .MuiOutlinedInput-root:hover": {
        "& > fieldset": {
            borderColor: "white",
        },
    },
}
interface TaktTimeTextFieldProps {
    defaultTaktTime: number
}


export const TaktTimeTextField: React.FC<TaktTimeTextFieldProps> = ({ defaultTaktTime }) => {

    const [taktTime, setTaktTime] = useState<number>(defaultTaktTime)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newTaktTime: string = event.target.value

        axios.get(`${SET_TAKT_TIME_URL}/${newTaktTime}`).then(
            (response) => {
                console.log(response);
                setTaktTime(Number(newTaktTime))
            }
        ).catch(
            (error) => console.log(error)
        )
    }
    return <InfoBoxContainer>
        <Box sx={{ textAlign: "center", padding: "1.5rem" }}>
            <Typography variant='h6'>T/T</Typography>
        </Box>
        <TextField
            sx={TextFieldStyle}
            label="Takt Time"
            fullWidth
            value={taktTime}
            onChange={handleChange}
        />
    </InfoBoxContainer>
}