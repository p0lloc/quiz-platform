<script lang="ts">
    import Clock from "../../lib/Clock.svelte";
    import QuizChoiceCard from "../../lib/play/QuizChoiceCard.svelte";
    import { COLORS, type QuizChoice } from "../../model/quiz";
    import { type HostGame, tick, currentQuestion, state } from "../../service/host/host";
    import { GameState } from "../../service/net";

    function getCardColor(choice: QuizChoice, state: GameState, defaultColor: string){
        if(state != GameState.Reveal)
            return defaultColor;

        return choice.correct ? "bg-green-400" : "bg-red-400";
    }

    export let game: HostGame;
</script>

{#if $currentQuestion != null}
    <div class="min-h-screen h-screen flex flex-col">
        <div class="bg-white text-3xl border-b p-4 font-bold text-center">
            {$currentQuestion.name}
        </div>
        <div class="flex-1 flex flex-col justify-center pl-4">
            <div class="flex justify-between items-center">
                <Clock>
                    <span class="text-3xl">{$tick}</span>
                </Clock>
                <img
                    alt="center"
                    class="max-w-[500px]"
                />
                <div class="w-24"></div>
            </div>
        </div>
        <div class="flex flex-wrap w-full h-96">
            {#each COLORS as color, i}
                <QuizChoiceCard color={getCardColor($currentQuestion.choices[i], $state, color)}>
                    <p class="pl-14">{$currentQuestion.choices[i].name}</p>
                </QuizChoiceCard>
            {/each}
        </div>
    </div>
{/if}