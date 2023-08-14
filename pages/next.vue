<template>
  <v-container>
    <p class="text-h2 dividerline mt-4 mb-8" style="color: #0080bc">
      What's next ?
    </p>

    <p class="text-h6">
      Our application is still under development. Here you can find out about
      the next features and improvements we would like to develop. Do you have
      any other ideas? Don't hesitate to drop us a line
      <a :href="'https://github.com/' + repo_name + '/issues/new'" target="_blank">here</a> !
      Thank you in advance for your feedback!
    </p>
    <div v-for="m in ghValues" :key="m.number">
      <p class="my-4 text-h4">
        <a :href="m.url" target="_blank">{{ m.title }}</a>
      </p>
      <p class="text-subtitle-1">{{ m.description }}</p>
      <p class="text-h6">Issues</p>
      <ul>
        <li v-for="i in m.issues" :key="i.id">
          {{ i.title }} (<a :href="i.html_url" target="_blank">#{{ i.number }}</a
          >)
        </li>
      </ul>
    </div>
  </v-container>
</template>

<script>
export default {
  async setup() {
    const config = useRuntimeConfig();
    let repo_name = config.public.repo_name;
    const { data: data } = await useFetch(
      "https://api.github.com/repos/" + repo_name + "/milestones"
    );
    const ghValues = data.value;

    for (const pos_ghValue in ghValues) {
      const { data: temp } = await useFetch(
        "https://api.github.com/repos/" + repo_name + "/issues",
        {
          query: { milestone: ghValues[pos_ghValue].number },
        }
      );

      ghValues[pos_ghValue]["issues"] = temp.value;
    }

    return { ghValues, repo_name };
  },
};
</script>

<style>
li {
  margin-left: 40px !important;
}
</style>