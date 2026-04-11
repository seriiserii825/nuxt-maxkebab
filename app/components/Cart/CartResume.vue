<script setup lang="ts">
  const products = [
    { id: 1, name: "Burger pui", price: 80, image: "/img/burger-pui.jpg" },
    { id: 2, name: "Aripioare picante", price: 79, image: "/img/aripoare-picante.jpg" },
    { id: 3, name: "Cartofi pai", price: 40, image: "/img/cartofi-pai.jpg" },
    { id: 4, name: "Coca-Cola", price: 27, image: "/img/coca-cola.png" },
  ];
</script>

<template>
  <div class="cart-resume">
    <h2 class="cart-resume__title">S-ar putea să te intereseze…</h2>
    <div class="cart-resume__grid">
      <div v-for="product in products" :key="product.id" class="cart-resume__item">
        <div class="cart-resume__thumb">
          <img :src="product.image" :alt="product.name" />
        </div>
        <div class="cart-resume__info">
          <div class="cart-resume__name">{{ product.name }}</div>
          <div class="cart-resume__footer">
            <div class="cart-resume__price">
              {{ product.price }}<span>Lei</span>
            </div>
            <div class="cart-resume__add">
              <button class="cart-resume__add-btn" type="button"><span>+</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
