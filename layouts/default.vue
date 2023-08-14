
<template>
  <v-app id="metark" full-height>
    <v-layout>
      <Nav></Nav>

      <v-main class="fill-height" scrollable>
        <div
          class="ma-3 fill-height"
          style="max-height: calc(100% - 110px); overflow-y: auto"
        >
          <slot />
        </div>
        <Footer />
      </v-main>
    </v-layout>
  </v-app>
</template>

<style>
.dividerline:after {
  position: absolute;
  content: "";
  height: 5px;
  /* adjust this to move up and down. you may have to adjust the line height of the paragraph if you move it down a lot. */
  bottom: -10px;
  margin: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: #cddd00;
}

.dividerline {
  text-decoration: none;
  position: relative;
}
</style>