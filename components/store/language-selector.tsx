"use client";

import Script from "next/script";
import { Languages, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const languages = [
  ["fr", "Français"], ["en", "English"], ["zh-CN", "中文 · Chinois"],
  ["hi", "हिन्दी · Hindi"], ["es", "Español"], ["ar", "العربية · Arabe"],
  ["bn", "বাংলা · Bengali"], ["pt", "Português"], ["ru", "Русский · Russe"], ["ur", "اردو · Ourdou"],
  ["nl", "Nederlands · Néerlandais"], ["it", "Italiano · Italien"], ["de", "Deutsch · Allemand"],
] as const;

declare global {
  interface Window {
    novaTranslateInit?: () => void;
    google?: { translate?: { TranslateElement: new (
      options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean },
      element: string,
    ) => unknown } };
  }
}

export function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState("fr");
  const container = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    window.novaTranslateInit = () => {
      if (!window.google?.translate || document.querySelector("#nova-translate select")) return;
      new window.google.translate.TranslateElement({
        pageLanguage: "fr",
        includedLanguages: languages.map(([code]) => code).join(","),
        autoDisplay: false,
      }, "nova-translate");
    };
    const cookie = document.cookie.split(";").find((entry) => entry.trim().startsWith("googtrans="));
    if (cookie) {
      const language = cookie.trim().slice("googtrans=".length).split("/").pop();
      if (languages.some(([code]) => code === language)) setSelected(language!);
      setEnabled(true);
    }
    return () => { delete window.novaTranslateInit; };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const host = document.getElementById("nova-translate");
    if (!host) return;
    function checkReady() {
      const combo = host?.querySelector("select");
      if (combo && combo.options.length > 1) {
        setReady(true);
        setFailed(false);
      }
    }
    const observer = new MutationObserver(checkReady);
    observer.observe(host, { childList: true, subtree: true });
    checkReady();
    window.novaTranslateInit?.();
    const timer = window.setTimeout(() => {
      if ((host.querySelector("select")?.options.length ?? 0) < 2) setFailed(true);
    }, 15000);
    return () => { observer.disconnect(); window.clearTimeout(timer); };
  }, [enabled]);

  useEffect(() => {
    if (!open) return;
    function closeOutside(event: PointerEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    }
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  function changeLanguage(code: string) {
    const combo = document.querySelector<HTMLSelectElement>("#nova-translate select");
    if (!combo) return;
    combo.value = code;
    combo.dispatchEvent(new Event("change", { bubbles: true }));
    setSelected(code);
  }

  return (
    <div ref={container} className="relative notranslate" translate="no">
      <button ref={toggle} type="button" aria-label="Choisir la langue / Choose language" aria-expanded={open} aria-controls="nova-language-panel"
        onClick={() => { setOpen(!open); setEnabled(true); }}
        className="focus-ring flex h-10 items-center gap-1.5 rounded-full border border-line bg-paper px-2.5 text-xs font-semibold text-ink transition hover:border-brand hover:text-brand sm:px-3">
        <Languages size={17} /><span className="uppercase">{selected === "zh-CN" ? "ZH" : selected}</span><span className="hidden xl:inline">· Langues</span>
      </button>
      <div id="nova-language-panel" hidden={!open} className="absolute right-0 top-12 z-50 w-[min(19rem,calc(100vw-2rem))] rounded-2xl border border-line bg-white p-4 shadow-xl">
        <div className="mb-3 flex items-center justify-between"><p className="text-sm font-semibold">Langue / Language</p><button type="button" aria-label="Fermer les langues" onClick={() => { setOpen(false); toggle.current?.focus(); }} className="focus-ring rounded-full p-1 text-muted hover:text-brand"><X size={17} /></button></div>
        <label htmlFor="nova-language-choice" className="mb-2 block text-xs text-muted">Choisissez parmi {languages.length} langues</label>
        <select id="nova-language-choice" value={selected} disabled={!ready || failed} onChange={(event) => changeLanguage(event.target.value)} className="focus-ring min-h-12 w-full rounded-xl border border-line bg-paper px-3 text-sm text-ink disabled:opacity-60">
          {languages.map(([code, label]) => <option key={code} value={code} lang={code}>{label}</option>)}
        </select>
        {enabled && !ready && !failed && <p role="status" className="mt-2 text-xs text-muted">Chargement du traducteur…</p>}
        {failed && <div role="status" className="mt-3 text-xs leading-5 text-muted"><p>Traduction indisponible. Vérifiez votre connexion puis réessayez.</p><button type="button" onClick={() => window.location.reload()} className="focus-ring mt-2 rounded-lg bg-brand px-3 py-2 font-semibold text-white">Réessayer</button></div>}
        <p className="mt-3 text-[11px] leading-relaxed text-muted">Traduction automatique par Google. Le français est la langue d’origine.</p>
        <p className="mt-2 text-[11px] leading-relaxed text-muted">Suisse : français, allemand et italien disponibles.</p>
      </div>
      <div id="nova-translate" className="sr-only" aria-hidden="true" inert />
      {enabled && <Script id="nova-google-translate" src="https://translate.google.com/translate_a/element.js?cb=novaTranslateInit" strategy="afterInteractive"
        onReady={() => window.novaTranslateInit?.()} onError={() => setFailed(true)} />}
    </div>
  );
}
