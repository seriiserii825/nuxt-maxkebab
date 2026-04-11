<template>
  <NuxtLayout>
    <NuxtPage
      :page-key="(route) => route.path.replace(/^\/(ru|en)(\/|$)/, '/')"
      :transition="{ name: 'page', mode: 'out-in' }" />
  </NuxtLayout>
</template>
