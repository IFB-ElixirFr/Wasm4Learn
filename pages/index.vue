<template>
  <v-sheet
    class="bg-indigo-lighten-5 pa-6 rounded mb-10"
    elevation="6"
    style="height: 300px"
  >
    <v-row class="fill-height">
      <v-col align-self="center">
        <h1>Interactive R tutorials</h1>
        <p class="text-subtitle-1 mb-6">
          The French Institute of Bioinformatics offers a series of tutorials on
          the R language to introduce you to the first commands. This website
          uses WASM technology through the
          <a href="https://docs.r-wasm.org/webr/latest/">WebR</a> tool.
        </p>
        <div class="d-flex justify-center mb-6">
          <v-btn class="mx-3"><v-icon class="me-3">mdi-book</v-icon> Documentation</v-btn>
          <v-btn class="mx-3"><v-icon class="me-3">mdi-play</v-icon> Get started</v-btn>
          <v-btn class="mx-3"> <v-icon class="me-3">mdi-forum</v-icon> Feedbacks</v-btn>
        </div>
      </v-col>
      <v-col align-self="center" class="text-center"
        ><img src="/logoWebRFB.svg" alt="" style="height: 200px"
      /></v-col>
    </v-row>
  </v-sheet>

  <div v-for="(n, key) in navigation" :key="key">
    <h1>{{ n.title }}</h1>
    <v-col v-for="(c, keyC) in n.children" :key="keyC" cols="4">
      <v-card @click="changePath(c._path)">
        <v-card-title>{{ c.title }}</v-card-title>
        <v-card-text>
          <div v-if="c.tags">
            <v-chip
              v-for="(t, kt) in c.tags"
              :key="kt"
              class="ma-1"
              size="small"
            >
              {{ t }}
            </v-chip>
          </div>
          <p><b>Programme</b></p>
          <ul class="ms-4">
            <li v-for="(c2, keyC2) in c.children" :key="keyC2">
              {{ c2.title }}
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </v-col>
  </div>
  <nuxt-link to="/search">tes</nuxt-link>
</template>

<script>
export default {
  async setup(props) {
    const tutoFolder = await queryContent("tutorial").find();
    const { data: navigation } = await useAsyncData("navigation", () =>
      fetchContentNavigation()
    );
    return { tutoFolder, navigation };
  },
  methods: {
    changePath(path) {
      const router = useRouter();
      router.push({ path: path });
    },
  },
};
</script>

<style>
</style>