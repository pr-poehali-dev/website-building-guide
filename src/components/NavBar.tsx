const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "concepts", label: "Концепции" },
  { id: "guides", label: "Гайды" },
];

interface NavBarProps {
  activeSection: string;
  scrollTo: (id: string) => void;
}

export default function NavBar({ activeSection, scrollTo }: NavBarProps) {
  return (
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
  );
}
