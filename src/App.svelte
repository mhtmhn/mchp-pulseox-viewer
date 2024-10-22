<script>
  import { onMount } from 'svelte';
  import Panel from './lib/Panel.svelte';

  // Logo image
  let logo_img;

  // Panel objects
  let panelHR; // Heart Rate
  let panelPO; // Pulse Oxygen
  let panelTP; // Temperature

  // Interval IDs
  let idIntervalHR;
  let idIntervalPO;
  let idIntervalTP;

  // Interval durations
  let msIntervalHR = 1000;
  let msIntervalPO = 1000;
  let msIntervalTP = 1000;

  let test = 0;

  onMount(async () => {
    // Load custom fonts
    const font_ui = new FontFace('Inter', 'url(/fonts/Inter.woff2)', {
      display: 'block',
      style: 'normal',
      weight: '100 900',
    });
    font_ui.load();
    document.fonts.add(font_ui);

    // Set update intervals and callbacks
    idIntervalHR = setInterval(cbIntervalHR, msIntervalHR);
    idIntervalPO = setInterval(cbIntervalPO, msIntervalPO);
    idIntervalTP = setInterval(cbIntervalTP, msIntervalTP);

    // Check for dark mode
    const dark_mode = matchMedia('(prefers-color-scheme: dark)');
    dark_mode.addEventListener('change', updateLogoTheme);
    updateLogoTheme(dark_mode);
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

  function updateLogoTheme(dark_mode) {
    if (dark_mode.matches) {
      logo_img = '/icons/mchp-full-dark.svg';
    } else {
      logo_img = '/icons/mchp-full.svg';
    }
  }
</script>

<main
  class="bg-light-primary dark:bg-dark-primary w-[640px] flex-row sm:w-full"
>
  <div
    class="bg-light-surface-1 dark:bg-dark-surface-1 flex h-10 w-full items-center justify-between rounded-b-xl"
  >
    <div class="pl-4">
      <img class="aspect-auto w-24" src={logo_img} alt="Microchip Logo" />
    </div>
  </div>
  <div class="m-4 flex w-auto">
    <Panel label="SpO2" unit="%" theme="green" bind:this={panelPO} />
  </div>
  <div class="m-4 flex">
    <div class="mr-4 w-1/2">
      <Panel label="Heart Rate" unit="BPM" theme="red" bind:this={panelHR} />
    </div>
    <div class="w-1/2">
      <Panel label="Temperature" unit="°C" theme="blue" bind:this={panelTP} />
    </div>
  </div>
</main>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
