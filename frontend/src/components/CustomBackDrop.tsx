import Backdrop from '@mui/material/Backdrop';


interface LoadingBackdropProps {
    isOpen: boolean
    component: React.ReactNode
}

export const CustomBackdrop: React.FC<LoadingBackdropProps> = ({ isOpen, component }) => {

    return (
        <Backdrop
            sx={{
                color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: "rgba(0, 0, 0, 0.9)"
            }}
            open={isOpen}
        >
            {component}
        </Backdrop>
    );
}