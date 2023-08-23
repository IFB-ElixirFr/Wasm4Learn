<template>
  <div v-if="itemSession">
    <v-card class="d-flex flex-row" @click="changePath(itemSession._path)">
      <img
        :src="itemSession.navigation.language"
        alt=""
        style="height: 50px"
        class="ma-4"
      />
      <div>
        <h1>{{ itemSession.title }}</h1>
        <p class="mb-2">{{ itemSession.navigation.description }}</p>

        <template v-if="itemSession.navigation.belt">
          <Belts :belts="itemSession.navigation.belt" />
        </template>
        <template v-if="itemSession.navigation.tags">
          <Tags :tags="itemSession.navigation.tags" />
        </template>

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

export default {
  props: {
    itemSession: null,
  },
  methods: {
    changePath(stepPath) {
      var pathParts = stepPath.replace("/_dir", "");
      var id = pathParts.split("/");
      id = id[id.length - 1];

      if (!pathParts.startsWith("/")) {
        pathParts = "/" + pathParts;
      }

      const router = useRouter();
      router.push({
        path: pathParts.replace(id, ""),
        query: { id: id },
      });
    },
  },
};
</script>

<style>
</style>