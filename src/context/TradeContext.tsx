import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Seller,
  Product,
  BuyerLead,
  Quotation,
  Order,
  LogisticsPartner,
  Shipment,
  DocumentRef,
  TaskItem,
  PortalRole,
  TradeToast,
  OrderMilestone,
  QuotationStatus
} from '../types';
import {
  INITIAL_SELLERS,
  INITIAL_PRODUCTS,
  INITIAL_BUYERS,
  INITIAL_QUOTATIONS,
  INITIAL_ORDERS,
  INITIAL_LOGISTICS_PARTNERS,
  INITIAL_SHIPMENTS,
  INITIAL_DOCUMENTS,
  INITIAL_TASKS
} from '../data/mockData';

interface TradeContextType {
  // State
  sellers: Seller[];
  products: Product[];
  buyers: BuyerLead[];
  quotations: Quotation[];
  orders: Order[];
  shipments: Shipment[];
  logisticsPartners: LogisticsPartner[];
  documents: DocumentRef[];
  tasks: TaskItem[];
  toasts: TradeToast[];
  currentRole: PortalRole;
  
  // Role & notification actions
  setCurrentRole: (role: PortalRole) => void;
  addToast: (title: string, message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  
  // Data actions
  advanceOrderMilestone: (orderId: string, note?: string) => void;
  markOrderDelayed: (orderId: string, reason: string) => void;
  updateQuotationStatus: (quotationId: string, newStatus: QuotationStatus) => void;
  createLogisticsRequest: (req: {
    orderId: string;
    partnerId: string;
    origin: string;
    destination: string;
    vehicleType: string;
    weightVolume: string;
    estimatedCost: number;
  }) => void;
  addSeller: (seller: Omit<Seller, 'id' | 'onboardingDate' | 'totalOrdersFulfilled' | 'activeProductsCount'>) => void;
  addProduct: (product: Omit<Product, 'id' | 'lastUpdated'>) => void;
  addBuyerLead: (buyer: Omit<BuyerLead, 'id' | 'lastFollowUp'>) => void;
  toggleTask: (taskId: string) => void;
  resetDemoData: () => void;
}

const ORDER_MILESTONES_ORDER: OrderMilestone[] = [
  'Order Confirmed',
  'Preparation',
  'Quality Check',
  'Ready for Dispatch',
  'Picked Up',
  'In Transit',
  'Out for Delivery',
  'Delivered'
];

const TradeContext = createContext<TradeContextType | undefined>(undefined);

const STORAGE_KEY = 'wetrade_demo_state_v1';

export const TradeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with localStorage if available
  const [currentRole, setCurrentRole] = useState<PortalRole>('admin');
  const [toasts, setToasts] = useState<TradeToast[]>([]);

  const [sellers, setSellers] = useState<Seller[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_sellers`);
      return saved ? JSON.parse(saved) : INITIAL_SELLERS;
    } catch {
      return INITIAL_SELLERS;
    }
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_products`);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [buyers, setBuyers] = useState<BuyerLead[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_buyers`);
      return saved ? JSON.parse(saved) : INITIAL_BUYERS;
    } catch {
      return INITIAL_BUYERS;
    }
  });

  const [quotations, setQuotations] = useState<Quotation[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_quotations`);
      return saved ? JSON.parse(saved) : INITIAL_QUOTATIONS;
    } catch {
      return INITIAL_QUOTATIONS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_orders`);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [shipments, setShipments] = useState<Shipment[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_shipments`);
      return saved ? JSON.parse(saved) : INITIAL_SHIPMENTS;
    } catch {
      return INITIAL_SHIPMENTS;
    }
  });

  const [logisticsPartners, setLogisticsPartners] = useState<LogisticsPartner[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_logistics`);
      return saved ? JSON.parse(saved) : INITIAL_LOGISTICS_PARTNERS;
    } catch {
      return INITIAL_LOGISTICS_PARTNERS;
    }
  });

  const [documents, setDocuments] = useState<DocumentRef[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_documents`);
      return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
    } catch {
      return INITIAL_DOCUMENTS;
    }
  });

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_tasks`);
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  // Persist to local storage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_sellers`, JSON.stringify(sellers));
      localStorage.setItem(`${STORAGE_KEY}_products`, JSON.stringify(products));
      localStorage.setItem(`${STORAGE_KEY}_buyers`, JSON.stringify(buyers));
      localStorage.setItem(`${STORAGE_KEY}_quotations`, JSON.stringify(quotations));
      localStorage.setItem(`${STORAGE_KEY}_orders`, JSON.stringify(orders));
      localStorage.setItem(`${STORAGE_KEY}_shipments`, JSON.stringify(shipments));
      localStorage.setItem(`${STORAGE_KEY}_logistics`, JSON.stringify(logisticsPartners));
      localStorage.setItem(`${STORAGE_KEY}_documents`, JSON.stringify(documents));
      localStorage.setItem(`${STORAGE_KEY}_tasks`, JSON.stringify(tasks));
    } catch {
      // storage unavailable or quota exceeded
    }
  }, [sellers, products, buyers, quotations, orders, shipments, logisticsPartners, documents, tasks]);

  const addToast = (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, title, message, type, timestamp: Date.now() }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const advanceOrderMilestone = (orderId: string, note?: string) => {
    setOrders((prev) => {
      return prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        const currentIdx = ORDER_MILESTONES_ORDER.indexOf(ord.currentMilestone);
        if (currentIdx >= ORDER_MILESTONES_ORDER.length - 1) {
          addToast('Order Already Complete', `Order ${ord.orderNumber} is already Delivered.`, 'info');
          return ord;
        }

        const nextMilestone = ORDER_MILESTONES_ORDER[currentIdx + 1];
        const updatedActivities = [
          ...ord.activities,
          {
            id: `ACT-${Date.now().toString().slice(-4)}`,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
            milestone: nextMilestone,
            note: note || `Stage advanced to ${nextMilestone} in Trade Portal.`,
            updatedBy: currentRole === 'admin' ? 'WeTrade Operations' : currentRole === 'seller' ? 'Seller Representative' : currentRole === 'logistics' ? 'Logistics Partner' : 'Buyer Representative'
          }
        ];

        // Also update corresponding shipment status if matched
        if (ord.logisticsRequired) {
          setShipments((prevShipments) => {
            return prevShipments.map((shp) => {
              if (shp.orderId !== orderId) return shp;
              let newShipStatus = shp.status;
              if (nextMilestone === 'Picked Up') newShipStatus = 'In Transit';
              if (nextMilestone === 'In Transit') newShipStatus = 'In Transit';
              if (nextMilestone === 'Out for Delivery') newShipStatus = 'Out for Delivery';
              if (nextMilestone === 'Delivered') newShipStatus = 'Delivered';
              return {
                ...shp,
                status: newShipStatus,
                actualDeliveryDate: nextMilestone === 'Delivered' ? new Date().toISOString().substring(0, 10) : shp.actualDeliveryDate
              };
            });
          });
        }

        addToast(
          'Order Milestone Updated',
          `${ord.orderNumber} successfully advanced to "${nextMilestone}".`,
          'success'
        );

        return {
          ...ord,
          currentMilestone: nextMilestone,
          isDelayed: false,
          paymentStatus: nextMilestone === 'Delivered' ? 'Completed' : ord.paymentStatus,
          activities: updatedActivities
        };
      });
    });
  };

  const markOrderDelayed = (orderId: string, reason: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        const updatedActivities = [
          ...ord.activities,
          {
            id: `ACT-DEL-${Date.now().toString().slice(-4)}`,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
            milestone: `${ord.currentMilestone} (Delayed)`,
            note: reason || 'Consignment milestone delayed in transit.',
            updatedBy: 'Logistics Facilitation Desk',
            isDelayed: true
          }
        ];
        addToast('Milestone Delay Noted', `Alert logged for ${ord.orderNumber}: ${reason}`, 'warning');
        return {
          ...ord,
          isDelayed: true,
          delayReason: reason,
          activities: updatedActivities
        };
      })
    );
  };

  const updateQuotationStatus = (quotationId: string, newStatus: QuotationStatus) => {
    setQuotations((prev) =>
      prev.map((q) => {
        if (q.id !== quotationId) return q;
        addToast('Quotation Status Updated', `Quotation ${q.rfqNumber} updated to ${newStatus}`, 'info');
        return {
          ...q,
          status: newStatus,
          revisionsCount: newStatus === 'Revised' ? q.revisionsCount + 1 : q.revisionsCount
        };
      })
    );
  };

  const createLogisticsRequest = (req: {
    orderId: string;
    partnerId: string;
    origin: string;
    destination: string;
    vehicleType: string;
    weightVolume: string;
    estimatedCost: number;
  }) => {
    const partner = logisticsPartners.find((p) => p.id === req.partnerId) || logisticsPartners[0];
    const order = orders.find((o) => o.id === req.orderId);
    const orderNumber = order ? order.orderNumber : `WT-ORD-${Math.floor(Math.random() * 900 + 100)}`;
    const newShipmentCode = `WT-SHP-${Math.floor(Math.random() * 89999 + 10000)}`;

    const newShipment: Shipment = {
      id: `SHP-${Date.now().toString().slice(-4)}`,
      shipmentCode: newShipmentCode,
      orderId: req.orderId,
      orderNumber,
      partnerId: partner.id,
      partnerName: partner.name,
      origin: req.origin,
      destination: req.destination,
      pickupDate: new Date().toISOString().substring(0, 10),
      estimatedDeliveryDate: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString().substring(0, 10),
      weightVolume: req.weightVolume,
      currentLocationName: `${req.origin} (Scheduled for Carrier Pickup)`,
      status: 'Booked',
      estimatedCost: req.estimatedCost,
      vehicleType: req.vehicleType
    };

    setShipments((prev) => [newShipment, ...prev]);

    // Also link to order
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== req.orderId) return ord;
        return {
          ...ord,
          logisticsRequired: true,
          logisticsPartnerId: partner.id,
          logisticsPartnerName: partner.name,
          trackingNumber: newShipmentCode,
          activities: [
            ...ord.activities,
            {
              id: `ACT-LOG-${Date.now().toString().slice(-4)}`,
              timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
              milestone: 'Logistics Booked',
              note: `Demo transport quotation accepted with ${partner.name}. Booking code ${newShipmentCode}.`,
              updatedBy: 'WeTrade Logistics Desk'
            }
          ]
        };
      })
    );

    addToast(
      'Logistics Request Created',
      `Demonstration shipment ${newShipmentCode} created with ${partner.name}.`,
      'success'
    );
  };

  const addSeller = (sellerData: Omit<Seller, 'id' | 'onboardingDate' | 'totalOrdersFulfilled' | 'activeProductsCount'>) => {
    const newId = `SEL-${(sellers.length + 1).toString().padStart(3, '0')}`;
    const newSeller: Seller = {
      ...sellerData,
      id: newId,
      onboardingDate: new Date().toISOString().substring(0, 10),
      activeProductsCount: 0,
      totalOrdersFulfilled: 0
    };
    setSellers((prev) => [newSeller, ...prev]);
    addToast('Demo Seller Added', `${newSeller.companyName} added to the Trade Portal directory.`, 'success');
  };

  const addProduct = (productData: Omit<Product, 'id' | 'lastUpdated'>) => {
    const newId = `WT-P${(products.length + 1).toString().padStart(2, '0')}`;
    const newProd: Product = {
      ...productData,
      id: newId,
      lastUpdated: new Date().toISOString().substring(0, 10)
    };
    setProducts((prev) => [newProd, ...prev]);
    addToast('Demo Product Listed', `${newProd.name} added to the catalogue.`, 'success');
  };

  const addBuyerLead = (buyerData: Omit<BuyerLead, 'id' | 'lastFollowUp'>) => {
    const newId = `BUY-${(buyers.length + 1).toString().padStart(3, '0')}`;
    const newBuyer: BuyerLead = {
      ...buyerData,
      id: newId,
      lastFollowUp: new Date().toISOString().substring(0, 10)
    };
    setBuyers((prev) => [newBuyer, ...prev]);
    addToast('Buyer Lead Registered', `${newBuyer.companyName} recorded in CRM pipeline.`, 'success');
  };

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const nextState = !t.completed;
        addToast(
          nextState ? 'Task Marked Done' : 'Task Reopened',
          `"${t.title.substring(0, 40)}..." updated.`,
          'info'
        );
        return { ...t, completed: nextState };
      })
    );
  };

  const resetDemoData = () => {
    try {
      localStorage.removeItem(`${STORAGE_KEY}_sellers`);
      localStorage.removeItem(`${STORAGE_KEY}_products`);
      localStorage.removeItem(`${STORAGE_KEY}_buyers`);
      localStorage.removeItem(`${STORAGE_KEY}_quotations`);
      localStorage.removeItem(`${STORAGE_KEY}_orders`);
      localStorage.removeItem(`${STORAGE_KEY}_shipments`);
      localStorage.removeItem(`${STORAGE_KEY}_logistics`);
      localStorage.removeItem(`${STORAGE_KEY}_documents`);
      localStorage.removeItem(`${STORAGE_KEY}_tasks`);
    } catch {
      // ignore
    }
    setSellers(INITIAL_SELLERS);
    setProducts(INITIAL_PRODUCTS);
    setBuyers(INITIAL_BUYERS);
    setQuotations(INITIAL_QUOTATIONS);
    setOrders(INITIAL_ORDERS);
    setShipments(INITIAL_SHIPMENTS);
    setLogisticsPartners(INITIAL_LOGISTICS_PARTNERS);
    setDocuments(INITIAL_DOCUMENTS);
    setTasks(INITIAL_TASKS);
    setCurrentRole('admin');
    addToast('Demo Data Reset', 'All demonstration records have been restored to initial factory values.', 'info');
  };

  return (
    <TradeContext.Provider
      value={{
        sellers,
        products,
        buyers,
        quotations,
        orders,
        shipments,
        logisticsPartners,
        documents,
        tasks,
        toasts,
        currentRole,
        setCurrentRole,
        addToast,
        removeToast,
        advanceOrderMilestone,
        markOrderDelayed,
        updateQuotationStatus,
        createLogisticsRequest,
        addSeller,
        addProduct,
        addBuyerLead,
        toggleTask,
        resetDemoData
      }}
    >
      {children}
    </TradeContext.Provider>
  );
};

export const useTrade = () => {
  const context = useContext(TradeContext);
  if (!context) {
    throw new Error('useTrade must be used within a TradeProvider');
  }
  return context;
};
