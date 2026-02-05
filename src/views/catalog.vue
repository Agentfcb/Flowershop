<template>
  <div class="catalog-page">
    <h1>{{ pageTitle }}</h1>
    

    <div class="filters">
      <router-link 
        to="/catalog/all" 
        class="filter-btn"
        :class="{ active: $route.path === '/catalog' || $route.path === '/catalog' }"
      >
        Все букеты
      </router-link>
      <router-link 
        to="/catalog/mono" 
        class="filter-btn"
        :class="{ active: $route.path === '/catalog/mono' }"
      >
        Моно-букеты
      </router-link>
      <router-link 
        to="/catalog/box" 
        class="filter-btn"
        :class="{ active: $route.path === '/catalog/box' }"
      >
        Цветы в коробке
      </router-link>
      <router-link 
        to="/catalog/basket" 
        class="filter-btn"
        :class="{ active: $route.path === '/catalog/basket' }"
      >
        Композиции в корзинках
      </router-link>
    </div>


<div class="products">
  <div v-for="product in filteredProducts" :key="product.id" class="product-card">
    <!-- Оберните содержимое в router-link -->
    <router-link :to="`/product/${product.id}`" class="product-link">
      <div class="product-image-placeholder">[ФОТО]</div>
      <h3>{{ product.name }}</h3>
      
      <!-- Цена и рейтинг на одной строке -->
      <div class="product-meta">
        <div class="price-rating">
          <div class="price">{{ formatPrice(product.price) }}</div>
          <div class="rating">
            <span class="stars">★</span>
            <span class="rating-value">{{ product.rating }}</span>
            <span class="reviews">({{ product.reviews }})</span>
          </div>
        </div>
      </div>
      

      <button 
        class="add-to-cart" 
        @click.stop="addToCart(product)"
        :disabled="isInCart(product.id)"
      >
        {{ isInCart(product.id) ? '✓ В корзине' : 'В КОРЗИНУ' }}
      </button>
    </router-link>
  </div>
</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCart } from '../composables/useCart'

const route = useRoute()
const { addToCart, isInCart } = useCart()

interface Product {
  id: number
  name: string
  price: number
  rating: number
  reviews: number
  category: string
}

const products: Product[] = [
  { id: 1, name: 'Название и краткое описание"', price: 4500, rating: 5.0, reviews: 4, category: 'mono' },
  { id: 2, name: 'Название и краткое описание', price: 3500, rating: 4.56, reviews: 3, category: 'box' },
  { id: 3, name: 'Название и краткое описание', price: 25000, rating: 5.0, reviews: 25, category: 'basket' },
  { id: 4, name: 'Название и краткое описание"', price: 25000, rating: 5.0, reviews: 25, category: 'mono' },
  { id: 5, name: 'Название и краткое описание"', price: 2000, rating: 4.33, reviews: 2, category: 'box' },
  { id: 6, name: 'Название и краткое описание', price: 10000, rating: 4.0, reviews: 10, category: 'basket' },
  { id: 7, name: 'Название и краткое описание', price: 1998, rating: 4.93, reviews: 7, category: 'mono' }
]

const pageTitle = computed(() => {
  const path = route.path
  if (path.includes('/mono')) return 'Моно-букеты'
  if (path.includes('/box')) return 'Цветы в коробке'
  if (path.includes('/basket')) return 'Композиции в корзинках'
  return 'Каталог букетов'
})

const filteredProducts = computed(() => {
  const path = route.path
  if (path.includes('/mono')) return products.filter(p => p.category === 'mono')
  if (path.includes('/box')) return products.filter(p => p.category === 'box')
  if (path.includes('/basket')) return products.filter(p => p.category === 'basket')
  return products
})

const formatPrice = (price: number) => {
  return price.toLocaleString('ru-RU') + '₽'
}
</script>

<style scoped>
.catalog-page {
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 2rem;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.7rem 1.5rem;
  border: 2px solid #ff69b4;
  background: white;
  color: #ff69b4;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.filter-btn:hover {
  background: #fff0f5;
  transform: translateY(-2px);
}

.filter-btn.active {
  background: #ff69b4;
  color: white;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.product-card {
  background: white;
  padding: 1.2rem;
  border-radius: 12px;
  border: 1px solid #eee;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.product-image-placeholder {
  height: 180px;
  background: linear-gradient(45deg, #f5f5f5, #eaeaea);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
  border-radius: 10px;
  color: #bbb;
  font-size: 0.9rem;
}

.product-card h3 {
  margin: 0.5rem 0;
  font-size: 1.1rem;
  color: #333;
  line-height: 1.4;
  min-height: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}


.product-meta {
  margin: 0.8rem 0;
}

.price-rating {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.price {
  font-size: 1.4rem;
  font-weight: bold;
  color: #ff1493;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #666;
  font-size: 0.95rem;
}

.stars {
  color: #ff9500;
  font-size: 1rem;
}

.rating-value {
  font-weight: 600;
  color: #333;
}

.reviews {
  font-size: 0.85rem;
  color: #888;
}

.add-to-cart {
  margin-top: auto;
  padding: 0.8rem;
  background: #32cd32;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s;
}

.add-to-cart:hover:not(:disabled) {
  background: #28a428;
}

.add-to-cart:disabled {
  background: #888;
  cursor: not-allowed;
}
.product-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
}

.product-card {
  cursor: pointer;
  position: relative;
}


.add-to-cart {
  position: relative;
  z-index: 2;
}
</style>