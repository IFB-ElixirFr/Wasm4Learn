<template>
  <v-card color="green-lighten-5" class="my-5">
    <v-card-title><v-icon>mdi-head-question</v-icon> Exercice</v-card-title>
    <v-card-text>
      <p class="text-subtitle-1">{{ consigne }}</p>
      <p v-if="tips">
        <i>{{ tips }}</i>
      </p>
      <v-expansion-panels>
        <v-expansion-panel title="Solution">
          <v-expansion-panel-text>
            <pre><code>{{ solution.replace(/\n/g, "<br />") }}</code></pre>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: { consigne: String, solution: String, tips: String },
};
</script>

<style>
</style>