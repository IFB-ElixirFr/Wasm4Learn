<template>
  <v-card :color="color" class="pa-4 my-4 text-white" :id="id">
    <h3>{{ question }}</h3>
    <v-radio-group v-if="type == 'simple'" v-model="radios">
      <v-radio
        v-for="(c, k) in choices"
        :key="k"
        :label="c.value"
        :value="c.value"
      ></v-radio>
    </v-radio-group>

    <div v-if="type == 'multiple'">
      <v-checkbox
        hide-details="true"
        v-for="(c, k) in choices"
        :key="k"
        :label="c.value"
        :value="c.value"
        :id="k"
        v-model="checkedNames"
      ></v-checkbox>
    </div>
    <div class="text-right">
      <v-btn @click="submit">Submit</v-btn>
    </div>
    <p>{{ message }}</p>
  </v-card>
</template>

<script>
export default {
  props: { choices: Array, type: String, question: String },
  data() {
    return {
      radios: "",
      color: "#385F73",
      message: "",
      checkedNames: ref([]),
    };
  },
  setup(props) {
    var id = new Date().valueOf();
    id = "editorArea" + id;
    return { id };
  },
  methods: {
    async submit() {
      if (this.type == "simple") {
        var test = false;
        for (const c of this.choices) {
          if (c.value == this.radios && c.valid) {
            this.color = "green";
            this.message = "Bonne réponse !";
            test = true;
          }
        }
        if (!test) {
          this.color = "red";
          this.message = "Mauvaise réponse !";
        }
      } else if (this.type == "multiple") {
        var test = true;
        for (const c of this.choices) {
          if (c.valid && this.checkedNames.indexOf(c.value) == -1) {
            test = false;
            break;
          }
        }
        if (!test) {
          this.color = "red";
          this.message = "Mauvaise réponse !";
        } else {
          this.color = "green";
          this.message = "Bonne réponse !";
        }
      }
    },
  },
};
</script>

<style>
</style>