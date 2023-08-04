<template>
  <v-footer class="bg-grey-lighten-1">
    <v-row justify="center" no-gutters>
      <v-btn color="white" variant="text" class="mx-2" rounded="xl" to="/">
        Home
      </v-btn>
      <v-btn
        v-for="(item, k) in items"
        :key="k"
        color="white"
        variant="text"
        class="mx-2"
        rounded="xl"
        :href="item.link"
        target="_blank"
      >
        {{ item.title }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>IFB</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        title: "About IFB",
        link: "https://www.france-bioinformatique.fr/en/about-ifb/",
      },
      {
        title: "Team e-formation",
        link: "https://www.france-bioinformatique.fr/en/e-learning/",
      },
      {
        title: "Feedbacks",
        link: "https://github.com/IFB-ElixirFr/Wasm4Learn/discussions",
      },
    ],
  }),
};
</script>

<style>
</style>