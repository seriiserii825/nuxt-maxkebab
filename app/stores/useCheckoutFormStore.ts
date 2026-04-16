import { defineStore } from "pinia";

export const useCheckoutFormStore = defineStore("checkoutForm", () => {
  const form = reactive({
    firstName:  "",
    lastName:   "",
    phone:      "",
    email:      "",
    street:     "",
    number:     "",
    apartment:  "",
    officeType: "",
    staircase:  "",
    floor:      "",
    interphone: "",
    sector:     "",
    notes:      "",
    payment:    "cod" as "cod" | "maib",
  });

  function reset() {
    Object.assign(form, {
      firstName: "", lastName: "", phone: "", email: "",
      street: "", number: "", apartment: "", officeType: "",
      staircase: "", floor: "", interphone: "", sector: "",
      notes: "", payment: "cod",
    });
  }

  return { form, reset };
});
