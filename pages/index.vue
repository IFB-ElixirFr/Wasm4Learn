<template>
  <v-sheet
    class="bg-indigo-lighten-5 pa-6 rounded mb-10"
    elevation="6"
    style="min-height: 300px"
  >
    <v-row class="fill-height">
      <v-col
        align-self="center"
        class="text-center"
        xs="12"
        sm="12"
        md="12"
        lg="6"
      >
        <h1>Interactive R tutorials</h1>
        <p class="text-subtitle-1 mb-6">
          The French Institute of Bioinformatics (IFB) offers a series of
          tutorials on the R language to introduce you to the first commands.
          This website uses WASM technology through the
          <a href="https://docs.r-wasm.org/webr/latest/">WebR</a> tool. The
          teaching resources come from a course given by Denis Puthier (member
          of the IFB's GT-eformation), available
          <a href="https://github.com/dputhier/rtrainer/tree/main">here</a> .
        </p>
        <div class="d-flex justify-center mb-6">
          <v-btn
            class="mx-3"
            href="https://github.com/IFB-ElixirFr/R_WASM/blob/main/README.md"
            target="_blank"
            ><v-icon class="me-3">mdi-book</v-icon> Documentation</v-btn
          >
          <v-btn class="mx-3"
            ><v-icon class="me-3">mdi-play</v-icon> Get started</v-btn
          >
          <v-btn
            class="mx-3"
            href="https://github.com/IFB-ElixirFr/R_WASM/discussions"
            target="_blank"
          >
            <v-icon class="me-3">mdi-forum</v-icon>
            Feedbacks</v-btn
          >
        </div>
      </v-col>
      <v-col
        align-self="center"
        class="text-center"
        xs="12"
        sm="12"
        md="12"
        lg="6"
        ><img src="/logoWebRFB.svg" alt="" style="height: 200px"
      /></v-col>
    </v-row>
  </v-sheet>

  <div v-for="(n, key) in navigation" :key="key">
    <h1>{{ n.title }}</h1>
    <div class="d-flex flex-wrap">
      <v-card
        @click="changePath(n._path, c._dir)"
        v-for="(c, keyC) in n.children"
        :key="keyC"
        width="300px"
        class="ma-5"
      >
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
    </div>
  </div>
</template>

<script>
export default {
  async setup(props) {
    const tutoFolder = await queryContent("/").find();
    const { data: navigation } = await useAsyncData("navigation", () =>
      fetchContentNavigation()
    );
    return { tutoFolder, navigation };
  },
  methods: {
    changePath(pathParent, id) {
      const router = useRouter();
      console.log(pathParent + "/?id=" + id)
      
      router.push({ path: pathParent + "/", query: { id: id } });
    },
  },
};
</script>

<style>
</style>