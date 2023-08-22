<template>
  <v-navigation-drawer :width="325" height="100vh" v-model="drawer" temporary location="right">
    <div v-for="(n, key) in navigation" :key="key">
      <div v-for="(section, sectionKey) in n.children" :key="sectionKey">
        <div v-for="(c, keyC) in section.children" :key="keyC">
          <h3 class="text-black" style="margin-bottom: 2%; margin-left: 4%; margin-top: 4%;"> {{ c.title }}</h3>
          <v-list>
            <v-list-item @click="changePath(section._path, c._dir)" v-for="(c2, keyC2) in c.children" :key="keyC2">
              <v-list-item-title style="margin-bottom: 2%; margin-left: 4%;">{{ c2.title }}</v-list-item-title>
              <v-divider></v-divider>
            </v-list-item>
          </v-list>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
  <v-navigation-drawer :width="325" v-model="drawer_curent_course" absolute temporary location="right">
    <div v-for="(n, key) in navigation" :key="key">
      <div v-for="(section, sectionKey) in n.children" :key="sectionKey">
        <div v-for="(c, keyC) in section.children" :key="keyC">
          <h3 class="text-black" style="margin-bottom: 2%; margin-left: 4%; margin-top: 4%;"> {{ c.title }}</h3>
          <v-list>
            <v-list-item @click="changePath(section._path, c._dir)" v-for="(c2, keyC2) in c.children" :key="keyC2">
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
      <DisplayContent />
    </v-col>
    <v-col class="fill-height">
      <div class="fill-height split" style="width: calc(100% - 10px)">
        <div id="split-0" style="height: 50%">
          <v-card class="fill-height">
            <v-card-text class="fill-height overflow-x-auto" id="divConsole">
              <div class="code" id="out">
                <p>Loading {{ lang }} WASM environnement, please wait...</p>
              </div>
              <v-textarea
                style="
                  font-family: monospace, monospace !important;
                  margin-top: -20px !important;
                "
                :prefix="precommand"
                v-on:keyup.enter="onEnter"
                v-model="command"
                variant="underlined"
                active="true"
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
                  <div style="width: 100%; background-color: gainsboro" class="text-left">
                    <v-btn variant="text" @click="changePlot('prev')" icon="mdi-chevron-left" size="x-small"></v-btn>
                    <v-btn variant="text" @click="changePlot('next')" icon="mdi-chevron-right" size="x-small"></v-btn>
                    <v-btn size="x-small" @click="saveCanvas">Save</v-btn>
                  </div>
                  <canvas id="plot-canvas" width="1008" height="1008"
                    style="margin: auto; height: calc(100% - 50px)"></canvas>
                </v-window-item>
                <v-window-item
                  value="editorTab"
                  class="fill-height text-center"
                >
                  <Editor :lang="lang" />
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
import { Console } from "webr";
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
      drawer_curent_course: null,
    };
  },
  async setup() {
    // Manage path and get language
    const route = useRoute();
    let lang = route.params.lang;
    const id = ref(route.query.id ? route.query.id : "");
    const pathParent = route.path;
    const path = route.path + id.value;

    // Manage store
    const store = useCommandStore();
    const { command } = storeToRefs(store);

    // Start WebR
    var webConsole;
    var precommand;
    if (lang == "r") {
      precommand = ">";
      webConsole = new Console({
        stdout: (line) =>
          document
            .getElementById("out")
            .insertAdjacentHTML("afterend", "<p>" + line + "</p>"),
        stderr: (line) =>
          document
            .getElementById("out")
            .insertAdjacentHTML("afterend", "<p>" + line + "</p>"),
        prompt: (p) =>
          document
            .getElementById("out")
            .insertAdjacentHTML("afterend", "<p>" + p + "</p>"),
        canvasExec: (line) => {
          tempLineArray.push(line);
          eval(
            `document.getElementById("plot-canvas").getContext('2d').${line}`
          );
        },
      });
    } else if (lang == "js") {
      precommand = ">";
      const QuickJS = await getQuickJS();
      webConsole = QuickJS.newContext();
    } else if (lang == "python") {
      precommand = ">>>";
      webConsole = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/",
        stdout: (line) => {
          var element = document.getElementById("out");
          element.innerHTML = element.innerHTML + "<pre><code>" + line;
          ("<code></pre>");
        },
        stderr: (line) => {
          var element = document.getElementById("out");
          element.innerHTML = element.innerHTML + "<pre><code>" + line;
          ("<code></pre>");
        },
      });
    } else if (lang == "ruby") {
      precommand = "";
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

    const { data: navigation } = await useAsyncData("navigation", () =>
      fetchContentNavigation("/" + lang + "/")
    );

    return {
      navigation,
      webConsole,
      store,
      command,
      pathParent,
      path,
      id,
      lang,
      precommand,
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
      this.runR();
    } else if (this.lang == "ruby") {
      var pos = logMessages.length;

      this.webConsole.printVersion();
      var temp = logMessages;
      for (let i = pos; i < temp.length; i++) {
        this.displayCommand(temp[i]);
      }
      temp = [];
    }

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

      const canvas = document.getElementById("plot-canvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const i in this.canvasArray[this.canvasPos]) {
        const line = this.canvasArray[this.canvasPos][i];
        ctx.drawImage(line, 0, 0);
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
        this.displayCommand(this.command, ">");
        await this.webConsole.stdin(this.command);
        this.updateCanvas();
      } else if (this.lang == "js") {
        this.runJS();
      } else if ((this.lang = "ruby")) {
        var pos = logMessages.length;
        this.displayCommand(this.command);
        try {
          this.webConsole.eval(this.command);
        } catch (err) {
          this.displayCommand(err);
        }
        var temp = logMessages;
        for (let i = pos; i < temp.length; i++) {
          this.displayCommand(temp[i]);
        }
        temp = [];
      }

      this.command = "";
      var objDiv = document.getElementById("divConsole");
      objDiv.scrollTop = objDiv.scrollHeight;
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
      this.displayCommand(this.command, ">");

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
      this.displayCommand(this.command, ">>>");
      try {
        let output = this.webConsole.runPython(this.store.command + "\n\n");
        if (output !== undefined) {
          this.displayCommand(output);
        }
      } catch (err) {
        this.displayCommand(err);
      }
    },
    async runR() {
      for (;;) {
        const output = await this.webConsole.webR.read();
        var element = document.getElementById("out");
        switch (output.type) {
          case "stdout":
            element.innerHTML =
              element.innerHTML + "<pre><code>" + output.data + "<code></pre>";
            break;
          case "stderr":
            element.innerHTML =
              element.innerHTML +
              "<pre><code class='error'>" +
              output.data +
              "<code></pre>";
            break;
          case "prompt":
            if (output.data != "> ") {
              element.innerHTML =
                element.innerHTML +
                "<pre><code>" +
                output.data +
                "<code></pre>";
              break;
            }
          case "canvas":
            if (output.data.event === "canvasImage") {
              tempLineArray.push(output.data.image);
              document
                .getElementById("plot-canvas")
                .getContext("2d")
                .drawImage(output.data.image, 0, 0);
            }
            break;
          case "closed":
            return;
          default:
            console.warn(
              `Unhandled output type for webR Console: ${output.type}.`
            );
        }
      }
    },
    displayCommand(command, chevron = "") {
      if (chevron != "") {
        chevron = chevron + " ";
      }
      var element = document.getElementById("out");
      element.innerHTML =
        element.innerHTML +
        "<pre><code class='command'>" +
        chevron +
        command +
        "<code></pre>";
    },
  },
  watch: {
    async command(new_val) {
      if (this.store.changed) {
        if (this.lang == "r") {
          this.updateCanvas();
          await this.webConsole.stdin(this.store.command);
          this.displayCommand(this.store.command, ">");
          this.updateCanvas();
        } else if (this.lang == "python") {
          this.runPython();
        } else if (this.lang == "js") {
          this.runJS();
        } else if ((this.lang = "ruby")) {
          var pos = logMessages.length;
          this.displayCommand(this.store.command);
          try {
            this.webConsole.eval(this.command);
          } catch (err) {
            this.displayCommand(err);
          }
          var temp = logMessages;
          for (let i = pos; i < temp.length; i++) {
            this.displayCommand(temp[i]);
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