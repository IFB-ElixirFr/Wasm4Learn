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
import "ace-builds/src-noconflict/mode-r";
import { useCommandStore } from "@/stores/useCommandStore";
let editor;
export default {
  setup(props) {
    const store = useCommandStore();
    return { store };
  },
  data() {
    return {};
  },
  mounted() {
    editor = ace.edit("editorArea", {
      mode: "ace/mode/r",
      tabSize: 4,
    });
  },
  methods: {
    source() {
      this.store.updateCommand(editor.getValue().split("\n"));
    },
    save() {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(editor.getValue())
      );
      element.setAttribute("download", "R_WASM.R");

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