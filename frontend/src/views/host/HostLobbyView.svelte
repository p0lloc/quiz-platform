<script lang="ts">
    import Button from "../../lib/Button.svelte";
    import PlayerNameCard from "../../lib/lobby/PlayerNameCard.svelte";
    import { players, type HostGame, gameCode } from "../../service/host/host";

    export let game: HostGame;

    function start() {
        game.start();
    }
</script>

<div class="p-8 bg-purple-500 min-h-screen w-full">
    <div class="flex justify-end">
        <Button on:click={start}>Start game</Button>
    </div>
    <div class="text-center text-white">
        <h2 class="text-4xl">Join with game code</h2>
        <h2 class="text-6xl font-bold mt-4">{$gameCode}</h2>
    </div>
    <h2 class="mt-10 text-white text-4xl font-bold">
        Players ({$players.length})
    </h2>
    <div class="flex flex-wrap gap-2 mt-4">
        {#each $players as player (player.id)}
            <PlayerNameCard {player} />
        {:else}
            <p class="text-white">No players have joined yet</p>
        {/each}
    </div>
</div>
