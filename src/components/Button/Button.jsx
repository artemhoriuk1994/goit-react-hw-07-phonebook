import { Button } from "./Button.styled";

const Btn = ({ type = 'button', name, onClick, children, disabled }) => {
    return <Button type={type} name={name} onClick={onClick} disabled={disabled}>{children}</Button>
}

export default Btn;