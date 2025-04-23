import { MenuItem } from "primeng/api";

export const ROUTES = {
  NEW_IN: '/new-in',
  BRANDS: '/brands',
  CLOTHING: '/clothing',
  SHOES: '/shoes',
  BAGS: '/bags',
  ACCESSORIES: '/accessories',
  HOMEWARE: '/homeware',
  SALE: '/sale',
};

export const GENDER_LINKS = {
  forHer: {
    label: 'For Her',
    url: '/for-her',
  },
  forHim: {
    label: 'For Him',
    url: '/for-him',
  },
}

export const MENU_ITEMS: MenuItem[] = [
  { label: 'New in', routerLink: [ROUTES.NEW_IN] },
  { label: 'Brands', routerLink: [ROUTES.BRANDS] },
  { label: 'Clothing', routerLink: [ROUTES.CLOTHING] },
  { label: 'Shoes', routerLink: [ROUTES.SHOES] },
  { label: 'Bags', routerLink: [ROUTES.BAGS] },
  { label: 'Accessories', routerLink: [ROUTES.ACCESSORIES] },
  { label: 'Homeware', routerLink: [ROUTES.HOMEWARE] },
  { label: 'Sale', routerLink: [ROUTES.SALE] },
];
