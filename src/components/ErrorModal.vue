<template>
  <v-row justify="center">
    <v-dialog
      :value="isActive"
      max-width="350px"
    >
      <v-card>
        <v-card-title
          class="headline"
          primary-title
        >
          Opps!
        </v-card-title>

        <v-card-text>
          {{ errorMessage }}
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="$emit('acknowledge')"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    name: "ErrorModal",
    props: {
        errorMessage: {
            type: String,
            default: "Something went wrong. Please try again later."
        }
    },
    computed: {
      isActive: function() {
        return this.errorMessage;
      }
    }
  }
</script>
