<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
    >
      <v-row class="my-5">
        <cocktail v-for="item in cocktails" :key="item.id" :cocktail="item" />
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
        this.$api.get('/cocktails', { 
          params: {
            per_page: 50, 
            page: 1, 
            sort: '-created_at', 
            include: 'ratings,ingredients.ingredient,tags,images'
          }
        }).then((result) => {
          this.cocktails = result.data.data
        })
        
      }
    }
  }
</script>
