import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { OrderLead } from '../types';
import { getAllOrderLeads } from '../services/firebase';

export const OrdersPage: React.FC = () => {
  const [leads, setLeads] = useState<OrderLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const found = await getAllOrderLeads();
        setLeads(found);
      } catch (e) {
        console.error('Error fetching leads:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className="w-full bg-surface-container-low min-h-screen py-4 lg:py-6">
      <div className="max-w-[1120px] mx-auto px-4 lg:px-6 flex flex-col gap-space-lg">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs font-caption-micro text-[12px] text-on-surface-variant">
          <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">home</span>
            <span>Home</span>
          </Link>
          <span className="text-outline-variant">/</span>
          <span className="text-on-surface font-semibold">My Orders</span>
        </nav>

        {/* Section Header */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md lg:p-space-lg shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md border border-outline-variant">
          <div>
            <div className="inline-flex items-center gap-1 text-[11px] font-caption-micro uppercase font-bold text-primary bg-primary-fixed px-2 py-0.5 rounded w-fit mb-1">
              <span className="material-symbols-outlined text-[13px]">package_2</span>
              <span>Requisition History</span>
            </div>
            <h1 className="font-section-heading text-[24px] lg:text-[28px] font-bold text-on-surface">
              My Stationery Orders & Requests
            </h1>
            <p className="font-body-compact text-[13px] text-on-surface-variant">
              Review previous kiosk orders, track consignment delivery, and request duplicate invoices.
            </p>
          </div>
          <Link
            to="/products"
            className="px-4 h-10 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-metadata-label text-[13px] font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            <span>New Order</span>
          </Link>
        </div>

        {/* Order Leads List */}
        {loading ? (
          <div className="p-12 text-center text-on-surface-variant font-caption-micro flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[20px] animate-spin text-primary">sync</span>
            <span>Loading your requisitions...</span>
          </div>
        ) : leads.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-xl p-12 text-center border border-outline-variant shadow-xs space-y-3 max-w-md mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center text-outline mx-auto">
              <span className="material-symbols-outlined text-[32px]">inventory_2</span>
            </div>
            <h2 className="font-product-title text-[18px] font-bold text-on-surface">
              No Orders or Requests Found
            </h2>
            <p className="font-body-compact text-[13px] text-on-surface-variant leading-relaxed">
              You haven't submitted any stationery supply requests yet. Browse our catalog of eMitra paper, PVC cards, lamination films, and office supplies.
            </p>
            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-container text-on-primary font-metadata-label text-[13px] font-bold py-2.5 px-6 rounded-lg transition-colors shadow-xs"
              >
                <span>Browse Products</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {leads.map((lead) => (
              <div
                key={lead.referenceId}
                className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5 shadow-xs flex flex-col gap-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-container pb-3">
                  <div>
                    <span className="font-product-title text-[15px] font-bold font-mono text-primary block">
                      Requisition #{lead.referenceId}
                    </span>
                    <span className="font-caption-micro text-[11px] text-on-surface-variant">
                      Submitted on {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-caption-micro text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded uppercase tracking-wider">
                      {lead.status}
                    </span>
                    <Link
                      to={`/order-confirmation/${lead.referenceId}`}
                      className="inline-flex items-center gap-1 text-[13px] font-bold text-primary hover:underline font-metadata-label"
                    >
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                      <span>View Details</span>
                    </Link>
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y divide-surface-container">
                  {lead.items.map((item, idx) => (
                    <div key={idx} className="py-2 flex items-center justify-between text-[13px] gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded bg-surface-container-low p-1 shrink-0 flex items-center justify-center border border-outline-variant/40">
                          {item.image ? (
                            <img src={item.image} alt={item.productName} className="w-full h-full object-contain mix-blend-multiply" />
                          ) : (
                            <span className="material-symbols-outlined text-[16px] text-outline">description</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <span className="font-medium text-on-surface truncate block font-product-title">
                            {item.productName}
                          </span>
                          <span className="font-caption-micro text-[11px] text-on-surface-variant">
                            Qty: {item.quantity} ({item.specification})
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-on-surface font-mono shrink-0">
                        ₹{item.totalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-surface-container font-caption-micro text-[12px] text-on-surface-variant">
                  <div>
                    Consignee: <strong className="text-on-surface">{lead.customer.fullName}</strong> ({lead.customer.shopName}, {lead.customer.district})
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-primary text-[14px] font-mono">
                      Total: ₹{lead.pricing.grandTotal.toLocaleString('en-IN')}
                    </span>
                    <Link
                      to={`/track-order?orderId=${lead.referenceId}`}
                      className="px-3 py-1 bg-surface-container hover:bg-surface-container-high rounded text-on-surface font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                      <span>Track</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
