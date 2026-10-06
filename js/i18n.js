/* miau coffee — English / Macedonian language support
   ---------------------------------------------------------------
   English is written directly in the HTML (the default language).
   For Macedonian, every visible text node and a few attributes
   (aria-label, title, placeholder, data-caption), the <title> and the
   meta description are looked up in the dictionary below by their
   English text and replaced. Switching back restores the original English.
   The chosen language is saved in localStorage ("miau-lang").
   Elements marked translate="no" or data-i18n-skip are left untouched. */
(function () {
  'use strict';

  var STORAGE_KEY = 'miau-lang';
  var LANGS = ['en', 'mk'];

  /*DICT-START*/
  var MK = {
    /* ---------- shared: header, navigation, footer ---------- */
    "Skip to content": "Прескокни до содржината",
    "Primary": "Главна навигација",
    "Mobile": "Мобилна навигација",
    "Home": "Почетна",
    "About Us": "За нас",
    "Menu": "Мени",
    "Our Coffee": "Нашето кафе",
    "Brewing Methods": "Методи на подготовка",
    "Gallery": "Галерија",
    "Events": "Настани",
    "Journal": "Блог",
    "Visit Us": "Посетете нè",
    "Visit us": "Посетете нè",
    "Contact": "Контакт",
    "Language": "Јазик",
    "Switch to dark mode": "Вклучи темен режим",
    "Switch to light mode": "Вклучи светол режим",
    "Toggle menu": "Отвори или затвори го менито",
    "A specialty coffee shop for slow mornings, carefully sourced beans and honest, well-brewed coffee.": "Кафуле за специјалитетно кафе — за мирни утра, внимателно избрани зрна и искрено, добро подготвено кафе.",
    "miau coffee on Instagram": "miau coffee на Instagram",
    "miau coffee on Facebook": "miau coffee на Facebook",
    "miau coffee on TikTok": "miau coffee на TikTok",
    "Quick Links": "Брзи врски",
    "Coffee Journal": "Блог за кафе",
    "Opening Hours": "Работно време",
    "Mon – Fri": "Пон – Пет",
    "Sat – Sun": "Саб – Нед",
    "Get in Touch": "Контактирајте нè",
    "12 Makedonija Street": "ул. Македонија бр. 12",
    "1000 Skopje, N. Macedonia": "1000 Скопје, С. Македонија",
    "1000 Skopje, North Macedonia": "1000 Скопје, Северна Македонија",
    "miau coffee. All rights reserved.": "miau coffee. Сите права се задржани.",
    "Legal": "Правни информации",
    "Privacy Policy": "Политика за приватност",
    "Cookie Policy": "Политика за колачиња",
    "miau coffee location map": "Мапа со локацијата на miau coffee",
    "Address": "Адреса",
    "Monday – Friday": "Понеделник – петок",
    "Saturday – Sunday": "Сабота – недела",
    "Get Directions": "Како да стигнете",
    "See Upcoming Events": "Претстојни настани",
    "Close": "Затвори",
    "Previous image": "Претходна слика",
    "Next image": "Следна слика",

    /* ---------- cookie consent banner ---------- */
    "Cookie consent": "Согласност за колачиња",
    "We value your privacy": "Ја почитуваме вашата приватност",
    "We use cookies to improve your browsing experience. You can accept or reject optional cookies, and change your choice at any time.": "Користиме колачиња за подобро искуство при прелистувањето. Опционалните колачиња можете да ги прифатите или одбиете, а изборот можете да го промените во секое време.",
    "Accept": "Прифати",
    "Reject": "Одбиј",

    /* ---------- form validation (used by main.js) ---------- */
    "This field is required.": "Ова поле е задолжително.",
    "Please enter a valid email address.": "Внесете важечка адреса на е-пошта.",
    "Please enter a valid phone number.": "Внесете важечки телефонски број.",

    /* ---------- index.html ---------- */
    "miau coffee — Specialty Coffee Shop": "miau coffee — Кафуле за специјалитетно кафе",
    "miau coffee is a specialty coffee shop serving carefully sourced beans, expertly brewed drinks and a warm place to slow down. Visit us for coffee, pastries, brewing workshops and more.": "miau coffee е кафуле за специјалитетно кафе со внимателно избрани зрна, стручно подготвени пијалаци и топол простор за одмор. Посетете нè за кафе, пецива, работилници за подготовка на кафе и многу повеќе.",
    "miau coffee · specialty coffee shop": "miau coffee · специјалитетно кафуле",
    "Specialty coffee, crafted with passion.": "Специјалитетно кафе, подготвено со страст.",
    "Thoughtfully sourced beans, carefully brewed coffee and a place made for slow moments — pulled, poured and pressed right in front of you.": "Внимателно избрани зрна, грижливо подготвено кафе и место за мирни моменти — сè се подготвува пред ваши очи.",
    "Explore Our Menu": "Погледнете го менито",
    "Scroll": "Надолу",
    "est. today": "отворено денес",
    "Skopje, MK": "Скопје, МК",
    "Our approach": "Нашиот пристап",
    "Coffee is more than a drink.": "Кафето е повеќе од пијалак.",
    "At miau coffee, every cup starts long before it reaches your table — with specialty-grade beans chosen for their story, their origin and the way they taste when they're treated with care.": "Во miau coffee, секоја шолја започнува многу пред да стигне до вашата маса — со специјалитетни зрна, избрани поради нивната приказна, потеклото и вкусот што го добиваат кога се третираат со грижа.",
    "We roast relationships with the farms we buy from as carefully as we roast the beans themselves, then brew each drink by hand using methods chosen to bring out what makes that coffee worth drinking slowly.": "Односите со фармите од кои купуваме ги градиме исто толку внимателно колку што се пржат и самите зрна. Потоа секој пијалак го подготвуваме рачно, со метод што најдобро ја истакнува вредноста на тоа кафе — за да се пие полека, со уживање.",
    "Specialty-grade beans, carefully selected origins": "Специјалитетни зрна од внимателно избрани региони",
    "Professional brewing & genuine craftsmanship": "Професионална подготовка и вистинско мајсторство",
    "An atmosphere built for community & quality time": "Атмосфера за дружење и квалитетно поминато време",
    "On the bar this month": "Овој месец на шанкот",
    "Featured specialty coffee": "Издвоени специјалитетни кафиња",
    "Three origins we're pouring right now — available by the cup at the café, or by the bag to take home.": "Три кафиња што ги служиме во моментов — достапни на шолја во кафулето или во пакување за дома.",
    "Ethiopia": "Етиопија",
    "Colombia": "Колумбија",
    "Brazil": "Бразил",
    "Jasmine · Peach · Lemon": "Јасмин · праска · лимон",
    "Caramel · Red Apple · Chocolate": "Карамела · црвено јаболко · чоколадо",
    "Hazelnut · Cocoa · Brown Sugar": "Лешник · какао · кафеав шеќер",
    "Light Roast": "Светло печење",
    "Medium Roast": "Средно печење",
    "Medium-Light": "Средно-светло печење",
    "Washed": "Мокра обработка",
    "Natural": "Сува обработка",
    "Discover": "Дознајте повеќе",
    "From the bar": "Од шанкот",
    "Popular right now": "Најбарано во моментов",
    "A handful of café favourites — the full menu has plenty more to explore.": "Неколку омилени пијалаци на нашите гости — во целото мени ќе најдете уште многу.",
    "A concentrated, syrupy shot — the foundation of everything we pour.": "Концентриран, густ шот — основа на сè што служиме.",
    "Espresso, steamed milk and a deep layer of silky microfoam.": "Espresso, загреано млеко и дебел слој свилена пена.",
    "Ristretto shots with velvety milk, for a smaller and stronger cup.": "Ristretto со кадифено млеко — помала, но посилна шолја.",
    "Hand-poured filter coffee — clean, bright and aromatic.": "Рачно подготвено филтер-кафе — чисто, свежо и ароматично.",
    "Steeped for 18 hours — smooth, low-acid and naturally sweet.": "Се натопува 18 часа — мазно, со ниска киселост и природно слатко.",
    "Espresso over ice with cold milk, lightly sweet and refreshing.": "Espresso со мраз и ладно млеко — благо слатко и освежително.",
    "View Full Menu": "Целото мени",
    "Why miau coffee": "Зошто miau coffee",
    "What makes our cup different": "По што се разликува нашето кафе",
    "Specialty Grade Beans": "Специјалитетни зрна",
    "Carefully selected high-quality coffee beans, scored and chosen for character, not volume.": "Внимателно избрани висококвалитетни зрна, оценети и одбрани поради карактерот, а не поради количината.",
    "Expert Brewing": "Стручна подготовка",
    "Prepared using professional brewing techniques, dialed in cup by cup, day by day.": "Подготвено со професионални техники и прецизно нагодено — шолја по шолја, ден по ден.",
    "Freshly Roasted": "Свежо печено",
    "Coffee selected from trusted specialty roasters and rotated to stay at its peak.": "Кафе од доверливи пржарници на специјалитетно кафе, редовно обновувано за да биде секогаш свежо.",
    "Cozy Atmosphere": "Пријатна атмосфера",
    "A comfortable place to sit, work, meet or simply enjoy a great cup of coffee.": "Удобно место за седење, работа, средби или едноставно уживање во добро кафе.",
    "Brewing experience": "Начини на подготовка",
    "Four ways we bring out the flavour": "Четири начини да го истакнеме вкусот",
    "Every method changes the story a coffee tells. Our baristas choose the right one for the beans on the bar that day.": "Секој метод открива поинаква страна на кафето. Нашите баристи го избираат вистинскиот за зрната што ги имаме тој ден.",
    "Pressure Brewed": "Под притисок",
    "Pour Over": "Рачно прелевање",
    "Immersion": "Натопување",
    "Discover Brewing Methods": "Методите на подготовка",
    "Inside miau": "Внатре во miau",
    "A look around the café": "Прошетка низ кафулето",
    "View Gallery": "Погледнете ја галеријата",
    "Come say hi": "Свратете кај нас",
    "Join us": "Придружете ни се",
    "Coffee tastings, workshops & more": "Дегустации, работилници и уште многу",
    "From latte art lessons to home-brewing workshops, there's always something happening at miau.": "Од часови по latte art до работилници за подготовка на кафе дома — во miau секогаш се случува нешто.",

    /* ---------- about.html ---------- */
    "About Us — miau coffee": "За нас — miau coffee",
    "Meet miau coffee: our story, what specialty coffee means to us, our philosophy and the team behind the counter.": "Запознајте го miau coffee: нашата приказна, што за нас значи специјалитетното кафе, нашата филозофија и тимот зад шанкот.",
    "/ About Us": "/ За нас",
    "Our story": "Нашата приказна",
    "Made by people who love coffee, for people who do too.": "Од љубители на кафе, за љубители на кафе.",
    "A small team, a lot of cups, and a genuine curiosity about where coffee comes from.": "Мал тим, многу шолји и искрена љубопитност за тоа од каде доаѓа кафето.",
    "How it started": "Како започна сè",
    "miau coffee began with a simple frustration: it was hard to find coffee in the city that was treated with the same care all the way from farm to cup. So we started roaster visits, cupping sessions, and a lot of testing — chasing beans with real character instead of just a bag with a nice label.": "miau coffee започна од едноставна фрустрација: во градот тешко се наоѓаше кафе за кое се внимава на секој чекор, од фармата до шолјата. Затоа почнавме да посетуваме пржарници, да организираме дегустации и многу да пробуваме — во потрага по зрна со вистински карактер, а не само по пакување со убава етикета.",
    "What grew out of that was a small café built around craftsmanship, honest sourcing, and a room worth lingering in. We wanted a place where a curious first-time visitor and a seasoned coffee nerd could both find something worth coming back for.": "Така настана мало кафуле засновано на мајсторство, чесна набавка и простор во кој сакате да останете подолго. Сакавме место каде и љубопитниот гостин што доаѓа прв пат и искусниот познавач на кафе ќе најдат причина повторно да се вратат.",
    "Today, miau coffee is where we welcome our neighbourhood every morning, host tastings and workshops most weeks, and keep chasing the next great cup — one origin at a time.": "Денес miau coffee е место каде секое утро ги пречекуваме нашите соседи, речиси секоја недела организираме дегустации и работилници и постојано трагаме по следното одлично кафе — регион по регион.",
    "A quick primer": "Кратко објаснување",
    "What is specialty coffee?": "Што е специјалитетно кафе?",
    "It's a simple idea with a lot of craft behind it: coffee graded, sourced and prepared with enough care that its origin actually shows up in the cup.": "Идејата е едноставна, но зад неа стои многу знаење: кафе што е оценето, набавено и подготвено со толку грижа што неговото потекло навистина се чувствува во шолјата.",
    "Traceable origins": "Познато потекло",
    "Specialty coffee is scored above 80 points and can be traced back to a specific farm, region and harvest — not just a country of origin.": "Специјалитетното кафе има оценка над 80 поени и може да се следи до конкретна фарма, регион и берба — а не само до земјата на потекло.",
    "Careful processing & roasting": "Внимателна обработка и печење",
    "How the cherry is processed — washed, natural or honey — and how it's roasted both shape the flavour long before it reaches us.": "Начинот на обработка на плодот — мокра, сува или honey — и начинот на печење го обликуваат вкусот многу пред кафето да стигне до нас.",
    "Brewed & tasted with intent": "Подготвено и дегустирано со цел",
    "Correct grind, water and technique bring out tasting notes — fruit, florals, chocolate — that are cupped and recorded, not guessed at.": "Правилното мелење, водата и техниката ги откриваат нотите на вкус — овошни, цветни, чоколадни — кои се дегустираат и запишуваат, а не се претпоставуваат.",
    "Traceability": "Следливост",
    "Processing": "Обработка",
    "Roasting": "Печење",
    "Brewing": "Подготовка",
    "Tasting Notes": "Ноти на вкус",
    "What guides us": "Што нè води",
    "Our philosophy": "Нашата филозофија",
    "Quality": "Квалитет",
    "We taste and score every coffee before it earns a place on our shelf or our menu.": "Секое кафе го дегустираме и оценуваме пред да се најде на нашата полица или во менито.",
    "Sustainability": "Одржливост",
    "We favour direct and transparent trade with farms that treat their land and workers well.": "Претпочитаме директна и транспарентна соработка со фарми што се грижат за својата земја и за своите работници.",
    "Craftsmanship": "Мајсторство",
    "Every method — espresso to Chemex — is trained, timed and dialed in with intention.": "Секој метод — од espresso до Chemex — е увежбан, точно темпиран и внимателно нагоден.",
    "Community": "Заедница",
    "Our café is built to be shared — with neighbours, regulars and curious first-timers alike.": "Нашето кафуле е создадено за дружење — со соседи, редовни гости и љубопитни нови посетители.",
    "Behind the counter": "Зад шанкот",
    "Our Team": "Нашиот тим",
    "Our team": "Нашиот тим",
    "The people pulling shots, dialing in grinders and greeting you by name.": "Луѓето што ви го подготвуваат кафето, ги нагодуваат мелничките и ве поздравуваат по име.",
    "Elena Petrova": "Елена Петрова",
    "Mira Kovač": "Мира Ковач",
    "Dario Ilievski": "Дарио Илиевски",
    "Ana Trajkova": "Ана Трајкова",
    "Head Barista": "Главен бариста",
    "Barista": "Бариста",
    "Coffee Specialist": "Специјалист за кафе",
    "Café Manager": "Менаџер на кафулето",
    "Come meet us": "Дојдете да се запознаеме",
    "Best experienced in person": "Најдобро е да се доживее во живо",
    "Stop by for a cup, ask us anything about the beans on the bar, or join one of our workshops.": "Свратете на кафе, прашајте нè сè за зрната што ги служиме или придружете се на некоја од нашите работилници.",
    "See Events": "Погледнете ги настаните",

    /* ---------- menu.html ---------- */
    "Menu — miau coffee": "Мени — miau coffee",
    "Explore the full miau coffee menu: espresso-based drinks, filter coffee, cold coffee, teas and lattes, plus pastries and desserts.": "Разгледајте го целото мени на miau coffee: пијалаци со espresso, филтер-кафе, ладно кафе, чаеви и лате, како и пецива и десерти.",
    "/ Menu": "/ Мени",
    "On the bar": "На шанкот",
    "Our Menu": "Нашето мени",
    "Espresso, filter, cold coffee and a few things to go with it. Prices in Macedonian denars (MKD).": "Espresso, филтер-кафе, ладно кафе и нешто благо покрај нив. Цените се во македонски денари (MKD).",
    "Espresso Based": "Пијалаци со espresso",
    "Filter Coffee": "Филтер-кафе",
    "Cold Coffee": "Ладно кафе",
    "Other Drinks": "Други пијалаци",
    "Food & Desserts": "Храна и десерти",
    "A single concentrated shot, pulled to order.": "Еден концентриран шот, подготвен по нарачка.",
    "Two shots, for when one isn't enough.": "Два шота — за кога еден не е доволен.",
    "Espresso lengthened with hot water.": "Espresso разредено со топла вода.",
    "Espresso, steamed milk, deep microfoam.": "Espresso, загреано млеко, богата пена.",
    "Oat Milk Available": "Може со овесно млеко",
    "Ristretto shots, velvety steamed milk.": "Ristretto, кадифено загреано млеко.",
    "Espresso with plenty of steamed milk.": "Espresso со повеќе загреано млеко.",
    "Decaf Available": "Може без кофеин",
    "Equal parts espresso and warm milk.": "Еднаков дел espresso и топло млеко.",
    "Hand-poured, clean and aromatic. Ask about today's origin.": "Рачно подготвено, чисто и ароматично. Прашајте кое кафе го служиме денес.",
    "Brewed to share — smooth, bright, served for two.": "За споделување — мазно и свежо, за двајца.",
    "Full-flavoured and versatile, brewed to order.": "Со богат вкус и многу можности, подготвено по нарачка.",
    "Our drip coffee of the day, always fresh.": "Нашето филтер-кафе на денот, секогаш свежо.",
    "Vegan": "Веганско",
    "Steeped 18 hours — smooth and naturally sweet.": "Се натопува 18 часа — мазно и природно слатко.",
    "Espresso, cold milk, plenty of ice.": "Espresso, ладно млеко и многу мраз.",
    "Espresso and water over ice.": "Espresso и вода со мраз.",
    "Espresso over tonic water and ice — bright and bittersweet.": "Espresso со тоник и мраз — освежително и горчливо-слатко.",
    "Ceremonial-grade matcha with steamed milk.": "Церемонијална matcha со загреано млеко.",
    "Spiced black tea concentrate, steamed milk.": "Зачинет црн чај со загреано млеко.",
    "Hot Chocolate": "Топло чоколадо",
    "Rich and thick, made with real cocoa.": "Густо и богато, со вистинско какао.",
    "Tea": "Чај",
    "A small selection of loose-leaf black, green & herbal tea.": "Мал избор на црн, зелен и билен чај во лист.",
    "Croissant": "Кроасан",
    "All-butter, baked fresh each morning.": "Со путер, свежо печен секое утро.",
    "Cinnamon Roll": "Ролат со цимет",
    "Soft, spiced, and lightly glazed.": "Мек, мирислив и благо глазиран.",
    "Cheesecake": "Чизкејк",
    "Creamy New York-style, with seasonal berries.": "Кремаст, њујоршки стил, со сезонско бобинесто овошје.",
    "Tiramisu": "Тирамису",
    "Espresso-soaked layers, mascarpone, cocoa.": "Кори натопени во espresso, маскарпоне и какао.",
    "Banana Bread": "Колач од банана",
    "Moist, walnut-topped, baked in house.": "Сочен, со ореви, печен кај нас.",
    "Prices include VAT. Ask your barista about current decaf, oat and seasonal specials.": "Цените се со вклучен ДДВ. Прашајте го баристата за кафе без кофеин, овесно млеко и сезонските специјалитети.",

    /* ---------- our-coffee.html ---------- */
    "Our Coffee — miau coffee": "Нашето кафе — miau coffee",
    "Meet the specialty coffee beans behind our menu — origins, regions, roast levels, processing and tasting notes, all available at our café.": "Запознајте ги специјалитетните зрна зад нашето мени — потекло, региони, степен на печење, обработка и ноти на вкус. Сите се достапни во нашето кафуле.",
    "/ Our Coffee": "/ Нашето кафе",
    "Beans & origins": "Зрна и потекло",
    "The coffee behind every cup": "Кафето во секоја шолја",
    "Every bag on our shelf is chosen, cupped and approved before it earns a place at miau. Here's what's currently in rotation — all available to drink in, or take home by the bag.": "Секое пакување на нашата полица е избрано, дегустирано и одобрено пред да се најде во miau. Еве што нудиме во моментов — за пиење кај нас или за дома, во пакување.",
    "Currently pouring": "Во моментов служиме",
    "Four origins, four stories": "Четири региони, четири приказни",
    "Each coffee is roasted by trusted specialty roasters we've cupped and vetted ourselves.": "Секое кафе го печат доверливи пржарници на специјалитетно кафе, кои лично сме ги провериле.",
    "Available at our café": "Достапно во нашето кафуле",
    "Grown at high altitude in the birthplace of coffee, this washed Yirgacheffe is floral, delicate and bright — the coffee we reach for when we want to show someone what specialty coffee can taste like.": "Одгледано на голема надморска височина во татковината на кафето, ова Yirgacheffe со мокра обработка е цветно, нежно и свежо — кафето што го нудиме кога сакаме некому да му покажеме каков вкус може да има специјалитетното кафе.",
    "Region": "Регион",
    "Roast": "Печење",
    "Light": "Светло",
    "Medium": "Средно",
    "Process": "Обработка",
    "Recommended": "Препорачан метод",
    "Espresso / Filter": "Espresso / филтер",
    "Tasting notes: Jasmine · Lemon · Peach": "Ноти на вкус: јасмин · лимон · праска",
    "A well-balanced, crowd-pleasing cup from the mountains of Huila — sweet, syrupy, and equally at home as an espresso or a filter brew.": "Добро избалансирано кафе од планините на Huila што им се допаѓа на сите — слатко, густо и подеднакво добро како espresso или како филтер-кафе.",
    "Tasting notes: Caramel · Apple · Milk Chocolate": "Ноти на вкус: карамела · јаболко · млечно чоколадо",
    "Natural-processed and full-bodied, this is our house espresso base — nutty, chocolatey and forgiving, with a sweetness that holds up beautifully in milk.": "Со сува обработка и полно тело, ова е основата на нашето espresso — со ноти на јаткасти плодови и чоколадо, стабилно и со слаткост што одлично се спојува со млеко.",
    "Tasting notes: Hazelnut · Cocoa · Brown Sugar": "Ноти на вкус: лешник · какао · кафеав шеќер",
    "Bold and juicy, with the signature acidity Kenyan coffees are known for. A favourite among our regulars who like a coffee with a little more punch.": "Силно и сочно, со препознатливата киселост по која се познати кениските кафиња. Омилено кај нашите редовни гости што сакаат кафе со повеќе карактер.",
    "Tasting notes: Blackcurrant · Citrus · Berry": "Ноти на вкус: црна рибизла · цитрус · бобинки",
    "Behind the bag": "Зад секое пакување",
    "From farm to cup": "Од фармата до шолјата",
    "Grown & picked": "Одгледано и набрано",
    "Ripe cherries are hand-picked at altitude, often on small family-run farms we buy directly from.": "Зрелите плодови се берат рачно на висина, често на мали семејни фарми од кои купуваме директно.",
    "Roasted with care": "Печено со грижа",
    "Our roaster partners profile each origin individually, roasting in small batches to protect delicate notes.": "Нашите партнери-пржари го печат секое кафе посебно, во мали количини, за да ги зачуваат нежните ноти.",
    "Poured for you": "Подготвено за вас",
    "Ground to order and brewed by hand, so every cup reflects the coffee at its freshest.": "Мелено по нарачка и рачно подготвено, за секоја шолја да го покаже кафето во најсвежо издание.",
    "Take it home": "Однесете го дома",
    "Ask us to bag one up for you": "Побарајте да ви спакуваме",
    "All our current origins are available whole-bean or ground to order, right at the counter.": "Сите кафиња што ги нудиме во моментов се достапни во зрно или мелени по нарачка, директно на шанкот.",

    /* ---------- brewing-methods.html ---------- */
    "Brewing Methods — miau coffee": "Методи на подготовка — miau coffee",
    "Espresso, V60, Chemex, Aeropress and French Press — learn how each brewing method changes the flavour of your coffee at miau coffee.": "Espresso, V60, Chemex, Aeropress и French Press — дознајте како секој метод на подготовка го менува вкусот на кафето во miau coffee.",
    "/ Brewing Methods": "/ Методи на подготовка",
    "How we brew": "Како подготвуваме",
    "Five ways to make a great cup": "Пет начини за одлично кафе",
    "The right method depends on the coffee, the day, and what you're in the mood for. Here's what each one brings to the cup.": "Вистинскиот метод зависи од кафето, денот и од тоа што ви се пие. Еве што носи секој од нив.",
    "Pressure brewed": "Под притисок",
    "Finely-ground coffee is compressed and forced through with hot water under high pressure, producing a small, concentrated shot topped with crema. It's the base for most drinks on our menu.": "Низ ситно мелено и набиено кафе се пропушта топла вода под висок притисок, при што се добива мал, концентриран шот со крема. Тоа е основата на повеќето пијалаци во нашето мени.",
    "Brew Time": "Време на подготовка",
    "25–30 seconds": "25–30 секунди",
    "Flavour": "Вкус",
    "Bold, concentrated, syrupy": "Силен, концентриран, густ",
    "Style": "Начин",
    "Pressure extraction": "Екстракција под притисок",
    "We recommend": "Препорачуваме",
    "Pour over": "Рачно прелевање",
    "A cone-shaped dripper and paper filter let water pass through coffee grounds slowly and evenly. The result is clean, aromatic, and shows off delicate, high-toned flavours beautifully.": "Конусниот држач и хартиениот филтер овозможуваат водата полека и рамномерно да помине низ меленото кафе. Резултатот е чисто и ароматично кафе во кое одлично се истакнуваат нежните, свежи ноти.",
    "2.5–3.5 minutes": "2,5–3,5 минути",
    "Clean, bright, aromatic": "Чист, свеж, ароматичен",
    "Pour-over, single cup": "Прелевање, една шолја",
    "An hourglass carafe and thick proprietary filter produce an exceptionally clean, smooth cup with heavier sediment and oils filtered out. Brewed to share, and worth the wait.": "Стаклениот сад во форма на песочен часовник и дебелиот филтер даваат исклучително чисто и мазно кафе, без талог и потешки масла. Се подготвува за споделување и вреди да се почека.",
    "4–5 minutes": "4–5 минути",
    "Smooth, delicate, tea-like": "Мазен, нежен, сличен на чај",
    "Pour-over, shareable": "Прелевање, за повеќе лица",
    "Immersion & pressure": "Натопување и притисок",
    "Coffee steeps briefly before being pressed through a filter with gentle pressure. Fast, forgiving and endlessly adjustable — it can taste like a light filter cup or a small, punchy espresso alternative.": "Кафето кратко се натопува, а потоа со благ притисок се протиснува низ филтер. Брз, едноставен и многу прилагодлив метод — кафето може да потсетува на лесно филтер-кафе или на мала, силна замена за espresso.",
    "1.5–2 minutes": "1,5–2 минути",
    "Full-bodied, versatile": "Полно тело, разновиден",
    "Immersion + pressure": "Натопување + притисок",
    "Coarse grounds steep fully immersed in hot water before being separated with a metal mesh plunger. No paper filter means more body and natural oils make it into the cup.": "Крупно меленото кафе целосно се натопува во топла вода, а потоа се одвојува со метален клип со мрежа. Бидејќи нема хартиен филтер, кафето има полно тело и ги задржува природните масла.",
    "4 minutes": "4 минути",
    "Full-bodied, rich, rounded": "Полно тело, богат, заоблен",
    "Full immersion": "Целосно натопување",
    "Want to learn more?": "Сакате да научите повеќе?",
    "Join a home brewing workshop": "Пријавете се на работилница за подготовка дома",
    "We run hands-on sessions covering V60, Aeropress and Chemex so you can brew like this at home too.": "Организираме практични работилници за V60, Aeropress и Chemex, за да можете вака да подготвувате кафе и дома.",

    /* ---------- gallery.html ---------- */
    "Gallery — miau coffee": "Галерија — miau coffee",
    "A visual look inside miau coffee — latte art, espresso, roasted beans, our café interior, baristas at work and more.": "Поглед во miau coffee — latte art, espresso, печени зрна, ентериерот на кафулето, баристите на работа и многу повеќе.",
    "/ Gallery": "/ Галерија",
    "A look at the coffee, the craft and the room we've built around them. Click any image to zoom in.": "Кафето, мајсторството и просторот што го создадовме околу нив. Кликнете на сликата за да ја зголемите.",
    "Latte art being poured tableside": "Latte art што се црта пред гостинот",
    "Latte Art": "Latte art",
    "Espresso extracting into a glass": "Espresso што тече во чаша",
    "A flower latte art design on a wooden table": "Latte art во облик на цвет, на дрвена маса",
    "A scoop of freshly roasted coffee beans": "Лажица свежо печени зрна кафе",
    "Roasted Beans": "Печени зрна",
    "Behind the counter at miau coffee": "Зад шанкот во miau coffee",
    "Chemex brewing equipment": "Опрема за Chemex",
    "Brewing Equipment": "Опрема за подготовка",
    "Dusting sugar over a fresh pastry": "Свежо пециво посипано со шеќер во прав",
    "Pastries": "Пецива",
    "A cozy window seat at miau coffee": "Пријатно место до прозорецот во miau coffee",
    "Café Interior": "Ентериер",
    "Latte art in a glass cup": "Latte art во стаклена шолја",
    "A coffee cupping and tasting session": "Дегустација на кафе",
    "Cupping": "Дегустација",
    "Coffee cherries picked at origin": "Набрани плодови на кафе",
    "Origin": "Потекло",
    "Coffee beans in the roasting drum": "Зрна кафе во барабанот за печење",
    "See it in person": "Видете го во живо",
    "Even better with a cup in hand": "Уште поубаво со шолја в рака",
    "Photos only go so far — come sit down and see the café for yourself.": "Фотографиите не кажуваат сè — дојдете, седнете и доживејте го кафулето сами.",

    /* ---------- events.html ---------- */
    "Events & Workshops — miau coffee": "Настани и работилници — miau coffee",
    "Join miau coffee for tastings, latte art lessons and home brewing workshops. Reserve your spot — no payment required.": "Придружете се на дегустациите, часовите по latte art и работилниците за подготовка на кафе во miau coffee. Резервирајте место — без плаќање однапред.",
    "/ Events": "/ Настани",
    "Learn & taste with us": "Учете и дегустирајте со нас",
    "Events & Workshops": "Настани и работилници",
    "Small-group tastings and hands-on workshops, held right at the café. Spots are limited — reserve ahead.": "Дегустации и практични работилници во мали групи, во самото кафуле. Местата се ограничени — резервирајте навреме.",
    "Tasting": "Дегустација",
    "Workshop": "Работилница",
    "Talk": "Предавање",
    "Coffee Tasting Evening": "Вечер на дегустација на кафе",
    "Latte Art Workshop": "Работилница за latte art",
    "Home Brewing Workshop": "Работилница за подготовка на кафе дома",
    "Meet the Roaster": "Запознајте го пржарот",
    "15 October": "15 октомври",
    "24 October": "24 октомври",
    "2 November": "2 ноември",
    "10 November": "10 ноември",
    "19:00 · 90 min": "19:00 · 90 мин.",
    "18:00 · 90 min": "18:00 · 90 мин.",
    "17:00 · 2 hours": "17:00 · 2 часа",
    "19:00 · 75 min": "19:00 · 75 мин.",
    "Discover different specialty coffee origins side by side, guided by our team through aroma, acidity and tasting notes.": "Споредете специјалитетни кафиња од различни региони, со нашиот тим како водич низ аромата, киселоста и нотите на вкус.",
    "Learn how to steam milk properly and pour your first heart and rosetta, with plenty of hands-on practice at the bar.": "Научете правилно да го загреете млекото и нацртајте ги своите први срце и розета, со многу вежбање на шанкот.",
    "A hands-on session covering V60, Aeropress and Chemex techniques so you can brew great coffee at home.": "Практична работилница за V60, Aeropress и Chemex, за да можете да подготвувате одлично кафе и дома.",
    "One of our roasting partners joins us to talk through how roast level and profile shape what ends up in your cup.": "Еден од нашите партнери-пржари ќе зборува за тоа како степенот и начинот на печење влијаат на вкусот во вашата шолја.",
    "Limited to 12 guests": "Најмногу 12 гости",
    "Limited to 8 guests": "Најмногу 8 гости",
    "Limited to 10 guests": "Најмногу 10 гости",
    "Limited to 20 guests": "Најмногу 20 гости",
    "Reserve a Spot": "Резервирајте место",
    "Choose an event to reserve.": "Изберете настан за резервација.",
    "Coffee Tasting Evening — 15 October, 19:00": "Вечер на дегустација на кафе — 15 октомври, 19:00",
    "Latte Art Workshop — 24 October, 18:00": "Работилница за latte art — 24 октомври, 18:00",
    "Home Brewing Workshop — 2 November, 17:00": "Работилница за подготовка на кафе дома — 2 ноември, 17:00",
    "Meet the Roaster — 10 November, 19:00": "Запознајте го пржарот — 10 ноември, 19:00",
    "Thank you — your spot is reserved! We'll email you a confirmation shortly.": "Ви благодариме — вашето место е резервирано! Наскоро ќе ви испратиме потврда по е-пошта.",
    "Full Name": "Име и презиме",
    "Email": "Е-пошта",
    "Number of Guests": "Број на гости",
    "Confirm Reservation": "Потврдете ја резервацијата",
    "No payment required — we'll see you at the door.": "Не е потребно плаќање — се гледаме на настанот.",

    /* ---------- visit-us.html ---------- */
    "Visit Us — miau coffee": "Посетете нè — miau coffee",
    "Find miau coffee: address, opening hours, contact details and directions to our specialty coffee shop.": "Каде е miau coffee: адреса, работно време, контакт и упатство како да стигнете до нашето кафуле за специјалитетно кафе.",
    "/ Visit Us": "/ Посетете нè",
    "Come say hello": "Свратете кај нас",
    "Find your way to miau": "Патот до miau",
    "We're a short walk from the city centre — come in for a cup, or just to sit for a while.": "Сме на неколку минути пешки од центарот — свратете на кафе или само да поседите малку.",
    "Phone:": "Телефон:",
    "Email:": "Е-пошта:",
    "Café Features": "Што нудиме",
    "Wi-Fi Available": "Бесплатен Wi-Fi",
    "Outdoor Seating": "Тераса",
    "Pet Friendly": "Миленичињата се добредојдени",
    "Takeaway Available": "Кафе за носење",
    "Around the café": "Во кафулето",
    "What to expect when you get here": "Што ве очекува кај нас",
    "A spot to slow down": "Место за одмор",
    "Window seats, communal tables and a quiet corner or two — plenty of ways to enjoy your visit.": "Места до прозорецот, заеднички маси и по некое мирно ќоше — секој ќе најде место за себе.",
    "Baristas who know their beans": "Баристи што ги познаваат своите зрна",
    "Ask us anything about what's on the bar — we love talking through origins and brew methods.": "Прашајте нè сè за кафето што го служиме — сакаме да зборуваме за потеклото и методите на подготовка.",
    "Fresh pastries daily": "Свежи пецива секој ден",
    "Croissants, cinnamon rolls and a rotating dessert case, baked in small batches each morning.": "Кроасани, ролати со цимет и десерти што постојано се менуваат, печени секое утро во мали количини.",

    /* ---------- contact.html ---------- */
    "Contact — miau coffee": "Контакт — miau coffee",
    "Get in touch with miau coffee — send us a message, or find our phone, email and social details.": "Контактирајте го miau coffee — испратете ни порака или пронајдете ги нашиот телефон, е-пошта и профили на социјалните мрежи.",
    "/ Contact": "/ Контакт",
    "We'd love to hear from you": "Со задоволство ќе ви одговориме",
    "Get in touch": "Контактирајте нè",
    "Send a message": "Пишете ни",
    "Send us a message": "Испратете ни порака",
    "Thank you! Your message has been received.": "Ви благодариме! Вашата порака е примена.",
    "We'll get back to you within a day or two.": "Ќе ви одговориме во рок од еден до два дена.",
    "Contact form": "Контакт-формулар",
    "Phone": "Телефон",
    "(optional)": "(незадолжително)",
    "Subject": "Тема",
    "Choose a topic": "Изберете тема",
    "General question": "Општо прашање",
    "Events & workshops": "Настани и работилници",
    "Wholesale / beans": "Продажба на големо / зрна",
    "Feedback": "Мислење и предлози",
    "Message": "Порака",
    "Send Message": "Испрати порака",
    "Café details": "Информации за кафулето",
    "Follow Along": "Следете нè",

    /* ---------- journal.html ---------- */
    "Coffee Journal — miau coffee": "Блог за кафе — miau coffee",
    "Notes on specialty coffee from miau coffee — what makes coffee 'specialty', brewing guides, processing, tasting notes and more.": "Текстови за специјалитетното кафе од miau coffee — што го прави кафето специјалитетно, упатства за подготовка, обработка, ноти на вкус и многу повеќе.",
    "/ Coffee Journal": "/ Блог за кафе",
    "Notes from the bar": "Белешки од шанкот",
    "Short reads on specialty coffee — for the curious and the caffeinated alike.": "Кратки текстови за специјалитетното кафе — за љубопитните и за вљубениците во кафе.",
    "Basics": "Основи",
    "Origins": "Потекло",
    "Buying Guide": "Совети за купување",
    "4 min read": "4 мин. читање",
    "5 min read": "5 мин. читање",
    "6 min read": "6 мин. читање",
    "7 min read": "7 мин. читање",
    "Read More": "Прочитајте повеќе",
    "What Makes Coffee \"Specialty\"?": "Што го прави кафето специјалитетно?",
    "A quick primer on scoring, traceability and why it matters what's in your cup.": "Кратко за оценувањето, следливоста и зошто е важно што пиете.",
    "Espresso vs Filter Coffee": "Espresso или филтер-кафе",
    "Same beans, two very different cups — here's why, and how to pick between them.": "Исти зрна, две сосема различни кафиња — зошто е така и како да изберете.",
    "How Processing Changes Flavour": "Како обработката влијае на вкусот",
    "Washed, natural or honey — the way a cherry is processed shapes everything downstream.": "Мокра, сува или honey — начинот на обработка на плодот влијае на сè што следи.",
    "How to Choose Coffee Beans": "Како да изберете зрна кафе",
    "Roast date, origin and roast level — what actually matters when picking a bag.": "Датум на печење, потекло и степен на печење — што навистина е важно при изборот.",
    "Beginner's Guide to Pour-Over": "Рачно прелевање за почетници",
    "A simple, repeatable V60 method to get you a great cup at home.": "Едноставен V60 рецепт што лесно се повторува, за одлично кафе дома.",
    "Understanding Tasting Notes": "Како да ги разберете нотите на вкус",
    "\"Jasmine\" or \"brown sugar\" on a bag isn't marketing fluff — here's what it means.": "„Јасмин“ или „кафеав шеќер“ на пакувањето не се маркетинг — еве што значат.",

    /* ---------- journal-article.html ---------- */
    "What Makes Coffee \"Specialty\"? — miau coffee Journal": "Што го прави кафето специјалитетно? — Блог на miau coffee",
    "A quick primer on what specialty coffee actually means — scoring, traceability, origin and why it matters what's in your cup.": "Кратко објаснување што всушност е специјалитетно кафе — оценување, следливост, потекло и зошто е важно што пиете.",
    "/ What Makes Coffee Specialty?": "/ Што го прави кафето специјалитетно?",
    "Basics · 5 min read": "Основи · 5 мин. читање",
    "Walk into any grocery store and you'll find shelves of coffee labeled \"premium,\" \"gourmet,\" or \"finest quality\" — words that mean almost nothing. Specialty coffee is different. It's not a marketing term; it's a graded classification with a real, testable standard behind it.": "Во секоја продавница ќе најдете полици со кафе означено како „премиум“, „гурманско“ или „врвен квалитет“ — зборови што речиси ништо не значат. Специјалитетното кафе е нешто друго. Тоа не е маркетиншки термин, туку категорија заснована на оценување, зад која стои вистински стандард што може да се провери.",
    "It starts with a score": "Сè започнува со оценка",
    "Specialty coffee is any coffee that scores 80 points or above on a 100-point scale used by certified tasters, known as Q-graders. They evaluate aroma, acidity, body, sweetness and aftertaste in a structured cupping session — the same tasting method our own team uses when we're deciding what goes on the bar.": "Специјалитетно е секое кафе што ќе добие 80 или повеќе поени на скалата од 100 поени што ја користат сертифицираните дегустатори, т.н. Q-graders. Тие ги оценуваат аромата, киселоста, телото, слаткоста и завршниот вкус по точно утврдена постапка (cupping) — истиот метод што го користи и нашиот тим кога одлучува кое кафе ќе го служиме.",
    "Anything scoring below 80 is considered commercial-grade, which is what makes up the vast majority of coffee sold worldwide. The gap between commercial and specialty isn't subtle once you taste them side by side.": "Кафето со помалку од 80 поени се смета за комерцијално, а токму такво е најголемиот дел од кафето што се продава во светот. Кога ќе ги пробате едно до друго, разликата меѓу комерцијалното и специјалитетното кафе е веднаш очигледна.",
    "\"Specialty\" isn't a flavour — it's a standard. What that standard produces is coffee where a farm's soil, altitude and care actually show up in your cup.": "„Специјалитетно“ не е вкус — тоа е стандард. Резултатот е кафе во кое навистина се чувствуваат почвата, надморската височина и грижата на фармата.",
    "Traceability matters": "Следливоста е важна",
    "A specialty coffee can usually be traced back to a specific farm or cooperative, a particular harvest, and often a named variety of the plant itself. That traceability is what lets us tell you a coffee is from Yirgacheffe rather than just \"Ethiopia\" — and it's part of why we can vouch for how it was grown and processed.": "Специјалитетното кафе обично може да се следи до конкретна фарма или задруга, до одредена берба, а често и до сортата на самото растение. Благодарение на тоа можеме да ви кажеме дека едно кафе е од Yirgacheffe, а не само од „Етиопија“ — и затоа можеме да гарантираме како е одгледано и обработено.",
    "Ripe cherries are hand-picked, often on small family-run farms.": "Зрелите плодови се берат рачно, често на мали семејни фарми.",
    "Processing and roasting do the rest": "Обработката и печењето го прават останатото",
    "Once picked, cherries are processed — washed, dried naturally in the sun, or somewhere in between (honey process). Each method pulls out different flavours: washed coffees tend to be cleaner and brighter, naturals fruitier and heavier. From there, a roaster's decisions about time and temperature either protect or mute those characteristics.": "По бербата, плодовите се обработуваат — се мијат, се сушат природно на сонце или нешто помеѓу (т.н. honey обработка). Секој метод носи различни вкусови: кафињата со мокра обработка се обично почисти и посвежи, а оние со сува пообовошни и пополни. Потоа, одлуките на пржарот за времето и температурата на печење ги зачувуваат или ги пригушуваат тие особини.",
    "By the time a bag reaches our shelf, dozens of small decisions have already shaped what you'll taste. Our job is just the last step: brewing it in a way that lets all of that show.": "Додека пакувањето стигне до нашата полица, десетици мали одлуки веќе го обликувале вкусот. Нашата задача е само последниот чекор: кафето да го подготвиме така што сето тоа ќе дојде до израз.",
    "Why it's worth the difference in price": "Зошто ја вреди повисоката цена",
    "Specialty coffee usually costs more — for the farmer, the roaster, and you. That premium reflects real costs: more careful harvesting, smaller batches, and fairer prices paid back to origin. We think it's worth it, and we think you'll taste why.": "Специјалитетното кафе обично чини повеќе — за фармерот, за пржарот и за вас. Повисоката цена ги одразува вистинските трошоци: повнимателна берба, помали количини и пофер цени за производителите. Ние мислиме дека вреди — и сигурни сме дека ќе ја почувствувате разликата.",
    "Keep reading": "Продолжете со читање",
    "More from the journal": "Повеќе од блогот",

    /* ---------- privacy.html ---------- */
    "Privacy Policy — miau coffee": "Политика за приватност — miau coffee",
    "miau coffee's privacy policy — how we handle the information you share with us.": "Политика за приватност на miau coffee — како постапуваме со информациите што ги споделувате со нас.",
    "This Privacy Policy explains how miau coffee (\"we\", \"us\") collects, uses and protects information when you visit our website or contact us.": "Оваа Политика за приватност објаснува како miau coffee („ние“) ги собира, користи и заштитува информациите кога ја посетувате нашата веб-страница или кога ќе нè контактирате.",
    "Information we collect": "Кои информации ги собираме",
    "We collect information you voluntarily provide through our contact form or event reservation form, such as your name, email address, phone number and message. We do not collect payment or financial information through this website, as we do not process online orders or payments here.": "Ги собираме информациите што доброволно ги внесувате во контакт-формуларот или во формуларот за резервација на настан, како што се име, адреса на е-пошта, телефонски број и порака. Преку оваа веб-страница не собираме податоци за плаќање ниту финансиски податоци, бидејќи овде не примаме онлајн нарачки или плаќања.",
    "How we use it": "Како ги користиме",
    "We use the information you provide to respond to your enquiries, confirm event reservations, and occasionally send updates about workshops or news if you've asked to hear from us. We never sell your information to third parties.": "Информациите ги користиме за да одговориме на вашите прашања, да ги потврдиме резервациите за настани и повремено да ве известиме за работилници и новости, доколку сте побарале тоа. Вашите податоци никогаш не ги продаваме на трети страни.",
    "Cookies": "Колачиња",
    "Our website uses a small amount of browser storage to remember your cookie choice, language and theme. We do not use analytics or advertising trackers. See our": "Нашата веб-страница зачувува мала количина податоци во прелистувачот за да ги запомни вашиот избор за колачиња, јазикот и темата. Не користиме аналитика ниту рекламно следење. Повеќе во нашата",
    "for details.": ".",
    "Your rights": "Вашите права",
    "You can ask us at any time to access, correct or delete the personal information we hold about you by emailing": "Во секое време можете да побарате увид, исправка или бришење на личните податоци што ги чуваме за вас, на е-пошта",
    "Questions about this policy can be sent to hello@miaucoffee.mk or 12 Makedonija Street, 1000 Skopje, North Macedonia.": "Прашањата за оваа политика испратете ги на hello@miaucoffee.mk или на адреса ул. Македонија бр. 12, 1000 Скопје, Северна Македонија.",

    /* ---------- cookies.html ---------- */
    "Cookie Policy — miau coffee": "Политика за колачиња — miau coffee",
    "miau coffee's cookie policy — what cookies our website uses and why.": "Политика за колачиња на miau coffee — кои колачиња ги користи нашата веб-страница и зошто.",
    "This Cookie Policy explains how miau coffee uses cookies and similar browser storage on this website, and how you can control them.": "Оваа Политика за колачиња објаснува како miau coffee користи колачиња и слични начини на зачувување податоци во прелистувачот и како можете да ги контролирате.",
    "What are cookies?": "Што се колачиња?",
    "Cookies are small text files that a website saves in your browser. Similar technologies, such as your browser's local storage, work in a comparable way and are covered by this policy as well.": "Колачињата се мали текстуални датотеки што веб-страницата ги зачувува во вашиот прелистувач. Сличните технологии, како локалното складиште на прелистувачот (local storage), работат на сличен начин и исто така се опфатени со оваа политика.",
    "Essential cookies": "Неопходни колачиња",
    "We save your cookie consent choice (Accept or Reject) in a small cookie and in your browser's local storage, so the cookie banner does not appear again on every page. This is required for the consent banner to work.": "Вашиот избор (Прифати или Одбиј) го зачувуваме во мало колаче и во локалното складиште на прелистувачот, за известувањето за колачиња да не се појавува на секоја страница. Ова е неопходно за известувањето да функционира.",
    "Preference storage": "Зачувани поставки",
    "When you switch between light and dark mode, or between English and Macedonian, your choice is remembered in your browser's local storage so it stays the same as you move between pages. This information never leaves your device.": "Кога ќе изберете светол или темен режим, или англиски или македонски јазик, изборот се зачувува во локалното складиште на прелистувачот, за да остане ист на сите страници. Овие податоци никогаш не го напуштаат вашиот уред.",
    "Analytics and tracking": "Аналитика и следење",
    "We do not use analytics, advertising or tracking cookies. If optional cookies are ever added, they will only be used after you click \"Accept\".": "Не користиме колачиња за аналитика, рекламирање или следење. Ако некогаш додадеме опционални колачиња, тие ќе се користат само откако ќе кликнете „Прифати“.",
    "Third-party content": "Содржини од трети страни",
    "Some pages include an embedded Google Map. When the map loads, Google may set its own cookies according to Google's privacy policy.": "Некои страници содржат вградена Google мапа. При вчитување на мапата, Google може да постави свои колачиња, во согласност со политиката за приватност на Google.",
    "Change your cookie preferences": "Променете ги поставките за колачиња",
    "Your current choice:": "Вашиот моментален избор:",
    "Not set yet": "Сè уште не е избрано",
    "Accepted": "Прифатени",
    "Rejected": "Одбиени",
    "Accept cookies": "Прифати колачиња",
    "Reject cookies": "Одбиј колачиња",
    "Reset preference": "Поништи го изборот",
    "Managing cookies in your browser": "Управување со колачиња во прелистувачот",
    "Most browsers let you control cookies through their settings. You can choose to block or delete cookies, though some parts of the site may not work as intended if you do.": "Повеќето прелистувачи овозможуваат контрола на колачињата преку поставките. Можете да ги блокирате или избришете, но во тој случај некои делови од страницата можеби нема да работат правилно.",
    "Questions": "Прашања",
    "If you have questions about this policy, reach out to us at": "Ако имате прашања за оваа политика, пишете ни на",
    ". You can also read our": ". Прочитајте ја и нашата"
  };
  /*DICT-END*/

  var DICT = { mk: MK };

  /* ---------- engine ---------- */
  var ATTRS = ['aria-label', 'title', 'placeholder', 'data-caption'];
  var SKIP_SELECTOR = '[translate="no"], [data-i18n-skip], script, style, svg, noscript';
  var textEntries = [];   // { node, en, lead, trail }
  var attrEntries = [];   // { el, attr, en }
  var docTitleEn = document.title;
  var metaDesc = document.querySelector('meta[name="description"]');
  var metaDescEn = metaDesc ? metaDesc.getAttribute('content') : '';
  var current = 'en';

  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }

  function t(en, lang) {
    lang = lang || current;
    if (lang === 'en' || !en) return en;
    var d = DICT[lang];
    var key = norm(en);
    return (d && Object.prototype.hasOwnProperty.call(d, key)) ? d[key] : en;
  }

  function isSkipped(el) {
    return !!(el && el.closest && el.closest(SKIP_SELECTOR));
  }

  // Record the English text of every translatable node under root (run while the page is still English).
  function collect(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!/\S/.test(node.data) || isSkipped(node.parentElement)) return NodeFilter.FILTER_REJECT;
        return Object.prototype.hasOwnProperty.call(MK, norm(node.data)) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var n;
    while ((n = walker.nextNode())) {
      var m = n.data.match(/^(\s*)[\s\S]*?(\s*)$/);
      textEntries.push({ node: n, en: norm(n.data), lead: m[1], trail: m[2] });
    }
    var els = root.querySelectorAll ? root.querySelectorAll('[' + ATTRS.join('],[') + ']') : [];
    Array.prototype.forEach.call(els, function (el) {
      if (isSkipped(el)) return;
      ATTRS.forEach(function (attr) {
        var v = el.getAttribute(attr);
        if (v && Object.prototype.hasOwnProperty.call(MK, norm(v))) attrEntries.push({ el: el, attr: attr, en: v });
      });
    });
  }

  function render(lang) {
    textEntries.forEach(function (e) {
      e.node.data = lang === 'en' ? e.lead + e.en + e.trail : e.lead + t(e.en, lang) + e.trail;
    });
    attrEntries.forEach(function (e) {
      e.el.setAttribute(e.attr, lang === 'en' ? e.en : t(e.en, lang));
    });
    document.title = t(docTitleEn, lang);
    if (metaDesc) metaDesc.setAttribute('content', t(metaDescEn, lang));
  }

  function setLang(lang, save) {
    if (LANGS.indexOf(lang) === -1) lang = 'en';
    current = lang;
    document.documentElement.setAttribute('lang', lang);
    render(lang);
    document.querySelectorAll('[data-lang]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
    if (save) {
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* storage unavailable */ }
    }
    document.documentElement.classList.remove('i18n-pending');
    document.dispatchEvent(new CustomEvent('miau:langchange', { detail: { lang: lang } }));
  }

  function savedLang() {
    try { return localStorage.getItem(STORAGE_KEY) === 'mk' ? 'mk' : 'en'; } catch (e) { return 'en'; }
  }

  // Public API used by main.js
  window.miauI18n = {
    t: function (en) { return t(en); },
    getLang: function () { return current; },
    setLang: function (lang) { setLang(lang, true); },
    // translate content added to the page later (e.g. the gallery lightbox)
    register: function (root) {
      var before = textEntries.length, beforeAttr = attrEntries.length;
      collect(root);
      if (current !== 'en') {
        textEntries.slice(before).forEach(function (e) { e.node.data = e.lead + t(e.en) + e.trail; });
        attrEntries.slice(beforeAttr).forEach(function (e) { e.el.setAttribute(e.attr, t(e.en)); });
      }
    }
  };

  // This script is loaded at the end of <body>, so the whole page is already parsed here.
  collect(document.body);
  setLang(savedLang(), false);

  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('[data-lang]') : null;
    if (btn) setLang(btn.getAttribute('data-lang'), true);
  });
})();
