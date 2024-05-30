import type { Player, QuizQuestion } from "../model/quiz";

export enum PacketTypes {
    Connect,
    HostGame,
    QuestionShow,
    ChangeGameState,
    PlayerJoin,
    StartGame,
    Tick,
    Answer,
    PlayerReveal,
    Leaderboard,
    PlayerDisconnect
}

export enum GameState {
    Lobby,
    Play,
    Intermission,
    Reveal,
    End
}

export interface Packet {
    id: PacketTypes;
}

export interface HostGamePacket extends Packet {
    quizId: string;
}

export interface ChangeGameStatePacket extends Packet {
    state: GameState;
}

export interface PlayerJoinPacket extends Packet {
    player: Player;
}

export interface TickPacket extends Packet {
    tick: number;
}

export interface PlayerDisconnectPacket extends Packet {
    playerId: string;
}

export interface ConnectPacket extends Packet {
    code: string;
    name: string;
}

export interface QuestionShowPacket extends Packet {
    question: QuizQuestion;
}

export interface QuestionAnswerPacket extends Packet {
    question: number;
}

export interface PlayerRevealPacket extends Packet {
    points: number;
}

export interface LeaderboardEntry {
    name: string;
    points: number;
}

export interface LeaderboardPacket extends Packet {
    points: LeaderboardEntry[];
}

export class NetService {

    private webSocket!: WebSocket;
    private textDecoder: TextDecoder = new TextDecoder();
    private textEncoder: TextEncoder = new TextEncoder();

    private onPacketCallback?: (packet: any) => void;

    connect(){
        this.webSocket = new WebSocket("ws://localhost:3000/ws");
        this.webSocket.onopen = () => {
            console.log("opened connection");
        };

        this.webSocket.onmessage = async (event: MessageEvent) => {
            const arrayBuffer = await event.data.arrayBuffer();
            const bytes = new Uint8Array(arrayBuffer);  
            const packetId = bytes[0];

            const packet = JSON.parse(this.textDecoder.decode(bytes.subarray(1)));

            packet.id = packetId;

            console.log(packetId);
            console.log(packet);

            if(this.onPacketCallback)
                this.onPacketCallback(packet);
        }
    }

    onPacket(callback: (packet: Packet) => void){
        this.onPacketCallback = callback;
    }

    sendPacket(packet: Packet) {
		const packetId = packet.id;
		const packetData = JSON.stringify(packet, (key, value) =>
            key == "id" ? undefined : value
        );

		const packetIdArray = new Uint8Array([packetId]);
		const packetDataArray = this.textEncoder.encode(packetData);

		const mergedArray = new Uint8Array(
			packetIdArray.length + packetDataArray.length,
		);
		mergedArray.set(packetIdArray);
		mergedArray.set(packetDataArray, packetIdArray.length);

		this.webSocket.send(mergedArray);
	}

}