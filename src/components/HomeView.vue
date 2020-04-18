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
    <VendorCard 
      vendor-name="NTUC"
      next-slot-start="2020-04-22T16:00:00+08:00"
      next-slot-end="2020-04-22T17:00:00+08:00"
      is-loading="false"
      vendor-cart-link=""
    />
    <!-- @refresh -->
  </v-container>
</template>

<script>
import PostalCodeQuery from "./PostalCodeQuery";
import VendorCard from "./VendorCard";
  export default {
    name: 'HomeView',
    components: {
      PostalCodeQuery,
      VendorCard
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
