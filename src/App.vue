<template>
  <v-app>
    <v-app-bar 
      app 
      color="primary" 
      dark
    >
      <div class="d-flex align-center flex-grow-1">
        <v-img
          alt="App Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/logo_no_bg.svg')"
          transition="scale-transition"
          width="56"
        />

        <h2 class="headline font-weight-bold mr-auto">
          Give Me Slot
        </h2>

        <v-switch
          v-model="$vuetify.theme.dark"
          :label="$vuetify.breakpoint.name != 'xs' ? 'Dark mode': ''"
          :color="$vuetify.theme.themes.light.primary"
          hide-details
          inset
          persistent-hint
        />
      </div>
    </v-app-bar>

    <v-main :class="{'grey lighten-3': !$vuetify.theme.dark}">
      <HomeView />
    </v-main>
  </v-app>
</template>

<script>
import HomeView from "./components/HomeView";

export default {
  name: "App",

  components: {
    HomeView
  }
};
</script>
