<script setup lang="ts"></script>

<template>
  <div class="products-section">
    <img class="rndAnim bg-image bg-image--1" src="" alt="pizza" loading="lazy" />
    <img class="rndAnim bg-image bg-image--2" src="" alt="pizza" loading="lazy" />

    <div class="products-section__inner">
      <div class="container">
        <div class="products-section__header">
          <h2 class="products-section__title">
            <span>Combo</span>
            <img src="" alt="category-image" loading="lazy" />
          </h2>
        </div>

        <!-- FIXED -->
        <div class="products-section__content">
          <div class="product-card">
            <a href="https://maxkebab.md/produs/menu-kebab-standart/">
              <div class="product-card__img">
                <img src="" />
              </div>
            </a>

            <div class="product-card__content">
              <h3 class="product-card__title">Menu Kebab standart</h3>

              <div class="product-card__description">
                <p>
                  <strong>Kebab standart;</strong>
                  <strong>Cartofi pai; Bautura; Sos</strong>
                </p>
              </div>

              <!-- NEW CLEAN BEM -->
              <footer class="product-card__footer">
                <div class="product-card__price">
                  135
                  <span>Lei</span>
                </div>

                <div class="product-card__actions">
                  <a
                    href="https://maxkebab.md/produs/menu-kebab-standart/"
                    class="product-card__add-to-cart">
                    <!-- svg -->
                  </a>

                  <a
                    class="product-card__topping"
                    href="https://maxkebab.md/produs/menu-kebab-standart/">
                    Topping
                  </a>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
