<script lang="ts">
    import type { QuizQuestion } from "../../model/quiz";
    import Button from "../Button.svelte";
    import SidebarItem from "./SidebarItem.svelte";

    export let questions: QuizQuestion[];
    export let selectedQuestion: QuizQuestion | null;

    function addNew(){
        questions = [...questions, {
            id: crypto.randomUUID(),
            name: "Question",
            time: 60,
            choices: [
                {
                    id: crypto.randomUUID(),
                    name: "",
                    correct: false,
                },
                {
                    id: crypto.randomUUID(),
                    name: "",
                    correct: false,
                },
                {
                    id: crypto.randomUUID(),
                    name: "",
                    correct: false,
                },
                {
                    id: crypto.randomUUID(),
                    name: "",
                    correct: false,
                }
            ]
        }];
    }
</script>

<div class="bg-gray-100 min-h-screen min-w-64 p-2 flex flex-col gap-2">
    {#each questions as question}
        <SidebarItem {question} bind:selectedQuestion />
    {/each}
    <Button on:click={addNew}>
        Add new
    </Button>
</div>