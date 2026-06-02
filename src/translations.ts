export interface Translation {
  nav: string[];
  connect: string;
  hero: {
    sub: string;
    title: string;
    desc: string;
    nav: string[];
    footer: {
      copy: string;
      email: string;
      phone: string;
      about: string;
    };
  };
  products: {
    title: string[];
    items: { name: string; desc: string }[];
  };
  showcase: {
    title: string;
    desc: string;
  };
  archive: {
    title: string[];
    desc: string;
    tags: string[];
  };
  materia: {
    title: string[];
    items: {
      t: string;
      s: string;
      d: string;
      img: string;
      density: string;
      hardness: string;
      ld: string;
    }[];
  };
  production: {
    title: string[];
    desc: string;
    cta: string;
  };
  contact: {
    title: string[];
    cta: string;
    footer: string;
  };
  about: {
    titleLeft: string;
    descLeft: string;
    titleRight: string;
    descRight: string;
  };
  modal: {
    close: string;
    spec: string;
  };
}

export const translations: Record<'es' | 'en', Translation> = {
  en: {
    nav: ['Archive', 'Products', 'Materials', 'Production'],
    connect: 'Connect',
    hero: {
      sub: 'Architectural Digital Fabrication',
      title: 'hands3d',
      desc: 'Hands3D is a bespoke digital fabrication studio. Dedicated to crafting exceptional physical experiences that bridge creativity and innovation. Our team specializes in transforming complex geometries into elegant, purposeful solutions for clients across diverse industries.',
      nav: ['Projects', 'Our ethos', 'Inquiry'],
      footer: {
        copy: '© hands3d 2026',
        email: 'info@hands3d.studio',
        phone: '+1234567890',
        about: 'About'
      }
    },
    products: {
      title: ['Interactive', 'Gallery.'],
      items: [
        { name: 'Design Tray', desc: 'Sculptural utility piece.' },
        { name: 'Structural Core', desc: 'Industrial grade structural core.' }
      ]
    },
    showcase: {
      title: 'Showcase.',
      desc: 'Cinematic exploration of digital manufacturing.'
    },
    archive: {
      title: ['Archive', '.'],
      desc: '“Scalable production systems for global design and architecture firms.”',
      tags: ['Additive', 'NURBS', 'BIM']
    },
    materia: {
      title: ['Matter', '& Form.'],
      items: [
        { 
          t: 'PLA FLEX', 
          s: 'Architectural', 
          d: 'Perfect surface finish with a flexible touch for large-scale architectural models.',
          img: '/brand/material_flex.png',
          density: '1.24 g/cm³',
          hardness: '80 Shore D',
          ld: 'Our PLA FLEX is optimized for flexibility and architectural visualization. It offers a smooth, matte finish that hides layer lines while maintaining sharp edge definition. Ideal for urban planning, kinetic models, and structural applications.'
        },
        { 
          t: 'ABS HT', 
          s: 'Structural', 
          d: 'High thermal resistance for industrial performance parts.',
          img: '/brand/material_pla_flex.png',
          density: '1.05 g/cm³',
          hardness: '75 Shore D',
          ld: 'Engineered for high-temperature environments, ABS HT provides superior mechanical strength and impact resistance. It is the industrial standard for functional prototypes and tooling.'
        },
        { 
          t: 'PETG PRO', 
          s: 'Functional', 
          d: 'Chemically inert and impact resistant for functional prototypes.',
          img: '/brand/material_abs_ht.png',
          density: '1.27 g/cm³',
          hardness: '78 Shore D',
          ld: 'PETG PRO combines the ease of printing with the strength of industrial materials. It is moisture resistant and chemically stable, making it perfect for custom mechanical components.'
        },
        { 
          t: 'FLEX', 
          s: 'Kinetic', 
          d: 'Variable shore hardness for elastic and ergonomic exploration.',
          img: '/brand/material_petg_pro.png',
          density: '1.20 g/cm³',
          hardness: '95 Shore A',
          ld: 'Our FLEX material allows for the creation of soft-touch, ergonomic, and shock-absorbing parts. With variable density control, we can tune the elasticity of each part individually.'
        }
      ]
    },
    production: {
      title: ['Infinite', 'Scale.'],
      desc: 'Mass production without compromising individual precision.',
      cta: 'B2B Production'
    },
    contact: {
      title: ['Connect', '.'],
      cta: 'WhatsApp',
      footer: 'Hands3D Architectural Studio © 2026 — All Rights Reserved'
    },
    about: {
      titleLeft: 'Who are we?',
      descLeft: 'Hands3D is a bespoke digital fabrication studio. Dedicated to crafting exceptional physical experiences that bridge creativity and innovation. Our team specializes in transforming complex geometries into elegant, purposeful solutions for clients across diverse industries.',
      titleRight: 'What do we do?',
      descRight: 'Hands3D is a bespoke digital fabrication studio. Dedicated to crafting exceptional physical experiences that bridge creativity and innovation. Our team specializes in transforming complex geometries into elegant, purposeful solutions for clients across diverse industries.'
    },
    modal: {
      close: 'Close',
      spec: 'Technical Spec'
    }
  },
  es: {
    nav: ['Archivo', 'Productos', 'Materiales', 'Producción'],
    connect: 'Contactar',
    hero: {
      sub: 'Fabricación Digital Arquitectónica',
      title: 'hands3d',
      desc: 'Hands3D es un estudio de fabricación digital a medida. Dedicado a crear experiencias físicas excepcionales que unen creatividad e innovación. Nuestro equipo se especializa en transformar geometrías complejas en soluciones elegantes y con propósito para clientes en diversas industrias.',
      nav: ['Proyectos', 'Nuestro ethos', 'Consulta'],
      footer: {
        copy: '© hands3d 2026',
        email: 'info@hands3d.studio',
        phone: '+1234567890',
        about: 'Sobre nosotros'
      }
    },
    products: {
      title: ['Galería', 'Interactiva.'],
      items: [
        { name: 'Bandeja de Diseño', desc: 'Pieza de utilidad escultórica.' },
        { name: 'Cuerpo Estructural', desc: 'Núcleo estructural de grado industrial.' }
      ]
    },
    showcase: {
      title: 'Showcase.',
      desc: 'Exploración cinemática de la fabricación digital.'
    },
    archive: {
      title: ['Archivo', '.'],
      desc: '“Sistemas de producción escalables para firmas globales de diseño y arquitectura.”',
      tags: ['Aditivo', 'NURBS', 'BIM']
    },
    materia: {
      title: ['Materia', '& Forma.'],
      items: [
        { 
          t: 'PLA FLEX', 
          s: 'Arquitectónico', 
          d: 'Acabado superficial perfecto con un toque flexible para modelos arquitectónicos a gran escala.',
          img: '/brand/material_flex.png',
          density: '1.24 g/cm³',
          hardness: '80 Shore D',
          ld: 'Nuestro PLA FLEX está optimizado para flexibilidad y visualización arquitectónica. Ofrece un acabado mate suave que oculta las líneas de capa manteniendo bordes afilados. Ideal para planificación urbana, modelos cinéticos y aplicaciones estructurales.'
        },
        { 
          t: 'ABS HT', 
          s: 'Estructural', 
          d: 'Alta resistencia térmica para piezas de rendimiento industrial.',
          img: '/brand/material_pla_flex.png',
          density: '1.05 g/cm³',
          hardness: '75 Shore D',
          ld: 'Diseñado para entornos de alta temperatura, el ABS HT proporciona una resistencia mecánica y al impacto superior. Es el estándar industrial para prototipos funcionales y herramental.'
        },
        { 
          t: 'PETG PRO', 
          s: 'Funcional', 
          d: 'Químicamente inerte y resistente al impacto para prototipos funcionales.',
          img: '/brand/material_abs_ht.png',
          density: '1.27 g/cm³',
          hardness: '78 Shore D',
          ld: 'El PETG PRO combina la facilidad de impresión con la fuerza de materiales industriales. Es resistente a la humedad y químicamente estable, perfecto para componentes mecánicos personalizados.'
        },
        { 
          t: 'FLEX', 
          s: 'Kinetic', 
          d: 'Dureza variable para exploración elástica y ergonómica.',
          img: '/brand/material_petg_pro.png',
          density: '1.20 g/cm³',
          hardness: '95 Shore A',
          ld: 'Nuestro material FLEX permite la creación de piezas suaves al tacto, ergonómicas y que absorben impactos. Con control de densidad variable, podemos ajustar la elasticidad de cada pieza individualmente.'
        }
      ]
    },
    production: {
      title: ['Escala', 'Infinita.'],
      desc: 'Producción masiva sin comprometer la precisión individual.',
      cta: 'Producción B2B'
    },
    contact: {
      title: ['Conectar', '.'],
      cta: 'WhatsApp',
      footer: 'Hands3D Architectural Studio © 2026 — Todos los derechos reservados'
    },
    about: {
      titleLeft: 'Quiénes somos?',
      descLeft: 'Hands3D es un estudio de fabricación digital a medida. Dedicado a crear experiencias físicas excepcionales que unen creatividad e innovación. Nuestro equipo se especializa en transformar geometrías complejas en soluciones elegantes y con propósito para clientes en diversas industrias.',
      titleRight: 'Que hacemos?',
      descRight: 'Hands3D es un estudio de fabricación digital a medida. Dedicado a crear experiencias físicas excepcionales que unen creatividad e innovación. Nuestro equipo se especializa en transformar geometrías complejas en soluciones elegantes y con propósito para clientes en diversas industrias.'
    },
    modal: {
      close: 'Cerrar',
      spec: 'Ficha Técnica'
    }
  }
};

export default translations;
