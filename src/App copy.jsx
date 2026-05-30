// Isotope data per element
const ISOTOPE_DATA = {
  88: [
    { symbol: "²²³Ra", name: "Radium-223",  massNumber: 223, neutrons: 135, abundance: "Trace",     halfLife: "11.435 days",  spin: "3/2", binding: 7.768, radioactive: true, decayMode: "α",  notes: "FDA-approved alpha emitter for bone metastases (Xofigo/Alpharadin)." },
    { symbol: "²²⁴Ra", name: "Radium-224",  massNumber: 224, neutrons: 136, abundance: "Trace",     halfLife: "3.6319 days",  spin: "0",   binding: 7.774, radioactive: true, decayMode: "α",  notes: "Member of thorium-228 decay chain. Used in targeted alpha therapy research." },
    { symbol: "²²⁵Ra", name: "Radium-225",  massNumber: 225, neutrons: 137, abundance: "Trace",     halfLife: "14.9 days",    spin: "1/2", binding: 7.758, radioactive: true, decayMode: "β⁻", notes: "Parent of ²²⁵Ac; key isotope for targeted alpha therapy generator." },
    { symbol: "²²⁶Ra", name: "Radium-226",  massNumber: 226, neutrons: 138, abundance: "Trace",     halfLife: "1600 years",   spin: "0",   binding: 7.762, radioactive: true, decayMode: "α",  notes: "Discovered by Marie and Pierre Curie. Formerly used in luminous paint." },
    { symbol: "²²⁸Ra", name: "Radium-228",  massNumber: 228, neutrons: 140, abundance: "Trace",     halfLife: "5.75 years",   spin: "0",   binding: 7.740, radioactive: true, decayMode: "β⁻", notes: "Member of thorium-232 decay chain." },
    { symbol: "²²⁷Ra", name: "Radium-227",  massNumber: 227, neutrons: 139, abundance: "Trace",     halfLife: "42.2 min",     spin: "3/2", binding: 7.743, radioactive: true, decayMode: "β⁻", notes: "Short-lived member of uranium-235 decay chain." },
  ],
  89: [
    { symbol: "²²⁷Ac", name: "Actinium-227",  massNumber: 227, neutrons: 138, abundance: "Trace",     halfLife: "21.772 years", spin: "3/2", binding: 7.749, radioactive: true, decayMode: "β⁻, α", notes: "Most stable actinium isotope. Used in ²²⁷Ac/²²³Ra generator for cancer therapy." },
    { symbol: "²²⁵Ac", name: "Actinium-225",  massNumber: 225, neutrons: 136, abundance: "Trace",     halfLife: "9.9203 days",  spin: "3/2", binding: 7.748, radioactive: true, decayMode: "α",  notes: "Highly promising targeted alpha therapy agent (PSMA therapy trials)." },
    { symbol: "²²⁸Ac", name: "Actinium-228",  massNumber: 228, neutrons: 139, abundance: "Trace",     halfLife: "6.15 h",       spin: "3",   binding: 7.726, radioactive: true, decayMode: "β⁻", notes: "Member of thorium-232 decay chain." },
    { symbol: "²²⁶Ac", name: "Actinium-226",  massNumber: 226, neutrons: 137, abundance: "Synthetic", halfLife: "29.37 h",      spin: "1",   binding: 7.737, radioactive: true, decayMode: "β⁻, ε, α", notes: "Synthetic actinium isotope." },
    { symbol: "²²⁴Ac", name: "Actinium-224",  massNumber: 224, neutrons: 135, abundance: "Synthetic", halfLife: "2.78 h",       spin: "0",   binding: 7.744, radioactive: true, decayMode: "α",  notes: "Short-lived synthetic actinium isotope." },
  ],
  90: [
    { symbol: "²³²Th", name: "Thorium-232",  massNumber: 232, neutrons: 142, abundance: "99.98%",   halfLife: "1.4×10¹⁰ yr", spin: "0",   binding: 7.615, radioactive: true, decayMode: "α",  notes: "Primordial nuclide. Head of thorium-232 decay chain. Fertile fuel for thorium reactors." },
    { symbol: "²³⁰Th", name: "Thorium-230",  massNumber: 230, neutrons: 140, abundance: "Trace",    halfLife: "75400 years",  spin: "0",   binding: 7.638, radioactive: true, decayMode: "α",  notes: "Useful in uranium-thorium geochronology of coral and cave formations." },
    { symbol: "²²⁸Th", name: "Thorium-228",  massNumber: 228, neutrons: 138, abundance: "Trace",    halfLife: "1.9116 years", spin: "0",   binding: 7.660, radioactive: true, decayMode: "α",  notes: "Used in targeted alpha therapy (thorium-228/radium-224 generator chain)." },
    { symbol: "²²⁷Th", name: "Thorium-227",  massNumber: 227, neutrons: 137, abundance: "Trace",    halfLife: "18.68 days",   spin: "3/2", binding: 7.655, radioactive: true, decayMode: "α",  notes: "Thoron. In uranium-235 decay chain. Therapeutic alpha emitter." },
    { symbol: "²²⁹Th", name: "Thorium-229",  massNumber: 229, neutrons: 139, abundance: "Trace",    halfLife: "7932 years",   spin: "5/2", binding: 7.636, radioactive: true, decayMode: "α",  notes: "Contains the 8.3 eV nuclear isomeric transition — proposed for nuclear clock." },
    { symbol: "²³¹Th", name: "Thorium-231",  massNumber: 231, neutrons: 141, abundance: "Trace",    halfLife: "25.52 h",      spin: "5/2", binding: 7.621, radioactive: true, decayMode: "β⁻", notes: "Short-lived member of uranium-235 decay chain." },
    { symbol: "²³⁴Th", name: "Thorium-234",  massNumber: 234, neutrons: 144, abundance: "Trace",    halfLife: "24.10 days",   spin: "0",   binding: 7.600, radioactive: true, decayMode: "β⁻", notes: "Member of uranium-238 decay chain. Used in uranium-series dating." },
    { symbol: "²²⁶Th", name: "Thorium-226",  massNumber: 226, neutrons: 136, abundance: "Trace",    halfLife: "30.9 min",     spin: "0",   binding: 7.666, radioactive: true, decayMode: "α",  notes: "Short-lived; studied for targeted alpha therapy." },
  ],
  91: [
    { symbol: "²³¹Pa", name: "Protactinium-231",  massNumber: 231, neutrons: 140, abundance: "Trace",     halfLife: "32760 years",  spin: "3/2", binding: 7.622, radioactive: true, decayMode: "α",  notes: "Most stable protactinium isotope. Used in Pa-U geochronology of oceans." },
    { symbol: "²³³Pa", name: "Protactinium-233",  massNumber: 233, neutrons: 142, abundance: "Synthetic", halfLife: "26.967 days",  spin: "3/2", binding: 7.603, radioactive: true, decayMode: "β⁻", notes: "Parent of ²³³U. Key step in thorium fuel cycle." },
    { symbol: "²³⁴Pa", name: "Protactinium-234",  massNumber: 234, neutrons: 143, abundance: "Trace",     halfLife: "6.70 h",       spin: "4",   binding: 7.589, radioactive: true, decayMode: "β⁻", notes: "Member of uranium-238 decay chain." },
    { symbol: "²³⁴ᵐPa", name: "Protactinium-234m", massNumber: 234, neutrons: 143, abundance: "Trace",   halfLife: "1.17 min",     spin: "0",   binding: 7.589, radioactive: true, decayMode: "β⁻", notes: "Metastable isomer in uranium-238 chain. Shorter-lived than ground state." },
    { symbol: "²³⁰Pa", name: "Protactinium-230",  massNumber: 230, neutrons: 139, abundance: "Synthetic", halfLife: "17.4 days",    spin: "2",   binding: 7.624, radioactive: true, decayMode: "β⁺, ε, α", notes: "Proton-rich synthetic protactinium." },
  ],
  92: [
    { symbol: "²³⁴U",  name: "Uranium-234",   massNumber: 234, neutrons: 142, abundance: "0.0054%",   halfLife: "2.455×10⁵ yr", spin: "0",   binding: 7.601, radioactive: true, decayMode: "α",  notes: "Member of uranium-238 decay chain. Used in uranium-series dating." },
    { symbol: "²³⁵U",  name: "Uranium-235",   massNumber: 235, neutrons: 143, abundance: "0.7204%",   halfLife: "7.04×10⁸ yr",  spin: "7/2", binding: 7.591, radioactive: true, decayMode: "α",  notes: "Only naturally fissile isotope. Fuel for most nuclear reactors and weapons." },
    { symbol: "²³⁶U",  name: "Uranium-236",   massNumber: 236, neutrons: 144, abundance: "Trace",     halfLife: "2.342×10⁷ yr", spin: "0",   binding: 7.594, radioactive: true, decayMode: "α",  notes: "Produced in reactors from ²³⁵U neutron capture. Nuclear waste constituent." },
    { symbol: "²³⁸U",  name: "Uranium-238",   massNumber: 238, neutrons: 146, abundance: "99.2742%",  halfLife: "4.468×10⁹ yr", spin: "0",   binding: 7.570, radioactive: true, decayMode: "α",  notes: "Most abundant uranium isotope. Primordial. Fertile material for plutonium production." },
    { symbol: "²³³U",  name: "Uranium-233",   massNumber: 233, neutrons: 141, abundance: "Trace",     halfLife: "1.592×10⁵ yr", spin: "5/2", binding: 7.607, radioactive: true, decayMode: "α",  notes: "Fissile. Produced from ²³²Th in thorium fuel cycle. Used in some reactors." },
    { symbol: "²³²U",  name: "Uranium-232",   massNumber: 232, neutrons: 140, abundance: "Trace",     halfLife: "68.9 years",   spin: "0",   binding: 7.615, radioactive: true, decayMode: "α",  notes: "Contaminant in ²³³U from thorium cycle; hard gamma from daughters complicates use." },
    { symbol: "²³⁷U",  name: "Uranium-237",   massNumber: 237, neutrons: 145, abundance: "Synthetic", halfLife: "6.75 days",    spin: "1/2", binding: 7.575, radioactive: true, decayMode: "β⁻", notes: "Produced by neutron capture in reactor. Short-lived." },
    { symbol: "²³⁹U",  name: "Uranium-239",   massNumber: 239, neutrons: 147, abundance: "Synthetic", halfLife: "23.45 min",    spin: "5/2", binding: 7.556, radioactive: true, decayMode: "β⁻", notes: "First product of ²³⁸U neutron capture. Decays to ²³⁹Np then ²³⁹Pu." },
  ],
  93: [
    { symbol: "²³⁷Np", name: "Neptunium-237",  massNumber: 237, neutrons: 144, abundance: "Trace",     halfLife: "2.144×10⁶ yr", spin: "5/2", binding: 7.578, radioactive: true, decayMode: "α",      notes: "Most stable neptunium isotope. Accumulates in spent nuclear fuel. Head of the neptunium (4n+1) decay series." },
    { symbol: "²³⁹Np", name: "Neptunium-239",  massNumber: 239, neutrons: 146, abundance: "Trace",     halfLife: "2.356 days",   spin: "5/2", binding: 7.558, radioactive: true, decayMode: "β⁻",     notes: "Produced by ²³⁸U neutron capture; decays to ²³⁹Pu. Key step in plutonium production in reactors." },
    { symbol: "²³⁵Np", name: "Neptunium-235",  massNumber: 235, neutrons: 142, abundance: "Synthetic", halfLife: "396.1 days",   spin: "5/2", binding: 7.584, radioactive: true, decayMode: "ε",      notes: "Produced in reactors by proton-rich neutron activation pathways; decays to ²³⁵U by electron capture." },
    { symbol: "²³⁶Np", name: "Neptunium-236",  massNumber: 236, neutrons: 143, abundance: "Synthetic", halfLife: "1.54×10⁵ yr", spin: "6",   binding: 7.574, radioactive: true, decayMode: "β⁻, ε",  notes: "Second longest-lived neptunium isotope. Of interest in long-term nuclear waste assessment." },
    { symbol: "²³⁸Np", name: "Neptunium-238",  massNumber: 238, neutrons: 145, abundance: "Synthetic", halfLife: "2.117 days",   spin: "2",   binding: 7.563, radioactive: true, decayMode: "β⁻",     notes: "Reactor-produced; precursor used in ²³⁸Pu RTG fuel production chain." },
  ],
 
  94: [
    { symbol: "²⁴⁴Pu", name: "Plutonium-244",  massNumber: 244, neutrons: 150, abundance: "Trace",     halfLife: "8.00×10⁷ yr", spin: "0",   binding: 7.533, radioactive: true, decayMode: "α",      notes: "Longest-lived plutonium isotope. Trace amounts found in nature. Primordial in some rare-earth ores." },
    { symbol: "²³⁹Pu", name: "Plutonium-239",  massNumber: 239, neutrons: 145, abundance: "Synthetic", halfLife: "24110 years",  spin: "1/2", binding: 7.560, radioactive: true, decayMode: "α",      notes: "Primary fissile material in nuclear weapons and MOX reactor fuel. Produced from ²³⁸U neutron capture." },
    { symbol: "²⁴⁰Pu", name: "Plutonium-240",  massNumber: 240, neutrons: 146, abundance: "Synthetic", halfLife: "6561 years",   spin: "0",   binding: 7.557, radioactive: true, decayMode: "α, SF",  notes: "Weapons-grade impurity; spontaneous fission makes it problematic for gun-type bombs." },
    { symbol: "²³⁸Pu", name: "Plutonium-238",  massNumber: 238, neutrons: 144, abundance: "Synthetic", halfLife: "87.74 years",  spin: "0",   binding: 7.568, radioactive: true, decayMode: "α",      notes: "RTG fuel of choice for deep-space probes (Voyager, Cassini, New Horizons). ~0.5 W/g heat output." },
    { symbol: "²⁴²Pu", name: "Plutonium-242",  massNumber: 242, neutrons: 148, abundance: "Synthetic", halfLife: "3.75×10⁵ yr", spin: "0",   binding: 7.545, radioactive: true, decayMode: "α",      notes: "Long-lived reactor by-product accumulating in spent fuel over multiple irradiation cycles." },
    { symbol: "²⁴¹Pu", name: "Plutonium-241",  massNumber: 241, neutrons: 147, abundance: "Synthetic", halfLife: "14.329 years", spin: "5/2", binding: 7.543, radioactive: true, decayMode: "β⁻",     notes: "Fissile; decays to ²⁴¹Am in storage, building up americium contamination in aged plutonium." },
  ],
 
  95: [
    { symbol: "²⁴³Am", name: "Americium-243",  massNumber: 243, neutrons: 148, abundance: "Synthetic", halfLife: "7370 years",   spin: "5/2", binding: 7.527, radioactive: true, decayMode: "α",      notes: "Longest-lived americium isotope. Used as neutron source when combined with beryllium." },
    { symbol: "²⁴¹Am", name: "Americium-241",  massNumber: 241, neutrons: 146, abundance: "Synthetic", halfLife: "432.6 years",  spin: "5/2", binding: 7.536, radioactive: true, decayMode: "α",      notes: "Used in ionisation-type smoke detectors. FDA-approved ²⁴¹Am/²³⁷Np generator research ongoing." },
    { symbol: "²⁴²ᵐAm", name: "Americium-242m", massNumber: 242, neutrons: 147, abundance: "Synthetic", halfLife: "141 years",   spin: "5",   binding: 7.522, radioactive: true, decayMode: "IT, α",  notes: "Metastable isomer; one of the highest known fission cross-sections (>6000 barns). Proposed space reactor fuel." },
    { symbol: "²⁴²Am", name: "Americium-242",  massNumber: 242, neutrons: 147, abundance: "Synthetic", halfLife: "16.02 h",      spin: "1",   binding: 7.522, radioactive: true, decayMode: "β⁻, ε",  notes: "Ground state; produced by neutron capture on ²⁴¹Am. Short-lived; gateway to ²⁴²Cm production." },
    { symbol: "²⁴⁰Am", name: "Americium-240",  massNumber: 240, neutrons: 145, abundance: "Synthetic", halfLife: "50.8 h",       spin: "3",   binding: 7.527, radioactive: true, decayMode: "ε",      notes: "Proton-rich synthetic americium isotope produced in accelerator bombardments." },
  ],
 
  96: [
    { symbol: "²⁴⁷Cm", name: "Curium-247",    massNumber: 247, neutrons: 151, abundance: "Synthetic", halfLife: "1.56×10⁷ yr", spin: "9/2", binding: 7.498, radioactive: true, decayMode: "α",      notes: "Longest-lived curium isotope. Long enough half-life to be studied as a potential extinct radionuclide." },
    { symbol: "²⁴⁸Cm", name: "Curium-248",    massNumber: 248, neutrons: 152, abundance: "Synthetic", halfLife: "3.48×10⁵ yr", spin: "0",   binding: 7.501, radioactive: true, decayMode: "α, SF",  notes: "Second longest-lived curium isotope. Spontaneous fission branch makes handling hazardous." },
    { symbol: "²⁴⁵Cm", name: "Curium-245",    massNumber: 245, neutrons: 149, abundance: "Synthetic", halfLife: "8500 years",   spin: "7/2", binding: 7.512, radioactive: true, decayMode: "α",      notes: "Fissile isotope with large thermal neutron cross-section. Considered for long-lived waste transmutation." },
    { symbol: "²⁴⁶Cm", name: "Curium-246",    massNumber: 246, neutrons: 150, abundance: "Synthetic", halfLife: "4706 years",   spin: "0",   binding: 7.508, radioactive: true, decayMode: "α, SF",  notes: "Significant spontaneous fission rate; a notable neutron source in aged curium samples." },
    { symbol: "²⁴⁴Cm", name: "Curium-244",    massNumber: 244, neutrons: 148, abundance: "Synthetic", halfLife: "18.11 years",  spin: "0",   binding: 7.517, radioactive: true, decayMode: "α, SF",  notes: "Produced in high-fluence reactors. Used in RTGs and as a neutron source (with beryllium)." },
    { symbol: "²⁴³Cm", name: "Curium-243",    massNumber: 243, neutrons: 147, abundance: "Synthetic", halfLife: "29.1 years",   spin: "5/2", binding: 7.515, radioactive: true, decayMode: "α, ε",   notes: "Relatively long-lived; produced by successive neutron capture. Contributes to reactor waste radiotoxicity." },
    { symbol: "²⁴²Cm", name: "Curium-242",    massNumber: 242, neutrons: 146, abundance: "Synthetic", halfLife: "162.8 days",   spin: "0",   binding: 7.519, radioactive: true, decayMode: "α, SF",  notes: "First synthesised curium isotope (1944, Seaborg et al.). Intense alpha/neutron emitter." },
  ],
 
  97: [
    { symbol: "²⁴⁷Bk", name: "Berkelium-247",  massNumber: 247, neutrons: 150, abundance: "Synthetic", halfLife: "1380 years",   spin: "3/2", binding: 7.491, radioactive: true, decayMode: "α",      notes: "Longest-lived berkelium isotope. Named after Berkeley, California, where it was first synthesised in 1949." },
    { symbol: "²⁴⁹Bk", name: "Berkelium-249",  massNumber: 249, neutrons: 152, abundance: "Synthetic", halfLife: "327.2 days",   spin: "7/2", binding: 7.486, radioactive: true, decayMode: "β⁻, α",  notes: "Most commonly used berkelium isotope; extractable from reactor actinides in weighable quantities. Used as target to synthesise element 117 (tennessine)." },
    { symbol: "²⁴⁸Bk", name: "Berkelium-248",  massNumber: 248, neutrons: 151, abundance: "Synthetic", halfLife: ">9 years",     spin: "1",   binding: 7.488, radioactive: true, decayMode: "α",      notes: "Lower limit on half-life; possibly longer-lived than ²⁴⁷Bk. Very difficult to produce in quantity." },
    { symbol: "²⁴⁵Bk", name: "Berkelium-245",  massNumber: 245, neutrons: 148, abundance: "Synthetic", halfLife: "4.94 days",    spin: "3/2", binding: 7.497, radioactive: true, decayMode: "ε, α",   notes: "Produced by alpha bombardment of curium targets in cyclotrons." },
    { symbol: "²⁴⁶Bk", name: "Berkelium-246",  massNumber: 246, neutrons: 149, abundance: "Synthetic", halfLife: "1.80 days",    spin: "2",   binding: 7.492, radioactive: true, decayMode: "ε, α",   notes: "Short-lived synthetic berkelium; studied in nuclear spectroscopy experiments." },
  ],
 
  98: [
    { symbol: "²⁵¹Cf", name: "Californium-251", massNumber: 251, neutrons: 153, abundance: "Synthetic", halfLife: "898 years",    spin: "1/2", binding: 7.463, radioactive: true, decayMode: "α",      notes: "Longest-lived californium isotope. Fissile; highest known fission cross-section among actinides." },
    { symbol: "²⁴⁹Cf", name: "Californium-249", massNumber: 249, neutrons: 151, abundance: "Synthetic", halfLife: "351 years",    spin: "9/2", binding: 7.469, radioactive: true, decayMode: "α",      notes: "Available isotopically pure from ²⁴⁹Bk decay. Used in neutron activation analysis and nuclear research." },
    { symbol: "²⁵²Cf", name: "Californium-252", massNumber: 252, neutrons: 154, abundance: "Synthetic", halfLife: "2.645 years",  spin: "0",   binding: 7.461, radioactive: true, decayMode: "α, SF",  notes: "Most widely used californium isotope. Intense spontaneous-fission neutron source for well logging, cancer therapy, and reactor start-up." },
    { symbol: "²⁵⁰Cf", name: "Californium-250", massNumber: 250, neutrons: 152, abundance: "Synthetic", halfLife: "13.08 years",  spin: "0",   binding: 7.464, radioactive: true, decayMode: "α, SF",  notes: "Reactor-produced; used in nuclear physics and as an alpha source in research." },
    { symbol: "²⁴⁸Cf", name: "Californium-248", massNumber: 248, neutrons: 150, abundance: "Synthetic", halfLife: "333.5 days",   spin: "0",   binding: 7.473, radioactive: true, decayMode: "α, SF",  notes: "Produced by alpha bombardment of curium; building-block isotope in californium production chains." },
  ],
 
  99: [
    { symbol: "²⁵²Es", name: "Einsteinium-252", massNumber: 252, neutrons: 153, abundance: "Synthetic", halfLife: "471.7 days",   spin: "5",   binding: 7.437, radioactive: true, decayMode: "α, ε",   notes: "Longest-lived einsteinium isotope. Difficult to produce; only minute quantities available. Better suited for physical property studies than ²⁵³Es." },
    { symbol: "²⁵³Es", name: "Einsteinium-253", massNumber: 253, neutrons: 154, abundance: "Synthetic", halfLife: "20.47 days",   spin: "7/2", binding: 7.435, radioactive: true, decayMode: "α",      notes: "Most commonly studied einsteinium isotope. Produced in microgram quantities from californium decay in high-flux reactors. Discovered in debris of first thermonuclear test (Ivy Mike, 1952)." },
    { symbol: "²⁵⁴Es", name: "Einsteinium-254", massNumber: 254, neutrons: 155, abundance: "Synthetic", halfLife: "275.7 days",   spin: "7+",  binding: 7.430, radioactive: true, decayMode: "α, SF",  notes: "Second longest-lived einsteinium isotope; difficult to accumulate due to competing decay paths." },
    { symbol: "²⁵⁵Es", name: "Einsteinium-255", massNumber: 255, neutrons: 156, abundance: "Synthetic", halfLife: "39.8 days",    spin: "7/2", binding: 7.427, radioactive: true, decayMode: "β⁻, α",  notes: "Reactor-produced; used as a target material to synthesise heavier transuranic elements." },
  ],
 
  100: [
    { symbol: "²⁵⁷Fm", name: "Fermium-257",    massNumber: 257, neutrons: 157, abundance: "Synthetic", halfLife: "100.5 days",   spin: "9/2", binding: 7.404, radioactive: true, decayMode: "α, SF",  notes: "Most stable fermium isotope. The heaviest element whose isotopes can be produced in macroscopic quantities via neutron capture in high-flux reactors." },
    { symbol: "²⁵³Fm", name: "Fermium-253",    massNumber: 253, neutrons: 153, abundance: "Synthetic", halfLife: "3.00 days",    spin: "1/2", binding: 7.417, radioactive: true, decayMode: "ε, α",   notes: "Produced by decay of ²⁵³Es. Used in nuclear spectroscopy studies of heavy actinides." },
    { symbol: "²⁵⁵Fm", name: "Fermium-255",    massNumber: 255, neutrons: 155, abundance: "Synthetic", halfLife: "20.07 h",      spin: "7/2", binding: 7.408, radioactive: true, decayMode: "α",      notes: "Reactor-produced fermium isotope. Fission barrier studies relevant to the island of stability." },
    { symbol: "²⁵²Fm", name: "Fermium-252",    massNumber: 252, neutrons: 152, abundance: "Synthetic", halfLife: "25.39 h",      spin: "0",   binding: 7.413, radioactive: true, decayMode: "α, SF",  notes: "Discovered in thermonuclear test fallout; used to probe spontaneous fission systematics in the heavy actinides." },
  ],
 
  101: [
    { symbol: "²⁵⁸Md", name: "Mendelevium-258", massNumber: 258, neutrons: 157, abundance: "Synthetic", halfLife: "51.5 days",    spin: "8",   binding: 7.381, radioactive: true, decayMode: "ε, α",   notes: "Longest-lived mendelevium isotope. Named after Dmitri Mendeleev. First element synthesised one-atom-at-a-time (1955)." },
    { symbol: "²⁶⁰Md", name: "Mendelevium-260", massNumber: 260, neutrons: 159, abundance: "Synthetic", halfLife: "31.8 days",    spin: "—",   binding: 7.375, radioactive: true, decayMode: "SF, α, ε", notes: "Second longest-lived mendelevium isotope; notable spontaneous fission branch." },
    { symbol: "²⁵⁷Md", name: "Mendelevium-257", massNumber: 257, neutrons: 156, abundance: "Synthetic", halfLife: "5.52 h",       spin: "7/2", binding: 7.382, radioactive: true, decayMode: "ε, α",   notes: "Accelerator-produced; studied for nuclear energy-level spectroscopy of odd-A heavy nuclides." },
    { symbol: "²⁵⁶Md", name: "Mendelevium-256", massNumber: 256, neutrons: 155, abundance: "Synthetic", halfLife: "78.1 min",     spin: "—",   binding: 7.380, radioactive: true, decayMode: "ε",      notes: "First mendelevium isotope synthesised (1955, Berkeley); only 17 atoms produced in the initial experiment." },
  ],
 
  102: [
    { symbol: "²⁵⁹No", name: "Nobelium-259",   massNumber: 259, neutrons: 157, abundance: "Synthetic", halfLife: "58 min",       spin: "9/2", binding: 7.356, radioactive: true, decayMode: "α, ε, SF", notes: "Longest-lived nobelium isotope. Named after Alfred Nobel. Chemistry performed in aqueous solution." },
    { symbol: "²⁵⁵No", name: "Nobelium-255",   massNumber: 255, neutrons: 153, abundance: "Synthetic", halfLife: "3.1 min",      spin: "1/2", binding: 7.362, radioactive: true, decayMode: "α",      notes: "Most commonly used in chemistry experiments due to easier production scale despite shorter half-life." },
    { symbol: "²⁵⁸No", name: "Nobelium-258",   massNumber: 258, neutrons: 156, abundance: "Synthetic", halfLife: "1.2 ms",       spin: "0",   binding: 7.349, radioactive: true, decayMode: "SF",     notes: "Undergoes rapid spontaneous fission; one of the clearest examples of the even-even SF trend in No isotopes." },
    { symbol: "²⁵³No", name: "Nobelium-253",   massNumber: 253, neutrons: 151, abundance: "Synthetic", halfLife: "1.62 min",     spin: "9/2", binding: 7.364, radioactive: true, decayMode: "α, ε",   notes: "Produced in cyclotron bombardments; used to establish nobelium's +2 aqueous oxidation state chemistry." },
  ],
 
  103: [
    { symbol: "²⁶⁶Lr", name: "Lawrencium-266", massNumber: 266, neutrons: 163, abundance: "Synthetic", halfLife: "11 h",         spin: "—",   binding: 7.316, radioactive: true, decayMode: "α, SF",  notes: "Longest-lived lawrencium isotope. Named after Ernest O. Lawrence. Confirmed trivalent behaviour in aqueous chemistry." },
    { symbol: "²⁶⁰Lr", name: "Lawrencium-260", massNumber: 260, neutrons: 157, abundance: "Synthetic", halfLife: "2.7 min",      spin: "—",   binding: 7.328, radioactive: true, decayMode: "α",      notes: "Most commonly used in chemistry; larger production scale enables solution chemistry studies." },
    { symbol: "²⁶²Lr", name: "Lawrencium-262", massNumber: 262, neutrons: 159, abundance: "Synthetic", halfLife: "3.6 h",        spin: "—",   binding: 7.322, radioactive: true, decayMode: "SF, α",  notes: "Relatively long-lived; used to study lawrencium's position as the last actinide vs. first transition metal." },
    { symbol: "²⁵⁹Lr", name: "Lawrencium-259", massNumber: 259, neutrons: 156, abundance: "Synthetic", halfLife: "6.2 s",        spin: "—",   binding: 7.328, radioactive: true, decayMode: "α",      notes: "Produced by bombardment of californium with boron ions. Used in nuclear spectroscopy." },
  ],
 
  104: [
    { symbol: "²⁶⁷Rf", name: "Rutherfordium-267", massNumber: 267, neutrons: 163, abundance: "Synthetic", halfLife: "~48 min",    spin: "—",   binding: 7.280, radioactive: true, decayMode: "SF",     notes: "Longest-lived rutherfordium isotope. Named after Ernest Rutherford. Behaves chemically like hafnium (group 4)." },
    { symbol: "²⁶⁵Rf", name: "Rutherfordium-265", massNumber: 265, neutrons: 161, abundance: "Synthetic", halfLife: "~1.1 min",   spin: "—",   binding: 7.282, radioactive: true, decayMode: "SF",     notes: "Produced in decay chain of ²⁷³Ds and directly. Used in chemical separation studies." },
    { symbol: "²⁶³Rf", name: "Rutherfordium-263", massNumber: 263, neutrons: 159, abundance: "Synthetic", halfLife: "~11 min",    spin: "—",   binding: 7.282, radioactive: true, decayMode: "SF, α",  notes: "Observed in decay chain studies; nuclear structure near the deformed shell closure N=162." },
    { symbol: "²⁶¹Rf", name: "Rutherfordium-261", massNumber: 261, neutrons: 157, abundance: "Synthetic", halfLife: "68 s",       spin: "—",   binding: 7.285, radioactive: true, decayMode: "SF, α",  notes: "Among first rutherfordium isotopes studied in single-atom chemistry experiments." },
  ],
 
  105: [
    { symbol: "²⁶⁸Db", name: "Dubnium-268",    massNumber: 268, neutrons: 163, abundance: "Synthetic", halfLife: "16 h",         spin: "—",   binding: 7.253, radioactive: true, decayMode: "α, SF",  notes: "Longest-lived dubnium isotope. Named after Dubna, Russia. Appears in decay chain of ²⁸⁸Mc." },
    { symbol: "²⁶⁷Db", name: "Dubnium-267",    massNumber: 267, neutrons: 162, abundance: "Synthetic", halfLife: "1.4 h",        spin: "—",   binding: 7.254, radioactive: true, decayMode: "SF",     notes: "Second longest-lived dubnium isotope; observed in ²⁸⁷Mc decay chain." },
    { symbol: "²⁶³Db", name: "Dubnium-263",    massNumber: 263, neutrons: 158, abundance: "Synthetic", halfLife: "~27 s",        spin: "—",   binding: 7.255, radioactive: true, decayMode: "SF, α",  notes: "Produced in ²⁷¹Bh decay chain; used in eluting chromatography studies of dubnium chemistry." },
    { symbol: "²⁶²Db", name: "Dubnium-262",    massNumber: 262, neutrons: 157, abundance: "Synthetic", halfLife: "34 s",         spin: "—",   binding: 7.254, radioactive: true, decayMode: "SF, α",  notes: "Directly synthesised; among the first dubnium isotopes characterised chemically, showing group-5 behaviour." },
  ],
 
  106: [
    { symbol: "²⁷¹Sg", name: "Seaborgium-271", massNumber: 271, neutrons: 165, abundance: "Synthetic", halfLife: "~2.4 min",     spin: "—",   binding: 7.224, radioactive: true, decayMode: "α",      notes: "Longest-lived seaborgium isotope. Named after Glenn T. Seaborg. Confirmed as a group-6 congener of tungsten." },
    { symbol: "²⁶⁹Sg", name: "Seaborgium-269", massNumber: 269, neutrons: 163, abundance: "Synthetic", halfLife: "~3.1 min",     spin: "—",   binding: 7.225, radioactive: true, decayMode: "α",      notes: "Appears in ²⁸⁵Fl decay chain; contributes to knowledge of the N=163 deformed shell." },
    { symbol: "²⁶⁵Sg", name: "Seaborgium-265", massNumber: 265, neutrons: 159, abundance: "Synthetic", halfLife: "~8.9 s",       spin: "—",   binding: 7.224, radioactive: true, decayMode: "α",      notes: "Used in on-line chemical separation experiments confirming seaborgium's group-6 periodic table placement." },
    { symbol: "²⁶³Sg", name: "Seaborgium-263", massNumber: 263, neutrons: 157, abundance: "Synthetic", halfLife: "~0.9 s",       spin: "—",   binding: 7.222, radioactive: true, decayMode: "SF",     notes: "Early isotope used in seaborgium discovery verification at LBNL and GSI." },
  ],
 
  107: [
    { symbol: "²⁶⁷Bh", name: "Bohrium-267",    massNumber: 267, neutrons: 160, abundance: "Synthetic", halfLife: "~17 s",        spin: "—",   binding: 7.203, radioactive: true, decayMode: "α",      notes: "Longest-lived bohrium isotope. Named after Niels Bohr. First synthesised at GSI, Darmstadt (1981)." },
    { symbol: "²⁷⁰Bh", name: "Bohrium-270",    massNumber: 270, neutrons: 163, abundance: "Synthetic", halfLife: "~61 s",        spin: "—",   binding: 7.205, radioactive: true, decayMode: "α",      notes: "Produced in the ²⁷⁸Nh decay chain; one of the longer-lived bohrium isotopes known." },
    { symbol: "²⁶⁵Bh", name: "Bohrium-265",    massNumber: 265, neutrons: 158, abundance: "Synthetic", halfLife: "~0.9 s",       spin: "—",   binding: 7.200, radioactive: true, decayMode: "α",      notes: "Used in chemical studies verifying bohrium's group-7 (rhenium homolog) periodic table behaviour." },
    { symbol: "²⁶⁴Bh", name: "Bohrium-264",    massNumber: 264, neutrons: 157, abundance: "Synthetic", halfLife: "~0.97 s",      spin: "—",   binding: 7.198, radioactive: true, decayMode: "α",      notes: "Early directly synthesised bohrium isotope; nuclear spectroscopy target." },
  ],
 
  108: [
    { symbol: "²⁷⁷Hs", name: "Hassium-277",    massNumber: 277, neutrons: 169, abundance: "Synthetic", halfLife: "~12 min",      spin: "—",   binding: 7.169, radioactive: true, decayMode: "α",      notes: "Longest-lived known hassium isotope. Named after Hesse, Germany. Appears in decay chain of ²⁸⁵Fl." },
    { symbol: "²⁶⁹Hs", name: "Hassium-269",    massNumber: 269, neutrons: 161, abundance: "Synthetic", halfLife: "~9.7 s",       spin: "—",   binding: 7.170, radioactive: true, decayMode: "α",      notes: "First synthesised at GSI (1984). Chemical studies confirmed hassium's group-8 (osmium homolog) behaviour." },
    { symbol: "²⁷⁰Hs", name: "Hassium-270",    massNumber: 270, neutrons: 162, abundance: "Synthetic", halfLife: "~3.6 s",       spin: "0",   binding: 7.172, radioactive: true, decayMode: "α",      notes: "Produced from ²⁷⁸Nh decay chain and directly. Doubly magic-adjacent even-even nucleus studied for shell effects." },
    { symbol: "²⁷¹Hs", name: "Hassium-271",    massNumber: 271, neutrons: 163, abundance: "Synthetic", halfLife: "~4 s",         spin: "—",   binding: 7.169, radioactive: true, decayMode: "α",      notes: "Odd-A hassium isotope; nuclear level structure studied in decay spectroscopy experiments." },
  ],
 
  109: [
    { symbol: "²⁷⁶Mt", name: "Meitnerium-276", massNumber: 276, neutrons: 167, abundance: "Synthetic", halfLife: "~0.72 s",      spin: "—",   binding: 7.140, radioactive: true, decayMode: "α",      notes: "Longest-lived meitnerium isotope. Named after Lise Meitner. First synthesised at GSI (1982). No chemistry performed due to very short half-lives." },
    { symbol: "²⁷⁸Mt", name: "Meitnerium-278", massNumber: 278, neutrons: 169, abundance: "Synthetic", halfLife: "~4.5 s",       spin: "—",   binding: 7.140, radioactive: true, decayMode: "α",      notes: "Observed in ²⁸⁶Cn and ²⁹⁴Og decay chains; among the more accessible meitnerium isotopes for study." },
    { symbol: "²⁷⁴Mt", name: "Meitnerium-274", massNumber: 274, neutrons: 165, abundance: "Synthetic", halfLife: "~0.44 s",      spin: "—",   binding: 7.136, radioactive: true, decayMode: "α",      notes: "Directly synthesised and observed in decay chains of heavier superheavy elements." },
  ],
 
  110: [
    { symbol: "²⁸¹Ds", name: "Darmstadtium-281", massNumber: 281, neutrons: 171, abundance: "Synthetic", halfLife: "~11.1 s",    spin: "—",   binding: 7.112, radioactive: true, decayMode: "SF, α",  notes: "Longest-lived darmstadtium isotope. Named after Darmstadt, Germany. First synthesised at GSI (1994). Group-10 congener of platinum." },
    { symbol: "²⁷⁹Ds", name: "Darmstadtium-279", massNumber: 279, neutrons: 169, abundance: "Synthetic", halfLife: "~0.18 s",    spin: "—",   binding: 7.108, radioactive: true, decayMode: "α",      notes: "Produced in direct synthesis and in ²⁸⁷Mc decay. Studied in nuclear decay spectroscopy." },
    { symbol: "²⁷⁷Ds", name: "Darmstadtium-277", massNumber: 277, neutrons: 167, abundance: "Synthetic", halfLife: "~3.5 ms",    spin: "—",   binding: 7.105, radioactive: true, decayMode: "α",      notes: "Early directly synthesised Ds isotope from Ni + Pb fusion reactions at GSI." },
  ],
 
  111: [
    { symbol: "²⁸¹Rg", name: "Roentgenium-281", massNumber: 281, neutrons: 170, abundance: "Synthetic", halfLife: "~26 s",       spin: "—",   binding: 7.085, radioactive: true, decayMode: "α",      notes: "Longest-lived roentgenium isotope. Named after Wilhelm Röntgen. First synthesised at GSI (1994). Group-11 congener of gold." },
    { symbol: "²⁸³Rg", name: "Roentgenium-283", massNumber: 283, neutrons: 172, abundance: "Synthetic", halfLife: "~5.1 s",      spin: "—",   binding: 7.088, radioactive: true, decayMode: "α",      notes: "Observed in ²⁹¹Mc and ²⁸⁷Nh decay chains. Contributes to nuclear structure knowledge at N=172." },
    { symbol: "²⁷⁹Rg", name: "Roentgenium-279", massNumber: 279, neutrons: 168, abundance: "Synthetic", halfLife: "~0.17 s",     spin: "—",   binding: 7.080, radioactive: true, decayMode: "α",      notes: "Directly synthesised from Bi + Ni bombardments; among the first Rg isotopes characterised." },
  ],
 
  112: [
    { symbol: "²⁸⁵Cn", name: "Copernicium-285", massNumber: 285, neutrons: 173, abundance: "Synthetic", halfLife: "~29 s",       spin: "—",   binding: 7.062, radioactive: true, decayMode: "α",      notes: "Longest-lived copernicium isotope. Named after Nicolaus Copernicus. First synthesised at GSI (1996). Predicted to behave like a noble gas due to relativistic effects." },
    { symbol: "²⁸³Cn", name: "Copernicium-283", massNumber: 283, neutrons: 171, abundance: "Synthetic", halfLife: "~4 s",        spin: "—",   binding: 7.059, radioactive: true, decayMode: "α, SF",  notes: "Appears in ²⁹¹Mc decay chain. Used in gas-phase adsorption experiments probing Cn's noble-gas-like character." },
    { symbol: "²⁸⁶Cn", name: "Copernicium-286", massNumber: 286, neutrons: 174, abundance: "Synthetic", halfLife: "~8.45 s",     spin: "0",   binding: 7.063, radioactive: true, decayMode: "SF",     notes: "Even-even isotope; dominantly undergoes spontaneous fission. Important for understanding shell closures." },
  ],
 
  113: [
    { symbol: "²⁸⁴Nh", name: "Nihonium-284",   massNumber: 284, neutrons: 171, abundance: "Synthetic", halfLife: "~0.48 s",     spin: "—",   binding: 7.034, radioactive: true, decayMode: "α",      notes: "Longest-lived nihonium isotope. Named after Japan (Nihon). First synthesised at RIKEN, Japan (2004). Officially confirmed element 113." },
    { symbol: "²⁸⁶Nh", name: "Nihonium-286",   massNumber: 286, neutrons: 173, abundance: "Synthetic", halfLife: "~9.5 s",      spin: "—",   binding: 7.038, radioactive: true, decayMode: "α",      notes: "Produced in ²⁹⁴Ts decay chain. Longer-lived than directly synthesised Nh isotopes." },
    { symbol: "²⁸²Nh", name: "Nihonium-282",   massNumber: 282, neutrons: 169, abundance: "Synthetic", halfLife: "~73 ms",      spin: "—",   binding: 7.030, radioactive: true, decayMode: "α",      notes: "Directly synthesised; used to establish the discovery claim of element 113 at RIKEN." },
  ],
 
  114: [
    { symbol: "²⁸⁹Fl", name: "Flerovium-289",  massNumber: 289, neutrons: 175, abundance: "Synthetic", halfLife: "~2.65 s",     spin: "—",   binding: 7.016, radioactive: true, decayMode: "α",      notes: "Longest-lived flerovium isotope. Named after Flerov Laboratory, Dubna. First synthesised 1999. Predicted island-of-stability candidate near Z=114, N=184." },
    { symbol: "²⁸⁷Fl", name: "Flerovium-287",  massNumber: 287, neutrons: 173, abundance: "Synthetic", halfLife: "~0.51 s",     spin: "—",   binding: 7.012, radioactive: true, decayMode: "α",      notes: "Produced in ²⁹⁵Mc decay chain. Gas-phase chemistry experiments attempted to probe Fl's chemical properties." },
    { symbol: "²⁸⁵Fl", name: "Flerovium-285",  massNumber: 285, neutrons: 171, abundance: "Synthetic", halfLife: "~0.10 s",     spin: "—",   binding: 7.008, radioactive: true, decayMode: "α",      notes: "Directly synthesised; among the first flerovium isotopes fully characterised in decay-chain studies." },
    { symbol: "²⁸⁸Fl", name: "Flerovium-288",  massNumber: 288, neutrons: 174, abundance: "Synthetic", halfLife: "~0.69 s",     spin: "0",   binding: 7.013, radioactive: true, decayMode: "α",      notes: "Even-even isotope; studied in the context of Z=114 proton shell closure predictions." },
  ],
 
  115: [
    { symbol: "²⁸⁹Mc", name: "Moscovium-289",  massNumber: 289, neutrons: 174, abundance: "Synthetic", halfLife: "~87 ms",      spin: "—",   binding: 6.988, radioactive: true, decayMode: "α",      notes: "Longest-lived moscovium isotope. Named after Moscow Oblast. First synthesised at FLNR, Dubna (2003). Confirmed by IUPAC 2016." },
    { symbol: "²⁹⁰Mc", name: "Moscovium-290",  massNumber: 290, neutrons: 175, abundance: "Synthetic", halfLife: "~16 ms",      spin: "—",   binding: 6.990, radioactive: true, decayMode: "α",      notes: "Produced by ²⁴⁸Cm + ⁴⁸Ca reactions. Contributes to the characterisation of the heaviest known odd-Z elements." },
    { symbol: "²⁸⁷Mc", name: "Moscovium-287",  massNumber: 287, neutrons: 172, abundance: "Synthetic", halfLife: "~37 ms",      spin: "—",   binding: 6.984, radioactive: true, decayMode: "α",      notes: "Observed in several heavy-element bombardment experiments. Decay chain passes through Nh and Rg isotopes." },
    { symbol: "²⁸⁸Mc", name: "Moscovium-288",  massNumber: 288, neutrons: 173, abundance: "Synthetic", halfLife: "~164 ms",     spin: "—",   binding: 6.986, radioactive: true, decayMode: "α",      notes: "Synthesised at FLNR and GSI; feeds into ²⁸⁴Nh and beyond in the Mc decay chain." },
  ],
 
  116: [
    { symbol: "²⁹³Lv", name: "Livermorium-293", massNumber: 293, neutrons: 177, abundance: "Synthetic", halfLife: "~57 ms",      spin: "—",   binding: 6.965, radioactive: true, decayMode: "α",      notes: "Longest-lived livermorium isotope. Named after Lawrence Livermore National Laboratory. First synthesised at FLNR (2000). Confirmed by IUPAC 2012." },
    { symbol: "²⁹¹Lv", name: "Livermorium-291", massNumber: 291, neutrons: 175, abundance: "Synthetic", halfLife: "~19 ms",      spin: "—",   binding: 6.961, radioactive: true, decayMode: "α",      notes: "Produced in ²⁴⁸Cm + ⁴⁸Ca bombardments; probes nuclear structure near Z=114 and N=172 shell gaps." },
    { symbol: "²⁹²Lv", name: "Livermorium-292", massNumber: 292, neutrons: 176, abundance: "Synthetic", halfLife: "~18 ms",      spin: "0",   binding: 6.962, radioactive: true, decayMode: "α",      notes: "Even-even isotope; its relatively fast alpha decay tests theoretical predictions of Z=114 shell closure." },
    { symbol: "²⁹⁰Lv", name: "Livermorium-290", massNumber: 290, neutrons: 174, abundance: "Synthetic", halfLife: "~8 ms",       spin: "0",   binding: 6.959, radioactive: true, decayMode: "α",      notes: "Observed in ²⁹⁸Og decay chain experiments at Dubna and GSI." },
  ],
 
  117: [
    { symbol: "²⁹⁴Ts", name: "Tennessine-294",  massNumber: 294, neutrons: 177, abundance: "Synthetic", halfLife: "~51 ms",      spin: "—",   binding: 6.944, radioactive: true, decayMode: "α",      notes: "Longest-lived tennessine isotope. Named after Tennessee. First synthesised at FLNR, Dubna using ²⁴⁹Bk target (2010). Confirmed by IUPAC 2016." },
    { symbol: "²⁹³Ts", name: "Tennessine-293",  massNumber: 293, neutrons: 176, abundance: "Synthetic", halfLife: "~14 ms",      spin: "—",   binding: 6.942, radioactive: true, decayMode: "α",      notes: "Second tennessine isotope characterised; produced from ²⁴⁹Bk + ⁴⁸Ca bombardments alongside ²⁹⁴Ts." },
  ],
 
  118: [
    { symbol: "²⁹⁴Og", name: "Oganesson-294",   massNumber: 294, neutrons: 176, abundance: "Synthetic", halfLife: "~0.69 ms",    spin: "0",   binding: 6.921, radioactive: true, decayMode: "α",      notes: "Only known oganesson isotope with confirmed observations. Named after Yuri Oganessian. First synthesised at FLNR, Dubna (2002). Heaviest and last element in the periodic table. Predicted to have unusual noble-gas-like or possibly solid properties due to extreme relativistic effects." },
  ],
};