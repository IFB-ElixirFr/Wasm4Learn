<template>
  <v-card class="fill-height" style="width: 100%">
    <v-card-text
      class="fill-height overflow-y-auto"
      style="max-height: calc(100% - 50px)"
    >
      <div class="prose" id="contentDiv">
        <ContentRenderer :value="data" v-if="data" :key="data._path">
          <h1>{{ data.title }}</h1>
          <br />
          <ContentRendererMarkdown :value="data.body" />
        </ContentRenderer>
      </div>
    </v-card-text>
    <v-card-actions
      class="d-flex justify-end"
      style="background-color: lightsteelblue"
    >
      <v-btn :disabled="step == 0" @click="prevBtn">Prev</v-btn>

      <v-btn
        v-if="step != tutosList.length - 1"
        :disabled="step == tutosList.length - 1"
        @click="nextBtn"
        class="me-2"
        >Next</v-btn
      >

      <v-btn
        v-if="step == tutosList.length - 1"
        @click="finish"
        class="me-2 px-4"
        color="success"
        variant="flat"
        prepend-icon="mdi-party-popper"
        >Finish</v-btn
      >
      <v-btn @click="restart" class="me-2"><v-icon>mdi-restart</v-icon></v-btn>

      <v-btn
        class="bg-primary rounded-pill lighten-4 mx-4"
        variant="flat"
        href="https://github.com/IFB-ElixirFr/Wasm4Learn/discussions"
        target="_blank"
        >Help
      </v-btn>

      <v-btn
        @click.stop="drawer = !drawer"
        class="rounded-pill"
        variant="tonal"
      >
        {{ step + 1 }} / {{ tutosList.length }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { useStorage } from "@vueuse/core";

export default {
  async setup(props) {
    // Manage path and get language
    const route = useRoute();
    let lang = route.params.lang;
    const id = ref(route.query.id ? route.query.id : "");
    var step = ref(route.query.step ? route.query.step : 0);
    const pathParent = route.path;
    const path = route.path + id.value;

    // Get Tuto pages
    const tutosList = await queryContent(path).find();

    for (var i = tutosList.length - 1; i >= 0; i--) {
      if (
        tutosList[i]._path == path + "_dir" ||
        tutosList[i]._path == path + "/_dir"
      ) {
        tutosList.splice(i, 1);
      }
    }

    console.log(tutosList);
    const contentFolder = await queryContent("/" + lang).find();

    return {
      contentFolder,
      tutosList,
      pathParent,
      path,
      id,
      step,
      lang,
    };
  },
  mounted() {
    const theDefault = {};
    const state = useStorage("my-progression-store", theDefault, localStorage, {
      mergeDefaults: true,
    });

    if (this.path in state.value) {
      this.step = state.value[this.path].step;
    } else {
      state.value[this.path] = { status: "started", step: 0 };
    }

    this.data = this.tutosList[this.step];
  },
  data() {
    return {
      data: "",
    };
  },
  methods: {
    async updateState() {
      const theDefault = {};
      const state = useStorage(
        "my-progression-store",
        theDefault,
        localStorage,
        {
          mergeDefaults: true,
        }
      );
      state.value[this.path] = { status: "started", step: this.step };
    },
    restart() {
      this.step = 0;
      this.data = this.tutosList[this.step];
      var myDiv = document.getElementById("contentDiv");
      myDiv.scrollTop = 0;
      this.updateState();
    },
    async nextBtn() {
      if (this.step < this.tutosList.length) {
        this.step = this.step + 1;
        this.data = this.tutosList[this.step];
        var myDiv = document.getElementById("contentDiv");
        myDiv.scrollTop = 0;
        this.updateState();
      }
    },
    async prevBtn() {
      if (this.step > 0) {
        this.step = this.step - 1;
        this.data = this.tutosList[this.step];
        var myDiv = document.getElementById("contentDiv");
        myDiv.scrollTop = 0;
        this.updateState();
      }
    },
    async finish() {
      const theDefault = {};
      const state = useStorage(
        "my-progression-store",
        theDefault,
        localStorage,
        {
          mergeDefaults: true,
        }
      );
      state.value[this.path] = { status: "finish", step: this.step };
      const router = useRouter();
      router.push({
        path: "/language/" + this.lang,
      });
    },
  },
  watch: {
    step(new_val) {
      const router = useRouter();
      router.push({
        path: this.pathParent,
        query: { id: this.id, step: this.step },
      });
    },
  },
};
</script>

<style>
.gutter {
  background-color: #eee;
  background-repeat: no-repeat;
  background-position: 50%;
}

.gutter.gutter-vertical {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=");
  cursor: row-resize;
}

p {
  margin-top: 10px;
  margin-bottom: 10px;
}

div.prose pre {
  border: solid gray 1px;
  padding: 5px;
}

div.prose a {
  color: black;
  text-decoration: none;
}

pre {
  overflow-x: auto !important;
  margin-bottom: 10px !important;
}
li {
  margin-left: 25px;
}
.math {
  font-family: Courier, monospace;
}

.code {
  font-family: monospace, monospace;
}

.error {
  color: red;
}

.command {
  color: blue;
}
</style>