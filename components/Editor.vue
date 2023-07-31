<template>
  <div id="editorArea" style="height: 100%">plot(1,1)</div>
</template>

<script>
import ace from "ace-builds";
import 'ace-builds/src-noconflict/mode-r';

export default {
  mounted() {
    ace.edit("editorArea", {
      mode: "ace/mode/r",
      tabSize: 4,
    });
  },
};
</script>

<style>
</style>