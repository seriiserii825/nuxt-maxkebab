<template>
  <div class="single-product__actions">
    <UIQuantitySelector />
    <button class="single-product__submit" type="submit">Adaugă în coș</button>
  </div>
</template>

<style scoped lang="scss">
.single-product {
  &__actions {
    display: flex;
    align-items: center;
    gap: 3rem;
    margin-top: 3rem;
    margin-bottom: 6.4rem;

    @media (max-width: 576px) {
      display: grid;
    }
  }

  &__submit {
    padding: 2rem 8rem;
    font-size: 2rem;
    font-weight: 800;
    line-height: 2.3rem;
    letter-spacing: -0.025em;
    color: #fff;
    background: #ee3230;
    border: none;
    border-radius: 10px;
    transition: background 0.3s;
    cursor: pointer;

    &:hover {
      background: #a72322;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}
</style>
