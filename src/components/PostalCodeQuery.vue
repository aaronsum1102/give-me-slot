<template>
  <v-row class="justify-center">
    <v-col 
      cols="8" 
      sm="4"
    >
      <v-text-field 
        ref="postalCodeInput"
        v-model="postalCode"
        label="Postal code"
        prepend-inner-icon="fa-map-marker-alt"
        :outlined="true"
        :rounded="true"
        :solo="true"
        :clearable="true"
        :loading="isLoading"
        :rules="[postalCodeRules]"
        :success="isSuccess"
        @keydown.enter="onEnterDown()"
      />          
    </v-col>
  </v-row>
</template>

<script>
export default {
    name:"PostalCodeQuery",
    props: {
      isLoading: Boolean,
      isSuccess: Boolean
    },
    data: function() {
      return {
        postalCode: null
      }
    },
    methods: {
      postalCodeRules : function() {
        return this.postalCode && this.postalCode.length > 6 ? 'Invalid postal code!!!': true;
      },
      onEnterDown: function() {
        this.$refs.postalCodeInput.blur();
        this.$emit("slotQuery", this.postalCode);
      }
    }
}
</script>