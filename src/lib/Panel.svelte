<script>
  import { onMount } from 'svelte';
  let textColor;
  let textLight;
  let textDark;

  let data = 0;
  let min = 0;
  let max = 0;

  export let label = 'Label';
  export let unit = 'Unit';
  export let theme;
  export function updateData(value) {
    data = value;
    if (data > max) max = data;
    if (data < min) min = data;
  }

  onMount(async () => {
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

    // Check for dark mode
    const dark_mode = matchMedia('(prefers-color-scheme: dark)');
    dark_mode.addEventListener('change', updateTheme);
    updateTheme(dark_mode);
  });

  function updateTheme(dark_mode) {
    if (dark_mode.matches) {
      textColor = textDark;
    } else {
      textColor = textLight;
    }
  }
</script>

<div
  class="dark:from-dark-surface-2 from-light-surface-2 h-full w-full flex-row rounded-xl bg-gradient-to-b"
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
</div>
