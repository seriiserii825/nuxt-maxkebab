export interface IMenuItem {
  href: string;
  text: string;
  sub_menu?: IMenuItem[];
}
