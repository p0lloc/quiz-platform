<script lang="ts">
    import Button from "../../lib/Button.svelte";
    import Leaderboard from "../../lib/Leaderboard.svelte";
    import { HostGame, leaderboard } from "../../service/host/host";

    export let game: HostGame;

    function skip() {
        game.start();
    }
</script>

<div class="bg-purple-500 min-h-screen w-full">
    <div class="flex justify-end p-8">
        <Button on:click={skip}>Skip</Button>
    </div>
    <div class="mt-20 flex justify-center">
        <Leaderboard leaderboard={$leaderboard} />
    </div>
</div>
