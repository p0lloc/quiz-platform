<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Button from "../../lib/Button.svelte";
    import type { PlayerGame } from "../../service/player/player";

    const dispatch = createEventDispatcher();

    let code: string = "";
    let name: string = "";
    export let game: PlayerGame;

    function join(){
        dispatch("join");
        game.join(code, name);
    }
</script>

<div class="bg-purple-400 min-h-screen w-full flex items-center justify-center">
    <div>
        <h2 class="text-white font-bold text-5xl text-center">Quiz</h2>
        <div class="flex flex-col gap-2 mt-10 items-center">
            <input bind:value={code} type="text" placeholder="Game code" class="p-2 rounded" />
            <input bind:value={name} type="text" placeholder="Name" class="p-2 rounded" />
            <Button on:click={join}>Join game</Button>
        </div>
    </div>
</div>
