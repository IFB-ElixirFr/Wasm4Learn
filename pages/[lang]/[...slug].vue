<template>
  <v-navigation-drawer
            :width="325"
            app
            v-model="drawer"
            absolute temporary
            location="right">
            <div v-for="(n, key) in navigation" :key="key">
              <div v-for="(section, sectionKey) in n.children" :key="sectionKey">
                <div v-for="(c, keyC) in section.children" :key="keyC">
                  <h3 class="text-black" style="margin-bottom: 2%; margin-left: 4%; margin-top: 4%;"> {{ c.title }}</h3>
                  <v-list>
                    <v-list-item
                    @click="changePath(section._path, c._dir)"
                    v-for="(c2, keyC2) in c.children" :key="keyC2">
                      <v-list-item-title style="margin-bottom: 2%; margin-left: 4%;">{{ c2.title }}</v-list-item-title>
                      <v-divider></v-divider>
                    </v-list-item>
                  </v-list>

                </div>
              </div>
            </div>
      </v-navigation-drawer>
  <v-row class="fill-height">
    <v-col class="fill-height overflow-y-auto">
      <v-card class="fill-height" >
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
            <v-btn class="bg-primary rounded-pill lighten-4 mx-4"
              variant="Flat"
              href="https://github.com/IFB-ElixirFr/Wasm4Learn/discussions"
              target="_blank">Help
            </v-btn>

            <v-btn
              @click.stop="drawer = !drawer"
              class="rounded-pill"
              variant="tonal"
              > {{ step + 1 }} / {{ tutosList.length }}
            </v-btn>

        </v-card-actions>
       
      </v-card>
    </v-col>
    <v-col class="fill-height">
      <div class="fill-height split" style="width: calc(100% - 10px)">
        <div id="split-0" style="height: 50%">
          <v-card class="fill-height">
            <v-card-text class="fill-height overflow-x-auto" id="divConsole">
              <pre><code id="out">Loading {{lang}} WASM environnement, please wait... <br></code></pre>
              <v-textarea
                v-on:keyup.enter="onEnter"
                v-model="command"
                variant="underlined"
                prepend-icon="mdi-chevron-right"
              ></v-textarea>
            </v-card-text>
          </v-card>
        </div>
        <div id="split-1" style="height: 50%">
          <v-card class="fill-height pa-2 mt-1">
            <v-tabs v-model="tab">
              <v-tab value="plot">Plot</v-tab>
              <v-tab value="editorTab">Editor</v-tab>
            </v-tabs>
            <v-card-text class="fill-height">
              <v-window v-model="tab" class="fill-height">
                <v-window-item value="plot" class="fill-height text-center">
                  <div
                    style="width: 100%; background-color: gainsboro"
                    class="text-left"
                  >
                    <v-btn
                      variant="text"
                      @click="changePlot('prev')"
                      icon="mdi-chevron-left"
                      size="x-small"
                    ></v-btn>
                    <v-btn
                      variant="text"
                      @click="changePlot('next')"
                      icon="mdi-chevron-right"
                      size="x-small"
                    ></v-btn>
                    <v-btn size="x-small" @click="saveCanvas">Save</v-btn>
                  </div>
                  <canvas
                    id="plot-canvas"
                    width="1008"
                    height="1008"
                    style="margin: auto; height: calc(100% - 50px)"
                  ></canvas>
                </v-window-item>
                <v-window-item
                  value="editorTab"
                  class="fill-height text-center"
                >
                  <Editor />
                </v-window-item>
              </v-window>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
  
<script>
import { Console } from "@r-wasm/webr";
import { useCommandStore } from "@/stores/useCommandStore";
import { storeToRefs } from "pinia";
import { getQuickJS } from "quickjs-emscripten";
import Split from "split.js";

let tempLineArray = [];

let logBackup = console.log;
let logMessages = [];

console.log = function () {
  logMessages.push.apply(logMessages, arguments);
  logBackup.apply(console, arguments);
};

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
      pyodide: null,
      pyodideLoaded: false,
      canvasArray: [],
      canvasPos: 0,
      drawer: null,
    };
  },
  async setup() {
    // Manage path and get language
    const route = useRoute();
    let lang = route.params.lang;
    const id = ref(route.query.id ? route.query.id : "");
    var step = ref(route.query.step ? route.query.step : 0);
    const pathParent = route.path;
    const path = route.path + id.value;

    // Manage store
    const store = useCommandStore();
    const { command } = storeToRefs(store);

    // Start WebR
    var webConsole;
    if (lang == "r") {
      webConsole = new Console({
        stdout: (line) => document.getElementById("out").append(line + "\n"),
        stderr: (line) => document.getElementById("out").append(line + "\n"),
        prompt: (p) => document.getElementById("out").append(p),
        canvasExec: (line) => {
          tempLineArray.push(line);
          eval(
            `document.getElementById("plot-canvas").getContext('2d').${line}`
          );
        },
      });
    } else if (lang == "js") {
      const QuickJS = await getQuickJS();
      webConsole = QuickJS.newContext();
    } else if (lang == "python") {
      webConsole = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/",
        stdout: (line) => document.getElementById("out").append(line + "\n"),
        stderr: (line) => document.getElementById("out").append(line + "\n"),
      });
    } else if (lang == "ruby") {
      const { DefaultRubyVM } = window["ruby-wasm-wasi"];
      // Fetch and instantiate WebAssembly binary
      const response = await fetch(
        //      Tips: Replace the binary with debug info if you want symbolicated stack trace.
        //      (only nightly release for now)
        //      "https://cdn.jsdelivr.net/npm/ruby-head-wasm-wasi@next/dist/ruby.debug+stdlib.wasm"
        "https://cdn.jsdelivr.net/npm/ruby-head-wasm-wasi@latest/dist/ruby.wasm"
      );
      const buffer = await response.arrayBuffer();
      const module = await WebAssembly.compile(buffer);
      const { vm } = await DefaultRubyVM(module);
      webConsole = vm;
    }

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

    const contentFolder = await queryContent("/" + lang).find();
    const { data: navigation } = await useAsyncData("navigation", () =>
      fetchContentNavigation("/" + lang)
    );

    return {
      contentFolder,
      navigation,
      webConsole,
      tutosList,
      store,
      command,
      pathParent,
      id,
      step,
      lang,
    };
  },
  async mounted() {
    if (this.lang == "python") {
      document.getElementById("out").innerHTML = "";
      this.webConsole.runPython(
        `
from pyodide.console import BANNER
print("Welcome to the Pyodide terminal emulator 🐍\\n" + BANNER)
        `
      );
    } else if (this.lang == "r") {
      await this.webConsole.run();
    } else if (this.lang == "ruby") {
      var pos = logMessages.length;

      this.webConsole.printVersion();
      var temp = logMessages;
      for (let i = pos; i < temp.length; i++) {
        document.getElementById("out").append(temp[i] + "\n");
      }
      temp = [];
    }

    this.data = this.tutosList[this.step];
    Split(["#split-0", "#split-1"], {
      direction: "vertical",
    });
  },
  methods: {
    changePath(pathParent, id) {
      const router = useRouter();
      router.push({ path: pathParent + "/", query: { id: id } });
    },
    changePlot(direction) {
      this.updateCanvas();
      if (direction == "next" && this.canvasPos + 1 < this.canvasArray.length) {
        this.canvasPos = this.canvasPos + 1;
      } else if (direction == "prev" && this.canvasPos - 1 >= 0) {
        this.canvasPos = this.canvasPos - 1;
      }

      for (const i in this.canvasArray[this.canvasPos]) {
        const line = this.canvasArray[this.canvasPos][i];
        eval(`document.getElementById("plot-canvas").getContext('2d').${line}`);
      }
    },
    updateCanvas() {
      if (tempLineArray.length != 0) {
        this.canvasArray.push(tempLineArray);
        tempLineArray = [];
      }
    },
    saveCanvas() {
      var canvas = document.getElementById("plot-canvas");
      var dataURL = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      var element = document.createElement("a");

      element.href = dataURL;
      element.setAttribute("download", "Wasm4Learn.png");
      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    async onEnter() {
      if (this.lang == "python") {
        this.runPython();
      } else if (this.lang == "r") {
        this.updateCanvas();
        await this.webConsole.stdin(this.command);
        document.getElementById("out").append(this.command + "\n");
        this.updateCanvas();
      } else if (this.lang == "js") {
        this.runJS();
      } else if ((this.lang = "ruby")) {
        var pos = logMessages.length;
        document.getElementById("out").append(this.command + "\n");
        try {
          this.webConsole.eval(this.command);
        } catch (err) {
          document.getElementById("out").append(err + "\n");
        }
        var temp = logMessages;
        for (let i = pos; i < temp.length; i++) {
          document.getElementById("out").append(temp[i] + "\n");
        }
        temp = [];
      }

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
      const result = await this.webConsole.webR
        .evalRBoolean(code)
        .then((res) => {
          return res;
        })
        .catch((error) => {
          return false;
        });

      this.test = result;
    },
    async runJS() {
      const result = this.webConsole.evalCode(this.command);
      document.getElementById("out").append(">" + this.command + "\n");
      if (result.error) {
        document
          .getElementById("out")
          .append(this.webConsole.dump(result.error) + "\n");
        this.command = "";
        result.error.dispose();
      } else {
        document
          .getElementById("out")
          .append(this.webConsole.dump(result.value) + "\n");
        this.command = "";
        result.value.dispose();
      }
    },
    runPython() {
      document.getElementById("out").append(">>>" + this.store.command + "\n");
      try {
        let output = this.webConsole.runPython(this.store.command + "\n\n");
        if (output !== undefined) {
          document.getElementById("out").append(output + "\n");
        }
      } catch (err) {
        document.getElementById("out").append(err + "\n");
      }
    },
  },
  watch: {
    async command(new_val) {
      if (this.store.changed) {
        if (this.lang == "r") {
          for (const element of this.store.command.split("\n")) {
            this.updateCanvas();
            await this.webConsole.stdin(element);
            document.getElementById("out").append(element + "\n");
            this.updateCanvas();
          }
        } else if (this.lang == "python") {
          this.runPython();
        } else if (this.lang == "js") {
          this.runJS();
        } else if ((this.lang = "ruby")) {
          var pos = logMessages.length;
          document.getElementById("out").append(this.command + "\n");
          try {
            this.webConsole.eval(this.command);
          } catch (err) {
            document.getElementById("out").append(err + "\n");
          }
          var temp = logMessages;
          for (let i = pos; i < temp.length; i++) {
            document.getElementById("out").append(temp[i] + "\n");
          }
          temp = [];
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
</style>