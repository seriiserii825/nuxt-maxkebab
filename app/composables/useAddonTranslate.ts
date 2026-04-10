const dict: Record<string, { ru: string; en: string }> = {
  Bautura: { ru: "Напиток", en: "Drink" },
  "Sos picant": { ru: "Острый соус", en: "Spicy sauce" },
  "Sos cascaval": { ru: "Соус кашкавал", en: "Cascaval sauce" },
  Sos: { ru: "Соус", en: "Sauce" },
  "Maioneza cu usturoi": { ru: "Чесночный майонез", en: "Garlic mayo" },
  Mențiuni: { ru: "Примечания", en: "Notes" },
  Comentariu: { ru: "Комментарий", en: "Comment" },
  "Adaosuri sosuri": { ru: "Добавки соусы", en: "Sauce additions" },
  Adaosuri: { ru: "Добавки", en: "Additions" },
  Cascaval: { ru: "Кашкавал", en: "Cheese" },
  Ciuperci: { ru: "Грибы", en: "Mushrooms" },
  Lavas: { ru: "Лаваш", en: "Lavash" },
  Masline: { ru: "Оливки", en: "Olives" },
  Ketchup: { ru: "Кетчуп", en: "Ketchup" },
  "Mustar american": { ru: "Американская горчица", en: "American mustard" },
  Mustar: { ru: "Горчица", en: "Mustard" },
  Carne: { ru: "Мясо", en: "Meat" },
  "Coca-Cola": { ru: "Coca-Cola", en: "Coca-Cola" },
  Sprite: { ru: "Sprite", en: "Sprite" },
  Fanta: { ru: "Fanta", en: "Fanta" },
};

export function useAddonTranslate() {
  const { locale } = useI18n();

  function ta(text: string): string {
    if (!text || locale.value === "ro") return text;
    const lang = locale.value as "ru" | "en";
    return dict[text]?.[lang] ?? text;
  }

  return { ta };
}
