<template>
  <v-container>
    <p class="text-h2 dividerline mt-4 mb-8" style="color: #0080bc">
      My progression
    </p>
    <v-btn @click="clear" class="my-4">Clear progression</v-btn>

    <div v-for="(e, ke) in progressionElements" :key="ke">
      <p class="text-h3 mb-4">{{ clearTitle(ke) }}</p>

      <div v-for="(elStatus, kelStatus) in e" :key="kelStatus">
        <div v-if="elStatus.length != 0">
          <p class="text-h4 mb-4">{{ clearTitle(kelStatus) }}</p>
          <div v-if="ke == 'learning-path'">
            <template v-for="(c, kc) in elStatus" :key="kc">
              <CardLearningPath :itemSession="c" />
              <br />
            </template>
          </div>
          <div v-else>
            <template v-for="(c, kc) in elStatus" :key="kc">
              <CardSession :itemSession="c" />
              <br />
            </template>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { useStorage } from "@vueuse/core";

export default {
  data() {
    return {
   
      progressionElements: {},
    };
  },
  async created() {
    await this.getState();
  },
  methods: {
    clearTitle(title) {
      const temp = title.replace("-", " ");
      return temp.charAt(0).toUpperCase() + temp.slice(1);
    },
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
        const type = key.split("/")[1];

        if (!(type in this.progressionElements)) {
          this.progressionElements[type] = { started: [], finish: [] };
        }
        const temp = await queryContent(key + "/_dir").findOne();
        if (type == "learning-path") {
          var stepsDict = [];
          for (const i in temp.navigation.steps) {
            const tempPath =
              "/" + key.split("/")[1] + "/" + temp.navigation.steps[i];
            if (tempPath in state.value) {
              if (state.value[tempPath].status == "started") {
                stepsDict.push({ color: "blue", path: tempPath });
              } else {
                stepsDict.push({ color: "green", path: tempPath });
              }
            } else {
              stepsDict.push({ color: "grey", path: tempPath });
            }
            temp["stepsDict"] = stepsDict;
          }
        }
        temp["type"] = key.split("/")[2];
        this.progressionElements[type][value.status].push(temp);
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
      this.progressionElements = {};
    },
  },
};
</script>

<style>
</style>