<template>
  <v-app-bar
    :flat="flat"
    color="#0080bc"
    class="text-white"
    style="position: fixed"
  >
    <v-app-bar-title
      ><NuxtLink to="/" style="color: white; text-decoration: none"
        >Wasm<span style="color: #cddd00">4</span>Learn</NuxtLink
      ></v-app-bar-title
    >

    <template v-slot:append>
      <v-btn to="/courses-all"
        ><v-icon size="24px" class="me-2">mdi-magnify</v-icon> Explore</v-btn
      >
      <v-btn to="/progression"
        ><v-icon size="24px" class="me-2">mdi-progress-check</v-icon>
        Progression</v-btn
      >

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" variant="text">
            <v-icon size="24px" class="me-2">mdi-tools</v-icon>
            Our platform
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <a
              href="https://ifb-elixirfr.github.io/Wasm4Learn-doc/"
              target="_blank"
              style="all: unset; cursor: pointer"
              ><v-list-item-title>Documentation</v-list-item-title></a
            >
          </v-list-item>
          <v-list-item>
            <a
              href="https://github.com/IFB-ElixirFr/Wasm4Learn-content"
              target="_blank"
              style="all: unset; cursor: pointer"
              ><v-list-item-title>Content</v-list-item-title></a
            >
          </v-list-item>
          <v-list-item>
            <NuxtLink to="/changelog" style="all: unset; cursor: pointer">
              <v-list-item-title>What's new ?</v-list-item-title>
            </NuxtLink>
          </v-list-item>
          <v-list-item>
            <NuxtLink to="/next" style="all: unset; cursor: pointer">
              <v-list-item-title>What's next ?</v-list-item-title>
            </NuxtLink>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" variant="text">
            <v-icon size="24px" class="me-2">mdi-forum-outline</v-icon>
            Feedbacks
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :value="index"
          >
            <a
              :href="item.link + '/discussions'"
              target="_blank"
              style="all: unset"
              ><v-list-item-title>{{ item.title }}</v-list-item-title></a
            >
          </v-list-item>
        </v-list>
      </v-menu>
      <GithubBtn />
    </template>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    flat: true,
    items: [
      { title: "Tool", link: "https://github.com/IFB-ElixirFr/Wasm4Learn" },
      {
        title: "Documentation",
        link: "https://github.com/IFB-ElixirFr/Wasm4Learn-doc",
      },
      {
        title: "Content",
        link: "https://github.com/IFB-ElixirFr/Wasm4Learn-content",
      },
    ],
  }),
};
</script>

<style>
</style>