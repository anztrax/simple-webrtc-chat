import React, {SyntheticEvent} from 'react';

type ButtonProps = {
	onClick: (e: SyntheticEvent) => void
}

let Button:React.FunctionComponent<ButtonProps> = (props) => {
	return (
		<button
			className={'bg-green-500 text-white py-2 px-4 rounded'}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}

export default Button;
