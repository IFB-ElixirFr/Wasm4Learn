<template>
  <h1>About</h1>
  <h2 class="my-3">Why ?</h2>
  <p class="text-subtitle-1">
    We want to propose a digital environments dedicated to self-training
    resources with practical sessions adapted to our target audiences. We report
    on the technologies available to create online scenarios for learning and
    acquiring basic command line and programming skills. This field is actively
    evolving, especially with in-browser approaches (WebAssembly, Wasm). Our
    goal is to provide a self-training resource on which biologists wishing to
    learn bioinformatics could acquire the basics of Unix, R and Python. For
    this site, we drew inspiration from the work done on the website : Katacoda,
    Killercoda and Sandbox.bio.
  </p>

  <h2 class="my-3">Who ?</h2>

  <v-list lines="one">
    <v-list-item
      v-for="(item, key) in whoList"
      :key="key"
      elevation="2"
      class="ma-3"
    >
      <template v-slot:prepend>
        <v-avatar color="grey-lighten-1">
          <v-img :src="item.urlImage" :alt="item.name"></v-img>
        </v-avatar>
      </template>
      <v-list-item-title>
        <p class="text-h6">{{ item.name }}</p>
      </v-list-item-title>
      <v-list-item-subtitle>
        <v-chip v-for="r in item.role" :key="r" class="ma-1">{{ r }}</v-chip>
        {{ r }}
      </v-list-item-subtitle>
      <v-list-item-action
        ><v-btn
          :href="'https://github.com/' + item.githubID"
          size="x-small"
          target="_blank"
          class="ma-1"
        >
          Visit Github profil</v-btn
        >
      </v-list-item-action>
    </v-list-item>
  </v-list>

  <h2 class="my-3">How ?</h2>
  To create this site, we used the following tools:
  <v-list>
    <v-list-item
      v-for="(item, k) in toolList"
      :key="k"
      :title="item.title"
      :subtitle="item.subtitle"
      :prepend-avatar="item.urlImage"
      elevation="2"
      class="ma-3 pa-3"
      :href="item.link"
      target="_blank"
    ></v-list-item>
    <v-list-item></v-list-item>
  </v-list>

  To find out more about the teaching resources and WASM tools we have used,
  please read our <nuxt-link to="/resources/">ressources</nuxt-link> page.
</template>

<script>
export default {
  data() {
    return {
      whoList: [
        {
          githubID: "thomasdenecker",
          name: "Thomas Denecker",
          role: ["Content creator", "Developer"],
        },
        {
          githubID: "imanemessak",
          name: "Imane Messak",
          role: ["Developer"],
        },
      ],
      toolList: [
        {
          title: "Vue3.js",
          subtitle:
            "An approachable, performant and versatile framework for building web user interfaces.",
          urlImage:
            "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg",
          link: "https://vuejs.org/",
        },
        {
          title: "Vuetify",
          subtitle:
            "Vuetify is a no design skills required UI Library with beautifully handcrafted Vue Components.",
          urlImage:
            "https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-light.svg",
          link: "https://vuetifyjs.com/en/",
        },
        {
          title: "Nuxt",
          subtitle:
            "An open source framework under MIT license that makes web development simple and powerful.",
          urlImage:
            "https://upload.wikimedia.org/wikipedia/commons/a/ae/Nuxt_logo.svg",
          link: "https://nuxt.com/",
        },
        {
          title: "Nuxt content",
          subtitle: "Content made easy for Vue Developers",
          urlImage:
            "https://upload.wikimedia.org/wikipedia/commons/a/ae/Nuxt_logo.svg",
          link: "https://content.nuxtjs.org/",
        },
        {
          title: "Mkdoc (Documentation)",
          subtitle:
            "MkDocs is a fast, simple and downright gorgeous static site generator that's geared towards building project documentation.",
          urlImage:
            "https://raw.githubusercontent.com/squidfunk/mkdocs-material/master/.github/assets/logo.svg",
          link: "https://www.mkdocs.org/",
        },
      ],
    };
  },
  async created() {
    for (var i = 0; i < this.whoList.length; i++) {
      if (
        this.whoList[i]["urlImage"] == "" ||
        this.whoList[i]["urlImage"] === undefined
      ) {
        this.whoList[i]["urlImage"] = await this.getGithubAvatar(
          this.whoList[i]["githubID"]
        );
      }
    }
  },
  methods: {
    async getGithubAvatar(id) {
      const { data: data } = await useFetch(
        "https://api.github.com/users/" + id
      );
      return data.value.avatar_url;
    },
  },
};
</script>

<style>
</style>