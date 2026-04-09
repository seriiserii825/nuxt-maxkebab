<script setup lang="ts"></script>

<template>
  <div class="single-product">
    <div class="container">
      <ul class="breadcrumb">
        <li class="breadcrumb__item">
          <NuxtLink class="breadcrumb__link" to="/">Acasă</NuxtLink>
          /
        </li>
        <li class="breadcrumb__item">
          <NuxtLink class="breadcrumb__link" to="/#meniuri">Combo</NuxtLink>
          /
        </li>
        <li class="breadcrumb__item">
          <span>Menu Kebab standart</span>
        </li>
      </ul>

      <div class="single-product__wrap">
        <div class="single-product__info">
          <h1 class="single-product__title">Menu Kebab standart</h1>

          <div class="single-product__description">
            <p><strong>Kebab standart; Cartofi pai; Bautura; Sos</strong></p>
          </div>

          <div class="single-product__price">
            <span class="single-product__price-value">135</span>
            <span class="single-product__price-currency">Lei</span>
          </div>

          <form class="single-product__form">
            <!-- Bautura -->
            <div class="option-group">
              <h3 class="option-group__title">Bautura <span class="option-group__required">*</span></h3>
              <ul class="option-group__list">
                <li class="option-group__item">
                  <label class="option-group__label">
                    <input class="option-group__radio" type="radio" name="bautura" value="Coca-Cola" checked />
                    <span class="option-group__text">Coca-Cola</span>
                  </label>
                </li>
                <li class="option-group__item">
                  <label class="option-group__label">
                    <input class="option-group__radio" type="radio" name="bautura" value="Sprite" />
                    <span class="option-group__text">Sprite</span>
                  </label>
                </li>
                <li class="option-group__item">
                  <label class="option-group__label">
                    <input class="option-group__radio" type="radio" name="bautura" value="Fanta" />
                    <span class="option-group__text">Fanta</span>
                  </label>
                </li>
              </ul>
            </div>

            <!-- Sos -->
            <div class="option-group">
              <h3 class="option-group__title">Sos <span class="option-group__required">*</span></h3>
              <ul class="option-group__list">
                <li class="option-group__item">
                  <label class="option-group__label">
                    <input class="option-group__radio" type="radio" name="sos" value="Ketchup" checked />
                    <span class="option-group__text">Ketchup</span>
                  </label>
                </li>
                <li class="option-group__item">
                  <label class="option-group__label">
                    <input class="option-group__radio" type="radio" name="sos" value="Maioneza cu usturoi" />
                    <span class="option-group__text">Maioneza cu usturoi</span>
                  </label>
                </li>
              </ul>
            </div>

            <!-- Mențiuni -->
            <div class="option-group">
              <h3 class="option-group__title">Mențiuni</h3>
              <label class="option-group__label option-group__label--textarea" for="comentariu">
                Comentariu
              </label>
              <textarea class="option-group__textarea" id="comentariu" name="comentariu"></textarea>
            </div>

            <!-- Adaosuri -->
            <div class="option-group">
              <h3 class="option-group__title">Adaosuri</h3>
              <ul class="option-group__list option-group__list--grid">
                <li class="option-group__item">
                  <label class="option-group__label">
                    <input class="option-group__checkbox" type="checkbox" name="adaos_carne" value="Carne" />
                    <span class="option-group__text">
                      Carne + 15 Lei
                      <small class="option-group__desc">50 gr</small>
                    </span>
                  </label>
                </li>
                <li class="option-group__item">
                  <label class="option-group__label">
                    <input class="option-group__checkbox" type="checkbox" name="adaos_cascaval" value="Cascaval" />
                    <span class="option-group__text">
                      Cascaval + 20 Lei
                      <small class="option-group__desc">50 gr</small>
                    </span>
                  </label>
                </li>
                <li class="option-group__item">
                  <label class="option-group__label">
                    <input class="option-group__checkbox" type="checkbox" name="adaos_ciuperci" value="Ciuperci" />
                    <span class="option-group__text">
                      Ciuperci + 20 Lei
                      <small class="option-group__desc">50 gr</small>
                    </span>
                  </label>
                </li>
                <li class="option-group__item">
                  <label class="option-group__label">
                    <input class="option-group__checkbox" type="checkbox" name="adaos_masline" value="Masline" />
                    <span class="option-group__text">
                      Masline + 15 Lei
                      <small class="option-group__desc">20 gr</small>
                    </span>
                  </label>
                </li>
                <li class="option-group__item">
                  <label class="option-group__label">
                    <input class="option-group__checkbox" type="checkbox" name="adaos_lavas" value="Lavas" />
                    <span class="option-group__text">
                      Lavas + 5 Lei
                      <small class="option-group__desc">1 buc</small>
                    </span>
                  </label>
                </li>
              </ul>
            </div>

            <!-- Adaosuri sosuri -->
            <div class="option-group">
              <h3 class="option-group__title">Adaosuri sosuri</h3>
              <ul class="option-group__list option-group__list--grid">
                <li class="option-group__item option-group__item--number">
                  <label class="option-group__label" for="sos_picant">
                    Sos picant
                    <span class="option-group__item-price">10 Lei</span>
                    <small class="option-group__desc">50 g · Max: 5</small>
                  </label>
                  <div class="option-group__stepper">
                    <button class="option-group__stepper-btn" type="button">−</button>
                    <input class="option-group__stepper-input" type="number" id="sos_picant" name="sos_picant" value="0" min="0" max="5" />
                    <button class="option-group__stepper-btn" type="button">+</button>
                  </div>
                </li>
                <li class="option-group__item option-group__item--number">
                  <label class="option-group__label" for="maioneza_usturoi">
                    Maioneza cu usturoi
                    <span class="option-group__item-price">12 Lei</span>
                    <small class="option-group__desc">50 g · Max: 5</small>
                  </label>
                  <div class="option-group__stepper">
                    <button class="option-group__stepper-btn" type="button">−</button>
                    <input class="option-group__stepper-input" type="number" id="maioneza_usturoi" name="maioneza_usturoi" value="0" min="0" max="5" />
                    <button class="option-group__stepper-btn" type="button">+</button>
                  </div>
                </li>
                <li class="option-group__item option-group__item--number">
                  <label class="option-group__label" for="ketchup_sos">
                    Ketchup
                    <span class="option-group__item-price">12 Lei</span>
                    <small class="option-group__desc">50 g · Max: 5</small>
                  </label>
                  <div class="option-group__stepper">
                    <button class="option-group__stepper-btn" type="button">−</button>
                    <input class="option-group__stepper-input" type="number" id="ketchup_sos" name="ketchup_sos" value="0" min="0" max="5" />
                    <button class="option-group__stepper-btn" type="button">+</button>
                  </div>
                </li>
                <li class="option-group__item option-group__item--number">
                  <label class="option-group__label" for="sos_cascaval">
                    Sos cascaval
                    <span class="option-group__item-price">15 Lei</span>
                    <small class="option-group__desc">50 g · Max: 5</small>
                  </label>
                  <div class="option-group__stepper">
                    <button class="option-group__stepper-btn" type="button">−</button>
                    <input class="option-group__stepper-input" type="number" id="sos_cascaval" name="sos_cascaval" value="0" min="0" max="5" />
                    <button class="option-group__stepper-btn" type="button">+</button>
                  </div>
                </li>
                <li class="option-group__item option-group__item--number">
                  <label class="option-group__label" for="mustar">
                    Mustar
                    <span class="option-group__item-price">10 Lei</span>
                    <small class="option-group__desc">50 g · Max: 5</small>
                  </label>
                  <div class="option-group__stepper">
                    <button class="option-group__stepper-btn" type="button">−</button>
                    <input class="option-group__stepper-input" type="number" id="mustar" name="mustar" value="0" min="0" max="5" />
                    <button class="option-group__stepper-btn" type="button">+</button>
                  </div>
                </li>
                <li class="option-group__item option-group__item--number">
                  <label class="option-group__label" for="mustar_american">
                    Mustar american
                    <span class="option-group__item-price">10 Lei</span>
                    <small class="option-group__desc">50 g · Max: 5</small>
                  </label>
                  <div class="option-group__stepper">
                    <button class="option-group__stepper-btn" type="button">−</button>
                    <input class="option-group__stepper-input" type="number" id="mustar_american" name="mustar_american" value="0" min="0" max="5" />
                    <button class="option-group__stepper-btn" type="button">+</button>
                  </div>
                </li>
              </ul>
            </div>

            <div class="single-product__totals">
              <div class="single-product__total-row">
                <span class="single-product__total-label">Produs</span>
                <span class="single-product__total-value">135 Lei</span>
              </div>
              <div class="single-product__total-row">
                <span class="single-product__total-label">Opțiuni</span>
                <span class="single-product__total-value">0 Lei</span>
              </div>
              <div class="single-product__total-row single-product__total-row--grand">
                <span class="single-product__total-label">Total</span>
                <span class="single-product__total-value">135 Lei</span>
              </div>
            </div>

            <div class="single-product__actions">
              <div class="quantity">
                <button class="quantity__btn" type="button">−</button>
                <input class="quantity__input" type="number" name="quantity" value="1" min="1" />
                <button class="quantity__btn" type="button">+</button>
              </div>

              <button class="single-product__submit" type="submit">Adaugă în coș</button>
            </div>
          </form>
        </div>

        <div class="single-product__gallery">
          <img
            class="single-product__image"
            src="https://maxkebab.md/wp-content/uploads/2025/11/meniu-kebab-standart-600x900.jpg"
            alt="Menu Kebab standart"
            width="600"
            height="900" />
        </div>
      </div>
    </div>
  </div>
</template>
