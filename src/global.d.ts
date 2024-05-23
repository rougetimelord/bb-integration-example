type SuccessStatus = 'SUCCESS';
type ErrorStatus = 'ERROR';

// Messages that Blue Blocker sends us

interface ErrorMessage {
	status: ErrorStatus;
	message: string;
}

interface SuccessMessage {
	status: SuccessStatus;
	result: any;
}

interface UserMessage {
	action: 'check_twitter_user';
	data: {
		/**
		 * For more properties see the BlueBlockerUser interface in
		 * https://github.com/kheina-com/Blue-Blocker/blob/main/src/global.d.ts
		 */
		legacy: {
			normal_followers_count: number;
			friends_count: number;
		};
	};
	refid: number;
}

type Message = ErrorMessage | SuccessMessage | UserMessage;

// Messages that we respond with

interface ErrorResponse {
	status: ErrorStatus;
	message: any;
}

interface SuccessResponse {
	status: SuccessStatus;
	result: {
		block: boolean;
		reason?: string;
	};
}

type ResponseMessage = ErrorResponse | SuccessResponse;
