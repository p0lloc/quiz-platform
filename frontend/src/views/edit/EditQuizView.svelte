<script lang="ts">
    import Button from "../../lib/Button.svelte";
    import EditQuestion from "../../lib/edit/EditQuestion.svelte";
    import EditSidebar from "../../lib/edit/EditSidebar.svelte";
    import type { Quiz, QuizQuestion } from "../../model/quiz";
    import { apiService } from "../../service/api";

    export let params: Record<string, string>;

    let quiz: Quiz | null;
    let selectedQuestion: QuizQuestion | null = null;

    function onQuestionDelete() {
        if (quiz == null) return;
        quiz.questions = quiz.questions.filter(
            (q) => q.id != selectedQuestion?.id,
        );

        selectedQuestion = null;
    }

    (async function () {
        quiz = await apiService.getQuizById(params["quizId"]);
    })();
    
    async function save() {
        if (quiz == null) return;

        await apiService.saveQuiz(quiz.id, quiz);
    }
</script>

{#if quiz != null}
    <div class="bg-gray-100 w-full p-2 flex justify-end">
        <div class="flex gap-2">
            <input
                type="text"
                class="border rounded px-2"
                placeholder="Quiz name"
                bind:value={quiz.name}
            />
            <Button on:click={save}>Save</Button>
        </div>
    </div>
    <div class="flex">
        <EditSidebar bind:questions={quiz.questions} bind:selectedQuestion />
        {#if selectedQuestion != null}
            <EditQuestion
                on:delete={onQuestionDelete}
                on:change={() => quiz = quiz}
                bind:selectedQuestion
            />
        {/if}
    </div>
{:else}
    Quiz not found.
{/if}
