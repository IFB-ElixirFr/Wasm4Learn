<template>
  <v-btn
    @click="action"
    size="x-small"
    color="success"
    prepend-icon="mdi-play"
    class="mb-2"
    >Run code</v-btn
  >
  <div :id="id" style="width: 100%; height: 200px">
    <div ref="codeSlot"><slot /></div>
  </div>
</template>

<script>
import { useCommandStore } from "@/stores/useCommandStore";
import ace from "ace-builds";
import "ace-builds/src-noconflict/mode-r";

export default {
  props: {
    command: String,
    readOnly: {
      default: false,
      type: Boolean,
    },
  },

  setup(props) {
    const store = useCommandStore();

    var id = new Date().valueOf();
    id = "editorArea" + id;
    return { store, id };
  },
  mounted() {
    ace.edit(this.id, {
      mode: "ace/mode/r",
      tabSize: 4,
      readOnly: this.readOnly,
      autoScrollEditorIntoView: true,
      maxLines: 50,
      minLines: 2,
    });
  },
  methods: {
    action() {
      this.store.updateCommand(this.$refs.codeSlot.textContent.split("\n"));
    },
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
