import { writeRoom } from '../utils/modifyJson.js';
import { parseMarkdown } from '../utils/parseMarkdown.js';
import type { TextChannel } from 'mezon-sdk/dist/cjs/mezon-client/structures/TextChannel.js';
import { Message } from 'mezon-sdk/dist/cjs/mezon-client/structures/Message.js';

export const createRoom = async (channel: TextChannel, message: Message) => {
    const { updated, roomId } = writeRoom();
    if (updated) {
        const msg = `🔥 **Phòng ${roomId}**`;
        await message.reply(parseMarkdown(msg));
    }
}