import { SubcategoryMap } from '@shared/interfaces/subcategory';

export const SUBCATEGORIES: SubcategoryMap = {
  'New in': [
    {
      title: 'Recommend',
      items: [
        { label: 'Casual', route: '/new-in/recommend/casual' },
        { label: 'Elegant', route: '/new-in/recommend/elegant' },
        { label: 'Trend', route: '/new-in/recommend/trend' },
        { label: 'Streetwear', route: '/new-in/recommend/streetwear' }
      ]
    },
    {
      title: 'Season',
      items: [
        { label: 'Winter', route: '/new-in/season/winter' },
        { label: 'Summer', route: '/new-in/season/summer' },
        { label: 'Mid-season', route: '/new-in/season/mid-season' },
        { label: 'All-season', route: '/new-in/season/all-season' }
      ]
    },
    {
      title: 'Actual',
      items: [
        { label: 'Popular', route: '/new-in/actual/popular' },
        { label: 'Bestseller', route: '/new-in/actual/bestseller' },
        { label: 'Exclusive', route: '/new-in/actual/exclusive' },
        { label: 'The best', route: '/new-in/actual/the-best' },
        { label: 'Sale', route: '/new-in/actual/sale' }
      ]
    },
    {
      title: 'Category',
      items: [
        { label: 'Bags', route: '/new-in/category/bags' },
        { label: 'Clothing', route: '/new-in/category/clothing' },
        { label: 'Shoes', route: '/new-in/category/shoes' }
      ]
    }
  ],
  'Brands': [
    {
      title: 'Popular brand',
      items: [
        'Tom Ford', 'Dior', 'Dolce Gabbana', 'Prada', 'Victories Secret', 'Miu Miu',
        'Dominik', 'Balenciaga', 'Fendi', 'Gucci', 'Alexander McQueen', 'Louis Vuitton', 'Chanel'
      ].map(brand => ({ label: brand, route: `/brands/${brand.toLowerCase().replace(/\s+/g, '-')}` }))
    }
  ],
  'Clothing': [
    {
      title: 'Men category',
      items: [
        'All products', 'Outerwear', 'Denim', 'Suit', 'Jackets and blazers', 'Shirt',
        'Polo T-shirt', 'T-shirt', 'Jeans', 'Pajamas', 'Jersey', 'Shorts', 'Trousers'
      ].map(item => ({ label: item, route: `/clothing/men/${item.toLowerCase().replace(/\s+/g, '-')}` }))
    },
    {
      title: 'Women category',
      items: [
        'All products', 'Outerwear', 'Dress', 'Suit', 'Jackets', 'Shirt and blouse',
        'T-shirt', 'Jersey', 'Jeans', 'Underwear', 'Sport', 'Beach clothing', 'Pajamas', 'Trousers'
      ].map(item => ({ label: item, route: `/clothing/women/${item.toLowerCase().replace(/\s+/g, '-')}` }))
    }
  ],
  'Shoes': [
    {
      title: 'Men category',
      items: [
        'All products', 'Sneakers', 'Loafers and moccasins', 'Oxfords', 'Monkeys',
        'Boots', 'Sandals', 'Beach shoes', 'Espadrilles', 'Derby'
      ].map(item => ({ label: item, route: `/shoes/men/${item.toLowerCase().replace(/\s+/g, '-')}` }))
    },
    {
      title: 'Women category',
      items: [
        'All products', 'Sneakers', 'Loafers and moccasins', 'High heels', 'Flat shoes',
        'Ankle boots and boots', 'Sandals and mules', 'Flip-flops', 'Espadrilles'
      ].map(item => ({ label: item, route: `/shoes/women/${item.toLowerCase().replace(/\s+/g, '-')}` }))
    }
  ],
  'Bags': [
    {
      title: 'Men category',
      items: [
        'All products', 'Shoulder bags', 'Portfolios', 'Travel bags and trolley', 'Exotic leather bags'
      ].map(item => ({ label: item, route: `/bags/men/${item.toLowerCase().replace(/\s+/g, '-')}` }))
    },
    {
      title: 'Women category',
      items: [
        'All products', 'Evening bags and clutches', 'Backpack', 'Shopper', 'Exotic leather bags'
      ].map(item => ({ label: item, route: `/bags/women/${item.toLowerCase().replace(/\s+/g, '-')}` }))
    }
  ],
  'Accessories': [
    {
      title: 'Men category',
      items: [
        'All products', 'Belts', 'Pockets', 'Gloves', 'Headwear', 'Smartphone cases',
        'Scarves', 'Ties and bow ties', 'Wallets and cardholders'
      ].map(item => ({ label: item, route: `/accessories/men/${item.toLowerCase().replace(/\s+/g, '-')}` }))
    },
    {
      title: 'Women category',
      items: [
        'All products', 'Glasses', 'Belts', 'Headwear', 'Scarves', 'Gloves',
        'Wallets and business card holders', 'Jewelry', 'Cosmetic bags', 'Perfumery'
      ].map(item => ({ label: item, route: `/accessories/women/${item.toLowerCase().replace(/\s+/g, '-')}` }))
    }
  ],
  'Homeware': [
    {
      title: 'Tableware',
      items: [
        'All products', 'Plates and bowls', 'Trays and table accessories', 'Glassware',
        'Cutlery', 'Tea and coffee'
      ].map(item => ({ label: item, route: `/homeware/tableware/${item.toLowerCase().replace(/\s+/g, '-')}` }))
    },
    {
      title: 'Home decor and accessories',
      items: [
        'All products', 'Scented candles and decorative objects', 'Games and home accessories',
        'Pet accessories', 'Cutlery', 'Sports and leisure'
      ].map(item => ({ label: item, route: `/homeware/decor/${item.toLowerCase().replace(/\s+/g, '-')}` }))
    }
  ],
'Sale': [
  {
    title: 'Men category',
    items: ['Clothing', 'Shoes', 'Bags', 'Accessories', 'Homeware']
      .map(item => ({
        label: item,
        route: `/sale/men/${item.toLowerCase().replace(/\s+/g, '-')}`
      }))
  },
  {
    title: 'Women category',
    items: ['Clothing', 'Shoes', 'Bags', 'Accessories', 'Homeware']
      .map(item => ({
        label: item,
        route: `/sale/women/${item.toLowerCase().replace(/\s+/g, '-')}`
      }))
  }
]
};
