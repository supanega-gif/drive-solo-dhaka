// Every editable value for the site lives here. UI components read from this file.

const DIAGNOSTIC_PRICE = 1200
const DEDUCTIBLE_DAYS = 7

export const site = {
  brandName: 'OwnWheel',
  whatsappNumber: '8801922603331', // international format, no +
  whatsappDisplay: '01922603331',
  sessionWindow: '6:00 AM – 8:00 AM',
  mentoredCount: '4+',
  rescheduleNoticeHours: 10,
  packageValidityDays: 45,
  deductibleDays: DEDUCTIBLE_DAYS,
  coverage: ['Gulshan 1 & 2', 'Banani', 'Baridhara DOHS'],
  termsUrl: '#', // placeholder: Safety & Liability Terms page

  // Leave empty until a real video exists. When set, the card links to it.
  videoUrl: '',
  videoTitle: 'How I went from never touching my steering wheel to driving solo to Gulshan 2',

  // Real testimonials only. The written-cards block renders nothing while this is empty.
  testimonials: [] as { quote: string; name: string; detail?: string }[],

  about: {
    isPlaceholder: true, // set false once real photo + bio are in
    photoUrl: '', // e.g. '/mentor.jpg' in /public
    name: '[Mentor name]',
    bio: '[Placeholder bio: 2–3 sentences on driving background, BRTA professional licence, and why you mentor car owners in Gulshan & Banani.]',
  },

  tiers: [
    {
      id: 'diagnostic',
      name: 'Diagnostic & Refresher Session',
      price: DIAGNOSTIC_PRICE,
      duration: '1 Hour',
      tagline: 'Best for testing coaching style or skill evaluation',
      features: [
        '60-minute doorstep evaluation drive in your own car',
        'Blind-spot & confidence assessment + custom roadmap',
        `100% Deductible: full ৳${DIAGNOSTIC_PRICE.toLocaleString('en-US')} credited toward Core or VIP upgrade within ${DEDUCTIBLE_DAYS} days`,
      ],
      cta: 'Book Diagnostic Drive',
      popular: false,
    },
    {
      id: 'core',
      name: 'Dhaka Independence Core',
      price: 15000,
      duration: '10 Hours',
      tagline: 'Complete transition from relying on a driver to solo confidence',
      features: [
        '10 × 60-minute early-morning doorstep sessions',
        'Residential lanes → Gulshan/Banani avenues → U-turns & roundabouts',
        'Tight apartment basement & parallel parking mastery',
        'Post-session road-cam review clips & progress scorecard',
      ],
      cta: 'Apply for Core Package',
      popular: true,
    },
    {
      id: 'vip',
      name: 'Executive VIP Commute Mastery',
      price: 22000,
      duration: '15 Hours',
      tagline: 'End-to-end readiness for busy executives & real office commutes',
      features: [
        'Everything in the Core Package (15 hours total)',
        'Real Office Route Simulation (Gulshan/Banani to Tejgaon, Motijheel, or Uttara)',
        'Night & Flyover Driving (headlight glare & elevated merge control)',
        'Priority BRTA e-Learner Permit Onboarding Assistance',
      ],
      cta: 'Apply for VIP Package',
      popular: false,
    },
  ],
  topUp: { hours: 5, price: 6500 },

  modal: {
    areas: ['Gulshan 1', 'Gulshan 2', 'Banani', 'Baridhara'],
    carTypes: ['Automatic Sedan', 'Automatic SUV', 'Manual'],
    // 7:30 omitted: a 60-minute session would run past 8:00 AM
    times: ['6:00 AM', '6:30 AM', '7:00 AM'],
  },
}

export type Tier = (typeof site.tiers)[number]

export const taka = (n: number) => `৳${n.toLocaleString('en-US')}`

export const waLink = (msg: string) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(msg)}`

export const messages = {
  diagnostic: `Hi, I'd like to book the 1-Hour Diagnostic Drive (${taka(site.tiers[0].price)}).`,
  general: `Hi, I'm interested in private driving mentorship in Gulshan/Banani.`,
  callback: `Hi, please call me back about private driving mentorship.`,
}

export function packageMessage(tier: Tier, area: string, car: string, time: string) {
  const lines = [`Hi, I'd like to book: ${tier.name} (${taka(tier.price)}, ${tier.duration}).`]
  if (area) lines.push(`Area: ${area}`)
  if (car) lines.push(`Car: ${car}`)
  if (time) lines.push(`Preferred time: ${time}`)
  return lines.join('\n')
}
