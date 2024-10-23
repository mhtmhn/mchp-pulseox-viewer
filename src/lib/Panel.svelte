<script>
  import { onMount } from 'svelte';
  import { SmoothieChart, TimeSeries } from 'smoothie';
  import resolveConfig from 'tailwindcss/resolveConfig';
  import tailwindConfig from './../../tailwind.config.js';

  let textColor;
  let textLight;
  let textDark;
  let chartStroke;
  let chartFill;

  let data = 0;
  let min = 0;
  let max = 0;
  let canvas;
  let chart;
  let series = new TimeSeries();

  export let label = 'Label';
  export let unit = 'Unit';
  export let theme;
  export let delay = 1000;
  export let fillChartBottom = false;
  export function updateData(value) {
    if (!isNaN(value)) {
      data = value;

      if (min === 0) min = data;
      if (data > max) max = data;
      if (data < min) min = data;

      var now = Date.now();
      series.append(now, data);
    }
  }

  onMount(async () => {
    const config = resolveConfig(tailwindConfig);
    chartStroke = {
      dark: config.theme.colors.dark[theme],
      light: config.theme.colors.light[theme],
    };
    chartFill = {
      dark: config.theme.colors.dark[theme] + (fillChartBottom ? '34' : '00'),
      light: config.theme.colors.light[theme] + (fillChartBottom ? '34' : '00'),
    };
    console.log(chartFill);
    switch (theme) {
      case 'red':
        textLight = 'text-light-red';
        textDark = 'text-dark-red';
        break;
      case 'green':
        textLight = 'text-light-green';
        textDark = 'text-dark-green';
        break;
      case 'blue':
        textLight = 'text-light-blue';
        textDark = 'text-dark-blue';
        break;
      case 'yellow':
        textLight = 'text-light-yellow';
        textDark = 'text-dark-yellow';
        break;
      default:
        textLight = 'text-black';
        textDark = 'text-white';
        break;
    }

    chart = new SmoothieChart({
      maxValueScale: 1.3,
      minValueScale: 1.3,
      millisPerPixel: 16,
      grid: {
        fillStyle: '#00000000',
        millisPerLine: 0,
        verticalSections: 0,
        borderVisible: false,
      },
      labels: {
        disabled: true,
      },
      tooltip: true,
      tooltipLine: {
        strokeStyle: '#bbbbbb',
      },
      responsive: true,
    });
    chart.addTimeSeries(series, {
      strokeStyle: chartStroke['dark'],
      fillStyle: chartFill['dark'],
      lineWidth: 3,
      interpolation: 'bezier',
    });
    chart.streamTo(canvas, delay);

    // Check for dark mode
    const dark_mode = matchMedia('(prefers-color-scheme: dark)');
    dark_mode.addEventListener('change', updateTheme);
    updateTheme(dark_mode);
  });

  function updateTheme(dark_mode) {
    let mode;
    if (dark_mode.matches) {
      mode = 'dark';
      textColor = textDark;
    } else {
      mode = 'light';
      textColor = textLight;
    }
    chart.seriesSet[0].options.strokeStyle = chartStroke[mode];
    chart.seriesSet[0].options.fillStyle = chartFill[mode];
  }
</script>

<div
  class="h-full w-full flex-row rounded-xl bg-gradient-to-b from-light-surface-2 dark:from-dark-surface-2"
>
  <div class="flex justify-between p-6">
    <div>
      <h1 class="text-xl font-medium {textColor}">{label}</h1>
      <h1 class="text-sm {textColor}">{unit}</h1>
      <div class="mt-4">
        <h1 class="text-xs {textColor}">{max}</h1>
        <h1 class="text-xs {textColor}">{min}</h1>
      </div>
    </div>
    <div>
      <h1 class="text-5xl font-extrabold {textColor}">{data}</h1>
    </div>
  </div>
  <canvas bind:this={canvas} class="md:h-42 h-[95px] w-full rounded-b-xl"
  ></canvas>
</div>

<style lang="postcss">
  :global(div.smoothie-chart-tooltip) {
    background: #2a2828c9;
    color: white;
    pointer-events: none;
    @apply m-5 rounded-md p-2 text-[0.6em];
  }
</style>
