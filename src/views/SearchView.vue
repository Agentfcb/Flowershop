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
          <div class="product-image-wrapper">
            <img 
              :src="`https://picsum.photos/seed/product${product.id}/400/400`" 
              :alt="product.name" 
              class="product-image"
              @error="handleImageError"
            />
          </div>
          <h3>{{ product.name }}</h3>
          <div class="rating">★ {{ product.rating }}</div>
          <div class="price">{{ product.price }}₽</div>
          <button @click="addToCartHandler(product)" class="add-btn">В корзину</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCart } from '../composables/useCart'

interface Product {
  id: number
  name: string
  price: number
  rating: number
  category: string
}

const route = useRoute()
const { addToCart } = useCart()

const searchQuery = ref('')
const searchResults = ref<Product[]>([])

// Все товары для поиска
const allProducts: Product[] = [
  { id: 1, name: 'Букет из 101 красной розы', price: 15000, rating: 5.0, category: 'Розы' },
  { id: 2, name: 'Пионы микс', price: 8500, rating: 4.56, category: 'Пионы' },
  { id: 3, name: 'Весенние тюльпаны', price: 3500, rating: 5.0, category: 'Тюльпаны' },
  { id: 4, name: 'Розовые розы 51 штука', price: 7500, rating: 5.0, category: 'Розы' },
  { id: 5, name: 'Авторский букет', price: 6000, rating: 4.33, category: 'Сборные' },
  { id: 6, name: 'Белые пионы', price: 9500, rating: 4.0, category: 'Пионы' },
  { id: 7, name: 'Моно-букет из гербер', price: 4500, rating: 4.93, category: 'Моно' }
]

onMounted(() => {
  const query = route.query.q as string
  if (query) {
    searchQuery.value = query
    performSearch(query)
  }
})

// Следим за изменениями маршрута
watch(() => route.query.q, (newQuery) => {
  if (newQuery) {
    searchQuery.value = newQuery as string
    performSearch(newQuery as string)
  }
})

const performSearch = (query: string) => {
  const searchTerm = query.toLowerCase()
  searchResults.value = allProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  )
}

const addToCartHandler = (product: Product) => {
  // Создаем объект товара для корзины
  const cartProduct = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: `https://picsum.photos/seed/product${product.id}/400/400`
  }
  
  addToCart(cartProduct)
  alert(`Товар "${product.name}" добавлен в корзину`)
}

const handleImageError = (event: Event) => {
  // Если картинка не загрузилась, используем заглушку
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/400x400/b1658b/ffffff?text=No+Image'
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

.product-image-wrapper {
  position: relative;
  height: 150px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.1);
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