import React from 'react';
import { Link } from 'react-router-dom';
import { companyInfo } from '../data/company';

export const AboutPage: React.FC = () => {
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
          <span className="text-on-surface font-semibold">About Company</span>
        </nav>

        {/* Section Header */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md lg:p-space-lg shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md border border-outline-variant">
          <div className="flex flex-col gap-1">
            <div className="inline-flex items-center gap-1 text-[11px] font-caption-micro uppercase font-bold text-primary bg-primary-fixed px-2 py-0.5 rounded w-fit">
              <span className="material-symbols-outlined text-[13px]">corporate_fare</span>
              <span>Institutional Enterprise</span>
            </div>
            <h1 className="font-section-heading text-[24px] lg:text-[30px] font-bold text-on-surface">
              About {companyInfo.name}
            </h1>
            <p className="font-body-compact text-[13px] text-on-surface-variant max-w-xl">
              Specialized provider of certified security stationery, eMitra pre-printed blanks, PVC ID media, and high-volume printing consumables across Rajasthan.
            </p>
          </div>
          <Link
            to="/products"
            className="px-4 h-10 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-metadata-label text-[13px] font-bold flex items-center gap-1.5 transition-colors shadow-xs shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
            <span>Explore Catalog</span>
          </Link>
        </div>

        {/* Main Content Card */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 sm:p-8 shadow-xs flex flex-col gap-4">
          <h2 className="font-subheading text-[18px] sm:text-[20px] font-bold text-on-surface">
            B2B Stationery Supply Partner for Kiosks & Commercial Printers
          </h2>
          <p className="font-body-base text-[14px] text-on-surface-variant leading-relaxed">
            {companyInfo.name} is a leading institutional supplier based in Jaipur, Rajasthan, dedicated to serving citizen service kiosks (eMitra, CSC centers), commercial offset printing presses, and stationery retailers with high-quality consumables at direct wholesale pricing.
          </p>
          <p className="font-body-base text-[14px] text-on-surface-variant leading-relaxed">
            Our catalog is formulated specifically to eliminate paper jams, toner smudging, and document tampering. From watermarked bond certificate papers to premium CR80 PVC identity cards, 125-micron thermal lamination pouches, and bulk dye inks, each consignment is sealed in moisture-barrier packing.
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5 shadow-xs flex flex-col gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">layers</span>
            </div>
            <h3 className="font-product-title text-[15px] font-bold text-on-surface">
              Standardized Specifications
            </h3>
            <p className="font-body-compact text-[13px] text-on-surface-variant leading-relaxed">
              Strictly calibrated GSM weight, surface caliper, and micron thickness ensuring zero jam on laser and inkjet equipment.
            </p>
          </div>

          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5 shadow-xs flex flex-col gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">receipt_long</span>
            </div>
            <h3 className="font-product-title text-[15px] font-bold text-on-surface">
              100% GST Tax Credit Invoicing
            </h3>
            <p className="font-body-compact text-[13px] text-on-surface-variant leading-relaxed">
              Every dispatched lot is accompanied by a compliant tax invoice enabling full input tax credit (ITC) on commercial filings.
            </p>
          </div>

          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5 shadow-xs flex flex-col gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">local_shipping</span>
            </div>
            <h3 className="font-product-title text-[15px] font-bold text-on-surface">
              Direct Rajasthan Transport
            </h3>
            <p className="font-body-compact text-[13px] text-on-surface-variant leading-relaxed">
              Daily consignment dispatches connecting Jaipur central warehouse with all 33+ districts via roadways and express surface networks.
            </p>
          </div>
        </div>

        {/* Corporate Details */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-xs flex flex-col gap-4">
          <h3 className="font-subheading text-[16px] font-bold text-on-surface">
            Corporate Statutory Registration
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-[13px]">
            <div className="flex flex-col bg-surface-container-low p-3 rounded-lg border border-outline-variant/50">
              <span className="font-caption-micro text-[11px] uppercase font-bold text-outline">Corporate Entity</span>
              <span className="font-medium text-on-surface mt-0.5">{companyInfo.name}</span>
            </div>
            <div className="flex flex-col bg-surface-container-low p-3 rounded-lg border border-outline-variant/50">
              <span className="font-caption-micro text-[11px] uppercase font-bold text-outline">CIN</span>
              <span className="font-mono font-medium text-on-surface mt-0.5">U74999RJ2018PLC062144</span>
            </div>
            <div className="flex flex-col bg-surface-container-low p-3 rounded-lg border border-outline-variant/50">
              <span className="font-caption-micro text-[11px] uppercase font-bold text-outline">GSTIN</span>
              <span className="font-mono font-medium text-on-surface mt-0.5">08AAACT4921C1Z4</span>
            </div>
            <div className="flex flex-col bg-surface-container-low p-3 rounded-lg border border-outline-variant/50">
              <span className="font-caption-micro text-[11px] uppercase font-bold text-outline">Registered Office</span>
              <span className="font-medium text-on-surface mt-0.5">Tonk Road, Jaipur, Rajasthan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
