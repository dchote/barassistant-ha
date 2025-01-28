<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >
      <v-row>
        <v-col cols="12">{{ cocktails }}</v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
  export default {
    
    data() {
      return {
        cocktails: []
      }
    },
    
    computed: {
      
    },
    
    created() {
      this.loadCocktails()
    },
    
    methods: {
      loadCocktails() {
        
        this.$api.get('/cocktails').then((result) => {
          console.log('RESULT', result)
        })
        
      }
    }
  }
</script>
