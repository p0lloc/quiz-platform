import { writable, type Writable } from "svelte/store";
import { NetService, PacketTypes, type Packet, type HostGamePacket, type PlayerJoinPacket, GameState, type ChangeGameStatePacket, type TickPacket, type QuestionShowPacket, type LeaderboardPacket, type LeaderboardEntry, type PlayerDisconnectPacket } from "../net";
import type { Player, QuizQuestion } from "../../model/quiz";

export const state: Writable<GameState> = writable(GameState.Lobby);
export const players: Writable<Player[]> = writable([]);
export const gameCode: Writable<string | null> = writable(null);
export const tick: Writable<number> = writable(0);
export const leaderboard: Writable<LeaderboardEntry[]> = writable([]);
export const currentQuestion: Writable<QuizQuestion | null> = writable(null);

export class HostGame {
    private net: NetService;

    constructor(){
        this.net = new NetService();
        this.net.connect();
        this.net.onPacket(p => this.onPacket(p));
    }

    hostQuiz(quizId: string){
        let packet: HostGamePacket = {
            id: PacketTypes.HostGame,
            quizId: quizId,
        }

        this.net.sendPacket(packet);
    }

    start(){
        this.net.sendPacket({ id: PacketTypes.StartGame });
    }

    onPacket(packet: Packet){
        switch(packet.id){
            case PacketTypes.HostGame: {
                let data = packet as HostGamePacket;
                gameCode.set(data.quizId);
            }
            
            case PacketTypes.ChangeGameState:{
                let data = packet as ChangeGameStatePacket;
                state.set(data.state);
                break;
            }
            case PacketTypes.PlayerJoin:{
                let data = packet as PlayerJoinPacket;
                console.log(data)
                players.update(p => [...p, data.player]);
                break;
            }

            case PacketTypes.Tick:{
                let data = packet as TickPacket;
                tick.set(data.tick);
                break;
            }

            case PacketTypes.QuestionShow:{
                let data = packet as QuestionShowPacket;
                currentQuestion.set(data.question);
                break;
            }
            case PacketTypes.Leaderboard:{
                let data = packet as LeaderboardPacket;
                leaderboard.set(data.points);
                break;
            }
            case PacketTypes.PlayerDisconnect: {
                let data = packet as PlayerDisconnectPacket;
                players.update(v => v.filter(p => p.id != data.playerId));
                break;
            }
        }
    }
}