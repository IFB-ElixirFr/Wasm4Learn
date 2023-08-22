<template>
  <v-container>
    <div class="prose" id="contentDiv">
      <ContentRenderer :value="data" v-if="data" :key="data._path">
        <p class="text-h2 dividerline mt-4 mb-8" style="color: #0080bc">
          {{ data.title }}
        </p>

        <ContentRendererMarkdown :value="data.body" />
        <div class="text-center">
          <v-btn
            color="success"
            size="x-large"
            @click="changePath(stepsInfo[0].parentPath)"
            prepend-icon="mdi-play"
          >
            Start now !
          </v-btn>
        </div>

        <p class="text-h4">Program</p>
        <v-timeline side="end" truncate-line="both">
          <v-timeline-item
            v-for="(c, kc) in stepsInfo"
            :key="kc"
            :dot-color="c.color"
            size="small"
          >
            <CardSession :itemSession="c"/>
          </v-timeline-item>
        </v-timeline>
      </ContentRenderer>
    </div>
    <br />
    <div class="text-center">
      <v-btn
        color="success"
        size="x-large"
        @click="changePath(stepsInfo[0].parentPath)"
        prepend-icon="mdi-play"
      >
        Start now !
      </v-btn>
    </div>
  </v-container>
</template>
  
<script>
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useStorage } from "@vueuse/core";

export default {
  data() {
    return {
      data: "",
      path: null,
    };
  },
  async setup() {
    // Manage path and get language
    const route = useRoute();
    let lang = route.params.lang;
    const id = ref(route.query.id ? route.query.id : "");
    var step = ref(route.query.step ? route.query.step : 0);
    const pathParent = route.path;
    const path = route.path + id.value;

    // Get Tuto pages
    const tutosList = await queryContent(path).find();
    var steps = null;

    for (var i = tutosList.length - 1; i >= 0; i--) {
      if (
        tutosList[i]._path == path + "_dir" ||
        tutosList[i]._path == path + "/_dir"
      ) {
        steps = tutosList[i];
        tutosList.splice(i, 1);
      }
    }

    const theDefault = {};
    const state = useStorage("my-progression-store", theDefault, localStorage, {
      mergeDefaults: true,
    });
    state.value[path] = { status: "started", step: 0 };

    var stepsInfo = [];
    for (const i in steps.navigation.steps) {
      const tempPath = "/" + lang + "/" + steps.navigation.steps[i];
      const temp = await queryContent(tempPath + "/_dir").findOne();

      temp["parentPath"] = steps.navigation.steps[i];
      temp["type"] = steps.navigation.steps[i].split("/")[0];
      
      if (tempPath in state.value) {
        if (state.value[tempPath].status == "started") {
          temp["color"] = "blue";
        } else {
          temp["color"] = "green";
        }
      } else {
        temp["color"] = "grey";
      }
      stepsInfo.push(temp);
    }

    return {
      tutosList,
      steps,
      stepsInfo,
      pathParent,
      id,
      step,
      lang,
      state,
    };
  },
  async mounted() {
    this.data = this.tutosList[this.step];
  },

};
</script>
  
<style>
.gutter {
  background-color: #eee;
  background-repeat: no-repeat;
  background-position: 50%;
}

.gutter.gutter-vertical {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=");
  cursor: row-resize;
}

p {
  margin-top: 10px;
  margin-bottom: 10px;
}

div.prose pre {
  border: solid gray 1px;
  padding: 5px;
}

div.prose a {
  color: black;
  text-decoration: none;
}

pre {
  overflow-x: auto !important;
  margin-bottom: 10px !important;
}
li {
  margin-left: 25px;
}
.math {
  font-family: Courier, monospace;
}
</style>