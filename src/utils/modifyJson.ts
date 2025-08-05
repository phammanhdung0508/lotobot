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

function loadData() {
    if (!fs.existsSync(filePath)) return {};
    const raw = fs.readFileSync(filePath);
    return JSON.parse(raw.toString());
}

function saveData(data: any) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function writeRoom(): { updated: boolean, roomId: string }
export function writeRoom(id: string, player: any): { updated: boolean, roomId: string }

export function writeRoom(id?: string, player?: any): { updated: boolean, roomId: string } {
    const data = loadData();
    const today = new Date().toISOString().slice(0, 10); // yyyy-mm-dd

    if (!id) {
        id = `room-${crypto.randomUUID()}`;
    }

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

    if (!player) {
        room.player.push(player);
        room.playerCount++;
        room.totalBet += 0//player.bet
    }

    data[id] = room;
    saveData(data);

    return { updated: true, roomId: room.id };
}