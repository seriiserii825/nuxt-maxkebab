<script setup lang="ts"></script>

<template>
  <ul class="main-menu main-header__main-menu">
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
    <UINavLink slug="oferte" label="Oferte" />
    <UINavLink slug="despre-noi" label="Despre noi" />
    <UINavLink slug="livrare" label="Livrare" />
    <UINavLink slug="contacte" label="Contacte" />
  </ul>
</template>
