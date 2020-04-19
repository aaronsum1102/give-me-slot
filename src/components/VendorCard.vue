<template>
  <v-card
    :loading="isLoading"
    hover
  >
    <v-row 
      class="align-center" 
      :style="{ height: cardHeight }"
    >
      <v-col cols="4">
        <v-img
          class="ml-4"
          :src="require(`../assets/${vendorId}.png`)" 
          :alt="`${vendorId}-logo`"
          width="100%"
          contain
        />
      </v-col>
      
      <v-col 
        cols="8" 
        md="6"
        style="height: 100%"
      >
        <div 
          class="d-flex flex-column"
          style="height: 100%" 
        >
          <v-card-title
            class="headline"
            v-text="vendorName"
          />

          <v-card-subtitle 
            v-if="nextSlotStart != null" 
            v-text="daysToSlot" 
          />

          <v-card-text 
            v-if="nextSlotStart && nextSlotStart != null"
            class="flex-grow-1"
          >
            <p class="mb-0">
              <strong>Date:</strong> {{ slotDate }}
              <br>
              <strong>Period:</strong> {{ slotPeriod }}
            </p>
          </v-card-text>

          <v-card-text 
            v-else-if="nextSlotStart != null"
            class="flex-grow-1"
          >
            <p class="mb-0">
              Please try again later.
            </p>
          </v-card-text>

          <v-card-actions class="d-md-none d-block pb-4">
            <v-btn 
              icon 
              :disabled="!hasValidQuery"
              @click="$emit('refresh')"
            >
              <v-icon>fa-sync</v-icon>
            </v-btn>
            <v-btn 
              icon 
              :disabled="!hasValidQuery"
              :href="vendorCartLink"
            >
              <v-icon>fa-shopping-basket</v-icon>
            </v-btn>
          </v-card-actions>  
        </div>
      </v-col>

      <v-col
        cols="2"
        class="text-center d-none d-md-block"
      >
        <v-row
          class="flex-column mr-4 fill-height"
          justify="center"
        >
          <v-col class="px-0">
            <v-btn 
              icon 
              :disabled="!hasValidQuery"
              @click="$emit('refresh')"
            >
              <v-icon>fa-sync</v-icon>
            </v-btn>
          </v-col>

          <v-col class="px-0">
            <v-btn 
              icon 
              :href="vendorCartLink"
              :disabled="!hasValidQuery"
            >
              <v-icon>fa-shopping-basket</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import moment from "moment-timezone";
moment.locale("en-SG")
export default {
  name: "VendorCard",
  props: {
    vendorId: {
      type: String,
      default : ""
    },
    vendorName: {
      type: String,
      default: "Vendor"
    },
    nextSlotStart : {
      type: String,
      default: null
    },
    nextSlotEnd : {
      type: String,
      default: null
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    vendorCartLink: {
      type: String,
      default: ""
    },
    hasValidQuery: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cardHeight () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return '258px'
          case 'sm': return '252px'
          default: return '192px'
        }
      },
    slotDate: function() {
      return moment(this.nextSlotStart).format('LL');
    },
    slotPeriod: function() {
      let slotStartTime = moment(this.nextSlotStart).format('LT');
      let slotEndTime = moment(this.nextSlotEnd).format('LT');
      return `${slotStartTime} - ${slotEndTime}`;
    },
    daysToSlot : function() {
      if(this.nextSlotStart) {
        let slotDate = moment(this.nextSlotStart).startOf('day');
        let currentDate = moment().tz('Asia/Singapore').startOf('day');
        let difference = slotDate.diff(currentDate, 'days');
        if(difference === 0) {
          return "Today";
        } else {
          return `${difference} ${difference > 1 ? 'days' : 'day' } to next available delivery slot.`;
        }
      } else {
        return "All slots are full.";
      }
    }
  }
}
</script>