<template>
  <div class="success-page">
    <div class="success-container">
      <div class="success-icon"></div>
      
      <h1>Заказ успешно оформлен!</h1>
      
      <p class="order-number">
        Номер вашего заказа: <strong>#{{ orderId }}</strong>
      </p>
      
      <p class="success-message">
        Мы свяжемся с вами в ближайшее время для подтверждения заказа.
      </p>
      
      <div class="order-details">
        <h2>Детали заказа:</h2>
        <p><strong>Имя:</strong> {{ customerName }}</p>
        <p><strong>Телефон:</strong> {{ customerPhone }}</p>
        <p v-if="customerAddress"><strong>Адрес:</strong> {{ customerAddress }}</p>
        <p><strong>Сумма:</strong> {{ orderTotal }}</p>
        <p><strong>Дата:</strong> {{ orderDate }}</p>
      </div>
      
      <div class="action-buttons">
        <router-link to="/" class="home-btn">
          На главную
        </router-link>
        <router-link to="/catalog" class="catalog-btn">
          Продолжить покупки
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const orderId = ref('')
const customerName = ref('')
const customerPhone = ref('')
const customerAddress = ref('')
const orderTotal = ref('')
const orderDate = ref('')

onMounted(() => {
  const id = route.query.orderId
  if (id) {
    
    orderId.value = id.toString().slice(-6)
    customerName.value = 'Иван Иванов' 
    customerPhone.value = '+7 (999) 123-45-67' 
    customerAddress.value = 'г. Москва, ул. Примерная, д. 1'
    orderTotal.value = '5 980 ₽' 
    orderDate.value = new Date().toLocaleString('ru-RU')
  }
})
</script>

<style scoped>
.success-page {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #fff5f9, #ffe6f2);
}

.success-container {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  text-align: center;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(255, 105, 180, 0.1);
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

h1 {
  color: #32cd32;
  margin-bottom: 1rem;
  font-size: 2rem;
}

.order-number {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.success-message {
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.order-details {
  text-align: left;
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 2rem;
}

.order-details h2 {
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

.order-details p {
  margin: 0.5rem 0;
  color: #555;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.home-btn,
.catalog-btn {
  padding: 1rem 2rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
}

.home-btn {
  background: #ff69b4;
  color: white;
}

.home-btn:hover {
  background: #ff1493;
  transform: translateY(-2px);
}

.catalog-btn {
  background: #32cd32;
  color: white;
}

.catalog-btn:hover {
  background: #28a428;
  transform: translateY(-2px);
}
</style>