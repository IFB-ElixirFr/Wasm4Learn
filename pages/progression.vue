<template>
  <v-container>
    <p class="text-h2 dividerline mt-4 mb-8" style="color: #0080bc">
      My progression
    </p>
    <v-btn @click="clear" class="my-4">Clear progression</v-btn>

    <p class="text-h3">Learning path</p>
    <template v-if="learningPath.length != 0">
      <template v-for="(c, kc) in learningPath" :key="kc">
        <CardLearningPath :itemSession="c" />
        <br />
      </template>
    </template>
    <template v-else>
      <p>No learning path has been started</p>
    </template>

    <p class="text-h3">Sessions</p>
    <p class="text-h4">Started</p>
    <template v-if="started.length != 0">
      <template v-for="(c, kc) in started" :key="kc">
        <CardSession :itemSession="c" />
        <br />
      </template>
    </template>
    <template v-else>
      <p>No session has been started</p>
    </template>

    <p class="text-h4">Finish</p>
    <template v-if="finish.length != 0">
      <template v-for="(c, kc) in finish" :key="kc">
        <CardSession :itemSession="c" />
        <br />
      </template>
    </template>
    <template v-else>
      <p>No session has been completed</p>
    </template>
  </v-container>
</template>

<script>
import { useStorage } from "@vueuse/core";

export default {
  data() {
    return {
      started: [],
      finish: [],
      learningPath: [],
    };
  },
  async created() {
    await this.getState();
  },
  methods: {
    async getState() {
      const theDefault = {};
      const state = useStorage(
        "my-progression-store",
        theDefault,
        localStorage,
        {
          mergeDefaults: true,
        }
      );

      for (const [key, value] of Object.entries(state.value)) {
        if (key.split("/")[2] == "learning-path") {
          console.log(key)
          const tempLP = await queryContent(key + "/_dir").findOne();
          var stepsDict = [];
          for (const i in tempLP.navigation.steps) {
            const tempPath = "/" + key.split("/")[1] + "/" + tempLP.navigation.steps[i];
            if (tempPath in state.value) {
              if (state.value[tempPath].status == "started") {
                stepsDict.push({ color: "blue", path: tempPath });
              } else {
                stepsDict.push({ color: "green", path: tempPath });
              }
            } else {
              stepsDict.push({ color: "grey", path: tempPath });
            }
          }
          tempLP["type"] = key.split("/")[2];
          tempLP["stepsDict"] = stepsDict;
          this.learningPath.push(tempLP);
        } else {
          switch (value.status) {
            case "started":
              const tempStarted = await queryContent(key + "/_dir").findOne();
              tempStarted["type"] = key.split("/")[2];
              this.started.push(tempStarted);
              break;
            case "finish":
              const tempFinish = await queryContent(key + "/_dir").findOne();
              tempFinish["type"] = key.split("/")[2];
              this.finish.push(tempFinish);
              break;
          }
        }
      }
    },
    clear() {
      const theDefault = {};
      const state = useStorage(
        "my-progression-store",
        theDefault,
        localStorage,
        {
          mergeDefaults: true,
        }
      );

      state.value = null;
      this.started = [];
      this.finish = [];
      this.learningPath = [];
    },
  },
};
</script>

<style>
</style>