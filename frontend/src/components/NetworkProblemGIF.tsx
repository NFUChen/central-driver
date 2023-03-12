import networkProblem from "../assets/running-sticker.gif"
import { Typography } from "@mui/material"

export const NetworkProblemGIF = () => {
    return (
        <>
            <img src={networkProblem} alt="network error" />
            <Typography sx={{ marginRight: "2rem", fontSize: "2rem" }}>
                網路錯誤，請確認網路狀態
            </Typography>
        </>
    )
}
