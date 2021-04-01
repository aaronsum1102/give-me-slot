<template>
  <div>
    <v-row class="justify-center">
      <v-col
        cols="8" 
        sm="4"
      >
        <v-text-field 
          ref="postalCodeInput"
          :value="postalCode"
          label="049213"
          prepend-inner-icon="fa-map-marker-alt"
          outlined
          rounded
          solo
          clearable
          :disabled="isDisabled"
          :error="hasError"
          :error-messages="hasError ? 'Invalid postal code!!!' : ''"
          @input="$emit('updatePostalCode', $event)"
          @keydown.enter="onEnterDown()"
        />          
      </v-col>
      <v-btn
        class="mt-3"
        :height="56"
        text
        icon
        :disabled="isDisabled || hasError || postalCode && postalCode.length != 6"
        @click="onEnterDown()"
      >
        <v-icon 
          color="primary"
        >
          fas fa-search
        </v-icon>  
      </v-btn>  
    </v-row>
  </div>
</template>

<script>
export default {
    name:"PostalCodeQuery",
    props: {
      postalCode: {
        type: String,
        default: ""
      },
      isDisabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      hasError: function() {
        if(this.postalCode && this.postalCode.length > 6 | isNaN(parseInt(this.postalCode)) ) {  
          return true;
        } else {
          return false;
        }
      },
    },
    methods: {
      onEnterDown: function() {
        this.$refs.postalCodeInput.blur();
        this.$emit("slotQuery", this.postalCode);
      }
    }
}
</script>