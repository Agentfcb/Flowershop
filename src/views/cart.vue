<template>
  <div class="cart-page">
    <h1>🛒 Корзина</h1>
    
    <div v-if="isEmpty" class="empty-cart">
      <p>Корзина пуста</p>
      <router-link to="/catalog" class="shop-link">
        Перейти в каталог
      </router-link>
    </div>

    <div v-else>

      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="item-info">
            <h3>{{ item.name }}</h3>
            <p class="category">{{ getCategoryName('mono') }}</p>
          </div>
          
          <div class="item-controls">
            <div class="quantity-control">
              <button 
                @click="updateQuantity(item.id, item.quantity - 1)"
                class="quantity-btn"
              >
                −
              </button>
              <span class="quantity">{{ item.quantity }}</span>
              <button 
                @click="updateQuantity(item.id, item.quantity + 1)"
                class="quantity-btn"
              >
                +
              </button>
            </div>
            
            <div class="item-price">
              {{ formatPrice(item.price * item.quantity) }}
            </div>
            
            <button 
              @click="removeItem(item.id)" 
              class="remove-btn"
            >
              ✕
            </button>
          </div>
        </div>
      </div>


      <div class="cart-summary">
        <div class="summary-row">
          <span>Товаров:</span>
          <span>{{ totalItems }} шт.</span>
        </div>
        <div class="summary-row total">
          <span>Итого:</span>
          <span class="total-price">{{ formatPrice(totalPrice) }}</span>
        </div>
        
        <router-link to="/checkout" class="checkout-btn">
          Перейти к оформлению
        </router-link>
        
        <button @click="clearCart" class="clear-btn">
          Очистить корзину
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '../composables/useCart'
const {
  cartItems,
  totalItems,
  totalPrice,
  isEmpty,
  removeFromCart,
  updateQuantity,
  clearCart
} = useCart()

const getCategoryName = (category: string) => {
  const categories: Record<string, string> = {
    'mono': 'Моно-букет',
    'box': 'В коробке',
    'basket': 'В корзинке'
  }
  return categories[category] || category
}

const formatPrice = (price: number) => {
  return price.toLocaleString('ru-RU') + '₽'
}

const removeItem = (id: number) => {
  removeFromCart(id)
}
</script>

<style scoped>
.cart-page {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.empty-cart {
  text-align: center;
  padding: 4rem;
  background: #f9f9f9;
  border-radius: 15px;
  margin-top: 2rem;
}

.empty-cart p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.shop-link {
  display: inline-block;
  padding: 1rem 2rem;
  background: #ff69b4;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
}

.shop-link:hover {
  background: #ff1493;
}

.cart-items {
  margin: 2rem 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: white;
  border: 1px solid #eee;
  border-radius: 10px;
  margin-bottom: 1rem;
  transition: transform 0.2s;
}

.cart-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.item-info h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.category {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 0.3rem;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border: none;
  background: white;
  border-radius: 6px;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn:hover {
  background: #e0e0e0;
}

.quantity {
  min-width: 30px;
  text-align: center;
  font-weight: 600;
}

.item-price {
  font-size: 1.2rem;
  font-weight: bold;
  min-width: 100px;
  text-align: right;
  color: #ff1493;
}

.remove-btn {
  width: 36px;
  height: 36px;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background: #ff2222;
}

.cart-summary {
  background: #f0f8ff;
  padding: 2rem;
  border-radius: 15px;
  margin-top: 2rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: #333;
}

.summary-row.total {
  border-top: 2px solid #ddd;
  padding-top: 1rem;
  margin-top: 1rem;
  font-size: 1.4rem;
  font-weight: bold;
}

.total-price {
  color: #ff1493;
  font-size: 1.6rem;
}

.checkout-btn {
  display: block;
  width: 100%;
  padding: 1.2rem;
  background: #32cd32;
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: background 0.3s;
}

.checkout-btn:hover {
  background: #28a428;
}

.clear-btn {
  display: block;
  width: 100%;
  padding: 0.8rem;
  background: transparent;
  color: #ff4444;
  border: 1px solid #ff4444;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s;
}

.clear-btn:hover {
  background: #ff4444;
  color: white;
}
</style>