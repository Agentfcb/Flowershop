<template>
  <div class="search-page">
    <h1>Результаты поиска: "{{ searchQuery }}"</h1>
    
    <div v-if="searchResults.length === 0" class="no-results">
      <p>По вашему запросу ничего не найдено</p>
      <router-link to="/catalog" class="browse-link">
        Посмотреть весь каталог
      </router-link>
    </div>

    <div v-else class="search-results">
      <p>Найдено {{ searchResults.length }} товаров</p>
      
      <div class="products-grid">
        <div v-for="product in searchResults" :key="product.id" class="product-card">
          <div class="product-image">[ФОТО]</div>
          <h3>{{ product.name }}</h3>
          <div class="rating">★ {{ product.rating }}</div>
          <div class="price">{{ product.price }}₽</div>
          <button @click="addToCart(product)" class="add-btn">В корзину</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

interface Product {
  id: number
  name: string
  price: number
  rating: number
  category: string
}

const route = useRoute()
const searchQuery = ref('')
const searchResults = ref<Product[]>([])

// Все товары для поиска
const allProducts: Product[] = [
  { id: 1, name: 'Название', price: 4500, rating: 5.0, category: 'mono' },
  { id: 2, name: 'Название', price: 3500, rating: 4.56, category: 'box' },
  { id: 3, name: 'Название', price: 25000, rating: 5.0, category: 'basket' },
  { id: 4, name: 'Название', price: 25000, rating: 5.0, category: 'mono' },
  { id: 5, name: 'Название', price: 2000, rating: 4.33, category: 'box' },
  { id: 6, name: 'Название', price: 10000, rating: 4.0, category: 'basket' },
  { id: 7, name: 'Название', price: 1998, rating: 4.93, category: 'mono' }
]

onMounted(() => {
  const query = route.query.q as string
  if (query) {
    searchQuery.value = query
    performSearch(query)
  }
})

const performSearch = (query: string) => {
  const searchTerm = query.toLowerCase()
  searchResults.value = allProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  )
}

const addToCart = (product: Product) => {
  alert(`Добавлено в корзину: ${product.name}`)
}
</script>

<style scoped>
.search-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.no-results {
  text-align: center;
  padding: 3rem;
  background: #f9f9f9;
  border-radius: 10px;
  margin-top: 2rem;
}

.browse-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  background: #ff69b4;
  color: white;
  text-decoration: none;
  border-radius: 8px;
}

.search-results {
  margin-top: 2rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.product-card {
  background: white;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid #eee;
  text-align: center;
}

.product-image {
  height: 150px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  border-radius: 8px;
  color: #aaa;
}

.rating {
  color: #ff9500;
  margin: 0.5rem 0;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0.5rem 0;
}

.add-btn {
  width: 100%;
  padding: 0.6rem;
  background: #32cd32;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 0.5rem;
}
</style>