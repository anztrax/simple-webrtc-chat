import React, {useRef} from 'react';
import Button from "./Button";

type SDPValueSetterTextAreaProps = {
	header: string,
	onConnect: (sdpValue: string) => void
}

let SDPValueSetterTextArea:React.FunctionComponent<SDPValueSetterTextAreaProps> = (props) => {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const handleOnClick = () => {
		props.onConnect(textAreaRef.current!.value);
	}

	return (
		<>
			<h1 className={'font-bold'}>{props.header}</h1>
			<div>
				<textarea
					ref={textAreaRef}
					rows={10}
					className={'w-full border-gray-200 border-2 resize-none rounded'}
				/>
			</div>
			<Button
				onClick={() => handleOnClick()}
			>
				Connect
			</Button>
		</>
	);
}

export default SDPValueSetterTextArea;
