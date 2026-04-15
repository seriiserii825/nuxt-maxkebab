<template>
  <NuxtLayout>
    <NuxtPage
      :page-key="(route) => route.path.replace(/^\/(ru|en)(\/|$)/, '/')"
      :transition="{ name: 'page', mode: 'out-in' }"
    />
    <NuxtNotifications position="top left" :speed="1000" :duration="5000">
      <template #body="{ item, close }">
        <div class="notification" :class="`notification--${item.type}`">
          <div class="notification__title">{{ item.title }}</div>
          <div class="notification__text">{{ item.text }}</div>
          <div
            class="notification__progress"
            :style="{ animationDuration: `${item.duration ?? 5000}ms` }"
          />
          <button class="notification__close" @click="close">×</button>
        </div>
      </template>
    </NuxtNotifications>
  </NuxtLayout>
</template>

<style>
  .notification {
    position: relative;
    padding: 12px 36px 12px 16px;
    margin: 8px;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
    overflow: hidden;
  }
  .notification--success {
    border-left: 4px solid #42b983;
  }
  .notification--error {
    border-left: 4px solid #e74c3c;
  }
  .notification--warn {
    border-left: 4px solid #f39c12;
  }
  .notification--info {
    border-left: 4px solid #3498db;
  }

  .notification__title {
    font-weight: 600;
    margin-bottom: 4px;
  }
  .notification__text {
    font-size: 14px;
    color: #555;
  }

  .notification__close {
    position: absolute;
    top: 8px;
    right: 10px;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: #999;
  }

  .notification__progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;
    background: #42b983;
    animation: notification-progress linear forwards;
  }
  .notification--error .notification__progress {
    background: #e74c3c;
  }
  .notification--warn .notification__progress {
    background: #f39c12;
  }
  .notification--info .notification__progress {
    background: #3498db;
  }
  @keyframes notification-progress {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
</style>
