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

export const DESKTOP_MENU_ITEMS = [
  { label: 'New in', routerLink: [ROUTES.NEW_IN] },
  { label: 'Brands', routerLink: [ROUTES.BRANDS] },
  { label: 'Clothing', routerLink: [ROUTES.CLOTHING] },
  { label: 'Shoes', routerLink: [ROUTES.SHOES] },
  { label: 'Bags', routerLink: [ROUTES.BAGS] },
  { label: 'Accessories', routerLink: [ROUTES.ACCESSORIES] },
  { label: 'Homeware', routerLink: [ROUTES.HOMEWARE] },
  { label: 'Sale', routerLink: [ROUTES.SALE] },
];

export const MOBILE_MENU_ITEMS = [
  {
    label: `New in <i class="pi pi-angle-right"></i>`,
    escape: false,
    routerLink: [ROUTES.NEW_IN]
  },
  {
    label: `Brands <i class="pi pi-angle-right"></i>`,
    escape: false,
    routerLink: [ROUTES.BRANDS]
  },
  {
    label: `Clothing <i class="pi pi-angle-right"></i>`,
    escape: false,
    routerLink: [ROUTES.CLOTHING]
  },
  {
    label: `Shoes <i class="pi pi-angle-right"></i>`,
    escape: false,
    routerLink: [ROUTES.SHOES]
  },
  {
    label: `Bags <i class="pi pi-angle-right"></i>`,
    escape: false,
    routerLink: [ROUTES.BAGS]
  },
  {
    label: `Accessories <i class="pi pi-angle-right"></i>`,
    escape: false,
    routerLink: [ROUTES.ACCESSORIES]
  },
  {
    label: `Homeware <i class="pi pi-angle-right"></i>`,
    escape: false,
    routerLink: [ROUTES.HOMEWARE]
  },
  {
    label: `Sale <i class="pi pi-angle-right"></i>`,
    escape: false,
    routerLink: [ROUTES.SALE]
  },
];
