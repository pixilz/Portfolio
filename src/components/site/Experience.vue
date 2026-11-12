<script setup>
import experience from '../../data/experience.json';
</script>

<template>
  <section id="experience" class="alt" aria-labelledby="exp-h">
    <div class="wrap">
      <div class="section-head"><span class="blaze" aria-hidden="true"></span><h2 id="exp-h">Experience</h2></div>
      <ol class="timeline">
        <li v-for="job in experience" :key="job.org">
          <span class="when">{{ job.when }}</span>
          <h3>{{ job.org }}<template v-if="job.orgNote">&#32;<small>{{ job.orgNote }}</small></template></h3>
          <p class="role">{{ job.role }}</p>
          <p>{{ job.summary }}</p>
          <ul class="tags" aria-label="Technologies">
            <li v-for="t in job.tech" :key="t">{{ t }}</li>
          </ul>
        </li>
      </ol>
    </div>
  </section>
</template>
