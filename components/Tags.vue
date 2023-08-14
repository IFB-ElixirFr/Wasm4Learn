<template>
  <v-chip v-for="(t, kt) in tags" :key="kt" class="ma-1" size="small">
    {{ t }}
  </v-chip>
</template>

<script>
export default {
  props: {
    tags: Array,
  },
};
</script>

<style>
</style>