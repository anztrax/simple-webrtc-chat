import React, {useRef} from 'react';
import Button from "./Button";

type MessageSenderProps = {
	onSendMessage: (value: string | undefined) => void,
	messages: string[]
}

let SendMessage:React.FunctionComponent<MessageSenderProps> = (props) => {
	const inputElementRef = useRef<HTMLInputElement>(null);

	return (
		<div className={'mt-8'}>
			<h1 className={'font-bold'}>Do Chatting</h1>
			<input
				type={'text'}
				ref={inputElementRef}
				className={'w-full border-gray-200 border-2 resize-none rounded'}
			/>
			<Button onClick={() => props.onSendMessage(inputElementRef.current?.value)}>
				Send Message
			</Button>
			<div className={'mt-4'}>
				<h1>Message List</h1>
				<ul className={'list-none'}>
					{props.messages.map((message, index) => {
						return (
							<li key={`message-${index}`}>
								<div className={'m-4'}>
									message = {message}
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

export default SendMessage;
