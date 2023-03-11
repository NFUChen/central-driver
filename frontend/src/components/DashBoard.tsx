import { useEffect, useState } from "react"
import axios from "axios"
import CircularProgress from '@mui/material/CircularProgress';

import { MachineInfo } from "./MachineInfo"
import { BoxContainer } from "./BoxContainer"
import { TaktTimeSlider } from "./TaktTimeSlider"
import { TaktTimeTextField } from "./TaktTimeTextField"
import { CommandSection } from "./CommandSection"
import { REPORT_URL } from "./ApiURL"
import { CustomBackdrop } from "./CustomBackDrop"
import { RestText } from "./RestText";
import { useFetch } from "./hooks/useFectch";

interface ItemsProps {
    label: string
    info: string
    color: string
}


interface InfoSectionProps {
    items: ItemsProps[]
}

const InfoSection: React.FC<InfoSectionProps> = ({ items }) => {

    return (<>
        {
            items.map(
                ({ label, info, color }) => <MachineInfo key={label} label={label} info={info} color={color} />)
        }
    </>)

}

interface ReportProps {
    target: number
    due_takt_time_seconds: number,
    config_takt_time_seconds: number
    actual_takt_time_seconds: number
    actual: number
    diff: number
    current_ratio: number
    current_state: string
    datetime: string
}

export const DashBoard = () => {

    const { response, isError, errorMessage, isLoading } = useFetch<ReportProps>(REPORT_URL, 0.5)
    const REST = "rest"
    const isRest = response.current_state !== REST

    let {
        target,
        current_state: currentState,
        due_takt_time_seconds: dueTaktTimeSeconds,
        actual,
        diff,
    } = response

    const stateColor = (currentState === "stop") || (diff < 0) ? "red" : "lime"

    const items = [
        {
            label: "Target (T/T)",
            info: `${target} (${dueTaktTimeSeconds})`,
            color: stateColor
        },
        {
            label: "Actual Number",
            info: `${actual}`,
            color: stateColor
        },
        {
            label: "Accumulation",
            info: `${diff}`,
            color: stateColor
        },
    ]



    const backDrops = [
        { isOpen: isLoading, component: < CircularProgress color="inherit" /> },
        { isOpen: isRest, component: <RestText /> }
    ]



    return (
        <>
            {
                backDrops.map(
                    ({ isOpen, component }, idx) => {
                        return <CustomBackdrop key={idx} isOpen={isOpen} component={component} />
                    }
                )
            }
            {isLoading || <BoxContainer>
                <InfoSection items={items} />
                <CommandSection currentState={currentState} />
            </BoxContainer>}

        </>

    )
}