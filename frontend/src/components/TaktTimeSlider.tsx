import { Box, Typography } from '@mui/material';
import Slider from '@mui/material/Slider';
import axios from 'axios';
import { SET_RATIO_URL } from './ApiURL';
import { InfoBoxContainer } from './InfoBoxContainer';

const marks = [
    {
        value: 0,
        label: 'Quick',
    },
    {
        value: 100,
        label: 'Slow',
    },
];

const valueLabelFormat = (value: number): string => {

    return `${(value * 2) / 100}`;
}




interface TaktTimeSliderProps {
    defaultValue: number
    actualTaktTime: number
}

export const TaktTimeSlider: React.FC<TaktTimeSliderProps> = ({ defaultValue, actualTaktTime }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const ratio = (Number(event.target.value) * 2) / 100;
        axios.get(`${SET_RATIO_URL}/${ratio}`).then(
            (response) => console.log(response.data)
        ).catch((error) => {
            console.log(error);
        });

    }
    return (
        <InfoBoxContainer>
            <Box sx={{ textAlign: "center", width: "5rem" }}>
                <Typography variant='h6'>T/T ({(actualTaktTime)})</Typography>
            </Box>
            <Slider
                sx={
                    {
                        color: "white",
                    }
                }
                onChange={handleChange}
                valueLabelFormat={valueLabelFormat}
                defaultValue={defaultValue * 50}
                step={0.5}
                marks={marks}
                valueLabelDisplay="auto"
            />
        </InfoBoxContainer>
    );
}