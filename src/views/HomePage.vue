<template>
  <div class="home-page">
    <h1>Цветочный магазин</h1>
    

    <section class="promo-section">
      <h2>Акция недели!</h2>
      <div class="promo-item">
        <h3>Название букета или акции</h3>
        <p class="price-old">2500₽</p>
        <p class="price-new">1998₽</p>
        <button class="add-to-cart">В КОРЗИНУ</button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.home-page {
  padding: 1rem;
}

.promo-section {
  background: #fff0f5;
  padding: 1.5rem;
  border-radius: 10px;
  margin: 2rem 0;
}

.promo-item {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border: 2px dashed #ff69b4;
}

.price-old {
  text-decoration: line-through;
  color: #888;
}

.price-new {
  color: #ff1493;
  font-size: 1.5rem;
  font-weight: bold;
}

.add-to-cart {
  background: #ff69b4;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 0.5rem;
}

.categories {
  margin: 2rem 0;
}

.category-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.category-item {
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #ddd;
}

.category-item:hover {
  background: #fff0f5;
  border-color: #ff69b4;
}
</style>