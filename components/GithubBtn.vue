<template>
  <v-btn :href="repo_url" target="_blank" variant="text">
    <div class="d-flex flex-row">
      <v-sheet
        class="me-3 text-white pt-1"
        style="background-color: transparent !important"
        ><v-icon size="26px">mdi-github</v-icon></v-sheet
      >
      <v-sheet
        class="text-white text-body-2"
        style="background-color: transparent !important"
      >
        <p class="ma-0">{{ repo_name }}</p>
        <p class="text-caption ma-0">
          <v-icon>mdi-tag-outline</v-icon> {{ ghRelease.tag_name }}
          <v-icon>mdi-star-outline</v-icon> {{ ghValue.stargazers_count }}
          <v-icon>mdi-source-fork</v-icon> {{ ghValue.forks_count }}
        </p>
      </v-sheet>
    </div>
  </v-btn>
</template>

<script>
export default {
  props: {
    repo_url: String,
    repo_name: String,
  },
  async setup(props) {
    const { data: data } = await useFetch(
      "https://api.github.com/repos/" + props.repo_name
    );

    const ghValue = data.value;
    const { data: release } = await useFetch(
      "https://api.github.com/repos/" + props.repo_name + "/releases/latest"
    );
    const ghRelease = release.value;
    return { ghValue, ghRelease };
  },
};
</script>

<style>
</style>