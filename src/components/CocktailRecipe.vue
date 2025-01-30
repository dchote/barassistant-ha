<template>
  <v-sheet>
    <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
    
    <v-row v-if="cocktail">
      <v-col cols="6" md="4" v-if="width > 900">
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
            <v-row no-gutters align="center">
              <v-col cols="6" md="4" class="text-no-wrap">
                <v-icon class="mr-2 d-none d-sm-inline">mdi-cup</v-icon>
                <v-btn-group
                  class="mx-2 my-3"
                  variant="outlined"
                  density="compact"
                  divided
                >
                  <v-btn size="small" icon="mdi-minus" @click="servings--" :disabled="servings == 1"></v-btn>
                  <v-btn size="small" readonly><strong>{{ servings }}</strong></v-btn>
                  <v-btn size="small" icon="mdi-plus" @click="servings++"></v-btn>
                </v-btn-group>
                serving{{ (servings > 1) ? 's' : '' }}
              </v-col>
              <v-col cols="6" md="4" align="center">
                <v-btn-toggle
                  class="mx-2 my-3"
                  v-model="unit"
                  color="primary"
                  variant="tonal"
                  rounded="xl"
                  density="compact"
                  mandatory
                >
                  <v-btn size="small" value="oz">oz</v-btn>
                  <v-btn size="small" value="ml">ml</v-btn>
                  <v-btn size="small" value="cl">cl</v-btn>
                </v-btn-toggle>
              </v-col>
              <v-col v-if="cocktail.glass" cols="12" md="4">
                <div class="mx-2 my-3 text-no-wrap"><strong>Glass Type:</strong> {{ cocktail.glass.name }}</div>
              </v-col>
            </v-row>
            
            <v-list
              class="mt-1"
              variant="text"
            >
              <v-list-item
                v-for="ingredient in cocktail.ingredients" :key="ingredient.sort"
              >
                <template v-slot:prepend>
                  <v-icon v-if="ingredient.in_bar_shelf">mdi-bottle-tonic</v-icon>
                  <v-icon v-else-if="ingredient.optional" color="disabled">mdi-bottle-tonic</v-icon>
                  <v-icon v-else-if="ingredient.substitutes && substitutionsText(ingredient)" color="primary">mdi-bottle-tonic</v-icon>
                  <v-icon v-else color="error">mdi-bottle-tonic-outline</v-icon>
                </template>
                
                <v-list-item-title class="text-lowercase d-flex align-center">
                  {{ ingredientTitle(ingredient, servings) }} 
                  
                  <v-spacer /> 
                  
                  <span v-if="servings > 1" class="text-caption text-lowercase text-primary">{{ ingredientTitle(ingredient, 1, false) }} per serving</span>
                </v-list-item-title>
                
                <v-list-item-subtitle v-if="ingredient.note">{{ ingredient.note }}</v-list-item-subtitle>
                
                <v-list-item-subtitle v-if="ingredient.optional || !ingredient.in_bar_shelf" class="text-lowercase">
                  <span v-if="!ingredient.in_bar_shelf && ingredient.optional">optional</span>
                  <span v-else-if="!ingredient.in_bar_shelf && ingredient.substitutes && substitutionsText(ingredient)">
                    use <strong>{{ substitutionsText(ingredient) }}</strong> instead
                  </span>
                  <span v-else-if="!ingredient.in_bar_shelf" class="text-error">missing ingredient</span>
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
        
        <v-card 
          v-if="cocktail.instructions"
          variant="flat"
        >
          <v-card-title>Instructions</v-card-title>
          <v-card-text>
            <pre class="text-body-1" style="text-wrap: wrap;" v-html="cocktail.instructions"></pre>
          </v-card-text>
        </v-card>
        
        <v-card 
          v-if="cocktail.garnish"
          variant="flat"
        >
          <v-card-title>Garnish</v-card-title>
          <v-card-text>
            <pre class="text-body-1" style="text-wrap: wrap;"  v-html="cocktail.garnish"></pre>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" v-if="debug">
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

<script setup>
  import { useDisplay } from 'vuetify'
  const { width } = useDisplay()
</script>

<script>
  import { formatQuantity } from 'format-quantity'
  import pluralize from 'pluralize'
  
  export default {
    props: ['cocktailSlug'],
    
    data() {
      return {
        debug: false,
        
        loading: true,
        
        cocktail: false,
        
        standardUnits: ['oz', 'ml', 'cl'],
        conjoinedUnits: ['whole', 'half', 'quarter'],
        
        unit: 'oz',
        servings: 1
      }
    },
    
    computed: {
      
    },
    
    watch: {
      servings() {
        localStorage.servings = this.servings
      },
       
      unit() {
        localStorage.unit = this.unit
      }
    },
    
    mounted() {
      this.unit = (localStorage.unit) ? localStorage.unit : 'oz'
      this.servings = (localStorage.servings) ? parseInt(localStorage.servings) : 1
      
      this.loadCocktail()
    },
    
    methods: {
      loadCocktail() {
        this.loading = true
        
        var queryParams = {}
        
        this.$api.get('/cocktails/' + this.cocktailSlug, { params: queryParams }).then((result) => {
          console.log('cocktail result', result)
          this.cocktail = result.data.data
          this.loading = false
        }).catch((error) => {
          console.log('cocktail ERROR', error)
          this.loading = false
        })
      },
      
      ingredientTitle(ingredient, servings, includeName = true) {
        var title = ''
        
        if (this.standardUnits.includes(ingredient.units)) {
          var amount = ingredient.formatted[this.unit].amount
          var requiredAmount = amount * servings
          
          if (this.unit == 'oz') {
            // round to the nearest 1/4oz
            requiredAmount = this.roundToNearestQuarter(requiredAmount)
          }
          
          title += formatQuantity(requiredAmount, { tolerance: 0.01, vulgarFractions: true }) + ' ' + this.unit + ' '
          
          if (includeName) {
            title += ingredient.ingredient.name
          }
          
          return title
        }
        
        // attempt to pluralize sensibly
        if (this.conjoinedUnits.includes(ingredient.units)) {
          title += servings + ' ' + pluralize(ingredient.units + ' ' + ingredient.ingredient.name, servings)
        } else {
          title += servings + ' ' + pluralize(ingredient.units, servings)
          
          if (includeName) {
            title += ' ' + ingredient.ingredient.name
          }
        }
        
        return title
      },
      
      substitutionsText(ingredient) {
        var substitutions = false
        
        if (ingredient.substitutes) {
          var availableSubstitutes = ingredient.substitutes.filter(item => item.in_bar_shelf == true).map(item => { return item.ingredient.name })
          return availableSubstitutes.join(' or ')
        }
        
        return substitutions
      },
      
      
      
      roundToNearestQuarter(num) {
        return Math.round(num * 4) / 4;
      }
    }
  }
</script>