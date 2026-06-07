
type PropsType = {
    title: string
    onClick?: () => void
    disabled?: boolean
    className?:string
}

export const Button = ({ title, onClick, disabled,className }: PropsType) => {
    return (
        <button className={className} disabled={disabled}
            onClick={onClick}
        >{title}</button>
    )
}