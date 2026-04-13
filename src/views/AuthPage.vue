<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-header">
        <h1>{{ isLoginMode ? 'Вход' : 'Регистрация' }}</h1>
        <p>{{ isLoginMode ? 'Войдите в свой аккаунт' : 'Создайте новый аккаунт' }}</p>
      </div>

      <div class="auth-tabs">
        <button 
          :class="{ active: isLoginMode }" 
          @click="switchToLogin"
        >
          Вход
        </button>
        <button 
          :class="{ active: !isLoginMode }" 
          @click="switchToRegister"
        >
          Регистрация
        </button>
      </div>

  
      <form v-if="isLoginMode" @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label for="login-email">Email</label>
          <input 
            type="email" 
            id="login-email" 
            v-model="loginEmail" 
            placeholder="example@mail.com" 
            required
          >
        </div>

        <div class="form-group">
          <label for="login-password">Пароль</label>
          <input 
            type="password" 
            id="login-password" 
            v-model="loginPassword" 
            placeholder="Введите пароль" 
            required
          >
        </div>

        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe">
            <span>Запомнить меня</span>
          </label>
          <a href="#" class="forgot-password">Забыли пароль?</a>
        </div>

        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? 'Вход...' : 'Войти' }}
        </button>
      </form>


      <form v-else @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label for="register-name">Имя</label>
          <input 
            type="text" 
            id="register-name" 
            v-model="registerName" 
            placeholder="Ваше имя" 
            required
          >
        </div>

        <div class="form-group">
          <label for="register-email">Email</label>
          <input 
            type="email" 
            id="register-email" 
            v-model="registerEmail" 
            placeholder="example@mail.com" 
            required
          >
        </div>

        <div class="form-group">
          <label for="register-password">Пароль</label>
          <input 
            type="password" 
            id="register-password" 
            v-model="registerPassword" 
            placeholder="Не менее 6 символов" 
            required
          >
        </div>

        <div class="form-group">
          <label for="register-confirm">Подтвердите пароль</label>
          <input 
            type="password" 
            id="register-confirm" 
            v-model="registerConfirmPassword" 
            placeholder="Повторите пароль" 
            required
          >
        </div>

        <div class="form-options">
          <label class="terms-agreement">
            <input type="checkbox" v-model="agreeTerms" required>
            <span>Я согласен с <a href="#">условиями использования</a></span>
          </label>
        </div>

        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
        </button>
      </form>

      <div class="auth-footer">
        <p v-if="isLoginMode">
          Нет аккаунта? 
          <button @click="switchToRegister" class="switch-btn">Зарегистрируйтесь</button>
        </p>
        <p v-else>
          Уже есть аккаунт? 
          <button @click="switchToLogin" class="switch-btn">Войдите</button>
        </p>
        
        <router-link to="/" class="back-home">
          ← Вернуться на главную
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isLoginMode = ref(true)
const loading = ref(false)


const loginEmail = ref('')
const loginPassword = ref('')
const rememberMe = ref(false)


const registerName = ref('')
const registerEmail = ref('')
const registerPassword = ref('')
const registerConfirmPassword = ref('')
const agreeTerms = ref(false)


onMounted(() => {
  const path = router.currentRoute.value.path
  if (path === '/register') {
    isLoginMode.value = false
  }
})


const getUsernameFromEmail = (email: string): string => {
  if (!email || typeof email !== 'string') return 'Пользователь'
  if (!email.includes('@')) return email
  
  const username = email.split('@')[0]
  return username || 'Пользователь'
}

const switchToLogin = () => {
  isLoginMode.value = true
  router.push('/login')
}

const switchToRegister = () => {
  isLoginMode.value = false
  router.push('/register')
}

const handleLogin = async () => {
  if (!loginEmail.value || !loginPassword.value) return
  
  loading.value = true
  
  try {

    await new Promise(resolve => setTimeout(resolve, 1000))

    const email = loginEmail.value.trim()
    const password = loginPassword.value
    
    if (!email.includes('@')) {
      throw new Error('Некорректный email адрес')
    }
    
    if (password.length < 3) {
      throw new Error('Пароль слишком короткий')
    }
    
    alert(`Успешный вход: ${email}`)

    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userEmail', email)
    localStorage.setItem('userName', getUsernameFromEmail(email))
    

    if (rememberMe.value) {
      localStorage.setItem('rememberMe', 'true')
    }
    
  } catch (error) {
    alert(error instanceof Error ? error.message : 'Ошибка при входе')
    return
  } finally {
    loading.value = false
  }
  

  router.push('/')
}

const handleRegister = async () => {
  if (!registerName.value || !registerEmail.value || !registerPassword.value) {
    alert('Пожалуйста, заполните все обязательные поля')
    return
  }
  

  if (registerPassword.value !== registerConfirmPassword.value) {
    alert('Пароли не совпадают!')
    return
  }
  
  if (registerPassword.value.length < 6) {
    alert('Пароль должен содержать минимум 6 символов')
    return
  }
  
  if (!agreeTerms.value) {
    alert('Необходимо согласиться с условиями использования')
    return
  }
  
  loading.value = true
  
  try {

    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const name = registerName.value.trim()
    const email = registerEmail.value.trim()
    
    
    if (!email.includes('@')) {
      throw new Error('Некорректный email адрес')
    }
    
    alert(`Успешная регистрация: ${name} (${email})`)
    

    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userName', name)
    localStorage.setItem('userEmail', email)
    
  } catch (error) {
    alert(error instanceof Error ? error.message : 'Ошибка при регистрации')
    return
  } finally {
    loading.value = false
  }
  

  router.push('/')
}
</script>

<style scoped>
.auth-page {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #fff5f9, #ffe6f2);
}

.auth-container {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 10px 30px rgba(255, 105, 180, 0.1);
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-header h1 {
  color: #cf6d9e;
  margin-bottom: 0.5rem;
  font-size: 2rem;
}

.auth-header p {
  color: #666;
  font-size: 0.95rem;
}

.auth-tabs {
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
}

.auth-tabs button {
  flex: 1;
  padding: 1rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  color: #666;
  border-bottom: 3px solid transparent;
  transition: all 0.3s;
}

.auth-tabs button:hover {
  color: #cf6d9e;
}

.auth-tabs button.active {
  color: #cf6d9e;
  border-bottom-color: #cf6d9e;
  font-weight: bold;
}

.auth-form {
  margin-bottom: 2rem;
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

.form-group input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #ff69b4;
  box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.1);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.remember-me, .terms-agreement {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  cursor: pointer;
}

.forgot-password {
  color: #ff69b4;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.terms-agreement a {
  color: #ff69b4;
  text-decoration: none;
}

.terms-agreement a:hover {
  text-decoration: underline;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #ff69b4, #ff1493);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 105, 180, 0.3);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-footer {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

.auth-footer p {
  color: #666;
  margin-bottom: 1rem;
}

.switch-btn {
  background: none;
  border: none;
  color: #ff69b4;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
}

.switch-btn:hover {
  color: #ff1493;
}

.back-home {
  display: inline-block;
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
}

.back-home:hover {
  color: #ff69b4;
}
</style>