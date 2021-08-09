import React from 'react';

let HomePage = () => {
	return (
		<div>
			<div className={'bg-gray-200 p-4 m-4 rounded'}>
				<h1 className={'font-bold text-xl mb-4'}>Simple WebRTC chat</h1>
				<ul className={'list-none'}>
					<li>
						<a
							href={'/learn-webrtc/create-signal'}
							className={'text-blue-500 hover:text-blue-700'}
						>Create Signal</a>
					</li>
					<li>
						<a
							href={'/learn-webrtc/receive-signal'}
							className={'text-blue-500 hover:text-blue-700'}
						>Receive Signal</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default HomePage;
