<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Основная информация -->
      <div class="footer-section footer-about">
        <div class="footer-logo">
          <span class="footer-logo-icon"></span>
          <span class="footer-logo-text">FlowerShop</span>
        </div>
        <p class="footer-description">
          Мы создаем красивые букеты с любовью и заботой о каждой детали. 
          Доставляем свежие цветы по всему городу с 2015 года.
        </p>
        <div class="footer-social">
          <a href="#" class="social-link" title="ВКонтакте">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.073 2H8.93C5.103 2 2 5.103 2 8.93v6.144C2 18.897 5.103 22 8.93 22h6.14c3.827 0 6.93-3.103 6.93-6.926V8.93C22 5.103 18.897 2 15.073 2zM17.56 15.09c.637.634.637 1.666 0 2.3-.317.318-.733.477-1.148.477s-.832-.159-1.15-.477l-2.23-2.23c-.636-.634-.636-1.666 0-2.3.637-.634 1.667-.634 2.303 0l1.15 1.15c.17.17.446.17.616 0l1.457-1.457c.17-.17.17-.446 0-.616l-2.23-2.23c-.636-.634-1.667-.634-2.303 0-.637.634-.637 1.666 0 2.3l1.15 1.15c.17.17.17.446 0 .616l-1.457 1.457c-.17.17-.446.17-.616 0l-1.15-1.15c-.636-.634-1.667-.634-2.303 0-.637.634-.637 1.666 0 2.3l2.23 2.23c.318.318.734.477 1.15.477s.832-.159 1.148-.477c.637-.634.637-1.666 0-2.3l-1.15-1.15c-.17-.17-.17-.446 0-.616l1.457-1.457c.17-.17.446-.17.616 0l2.23 2.23z"/>
            </svg>
          </a>
          <a href="#" class="social-link" title="Telegram">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.38-.49 1.04-.74 4.09-1.78 6.82-2.96 8.18-3.56 3.9-1.72 4.71-2.02 5.24-2.03.12 0 .38.03.55.17.14.12.18.28.2.44-.01.07.01.27 0 .42z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Контакты -->
      <div class="footer-section footer-contact">
        <h3>Контакты</h3>
        <ul class="footer-list">
          <li>
            <svg viewBox="0 0 24 24" fill="currentColor" class="footer-icon">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>г. Владимир, ул. Цветочная, д. 15</span>
          </li>
          <li>
            <svg viewBox="0 0 24 24" fill="currentColor" class="footer-icon">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <span>+7 (999) 123-45-67</span>
          </li>
          <li>
            <svg viewBox="0 0 24 24" fill="currentColor" class="footer-icon">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span>info@flowershop.ru</span>
          </li>
        </ul>
        <div class="footer-work-time">
          <strong>Режим работы:</strong><br>
          Пн-Пт: 9:00 - 20:00<br>
          Сб-Вс: 10:00 - 19:00
        </div>
      </div>

    </div>

    <!-- Нижняя часть -->
    <div class="footer-bottom">
      <div class="footer-bottom-content">
        <p>&copy; 2026 FlowerShop. Все права защищены.</p>
        <p>Сайт создан с любовью к цветам 🌸</p>
      </div>
      <div class="footer-payment">
        <span>Мы принимаем:</span>
        <div class="payment-icons">
          <span class="payment-icon" title="Мир">💳</span>
          <span class="payment-icon" title="Наличные">💵</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Компонент футера
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%);
  color: #e0e0e0;
  padding: 3rem 0 0 0;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2rem;
}

.footer-section h3 {
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 1.2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #b1658b;
  display: inline-block;
}

/* Логотип в футере */
.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
}

.footer-logo-icon {
  font-size: 2rem;
}

.footer-logo-text {
  background: linear-gradient(90deg, #fff, #ffe6f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-description {
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #b0b0b0;
}

/* Социальные сети */
.footer-social {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: #fff;
}

.social-link:hover {
  background: #b1658b;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(177, 101, 139, 0.4);
}

.social-link svg {
  width: 20px;
  height: 20px;
}

/* Список контактов */
.footer-list {
  list-style: none;
  padding: 0;
}

.footer-list li {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.footer-icon {
  width: 20px;
  height: 20px;
  color: #b1658b;
  flex-shrink: 0;
}

.footer-work-time {
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(177, 101, 139, 0.1);
  border-radius: 8px;
  border-left: 3px solid #b1658b;
  line-height: 1.6;
}

/* Ссылки меню */
.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.8rem;
}

.footer-links a {
  color: #b0b0b0;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
}

.footer-links a:hover {
  color: #fff;
  transform: translateX(5px);
}

.footer-links a::before {
  content: '›';
  margin-right: 0.5rem;
  color: #b1658b;
}

/* Нижняя часть */
.footer-bottom {
  margin-top: 3rem;
  padding: 1.5rem 2rem;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-bottom-content p {
  margin: 0.3rem 0;
  color: #888;
  font-size: 0.9rem;
}

.footer-payment {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.footer-payment span {
  color: #888;
  font-size: 0.9rem;
}

.payment-icons {
  display: flex;
  gap: 0.5rem;
}

.payment-icon {
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.payment-icon:hover {
  transform: scale(1.2);
}

/* Адаптивность */
@media (max-width: 992px) {
  .footer-container {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 576px) {
  .footer-container {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-payment {
    flex-direction: column;
  }
}
</style>