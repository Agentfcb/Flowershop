<template>
  <div class="catalog">
    <h1 class="page-title">Наш каталог</h1>
    
    <!-- Фильтры -->
    <div class="filters">
      <button 
        v-for="category in categories" 
        :key="category"
        @click="selectedCategory = category"
        :class="['filter-btn', { active: selectedCategory === category }]"
      >
        {{ category }}
      </button>
    </div>

    <!-- Сетка товаров -->
    <div class="products-grid">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card">
        <!-- ПУНКТ 6: ФОТО ТОВАРА -->
        <div class="product-image-wrapper">
          <img 
            :src="product.image" 
            :alt="product.name" 
            class="product-image"
            @error="handleImageError"
          />
          <span v-if="product.badge" class="product-badge">{{ product.badge }}</span>
        </div>
        
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-description">{{ product.description }}</p>
          <div class="product-footer">
            <span class="product-price">{{ product.price }} ₽</span>
            <button @click="addToCart(product)" class="add-to-cart-btn">
              В корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCart } from '../composables/useCart'

const route = useRoute()

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  badge?: string
}

const { addToCart } = useCart()

const categories = ['Все', 'Розы', 'Пионы', 'Тюльпаны', 'Сборные']
const selectedCategory = computed(() => {
  const category = route.params.category
  if (category && categories.includes(category as string)) {
    return category as string
  }
  return 'Все'
})

// Пример товаров с фото
const products: Product[] = [
  {
    id: 1,
    name: 'Букет из 101 красной розы',
    description: 'Классический букет из отборных красных роз',
    price: 15000,
    image: 'https://picsum.photos/seed/roses1/400/400',
    category: 'Розы',
    badge: 'ХИТ'
  },
  {
    id: 2,
    name: 'Пионы микс',
    description: 'Нежные пионы разных оттенков, в крафт бумаге ',
    price: 8500,
    image: 'https://picsum.photos/seed/peonies/400/400',
    category: 'Пионы',
    badge: 'NEW'
  },
  {
    id: 3,
    name: 'Весенние тюльпаны',
    description: 'Яркие тюльпаны для поднятия настроения',
    price: 3500,
    image: 'https://picsum.photos/seed/tulips/400/400',
    category: 'Тюльпаны'
  },
  {
    id: 4,
    name: 'Розовые розы 51 штука',
    description: 'Нежные розовые розы в крафтовой упаковке',
    price: 7500,
    image: 'https://picsum.photos/seed/roses2/400/400',
    category: 'Розы'
  },
  {
    id: 5,
    name: 'Авторский букет',
    description: 'Уникальная композиция от флориста',
    price: 6000,
    image: 'https://picsum.photos/seed/bouquet/400/400',
    category: 'Сборные',
    badge: '-20%'
  },
  {
    id: 6,
    name: 'Белые пионы',
    description: 'Изысканные белые пионы премиум класса',
    price: 9500,
    image: 'https://picsum.photos/seed/whitepeonies/400/400',
    category: 'Пионы'
  }
]

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'Все') {
    return products
  }
  return products.filter(p => p.category.toLowerCase() === selectedCategory.value.toLowerCase())
})

const handleImageError = (event: Event) => {
  // Если картинка не загрузилась, используем заглушку
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/400x400/b1658b/ffffff?text=No+Image'
}
</script>

<style scoped>
.catalog {
  padding: 20px 0;
}

.page-title {
  text-align: center;
  font-size: 42px;
  color: #2c3e50;
  margin-bottom: 40px;
}

/* Фильтры */
.filters {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 12px 25px;
  border: 2px solid #b1658b;
  background: white;
  color: #b1658b;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background: #b1658b;
  color: white;
  transform: translateY(-2px);
}

.filter-btn.active {
  background: #b1658b;
  color: white;
}

/* Сетка товаров */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

/* Карточка товара */
.product-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.product-image-wrapper {
  position: relative;
  height: 300px;
  overflow: hidden;
  margin-bottom: 10px;
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

.product-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background: #ff4757;
  color: white;
  padding: 6px 15px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(255, 71, 87, 0.4);
}

.product-info {
  padding: 25px;
}

.product-name {
  font-size: 20px;
  color: #2c3e50;
  margin-bottom: 10px;
}

.product-description {
  color: #7f8c8d;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 24px;
  font-weight: 700;
  color: #b1658b;
}

.add-to-cart-btn {
  background: #b1658b;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-to-cart-btn:hover {
  background: #994b75;
  transform: scale(1.05);
}

/* Адаптивность */
@media (max-width: 768px) {
  .page-title {
    font-size: 32px;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .product-image-wrapper {
    height: 250px;
  }
}
</style>