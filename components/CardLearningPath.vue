<template>
  <div v-if="itemSession">
    <v-card class="d-flex flex-row">
      <img
        :src="itemSession.navigation.language"
        alt=""
        style="height: 50px"
        class="ma-4"
      />
      <div>
        <h1>{{ itemSession.title }}</h1>
        <p class="mb-2">{{ itemSession.navigation.description }}</p>
        <div class="text-right me-2">
          <v-btn variant="text" @click="changePath(itemSession._path)"
            >+ Read more</v-btn
          >
        </div>

        <template v-if="itemSession.navigation.belt">
          <Belts :belts="itemSession.navigation.belt" />
        </template>
        <template v-if="itemSession.navigation.tags">
          <Tags :tags="itemSession.navigation.tags" />
        </template>

        <p><b>Progression</b></p>
        <div class="overflow-y-auto" style="width: 100%">
          <v-timeline truncate-line="both" direction="horizontal">
            <v-timeline-item
              v-for="step in itemSession.stepsDict"
              :key="step"
              :dot-color="changeColor(step.path)"
              @click="changePathStep(step.path)"
            >
            </v-timeline-item>
          </v-timeline>
        </div>

        <div class="d-flex flex-row">
          <v-sheet v-if="itemSession.navigation.author" class="ma-2 pa-2"
            ><v-icon class="me-2">mdi-account-edit</v-icon>
            {{ itemSession.navigation.author }}</v-sheet
          >
          <v-sheet v-if="itemSession.navigation.language" class="ma-2 pa-2"
            ><v-icon class="me-2">mdi-account-voice</v-icon>
            <span
              :class="'ma-1 fi fi-' + itemSession.navigation.language"
            ></span
          ></v-sheet>
          <v-sheet v-if="itemSession.navigation.duration" class="ma-2 pa-2"
            ><v-icon class="me-2">mdi-clock-time-five-outline</v-icon>
            {{ itemSession.navigation.duration }}</v-sheet
          >
          <v-sheet v-if="itemSession.type" class="ma-2 pa-2"
            ><v-icon class="me-2">mdi-head-lightbulb</v-icon>
            {{ itemSession.type }}</v-sheet
          >
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useStorage } from "@vueuse/core";

export default {
  props: {
    itemSession: null,
  },
  methods: {
    changePath(stepPath) {
      var pathParts = stepPath.replace("/_dir", "");
      var id = pathParts.split("/");
      id = id[id.length - 1];
      const router = useRouter();
      router.push({
        path: pathParts.replace(id, ""),
        query: { id: id },
      });
    },
    changePathStep(stepPath) {
      const pathParts = stepPath.split("/");
      const id = pathParts[pathParts.length];
      const path = stepPath.replace(id, "");
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