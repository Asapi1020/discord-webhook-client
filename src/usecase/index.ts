import { Embed, Payload } from "../domain";

export const sendMessage = async (webhookUrl: string, payload: Payload): Promise<Response> => {
	const response = await fetch(webhookUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(validatePayload(payload)),
	});

	return response;
}

export const sendForumThreadMessage = async (webhookUrl: string, threadID: string, payload: Payload): Promise<Response> => {
	return await sendMessage(`${webhookUrl}?thread_id=${threadID}`, payload);
}

const validatePayload = (payload: Payload): Payload => {
	return {
		content: payload.content ? validateLength(payload.content, 2000) : undefined,
		embeds: payload.embeds ? payload.embeds.map(embed => validateEmbed(embed)) : undefined,
		thread_name: payload.thread_name,
		username: payload.username,
		avatar_url: payload.avatar_url,
	}
}

const validateEmbed = (embed: Embed): Embed => {
	return {
		title: embed.title ? validateLength(embed.title, 256) : undefined,
		description: embed.description ? validateLength(embed.description, 4096) : undefined,
		author: embed.author ? {
			name: validateLength(embed.author.name, 256),
			url: embed.author.url,
			icon_url: embed.author.icon_url,
		} : undefined,
		url: embed.url,
		thumbnail: embed.thumbnail,
		image: embed.image,
		color: embed.color,
		timestamp: embed.timestamp,
		footer: embed.footer ? {
			text: validateLength(embed.footer.text, 2048),
			icon_url: embed.footer.icon_url,
		} : undefined,
		fields: embed.fields
	}
}

const validateLength = (text: string, maxLength: number): string => {
	return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text;
};
