import type { Language } from './i18n'

/**
 * Conteúdo da página do projeto em destaque (folhas de tomate).
 * Fonte: artigo "Classificação de Doenças em Folhas de Tomate por
 * Características de Cor, Textura e Forma" (PUCRS) e README do repositório.
 */

export const LINKS = {
  github: 'https://github.com/lucasnk1/tomate-classificacao-visao-classica',
  paper: 'https://github.com/lucasnk1/tomate-classificacao-visao-classica/blob/main/artigo.pdf',
  slides: 'https://lucasnk1.github.io/tomate-classificacao-visao-classica/',
  colab:
    'https://colab.research.google.com/github/lucasnk1/tomate-classificacao-visao-classica/blob/main/PlantVillage_VisaoComputacional.ipynb',
}

const IMG = '/projetos/tomate'

/** Métricas por modelo (tabelas 2 e 3 do artigo) */
export const RESULTS = {
  binary: [
    { model: 'SVM-RBF', acc: 0.988, prec: 0.965, rec: 0.972, f1: 0.968, best: true },
    { model: 'MLP', acc: 0.986, prec: 0.97, rec: 0.955, f1: 0.963 },
    { model: 'Random Forest', acc: 0.981, prec: 0.981, rec: 0.913, f1: 0.944 },
  ],
  multi: [
    { model: 'SVM-RBF', acc: 0.889, prec: 0.893, rec: 0.891, f1: 0.891, best: true },
    { model: 'MLP', acc: 0.883, prec: 0.885, rec: 0.885, f1: 0.885 },
    { model: 'Random Forest', acc: 0.876, prec: 0.879, rec: 0.879, f1: 0.878 },
  ],
}

/** SVM-RBF por classe (tabela 4) + foto de exemplo */
export const CLASSES = [
  { id: 'bacterial', en: 'Bacterial spot', pt: 'Mancha bacteriana', img: `${IMG}/classes/bacterial-spot.jpg`, prec: 0.92, rec: 0.92, f1: 0.92 },
  { id: 'early', en: 'Early blight', pt: 'Pinta-preta', img: `${IMG}/classes/early-blight.jpg`, prec: 0.82, rec: 0.79, f1: 0.81 },
  { id: 'late', en: 'Late blight', pt: 'Requeima', img: `${IMG}/classes/late-blight.jpg`, prec: 0.75, rec: 0.86, f1: 0.8 },
  { id: 'mold', en: 'Leaf Mold', pt: 'Mofo-foliar', img: `${IMG}/classes/leaf-mold.jpg`, prec: 0.9, rec: 0.88, f1: 0.89 },
  { id: 'septoria', en: 'Septoria leaf spot', pt: 'Septoriose', img: `${IMG}/classes/septoria.jpg`, prec: 0.89, rec: 0.86, f1: 0.87 },
  { id: 'mites', en: 'Spider mites', pt: 'Ácaro-rajado', img: `${IMG}/classes/spider-mites.jpg`, prec: 0.89, rec: 0.91, f1: 0.9 },
  { id: 'target', en: 'Target Spot', pt: 'Mancha-alvo', img: `${IMG}/classes/target-spot.jpg`, prec: 0.88, rec: 0.84, f1: 0.86 },
  { id: 'ylcv', en: 'Yellow Leaf Curl Virus', pt: 'Vírus do enrolamento amarelo', img: `${IMG}/classes/yellow-leaf-curl.jpg`, prec: 0.97, rec: 0.95, f1: 0.96 },
  { id: 'mosaic', en: 'Mosaic virus', pt: 'Vírus do mosaico', img: `${IMG}/classes/mosaic-virus.jpg`, prec: 0.94, rec: 0.95, f1: 0.95 },
  { id: 'healthy', en: 'Healthy', pt: 'Saudável', img: `${IMG}/classes/healthy.jpg`, prec: 0.97, rec: 0.94, f1: 0.95 },
]

/** Principais confusões do SVM-RBF (tabela 5) */
export const CONFUSIONS = [
  { real: 'Early blight', pred: 'Late blight', n: 45 },
  { real: 'Leaf Mold', pred: 'Late blight', n: 33 },
  { real: 'Late blight', pred: 'Early blight', n: 32 },
  { real: 'Septoria leaf spot', pred: 'Late blight', n: 28 },
  { real: 'Target Spot', pred: 'Spider mites', n: 25 },
  { real: 'Early blight', pred: 'Target Spot', n: 23 },
  { real: 'Target Spot', pred: 'Late blight', n: 15 },
  { real: 'Late blight', pred: 'Septoria leaf spot', n: 14 },
]

/** Grupos de características (tabela 1) e importância do Random Forest (seção 5.4) */
export const FEATURE_GROUPS = [
  { id: 'color', dims: 140, total: 60.8, perFeature: 0.004 },
  { id: 'texture', dims: 20, total: 29.2, perFeature: 0.015 },
  { id: 'shape', dims: 13, total: 10.0, perFeature: 0.008 },
] as const

export const IMAGES = {
  hero: `${IMG}/pipeline-demo.png`,
  matrix: `${IMG}/matriz-confusao.png`,
  importance: `${IMG}/importancia.png`,
  twins: [
    [`${IMG}/duplicata-1a.jpg`, `${IMG}/duplicata-1b.jpg`],
    [`${IMG}/duplicata-2a.jpg`, `${IMG}/duplicata-2b.jpg`],
  ],
}

type Copy = typeof PT

const PT = {
  nav: { back: 'Lucas Leuck', pipeline: 'Pipeline', results: 'Resultados', limits: 'Limitações' },
  hero: {
    eyebrow: 'PROJETO DESTAQUE / VISÃO COMPUTACIONAL',
    titleA: 'Doenças em folhas de ',
    titleB: 'tomate.',
    lead:
      'Classificação de doenças em folhas de tomate a partir de imagens do PlantVillage, usando apenas visão computacional clássica, sem deep learning. Cada etapa do pipeline (segmentação, características e classificação) é explícita e pode ser inspecionada.',
    tags: ['PYTHON', 'OPENCV', 'SCIKIT-LEARN', 'SCIKIT-IMAGE', 'NUMPY'],
    seeResults: 'Ver resultados',
    back: '← Voltar aos projetos',
    paper: 'Artigo (PDF)',
    slides: 'Apresentação interativa',
    colab: 'Abrir no Colab',
    barLeft: 'PIPELINE · SAÍDA REAL',
    barRight: 'SVM-RBF · 10 CLASSES',
    stages: [
      { name: 'Original', text: 'A foto de laboratório, redimensionada para 256×256.' },
      { name: 'Máscara da folha', text: 'Distância de cromaticidade ao fundo + Otsu + remoção de sombra.' },
      { name: 'Folha segmentada', text: 'Só a folha segue para as características; o fundo é descartado.' },
      { name: 'Lesões', text: 'Regiões onde o verde deixa de dominar: 13,9% da folha nesta imagem.' },
    ],
    hint: 'PREDIÇÃO DESTA FOLHA: MANCHA BACTERIANA (BACTERIAL SPOT)',
  },
  stats: [
    { value: '4.873', label: 'imagens avaliadas' },
    { value: '10', label: 'classes de tomate' },
    { value: '173', label: 'características por imagem' },
    { value: '98,8%', label: 'acurácia saudável vs. doente' },
    { value: '88,9%', label: 'acurácia em 10 classes' },
  ],
  overview: {
    eyebrow: '01 / VISÃO GERAL',
    title: 'Ver a doença antes de ela se espalhar.',
    p1:
      'Doenças foliares reduzem a produtividade e a qualidade do tomate, e identificá-las cedo costuma depender de alguém treinado olhando folha por folha. Sistemas de visão computacional que reconhecem sintomas em fotos podem apoiar esse diagnóstico.',
    p2:
      'A maior parte dos trabalhos recentes usa redes neurais profundas. Aqui seguimos o caminho oposto, por restrição da disciplina e como exercício de método: um pipeline clássico em que dá para relacionar o desempenho do classificador às características de cor, textura e forma que o alimentam.',
    facts: [
      { title: 'Dataset', text: 'PlantVillage (pasta color), só tomate: 18.160 imagens em 10 classes; até 500 sorteadas por classe.' },
      { title: 'Segmentação', text: 'Folha por cromaticidade ao fundo, tolerante a sombra; lesões pela dominância do verde.' },
      { title: 'Características', text: '173 por imagem: histograma e estatísticas de cor, GLCM, LBP e momentos de Hu.' },
      { title: 'Classificadores', text: 'SVM-RBF, Random Forest e MLP, com validação cruzada estratificada de 5 partições.' },
    ],
  },
  pipeline: {
    eyebrow: '02 / PIPELINE',
    title: 'Da imagem ao resultado.',
    intro: 'Sete etapas, todas visíveis. Nada é uma caixa-preta.',
    steps: [
      { tag: 'ENTRADA', title: 'Leitura', text: 'Imagens redimensionadas para 256×256.' },
      { tag: 'PRÉ', title: 'Pré-processamento', text: 'Gaussiano 5×5; conversão para HSV, Lab e cinza.' },
      { tag: 'FOLHA', title: 'Segmentação da folha', text: 'Cromaticidade + Otsu + sombra + morfologia.' },
      { tag: 'LESÃO', title: 'Segmentação das lesões', text: 'Dominância do verde g < 0,03.' },
      { tag: 'VETOR', title: 'Características', text: '173 valores de cor, textura e forma.' },
      { tag: 'MODELO', title: 'Classificação', text: 'StandardScaler → SVM, RF e MLP.' },
      { tag: 'AVALIA', title: 'Validação', text: '5 partições estratificadas, semente 42.' },
    ],
    leafTitle: 'Segmentação da folha',
    leafText:
      'O fundo do PlantVillage é uniforme, mas muda de cor entre imagens, e a folha projeta sombra. Limiar por saturação incluía a sombra e furava folhas pálidas. A solução estima a cor do fundo pela mediana de uma faixa de 12 px nas bordas e mede a distância de cromaticidade de cada pixel até ela. Como a cromaticidade quase não muda com o brilho, a sombra fica com d pequeno e sai da máscara.',
    leafFormula: 'd(p) = ‖ c(p) − c_fundo ‖,  c = (R, G, B) / (R + G + B)',
    lesionTitle: 'Segmentação das lesões',
    lesionText:
      'Dentro da folha (erodida para evitar a borda), é lesão onde o verde deixa de dominar o vermelho. Usar essa relação, em vez de uma faixa fixa de matiz, evita confundir o verde escuro das bordas com tecido doente. Depois vêm abertura, fechamento e remoção de manchas com menos de 30 pixels.',
    lesionFormula: 'g = (G − R) / (R + G + B)   →   lesão se g < 0,03',
  },
  gallery: {
    eyebrow: '03 / POR DENTRO DO DATASET',
    title: 'As 10 classes.',
    intro: 'Uma folha real de cada classe. Passe o mouse ou toque para ver como o SVM-RBF foi nela.',
    prec: 'Precisão',
    rec: 'Revocação',
  },
  features: {
    eyebrow: '04 / CARACTERÍSTICAS',
    title: '173 números por folha.',
    intro: 'Tudo é calculado dentro da máscara da folha. Depois, a importância do Random Forest mostra quem de fato ajudou.',
    groups: {
      color: { name: 'Cor', desc: 'Histograma HSV 8×4×4; média e desvio de cada canal em HSV e Lab.' },
      texture: { name: 'Textura', desc: 'GLCM (contraste, homogeneidade, energia, correlação, dissimilaridade) e LBP uniforme.' },
      shape: { name: 'Forma', desc: 'Razão de lesão, fração de folha, nº e área das manchas, circularidade e 7 momentos de Hu.' },
    },
    dims: 'características',
    toggleTotal: 'Importância total',
    togglePer: 'Por característica',
    totalNote: 'A cor soma mais importância, mas principalmente porque tem 140 das 173 características.',
    perNote: 'Por característica, a textura é o grupo mais informativo (≈0,015, contra 0,008 da forma e 0,004 da cor).',
    topTitle: 'Top 15 características (Random Forest)',
    topText:
      'Oito são bins do LBP, seis são de cor e uma é de forma (leaf ratio). Os valores são baixos e próximos: a informação está espalhada por muitas características. A forma das manchas não se destacou.',
  },
  results: {
    eyebrow: '05 / RESULTADOS',
    title: 'O que os números dizem.',
    intro: 'Métricas macro sobre as predições das 5 partições. Cada imagem foi testada exatamente uma vez.',
    binary: 'Saudável ou doente',
    multi: '10 classes',
    model: 'Modelo',
    acc: 'Acurácia',
    prec: 'Precisão',
    rec: 'Revocação',
    f1: 'F1 macro',
    best: 'MELHOR',
    binaryNote:
      'Leitura com cautela: responder sempre "doente" já acerta 89,7% (4.373 de 4.873). Por isso o F1 macro e a revocação da classe saudável dizem mais. O Random Forest é o mais preciso na classe saudável (0,98), mas o que menos a encontra (0,83).',
    multiNote:
      'O SVM ficou à frente de novo, mas a diferença para MLP e Random Forest é de cerca de um ponto. Sem desvio-padrão entre partições, o certo é ler como desempenho comparável, com leve vantagem do SVM.',
    matrixTitle: 'Matriz de confusão (SVM-RBF)',
    confTitle: 'Onde ele mais erra',
    confIntro: 'Os 8 pares mais frequentes somam 215 imagens, cerca de 40% dos ~539 erros.',
    attractor:
      'A requeima (late blight) funciona como um "atrator": 121 imagens de quatro outras classes foram parar nela, cerca de 22% de todos os erros. Hipótese: doenças fúngicas com manchas marrons parecidas, que diferem em detalhes locais (anéis, bordas, halos) que características globais captam mal.',
    real: 'real',
    pred: 'previsto',
    images: 'imagens',
  },
  limits: {
    eyebrow: '06 / LIMITAÇÕES',
    title: 'Transparência sobre o projeto.',
    intro: 'Os resultados são bons, mas tendem a ser otimistas. Estes são os motivos.',
    notes: [
      { title: 'Quase duplicatas', text: 'O PlantVillage tem a mesma folha fotografada várias vezes. A validação sorteia por imagem, não por folha, então fotos quase idênticas podem cair no treino e no teste.' },
      { title: 'Fundo controlado', text: 'Fotos de laboratório com fundo uniforme. A segmentação depende disso; em fotos de campo, provavelmente não funcionaria sem adaptações.' },
      { title: 'Segmentação sem gabarito', text: 'Limiares definidos empiricamente, sem máscaras de referência. Há falhas pontuais, como bordas sombreadas marcadas como lesão.' },
      { title: 'Amostra e ajuste', text: '4.873 das 18.160 imagens, hiperparâmetros fixados sem busca e sem desvio-padrão entre partições. Diferenças de 1 ponto não são conclusivas.' },
    ],
    twinsTitle: 'Exemplo de quase duplicatas no dataset',
    twinsText: 'Mesma folha, ângulos e ajustes diferentes. Se uma vai para o treino e a outra para o teste, o modelo "já viu" a resposta.',
  },
  part2: {
    eyebrow: '07 / PRÓXIMA ETAPA',
    title: 'Parte 2: redes neurais.',
    intro: 'Este trabalho é a Parte 1. Na Parte 2, o mesmo problema será resolvido com redes neurais.',
    cards: [
      {
        tag: 'PARTE 1 · CONCLUÍDA',
        title: 'Visão computacional clássica',
        text: 'Sem deep learning, por restrição da disciplina: segmentação em OpenCV, 173 características escolhidas à mão e SVM, Random Forest e MLP. Resultado: 98,8% na tarefa binária e 88,9% em 10 classes.',
        done: true,
      },
      {
        tag: 'PARTE 2 · PRÓXIMA',
        title: 'Redes neurais',
        text: 'Na segunda parte será aplicado o uso de redes neurais, que aprendem as características direto das imagens em vez de recebê-las prontas. Os resultados vão poder ser comparados com a linha de base clássica da Parte 1.',
        done: false,
      },
    ],
  },
  conclusion: {
    eyebrow: '08 / CONCLUSÃO',
    title: 'Uma linha de base clássica, e honesta.',
    text:
      'Um pipeline clássico, com segmentação por cromaticidade e características de cor, textura e forma, classifica doenças em folhas de tomate com 98,8% de acurácia na tarefa binária e 88,9% em 10 classes. Os erros se concentram em doenças de manchas marrons parecidas, e a textura foi o grupo mais informativo por característica. O resultado deve ser visto como uma linha de base clássica, não como o estado da arte: as redes profundas da literatura chegam a 91–99,7%.',
    nextTitle: 'Próximos passos',
    next: [
      'Validação agrupada por folha, para uma estimativa menos otimista',
      'Teste em imagens de campo',
      'Características locais por lesão, para separar doenças parecidas',
      'Avaliação quantitativa da segmentação com máscaras de referência',
      'Busca de hiperparâmetros com variância entre partições',
    ],
  },
  credits: {
    title: 'Créditos',
    authors: 'Johann Honscha Cibils e Lucas Leuck de Oliveira',
    course: 'Introdução à Visão Computacional · Escola Politécnica · PUCRS',
    dataset:
      'Dataset: Hughes, D. P.; Salathé, M. An open access repository of images on plant health to enable the development of mobile disease diagnostics. arXiv:1511.08060, 2015.',
  },
  end: {
    eyebrow: 'FIM DO PROJETO / 001',
    title: 'Vamos explorar outros projetos?',
    button: 'Voltar ao portfólio',
  },
  footer: '© 2026 · Lucas Leuck de Oliveira',
  top: 'Voltar ao topo ↑',
}

const EN: Copy = {
  nav: { back: 'Lucas Leuck', pipeline: 'Pipeline', results: 'Results', limits: 'Limitations' },
  hero: {
    eyebrow: 'FEATURED PROJECT / COMPUTER VISION',
    titleA: 'Tomato leaf ',
    titleB: 'diseases.',
    lead:
      'Tomato leaf disease classification from PlantVillage images using only classical computer vision, no deep learning. Every pipeline step (segmentation, features and classification) is explicit and can be inspected.',
    tags: ['PYTHON', 'OPENCV', 'SCIKIT-LEARN', 'SCIKIT-IMAGE', 'NUMPY'],
    seeResults: 'See the results',
    back: '← Back to projects',
    paper: 'Paper (PDF)',
    slides: 'Interactive slides',
    colab: 'Open in Colab',
    barLeft: 'PIPELINE · REAL OUTPUT',
    barRight: 'SVM-RBF · 10 CLASSES',
    stages: [
      { name: 'Original', text: 'The lab photo, resized to 256×256.' },
      { name: 'Leaf mask', text: 'Chromaticity distance to the background + Otsu + shadow removal.' },
      { name: 'Segmented leaf', text: 'Only the leaf moves on to feature extraction; the background is dropped.' },
      { name: 'Lesions', text: 'Regions where green stops dominating: 13.9% of the leaf in this image.' },
    ],
    hint: 'PREDICTION FOR THIS LEAF: BACTERIAL SPOT',
  },
  stats: [
    { value: '4,873', label: 'images evaluated' },
    { value: '10', label: 'tomato classes' },
    { value: '173', label: 'features per image' },
    { value: '98.8%', label: 'accuracy healthy vs. diseased' },
    { value: '88.9%', label: 'accuracy on 10 classes' },
  ],
  overview: {
    eyebrow: '01 / OVERVIEW',
    title: 'Spot the disease before it spreads.',
    p1:
      'Leaf diseases reduce tomato yield and quality, and catching them early usually depends on a trained person inspecting leaf by leaf. Computer vision systems that recognize symptoms in photos can support that diagnosis.',
    p2:
      'Most recent work relies on deep neural networks. Here we took the opposite path, as a course constraint and a methods exercise: a classical pipeline where classifier performance can be linked to the color, texture and shape features that feed it.',
    facts: [
      { title: 'Dataset', text: 'PlantVillage (color folder), tomato only: 18,160 images in 10 classes; up to 500 sampled per class.' },
      { title: 'Segmentation', text: 'Leaf by chromaticity to the background, shadow-tolerant; lesions by green dominance.' },
      { title: 'Features', text: '173 per image: color histogram and statistics, GLCM, LBP and Hu moments.' },
      { title: 'Classifiers', text: 'SVM-RBF, Random Forest and MLP, with 5-fold stratified cross-validation.' },
    ],
  },
  pipeline: {
    eyebrow: '02 / PIPELINE',
    title: 'From image to result.',
    intro: 'Seven steps, all visible. Nothing is a black box.',
    steps: [
      { tag: 'INPUT', title: 'Loading', text: 'Images resized to 256×256.' },
      { tag: 'PRE', title: 'Preprocessing', text: '5×5 Gaussian; HSV, Lab and grayscale conversion.' },
      { tag: 'LEAF', title: 'Leaf segmentation', text: 'Chromaticity + Otsu + shadow + morphology.' },
      { tag: 'LESION', title: 'Lesion segmentation', text: 'Green dominance g < 0.03.' },
      { tag: 'VECTOR', title: 'Features', text: '173 color, texture and shape values.' },
      { tag: 'MODEL', title: 'Classification', text: 'StandardScaler → SVM, RF and MLP.' },
      { tag: 'EVAL', title: 'Validation', text: '5 stratified folds, seed 42.' },
    ],
    leafTitle: 'Leaf segmentation',
    leafText:
      'The PlantVillage background is uniform, but its color changes between images, and the leaf casts a shadow. A saturation threshold kept the shadow and left holes in pale leaves. The fix estimates the background color from the median of a 12 px border strip and measures each pixel’s chromaticity distance to it. Since chromaticity barely changes with brightness, the shadow gets a small d and drops out of the mask.',
    leafFormula: 'd(p) = ‖ c(p) − c_bg ‖,  c = (R, G, B) / (R + G + B)',
    lesionTitle: 'Lesion segmentation',
    lesionText:
      'Inside the leaf (eroded to avoid the edge), a pixel is a lesion where green stops dominating red. Using that ratio instead of a fixed hue range avoids mistaking dark green edges for diseased tissue. Then come opening, closing and removal of spots under 30 pixels.',
    lesionFormula: 'g = (G − R) / (R + G + B)   →   lesion if g < 0.03',
  },
  gallery: {
    eyebrow: '03 / INSIDE THE DATASET',
    title: 'The 10 classes.',
    intro: 'One real leaf from each class. Hover or tap to see how SVM-RBF did on it.',
    prec: 'Precision',
    rec: 'Recall',
  },
  features: {
    eyebrow: '04 / FEATURES',
    title: '173 numbers per leaf.',
    intro: 'Everything is computed inside the leaf mask. Then Random Forest importance shows what actually helped.',
    groups: {
      color: { name: 'Color', desc: '8×4×4 HSV histogram; mean and std of each HSV and Lab channel.' },
      texture: { name: 'Texture', desc: 'GLCM (contrast, homogeneity, energy, correlation, dissimilarity) and uniform LBP.' },
      shape: { name: 'Shape', desc: 'Lesion ratio, leaf fraction, number and area of spots, circularity and 7 Hu moments.' },
    },
    dims: 'features',
    toggleTotal: 'Total importance',
    togglePer: 'Per feature',
    totalNote: 'Color adds up to the most importance, but mainly because it has 140 of the 173 features.',
    perNote: 'Per feature, texture is the most informative group (≈0.015, vs. 0.008 for shape and 0.004 for color).',
    topTitle: 'Top 15 features (Random Forest)',
    topText:
      'Eight are LBP bins, six are color and one is shape (leaf ratio). Values are low and close together: the information is spread over many features. Spot shape did not stand out.',
  },
  results: {
    eyebrow: '05 / RESULTS',
    title: 'What the numbers say.',
    intro: 'Macro metrics over the predictions of all 5 folds. Every image was tested exactly once.',
    binary: 'Healthy or diseased',
    multi: '10 classes',
    model: 'Model',
    acc: 'Accuracy',
    prec: 'Precision',
    rec: 'Recall',
    f1: 'Macro F1',
    best: 'BEST',
    binaryNote:
      'Read with care: always answering "diseased" already scores 89.7% (4,373 of 4,873). That is why macro F1 and healthy-class recall say more. Random Forest is the most precise on the healthy class (0.98), but finds it the least (0.83).',
    multiNote:
      'SVM led again, but the gap to MLP and Random Forest is about one point. Without standard deviation across folds, the fair reading is comparable performance, with a slight edge for SVM.',
    matrixTitle: 'Confusion matrix (SVM-RBF)',
    confTitle: 'Where it gets confused',
    confIntro: 'The 8 most frequent pairs add up to 215 images, about 40% of the ~539 errors.',
    attractor:
      'Late blight works as an "attractor": 121 images from four other classes ended up there, about 22% of all errors. Hypothesis: fungal diseases with similar brown spots that differ in local details (rings, edges, halos) that global features capture poorly.',
    real: 'actual',
    pred: 'predicted',
    images: 'images',
  },
  limits: {
    eyebrow: '06 / LIMITATIONS',
    title: 'Being transparent about the project.',
    intro: 'The results are good, but likely optimistic. Here is why.',
    notes: [
      { title: 'Near-duplicates', text: 'PlantVillage has the same leaf photographed several times. Validation samples by image, not by leaf, so near-identical photos can land in both train and test.' },
      { title: 'Controlled background', text: 'Lab photos on a uniform background. Segmentation depends on it; on field photos it would likely fail without changes.' },
      { title: 'Segmentation without ground truth', text: 'Thresholds set empirically, with no reference masks. There are occasional failures, like shaded edges marked as lesions.' },
      { title: 'Sampling and tuning', text: '4,873 of 18,160 images, fixed hyperparameters and no standard deviation across folds. One-point differences are not conclusive.' },
    ],
    twinsTitle: 'Near-duplicates in the dataset',
    twinsText: 'Same leaf, different angles and adjustments. If one goes to training and the other to testing, the model has "already seen" the answer.',
  },
  part2: {
    eyebrow: '07 / NEXT STEP',
    title: 'Part 2: neural networks.',
    intro: 'This work is Part 1. In Part 2, the same problem will be tackled with neural networks.',
    cards: [
      {
        tag: 'PART 1 · DONE',
        title: 'Classical computer vision',
        text: 'No deep learning, as a course constraint: OpenCV segmentation, 173 hand-crafted features and SVM, Random Forest and MLP. Result: 98.8% on the binary task and 88.9% across 10 classes.',
        done: true,
      },
      {
        tag: 'PART 2 · NEXT',
        title: 'Neural networks',
        text: 'The second part will apply neural networks, which learn features directly from the images instead of receiving them ready-made. Their results can then be compared with the classical baseline from Part 1.',
        done: false,
      },
    ],
  },
  conclusion: {
    eyebrow: '08 / CONCLUSION',
    title: 'A classical baseline, and an honest one.',
    text:
      'A classical pipeline, with chromaticity-based segmentation and color, texture and shape features, classifies tomato leaf diseases with 98.8% accuracy on the binary task and 88.9% on 10 classes. Errors concentrate on diseases with similar brown spots, and texture was the most informative group per feature. The result should be read as a classical baseline, not the state of the art: deep networks in the literature reach 91–99.7%.',
    nextTitle: 'Next steps',
    next: [
      'Leaf-grouped validation, for a less optimistic estimate',
      'Testing on field images',
      'Local per-lesion features, to separate look-alike diseases',
      'Quantitative segmentation evaluation with reference masks',
      'Hyperparameter search with variance across folds',
    ],
  },
  credits: {
    title: 'Credits',
    authors: 'Johann Honscha Cibils and Lucas Leuck de Oliveira',
    course: 'Introduction to Computer Vision · School of Technology · PUCRS',
    dataset:
      'Dataset: Hughes, D. P.; Salathé, M. An open access repository of images on plant health to enable the development of mobile disease diagnostics. arXiv:1511.08060, 2015.',
  },
  end: {
    eyebrow: 'END OF PROJECT / 001',
    title: 'Shall we explore other projects?',
    button: 'Back to portfolio',
  },
  footer: '© 2026 · Lucas Leuck de Oliveira',
  top: 'Back to top ↑',
}

export const COPY: Record<Language, Copy> = { pt: PT, en: EN }

/** Formata 0,889 / 0.889 conforme o idioma */
export const fmt = (n: number, lang: Language, digits = 3) =>
  n.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })
