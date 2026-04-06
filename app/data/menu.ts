import type { IMenuItem } from "~/interfaces/IMenuItem";

export const menu: IMenuItem[] = [
  {
    text: "menu.menu",
    href: "#",
    sub_menu: [
      { text: "menu.combo", href: "#meniuri" },
      { text: "menu.sandvich", href: "#sandvich" },
      { text: "menu.snack", href: "#snack" },
      { text: "menu.desert", href: "#desert" },
      { text: "menu.sosuri", href: "#sosuri" },
      { text: "menu.bauturi", href: "#bauturi" },
    ],
  },
  { text: "menu.oferte", href: "/oferte/" },
  { text: "menu.despre", href: "/despre-noi/" },
  { text: "menu.livrare", href: "/livrare/" },
  { text: "menu.contacte", href: "/contacte/" },
];
