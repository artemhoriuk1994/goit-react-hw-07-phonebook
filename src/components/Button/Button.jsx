import { Button } from "./Button.styled";

const Btn = ({ type = 'button', name, onClick, children }) => {
    return <Button type={type} name={name} onClick={onClick}>{children}</Button>
}

export default Btn;