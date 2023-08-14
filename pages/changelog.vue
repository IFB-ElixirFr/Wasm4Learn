<template>
  <v-container>
    <p class="text-h2 dividerline mt-4 mb-8" style="color: #0080bc">
      The latest news
    </p>

    <div v-html="$mdRenderer.render(data)"></div>
  </v-container>
</template>

<script>
export default {
  async setup(props) {
    const { data: data } = await useFetch(
      "https://raw.githubusercontent.com/IFB-ElixirFr/Wasm4Learn/main/CHANGELOG.md"
    );

    return { data };
  },
};
</script>

<style>
li {
  margin-left: 40px !important;
}
h2 {
  margin: 30px 0px 10px 0px !important;
}

h1 {
  display: none;
}
</style>