<template>
  <v-app>
    <v-app-bar 
      app 
      color="primary" 
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="App Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/logo_no_bg.svg')"
          transition="scale-transition"
          width="56"
        />

        <h2 class="headline font-weight-bold ">
          Give Me Slot
        </h2>
      </div>
    </v-app-bar>

    <v-content>
      <HomeView />
    </v-content>
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
