import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { localeLabels, supportedLocales, type Locale } from "../src/i18n";

const labels = {
  fr: { choose: "Choisir la langue", title: "Langue du portfolio" },
  en: { choose: "Choose language", title: "Portfolio language" },
  es: { choose: "Elegir idioma", title: "Idioma del portfolio" },
};

export default function LanguageSelector({ locale, onChange }: { locale: Locale; onChange: (next: Locale) => void }) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState<Locale>(locale);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<Partial<Record<Locale, HTMLButtonElement | null>>>({});
  const menuId = useId();
  const titleId = useId();
  const copy = labels[locale];

  useEffect(() => {
    if (!open) return;
    optionsRef.current[focused]?.focus();
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, focused]);

  function showMenu() {
    setFocused(locale);
    setOpen(true);
  }

  function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      const index = supportedLocales.indexOf(focused);
      const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? supportedLocales.length - 1 :
        (index + (event.key === "ArrowDown" ? 1 : -1) + supportedLocales.length) % supportedLocales.length;
      setFocused(supportedLocales[nextIndex]);
    }
  }

  return (
    <div className="language-picker" ref={rootRef} onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
    }}>
      <button ref={triggerRef} className="language-picker-trigger" type="button" aria-label={`${copy.choose} : ${localeLabels[locale]}`} aria-haspopup="listbox" aria-expanded={open} aria-controls={open ? menuId : undefined}
        onClick={() => open ? setOpen(false) : showMenu()}
        onKeyDown={event => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); showMenu(); }
        }}>
        <span>{locale.toUpperCase()}</span>
        <svg className="language-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
      </button>
      {open && <div className="language-picker-popover">
        <div id={titleId} className="language-picker-heading">{copy.title}</div>
        <div id={menuId} role="listbox" aria-labelledby={titleId} onKeyDown={handleKeys}>
          {supportedLocales.map(option => <button key={option} ref={node => { optionsRef.current[option] = node; }} type="button" role="option" aria-selected={option === locale} tabIndex={option === focused ? 0 : -1}
            className="language-picker-option" onClick={() => { onChange(option); setOpen(false); triggerRef.current?.focus(); }}>
            <span className="language-code" aria-hidden="true">{option.toUpperCase()}</span>
            <span>{localeLabels[option]}</span>
            {option === locale && <svg className="language-check" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m3 8 3 3 7-7" /></svg>}
          </button>)}
        </div>
      </div>}
    </div>
  );
}
