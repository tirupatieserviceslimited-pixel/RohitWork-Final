// Self-contained, zero-network-dependency high-fidelity stationery images for Tirupati International

export const stationeryImages = {
  heroBanner: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 450" width="700" height="450">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f8fafc"/>
          <stop offset="100%" stop-color="#e2e8f0"/>
        </linearGradient>
        <linearGradient id="paperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#f1f5f9"/>
        </linearGradient>
        <linearGradient id="folderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef3c7"/>
          <stop offset="100%" stop-color="#fde68a"/>
        </linearGradient>
        <filter id="dropShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="3" dy="6" stdDeviation="6" flood-opacity="0.18"/>
        </filter>
        <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" flood-opacity="0.12"/>
        </filter>
      </defs>

      <!-- Clean desk surface -->
      <rect width="700" height="450" fill="url(#bgGrad)" />
      
      <!-- Back Office Folder / Dossier -->
      <g filter="url(#dropShadow)">
        <path d="M 450 90 L 620 90 Q 635 90 635 105 L 635 340 Q 635 350 620 350 L 450 350 Z" fill="url(#folderGrad)" stroke="#d97706" stroke-width="1.5" />
        <path d="M 450 110 L 510 110 L 525 130 L 635 130" fill="none" stroke="#b45309" stroke-width="1.5" stroke-dasharray="3 3"/>
        <rect x="475" y="160" width="130" height="15" rx="3" fill="#ffffff" opacity="0.8"/>
        <circle cx="590" cy="220" r="14" fill="#d97706" opacity="0.3"/>
      </g>

      <!-- Stacked A4 / eMitra Paper Reams on Left -->
      <!-- Ream 3 (bottom) -->
      <g filter="url(#dropShadow)">
        <polygon points="120,290 280,240 430,285 270,340" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1"/>
        <polygon points="120,290 270,340 270,365 120,315" fill="#cbd5e1"/>
        <polygon points="270,340 430,285 430,310 270,365" fill="#94a3b8"/>
      </g>
      <!-- Ream 2 (middle) -->
      <g filter="url(#dropShadow)">
        <polygon points="110,245 270,195 420,240 260,295" fill="url(#paperGrad)" stroke="#cbd5e1" stroke-width="1"/>
        <polygon points="110,245 260,295 260,320 110,270" fill="#f1f5f9"/>
        <polygon points="260,295 420,240 420,265 260,320" fill="#e2e8f0"/>
        <rect x="180" y="240" width="120" height="18" fill="#0e4b9c" opacity="0.9" rx="2" transform="rotate(-18 180 240)"/>
        <text x="185" y="253" fill="#ffffff" font-family="sans-serif" font-size="10" font-weight="bold" transform="rotate(-18 180 240)">eMitra Digital Paper</text>
      </g>
      <!-- Ream 1 (top) -->
      <g filter="url(#dropShadow)">
        <polygon points="100,200 260,150 410,195 250,250" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
        <polygon points="100,200 250,250 250,275 100,225" fill="#f8fafc"/>
        <polygon points="250,250 410,195 410,220 250,275" fill="#cbd5e1"/>
        <!-- Packaging Label -->
        <polygon points="170,180 280,145 350,168 240,203" fill="#eff6ff" stroke="#0e4b9c" stroke-width="1"/>
        <text x="210" y="172" fill="#0e4b9c" font-family="sans-serif" font-size="10" font-weight="bold" transform="rotate(-17 210 172)">eMitra 500 SHEETS</text>
        <rect x="205" y="180" width="60" height="4" fill="#16a34a" transform="rotate(-17 205 180)"/>
      </g>

      <!-- Ink Refill Bottles (Cyan, Magenta, Yellow, Black) -->
      <!-- Black bottle -->
      <g filter="url(#softShadow)">
        <rect x="400" y="270" width="30" height="55" rx="5" fill="#0f172a"/>
        <rect x="408" y="255" width="14" height="15" rx="2" fill="#334155"/>
        <rect x="412" y="248" width="6" height="7" rx="1" fill="#475569"/>
        <rect x="403" y="285" width="24" height="25" rx="2" fill="#ffffff"/>
        <text x="408" y="302" fill="#0f172a" font-family="sans-serif" font-size="12" font-weight="900">BK</text>
      </g>
      <!-- Cyan bottle -->
      <g filter="url(#softShadow)">
        <rect x="438" y="270" width="30" height="55" rx="5" fill="#0284c7"/>
        <rect x="446" y="255" width="14" height="15" rx="2" fill="#0369a1"/>
        <rect x="450" y="248" width="6" height="7" rx="1" fill="#075985"/>
        <rect x="441" y="285" width="24" height="25" rx="2" fill="#ffffff"/>
        <text x="448" y="302" fill="#0284c7" font-family="sans-serif" font-size="12" font-weight="900">C</text>
      </g>
      <!-- Magenta bottle -->
      <g filter="url(#softShadow)">
        <rect x="476" y="270" width="30" height="55" rx="5" fill="#db2777"/>
        <rect x="484" y="255" width="14" height="15" rx="2" fill="#be185d"/>
        <rect x="488" y="248" width="6" height="7" rx="1" fill="#9d174d"/>
        <rect x="479" y="285" width="24" height="25" rx="2" fill="#ffffff"/>
        <text x="485" y="302" fill="#db2777" font-family="sans-serif" font-size="12" font-weight="900">M</text>
      </g>
      <!-- Yellow bottle -->
      <g filter="url(#softShadow)">
        <rect x="514" y="270" width="30" height="55" rx="5" fill="#eab308"/>
        <rect x="522" y="255" width="14" height="15" rx="2" fill="#ca8a04"/>
        <rect x="526" y="248" width="6" height="7" rx="1" fill="#a16207"/>
        <rect x="517" y="285" width="24" height="25" rx="2" fill="#ffffff"/>
        <text x="524" y="302" fill="#ca8a04" font-family="sans-serif" font-size="12" font-weight="900">Y</text>
      </g>

      <!-- Laser Toner Cartridge in background -->
      <g filter="url(#softShadow)">
        <rect x="350" y="325" width="140" height="35" rx="6" fill="#1e293b"/>
        <circle cx="365" cy="342" r="7" fill="#475569"/>
        <rect x="380" y="332" width="95" height="20" rx="3" fill="#0f172a"/>
        <circle cx="485" cy="342" r="5" fill="#334155"/>
      </g>

      <!-- White Blank PVC Card in foreground -->
      <g filter="url(#softShadow)">
        <rect x="230" y="335" width="85" height="54" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" transform="rotate(8 230 335)"/>
        <!-- Smart chip -->
        <rect x="245" y="352" width="16" height="14" rx="2" fill="#f59e0b" stroke="#d97706" stroke-width="0.5" transform="rotate(8 230 335)"/>
      </g>
    </svg>
  `)}`,

  // Category 1: eMitra Paper
  catEmitraPaper: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" height="280">
      <defs>
        <linearGradient id="bgC1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f1f5f9"/>
          <stop offset="100%" stop-color="#e2e8f0"/>
        </linearGradient>
        <filter id="sh" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" flood-opacity="0.15"/>
        </filter>
      </defs>
      <rect width="400" height="280" fill="url(#bgC1)"/>
      <!-- Stack of eMitra Paper boxes -->
      <g filter="url(#sh)">
        <!-- Box 1 -->
        <polygon points="50,170 170,110 320,150 200,210" fill="#ffffff" stroke="#cbd5e1"/>
        <polygon points="50,170 200,210 200,245 50,205" fill="#f8fafc" stroke="#cbd5e1"/>
        <polygon points="200,210 320,150 320,185 200,245" fill="#e2e8f0" stroke="#cbd5e1"/>
        <!-- Green eMitra Seal -->
        <rect x="100" y="155" width="110" height="35" rx="3" fill="#15803d" transform="rotate(-26 100 155)"/>
        <text x="110" y="172" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold" transform="rotate(-26 100 155)">eMitra CERTIFICATE</text>
        <text x="115" y="184" fill="#bbf7d0" font-family="sans-serif" font-size="8" transform="rotate(-26 100 155)">OFFICIAL PAPER 500S</text>
      </g>
      <!-- Box 2 (stacked) -->
      <g filter="url(#sh)">
        <polygon points="120,130 230,80 360,115 250,165" fill="#ffffff" stroke="#cbd5e1"/>
        <polygon points="120,130 250,165 250,195 120,160" fill="#f8fafc" stroke="#cbd5e1"/>
        <polygon points="250,165 360,115 360,145 250,195" fill="#e2e8f0" stroke="#cbd5e1"/>
        <!-- Green banner -->
        <rect x="170" y="115" width="90" height="28" rx="2" fill="#15803d" transform="rotate(-25 170 115)"/>
        <text x="175" y="130" fill="#ffffff" font-family="sans-serif" font-size="9" font-weight="bold" transform="rotate(-25 170 115)">eMitra Digital Stock</text>
      </g>
    </svg>
  `)}`,

  // Category 2: Ration Card and Booklets
  catRationBooklets: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" height="280">
      <defs>
        <filter id="sh2" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" flood-opacity="0.15"/>
        </filter>
      </defs>
      <rect width="400" height="280" fill="#f8fafc"/>
      <!-- Counter Surface -->
      <rect y="180" width="400" height="100" fill="#e2e8f0"/>
      <!-- Stacked Ration Card Booklets -->
      <g filter="url(#sh2)">
        <polygon points="70,170 190,105 320,140 200,205" fill="#fef08a" stroke="#ca8a04"/>
        <polygon points="70,170 200,205 200,230 70,195" fill="#fde047" stroke="#ca8a04"/>
        <polygon points="200,205 320,140 320,165 200,230" fill="#eab308" stroke="#ca8a04"/>
        <text x="135" y="160" fill="#854d0e" font-family="sans-serif" font-size="12" font-weight="bold" transform="rotate(-28 135 160)">RATION BOOKLET</text>
        <line x1="85" y1="165" x2="190" y2="110" stroke="#ca8a04" stroke-width="2" stroke-dasharray="4 2"/>
      </g>
      <!-- Stack 2 on side -->
      <g filter="url(#sh2)">
        <polygon points="140,110 250,55 370,85 260,140" fill="#bae6fd" stroke="#0284c7"/>
        <polygon points="140,110 260,140 260,160 140,130" fill="#7dd3fc" stroke="#0284c7"/>
        <polygon points="260,140 370,85 370,105 260,160" fill="#38bdf8" stroke="#0284c7"/>
        <text x="195" y="105" fill="#0369a1" font-family="sans-serif" font-size="11" font-weight="bold" transform="rotate(-26 195 105)">APL / BPL BOOKLET</text>
      </g>
    </svg>
  `)}`,

  // Category 3: A4 & Office Paper
  catA4Paper: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" height="280">
      <defs>
        <filter id="sh3" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" flood-opacity="0.15"/>
        </filter>
      </defs>
      <rect width="400" height="280" fill="#f1f5f9"/>
      <!-- Warehouse pallet shelves -->
      <line x1="40" y1="60" x2="360" y2="60" stroke="#94a3b8" stroke-width="3"/>
      <line x1="40" y1="170" x2="360" y2="170" stroke="#94a3b8" stroke-width="3"/>
      <!-- Cartons of 75 / 80 GSM Paper -->
      <g filter="url(#sh3)">
        <rect x="70" y="80" width="85" height="85" rx="3" fill="#ffffff" stroke="#cbd5e1"/>
        <rect x="70" y="110" width="85" height="22" fill="#0e4b9c"/>
        <text x="78" y="125" fill="#ffffff" font-family="sans-serif" font-size="10" font-weight="bold">A4 75 GSM</text>
        <text x="82" y="150" fill="#64748b" font-family="sans-serif" font-size="8">500 SHEETS</text>
      </g>
      <g filter="url(#sh3)">
        <rect x="170" y="80" width="85" height="85" rx="3" fill="#ffffff" stroke="#cbd5e1"/>
        <rect x="170" y="110" width="85" height="22" fill="#15803d"/>
        <text x="178" y="125" fill="#ffffff" font-family="sans-serif" font-size="10" font-weight="bold">A4 80 GSM</text>
        <text x="182" y="150" fill="#64748b" font-family="sans-serif" font-size="8">500 SHEETS</text>
      </g>
      <g filter="url(#sh3)">
        <rect x="270" y="80" width="85" height="85" rx="3" fill="#ffffff" stroke="#cbd5e1"/>
        <rect x="270" y="110" width="85" height="22" fill="#c2410c"/>
        <text x="278" y="125" fill="#ffffff" font-family="sans-serif" font-size="10" font-weight="bold">A4 70 GSM</text>
        <text x="282" y="150" fill="#64748b" font-family="sans-serif" font-size="8">500 SHEETS</text>
      </g>
    </svg>
  `)}`,

  // Category 4: Photo Paper
  catPhotoPaper: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" height="280">
      <defs>
        <linearGradient id="photoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="50%" stop-color="#818cf8"/>
          <stop offset="100%" stop-color="#f43f5e"/>
        </linearGradient>
        <filter id="sh4" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" flood-opacity="0.15"/>
        </filter>
      </defs>
      <rect width="400" height="280" fill="#f8fafc"/>
      <!-- Photo Paper retail Box -->
      <g filter="url(#sh4)">
        <rect x="80" y="60" width="130" height="170" rx="4" fill="#0e4b9c" stroke="#1e3a8a"/>
        <rect x="90" y="75" width="110" height="85" rx="2" fill="url(#photoGrad)"/>
        <text x="95" y="180" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">GLOSSY PHOTO</text>
        <text x="95" y="196" fill="#93c5fd" font-family="sans-serif" font-size="9">4x6 & A4 | 180 GSM</text>
        <text x="95" y="212" fill="#ffffff" font-family="sans-serif" font-size="8">High Resolution 5760dpi</text>
      </g>
      <!-- Sample Photo Printout -->
      <g filter="url(#sh4)">
        <rect x="215" y="85" width="135" height="145" rx="3" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" transform="rotate(6 215 85)"/>
        <rect x="225" y="95" width="115" height="105" fill="url(#photoGrad)" transform="rotate(6 215 85)"/>
        <text x="240" y="222" fill="#64748b" font-family="sans-serif" font-size="8" transform="rotate(6 215 85)">Crisp Vivid Colors</text>
      </g>
    </svg>
  `)}`,

  // Category 5: PVC Cards
  catPvcCards: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" height="280">
      <defs>
        <filter id="sh5" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="4" stdDeviation="5" flood-opacity="0.14"/>
        </filter>
      </defs>
      <rect width="400" height="280" fill="#f1f5f9"/>
      <!-- Fanned White Blank PVC Cards -->
      <g filter="url(#sh5)">
        <rect x="80" y="95" width="160" height="100" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" transform="rotate(-15 80 95)"/>
        <rect x="100" y="125" width="30" height="25" rx="3" fill="#fbbf24" stroke="#d97706" transform="rotate(-15 80 95)"/>
        <line x1="100" y1="160" x2="190" y2="160" stroke="#e2e8f0" stroke-width="4" transform="rotate(-15 80 95)"/>
      </g>
      <g filter="url(#sh5)">
        <rect x="130" y="80" width="160" height="100" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" transform="rotate(5 130 80)"/>
        <rect x="150" y="110" width="30" height="25" rx="3" fill="#f59e0b" stroke="#d97706" transform="rotate(5 130 80)"/>
        <line x1="150" y1="145" x2="240" y2="145" stroke="#e2e8f0" stroke-width="4" transform="rotate(5 130 80)"/>
      </g>
      <g filter="url(#sh5)">
        <rect x="160" y="115" width="160" height="100" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" transform="rotate(22 160 115)"/>
        <rect x="175" y="145" width="30" height="25" rx="3" fill="#fbbf24" stroke="#d97706" transform="rotate(22 160 115)"/>
        <text x="220" y="160" fill="#0e4b9c" font-family="sans-serif" font-size="10" font-weight="bold" transform="rotate(22 160 115)">CR80 30MIL</text>
      </g>
    </svg>
  `)}`,

  // Category 6: Lamination Pouches
  catLaminationPouches: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" height="280">
      <defs>
        <filter id="sh6" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" flood-opacity="0.12"/>
        </filter>
      </defs>
      <rect width="400" height="280" fill="#f8fafc"/>
      <!-- Lamination Pouches Package & Clear Film -->
      <g filter="url(#sh6)">
        <rect x="70" y="55" width="150" height="180" rx="5" fill="#0284c7" stroke="#0369a1"/>
        <rect x="85" y="70" width="120" height="150" rx="3" fill="#ffffff"/>
        <text x="95" y="105" fill="#0284c7" font-family="sans-serif" font-size="12" font-weight="bold">LAMINATION</text>
        <text x="95" y="125" fill="#0f172a" font-family="sans-serif" font-size="16" font-weight="900">POUCHES</text>
        <rect x="95" y="135" width="100" height="20" rx="2" fill="#e0f2fe"/>
        <text x="100" y="150" fill="#0369a1" font-family="sans-serif" font-size="10" font-weight="bold">125 / 250 MICRON</text>
        <text x="95" y="180" fill="#64748b" font-family="sans-serif" font-size="9">A4 / ID / Legal Sizes</text>
      </g>
      <!-- Crystal clear glossy overlay pouch -->
      <g filter="url(#sh6)">
        <rect x="180" y="75" width="150" height="150" rx="5" fill="#ffffff" fill-opacity="0.65" stroke="#38bdf8" stroke-width="2" transform="rotate(10 180 75)"/>
        <line x1="180" y1="75" x2="330" y2="75" stroke="#0284c7" stroke-width="4" transform="rotate(10 180 75)"/>
        <text x="210" y="145" fill="#0369a1" font-family="sans-serif" font-size="12" font-weight="bold" transform="rotate(10 180 75)">Crystal Clear</text>
      </g>
    </svg>
  `)}`,

  // Category 7: Printer Ink & Toner
  catPrinterInkToner: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" height="280">
      <defs>
        <filter id="sh7" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" flood-opacity="0.14"/>
        </filter>
      </defs>
      <rect width="400" height="280" fill="#f1f5f9"/>
      <!-- Ink Bottles CMYK -->
      <g filter="url(#sh7)">
        <rect x="70" y="90" width="40" height="85" rx="6" fill="#0284c7"/>
        <rect x="80" y="70" width="20" height="20" rx="3" fill="#0369a1"/>
        <rect x="75" y="115" width="30" height="35" rx="2" fill="#ffffff"/>
        <text x="83" y="138" fill="#0284c7" font-family="sans-serif" font-size="16" font-weight="900">C</text>
      </g>
      <g filter="url(#sh7)">
        <rect x="125" y="90" width="40" height="85" rx="6" fill="#db2777"/>
        <rect x="135" y="70" width="20" height="20" rx="3" fill="#be185d"/>
        <rect x="130" y="115" width="30" height="35" rx="2" fill="#ffffff"/>
        <text x="137" y="138" fill="#db2777" font-family="sans-serif" font-size="16" font-weight="900">M</text>
      </g>
      <g filter="url(#sh7)">
        <rect x="180" y="90" width="40" height="85" rx="6" fill="#eab308"/>
        <rect x="190" y="70" width="20" height="20" rx="3" fill="#ca8a04"/>
        <rect x="185" y="115" width="30" height="35" rx="2" fill="#ffffff"/>
        <text x="193" y="138" fill="#ca8a04" font-family="sans-serif" font-size="16" font-weight="900">Y</text>
      </g>
      <g filter="url(#sh7)">
        <rect x="235" y="80" width="45" height="95" rx="6" fill="#0f172a"/>
        <rect x="247" y="60" width="21" height="20" rx="3" fill="#334155"/>
        <rect x="240" y="110" width="35" height="40" rx="2" fill="#ffffff"/>
        <text x="248" y="136" fill="#0f172a" font-family="sans-serif" font-size="18" font-weight="900">BK</text>
      </g>
      <!-- Toner Cartridge bottom -->
      <g filter="url(#sh7)">
        <rect x="80" y="195" width="240" height="42" rx="6" fill="#1e293b"/>
        <rect x="130" y="202" width="140" height="28" rx="3" fill="#0f172a"/>
        <circle cx="105" cy="216" r="8" fill="#475569"/>
        <circle cx="295" cy="216" r="8" fill="#475569"/>
        <text x="160" y="221" fill="#94a3b8" font-family="sans-serif" font-size="11" font-weight="bold">12A LASER TONER</text>
      </g>
    </svg>
  `)}`,

  // Category 8: Files and Office Stationery
  catOfficeStationery: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" height="280">
      <defs>
        <filter id="sh8" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" flood-opacity="0.14"/>
        </filter>
      </defs>
      <rect width="400" height="280" fill="#f8fafc"/>
      <!-- Desk with Lever Arch Box File and Cobra Folders -->
      <g filter="url(#sh8)">
        <!-- Box file upright -->
        <rect x="70" y="50" width="55" height="180" rx="4" fill="#1e3a8a" stroke="#172554"/>
        <rect x="80" y="70" width="35" height="50" rx="2" fill="#ffffff"/>
        <circle cx="97" cy="160" r="10" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
        <text x="85" y="95" fill="#1e3a8a" font-family="sans-serif" font-size="8" font-weight="bold">BOX FILE</text>
      </g>
      <!-- Box file 2 -->
      <g filter="url(#sh8)">
        <rect x="135" y="50" width="55" height="180" rx="4" fill="#991b1b" stroke="#7f1d1d"/>
        <rect x="145" y="70" width="35" height="50" rx="2" fill="#ffffff"/>
        <circle cx="162" cy="160" r="10" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
        <text x="150" y="95" fill="#991b1b" font-family="sans-serif" font-size="8" font-weight="bold">REGISTER</text>
      </g>
      <!-- Spring Cobra folder leaning -->
      <g filter="url(#sh8)">
        <rect x="210" y="65" width="45" height="165" rx="3" fill="#15803d" transform="rotate(8 210 65)"/>
        <rect x="217" y="85" width="30" height="40" fill="#ffffff" transform="rotate(8 210 65)"/>
        <text x="220" y="105" fill="#15803d" font-family="sans-serif" font-size="7" font-weight="bold" transform="rotate(8 210 65)">COBRA</text>
      </g>
      <!-- Pens & stapler on desk -->
      <g filter="url(#sh8)">
        <rect x="280" y="140" width="70" height="28" rx="4" fill="#334155"/>
        <line x1="260" y1="190" x2="360" y2="190" stroke="#0284c7" stroke-width="6" stroke-linecap="round"/>
        <line x1="265" y1="205" x2="365" y2="205" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/>
      </g>
    </svg>
  `)}`,

  // Product: Emitra Digital Stationary Paper (Ream pack)
  prodEmitraPaper: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 260" width="350" height="260">
      <defs>
        <filter id="pSh" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="5" stdDeviation="5" flood-opacity="0.14"/>
        </filter>
      </defs>
      <rect width="350" height="260" fill="#f8fafc"/>
      <!-- Isometric Paper Pack -->
      <g filter="url(#pSh)">
        <polygon points="60,150 175,90 290,130 175,190" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <polygon points="60,150 175,190 175,225 60,185" fill="#f1f5f9" stroke="#cbd5e1"/>
        <polygon points="175,190 290,130 290,165 175,225" fill="#e2e8f0" stroke="#cbd5e1"/>
        <!-- Green eMitra Certificate Border design -->
        <polygon points="85,145 175,98 265,130 175,177" fill="#ffffff" stroke="#16a34a" stroke-width="2"/>
        <polygon points="95,145 175,103 255,130 175,172" fill="#f0fdf4" stroke="#86efac" stroke-width="0.8"/>
        <rect x="120" y="130" width="110" height="22" rx="2" fill="#15803d" transform="rotate(-19 120 130)"/>
        <text x="124" y="145" fill="#ffffff" font-family="sans-serif" font-size="10" font-weight="bold" transform="rotate(-19 120 130)">eMitra Digital Paper</text>
        <circle cx="230" cy="140" r="10" fill="#ca8a04" opacity="0.8"/>
      </g>
    </svg>
  `)}`,

  // Product: Ration Card Booklet
  prodRationBooklet: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 260" width="350" height="260">
      <defs>
        <filter id="rSh" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="5" stdDeviation="5" flood-opacity="0.14"/>
        </filter>
      </defs>
      <rect width="350" height="260" fill="#f8fafc"/>
      <g filter="url(#rSh)">
        <polygon points="60,160 175,95 300,135 185,200" fill="#fed7aa" stroke="#c2410c" stroke-width="1.5"/>
        <polygon points="60,160 185,200 185,230 60,190" fill="#fdba74" stroke="#c2410c"/>
        <polygon points="185,200 300,135 300,165 185,230" fill="#ea580c" stroke="#c2410c"/>
        <!-- Stitching binding and emblem -->
        <line x1="75" y1="155" x2="180" y2="95" stroke="#9a3412" stroke-width="2.5" stroke-dasharray="4 3"/>
        <circle cx="180" cy="150" r="16" fill="#ffffff" stroke="#c2410c" stroke-width="1.5"/>
        <text x="130" y="175" fill="#7c2d12" font-family="sans-serif" font-size="10" font-weight="bold" transform="rotate(-20 130 175)">RATION BOOKLET</text>
      </g>
    </svg>
  `)}`,

  // Product: Photo Card Paper Envelope
  prodEnvelope: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 260" width="350" height="260">
      <defs>
        <filter id="eSh" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" flood-opacity="0.14"/>
        </filter>
      </defs>
      <rect width="350" height="260" fill="#f8fafc"/>
      <g filter="url(#eSh)">
        <rect x="70" y="65" width="210" height="135" rx="4" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
        <polygon points="70,65 175,140 280,65" fill="#fde68a" stroke="#d97706" stroke-width="1"/>
        <text x="110" y="170" fill="#92400e" font-family="sans-serif" font-size="11" font-weight="bold">PHOTO CARD ENVELOPE</text>
        <text x="125" y="185" fill="#b45309" font-family="sans-serif" font-size="9">Size: 4 x 3.5 in | 100 Pcs</text>
      </g>
    </svg>
  `)}`,

  // Product: Klik Photo Paper
  prodKlikPhotoPaper: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 260" width="350" height="260">
      <defs>
        <filter id="kSh" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="5" stdDeviation="5" flood-opacity="0.16"/>
        </filter>
      </defs>
      <rect width="350" height="260" fill="#f8fafc"/>
      <g filter="url(#kSh)">
        <rect x="110" y="45" width="130" height="175" rx="4" fill="#0284c7" stroke="#0369a1" stroke-width="1.5"/>
        <rect x="120" y="58" width="110" height="100" rx="2" fill="#ffffff"/>
        <!-- Photo graphic -->
        <circle cx="150" cy="95" r="16" fill="#f59e0b"/>
        <polygon points="130,145 170,105 210,145" fill="#0284c7"/>
        <text x="125" y="80" fill="#0e4b9c" font-family="sans-serif" font-size="14" font-weight="900">KLIK</text>
        <text x="125" y="175" fill="#ffffff" font-family="sans-serif" font-size="10" font-weight="bold">INKJET PHOTO</text>
        <text x="125" y="190" fill="#e0f2fe" font-family="sans-serif" font-size="9">4x6 INCH | 100S</text>
      </g>
    </svg>
  `)}`,

  // Product: Lamination Pouches (Pack)
  prodLaminationPouch: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 260" width="350" height="260">
      <defs>
        <filter id="lSh" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" flood-opacity="0.12"/>
        </filter>
      </defs>
      <rect width="350" height="260" fill="#f8fafc"/>
      <g filter="url(#lSh)">
        <polygon points="70,165 175,100 290,135 185,200" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
        <polygon points="70,165 185,200 185,225 70,190" fill="#f0f9ff" stroke="#0284c7"/>
        <polygon points="185,200 290,135 290,160 185,225" fill="#e0f2fe" stroke="#0284c7"/>
        <text x="120" y="160" fill="#0284c7" font-family="sans-serif" font-size="11" font-weight="900" transform="rotate(-20 120 160)">LAMINATION POUCH</text>
        <text x="135" y="175" fill="#0f172a" font-family="sans-serif" font-size="8" font-weight="bold" transform="rotate(-20 135 175)">125 MICRON | 100S</text>
      </g>
    </svg>
  `)}`,

  // Product: Yellow Certificate Paper
  prodYellowPaper: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 260" width="350" height="260">
      <defs>
        <filter id="ypSh" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="5" stdDeviation="5" flood-opacity="0.15"/>
        </filter>
      </defs>
      <rect width="350" height="260" fill="#f8fafc"/>
      <g filter="url(#ypSh)">
        <polygon points="60,150 175,90 290,130 175,190" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
        <polygon points="60,150 175,190 175,225 60,185" fill="#fde047" stroke="#ca8a04"/>
        <polygon points="175,190 290,130 290,165 175,225" fill="#eab308" stroke="#ca8a04"/>
        <polygon points="85,145 175,98 265,130 175,177" fill="#fef9c3" stroke="#eab308" stroke-width="2"/>
        <rect x="120" y="130" width="115" height="22" rx="2" fill="#ca8a04" transform="rotate(-19 120 130)"/>
        <text x="124" y="145" fill="#ffffff" font-family="sans-serif" font-size="9" font-weight="bold" transform="rotate(-19 120 130)">YELLOW CERTIFICATE</text>
        <circle cx="230" cy="140" r="10" fill="#854d0e" opacity="0.8"/>
      </g>
    </svg>
  `)}`,

  // Product: Citizen Service Register
  prodRegister: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 260" width="350" height="260">
      <defs>
        <filter id="regSh" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="5" stdDeviation="5" flood-opacity="0.16"/>
        </filter>
      </defs>
      <rect width="350" height="260" fill="#f8fafc"/>
      <g filter="url(#regSh)">
        <polygon points="60,160 175,95 300,135 185,200" fill="#991b1b" stroke="#7f1d1d" stroke-width="1.5"/>
        <polygon points="60,160 185,200 185,235 60,195" fill="#b91c1c" stroke="#7f1d1d"/>
        <polygon points="185,200 300,135 300,170 185,235" fill="#7f1d1d" stroke="#7f1d1d"/>
        <line x1="75" y1="155" x2="180" y2="95" stroke="#fef08a" stroke-width="2.5"/>
        <rect x="125" y="140" width="110" height="35" rx="3" fill="#ffffff" transform="rotate(-18 125 140)"/>
        <text x="135" y="155" fill="#991b1b" font-family="sans-serif" font-size="9" font-weight="bold" transform="rotate(-18 125 140)">eMitra Daily Register</text>
        <text x="140" y="167" fill="#64748b" font-family="sans-serif" font-size="7" transform="rotate(-18 125 140)">300 Pages Hardbound</text>
      </g>
    </svg>
  `)}`,

  // Product: Thermal POS Roll
  prodThermalRoll: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 260" width="350" height="260">
      <defs>
        <filter id="trSh" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="5" stdDeviation="5" flood-opacity="0.14"/>
        </filter>
      </defs>
      <rect width="350" height="260" fill="#f8fafc"/>
      <g filter="url(#trSh)">
        <ellipse cx="140" cy="110" rx="45" ry="25" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
        <ellipse cx="140" cy="110" rx="14" ry="8" fill="#334155"/>
        <path d="M 95 110 L 95 180 Q 95 205 140 205 Q 185 205 185 180 L 185 110" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5"/>
        <path d="M 185 170 L 255 150 L 255 200 L 185 210 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1"/>
        <line x1="200" y1="168" x2="245" y2="157" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="200" y1="178" x2="245" y2="167" stroke="#cbd5e1" stroke-width="2"/>
        <line x1="200" y1="188" x2="240" y2="178" stroke="#cbd5e1" stroke-width="2"/>
        <text x="105" y="160" fill="#0e4b9c" font-family="sans-serif" font-size="10" font-weight="bold">57mm POS</text>
      </g>
    </svg>
  `)}`,

  // Product: Biometric Fingerprint Device
  prodBiometric: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 260" width="350" height="260">
      <defs>
        <filter id="bioSh" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="3" dy="6" stdDeviation="5" flood-opacity="0.18"/>
        </filter>
      </defs>
      <rect width="350" height="260" fill="#f8fafc"/>
      <g filter="url(#bioSh)">
        <rect x="110" y="70" width="130" height="140" rx="16" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
        <circle cx="175" cy="130" r="38" fill="#0284c7" stroke="#38bdf8" stroke-width="3"/>
        <ellipse cx="175" cy="130" rx="24" ry="30" fill="none" stroke="#e0f2fe" stroke-width="2" stroke-dasharray="3 3"/>
        <ellipse cx="175" cy="130" rx="14" ry="18" fill="none" stroke="#e0f2fe" stroke-width="2"/>
        <circle cx="175" cy="130" r="5" fill="#38bdf8"/>
        <rect x="155" y="182" width="40" height="12" rx="3" fill="#334155"/>
        <text x="160" y="191" fill="#94a3b8" font-family="sans-serif" font-size="8" font-weight="bold">STQC</text>
        <path d="M 175 70 L 175 40 Q 175 30 190 30 L 230 30" fill="none" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
      </g>
    </svg>
  `)}`,

  // Product: HD Kiosk Webcam
  prodWebcam: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 260" width="350" height="260">
      <defs>
        <filter id="camSh" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="5" stdDeviation="5" flood-opacity="0.16"/>
        </filter>
      </defs>
      <rect width="350" height="260" fill="#f8fafc"/>
      <g filter="url(#camSh)">
        <!-- Webcam Head -->
        <rect x="100" y="75" width="150" height="55" rx="26" fill="#0f172a" stroke="#1e293b" stroke-width="2"/>
        <circle cx="175" cy="102" r="22" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
        <circle cx="175" cy="102" r="14" fill="#0284c7"/>
        <circle cx="170" cy="97" r="4" fill="#ffffff" opacity="0.8"/>
        <circle cx="130" cy="102" r="4" fill="#15803d"/>
        <circle cx="220" cy="102" r="3" fill="#475569"/>
        <!-- Stand Clip -->
        <rect x="168" y="130" width="14" height="25" fill="#334155"/>
        <path d="M 140 155 L 210 155 Q 215 170 195 190 L 145 190 Z" fill="#1e293b" stroke="#0f172a"/>
        <text x="145" y="180" fill="#94a3b8" font-family="sans-serif" font-size="8" font-weight="bold">1080P FULL HD</text>
      </g>
    </svg>
  `)}`,

  // Category: Kiosk Hardware & Devices
  catKioskHardware: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" height="280">
      <defs>
        <filter id="hwSh" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" flood-opacity="0.15"/>
        </filter>
      </defs>
      <rect width="400" height="280" fill="#f1f5f9"/>
      <g filter="url(#hwSh)">
        <!-- Biometric Scanner -->
        <rect x="70" y="80" width="90" height="110" rx="12" fill="#1e293b"/>
        <circle cx="115" cy="130" r="26" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
        <text x="95" y="172" fill="#94a3b8" font-family="sans-serif" font-size="8" font-weight="bold">BIOMETRIC</text>
      </g>
      <g filter="url(#hwSh)">
        <!-- Thermal Roll -->
        <ellipse cx="220" cy="115" rx="35" ry="18" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <path d="M 185 115 L 185 170 Q 185 190 220 190 Q 255 190 255 170 L 255 115" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="195" y="155" fill="#0e4b9c" font-family="sans-serif" font-size="9" font-weight="bold">POS ROLL</text>
      </g>
      <g filter="url(#hwSh)">
        <!-- Webcam -->
        <rect x="275" y="85" width="80" height="40" rx="18" fill="#0f172a"/>
        <circle cx="315" cy="105" r="14" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
        <rect x="310" y="125" width="10" height="20" fill="#475569"/>
        <rect x="290" y="145" width="50" height="15" rx="3" fill="#1e293b"/>
        <text x="297" y="156" fill="#ffffff" font-family="sans-serif" font-size="7">HD WEBCAM</text>
      </g>
    </svg>
  `)}`
};
