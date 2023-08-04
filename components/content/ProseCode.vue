<!-- Inspiration : https://github.com/Mokkapps/nuxt-content-v2-custom-code-blocks/tree/master -->
<template>
  <div class="container">
    <span v-if="filename" class="filename-text">
      {{ filename }}
    </span>
    <span
      v-if="languageText"
      :style="{ background: languageBackground, color: languageColor }"
      class="language-text"
    >
      {{ languageText }}
    </span>
    <slot />
    <div class="bottom-container">
      <div class="copy-container mb-1">
        <span class="copied-text" v-if="copied">Copied code!</span>
        <v-btn
          @click="copy(code)"
          size="x-small"
          prepend-icon="mdi-content-copy"
          >Copy Code</v-btn
        >
        <v-btn
          @click="runCode"
          v-if="meta != 'noRun'"
          size="x-small"
          color="success"
          prepend-icon="mdi-play"
          class="ms-2"
          >Run Code</v-btn
        >
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import { useCommandStore } from "@/stores/useCommandStore";

const { copy, copied, text } = useClipboard();
const store = useCommandStore();

const props = withDefaults(
  defineProps<{
    code?: string;
    language?: string | null;
    filename?: string | null;
    highlights?: Array<number>;
    meta?: string | null;
  }>(),
  { code: "", language: null, filename: null, highlights: () => [], meta: null }
);

const languageMap: Record<
  string,
  { text: string; color: string; background: string }
> = {
  vue: {
    text: "vue",
    background: "#42b883",
    color: "white",
  },
  r: {
    text: "r",
    background: "#2164B6",
    color: "white",
  },
  bash: {
    text: "bash",
    background: "#3E474A",
    color: "white",
  },
  python:{
    text: "py",
    background: "linear-gradient(to bottom right, #2F6E9D, #F6D652)",
    color: "white",
  },
};

const languageText = computed(() =>
  props.language ? languageMap[props.language]?.text : null
);
const languageBackground = computed(() =>
  props.language ? languageMap[props.language]?.background : null
);
const languageColor = computed(() =>
  props.language ? languageMap[props.language]?.color : null
);

// functions
function runCode() {
  store.updateCommand(props.code);
}
</script>
  
  <style scoped>
.container {
  background: white;
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-top: 1.5em;
  overflow: hidden;
  border-radius: 0.5rem;
}

.bottom-container {
  display: flex;
  justify-content: flex-end;
}

.copy-container {
  display: flex;
}

.copied-text {
  margin-right: 1em;
}

.filename-text {
  position: absolute;
  top: 0;
  left: 1em;
  padding: 0.25em 0.5em;
  color: black;
  font-size: 14px;
}

.language-text {
  position: absolute;
  top: 0;
  right: 1em;
  padding: 0.25em 0.5em;
  font-size: 14px;
  text-transform: uppercase;
  border-bottom-right-radius: 0.25em;
  border-bottom-left-radius: 0.25em;
}

:slotted(pre) {
  margin-top: 0;
  margin-bottom: 0;
  display: flex;
  flex: 1 1 0%;
  overflow-x: auto;
  padding: 1rem;
  line-height: 1.625;
  counter-reset: lines;
}

:slotted(pre code) {
  width: 100%;
  display: flex;
  flex-direction: column;
}

:slotted(pre code .line) {
  display: inline-table;
  min-height: 1rem;
}

:slotted(pre code .line::before) {
  counter-increment: lines;
  content: counter(lines);
  width: 1rem;
  margin-right: 1.5rem;
  display: inline-block;
  text-align: left;
  color: rgba(115, 138, 148, 0.4);
}

:slotted(pre code .highlight) {
  background-color: white;
  display: block;
  margin-right: -1em;
  margin-left: -1em;
  padding-right: 1em;
  padding-left: 0.75em;
  border-left: 0.25em solid red;
}
</style>