<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title
      ><NuxtLink to="/" style="color: black; text-decoration: none"
        >Interactive tutorials with WASM</NuxtLink
      ></v-app-bar-title
    >

    <template v-slot:append>
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
            <v-list-item-title :href="item.link" target="_blank">{{ item.title }}</v-list-item-title>
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