<template>
  <v-sheet v-for="(n, keyC) in navigation" :key="keyC" class="pa-9" style="overflow: auto; margin : 0;">
    <v-row no-gutters>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <p class="text-h2 mdi mdi-school dividerline" style="color: #0080bc"> Learn {{ n.title }}</p>
        </v-sheet>
        <v-sheet class="pa-2 ma-2">
          <h3 class="text-black text-h6" style="font-weight: normal;">{{ n.description }}</h3>
        </v-sheet>
      </v-col>
      <v-col cols="2">
        <v-sheet class="pa-6 rounded-lg justify-center">
          <img :src="n.image" alt="logo" style="height: 150px; display: block;
                      margin-left: auto;
                      margin-right: auto;" />
        </v-sheet>
      </v-col>
    </v-row>

    <div v-for="(n, key) in navigation" :key="key">
      <div v-for="(section, sectionKey) in n.children" :key="sectionKey">
        <h2>{{ section.title }}</h2>
        <div class="d-flex flex-wrap">
          <v-card outlined elevation="3" v-for="(c, keyC) in section.children" :key="keyC" width="350px"
            class="ma-5 rounded-xl">
            <!-- @click="changePath(section._path, c._dir)"> -->
            <v-card-text class="text-h6"><strong>{{ c.title }}</strong></v-card-text>
            <v-card-text>
              <div v-if="c.belt">
                <v-chip v-for="(b, kb) in c.belt" :key="kb" class="ma-1" size="small"
                  :variant="b == 'white' ? 'outlined' : 'tonal'" :color="b == 'white' ? '' : b">
                  {{ b }} belt
                </v-chip>
              </div>
              <div v-if="c.tags">
                <v-chip v-for="(t, kt) in c.tags" :key="kt" class="ma-1" size="small">
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
                    <v-btn color="primary" v-bind="props" class="lighten-4 mx-0"><strong>Program<v-icon color="info"
                          class="mx-2" icon="mdi-plus" /></strong>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="changePath(section._path, c._dir)" v-for="(c2, keyC2) in c.children"
                      :key="keyC2">
                      <v-list-item-title>{{ c2.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <!-- <v-list v-for="(c2, keyC2) in c.children" :key="keyC2">
                {{ c2.title }}
              </v-list> -->
                <v-btn @click="changePath(section._path, c._dir)" class="bg-primary lighten-4 mx-1">Start Now</v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </v-sheet>
</template>

<script>
export default {
  async setup(props) {
    const route = useRoute();

    let lang = route.params.lang;
    const { data: navigation } = await useAsyncData("navigation", () =>
      fetchContentNavigation("/" + lang + "/")
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
/* .dividerline::after {
    content: '';
    display: block;
    position: absolute;
    background-color: #cddd00;
    height: 10px;
    width: 30%;
    text-decoration: none;
    position: relative;
     
   } */

.dividerline:after {
  position: absolute;
  content: '';
  height: 5px;
  /* adjust this to move up and down. you may have to adjust the line height of the paragraph if you move it down a lot. */
  bottom: -10px;
  margin: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: #cddd00;
}

.dividerline {
  text-decoration: none;
  position: relative;
}
</style>