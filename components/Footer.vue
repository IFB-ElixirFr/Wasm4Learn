<template>
  <v-footer class="bg-grey-lighten-1">
    <v-row justify="center" no-gutters>
      <v-btn color="white" variant="text" class="mx-2" rounded="xl" to="/">
        Home
      </v-btn>
      <template v-for="(item, k) in items" :key="k">
        <v-btn
          v-if="item.type == 'external'"
          color="white"
          variant="text"
          class="mx-2"
          rounded="xl"
          :href="item.link"
          target="_blank"
        >
          {{ item.title }}
        </v-btn>

        <v-btn
          v-if="item.type == 'internal'"
          color="white"
          variant="text"
          class="mx-2"
          rounded="xl"
          :to="item.link"
        >
          {{ item.title }}
        </v-btn>
      </template>

      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>
          <a
            href="https://www.france-bioinformatique.fr/en/about-ifb/"
            target="_blank"
            >IFB</a
          >
        </strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        title: "About",
        link: "/about/",
        type: "internal",
      },
      {
        title: "Resources",
        link: "/resources/",
        type: "internal",
      },{
        title: "Community",
        link: "/community/",
        type: "internal",
      },
      {
        title: "Team e-formation",
        link: "https://www.france-bioinformatique.fr/en/e-learning/",
        type: "external",
      },
      {
        title: "Feedbacks",
        link: "https://github.com/IFB-ElixirFr/Wasm4Learn/discussions",
        type: "external",
      },
    ],
  }),
};
</script>

<style>
</style>