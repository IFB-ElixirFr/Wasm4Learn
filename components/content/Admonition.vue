<template>
  <v-card class="mb-2">
    <v-card-title :style="{ 'background-color': element.color }">
      <span class="text-h6"
        ><v-icon size="x-small">{{ element.icon }} </v-icon>
        {{ element.title }}</span
      >
    </v-card-title>
    <v-card-text class="pt-4">
      <p v-html="$mdRenderer.render(text)"></p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    type: String,
    title: String,
    text: String,
  },
  setup(props) {
    var typeStyle = [
      {
        type: "note",
        color: "#ECF3FF",
        title: "Note",
        icon: "mdi-pen",
      },
      {
        type: "abstract",
        color: "#EAF7FF",
        title: "Abstract",
        icon: "mdi-clipboard-text",
      },
      {
        type: "info",
        color: "#EAF7FA",
        title: "Info",
        icon: "mdi-pen",
      },
      {
        type: "tip",
        color: "#EBF8F6",
        title: "Tip",
        icon: "mdi-fire",
      },
      {
        type: "success",
        color: "#EBF9ED",
        title: "Success",
        icon: "mdi-check-bold",
      },
      {
        type: "question",
        color: "#F0FBEA",
        title: "Question",
        icon: "mdi-chat-question",
      },
      {
        type: "warning",
        color: "#FFF3E8",
        title: "Warning",
        icon: "mdi-alert",
      },
      {
        type: "failure",
        color: "#FFEEEE",
        title: "Failure",
        icon: "mdi-alert",
      },
      {
        type: "danger",
        color: "#FFEAEC",
        title: "Danger",
        icon: "mdi-alert",
      },
      {
        type: "bug",
        color: "#6D6D6D",
        title: "Bug",
        icon: "mdi-alert",
      },
      {
        type: "example",
        color: "#F1EDFF",
        title: "Example",
        icon: "mdi-alert",
      },
      {
        type: "quote",
        color: "#F5F5F5",
        title: "Quote",
        icon: "mdi-format-quote-close",
      },
    ];

    var element = typeStyle.find((x) => x.type == props.type.toLowerCase());

    if (element === undefined) {
      element = {
        type: "note",
        color: "#ECF3FF",
        title: "Note",
        icon: "mdi-pen",
      };
    }
    return { element };
  },
};
</script>

<style>
</style>