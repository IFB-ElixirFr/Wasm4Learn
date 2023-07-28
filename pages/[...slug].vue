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
      <div style="height: 50%">
        <v-card class="fill-height">
          <v-card-text class="fill-height overflow-y-auto">
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
        <v-tabs v-model="tab" class="mt-3">
          <v-tab value="plot">Plot</v-tab>
        </v-tabs>
        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="plot">
              <canvas
                id="plot-canvas"
                width="1008"
                height="1008"
                style="margin: auto; width: 100%; height: 100%"
              ></canvas>
            </v-window-item>
          </v-window>
        </v-card-text>
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
      pos: 0,
      data: "",
      shelter: null,
      tab: null,
    };
  },
  async setup() {
    const route = useRoute();
    const id = ref(route.query.id ? route.query.id : "");

    const path = route.path + id.value;

    const store = useCommandStore();
    const { command } = storeToRefs(store);

    const webRConsole = new Console({
      stdout: (line) => document.getElementById("out").append(line + "\n"),
      stderr: (line) => document.getElementById("out").append(line + "\n"),
      prompt: (p) => document.getElementById("out").append(p),
      canvasExec: (line) => {
        let canvas = document.getElementById("plot-canvas");
        eval(`canvas.getContext('2d').${line}`);
      },
    });

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
    await this.webRConsole.run();
    this.data = this.tutosList[this.pos];
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

      console.log( this.webRConsole.webR.objs)
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

pre {
  overflow-x: auto !important;
  margin-bottom: 10px !important;
}
</style>