<template>
  <v-footer style="background-color: gainsboro !important">
    <v-row justify="center" no-gutters>
      <v-btn variant="text" class="mx-2" rounded="xl" to="/"> Home </v-btn>
      <template v-for="(item, k) in items" :key="k">
        <v-btn
          v-if="item.type == 'external'"
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
          variant="text"
          class="mx-2"
          rounded="xl"
          :to="item.link"
        >
          {{ item.title }}
        </v-btn>
      </template>

      <v-col class="text-center mt-2" cols="12">
        <i>
          <template v-if="new Date().getFullYear() == 2023">
            {{ new Date().getFullYear() }}
          </template>
          <template v-else> 2023 - {{ new Date().getFullYear() }} </template>
          -
          <strong>
            <a
              href="https://www.france-bioinformatique.fr/en/about-ifb/"
              target="_blank"
              style="color: black !important; text-decoration: none;"
              >IFB</a
            >
          </strong>
          -
          <a :href="s.link" v-for="(s, k) in social" :key="k" target="_blank" class="mx-1" style="color: black !important;">
            <v-icon>{{ s.icon }}</v-icon>
          </a>
        </i>
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
      },
      {
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
    social: [
      {
        icon: "mdi-linkedin",
        link: "https://www.linkedin.com/company/institut-fran%C3%A7ais-de-bioinformatique/mycompany/",
      },
      {
        icon: "mdi-youtube",
        link: "https://www.youtube.com/channel/UC-PWpzAklKLdjxtdHnkoeCw",
      },
      {
        icon: "mdi-twitter",
        link: "https://twitter.com/IFB_Bioinfo",
      },
      {
        icon: "mdi-home",
        link: "https://www.france-bioinformatique.fr/en/home/",
      },
    ],
  }),
};
</script>

<style>
</style>