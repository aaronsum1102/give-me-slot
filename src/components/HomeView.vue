<template>
  <v-container>
    <ErrorModal
      :error-message="errorMessge"
      @acknowledge="updateErrorMessage('')"
    />
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
      :postal-code="postalCode"
      :is-disabled="!isInitDone"
      @updatePostalCode="updatePostalCode($event)"
      @slotQuery="fetchSlotsForAllVendors()"
    />

    <p 
      v-if="lastUpdate"
      class="font-italic text-center" 
    >
      Last update: {{ lastUpdate }}
    </p>

    <v-row 
      v-if="!isInitDone"
      class="justify-center mt-4"
    >
      <v-progress-circular
        :size="80"
        color="primary"
        indeterminate
      />
    </v-row>
    
    <v-row 
      v-else
      lass="justify-center"
    >
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
          :has-valid-query="hasValidQuery"
          @refresh="fetchSlots(vendor.id)"
        />
      </v-col>  
    </v-row>  
  </v-container>
</template>

<script>
import ErrorModal from "./ErrorModal";
import PostalCodeQuery from "./PostalCodeQuery";
import VendorCard from "./VendorCard";
import { mapState, mapActions } from "vuex";
  export default {
    name: 'HomeView',
    components: {
      ErrorModal,
      PostalCodeQuery,
      VendorCard,
    },
    data: function() {
      return {
        title: "Welcome to Give Me Slot",
        subTitle : "A portal to check for the earliest delivery slot from major online groceries delivery providers in Singapore.",
        isLoading: false,
        isSuccess: false,
        isInitDone: false
      }
    },
    computed: {
      ...mapState([
        "vendors", 
        "queryStatus", 
        "errorMessge",
        "postalCode",
        "lastUpdate"
      ]),
      hasValidQuery : function () {
        if(this.postalCode && this.postalCode.length === 6 && !isNaN(parseInt(this.postalCode)) ) {  
          return true;
        } else {
          return false;
        }
      }
    },
    async beforeMount() {
      await this.fetchSettings();
      this.isInitDone = true;
    },
    methods: {
      ...mapActions([
        "fetchSettings",
        "updateErrorMessage",
        "updatePostalCode", 
        "fetchSlots",
        "fetchSlotsForAllVendors"
      ])
    } 
  }
</script>
