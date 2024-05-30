<script lang="ts">
    import type { QuizQuestion } from "../../model/quiz";

    export let question: QuizQuestion;
    export let selectedQuestion: QuizQuestion | null;

    function onClick() {
        selectedQuestion = question;
    }

    $: borderColor =
        selectedQuestion?.id == question.id ? "border-gray-500" : "";
</script>

<button
    class="bg-white rounded-md p-2 border {borderColor} hover:bg-gray-50"
    on:click={onClick}
>
    {question.name}
</button>

