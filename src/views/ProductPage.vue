<template>
  <div class="product-page">
    <!-- Кнопка назад -->
    <button @click="$router.back()" class="back-btn">← Назад</button>
    
    <div class="product-simple">
      <div class="product-image">[ФОТО]</div>
      
      <div class="product-details">
        <h1>{{ product.name }}</h1>
        
        <div class="rating">
          ★ {{ product.rating }} ({{ product.reviews }} отзывов)
        </div>
        
        <div class="price">{{ formatPrice(product.price) }}</div>
        
        <!-- Выбор количества -->
        <div class="quantity-selector">
          <label>Количество:</label>
          <div class="quantity-controls">
            <button @click="quantity--" :disabled="quantity <= 1">-</button>
            <span>{{ quantity }}</span>
            <button @click="quantity++">+</button>
          </div>
        </div>
        
        <!-- Добавить в корзину -->
        <button 
          @click="addToCart" 
          class="add-cart-btn"
          :disabled="isInCart"
        >
          {{ isInCart ? '✓ В корзине' : 'Добавить в корзину' }}
        </button>
        
        <!-- Описание -->
        <div class="description">
          <h3>Описание</h3>
          <p>{{ product.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'

const route = useRoute()
const router = useRouter()
const { addToCart: addToCartStore, isInCart: checkInCart } = useCart()

// Простые данные товара
const product = ref({
  id: 0,
  name: '',
  price: 0,
  rating: 0,
  reviews: 0,
  description: ''
})

// Количество
const quantity = ref(1)

// Получаем ID из URL
const productId = computed(() => {
  return parseInt(route.params.id as string)
})

// Проверка в корзине
const isInCart = computed(() => {
  return checkInCart(productId.value)
})

// Формат цены
const formatPrice = (price: number) => {
  return price.toLocaleString('ru-RU') + '₽'
}

// Загружаем данные
onMounted(() => {
  loadProduct()
})

const loadProduct = () => {
  // Простые заглушки
  const products = [
    { 
      id: 1, 
      name: 'Букет "Нежность"', 
      price: 4500, 
      rating: 5.0, 
      reviews: 4,
      description: 'Красивый букет из свежих роз'
    },
    { 
      id: 2, 
      name: 'Розы в коробке', 
      price: 3500, 
      rating: 4.5, 
      reviews: 3,
      description: 'Розы в красивой подарочной коробке'
    }
  ]
  
  const found = products.find(p => p.id === productId.value)
  if (found) {
    product.value = found
  } else {
    router.push('/catalog')
  }
}

// Добавить в корзину
const addToCart = () => {
  const cartItem = {
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    category: 'flowers',
    quantity: quantity.value
  }
  
  addToCartStore(cartItem)
  alert('Товар добавлен!')
}
</script>

<style scoped>
.product-page {
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.back-btn {
  background: none;
  border: none;
  color: #666;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
  padding: 0.5rem;
}

.back-btn:hover {
  color: #ff69b4;
}

.product-simple {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-image {
  height: 300px;
  background: #f0f0f0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 1rem;
}

.product-details h1 {
  color: #333;
  margin-bottom: 0.5rem;
}

.rating {
  color: #ff9500;
  margin-bottom: 1rem;
}

.price {
  font-size: 2rem;
  font-weight: bold;
  color: #ff1493;
  margin-bottom: 1.5rem;
}

.quantity-selector {
  margin-bottom: 1.5rem;
}

.quantity-selector label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.quantity-controls button {
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
}

.quantity-controls button:hover:not(:disabled) {
  border-color: #ff69b4;
  background: #fff0f5;
}

.quantity-controls button:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.quantity-controls span {
  font-size: 1.2rem;
  font-weight: bold;
  min-width: 40px;
  text-align: center;
}

.add-cart-btn {
  width: 100%;
  padding: 1rem;
  background: #32cd32;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 2rem;
}

.add-cart-btn:hover:not(:disabled) {
  background: #28a428;
}

.add-cart-btn:disabled {
  background: #888;
  cursor: not-allowed;
}

.description {
  border-top: 1px solid #eee;
  padding-top: 1.5rem;
}

.description h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

.description p {
  color: #666;
  line-height: 1.5;
}
</style>