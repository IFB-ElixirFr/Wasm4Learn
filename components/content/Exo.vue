<template>
  <v-card color="green-lighten-5" class="my-5">
    <v-card-title><v-icon>mdi-head-question</v-icon> Exercice</v-card-title>
    <v-card-text>
      <p class="text-subtitle-1" v-html="$mdRenderer.render(consigne)"></p>
      <p v-if="tips">
        <i>{{ tips }}</i>
      </p>

      <Execute :command="code" :test="test"> </Execute>
      <br />

      <v-expansion-panels v-if="solution">
        <v-expansion-panel title="Solution">
          <v-expansion-panel-text>
            <Execute :readOnly="true" :command="solution"> </Execute>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    consigne: String,
    code: String,
    language: {
      default: "r",
      type: String,
    },
    solution: String,
    test: String,
    tips: String,
  },
};
</script>

<style>
</style>