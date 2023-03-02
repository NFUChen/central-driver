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

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isRest, setIsRest] = useState<boolean>(false)
    const [report, setReport] = useState<ReportProps>({})


    const REST = "rest"

    useEffect(() => {
        const interval = setInterval(() => {
            axios
                .get(REPORT_URL)
                .then((response) => {
                    const { data } = response
                    setReport(data)
                    setIsLoading(false)
                    if (data.current_state == REST) {
                        setIsRest(true)
                    } else {
                        setIsRest(false)
                    }

                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(true)
                });
        }, 200);

        return () => {
            clearInterval(interval);
        };
    }, []);


    let {
        target,
        current_state: currentState,
        due_takt_time_seconds: dueTaktTimeSeconds,
        config_takt_time_seconds: configTaktTimeSeconds,
        actual_takt_time_seconds: actualTaktTimeSeconds,
        current_ratio: currentRatio,
        actual,
        diff,
    } = report
    console.log(report);

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
                    ({ isOpen, component }) => {
                        return <CustomBackdrop isOpen={isOpen} component={component} />
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