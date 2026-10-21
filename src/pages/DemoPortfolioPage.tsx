import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Truck,
  Building2,
  Users2,
  FileText,
  BadgePercent,
  Check,
  Package,
  Layers,
  ArrowRight,
  Clock,
  Sparkles,
  ExternalLink,
  Info
} from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

interface StageData {
  id: number;
  title: string;
  shortTitle: string;
  category: 'Seller Onboarding' | 'Listing & Discovery' | 'Commercials' | 'Execution' | 'Delivery & Closure';
  relevantRoles: ('seller' | 'buyer' | 'logistics')[];
  whatHappens: string;
  whoIsInvolved: string;
  whatWeTradeDoes: string;
  documents: string;
  expectedOutcome: string;
  nextStep: string;
  simStatus: {
    seller: string;
    buyer: string;
    negotiation: string;
    order: string;
    logistics: string;
  };
}

const STAGES: StageData[] = [
  {
    id: 1,
    title: '1. Seller Enquiry & Initial Contact',
    shortTitle: 'Seller Contact',
    category: 'Seller Onboarding',
    relevantRoles: ['seller'],
    whatHappens: 'A small-scale producer, ABC Foods, reaches out seeking new B2B sales channels for stone-ground ragi flour.',
    whoIsInvolved: 'ABC Foods (Demo Seller) & WeTrade Trade Desk',
    whatWeTradeDoes: 'Schedules an orientation call, reviews production capacity (45 MT/mo), and gathers preliminary product specs.',
    documents: 'Seller Profile Form, FSSAI License copy, preliminary specification sheet',
    expectedOutcome: 'Clear understanding of seller manufacturing capability, expected unit price (₹58/kg), and target markets.',
    nextStep: 'Conduct initial verification meeting and review physical or certified lab samples.',
    simStatus: { seller: 'Enquiry Received', buyer: 'Pending Outreach', negotiation: 'Not Started', order: 'Not Created', logistics: 'Not Requested' }
  },
  {
    id: 2,
    title: '2. Initial Meeting & Needs Assessment',
    shortTitle: 'Initial Meeting',
    category: 'Seller Onboarding',
    relevantRoles: ['seller'],
    whatHappens: 'Structured discussion examining seller production schedules, minimum lot batches, packaging options, and payment expectations.',
    whoIsInvolved: 'ABC Foods & WeTrade Sourcing Specialist',
    whatWeTradeDoes: 'Explains trade facilitation model, transparent intermediary role, and potential commission/service-fee structure.',
    documents: 'Trade Facilitation Understanding Note, Production capacity questionnaire',
    expectedOutcome: 'Mutual alignment on commercial goals and authorized mandate to represent specifications to vetted buyers.',
    nextStep: 'Perform documentary and quality checks on ragi flour batch samples.',
    simStatus: { seller: 'Interview Complete', buyer: 'Pending Outreach', negotiation: 'Not Started', order: 'Not Created', logistics: 'Not Requested' }
  },
  {
    id: 3,
    title: '3. Product Verification & Sample Review',
    shortTitle: 'Verification',
    category: 'Seller Onboarding',
    relevantRoles: ['seller'],
    whatHappens: 'Verification of moisture content (<10%), fineness grade, packaging durability, and organic compliance certificates.',
    whoIsInvolved: 'WeTrade Quality Desk & ABC Foods Operations',
    whatWeTradeDoes: 'Audits test certificates against standard food safety regulations and labels the profile as "Verified Demo Seller".',
    documents: 'Batch Lab Test Report #HSS-441, NPOP Organic Certificate, Master Carton burst test report',
    expectedOutcome: 'Verified product dossier ready to present confidently to wholesale buyers.',
    nextStep: 'Publish structured listing in WeTrade Trade Portal.',
    simStatus: { seller: 'Verified Status', buyer: 'Pending Outreach', negotiation: 'Not Started', order: 'Not Created', logistics: 'Not Requested' }
  },
  {
    id: 4,
    title: '4. Product Listing in Trade Portal',
    shortTitle: 'Listing Portal',
    category: 'Listing & Discovery',
    relevantRoles: ['seller', 'buyer'],
    whatHappens: 'Product WT-P01 (1kg Ragi Flour retail pack) is listed with indicative pricing, MOQ (500 kg), and lead time specifications.',
    whoIsInvolved: 'WeTrade Platform Team',
    whatWeTradeDoes: 'Maintains catalog hygiene, SEO discovery tags, and ensures sensitive seller details remain protected until mutual interest is established.',
    documents: 'Product Data Sheet WT-P01, Master Carton Packing Specification',
    expectedOutcome: 'High-visibility digital listing ready for targeted B2B buyer matchmaking.',
    nextStep: 'Execute targeted buyer discovery and direct trade outreach.',
    simStatus: { seller: 'Product Active', buyer: 'Prospecting', negotiation: 'Not Started', order: 'Not Created', logistics: 'Not Requested' }
  },
  {
    id: 5,
    title: '5. Buyer Discovery & Matchmaking',
    shortTitle: 'Buyer Discovery',
    category: 'Listing & Discovery',
    relevantRoles: ['buyer'],
    whatHappens: 'WeTrade identifies regional food distributor "Demo Buyer Distributors" seeking farm-origin millet products for retail distribution.',
    whoIsInvolved: 'WeTrade Sales Desk & Demo Buyer Distributors',
    whatWeTradeDoes: 'Screens buyer volume requirements, creditworthiness, and presents verified product specifications and certifications.',
    documents: 'Buyer Sourcing Requirement Profile, Anonymized Product Spec Sheet',
    expectedOutcome: 'Confirmed interest from a qualified buyer with authentic purchase intent for 2,000 kg initial test run.',
    nextStep: 'Receive formal buyer RFQ with target pricing and delivery destination.',
    simStatus: { seller: 'Product Active', buyer: 'Qualified Buyer Matched', negotiation: 'RFQ Pending', order: 'Not Created', logistics: 'Not Requested' }
  },
  {
    id: 6,
    title: '6. Buyer Enquiry & Specification Confirmation',
    shortTitle: 'Buyer Enquiry',
    category: 'Listing & Discovery',
    relevantRoles: ['buyer'],
    whatHappens: 'Demo Buyer Distributors submits formal RFQ-8801 requesting 2,000 kg in 1kg retail nitrogen-flushed pouches.',
    whoIsInvolved: 'Demo Buyer Distributors & WeTrade Facilitator',
    whatWeTradeDoes: 'Validates buyer specifications, destination warehouse in Bhiwandi (Mumbai), and required delivery timeframe.',
    documents: 'Request for Quotation (RFQ-8801), Delivery Destination & Unloading Guidelines',
    expectedOutcome: 'Clear buyer terms: target price of ₹52/kg, delivery required within 14 days of PO confirmation.',
    nextStep: 'Initiate commercial negotiation to bridge seller expected price (₹58/kg) and buyer target (₹52/kg).',
    simStatus: { seller: 'Product Active', buyer: 'RFQ-8801 Submitted', negotiation: 'Drafting Offer', order: 'Not Created', logistics: 'Assessment Underway' }
  },
  {
    id: 7,
    title: '7. Price Negotiation & Term Coordination',
    shortTitle: 'Negotiation',
    category: 'Commercials',
    relevantRoles: ['seller', 'buyer'],
    whatHappens: 'WeTrade facilitates transparent commercial dialogue between seller and buyer regarding price, batch size, and payment terms.',
    whoIsInvolved: 'ABC Foods, Demo Buyer Distributors, and WeTrade Trade Lead',
    whatWeTradeDoes: 'Proposes mutually acceptable middle-ground rate of ₹55/kg based on a 2,000 kg lot commitment, balancing producer margins and buyer targets.',
    documents: 'Quotation Comparison Sheet QT-2026-001, Transparent Fee Schedule',
    expectedOutcome: 'Both parties agree on ₹55/kg ex-factory + transparent logistics and facilitation fees.',
    nextStep: 'Draft binding commercial agreement and deal confirmation note.',
    simStatus: { seller: 'Price Agreed (₹55)', buyer: 'Price Agreed (₹55)', negotiation: 'Terms Accepted', order: 'Pending PO', logistics: 'Quotes Gathered' }
  },
  {
    id: 8,
    title: '8. Deal Finalization & Commercial Agreement',
    shortTitle: 'Deal Finalization',
    category: 'Commercials',
    relevantRoles: ['seller', 'buyer'],
    whatHappens: 'Finalization of formal commercial agreement defining delivery terms, inspection criteria, payment milestones, and defect handling.',
    whoIsInvolved: 'ABC Foods & Demo Buyer Distributors (facilitated by WeTrade)',
    whatWeTradeDoes: 'Ensures responsibilities are explicitly documented. Confirms WeTrade intermediary role and lack of product ownership.',
    documents: 'B2B Trade Agreement WT-DEMO-001, Purchase Order Confirmation',
    expectedOutcome: 'Binding order acknowledgment signed by both commercial principals.',
    nextStep: 'Initiate order processing and manufacturing batch preparation.',
    simStatus: { seller: 'Contract Signed', buyer: 'PO Issued', negotiation: 'Finalized', order: 'Created (WT-ORD-101)', logistics: 'Pending Partner Booking' }
  },
  {
    id: 9,
    title: '9. Order Processing & Production Staging',
    shortTitle: 'Order Processing',
    category: 'Execution',
    relevantRoles: ['seller'],
    whatHappens: 'ABC Foods schedules dedicated stone milling of 2,000 kg ragi, Nitrogen packaging into 2,000 pouches, and carton boxing.',
    whoIsInvolved: 'ABC Foods Production Team & WeTrade Operations Follow-up',
    whatWeTradeDoes: 'Maintains daily milestone check in the Trade Portal and validates pre-dispatch timeline.',
    documents: 'Production Schedule Batch Card, 84 Master Cartons Packing List',
    expectedOutcome: 'Goods completed on schedule, stored on wooden pallets in dry storage ready for vehicle loading.',
    nextStep: 'Coordinate logistics quotations and partner selection (if transport coordination is requested).',
    simStatus: { seller: 'Stock Ready at Mill', buyer: 'Advance Paid', negotiation: 'Finalized', order: 'Ready for Dispatch', logistics: 'Carrier Selection' }
  },
  {
    id: 10,
    title: '10. Logistics Coordination & Partner Selection',
    shortTitle: 'Logistics Select',
    category: 'Execution',
    relevantRoles: ['logistics', 'seller'],
    whatHappens: 'Buyer requests WeTrade assistance with transport. WeTrade obtains competitive quotations from 3 vetted logistics partners.',
    whoIsInvolved: 'WeTrade Logistics Desk & FastTrack Cargo & Freight Demo',
    whatWeTradeDoes: 'Compares transit time, insurance coverage, and rates. Selects FastTrack dedicated 19ft closed container vehicle for ₹4,800 freight.',
    documents: 'Transport Comparison Quotation, Carrier Booking Note, E-Way Bill draft',
    expectedOutcome: 'Confirmed carrier booking code FTC-889021 with pickup scheduled from Hassan mill.',
    nextStep: 'Vehicle placement, physical loading, and driver consignment handoff.',
    simStatus: { seller: 'Staged at Bay', buyer: 'Transport Booked', negotiation: 'Finalized', order: 'Logistics Booked', logistics: 'Vehicle Scheduled' }
  },
  {
    id: 11,
    title: '11. Dispatch & Consignment Handoff',
    shortTitle: 'Dispatch',
    category: 'Execution',
    relevantRoles: ['seller', 'logistics'],
    whatHappens: 'FastTrack container vehicle arrives at Hassan mill. 84 cartons are inspected, loaded, and verified against the shipping manifest.',
    whoIsInvolved: 'ABC Foods Dispatch Rep, Driver, and Logistics Coordinator',
    whatWeTradeDoes: 'Confirms driver details, gross tare weight, uploads E-Way bill, and logs "Picked Up" status in the Trade Portal.',
    documents: 'Consignment Note (LR/GR) #889021, Signed Gate Pass, Tax Invoice',
    expectedOutcome: 'Consignment safely departs origin facility on route to destination hub.',
    nextStep: 'Monitor transit checkpoints and milestone updates.',
    simStatus: { seller: 'Dispatched from Hassan', buyer: 'Transit Notice Received', negotiation: 'Finalized', order: 'Picked Up', logistics: 'On Route' }
  },
  {
    id: 12,
    title: '12. Shipment Tracking & Milestone Updates',
    shortTitle: 'Transit Tracking',
    category: 'Execution',
    relevantRoles: ['logistics', 'buyer'],
    whatHappens: 'The truck traverses the Bengaluru–Pune–Mumbai freight corridor, updating toll milestones and intermediate transit hub checkpoints.',
    whoIsInvolved: 'FastTrack Logistics Dispatcher & WeTrade Operations Desk',
    whatWeTradeDoes: 'Monitors progress against estimated ETA. Proactively alerts buyer of transit status without requiring manual phone chases.',
    documents: 'Checkpoint Status Logs, Toll Plaza Timestamp Feed',
    expectedOutcome: 'Truck safely reaches Bhiwandi central logistics hub without transit damage or significant weather delays.',
    nextStep: 'Vehicle dispatch for last-mile delivery to buyer destination warehouse.',
    simStatus: { seller: 'In Transit', buyer: 'Tracking Active', negotiation: 'Finalized', order: 'In Transit', logistics: 'Reached Destination Hub' }
  },
  {
    id: 13,
    title: '13. Final Destination Delivery & Unloading',
    shortTitle: 'Final Delivery',
    category: 'Delivery & Closure',
    relevantRoles: ['buyer', 'logistics'],
    whatHappens: 'Consignment arrives at Demo Buyer Distributors Bhiwandi warehouse. 84 cartons are unloaded, inspected for outer seal integrity, and counted.',
    whoIsInvolved: 'Demo Buyer Receiving Team & Delivery Driver',
    whatWeTradeDoes: 'Coordinates delivery dock slotting and ensures receiver inspects packaging before signing acknowledgement.',
    documents: 'Proof of Delivery (POD) signed receipt, Goods Received Note (GRN)',
    expectedOutcome: 'All 2,000 kg received in pristine condition with 100% seal integrity.',
    nextStep: 'Obtain formal sign-off and initiate commercial order closure.',
    simStatus: { seller: 'Delivered', buyer: 'Goods Received (Clean POD)', negotiation: 'Finalized', order: 'Delivered', logistics: 'Trip Completed' }
  },
  {
    id: 14,
    title: '14. Order Closure & Trade Settlement',
    shortTitle: 'Order Closure',
    category: 'Delivery & Closure',
    relevantRoles: ['seller', 'buyer'],
    whatHappens: 'Buyer confirms goods acceptance. Remaining commercial settlement released according to agreed contract terms.',
    whoIsInvolved: 'ABC Foods, Demo Buyer Distributors, WeTrade Facilitator',
    whatWeTradeDoes: 'Issues final trade summary statement, records closed transaction in Trade Portal, and requests bilateral feedback for future orders.',
    documents: 'Final Transaction Statement WT-DEMO-001, Mutual Commercial Release Note',
    expectedOutcome: 'Successful end-to-end trade execution with high satisfaction from both producer and buyer.',
    nextStep: 'Repeat order planning and seasonal crop supply scheduling.',
    simStatus: { seller: 'Payment Settled', buyer: 'Inventory Stocked', negotiation: 'Completed', order: 'Closed & Archived', logistics: 'Freight Settled' }
  }
];

export const DemoPortfolioPage: React.FC = () => {
  const [currentStageId, setCurrentStageId] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audienceFilter, setAudienceFilter] = useState<'all' | 'seller' | 'buyer' | 'logistics'>('all');
  const [logisticsRequired, setLogisticsRequired] = useState(true);
  const [activeCaseStudyTab, setActiveCaseStudyTab] = useState<'seller' | 'buyer' | 'quotation' | 'order' | 'logistics' | 'delivery'>('seller');
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Playback loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStageId((prev) => {
          if (prev >= 14) {
            setIsPlaying(false);
            return 14;
          }
          return prev + 1;
        });
      }, 4200);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  // Resolve stage data dynamically respecting the no-logistics (self-arranged) toggle
  const baseStage = STAGES.find((s) => s.id === currentStageId) || STAGES[0];
  const activeStage = React.useMemo(() => {
    if (logisticsRequired) return baseStage;

    if (baseStage.id === 10) {
      return {
        ...baseStage,
        title: '10. Self-Arranged Logistics & Dock Scheduling',
        shortTitle: 'Self-Arranged',
        whatHappens: 'Buyer elects direct factory pickup using their own dedicated vehicle/fleet. WeTrade coordinates origin loading dock appointment, gate pass documentation, and statutory E-Way bill alignment.',
        whoIsInvolved: 'Demo Buyer Fleet Coordinator & ABC Foods Dispatch Dock',
        whatWeTradeDoes: 'Schedules Hassan mill bay loading slot, issues driver security pass, and verifies consignment checklist without third-party transport markups.',
        documents: 'Origin Gate Pass, Consignment Inspection Manifest, Buyer Vehicle Booking Note',
        expectedOutcome: 'Confirmed loading dock slot at Hassan mill with driver clearance credentials.',
        nextStep: 'Buyer vehicle placement, physical loading, and driver consignment handoff.',
        simStatus: {
          seller: 'Bay Slotted at Mill',
          buyer: 'Direct Vehicle Scheduled',
          negotiation: 'Finalized',
          order: 'Dock Scheduled',
          logistics: 'Self-Arranged by Buyer'
        }
      };
    }
    if (baseStage.id === 11) {
      return {
        ...baseStage,
        title: '11. Dispatch & Direct Consignment Handoff',
        whatHappens: 'Buyer-arranged dedicated vehicle arrives at Hassan mill. 84 master cartons are inspected, loaded, and verified against the shipping manifest.',
        whoIsInvolved: 'ABC Foods Dispatch Rep, Buyer Driver, and WeTrade Operations Desk',
        whatWeTradeDoes: 'Verifies tare weight, confirms loading completion, uploads tax invoice and gate pass into Trade Portal.',
        documents: 'Signed Gate Pass, Consignment Loading Manifest, Tax Invoice',
        expectedOutcome: 'Consignment departs Hassan mill under direct buyer transport supervision.',
        nextStep: 'Buyer monitors transit route to destination warehouse.',
        simStatus: {
          seller: 'Dispatched from Hassan',
          buyer: 'Truck Loaded & Departed',
          negotiation: 'Finalized',
          order: 'Picked Up',
          logistics: 'Self-Arranged by Buyer'
        }
      };
    }
    if (baseStage.id === 12) {
      return {
        ...baseStage,
        title: '12. Overland Transit & Receiving Preparation',
        whatHappens: 'Buyer-arranged truck navigates overland corridor. Buyer warehouse operations prepares bay slotting and receiving equipment.',
        whoIsInvolved: 'Buyer Logistics Fleet & WeTrade Follow-up Desk',
        whatWeTradeDoes: 'Maintains milestone synchronization in Trade Portal, confirming ETA window with receiving warehouse.',
        documents: 'Checkpoint Status Logs, Highway Receipt Records',
        expectedOutcome: 'Consignment arrives safely at Bhiwandi warehouse without handling damage.',
        nextStep: 'Destination dock unloading and piece-count verification.',
        simStatus: {
          seller: 'In Transit',
          buyer: 'Own Carrier On Route',
          negotiation: 'Finalized',
          order: 'In Transit',
          logistics: 'Self-Arranged by Buyer'
        }
      };
    }
    if (baseStage.id === 13) {
      return {
        ...baseStage,
        title: '13. Destination Unloading & Receipt Sign-off',
        whatHappens: 'Consignment arrives at Demo Buyer Distributors Bhiwandi warehouse. 84 cartons are unloaded, inspected for outer seal integrity, and counted by internal receiving staff.',
        whoIsInvolved: 'Demo Buyer Receiving Team & Delivery Driver',
        whatWeTradeDoes: 'Ensures receiver inspects packaging and uploads Goods Received Note (GRN) into the portal.',
        documents: 'Goods Received Note (GRN), Inspection Checklist',
        expectedOutcome: 'All 2,000 kg received in pristine condition with 100% seal integrity.',
        nextStep: 'Formal order sign-off and commercial closure.',
        simStatus: {
          seller: 'Delivered',
          buyer: 'Goods Received (Internal GRN)',
          negotiation: 'Finalized',
          order: 'Delivered',
          logistics: 'Self-Arranged by Buyer'
        }
      };
    }
    if (baseStage.id === 14) {
      return {
        ...baseStage,
        simStatus: {
          seller: 'Payment Settled',
          buyer: 'Inventory Stocked',
          negotiation: 'Completed',
          order: 'Closed & Archived',
          logistics: 'Self-Arranged (No Freight Charge)'
        }
      };
    }
    return baseStage;
  }, [baseStage, logisticsRequired]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input/textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowRight') {
        setIsPlaying(false);
        setCurrentStageId((prev) => (prev < 14 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        setIsPlaying(false);
        setCurrentStageId((prev) => (prev > 1 ? prev - 1 : prev));
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNext = () => {
    setIsPlaying(false);
    if (currentStageId < 14) setCurrentStageId(currentStageId + 1);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    if (currentStageId > 1) setCurrentStageId(currentStageId - 1);
  };

  const handleRestart = () => {
    setIsPlaying(false);
    setCurrentStageId(1);
  };

  const handleJumpToStage = (id: number) => {
    setIsPlaying(false);
    setCurrentStageId(id);
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen pb-20">
      {/* Top Breadcrumb & Advisory Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <Link to="/" className="hover:text-[#07145B]">Home</Link>
                <span>/</span>
                <span className="text-slate-900 font-semibold">Demo Portfolio</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#07145B] tracking-tight">
                See How WeTrade Works — From First Meeting to Final Delivery
              </h1>
              <p className="text-sm text-slate-600 mt-1 max-w-3xl">
                One connected process for product discovery, buyer connections, commercial coordination, order updates, and delivery follow-up.
              </p>
            </div>

            {/* Fictional Demo Badge */}
            <div className="shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold shadow-sm">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Illustrative Demo — Not a Real Client Transaction</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Audience Filter Bar & Transport Toggle */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
              Perspective:
            </span>
            <button
              onClick={() => setAudienceFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                audienceFilter === 'all'
                  ? 'bg-[#07145B] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Complete 14 Stages
            </button>
            <button
              onClick={() => setAudienceFilter('seller')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                audienceFilter === 'seller'
                  ? 'bg-[#FFB800] text-[#07145B] shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>I Am a Seller</span>
            </button>
            <button
              onClick={() => setAudienceFilter('buyer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                audienceFilter === 'buyer'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Users2 className="w-3.5 h-3.5" />
              <span>I Am a Buyer</span>
            </button>
            <button
              onClick={() => setAudienceFilter('logistics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                audienceFilter === 'logistics'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>I Am a Logistics Partner</span>
            </button>
          </div>

          {/* Logistics Toggle */}
          <div className="flex items-center gap-3 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200 shrink-0">
            <span className="text-xs font-medium text-slate-700">Logistics Coordination:</span>
            <button
              onClick={() => setLogisticsRequired(!logisticsRequired)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                logisticsRequired ? 'bg-[#07145B]' : 'bg-slate-300'
              }`}
              title="Toggle whether transaction uses WeTrade transport coordination or buyer direct pickup"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  logisticsRequired ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="text-xs font-bold text-slate-900">
              {logisticsRequired ? 'Facilitated (FastTrack)' : 'Self-Arranged by Buyer'}
            </span>
          </div>
        </div>

        {/* MAIN INTERACTIVE SIMULATION CONTAINER */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Top Control Bar */}
          <div className="p-4 sm:p-6 bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800">
            {/* Progress & Stage indicator */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-12 h-12 rounded-2xl bg-[#FFB800] text-[#07145B] flex flex-col items-center justify-center font-extrabold shadow-md shrink-0">
                <span className="text-xs uppercase tracking-tighter">Stage</span>
                <span className="text-lg leading-none">{currentStageId}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                    {activeStage.category}
                  </span>
                  <span className="text-xs text-slate-400">&bull; Stage {currentStageId} of 14</span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-white leading-tight">
                  {activeStage.title}
                </h2>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentStageId <= 1}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white transition-colors"
                title="Previous Stage"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-5 py-2.5 rounded-xl bg-[#FFB800] text-[#07145B] hover:bg-amber-400 font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-[#07145B]" />
                    <span>Pause Demo</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-[#07145B]" />
                    <span>Play Demo</span>
                  </>
                )}
              </button>

              <button
                onClick={handleNext}
                disabled={currentStageId >= 14}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white transition-colors"
                title="Next Stage"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={handleRestart}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors ml-1"
                title="Restart Demonstration"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 14-Stage Progress Track */}
          <div className="px-4 py-3 bg-slate-800/90 border-b border-slate-700 overflow-x-auto scrollbar-thin">
            <div className="flex items-center gap-1.5 min-w-[850px]">
              {STAGES.map((s) => {
                const isCurrent = s.id === currentStageId;
                const isPast = s.id < currentStageId;
                const isRelevant = audienceFilter === 'all' || s.relevantRoles.includes(audienceFilter as any);

                return (
                  <button
                    key={s.id}
                    onClick={() => handleJumpToStage(s.id)}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-left transition-all relative ${
                      isCurrent
                        ? 'bg-[#FFB800] text-[#07145B] font-extrabold shadow-sm scale-[1.02]'
                        : isPast
                        ? 'bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900/60 font-medium'
                        : isRelevant
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-slate-900/40 text-slate-600 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-1 text-[10px]">
                      {isPast ? (
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                      ) : (
                        <span className="opacity-70">#{s.id}</span>
                      )}
                      <span className="truncate">{s.shortTitle}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Interactive Stage Graphic Canvas */}
          <div className="p-6 sm:p-8 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
            {/* Visual Process Canvas */}
            <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm relative min-h-[260px] flex flex-col justify-between overflow-hidden">
              
              {/* Context Banner inside graphic */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#07145B]">Transaction ID: WT-DEMO-001</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-600">Product: 1kg Ragi Flour Pouch (2,000 kg lot)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] px-2 py-0.5 rounded bg-blue-50 text-[#07145B] font-semibold border border-blue-200">
                    Seller: ABC Foods
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-amber-50 text-amber-900 font-semibold border border-amber-200">
                    Buyer: Demo Buyer Distributors
                  </span>
                </div>
              </div>

              {/* Graphic Center Animation Area */}
              <div className="py-8 flex items-center justify-around relative">
                {/* Moving Consignment Indicator across stages */}
                <div
                  className="absolute top-1 pointer-events-none transition-all duration-700 motion-reduce:transition-none -translate-x-1/2 z-20"
                  style={{
                    left:
                      currentStageId <= 3 ? '13%' :
                      currentStageId <= 8 ? '38%' :
                      currentStageId <= 10 ? '63%' : '88%'
                  }}
                >
                  <div className="px-2.5 py-0.5 rounded-full bg-[#07145B] text-[#FFB800] border border-[#FFB800] text-[10px] font-extrabold flex items-center gap-1 shadow-md animate-bounce motion-reduce:animate-none">
                    <Package className="w-3 h-3" />
                    <span>Active Stage {currentStageId}</span>
                  </div>
                </div>

                {/* Visual Node 1: Seller */}
                <div className={`flex flex-col items-center transition-all duration-300 ${currentStageId <= 3 ? 'scale-110' : 'opacity-85'}`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-colors ${
                    currentStageId >= 1 ? 'bg-[#07145B] text-[#FFB800]' : 'bg-slate-200 text-slate-500'
                  }`}>
                    <Building2 className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 mt-2">ABC Foods</span>
                  <span className="text-[10px] text-slate-500">Hassan Mill</span>
                  {currentStageId >= 3 && (
                    <span className="mt-1 px-1.5 py-0.5 rounded text-[9px] bg-emerald-100 text-emerald-800 font-bold flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5" /> Verified
                    </span>
                  )}
                </div>

                {/* Animated Connecting Arrow 1 */}
                <div className="flex-1 max-w-[120px] px-2 flex flex-col items-center">
                  <div className={`h-1.5 w-full rounded-full transition-all duration-500 ${
                    currentStageId >= 4 ? 'bg-emerald-500' : 'bg-slate-200'
                  }`} />
                  <span className="text-[10px] text-slate-400 mt-1">Listing</span>
                </div>

                {/* Visual Node 2: WeTrade Trade Hub */}
                <div className={`flex flex-col items-center transition-all duration-300 ${currentStageId >= 4 && currentStageId <= 8 ? 'scale-110' : 'opacity-90'}`}>
                  <div className="w-20 h-20 rounded-3xl bg-[#07145B] text-white flex flex-col items-center justify-center shadow-xl ring-4 ring-[#FFB800]/40 relative">
                    <span className="text-[10px] font-black text-[#FFB800] uppercase tracking-tighter">WeTrade</span>
                    <Layers className="w-7 h-7 text-[#FFB800] my-0.5" />
                    <span className="text-[9px] text-slate-300 font-medium">Trade Desk</span>
                  </div>
                  <span className="text-xs font-bold text-[#07145B] mt-2">Commercial Core</span>
                  <span className="text-[10px] text-slate-500">Coordination</span>
                </div>

                {/* Animated Connecting Arrow 2 */}
                <div className="flex-1 max-w-[120px] px-2 flex flex-col items-center">
                  <div className={`h-1.5 w-full rounded-full transition-all duration-500 ${
                    currentStageId >= 7 ? 'bg-emerald-500' : 'bg-slate-200'
                  }`} />
                  <span className="text-[10px] text-slate-400 mt-1">Negotiation</span>
                </div>

                {/* Visual Node 3: Buyer */}
                <div className={`flex flex-col items-center transition-all duration-300 ${currentStageId >= 5 && currentStageId <= 8 ? 'scale-110' : 'opacity-85'}`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-colors ${
                    currentStageId >= 5 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    <Users2 className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 mt-2">Demo Buyer</span>
                  <span className="text-[10px] text-slate-500">Distributors</span>
                  {currentStageId >= 7 && (
                    <span className="mt-1 px-1.5 py-0.5 rounded text-[9px] bg-blue-100 text-blue-800 font-bold">
                      ₹55 Agreed
                    </span>
                  )}
                </div>

                {/* Animated Connecting Arrow 3 */}
                <div className="flex-1 max-w-[120px] px-2 flex flex-col items-center">
                  <div className={`h-1.5 w-full rounded-full transition-all duration-500 ${
                    currentStageId >= 10 ? 'bg-emerald-500' : 'bg-slate-200'
                  }`} />
                  <span className="text-[10px] text-slate-400 mt-1">
                    {logisticsRequired ? 'Logistics' : 'Self-Transport'}
                  </span>
                </div>

                {/* Visual Node 4: Transport / Delivery */}
                <div className={`flex flex-col items-center transition-all duration-300 ${currentStageId >= 10 ? 'scale-110' : 'opacity-80'}`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-colors ${
                    currentStageId >= 10 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {currentStageId >= 13 ? (
                      <Package className="w-8 h-8 text-[#FFB800]" />
                    ) : (
                      <Truck className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-800 mt-2">
                    {currentStageId >= 13
                      ? 'Delivered'
                      : logisticsRequired
                      ? 'FastTrack Logistics'
                      : 'Buyer Direct Fleet'}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {logisticsRequired ? 'Bhiwandi Hub' : 'Self-Arranged by Buyer'}
                  </span>
                </div>
              </div>

              {/* Dynamic Status Badges for Current Stage */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between text-xs gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">Stage Status:</span>
                  <span className="font-bold text-[#07145B] bg-white px-2.5 py-0.5 rounded border border-slate-200 shadow-2xs">
                    {activeStage.simStatus.order}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-slate-600 text-[11px]">
                  <span><strong>Seller:</strong> {activeStage.simStatus.seller}</span>
                  <span><strong>Buyer:</strong> {activeStage.simStatus.buyer}</span>
                  <span><strong>Logistics:</strong> {activeStage.simStatus.logistics}</span>
                </div>
              </div>
            </div>
          </div>

          {/* TWO-COLUMN DETAILS PANEL */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Columns: Detailed Breakdown */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-black text-[#07145B] flex items-center gap-2">
                  <span>{activeStage.title}</span>
                </h3>
                <p className="text-slate-700 text-sm mt-2 leading-relaxed">
                  {activeStage.whatHappens}
                </p>
              </div>

              {/* 4 Detail Grid Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Card 1: What WeTrade Does */}
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#07145B] uppercase tracking-wider mb-1.5">
                    <Sparkles className="w-4 h-4 text-[#FFB800]" />
                    <span>What WeTrade Does</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {activeStage.whatWeTradeDoes}
                  </p>
                </div>

                {/* Card 2: Who Is Involved */}
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider mb-1.5">
                    <Users2 className="w-4 h-4 text-amber-600" />
                    <span>Participants Involved</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {activeStage.whoIsInvolved}
                  </p>
                </div>

                {/* Card 3: Information & Documents */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>Documents &amp; Records</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-mono">
                    {activeStage.documents}
                  </p>
                </div>

                {/* Card 4: Expected Outcome */}
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Stage Outcome &amp; Next Step</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {activeStage.expectedOutcome} Next: <em>{activeStage.nextStep}</em>
                  </p>
                </div>

              </div>

              {/* Interactive Quotation Comparison Box at Stage 7 */}
              {currentStageId === 7 && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200 shadow-sm animate-in fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-amber-200">
                    <div className="font-bold text-[#07145B] text-sm flex items-center gap-2">
                      <BadgePercent className="w-4 h-4 text-[#FFB800]" />
                      <span>Live Quotation Harmonization (QT-2026-001)</span>
                    </div>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full">
                      Status: Mutually Accepted
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-center">
                    <div className="p-3 bg-white rounded-xl border border-amber-200">
                      <div className="text-[11px] text-slate-500">Seller Expected Price</div>
                      <div className="text-lg font-black text-slate-800 mt-0.5">₹58 / kg</div>
                      <div className="text-[10px] text-slate-400">Ex-Hassan Factory</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-amber-200">
                      <div className="text-[11px] text-slate-500">Buyer Target Price</div>
                      <div className="text-lg font-black text-slate-800 mt-0.5">₹52 / kg</div>
                      <div className="text-[10px] text-slate-400">Target for 2,000kg lot</div>
                    </div>
                    <div className="p-3 bg-[#07145B] text-white rounded-xl shadow-md">
                      <div className="text-[11px] text-amber-300 font-semibold">Agreed Trade Price</div>
                      <div className="text-lg font-black text-[#FFB800] mt-0.5">₹55 / kg</div>
                      <div className="text-[10px] text-slate-300">Facilitated Commercial Agreement</div>
                    </div>
                  </div>
                  <div className="mt-3 text-[11px] text-slate-500 text-center">
                    {logisticsRequired
                      ? 'WeTrade transparent facilitation fee: ₹2,200 | Estimated freight: ₹4,800. No hidden commissions.'
                      : 'WeTrade transparent facilitation fee: ₹2,200 | Buyer self-arranged freight: ₹0 third-party freight fee. No hidden commissions.'}
                  </div>
                </div>
              )}

              {/* Animated Route & Shipment at Stage 11-13 */}
              {currentStageId >= 11 && currentStageId <= 13 && (
                <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-sm animate-in fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#FFB800]" />
                      <span>Consignment Transit Milestone Feed (FTC-889021)</span>
                    </div>
                    <span className="text-[10px] text-amber-300 font-mono">
                      {APP_CONFIG.legalDisclaimers.noRealLiveGps}
                    </span>
                  </div>
                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="text-slate-400 font-mono">22-Mar 17:30</span>
                      <span className="text-slate-200 font-semibold">Hassan Mill:</span>
                      <span className="text-slate-300">Loaded 84 cartons into 19ft Container</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="text-slate-400 font-mono">23-Mar 11:15</span>
                      <span className="text-slate-200 font-semibold">Hubballi Toll:</span>
                      <span className="text-slate-300">Crossed NH-48 toll checkpoint on schedule</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                      <span className="text-slate-400 font-mono">24-Mar 08:45</span>
                      <span className="text-slate-200 font-semibold">Bhiwandi Hub:</span>
                      <span className="text-slate-300">Arrived at Western India regional distribution hub</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Transaction Monitor Card */}
            <div className="space-y-4">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Live Demo Monitor
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                    Synchronized
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <div className="text-slate-500 text-[11px]">Trade Scenario ID</div>
                    <div className="font-bold text-[#07145B] text-sm">WT-DEMO-001</div>
                  </div>

                  <div>
                    <div className="text-slate-500 text-[11px]">Demo Seller</div>
                    <div className="font-semibold text-slate-800">ABC Foods — Demo Seller</div>
                    <div className="text-[10px] text-slate-500">Hassan, Karnataka (45 MT/mo capacity)</div>
                  </div>

                  <div>
                    <div className="text-slate-500 text-[11px]">Demo Buyer</div>
                    <div className="font-semibold text-slate-800">Demo Buyer Distributors</div>
                    <div className="text-[10px] text-slate-500">Bhiwandi Hub, Maharashtra</div>
                  </div>

                  <div>
                    <div className="text-slate-500 text-[11px]">Product &amp; Volume</div>
                    <div className="font-semibold text-slate-800">1kg Ragi Flour (2,000 kg total)</div>
                    <div className="text-[10px] text-slate-500">84 Master Cartons (24 packs/carton)</div>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <div className="text-slate-500 text-[11px]">Agreed Unit Rate</div>
                    <div className="text-base font-extrabold text-[#07145B]">₹55.00 / kg</div>
                    <div className="text-[10px] text-slate-500">Total Goods Value: ₹1,10,000</div>
                  </div>

                  <div>
                    <div className="text-slate-500 text-[11px]">Logistics Arrangement</div>
                    <div className="font-semibold text-slate-800">
                      {logisticsRequired
                        ? 'FastTrack Cargo (₹4,800 coordinated fee)'
                        : 'Arranged Directly by Buyer (₹0 Freight Fee)'}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200">
                    <div className="text-[11px] font-bold text-[#07145B] mb-0.5">Next Required Action:</div>
                    <div className="text-xs text-slate-700">{activeStage.nextStep}</div>
                  </div>
                </div>

                {/* Direct Action Link to ERP Portal */}
                <div className="pt-2">
                  <Link
                    to="/portal"
                    className="w-full py-2.5 px-3 rounded-xl bg-[#07145B] hover:bg-[#0d228b] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>Inspect Record in ERP Trade Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Reduced Motion / Step by Step Notice */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-500 leading-relaxed flex items-start gap-2.5">
                <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  You can jump to any stage using the top stage buttons or use the Previous/Next controls to review each trade action at your own pace.
                </span>
              </div>
            </div>

          </div>

          {/* FINAL SCREEN HERO BANNER (When Stage 14 is reached) */}
          {currentStageId === 14 && (
            <div className="p-8 bg-gradient-to-r from-[#07145B] via-[#0b1c7a] to-[#07145B] text-white border-t border-slate-800 animate-in fade-in">
              <div className="max-w-4xl mx-auto text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB800] text-[#07145B] text-xs font-black uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Demonstration Complete</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  “One Connected Process. From Seller Enquiry to Final Delivery.”
                </h3>
                <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
                  WeTrade coordinates the people, product information, commercial discussions, order milestones, and logistics arrangements needed to help businesses move a trade opportunity towards completion.
                </p>

                {/* 3 Working Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    to="/for-sellers"
                    className="px-5 py-3 rounded-xl bg-[#FFB800] text-[#07145B] font-extrabold text-sm hover:bg-amber-400 transition-colors shadow-lg"
                  >
                    Sell Your Product Through WeTrade
                  </Link>
                  <Link
                    to="/for-buyers"
                    className="px-5 py-3 rounded-xl bg-white text-[#07145B] font-extrabold text-sm hover:bg-slate-100 transition-colors shadow-lg"
                  >
                    Discuss a Buyer Requirement
                  </Link>
                  <Link
                    to="/logistics"
                    className="px-5 py-3 rounded-xl bg-slate-800 text-white font-extrabold text-sm hover:bg-slate-700 border border-slate-700 transition-colors"
                  >
                    Explore Logistics Collaboration
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* 4-PARTICIPANT SWIMLANE DIAGRAM */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-900">
                Operational Architecture
              </div>
              <h3 className="text-xl font-extrabold text-[#07145B]">
                Four-Participant Trade Responsibility Swimlane
              </h3>
            </div>
            <div className="text-xs text-slate-500 max-w-md">
              Handoffs &amp; clear accountability across each milestone of the transaction.
            </div>
          </div>

          {/* Swimlane Rows */}
          <div className="space-y-4">
            
            {/* Lane 1: Seller / Manufacturer */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-[#FFB800] text-[#07145B]">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">1. Seller / Manufacturer Responsibility</h4>
                  <span className="text-[11px] text-slate-500">Product Origin &amp; Manufacturing Principal</span>
                </div>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed pl-11">
                Shares product details, confirms availability and capacity, discusses pricing, approves commercial terms, prepares the product where responsible, and coordinates the required dispatch information and batch test certificates.
              </p>
            </div>

            {/* Lane 2: WeTrade Intermediary */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-[#07145B] text-[#FFB800]">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#07145B] text-sm">2. WeTrade Trade Facilitation Platform</h4>
                  <span className="text-[11px] text-slate-500">Commercial Coordinator &amp; Intermediary Partner</span>
                </div>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed pl-11">
                Understands the seller's needs, reviews product information, identifies suitable buyers, coordinates enquiries, facilitates quotations and negotiations, records agreed terms, supports order tracking, arranges logistics quotations or introductions when required, and follows up on delivery and issues.
              </p>
            </div>

            {/* Lane 3: Buyer */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-blue-600 text-white">
                  <Users2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">3. Buyer / Distributor Responsibility</h4>
                  <span className="text-[11px] text-slate-500">Procurement &amp; Inbound Acceptance Principal</span>
                </div>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed pl-11">
                Shares requirements, reviews offers, discusses pricing, confirms commercial terms, completes agreed payment obligations, receives and checks goods, and confirms delivery or reports issues.
              </p>
            </div>

            {/* Lane 4: Logistics Partner */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-emerald-600 text-white">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">4. Logistics Partner Responsibility (Optional Service)</h4>
                  <span className="text-[11px] text-slate-500">Contracted Carrier &amp; Freight Operator</span>
                </div>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed pl-11">
                Provides transport quotations, confirms vehicle availability, coordinates pickup, updates shipment milestones, supports delivery, and supplies delivery confirmation where available.
              </p>
            </div>

          </div>

          {/* Legal Boundary Notice */}
          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <strong>Important Legal Boundary:</strong> Responsibilities depend on the commercial agreement executed between the seller and buyer. Not every transaction requires logistics support, and WeTrade is not automatically the transporter, seller, or product owner.
          </div>
        </div>

        {/* GUIDED CASE STUDY TABS (WT-DEMO-001) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#FFB800] bg-[#07145B] inline-block px-2.5 py-0.5 rounded-md mb-1">
                Case Study WT-DEMO-001
              </div>
              <h3 className="text-xl font-extrabold text-[#07145B]">
                Interactive Dossier: Organic Finger Millet Trade Journey
              </h3>
            </div>
            <span className="text-xs text-slate-500">
              Click tabs to inspect actual document structures &amp; data points
            </span>
          </div>

          {/* Clickable Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
            {[
              { id: 'seller', label: '1. Seller Profile' },
              { id: 'buyer', label: '2. Buyer Discovery' },
              { id: 'quotation', label: '3. Quotation & Terms' },
              { id: 'order', label: '4. Order Execution' },
              { id: 'logistics', label: '5. Logistics Routing' },
              { id: 'delivery', label: '6. Delivery & POD' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCaseStudyTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCaseStudyTab === tab.id
                    ? 'bg-[#07145B] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="pt-2">
            {activeCaseStudyTab === 'seller' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <h5 className="font-bold text-[#07145B] text-sm">Producer Profile</h5>
                    <p><strong>Producer:</strong> ABC Agro &amp; Millets Pvt Ltd (SEL-001)</p>
                    <p><strong>Facility:</strong> Hassan District Industrial Area, Karnataka</p>
                    <p><strong>Capacity:</strong> 45 MT / Month stone milling capacity</p>
                    <p><strong>Onboarding Status:</strong> Verified on 12-Nov-2025</p>
                    <p><strong>Core Product:</strong> Unpolished Finger Millet (Ragi) Flour 1kg pack</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <h5 className="font-bold text-[#07145B] text-sm">Verification Audit Points</h5>
                    <p><strong>FSSAI Registration:</strong> Verified Category 06 (Cereals &amp; Pulses)</p>
                    <p><strong>Lab Test Results:</strong> Moisture 8.9% (&lt;10% spec), Ash 1.8%</p>
                    <p><strong>Packaging:</strong> 1kg laminated nitrogen-flushed retail pouches</p>
                    <p><strong>Secondary Pack:</strong> 24 pouches per 5-ply corrugated shipper</p>
                  </div>
                </div>
              </div>
            )}

            {activeCaseStudyTab === 'buyer' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <h5 className="font-bold text-[#07145B] text-sm">Buyer Sourcing Requirement Analysis</h5>
                  <p><strong>Procuring Entity:</strong> Metro Food Distributors LLP (BUY-001)</p>
                  <p><strong>Channel:</strong> Supplies 450+ independent organic supermarkets in Mumbai/Pune</p>
                  <p><strong>Requirement:</strong> Regular monthly supply of 2,000 kg 1kg retail packs of farm-origin ragi flour</p>
                  <p><strong>Initial Buyer Target Price:</strong> ₹52 / kg delivered</p>
                  <p><strong>Compliance Standard:</strong> Batch test report and seal intactness mandatory</p>
                </div>
              </div>
            )}

            {activeCaseStudyTab === 'quotation' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-3">
                  <h5 className="font-bold text-[#07145B] text-sm">Commercial Term Sheet &amp; Agreed Values</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-2 bg-white rounded-lg border">
                      <span className="text-[10px] text-slate-500">Agreed Unit Rate</span>
                      <div className="font-bold text-slate-900 text-sm">₹55.00 / kg</div>
                    </div>
                    <div className="p-2 bg-white rounded-lg border">
                      <span className="text-[10px] text-slate-500">Total Lot (2,000 kg)</span>
                      <div className="font-bold text-slate-900 text-sm">₹1,10,000</div>
                    </div>
                    <div className="p-2 bg-white rounded-lg border">
                      <span className="text-[10px] text-slate-500">WeTrade Fee (2%)</span>
                      <div className="font-bold text-[#07145B] text-sm">₹2,200</div>
                    </div>
                    <div className="p-2 bg-white rounded-lg border">
                      <span className="text-[10px] text-slate-500">Logistics Freight</span>
                      <div className="font-bold text-emerald-700 text-sm">₹4,800</div>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    <strong>Payment Milestone:</strong> 50% advance deposited in commercial escrow prior to vehicle loading; 50% balance cleared on clean Proof of Delivery (POD) sign-off.
                  </p>
                </div>
              </div>
            )}

            {activeCaseStudyTab === 'order' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <h5 className="font-bold text-[#07145B] text-sm">Purchase Order WT-ORD-101 Execution</h5>
                  <p><strong>Order Confirmed Date:</strong> 15-Mar-2026</p>
                  <p><strong>Total Cartons:</strong> 84 Cartons (2,016 pouches net = 2,016 kg)</p>
                  <p><strong>Staging:</strong> Palletized and strapped with barcode shipping labels</p>
                  <p><strong>Quality Release:</strong> Pre-shipment batch inspection completed 20-Mar-2026</p>
                </div>
              </div>
            )}

            {activeCaseStudyTab === 'logistics' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <h5 className="font-bold text-[#07145B] text-sm">Logistics Transport Assignment</h5>
                  <p><strong>Contracted Transporter:</strong> FastTrack Cargo &amp; Freight Demo (LOG-001)</p>
                  <p><strong>Consignment Code:</strong> FTC-889021</p>
                  <p><strong>Origin:</strong> Hassan Mill Bay, Karnataka &rarr; <strong>Destination:</strong> Bhiwandi Warehouse, Maharashtra</p>
                  <p><strong>Vehicle:</strong> Dedicated 19ft Closed Container Chassis</p>
                  <p><strong>Transit Time:</strong> 3.5 days overland route (approx 980 km)</p>
                </div>
              </div>
            )}

            {activeCaseStudyTab === 'delivery' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <h5 className="font-bold text-[#07145B] text-sm">Destination Delivery &amp; Proof of Delivery (POD)</h5>
                  <p><strong>Delivery Acknowledged:</strong> 25-Mar-2026 at Bhiwandi Bay 4</p>
                  <p><strong>Inspection:</strong> 84 master cartons inspected; zero box crush or moisture ingress</p>
                  <p><strong>Sign-off:</strong> Signed Goods Received Note (GRN) uploaded to Trade Portal</p>
                  <p><strong>Settlement:</strong> Final balance payment authorized and escrow cleared</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
