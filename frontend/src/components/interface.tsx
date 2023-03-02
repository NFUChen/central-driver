
export interface ButtonProps {
    fontSize: string
    label: string
    isDisabled?: boolean
    backgroundColor: string
    onClick: () => void
}

export interface ButtonTextProps {
    label: string
    fontSize: string
}