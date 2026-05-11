type PropsType = {
    title: string
}
export function Button({title}:PropsType){
        return <button>{title}</button>
}