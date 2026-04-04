<script setup lang="ts"></script>

<template>
  <header class="main-header">
    <div class="container main-header__menu">
      <LayoutLanguageSelector />
      <UICitySelect />
      <div class="logo">
        <a href="https://maxkebab.md">
          <img src="/img/Logo.png" alt="Logo Max Kebab" title="Max Kebab" />
        </a>
      </div>
      <ul id="js-main-menu" class="main-menu main-header__main-menu">
        <li class="menu-menu">
          <h3 class="menu-menu__title">Menu</h3>
          <ul class="sub-menu">
            <li>
              <a href="#meniuri">
                <div>Combo</div>
              </a>
            </li>
            <li>
              <a href="#sandvich">
                <div>Sandvich</div>
              </a>
            </li>
            <li>
              <a href="#snack">
                <div>Snack-uri</div>
              </a>
            </li>
            <li>
              <a href="#desert">
                <div>Deserturi</div>
              </a>
            </li>
            <li>
              <a href="#sosuri">
                <div>Sosuri</div>
              </a>
            </li>
            <li>
              <a href="#bauturi">
                <div>Băuturi</div>
              </a>
            </li>
          </ul>
        </li>
        <li
          id="menu-item-56"
          class="menu-item menu-item-type-post_type menu-item-object-page menu-item-56">
          <a href="https://maxkebab.md/oferte/">Oferte</a>
        </li>
        <li
          id="menu-item-58"
          class="menu-item menu-item-type-post_type menu-item-object-page menu-item-58">
          <a href="https://maxkebab.md/despre-noi/">Despre noi</a>
        </li>
        <li
          id="menu-item-1952"
          class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1952">
          <a href="https://maxkebab.md/livrare/">Livrare</a>
        </li>
        <li
          id="menu-item-57"
          class="menu-item menu-item-type-post_type menu-item-object-page menu-item-57">
          <a href="https://maxkebab.md/contacte/">Contacte</a>
        </li>
      </ul>
      <div class="main-header__cart-icon cart-icon">
        <div class="cart-icon-target">
          <svg
            width="44"
            height="41"
            viewBox="0 0 44 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M42.4943 12.375L39.9943 39.875H4.00568L1.50568 12.375H42.4943Z"
              stroke="white"></path>
            <path
              d="M13.75 11C13.75 10.5407 13.75 9.7187 13.75 8.8C13.75 3.93989 17.4437 0 22 0C26.5563 0 30.25 3.93989 30.25 8.8C30.25 9.7471 30.25 10.5264 30.25 11"
              stroke="white"></path>
          </svg>
          <a class="cart-contents" href="https://maxkebab.md/cart/" title="View your shopping cart">
            <span class="amount"><span class="count">0</span></span>
          </a>
        </div>
        <div class="widget woocommerce widget_shopping_cart">
          <div class="widget_shopping_cart_content">
            <p class="woocommerce-mini-cart__empty-message">Nu ai niciun produs în coș.</p>
          </div>
        </div>
        <div class="main-header__cart-icon__total">0 Lei</div>
      </div>

      <div class="main-header__sandwich sandwitch-wrap" id="js-sandwitch-wrap">
        <div class="sandwitch">
          <div class="sandwitch__line sandwitch__line--top"></div>
          <div class="sandwitch__line sandwitch__line--middle"></div>
          <div class="sandwitch__line sandwitch__line--bottom"></div>
        </div>
      </div>
    </div>
  </header>
</template>
