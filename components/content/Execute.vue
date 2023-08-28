<template>
  <v-btn
    @click="action"
    size="x-small"
    color="success"
    prepend-icon="mdi-play"
    class="mb-2"
    >Run code</v-btn
  ><v-btn
    v-if="test"
    @click="testCode"
    size="x-small"
    prepend-icon="mdi-cog-play"
    class="mb-2 ms-2"
    >Test my code</v-btn
  >
  <div :id="id" style="width: 100%; height: 200px">
    {{ command }}
  </div>

  <p v-if="testResult === true">
    <b>&#x1F389; Well done !</b>
  </p>
  <p v-if="testResult === false">
    <b>&#x274C; It's not the good response...</b>
  </p>
</template>

<script>
import { useCommandStore } from "@/stores/useCommandStore";
import { storeToRefs } from "pinia";
import ace from "ace-builds";
import "ace-builds/src-noconflict/mode-r";

export default {
  props: {
    command: String,
    test: String,
    readOnly: {
      default: false,
      type: Boolean,
    },
  },

  setup(props) {
    const store = useCommandStore();
    const route = useRoute();
    let lang = route.params.lang;
    var id = new Date().valueOf();
    id = "editorArea" + id;
    const { resultTestChanged } = storeToRefs(store);

    return { store, id, resultTestChanged, lang };
  },
  data() {
    return {
      testResult: null,
      editor: null,
    };
  },
  mounted() {
    this.editor = ace.edit(this.id, {
      mode: "ace/mode/r",
      tabSize: 4,
      readOnly: this.readOnly,
      autoScrollEditorIntoView: true,
      maxLines: 50,
      minLines: 1,
    });
  },
  methods: {
    action() {
      this.store.updateCommand(this.editor.getValue());
    },
    async testCode() {
      if (this.lang == "r") {
        await this.store.updateCommand(this.editor.getValue());
        await this.store.updateCommandTest(this.test.split("\n"), this.id);
      }
    },
  },
  watch: {
    resultTestChanged(new_val) {
      if (this.store.resultTestChanged && this.id == this.store.testID) {
        this.testResult = this.store.resultTest;
        this.store.reset();
      }
    },
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
