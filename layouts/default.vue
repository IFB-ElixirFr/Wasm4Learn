
<template>
  <v-app id="metark" full-height>
    <v-layout>
      <Nav></Nav>
      <v-main class="fill-height" scrollable>
        <div class="ma-3 fill-height" style="max-height: calc(100% - 115px)">
          <slot />
        </div>
        <Footer />
      </v-main>
    </v-layout>
  </v-app>
</template>