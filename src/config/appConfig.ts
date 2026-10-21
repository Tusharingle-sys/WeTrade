export const APP_CONFIG = {
  name: 'WeTrade',
  fullName: 'WeTrade Solutions',
  tagline: 'Right Source – Right Buyer – Better Value',
  subTagline: 'B2B Sourcing, Sales & Trade Facilitation Solutions',
  email: 'info@thewetrade.in',
  supportEmail: 'support@thewetrade.in',
  emails: {
    info: 'info@thewetrade.in',
    support: 'support@thewetrade.in'
  },
  phone: '+91 96994 84156, +91 93229 74966',
  phones: [
    '+91 96994 84156',
    '+91 93229 74966'
  ],
  address: 'Hadapsar, Saswad Rd, Pune, Maharashtra - 411028',
  
  // Theme brand colors
  colors: {
    primaryNavy: '#07145B',
    goldenYellow: '#FFB800',
    goldenAccent: '#E5A500',
    lightBg: '#F5F7FA',
    darkText: '#0A1128',
    mutedText: '#64748B',
    successGreen: '#10B981',
    amberWarning: '#F59E0B',
    dangerRed: '#EF4444'
  },

  // Boundary statements strictly requested by business rules
  legalDisclaimers: {
    roleStatement: 'WeTrade operates strictly as an intermediary and trade facilitation partner between sellers and suitable buyers. WeTrade is not the product seller, buyer, manufacturer, or transport operator.',
    noGuaranteeNotice: 'WeTrade does not guarantee a sale, the highest possible price, buyer payment, or delivery schedules. The seller, buyer, and any selected logistics provider remain solely responsible for the obligations assigned to them in their respective commercial agreement.',
    verificationNotice: 'A seller or product is labelled "Verified" only after physical/documentary checks have been performed by the WeTrade trade operations team.',
    demoNotice: 'Demonstration environment — all company names, prices, transactions, documents, and shipment milestones are fictional demonstration models.',
    noRealLiveGps: 'Manually updated demo shipment statuses — not live carrier GPS tracking.',
    formDisclaimer: 'Demonstration Prototype Notice: Enquiry submission endpoints are simulated. No live backend transmission or confidential storage occurs in this preview build.'
  },

  // Navigation Links
  navLinks: [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'How It Works', path: '/how-it-works' },
    { 
      label: 'Solutions', 
      isDropdown: true,
      children: [
        { label: 'For Sellers', path: '/for-sellers', desc: 'Reach verified buyers & expand your sales market' },
        { label: 'For Buyers', path: '/for-buyers', desc: 'Source directly from vetted producers & manufacturers' },
        { label: 'Logistics Coordination', path: '/logistics', desc: 'Optional transport quotations & milestone tracking' }
      ]
    },
    { label: 'Products', path: '/products' },
    { label: 'Demo Portfolio', path: '/demo-portfolio', highlight: true },
    { label: 'Contact', path: '/contact' }
  ]
};
