import {
	ErrorStatus,
	SuccessStatus,
	api,
	blueBlockerId,
	logstr,
	registerMessage,
} from './constants';

api.runtime.onInstalled.addListener(details => {
	if (details.reason === 'install' || details.reason === 'update') {
		console.log(logstr, 'extension installed');
		sendIntegrationRequest();
	}
});

function sendIntegrationRequest() {
	console.log(logstr, 'sending message to blue blocker');
	// This is all you need to send
	api.runtime
		.sendMessage(blueBlockerId, registerMessage)
		.then(response => {
			if (response.status !== SuccessStatus) {
				console.error(
					logstr,
					'BlueBlocker ran into an error',
					(response as ErrorMessage).message,
				);
			}
		})
		.catch(e => {
			console.error(logstr, 'API error:', e);
		});
}

// Receive messages from Blue Blocker
api.runtime.onMessageExternal.addListener((m, s, r) => {
	let response: ResponseMessage;
	(async (message: UserMessage, sender) => {
		console.log(logstr, message.refid, 'recv:', message, sender);

		// Make sure to check you're getting messages from Blue Blocker
		if (sender.id !== blueBlockerId) {
			return (response = {
				status: ErrorStatus,
				message: "You aren't Blue Blocker!",
			} as ErrorResponse);
		}

		/**
		 * This should be the only action that Blue Blocker sends out as of
		 * v0.4.2, but other actions could be added at a later point */
		if (message.action === 'check_twitter_user') {
			if (
				message.data.legacy.friends_count == 0 &&
				message.data.legacy.normal_followers_count == 0
			) {
				/**
				 * Make sure you include a reason if you're blocking someone.
				 * It's not strictly necessary but it is nice for users.
				 */
				return (response = {
					status: SuccessStatus,
					result: {
						block: true,
						reason: 'User has no friends!',
					},
				} as SuccessResponse);
			} else {
				return (response = {
					status: SuccessStatus,
					result: {
						block: false,
					},
				} as SuccessResponse);
			}
		} else {
			console.error(logstr, 'unknown action:', message?.action);
			return (response = {
				status: ErrorStatus,
				message: 'Unknown action',
			} as ErrorResponse);
		}
	})(m, s)
		.catch(e => {
			console.error(logstr, 'unexpected error', e);
			response = {
				status: ErrorStatus,
				message: e,
			};
		})
		.finally(() => {
			console.log(logstr, 'response:', response);
			r(response);
		});
	return true;
});
