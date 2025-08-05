import dotenv from "dotenv"
import { MezonClient } from "mezon-sdk"
import { createRoom } from "./src/commands/createRoom.js"
dotenv.config()

async function main() {
    const client = new MezonClient(process.env.APPLICATION_TOKEN)
    await client.login()

    client.onChannelMessage(async (event) => {
        const text = event?.content?.t?.toLowerCase(); // Lấy nội dung văn bản
        console.log(event)
        if (!text) return;

        const channel = await client.channels.fetch(event.channel_id);
        const message = await channel.messages.fetch(String(event.message_id));

        if (text.startsWith("*loto")) return createRoom(channel, message)
        //if (text.startsWith("*join")) return joinRoom(channel, message, event)
    })
}

main()
    .then(() => console.log("Bot is running"))
    .catch(console.error);