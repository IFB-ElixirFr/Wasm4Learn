<template>
    <div>
        {{ articles }}
    </div>
</template>

<script setup>
const articles = await queryContent('/').find()
</script>