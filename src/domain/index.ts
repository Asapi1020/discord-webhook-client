/**
 * embeds: Up to 10
 */
export interface Payload {
	content?: string;
	embeds?: Embed[];
	thread_name?: string;
	username?: string;
	avatar_url?: string;
}

/**
 * title: Up to 256 characters
 * description: Up to 4096 characters
 * fields: Up to 25
 * footer.text: Up to 2048 characters
 * author.name: Up to 256 characters
 */
export interface Embed {
	title?: string;
	description?: string;
	author?: {
		name: string;
		url?: string;
		icon_url?: string;
	};
	url?: string;
	thumbnail?: {
		url: string;
	};
	image?: {
		url: string;
	};
	color?: number;
	timestamp?: string;
	footer?: {
		text: string;
		icon_url?: string;
	},
	fields?: Field[];
}

/**
 * name: Up to 256 characters
 * value: Up to 2048 characters
 */
export interface Field {
	name: string;
	value: string;
	inline?: boolean;
}
