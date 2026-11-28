// All visible text, in English and Bangla. Numbers and prices live in config/site.ts.
// The Bangla text needs a native speaker's proofread before launch.

import { site } from './config/site'

export type Lang = 'en' | 'bn'

const bnDigits = '০১২৩৪৫৬৭৮৯'
// Bangla numerals for the Bangla version, Western numerals for English
export const num = (lang: Lang, v: string | number) =>
  lang === 'bn' ? String(v).replace(/[0-9]/g, (d) => bnDigits[+d]) : String(v)
export const tk = (lang: Lang, n: number) => num(lang, `৳${n.toLocaleString('en-US')}`)

const d = site.deductibleDays
const resched = site.rescheduleNoticeHours
const valid = site.packageValidityDays

const en = {
  switchTo: 'বাংলা',
  switchLabel: 'বাংলায় দেখুন (View in Bangla)',
  nav: ['Why your car', 'Route', 'Safety', 'Pricing', 'FAQ'],
  menuOpen: 'Open menu',
  menuClose: 'Close menu',
  window: '6:00 AM – 8:00 AM',
  map: {
    g2: 'Gulshan 2', g1: 'Gulshan 1', banani: 'Banani', gAve: 'Gulshan Ave', kAve: 'Kemal Ataturk Ave', gate: 'Your gate', lake: 'Lake',
    heroLabel: 'Schematic map of Gulshan and Banani with a first-lesson route around quiet residential roads near your gate',
    caption: 'Lesson 1, drawn on a schematic of Gulshan. Not to scale.',
  },
  morning: { label: 'A typical morning', marks: ['Lesson starts at your gate', 'Your driver arrives', 'You are at the office'], times: ['6:00', '8:00', '9:00'] },
  hero: {
    h1: 'Own a car in Dhaka, yet still rely on a driver?',
    sub: 'Private, 1-on-1 driving lessons with Ahnaf Akbar, from your doorstep, in your own car, before Dhaka traffic wakes up.',
    cta: 'Book a diagnostic drive',
    second: 'See the packages',
    note: `One hour at your gate. Fully credited toward Core or VIP if you continue within ${d} days.`,
  },
  compare: {
    title: 'Why lessons in your own car beat a driving school',
    school: 'Typical driving school', us: 'Private lessons in your car', schoolPrefix: 'Driving school: ',
    rows: [
      ['The car', 'Shared, worn manual training cars that feel nothing like yours', 'Your own sedan or SUV from the first minute'],
      ['The lesson', 'Rushed 20–30 minutes at a distant, crowded centre', 'A full 60 minutes, 1-on-1, starting at your gate'],
      ['The roads', 'No practice on your route or your basement ramp', 'Gulshan and Banani avenues, roundabouts and your exact parking spot'],
      ['The time', 'Fixed slots in the middle of the working day', "6:00 AM – 8:00 AM, before your driver's shift begins"],
    ],
  },
  route: {
    title: 'Ten sessions, one route that grows',
    intro: 'Each phase starts where the last one ended. You never meet main-road traffic before your car control is ready for it.',
    phaseLabel: 'Schematic route for phase',
    phases: [
      ['Sessions 1–3', 'Your car and quiet lanes', 'Mirror set-up, left-side bumper judgement, smooth automatic throttle and braking, and low-speed manoeuvres in empty residential lanes.'],
      ['Sessions 4–7', 'Avenues, roundabouts and U-turns', 'Merging onto Gulshan Avenue and Kemal Ataturk Avenue, morning traffic flow, safe spacing from buses and rickshaws, and confident U-turns.'],
      ['Sessions 8–10', 'Tight parking and your real commute', 'Apartment basement and mall parking, reverse and parallel, flyover merges, and practice runs of your actual office commute.'],
    ],
  },
  safety: {
    title: 'What keeps you, and your car, safe',
    intro: 'Your car has no instructor pedals, so safety comes from the order you learn in and from what is agreed before the first session.',
    licence: 'BRTA Professional Driving Licence',
    licenceNote: 'Shown to you, with my NID, before Session 1.',
    rec: 'REC 06:12',
    recTitle: 'Every session on the road camera',
    recPlace: 'Gulshan Avenue',
    items: [
      ['A signed agreement first', 'A one-page safety and liability agreement, signed before Session 1, with my BRTA licence and NID shown to you.'],
      ['Quiet roads before main roads', 'Beginners stay in empty residential lanes at 6:00 AM until car control is solid.'],
      ['Road-camera review', 'Every session is recorded for mutual safety. You get short review clips privately, to improve faster.'],
      ['Private by default', 'Sessions run 6:00 AM – 8:00 AM, before your driver arrives. Footage is never shared publicly without your written consent.'],
    ],
  },
  mentor: {
    title: 'Who sits beside you',
    name: 'Ahnaf Akbar',
    bio: '[Bio to add: 2–3 sentences on your driving background, your BRTA professional licence, and why you teach car owners in Gulshan and Banani.]',
    photoSlot: 'Photo coming: Ahnaf at the wheel',
    mentored: (n: string) => [`${n} car owners`, ' have already moved from the passenger seat to driving themselves.'] as [string, string],
    videoSlot: 'Video coming: a client’s first solo drive to Gulshan 2',
    watch: 'Watch: a client’s first solo drive',
  },
  pricing: {
    title: 'Packages and prices',
    intro: `All packages are valid for ${valid} days. Multi-hour packages can be split 50/50.`,
    topUp: (h: string, p: string) => `Extended practice top-up for active clients: ${h} hours for ${p}.`,
    tiers: {
      diagnostic: { name: 'Diagnostic & Refresher Session', duration: '1 hour', tagline: 'Best for testing the coaching style or checking your skills', cta: 'Book Diagnostic Drive',
        features: ['60-minute doorstep evaluation drive in your own car', 'Blind-spot and confidence check, plus a custom plan', `Full fee credited toward Core or VIP if you upgrade within ${d} days`] },
      core: { name: 'Dhaka Independence Core', duration: '10 hours', tagline: 'From relying on a driver to driving yourself with confidence', cta: 'Apply for Core Package',
        features: ['10 × 60-minute early-morning doorstep sessions', 'Residential lanes → Gulshan/Banani avenues → U-turns and roundabouts', 'Tight apartment basement and parallel parking', 'Road-camera review clips and a progress scorecard after sessions'] },
      vip: { name: 'Executive VIP Commute Mastery', duration: '15 hours', tagline: 'Full readiness for busy executives and real office commutes', cta: 'Apply for VIP Package',
        features: ['Everything in Core (15 hours in total)', 'Real office route practice (Gulshan/Banani to Tejgaon, Motijheel or Uttara)', 'Night and flyover driving (headlight glare and elevated merges)', 'Help with the BRTA e-learner permit application'] },
    },
  },
  faq: {
    title: 'Questions people ask first',
    items: [
      ["What if my car doesn't have instructor pedals?", 'Your first sessions stay in empty residential lanes early in the morning. You never enter main traffic until your braking and judgement are verified safe, with verbal guidance and the handbrake within reach.'],
      ["Do I need a BRTA learner's permit first?", "A valid BRTA learner's permit or licence is needed to drive on public roads. Without one yet, we start inside gated private lanes and help you apply for the e-learner permit online."],
      ['Will my driver find out while I am learning?', "Not unless you tell them. Sessions run 6:00 AM – 8:00 AM, before most drivers' morning shift begins."],
      ['What if I need to reschedule?', `Message on WhatsApp at least ${resched} hours ahead and the session moves within your ${valid}-day window at no charge.`],
      ['Can I pay in instalments?', 'Yes. Multi-hour packages can be paid in full, or 50% when you sign before Session 1 and 50% before Session 4, by cash, bKash or bank transfer.'],
    ],
  },
  close: {
    title: "Ready to take the driver's seat of your own car?",
    sub: `Start with one diagnostic drive at your gate. Continue within ${d} days and it is fully credited.`,
    cta: 'Book the diagnostic drive',
    callback: 'Ask for a call back on WhatsApp',
  },
  footer: { coverage: 'Gulshan 1 & 2, Banani, Baridhara DOHS', sessions: 'Sessions 6:00 AM – 8:00 AM', terms: 'Safety & liability terms' },
  modal: {
    note: 'Sessions run 6:00 AM – 8:00 AM. Times below are start times.',
    area: 'Area', car: 'Car type', time: 'Preferred start time', optional: '(optional)', none: 'No preference', close: 'Close', submit: 'Continue on WhatsApp',
    areas: ['Gulshan 1', 'Gulshan 2', 'Banani', 'Baridhara'],
    cars: ['Automatic sedan', 'Automatic SUV', 'Manual'],
    times: ['6:00 AM', '6:30 AM', '7:00 AM'],
  },
  bar: 'Book diagnostic drive',
  wa: {
    diagnostic: (p: string) => `Hi Ahnaf, I'd like to book the 1-hour diagnostic drive (${p}).`,
    general: "Hi Ahnaf, I'm interested in private driving lessons in Gulshan/Banani.",
    callback: 'Hi Ahnaf, please call me back about private driving lessons.',
    pkg: (name: string, p: string, dur: string) => `Hi Ahnaf, I'd like to book: ${name} (${p}, ${dur}).`,
    area: 'Area', car: 'Car', time: 'Preferred time',
  },
}

const bn: typeof en = {
  switchTo: 'English',
  switchLabel: 'View in English',
  nav: ['কেন নিজের গাড়ি', 'রুট', 'নিরাপত্তা', 'প্যাকেজ', 'প্রশ্নোত্তর'],
  menuOpen: 'মেনু খুলুন',
  menuClose: 'মেনু বন্ধ করুন',
  window: 'সকাল ৬:০০ – ৮:০০',
  map: {
    g2: 'গুলশান ২', g1: 'গুলশান ১', banani: 'বনানী', gAve: 'গুলশান এভিনিউ', kAve: 'কামাল আতাতুর্ক এভিনিউ', gate: 'আপনার গেট', lake: 'লেক',
    heroLabel: 'গুলশান ও বনানীর নকশা মানচিত্র, আপনার গেটের কাছে শান্ত আবাসিক রাস্তায় প্রথম ক্লাসের রুট',
    caption: 'প্রথম ক্লাস, গুলশানের নকশা মানচিত্রে আঁকা। মাপমতো নয়।',
  },
  morning: { label: 'একটি সাধারণ সকাল', marks: ['আপনার গেট থেকে ক্লাস শুরু', 'ড্রাইভার আসেন', 'আপনি অফিসে'], times: ['৬:০০', '৮:০০', '৯:০০'] },
  hero: {
    h1: 'ঢাকায় নিজের গাড়ি আছে, তবুও ড্রাইভারের উপর নির্ভর করছেন?',
    sub: 'আহনাফ আকবরের সাথে ব্যক্তিগত, একান্ত ড্রাইভিং ক্লাস: আপনার বাসার গেট থেকে, আপনার নিজের গাড়িতে, ঢাকার ট্রাফিক শুরু হওয়ার আগেই।',
    cta: 'ডায়াগনস্টিক ড্রাইভ বুক করুন',
    second: 'প্যাকেজগুলো দেখুন',
    note: `আপনার গেটে এক ঘণ্টা। ${num('bn', d)} দিনের মধ্যে Core বা VIP নিলে পুরো টাকা সেখানে যোগ হবে।`,
  },
  compare: {
    title: 'ড্রাইভিং স্কুলের চেয়ে নিজের গাড়িতে শেখা কেন ভালো',
    school: 'সাধারণ ড্রাইভিং স্কুল', us: 'আপনার গাড়িতে ব্যক্তিগত ক্লাস', schoolPrefix: 'ড্রাইভিং স্কুল: ',
    rows: [
      ['গাড়ি', 'পুরনো, সবার ব্যবহৃত ম্যানুয়াল গাড়ি, যা আপনার গাড়ির মতো নয়', 'প্রথম মিনিট থেকেই আপনার নিজের সেডান বা SUV'],
      ['ক্লাস', 'দূরের ভিড়ের সেন্টারে তাড়াহুড়োর ২০–৩০ মিনিট', 'পুরো ৬০ মিনিট, একান্তে, আপনার গেট থেকে শুরু'],
      ['রাস্তা', 'আপনার রুট বা বেসমেন্ট র‍্যাম্পে কোনো অনুশীলন নেই', 'গুলশান ও বনানীর এভিনিউ, গোলচত্বর আর আপনার নিজের পার্কিং স্পট'],
      ['সময়', 'অফিসের মাঝখানে নির্দিষ্ট সময়', 'সকাল ৬:০০ – ৮:০০, ড্রাইভারের ডিউটি শুরুর আগেই'],
    ],
  },
  route: {
    title: '১০টি ক্লাস, ধাপে ধাপে বাড়তে থাকা একটি রুট',
    intro: 'প্রতিটি ধাপ শুরু হয় আগের ধাপ যেখানে শেষ হয়েছে সেখান থেকে। গাড়ির নিয়ন্ত্রণ তৈরি হওয়ার আগে আপনি কখনো মেইন রোডের ট্রাফিকে যাবেন না।',
    phaseLabel: 'ধাপের নকশা রুট',
    phases: [
      ['ক্লাস ১–৩', 'আপনার গাড়ি ও শান্ত গলি', 'মিরর ঠিক করা, বাম দিকের বাম্পারের দূরত্ব বোঝা, অটোমেটিক গাড়িতে মসৃণ এক্সেলেরেটর ও ব্রেক, আর ফাঁকা আবাসিক গলিতে ধীর গতির চালনা।'],
      ['ক্লাস ৪–৭', 'এভিনিউ, গোলচত্বর ও ইউ-টার্ন', 'গুলশান এভিনিউ ও কামাল আতাতুর্ক এভিনিউতে ওঠা, সকালের ট্রাফিক, বাস ও রিকশা থেকে নিরাপদ দূরত্ব, আর আত্মবিশ্বাসী ইউ-টার্ন।'],
      ['ক্লাস ৮–১০', 'টাইট পার্কিং ও আপনার আসল অফিস রুট', 'অ্যাপার্টমেন্টের বেসমেন্ট ও মলের পার্কিং, রিভার্স ও প্যারালাল, ফ্লাইওভারে ওঠা, আর আপনার আসল অফিস রুটে অনুশীলন।'],
    ],
  },
  safety: {
    title: 'যা আপনাকে আর আপনার গাড়িকে নিরাপদ রাখে',
    intro: 'আপনার গাড়িতে প্রশিক্ষকের আলাদা প্যাডেল নেই, তাই নিরাপত্তা আসে শেখার ক্রম থেকে এবং প্রথম ক্লাসের আগে যা চুক্তি হয় তা থেকে।',
    licence: 'BRTA প্রফেশনাল ড্রাইভিং লাইসেন্স',
    licenceNote: 'প্রথম ক্লাসের আগে আমার NID সহ আপনাকে দেখানো হবে।',
    rec: 'REC ০৬:১২',
    recTitle: 'প্রতিটি ক্লাস রোড ক্যামেরায় রেকর্ড হয়',
    recPlace: 'গুলশান এভিনিউ',
    items: [
      ['প্রথমে লিখিত চুক্তি', 'প্রথম ক্লাসের আগে এক পাতার নিরাপত্তা ও দায়বদ্ধতার চুক্তিতে স্বাক্ষর, সাথে আমার BRTA লাইসেন্স ও NID দেখানো।'],
      ['মেইন রোডের আগে শান্ত রাস্তা', 'নতুনরা সকাল ৬টায় ফাঁকা আবাসিক গলিতে থাকেন, যতক্ষণ না গাড়ির নিয়ন্ত্রণ পাকা হয়।'],
      ['রোড ক্যামেরা রিভিউ', 'দুপক্ষের নিরাপত্তার জন্য প্রতিটি ক্লাস রেকর্ড হয়। দ্রুত উন্নতির জন্য ছোট রিভিউ ক্লিপ আপনাকে একান্তে পাঠানো হয়।'],
      ['গোপনীয়তা নিশ্চিত', 'ক্লাস হয় সকাল ৬:০০ – ৮:০০, আপনার ড্রাইভার আসার আগে। আপনার লিখিত অনুমতি ছাড়া কোনো ফুটেজ কখনো প্রকাশ করা হয় না।'],
    ],
  },
  mentor: {
    title: 'আপনার পাশে কে বসবেন',
    name: 'আহনাফ আকবর',
    bio: '[পরিচিতি যোগ করুন: আপনার ড্রাইভিং অভিজ্ঞতা, BRTA প্রফেশনাল লাইসেন্স, আর কেন গুলশান ও বনানীর গাড়ির মালিকদের শেখান, ২–৩ বাক্যে।]',
    photoSlot: 'ছবি আসছে: স্টিয়ারিংয়ে আহনাফ',
    mentored: (n: string) => [`${num('bn', n)} জন গাড়ির মালিক`, ' ইতিমধ্যে যাত্রীর আসন থেকে নিজে গাড়ি চালানো শুরু করেছেন।'] as [string, string],
    videoSlot: 'ভিডিও আসছে: একজন ক্লায়েন্টের প্রথম একা গুলশান ২ পর্যন্ত ড্রাইভ',
    watch: 'দেখুন: একজন ক্লায়েন্টের প্রথম একা ড্রাইভ',
  },
  pricing: {
    title: 'প্যাকেজ ও মূল্য',
    intro: `সব প্যাকেজের মেয়াদ ${num('bn', valid)} দিন। একাধিক ঘণ্টার প্যাকেজ ৫০/৫০ কিস্তিতে দেওয়া যায়।`,
    topUp: (h: string, p: string) => `চলমান ক্লায়েন্টদের জন্য অতিরিক্ত অনুশীলন: ${h} ঘণ্টা ${p}।`,
    tiers: {
      diagnostic: { name: 'ডায়াগনস্টিক ও রিফ্রেশার সেশন', duration: '১ ঘণ্টা', tagline: 'শেখানোর ধরন যাচাই বা নিজের দক্ষতা পরখের জন্য সেরা', cta: 'ডায়াগনস্টিক ড্রাইভ বুক করুন',
        features: ['আপনার নিজের গাড়িতে বাসার গেট থেকে ৬০ মিনিটের মূল্যায়ন ড্রাইভ', 'ব্লাইন্ড-স্পট ও আত্মবিশ্বাস যাচাই, সাথে আপনার জন্য আলাদা পরিকল্পনা', `${num('bn', d)} দিনের মধ্যে Core বা VIP নিলে পুরো ফি সেখানে যোগ হবে`] },
      core: { name: 'ঢাকা ইনডিপেনডেন্স কোর', duration: '১০ ঘণ্টা', tagline: 'ড্রাইভারের উপর নির্ভরতা থেকে আত্মবিশ্বাসের সাথে নিজে চালানো', cta: 'Core প্যাকেজ নিন',
        features: ['ভোরবেলা বাসার গেট থেকে ১০ × ৬০ মিনিটের ক্লাস', 'আবাসিক গলি → গুলশান/বনানীর এভিনিউ → ইউ-টার্ন ও গোলচত্বর', 'অ্যাপার্টমেন্টের টাইট বেসমেন্ট ও প্যারালাল পার্কিং', 'ক্লাসের পর রোড ক্যামেরার রিভিউ ক্লিপ ও অগ্রগতির স্কোরকার্ড'] },
      vip: { name: 'এক্সিকিউটিভ VIP কমিউট মাস্টারি', duration: '১৫ ঘণ্টা', tagline: 'ব্যস্ত এক্সিকিউটিভ ও আসল অফিস যাতায়াতের পূর্ণ প্রস্তুতি', cta: 'VIP প্যাকেজ নিন',
        features: ['Core-এর সবকিছু (মোট ১৫ ঘণ্টা)', 'আসল অফিস রুটে অনুশীলন (গুলশান/বনানী থেকে তেজগাঁও, মতিঝিল বা উত্তরা)', 'রাতে ও ফ্লাইওভারে ড্রাইভিং (হেডলাইটের ঝলক ও উঁচু রাস্তায় ওঠা)', 'BRTA ই-লার্নার পারমিটের আবেদনে সহায়তা'] },
    },
  },
  faq: {
    title: 'সবাই প্রথমে যা জানতে চান',
    items: [
      ['আমার গাড়িতে প্রশিক্ষকের প্যাডেল না থাকলে?', 'প্রথম ক্লাসগুলো হয় ভোরবেলা ফাঁকা আবাসিক গলিতে। আপনার ব্রেক ও বিচারবুদ্ধি নিরাপদ প্রমাণিত না হওয়া পর্যন্ত আপনি মেইন রোডে যাবেন না; মুখে নির্দেশনা আর হ্যান্ডব্রেক সবসময় হাতের নাগালে থাকে।'],
      ['আগে কি BRTA লার্নার পারমিট লাগবে?', 'পাবলিক রাস্তায় চালাতে বৈধ BRTA লার্নার পারমিট বা লাইসেন্স লাগবে। এখনো না থাকলে আমরা গেটওয়ালা ব্যক্তিগত গলিতে শুরু করি এবং অনলাইনে ই-লার্নার পারমিটের আবেদনে সাহায্য করি।'],
      ['শেখার সময় আমার ড্রাইভার কি জেনে যাবেন?', 'আপনি না বললে নয়। ক্লাস হয় সকাল ৬:০০ – ৮:০০, বেশিরভাগ ড্রাইভারের ডিউটি শুরুর আগে।'],
      ['সময় বদলাতে হলে?', `অন্তত ${num('bn', resched)} ঘণ্টা আগে WhatsApp-এ জানালে ক্লাসটি আপনার ${num('bn', valid)} দিনের মেয়াদের মধ্যে বিনা খরচে সরানো যাবে।`],
      ['কিস্তিতে কি টাকা দেওয়া যায়?', 'হ্যাঁ। একাধিক ঘণ্টার প্যাকেজ একবারে, অথবা প্রথম ক্লাসের আগে চুক্তির সময় ৫০% এবং চতুর্থ ক্লাসের আগে ৫০%, নগদ, বিকাশ বা ব্যাংক ট্রান্সফারে দেওয়া যায়।'],
    ],
  },
  close: {
    title: 'নিজের গাড়ির ড্রাইভিং সিটে বসতে প্রস্তুত?',
    sub: `আপনার গেটে একটি ডায়াগনস্টিক ড্রাইভ দিয়ে শুরু করুন। ${num('bn', d)} দিনের মধ্যে প্যাকেজ নিলে পুরো টাকা সেখানে যোগ হবে।`,
    cta: 'ডায়াগনস্টিক ড্রাইভ বুক করুন',
    callback: 'WhatsApp-এ কল ব্যাক চান',
  },
  footer: { coverage: 'গুলশান ১ ও ২, বনানী, বারিধারা DOHS', sessions: 'ক্লাস সকাল ৬:০০ – ৮:০০', terms: 'নিরাপত্তা ও দায়বদ্ধতার শর্তাবলি' },
  modal: {
    note: 'ক্লাস হয় সকাল ৬:০০ – ৮:০০। নিচের সময়গুলো শুরুর সময়।',
    area: 'এলাকা', car: 'গাড়ির ধরন', time: 'পছন্দের শুরুর সময়', optional: '(ঐচ্ছিক)', none: 'কোনো পছন্দ নেই', close: 'বন্ধ করুন', submit: 'WhatsApp-এ এগিয়ে যান',
    areas: ['গুলশান ১', 'গুলশান ২', 'বনানী', 'বারিধারা'],
    cars: ['অটোমেটিক সেডান', 'অটোমেটিক SUV', 'ম্যানুয়াল'],
    times: ['সকাল ৬:০০', 'সকাল ৬:৩০', 'সকাল ৭:০০'],
  },
  bar: 'ডায়াগনস্টিক ড্রাইভ বুক করুন',
  wa: {
    diagnostic: (p: string) => `আসসালামু আলাইকুম আহনাফ ভাই, আমি ১ ঘণ্টার ডায়াগনস্টিক ড্রাইভ (${p}) বুক করতে চাই।`,
    general: 'আসসালামু আলাইকুম আহনাফ ভাই, গুলশান/বনানীতে ব্যক্তিগত ড্রাইভিং ক্লাস সম্পর্কে জানতে চাই।',
    callback: 'আসসালামু আলাইকুম আহনাফ ভাই, ড্রাইভিং ক্লাস নিয়ে কথা বলতে আমাকে একটু কল দেবেন?',
    pkg: (name: string, p: string, dur: string) => `আসসালামু আলাইকুম আহনাফ ভাই, আমি বুক করতে চাই: ${name} (${p}, ${dur})।`,
    area: 'এলাকা', car: 'গাড়ি', time: 'পছন্দের সময়',
  },
}

export const copy = { en, bn }
export type Copy = typeof en
