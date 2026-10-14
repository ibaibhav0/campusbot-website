/* ═════════════════════════════════════════════════════════════════════════════
   CAMPUSBOT — script.js
   Autonomous Campus Delivery Robots • Multi-Page Architecture Engine
   ═════════════════════════════════════════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. ACTIVE PAGE NAVBAR HIGHLIGHTING & MOBILE DRAWER ───────────────────────
  const header       = document.getElementById('header');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mainNav      = document.getElementById('mainNav');

  // Sticky header shadow effect
  window.addEventListener('scroll', () => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 15);
    }
  }, { passive: true });

  // Mobile menu toggle
  if (hamburgerBtn && mainNav) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
      const spans = hamburgerBtn.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  }

  // Highlight current nav item according to pathname
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentFile || (currentFile === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── 2. QUICK TRACK FROM HOME PAGE ──────────────────────────────────────────
  const quickTrackInput = document.getElementById('quickTrackInput');
  const btnQuickTrack   = document.getElementById('btnQuickTrack');

  function handleQuickTrack() {
    if (!quickTrackInput) return;
    const po = quickTrackInput.value.trim();
    if (po) {
      window.location.href = `track.html?po=${encodeURIComponent(po)}`;
    } else {
      window.location.href = 'track.html';
    }
  }

  if (btnQuickTrack) btnQuickTrack.addEventListener('click', handleQuickTrack);
  if (quickTrackInput) {
    quickTrackInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleQuickTrack();
      }
    });
  }

  // ── 3. INTERACTIVE ROBOT LIVERY COLORWAY SWITCHER ───────────────────────────
  const colorSwatches    = document.querySelectorAll('.color-swatch-btn');
  const colorwayLabel    = document.getElementById('colorwayLabel');
  const robotAccentGlow  = document.getElementById('robotAccentGlow');
  const mainRobotImg     = document.getElementById('mainRobotImg');
  const robotImageFrame  = document.getElementById('robotImageFrame') || document.querySelector('.robot-image-frame');
  const orderColorRadios = document.querySelectorAll('input[name="orderColor"]');

  const COLOR_DATA = {
    orange: {
      name: 'Arctic White & Cyber Orange',
      glow: 'rgba(249, 115, 22, 0.28)',
      radioVal: 'Campus Orange & White',
      filter: 'drop-shadow(0 14px 24px rgba(249, 115, 22, 0.25))',
      color: '#EA580C',
      frameBg: 'radial-gradient(circle at 50% 60%, #FFF7ED 0%, #FFFFFF 75%)'
    },
    blue: {
      name: 'Matte Slate & Tech Blue',
      glow: 'rgba(37, 99, 235, 0.32)',
      radioVal: 'Electric Blue & Slate',
      filter: 'drop-shadow(0 14px 24px rgba(37, 99, 235, 0.28)) hue-rotate(190deg) saturate(1.3) brightness(1.02)',
      color: '#2563EB',
      frameBg: 'radial-gradient(circle at 50% 60%, #EFF6FF 0%, #FFFFFF 75%)'
    },
    crimson: {
      name: 'Pearl White & University Crimson',
      glow: 'rgba(220, 38, 38, 0.30)',
      radioVal: 'University Crimson',
      filter: 'drop-shadow(0 14px 24px rgba(220, 38, 38, 0.28)) hue-rotate(325deg) saturate(1.4) brightness(0.98)',
      color: '#DC2626',
      frameBg: 'radial-gradient(circle at 50% 60%, #FEF2F2 0%, #FFFFFF 75%)'
    },
    emerald: {
      name: 'Silver Titanium & Emerald Green',
      glow: 'rgba(22, 163, 74, 0.30)',
      radioVal: 'Campus Emerald',
      filter: 'drop-shadow(0 14px 24px rgba(22, 163, 74, 0.28)) hue-rotate(110deg) saturate(1.35) brightness(1.02)',
      color: '#16A34A',
      frameBg: 'radial-gradient(circle at 50% 60%, #F0FDF4 0%, #FFFFFF 75%)'
    }
  };

  colorSwatches.forEach(btn => {
    btn.addEventListener('click', () => {
      const colorKey = btn.dataset.color;
      const data = COLOR_DATA[colorKey];
      if (!data) return;

      // 1. Swatch button states
      colorSwatches.forEach(b => {
        b.classList.remove('active');
        b.style.borderColor = 'transparent';
      });
      btn.classList.add('active');
      btn.style.borderColor = data.color;

      // 2. Robot Image Frame Classes & Background
      if (robotImageFrame) {
        robotImageFrame.classList.remove('colorway-orange', 'colorway-blue', 'colorway-crimson', 'colorway-emerald');
        robotImageFrame.classList.add(`colorway-${colorKey}`);
        robotImageFrame.style.background = data.frameBg;
      }

      // 3. Robot Image Filter with Smooth Bounce
      if (mainRobotImg) {
        mainRobotImg.style.filter = data.filter;
        mainRobotImg.style.transform = 'scale(0.97)';
        setTimeout(() => {
          mainRobotImg.style.transform = '';
        }, 180);
      }

      // 4. Glow & Label Text
      if (colorwayLabel) {
        colorwayLabel.textContent = data.name;
        colorwayLabel.style.color = data.color;
      }
      if (robotAccentGlow) {
        robotAccentGlow.style.background = data.glow;
        robotAccentGlow.style.transform = 'scale(1.15)';
        setTimeout(() => {
          robotAccentGlow.style.transform = 'scale(1)';
        }, 250);
      }

      // 5. Spec Pin Colors
      document.querySelectorAll('.pin-core').forEach(p => {
        p.style.background = data.color;
        p.style.boxShadow = `0 0 10px ${data.color}`;
      });
      document.querySelectorAll('.pin-ring').forEach(r => {
        r.style.background = data.glow;
      });

      // 6. Sync with radio buttons on procurement form
      orderColorRadios.forEach(radio => {
        if (radio.value === data.radioVal) radio.checked = true;
      });
    });
  });

  orderColorRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      const matchedKey = Object.keys(COLOR_DATA).find(
        k => COLOR_DATA[k].radioVal === radio.value
      );
      if (matchedKey) {
        const matchingBtn = document.querySelector(`.color-swatch-btn[data-color="${matchedKey}"]`);
        if (matchingBtn) matchingBtn.click();
      }
    });
  });

  // ── 4. FLEET & CHARGER PROCUREMENT CALCULATOR (BUY.HTML) ─────────────────────
  // Allows buying: Chargers Alone (Rovers=0, Chargers>=1) OR Rovers Alone OR Both Together
  const ROVER_UNIT_PRICE   = 24999;
  const CHARGER_UNIT_PRICE = 2000;

  const qtyInput       = document.getElementById('fleetQuantity');
  const qtyMinus       = document.getElementById('qtyMinus');
  const qtyPlus        = document.getElementById('qtyPlus');

  const chgInput       = document.getElementById('chargerQuantity');
  const chgMinus       = document.getElementById('chargerMinus');
  const chgPlus        = document.getElementById('chargerPlus');

  const summaryQty            = document.getElementById('summaryQty');
  const summaryRoversTotal    = document.getElementById('summaryRoversTotal');
  const summaryChargerQty     = document.getElementById('summaryChargerQty');
  const summaryChargersTotal  = document.getElementById('summaryChargersTotal');
  const totalOrderPrice       = document.getElementById('totalOrderPrice');
  const qrPayableAmount       = document.getElementById('qrPayableAmount');
  const qrStepAmount          = document.getElementById('qrStepAmount');
  const cardPayableAmt        = document.getElementById('cardPayableAmt');
  const dispUsdTotal          = document.getElementById('dispUsdTotal');
  const liveryPickerGroup     = document.getElementById('liveryPickerGroup');
  const lineRoverBreakdown    = document.getElementById('lineRoverBreakdown');
  const lineChargerBreakdown  = document.getElementById('lineChargerBreakdown');

  // Quick purchase mode buttons
  const btnModeBoth         = document.getElementById('btnModeBoth');
  const btnModeRoversOnly   = document.getElementById('btnModeRoversOnly');
  const btnModeChargersOnly = document.getElementById('btnModeChargersOnly');

  function formatINR(number) {
    return '₹' + number.toLocaleString('en-IN');
  }

  function updateProcurementTotal() {
    if (!qtyInput && !chgInput) return;

    let roverQty = qtyInput ? parseInt(qtyInput.value, 10) : 0;
    if (isNaN(roverQty) || roverQty < 0) roverQty = 0;
    if (roverQty > 25) roverQty = 25;
    if (qtyInput) qtyInput.value = roverQty;

    let chargerQty = chgInput ? parseInt(chgInput.value, 10) : 0;
    if (isNaN(chargerQty) || chargerQty < 0) chargerQty = 0;
    if (chargerQty > 25) chargerQty = 25;
    if (chgInput) chgInput.value = chargerQty;

    // Ensure at least 1 item is selected in total
    if (roverQty === 0 && chargerQty === 0) {
      chargerQty = 1;
      if (chgInput) chgInput.value = 1;
    }

    const roverCost   = roverQty * ROVER_UNIT_PRICE;
    const chargerCost = chargerQty * CHARGER_UNIT_PRICE;
    const grandTotal  = roverCost + chargerCost;
    const usdEstimate = Math.round(grandTotal / 83.33);

    if (summaryQty)           summaryQty.textContent           = String(roverQty);
    if (summaryRoversTotal)   summaryRoversTotal.textContent   = formatINR(roverCost);
    if (summaryChargerQty)    summaryChargerQty.textContent    = String(chargerQty);
    if (summaryChargersTotal) summaryChargersTotal.textContent = formatINR(chargerCost);
    if (totalOrderPrice)      totalOrderPrice.textContent      = formatINR(grandTotal);
    if (qrPayableAmount)      qrPayableAmount.textContent      = formatINR(grandTotal);
    if (qrStepAmount)         qrStepAmount.textContent         = formatINR(grandTotal);
    if (cardPayableAmt)       cardPayableAmt.textContent       = formatINR(grandTotal);
    if (dispUsdTotal)         dispUsdTotal.textContent         = `$${usdEstimate.toLocaleString()} USD`;

    // Toggle livery picker visibility if no rovers are ordered
    if (liveryPickerGroup) {
      liveryPickerGroup.style.display = roverQty > 0 ? 'block' : 'none';
    }
    if (lineRoverBreakdown) {
      lineRoverBreakdown.style.display = roverQty > 0 ? 'flex' : 'none';
    }
    if (lineChargerBreakdown) {
      lineChargerBreakdown.style.display = chargerQty > 0 ? 'flex' : 'none';
    }
  }

  // Stepper handlers
  if (qtyMinus && qtyInput) {
    qtyMinus.addEventListener('click', () => {
      let cur = parseInt(qtyInput.value, 10) || 0;
      let curChg = chgInput ? parseInt(chgInput.value, 10) || 0 : 0;
      if (cur > 0 && (cur - 1 > 0 || curChg > 0)) {
        qtyInput.value = cur - 1;
        updateProcurementTotal();
      }
    });
  }

  if (qtyPlus && qtyInput) {
    qtyPlus.addEventListener('click', () => {
      let cur = parseInt(qtyInput.value, 10) || 0;
      if (cur < 25) {
        qtyInput.value = cur + 1;
        updateProcurementTotal();
      }
    });
  }

  if (chgMinus && chgInput) {
    chgMinus.addEventListener('click', () => {
      let cur = parseInt(chgInput.value, 10) || 0;
      let curRov = qtyInput ? parseInt(qtyInput.value, 10) || 0 : 0;
      if (cur > 0 && (cur - 1 > 0 || curRov > 0)) {
        chgInput.value = cur - 1;
        updateProcurementTotal();
      }
    });
  }

  if (chgPlus && chgInput) {
    chgPlus.addEventListener('click', () => {
      let cur = parseInt(chgInput.value, 10) || 0;
      if (cur < 25) {
        chgInput.value = cur + 1;
        updateProcurementTotal();
      }
    });
  }

  // Mode preset buttons
  function setPurchaseModeStyle(activeBtn) {
    [btnModeBoth, btnModeRoversOnly, btnModeChargersOnly].forEach(b => {
      if (!b) return;
      b.style.background = '';
      b.style.borderColor = '';
      b.style.color = '';
      b.style.fontWeight = '';
    });
    if (activeBtn) {
      activeBtn.style.background = '#EFF6FF';
      activeBtn.style.borderColor = 'var(--primary)';
      activeBtn.style.color = 'var(--primary)';
      activeBtn.style.fontWeight = '800';
    }
  }

  if (btnModeBoth && qtyInput && chgInput) {
    btnModeBoth.addEventListener('click', () => {
      qtyInput.value = 1;
      chgInput.value = 1;
      setPurchaseModeStyle(btnModeBoth);
      updateProcurementTotal();
    });
  }

  if (btnModeRoversOnly && qtyInput && chgInput) {
    btnModeRoversOnly.addEventListener('click', () => {
      qtyInput.value = 1;
      chgInput.value = 0;
      setPurchaseModeStyle(btnModeRoversOnly);
      updateProcurementTotal();
    });
  }

  if (btnModeChargersOnly && qtyInput && chgInput) {
    btnModeChargersOnly.addEventListener('click', () => {
      qtyInput.value = 0;
      chgInput.value = 1;
      setPurchaseModeStyle(btnModeChargersOnly);
      updateProcurementTotal();
    });
  }

  // ── 5. PAYMENT METHODS TAB SWITCHING (BUY.HTML) ──────────────────────────────
  const payTabBtns  = document.querySelectorAll('.pay-tab-btn');
  const panelUpi    = document.getElementById('panelUpi');
  const panelCards  = document.getElementById('panelCards');
  const panelForeign= document.getElementById('panelForeign');

  payTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      payTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.dataset.tab;
      if (panelUpi)     panelUpi.classList.toggle('active', target === 'upi');
      if (panelCards)   panelCards.classList.toggle('active', target === 'cards');
      if (panelForeign) panelForeign.classList.toggle('active', target === 'foreign');
    });
  });

  // Card Payment Simulation
  const btnSimulateCardPay = document.getElementById('btnSimulateCardPay');
  if (btnSimulateCardPay) {
    btnSimulateCardPay.addEventListener('click', () => {
      const cardNum = document.getElementById('cardNumber')?.value.trim();
      if (!cardNum || cardNum.length < 12) {
        alert('Please enter a valid 16-digit card number.');
        return;
      }
      const randomAuth = 'CARD-AUTH-' + Math.floor(100000 + Math.random() * 900000);
      const utrEl = document.getElementById('utrNumber');
      if (utrEl) {
        utrEl.value = randomAuth;
        utrEl.classList.remove('error');
        alert(`Card payment authorized successfully! Authorization code ${randomAuth} has been attached to your order form.`);
      }
    });
  }

  // ── 6. PROCUREMENT FORM & PO GENERATION (BUY.HTML) ───────────────────────────
  const procurementForm = document.getElementById('procurementForm');
  const orderModal      = document.getElementById('orderModal');
  const modalCloseBtn   = document.getElementById('modalCloseBtn');
  const btnModalAck     = document.getElementById('btnModalAcknowledge');
  const btnTrackNewOrder= document.getElementById('btnTrackNewOrder');

  function validateProcureForm() {
    let isValid = true;
    const requiredIds = ['collegeName', 'officerName', 'procurePhone', 'procureEmail', 'shippingAddress', 'utrNumber'];

    requiredIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (!el.value.trim()) {
        el.classList.add('error');
        el.addEventListener('input', () => el.classList.remove('error'), { once: true });
        isValid = false;
      }
    });

    const roverQty   = parseInt(qtyInput?.value, 10) || 0;
    const chargerQty = parseInt(chgInput?.value, 10) || 0;
    if (roverQty === 0 && chargerQty === 0) {
      alert('Please select at least 1 CAMPUSBOT rover or 1 Fast-Charger Dock.');
      return false;
    }

    if (!isValid) {
      const firstError = procurementForm.querySelector('.error');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return isValid;
  }

  if (procurementForm) {
    procurementForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateProcureForm()) return;

      const collegeVal = document.getElementById('collegeName').value.trim();
      const phoneVal   = document.getElementById('procurePhone').value.trim();
      const utrVal     = document.getElementById('utrNumber').value.trim();
      const roverQty   = parseInt(qtyInput?.value, 10) || 0;
      const chargerQty = parseInt(chgInput?.value, 10) || 0;
      const grandTotal = formatINR((roverQty * ROVER_UNIT_PRICE) + (chargerQty * CHARGER_UNIT_PRICE));

      const activeColorRadio = document.querySelector('input[name="orderColor"]:checked');
      const liveryVal = roverQty > 0 ? (activeColorRadio ? activeColorRadio.value : 'Campus Orange & White') : 'Standard Dock Enclosure';

      const randomPO = 'CB-PO-2026-' + Math.floor(1000 + Math.random() * 9000);

      const mPo      = document.getElementById('modalPoRef');
      const mCollege = document.getElementById('modalCollegeName');
      const mUnits   = document.getElementById('modalUnits');
      const mLivery  = document.getElementById('modalLivery');
      const mUtr     = document.getElementById('modalUtr');
      const mPhone   = document.getElementById('modalContactPhone');

      let orderSummaryText = '';
      if (roverQty > 0 && chargerQty > 0) {
        orderSummaryText = `${roverQty} Rover(s) + ${chargerQty} Fast-Charger(s) (${grandTotal})`;
      } else if (roverQty > 0) {
        orderSummaryText = `${roverQty} Rover(s) (${grandTotal})`;
      } else {
        orderSummaryText = `${chargerQty} Fast-Charger Dock(s) Alone (${grandTotal})`;
      }

      if (mPo)      mPo.textContent      = randomPO;
      if (mCollege) mCollege.textContent = collegeVal;
      if (mUnits)   mUnits.textContent   = orderSummaryText;
      if (mLivery)  mLivery.textContent  = liveryVal;
      if (mUtr)     mUtr.textContent     = utrVal;
      if (mPhone)   mPhone.textContent   = phoneVal || '+91 7411054974';

      if (btnTrackNewOrder) {
        btnTrackNewOrder.setAttribute('href', `track.html?po=${encodeURIComponent(randomPO)}`);
      }

      if (orderModal) {
        orderModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  function closeOrderModal() {
    if (orderModal) {
      orderModal.classList.remove('active');
      document.body.style.overflow = '';
      if (procurementForm) {
        procurementForm.reset();
        if (qtyInput) qtyInput.value = 1;
        if (chgInput) chgInput.value = 1;
        updateProcurementTotal();
      }
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeOrderModal);
  if (btnModalAck)   btnModalAck.addEventListener('click', closeOrderModal);
  if (orderModal) {
    orderModal.addEventListener('click', (e) => {
      if (e.target === orderModal) closeOrderModal();
    });
  }

  // ── 7. ORDER TRACKING SYSTEM (TRACK.HTML) ──────────────────────────────────
  const trackSearchForm = document.getElementById('trackSearchForm');
  const trackInput      = document.getElementById('trackInput');
  const trackSampleBtns = document.querySelectorAll('.sample-btn');

  const REAL_ORDERS = {
    'PARCEL-NMIT-8492': {
      po: 'PARCEL-NMIT-8492',
      institution: 'Nitte Meenakshi Institute of Technology (NMIT, Yelahanka)',
      status: 'IN AUTONOMOUS TRANSIT (SPEED 1.2 M/S)',
      badgeClass: 'status-in-transit',
      etaDuration: '3 Minutes (Arriving Soon)',
      etaDate: 'October 15, 2026 (01:35 PM)',
      location: 'Central Lawn Pathway (Approaching ArUco Marker #04)',
      fillWidth: '75%',
      steps: [true, true, true, 'current', false],
      stepDates: ['01:05 PM • Gate 1 Handover', '01:10 PM • Solenoid Locked', '01:15 PM • OpenCV 15 FPS Active', '01:25 PM • Approaching Marker #04', 'Pending • Student Pickup OTP: 4921'],
      carrier: 'Amazon Logistics (Handed to CampusBot at Main Gate 1)',
      awb: 'AMZ-BLR-8849-IN',
      dest: 'Hostel Block A — Station 1 (Room 304 Consignment)',
      units: 'CAMPUSBOT Rover Unit #01',
      chargers: 'Battery: 84% (Estimated trip drain: 4.2%)',
      livery: 'Campus Orange & White (Active Guidance)'
    },
    'PARCEL-RUAS-1024': {
      po: 'PARCEL-RUAS-1024',
      institution: 'M. S. Ramaiah University of Applied Sciences (RUAS Peenya Campus)',
      status: 'ARRIVED AT HOSTEL HUB • AWAITING STUDENT OTP',
      badgeClass: 'status-delivered',
      etaDuration: '0 Minutes (Arrived)',
      etaDate: 'Arrived on October 15, 2026 (01:28 PM)',
      location: 'Boys Hostel Block B Pickup Hub (Station 2)',
      fillWidth: '100%',
      steps: [true, true, true, true, true],
      stepDates: ['01:00 PM • Gate Checkpoint', '01:04 PM • Vault Latch Engaged', '01:12 PM • Line Followed', '01:25 PM • ArUco Stop Bar Verified', 'Ready • Enter SMS OTP 7102'],
      carrier: 'Ekart Logistics (Gate Drop)',
      awb: 'FMP-9102-41-IN',
      dest: 'Hostel Block B Entrance Station',
      units: 'CAMPUSBOT Rover Unit #02',
      chargers: 'Battery: 78% (Ready for next run)',
      livery: 'Electric Blue & Slate'
    },
    'CB-PO-NMIT-01': {
      po: 'CB-PO-NMIT-01',
      institution: 'Nitte Meenakshi Institute of Technology (NMIT Bengaluru)',
      status: 'DEPLOYED & OPERATIONAL ON CAMPUS',
      badgeClass: 'status-delivered',
      etaDuration: 'In Service (Pilot Batch 1)',
      etaDate: 'Commissioned October 14, 2026',
      location: 'NMIT Yelahanka Gate-to-Hostel Pathway Network',
      fillWidth: '100%',
      steps: [true, true, true, true, true],
      stepDates: ['10 Oct • Purchase Approved', '12 Oct • Chassis Built', '13 Oct • 15 FPS Vision Passed', '14 Oct • Field Validated', 'Active • 142 Parcels Delivered'],
      carrier: 'Direct Lab Deployment (NMIT Physical AI Bay)',
      awb: 'NMIT-FLEET-01',
      dest: 'Main Security Gate 1 & Hostel Quadrangle Pickup Stations',
      units: '2 Rover Units (₹49,998)',
      chargers: '2 Fast-Charger Docks (₹4,000)',
      livery: 'Campus Orange & White'
    },
    'CB-PO-RUAS-02': {
      po: 'CB-PO-RUAS-02',
      institution: 'Ramaiah University of Applied Sciences (RUAS Bengaluru)',
      status: 'HACKTIVATE 2026 PILOT EVALUATION',
      badgeClass: 'status-in-transit',
      etaDuration: 'Active Field Evaluation',
      etaDate: 'October 14–15, 2026',
      location: 'RUAS Peenya Campus Arena',
      fillWidth: '80%',
      steps: [true, true, true, 'current', false],
      stepDates: ['12 Oct • Pilot Sanctioned', '13 Oct • Hardware Assembly', '14 Oct • Sonar Calibrated', 'Active • Live Field Runs', 'Pending • Deployment Handover'],
      carrier: 'CampusBot Engineering Vehicle',
      awb: 'RUAS-PILOT-02',
      dest: 'Pravrutti Innovation Arena, RUAS Bengaluru',
      units: '1 Rover Unit (₹24,999)',
      chargers: '2 Fast-Charger Docks (₹4,000)',
      livery: 'Electric Blue & Slate'
    },
    'CB-PO-BMS-03': {
      po: 'CB-PO-BMS-03',
      institution: 'BMS College of Engineering (BMSCE Bengaluru)',
      status: 'PRODUCTION BATCH IN ASSEMBLY',
      badgeClass: 'status-assembling',
      etaDuration: '3 Days Remaining',
      etaDate: 'October 18, 2026 (11:00 AM)',
      location: 'NMIT Physical AI Bay (Chassis & Wiring Stage)',
      fillWidth: '45%',
      steps: [true, true, 'current', false, false],
      stepDates: ['13 Oct • Order Placed', '14 Oct • Chassis & Motors Wired', 'Active • Calibrating Pi 3 Compute', 'Queued for Vision QA', 'Pending • Campus Dispatch'],
      carrier: 'Bengaluru Dedicated Campus Dispatch',
      awb: 'BMSCE-BATCH-03',
      dest: 'Main Security Plaza, Bull Temple Road, Bengaluru',
      units: '1 Rover Unit (₹24,999)',
      chargers: '2 Fast-Charger Docks (₹4,000)',
      livery: 'Pearl White & University Crimson'
    }
  };

  // Add convenient aliases
  REAL_ORDERS['8492'] = REAL_ORDERS['PARCEL-NMIT-8492'];
  REAL_ORDERS['1024'] = REAL_ORDERS['PARCEL-RUAS-1024'];
  REAL_ORDERS['NMIT-01'] = REAL_ORDERS['CB-PO-NMIT-01'];
  REAL_ORDERS['RUAS-02'] = REAL_ORDERS['CB-PO-RUAS-02'];
  REAL_ORDERS['BMS-03']  = REAL_ORDERS['CB-PO-BMS-03'];

  function renderTrackData(data) {
    if (!data) return;
    const dPo       = document.getElementById('dispPoNumber');
    const dInst     = document.getElementById('dispInstitution');
    const dBadge    = document.getElementById('dispStatusBadge');
    const dStatus   = document.getElementById('dispStatusText');
    const dEtaDur   = document.getElementById('dispEtaDuration');
    const dEtaDate  = document.getElementById('dispEtaDate');
    const dLoc      = document.getElementById('dispCurrentLocation');
    const dFill     = document.getElementById('dispStepperFill');
    const dCarrier  = document.getElementById('dispCarrier');
    const dAwb      = document.getElementById('dispAwb');
    const dDest     = document.getElementById('dispDestAddress');
    const dUnits    = document.getElementById('dispUnitsCount');
    const dChargers = document.getElementById('dispChargersCount');
    const dLivery   = document.getElementById('dispLivery');

    if (dPo)      dPo.textContent      = data.po;
    if (dInst)    dInst.textContent    = data.institution;
    if (dStatus)  dStatus.textContent  = data.status;
    if (dEtaDur)  dEtaDur.textContent  = data.etaDuration;
    if (dEtaDate) dEtaDate.textContent = data.etaDate;
    if (dLoc)     dLoc.textContent     = data.location;
    if (dFill)    dFill.style.width    = data.fillWidth;
    if (dCarrier) dCarrier.textContent = data.carrier;
    if (dAwb)     dAwb.textContent     = data.awb;
    if (dDest)    dDest.textContent    = data.dest;
    if (dUnits)   dUnits.textContent   = data.units;
    if (dChargers)dChargers.textContent= data.chargers;
    if (dLivery)  dLivery.textContent  = data.livery;

    if (dBadge) {
      dBadge.className = `track-status-badge ${data.badgeClass}`;
    }

    for (let i = 1; i <= 5; i++) {
      const stepEl = document.getElementById(`step${i}`);
      const stepDateEl = document.getElementById(`step${i}Date`);
      if (stepEl && data.steps) {
        stepEl.classList.remove('completed', 'current');
        const state = data.steps[i - 1];
        if (state === true) {
          stepEl.classList.add('completed');
          stepEl.querySelector('.step-marker').innerHTML = '&#10003;';
        } else if (state === 'current') {
          stepEl.classList.add('current');
          stepEl.querySelector('.step-marker').textContent = String(i);
        } else {
          stepEl.querySelector('.step-marker').textContent = String(i);
        }
      }
      if (stepDateEl && data.stepDates) {
        stepDateEl.textContent = data.stepDates[i - 1] || '';
      }
    }
  }

  function executeTrackLookup(poQuery) {
    if (!poQuery) return;
    const cleanPo = poQuery.trim().toUpperCase();

    if (REAL_ORDERS[cleanPo]) {
      renderTrackData(REAL_ORDERS[cleanPo]);
    } else {
      const dynamicOrder = {
        po: cleanPo,
        institution: 'Nitte Meenakshi Institute of Technology (NMIT, Bengaluru)',
        status: 'IN AUTONOMOUS TRANSIT (GATE-TO-HOSTEL)',
        badgeClass: 'status-in-transit',
        etaDuration: '4 Minutes (Speed 1.2 m/s)',
        etaDate: 'Arriving Today at Campus Hostel Hub',
        location: 'Engineering Campus Main Pathway (Active Line Guidance)',
        fillWidth: '70%',
        steps: [true, true, true, 'current', false],
        stepDates: ['Gate 1 Security Verified', 'Vault Solenoid Locked', 'OpenCV Centroid 15 FPS Active', 'In Transit Along White Line', 'Pending Student OTP Auth'],
        carrier: 'CampusBot Autonomous Fleet Dispatch',
        awb: 'CB-AWB-' + Math.floor(1000 + Math.random() * 9000),
        dest: 'Student Hostel Complex Pickup Station',
        units: 'CAMPUSBOT Unit #01',
        chargers: 'Battery: 82% (12V Li-ion Regulated)',
        livery: 'Campus Orange & White'
      };
      renderTrackData(dynamicOrder);
    }

    const panel = document.getElementById('trackResultPanel');
    if (panel) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (trackSearchForm && trackInput) {
    trackSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      executeTrackLookup(trackInput.value);
    });

    trackSampleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const po = btn.dataset.po;
        trackInput.value = po;
        executeTrackLookup(po);
      });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const paramPo = urlParams.get('po');
    if (paramPo) {
      trackInput.value = paramPo;
      executeTrackLookup(paramPo);
    }
  }

  // ── 8. INSPIRATIONAL QUOTE CAROUSEL (IMAGE 5 REPLICA & MOTION) ───────────────
  const quoteSlides = document.querySelectorAll('.quote-slide');
  const quoteDots   = document.querySelectorAll('#quoteDots .dot-btn');
  const btnPrev     = document.getElementById('quotePrev');
  const btnNext     = document.getElementById('quoteNext');
  const sliderWrap  = document.querySelector('.ottonomy-quote-slider-wrap');
  let currentQuoteIndex = 0;
  let quoteAutoTimer    = null;
  const AUTO_SLIDE_DELAY = 5000;

  function showQuote(index, direction = 'next') {
    if (!quoteSlides.length) return;
    const total = quoteSlides.length;
    currentQuoteIndex = (index + total) % total;

    quoteSlides.forEach((slide, i) => {
      slide.classList.remove('active', 'slide-in-right', 'slide-in-left');
      if (i === currentQuoteIndex) {
        slide.classList.add('active');
        slide.classList.add(direction === 'next' ? 'slide-in-right' : 'slide-in-left');
      }
    });

    quoteDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentQuoteIndex);
    });
  }

  function nextQuote() {
    showQuote(currentQuoteIndex + 1, 'next');
  }

  function prevQuote() {
    showQuote(currentQuoteIndex - 1, 'prev');
  }

  function startQuoteAutoPlay() {
    stopQuoteAutoPlay();
    if (quoteSlides.length > 0) {
      quoteAutoTimer = setInterval(nextQuote, AUTO_SLIDE_DELAY);
    }
  }

  function stopQuoteAutoPlay() {
    if (quoteAutoTimer) {
      clearInterval(quoteAutoTimer);
      quoteAutoTimer = null;
    }
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      nextQuote();
      startQuoteAutoPlay();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      prevQuote();
      startQuoteAutoPlay();
    });
  }

  quoteDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      const dir = idx >= currentQuoteIndex ? 'next' : 'prev';
      showQuote(idx, dir);
      startQuoteAutoPlay();
    });
  });

  if (sliderWrap) {
    sliderWrap.addEventListener('mouseenter', stopQuoteAutoPlay);
    sliderWrap.addEventListener('mouseleave', startQuoteAutoPlay);
    sliderWrap.addEventListener('touchstart', stopQuoteAutoPlay, { passive: true });
    sliderWrap.addEventListener('touchend', startQuoteAutoPlay, { passive: true });
  }

  // Mobile Touch Swipe
  let touchStartX = 0;
  let touchEndX   = 0;
  const viewport = document.querySelector('.quote-slider-viewport');
  if (viewport) {
    viewport.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    viewport.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 45) {
        nextQuote();
        startQuoteAutoPlay();
      } else if (touchEndX - touchStartX > 45) {
        prevQuote();
        startQuoteAutoPlay();
      }
    }, { passive: true });
  }

  startQuoteAutoPlay();

  // ── 9. SCROLL REVEAL ANIMATIONS ─────────────────────────────────────────────
  const revealElements = document.querySelectorAll(
    '.capability-card, .team-card, .core-tier-row, .ready-drive-card, .quote-bubble-card, .procure-calculator-card, .procure-qr-card, .track-search-card, .tracking-result-panel'
  );

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
      el.classList.add('scroll-reveal');
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // Initial calculation trigger
  updateProcurementTotal();

  // ── 10. SCREENSHOT-EXACT INDUSTRIES DROPDOWN WIDGET (MIDDLE OF FIRST PAGE) ───
  const middleIndustriesToggle   = document.getElementById('middleIndustriesToggle');
  const middleIndustriesDropdown = document.getElementById('middleIndustriesDropdown');
  const screenshotItems          = document.querySelectorAll('.screenshot-item');

  const INDUSTRY_PREVIEWS = {
    colleges: {
      pill: 'Colleges & Universities',
      stat: '200+ Daily Gate Parcels',
      heading: 'How CAMPUSBOT Helps Colleges & Universities',
      problem: 'Over 200+ courier parcels arrive at security gates daily. Students walk 20–30 minutes round-trip from hostels, and third-party delivery riders enter residential zones compromising student security.',
      solution: 'Couriers drop consignments at the main gate in under 3 minutes. CAMPUSBOT autonomously navigates pedestrian paths to hostel doorsteps with dual-solenoid OTP unlocking.',
      metrics: [
        { val: '100%', lbl: 'Hostel Perimeter Security' },
        { val: '25 min', lbl: 'Walk Time Saved / Delivery' },
        { val: '₹24,999', lbl: 'Flat Institutional Hardware' }
      ],
      btnText: 'Read How CAMPUSBOT Helps Colleges & Universities →',
      url: 'industries.html?industry=colleges'
    },
    healthcare: {
      pill: 'Healthcare & Hospital Networks',
      stat: 'Zero Contamination • 24/7 Stat Sample Transport',
      heading: 'How CAMPUSBOT Helps Healthcare & Hospitals',
      problem: 'Nurses and ward orderlies walk 8–12 km per shift carrying blood vials, emergency stat specimens, and medications between clinics, ICUs, and labs, risking fatigue and pathogen exposure.',
      solution: 'Contactless, UV-cleanable payload compartment runs 24/7 stat specimen loops with sub-0.5s sonar obstacle braking around patients and wheelchairs.',
      metrics: [
        { val: '70%', lbl: 'Faster Stat Sample Turnaround' },
        { val: '0', lbl: 'Pathogen Contamination Risk' },
        { val: '100%', lbl: 'Cryptographic Chain-of-Custody' }
      ],
      btnText: 'Read How CAMPUSBOT Helps Healthcare →',
      url: 'industries.html?industry=healthcare'
    },
    industrial: {
      pill: 'Large Industrial Campuses',
      stat: 'Internal Tooling & Parts Logistics',
      heading: 'How CAMPUSBOT Helps Industrial Campuses',
      problem: 'High-value technicians waste engineering hours walking across sprawling tarmac bays to fetch replacement tooling, calibration gauges, and PCB trays between warehouse and assembly lines.',
      solution: 'Continuous scheduled shuttles carrying up to 15 kg with optical track guidance operating independently of GPS under steel-framed roofs, complete with hardware E-stop.',
      metrics: [
        { val: '85%', lbl: 'Messenger Labor Cost Cut' },
        { val: '15 kg', lbl: 'Continuous Payload Capacity' },
        { val: '0 GPS', lbl: 'Zero Satellite RTK Dependency' }
      ],
      btnText: 'Read How CAMPUSBOT Helps Industrial Campuses →',
      url: 'industries.html?industry=industrial'
    },
    parcel: {
      pill: 'Last-Mile Parcel Delivery',
      stat: 'Solving the Last 500-Meter Bottleneck',
      heading: 'How CAMPUSBOT Helps Parcel Delivery & Couriers',
      problem: 'The last 500 meters account for over 53% of courier shipping cost. Delivery riders lose 15–25 minutes per campus gate waiting for customers or navigating restricted barriers.',
      solution: 'Couriers drop off bulk consignments at the main gate dock in 3 minutes. CAMPUSBOT automates distribution directly to residential hostel lockers without re-delivery attempts.',
      metrics: [
        { val: '3 min', lbl: 'Courier Gate Turnaround' },
        { val: '0%', lbl: 'Failed First-Attempt Drop' },
        { val: '53%', lbl: 'Last-500m Cost Savings' }
      ],
      btnText: 'Read How CAMPUSBOT Helps Parcel Delivery →',
      url: 'industries.html?industry=parcel'
    }
  };

  if (middleIndustriesToggle && middleIndustriesDropdown) {
    middleIndustriesToggle.addEventListener('click', () => {
      const isCollapsed = middleIndustriesDropdown.classList.toggle('collapsed');
      middleIndustriesToggle.classList.toggle('collapsed', isCollapsed);
      middleIndustriesToggle.setAttribute('aria-expanded', !isCollapsed);
    });
  }

  // Update preview on hover or click
  const prevSectorPill   = document.getElementById('prevSectorPill');
  const prevStatTag      = document.getElementById('prevStatTag');
  const prevHeading      = document.getElementById('prevHeading');
  const prevProblemText  = document.getElementById('prevProblemText');
  const prevSolutionText = document.getElementById('prevSolutionText');
  const prevMVal1        = document.getElementById('prevMVal1');
  const prevMLbl1        = document.getElementById('prevMLbl1');
  const prevMVal2        = document.getElementById('prevMVal2');
  const prevMLbl2        = document.getElementById('prevMLbl2');
  const prevMVal3        = document.getElementById('prevMVal3');
  const prevMLbl3        = document.getElementById('prevMLbl3');
  const prevLearnMoreBtn = document.getElementById('prevLearnMoreBtn');

  function updateIndustryPreview(indKey) {
    const data = INDUSTRY_PREVIEWS[indKey];
    if (!data || !prevHeading) return;

    screenshotItems.forEach(item => {
      item.classList.toggle('active', item.dataset.industry === indKey);
    });

    if (prevSectorPill)   prevSectorPill.textContent = data.pill;
    if (prevStatTag)      prevStatTag.textContent = data.stat;
    if (prevHeading)      prevHeading.textContent = data.heading;
    if (prevProblemText)  prevProblemText.textContent = data.problem;
    if (prevSolutionText) prevSolutionText.textContent = data.solution;
    if (prevMVal1)        prevMVal1.textContent = data.metrics[0].val;
    if (prevMLbl1)        prevMLbl1.textContent = data.metrics[0].lbl;
    if (prevMVal2)        prevMVal2.textContent = data.metrics[1].val;
    if (prevMLbl2)        prevMLbl2.textContent = data.metrics[1].lbl;
    if (prevMVal3)        prevMVal3.textContent = data.metrics[2].val;
    if (prevMLbl3)        prevMLbl3.textContent = data.metrics[2].lbl;
    if (prevLearnMoreBtn) {
      prevLearnMoreBtn.textContent = data.btnText;
      prevLearnMoreBtn.setAttribute('href', data.url);
    }
  }

  screenshotItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const indKey = item.dataset.industry;
      if (indKey) updateIndustryPreview(indKey);
    });
  });

  // ── 11. INDUSTRIES.HTML TAB SWITCHING & URL DEEP-LINKING ────────────────────
  const industryNavPills = document.querySelectorAll('.industry-nav-pill');
  const industryCards    = document.querySelectorAll('.industry-detail-card');

  function switchIndustryTab(targetId, shouldScroll = false) {
    if (!industryCards || industryCards.length === 0) return;

    let targetCard = document.getElementById(`sec-${targetId}`);
    if (!targetCard) {
      targetId = 'colleges';
      targetCard = document.getElementById('sec-colleges');
    }

    industryNavPills.forEach(pill => {
      pill.classList.toggle('active', pill.dataset.target === targetId);
    });

    industryCards.forEach(card => {
      card.classList.toggle('active', card.id === `sec-${targetId}`);
    });

    if (shouldScroll && targetCard) {
      setTimeout(() => {
        const offsetTop = targetCard.getBoundingClientRect().top + window.scrollY - 110;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }, 50);
    }
  }

  industryNavPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const targetId = pill.dataset.target;
      switchIndustryTab(targetId, false);
      const url = new URL(window.location);
      url.searchParams.set('industry', targetId);
      window.history.replaceState({}, '', url);
    });
  });

  // Deep-link check on page load for industries.html
  if (industryCards.length > 0) {
    const params = new URLSearchParams(window.location.search);
    const indParam = params.get('industry') || window.location.hash.replace('#sec-', '').replace('#', '');
    if (indParam && ['colleges', 'healthcare', 'industrial', 'parcel'].includes(indParam)) {
      switchIndustryTab(indParam, true);
    }
  }

});
