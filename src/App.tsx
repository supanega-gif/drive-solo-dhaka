import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import {
  Car, Clock, Users, X, Check, Menu, MessageCircle, ShieldCheck, Route, Video, EyeOff, Play, ChevronDown, Phone, User,
} from 'lucide-react'
import { site, taka, waLink, messages, packageMessage, type Tier } from './config/site'

const nav = [
  ['Why Own-Car', '#why'],
  ['Roadmap', '#roadmap'],
  ['Safety Protocol', '#safety'],
  ['Pricing', '#pricing'],
  ['FAQ', '#faq'],
] as const

const card = 'rounded-2xl border border-line bg-panel p-6'
const btnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-amber px-5 py-3 font-semibold text-ink transition-colors hover:bg-amber-400 active:translate-y-px'
const btnOutline =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-amber/70 px-5 py-3 font-semibold text-amber transition-colors hover:bg-amber/10 active:translate-y-px'
const eyebrow = 'text-xs font-semibold uppercase tracking-[0.18em] text-amber'

function WaLink({ msg, className, children }: { msg: string; className: string; children: ReactNode }) {
  return (
    <a href={waLink(msg)} target="_blank" rel="noopener" className={className}>
      {children}
    </a>
  )
}

function Section({ id, title, intro, pad = 'py-16', children }: { id?: string; title: string; intro?: string; pad?: string; children: ReactNode }) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-4 sm:px-6 ${pad}`}>
      <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {intro && <p className="mt-3 max-w-2xl text-muted">{intro}</p>}
      <div className="mt-10">{children}</div>
    </section>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`)
    }, { rootMargin: '-40% 0px -55% 0px' })
    nav.forEach(([, href]) => { const el = document.querySelector(href); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 py-3">
          <span className="font-extrabold tracking-wide uppercase">{site.brandName}</span>
          <span className="hidden rounded-full border border-line px-2 py-0.5 text-xs text-muted sm:inline">
            Gulshan • Banani
          </span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-muted lg:flex" aria-label="Main">
          {nav.map(([label, href]) => (
            <a
              key={href}
              href={href}
              aria-current={active === href ? 'location' : undefined}
              className={`py-2 transition-colors hover:text-fg ${active === href ? 'text-fg underline decoration-amber decoration-2 underline-offset-8' : ''}`}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <WaLink msg={messages.general} className={`${btnOutline} px-4 py-2 text-sm`}>Book on WhatsApp</WaLink>
          </span>
          <button
            className="rounded-lg p-2 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" className="border-t border-line px-4 pb-4 lg:hidden" aria-label="Mobile">
          {nav.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="block py-3 text-lg">{label}</a>
          ))}
          <WaLink msg={messages.general} className={`${btnOutline} mt-2 w-full`}>Book on WhatsApp</WaLink>
        </nav>
      )}
    </header>
  )
}

function Hero() {
  const metrics = [
    { icon: Car, big: '100% Your Own Car', small: "Learn your exact vehicle's blind spots & braking" },
    { icon: Clock, big: site.sessionWindow, small: 'Discreet pre-traffic sessions at your doorstep' },
    { icon: Users, big: `${site.mentoredCount} Car Owners Mentored`, small: 'Proven transition from passenger to solo driver' },
  ]
  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6 sm:pt-24">
      <p className="inline-block rounded-full border border-amber/40 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-amber uppercase sm:text-xs">
        Limited to {site.slotsPerMonth} morning slots / month in Gulshan & Banani
      </p>
      <h1 className="mt-6 max-w-4xl text-[2.6rem] leading-[1.05] font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
        Own a Car in Dhaka, Yet Still Rely on a Driver?
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">
        Private, 1-on-1 early-morning driving mentorship from your doorstep—using your own car before Dhaka
        traffic wakes up. Gain total road independence in 10 sessions.
      </p>
      <div id="hero-cta" className="mt-8 flex flex-col gap-3 sm:flex-row">
        <WaLink msg={messages.diagnostic} className={btnPrimary}>
          Book 1-Hour Diagnostic Drive ({taka(site.tiers[0].price)})
        </WaLink>
        <a href="#pricing" className={btnOutline}>Explore Mentorship Plans</a>
      </div>
      <p className="mt-3 text-sm text-muted">
        The diagnostic fee is fully credited toward Core or VIP if you upgrade within {site.deductibleDays} days.
      </p>
      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
        {metrics.map(({ icon: Icon, big, small }) => (
          <div key={big} className="bg-panel p-5">
            <Icon className="size-5 text-amber" aria-hidden />
            <p className="mt-3 font-mono font-bold">{big}</p>
            <p className="mt-1 text-sm text-muted">{small}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Comparison() {
  const school = [
    'Beat-up shared manual training cars that feel nothing like your vehicle',
    'Rushed 20–30 minute sessions at distant, crowded training centers',
    'Zero preparation for your actual office route or tight apartment basement parking',
    'Public, uncomfortable group environment',
  ]
  const mentor = [
    'Train inside your own personal sedan or SUV from Day 1',
    'Full 60-minute uninterrupted 1-on-1 coaching from your doorstep',
    'Tailored to Gulshan/Banani avenues, roundabouts, and your exact parking spot',
    "100% discreet early-morning schedule before your driver's shift begins",
  ]
  return (
    <Section id="why" title="Why Own-Car Mentorship Beats Driving Schools">
      <div className="grid gap-8 md:grid-cols-[1fr_1.25fr]">
        <div className="p-2 sm:p-6">
          <h3 className="text-lg font-semibold text-muted">Traditional Dhaka Driving Schools</h3>
          <ul className="mt-5 space-y-4">
            {school.map((t) => (
              <li key={t} className="flex gap-3 text-muted"><X className="mt-0.5 size-5 shrink-0" aria-hidden />{t}</li>
            ))}
          </ul>
        </div>
        <div className={`${card} border-amber/50`}>
          <h3 className="text-lg font-semibold">Private Executive Mentorship</h3>
          <ul className="mt-5 space-y-4">
            {mentor.map((t) => (
              <li key={t} className="flex gap-3"><Check className="mt-0.5 size-5 shrink-0 text-amber" aria-hidden />{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

function Roadmap() {
  const phases = [
    ['Sessions 1–3', 'Vehicle Calibration & Quiet Lanes', 'Mirror calibration, left-side bumper judgment, smooth automatic throttle/braking control, and low-speed maneuvers in empty Gulshan/Banani residential lanes.'],
    ['Sessions 4–7', 'Main Avenues, Roundabouts & U-Turns', 'Merging onto Gulshan Avenue and Kemal Ataturk Avenue, handling morning traffic flow, defensive spacing against buses/rickshaws, and confident U-turns.'],
    ['Sessions 8–10', 'Tight Parking & Real Commute Mastery', 'Tight apartment basement and mall parking (reverse & parallel), flyover merges, and real-world office commute simulations.'],
  ]
  return (
    <Section id="roadmap" title="The 3-Phase Dhaka Road Roadmap">
      {/* one road: dashed lane marking runs through three stops (the page's single authored motion) */}
      <ol className="reveal relative grid gap-10 md:grid-cols-3 md:gap-10">
        <span aria-hidden className="absolute top-2 bottom-2 left-[7px] border-l-2 border-dashed border-amber/50 md:hidden" />
        <span aria-hidden className="absolute top-[7px] right-0 left-0 hidden border-t-2 border-dashed border-amber/50 md:block" />
        {phases.map(([sessions, title, body], i) => (
          <li key={title} className="relative pl-10 md:pt-10 md:pl-0">
            <span aria-hidden className="absolute top-1 left-0 size-4 rounded-full border-2 border-amber bg-ink md:top-0" />
            <p className="font-mono text-sm font-bold text-amber">{sessions}</p>
            <h3 className="mt-2 text-lg font-semibold">Phase {i + 1}: {title}</h3>
            <p className="mt-2 text-muted">{body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

function Safety() {
  const items = [
    [ShieldCheck, 'Mutual Safety & Liability Agreement', 'Transparent 1-page signed agreement before Session 1, backed by verified NID and BRTA Professional Driving License credentials.'],
    [Route, 'Pre-Traffic Progression Protocol', 'Beginners never touch main avenues until vehicle control is mastered on quiet residential streets at 6:00 AM.'],
    [Video, 'Road-Cam Video Feedback', 'Forward-facing road & audio logging for mutual safety verification plus short post-session review clips sent privately to help you improve faster.'],
    [EyeOff, 'Total Discretion & Privacy', `Sessions are scheduled between ${site.sessionWindow}, before your current driver arrives, and footage is never shared publicly without written consent.`],
  ] as const
  return (
    <Section id="safety" title="Safety, Privacy & Liability Protocol">
      <div className="grid gap-x-12 sm:grid-cols-2">
        {items.map(([Icon, title, body]) => (
          <div key={title} className="flex gap-4 border-t border-line py-6">
            <Icon className="mt-1 size-6 shrink-0 text-amber" aria-hidden />
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-muted">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function SocialProof() {
  const VideoTag = site.videoUrl ? 'a' : 'div'
  return (
    <Section title="Mentee Results">
      <VideoTag
        {...(site.videoUrl ? { href: site.videoUrl, target: '_blank', rel: 'noopener' } : {})}
        className="relative flex aspect-video max-w-3xl items-center justify-center overflow-hidden rounded-2xl border border-line bg-panel"
      >
        <div className="flex flex-col items-center gap-4 px-6 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-amber text-ink">
            <Play className="ml-1 size-7" aria-hidden />
          </span>
          <p className="max-w-md font-semibold">"{site.videoTitle}"</p>
          {!site.videoUrl && <p className="text-sm text-muted">Video coming soon</p>}
        </div>
      </VideoTag>
      {site.testimonials.length > 0 && (
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {site.testimonials.map((t) => (
            <figure key={t.name} className={card}>
              <blockquote>"{t.quote}"</blockquote>
              <figcaption className="mt-4 text-sm text-muted">{t.name}{t.detail && `, ${t.detail}`}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </Section>
  )
}

function About() {
  const a = site.about
  return (
    <Section id="about" title="Your Mentor">
      <div className={`${card} flex flex-col gap-6 sm:flex-row sm:items-center`}>
        {a.photoUrl ? (
          <img src={a.photoUrl} alt={a.name} className="size-32 shrink-0 rounded-2xl object-cover" />
        ) : (
          <div className="flex size-32 shrink-0 items-center justify-center rounded-2xl border border-dashed border-line text-muted" aria-label="Photo placeholder">
            <User className="size-10" aria-hidden />
          </div>
        )}
        <div>
          <h3 className="text-xl font-semibold">{a.name}</h3>
          <p className="mt-2 max-w-2xl text-muted">{a.bio}</p>
        </div>
      </div>
    </Section>
  )
}

function Pricing({ onSelect }: { onSelect: (t: Tier) => void }) {
  return (
    <Section id="pricing" title="Transparent Pricing & Packages" pad="py-24">
      <div className="grid gap-6 lg:grid-cols-3">
        {site.tiers.map((t) => (
          <div key={t.id} className={`${card} flex flex-col ${t.popular ? 'border-amber ring-1 ring-amber' : ''}`}>
            {t.popular && <p className={eyebrow}>Most Popular</p>}
            <h3 className={`text-xl font-semibold ${t.popular ? 'mt-2' : ''}`}>{t.name}</h3>
            <p className="mt-4 font-mono text-4xl font-bold">{taka(t.price)}</p>
            <p className="font-mono text-sm text-muted">{t.duration}</p>
            <p className="mt-4 text-sm text-muted italic">{t.tagline}</p>
            <ul className="mt-5 flex-1 space-y-3 text-sm">
              {t.features.map((f) => (
                <li key={f} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden />{f}</li>
              ))}
            </ul>
            <button onClick={() => onSelect(t)} className={`${t.popular ? btnPrimary : btnOutline} mt-6 w-full`}>
              {t.cta}
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 space-y-2 text-sm text-muted">
        <p>All packages are valid for {site.packageValidityDays} days. <strong className="text-fg">50/50 split payment</strong> available on multi-hour packages.</p>
        <p>Extended Practice Top-Up Pack available exclusively for active clients: {site.topUp.hours} Hours for <span className="font-mono text-fg">{taka(site.topUp.price)}</span>.</p>
      </div>
    </Section>
  )
}

function Faq() {
  const items = [
    ["What if my car doesn't have dual instructor pedals?", `We operate strictly in empty residential lanes early in the ${site.sessionWindow} window during your initial sessions. You never enter main traffic until your braking reflexes and spatial judgment are verified safe, supported by verbal guidance and handbrake readiness.`],
    ["Do I need a BRTA Learner's Permit before starting?", "A valid BRTA Learner's Permit or Driving License is required before driving on public Gulshan/Banani roads. If you don't have one yet, we can start inside gated private lanes or help you generate your BRTA e-Learner Permit online in 10 minutes."],
    ["Will my current driver find out while I'm still learning?", `No. Most clients schedule sessions between ${site.sessionWindow}—well before their driver's morning shift begins—allowing you to practice in complete privacy.`],
    ['What if I need to reschedule a morning session?', `Simply notify us at least ${site.rescheduleNoticeHours} hours in advance via WhatsApp to reschedule your slot within your ${site.packageValidityDays}-day package window at no extra charge.`],
    ['Can I pay in installments?', 'Yes. Multi-hour packages can be paid 100% upfront or split 50% upon signing before Session 1 and 50% before Session 4 via Cash, bKash, or Bank Transfer.'],
  ]
  const [open, setOpen] = useState<number | null>(0)
  return (
    <Section id="faq" title="Frequently Asked Questions">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="divide-y divide-line rounded-2xl border border-line bg-panel">
        {items.map(([q, a], i) => (
          <div key={q}>
            <h3>
              <button
                id={`faq-q${i}`}
                aria-expanded={open === i}
                aria-controls={`faq-a${i}`}
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold"
              >
                {q}
                <ChevronDown className={`size-5 shrink-0 text-amber transition-transform ${open === i ? 'rotate-180' : ''}`} aria-hidden />
              </button>
            </h3>
            <div id={`faq-a${i}`} role="region" aria-labelledby={`faq-q${i}`} hidden={open !== i} className="px-5 pb-5 text-muted">
              <p className="max-w-[54ch]">{a}</p>
            </div>
          </div>
        ))}
      </div>
      <aside className="self-start rounded-2xl border border-amber/40 p-6 lg:sticky lg:top-24">
        <h3 className="text-lg font-semibold">Still deciding?</h3>
        <p className="mt-2 text-sm text-muted">
          Start with the 1-hour diagnostic drive. It is fully credited toward Core or VIP if you upgrade within {site.deductibleDays} days.
        </p>
        <WaLink msg={messages.diagnostic} className={`${btnPrimary} mt-5 w-full`}>
          Book Diagnostic Drive • {taka(site.tiers[0].price)}
        </WaLink>
      </aside>
      </div>
    </Section>
  )
}

function BookingModal({ tier, onClose }: { tier: Tier | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  // native <dialog>.showModal(): Escape closes, background is inert, focus returns to the opener
  useEffect(() => {
    if (tier) ref.current?.showModal()
  }, [tier])

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!tier) return
    const f = new FormData(e.currentTarget)
    const get = (k: string) => String(f.get(k) ?? '')
    // must stay synchronous: in-app browsers block window.open after an await
    window.open(waLink(packageMessage(tier, get('area'), get('car'), get('time'))), '_blank', 'noopener')
    ref.current?.close()
  }

  const field = (name: string, label: string, opts: string[]) => (
    <label className="block">
      <span className="text-sm text-muted">{label} <span className="text-xs">(optional)</span></span>
      <select name={name} defaultValue="" className="mt-1 w-full rounded-xl border border-line bg-ink px-3 py-3 text-fg">
        <option value="">No preference</option>
        {opts.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  )

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-labelledby="modal-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-line bg-panel p-0 text-fg backdrop:bg-black/70"
    >
      {tier && (
        <form onSubmit={submit} className="space-y-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="modal-title" className="text-xl font-semibold">{tier.name}</h2>
              <p className="font-mono text-amber">{taka(tier.price)} • {tier.duration}</p>
            </div>
            <button type="button" onClick={() => ref.current?.close()} aria-label="Close" className="rounded-lg p-1 text-muted hover:text-fg">
              <X />
            </button>
          </div>
          <p className="text-sm text-muted">Sessions run {site.sessionWindow}. Times below are start times.</p>
          {field('area', 'Area', site.modal.areas)}
          {field('car', 'Car type', site.modal.carTypes)}
          {field('time', 'Preferred morning time', site.modal.times)}
          <button type="submit" className={`${btnPrimary} w-full`}>
            <MessageCircle className="size-5" aria-hidden /> Continue on WhatsApp
          </button>
        </form>
      )}
    </dialog>
  )
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="rounded-3xl border border-amber/40 bg-panel px-6 py-14 text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">Ready to Take the Driver's Seat of Your Own Car?</h2>
        <p className="mt-4 text-muted">Only {site.slotsPerMonth} early-morning slots open this month in Gulshan & Banani.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <WaLink msg={messages.general} className={btnPrimary}>
            <MessageCircle className="size-5" aria-hidden /> Chat on WhatsApp
          </WaLink>
          <WaLink msg={messages.callback} className={btnOutline}>
            <Phone className="size-5" aria-hidden /> Ask for a call back on WhatsApp
          </WaLink>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-muted sm:flex-row sm:justify-between sm:px-6">
        <div>
          <p className="font-extrabold tracking-wide text-fg uppercase">{site.brandName}</p>
          <p className="mt-1">{site.coverage.join(' • ')}</p>
          <p className="mt-1">Sessions {site.sessionWindow}</p>
        </div>
        <div className="sm:text-right">
          <a href={waLink(messages.general)} target="_blank" rel="noopener" className="inline-block py-2 font-mono text-fg hover:text-amber">
            WhatsApp {site.whatsappDisplay}
          </a>
          <p><a href={site.termsUrl} className="inline-block py-2 underline hover:text-fg">Safety & Liability Terms</a></p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [tier, setTier] = useState<Tier | null>(null)
  // mobile sticky bar appears only once the hero buttons have scrolled away (no duplicate CTA, no overlap)
  const [showBar, setShowBar] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero-cta')
    if (!hero) return
    const io = new IntersectionObserver(([e]) => setShowBar(!e.isIntersecting && e.boundingClientRect.top < 0))
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    }, { threshold: 0.15 })
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="pb-20 md:pb-0">
      <Header />
      <main>
        <Hero />
        <Comparison />
        <Roadmap />
        <Safety />
        <SocialProof />
        <About />
        <Pricing onSelect={setTier} />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <BookingModal tier={tier} onClose={() => setTier(null)} />

      <WaLink
        msg={messages.general}
        className="fixed right-6 bottom-6 z-40 hidden size-14 items-center justify-center rounded-full bg-amber text-ink shadow-lg md:flex"
      >
        <MessageCircle className="size-7" aria-hidden />
        <span className="sr-only">Chat on WhatsApp</span>
      </WaLink>
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 p-2 backdrop-blur transition-[transform,visibility] duration-300 ease-out md:hidden ${showBar ? '' : 'invisible translate-y-full'}`}
      >
        <WaLink msg={messages.diagnostic} className={`${btnPrimary} h-12 w-full py-0`}>
          Book Diagnostic Drive • {taka(site.tiers[0].price)}
        </WaLink>
      </div>
    </div>
  )
}
