export default function useSetActiveMenuClass(slug: string) {
  const router = useRouter();
  const isActive = computed(() => {
    return router.currentRoute.value.path === slug;
  });
  return isActive;
}
