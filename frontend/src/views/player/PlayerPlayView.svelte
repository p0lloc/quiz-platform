<script lang="ts">
    import { onMount } from "svelte";
    import QuizChoiceCard from "../../lib/play/QuizChoiceCard.svelte";
    import { COLORS } from "../../model/quiz";
    import type { PlayerGame } from "../../service/player/player";

    export let game: PlayerGame;
    let answered = false;

    function onClick(i: number) {
        game.answer(i);
        answered = true;
    }

    onMount(() => {
        answered = false;
    });
</script>

<div class="flex flex-wrap w-full min-h-screen">
    {#if !answered}
        {#each COLORS as color, i}
            <QuizChoiceCard {color}>
                <button class="h-full w-full" on:click={() => onClick(i)}
                    >X</button
                >
            </QuizChoiceCard>
        {/each}
    {:else}
        <div class="p-8">
            <p class="text-2xl">Lightning fast?</p>
        </div>
    {/if}
</div>
