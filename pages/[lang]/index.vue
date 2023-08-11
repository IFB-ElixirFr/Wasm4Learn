<template>
  <div v-for="(n, key) in navigation" :key="key">
    <h1>
      <img :src="n.image" alt="logo" style="height: 100px" /> {{ n.title }}
    </h1>
    <br />
    <p class="text-subtitle-1">{{ n.description }}</p>
    <div v-for="(section, sectionKey) in n.children" :key="sectionKey">
      <h2>{{ section.title }}</h2>
      <div class="d-flex flex-wrap">
        <v-card
          @click="changePath(section._path, c._dir)"
          v-for="(c, keyC) in section.children"
          :key="keyC"
          width="300px"
          class="ma-5"
        >
          <v-card-title>{{ c.title }}</v-card-title>
          <v-card-text>
            <div v-if="c.belt">
              <v-chip
                v-for="(b, kb) in c.belt"
                :key="kb"
                class="ma-1"
                size="small"
                :variant="b == 'white' ? 'outlined' : 'tonal'"
                :color="b == 'white' ? '' : b"
              >
                {{ b }} belt
              </v-chip>
            </div>
            <div v-if="c.tags">
              <v-chip
                v-for="(t, kt) in c.tags"
                :key="kt"
                class="ma-1"
                size="small"
              >
                {{ t }}
              </v-chip>
            </div>
            <p><b>Programme</b></p>
            <ul class="ms-4">
              <li v-for="(c2, keyC2) in c.children" :key="keyC2">
                {{ c2.title }}
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async setup(props) {
    const route = useRoute();

    let lang = route.params.lang;
    const { data: navigation } = await useAsyncData("navigation", () =>
      fetchContentNavigation("/" + lang  + "/")
    );
    return { navigation };
  },
  methods: {
    changePath(pathParent, id) {
      const router = useRouter();
      router.push({ path: pathParent + "/", query: { id: id } });
    },
  },
};
</script>

<style>
</style>