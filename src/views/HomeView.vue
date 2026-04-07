<template>
  <div class="home">
    <!-- HERO SECTION С ФОНОВОЙ КАРТИНКОЙ -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Свежие цветы с доставкой</h1>
        <p class="hero-subtitle">
          Создаем букеты с любовью и заботой о каждой детали
        </p>
        <div class="hero-buttons">
          <router-link to="/catalog" class="btn btn-primary">
            Смотреть каталог
          </router-link>
          <router-link to="/about" class="btn btn-secondary">
            О нас
          </router-link>
        </div>
      </div>
    </section>

    <!-- АКЦИЯ -->
    <section class="promo">
      <div class="promo-card">
        <div class="promo-badge">-20%</div>
        <h2>Скидка на первый заказ</h2>
        <p>Получите скидку 20% при оформлении первого заказа по промокоду <strong>FIRST20</strong></p>
        <router-link to="/catalog" class="btn btn-primary">Заказать сейчас</router-link>
      </div>
    </section>

    <!-- ПРЕИМУЩЕСТВА -->
    <section class="features">
      <h2 class="section-title">Почему выбирают нас</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🚚</div>
          <h3>Быстрая доставка</h3>
          <p>Доставим за 2 часа или в удобное время</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🌹</div>
          <h3>Свежие цветы</h3>
          <p>Только свежие поставки каждый день</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">💳</div>
          <h3>Удобная оплата</h3>
          <p>Оплата картой, наличными или онлайн</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🎁</div>
          <h3>Подарки</h3>
          <p>Открытка и упаковка в подарок</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Компонент главной страницы
</script>

<style scoped>
/* HERO SECTION */
.hero {
  /* ПУНКТ 5: ФОНОВАЯ КАРТИНКА */
  background: linear-gradient(135deg, rgba(177, 101, 139, 0.9), rgba(153, 75, 117, 0.9));
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  border-radius: 20px;
  margin-bottom: 60px;
  position: relative;
  overflow: hidden;
}

/* Если нет фоновой картинки, используем градиент */
.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(177, 101, 139, 0.9), rgba(153, 75, 117, 0.9));
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 700px;
  padding: 0 20px;
}

.hero-title {
  font-size: 56px;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 1s ease;
}

.hero-subtitle {
  font-size: 22px;
  margin-bottom: 40px;
  opacity: 0.95;
  animation: fadeInUp 1s ease 0.2s both;
}

.hero-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  animation: fadeInUp 1s ease 0.4s both;
}

/* КНОПКИ */
.btn {
  padding: 15px 35px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background-color: white;
  color: #b1658b;
}

.btn-primary:hover {
  background-color: #f8f9fa;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background-color: white;
  color: #b1658b;
  transform: translateY(-3px);
}

/* АКЦИЯ */
.promo {
  margin-bottom: 60px;
}

.promo-card {
  background: linear-gradient(135deg, #fff5f8 0%, #ffeef2 100%);
  border: 2px solid #b1658b;
  border-radius: 20px;
  padding: 50px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.promo-badge {
  position: absolute;
  top: 20px;
  right: -35px;
  background-color: #ff4757;
  color: white;
  padding: 8px 40px;
  transform: rotate(45deg);
  font-weight: bold;
  font-size: 18px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.promo-card h2 {
  color: #b1658b;
  font-size: 36px;
  margin-bottom: 15px;
}

.promo-card p {
  font-size: 18px;
  color: #555;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* ПРЕИМУЩЕСТВА */
.features {
  margin-bottom: 60px;
}

.section-title {
  text-align: center;
  font-size: 36px;
  color: #2c3e50;
  margin-bottom: 40px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.feature-card {
  background: white;
  padding: 40px 30px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 50px;
  margin-bottom: 20px;
}

.feature-card h3 {
  color: #2c3e50;
  font-size: 22px;
  margin-bottom: 10px;
}

.feature-card p {
  color: #7f8c8d;
  font-size: 15px;
  line-height: 1.6;
}

/* АНИМАЦИИ */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* АДАПТИВНОСТЬ */
@media (max-width: 768px) {
  .hero {
    height: 500px;
  }
  
  .hero-title {
    font-size: 36px;
  }
  
  .hero-subtitle {
    font-size: 18px;
  }
  
  .hero-buttons {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
  
  .promo-card {
    padding: 30px 20px;
  }
  
  .promo-card h2 {
    font-size: 28px;
  }
  
  .section-title {
    font-size: 28px;
  }
}
</style>