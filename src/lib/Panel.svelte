<script>
  import { onMount } from 'svelte';
  let data = 0;
  export let label = 'Label';
  export function updateData(value) {
    data = value;
  }
</script>

<h1 class="p-2 text-4xl text-indigo-500">{label} : {data}</h1>
