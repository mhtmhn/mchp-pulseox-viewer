<script>
  import { onMount } from 'svelte';
  import Panel from './lib/Panel.svelte';

  let panelHR; // Heart Rate
  let panelPO; // Pulse Oxygen
  let panelTP; // Temperature

  let idIntervalHR;
  let idIntervalPO;
  let idIntervalTP;

  let msIntervalHR = 1000;
  let msIntervalPO = 1000;
  let msIntervalTP = 1000;

  let test = 0;

  onMount(async () => {
    idIntervalHR = setInterval(cbIntervalHR, msIntervalHR);
    idIntervalPO = setInterval(cbIntervalPO, msIntervalPO);
    idIntervalTP = setInterval(cbIntervalTP, msIntervalTP);
  });

  function cbIntervalHR() {
    panelHR.updateData(test++);
  }

  function cbIntervalPO() {
    panelPO.updateData(test++);
  }

  function cbIntervalTP() {
    panelTP.updateData(test++);
  }
</script>

<main class="flex h-screen w-screen">
  <Panel label="Heart Rate" bind:this={panelHR} />
  <Panel label="Pulse Oxygen" bind:this={panelPO} />
  <Panel label="Temperature" bind:this={panelTP} />
</main>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
