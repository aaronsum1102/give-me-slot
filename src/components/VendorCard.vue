<template>
  <v-card
    :hover="true"
    :loading="isLoading"
  >
    <div class="d-flex flex-no-wrap align-center">
      <v-avatar
        class="ma-4"
        width="150"
        tile
      >
        <v-img 
          :src="require(`../assets/${vendorName}.png`)" 
          :alt="`${vendorName}-logo`"
          contain="true"
        />
      </v-avatar>

      <div class="flex-grow-1">
        <v-card-title
          class="headline"
          v-text="vendorName"
        />

        <v-card-subtitle v-text="daysToSlot" />

        <v-card-text v-if="nextSlotStart">
          <p class="mb-0">
            <strong>Date:</strong> {{ slotDate }}
            <br>
            <strong>Period:</strong> {{ slotPeriod }}
          </p>
        </v-card-text>

        <v-card-text v-else>
          <p class="mb-0">
            Please try again later.
          </p>
        </v-card-text>
      </div>

      <v-col
        cols="auto"
        class="text-center pl-0"
      >
        <v-row
          class="flex-column ma-0 fill-height"
          justify="center"
        >
          <v-col class="px-0">
            <v-btn 
              icon 
              @click="$emit('refresh')"
            >
              <v-icon>fa-sync</v-icon>
            </v-btn>
          </v-col>

          <v-col class="px-0">
            <v-btn 
              icon 
              :href="vendorCartLink"
            >
              <v-icon>fa-shopping-basket</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </div>
  </v-card>
</template>

<script>
import moment from "moment-timezone";
moment.locale("en-SG")
export default {
  name: "VendorCard",
  props: {
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
    }
  },
  computed: {
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