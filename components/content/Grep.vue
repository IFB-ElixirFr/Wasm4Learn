<template>
  <p class="text-h6">File content</p>
  <p>
    <b
      ><v-icon>mdi-information</v-icon> This content will be written to the file
      <code>data.txt</code></b
    >
  </p>
  <div style="max-height: 200px; overflow-y: auto">
    <div :id="idEditor" style="width: 100%; height: 200px">
      {{ text }}
    </div>
  </div>

  <p class="text-h6">Command</p>
  <p>
    <b
      ><v-icon>mdi-information</v-icon> The file name must always be
      <code>data.txt</code></b
    >
  </p>
  <p>
    <b
      ><v-icon>mdi-information</v-icon> Use simple quote for write a text argument.</b
    >
  </p>
  <v-dialog v-model="dialog" width="75%">
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props" size="small" class="mb-4">
        <v-icon>mdi-book</v-icon> Read man
      </v-btn>
    </template>

    <v-card>
      <v-card-text style="height: 90vh">
        <iframe
          src="/man/grep.html"
          frameborder="0"
          style="height: 100%; width: 100%"
        ></iframe>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-text-field
    v-model="commandInput"
    style="font-family: monospace, monospace !important"
  ></v-text-field>
  <v-btn class="mt-4" @click="runTool">Run tool </v-btn>
  <p class="text-h6">Output</p>
  <pre :id="idOutput">Await run click...</pre>
  <v-card color="info">
    <v-card-text v-if="noResult">
      <v-icon>mdi-information</v-icon> No result
    </v-card-text>
  </v-card>
</template>
  
<script>
import Aioli from "@biowasm/aioli";
import ace from "ace-builds";

export default {
  props: {
    text: String,
    command: String,
  },
  setup(props) {
    var id = new Date().valueOf();
    var idEditor = "editorArea" + id;
    var idOutput = "output" + id;

    const route = useRoute();
    let tool = route.params.tool;

    return { idEditor, idOutput, tool };
  },
  data() {
    return {
      dialog: false,
      editor: null,
      commandInput: null,
      noResult: false,
    };
  },
  mounted() {
    this.commandInput = this.command;
    this.editor = ace.edit(this.idEditor, {
      tabSize: 4,
      // readOnly: this.readOnly,
      autoScrollEditorIntoView: true,
      maxLines: 50,
      minLines: 1,
    });
  },
  methods: {
    async runTool() {
      document.getElementById(this.idOutput).innerHTML = "Loading...";
      this.noResult = false;

      const CLI = await new Aioli(["grep/3.7"]);

      // Create sample file
      var dataEditor = {
        name: "data.txt",
        data: this.editor.getValue(),
      };
      await CLI.mount(dataEditor);
      console.log(this.commandInput);

      var temp = this.commandInput;
      temp = temp.replace(this.tool, "").trim();
      var params = this.parseFlags(temp).map((d) => d.replaceAll("'", ""));
      console.log(params);
      const output = await CLI.exec("grep", params);
      if (output == "") {
        this.noResult = true;
      }
      console.log(output);
      document.getElementById(this.idOutput).innerHTML = output;
    },
    parseFlags(flags) {
      // Source: https://stackoverflow.com/a/16261693
      return flags.match(/(?:[^\s']+|'[^']*')+/g) || [];
    },
  },
};
</script>
  
  <style>
</style>