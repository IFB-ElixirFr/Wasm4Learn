<template>
  <v-chip
    v-for="(b, kb) in belts"
    :key="kb"
    class="ma-1 rounded-sm"
    size="small"
    :variant="b == 'white' ? 'outlined' : 'tonal'"
    :color="b == 'white' ? '' : b"
  >
    {{ b }} belt
  </v-chip>
</template>

<script>
export default {
  props: {
    belts: Array,
  },
};
</script>

<style>
</style>