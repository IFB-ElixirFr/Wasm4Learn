<template>
  <v-card :color="color" class="pa-4 my-4 text-white">
    <h3><v-icon>mdi-sort</v-icon> {{ question }}</h3>
    <draggable
      v-if="listsorted"
      v-model="list"
      @start="drag = true"
      @end="drag = false"
      item-key="name"
      class="list-group my-4"
      ghost-class="ghost"
    >
      <template #item="{ element }">
        <div class="list-group-item">{{ element.name }}</div>
      </template>
    </draggable>
    <v-btn @click="submit">Submit</v-btn>

    <p>{{ message }}</p>
  </v-card>
</template>

<script>
import draggable from "vuedraggable";

export default {
  props: { elements: Array, question: String },
  components: {
    draggable,
  },
  setup(props) {
    var listsorted = [];
    var compt = 0;
    for (const [i, value] of props.elements.entries()) {
      listsorted.push({ name: value, id: i });
    }
    return { listsorted };
  },
  data() {
    return {
      drag: false,
      list: [],
      color: "#385F73",
      message: "",
    };
  },
  mounted() {
    this.list = this.shuffle(this.listsorted);
  },
  methods: {
    shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    },
    async submit() {
      var test = true;
      for(const [i, value] of this.list.entries()) {
        if (i != value.id) {
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
    },
  },
};
</script>

<style>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.not-draggable {
  cursor: no-drop;
}

.list-group-item {
    color: black;
    padding: 0.75rem 1.25rem;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.125);
}
</style>
