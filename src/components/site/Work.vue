<script setup>
import CaseCard from './CaseCard.vue';
import also from '../../data/also.json';
</script>

<template>
  <section id="work" aria-labelledby="work-h">
    <div class="wrap">
      <div class="section-head"><span class="blaze" aria-hidden="true"></span><h2 id="work-h">Selected work</h2></div>
      <p class="section-intro">These projects represent some of the ways I've helped our team develop and maintain software. They include shared tools, updates to existing applications, and processes that support how we work together. Open a card for the details.</p>

      <div class="cards">
        <CaseCard
          num="01"
          title="Migrating a live micro-frontend platform to Vue 3"
          hook="Ten Vue 2 apps sharing one page, upgraded without pausing feature work."
          :tags="['Vue 3', 'single-spa', 'Migration', 'AI-assisted']"
        >
          <h4>The situation</h4>
          <p>RedX's lead-generation platform is about ten Vue 2 apps that share one page through single-spa micro-frontends. Vue 2 had reached end of life, and product work couldn't stop while we upgraded.</p>
          <h4>What I did</h4>
          <ul>
            <li>Rebuilt the design system on Vue 3 first, so every app had something to move onto.</li>
            <li>Upgraded the main application in two waves, then started the Vue 3 upgrade in eight of the micro-frontends.</li>
            <li>Tracked down a Safari-only failure caused by every app bundling its own copy of Vue, and moved the platform to one shared copy of Vue, Vue Router and Vuex.</li>
            <li>Documented each issue we ran into. The list grew to 68 entries and became the team's migration guide.</li>
            <li>Used AI agents for much of the code conversion. I reviewed their changes and wrote QA scripts so non-developers could test each app against production.</li>
          </ul>
          <h4>Outcome</h4>
          <p>Once the merge strategies were created the platform was live on Vue 3 in about one month, with no pause in feature work.</p>
          <p class="lesson">A large part of this work was making what I learned useful to the next migration. I documented the issues I encountered and how I resolved them so we had a starting point when updating further applications.</p>
        </CaseCard>

        <CaseCard
          num="02"
          title="Five years of one design system"
          hook="The shared Vue component library I started in 2021. All ten of our frontends use it."
          :tags="['Design systems', 'Vue', 'Storybook', 'Accessibility']"
        >
          <h4>The situation</h4>
          <p>When I joined RedX, each application had its own UI components. I saw an opportunity to create a shared library that we could maintain together and use across our applications.</p>
          <h4>What I did</h4>
          <ul>
            <li>Started the shared Vue component library and its Storybook docs two months after joining, and have maintained it since.</li>
            <li>Grew it to 63 documented components, including dialogs, date pickers, a rich-text editor, and tree lists.</li>
            <li>In 2026, rebuilt it on Vue 3 with an updated visual style and better keyboard, focus, and contrast support, and wrote a migration guide for the team.</li>
          </ul>
          <h4>Prequel</h4>
          <p>This is my second design system. The first was a style guide I led at StateFoodSafety.</p>
          <p class="lesson">Maintaining the library has meant continuing to adapt it as our applications change. Along with building components, I've worked on documentation and conventions to help other developers understand how to use and contribute to it.</p>
        </CaseCard>

        <CaseCard
          num="03"
          title="A review and QA process for AI-assisted development"
          hook="Most of my team builds with AI, so I designed how that code gets checked before it's merged."
          :tags="['Tech lead', 'AI agents', 'Code review', 'Process']"
        >
          <h4>The situation</h4>
          <p>On a new product at RedX, members of our engineering, product, and design teams were building with their own AI assistants. I worked on creating a shared process for reviewing and testing those changes before they became part of the product.</p>
          <h4>What I did</h4>
          <ul>
            <li>Wrote shared instructions for separate AI roles (builder, reviewer, QA, and others) that the whole team uses.</li>
            <li>Code review starts by checking that the change does what was asked. QA runs the end-to-end tests and reports results against a specific commit.</li>
            <li>Prototypes are rebuilt from their design and intent, not copied into the product.</li>
            <li>Proposed a seven-step process from idea to production, with sign-off from product, design, and backend, and a log of product decisions.</li>
            <li>Made agent work faster and cheaper by running agents in parallel and keeping each one small.</li>
          </ul>
          <h4>Outcome</h4>
          <p>As acting technical lead, I shipped three major features in the first month. The shared instructions and review process are now part of how our team develops the product.</p>
        </CaseCard>

        <CaseCard
          num="04"
          title="AI research and fixes for new tickets"
          hook="An internal tool I built on my own that my team now uses."
          :tags="['Node', 'LLM agents', 'Guardrails', 'Automation']"
        >
          <h4>The situation</h4>
          <p>I built an internal tool to help with the research involved in picking up a new ticket. It looks through our codebases and provides an initial assessment that a developer can review before deciding how to move forward.</p>
          <h4>What I built</h4>
          <ul>
            <li>When a ticket is created, an AI agent researches it across our codebases without changing anything, and comments with the likely size, steps to reproduce, and a suggested fix.</li>
            <li>Once a developer approves, an agent makes the fix, runs the checks, and opens a merge request.</li>
            <li>Replies on the ticket can send it back for more research.</li>
            <li>Added limits on what it can run, timeouts, and a required approval before any code changes.</li>
          </ul>
          <h4>Outcome</h4>
          <p>It researched about 200 tickets in its first month and is now used by the team. Developers can ask it to investigate further through replies on the ticket, or approve it to work on a fix and open a merge request.</p>
        </CaseCard>
      </div>

      <div class="also">
        <h3>Also built along the way</h3>
        <ul>
          <li v-for="item in also" :key="item.text">
            {{ item.text }} <template v-if="item.note"><small>{{ item.note }}</small></template>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
