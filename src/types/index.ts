export type PortalRole = 'admin' | 'seller' | 'buyer' | 'logistics';

export type ProductStatus = 'Available' | 'Low Stock' | 'Made to Order' | 'Sampling' | 'Out of Stock';

export interface Product {
  id: string;
  name: string;
  category: 'Food & Agro' | 'Textiles & Apparel' | 'Packaging & Paper' | 'Hardware & Tools' | 'Spices & Condiments' | 'Raw Materials';
  sellerId: string;
  sellerName: string;
  sellerCity: string;
  sellerState: string;
  description: string;
  specifications: Record<string, string>;
  indicativePrice: number; // in INR
  unit: string;
  moq: number; // Minimum Order Quantity
  availableQuantity: number;
  status: ProductStatus;
  badge?: string;
  imagePrompt?: string;
  imageUrl?: string;
  lastUpdated: string;
  packagingDetails: string;
  shelfLifeOrGrade?: string;
}

export type SellerVerificationStatus = 'Verified' | 'Pending Review' | 'In Onboarding' | 'Information Requested';

export interface Seller {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  primaryCategory: string;
  productionCapacity: string;
  verificationStatus: SellerVerificationStatus;
  onboardingDate: string;
  activeProductsCount: number;
  totalOrdersFulfilled: number;
  notes: string;
  expectedPricingModel: string;
}

export type BuyerLeadStatus = 'Hot Lead' | 'Qualified' | 'Proposal Sent' | 'Negotiating' | 'Active Customer';

export interface BuyerLead {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  businessType: 'Wholesaler' | 'Distributor' | 'Retail Chain' | 'Manufacturer' | 'Institutional Buyer';
  productInterests: string[];
  targetPriceBudget: string;
  typicalOrderQuantity: string;
  qualificationStatus: BuyerLeadStatus;
  lastFollowUp: string;
  nextFollowUp: string;
  notes: string;
}

export type QuotationStatus = 'Draft' | 'Sent to Seller' | 'Under Negotiation' | 'Revised' | 'Accepted' | 'Declined';

export interface Quotation {
  id: string;
  rfqNumber: string;
  sellerId: string;
  sellerName: string;
  buyerId: string;
  buyerName: string;
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  sellerExpectedPrice: number; // INR
  buyerTargetPrice: number; // INR
  agreedProductPrice: number; // INR
  weTradeFacilitationFee: number; // INR transparent fee
  estimatedLogisticsFee: number; // INR
  applicableTaxes: number; // INR
  totalEstimatedValue: number; // INR
  status: QuotationStatus;
  createdDate: string;
  validUntil: string;
  revisionsCount: number;
  commercialTerms: string;
}

export type OrderMilestone = 
  | 'Order Confirmed'
  | 'Preparation'
  | 'Quality Check'
  | 'Ready for Dispatch'
  | 'Picked Up'
  | 'In Transit'
  | 'Out for Delivery'
  | 'Delivered';

export interface OrderActivity {
  id: string;
  timestamp: string;
  milestone: OrderMilestone | string;
  note: string;
  updatedBy: string;
  isDelayed?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  sellerId: string;
  sellerName: string;
  buyerId: string;
  buyerName: string;
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  totalAmount: number;
  commercialTerms: string;
  paymentStatus: 'Payment Under Escrow' | 'Milestone 50% Paid' | 'Advance Paid' | 'Completed' | 'Pending Invoice';
  currentMilestone: OrderMilestone;
  isDelayed: boolean;
  delayReason?: string;
  expectedDeliveryDate: string;
  confirmedDate: string;
  logisticsRequired: boolean;
  logisticsPartnerId?: string;
  logisticsPartnerName?: string;
  trackingNumber?: string;
  activities: OrderActivity[];
}

export interface LogisticsPartner {
  id: string;
  name: string;
  modes: string[];
  coverageZones: string[];
  rating: number;
  activeShipmentsCount: number;
  contactPerson: string;
  phone: string;
  fleetSizeEstimate: string;
  isDemoPartner: true;
}

export interface Shipment {
  id: string;
  shipmentCode: string;
  orderId: string;
  orderNumber: string;
  partnerId: string;
  partnerName: string;
  origin: string;
  destination: string;
  pickupDate: string;
  estimatedDeliveryDate: string;
  actualDeliveryDate?: string;
  weightVolume: string;
  currentLocationName: string;
  status: 'Booked' | 'Dispatched' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Exception';
  estimatedCost: number;
  vehicleType: string;
}

export interface DocumentRef {
  id: string;
  title: string;
  type: 'Quotation' | 'Purchase Order' | 'Specification Sheet' | 'E-Way Bill' | 'Invoice' | 'Quality Certificate';
  relatedEntity: string;
  entityId: string;
  dateGenerated: string;
  format: 'PDF' | 'DOCX' | 'XLSX';
  isDemoOnly: true;
}

export interface TaskItem {
  id: string;
  title: string;
  category: 'Seller Verification' | 'Buyer Follow-up' | 'Quotation Revision' | 'Dispatch Coordination' | 'Delivery Check';
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  assignedRole: string;
  relatedId: string;
  completed: boolean;
}

export interface TradeToast {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: number;
}
