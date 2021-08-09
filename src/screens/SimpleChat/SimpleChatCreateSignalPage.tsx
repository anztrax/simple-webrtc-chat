import React, {useEffect, useState} from 'react';
import SDPValue from "../../components/SimpleChat/SDPValue";
import SDPValueSetterTextArea from "../../components/SimpleChat/SDPValueSetterTextArea";
import MessageSender from "../../components/SimpleChat/MessageSender";

const config = {
	iceServers: [
		{
			"urls" : 'stun:stun.l.google.com:19302'
		}
	]
};
const lc = new RTCPeerConnection(config);
let SimpleChatCreateSignalPage = () => {
	const [ sdp, setSdp ] = useState<string | null>(null);
	const [ isConnectionOpen, setIsConnectionOpen ] = useState<boolean>(false);
	const [ messages, setMessages ] = useState<string[]>([]);
	const [ dc, setDc ] = useState<RTCDataChannel | null>(null);

	useEffect(() => {
		const dc = lc.createDataChannel('channel');
		dc.onmessage = (e) => {
			console.log('Just got a message ', e.data, messages, [...messages, e.data]);
			setMessages([...messages, e.data]);
		}
		dc.onopen = (e) => {
			if(!isConnectionOpen){
				console.log('Connection open');
				setIsConnectionOpen(true);
			}
		};
		lc.onicecandidate = (e) => {
			const sdpResult = JSON.stringify(lc.localDescription);
			setSdp(sdpResult);

			console.log('New Ice candidate! reprinting SDP', sdpResult);
		}
		lc.createOffer()
			.then((offer) => {
				return lc.setLocalDescription(offer)
			})
			.then(a => {
				console.log('set successfully!');
			});
		setDc(dc);
	}, [ messages, isConnectionOpen ]);

	const handleOnSetAnswer = (value: string) => {
		lc.setRemoteDescription(JSON.parse(value)).then(() => {
			console.log('already set answer SDP');
		});
	}

	const handleOnSendMessage = (message: string | undefined) => {
		dc?.send(message!);
		setMessages([...messages, message!]);
		console.log('message sent : ', message, messages);
	}

	return (
		<div>
			<SDPValue
				header={'SDP ( Session Description Protocol ) - Offer'}
				sdp={sdp!}
			/>
			<div className={'mt-4 mb-4'}>
				<SDPValueSetterTextArea
					header={`SDP ( Session Description Protocol ) - Answer`}
					onConnect={handleOnSetAnswer}
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

export default SimpleChatCreateSignalPage
