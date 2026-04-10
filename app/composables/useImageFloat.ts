import gsap from "gsap";

export function useImageFloat() {
  const tweens: gsap.core.Tween[] = [];

  function tweenProperty(target: HTMLElement, prop: string, min: number, max: number) {
    const tween = gsap.to(target, {
      [prop]: gsap.utils.random(min, max),
      duration: gsap.utils.random(3, 6),
      ease: "none",
      onComplete: tweenProperty,
      onCompleteParams: [target, prop, min, max],
    });
    tweens.push(tween);
  }

  function playEl(el: HTMLElement) {
    const dx = 50 * 0.4;
    const dy = 50 * 0.5;

    const delay = gsap.utils.random(0, 4);

    gsap.delayedCall(delay, () => {
      tweenProperty(el, "scale", 0.9, 0.9);
      tweenProperty(el, "x", -dx, dx);
      tweenProperty(el, "y", -dy, dy);
    });
  }

  function registerEl(el: HTMLElement | null) {
    if (el) playEl(el);
  }

  onUnmounted(() => {
    tweens.forEach((t) => t.kill());
  });

  return { registerEl };
}
