<script setup lang="ts"></script>

<template>
  <header class="main-header">
    <div class="container main-header__menu">
      <div class="language">
        <section id="wpglobus-5" class="widget widget_wpglobus">
          <h2 class="widget-title">Alege limba</h2>
          <div class="list flags">
            <a href="https://maxkebab.md/" class="wpglobus-selector-link wpglobus-current-language">
              <img src="https://maxkebab.md/wp-content/plugins/wpglobus/flags/ro.png" alt="" />
              <span class="name">Română</span>
              <span class="code">RO</span>
            </a>
            <a href="https://maxkebab.md/ru/" class="wpglobus-selector-link">
              <img src="https://maxkebab.md/wp-content/plugins/wpglobus/flags/ru.png" alt="" />
              <span class="name">Русский</span>
              <span class="code">RU</span>
            </a>
            <a href="https://maxkebab.md/en/" class="wpglobus-selector-link">
              <img src="https://maxkebab.md/wp-content/plugins/wpglobus/flags/us.png" alt="" />
              <span class="name">English</span>
              <span class="code">EN</span>
            </a>
          </div>
        </section>
        <div class="language__btn" id="js-language-btn">
          <img src="https://maxkebab.md/wp-content/plugins/wpglobus/flags/ro.png" alt="" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none">
            <path
              d="M6.5 3L4 5.5L1.5 3"
              stroke="#231F20"
              stroke-width="0.5"
              stroke-linecap="round"
              stroke-linejoin="round"></path>
          </svg>
        </div>
      </div>
      <ul class="city-select">
        <li class="city-select__item" data-city-select="chisinau">
          <div class="city-select__title">
            <span>Chișinău</span>
            <small>Ion Pelivan 22/1</small>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none">
              <path
                d="M6.5 3L4 5.5L1.5 3"
                stroke="#231F20"
                stroke-width="0.5"
                stroke-linecap="round"
                stroke-linejoin="round"></path>
            </svg>
          </div>
          <ul class="city-select__list">
            <li class="city-select__item" data-city-select="ialoveni">Ialoveni</li>
          </ul>
        </li>
      </ul>
      <div class="logo">
        <a href="https://maxkebab.md">
          <img
            src="https://maxkebab.md/wp-content/uploads/2025/11/Logo-Max-Kebab.png"
            alt="Logo Max Kebab"
            title="Max Kebab" />
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
