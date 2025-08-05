import { writeRoom } from '../utils/modifyJson.js';
import { parseMarkdown } from '../utils/parseMarkdown.js';
import type { TextChannel } from 'mezon-sdk/dist/cjs/mezon-client/structures/TextChannel.js';
import { Message } from 'mezon-sdk/dist/cjs/mezon-client/structures/Message.js';
import type { ChannelMessage } from 'mezon-sdk';
import { LotoGame } from '../game/loto.js';

export const joinRoom = async (channel: TextChannel, message: Message, event: ChannelMessage) => {
    const ref = event.references
    if(event && ref && ref.length > 0){
        const id = ref[0]!.content!.split(' ')[2];

        const loto = new LotoGame()
        const board = loto.startNewGame()

        const player = {
            id: event.sender_id,
            name: event.username,
            isWinner: false,
            board: board
        }

        console.log(player)

        const { updated, roomId } = writeRoom(id!, player);
        if (updated) {
            const msg = `🔥 **Phòng ${roomId}**`;
            await message.reply(parseMarkdown(msg));
        }
    }
    
}