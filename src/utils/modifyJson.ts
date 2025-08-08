import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../datas/roomData.json');

const roomStatus = {
    CREATE: "create",
    PENDING: "pending",
    STARTED: "started",
    COMPLETED: "completed",
    CANCELLED: "cancelled"
}

function loadData(id: string) {
    if (!fs.existsSync(filePath)) return {};
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    if(id){
        return data
    }
    return data.find((obj: { id: string }) => obj.id === id)
}

function saveData(data: any) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function writeRoom(): { updated: boolean, roomId: string }
export function writeRoom(id: string, player: any): { updated: boolean, roomId: string }

export function writeRoom(id?: string, player?: object | null): { updated: boolean, roomId: string } {
    let data
    const today = new Date().toISOString().slice(0, 10); // yyyy-mm-dd

    if (!id) {
        data = loadData();
        id = `room-${crypto.randomUUID()}`;
    }else{
        data = loadData(id.substring(0, 41))
    }

    const cut = 
    console.log(cut)

    const room = data[id] || {
            id: id,
            createdAt: today,
            status: roomStatus.CREATE,
            totalBet: 0,
            winner: '',
            playerCount: 0,
            selectedNumber: [],
            player: []
        }

    if (room.status === roomStatus.PENDING) {
        return { updated: false, roomId: room.id }
    }

    if (player) {
        room.player.push(player);
        room.playerCount++;
        room.totalBet += 0 //player.bet
    }

    data[id] = room;
    saveData(data);

    return { updated: true, roomId: room.id };
}