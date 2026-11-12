<script setup>
// Case-study card shell. Styling and the <details> open/close animation all
// come from site.css; the case body is slotted in by Work.vue.
defineProps({
  num: { type: String, required: true },
  title: { type: String, required: true },
  hook: { type: String, required: true },
  tags: { type: Array, default: () => [] },
});
</script>

<template>
  <details class="card">
    <summary>
      <span class="num" aria-hidden="true">{{ num }}</span>
      <h3>{{ title }}</h3>
      <p class="hook">{{ hook }}</p>
      <ul v-if="tags.length" class="tags" aria-label="Topics">
        <li v-for="tag in tags" :key="tag">{{ tag }}</li>
      </ul>
      <span class="toggle-hint">Read the case study</span>
    </summary>
    <div class="body">
      <slot />
    </div>
  </details>
</template>
