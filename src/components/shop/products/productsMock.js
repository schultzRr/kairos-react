const productsMock = [
  {
    id: 10,
    title: 'Madhuri Monk Fruit',
    description: 'Sabe muy saludable y práctico.',
    price: 398,
    picture: '/images/shop/ayni-madhuri.png',
    variants: [],
  },
  {
    id: 21,
    title: 'Ayni Infusión',
    description: 'Es muy saludable y práctico.',
    price: 1460,
    picture: '/images/shop/ayni-infusion.png',
    variants: [
      {
        id: 100,
        title: '1 caja',
        price: 1460
      },
      {
        id: 101,
        title: '2 cajas',
        price: 2920
      }
    ],
  },
  {
    id: 12,
    title: 'Ayni Gotas',
    description: 'Son muy buenas. Tómalas todos los días con tus alimentos.',
    price: 1460,
    picture: '/images/shop/ayni-gotas.png',
    variants: [
      {
        id: 201,
        title: '4 unidades',
        price: 1460
      },
      {
        id: 202,
        title: '8 unidades',
        price: 2920
      }
    ],
  },
]

export default productsMock;
