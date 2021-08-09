import React, {ButtonHTMLAttributes, SyntheticEvent} from 'react';

type ButtonProps = {
	onClick: (e: SyntheticEvent) => void
} & ButtonHTMLAttributes<HTMLButtonElement>

let Button:React.FunctionComponent<ButtonProps> = (props) => {
	const { className, ...rest } = props;
	return (
		<button
			{...rest}
			className={`bg-green-500 text-white py-2 px-4 rounded ${className}`}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}

export default Button;
