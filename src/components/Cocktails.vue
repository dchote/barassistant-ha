<template>
  <div 
    class="fill-height"
  >
    <v-row
      v-if="ingredients.length > 0"
      no-gutters
    >
      <v-toolbar>
        <v-icon class="mx-5 d-none d-sm-inline-block">mdi-glass-cocktail</v-icon>
        
        <v-switch
          class="ml-3 ma-1 ma-sm-5"
          v-model="showCollection"
          label="Favorites"
          color="primary"
          hide-details
        ></v-switch>
      
        <v-switch
          class="ma-1 ma-sm-5"
          v-model="selectLiquor"
          :label="xs ? 'Liquor' : 'Filter by Liquor'"
          color="primary"
          hide-details
        ></v-switch>
        
        <v-select
          v-if="selectLiquor"
          class="ma-1 ml-2 ma-sm-5"
          :width="xs ? '40' : ''"
          :items="ingredients"
          item-title="name"
          item-value="id"
          v-model="mainIngredient"
          label="Primary Liquor"
          color="primary"
          density="compact"
          single-line
          hide-details
        >
        </v-select>
      </v-toolbar>
    </v-row>
    
    <v-responsive
      class="align-centerfill-height mx-auto mb-3"
    >
      <v-row class="ma-3">
        <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
        <v-col v-else-if="cocktails.length == 0" cols="12" class="pa-10 text-disabled text-center">No cocktails found</v-col>
        
        <cocktail v-for="item in cocktails" :key="item.id" :cocktail="item" />
      </v-row>
      
      <v-pagination :length="lastPage" v-model="page"></v-pagination>
    </v-responsive>
  </div>
</template>

<style>
  .v-selection-control .v-label {
    white-space: nowrap !important;
    word-break: normal !important;
  }
</style>

<script setup>
  import { useDisplay } from 'vuetify'
  const { xs } = useDisplay()
</script>
  
<script>
  export default {
    
    data() {
      return {
        loading: true,
        
        page: 1,
        lastPage: 1,
        itemsPerPage: 30,
        
        collectionID: 1,
        showCollection: false,
        
        selectLiquor: false,
        mainIngredient: '',
        
        ingredients: [],
        cocktails: []
      }
    },
    
    computed: {
      filter() {
        var filters = {}
        
        if (this.showCollection) {
          filters.collection_id = this.collectionID
        }
        
        if (this.selectLiquor && this.mainIngredient) {
          filters.main_ingredient_id = this.mainIngredient
        }
        
        return filters
      }
    },
    
    watch: {
      showCollection() {
        this.page = 1
        this.loadCocktails()
      },
      
      selectLiquor() {
        if (this.mainIngredient) {
          this.page = 1
          this.loadCocktails()
        }
      },
      
      mainIngredient() {
        this.page = 1
        this.loadCocktails()
      },
      
      page() {
        this.loadCocktails()
        
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      }
    },
    
    mounted() {
      this.loadIngredients()
      this.loadCocktails()
    },
    
    methods: {
      loadIngredients() {
        var queryParams = {
          per_page: 200, 
          filter: {main_ingredients: true, bar_shelf: true, strength_min: 20}
        }
        
        this.$api.get('/ingredients', { params: queryParams }).then((result) => {
          console.log('ingredients result', result)
          this.ingredients = result.data.data
        }).catch((error) => {
          console.log('ingredients ERROR', error)
        })
      },
      
      loadCocktails() {
        this.loading = true
        
        var queryParams = {
          per_page: this.itemsPerPage, 
          page: this.page, 
          sort: '-average_rating,-created_at', 
          include: 'ratings,ingredients.ingredient,tags,images,glass',
          filter: this.filter
        }
        
        this.$api.get('/cocktails', { params: queryParams }).then((result) => {
          console.log('cocktails result', result)
          this.cocktails = result.data.data
          this.lastPage = (result.data.meta.last_page) ? result.data.meta.last_page : 1
          this.loading = false
        }).catch((error) => {
          console.log('cocktails ERROR', error)
          this.loading = false
        })
        
      }
    }
  }
</script>