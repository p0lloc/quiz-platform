<script>
    import { points } from "../../service/player/player";

    $: correct = $points > 0;
</script>

<div
    class="min-h-screen text-white w-full {correct
        ? 'bg-green-500'
        : 'bg-red-600'} flex justify-center items-center"
>
    {#if correct}
    <div class="text-center">
        <h2 class="text-3xl font-bold">Correct!</h2>
        <p class="text-2xl">+ {$points} points</p>
        </div>
    {:else}
        <h2 class="text-3xl">Incorrect!</h2>
    {/if}
</div>
