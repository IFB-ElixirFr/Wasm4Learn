<template>
  <v-app-bar flat=true color="#0080bc" class="text-white" style="position: fixed;">
    <v-app-bar-title
      ><NuxtLink to="/" style="color: white; text-decoration: none"
        >Wasm<span style="color: #cddd00">4</span>Learn</NuxtLink
      ></v-app-bar-title
    >
    <v-alert type="warning" text="POC under development" style="width: 200px;" max-height="80%"></v-alert>
    <template v-slot:append>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon="mdi-forum-outline"> </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :value="index"
          >
          <a :href="item.link + '/discussions'" target="_blank" style="all: unset;"><v-list-item-title  >{{ item.title }}</v-list-item-title></a> 
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon="mdi-github"> </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :value="index"
          >
          <a :href="item.link" target="_blank" style="all: unset;"><v-list-item-title  >{{ item.title }}</v-list-item-title></a> 
          </v-list-item>
        </v-list>
      </v-menu>

    </template>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "Tool", link: "https://github.com/IFB-ElixirFr/Wasm4Learn" },
      {
        title: "Documentation",
        link: "https://github.com/IFB-ElixirFr/Wasm4Learn-content",
      },
      {
        title: "Content",
        link: "https://github.com/IFB-ElixirFr/Wasm4Learn-doc",
      },
    ],
  }),
};
</script>

<style>
</style>