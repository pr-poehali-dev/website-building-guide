import { useRef } from "react";
import Icon from "@/components/ui/icon";
import { useInView } from "@/hooks/useInView";

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

export default function ConceptsSection() {
  return (
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
  );
}
