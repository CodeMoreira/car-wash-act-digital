import Primary from './primary';
import Secoundary from './secoundary';
import { DefaultButtonProps } from './types';

const types = {
    Primary,
    Secoundary
}

interface ButtonProps extends DefaultButtonProps {
    type: keyof typeof types
}

const Button = ({ type, ...props}: ButtonProps) => {
    const SelectedType = types[type]

    return <SelectedType {...props}/>
};

export default Button;
