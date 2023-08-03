<template>
  <v-row class="fill-height">
    <v-col class="fill-height overflow-y-auto">
      <v-card class="fill-height">
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
            :disabled="step == tutosList.length - 1"
            @click="nextBtn"
            class="me-2"
            >Next</v-btn
          >
          <v-chip> {{ step + 1 }} / {{ tutosList.length }} </v-chip>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col class="fill-height">
      <div style="height: 50%">
        <v-card class="fill-height">
          <v-card-text
            class="fill-height overflow-y-auto overflow-x-auto"
            id="divConsole"
          >
            <pre><code id="out">Loading webR, please wait...</code></pre>
            <v-textarea
              v-on:keyup.enter="onEnter"
              v-model="command"
              variant="underlined"
              prepend-icon="mdi-chevron-right"
            ></v-textarea>
          </v-card-text>
        </v-card>
      </div>
      <div style="height: 50%">
        <v-card class="fill-height pa-2 mt-1">
          <v-tabs v-model="tab">
            <v-tab value="plot">Plot</v-tab>
            <v-tab value="editorTab">Editor</v-tab>
          </v-tabs>
          <v-card-text class="fill-height">
            <v-window v-model="tab" class="fill-height">
              <v-window-item value="plot" class="fill-height text-center">
                <canvas
                  id="plot-canvas"
                  width="1008"
                  height="1008"
                  style="margin: auto; height: calc(100% - 50px)"
                ></canvas>
              </v-window-item>
              <v-window-item value="editorTab" class="fill-height text-center">
                <Editor />
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>
  
<script>
import { Console } from "@r-wasm/webr";
import { useCommandStore } from "@/stores/useCommandStore";
import { storeToRefs } from "pinia";

export default {
  data() {
    return {
      command: "",
      data: "",
      path: null,
      shelter: null,
      tab: null,
      editorStarted: false,
      test: null,
    };
  },
  async setup() {
    // Manage path
    const route = useRoute();
    const id = ref(route.query.id ? route.query.id : "");
    var step = ref(route.query.step ? route.query.step : 0);
    const pathParent = route.path
    const path = route.path + id.value;

    // Manage store
    const store = useCommandStore();
    const { command } = storeToRefs(store);

    // Start WebR
    const webRConsole = new Console({
      stdout: (line) => document.getElementById("out").append(line + "\n"),
      stderr: (line) => document.getElementById("out").append(line + "\n"),
      prompt: (p) => document.getElementById("out").append(p),
      canvasExec: (line) => {
        eval(`document.getElementById("plot-canvas").getContext('2d').${line}`);
      },
    });

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

    return { webRConsole, tutosList, store, command, pathParent, id, step };
  },
  async mounted() {
    await this.webRConsole.run();
    this.data = this.tutosList[this.step];
  },
  methods: {
    async getOutput() {
      for (;;) {
        const output = await this.webR.read();
        switch (output.type) {
          case "stdout":
            this.stdout.push(output.data);
            break;
          case "stderr":
            this.stderr = this.srdout + output.data;
            break;
          default:
            console.warn(`Unhandled output type: ${output.type}.`);
        }
      }
    },
    async onEnter() {
      this.webRConsole.stdin(this.command);
      document.getElementById("out").append(this.command + "\n");
      this.command = "";
      var objDiv = document.getElementById("divConsole");
      objDiv.scrollTop = objDiv.scrollHeight;
    },
    async nextBtn() {
      if (this.step < this.tutosList.length) {
        this.step = this.step + 1;
        this.data = this.tutosList[this.step];
        var myDiv = document.getElementById("contentDiv");
        myDiv.scrollTop = 0;
      }
    },
    async prevBtn() {
      if (this.step > 0) {
        this.step = this.step - 1;
        this.data = this.tutosList[this.step];
        var myDiv = document.getElementById("contentDiv");
        myDiv.scrollTop = 0;
      }
    },
    async testCode(code) {
      this.test = null;
      const result = await this.webRConsole.webR
        .evalRBoolean(code)
        .then((res) => {
          return res;
        })
        .catch((error) => {
          return false;
        });

      this.test = result;
    },
  },
  watch: {
    async command(new_val) {
      if (this.store.changed) {
        for (const element of this.store.command) {
          this.webRConsole.stdin(element);
          document.getElementById("out").append(element + "\n");
        }
        this.store.reset();
        var objDiv = document.getElementById("divConsole");
        objDiv.scrollTop = objDiv.scrollHeight;
      } else if (this.store.changedTest) {
        for (const element of this.store.command) {
          await this.testCode(element);
          this.store.setResultTest(this.test);
        }
      }
    },
    step(new_val) {
      const router = useRouter();
      router.push({ path: this.pathParent , 
      query: { id: this.id, 
        step: this.step } });
    }
  },
};
</script>
  
<style>
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
</style>