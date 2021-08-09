import React, {useEffect, useRef, useState} from 'react';
import SDPValue from "../../components/SimpleChat/SDPValue";
import SDPValueSetterTextArea from "../../components/SimpleChat/SDPValueSetterTextArea";
import MessageSender from "../../components/SimpleChat/MessageSender";

const rc = new RTCPeerConnection();
let SimpleChatReceiveSignalPage = () => {
	const [ answer, setAnswer ] = useState<string | null>(null);
	const [ channel, setChannel ] = useState<RTCDataChannel | null>(null);
	const [ isConnectionOpen, setIsConnectionOpen ] = useState<boolean>(false);
	const [ messages, setMessages ] = useState<string[]>([]);

	useEffect(() => {
		console.log('channel value : ', channel);
		if(channel != null) {
			channel.onmessage = (e) => {
				console.log(`new message from client : ${e.data}`);
				handleOnAddMessage(e.data);
				// setMessages([...messages, e.data]);
			}

		}
	}, [channel, messages]);

	// handlers
	const handleOnAddMessage = (message: string) => {
		setMessages([...messages, message]);
	}

	const onConnect = (sdpValue: string) => {
		rc.onicecandidate = e => {
			const localAnswer = JSON.stringify(rc.localDescription);
			console.log(`New ice candidate! reprinting SDP : ${localAnswer}`);
			setAnswer(localAnswer);
		}

		rc.ondatachannel = (e) => {
			// console.log('on data channel called !', e);
			const privateChannel = e.channel;
			privateChannel.onopen = (e) => {
				console.log('CONNECTION OPENED');
				setIsConnectionOpen(true);
			}
			if(channel == null){
				setChannel(privateChannel);
			}
		}
		rc.setRemoteDescription(JSON.parse(sdpValue!)).then(a => {
			console.log('offer set !');
		}).catch(e => {
			console.log('error when set remote description : ',e);
		});

		rc.createAnswer()
			.then(options => rc.setLocalDescription(options))
			.then(() => {
				console.log('answer created!');
			})
	}

	const handleOnSendMessage = (message: string | undefined) => {
		channel?.send(message!);
		setMessages([...messages, message!]);
		console.log('message sent : ', message);
	}

	return (
		<div>
			<div className={'my-4'}>
				<SDPValueSetterTextArea
					header={`SDP ( Session Description Protocol ) - Offer`}
					onConnect={onConnect}
				/>
			</div>
			<div className={'mt-4'}>
				<SDPValue
					header={'SDP ( Session Description Protocol ) - Answer'}
					sdp={answer!}
				/>
			</div>
			<div>
				{isConnectionOpen
					? (
						<MessageSender
							onSendMessage={handleOnSendMessage}
							messages={messages}
						/>
					)
					: null
				}
			</div>
		</div>
	);
}

export default SimpleChatReceiveSignalPage;
