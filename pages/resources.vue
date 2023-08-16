<template>
  <v-container>
    <p class="text-h2 dividerline mt-4 mb-8" style="color: #0080bc">
      Resources
    </p>
    <h2 class="my-3">
      <v-icon>mdi-book-multiple</v-icon> Educational resources
    </h2>
    <p class="text-subtitle-1">
      To build this course, we have drawn on existing educational content from
      the following sources:
    </p>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Author</th>
          <th class="text-left">Source</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, keyEr) in ER" :key="keyEr">
          <td>{{ item.name }}</td>
          <td>{{ item.author }}</td>
          <td><a :href="item.source" target="_blank">External link</a></td>
        </tr>
      </tbody>
    </v-table>

    <h2 class="my-3"><v-icon>mdi-tools</v-icon> Technical resources</h2>
    <p class="text-subtitle-1">
      We use WASM technology to simulate the different languages. Here is a list
      of the different tools we use:
    </p>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Language</th>
          <th class="text-left">Source</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, keyTr) in TR" :key="keyTr">
          <td>{{ item.name }}</td>
          <td>{{ item.language }}</td>
          <td><a :href="item.source" target="_blank">External link</a></td>
        </tr>
      </tbody>
    </v-table>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      ER: [
        {
          name: "The rtrainer package",
          author: "Denis Puthier",
          source: "https://github.com/dputhier/rtrainer",
        },
        {
          name: "Introdcution à Linux pour la bioinformatique",
          author: "Thomas Denecker; Claire Toffano-Nioche",
          source: "https://github.com/IFB-ElixirFr/LinuxEBAII",
        },
      ],
      TR: [
        {
          name: "webR",
          language: "R",
          source: "https://github.com/r-wasm/webr/",
        },
        {
          name: "Pyodide",
          language: "Python",
          source: "https://github.com/pyodide/pyodide",
        },
        {
          name: "quickjs-emscripten",
          language: "JS",
          source: "https://github.com/justjake/quickjs-emscripten",
        },
      ],
    };
  },
};
</script>

<style>
</style>