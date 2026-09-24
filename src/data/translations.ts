import { LanguageCode } from '../types/store';

export interface Translations {
  // Brand & Header
  brandTitle: string;
  navAll: string;
  navApparel: string;
  navDrinkware: string;
  navBags: string;
  navCampus: string;
  navBestsellers: string;
  searchPlaceholder: string;
  cart: string;
  shipTo: string;
  currency: string;
  
  // Hero & Category Hubs
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  heroSecondaryCta: string;
  hubsHeading: string;
  hubsSubheading: string;
  hubApparel: string;
  hubApparelDesc: string;
  hubDrinkware: string;
  hubDrinkwareDesc: string;
  hubBags: string;
  hubBagsDesc: string;
  hubCampus: string;
  hubCampusDesc: string;
  hubNew: string;
  hubNewDesc: string;
  hubEco: string;
  hubEcoDesc: string;

  // CPC Campaign Landing Banner
  cpcBannerTitle: string;
  cpcBannerDesc: string;
  cpcPromoCode: string;
  cpcFilterActive: string;
  cpcSimulateLabel: string;

  // Bestsellers & Products
  bestsellersTitle: string;
  bestsellersSubtitle: string;
  addToBag: string;
  buyWithGPay: string;
  inStockOnly: string;
  onlyXLeft: string;
  activeShoppers: string;
  viewDetails: string;
  freeShippingQualified: string;
  freeShippingAddMore: string;

  // Regional Guarantees
  regionalNoticeTokyo: string;
  regionalNoticeUS: string;
  regionalNoticeGeneral: string;
  customsClearedBadge: string;
  estimatedDeliveryLabel: string;

  // Trust Badges
  trustAuthentic: string;
  trustAuthenticDesc: string;
  trustReturns: string;
  trustReturnsDesc: string;
  trustCarbon: string;
  trustCarbonDesc: string;
  trustEncrypted: string;
  trustEncryptedDesc: string;

  // PDP Modal
  selectSize: string;
  selectColor: string;
  productFeatures: string;
  guaranteeHeading: string;
  fastShippingPromise: string;

  // Cart & Checkout
  cartTitle: string;
  cartEmpty: string;
  cartEmptyAction: string;
  subtotal: string;
  shipping: string;
  free: string;
  estimatedTax: string;
  total: string;
  expressCheckoutHeader: string;
  orGuestCheckout: string;
  proceedToCheckout: string;
  guestCheckoutTitle: string;
  guestCheckoutSubtitle: string;
  emailLabel: string;
  fullNameLabel: string;
  addressLabel: string;
  cityLabel: string;
  postalCodeLabel: string;
  placeOrderBtn: string;
  orderProcessing: string;

  // Confirmation
  orderConfirmed: string;
  orderThankYou: string;
  orderNumber: string;
  trackShipment: string;
  continueShopping: string;
}

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    brandTitle: 'Google Merchandise Store',
    navAll: 'All Products',
    navApparel: 'Apparel',
    navDrinkware: 'Drinkware',
    navBags: 'Bags & Commute',
    navCampus: 'Campus & Desk',
    navBestsellers: 'Bestsellers (11.8% Bounce Rate)',
    searchPlaceholder: 'Search official hoodies, drinkware, bags...',
    cart: 'Bag',
    shipTo: 'Ship to',
    currency: 'Currency',

    heroTitle: 'Official Google Lifestyle & Gear',
    heroSubtitle: 'Designed in Mountain View. Sustainable materials, everyday utility, and certified Google craftsmanship.',
    heroCta: 'Shop Unisex Apparel',
    heroSecondaryCta: 'Explore Drinkware',
    hubsHeading: 'Direct Category Hubs',
    hubsSubheading: 'Skip generic banners. Direct paths to the highest converting Google merchandise.',
    hubApparel: "Men's & Unisex Apparel",
    hubApparelDesc: '11.8% bounce rate · Certified organic cotton',
    hubDrinkware: 'Insulated Drinkware',
    hubDrinkwareDesc: 'BPA-free · 24hr temperature lock',
    hubBags: 'Commuter Bags & Tech',
    hubBagsDesc: 'Weather-resistant recycled materials',
    hubCampus: 'Campus & Office Gear',
    hubCampusDesc: 'Stationery, enamel pins & tech sleeves',
    hubNew: 'New Season 2026',
    hubNewDesc: 'Fresh limited-run colorways',
    hubEco: 'Google Sustainability',
    hubEcoDesc: 'Zero-waste certified line',

    cpcBannerTitle: 'Direct Google Paid Search Match',
    cpcBannerDesc: 'Arriving from Google CPC Search? You have landed directly on our verified high-intent collection with 24-hour fast dispatch.',
    cpcPromoCode: '15% CPC Welcome Discount applied (CODE: GOOGLECPC15)',
    cpcFilterActive: 'Filtered to Search Query: "Google Eco-Apparel & Gear"',
    cpcSimulateLabel: 'Search Intent Campaign Mode Active',

    bestsellersTitle: 'High-Converting Bestsellers',
    bestsellersSubtitle: 'The most popular verified merchandise with the lowest return rates and highest customer satisfaction.',
    addToBag: 'Add to Bag',
    buyWithGPay: 'Buy with GPay',
    inStockOnly: 'In Stock',
    onlyXLeft: '⚡ Only {count} left in stock',
    activeShoppers: '🔥 {count} shoppers viewing right now',
    viewDetails: 'Quick View',
    freeShippingQualified: '🎉 Free Express Delivery unlocked!',
    freeShippingAddMore: 'Add {amount} more for Free Global Shipping',

    regionalNoticeTokyo: '🇯🇵 Guaranteed Tokyo Delivery: Arrives in 3–4 business days via FedEx Express. All Japanese customs & taxes pre-cleared at checkout. Zero hidden fees.',
    regionalNoticeUS: '🇺🇸 Free US Ground Shipping on orders over $75. Dispatched from California.',
    regionalNoticeGeneral: 'Global Express Tracked Delivery available with transparent customs and local currency.',
    customsClearedBadge: 'Customs Pre-Cleared · Guaranteed Delivery',
    estimatedDeliveryLabel: 'Estimated Dispatch',

    trustAuthentic: 'Official Google Merchandise',
    trustAuthenticDesc: '100% authentic, certified Mountain View designs.',
    trustReturns: '30-Day Hassle-Free Returns',
    trustReturnsDesc: 'Pre-paid return labels included in all regions.',
    trustCarbon: 'Carbon Neutral Shipping',
    trustCarbonDesc: '100% offset carbon logistics worldwide.',
    trustEncrypted: 'Google Pay & 256-bit Security',
    trustEncryptedDesc: 'Zero storage of raw card credentials.',

    selectSize: 'Select Size',
    selectColor: 'Color',
    productFeatures: 'Material & Design Details',
    guaranteeHeading: 'The Google Store Guarantee',
    fastShippingPromise: 'Orders placed before 2 PM dispatch same business day.',

    cartTitle: 'Your Shopping Bag',
    cartEmpty: 'Your bag is currently empty.',
    cartEmptyAction: 'Explore Bestsellers',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    free: 'FREE',
    estimatedTax: 'Estimated Tax / Duties',
    total: 'Estimated Total',
    expressCheckoutHeader: 'Instant Express One-Click Checkout',
    orGuestCheckout: 'or fast guest checkout below (no password needed)',
    proceedToCheckout: 'Proceed to Checkout',
    guestCheckoutTitle: 'Frictionless Guest Checkout',
    guestCheckoutSubtitle: 'No account registration required. Complete your order in 30 seconds.',
    emailLabel: 'Email Address for Order Tracking',
    fullNameLabel: 'Full Recipient Name',
    addressLabel: 'Street Address',
    cityLabel: 'City',
    postalCodeLabel: 'Postal / ZIP Code',
    placeOrderBtn: 'Place Order Now',
    orderProcessing: 'Securing transaction...',

    orderConfirmed: 'Order Confirmed!',
    orderThankYou: 'Thank you for shopping at the Google Merchandise Store.',
    orderNumber: 'Order Number',
    trackShipment: 'Live Tracking Timeline',
    continueShopping: 'Continue Shopping',
  },

  ja: {
    brandTitle: 'Google Merchandise Store',
    navAll: '全商品',
    navApparel: 'アパレル',
    navDrinkware: 'ドリンクウェア',
    navBags: 'バッグ＆通勤',
    navCampus: 'オフィス＆雑貨',
    navBestsellers: 'ベストセラー（直帰率11.8%）',
    searchPlaceholder: '公式パーカー、タンブラー、バッグを検索...',
    cart: 'カート',
    shipTo: 'お届け先',
    currency: '通貨',

    heroTitle: 'Google 公式ライフスタイル＆ギア',
    heroSubtitle: 'マウンテンビュー設計。サステナブル素材、日常の機能美、確かな品質をお届けします。',
    heroCta: 'ユニセックスアパレルを見る',
    heroSecondaryCta: 'タンブラー・ボトルを見る',
    hubsHeading: 'ダイレクト カテゴリハブ',
    hubsSubheading: '直帰率を改善し、探している商品へ直接アクセス。',
    hubApparel: 'メンズ＆ユニセックス アパレル',
    hubApparelDesc: '直帰率11.8%の実績 · オーガニックコットン使用',
    hubDrinkware: '保温・保冷ドリンクウェア',
    hubDrinkwareDesc: 'BPAフリー · 24時間保冷・保温設計',
    hubBags: '通勤バックパック＆テック収納',
    hubBagsDesc: '撥水加工のリサイクル素材',
    hubCampus: 'キャンパス＆オフィス文具',
    hubCampusDesc: '公式ノート、ピンバッジ、アクセサリ',
    hubNew: '2026年 新作コレクション',
    hubNewDesc: '限定カラーウェイ登場',
    hubEco: 'サステナビリティシリーズ',
    hubEcoDesc: '環境配慮型エコ製品ライン',

    cpcBannerTitle: 'Google 検索連動型ランディング',
    cpcBannerDesc: 'Google 広告からお越しの皆様へ：厳選された人気公式アイテムを最短配送・限定特典付きでお届けします。',
    cpcPromoCode: 'CPC限定15%オフ適用中（コード: GOOGLECPC15）',
    cpcFilterActive: '検索クエリ「Google エコアパレル＆ギア」に適合',
    cpcSimulateLabel: '検索広告ランディング最適化中',

    bestsellersTitle: '高満足度 ベストセラー商品',
    bestsellersSubtitle: '返品率が最も低く、高評価を獲得している公式人気アイテム。',
    addToBag: 'カートに追加',
    buyWithGPay: 'Google Payで購入',
    inStockOnly: '在庫あり',
    onlyXLeft: '⚡ 残りわずか: {count}点',
    activeShoppers: '🔥 現在 {count}名が閲覧中',
    viewDetails: 'クイック表示',
    freeShippingQualified: '🎉 日本向け無料エクスプレス配送適用！',
    freeShippingAddMore: 'あと{amount}で全国送料無料',

    regionalNoticeTokyo: '🇯🇵 東京・豊島区・港区向け特急便: FedEx便で3〜4営業日でお届け。関税・消費税はすべて決済時に事前清算。受取時の追加請求は一切ありません。',
    regionalNoticeUS: '🇺🇸 $75以上のご注文で米国国内送料無料。',
    regionalNoticeGeneral: '日本円（¥）表示対応・関税込みの安心国際配送。',
    customsClearedBadge: '関税前払い・安心配送保証',
    estimatedDeliveryLabel: '発送目安',

    trustAuthentic: 'Google公式正規品保証',
    trustAuthenticDesc: '100%本物のマウンテンビュー公式デザイン。',
    trustReturns: '30日間 返品無料保証',
    trustReturnsDesc: '返送用ラベル付属で国内返品対応。',
    trustCarbon: 'カーボンニュートラル配送',
    trustCarbonDesc: '輸送時のCO2排出量を100%相殺。',
    trustEncrypted: 'Google Pay & 256bit暗号化',
    trustEncryptedDesc: '安心のGoogleセキュリティ決済。',

    selectSize: 'サイズを選択',
    selectColor: 'カラー',
    productFeatures: '素材・製品仕様',
    guaranteeHeading: 'Google ストアの品質保証',
    fastShippingPromise: '午後2時までのご注文は当日発送いたします。',

    cartTitle: 'ショッピングカート',
    cartEmpty: 'カートには何も入っていません。',
    cartEmptyAction: 'ベストセラーを見る',
    subtotal: '小計',
    shipping: '送料',
    free: '無料',
    estimatedTax: '関税・消費税（事前清算）',
    total: '合計金額（税込）',
    expressCheckoutHeader: 'ワンクリック特急決済',
    orGuestCheckout: 'またはパスワード登録不要のゲスト購入',
    proceedToCheckout: '購入手続きへ',
    guestCheckoutTitle: '登録不要のゲスト決済',
    guestCheckoutSubtitle: '面倒なパスワード作成なしで、30秒で注文完了できます。',
    emailLabel: '追跡番号送信用メールアドレス',
    fullNameLabel: 'お受取人様 氏名',
    addressLabel: 'ご住所（都道府県・市区町村・番地）',
    cityLabel: '市区町村',
    postalCodeLabel: '郵便番号 (〒XXX-XXXX)',
    placeOrderBtn: '注文を確定する',
    orderProcessing: '暗号化通信で処理中...',

    orderConfirmed: 'ご注文が完了しました！',
    orderThankYou: 'Google Merchandise Storeをご利用いただき誠にありがとうございます。',
    orderNumber: '注文番号',
    trackShipment: '配送状況タイムライン',
    continueShopping: '買い物を続ける',
  },

  zh: {
    brandTitle: 'Google Merchandise Store',
    navAll: '全部商品',
    navApparel: '服饰',
    navDrinkware: '水杯水壶',
    navBags: '通勤背包',
    navCampus: '办公文创',
    navBestsellers: '畅销热卖（跳出率仅11.8%）',
    searchPlaceholder: '搜索官方卫衣、保温杯、背包...',
    cart: '购物袋',
    shipTo: '配送至',
    currency: '货币',

    heroTitle: 'Google 官方正品生活与极客周边',
    heroSubtitle: '加州山景城原厂设计。环保面料、极致工艺与高频实用性。',
    heroCta: '选购中性服饰',
    heroSecondaryCta: '浏览保温杯系列',
    hubsHeading: '直达核心分类专区',
    hubsSubheading: '告别宽泛轮播，直击高转化核心品类。',
    hubApparel: '男女中性服饰专区',
    hubApparelDesc: '跳出率仅11.8% · 有机棉环保认证',
    hubDrinkware: '真空保温水杯',
    hubDrinkwareDesc: '食品级无BPA · 24小时持久锁温',
    hubBags: '通勤背包与数码收纳',
    hubBagsDesc: '防泼水再生尼龙材质',
    hubCampus: '办公文创与纪念徽章',
    hubCampusDesc: '恐龙断网限定、精美文具周边',
    hubNew: '2026 春季新品',
    hubNewDesc: '全新配色限量上线',
    hubEco: 'Google 绿色环保系列',
    hubEcoDesc: '零碳认证环保生活品',

    cpcBannerTitle: 'Google 付费搜索直达专区',
    cpcBannerDesc: '您通过 Google 推广搜索进入。已为您自动匹配高意向官方正品，享24小时内极速发货。',
    cpcPromoCode: '已应用15%专属新人折扣码（代码: GOOGLECPC15）',
    cpcFilterActive: '已按搜索词精选: "Google 环保服饰与周边"',
    cpcSimulateLabel: '搜索广告定向模式生效中',

    bestsellersTitle: '高转化官方畅销榜',
    bestsellersSubtitle: '官方商店好评率最高、退货率最低的经典口碑商品。',
    addToBag: '加入购物袋',
    buyWithGPay: 'Google Pay 快捷买单',
    inStockOnly: '有现货',
    onlyXLeft: '⚡ 仅剩 {count} 件',
    activeShoppers: '🔥 此时有 {count} 人正在浏览',
    viewDetails: '快速预览',
    freeShippingQualified: '🎉 已享跨境免费直邮！',
    freeShippingAddMore: '还差 {amount} 即可享受全球免邮',

    regionalNoticeTokyo: '🇯🇵 亚太极速物流：支持顺丰国际 / FedEx 直达，全中文清晰结账，关税预缴无额外费用。',
    regionalNoticeUS: '🇺🇸 美国订单满 $75 免基础运费。',
    regionalNoticeGeneral: '支持人民币实时汇率结算，全程物流节点透明追踪。',
    customsClearedBadge: '关税已预缴 · 正品极速直达',
    estimatedDeliveryLabel: '预计发货',

    trustAuthentic: 'Google 官方原装正品',
    trustAuthenticDesc: '100% 官方认证，山景城直发设计标准。',
    trustReturns: '30 天无忧退换货',
    trustReturnsDesc: '附带国际预付费退货面单。',
    trustCarbon: '碳中和绿色物流',
    trustCarbonDesc: '100% 全球物流碳排放抵消。',
    trustEncrypted: 'Google Pay 银行级安全加密',
    trustEncryptedDesc: '绝不保存银行卡明文信息。',

    selectSize: '选择尺码',
    selectColor: '选择颜色',
    productFeatures: '材质与工艺细节',
    guaranteeHeading: 'Google Store 官方保障',
    fastShippingPromise: '工作日下午2点前下单，当天安排出库。',

    cartTitle: '我的购物袋',
    cartEmpty: '您的购物袋目前是空的。',
    cartEmptyAction: '查看热销榜单',
    subtotal: '商品小计',
    shipping: '预估运费',
    free: '免费',
    estimatedTax: '预估税费 / 关税',
    total: '应付总额',
    expressCheckoutHeader: '一键极速支付通道',
    orGuestCheckout: '或使用免注册访客极速通道（无需设置密码）',
    proceedToCheckout: '前往结账',
    guestCheckoutTitle: '免登录访客快捷结账',
    guestCheckoutSubtitle: '无需繁琐注册或输入密码，30秒内即可轻松搞定。',
    emailLabel: '用于接收物流追踪的电子邮箱',
    fullNameLabel: '收货人姓名',
    addressLabel: '详细收货地址',
    cityLabel: '城市',
    postalCodeLabel: '邮政编码',
    placeOrderBtn: '确认并提交订单',
    orderProcessing: '安全支付验证中...',

    orderConfirmed: '订单已成功提交！',
    orderThankYou: '感谢您在 Google 官方商店选购商品。',
    orderNumber: '订单编号',
    trackShipment: '实时物流进度',
    continueShopping: '继续选购',
  },

  es: {
    brandTitle: 'Google Merchandise Store',
    navAll: 'Todos los Productos',
    navApparel: 'Ropa',
    navDrinkware: 'Termos y Tazas',
    navBags: 'Mochilas y Viaje',
    navCampus: 'Oficina y Campus',
    navBestsellers: 'Más Vendidos (Rebote 11.8%)',
    searchPlaceholder: 'Buscar sudaderas oficiales, termos, mochilas...',
    cart: 'Bolsa',
    shipTo: 'Enviar a',
    currency: 'Moneda',

    heroTitle: 'Productos Oficiales y Estilo de Vida Google',
    heroSubtitle: 'Diseñado en Mountain View. Materiales sostenibles, utilidad cotidiana y calidad certificada Google.',
    heroCta: 'Comprar Ropa Unisex',
    heroSecondaryCta: 'Explorar Termos',
    hubsHeading: 'Centros de Categoría Directos',
    hubsSubheading: 'Rutas directas a las colecciones con mayor tasa de conversión.',
    hubApparel: 'Ropa Unisex y Hombre',
    hubApparelDesc: 'Tasa de rebote de sólo 11.8% · Algodón orgánico',
    hubDrinkware: 'Termos y Botellas Térmicas',
    hubDrinkwareDesc: 'Libre de BPA · Retención de temperatura 24h',
    hubBags: 'Mochilas Urbanas y Accesorios',
    hubBagsDesc: 'Nailon reciclado resistente al agua',
    hubCampus: 'Artículos de Oficina y Campus',
    hubCampusDesc: 'Cuadernos, pines exclusivos y fundas',
    hubNew: 'Nueva Colección 2026',
    hubNewDesc: 'Edición limitada con nuevos colores',
    hubEco: 'Línea Sostenible Google',
    hubEcoDesc: 'Certificación de cero residuos',

    cpcBannerTitle: 'Coincidencia Directa de Google Ads',
    cpcBannerDesc: '¿Llegaste desde búsqueda patrocinada de Google? Estás en la colección oficial de alta intención con despacho exprés en 24h.',
    cpcPromoCode: 'Descuento especial de 15% aplicado (CÓDIGO: GOOGLECPC15)',
    cpcFilterActive: 'Filtrado por intención: "Ropa y Accesorios Ecológicos Google"',
    cpcSimulateLabel: 'Modo de Campaña Publicitaria Activo',

    bestsellersTitle: 'Los Más Vendidos y Mejor Valorados',
    bestsellersSubtitle: 'Los productos con menor tasa de devolución y máxima calificación de satisfacción.',
    addToBag: 'Añadir a la Bolsa',
    buyWithGPay: 'Comprar con GPay',
    inStockOnly: 'En Stock',
    onlyXLeft: '⚡ Sólo quedan {count} unidades',
    activeShoppers: '🔥 {count} personas viendo ahora mismo',
    viewDetails: 'Vista Rápida',
    freeShippingQualified: '🎉 ¡Envío exprés gratuito desbloqueado!',
    freeShippingAddMore: 'Añade {amount} más para Envío Gratuito',

    regionalNoticeTokyo: '🇯🇵 Entrega garantizada en España / LATAM con cálculo de aranceles previo y seguimiento completo DHL.',
    regionalNoticeUS: '🇺🇸 Envío nacional gratis en compras mayores a $75.',
    regionalNoticeGeneral: 'Envíos internacionales express con aduanas prepagadas y moneda local.',
    customsClearedBadge: 'Aduanas Prepagadas · Sin Sorpresas',
    estimatedDeliveryLabel: 'Tiempo Estimado de Entrega',

    trustAuthentic: 'Merchandising Oficial Google',
    trustAuthenticDesc: '100% diseños originales certificados de California.',
    trustReturns: 'Devoluciones Fáciles de 30 Días',
    trustReturnsDesc: 'Etiquetas prepagadas incluidas en todas las regiones.',
    trustCarbon: 'Envíos Neutros en Carbono',
    trustCarbonDesc: 'Compensación del 100% de emisiones.',
    trustEncrypted: 'Google Pay y Seguridad de 256 bits',
    trustEncryptedDesc: 'Cero almacenamiento de datos de tarjeta en texto plano.',

    selectSize: 'Seleccionar Talla',
    selectColor: 'Color',
    productFeatures: 'Detalles y Materiales',
    guaranteeHeading: 'Garantía Google Store',
    fastShippingPromise: 'Pedidos antes de las 14:00 se despachan el mismo día.',

    cartTitle: 'Tu Bolsa de Compras',
    cartEmpty: 'Tu bolsa está vacía.',
    cartEmptyAction: 'Ver los Más Vendidos',
    subtotal: 'Subtotal',
    shipping: 'Envío',
    free: 'GRATIS',
    estimatedTax: 'Impuestos / Aranceles Estimados',
    total: 'Total Estimado',
    expressCheckoutHeader: 'Pago Rápido en Un Solo Clic',
    orGuestCheckout: 'o compra rápida como invitado (sin contraseña requerida)',
    proceedToCheckout: 'Proceder al Pago',
    guestCheckoutTitle: 'Pago Rápido Sin Registro',
    guestCheckoutSubtitle: 'Sin necesidad de crear cuenta o contraseña. Completa en 30 segundos.',
    emailLabel: 'Correo Electrónico para Seguimiento',
    fullNameLabel: 'Nombre Completo del Destinatario',
    addressLabel: 'Dirección de Entrega',
    cityLabel: 'Ciudad',
    postalCodeLabel: 'Código Postal',
    placeOrderBtn: 'Confirmar y Pagar Pedido',
    orderProcessing: 'Procesando pago seguro...',

    orderConfirmed: '¡Pedido Confirmado con Éxito!',
    orderThankYou: 'Gracias por comprar en Google Merchandise Store.',
    orderNumber: 'Número de Pedido',
    trackShipment: 'Línea de Tiempo del Envío',
    continueShopping: 'Seguir Comprando',
  },
};
