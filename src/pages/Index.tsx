import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "concepts", label: "Концепции" },
  { id: "guides", label: "Гайды" },
];

const CONCEPTS = [
  {
    icon: "FileCode",
    title: "HTML",
    subtitle: "Структура",
    description:
      "HTML — скелет любой страницы. Теги описывают смысл содержимого: заголовки, абзацы, ссылки, изображения.",
    color: "#E34F26",
    tag: "Разметка",
  },
  {
    icon: "Palette",
    title: "CSS",
    subtitle: "Оформление",
    description:
      "CSS отвечает за внешний вид: цвета, шрифты, отступы, анимации. Делает страницу красивой и адаптивной.",
    color: "#264DE4",
    tag: "Стили",
  },
  {
    icon: "Zap",
    title: "JavaScript",
    subtitle: "Поведение",
    description:
      "JS добавляет интерактивность: реагирует на действия пользователя, загружает данные, оживляет интерфейс.",
    color: "#F7DF1E",
    tag: "Логика",
  },
  {
    icon: "Server",
    title: "Backend",
    subtitle: "Сервер",
    description:
      "Серверная часть обрабатывает данные, хранит информацию в базах данных и отвечает на запросы клиента.",
    color: "#68D391",
    tag: "Данные",
  },
  {
    icon: "Globe",
    title: "Домен и хостинг",
    subtitle: "Публикация",
    description:
      "Чтобы сайт стал доступен всем, нужен хостинг (сервер) и доменное имя — адрес в интернете.",
    color: "#9F7AEA",
    tag: "Деплой",
  },
  {
    icon: "Smartphone",
    title: "Адаптивность",
    subtitle: "Отзывчивость",
    description:
      "Сайт должен хорошо выглядеть на любом устройстве — от телефона до большого монитора.",
    color: "#F6AD55",
    tag: "UX",
  },
];

const GUIDES = [
  {
    number: "01",
    title: "Первая веб-страница",
    description: "Создаём HTML-файл с нуля: структура документа, основные теги, открываем в браузере.",
    steps: ["Создать файл index.html", "Добавить DOCTYPE и теги html/head/body", "Написать заголовок и абзац", "Открыть в браузере"],
    time: "15 мин",
    level: "Начальный",
  },
  {
    number: "02",
    title: "Подключение стилей",
    description: "Добавляем CSS-файл, меняем шрифты, цвета и отступы. Знакомимся с селекторами.",
    steps: ["Создать style.css", "Подключить через тег link", "Изменить цвет фона", "Задать шрифт и размер текста"],
    time: "20 мин",
    level: "Начальный",
  },
  {
    number: "03",
    title: "Flexbox-раскладка",
    description: "Учимся расставлять элементы с помощью CSS Flexbox — самый удобный способ верстки.",
    steps: ["display: flex на контейнере", "justify-content для выравнивания", "align-items по оси Y", "flex-wrap для переноса"],
    time: "30 мин",
    level: "Средний",
  },
  {
    number: "04",
    title: "Интерактивность с JS",
    description: "Делаем кнопку, которая что-то делает: обработка событий, изменение DOM.",
    steps: ["Добавить кнопку в HTML", "Найти элемент через querySelector", "Слушать событие click", "Изменить текст на странице"],
    time: "25 мин",
    level: "Средний",
  },
  {
    number: "05",
    title: "Адаптивный дизайн",
    description: "Используем медиазапросы, чтобы сайт выглядел хорошо на мобильных устройствах.",
    steps: ["Мета-тег viewport", "@media для мобильных", "Гибкие размеры в %", "Тестирование в DevTools"],
    time: "35 мин",
    level: "Средний",
  },
  {
    number: "06",
    title: "Публикация сайта",
    description: "Выкладываем готовый сайт в интернет: хостинг, домен, настройка HTTPS.",
    steps: ["Выбрать хостинг", "Загрузить файлы", "Настроить домен", "Проверить SSL-сертификат"],
    time: "40 мин",
    level: "Продвинутый",
  },
];

const CODE_EXAMPLES = [
  {
    lang: "HTML",
    label: "html",
    code: `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Мой сайт</title>
</head>
<body>
  <h1>Привет, мир!</h1>
  <p>Это мой первый сайт.</p>
  <a href="#">Нажми меня</a>
</body>
</html>`,
    preview: `<div style="font-family:sans-serif;padding:16px;background:#fff;border-radius:8px"><h1 style="font-size:22px;margin:0 0 8px;color:#111">Привет, мир!</h1><p style="color:#444;margin:0 0 8px">Это мой первый сайт.</p><a href="#" style="color:#2563eb">Нажми меня</a></div>`,
  },
  {
    lang: "CSS",
    label: "css",
    code: `body {
  font-family: sans-serif;
  background: #f8f8f8;
  color: #111;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  border-bottom: 3px solid #111;
  padding-bottom: 8px;
}

.button {
  background: #111;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
}`,
    preview: `<div style="font-family:sans-serif;padding:16px;background:#f8f8f8;border-radius:8px"><h1 style="font-size:22px;font-weight:700;border-bottom:3px solid #111;padding-bottom:8px;margin:0 0 12px">Заголовок</h1><p style="color:#333;margin:0 0 12px">Чистый и аккуратный текст.</p><div style="background:#111;color:#fff;padding:10px 20px;border-radius:4px;display:inline-block">Кнопка</div></div>`,
  },
  {
    lang: "JavaScript",
    label: "js",
    code: `// Находим кнопку на странице
const btn = document.querySelector('.btn');
let count = 0;

// Слушаем событие клика
btn.addEventListener('click', () => {
  count++;
  btn.textContent =
    \`Нажато \${count} раз\`;
});`,
    preview: `<div style="font-family:sans-serif;padding:16px;background:#fff;border-radius:8px"><p style="color:#444;margin:0 0 12px">Попробуй нажать кнопку:</p><button onclick="var c=parseInt(this.dataset.c||0)+1;this.dataset.c=c;this.textContent='Нажато '+c+' раз'" style="background:#111;color:#fff;padding:10px 20px;border:none;border-radius:4px;cursor:pointer;font-size:14px">Нажми меня</button></div>`,
  },
];

function useInView(ref: React.RefObject<Element>, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function CodePlayground() {
  const [active, setActive] = useState(0);
  const example = CODE_EXAMPLES[active];

  return (
    <div className="bg-[#0e0e0e] rounded-2xl overflow-hidden border border-white/10">
      <div className="flex border-b border-white/10">
        {CODE_EXAMPLES.map((ex, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-5 py-3 font-mono text-sm transition-all ${
              active === i
                ? "text-white border-b-2 border-white bg-white/5"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            {ex.lang}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 pr-4">
          <div className="w-2 h-2 rounded-full bg-red-500/70" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
          <div className="w-2 h-2 rounded-full bg-green-500/70" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="border-b md:border-b-0 md:border-r border-white/10">
          <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2">
            <Icon name="FileCode" size={13} className="text-white/30" />
            <span className="font-mono text-xs text-white/30">code.{example.label}</span>
          </div>
          <pre className="p-5 overflow-x-auto text-sm font-mono text-emerald-300 leading-relaxed">
            <code>{example.code}</code>
          </pre>
        </div>
        <div>
          <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2">
            <Icon name="Eye" size={13} className="text-white/30" />
            <span className="font-mono text-xs text-white/30">preview</span>
          </div>
          <div className="p-4">
            <div
              className="rounded-lg overflow-hidden"
              dangerouslySetInnerHTML={{ __html: example.preview }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ConceptCard({ concept, index }: { concept: typeof CONCEPTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);

  return (
    <div
      ref={ref}
      className="group border border-[#e8e8e8] rounded-xl p-6 hover:border-[#111] transition-all duration-300 hover:shadow-sm bg-white"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s, border-color 0.2s, box-shadow 0.2s`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: concept.color + "18" }}
        >
          <Icon name={concept.icon as "FileCode"} size={20} style={{ color: concept.color }} />
        </div>
        <span className="font-mono text-xs text-[#999] border border-[#e8e8e8] px-2 py-0.5 rounded-full">
          {concept.tag}
        </span>
      </div>
      <h3 className="font-semibold text-[#111] text-lg mb-0.5">{concept.title}</h3>
      <p className="font-mono text-xs text-[#aaa] mb-3">{concept.subtitle}</p>
      <p className="text-[#555] text-sm leading-relaxed">{concept.description}</p>
    </div>
  );
}

function GuideCard({ guide, index }: { guide: typeof GUIDES[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);

  const levelColors: Record<string, string> = {
    "Начальный": "#68D391",
    "Средний": "#F6AD55",
    "Продвинутый": "#FC8181",
  };
  const levelColor = levelColors[guide.level] ?? "#aaa";

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left border border-[#e8e8e8] hover:border-[#111] rounded-xl px-6 py-5 transition-all duration-200 group bg-white"
      >
        <div className="flex items-start gap-4">
          <span className="font-mono text-2xl font-medium text-[#d0d0d0] group-hover:text-[#bbb] transition-colors shrink-0 leading-none pt-0.5">
            {guide.number}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-semibold text-[#111] text-base">{guide.title}</h3>
              <span
                className="font-mono text-xs px-2 py-0.5 rounded-full"
                style={{ background: levelColor + "22", color: levelColor }}
              >
                {guide.level}
              </span>
            </div>
            <p className="text-sm text-[#777]">{guide.description}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-2">
            <span className="font-mono text-xs text-[#aaa] hidden sm:block">{guide.time}</span>
            <Icon
              name="ChevronDown"
              size={16}
              className="text-[#aaa] transition-transform duration-200"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </div>
        </div>

        {open && (
          <div className="mt-4 pt-4 border-t border-[#f0f0f0]">
            <p className="font-mono text-xs text-[#999] mb-3 uppercase tracking-wider">Шаги</p>
            <ol className="space-y-2">
              {guide.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#444]">
                  <span className="font-mono text-xs text-[#ccc] mt-0.5 w-4 shrink-0">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </button>
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef as React.RefObject<Element>, 0.3);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const sections = ["home", "concepts", "guides"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#111]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fafafa]/90 backdrop-blur-sm border-b border-[#e8e8e8]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-mono text-sm font-medium tracking-tight">
            web<span className="opacity-40">/</span>craft
          </span>
          <div className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  activeSection === item.id
                    ? "bg-[#111] text-white"
                    : "text-[#666] hover:text-[#111] hover:bg-[#f0f0f0]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="pt-32 pb-24 px-6">
        <div
          ref={heroRef}
          className="max-w-5xl mx-auto"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#999] border border-[#e0e0e0] px-3 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Интерактивный курс
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#111] leading-[1.05] tracking-tight mb-6 max-w-3xl">
            Создание сайтов
            <br />
            <span className="text-[#aaa]">с нуля</span>
          </h1>

          <p className="text-lg text-[#666] max-w-xl leading-relaxed mb-10">
            Изучите основные концепции веб-разработки и пройдите пошаговые гайды.
            Каждый раздел содержит живые примеры кода.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo("concepts")}
              className="bg-[#111] text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-[#333] transition-colors flex items-center gap-2"
            >
              <Icon name="BookOpen" size={16} />
              Начать обучение
            </button>
            <button
              onClick={() => scrollTo("guides")}
              className="border border-[#ddd] text-[#333] px-6 py-3 rounded-xl text-sm font-medium hover:border-[#111] hover:bg-[#f5f5f5] transition-all flex items-center gap-2"
            >
              <Icon name="Map" size={16} />
              Смотреть гайды
            </button>
          </div>

          <div className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-[#ebebeb]">
            {[
              { value: "6", label: "концепций" },
              { value: "6", label: "пошаговых гайдов" },
              { value: "3", label: "примера кода" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-[#111]">{stat.value}</div>
                <div className="font-mono text-xs text-[#aaa] mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concepts */}
      <section id="concepts" className="py-20 px-6 bg-white border-t border-[#ebebeb]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="font-mono text-xs text-[#aaa] uppercase tracking-widest mb-3">Раздел 01</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111] mb-3">Основные концепции</h2>
            <p className="text-[#666] text-lg max-w-lg">
              Шесть ключевых технологий и понятий, которые нужно знать каждому, кто создаёт сайты.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CONCEPTS.map((concept, i) => (
              <ConceptCard key={concept.title} concept={concept} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Code Playground */}
      <section className="py-20 px-6 bg-[#0e0e0e]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-3">Примеры кода</p>
            <h2 className="text-3xl font-bold text-white mb-3">Живые демонстрации</h2>
            <p className="text-white/50 max-w-lg">
              Смотрите код и результат его работы рядом. Выберите язык, чтобы увидеть пример.
            </p>
          </div>
          <CodePlayground />
        </div>
      </section>

      {/* Guides */}
      <section id="guides" className="py-20 px-6 bg-white border-t border-[#ebebeb]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="font-mono text-xs text-[#aaa] uppercase tracking-widest mb-3">Раздел 02</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111] mb-3">Пошаговые гайды</h2>
            <p className="text-[#666] text-lg max-w-lg">
              Практические руководства от первой страницы до публикации готового сайта.
              Нажмите на гайд, чтобы раскрыть шаги.
            </p>
          </div>
          <div className="space-y-3">
            {GUIDES.map((guide, i) => (
              <GuideCard key={guide.number} guide={guide} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#ebebeb] py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-sm text-[#aaa]">
            web<span className="opacity-50">/</span>craft
          </span>
          <p className="font-mono text-xs text-[#ccc]">Изучай. Практикуй. Создавай.</p>
          <button
            onClick={() => scrollTo("home")}
            className="font-mono text-xs text-[#bbb] hover:text-[#111] transition-colors"
          >
            Вверх ↑
          </button>
        </div>
      </footer>
    </div>
  );
}
