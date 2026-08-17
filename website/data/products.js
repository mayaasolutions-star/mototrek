export const CATEGORY = Object.freeze({
    HELMET: "helmet",
    JACKET: "jacket",
    GLOVES: "gloves",
    PANTS: "pants",
    BOOTS: "boots",
    LUGGAGE: "luggage",
    RAINWEAR: "rainwear",
    ACCESSORIES: "accessories",
    INTERCOM: "intercom"
});

const products = [

{
    id: 1,
    sku: "MT-ACC-001",
    category: CATEGORY.ACCESSORIES,
    brand: "",
    name: "2 in 1 Camping Folding Cup",
    image: "/images/2-in-1-camping-folding-cup.webp",
    price: "Starting from ₹249*",
    actualPrice: 249,
    displayOrder: 1,
    variants: "",
    description: "Compact and lightweight foldable camping cup designed for motorcycle touring, camping and outdoor adventures. Reusable, easy to carry and ideal for enjoying hot or cold beverages on the go.",
    badges: [
        "Foldable Design",
        "Travel Friendly",
        "Outdoor Essential"
    ],
    search: [
        "2 in 1 camping folding cup",
        "camping folding cup",
        "foldable cup",
        "camping cup",
        "motorcycle camping",
        "outdoor accessories"
    ]
},

{
    id: 2,
    sku: "MT-ACC-002",
    category: CATEGORY.ACCESSORIES,
    brand: "",
    name: "4 in 1 Tubeless Puncture Repair Kit",
    image: "/images/4-in-1-tubeless-puncture-repair-kit.webp",
    price: "Starting from ₹249*",
    actualPrice: 249,
    displayOrder: 2,
    variants: "",
    description: "Compact tubeless puncture repair kit designed for quick roadside tyre repairs. An essential motorcycle touring accessory that helps riders continue their journey with confidence.",
    badges: [
        "Tubeless Repair",
        "Compact Kit",
        "Travel Essential"
    ],
    search: [
        "4 in 1 tubeless puncture repair kit",
        "tubeless puncture repair",
        "motorcycle puncture kit",
        "tyre repair kit",
        "bike repair tool",
        "roadside repair"
    ]
},

{
    id: 3,
    sku: "MT-ACC-003",
    category: CATEGORY.ACCESSORIES,
    brand: "66BHP",
    name: "66BHP Balaclava Air",
    image: "/images/66bhp-balaclava-air.webp",
    price: "Starting from ₹350*",
    actualPrice: 350,
    displayOrder: 3,
    variants: "Colours Available",
    description: "Lightweight and breathable riding balaclava designed to improve helmet comfort, absorb sweat and keep riders cool during daily commuting, touring and long-distance motorcycle rides.",
    badges: [
        "Colours Available",
        "Breathable",
        "Helmet Friendly"
    ],
    search: [
        "66bhp",
        "66bhp balaclava air",
        "balaclava",
        "helmet liner",
        "riding balaclava",
        "motorcycle accessories"
    ]
},

{
    id: 4,
    sku: "MT-ACC-004",
    category: CATEGORY.ACCESSORIES,
    brand: "66BHP",
    name: "66BHP Hand Sleeves",
    image: "/images/66bhp-hand-sleeves.webp",
    price: "Starting from ₹249*",
    actualPrice: 249,
    displayOrder: 4,
    variants: "",
    description: "Comfortable riding hand sleeves that provide UV protection and help reduce sun exposure while keeping riders cool during everyday rides, touring and outdoor adventures.",
    badges: [
        "UV Protection",
        "Stretch Fit",
        "Comfort Wear"
    ],
    search: [
        "66bhp",
        "66bhp hand sleeves",
        "hand sleeves",
        "uv sleeves",
        "riding sleeves",
        "motorcycle accessories"
    ]
},

{
    id: 5,
    sku: "MT-ACC-005",
    category: CATEGORY.ACCESSORIES,
    brand: "66BHP",
    name: "66BHP Helmet Interior Cleaner 150ml",
    image: "/images/66bhp-helmet-interior-cleaner-150ml.webp",
    price: "Starting from ₹149*",
    actualPrice: 149,
    displayOrder: 5,
    variants: "",
    description: "Helmet interior cleaner specially formulated to remove sweat, dirt and odour from helmet liners, helping keep your riding gear fresh, clean and comfortable after every ride.",
    badges: [
        "150ml",
        "Helmet Care",
        "Odour Control"
    ],
    search: [
        "66bhp",
        "66bhp helmet interior cleaner",
        "helmet cleaner",
        "helmet interior cleaner",
        "helmet care",
        "motorcycle accessories"
    ]
},

{
    id: 6,
    sku: "MT-ACC-006",
    category: CATEGORY.ACCESSORIES,
    brand: "66BHP",
    name: "66BHP Rain Coat Combo - Fluorescent Green",
    image: "/images/66bhp-rain-coat-combo-fluorescent-green.webp",
    price: "Starting from ₹1,750*",
    actualPrice: 1750,
    displayOrder: 6,
    variants: "",
    description: "High-visibility waterproof rain suit designed to keep riders dry and visible during monsoon rides, highway touring and long-distance motorcycle journeys. Lightweight, durable and easy to carry for unpredictable weather conditions.",
    badges: [
        "Waterproof",
        "High Visibility",
        "Riding Essential"
    ],
    search: [
        "66bhp",
        "66bhp rain coat combo",
        "fluorescent green rain coat",
        "motorcycle rain suit",
        "riding rainwear",
        "waterproof rain gear"
    ]
},

{
    id: 7,
    sku: "MT-ACC-007",
    category: CATEGORY.ACCESSORIES,
    brand: "66BHP",
    name: "66BHP Shampoo",
    image: "/images/66bhp-shampoo.webp",
    price: "Starting from ₹100*",
    actualPrice: 100,
    displayOrder: 7,
    variants: "Available in Qty",
    description: "Premium motorcycle shampoo formulated to safely remove dirt, mud and road grime while protecting paint, plastic and metal surfaces with a streak-free finish.",
    badges: [
        "Available in Qty",
        "Bike Care",
        "Easy Wash"
    ],
    search: [
        "66bhp",
        "66bhp shampoo",
        "bike shampoo",
        "motorcycle shampoo",
        "bike wash",
        "motorcycle cleaning"
    ]
},

{
    id: 8,
    sku: "MT-ACC-008",
    category: CATEGORY.ACCESSORIES,
    brand: "66BHP",
    name: "66BHP Visor Cleaner",
    image: "/images/66bhp-visor-cleaner.webp",
    price: "Starting from ₹95*",
    actualPrice: 95,
    displayOrder: 8,
    variants: "",
    description: "Compact visor cleaning solution that effectively removes dust, fingerprints, bugs and road grime, helping maintain crystal-clear visibility for safer motorcycle rides.",
    badges: [
        "50ml",
        "Streak Free",
        "Helmet Care"
    ],
    search: [
        "66bhp",
        "66bhp visor cleaner",
        "visor cleaner",
        "helmet visor cleaner",
        "helmet care",
        "motorcycle accessories"
    ]
},

{
    id: 9,
    sku: "MT-ACC-009",
    category: CATEGORY.ACCESSORIES,
    brand: "ARK",
    name: "ARK Helmet Visor Protector",
    image: "/images/ark-helmet-visor-protector.webp",
    price: "Starting from ₹500*",
    actualPrice: 500,
    displayOrder: 9,
    variants: "",
    description: "Premium visor protection film designed to help reduce scratches, improve durability and maintain clear visibility for everyday commuting, touring and long-distance riding.",
    badges: [
        "Scratch Protection",
        "Easy Installation",
        "Clear Visibility"
    ],
    search: [
        "ark",
        "ark visor protector",
        "helmet visor protector",
        "visor protection film",
        "helmet accessories",
        "motorcycle visor"
    ]
},

{
    id: 10,
    sku: "MT-ACC-010",
    category: CATEGORY.ACCESSORIES,
    brand: "",
    name: "Arrowline Sponge Polish",
    image: "/images/arrowline-sponge-polish.webp",
    price: "Starting from ₹25*",
    actualPrice: 25,
    displayOrder: 10,
    variants: "",
    description: "Compact sponge polish designed for quick application on motorcycles, helmets and plastic panels, helping restore shine and maintain a clean, polished appearance.",
    badges: [
        "Quick Polish",
        "Easy to Use",
        "Bike Care"
    ],
    search: [
        "arrowline",
        "arrowline sponge polish",
        "sponge polish",
        "bike polish",
        "motorcycle polish",
        "bike care"
    ]
},

{
    id: 11,
    sku: "MT-ACC-011",
    category: CATEGORY.ACCESSORIES,
    brand: "",
    name: "Big Premium Micro Fiber Cloth 200 GSM",
    image: "/images/big-premium-micro-fiber-cloth-200-gsm.webp",
    price: "Starting from ₹149*",
    actualPrice: 149,
    displayOrder: 11,
    variants: "1x1.5 ft",
    description: "Premium 200 GSM microfiber cloth designed for safely cleaning motorcycles, helmets, visors and riding gear. Soft, highly absorbent and scratch-free, making it ideal for polishing and everyday bike care.",
    badges: [
        "200 GSM",
        "1x1.5 ft",
        "Scratch Free"
    ],
    search: [
        "premium microfiber cloth",
        "200 gsm microfiber cloth",
        "bike cleaning cloth",
        "motorcycle microfiber",
        "helmet cleaning cloth",
        "bike care"
    ]
},

{
    id: 12,
    sku: "MT-ACC-012",
    category: CATEGORY.ACCESSORIES,
    brand: "BOBO",
    name: "BOBO BM-4 Pro Mobile Mount Jaw Grip+ Vibration Controller",
    image: "/images/bobo-bm-4-pro-mobile-mount-jaw-grip-vibration-controller.webp",
    price: "Starting from ₹1,599*",
    actualPrice: 1599,
    displayOrder: 12,
    variants: "",
    description: "Premium motorcycle mobile mount with a secure jaw-grip mechanism and integrated vibration controller for enhanced smartphone protection during city rides, touring and adventure riding.",
    badges: [
        "Jaw Grip",
        "Vibration Controller",
        "Secure Mount"
    ],
    search: [
        "bobo",
        "bm4 pro",
        "mobile mount",
        "jaw grip",
        "vibration controller",
        "motorcycle phone holder"
    ]
},

{
    id: 13,
    sku: "MT-ACC-013",
    category: CATEGORY.ACCESSORIES,
    brand: "",
    name: "Bungee Cord Generic 90cm",
    image: "/images/bungee-cord-generic-90cm.webp",
    price: "Starting from ₹99*",
    actualPrice: 99,
    displayOrder: 13,
    variants: "90cm",
    description: "Heavy-duty 90cm bungee cord designed to securely fasten luggage, bags and camping gear on motorcycles. An essential touring accessory for carrying extra loads safely.",
    badges: [
        "90cm",
        "Heavy Duty",
        "Touring Essential"
    ],
    search: [
        "bungee cord",
        "90cm bungee cord",
        "motorcycle bungee cord",
        "luggage cord",
        "bike luggage strap",
        "touring accessory"
    ]
},

{
    id: 14,
    sku: "MT-ACC-014",
    category: CATEGORY.ACCESSORIES,
    brand: "",
    name: "Combination Pin Helmet Lock",
    image: "/images/combination-pin-helmet-lock.webp",
    price: "Starting from ₹199*",
    actualPrice: 199,
    displayOrder: 14,
    variants: "",
    description: "Portable combination helmet lock designed to securely lock helmets, riding jackets or luggage while your motorcycle is parked. Easy to use and ideal for everyday riding and touring.",
    badges: [
        "4-Digit Lock",
        "Portable",
        "Travel Essential"
    ],
    search: [
        "helmet lock",
        "combination helmet lock",
        "helmet security",
        "motorcycle helmet lock",
        "bike accessories",
        "helmet cable lock"
    ]
},

{
    id: 15,
    sku: "MT-ACC-015",
    category: CATEGORY.ACCESSORIES,
    brand: "",
    name: "Hand Sleeve Skin Colour",
    image: "/images/hand-sleeve-skin-colour.webp",
    price: "Starting from ₹69*",
    actualPrice: 69,
    displayOrder: 15,
    variants: "Skin Colour",
    description: "Comfortable stretch-fit hand sleeves designed to provide protection from sun exposure and dust while ensuring a lightweight and breathable feel during daily rides.",
    badges: [
        "Skin Colour",
        "UV Protection",
        "Stretch Fit"
    ],
    search: [
        "hand sleeve",
        "skin colour hand sleeve",
        "uv hand sleeve",
        "riding sleeve",
        "bike accessories",
        "sun protection sleeve"
    ]
},

{
    id: 16,
    sku: "MT-ACC-016",
    category: CATEGORY.ACCESSORIES,
    brand: "HJG",
    name: "HJG Clamps Leg Guard Mounting Clamps Fog Light",
    image: "/images/hjg-clamps-leg-guard-mounting-clamps-fog-light.webp",
    price: "Starting from ₹399*",
    actualPrice: 399,
    displayOrder: 16,
    variants: "",
    description: "Heavy-duty mounting clamps designed to securely install auxiliary fog lights on motorcycle leg guards and crash guards. Built for durability, stability and hassle-free installation on touring and adventure motorcycles.",
    badges: [
        "Universal Fit",
        "Heavy Duty",
        "Easy Installation"
    ],
    search: [
        "hjg",
        "hjg clamps",
        "leg guard mounting clamps",
        "fog light clamp",
        "motorcycle fog light mount",
        "auxiliary light clamp"
    ]
},

{
    id: 17,
    sku: "MT-ACC-017",
    category: CATEGORY.ACCESSORIES,
    brand: "HJG",
    name: "HJG Mercedes Y Lens Foglight with Wiring Harness Kit",
    image: "/images/hjg-mercedes-y-lens-foglight-with-wiring-harness-kit.webp",
    price: "Starting from ₹5,499*",
    actualPrice: 5499,
    displayOrder: 17,
    variants: "Wiring Harness Included",
    description: "Premium dual-colour LED fog light kit featuring the popular Mercedes Y Lens design for enhanced night visibility, improved safety and reliable performance during highway touring and adventure rides.",
    badges: [
        "Dual Colour",
        "Wiring Harness Included",
        "High Brightness"
    ],
    search: [
        "hjg",
        "mercedes y lens fog light",
        "hjg fog light",
        "led fog light",
        "motorcycle auxiliary light",
        "wiring harness kit"
    ]
},

{
    id: 18,
    sku: "MT-ACC-018",
    category: CATEGORY.ACCESSORIES,
    brand: "HJG",
    name: "HJG Original 60W 4LED CREE 120W Dual Color LED Fog Lights with Wiring Harness Kit",
    image: "/images/hjg-original-60w-4led-cree-120w-dual-color-led-fog-lights-with-wiring-harness-kit.webp",
    price: "Starting from ₹4,549*",
    actualPrice: 4549,
    displayOrder: 18,
    variants: "Yellow & White | Wiring Harness Included",
    description: "High-performance dual-colour CREE LED fog lights delivering powerful white and yellow illumination for improved visibility in rain, fog and night riding conditions.",
    badges: [
        "4 LED CREE",
        "Dual Colour",
        "Wiring Harness Included"
    ],
    search: [
        "hjg",
        "4 led cree fog light",
        "60w fog light",
        "120w fog light",
        "yellow white fog light",
        "motorcycle led fog light"
    ]
},

{
    id: 19,
    sku: "MT-ACC-019",
    category: CATEGORY.ACCESSORIES,
    brand: "HJG",
    name: "HJG Original 7 LED 140W Dual Color LED Fog Lights with Wiring Harness Kit",
    image: "/images/hjg-original-7-led-140w-dual-color-led-fog-lights-with-wiring-harness-kit.webp",
    price: "Starting from ₹7,999*",
    actualPrice: 7999,
    displayOrder: 19,
    variants: "Yellow & White | Wiring Harness Included",
    description: "Premium 7 LED dual-colour fog light kit engineered to provide exceptional road illumination, making highway touring and night riding safer in all weather conditions.",
    badges: [
        "7 LED",
        "Dual Colour",
        "Wiring Harness Included"
    ],
    search: [
        "hjg",
        "7 led fog light",
        "140w fog light",
        "dual color fog light",
        "motorcycle auxiliary light",
        "led fog lights"
    ]
},

{
    id: 20,
    sku: "MT-ACC-020",
    category: CATEGORY.ACCESSORIES,
    brand: "HJG",
    name: "HJG Original 80W 9 LED 160W Dual Color LED Fog Lights with Wiring Harness Kit",
    image: "/images/hjg-original-80w-9-led-160w-dual-color-led-fog-lights-with-wiring-harness-kit.webp",
    price: "Starting from ₹8,999*",
    actualPrice: 8999,
    displayOrder: 20,
    variants: "Yellow & White | Wiring Harness Included",
    description: "Top-of-the-line 9 LED dual-colour fog light kit offering maximum brightness, wide beam coverage and dependable performance for touring, off-road and adventure motorcycles.",
    badges: [
        "9 LED",
        "Dual Colour",
        "Premium Performance"
    ],
    search: [
        "hjg",
        "9 led fog light",
        "160w fog light",
        "dual color led fog light",
        "motorcycle fog lights",
        "auxiliary lights"
    ]
},

{
    id: 21,
    sku: "MT-ACC-021",
    category: CATEGORY.ACCESSORIES,
    brand: "",
    name: "Loud Cycle Air Horn 12dB",
    image: "/images/loud-cycle-air-horn-12db.webp",
    price: "Starting from ₹399*",
    actualPrice: 399,
    displayOrder: 21,
    variants: "",
    description: "High-performance motorcycle air horn designed to deliver a loud and clear warning sound, helping improve rider safety during city traffic, highway rides and long-distance touring.",
    badges: [
        "High Volume",
        "Universal Fit",
        "Safety Essential"
    ],
    search: [
        "loud cycle air horn",
        "12db air horn",
        "motorcycle air horn",
        "bike horn",
        "motorcycle accessories",
        "universal horn"
    ]
},

{
    id: 22,
    sku: "MT-ACC-022",
    category: CATEGORY.ACCESSORIES,
    brand: "",
    name: "Microfiber Cloth - Regular",
    image: "/images/microfiber-cloth-regular.webp",
    price: "Starting from ₹29*",
    actualPrice: 29,
    displayOrder: 22,
    variants: "",
    description: "Soft microfiber cleaning cloth suitable for motorcycles, helmets, visors and riding gear. Ideal for removing dust, fingerprints and water spots without leaving scratches.",
    badges: [
        "Scratch Free",
        "Reusable",
        "Bike Care"
    ],
    search: [
        "microfiber cloth",
        "regular microfiber cloth",
        "bike cleaning cloth",
        "motorcycle microfiber",
        "helmet cleaning cloth",
        "bike care"
    ]
},

{
    id: 23,
    sku: "MT-ACC-023",
    category: CATEGORY.ACCESSORIES,
    brand: "",
    name: "Mini LED Strobe Light",
    image: "/images/mini-led-strobe-light.webp",
    price: "Starting from ₹199*",
    actualPrice: 199,
    displayOrder: 23,
    variants: "",
    description: "Compact LED strobe light designed to improve motorcycle visibility and safety during night rides, adverse weather conditions and emergency situations.",
    badges: [
        "High Visibility",
        "Compact Design",
        "Universal Fit"
    ],
    search: [
        "mini led strobe light",
        "motorcycle strobe light",
        "bike safety light",
        "led warning light",
        "motorcycle accessories",
        "universal strobe"
    ]
},

{
    id: 24,
    sku: "MT-ACC-024",
    category: CATEGORY.ACCESSORIES,
    brand: "Motomax",
    name: "Motomax Helmet Visor Cleaner",
    image: "/images/motomax-helmet-visor-cleaner-200ml.webp",
    price: "Starting from ₹260*",
    actualPrice: 260,
    displayOrder: 24,
    variants: "200ml",
    description: "Premium helmet visor cleaner formulated to remove dust, bugs, fingerprints and road grime while providing a crystal-clear, streak-free finish for improved riding visibility.",
    badges: [
        "200ml",
        "Streak Free",
        "Helmet Care"
    ],
    search: [
        "motomax",
        "motomax visor cleaner",
        "helmet visor cleaner",
        "200ml visor cleaner",
        "helmet care",
        "motorcycle accessories"
    ]
},

{
    id: 25,
    sku: "MT-ACC-025",
    category: CATEGORY.ACCESSORIES,
    brand: "Motul",
    name: "Motul Chain Cleaner C1",
    image: "/images/motul-chain-cleaner-c1.webp",
    price: "Starting from ₹255*",
    actualPrice: 255,
    displayOrder: 25,
    variants: "150ml | Available in Qty",
    description: "Powerful motorcycle chain cleaner that quickly removes dirt, grease and old lubricant, preparing the chain for fresh lubrication and helping extend drivetrain life.",
    badges: [
        "150ml",
        "Available in Qty",
        "Chain Care"
    ],
    search: [
        "motul",
        "motul chain cleaner c1",
        "chain cleaner",
        "150ml chain cleaner",
        "motorcycle chain care",
        "bike maintenance"
    ]
},

{
    id: 26,
    sku: "MT-ACC-026",
    category: CATEGORY.ACCESSORIES,
    brand: "Motul",
    name: "Motul Chain Lube C2",
    image: "/images/motul-chain-lube-c2.webp",
    price: "Starting from ₹265*",
    actualPrice: 265,
    displayOrder: 26,
    variants: "150ml | Available in Qty",
    description: "High-performance motorcycle chain lubricant designed to reduce friction, resist water and dust, and extend chain life for everyday riding, touring and high-speed performance.",
    badges: [
        "150ml",
        "Available in Qty",
        "Chain Care"
    ],
    search: [
        "motul",
        "motul chain lube c2",
        "chain lube",
        "150ml chain lube",
        "motorcycle chain lubricant",
        "bike maintenance"
    ]
},

{
    id: 27,
    sku: "MT-ACC-027",
    category: CATEGORY.ACCESSORIES,
    brand: "",
    name: "Night Vision Eyeglasses Combo",
    image: "/images/night-vision-eyeglasses-combo.webp",
    price: "Starting from ₹299*",
    actualPrice: 299,
    displayOrder: 27,
    variants: "Yellow & Clear",
    description: "Night vision eyeglasses combo with yellow and clear lenses designed to improve visibility, reduce glare and enhance riding comfort during day and night motorcycle rides.",
    badges: [
        "Yellow & Clear",
        "Anti-Glare",
        "Riding Essential"
    ],
    search: [
        "night vision eyeglasses",
        "night riding glasses",
        "yellow riding glasses",
        "anti glare glasses",
        "motorcycle riding glasses",
        "night vision combo"
    ]
},

{
    id: 28,
    sku: "MT-ACC-028",
    category: CATEGORY.ACCESSORIES,
    brand: "",
    name: "Phone Holder Generic",
    image: "/images/phone-holder-generic.webp",
    price: "Starting from ₹199*",
    actualPrice: 199,
    displayOrder: 28,
    variants: "",
    description: "Universal motorcycle phone holder designed to securely hold smartphones during commuting, touring and navigation, offering a stable and convenient riding experience.",
    badges: [
        "Universal Fit",
        "Secure Grip",
        "Easy Installation"
    ],
    search: [
        "phone holder",
        "generic phone holder",
        "motorcycle mobile holder",
        "bike phone mount",
        "universal phone holder",
        "motorcycle accessories"
    ]
},

{
    id: 29,
    sku: "MT-ACC-029",
    category: CATEGORY.ACCESSORIES,
    brand: "",
    name: "PS Keytag",
    image: "/images/ps-keytag.webp",
    price: "Starting from ₹99*",
    actualPrice: 99,
    displayOrder: 29,
    variants: "",
    description: "Premium motorcycle-themed keytag designed to keep your keys organised while adding a stylish touch to your everyday riding essentials.",
    badges: [
        "Premium Finish",
        "Lightweight",
        "Everyday Carry"
    ],
    search: [
        "ps keytag",
        "motorcycle keytag",
        "bike keychain",
        "key holder",
        "rider accessories",
        "key tag"
    ]
},

{
    id: 30,
    sku: "MT-ACC-030",
    category: CATEGORY.ACCESSORIES,
    brand: "",
    name: "PS Sticker",
    image: "/images/ps-sticker.webp",
    price: "Starting from ₹49*",
    actualPrice: 49,
    displayOrder: 30,
    variants: "",
    description: "Premium quality motorcycle sticker suitable for helmets, motorcycles, luggage boxes, laptops and other riding accessories with a durable, long-lasting finish.",
    badges: [
        "Premium Print",
        "Weather Resistant",
        "Easy Application"
    ],
    search: [
        "ps sticker",
        "motorcycle sticker",
        "bike sticker",
        "helmet sticker",
        "vinyl sticker",
        "rider accessories"
    ]
},

{
    id: 31,
    sku: "MT-GLV-001",
    category: CATEGORY.GLOVES,
    brand: "Scala",
    name: "Scala Air Gloves 2.0",
    image: "/images/scala-air-gloves-2-0.webp",
    price: "Starting from ₹1,899*",
    actualPrice: 1899,
    displayOrder: 31,
    variants: "Colours & Sizes Available",
    description: "Lightweight full-finger riding gloves designed for superior comfort, airflow and grip during daily commuting, touring and adventure rides. Built to provide protection without compromising flexibility.",
    badges: [
        "Colours Available",
        "Sizes Available",
        "Breathable"
    ],
    search: [
        "scala",
        "scala air gloves 2.0",
        "riding gloves",
        "motorcycle gloves",
        "bike gloves",
        "protective gloves"
    ]
},

{
    id: 32,
    sku: "MT-ACC-031",
    category: CATEGORY.ACCESSORIES,
    brand: "Scala",
    name: "Scala Air-X Arm Sleeves",
    image: "/images/scala-air-x-arm-sleeves.webp",
    price: "Starting from ₹449*",
    actualPrice: 449,
    displayOrder: 32,
    variants: "Colours & Sizes Available",
    description: "Premium stretch-fit arm sleeves designed to provide UV protection, improved comfort and moisture management for riders during daily commutes, touring and outdoor adventures.",
    badges: [
        "Colours Available",
        "Sizes Available",
        "UV Protection"
    ],
    search: [
        "scala",
        "scala air x arm sleeves",
        "arm sleeves",
        "uv sleeves",
        "riding sleeves",
        "motorcycle accessories"
    ]
},

{
    id: 33,
    sku: "MT-ACC-032",
    category: CATEGORY.ACCESSORIES,
    brand: "Scala",
    name: "Scala Air-X Balaclava",
    image: "/images/scala-air-x-balaclava.webp",
    price: "Starting from ₹349*",
    actualPrice: 349,
    displayOrder: 33,
    variants: "Colours & Sizes Available",
    description: "Breathable riding balaclava designed to wick away moisture, improve helmet comfort and provide a comfortable riding experience in all weather conditions.",
    badges: [
        "Colours Available",
        "Sizes Available",
        "Breathable"
    ],
    search: [
        "scala",
        "scala air x balaclava",
        "balaclava",
        "helmet liner",
        "riding balaclava",
        "motorcycle accessories"
    ]
},

{
    id: 34,
    sku: "MT-RNW-001",
    category: CATEGORY.RAINWEAR,
    brand: "Scala",
    name: "Scala Hydraseal Rain Jacket",
    image: "/images/scala-hydraseal-rain-jacket.webp",
    price: "Starting from ₹1,199*",
    actualPrice: 1199,
    displayOrder: 34,
    variants: "Colours & Sizes Available",
    description: "Waterproof riding rain jacket designed to keep riders dry and comfortable during heavy rain, highway touring and long-distance motorcycle rides while allowing easy packing when not in use.",
    badges: [
        "Colours Available",
        "Sizes Available",
        "Waterproof"
    ],
    search: [
        "scala",
        "scala hydraseal rain jacket",
        "motorcycle rain jacket",
        "waterproof riding jacket",
        "bike rainwear",
        "riding rain gear"
    ]
},

{
    id: 35,
    sku: "MT-RNW-002",
    category: CATEGORY.RAINWEAR,
    brand: "Scala",
    name: "Scala Hydraseal Rain Pant",
    image: "/images/scala-hydraseal-rain-pant.webp",
    price: "Starting from ₹1,199*",
    actualPrice: 1199,
    displayOrder: 35,
    variants: "Colours & Sizes Available",
    description: "Waterproof riding rain pant designed to provide reliable protection against rain and wind, ensuring comfort during daily commutes, touring and long-distance motorcycle rides.",
    badges: [
        "Colours Available",
        "Sizes Available",
        "Waterproof"
    ],
    search: [
        "scala",
        "scala hydraseal rain pant",
        "motorcycle rain pant",
        "waterproof riding pant",
        "bike rainwear",
        "riding rain gear"
    ]
},

{
    id: 36,
    sku: "MT-ACC-033",
    category: CATEGORY.ACCESSORIES,
    brand: "",
    name: "Small Premium Micro Fiber Cloth 200 GSM",
    image: "/images/small-premium-micro-fiber-cloth-200-gsm.webp",
    price: "Starting from ₹99*",
    actualPrice: 99,
    displayOrder: 36,
    variants: "1x1 ft",
    description: "Premium 200 GSM microfiber cloth designed for safely cleaning motorcycles, helmets, visors and riding gear. Soft, highly absorbent and scratch-free, making it ideal for everyday bike care and detailing.",
    badges: [
        "200 GSM",
        "1x1 ft",
        "Scratch Free"
    ],
    search: [
        "small premium microfiber cloth",
        "200 gsm microfiber cloth",
        "bike cleaning cloth",
        "motorcycle microfiber",
        "helmet cleaning cloth",
        "bike care"
    ]
},

{
    id: 37,
    sku: "MT-ACC-034",
    category: CATEGORY.ACCESSORIES,
    brand: "Steelbird",
    name: "Steelbird Air SBA20 - Black Visor",
    image: "/images/steelbird-air-sba20-black-visor.webp",
    price: "Starting from ₹399*",
    actualPrice: 399,
    displayOrder: 37,
    variants: "Colours Available",
    description: "Genuine replacement black visor designed for compatible Steelbird Air SBA20 helmets, offering clear visibility, smooth operation and a stylish premium look.",
    badges: [
        "Colours Available",
        "Genuine Product",
        "Easy Replacement"
    ],
    search: [
        "steelbird",
        "steelbird sba20 visor",
        "black visor",
        "helmet visor",
        "steelbird visor",
        "helmet accessories"
    ]
},

{
    id: 38,
    sku: "MT-ACC-035",
    category: CATEGORY.ACCESSORIES,
    brand: "Studds",
    name: "Studds Balaclava",
    image: "/images/studds-balaclava.webp",
    price: "Starting from ₹295*",
    actualPrice: 295,
    displayOrder: 38,
    variants: "Colours Available",
    description: "Comfortable and breathable riding balaclava designed to absorb sweat, improve helmet comfort and provide a fresh riding experience during daily commutes and long-distance touring.",
    badges: [
        "Colours Available",
        "Breathable",
        "Helmet Friendly"
    ],
    search: [
        "studds",
        "studds balaclava",
        "balaclava",
        "helmet liner",
        "riding balaclava",
        "motorcycle accessories"
    ]
},

{
    id: 39,
    sku: "MT-ACC-036",
    category: CATEGORY.ACCESSORIES,
    brand: "Studds",
    name: "Studds Visor - Chrome Clear",
    image: "/images/studds-visor-chrome-clear.webp",
    price: "Starting from ₹210*",
    actualPrice: 210,
    displayOrder: 39,
    variants: "",
    description: "Genuine replacement visor for compatible Studds helmets, providing excellent optical clarity, reliable fit and smooth operation for safer everyday riding.",
    badges: [
        "Genuine Product",
        "Clear Vision",
        "Easy Replacement"
    ],
    search: [
        "studds",
        "studds visor",
        "chrome clear visor",
        "helmet visor",
        "replacement visor",
        "helmet accessories"
    ]
},

{
    id: 40,
    sku: "MT-ACC-037",
    category: CATEGORY.ACCESSORIES,
    brand: "Studds",
    name: "Studds Visor - Ninja Elite Clear",
    image: "/images/studds-visor-ninja-elite-clear.webp",
    price: "Starting from ₹210*",
    actualPrice: 210,
    displayOrder: 40,
    variants: "",
    description: "Original clear replacement visor for compatible Studds Ninja Elite helmets, designed to provide distortion-free visibility and dependable performance for everyday riders.",
    badges: [
        "Genuine Product",
        "Clear Vision",
        "Easy Replacement"
    ],
    search: [
        "studds",
        "studds ninja elite visor",
        "ninja elite visor",
        "helmet visor",
        "replacement visor",
        "helmet accessories"
    ]
},

{
    id: 41,
    sku: "MT-ACC-038",
    category: CATEGORY.ACCESSORIES,
    brand: "Studds",
    name: "Studds Visor - Thunder Clear",
    image: "/images/studds-visor-thunder-clear.webp",
    price: "Starting from ₹225*",
    actualPrice: 225,
    displayOrder: 41,
    variants: "",
    description: "Genuine clear replacement visor designed for compatible Studds Thunder helmets, providing excellent visibility, reliable fit and smooth operation for safer everyday riding.",
    badges: [
        "Genuine Product",
        "Clear Vision",
        "Easy Replacement"
    ],
    search: [
        "studds",
        "studds thunder visor",
        "thunder clear visor",
        "helmet visor",
        "replacement visor",
        "helmet accessories"
    ]
},

{
    id: 42,
    sku: "MT-ACC-039",
    category: CATEGORY.ACCESSORIES,
    brand: "Vega",
    name: "Vega Sweat Cap",
    image: "/images/vega-sweat-cap.webp",
    price: "Starting from ₹69*",
    actualPrice: 69,
    displayOrder: 42,
    variants: "",
    description: "Lightweight and breathable sweat cap designed to absorb perspiration, improve helmet comfort and keep riders cool during daily commuting, touring and long-distance rides.",
    badges: [
        "Breathable",
        "Helmet Friendly",
        "Comfort Fit"
    ],
    search: [
        "vega",
        "vega sweat cap",
        "helmet sweat cap",
        "helmet liner",
        "riding cap",
        "motorcycle accessories"
    ]
},

{
    id: 43,
    sku: "MT-ACC-040",
    category: CATEGORY.ACCESSORIES,
    brand: "Volmax",
    name: "Volmax Chain Cleaner",
    image: "/images/volmax-chain-cleaner.webp",
    price: "Starting from ₹210*",
    actualPrice: 210,
    displayOrder: 43,
    variants: "200ml | Available in Qty",
    description: "High-performance motorcycle chain cleaner formulated to remove grease, dirt and old lubricant, helping prepare the chain for fresh lubrication and extending drivetrain life.",
    badges: [
        "200ml",
        "Available in Qty",
        "Chain Care"
    ],
    search: [
        "volmax",
        "volmax chain cleaner",
        "chain cleaner",
        "200ml chain cleaner",
        "motorcycle chain cleaner",
        "bike maintenance"
    ]
},

{
    id: 44,
    sku: "MT-ACC-041",
    category: CATEGORY.ACCESSORIES,
    brand: "Volmax",
    name: "Volmax Synthetic Chain Lube",
    image: "/images/volmax-synthetic-chain-lube.webp",
    price: "Starting from ₹250*",
    actualPrice: 250,
    displayOrder: 44,
    variants: "200ml | Available in Qty",
    description: "Premium synthetic motorcycle chain lubricant designed to reduce friction, protect against corrosion and deliver smooth, long-lasting chain performance in all riding conditions.",
    badges: [
        "200ml",
        "Available in Qty",
        "Chain Care"
    ],
    search: [
        "volmax",
        "volmax synthetic chain lube",
        "chain lube",
        "200ml chain lubricant",
        "motorcycle chain lube",
        "bike maintenance"
    ]
},

{
    id: 45,
    sku: "MT-ACC-042",
    category: CATEGORY.ACCESSORIES,
    brand: "Wruth",
    name: "Wruth Helmet & Visor Cleaner",
    image: "/images/wruth-helmet-visor-cleaner.webp",
    price: "Starting from ₹325*",
    actualPrice: 325,
    displayOrder: 45,
    variants: "150ml | Available in Qty",
    description: "Helmet and visor cleaner specially formulated to remove dust, bugs, fingerprints and road grime while leaving a crystal-clear, streak-free finish for improved riding visibility.",
    badges: [
        "150ml",
        "Available in Qty",
        "Helmet Care"
    ],
    search: [
        "wruth",
        "wruth helmet visor cleaner",
        "helmet cleaner",
        "visor cleaner",
        "150ml cleaner",
        "motorcycle accessories"
    ]
},

{
    id: 46,
    sku: "MT-BOT-001",
    category: CATEGORY.BOOTS,
    brand: "Raida",
    name: "Raida Discover Boots",
    image: "/images/raida-discover-boots.webp",
    price: "Starting from ₹5,850*",
    actualPrice: 5850,
    displayOrder: 46,
    variants: "Colours & Sizes Available",
    description: "Premium motorcycle touring boots designed to provide excellent protection, comfort and grip for daily commuting, long-distance touring and adventure riding in varying weather conditions.",
    badges: [
        "Colours Available",
        "Sizes Available",
        "Touring Ready"
    ],
    search: [
        "raida",
        "raida discover boots",
        "motorcycle boots",
        "riding boots",
        "touring boots",
        "bike riding boots"
    ]
},

{
    id: 47,
    sku: "MT-BOT-002",
    category: CATEGORY.BOOTS,
    brand: "Raida",
    name: "Raida UrbanR Boots",
    image: "/images/raida-urbanr-boots.webp",
    price: "Starting from ₹6,999*",
    actualPrice: 6999,
    displayOrder: 47,
    variants: "Colours & Sizes Available",
    description: "Stylish protective riding boots offering superior comfort, durability and grip for urban commuting, weekend rides and long-distance motorcycle touring.",
    badges: [
        "Colours Available",
        "Sizes Available",
        "Protective Design"
    ],
    search: [
        "raida",
        "raida urbanr boots",
        "motorcycle boots",
        "riding boots",
        "urban riding boots",
        "bike boots"
    ]
},

{
    id: 48,
    sku: "MT-BOT-003",
    category: CATEGORY.BOOTS,
    brand: "TR",
    name: "TR Tiger T3 Boots (Black Neon-Green)",
    image: "/images/tr-tiger-t3-boots-black-neon-green.webp",
    price: "Starting from ₹16,400*",
    actualPrice: 16400,
    displayOrder: 48,
    variants: "Colours & Sizes Available",
    description: "Premium adventure motorcycle boots engineered for maximum protection, comfort and stability, making them ideal for touring, off-road riding and demanding riding conditions.",
    badges: [
        "Colours Available",
        "Sizes Available",
        "Adventure Ready"
    ],
    search: [
        "tr",
        "tr tiger t3 boots",
        "adventure boots",
        "motorcycle boots",
        "riding boots",
        "touring boots"
    ]
},

{
    id: 49,
    sku: "MT-ACC-043",
    category: CATEGORY.ACCESSORIES,
    brand: "HJG",
    name: "HJG Guard/Fork Clamps Universal",
    image: "/images/hjg-guard-fork-clamps-universal.webp",
    price: "Starting from ₹849*",
    actualPrice: 849,
    displayOrder: 49,
    variants: "",
    description: "Heavy-duty universal guard and fork clamps designed for securely mounting auxiliary lights on motorcycles. Precision-built for durability, stability and hassle-free installation.",
    badges: [
        "Universal Fit",
        "Heavy Duty",
        "Easy Installation"
    ],
    search: [
        "hjg",
        "guard fork clamps",
        "hjg fork clamps",
        "motorcycle fork clamp",
        "fog light clamp",
        "auxiliary light mount"
    ]
},

{
    id: 50,
    sku: "MT-ACC-044",
    category: CATEGORY.ACCESSORIES,
    brand: "Moto Genius",
    name: "Moto Genius VK350 Mini Dual Color LED Fog Light Kit",
    image: "/images/moto-genius-vk350-mini-dual-color-led-fog-light-kit.webp",
    price: "Starting from ₹3,299*",
    actualPrice: 3299,
    displayOrder: 50,
    variants: "Wiring Harness Included",
    description: "Compact dual-colour LED fog light kit delivering powerful white and yellow illumination for enhanced visibility during night rides, touring and adverse weather conditions. Includes a complete wiring harness for easy installation.",
    badges: [
        "Dual Colour",
        "Wiring Harness Included",
        "High Brightness"
    ],
    search: [
        "moto genius",
        "vk350",
        "mini dual color fog light",
        "led fog light kit",
        "motorcycle auxiliary light",
        "fog light with wiring harness"
    ]
},

{
    id: 51,
    sku: "MT-GLV-002",
    category: CATEGORY.GLOVES,
    brand: "Raida",
    name: "Raida Airwave Gloves Hi Viz Small",
    image: "/images/raida-airwave-gloves-hi-viz-small.webp",
    price: "Starting from ₹3,649*",
    actualPrice: 3649,
    displayOrder: 51,
    variants: "Colours & Sizes Available",
    description: "Lightweight riding gloves designed for superior airflow, comfort and protection. Ideal for daily commuting, touring and warm-weather motorcycle rides with enhanced visibility.",
    badges: [
        "Colours Available",
        "Sizes Available",
        "High Visibility"
    ],
    search: [
        "raida",
        "raida airwave gloves",
        "airwave gloves hi viz",
        "motorcycle gloves",
        "riding gloves",
        "bike gloves"
    ]
},

{
    id: 52,
    sku: "MT-GLV-003",
    category: CATEGORY.GLOVES,
    brand: "Raida",
    name: "Raida Carbonite Gloves",
    image: "/images/raida-carbonite-gloves.webp",
    price: "Starting from ₹3,150*",
    actualPrice: 3150,
    displayOrder: 52,
    variants: "Colours & Sizes Available",
    description: "Protective motorcycle riding gloves built with comfort, grip and impact protection for confident riding during city commutes, highway touring and weekend adventures.",
    badges: [
        "Colours Available",
        "Sizes Available",
        "Protective Design"
    ],
    search: [
        "raida",
        "raida carbonite gloves",
        "motorcycle gloves",
        "riding gloves",
        "bike gloves",
        "protective gloves"
    ]
},

{
    id: 53,
    sku: "MT-GLV-004",
    category: CATEGORY.GLOVES,
    brand: "Raida",
    name: "Raida Drift EVO Gloves",
    image: "/images/raida-drift-evo-gloves.webp",
    price: "Starting from ₹5,850*",
    actualPrice: 5850,
    displayOrder: 53,
    variants: "Colours & Sizes Available",
    description: "Premium riding gloves engineered for maximum comfort, ventilation and protection, making them suitable for spirited rides, touring and long-distance motorcycle journeys.",
    badges: [
        "Colours Available",
        "Sizes Available",
        "Premium Protection"
    ],
    search: [
        "raida",
        "raida drift evo gloves",
        "drift evo gloves",
        "motorcycle gloves",
        "riding gloves",
        "bike gloves"
    ]
},

{
    id: 54,
    sku: "MT-GLV-005",
    category: CATEGORY.GLOVES,
    brand: "Raida",
    name: "Raida Drift Gloves HI VIz",
    image: "/images/raida-drift-gloves-hi-viz.webp",
    price: "Starting from ₹2,899*",
    actualPrice: 2899,
    displayOrder: 54,
    variants: "Colours & Sizes Available",
    description: "Comfortable high-visibility riding gloves offering excellent grip, flexibility and protection for everyday commuting, touring and highway riding in varying light conditions.",
    badges: [
        "Colours Available",
        "Sizes Available",
        "High Visibility"
    ],
    search: [
        "raida",
        "raida drift gloves",
        "hi viz gloves",
        "motorcycle gloves",
        "riding gloves",
        "bike gloves"
    ]
},

{
    id: 55,
    sku: "MT-ACC-045",
    category: CATEGORY.ACCESSORIES,
    brand: "Scala",
    name: "Scala FLEX Kneepads",
    image: "/images/scala-flex-kneepads.webp",
    price: "Starting from ₹3,599*",
    actualPrice: 3599,
    displayOrder: 55,
    variants: "",
    description: "Ergonomically designed motorcycle knee protectors offering enhanced impact protection, flexibility and all-day comfort for touring, adventure riding and everyday commuting.",
    badges: [
        "Impact Protection",
        "Ergonomic Design",
        "Comfort Fit"
    ],
    search: [
        "scala",
        "scala flex kneepads",
        "motorcycle knee pads",
        "riding knee guards",
        "bike protection gear",
        "knee protectors"
    ]
},

{
    id: 56,
    sku: "MT-GLV-006",
    category: CATEGORY.GLOVES,
    brand: "Steelbird",
    name: "Steelbird Full Gloves",
    image: "/images/steelbird-full-gloves.webp",
    price: "Starting from ₹599*",
    actualPrice: 599,
    displayOrder: 56,
    variants: "Colours Available",
    description: "Comfortable full-finger motorcycle riding gloves designed to provide reliable grip, protection and ventilation for daily commuting, touring and weekend rides.",
    badges: [
        "Colours Available",
        "Full Finger",
        "Comfort Fit"
    ],
    search: [
        "steelbird",
        "steelbird full gloves",
        "motorcycle gloves",
        "riding gloves",
        "bike gloves",
        "full finger gloves"
    ]
},

{
    id: 57,
    sku: "MT-GLV-007",
    category: CATEGORY.GLOVES,
    brand: "Studds",
    name: "Studds Riding Gloves SMG2",
    image: "/images/studds-riding-gloves-smg2.webp",
    price: "Starting from ₹725*",
    actualPrice: 725,
    displayOrder: 57,
    variants: "Colours Available",
    description: "Protective motorcycle riding gloves offering enhanced grip, comfort and ventilation for everyday commuting, touring and long-distance motorcycle rides.",
    badges: [
        "Colours Available",
        "Protective Design",
        "Comfort Fit"
    ],
    search: [
        "studds",
        "studds riding gloves smg2",
        "smg2 gloves",
        "motorcycle gloves",
        "riding gloves",
        "bike gloves"
    ]
},

{
    id: 58,
    sku: "MT-JKT-001",
    category: CATEGORY.JACKET,
    brand: "Raida",
    name: "Raida Tourer Jacket",
    image: "/images/raida-tourer-jacket.webp",
    price: "Starting from ₹4,950*",
    actualPrice: 4950,
    displayOrder: 58,
    variants: "Colours & Sizes Available",
    description: "Premium motorcycle touring jacket offering superior protection, ventilation and all-day comfort for city rides, highway touring and long-distance adventures in varying weather conditions.",
    badges: [
        "Colours Available",
        "Sizes Available",
        "CE Protection"
    ],
    search: [
        "raida",
        "raida tourer jacket",
        "motorcycle jacket",
        "riding jacket",
        "touring jacket",
        "bike riding jacket"
    ]
},

{
    id: 59,
    sku: "MT-JKT-002",
    category: CATEGORY.JACKET,
    brand: "Scala",
    name: "Scala Blaze Riding Jacket",
    image: "/images/scala-blaze-riding-jacket.webp",
    price: "Starting from ₹4,849*",
    actualPrice: 4849,
    displayOrder: 59,
    variants: "Colours & Sizes Available",
    description: "Versatile motorcycle riding jacket designed to deliver excellent comfort, airflow and rider protection for daily commuting, weekend rides and long-distance touring.",
    badges: [
        "Colours Available",
        "Sizes Available",
        "Protective Design"
    ],
    search: [
        "scala",
        "scala blaze riding jacket",
        "motorcycle jacket",
        "riding jacket",
        "bike jacket",
        "touring jacket"
    ]
},

{
    id: 60,
    sku: "MT-JKT-003",
    category: CATEGORY.JACKET,
    brand: "Scala",
    name: "Scala Viper Riding Jacket",
    image: "/images/scala-viper-riding-jacket.webp",
    price: "Starting from ₹6,349*",
    actualPrice: 6349,
    displayOrder: 60,
    variants: "Colours & Sizes Available",
    description: "Premium motorcycle riding jacket engineered for enhanced protection, ventilation and comfort, making it ideal for touring, highway rides and everyday motorcycle adventures.",
    badges: [
        "Colours Available",
        "Sizes Available",
        "Premium Protection"
    ],
    search: [
        "scala",
        "scala viper riding jacket",
        "motorcycle jacket",
        "riding jacket",
        "touring jacket",
        "bike riding jacket"
    ]
},

{
    id: 61,
    sku: "MT-PNT-001",
    category: CATEGORY.PANTS,
    brand: "Raida",
    name: "Raida Rover Pants",
    image: "/images/raida-rover-pants.webp",
    price: "Starting from ₹7,250*",
    actualPrice: 7250,
    displayOrder: 61,
    variants: "Colours & Sizes Available",
    description: "Premium motorcycle riding pants designed for touring and adventure riding, offering superior comfort, protection and ventilation for long-distance journeys and everyday rides.",
    badges: [
        "Colours Available",
        "Sizes Available",
        "CE Protection"
    ],
    search: [
        "raida",
        "raida rover pants",
        "riding pants",
        "motorcycle riding pants",
        "touring pants",
        "bike riding gear"
    ]
},

{
    id: 62,
    sku: "MT-PNT-002",
    category: CATEGORY.PANTS,
    brand: "Scala",
    name: "Scala Blaze Riding Pant",
    image: "/images/scala-blaze-riding-pant.webp",
    price: "Starting from ₹5,899*",
    actualPrice: 5899,
    displayOrder: 62,
    variants: "Colours & Sizes Available",
    description: "Comfortable and protective motorcycle riding pants built for daily rides, touring and long-distance adventures, offering excellent flexibility, ventilation and impact protection.",
    badges: [
        "Colours Available",
        "Sizes Available",
        "Protective Design"
    ],
    search: [
        "scala",
        "scala blaze riding pant",
        "riding pant",
        "motorcycle riding pants",
        "touring pants",
        "bike riding gear"
    ]
},

{
    id: 63,
    sku: "MT-LUG-001",
    category: CATEGORY.LUGGAGE,
    brand: "Guardian Gears",
    name: "GG Buddy Single Side Canvas Bags with Waterproof Rain Cover",
    image: "/images/gg-buddy-single-side-canvas-bags-with-waterproof-rain-cover.webp",
    price: "Starting from ₹1,399*",
    actualPrice: 1399,
    displayOrder: 63,
    variants: "20 Litres | Waterproof Rain Cover",
    description: "Durable single-side canvas motorcycle luggage bag with a waterproof rain cover, ideal for daily commuting, touring and carrying riding essentials with confidence.",
    badges: [
        "20 Litres",
        "Rain Cover Included",
        "Canvas Construction"
    ],
    search: [
        "guardian gears",
        "gg buddy",
        "single side canvas bag",
        "motorcycle luggage",
        "bike saddle bag",
        "waterproof rain cover"
    ]
},

{
    id: 64,
    sku: "MT-LUG-002",
    category: CATEGORY.LUGGAGE,
    brand: "Guardian Gears",
    name: "GG Cliff Backrest Bag",
    image: "/images/gg-cliff-backrest-bag.webp",
    price: "Starting from ₹799*",
    actualPrice: 799,
    displayOrder: 64,
    variants: "",
    description: "Compact motorcycle backrest bag designed to carry everyday essentials securely while providing convenient storage for commuting, weekend rides and touring.",
    badges: [
        "Compact Design",
        "Easy Mount",
        "Travel Ready"
    ],
    search: [
        "guardian gears",
        "gg cliff",
        "backrest bag",
        "motorcycle backrest bag",
        "bike luggage",
        "touring bag"
    ]
},

{
    id: 65,
    sku: "MT-LUG-003",
    category: CATEGORY.LUGGAGE,
    brand: "Guardian Gears",
    name: "GG Jaws Mini Magnetic Tank Bag",
    image: "/images/gg-jaws-mini-magnetic-tank-bag.webp",
    price: "Starting from ₹2,499*",
    actualPrice: 2499,
    displayOrder: 65,
    variants: "18 Litres | Waterproof Rain Cover",
    description: "Magnetic motorcycle tank bag with 18-litre storage capacity and waterproof rain cover, offering quick access to essentials while touring, commuting and weekend riding.",
    badges: [
        "18 Litres",
        "Magnetic Mount",
        "Rain Cover Included"
    ],
    search: [
        "guardian gears",
        "gg jaws",
        "magnetic tank bag",
        "18 litre tank bag",
        "motorcycle tank bag",
        "bike luggage"
    ]
},

{
    id: 66,
    sku: "MT-LUG-004",
    category: CATEGORY.LUGGAGE,
    brand: "Guardian Gears",
    name: "GG Rhino Tail Bag",
    image: "/images/gg-rhino-tail-bag.webp",
    price: "Starting from ₹3,799*",
    actualPrice: 3799,
    displayOrder: 66,
    variants: "Waterproof Rain Cover",
    description: "Spacious motorcycle tail bag designed for touring and long-distance rides. Securely mounts to the pillion seat and comes with a waterproof rain cover to protect your belongings in all weather conditions.",
    badges: [
        "Tail Bag",
        "Rain Cover Included",
        "Touring Ready"
    ],
    search: [
        "guardian gears",
        "gg rhino tail bag",
        "motorcycle tail bag",
        "bike luggage",
        "touring tail bag",
        "waterproof rain cover"
    ]
},

{
    id: 67,
    sku: "MT-LUG-005",
    category: CATEGORY.LUGGAGE,
    brand: "Guardian Gears",
    name: "GG Shark Mini Universal Tank Bag",
    image: "/images/gg-shark-mini-universal-tank-bag.webp",
    price: "Starting from ₹2,199*",
    actualPrice: 2199,
    displayOrder: 67,
    variants: "18 Litres | Waterproof Rain Cover",
    description: "Universal 18-litre motorcycle tank bag designed for convenient access to essentials during touring and everyday rides. Includes a waterproof rain cover for reliable weather protection.",
    badges: [
        "18 Litres",
        "Universal Fit",
        "Rain Cover Included"
    ],
    search: [
        "guardian gears",
        "gg shark tank bag",
        "universal tank bag",
        "18 litre tank bag",
        "motorcycle tank bag",
        "bike luggage"
    ]
},

{
    id: 68,
    sku: "MT-LUG-006",
    category: CATEGORY.LUGGAGE,
    brand: "Guardian Gears",
    name: "GG Sidekick Cruiser Saddlebag",
    image: "/images/gg-sidekick-cruiser-saddlebag.webp",
    price: "Starting from ₹2,999*",
    actualPrice: 2999,
    displayOrder: 68,
    variants: "50 Litres | Waterproof Rain Cover",
    description: "Large-capacity cruiser saddlebag offering 50 litres of storage for touring and long-distance rides. Built for durability and supplied with a waterproof rain cover for added protection.",
    badges: [
        "50 Litres",
        "Rain Cover Included",
        "Touring Ready"
    ],
    search: [
        "guardian gears",
        "gg sidekick cruiser saddlebag",
        "50 litre saddlebag",
        "motorcycle saddlebag",
        "bike luggage",
        "touring luggage"
    ]
},

{
    id: 69,
    sku: "MT-LUG-007",
    category: CATEGORY.LUGGAGE,
    brand: "Guardian Gears",
    name: "GG Sidekick Foldable Duffle Bag",
    image: "/images/gg-sidekick-foldable-duffle-bag.webp",
    price: "Starting from ₹345*",
    actualPrice: 345,
    displayOrder: 69,
    variants: "",
    description: "Lightweight foldable duffle bag that packs into a compact size when not in use. Ideal as an additional luggage solution for motorcycle touring, travel and everyday use.",
    badges: [
        "Foldable Design",
        "Lightweight",
        "Travel Ready"
    ],
    search: [
        "guardian gears",
        "gg sidekick duffle bag",
        "foldable duffle bag",
        "travel bag",
        "motorcycle luggage",
        "bike touring bag"
    ]
},

{
    id: 70,
    sku: "MT-LUG-008",
    category: CATEGORY.LUGGAGE,
    brand: "Guardian Gears",
    name: "GG SideKick Magnetic Tank Bag",
    image: "/images/gg-sidekick-magnetic-tank-bag.webp",
    price: "Starting from ₹2,199*",
    actualPrice: 2199,
    displayOrder: 70,
    variants: "15 Litres | Waterproof Rain Cover",
    description: "15-litre magnetic motorcycle tank bag offering quick access to essentials while riding. Secure magnetic mounting and an included waterproof rain cover make it ideal for touring and daily commutes.",
    badges: [
        "15 Litres",
        "Magnetic Mount",
        "Rain Cover Included"
    ],
    search: [
        "guardian gears",
        "gg sidekick magnetic tank bag",
        "15 litre tank bag",
        "magnetic tank bag",
        "motorcycle tank bag",
        "bike luggage"
    ]
},

{
    id: 71,
    sku: "MT-LUG-009",
    category: CATEGORY.LUGGAGE,
    brand: "Guardian Gears",
    name: "GG Sidekick Sports Saddlebag",
    image: "/images/gg-sidekick-sports-saddlebag.webp",
    price: "Starting from ₹2,999*",
    actualPrice: 2999,
    displayOrder: 71,
    variants: "45 Litres | Waterproof Rain Cover",
    description: "Spacious 45-litre motorcycle saddlebag designed for touring and long-distance rides. Offers secure luggage storage and includes a waterproof rain cover to protect your belongings in changing weather conditions.",
    badges: [
        "45 Litres",
        "Rain Cover Included",
        "Touring Ready"
    ],
    search: [
        "guardian gears",
        "gg sidekick sports saddlebag",
        "45 litre saddlebag",
        "motorcycle saddlebag",
        "bike luggage",
        "touring luggage"
    ]
},

{
    id: 72,
    sku: "MT-LUG-010",
    category: CATEGORY.LUGGAGE,
    brand: "Guardian Gears",
    name: "GG SideKick Universal 15Ltrs Tank Bag",
    image: "/images/gg-sidekick-universal-15ltrs-tank-bag.webp",
    price: "Starting from ₹1,599*",
    actualPrice: 1599,
    displayOrder: 72,
    variants: "15 Litres | Waterproof Rain Cover",
    description: "Universal 15-litre motorcycle tank bag designed for everyday rides and touring. Provides quick access to essentials and includes a waterproof rain cover for added protection.",
    badges: [
        "15 Litres",
        "Universal Fit",
        "Rain Cover Included"
    ],
    search: [
        "guardian gears",
        "gg sidekick universal tank bag",
        "15 litre tank bag",
        "motorcycle tank bag",
        "bike luggage",
        "touring tank bag"
    ]
},

{
    id: 73,
    sku: "MT-LUG-011",
    category: CATEGORY.LUGGAGE,
    brand: "Guardian Gears",
    name: "GG Wolverine Magnetic Tank Pouch",
    image: "/images/gg-wolverine-magnetic-tank-pouch.webp",
    price: "Starting from ₹1,299*",
    actualPrice: 1299,
    displayOrder: 73,
    variants: "Waterproof Rain Cover",
    description: "Compact magnetic motorcycle tank pouch for carrying everyday essentials like wallet, keys and documents. Includes a waterproof rain cover for dependable protection during rides.",
    badges: [
        "Magnetic Mount",
        "Rain Cover Included",
        "Compact Design"
    ],
    search: [
        "guardian gears",
        "gg wolverine magnetic tank pouch",
        "magnetic tank pouch",
        "motorcycle tank pouch",
        "bike luggage",
        "tank bag"
    ]
},

{
    id: 74,
    sku: "MT-LUG-012",
    category: CATEGORY.LUGGAGE,
    brand: "Guardian Gears",
    name: "GG Wolverine Universal Tank Pouch",
    image: "/images/gg-wolverine-universal-tank-pouch.webp",
    price: "Starting from ₹599*",
    actualPrice: 599,
    displayOrder: 74,
    variants: "Waterproof Rain Cover",
    description: "Universal motorcycle tank pouch designed for convenient storage of small essentials during everyday rides and touring. Supplied with a waterproof rain cover for reliable weather protection.",
    badges: [
        "Universal Fit",
        "Rain Cover Included",
        "Compact Design"
    ],
    search: [
        "guardian gears",
        "gg wolverine universal tank pouch",
        "universal tank pouch",
        "motorcycle tank pouch",
        "bike luggage",
        "tank bag"
    ]
},

{
    id: 75,
    sku: "MT-LUG-013",
    category: CATEGORY.LUGGAGE,
    brand: "Scala",
    name: "Scala Veloqon - Mini Tank Bag",
    image: "/images/scala-veloqon-mini-tank-bag.webp",
    price: "Starting from ₹2,099*",
    actualPrice: 2099,
    displayOrder: 75,
    variants: "15 Litres | Available in Qty",
    description: "Premium 15-litre motorcycle tank bag designed for touring and everyday rides. Provides convenient storage for riding essentials with a compact, rider-friendly design and secure mounting.",
    badges: [
        "15 Litres",
        "Compact Design",
        "Touring Ready"
    ],
    search: [
        "scala",
        "scala veloqon",
        "mini tank bag",
        "15 litre tank bag",
        "motorcycle tank bag",
        "bike luggage"
    ]
},

{
    id: 76,
    sku: "MT-LUG-014",
    category: CATEGORY.LUGGAGE,
    brand: "Scala",
    name: "Scala Veloqon Plus - Tank Bag",
    image: "/images/scala-veloqon-plus-tank-bag.webp",
    price: "Starting from ₹3,099*",
    actualPrice: 3099,
    displayOrder: 76,
    variants: "28 Litres | Available in Qty",
    description: "Premium 28-litre motorcycle tank bag designed for touring and long-distance rides. Offers spacious storage, secure mounting and quick access to your riding essentials throughout the journey.",
    badges: [
        "28 Litres",
        "Touring Ready",
        "Spacious Storage"
    ],
    search: [
        "scala",
        "scala veloqon plus",
        "28 litre tank bag",
        "motorcycle tank bag",
        "bike luggage",
        "touring tank bag"
    ]
},

{
    id: 77,
    sku: "MT-ACC-046",
    category: CATEGORY.ACCESSORIES,
    brand: "Hacer",
    name: "Hacer Pure Butane Gas Can 225g",
    image: "/images/hacer-pure-butane-gas-can-225g.webp",
    price: "Starting from ₹200*",
    actualPrice: 200,
    displayOrder: 77,
    variants: "225g",
    description: "High-quality 225g pure butane gas can designed for portable camping stoves. Delivers clean and efficient fuel performance, making it ideal for motorcycle camping and outdoor adventures.",
    badges: [
        "225g",
        "Camping Essential",
        "Clean Burning"
    ],
    search: [
        "hacer",
        "pure butane gas can",
        "225g butane gas",
        "camping gas can",
        "portable stove fuel",
        "camping accessories"
    ]
},

{
    id: 78,
    sku: "MT-ACC-047",
    category: CATEGORY.ACCESSORIES,
    brand: "",
    name: "Mini Camping Stove",
    image: "/images/mini-camping-stove.webp",
    price: "Starting from ₹449*",
    actualPrice: 449,
    displayOrder: 78,
    variants: "",
    description: "Compact and lightweight portable camping stove designed for motorcycle touring, trekking and outdoor cooking. Easy to carry, quick to set up and ideal for adventure riders.",
    badges: [
        "Portable",
        "Lightweight",
        "Camping Essential"
    ],
    search: [
        "mini camping stove",
        "portable camping stove",
        "camping stove",
        "motorcycle camping",
        "outdoor stove",
        "touring accessories"
    ]
},

{
    id: 79,
    sku: "MT-HLM-001",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK Full Face Helmet Agnar Cyborg GL237",
    image: "/images/smk-full-face-helmet-agnar-cyborg-gl237.webp",
    price: "Starting from ₹5,900*",
    actualPrice: 5900,
    displayOrder: 79,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Premium SMK full-face motorcycle helmet offering advanced protection, excellent ventilation and superior comfort for city rides, highway touring and long-distance adventures.",
    badges: [
        "Sizes Available",
        "Gloss & Matt",
        "Full Face"
    ],
    search: [
        "smk",
        "agnar cyborg",
        "smk agnar",
        "full face helmet",
        "motorcycle helmet",
        "bike helmet"
    ]
},

{
    id: 80,
    sku: "MT-HLM-002",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK Full Face Helmet Agnar Unicolor GL100",
    image: "/images/smk-full-face-helmet-agnar-unicolor-gl100.webp",
    price: "Starting from ₹5,600*",
    actualPrice: 5600,
    displayOrder: 80,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Premium SMK full-face helmet featuring a clean unicolor design with excellent comfort, ventilation and reliable protection for daily commuting, touring and highway riding.",
    badges: [
        "Sizes Available",
        "Gloss & Matt",
        "Full Face"
    ],
    search: [
        "smk",
        "agnar unicolor",
        "smk agnar",
        "full face helmet",
        "motorcycle helmet",
        "bike helmet"
    ]
},

{
    id: 81,
    sku: "MT-HLM-003",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK Nova Super GL571",
    image: "/images/smk-nova-super-gl571.webp",
    price: "Starting from ₹4,500*",
    actualPrice: 4500,
    displayOrder: 81,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Premium SMK full-face helmet designed for everyday commuting, highway touring and weekend rides. Offers excellent ventilation, rider comfort and dependable protection with a stylish modern design.",
    badges: [
        "Sizes Available",
        "Gloss & Matt",
        "Full Face"
    ],
    search: [
        "smk",
        "nova super",
        "gl571",
        "smk nova super",
        "full face helmet",
        "motorcycle helmet"
    ]
},

{
    id: 82,
    sku: "MT-HLM-004",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK Retro Electro GL621",
    image: "/images/smk-retro-electro-gl621.webp",
    price: "Starting from ₹6,000*",
    actualPrice: 6000,
    displayOrder: 82,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Premium SMK retro-inspired full-face helmet combining classic styling with modern safety, comfort and ventilation for city rides, touring and everyday motorcycle adventures.",
    badges: [
        "Sizes Available",
        "Gloss & Matt",
        "Full Face"
    ],
    search: [
        "smk",
        "retro electro",
        "gl621",
        "smk retro helmet",
        "full face helmet",
        "motorcycle helmet"
    ]
},

{
    id: 83,
    sku: "MT-HLM-005",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK Stellar Sports Flight GL213",
    image: "/images/smk-stellar-sports-flight-gl213.webp",
    price: "Starting from ₹4,400*",
    actualPrice: 4400,
    displayOrder: 83,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Sporty SMK full-face helmet offering excellent ventilation, aerodynamic styling and dependable protection for daily commuting, highway touring and spirited weekend rides.",
    badges: [
        "Sizes Available",
        "Gloss & Matt",
        "Full Face"
    ],
    search: [
        "smk",
        "stellar sports flight",
        "gl213",
        "smk stellar",
        "full face helmet",
        "motorcycle helmet"
    ]
},

{
    id: 84,
    sku: "MT-HLM-006",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK Stellar Sports Fury GL266C",
    image: "/images/smk-stellar-sports-fury-gl266c.webp",
    price: "Starting from ₹4,400*",
    actualPrice: 4400,
    displayOrder: 84,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Performance-oriented SMK full-face helmet featuring an aggressive graphic design, efficient airflow and reliable protection for city rides, touring and highway cruising.",
    badges: [
        "Sizes Available",
        "Gloss & Matt",
        "Full Face"
    ],
    search: [
        "smk",
        "stellar sports fury",
        "gl266c",
        "smk stellar",
        "full face helmet",
        "motorcycle helmet"
    ]
},

{
    id: 85,
    sku: "MT-HLM-007",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK Stellar Sports K Power GL245",
    image: "/images/smk-stellar-sports-k-power-gl245.webp",
    price: "Starting from ₹4,400*",
    actualPrice: 4400,
    displayOrder: 85,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Premium SMK full-face helmet with dynamic styling, effective ventilation and all-day riding comfort, making it suitable for commuting, touring and long highway journeys.",
    badges: [
        "Sizes Available",
        "Gloss & Matt",
        "Full Face"
    ],
    search: [
        "smk",
        "stellar sports k power",
        "gl245",
        "smk stellar",
        "full face helmet",
        "motorcycle helmet"
    ]
},

{
    id: 86,
    sku: "MT-HLM-008",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK Stellar Sports GL200",
    image: "/images/smk-stellar-sports-gl200.webp",
    price: "Starting from ₹4,500*",
    actualPrice: 4500,
    displayOrder: 86,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Premium SMK full-face helmet featuring a clean unicolour design with excellent ventilation, rider comfort and dependable protection for daily commuting, touring and highway rides.",
    badges: [
        "Sizes Available",
        "Gloss & Matt",
        "Full Face"
    ],
    search: [
        "smk",
        "stellar sports",
        "gl200",
        "smk stellar sports",
        "full face helmet",
        "motorcycle helmet"
    ]
},

{
    id: 87,
    sku: "MT-HLM-009",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK Stellar Sports MA200",
    image: "/images/smk-stellar-sports-ma200.webp",
    price: "Starting from ₹4,100*",
    actualPrice: 4100,
    displayOrder: 87,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Premium SMK full-face helmet with a stylish matt finish, designed to provide superior comfort, ventilation and reliable protection for everyday riding and touring.",
    badges: [
        "Sizes Available",
        "Gloss & Matt",
        "Full Face"
    ],
    search: [
        "smk",
        "stellar sports",
        "ma200",
        "smk stellar sports",
        "full face helmet",
        "motorcycle helmet"
    ]
},

{
    id: 88,
    sku: "MT-HLM-010",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK Typhoon Azonix GL264",
    image: "/images/smk-typhoon-azonix-gl264.webp",
    price: "Starting from ₹5,500*",
    actualPrice: 5500,
    displayOrder: 88,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Premium SMK Typhoon full-face helmet with the Azonix graphic design, offering excellent comfort, ventilation and dependable protection for touring, highway riding and everyday commutes.",
    badges: [
        "Sizes Available",
        "Gloss & Matt",
        "Full Face"
    ],
    search: [
        "smk",
        "typhoon azonix",
        "gl264",
        "smk typhoon",
        "full face helmet",
        "motorcycle helmet"
    ]
},

{
    id: 89,
    sku: "MT-HLM-011",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK Typhoon Azonix MA264",
    image: "/images/smk-typhoon-azonix-ma264.webp",
    price: "Starting from ₹5,250*",
    actualPrice: 5250,
    displayOrder: 89,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Premium SMK Typhoon full-face helmet with the Azonix matt graphic finish, engineered for superior comfort, ventilation and rider protection during daily rides and long-distance touring.",
    badges: [
        "Sizes Available",
        "Gloss & Matt",
        "Full Face"
    ],
    search: [
        "smk",
        "typhoon azonix",
        "ma264",
        "smk typhoon",
        "full face helmet",
        "motorcycle helmet"
    ]
},

{
    id: 90,
    sku: "MT-HLM-012",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK Typhoon RD1 GL216",
    image: "/images/smk-typhoon-rd1-gl216.webp",
    price: "Starting from ₹5,250*",
    actualPrice: 5250,
    displayOrder: 90,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Premium SMK Typhoon full-face helmet featuring the RD1 graphic design, delivering outstanding ventilation, comfort and protection for touring, commuting and highway riding.",
    badges: [
        "Sizes Available",
        "Gloss & Matt",
        "Full Face"
    ],
    search: [
        "smk",
        "typhoon rd1",
        "gl216",
        "smk typhoon",
        "full face helmet",
        "motorcycle helmet"
    ]
},

{
    id: 919511901753,
    sku: "MT-HLM-013",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK Typhoon RD1 GL264",
    image: "/images/smk-typhoon-rd1-gl264.webp",
    price: "Starting from ₹5,250*",
    actualPrice: 5250,
    displayOrder: 919511901753,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Premium SMK Typhoon full-face helmet featuring the RD1 graphic design, engineered for superior protection, ventilation and comfort during daily commuting, highway touring and long-distance motorcycle rides.",
    badges: [
        "Sizes Available",
        "Gloss & Matt",
        "Full Face"
    ],
    search: [
        "smk",
        "typhoon rd1",
        "gl264",
        "smk typhoon",
        "full face helmet",
        "motorcycle helmet"
    ]
},

{
    id: 92,
    sku: "MT-HLM-014",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK Typhoon Rival GL213",
    image: "/images/smk-typhoon-rival-gl213.webp",
    price: "Starting from ₹5,500*",
    actualPrice: 5500,
    displayOrder: 92,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Premium SMK Typhoon full-face helmet featuring the Rival graphic design, offering excellent ventilation, comfort and dependable protection for city rides, touring and highway adventures.",
    badges: [
        "Sizes Available",
        "Gloss & Matt",
        "Full Face"
    ],
    search: [
        "smk",
        "typhoon rival",
        "gl213",
        "smk typhoon",
        "full face helmet",
        "motorcycle helmet"
    ]
},

{
    id: 93,
    sku: "MT-HLM-015",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK Typhoon Rival GL263",
    image: "/images/smk-typhoon-rival-gl263.webp",
    price: "Starting from ₹5,250*",
    actualPrice: 5250,
    displayOrder: 93,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Premium SMK Typhoon full-face helmet with the Rival graphic series, delivering reliable protection, superior comfort and efficient ventilation for everyday riding and long-distance touring.",
    badges: [
        "Sizes Available",
        "Gloss & Matt",
        "Full Face"
    ],
    search: [
        "smk",
        "typhoon rival",
        "gl263",
        "smk typhoon",
        "full face helmet",
        "motorcycle helmet"
    ]
},

{
    id: 94,
    sku: "MT-HLM-016",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK Typhoon Rival MA213",
    image: "/images/smk-typhoon-rival-ma213.webp",
    price: "Starting from ₹5,250*",
    actualPrice: 5250,
    displayOrder: 94,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Premium SMK Typhoon full-face helmet with the Rival matt graphic finish, designed to provide outstanding rider comfort, ventilation and dependable protection for touring and highway riding.",
    badges: [
        "Sizes Available",
        "Gloss & Matt",
        "Full Face"
    ],
    search: [
        "smk",
        "typhoon rival",
        "ma213",
        "smk typhoon",
        "full face helmet",
        "motorcycle helmet"
    ]
},

{
    id: 95,
    sku: "MT-HLM-017",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK Typhoon Sparko GL135",
    image: "/images/smk-typhoon-sparko-gl135.webp",
    price: "Starting from ₹5,250*",
    actualPrice: 5250,
    displayOrder: 95,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Premium SMK Typhoon full-face helmet featuring the Sparko graphic design, offering excellent ventilation, rider comfort and dependable protection for daily commuting, touring and highway rides.",
    badges: [
        "Sizes Available",
        "Gloss & Matt",
        "Full Face"
    ],
    search: [
        "smk",
        "typhoon sparko",
        "gl135",
        "smk typhoon",
        "full face helmet",
        "motorcycle helmet"
    ]
},

{
    id: 96,
    sku: "MT-HLM-018",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK Typhoon Sparko GL236",
    image: "/images/smk-typhoon-sparko-gl236.webp",
    price: "Starting from ₹5,250*",
    actualPrice: 5250,
    displayOrder: 96,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Premium SMK Typhoon full-face helmet with the Sparko graphic series, designed for superior comfort, efficient airflow and reliable protection during city rides, touring and long-distance travel.",
    badges: [
        "Sizes Available",
        "Gloss & Matt",
        "Full Face"
    ],
    search: [
        "smk",
        "typhoon sparko",
        "gl236",
        "smk typhoon",
        "full face helmet",
        "motorcycle helmet"
    ]
},

{
    id: 97,
    sku: "MT-HLM-019",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK Typhoon Sparko MA266",
    image: "/images/smk-typhoon-sparko-ma266.webp",
    price: "Starting from ₹5,250*",
    actualPrice: 5250,
    displayOrder: 97,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Premium SMK Typhoon full-face helmet with the Sparko matt graphic finish, engineered to provide excellent ventilation, all-day comfort and dependable protection for touring and highway riding.",
    badges: [
        "Sizes Available",
        "Gloss & Matt",
        "Full Face"
    ],
    search: [
        "smk",
        "typhoon sparko",
        "ma266",
        "smk typhoon",
        "full face helmet",
        "motorcycle helmet"
    ]
},

{
    id: 98,
    sku: "MT-HLM-020",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK Typhoon Sports Tourer GL534",
    image: "/images/smk-typhoon-sports-tourer-gl534.webp",
    price: "Starting from ₹5,250*",
    actualPrice: 5250,
    displayOrder: 98,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Premium SMK Typhoon full-face helmet featuring the Sports Tourer graphic design, delivering outstanding comfort, ventilation and protection for touring, highway riding and everyday use.",
    badges: [
        "Sizes Available",
        "Gloss & Matt",
        "Full Face"
    ],
    search: [
        "smk",
        "typhoon sports tourer",
        "gl534",
        "smk typhoon",
        "full face helmet",
        "motorcycle helmet"
    ]
},

{
    id: 99,
    sku: "MT-HLM-021",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK Typhoon Unicolour GL200",
    image: "/images/smk-typhoon-unicolour-gl200.webp",
    price: "Starting from ₹4,950*",
    actualPrice: 4950,
    displayOrder: 99,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Premium SMK Typhoon full-face helmet with a clean unicolour finish, designed to deliver superior comfort, ventilation and dependable protection for daily rides, touring and highway journeys.",
    badges: [
        "Sizes Available",
        "Gloss & Matt",
        "Full Face"
    ],
    search: [
        "smk",
        "typhoon unicolour",
        "gl200",
        "smk typhoon",
        "full face helmet",
        "motorcycle helmet"
    ]
},

{
    id: 100,
    sku: "MT-HLM-022",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK Typhoon Unicolour MA200",
    image: "/images/smk-typhoon-unicolour-ma200.webp",
    price: "Starting from ₹4,950*",
    actualPrice: 4950,
    displayOrder: 100,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Premium SMK Typhoon full-face helmet with a stylish matt unicolour finish, offering excellent ventilation, rider comfort and dependable protection for commuting, touring and highway rides.",
    badges: [
        "Sizes Available",
        "Gloss & Matt",
        "Full Face"
    ],
    search: [
        "smk",
        "typhoon unicolour",
        "ma200",
        "smk typhoon",
        "full face helmet",
        "motorcycle helmet"
    ]
},

{
    id: 101,
    sku: "MT-HLM-023",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK Typhoon Unicolour MA200",
    image: "/images/smk-typhoon-unicolour-ma200.webp",
    price: "Starting from ₹4,950*",
    actualPrice: 4950,
    displayOrder: 101,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Premium SMK Typhoon full-face helmet with a stylish matt unicolour finish, engineered for excellent comfort, ventilation and reliable protection during everyday rides and long-distance touring.",
    badges: [
        "Sizes Available",
        "Gloss & Matt",
        "Full Face"
    ],
    search: [
        "smk",
        "typhoon unicolour",
        "ma200",
        "smk typhoon",
        "full face helmet",
        "motorcycle helmet"
    ]
},

{
    id: 102,
    sku: "MT-HLM-024",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK Alterra Maverix GL627",
    image: "/images/smk-alterra-maverix-gl627.webp",
    price: "Starting from ₹5,900*",
    actualPrice: 5900,
    displayOrder: 102,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Premium SMK off-road helmet designed for motocross, trail riding and adventure riding. Offers superior ventilation, lightweight comfort and dependable protection in demanding riding conditions.",
    badges: [
        "Sizes Available",
        "Off-Road",
        "Gloss Finish"
    ],
    search: [
        "smk",
        "alterra maverix",
        "gl627",
        "off road helmet",
        "motocross helmet",
        "adventure helmet"
    ]
},

{
    id: 103,
    sku: "MT-HLM-025",
    category: CATEGORY.HELMET,
    brand: "Steelbird",
    name: "Steelbird Rox Double Visor Decor",
    image: "/images/steelbird-rox-double-visor-decor.webp",
    price: "Starting from ₹1,349*",
    actualPrice: 1349,
    displayOrder: 103,
    variants: "",
    description: "Stylish Steelbird full-face helmet featuring a double visor system for improved riding convenience, everyday comfort and dependable protection during city rides and highway touring.",
    badges: [
        "Double Visor",
        "Full Face",
        "Stylish Design"
    ],
    search: [
        "steelbird",
        "rox double visor",
        "double visor helmet",
        "full face helmet",
        "motorcycle helmet",
        "bike helmet"
    ]
},

{
    id: 104,
    sku: "MT-HLM-026",
    category: CATEGORY.HELMET,
    brand: "Steelbird",
    name: "Steelbird SB-42 Bang Motocross Helmet",
    image: "/images/steelbird-sb-42-bang-motocross-helmet.webp",
    price: "Starting from ₹2,399*",
    actualPrice: 2399,
    displayOrder: 104,
    variants: "",
    description: "Steelbird motocross helmet built for off-road enthusiasts, offering lightweight construction, excellent ventilation and dependable protection for trail, dirt and adventure riding.",
    badges: [
        "Motocross",
        "Off-Road",
        "Lightweight"
    ],
    search: [
        "steelbird",
        "sb42 bang",
        "motocross helmet",
        "off road helmet",
        "dirt bike helmet",
        "motorcycle helmet"
    ]
},

{
    id: 105,
    sku: "MT-HLM-027",
    category: CATEGORY.HELMET,
    brand: "Steelbird",
    name: "Steelbird SB120 Fighter ECE06",
    image: "/images/steelbird-sb120-fighter-ece06.webp",
    price: "Starting from ₹3,999*",
    actualPrice: 3999,
    displayOrder: 105,
    variants: "",
    description: "ECE 22.06 certified Steelbird full-face helmet offering advanced impact protection, superior comfort and efficient ventilation for city rides, highway touring and long-distance adventures.",
    badges: [
        "ECE 22.06",
        "Full Face",
        "Premium Safety"
    ],
    search: [
        "steelbird",
        "sb120 fighter",
        "ece06 helmet",
        "full face helmet",
        "motorcycle helmet",
        "bike helmet"
    ]
},

{
    id: 106,
    sku: "MT-HLM-028",
    category: CATEGORY.HELMET,
    brand: "Steelbird",
    name: "Steelbird SBH-13 Bang Motocross",
    image: "/images/steelbird-sbh-13-bang-motocross.webp",
    price: "Starting from ₹2,399*",
    actualPrice: 2399,
    displayOrder: 106,
    variants: "",
    description: "Steelbird motocross helmet built for off-road riding, offering lightweight construction, excellent airflow and dependable protection for dirt trails and adventure riding.",
    badges: [
        "Motocross",
        "Off-Road",
        "Lightweight"
    ],
    search: [
        "steelbird",
        "sbh13 bang",
        "bang motocross",
        "motocross helmet",
        "off road helmet",
        "motorcycle helmet"
    ]
},

{
    id: 107,
    sku: "MT-HLM-029",
    category: CATEGORY.HELMET,
    brand: "Steelbird",
    name: "Steelbird SBH-57 Fighter D/V Decor F1 ISI",
    image: "/images/steelbird-sbh-57-fighter-dv-decor-f1-isi.webp",
    price: "Starting from ₹2,999*",
    actualPrice: 2999,
    displayOrder: 107,
    variants: "Colours Available",
    description: "Steelbird full-face helmet with dual visor and ISI certification, designed for superior comfort, visibility and protection during daily commuting and highway touring.",
    badges: [
        "Dual Visor",
        "ISI Certified",
        "Colours Available"
    ],
    search: [
        "steelbird",
        "sbh57 fighter",
        "decor f1",
        "dual visor helmet",
        "full face helmet",
        "motorcycle helmet"
    ]
},

{
    id: 108,
    sku: "MT-HLM-030",
    category: CATEGORY.HELMET,
    brand: "Steelbird",
    name: "Steelbird SBH-57 Fighter D/V Decor F2 ISI",
    image: "/images/steelbird-sbh-57-fighter-dv-decor-f2-isi.webp",
    price: "Starting from ₹2,999*",
    actualPrice: 2999,
    displayOrder: 108,
    variants: "Colours Available",
    description: "Steelbird full-face dual visor helmet with ISI certification, combining stylish graphics, rider comfort and dependable protection for everyday riding and touring.",
    badges: [
        "Dual Visor",
        "ISI Certified",
        "Colours Available"
    ],
    search: [
        "steelbird",
        "sbh57 fighter",
        "decor f2",
        "dual visor helmet",
        "full face helmet",
        "motorcycle helmet"
    ]
},

{
    id: 109,
    sku: "MT-HLM-031",
    category: CATEGORY.HELMET,
    brand: "Steelbird",
    name: "Steelbird SBH-57 Fighter D/V Decor F3 ISI",
    image: "/images/steelbird-sbh-57-fighter-dv-decor-f3-isi.webp",
    price: "Starting from ₹2,999*",
    actualPrice: 2999,
    displayOrder: 109,
    variants: "Colours Available",
    description: "Steelbird full-face dual visor helmet with ISI certification, offering enhanced rider comfort, stylish graphics and dependable protection for city rides, highway cruising and touring.",
    badges: [
        "Dual Visor",
        "ISI Certified",
        "Colours Available"
    ],
    search: [
        "steelbird",
        "sbh57 fighter",
        "decor f3",
        "dual visor helmet",
        "full face helmet",
        "motorcycle helmet"
    ]
},

{
    id: 110,
    sku: "MT-HLM-032",
    category: CATEGORY.HELMET,
    brand: "Steelbird",
    name: "Steelbird SBH-57 Fighter F2 ISI",
    image: "/images/steelbird-sbh-57-fighter-f2-isi.webp",
    price: "Starting from ₹2,999*",
    actualPrice: 2999,
    displayOrder: 110,
    variants: "Colours Available",
    description: "Steelbird full-face helmet with ISI certification, aerodynamic styling and dependable rider protection for daily commuting, highway cruising and long-distance touring.",
    badges: [
        "ISI Certified",
        "Colours Available",
        "Full Face"
    ],
    search: [
        "steelbird",
        "sbh57 fighter f2",
        "fighter f2 isi",
        "full face helmet",
        "motorcycle helmet",
        "bike helmet"
    ]
},

{
    id: 111,
    sku: "MT-HLM-033",
    category: CATEGORY.HELMET,
    brand: "Steelbird",
    name: "Steelbird SBH-61 SXE",
    image: "/images/steelbird-sbh-61-sxe.webp",
    price: "Starting from ₹3,599*",
    actualPrice: 3599,
    displayOrder: 111,
    variants: "Colours Available",
    description: "Premium Steelbird full-face helmet offering excellent ventilation, rider comfort and dependable protection, making it ideal for everyday commuting and highway touring.",
    badges: [
        "Colours Available",
        "Full Face",
        "Comfort Fit"
    ],
    search: [
        "steelbird",
        "sbh61 sxe",
        "sxe helmet",
        "full face helmet",
        "motorcycle helmet",
        "bike helmet"
    ]
},

{
    id: 112,
    sku: "MT-HLM-034",
    category: CATEGORY.HELMET,
    brand: "Studds",
    name: "Studds Drifter Plain",
    image: "/images/studds-drifter-plain.webp",
    price: "Starting from ₹2,395*",
    actualPrice: 2395,
    displayOrder: 112,
    variants: "Colours Available",
    description: "Stylish Studds full-face helmet featuring a clean plain design, comfortable fit and reliable protection for everyday commuting, touring and highway riding.",
    badges: [
        "Colours Available",
        "Full Face",
        "Comfort Fit"
    ],
    search: [
        "studds",
        "drifter plain",
        "studds drifter",
        "full face helmet",
        "motorcycle helmet",
        "bike helmet"
    ]
},

{
    id: 113,
    sku: "MT-HLM-035",
    category: CATEGORY.HELMET,
    brand: "Studds",
    name: "Studds Helios D1 Asphalt",
    image: "/images/studds-helios-d1-asphalt.webp",
    price: "Starting from ₹3,300*",
    actualPrice: 3300,
    displayOrder: 113,
    variants: "Available in Colours, Sizes & Gloss/Matt",
    description: "Premium Studds Helios full-face helmet featuring the Asphalt graphic design, offering advanced comfort, ventilation and dependable protection for commuting, touring and highway rides.",
    badges: [
        "Colours Available",
        "Sizes Available",
        "Gloss & Matt"
    ],
    search: [
        "studds",
        "helios d1 asphalt",
        "studds helios",
        "full face helmet",
        "motorcycle helmet",
        "bike helmet"
    ]
},

{
    id: 114,
    sku: "MT-HLM-036",
    category: CATEGORY.HELMET,
    brand: "Studds",
    name: "Studds Helios D2 Circuit",
    image: "/images/studds-helios-d2-circuit.webp",
    price: "Starting from ₹3,300*",
    actualPrice: 3300,
    displayOrder: 114,
    variants: "Available in Colours, Sizes & Gloss/Matt",
    description: "Premium Studds Helios full-face helmet with the Circuit graphic series, delivering superior rider comfort, efficient ventilation and dependable protection for daily rides and touring.",
    badges: [
        "Colours Available",
        "Sizes Available",
        "Gloss & Matt"
    ],
    search: [
        "studds",
        "helios d2 circuit",
        "studds helios",
        "full face helmet",
        "motorcycle helmet",
        "bike helmet"
    ]
},

{
    id: 115,
    sku: "MT-HLM-037",
    category: CATEGORY.HELMET,
    brand: "Studds",
    name: "Studds Helios Decor Effect",
    image: "/images/studds-helios-decor-effect.webp",
    price: "Starting from ₹3,445*",
    actualPrice: 3445,
    displayOrder: 115,
    variants: "Available in Colours, Sizes & Gloss/Matt",
    description: "Premium Studds Helios full-face helmet featuring the Decor Effect graphic design, engineered for superior comfort, effective ventilation and dependable protection during city rides, touring and highway journeys.",
    badges: [
        "Colours Available",
        "Sizes Available",
        "Gloss & Matt"
    ],
    search: [
        "studds",
        "helios decor effect",
        "studds helios",
        "full face helmet",
        "motorcycle helmet",
        "bike helmet"
    ]
},

{
    id: 116,
    sku: "MT-HLM-038",
    category: CATEGORY.HELMET,
    brand: "Studds",
    name: "Studds Helios Plain",
    image: "/images/studds-helios-plain.webp",
    price: "Starting from ₹3,100*",
    actualPrice: 3100,
    displayOrder: 116,
    variants: "Available in Colours, Sizes &Gloss/Matt",
    description: "Premium Studds Helios full-face helmet with a clean plain finish, delivering excellent comfort, ventilation and dependable protection for everyday commuting, highway touring and weekend rides.",
    badges: [
        "Colours Available",
        "Sizes Available",
        "Gloss & Matt"
    ],
    search: [
        "studds",
        "helios plain",
        "studds helios",
        "full face helmet",
        "motorcycle helmet",
        "bike helmet"
    ]
},

{
    id: 117,
    sku: "MT-HLM-039",
    category: CATEGORY.HELMET,
    brand: "Studds",
    name: "Studds Raider Plain with Spoiler",
    image: "/images/studds-raider-plain-with-spoiler.webp",
    price: "Starting from ₹1,175*",
    actualPrice: 1175,
    displayOrder: 117,
    variants: "Colours Available",
    description: "Studds full-face helmet featuring an aerodynamic rear spoiler, comfortable fit and dependable protection for daily commuting, city rides and weekend touring.",
    badges: [
        "Colours Available",
        "Rear Spoiler",
        "Full Face"
    ],
    search: [
        "studds",
        "raider plain",
        "raider spoiler",
        "full face helmet",
        "motorcycle helmet",
        "bike helmet"
    ]
},

{
    id: 118,
    sku: "MT-HLM-040",
    category: CATEGORY.HELMET,
    brand: "Studds",
    name: "Studds Thunder Decor",
    image: "/images/studds-thunder-decor.webp",
    price: "Starting from ₹1,985*",
    actualPrice: 1985,
    displayOrder: 118,
    variants: "Colours Available",
    description: "Studds full-face helmet with sporty Thunder Decor graphics, designed to provide reliable protection, comfortable ventilation and an eye-catching look for everyday riders.",
    badges: [
        "Colours Available",
        "Sporty Graphics",
        "Full Face"
    ],
    search: [
        "studds",
        "thunder decor",
        "studds thunder",
        "full face helmet",
        "motorcycle helmet",
        "bike helmet"
    ]
},

{
    id: 119,
    sku: "MT-HLM-041",
    category: CATEGORY.HELMET,
    brand: "Studds",
    name: "Studds Thunder Plain",
    image: "/images/studds-thunder-plain.webp",
    price: "Starting from ₹1,765*",
    actualPrice: 1765,
    displayOrder: 119,
    variants: "Colours Available",
    description: "Studds full-face helmet with a clean plain finish, offering dependable protection, rider comfort and effective ventilation for everyday commuting and highway riding.",
    badges: [
        "Colours Available",
        "Comfort Fit",
        "Full Face"
    ],
    search: [
        "studds",
        "thunder plain",
        "studds thunder",
        "full face helmet",
        "motorcycle helmet",
        "bike helmet"
    ]
},

{
    id: 120,
    sku: "MT-INT-001",
    category: CATEGORY.INTERCOM,
    brand: "BluArmor",
    name: "BluArmour C20 Bluetooth Intercom",
    image: "/images/bluarmour-c20-bluetooth-intercom.webp",
    price: "Starting from ₹9,999*",
    actualPrice: 9999,
    displayOrder: 120,
    variants: "",
    description: "Entry-level Bluetooth helmet intercom designed for crystal-clear rider communication, music, navigation and calls during daily rides, touring and weekend adventures.",
    badges: [
        "Bluetooth",
        "Helmet Intercom",
        "Hands-Free"
    ],
    search: [
        "bluarmor",
        "bluarmour c20",
        "c20 intercom",
        "helmet intercom",
        "bluetooth communicator",
        "motorcycle intercom"
    ]
},

{
    id: 121,
    sku: "MT-INT-002",
    category: CATEGORY.INTERCOM,
    brand: "BluArmor",
    name: "BluArmour C30 Bluetooth Intercom",
    image: "/images/bluarmour-c30-bluetooth-intercom.webp",
    price: "Starting from ₹10,999*",
    actualPrice: 10999,
    displayOrder: 121,
    variants: "",
    description: "Advanced Bluetooth helmet intercom offering reliable rider communication, GPS navigation, music streaming and hands-free calling for touring and long-distance motorcycle rides.",
    badges: [
        "Bluetooth",
        "Helmet Intercom",
        "Crystal Clear Audio"
    ],
    search: [
        "bluarmor",
        "bluarmour c30",
        "c30 intercom",
        "helmet intercom",
        "bluetooth communicator",
        "motorcycle intercom"
    ]
},

{
    id: 122,
    sku: "MT-INT-003",
    category: CATEGORY.INTERCOM,
    brand: "BluArmor",
    name: "BluArmour C50 Bluetooth Intercom",
    image: "/images/bluarmour-c50-bluetooth-intercom.webp",
    price: "Starting from ₹15,999*",
    actualPrice: 15999,
    displayOrder: 122,
    variants: "",
    description: "Premium Bluetooth motorcycle intercom delivering superior rider communication, high-quality audio, GPS navigation support and seamless connectivity for long-distance touring.",
    badges: [
        "Bluetooth",
        "Premium Audio",
        "Helmet Intercom"
    ],
    search: [
        "bluarmor",
        "bluarmour c50",
        "c50 intercom",
        "helmet intercom",
        "bluetooth communicator",
        "motorcycle intercom"
    ]
},

{
    id: 123,
    sku: "MT-INT-004",
    category: CATEGORY.INTERCOM,
    brand: "BluArmor",
    name: "BluArmour C50 Plus Bluetooth Intercom",
    image: "/images/bluarmour-c50-plus-bluetooth-intercom.webp",
    price: "Starting from ₹18,999*",
    actualPrice: 18999,
    displayOrder: 123,
    variants: "",
    description: "Flagship Bluetooth helmet intercom built for touring enthusiasts, offering premium rider communication, crystal-clear audio, navigation support and seamless connectivity on every ride.",
    badges: [
        "Bluetooth",
        "Flagship Model",
        "Helmet Intercom"
    ],
    search: [
        "bluarmor",
        "bluarmour c50 plus",
        "c50 plus intercom",
        "helmet intercom",
        "bluetooth communicator",
        "motorcycle intercom"
    ]
},

{
    id: 124,
    sku: "MT-INT-005",
    category: CATEGORY.INTERCOM,
    brand: "BluArmor",
    name: "BluArmour HS1 Bluetooth Headset",
    image: "/images/bluarmour-hs1-bluetooth-headset.webp",
    price: "Starting from ₹2,999*",
    actualPrice: 2999,
    displayOrder: 124,
    variants: "",
    description: "Compact Bluetooth helmet headset designed for music, GPS navigation and hands-free calling, making everyday commuting and weekend rides safer and more convenient.",
    badges: [
        "Bluetooth",
        "Hands-Free",
        "Helmet Headset"
    ],
    search: [
        "bluarmor",
        "bluarmour hs1",
        "hs1 headset",
        "helmet bluetooth headset",
        "motorcycle bluetooth",
        "helmet communicator"
    ]
},

{
    id: 125,
    sku: "MT-INT-006",
    category: CATEGORY.INTERCOM,
    brand: "Sena",
    name: "Sena B20 Mesh Intercom",
    image: "/images/sena-b20-mesh-intercom.webp",
    price: "Starting from ₹16,999*",
    actualPrice: 16999,
    displayOrder: 125,
    variants: "",
    description: "Premium Sena mesh intercom system offering seamless rider-to-rider communication, crystal-clear audio, GPS navigation, music streaming and hands-free calling for touring and group rides.",
    badges: [
        "Mesh Intercom",
        "Premium Audio",
        "Bluetooth"
    ],
    search: [
        "sena",
        "sena b20",
        "mesh intercom",
        "helmet intercom",
        "bluetooth communicator",
        "motorcycle intercom"
    ]
},

{
    id: 126,
    sku: "MT-MOB-001",
    category: CATEGORY.ACCESSORIES,
    brand: "BOBO",
    name: "BOBO BM-04 Mobile Mount Jaw-Grip",
    image: "/images/bobo-bm-04-mobile-mount-jaw-grip.webp",
    price: "Starting from ₹1,199*",
    actualPrice: 1199,
    displayOrder: 126,
    variants: "Without Charger",
    description: "Secure motorcycle mobile mount featuring BOBO's reliable jaw-grip mechanism for firm smartphone holding during daily commuting, touring and navigation.",
    badges: [
        "Jaw Grip",
        "Secure Mount",
        "Without Charger"
    ],
    search: [
        "bobo",
        "bm04",
        "bm-04 mobile mount",
        "jaw grip mobile holder",
        "motorcycle phone holder",
        "bike mobile mount"
    ]
},

{
    id: 127,
    sku: "MT-MOB-002",
    category: CATEGORY.ACCESSORIES,
    brand: "BOBO",
    name: "BOBO BM-4 Pro Plus Mobile Mount Jaw Grip+ Vibration Damper",
    image: "/images/bobo-bm-4-pro-plus-mobile-mount-jaw-grip-vibration-damper.webp",
    price: "Starting from ₹1,699*",
    actualPrice: 1699,
    displayOrder: 127,
    variants: "",
    description: "Premium motorcycle mobile mount with BOBO Jaw-Grip technology and an integrated vibration damper for enhanced smartphone protection during city rides, highway touring and adventure riding.",
    badges: [
        "Jaw Grip",
        "Vibration Damper",
        "Premium Mount"
    ],
    search: [
        "bobo",
        "bm4 pro plus",
        "mobile mount",
        "vibration damper",
        "motorcycle phone holder",
        "bike mobile mount"
    ]
},

{
    id: 128,
    sku: "MT-MOB-003",
    category: CATEGORY.ACCESSORIES,
    brand: "BOBO",
    name: "BOBO BM10H PRO PLUS Mobile Mount",
    image: "/images/bobo-bm10h-pro-plus-mobile-mount.webp",
    price: "Starting from ₹2,499*",
    actualPrice: 2499,
    displayOrder: 128,
    variants: "Vibration Damper",
    description: "High-end BOBO mobile mount with integrated vibration damper, engineered to provide maximum smartphone stability and protection for touring, adventure riding and daily commuting.",
    badges: [
        "Vibration Damper",
        "Premium Mount",
        "Secure Grip"
    ],
    search: [
        "bobo",
        "bm10h pro plus",
        "mobile mount",
        "motorcycle phone holder",
        "vibration damper",
        "bike mobile mount"
    ]
},

{
    id: 129,
    sku: "MT-HLM-042",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK Gullwing Navigator GL263",
    image: "/images/smk-gullwing-navigator-gl263.webp",
    price: "Starting from ₹6,950*",
    actualPrice: 6950,
    displayOrder: 129,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Premium SMK flip-up modular helmet designed for touring and long-distance rides, offering the convenience of a flip-up chin bar, excellent ventilation and dependable rider protection.",
    badges: [
        "Flip-Up",
        "Sizes Available",
        "Gloss & Matt"
    ],
    search: [
        "smk",
        "gullwing navigator",
        "gl263",
        "flip up helmet",
        "modular helmet",
        "motorcycle helmet"
    ]
},

{
    id: 130,
    sku: "MT-HLM-043",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK Gullwing Sonic GL231",
    image: "/images/smk-gullwing-sonic-gl231.webp",
    price: "Starting from ₹6,650*",
    actualPrice: 6650,
    displayOrder: 130,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Premium SMK flip-up modular helmet featuring the Sonic graphic design, offering the convenience of a flip-up chin bar, superior ventilation and dependable protection for touring, commuting and long-distance rides.",
    badges: [
        "Flip-Up",
        "Sizes Available",
        "Gloss & Matt"
    ],
    search: [
        "smk",
        "gullwing sonic",
        "gl231",
        "flip up helmet",
        "modular helmet",
        "motorcycle helmet"
    ]
},

{
    id: 131,
    sku: "MT-HLM-044",
    category: CATEGORY.HELMET,
    brand: "Steelbird",
    name: "Steelbird Air SBA-15 ISS R2K",
    image: "/images/steelbird-air-sba-15-iss-r2k.webp",
    price: "Starting from ₹1,349*",
    actualPrice: 1349,
    displayOrder: 131,
    variants: "",
    description: "Steelbird modular helmet with a flip-up design, offering everyday comfort, reliable protection and convenient usability for city commuting and highway rides.",
    badges: [
        "Flip-Up",
        "Modular",
        "Comfort Fit"
    ],
    search: [
        "steelbird",
        "sba15",
        "iss r2k",
        "flip up helmet",
        "modular helmet",
        "motorcycle helmet"
    ]
},

{
    id: 132,
    sku: "MT-HLM-045",
    category: CATEGORY.HELMET,
    brand: "Steelbird",
    name: "Steelbird Air SBA-19 R2K Flip Up",
    image: "/images/steelbird-air-sba-19-r2k-flip-up.webp",
    price: "Starting from ₹1,349*",
    actualPrice: 1349,
    displayOrder: 132,
    variants: "",
    description: "Steelbird flip-up modular helmet designed for convenient everyday riding, offering dependable protection, comfortable ventilation and easy chin-bar operation.",
    badges: [
        "Flip-Up",
        "Modular",
        "Comfort Fit"
    ],
    search: [
        "steelbird",
        "sba19",
        "r2k flip up",
        "flip up helmet",
        "modular helmet",
        "motorcycle helmet"
    ]
},

{
    id: 133,
    sku: "MT-HLM-046",
    category: CATEGORY.HELMET,
    brand: "Steelbird",
    name: "Steelbird Air SBA-20 Flip Up",
    image: "/images/steelbird-air-sba-20-flip-up.webp",
    price: "Starting from ₹2,249*",
    actualPrice: 2249,
    displayOrder: 133,
    variants: "Colours Available",
    description: "Steelbird modular flip-up helmet offering enhanced rider comfort, dependable protection and convenient one-hand operation for daily commuting, touring and weekend rides.",
    badges: [
        "Flip-Up",
        "Colours Available",
        "Modular"
    ],
    search: [
        "steelbird",
        "sba20",
        "flip up helmet",
        "modular helmet",
        "motorcycle helmet",
        "bike helmet"
    ]
},

{
    id: 134,
    sku: "MT-HLM-047",
    category: CATEGORY.HELMET,
    brand: "Studds",
    name: "Studds Ninja Comet Dual Visor",
    image: "/images/studds-ninja-comet-dual-visor.webp",
    price: "Starting from ₹1,420*",
    actualPrice: 1420,
    displayOrder: 134,
    variants: "Colours Available",
    description: "Studds flip-up modular helmet featuring a dual visor and rear spoiler, designed to provide excellent comfort, visibility and dependable protection for city rides and highway touring.",
    badges: [
        "Flip-Up",
        "Dual Visor",
        "Colours Available"
    ],
    search: [
        "studds",
        "ninja comet",
        "dual visor helmet",
        "flip up helmet",
        "modular helmet",
        "motorcycle helmet"
    ]
},

{
    id: 135,
    sku: "MT-HLM-048",
    category: CATEGORY.HELMET,
    brand: "Studds",
    name: "Studds Trooper",
    image: "/images/studds-trooper.webp",
    price: "Starting from ₹1,925*",
    actualPrice: 1925,
    displayOrder: 135,
    variants: "Colours Available",
    description: "Studds modular flip-up helmet designed for everyday commuting and touring, offering dependable protection, rider comfort and convenient flip-up functionality.",
    badges: [
        "Flip-Up",
        "Colours Available",
        "Modular"
    ],
    search: [
        "studds",
        "trooper",
        "flip up helmet",
        "modular helmet",
        "motorcycle helmet",
        "bike helmet"
    ]
},

{
    id: 136,
    sku: "MT-HLM-049",
    category: CATEGORY.HELMET,
    brand: "Studds",
    name: "Studds Trooper Decor - Legacy Superman Shield",
    image: "/images/studds-trooper-decor-legacy-superman-shield.webp",
    price: "Starting from ₹2,425*",
    actualPrice: 2425,
    displayOrder: 136,
    variants: "",
    description: "Studds modular flip-up helmet featuring the official Legacy Superman Shield graphic, offering dependable protection, rider comfort and stylish everyday performance.",
    badges: [
        "Flip-Up",
        "Licensed Graphic",
        "Modular"
    ],
    search: [
        "studds",
        "trooper decor",
        "legacy superman shield",
        "flip up helmet",
        "modular helmet",
        "motorcycle helmet"
    ]
},

{
    id: 137,
    sku: "MT-HLM-050",
    category: CATEGORY.HELMET,
    brand: "Studds",
    name: "Studds Trooper Decor",
    image: "/images/studds-trooper-decor.webp",
    price: "Starting from ₹2,125*",
    actualPrice: 2125,
    displayOrder: 137,
    variants: "",
    description: "Studds modular flip-up helmet with stylish graphics, designed to provide dependable protection, rider comfort and convenient everyday usability for commuting and touring.",
    badges: [
        "Flip-Up",
        "Graphic Design",
        "Modular"
    ],
    search: [
        "studds",
        "trooper decor",
        "flip up helmet",
        "modular helmet",
        "motorcycle helmet",
        "bike helmet"
    ]
},

{
    id: 138,
    sku: "MT-HLM-051",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK GTJ Escape GL236",
    image: "/images/smk-gtj-escape-gl236.webp",
    price: "Starting from ₹3,800*",
    actualPrice: 3800,
    displayOrder: 138,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Premium SMK open-face helmet offering superior comfort, wide field of vision and excellent ventilation, making it ideal for city commuting, scooter riders and relaxed touring.",
    badges: [
        "Open Face",
        "Sizes Available",
        "Gloss & Matt"
    ],
    search: [
        "smk",
        "gtj escape",
        "gl236",
        "open face helmet",
        "motorcycle helmet",
        "bike helmet"
    ]
},

{
    id: 139,
    sku: "MT-HLM-052",
    category: CATEGORY.HELMET,
    brand: "SMK",
    name: "SMK GTJ Rover MA624",
    image: "/images/smk-gtj-rover-ma624.webp",
    price: "Starting from ₹3,800*",
    actualPrice: 3800,
    displayOrder: 139,
    variants: "Available in Sizes & Gloss/Matt",
    description: "Premium SMK open-face helmet with a stylish matt finish, engineered for superior comfort, excellent ventilation and reliable protection during city rides and everyday commuting.",
    badges: [
        "Open Face",
        "Sizes Available",
        "Gloss & Matt"
    ],
    search: [
        "smk",
        "gtj rover",
        "ma624",
        "open face helmet",
        "motorcycle helmet",
        "bike helmet"
    ]
},

{
    id: 140,
    sku: "MT-HLM-053",
    category: CATEGORY.HELMET,
    brand: "Steelbird",
    name: "Steelbird SBH-23 AVA with Peak D/V Dashing",
    image: "/images/steelbird-sbh-23-ava-with-peak-dv-dashing.webp",
    price: "Starting from ₹1,299*",
    actualPrice: 1299,
    displayOrder: 140,
    variants: "",
    description: "Steelbird open-face helmet featuring a peak visor and dual visor system, designed to provide excellent visibility, rider comfort and reliable protection for daily commuting and city rides.",
    badges: [
        "Open Face",
        "Dual Visor",
        "Peak Visor"
    ],
    search: [
        "steelbird",
        "sbh23 ava",
        "ava helmet",
        "open face helmet",
        "dual visor helmet",
        "motorcycle helmet"
    ]
},

{
    id: 141,
    sku: "MT-HLM-054",
    category: CATEGORY.HELMET,
    brand: "Studds",
    name: "Studds Marshall Kids",
    image: "/images/studds-marshall-kids.webp",
    price: "Starting from ₹1,125*",
    actualPrice: 1125,
    displayOrder: 141,
    variants: "Colours & Sizes Available",
    description: "Studds open-face helmet specially designed for young riders, offering lightweight comfort, reliable protection and excellent ventilation for everyday use.",
    badges: [
        "Kids Helmet",
        "Colours Available",
        "Sizes Available"
    ],
    search: [
        "studds",
        "marshall kids",
        "kids helmet",
        "open face helmet",
        "children helmet",
        "motorcycle helmet"
    ]
},

{
    id: 142,
    sku: "MT-ACC-048",
    category: CATEGORY.ACCESSORIES,
    brand: "",
    name: "8 in 1 Bike Repair Multi Tool Set",
    image: "/images/8-in-1-bike-repair-multi-tool-set.webp",
    price: "Starting from ₹489*",
    actualPrice: 489,
    displayOrder: 142,
    variants: "",
    description: "Compact 8-in-1 multi-tool kit designed for quick motorcycle repairs during touring, commuting and emergency roadside situations. An essential addition to every rider's toolkit.",
    badges: [
        "8-in-1 Tool",
        "Compact",
        "Travel Essential"
    ],
    search: [
        "8 in 1 bike repair tool",
        "motorcycle multi tool",
        "bike repair kit",
        "multi tool set",
        "touring tool kit",
        "motorcycle accessories"
    ]
},

{
    id: 143,
    sku: "MT-ACC-049",
    category: CATEGORY.ACCESSORIES,
    brand: "",
    name: "Blind Spot Round Convex Mirror - Pack of 2",
    image: "/images/blind-spot-round-convex-mirror-pack-of-2.webp",
    price: "Starting from ₹149*",
    actualPrice: 149,
    displayOrder: 143,
    variants: "Pack of 2",
    description: "Round convex blind spot mirrors designed to improve rear visibility and reduce blind spots, helping riders make safer lane changes and turns.",
    badges: [
        "Pack of 2",
        "Wide Angle",
        "Safety Essential"
    ],
    search: [
        "blind spot mirror",
        "convex mirror",
        "round blind spot mirror",
        "motorcycle mirror",
        "bike safety accessory",
        "pack of 2"
    ]
},

{
    id: 144,
    sku: "MT-ACC-050",
    category: CATEGORY.ACCESSORIES,
    brand: "",
    name: "Clip Snap Hook with Mini Compass",
    image: "/images/clip-snap-hook-with-mini-compass.webp",
    price: "Starting from ₹149*",
    actualPrice: 149,
    displayOrder: 144,
    variants: "",
    description: "Compact clip snap hook with an integrated mini compass, perfect for motorcycle touring, camping, trekking and outdoor adventures. Convenient for attaching keys, bottles or lightweight gear.",
    badges: [
        "Mini Compass",
        "Lightweight",
        "Outdoor Essential"
    ],
    search: [
        "clip snap hook",
        "mini compass",
        "carabiner hook",
        "camping accessory",
        "motorcycle touring",
        "outdoor gear"
    ]
},

{
    id: 145,
    sku: "MT-ACC-051",
    category: CATEGORY.ACCESSORIES,
    brand: "",
    name: "Metal Carabiner Hook with Lock",
    image: "/images/metal-carabiner-hook-with-lock.webp",
    price: "Starting from ₹89*",
    actualPrice: 89,
    displayOrder: 145,
    variants: "",
    description: "Durable metal carabiner hook with a secure locking mechanism, ideal for attaching keys, gloves, bottles and lightweight riding essentials during touring, camping and everyday use.",
    badges: [
        "Locking Hook",
        "Lightweight",
        "Outdoor Essential"
    ],
    search: [
        "metal carabiner",
        "carabiner hook",
        "locking carabiner",
        "key hook",
        "camping accessory",
        "motorcycle accessory"
    ]
},

{
    id: 146,
    sku: "MT-ACC-052",
    category: CATEGORY.ACCESSORIES,
    brand: "",
    name: "Mini Rechargeable Keychain Flashlight",
    image: "/images/mini-rechargeable-keychain-flashlight.webp",
    price: "Starting from ₹279*",
    actualPrice: 279,
    displayOrder: 146,
    variants: "Rechargeable",
    description: "Compact rechargeable LED keychain flashlight that delivers bright illumination for emergencies, camping, motorcycle maintenance and everyday carry.",
    badges: [
        "Rechargeable",
        "LED Light",
        "Pocket Size"
    ],
    search: [
        "mini flashlight",
        "rechargeable flashlight",
        "keychain flashlight",
        "led torch",
        "motorcycle accessory",
        "camping light"
    ]
},

{
    id: 147,
    sku: "MT-ACC-053",
    category: CATEGORY.ACCESSORIES,
    brand: "",
    name: "Motorcycle Chain Cleaning Brush",
    image: "/images/motorcycle-chain-cleaning-brush.webp",
    price: "Starting from ₹149*",
    actualPrice: 149,
    displayOrder: 147,
    variants: "",
    description: "Specially designed motorcycle chain cleaning brush for efficiently removing dirt, grease and grime, helping maintain chain performance and extend drivetrain life.",
    badges: [
        "Chain Care",
        "Easy Cleaning",
        "Bike Maintenance"
    ],
    search: [
        "chain cleaning brush",
        "motorcycle chain brush",
        "bike chain cleaner",
        "chain maintenance",
        "motorcycle cleaning",
        "bike maintenance"
    ]
},

{
    id: 148,
    sku: "MT-ACC-054",
    category: CATEGORY.ACCESSORIES,
    brand: "",
    name: "Silicon Collapsible Water Bottle 600ml BPA Free",
    image: "/images/silicon-collapsible-water-bottle-600ml-bpa-free.webp",
    price: "Starting from ₹333*",
    actualPrice: 333,
    displayOrder: 148,
    variants: "600ml | BPA Free",
    description: "Collapsible 600ml silicone water bottle made from BPA-free material, designed to save space while touring, camping, trekking and long-distance motorcycle adventures.",
    badges: [
        "600ml",
        "BPA Free",
        "Collapsible Design"
    ],
    search: [
        "collapsible water bottle",
        "600ml bottle",
        "silicone water bottle",
        "bpa free bottle",
        "camping bottle",
        "motorcycle touring accessory"
    ]
},

{
    id: 149,
    sku: "MT-ACC-055",
    category: CATEGORY.ACCESSORIES,
    brand: "Tire",
    name: "Tire Repair Rubber Nails",
    image: "/images/tire-repair-rubber-nails.webp",
    price: "Starting from ₹149*",
    actualPrice: 149,
    displayOrder: 149,
    variants: "",
    description: "Quick and convenient tubeless tyre repair rubber nails designed for temporary puncture repairs without removing the tyre. An essential emergency accessory for touring and everyday riding.",
    badges: [
        "Tubeless Repair",
        "Emergency Use",
        "Travel Essential"
    ],
    search: [
        "tire repair rubber nails",
        "tyre repair rubber nails",
        "tubeless tyre repair",
        "puncture repair",
        "motorcycle tyre repair",
        "bike accessories"
    ]
},

{
    id: 150,
    sku: "MT-ACC-056",
    category: CATEGORY.ACCESSORIES,
    brand: "",
    name: "Hydration Backpack 2 Litre (Without Bladder)",
    image: "/images/hydration-backpack-2-litre-without-bladder.webp",
    price: "Starting from ₹699*",
    actualPrice: 699,
    displayOrder: 150,
    variants: "Colours Available",
    description: "Lightweight hydration backpack designed for motorcycle touring, cycling and outdoor adventures. Features dedicated storage for a 2-litre hydration bladder (sold separately) along with space for small essentials.",
    badges: [
        "2 Litre",
        "Colours Available",
        "Adventure Ready"
    ],
    search: [
        "hydration backpack",
        "2 litre hydration backpack",
        "hydration bag",
        "motorcycle backpack",
        "touring backpack",
        "without bladder"
    ]
},

{
    id: 151,
    sku: "MT-ACC-057",
    category: CATEGORY.ACCESSORIES,
    brand: "HJG",
    name: "HJG CNC Switch",
    image: "/images/hjg-cnc-switch.webp",
    price: "Starting from ₹300*",
    actualPrice: 300,
    displayOrder: 151,
    variants: "",
    description: "Premium CNC-machined waterproof switch designed for controlling auxiliary motorcycle accessories such as fog lights and additional electrical equipment with reliable operation.",
    badges: [
        "CNC Machined",
        "Water Resistant",
        "Easy Installation"
    ],
    search: [
        "hjg",
        "hjg cnc switch",
        "fog light switch",
        "motorcycle switch",
        "auxiliary switch",
        "bike accessories"
    ]
},

{
    id: 152,
    sku: "MT-ACC-058",
    category: CATEGORY.ACCESSORIES,
    brand: "MotoTrek",
    name: "MotoTrek Water Bladder 2 Litre",
    image: "/images/mototrek-water-bladder-2-litre.webp",
    price: "Starting from ₹800*",
    actualPrice: 800,
    displayOrder: 152,
    variants: "2 Litre",
    description: "MotoTrek premium 2-litre hydration bladder designed for hydration backpacks, providing leak-resistant performance and convenient hydration during motorcycle touring, cycling, trekking and outdoor adventures.",
    badges: [
        "2 Litre",
        "BPA Free",
        "Adventure Ready"
    ],
    search: [
        "mototrek",
        "mototrek water bladder",
        "2 litre water bladder",
        "hydration bladder",
        "hydration pack",
        "motorcycle touring"
    ]
},

];

export default products;
