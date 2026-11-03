import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgeCheck, Headphones, ShieldCheck, Truck } from "lucide-react";
import { ProductCard } from "@/components/store/product-card";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";

export function HomeHero() {
  return (
    <section className="page-shell nova-hero">
      <div className="nova-hero-copy animate-rise">
        <span className="nova-pill">Votre prochain coup de cœur tech</span>
        <h1 className="font-display">Du style.<br />Du jeu.<br /><span>De la tech.</span></h1>
        <p>Les essentiels qui changent le quotidien. Découvrez nos iPhone, consoles et accessoires, choisis avec soin et à prix doux.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/catalogue" className="nova-primary focus-ring">Explorer la boutique <ArrowUpRight size={18} /></Link>
          <Link href="/catalogue?offres=1" className="nova-secondary focus-ring">Voir les offres <ArrowRight size={16} /></Link>
        </div>
        <div className="mt-9 flex items-center gap-3 text-xs text-muted"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-white"><BadgeCheck size={19} className="text-brand" /></span>Une sélection soignée. Un choix plus simple.</div>
      </div>
      <div className="nova-hero-visual animate-rise-delay">
        <div className="nova-orbit" />
        <div className="nova-visual-heading"><span>LE QUOTIDIEN, EN MIEUX.</span><ArrowUpRight size={25} /></div>
        <img src="/images/iphone-16-pro.png" alt="iPhone 16 Pro" className="nova-hero-phone animate-float" />
        <Link href="/catalogue?categorie=smartphones" className="nova-hero-label"><span><small>À DÉCOUVRIR</small><strong>Votre prochain iPhone</strong></span><span className="nova-label-arrow"><ArrowUpRight size={22} /></span></Link>
        <Link href="/catalogue?categorie=consoles" className="nova-gaming-card"><img src="/images/dualsense-black.jpg" alt="Manette PlayStation DualSense" /><span><small>PLACE AU JEU</small><strong>L’univers PlayStation</strong></span><ArrowUpRight size={18} /></Link>
      </div>
    </section>
  );
}

export function ServiceStrip() {
  const values = [
    { icon: Truck, title: "Commande en ligne", body: "Un parcours simple et guidé" },
    { icon: ShieldCheck, title: "Données protégées", body: "Une commande en confiance" },
    { icon: BadgeCheck, title: "Sélection soignée", body: "Des essentiels choisis" },
    { icon: Headphones, title: "Support boutique", body: "Une équipe à votre écoute" },
  ];
  return <div className="page-shell mt-9"><div className="grid grid-cols-2 gap-3 rounded-[22px] border border-line bg-white p-4 shadow-[0_12px_36px_rgba(30,60,100,.05)] sm:grid-cols-4 sm:gap-1 sm:px-6 sm:py-5">{values.map(({ icon: Icon, title, body }) => <div key={title} className="flex items-center gap-3 px-2 py-2 sm:px-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0e9fa] text-brand"><Icon size={18} strokeWidth={1.7} /></span><div><p className="text-[11px] font-bold sm:text-xs">{title}</p><p className="mt-1 text-[10px] text-muted sm:text-[11px]">{body}</p></div></div>)}</div></div>;
}

export function CategoryShowcase() {
  const categories = [
    { name: "iPhone", label: "Pensé pour suivre votre rythme.", slug: "smartphones", image: "/images/iphone-16.jpg", icon: "01" },
    { name: "PlayStation", label: "Le jeu prend une autre dimension.", slug: "consoles", image: "/images/ps5-console.png", icon: "02" },
    { name: "Accessoires & Jeux", label: "Les accessoires essentiels et vos jeux préférés.", slug: "accessoires", image: "/images/airpods-pro.jpg", icon: "03" },
  ];
  return <section className="page-shell section-space pb-8">
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Les univers Nova</p><h2 className="font-display mt-3 text-3xl font-extrabold tracking-[-.055em] sm:text-[40px]">À chacun son essentiel.</h2></div><Link href="/catalogue" className="inline-flex items-center gap-2 text-xs font-bold text-ink transition hover:text-brand">Explorer le catalogue <ArrowUpRight size={15} /></Link></div>
    <div className="grid gap-3 md:grid-cols-3">{categories.map((category, index) => <Link href={`/catalogue?categorie=${category.slug}`} key={category.slug} className={`group relative isolate flex min-h-[205px] flex-col justify-between overflow-hidden rounded-[22px] p-6 text-white shadow-[0_14px_35px_rgba(30,60,100,.08)] transition hover:-translate-y-1 sm:min-h-[230px] sm:p-8 ${index === 1 ? "bg-[#382354] !text-white" : index === 2 ? "bg-[#f9ded4] !text-ink" : "bg-[#e8e0f6] !text-ink"}`}>
      <img src={category.image} alt="" className="absolute -right-4 bottom-3 -z-10 h-[65%] w-[44%] object-contain opacity-80 mix-blend-luminosity transition duration-500 group-hover:scale-110" /><span className="text-[10px] font-bold uppercase tracking-[.16em] opacity-55">0{index + 1} / Collection</span><div><h3 className="font-display text-2xl font-extrabold tracking-[-.05em]">{category.name}</h3><p className="mt-2 text-xs opacity-60">{category.label}</p><span className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold">Explorer <ArrowRight size={14} className="transition group-hover:translate-x-1" /></span></div>
    </Link>)}</div>
  </section>;
}

export function FeaturedProducts({ products }: { products: Product[] }) {
  const featured = products.filter((product) => product.featured).slice(0, 4);
  return <section className="page-shell section-space pt-14">
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Le choix de la rédaction</p><h2 className="font-display mt-3 text-3xl font-extrabold tracking-[-.055em] sm:text-[40px]">Les pièces du moment.</h2><p className="mt-2 text-sm text-muted">Les bons produits. Les bons détails. Rien de superflu.</p></div><Link href="/catalogue" className="inline-flex items-center gap-2 text-xs font-bold transition hover:text-brand">Tout le catalogue <ArrowRight size={15} /></Link></div>
    {featured.length ? <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">{featured.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div> : <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center text-sm text-muted">Les prochaines références arrivent bientôt.</div>}
  </section>;
}

export function PromoFeature({ product }: { product?: Product }) {
  return <section className="page-shell pb-10 pt-5">
    <div className="relative grid overflow-hidden rounded-[26px] bg-[#e9e0f4] sm:grid-cols-[1.2fr_.8fr]">
      <div className="relative z-10 flex flex-col justify-center p-7 sm:p-10 lg:p-14"><span className="eyebrow">L’offre de la semaine</span><h2 className="font-display mt-4 max-w-[560px] text-3xl font-extrabold leading-[1.05] tracking-[-.06em] sm:text-5xl">Les bons plans<br />sans compromis.</h2><p className="mt-4 max-w-[440px] text-sm leading-6 text-[#52627a]">Retrouvez une sélection d’essentiels à prix doux, pour la maison, les loisirs et partout entre les deux.</p><Link href="/catalogue?offres=1" className="mt-7 inline-flex w-fit items-center gap-3 rounded-full bg-ink px-5 py-3 text-xs font-bold text-white transition hover:bg-brand">Découvrir les offres <ArrowRight size={15} /></Link></div>
      {product ? <div className="relative min-h-[260px] bg-[#f3eef8] p-8 sm:min-h-[340px]"><img src={product.imageUrl} alt={product.name} className="absolute inset-0 h-full w-full object-contain p-8 transition duration-500 hover:scale-[1.03]"/><div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-2 text-xs font-bold shadow-sm">{product.name} · dès {formatPrice(product.price)}</div></div> : <div className="min-h-[260px] bg-gradient-to-br from-[#e3d4f5] via-[#f9ded4] to-[#d4bcea]" />}
    </div>
  </section>;
}
