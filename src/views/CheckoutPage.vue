<template>
  <div class="checkout-page">
    <div class="checkout-container">
      <h1>Оформление заказа</h1>
      
      <div v-if="isEmpty" class="empty-cart">
        <p>Корзина пуста</p>
        <router-link to="/catalog" class="back-link">
          ← Вернуться в каталог
        </router-link>
      </div>

      <div v-else class="checkout-content">
        <!-- Левая колонка: Форма заказа -->
        <div class="checkout-form">
          <h2>Данные получателя</h2>
          
          <form @submit.prevent="submitOrder">
            <div class="form-group">
              <label for="name">Имя и Фамилия *</label>
              <input 
                type="text" 
                id="name" 
                v-model="orderData.name"
                placeholder="Иван Иванов"
                required
              >
            </div>

            <div class="form-group">
              <label for="phone">Телефон *</label>
              <input 
                type="tel" 
                id="phone" 
                v-model="orderData.phone"
                placeholder="+7 (999) 123-45-67"
                required
              >
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="orderData.email"
                placeholder="example@mail.ru"
              >
            </div>

            <div class="form-group">
              <label for="address">Адрес доставки *</label>
              <textarea 
                id="address" 
                v-model="orderData.address"
                placeholder="Город, улица, дом, квартира"
                rows="3"
                required
              ></textarea>
            </div>

            <div class="form-group">
              <label for="comment">Комментарий к заказу</label>
              <textarea 
                id="comment" 
                v-model="orderData.comment"
                placeholder="Особые пожелания, время доставки и т.д."
                rows="3"
              ></textarea>
            </div>

            <h2>Способ оплаты</h2>
            
            <div class="payment-methods">
              <label class="payment-method">
                <input 
                  type="radio" 
                  v-model="orderData.paymentMethod" 
                  value="cash"
                  required
                >
                <span class="payment-label">
                  <span class="payment-icon">💵</span>
                  <span class="payment-text">Наличными при получении</span>
                </span>
              </label>
              
              <label class="payment-method">
                <input 
                  type="radio" 
                  v-model="orderData.paymentMethod" 
                  value="card"
                >
                <span class="payment-label">
                  <span class="payment-icon">💳</span>
                  <span class="payment-text">Картой онлайн</span>
                </span>
              </label>
            </div>

            <div class="form-actions">
              <router-link to="/cart" class="back-btn">
                ← Назад к корзине
              </router-link>
              
              <button 
                type="submit" 
                class="submit-btn"
                :disabled="loading"
              >
                {{ loading ? 'Оформляем...' : 'Оформить заказ' }}
              </button>
            </div>
          </form>
        </div>

        <div class="order-summary">
          <h2>Ваш заказ</h2>
          
           <div class="order-items">
             <div v-for="item in cartItems" :key="item.id" class="order-item">
               <div class="order-item-info">
                 <span class="item-name">{{ item.name }}</span>
                 <span class="item-quantity">× {{ item.quantity }}</span>
               </div>
               <span class="item-price">{{ formatPrice(item.price * item.quantity) }}</span>
             </div>
           </div>

          <div class="order-totals">
            <div class="total-row">
              <span>Товары:</span>
              <span>{{ formatPrice(totalPrice) }}</span>
            </div>
            <div class="total-row">
              <span>Доставка:</span>
              <span>{{ formatPrice(deliveryPrice) }}</span>
            </div>
            <div class="total-row final">
              <span>Итого к оплате:</span>
              <span class="final-price">{{ formatPrice(finalPrice) }}</span>
            </div>
          </div>

          <div class="order-note">
            <p> Доставка осуществляется в течение 2-3 часов</p>
            <p> Время работы: 9:00 - 21:00 ежедневно</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCart } from '../composables/useCart'
import { useRouter } from 'vue-router'

const router = useRouter()
const {
  cartItems,
  totalPrice,
  isEmpty,
  clearCart
} = useCart()

const loading = ref(false)


const orderData = ref({
  name: '',
  phone: '',
  email: '',
  address: '',
  comment: '',
  paymentMethod: 'cash'
})


const deliveryPrice = computed(() => {
  return totalPrice.value > 3000 ? 0 : 500
})


const finalPrice = computed(() => {
  return totalPrice.value + deliveryPrice.value
})

const formatPrice = (price: number) => {
  return price.toLocaleString('ru-RU') + '₽'
}


const submitOrder = async () => {
  if (!orderData.value.name || !orderData.value.phone || !orderData.value.address) {
    alert('Пожалуйста, заполните все обязательные поля')
    return
  }

  loading.value = true
  
  try {

    await new Promise(resolve => setTimeout(resolve, 1500))
    

    const order = {
      id: Date.now(),
      date: new Date().toLocaleString('ru-RU'),
      items: [...cartItems.value],
      total: finalPrice.value,
      customer: { ...orderData.value },
      status: 'pending'
    }
    

    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.push(order)
    localStorage.setItem('orders', JSON.stringify(orders))
    

    clearCart()
    

    router.push({
      path: '/order-success',
      query: { orderId: order.id }
    })
    
  } catch (error) {
    alert('Произошла ошибка при оформлении заказа. Попробуйте еще раз.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.checkout-page {
  padding: 2rem 1rem;
  background: #f9f9f9;
  min-height: 80vh;
}

.checkout-container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.empty-cart {
  text-align: center;
  padding: 4rem;
  background: white;
  border-radius: 15px;
}

.back-link {
  display: inline-block;
  margin-top: 1.5rem;
  color: #ff69b4;
  text-decoration: none;
  font-weight: 500;
}

.back-link:hover {
  text-decoration: underline;
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
}

.checkout-form {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

h2 {
  color: #333;
  margin: 1.5rem 0 1rem 0;
  font-size: 1.3rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #ff69b4;
}

.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.payment-method {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.payment-label {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 100%;
  transition: all 0.3s;
}

.payment-method input:checked + .payment-label {
  border-color: #ff69b4;
  background: #fff0f5;
}

.payment-icon {
  font-size: 1.5rem;
}

.payment-text {
  font-weight: 500;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
}

.back-btn {
  padding: 1rem 1.5rem;
  color: #666;
  text-decoration: none;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: all 0.3s;
}

.back-btn:hover {
  background: #f5f5f5;
}

.submit-btn {
  flex: 1;
  padding: 1rem;
  background: #32cd32;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background: #28a428;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Правая колонка */
.order-summary {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.order-items {
  margin: 1.5rem 0;
}

.order-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.order-item:last-child {
  border-bottom: none;
}

.order-item-info {
  flex: 1;
}

.item-name {
  display: block;
  color: #333;
  margin-bottom: 0.3rem;
}

.item-quantity {
  font-size: 0.9rem;
  color: #666;
}

.item-price {
  font-weight: 600;
  color: #333;
}

.order-totals {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px solid #eee;
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  color: #666;
}

.total-row.final {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
}

.final-price {
  color: #ff1493;
  font-size: 1.4rem;
}

.order-note {
  margin-top: 2rem;
  padding: 1rem;
  background: #f0f8ff;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #666;
}

.order-note p {
  margin: 0.5rem 0;
}
</style>