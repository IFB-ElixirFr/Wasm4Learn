<template>
  <v-sheet color="#0080bc">
    <v-container class="pa-10 text-white text-center">
      <p class="text-h2 ma-10">Interactive tutorials with WASM</p>
      <p class="text-h5 mb-6">
        The French Institute of Bioinformatics (IFB) offers a series of
        tutorials on the R and Python languages to introduce you to the first
        commands. This website uses WASM technology (see
        <nuxt-link to="/resources/" style="color: white">ressources</nuxt-link
        >).
      </p>
      <img src="/logoWebRFB.svg" alt="" style="height: 200px" class="mb-6" />
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
    </v-container>
  </v-sheet>
  <div class="backgroundDiv">
    <v-sheet style="background-color: transparent">
      <v-container class="pa-10 text-center text-white">
        <p class="text-h3 ma-5">
          <span style="color: #cddd00">A turnkey</span> training site
        </p>
        <v-row>
          <v-col
            ><img
              src="/trainingArea.png"
              alt="logo"
              style="max-width: 100%"
              class="rounded elevation-4"
          /></v-col>
          <v-col cols="4" class="d-flex align-center justify-center">
            <p class="text-h5 text-center">
              No installation required — run code from your browser
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col >
            <v-sheet
              class="d-flex flex-wrap justify-center"
              style="background-color: transparent"
            >
              <v-sheet
                v-for="(i, k) in instructors"
                :key="k"
                class="ma-2 pa-2"
                width="200px"
                color="#e6f0f9"
                elevation='6'
              >
                <v-avatar icon="mdi-account" size="63"></v-avatar>
                <p><b>{{ i.name }}</b> </p>
                <p>{{ i.role }}</p>
                <p>{{ i.location }}</p>
              </v-sheet>
            </v-sheet>
          </v-col>
          <v-col cols="4" class="d-flex align-center justify-center">
            <p class="text-h5 text-center">
              Learn from the best instructors
            </p></v-col
          >
        </v-row>
        <v-row>
          <v-col
            ><img src="/testSkills.png" alt="logo" style="max-width: 100%"
          /></v-col>
          <v-col cols="4" class="d-flex align-center justify-center">
            <p class="text-h5 text-center">Practice and apply your skills</p>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <v-sheet style="background-color: transparent">
      <v-container class="pa-10 text-white text-center">
        <p class="text-h3 ma-5">
          <span style="color: #cddd00">Learning path</span> design by trainers
        </p>
        <h2>Available languages</h2>
        <div class="d-flex flex-wrap justify-center">
          <v-card
            width="300px"
            class="ma-5"
            v-for="(n, key) in navigation"
            :key="key"
            @click="changePath(n._path)"
            elevation="5"
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
      </v-container>
    </v-sheet>
  </div>
  <Footer />
</template>

<script>
definePageMeta({
  layout: "home",
});

export default {
  async setup(props) {
    const tutoFolder = await queryContent("/").find();
    const { data: navigation } = await useAsyncData("navigation", () =>
      fetchContentNavigation()
    );

    return { tutoFolder, navigation };
  },
  data() {
    return {
      instructors: [
        {
          name: "Hélène Chiapello",
          role: "Research Engineer",
          location: "IFB/ELIXIR-FR training coordinator, INRAE (Jouy-en-Josas)",
          image: "",
        },
        {
          name: "Thomas Denecker",
          role: "Research Engineer",
          location: "IFB, CNRS (Paris)",
          image: "",
        },
        {
          name: "Lucie Khamvongsa Charbonnier",
          role: "Engineer",
          location: "IFB, CNRS (Marseille)",
          image: "",
        },
        {
          name: "Pierre Poulain",
          role: "Associate Prof. ",
          location: "Université Paris Cité (Paris)",
          image: "",
        },
        {
          name: "Denis Puthier",
          role: "Prof",
          location: "Aix Marseille Université (Marseille)",
          image: "",
        },
        {
          name: "Olivier Sand",
          role: "Research Engineer",
          location: "IFB/ELIXIR-FR Training Coordinator, CNRS (Lille)",
          image: "",
        },
        {
          name: "Claire Toffano-Nioche",
          role: "Researcher",
          location: "CNRS (Gif-sur-Yvette)",
          image: "",
        },
        {
          name: "Morgane Thomas-Chollier",
          role: "Associate Prof",
          location: "PSL University - Ecole normale supérieure (Paris)",
          image: "",
        },
      ],
    };
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
.backgroundDiv {
  background: linear-gradient(135deg, #0080bc 80%, #e6f0f9 80%);
}

</style>