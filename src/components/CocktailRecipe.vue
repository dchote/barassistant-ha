<template>
  <v-sheet>
    <v-row>
      <v-col cols="6" md="4" class="d-none d-sm-block">
        <v-img
          v-if="cocktail.images && cocktail.images[0]"
          :src="cocktail.images[0].url"
          width="100%"
          height="500"
          rounded
          cover
        >
          <span 
            v-if="cocktail.images[0].copyright" 
            class="ma-3 text-white text-caption text-no-wrap text-truncate"
          >
            Image &copy; {{ cocktail.images[0].copyright }}
          </span>
        </v-img>
      </v-col>
      <v-col col="6" md="8">
        <v-card 
          v-if="cocktail.description"
          variant="flat"
        >
          <v-card-title>Description</v-card-title>
          <v-card-text
            v-html="cocktail.description"
          >
          </v-card-text>
        </v-card>
        
        <v-card 
          v-if="cocktail.tags.length > 0"
          variant="flat"
        >
          <v-card-title>Tags</v-card-title>
          <v-card-text>
            <v-chip
              v-for="tag in cocktail.tags" :key="tag.id"
              class="ma-1"
              size="small"
              color="secondary"
              variant="elevated"
              label
            >
              {{ tag.name }}
            </v-chip>
          </v-card-text>
        </v-card>
        
        <v-card 
          v-if="cocktail.ingredients.length > 0"
          variant="flat"
        >
          <v-card-title>Ingredients</v-card-title>
          <v-card-text>
            
            
            
          </v-card-text>
        </v-card>
        
        
      </v-col>
      
      <v-col cols="12">
        <v-expansion-panels>
          <v-expansion-panel
            title="JSON"
          >
            <v-expansion-panel-text>
              <pre>{{cocktail}}</pre>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
  export default {
    props: ['cocktail'],
    
    data() {
      return {
        unit: 'oz',
        servings: 1
      }
    },
    
    computed: {
      
    },
  }
</script>