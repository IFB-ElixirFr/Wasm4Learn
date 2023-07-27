<template>
  <div @click="action" class="pointer d-flex flex-row align-center">
    <v-icon color="green-darken-2" class="me-2">mdi-play</v-icon>
    <pre style="width: 100%;"><code>{{ command }}</code></pre>
  </div>
</template>

<script>
import { useCommandStore } from "@/stores/useCommandStore";

export default {
  props: { command: String },

  setup(props) {
    const store = useCommandStore();
    return { store };
  },
  methods: {
    action() {
      this.store.updateCommand(this.command.split("\n"));
    },
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
