<script setup>
// Pulled in at build time; Vite resolves the JSON import during the Astro build.
import markers from '../../data/markers.json';
</script>

<template>
  <div class="markers" id="at-a-glance">
    <ul class="wrap" aria-label="At a glance">
      <li v-for="m in markers" :key="m.label">
        <strong>{{ m.stat }}</strong><span>{{ m.label }}</span>
      </li>
    </ul>
  </div>
</template>
