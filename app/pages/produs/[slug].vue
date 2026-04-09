<script setup lang="ts">
const breadcrumbs = [
  { label: "Acasă", to: "/" },
  { label: "Combo", to: "/#meniuri" },
  { label: "Menu Kebab standart" },
];

const bautura = [
  { value: "Coca-Cola", label: "Coca-Cola", checked: true },
  { value: "Sprite", label: "Sprite" },
  { value: "Fanta", label: "Fanta" },
];

const sos = [
  { value: "Ketchup", label: "Ketchup", checked: true },
  { value: "Maioneza cu usturoi", label: "Maioneza cu usturoi" },
];

const adaosuri = [
  { name: "adaos_carne", value: "Carne", label: "Carne", price: 15 },
  { name: "adaos_cascaval", value: "Cascaval", label: "Cascaval", price: 20 },
  { name: "adaos_ciuperci", value: "Ciuperci", label: "Ciuperci", price: 20 },
  { name: "adaos_masline", value: "Masline", label: "Masline", price: 15 },
  { name: "adaos_lavas", value: "Lavas", label: "Lavas", price: 5 },
];

const adaosuriSosuri = [
  {
    id: "sos_picant",
    name: "sos_picant",
    label: "Sos picant",
    price: 10,
    desc: "50 g · Max: 5",
    min: 0,
    max: 5,
  },
  {
    id: "maioneza_usturoi",
    name: "maioneza_usturoi",
    label: "Maioneza cu usturoi",
    price: 12,
    desc: "50 g · Max: 5",
    min: 0,
    max: 5,
  },
  {
    id: "ketchup_sos",
    name: "ketchup_sos",
    label: "Ketchup",
    price: 12,
    desc: "50 g · Max: 5",
    min: 0,
    max: 5,
  },
  {
    id: "sos_cascaval",
    name: "sos_cascaval",
    label: "Sos cascaval",
    price: 15,
    desc: "50 g · Max: 5",
    min: 0,
    max: 5,
  },
  {
    id: "mustar",
    name: "mustar",
    label: "Mustar",
    price: 10,
    desc: "50 g · Max: 5",
    min: 0,
    max: 5,
  },
  {
    id: "mustar_american",
    name: "mustar_american",
    label: "Mustar american",
    price: 10,
    desc: "50 g · Max: 5",
    min: 0,
    max: 5,
  },
];
</script>

<template>
  <div class="single-product">
    <div class="container">
      <ProductBreadcrumb :items="breadcrumbs" />

      <div class="single-product__wrap">
        <div class="single-product__info">
          <ProductInfo
            title="Menu Kebab standart"
            description="Kebab standart; Cartofi pai; Bautura; Sos"
            :price="135" />

          <ProductActions />

          <div class="single-product__form">
            <ProductOptionGroupRadio
              title="Bautura"
              :required="true"
              name="bautura"
              :options="bautura" />
            <ProductOptionGroupRadio title="Sos" :required="true" name="sos" :options="sos" />
            <ProductOptionGroupTextarea
              title="Mențiuni"
              id="comentariu"
              name="comentariu"
              label="Comentariu" />
            <ProductOptionGroupCheckbox title="Adaosuri" :options="adaosuri" />
            <ProductOptionGroupStepper title="Adaosuri sosuri" :items="adaosuriSosuri" />
          </div>
        </div>

        <ProductGallery
          src="https://maxkebab.md/wp-content/uploads/2025/11/meniu-kebab-standart-600x900.jpg"
          alt="Menu Kebab standart"
          :width="600"
          :height="900" />
      </div>
    </div>
  </div>
</template>
