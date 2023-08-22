<template>
  <v-sheet
    color="#0080bc"
    style="height: calc(100vh - 60px)"
    class="d-flex flex-wrap justify-center align-center"
  >
    <v-container class="pa-10 text-white text-center">
      <p class="title ma-10 text-h1">
        Wasm<span style="color: #cddd00">4</span>Learn
      </p>
      <p class="text-h5 mb-10">
        The French Institute of Bioinformatics (IFB) offers an interactive
        tutorial platform to introduce you to the first commands in different
        languages like R and Python. This website uses WASM technology (see
        <nuxt-link to="/resources/" style="color: white">ressources</nuxt-link
        >).
      </p>
      <img src="/logoWebRFB.svg" alt="" style="height: 200px" class="mb-10" />
      <div class="d-flex justify-center mb-6">
        <v-btn
          size="large"
          elevation="6"
          class="mx-3"
          href="https://ifb-elixirfr.github.io/Wasm4Learn-doc/"
          target="_blank"
          ><v-icon class="me-3">mdi-book</v-icon> Documentation</v-btn
        >
        <v-btn class="mx-3" size="large" elevation="6" href="#getStarted"
          ><v-icon class="me-3">mdi-play</v-icon> Get started</v-btn
        >
        <v-btn
          size="large"
          elevation="6"
          class="mx-3"
          href="https://github.com/IFB-ElixirFr/R_WASM/discussions"
          target="_blank"
        >
          <v-icon class="me-3">mdi-forum</v-icon>
          Feedbacks</v-btn
        >
      </div>
      <div class="scroll-down"></div>
    </v-container>
  </v-sheet>

  <v-sheet>
    <v-container class="pa-10 text-center">
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
          <p class="text-h4 text-center">
            <span style="color: #0080bc">No installation required</span> — run
            code from your browser
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" class="d-flex align-center justify-center">
          <p class="text-h4 text-center">
            Learn from the
            <span style="color: #0080bc">IFB GT e-formation</span>
          </p></v-col
        >
        <v-col>
          <v-sheet
            class="d-flex flex-wrap justify-center"
            style="background-color: transparent"
          >
            <v-sheet
              v-for="(i, k) in instructors"
              :key="k"
              class="ma-2 pa-4 rounded-lg"
              width="200px"
              elevation="6"
            >
              <v-avatar size="63">
                <img :src="i.image" height="63" alt=""
              /></v-avatar>
              <p>
                <b>{{ i.name }}</b>
              </p>
              <p>{{ i.role }}</p>
              <p>{{ i.location }}</p>
            </v-sheet>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          ><img src="/testSkills.png" alt="logo" style="max-width: 100%"
        /></v-col>
        <v-col cols="4" class="d-flex align-center justify-center">
          <p class="text-h4 text-center">
            <span style="color: #0080bc">Practice</span> your new knowledge
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
  <v-sheet style="background-color: #0080bc" id="getStarted">
    <v-container class="pa-10 text-white text-center">
      <p class="text-h3 ma-5">
        <span style="color: #cddd00">Learning path</span> design by trainers
      </p>
      <div v-for="(navel, key_navel) in navigation" :key="key_navel">
        <p class="text-h4">By {{  navel.title }}</p>
        <div class="d-flex flex-wrap justify-center">
          <v-card
            width="300px"
            class="ma-5 rounded-lg"
            v-for="(n, key) in navel.children"
            :key="key"
            @click="changePath(n._path)"
            elevation="5"
          >
            <v-card-text class="d-flex flex-column" style="height: 100%">
              <div class="text-center mb-10" v-if="'image' in n">
                <img :src="n.image" alt="logo" style="height: 100px" />
              </div>
              <h1>{{ n.title }}</h1>
              <br />
              <p class="text-subtitle-1">{{ n.description }}</p>
              <br />
              <v-spacer></v-spacer>
              <div v-if="n.children">
                <p v-for="(c, cKey) in n.children" :key="cKey">
                  <b>{{ c.title }}</b> : {{ getItems(c) }}
                </p>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-container>
  </v-sheet>

  <v-sheet>
    <v-container class="pa-10 text-center">
      <p class="text-h3 ma-5">
        <span style="color: #cddd00">Join</span> our community !
      </p>
      <p class="text-h5">
        Want to join our community? Create a new course? Or simply give us some
        feedback?
      </p>

      <v-btn
        size="large"
        class="ma-10"
        href="mailto:ifb-gt-eformation@groupes.france-bioinformatique.fr"
        >Send us an email !</v-btn
      >
    </v-container>
  </v-sheet>

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
          image: "./instructors/hc.png",
        },
        {
          name: "Thomas Denecker",
          role: "Research Engineer",
          location: "IFB, CNRS (Paris)",
          image: "./instructors/td.jpeg",
        },
        {
          name: "Lucie Khamvongsa Charbonnier",
          role: "Engineer",
          location: "IFB, CNRS (Marseille)",
          image: "./instructors/lkc.jpeg",
        },
        {
          name: "Pierre Poulain",
          role: "Associate Prof. ",
          location: "Université Paris Cité (Paris)",
          image: "./instructors/pp.jpeg",
        },
        {
          name: "Denis Puthier",
          role: "Prof",
          location: "Aix Marseille Université (Marseille)",
          image: "./instructors/dp.png",
        },
        {
          name: "Olivier Sand",
          role: "Research Engineer",
          location: "IFB/ELIXIR-FR Training Coordinator, CNRS (Lille)",
          image: "./instructors/os.jpeg",
        },
        {
          name: "Claire Toffano-Nioche",
          role: "Researcher",
          location: "CNRS (Gif-sur-Yvette)",
          image: "./instructors/ctn.jpeg",
        },
        {
          name: "Morgane Thomas-Chollier",
          role: "Associate Prof",
          location: "PSL University - Ecole normale supérieure (Paris)",
          image: "./instructors/mtc.jpeg",
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
html {
  scroll-behavior: smooth;
}

.title {
  font-family: "Open Sans Condensed" !important;
}

.scroll-down {
  position: absolute;
  left: 50%;
  top: calc(100vh - 60px);
  display: block;
  text-align: center;
  font-size: 20px;
  z-index: 100;
  text-decoration: none;
  text-shadow: 0;
  width: 13px;
  height: 13px;
  border-bottom: 2px solid #fff;
  border-right: 2px solid #fff;
  z-index: 9;
  left: 50%;
  -webkit-transform: translate(-50%, 0%) rotate(45deg);
  -moz-transform: translate(-50%, 0%) rotate(45deg);
  transform: translate(-50%, 0%) rotate(45deg);
  -webkit-animation: fade_move_down 4s ease-in-out infinite;
  -moz-animation: fade_move_down 4s ease-in-out infinite;
  animation: fade_move_down 4s ease-in-out infinite;
}

/*animated scroll arrow animation*/
@-webkit-keyframes fade_move_down {
  0% {
    -webkit-transform: translate(0, -10px) rotate(45deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    -webkit-transform: translate(0, 10px) rotate(45deg);
    opacity: 0;
  }
}
@-moz-keyframes fade_move_down {
  0% {
    -moz-transform: translate(0, -10px) rotate(45deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    -moz-transform: translate(0, 10px) rotate(45deg);
    opacity: 0;
  }
}
@keyframes fade_move_down {
  0% {
    transform: translate(0, -10px) rotate(45deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(0, 10px) rotate(45deg);
    opacity: 0;
  }
}
</style>