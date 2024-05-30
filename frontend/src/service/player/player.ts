import { writable, type Writable } from "svelte/store";
import { NetService, PacketTypes, type Packet, type ConnectPacket, GameState, type ChangeGameStatePacket, type QuestionAnswerPacket, type PlayerRevealPacket } from "../net";

export const state: Writable<GameState> = writable(GameState.Lobby);
export const points: Writable<number> = writable(0);

export class PlayerGame {
    private net: NetService;

    constructor(){
        this.net = new NetService();
        this.net.connect();
        this.net.onPacket(p => this.onPacket(p));
    }

    join(code: string, name: string){
        let packet: ConnectPacket = {
            id: PacketTypes.Connect,
            code: code,
            name: name,
        }

        this.net.sendPacket(packet);
    }

    answer(question: number){
        let packet: QuestionAnswerPacket = {
            id: PacketTypes.Answer,
            question: question
        };

        this.net.sendPacket(packet);
    }

    onPacket(packet: Packet){
        switch(packet.id){
            case PacketTypes.ChangeGameState:{
                let data = packet as ChangeGameStatePacket;
                state.set(data.state);
                break;
            }
            case PacketTypes.PlayerReveal:{
                let data = packet as PlayerRevealPacket;
                points.set(data.points);
                break;
            }
        }
    }
}