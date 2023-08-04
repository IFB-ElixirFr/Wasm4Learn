<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title
      ><NuxtLink to="/" style="color: black; text-decoration: none"
        >Interactive tutorials with WASM</NuxtLink
      ></v-app-bar-title
    >

    <template v-slot:append>
      <v-btn
        icon
        href="https://github.com/IFB-ElixirFr/Wasm4Learn"
        target="_blank"
      >
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style>
</style>