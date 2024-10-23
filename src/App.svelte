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

  // Generate test data
  function test(max) {
    return Math.round(Math.random() * max);
  }

  // Update heart rate
  function cbIntervalHR() {
    panelHR.updateData(test(200));
  }

  // Update SpO2
  function cbIntervalPO() {
    panelPO.updateData(test(150));
  }

  // Update temperature
  function cbIntervalTP() {
    panelTP.updateData(test(50));
  }

  function updateLogoTheme(dark_mode) {
    if (dark_mode.matches) {
      logo_img = '/icons/mchp-full-dark.svg';
    } else {
      logo_img = '/icons/mchp-full.svg';
    }
  }
</script>

<main class="w-full flex-row bg-light-primary dark:bg-dark-primary">
  <div
    class="flex h-10 w-full items-center justify-between rounded-b-xl bg-light-surface-1 dark:bg-dark-surface-1"
  >
    <div class="pl-4">
      <img class="aspect-auto w-24" src={logo_img} alt="Microchip Logo" />
    </div>
  </div>
  <div class="m-4 flex w-auto">
    <Panel
      label="SpO2"
      unit="%"
      theme="green"
      delay={msIntervalPO}
      fillChartBottom={true}
      bind:this={panelPO}
    />
  </div>
  <div class="m-4 md:flex">
    <div class="mb-4 md:mr-4 md:w-1/2">
      <Panel
        label="Heart Rate"
        unit="BPM"
        theme="red"
        delay={msIntervalHR}
        fillChartBottom={true}
        bind:this={panelHR}
      />
    </div>
    <div class="md:w-1/2">
      <Panel
        label="Temperature"
        unit="°C"
        theme="blue"
        delay={msIntervalTP}
        fillChartBottom={true}
        bind:this={panelTP}
      />
    </div>
  </div>
</main>

<style lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :global(:root) {
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :global(::-webkit-scrollbar) {
    width: 0.3rem;
    height: 0.3rem;
  }

  :global(::-webkit-scrollbar-track) {
    background: #b7b7b760;
  }

  :global(::-webkit-scrollbar-thumb) {
    background: #b7b7b7a0;
    border-radius: 0.375rem;
  }

  :global(::-webkit-scrollbar-thumb:hover) {
    background: #b7b7b7f0;
  }

  :global(::-webkit-scrollbar-corner) {
    background: #b7b7b7;
  }

  @media (prefers-color-scheme: dark) {
    :global(::-webkit-scrollbar-track) {
      background: #40404060;
    }

    :global(::-webkit-scrollbar-thumb) {
      background: #404040f0;
    }

    :global(::-webkit-scrollbar-thumb:hover) {
      background: #404040a0;
    }

    :global(::-webkit-scrollbar-corner) {
      background: #404040;
    }
  }
</style>
