
<template>
  <v-app id="metark" full-height>
    <v-layout>
      <Nav></Nav>
      
      <v-main class="fill-height" scrollable>
        <v-alert type="warning" text="POC under development" class="ma-2"></v-alert>
        <div class="ma-3 fill-height" style="max-height: calc(100% - 184px); overflow-y: auto;">
          <slot />
        </div>
        <Footer />
      </v-main>
    </v-layout>
  </v-app>
</template>