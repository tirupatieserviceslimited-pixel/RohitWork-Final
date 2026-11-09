import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { companyInfo } from '../data/company';

export const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    orderId: '',
    subject: 'Order Dispatch Status',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
          <span className="text-on-surface font-semibold">Contact & Support</span>
        </nav>

        {/* Header */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md lg:p-space-lg shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md border border-outline-variant">
          <div>
            <div className="inline-flex items-center gap-1 text-[11px] font-caption-micro uppercase font-bold text-primary bg-primary-fixed px-2 py-0.5 rounded w-fit mb-1">
              <span className="material-symbols-outlined text-[13px]">support_agent</span>
              <span>Commercial Helpdesk</span>
            </div>
            <h1 className="font-section-heading text-[24px] lg:text-[28px] font-bold text-on-surface">
              Customer Support & Inquiries
            </h1>
            <p className="font-body-compact text-[13px] text-on-surface-variant">
              Connect with our Jaipur operations desk regarding stock availability, bulk quotations, or order dispatches.
            </p>
          </div>
          <a
            href="https://wa.me/919785420850"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 h-10 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-metadata-label text-[13px] font-bold flex items-center gap-1.5 transition-colors shadow-xs shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">phone</span>
            <span>+91 97854 20850</span>
          </a>
        </div>

        {/* 2-Column Contact Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
          {/* Left Details */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-xs flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined text-[22px]">corporate_fare</span>
                </div>
                <div>
                  <h2 className="font-product-title text-[15px] font-bold text-on-surface">
                    {companyInfo.name}
                  </h2>
                  <span className="font-caption-micro text-[11px] text-on-surface-variant">
                    Jaipur Central Fulfillment Facility
                  </span>
                </div>
              </div>

              <p className="font-body-compact text-[13px] text-on-surface-variant leading-relaxed">
                Dedicated support desk for eMitra kiosk operators, CSC coordinators, and retail stationery distributors across Rajasthan.
              </p>

              <div className="flex flex-col gap-3 text-[13px] pt-2 border-t border-surface-container">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">location_on</span>
                  <div className="flex flex-col">
                    <strong className="text-on-surface">Warehouse & Central Office:</strong>
                    <span className="text-on-surface-variant">401-404, Corporate Tower, Tonk Road, Jaipur, Rajasthan - 302015</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">phone</span>
                  <div className="flex flex-col">
                    <strong className="text-on-surface">Phone / WhatsApp Line:</strong>
                    <a href="https://wa.me/919785420850" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors">
                      +91 97854 20850
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">mail</span>
                  <div className="flex flex-col">
                    <strong className="text-on-surface">Email Inquiries:</strong>
                    <a href="mailto:tirupatieserviceslimited@gmail.com" className="text-on-surface-variant hover:text-primary transition-colors">
                      tirupatieserviceslimited@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">schedule</span>
                  <div className="flex flex-col">
                    <strong className="text-on-surface">Operating Hours:</strong>
                    <span className="text-on-surface-variant">Monday – Saturday: 9:00 AM – 7:30 PM (Sunday Closed)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action */}
            <a
              href="https://wa.me/911412780444?text=Namaste%20Tirupati%20International%2C%20I%20need%20assistance%20with%20stationery%20supplies."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl p-4 shadow-xs flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[28px]">chat</span>
                <div>
                  <div className="font-metadata-label text-[13px] font-bold">Chat on WhatsApp</div>
                  <div className="font-caption-micro text-[11px] text-emerald-100">Quick response from dispatch executive</div>
                </div>
              </div>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </a>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 sm:p-8 shadow-xs">
              <h2 className="font-subheading text-[18px] font-bold text-on-surface mb-1">
                Send an Inquiry or Feedback
              </h2>
              <p className="font-body-compact text-[13px] text-on-surface-variant mb-6">
                Fill in your details and message. Our team will follow up via phone or WhatsApp.
              </p>

              {submitted ? (
                <div className="bg-emerald-50 rounded-xl p-8 text-center border border-emerald-200 flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-[40px]">check_circle</span>
                  <h3 className="font-product-title text-[16px] font-bold text-emerald-900">
                    Inquiry Received Successfully!
                  </h3>
                  <p className="font-body-compact text-[13px] text-emerald-800 max-w-sm">
                    Thank you, {formState.name}. An executive from our Jaipur commercial desk will reach out shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: '', phone: '', orderId: '', subject: 'Order Dispatch Status', message: '' });
                    }}
                    className="mt-4 px-4 h-9 bg-emerald-700 text-white rounded-lg text-[12px] font-semibold"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-metadata-label text-[13px] text-on-surface font-semibold">
                        Your Name <span className="text-error">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Mukesh Kumar"
                        className="h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant text-[14px] outline-none focus:border-primary"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-metadata-label text-[13px] text-on-surface font-semibold">
                        Mobile Number <span className="text-error">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value.replace(/\D/g, '') })}
                        placeholder="10-digit mobile number"
                        className="h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant text-[14px] outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-metadata-label text-[13px] text-on-surface font-semibold">
                        Order / Reference ID <span className="text-outline font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={formState.orderId}
                        onChange={(e) => setFormState({ ...formState, orderId: e.target.value.toUpperCase() })}
                        placeholder="e.g. TIP-26-XXXXX"
                        className="h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant text-[14px] font-mono outline-none focus:border-primary uppercase"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-metadata-label text-[13px] text-on-surface font-semibold">
                        Inquiry Topic <span className="text-error">*</span>
                      </label>
                      <select
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant text-[14px] outline-none focus:border-primary"
                      >
                        <option value="Order Dispatch Status">Order Dispatch Status</option>
                        <option value="Bulk Ream Pricing">Bulk Ream Pricing (B2B Matrix)</option>
                        <option value="eMitra Paper Availability">eMitra Paper Availability</option>
                        <option value="GST Invoice / ITC Query">GST Invoice / ITC Query</option>
                        <option value="Replacement Claim">Replacement / Transit Damage</option>
                        <option value="Other Assistance">Other General Assistance</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-metadata-label text-[13px] text-on-surface font-semibold">
                      Your Message <span className="text-error">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Please describe your requirement, kiosk district, or question in detail..."
                      className="p-3 rounded-lg bg-surface-container-low border border-outline-variant text-[14px] outline-none focus:border-primary resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="h-11 px-6 bg-primary hover:bg-primary-container text-on-primary rounded-lg font-metadata-label text-[13px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer mt-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
