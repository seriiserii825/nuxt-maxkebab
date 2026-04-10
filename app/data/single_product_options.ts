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

export { bautura, sos, adaosuriSosuri, adaosuri };
