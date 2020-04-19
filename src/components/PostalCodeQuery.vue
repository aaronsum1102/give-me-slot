<template>
  <v-row class="justify-center">
    <v-col 
      cols="8" 
      sm="4"
    >
      <v-text-field 
        ref="postalCodeInput"
        :value="postalCode"
        label="Postal code"
        prepend-inner-icon="fa-map-marker-alt"
        outlined
        rounded
        solo
        clearable
        :error="hasError"
        :error-messages="hasError ? 'Invalid postal code!!!' : ''"
        @input="$emit('updatePostalCode', $event)"
        @keydown.enter="onEnterDown()"
      />          
    </v-col>
  </v-row>
</template>

<script>
export default {
    name:"PostalCodeQuery",
    props: {
      postalCode: {
        type: String,
        default: ""
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