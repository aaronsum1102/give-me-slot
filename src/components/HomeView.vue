<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <h1 class="display-2 font-weight-bold mb-3">
          {{ title }}
        </h1>
        <p class="subheading font-weight-regular">
          {{ subTitle }}
        </p>
      </v-col>
    </v-row>
    <postal-code-query 
      :is-loading="isLoading"
      :is-success="isSuccess"
      @slotQuery="onSlotQuery"
    />
  </v-container>
</template>

<script>
import PostalCodeQuery from "./PostalCodeQuery";
  export default {
    name: 'HomeView',
    components: {
      PostalCodeQuery
    },
    data: function() {
      return {
        title: "Welcome to Give Me Slot",
        subTitle : "A portal to check for the earliest delivery slot from major online groceries delivery providers in Singapore.",
        isLoading: false,
        isSuccess: false,
      }
    },
    methods: {
      onSlotQuery: function(postalCode) {
        alert("query for postal code " + postalCode);
      }
    }
  }
</script>
