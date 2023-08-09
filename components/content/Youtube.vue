<template>
    <div class="text-center">
  <iframe
    width="100%"
    height="315"
    :src="'https://www.youtube.com/embed/' + id"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
    style="max-width: 560px;"
  ></iframe>
</div>
</template>

<script>
export default {
  props: {
    id: String,
  },
};
</script>

<style>
</style>