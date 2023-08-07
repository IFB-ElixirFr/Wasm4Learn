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
        <h1>Interactive tutorials with WASM</h1>
        <p class="text-subtitle-1 mb-6">
          The French Institute of Bioinformatics (IFB) offers a series of
          tutorials on the R and Python languages to introduce you to the first
          commands. This website uses WASM technology with the
          <a href="https://docs.r-wasm.org/webr/latest/">WebR</a> and
          <a href="https://pyodide.org/en/stable/">Pyodide</a>.
        </p>
        <div class="d-flex justify-center mb-6">
          <v-btn
            class="mx-3"
            href="https://ifb-elixirfr.github.io/Wasm4Learn-doc/"
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

  <h2>Available languages</h2>
  <div class="d-flex flex-wrap">
    <v-card
      width="300px"
      class="ma-5"
      v-for="(n, key) in navigation"
      :key="key"
      @click="changePath(n._path)"
    >
      <v-card-text>
        <div class="text-center">
          <img :src="n.image" alt="logo" style="height: 100px" />
        </div>
        <h1>{{ n.title }}</h1>
        <br />
        <p class="text-subtitle-1">{{ n.description }}</p>
        <br />

        <div v-if="n.children">
          <p v-for="(c, cKey) in n.children" :key="cKey">
            <b>{{ c.title }}</b> : {{ getItems(c) }}
          </p>
        </div>
      </v-card-text>
    </v-card>
  </div>

  <h2>Ressources</h2>
  <p>The teaching resources come from a course given by :</p>
  <ul>
    <li>
      Denis Puthier (member ofthe IFB's GT-eformation), available
      <a href="https://github.com/dputhier/rtrainer/tree/main">here</a>
    </li>
    <li>
      Thomas Denecker (member of the IFB's GT-eformation) available
      <a href="https://github.com/IFB-ElixirFr/EBAII_IntroR">here</a>
    </li>
  </ul>
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
    changePath(path) {
      const router = useRouter();
      router.push({ path: path + "/" });
    },
    getSection(n) {
      if (n.children !== undefined) {
        return n.children.length;
      } else {
        return 0;
      }
    },
    getItems(n) {
      var compt = 0;
      if (n.children !== undefined) {
        for (const c of n.children) {
          if (c.children !== undefined) {
            compt = compt + 1;
          }
        }
      }
      return compt;
    },
  },
};
</script>

<style>
</style>