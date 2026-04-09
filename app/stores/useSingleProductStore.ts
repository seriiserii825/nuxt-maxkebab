import { defineStore } from "pinia";
import type { CheckboxOption, StepperOption } from "~/interfaces/ISingleProduct";

export const useSingleProductStore = defineStore("singleProduct", () => {
  const basePrice = ref(0);
  const quantity = ref(1);
  const comment = ref("");

  // group -> selected value (radio, no price)
  const radioSelections = ref<Record<string, string>>({});

  // name -> { price, checked }
  const checkboxOptions = ref<Record<string, CheckboxOption>>({});

  // id -> { price, count }
  const stepperOptions = ref<Record<string, StepperOption>>({});

  // ─── Computed ───────────────────────────────────────────────────────────────

  const checkboxTotal = computed(() =>
    Object.values(checkboxOptions.value)
      .filter((o) => o.checked)
      .reduce((sum, o) => sum + o.price, 0),
  );

  const stepperTotal = computed(() =>
    Object.values(stepperOptions.value).reduce(
      (sum, o) => sum + o.price * o.count,
      0,
    ),
  );

  const unitPrice = computed(
    () => basePrice.value + checkboxTotal.value + stepperTotal.value,
  );

  const totalPrice = computed(() => unitPrice.value * quantity.value);

  // ─── Actions ────────────────────────────────────────────────────────────────

  function init(price: number) {
    basePrice.value = price;
    quantity.value = 1;
    comment.value = "";
    radioSelections.value = {};
    checkboxOptions.value = {};
    stepperOptions.value = {};
  }

  function setQuantity(n: number) {
    if (n >= 1) quantity.value = n;
  }

  function increaseQuantity() {
    quantity.value++;
  }

  function decreaseQuantity() {
    if (quantity.value > 1) quantity.value--;
  }

  function setRadio(group: string, value: string) {
    radioSelections.value[group] = value;
  }

  function registerCheckbox(name: string, price: number, checked = false) {
    checkboxOptions.value[name] = { price, checked };
  }

  function toggleCheckbox(name: string) {
    const option = checkboxOptions.value[name];
    if (option) option.checked = !option.checked;
  }

  function registerStepper(id: string, price: number) {
    stepperOptions.value[id] = { price, count: 0 };
  }

  function setStepperCount(id: string, count: number) {
    const option = stepperOptions.value[id];
    if (option) option.count = count;
  }

  function setComment(text: string) {
    comment.value = text;
  }

  return {
    // state
    basePrice,
    quantity,
    comment,
    radioSelections,
    checkboxOptions,
    stepperOptions,
    // computed
    checkboxTotal,
    stepperTotal,
    unitPrice,
    totalPrice,
    // actions
    init,
    setQuantity,
    increaseQuantity,
    decreaseQuantity,
    setRadio,
    registerCheckbox,
    toggleCheckbox,
    registerStepper,
    setStepperCount,
    setComment,
  };
});
