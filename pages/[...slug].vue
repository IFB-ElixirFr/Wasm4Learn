<template>
  <v-row class="fill-height">
    <v-col class="fill-height overflow-y-auto">
      <v-card class="fill-height">
        <v-card-text
          class="fill-height overflow-y-auto"
          style="max-height: calc(100% - 50px)"
        >
          <div class="prose" style="">
            <ContentRenderer :value="data" v-if="data">
              <h1>{{ data.title }}</h1>
              <br />
              <ContentRendererMarkdown :value="data" />
            </ContentRenderer>
          </div>
        </v-card-text>
        <v-card-actions
          class="d-flex justify-end"
          style="background-color: lightsteelblue"
        >
          <v-btn :disabled="pos == 0" @click="prevBtn">Prev</v-btn>
          <v-btn
            :disabled="pos == tutosList.length - 1"
            @click="nextBtn"
            class="me-2"
            >Next</v-btn
          >
          <v-chip> {{ pos + 1 }} / {{ tutosList.length }} </v-chip>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col class="fill-height">
      <v-card class="fill-height">
        <v-card-text class="fill-height overflow-y-auto">
          <pre><code id="out">Loading webR, please wait...</code></pre>
          <v-text-field
            v-on:keyup.enter="onEnter"
            v-model="command"
          ></v-text-field>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
  
<script>
import { Console } from "@r-wasm/webr";
import { useCommandStore } from "@/stores/useCommandStore";
import { storeToRefs } from "pinia";

export default {
  head() {
    return {
      script: [
        {
          src: "/webr-serviceworker.js",
          body: true,
        },
        {
          src: "/webr-worker.js",
          body: true,
        },
      ],
    };
  },
  data() {
    return {
      command: "",
      next: null,
      prev: null,
      prev_path: "#",
      next_path: "#",
      data: "",
      pos: 0,
    };
  },
  async setup() {
    const store = useCommandStore();
    const { command } = storeToRefs(store);

    const webRConsole = new Console({
      stdout: (line) => document.getElementById("out").append(line + "\n"),
      stderr: (line) => document.getElementById("out").append(line + "\n"),
      prompt: (p) => document.getElementById("out").append(p),
    });
    const { path } = useRoute();
    const tutosList = await queryContent(path).find();

    for (var i = tutosList.length - 1; i >= 0; i--) {
      if (
        tutosList[i]._path == path + "_dir" ||
        tutosList[i]._path == path + "/_dir"
      ) {
        tutosList.splice(i, 1);
      }
    }

    return { webRConsole, tutosList, store, command };
  },
  async mounted() {
    this.webRConsole.run();

    const { path } = useRoute();
    const { data } = await useAsyncData("page-data", () =>
      queryContent(this.tutosList[this.pos]._path).findOne()
    );

    this.data = data;

    const [prev, next] = await queryContent()
      .only(["_path", "title"])
      .findSurround(path);
    this.prev = prev;
    this.next = next;
    if (prev) this.prev_path = prev._path;
    if (next) this.next_path = next._path;
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
    },
    async nextBtn() {
      if (this.pos < this.tutosList.length) {
        this.pos = this.pos + 1;
        const { data } = await useAsyncData("page-data", () =>
          queryContent(this.tutosList[this.pos]._path).findOne()
        );
        this.data = data;
      }
    },
    async prevBtn() {
      if (this.pos > 0) {
        this.pos = this.pos - 1;
        const { data } = await useAsyncData("page-data", () =>
          queryContent(this.tutosList[this.pos]._path).findOne()
        );
        this.data = data;
      }
    },
  },
  watch: {
    command(new_val) {
      if (this.store.changed) {
        console.log(this.store.command);
        for (const element of this.store.command) {
          this.webRConsole.stdin(element);
          document.getElementById("out").append(element + "\n");
        }
        this.store.reset();
      }
    },
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
</style>