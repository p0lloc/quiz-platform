<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Button from "./Button.svelte";
    import type { Quiz } from "../model/quiz";
    import { push } from "svelte-spa-router";

    const dispatch = createEventDispatcher();

    export let quiz: Quiz;

    function host(){
        dispatch("host", quiz);
    }

    function edit() {
        push(`/edit/${quiz.id}`);
    }
</script>

<div class="flex justify-between items-center bg-white border p-4 rounded-xl">
    <p>{quiz.name}</p>
    <div class="flex gap-2 items-center">
        <Button on:click={host}>Host</Button>
        <Button on:click={edit}>Edit</Button>
    </div>
</div>