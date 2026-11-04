import type { Metadata } from 'next'
import TomatoProject from '@/components/projects/TomatoProject'

export const metadata: Metadata = {
  title: 'Doenças em Folhas de Tomate · Lucas Leuck',
  description:
    'Classificação de doenças em folhas de tomate do PlantVillage com visão computacional clássica: segmentação em OpenCV, 173 características de cor, textura e forma, SVM, Random Forest e MLP.',
  openGraph: {
    title: 'Doenças em Folhas de Tomate · Lucas Leuck',
    description: 'Visão computacional clássica, sem deep learning: 98,8% de acurácia em saudável vs. doente e 88,9% em 10 classes.',
    type: 'article',
    images: ['/projetos/tomate/pipeline-demo.png'],
  },
}

export default function Page() {
  return <TomatoProject />
}
