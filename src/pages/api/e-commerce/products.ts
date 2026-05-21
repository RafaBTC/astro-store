import type { APIRoute } from 'astro'

import type { CartItem } from '../../../types/Cart'

export const prerender = true
export const GET: APIRoute = async () => {
  const PRODUCTS: CartItem[] = [
    {
      id: '1',
      name: 'Mario Kart 64',
      price: 989,
      currency: 'MXN',
      image: 'images/MK64.jpg',
      description:
        'Pisa a fondo el acelerador en esta continuación del clásico de Super Nintendo, Super Mario Kart. Mario Kart 64 presume de fantásticos gráficos, montones de poderes exclusivos y una divertida versión en 3D del legendario Battle Mode. Un magnífico control (el sello característico de todos los juegos del creador de Mario, Shigeru Miyamoto) hará que vuelvas a jugar una y otra vez.',
      loading: 'eager',
      quantity: 1
    },
    {
      id: '2',
      name: 'Final Fantasy XIII - PlayStation 3 - Standard Edition',
      price: 549,
      currency: 'MXN',
      image: 'images/FF13.jpg',
      description:
        'Cuando un terrible peligro amenaza con sumir el mundo flotante del Nido en el caos, la vida de un grupo de desconocidos da un giro inesperado al quedar marcados como enemigos del estado. La población, aterrada, pide a gritos su sangre y el ejército parece más que dispuesto a derramarla en aras de la paz. Su única esperanza es emprender la huída.',
      loading: 'eager',
      quantity: 1
    },
    {
      id: '3',
      name: 'Sonic Unleashed (Platinum Hits) - Xbox 360',
      price: 515,
      currency: 'MXN',
      image: 'images/SU.jpg',
      description:
        'Sigue a Sonic en su intento de restaurar el mundo después de que su némesis, el Doctor Eggman, lo destrozara con un potente láser para desatar a Dark Gaia, un antiguo mal que periódicamente transforma a Sonic en un hombre lobo (conocido como "Werehog").',
      loading: 'eager',
      quantity: 1
    },
    {
      id: '4',
      name: 'Hollow Knight (Nintendo Switch)',
      price: 705,
      currency: 'MXN',
      image: 'images/HK.jpg',
      description:
        '¡Forja tu propio camino en Hollow Knight! Una aventura épica a través de un vasto reino de insectos y héroes que se encuentra en ruinas. Explora cavernas tortuosas, combate contra criaturas corrompidas y entabla amistad con extraños insectos, todo en un estilo clásico en 2D dibujado a mano.',
      loading: 'lazy',
      quantity: 1
    },
    {
      id: '5',
      name: 'Ratchet & Clank: Rift Apart - PlayStation 5',
      price: 750,
      currency: 'MXN',
      image: 'images/Ratchet.webp',
      description:
        'Únete al equipo doble supremo con un elenco de aliados familiares y nuevas caras, como una luchadora de la resistencia Lombax nueva que tiene la misma determinación de eliminar al azote robótico. Juega como Ratchet y como la nueva Lombax misteriosa de otra dimensión.',
      loading: 'lazy',
      quantity: 1
    },
    {
      id: '6',
      name: 'Final Fantasy IX - Nintendo Switch',
      price: 1150,
      currency: 'MXN',
      image: 'images/FF9.webp',
      description:
        'El ladrón Yitán Tribal y la compañía de teatro Tantalus intentan secuestrar a la princesa Garnet, quien busca escapar, uniendo fuerzas para detener a la reina Brahne y al villano Kuja de desatar una guerra con magos negros.',
      loading: 'lazy',
      quantity: 1
    },
    {
      id: '7',
      name: 'Super Mario Odyssey - Standard Edition - Nintendo Switch',
      price: 903,
      currency: 'MXN',
      image: 'images/MarioOddysey.webp',
      description:
        'Acompaña a Mario en una aventura en 3D enorme por todo el planeta usando sus nuevas habilidades para recoger lunas que servirán de combustible a tu aeronave, la Odyssey. ¡Y entretanto, rescata a la princesa Peach de las garras de Bowser. Esta aventura 3D de Mario de estilo sandbox —la primera desde Super Mario 64 en 1997 y Super Mario Sunshine para Game Cube en 2002— está llena a reventar de secretos y sorpresas.',
      loading: 'lazy',
      quantity: 1
    },
    {
      id: '8',
      name: 'Super Mario Galaxy™ + Super Mario Galaxy™ 2 - MEX',
      price: 1055,
      currency: 'MXN',
      image: 'images/MarioGalaxy.webp',
      description:
        '¡Desplázate a través del cosmos con Mario en estos dos juegos clásicos, diviértete con el contenido adicional y disfruta la resolución de imágenes y el interfaz de usuario mejorados en la consola Nintendo Switch!',
      loading: 'lazy',
      quantity: 1
    },
    {
      id: '9',
      name: 'Persona 3 Reload: Launch Edition - PlayStation 5',
      price: 381,
      currency: 'MXN',
      image: 'images/PERSONA.webp',
      description:
        'Disfruta de un título determinante en la saga Persona, rehecho con los gráficos más avanzados, funciones modernizadas y una interfaz de usuario con estilo propio. Sumérgete en un viaje apasionante y emotivo con escenas inéditas, nuevas interacciones entre los personajes, una locución adicional y una banda sonora renovada.',
      loading: 'lazy',
      quantity: 1
    }
  ]

  return new Response(JSON.stringify(PRODUCTS), { status: 200 })
}
