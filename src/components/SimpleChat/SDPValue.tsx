import React from 'react';
import Button from "./Button";

type SDPValueType = {
	header: string,
	sdp : string
}

let SDPValue:React.FunctionComponent<SDPValueType> = (props) => {
	const renderValueContainer = () => {
		return (
			<div className={'p-4 bg-gray-200'}>
				<pre className={'whitespace-pre-wrap break-all'}>{props.sdp}</pre>
			</div>
		);
	}

	// handlers
	const handleOnCopy = () => {
		navigator.clipboard.writeText(props.sdp!).then(() => {
			console.log('copy sdp value success');
		});
	}

	return (
		<>
			<p className={'font-bold'}>{props.header}</p>
			{props.sdp
				? renderValueContainer()
				: (<div>Loading...</div>)
			}
			<Button
				onClick={() => handleOnCopy()}
			>
				Copy
			</Button>
		</>
	)
}

export default SDPValue;
