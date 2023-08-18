<template>
  <div class="mb-2 text-left">
    <v-btn
      @click="save"
      size="x-small"
      prepend-icon="mdi-content-save"
      class="mx-2"
      style="min-width: 100px"
    >
      Save</v-btn
    >
    <v-btn
      @click="source"
      size="x-small"
      prepend-icon="mdi-play"
      class="mx-2"
      style="min-width: 100px"
    >
      Source</v-btn
    >
  </div>
  <div id="editorArea" style="height: 90%" ref="codeValue"></div>
</template>

<script>
import ace from "ace-builds";
ace.config.set('basePath', 'path')

import "ace-builds/src-noconflict/mode-r";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-javascript";

import "ace-builds/src-noconflict/ext-language_tools";
import { useCommandStore } from "@/stores/useCommandStore";
let editor;

export default {
  props: {
    lang: String
  },
  setup(props) {
    const store = useCommandStore();
    return { store };
  },
  data() {
    return {};
  },
  mounted() {
    var mode;
    if (this.lang == "js"){
      mode = "javascript"
    } else {
      mode = this.lang
    }

    editor = ace.edit("editorArea", {
      mode: "ace/mode/" + mode,
      tabSize: 4,
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
    });
  },
  methods: {
    source() {
      this.store.updateCommand(editor.getValue());
    },
    save() {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(editor.getValue())
      );
      element.setAttribute("download", "Wasm4Learn.R");

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
  },
};
</script>

<style>
</style>