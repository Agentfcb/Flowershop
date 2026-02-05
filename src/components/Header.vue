<template>
  <header class="header">

    <div class="header-left">
      <div class="logo" @click="$router.push('/')">
       Цветочный магазин
      </div>
    </div>


    <div class="header-center">
      <div class="search-container">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Поиск букетов..." 
          class="search-input"
          @keyup.enter="performSearch"
        >
        <button @click="performSearch" class="search-btn">
          Найти
        </button>
      </div>
    </div>


    <div class="header-right">
      <nav>
        <div class="nav-item" @mouseenter="showCatalogDropdown = true" @mouseleave="showCatalogDropdown = false">
          <router-link to="/catalog" class="nav-link">
            Каталог ▼
          </router-link>
          
    
          <div v-if="showCatalogDropdown" class="dropdown-menu">
            <router-link to="/catalog/mono" class="dropdown-item" @click="showCatalogDropdown = false">
              Моно-букеты
            </router-link>
            <router-link to="/catalog/box" class="dropdown-item" @click="showCatalogDropdown = false">
              Цветы в коробке
            </router-link>
            <router-link to="/catalog/basket" class="dropdown-item" @click="showCatalogDropdown = false">
              Композиции в корзинках
            </router-link>
            <router-link to="/catalog" class="dropdown-item catalog" @click="showCatalogDropdown = false">
              Весь каталог →
            </router-link>
          </div>
        </div>
        
        <router-link to="/" class="nav-link">Главная</router-link>
        

        <div class="profile-section">
          <div v-if="isLoggedIn" class="user-menu">
            <span class="user-name">👤 {{ userName }}</span>
            <button @click="logout" class="logout-btn">Выйти</button>
          </div>
          <div v-else class="auth-links">
            <router-link to="/login" class="auth-link">Профиль</router-link>
           
          </div>
        </div>
        

        <router-link to="/cart" class="nav-link cart-link">
          🛒
          <span v-if="cartTotalItems > 0" class="cart-count">{{ cartTotalItems }}</span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'

const router = useRouter()
const { totalItems } = useCart()


const isLoggedIn = ref(false)
const userName = ref('')


const searchQuery = ref('')


const showCatalogDropdown = ref(false)


const cartTotalItems = computed(() => totalItems.value)


onMounted(() => {
  checkAuthStatus()
})

const checkAuthStatus = () => {
  const loggedIn = localStorage.getItem('isLoggedIn')
  const name = localStorage.getItem('userName')
  
  if (loggedIn === 'true' && name) {
    isLoggedIn.value = true
    userName.value = name
  }
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/search?q=${encodeURIComponent(searchQuery.value)}`)
    searchQuery.value = ''
  }
}

const logout = () => {
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('userName')
  localStorage.removeItem('userEmail')
  localStorage.removeItem('rememberMe')
  
  isLoggedIn.value = false
  userName.value = ''
  router.push('/login')
}
</script>


<style scoped>
.header {
  background: linear-gradient(135deg, #b1658b, #994b75);
  color: white;
  padding: 0.8rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: relative;
  z-index: 1000;
}

.header-left {
  min-width: 150px;
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
}

.logo:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Центр: Поиск */
.header-center {
  flex: 1;
  max-width: 600px;
  margin: 0 2rem;
}

.search-container {
  display: flex;
  background: white;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.search-input {
  flex: 1;
  padding: 0.8rem 1.5rem;
  border: none;
  outline: none;
  font-size: 1rem;
}

.search-btn {
  background: #308830;
  color: white;
  border: none;
  padding: 0 1.5rem;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background 0.3s;
}

.search-btn:hover {
  background: #176117;
}


.header-right {
  min-width: 400px;
  display: flex;
  justify-content: flex-end;
}

nav {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-item {
  position: relative;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
}

.router-link-active {
  background: rgba(255, 255, 255, 0.3);
}


.profile-section {
  display: flex;
  align-items: center;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-name {
  font-weight: 500;
  font-size: 0.95rem;
}

.logout-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  cursor: pointer;
  font-size: 0.8rem;
}

.logout-btn:hover {
  background: rgba(255, 100, 100, 0.3);
}

.auth-links {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.auth-link {
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
}

.auth-link:hover {
  background: rgba(255, 255, 255, 0.2);
}

.separator {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
}


.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.15);
  min-width: 220px;
  padding: 0.5rem 0;
  z-index: 1001;
}

.dropdown-item {
  display: block;
  padding: 0.8rem 1.5rem;
  color: #333;
  text-decoration: none;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background: #f0f0f0;
  color: #ff69b4;
}

.all-catalog {
  border-top: 1px solid #eee;
  margin-top: 0.5rem;
  padding-top: 1rem;
  font-weight: bold;
  color: rgba(85, 43, 64, 0.774);
}

/* Корзина */
.cart-link {
  position: relative;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #32cd32;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
</style>