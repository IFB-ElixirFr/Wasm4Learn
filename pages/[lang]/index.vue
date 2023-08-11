<template>
    <div v-for="(nk, keynk) in navigation" :key="keynk">
    <v-sheet
    color="#0080bc"
    class="d-flex flex-wrap justify-center align-center pa-9 ma-0"
  >
  <v-row no-gutters>
      <v-col>
        <v-sheet class="pa-2 ma-2"  color="#0080bc">
          <h2 class="text-white">Learn {{ nk.title }}</h2>
          <h1>

      <h6 class="text-white" style="font-weight: normal;">{{ nk.description }}</h6>
    </h1>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-2 ma-2 rounded-xl">
          <img :src="nk.image" alt="logo" style="height: 100px" />
        </v-sheet>
      </v-col>
    </v-row>

  <!-- <h2>Learn {{ n.title }}</h2>
    <h1>
      <img :src="n.image" alt="logo" style="height: 100px" />
      <h6 style="font-weight: normal;">{{ n.description }}</h6>
    </h1>
    <br/> -->
  </v-sheet>
</div>
  <div v-for="(n, key) in navigation" :key="key">
    
    <div v-for="(section, sectionKey) in n.children" :key="sectionKey">
      <h2>{{ section.title }}</h2>
      <div class="d-flex flex-wrap">
        <v-card outlined elevation="3"
          v-for="(c, keyC) in section.children"
          :key="keyC"
          width="350px"
          class="ma-5 rounded-xl">
        <!-- @click="changePath(section._path, c._dir)"> -->
          <v-card-text
          class="text-h6"><strong>{{ c.title }}</strong></v-card-text>
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
            <p><b>Description</b></p>
              <v-card-text>
              {{ c.description }}
              </v-card-text>
              <v-card-actions class="justify-space-between">
                <v-menu open-on-hover>
                  <template v-slot:activator="{ props }">
                  <v-btn
                    color="primary"
                    v-bind="props"
                    class="lighten-4 mx-0"
                    ><strong>Program<v-icon color="info" class="mx-2" icon="mdi-plus"/></strong>
                  </v-btn>
                </template>
                  <v-list>
                    <v-list-item
                    @click="changePath(section._path, c._dir)"
                    v-for="(c2, keyC2) in c.children" :key="keyC2">
                      <v-list-item-title>{{ c2.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              <!-- <v-list v-for="(c2, keyC2) in c.children" :key="keyC2">
                {{ c2.title }}
              </v-list> -->
              <v-btn
            @click="changePath(section._path, c._dir)"
            class="bg-primary lighten-4 mx-1"
            >Start Now</v-btn>
          </v-card-actions>
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
      router.push({ path: pathParent + "/", query: { id: id }});
    },
  },
};
</script>

<style>
</style>