<template>
  <v-sheet
    v-for="(n, keyC) in navigation"
    :key="keyC"
    class="pa-9"
    style="overflow: auto; margin: 0"
  >
    <v-row no-gutters>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <p class="text-h2 mdi mdi-school dividerline" style="color: #0080bc">
            Learn {{ n.title }}
          </p>
        </v-sheet>
        <v-sheet class="pa-2 ma-2">
          <h3 class="text-black text-h6" style="font-weight: normal">
            {{ n.description }}
          </h3>
        </v-sheet>
      </v-col>
      <v-col cols="2">
        <v-sheet class="pa-6 rounded-lg justify-center">
          <img
            :src="n.image"
            alt="logo"
            style="
              height: 150px;
              display: block;
              margin-left: auto;
              margin-right: auto;
            "
          />
        </v-sheet>
      </v-col>
    </v-row>

    <div v-for="(n, key) in navigation" :key="key">
      <div v-for="(section, sectionKey) in n.children" :key="sectionKey">
        <p class="text-h4">{{ section.title }}</p>
        <div class="d-flex flex-wrap">
          <v-card
            outlined
            elevation="3"
            v-for="(c, keyC) in section.children"
            :key="keyC"
            width="350px"
            class="ma-3 rounded-lg"
          >
            <v-card-text class="d-flex flex-column" style="height: 100%">
              <p class="text-h6 mb-3">
                <strong>{{ c.title }}</strong>
              </p>

              <div class="mb-2">
                <div v-if="c.author">
                  <v-icon class="me-2">mdi-account-edit</v-icon> {{ c.author }}
                </div>
                <v-row>
                  <v-col
                    ><div v-if="c.language">
                      <v-icon class="me-2">mdi-account-voice</v-icon>
                      <span :class="'ma-1 fi fi-' + c.language"></span></div
                  ></v-col>
                  <v-col
                    ><div v-if="c.duration">
                      <v-icon class="me-2">mdi-clock-time-five-outline</v-icon>
                      {{ c.duration }}
                    </div></v-col
                  >
                </v-row>
              </div>
              <div v-if="c.belt">
                <v-chip
                  v-for="(b, kb) in c.belt"
                  :key="kb"
                  class="ma-1 rounded-sm"
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
              <v-spacer></v-spacer>
              <p class="mt-4 mb-1"><b>Description</b></p>
              <p>
                {{ c.description }}
              </p>
              <br>
              <v-card-actions class="justify-space-between">
                <v-menu open-on-hover>
                  <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" class="lighten-4 mx-0"
                      ><strong
                        >Program<v-icon
                          color="info"
                          class="mx-2"
                          icon="mdi-plus"
                      /></strong>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      @click="changePath(section._path, c._dir)"
                      v-for="(c2, keyC2) in c.children"
                      :key="keyC2"
                    >
                      <v-list-item-title>{{ c2.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-btn
                  @click="changePath(section._path, c._dir)"
                  class="bg-primary lighten-4 mx-1"
                  >Start Now</v-btn
                >
              </v-card-actions>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </v-sheet>
</template>

<script>
import "/node_modules/flag-icons/css/flag-icons.min.css";

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
.dividerline:after {
  position: absolute;
  content: "";
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