<template>
  <div v-for="(navL1, keyL1) in navigation" :key="keyL1">
    <v-sheet
      v-for="(n, keyC) in navL1.children"
      :key="keyC"
      class="pa-9"
      style="overflow: auto; margin: 0"
    >
      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <p
              class="text-h2 mdi mdi-school dividerline"
              style="color: #0080bc"
            >
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
              v-if="n.image"
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

      <div class="d-flex flex-wrap">
        <v-card
          outlined
          elevation="3"
          v-for="(c, keyC) in n.children"
          :key="keyC"
          width="350px"
          class="ma-3 rounded-lg"
        >
          <v-card-text class="d-flex flex-column" style="height: 100%">
            <v-badge dot :color="changeColor(c._path, 'white')">
              <p class="text-h6 mb-3">
                <strong>{{ c.title }}</strong>
              </p>
            </v-badge>
            <div class="mb-2">
              <div v-if="c.author">
                <v-icon class="me-2">mdi-account-edit</v-icon>
                {{ c.author }}
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
              <Belts :belts="c.belt" />
            </div>
            <div v-if="c.tags">
              <Tags :tags="c.tags" />
            </div>
            <v-spacer></v-spacer>
            <p class="mt-4 mb-1"><b>Description</b></p>
            <p>
              {{ n.description }}
            </p>
            <br />

            <p><b>Progression</b></p>
            <div class="overflow-y-auto" style="width: 100%">
              <v-timeline truncate-line="both" direction="horizontal">
                <v-timeline-item
                  v-for="step in n.steps"
                  :key="step"
                  :dot-color="changeColor('/' + step)"
                  @click="changePathStep(step)"
                >
                </v-timeline-item>
              </v-timeline>
            </div>

            <v-card-actions class="justify-center">
              <v-btn
                @click="changePath(n._path)"
                class="bg-primary lighten-4 mx-1"
                >Start Now</v-btn
              >
            </v-card-actions>
          </v-card-text>
        </v-card>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useStorage } from "@vueuse/core";

export default {
  async setup(props) {
    const route = useRoute();
    const pathParent = route.path.replaceAll("all/", "");

    let lang = route.params.lang;
    const { data: navigation } = await useAsyncData("navigation", () =>
      fetchContentNavigation(pathParent)
    );
    return { navigation, lang };
  },
  methods: {
    changePath(stepPath) {
      var pathParts = stepPath.replace("/_dir", "");
      var id = pathParts.split("/");
      id = id[id.length - 1];
      const router = useRouter();
      if (!pathParts.startsWith("/")) {
        pathParts = "/" + pathParts;
      }

      router.push({
        path: pathParts.replace(id, ""),
        query: { id: id },
      });
    },
    changePathStep(stepPath) {
      const pathParts = stepPath.split("/");
      const id = pathParts[pathParts.length];
      var path = stepPath.replace(id, "");
      if (!path.startsWith("/")) {
        path = "/" + path;
      }

      console.log(path)
      const router = useRouter();
      router.push({
        path: path,
        query: { id: id },
      });
    },
    changeColor(sessionPath, defaultColor = "grey") {
      const theDefault = {};
      const state = useStorage(
        "my-progression-store",
        theDefault,
        localStorage,
        {
          mergeDefaults: true,
        }
      );
      if (sessionPath in state.value) {
        if (state.value[sessionPath].status == "started") {
          return "blue";
        } else {
          return "green";
        }
      } else {
        return defaultColor;
      }
    },
  },
};
</script>

<style>
</style>