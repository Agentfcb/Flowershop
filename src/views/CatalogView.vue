<template>
  <div class="catalog">
    <h1 class="page-title">Наш каталог</h1>
    
    <!-- Фильтры -->
    <div class="filters">
      <button 
        v-for="category in categories" 
        :key="category"
        @click="selectCategory(category)"
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
import { useRoute, useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'

const route = useRoute()
const router = useRouter()

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

const selectCategory = (category: string) => {
  if (category === 'Все') {
    router.push('/catalog')
  } else {
    router.push(`/catalog/${encodeURIComponent(category)}`)
  }
}

// Пример товаров с фото
const products: Product[] = [
  {
    id: 1,
    name: 'Букет Статицы',
    description: 'Отличные нежно фиолетовые сухоцветы. Букет для тех, кто любит любоваться цветами долгое время.',
    price: 3999,
    image: '/images/bouquet1.jpg',
    category: 'Сборные',
    badge: 'ХИТ'
  },
  {
    id: 2,
    name: 'Букет нежности',
    description: 'Белая и нежно розовая роза, гортензия, эустома и гомфрена. С этими цветами дома будет аромат свежести и нежности.',
    price: 4900,
    image: '/images/bouquet2.jpg',
    category: 'Сборные',
    badge: 'NEW'
  },
  {
    id: 3,
    name: 'Корзинка пионов',
    description: 'Корзинка из 47 пионов гормонично дополнит любое пространство в вашем доме красотой и уютом.',
    price:  6800,
    image: '/images/bouquet3.jpg',
    category: 'Пионы'
  },
  {
    id: 4,
    name: 'Лилия и роза',
    description: 'Сочетание розовой лилии и белых роз идеально подойдут для тех, кто ценит приятный аромат, внешний вид и эстетику.',
    price: 7000,
    image: '/images/bouquet4.jpg',
    category: 'Сборные'
  },
  {
    id: 5,
    name: 'Элегантные белые розы',
    description: 'Белые ароматные розы и ничего лишнего. Букет найдёт подход к любой даме и к любому празднику.',
    price: 9100,
    image: '/images/bouquet5.jpg',
    category: 'Розы',
    badge: '-20%'
  },
  {
    id: 6,
    name: 'Белые тюльпаны',
    description: 'Букет белых тюльпанов в декоративной упаковке. Небольшой букет от большого сердца. Нежные на вид, нежные на запах. ',
    price: 4000,
    image: '/images/bouquet6.jpg',
    category: 'Тюльпаны'
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
  background-color: #f5f6f7;
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