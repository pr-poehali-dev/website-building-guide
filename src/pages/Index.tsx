import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import NavBar from "@/components/NavBar";
import ConceptsSection from "@/components/ConceptsSection";
import GuidesSection from "@/components/GuidesSection";
import { useInView } from "@/hooks/useInView";

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
      <NavBar activeSection={activeSection} scrollTo={scrollTo} />

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

      <ConceptsSection />
      <GuidesSection scrollTo={scrollTo} />
    </div>
  );
}
