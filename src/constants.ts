const blueBlockerExtensionIds = {
	chrome: 'jgpjphkbfjhlbajmmcoknjjppoamhpmm',
	firefox: '{119be3f3-597c-4f6a-9caf-627ee431d374}',
	// Fill in your personal extension ID here if using a local version of BB
	localId: 'fgnjgiiccdmkcfknoaknbejmcdgndbhd',
};

const useLocalID = true;

export const logstr = '[Integration Example]';

export const blueBlockerId: string = useLocalID
	? blueBlockerExtensionIds.localId
	: typeof browser == 'undefined'
		? blueBlockerExtensionIds.chrome
		: blueBlockerExtensionIds.firefox;

export const api: typeof browser =
	typeof browser == 'undefined' ? ((<unknown>chrome) as typeof browser) : browser;

export const registerMessage = {
	action: 'register',
	name: 'Example Integration',
};

export const SuccessStatus: SuccessStatus = 'SUCCESS';
export const ErrorStatus: ErrorStatus = 'ERROR';
