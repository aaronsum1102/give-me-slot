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

    <v-row class="justify-center">
      <v-col 
        v-for="(vendor, index) in vendors"
        :key="index"
        cols="12" 
        sm="6"
        lg="5"
      >
        <VendorCard
          :vendor-id="vendor.id"
          :vendor-name="vendor.name"
          :next-slot-start="queryStatus[vendor.id].startDateTime"
          :next-slot-end="queryStatus[vendor.id].endDateTime"
          :is-loading="queryStatus[vendor.id].isLoading"
          :vendor-cart-link="vendor.link"
        />
      </v-col>  
    </v-row>  
    
    <!-- @refresh -->
  </v-container>
</template>

<script>
import PostalCodeQuery from "./PostalCodeQuery";
import VendorCard from "./VendorCard";
import { mapState } from "vuex";
  export default {
    name: 'HomeView',
    components: {
      PostalCodeQuery,
      VendorCard,
    },
    data: function() {
      return {
        title: "Welcome to Give Me Slot",
        subTitle : "A portal to check for the earliest delivery slot from major online groceries delivery providers in Singapore.",
        isLoading: false,
        isSuccess: false,
      }
    },
    computed: {
      ...mapState(["vendors", "queryStatus"])
    },
    methods: {
      onSlotQuery: function(postalCode) {
        alert("query for postal code " + postalCode);
      }
    }
  }
</script>
