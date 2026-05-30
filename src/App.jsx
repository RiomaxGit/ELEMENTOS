import { useState, useEffect, useRef, useCallback } from "react";

const ELEMENTS = [
  { number: 1, symbol: "H", name: "Hydrogen", mass: 1.008, group: 1, period: 1, category: "nonmetal", electronegativity: 2.20, radius: 53, meltingPoint: -259.16, boilingPoint: -252.88, density: 0.00009, oxidationStates: "+1, -1", electronConfig: "1s¹", discovered: 1766, discoveredBy: "Henry Cavendish", phase: "Gas", ionizationEnergy: 13.598, electronAffinity: 0.754, valence: 1, abundance: "0.15%", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "hexagonal", protons: 1, neutrons: 0, electrons: 1, shells: [1], xpos: 1, ypos: 1, description: "The lightest and most abundant element in the universe, forming stars and water.", uses: "Rocket fuel, hydrogen fuel cells, petroleum refining, ammonia production", funFact: "A single teaspoon of neutron star material would weigh about 10 million tons — yet hydrogen makes up 75% of all normal matter." },
  { number: 2, symbol: "He", name: "Helium", mass: 4.003, group: 18, period: 1, category: "noble gas", electronegativity: null, radius: 31, meltingPoint: -272.2, boilingPoint: -268.93, density: 0.000179, oxidationStates: "0", electronConfig: "1s²", discovered: 1868, discoveredBy: "Pierre Janssen", phase: "Gas", ionizationEnergy: 24.587, electronAffinity: 0, valence: 0, abundance: "24%", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "hexagonal", protons: 2, neutrons: 2, electrons: 2, shells: [2], xpos: 18, ypos: 1, description: "Second most abundant element in the universe. Used in balloons and MRI machines.", uses: "MRI machines, balloons, deep-sea diving mixtures, cryogenics", funFact: "Helium was discovered on the Sun before it was found on Earth — its name comes from Helios, the Greek god of the Sun." },
  { number: 3, symbol: "Li", name: "Lithium", mass: 6.941, group: 1, period: 2, category: "alkali metal", electronegativity: 0.98, radius: 167, meltingPoint: 180.54, boilingPoint: 1342, density: 0.534, oxidationStates: "+1", electronConfig: "[He] 2s¹", discovered: 1817, discoveredBy: "Johan August Arfwedson", phase: "Solid", ionizationEnergy: 5.392, electronAffinity: 0.618, valence: 1, abundance: "0.002%", hardness: 0.6, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "bcc", protons: 3, neutrons: 4, electrons: 3, shells: [2, 1], xpos: 1, ypos: 2, description: "Lightest metal, crucial for lithium-ion batteries and psychiatric medication.", uses: "Batteries, mood-stabilizing drugs, glass ceramics, lubricants", funFact: "Lithium is so light it can float on water — and it's soft enough to be cut with a kitchen knife." },
  { number: 4, symbol: "Be", name: "Beryllium", mass: 9.012, group: 2, period: 2, category: "alkaline earth metal", electronegativity: 1.57, radius: 112, meltingPoint: 1287, boilingPoint: 2469, density: 1.85, oxidationStates: "+2", electronConfig: "[He] 2s²", discovered: 1798, discoveredBy: "Louis Nicolas Vauquelin", phase: "Solid", ionizationEnergy: 9.323, electronAffinity: 0, valence: 2, abundance: "0.00019%", hardness: 5.5, conductivity: "good", magnetism: "diamagnetic", crystalStructure: "hcp", protons: 4, neutrons: 5, electrons: 4, shells: [2, 2], xpos: 2, ypos: 2, description: "Lightweight, stiff metal used in aerospace and X-ray windows. Highly toxic.", uses: "Aerospace components, X-ray windows, nuclear reactors, springs", funFact: "Beryllium is transparent to X-rays and so stiff for its weight that it's used in spacecraft and missile guidance systems." },
  { number: 5, symbol: "B", name: "Boron", mass: 10.81, group: 13, period: 2, category: "metalloid", electronegativity: 2.04, radius: 87, meltingPoint: 2075, boilingPoint: 4000, density: 2.34, oxidationStates: "+3", electronConfig: "[He] 2s² 2p¹", discovered: 1808, discoveredBy: "Joseph Louis Gay-Lussac", phase: "Solid", ionizationEnergy: 8.298, electronAffinity: 0.277, valence: 3, abundance: "0.001%", hardness: 9.5, conductivity: "semiconductor", magnetism: "diamagnetic", crystalStructure: "rhombohedral", protons: 5, neutrons: 6, electrons: 5, shells: [2, 3], xpos: 13, ypos: 2, description: "A metalloid essential to plant growth and used in borosilicate glass.", uses: "Borosilicate glass, detergents, insecticides, semiconductors", funFact: "Boron is one of the hardest elements — boron carbide armor is used to protect military vehicles and helicopters." },
  { number: 6, symbol: "C", name: "Carbon", mass: 12.011, group: 14, period: 2, category: "nonmetal", electronegativity: 2.55, radius: 77, meltingPoint: 3550, boilingPoint: 4827, density: 2.267, oxidationStates: "+4, +2, -4", electronConfig: "[He] 2s² 2p²", discovered: -3000, discoveredBy: "Ancient civilizations", phase: "Solid", ionizationEnergy: 11.26, electronAffinity: 1.263, valence: 4, abundance: "0.02%", hardness: 10, conductivity: "variable", magnetism: "diamagnetic", crystalStructure: "hexagonal", protons: 6, neutrons: 6, electrons: 6, shells: [2, 4], xpos: 14, ypos: 2, description: "The basis of all organic life. Exists as diamond, graphite, and buckyballs.", uses: "Steel production, plastics, fuels, electronics, biology", funFact: "Diamond and graphite are both pure carbon — yet diamond is the hardest natural substance while graphite is soft enough to write with." },
  { number: 7, symbol: "N", name: "Nitrogen", mass: 14.007, group: 15, period: 2, category: "nonmetal", electronegativity: 3.04, radius: 75, meltingPoint: -210.01, boilingPoint: -195.79, density: 0.00125, oxidationStates: "+5, +3, +2, +1, -1, -3", electronConfig: "[He] 2s² 2p³", discovered: 1772, discoveredBy: "Daniel Rutherford", phase: "Gas", ionizationEnergy: 14.534, electronAffinity: 0, valence: 3, abundance: "78% (air)", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "hexagonal", protons: 7, neutrons: 7, electrons: 7, shells: [2, 5], xpos: 15, ypos: 2, description: "Makes up 78% of Earth's atmosphere. Essential for amino acids and DNA.", uses: "Fertilizers, explosives, food preservation, cryogenics", funFact: "The nitrogen in your body was forged in ancient supernovae billions of years ago before the Earth formed." },
  { number: 8, symbol: "O", name: "Oxygen", mass: 15.999, group: 16, period: 2, category: "nonmetal", electronegativity: 3.44, radius: 73, meltingPoint: -218.79, boilingPoint: -182.96, density: 0.00143, oxidationStates: "-2, -1", electronConfig: "[He] 2s² 2p⁴", discovered: 1774, discoveredBy: "Carl Wilhelm Scheele", phase: "Gas", ionizationEnergy: 13.618, electronAffinity: 1.461, valence: 2, abundance: "46%", hardness: null, conductivity: "poor", magnetism: "paramagnetic", crystalStructure: "cubic", protons: 8, neutrons: 8, electrons: 8, shells: [2, 6], xpos: 16, ypos: 2, description: "Essential for most life on Earth. Third most abundant element in the universe.", uses: "Respiration, steel production, rocket propellant, medical oxygen", funFact: "Liquid oxygen is pale blue and is strongly attracted to magnets — it's paramagnetic, unlike most gases." },
  { number: 9, symbol: "F", name: "Fluorine", mass: 18.998, group: 17, period: 2, category: "halogen", electronegativity: 3.98, radius: 64, meltingPoint: -219.67, boilingPoint: -188.11, density: 0.00169, oxidationStates: "-1", electronConfig: "[He] 2s² 2p⁵", discovered: 1886, discoveredBy: "Henri Moissan", phase: "Gas", ionizationEnergy: 17.423, electronAffinity: 3.401, valence: 1, abundance: "0.054%", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "monoclinic", protons: 9, neutrons: 10, electrons: 9, shells: [2, 7], xpos: 17, ypos: 2, description: "Most electronegative and reactive element. Used in toothpaste and Teflon.", uses: "Toothpaste, Teflon, refrigerants, uranium enrichment", funFact: "Fluorine is so reactive it can burn glass and set asbestos on fire. It took decades to isolate it safely." },
  { number: 10, symbol: "Ne", name: "Neon", mass: 20.18, group: 18, period: 2, category: "noble gas", electronegativity: null, radius: 58, meltingPoint: -248.59, boilingPoint: -246.05, density: 0.0009, oxidationStates: "0", electronConfig: "[He] 2s² 2p⁶", discovered: 1898, discoveredBy: "William Ramsay", phase: "Gas", ionizationEnergy: 21.565, electronAffinity: 0, valence: 0, abundance: "0.0018%", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "fcc", protons: 10, neutrons: 10, electrons: 10, shells: [2, 8], xpos: 18, ypos: 2, description: "Noble gas famous for its brilliant orange-red glow in neon signs.", uses: "Neon signs, lasers, cryogenics, television tubes", funFact: "Despite being the fourth most abundant element in the universe, neon is rarer than gold in the Earth's atmosphere." },
  { number: 11, symbol: "Na", name: "Sodium", mass: 22.99, group: 1, period: 3, category: "alkali metal", electronegativity: 0.93, radius: 186, meltingPoint: 97.72, boilingPoint: 883, density: 0.968, oxidationStates: "+1", electronConfig: "[Ne] 3s¹", discovered: 1807, discoveredBy: "Humphry Davy", phase: "Solid", ionizationEnergy: 5.139, electronAffinity: 0.548, valence: 1, abundance: "2.6%", hardness: 0.5, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "bcc", protons: 11, neutrons: 12, electrons: 11, shells: [2, 8, 1], xpos: 1, ypos: 3, description: "A soft, silvery metal that reacts violently with water. Essential for life.", uses: "Table salt, streetlights, soap making, nerve function", funFact: "Sodium burns with a brilliant yellow flame — that's why streetlights glow orange-yellow." },
  { number: 12, symbol: "Mg", name: "Magnesium", mass: 24.305, group: 2, period: 3, category: "alkaline earth metal", electronegativity: 1.31, radius: 160, meltingPoint: 650, boilingPoint: 1091, density: 1.738, oxidationStates: "+2", electronConfig: "[Ne] 3s²", discovered: 1755, discoveredBy: "Joseph Black", phase: "Solid", ionizationEnergy: 7.646, electronAffinity: 0, valence: 2, abundance: "2.1%", hardness: 2.5, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 12, neutrons: 12, electrons: 12, shells: [2, 8, 2], xpos: 2, ypos: 3, description: "Lightweight structural metal. The central atom in chlorophyll.", uses: "Alloys, fireworks, flares, chlorophyll, antacids", funFact: "Magnesium is the atom at the center of every chlorophyll molecule — it's what makes plants green and enables photosynthesis." },
  { number: 13, symbol: "Al", name: "Aluminum", mass: 26.982, group: 13, period: 3, category: "post-transition metal", electronegativity: 1.61, radius: 143, meltingPoint: 660.32, boilingPoint: 2519, density: 2.7, oxidationStates: "+3", electronConfig: "[Ne] 3s² 3p¹", discovered: 1825, discoveredBy: "Hans Christian Oersted", phase: "Solid", ionizationEnergy: 5.986, electronAffinity: 0.441, valence: 3, abundance: "8.1%", hardness: 2.75, conductivity: "excellent", magnetism: "paramagnetic", crystalStructure: "fcc", protons: 13, neutrons: 14, electrons: 13, shells: [2, 8, 3], xpos: 13, ypos: 3, description: "Most abundant metal in Earth's crust. Lightweight and corrosion-resistant.", uses: "Aircraft, packaging, construction, electronics, cookware", funFact: "In the 1800s, aluminum was more valuable than gold — the Washington Monument was capped with it as a sign of ultimate luxury." },
  { number: 14, symbol: "Si", name: "Silicon", mass: 28.085, group: 14, period: 3, category: "metalloid", electronegativity: 1.9, radius: 117, meltingPoint: 1414, boilingPoint: 3265, density: 2.33, oxidationStates: "+4, -4", electronConfig: "[Ne] 3s² 3p²", discovered: 1824, discoveredBy: "Jöns Jacob Berzelius", phase: "Solid", ionizationEnergy: 8.152, electronAffinity: 1.385, valence: 4, abundance: "28%", hardness: 7, conductivity: "semiconductor", magnetism: "diamagnetic", crystalStructure: "diamond cubic", protons: 14, neutrons: 14, electrons: 14, shells: [2, 8, 4], xpos: 14, ypos: 3, description: "The backbone of modern electronics and computing. Second most abundant in crust.", uses: "Computer chips, solar cells, glass, concrete, silicones", funFact: "Silicon Valley is named after silicon — the element that makes up virtually every transistor in every computer chip ever made." },
  { number: 15, symbol: "P", name: "Phosphorus", mass: 30.974, group: 15, period: 3, category: "nonmetal", electronegativity: 2.19, radius: 110, meltingPoint: 44.15, boilingPoint: 280.5, density: 1.82, oxidationStates: "+5, +3, +1, -3", electronConfig: "[Ne] 3s² 3p³", discovered: 1669, discoveredBy: "Hennig Brand", phase: "Solid", ionizationEnergy: 10.486, electronAffinity: 0.746, valence: 5, abundance: "0.099%", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "triclinic", protons: 15, neutrons: 16, electrons: 15, shells: [2, 8, 5], xpos: 15, ypos: 3, description: "Essential for DNA and ATP energy molecules. White phosphorus glows in the dark.", uses: "Fertilizers, matches, detergents, DNA backbone, nerve agents", funFact: "Phosphorus was first discovered by boiling down 60 buckets of urine — the alchemist Hennig Brand was searching for the philosopher's stone." },
  { number: 16, symbol: "S", name: "Sulfur", mass: 32.06, group: 16, period: 3, category: "nonmetal", electronegativity: 2.58, radius: 103, meltingPoint: 115.21, boilingPoint: 444.72, density: 2.067, oxidationStates: "+6, +4, +2, -2", electronConfig: "[Ne] 3s² 3p⁴", discovered: -2000, discoveredBy: "Ancient civilizations", phase: "Solid", ionizationEnergy: 10.36, electronAffinity: 2.077, valence: 2, abundance: "0.042%", hardness: 2, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "orthorhombic", protons: 16, neutrons: 16, electrons: 16, shells: [2, 8, 6], xpos: 16, ypos: 3, description: "Bright yellow nonmetal. The smell of volcanoes and rotten eggs. Vital to life.", uses: "Sulfuric acid, rubber vulcanization, fungicides, gunpowder", funFact: "Sulfuric acid is the most produced industrial chemical in the world — over 200 million tonnes per year." },
  { number: 17, symbol: "Cl", name: "Chlorine", mass: 35.45, group: 17, period: 3, category: "halogen", electronegativity: 3.16, radius: 99, meltingPoint: -101.5, boilingPoint: -34.04, density: 0.00321, oxidationStates: "+7, +5, +3, +1, -1", electronConfig: "[Ne] 3s² 3p⁵", discovered: 1774, discoveredBy: "Carl Wilhelm Scheele", phase: "Gas", ionizationEnergy: 12.968, electronAffinity: 3.617, valence: 1, abundance: "0.017%", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "orthorhombic", protons: 17, neutrons: 18, electrons: 17, shells: [2, 8, 7], xpos: 17, ypos: 3, description: "Greenish-yellow toxic gas. Used in water purification and PVC production.", uses: "Water purification, PVC, bleach, pharmaceuticals", funFact: "The smell of a swimming pool isn't chlorine — it's chloramines formed when chlorine reacts with human waste in the water." },
  { number: 18, symbol: "Ar", name: "Argon", mass: 39.948, group: 18, period: 3, category: "noble gas", electronegativity: null, radius: 71, meltingPoint: -189.34, boilingPoint: -185.85, density: 0.00178, oxidationStates: "0", electronConfig: "[Ne] 3s² 3p⁶", discovered: 1894, discoveredBy: "Lord Rayleigh", phase: "Gas", ionizationEnergy: 15.76, electronAffinity: 0, valence: 0, abundance: "0.93%", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "fcc", protons: 18, neutrons: 22, electrons: 18, shells: [2, 8, 8], xpos: 18, ypos: 3, description: "Third most abundant gas in Earth's atmosphere. Completely inert.", uses: "Welding shield gas, incandescent bulbs, wine preservation", funFact: "Every breath you take contains about 1% argon — and some of those argon atoms were breathed by Julius Caesar." },
  { number: 19, symbol: "K", name: "Potassium", mass: 39.098, group: 1, period: 4, category: "alkali metal", electronegativity: 0.82, radius: 227, meltingPoint: 63.38, boilingPoint: 759, density: 0.862, oxidationStates: "+1", electronConfig: "[Ar] 4s¹", discovered: 1807, discoveredBy: "Humphry Davy", phase: "Solid", ionizationEnergy: 4.341, electronAffinity: 0.501, valence: 1, abundance: "2.6%", hardness: 0.4, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "bcc", protons: 19, neutrons: 20, electrons: 19, shells: [2, 8, 8, 1], xpos: 1, ypos: 4, description: "Vital for nerve signals and muscle contractions. Symbol K from Latin Kalium.", uses: "Fertilizers, gunpowder, soap, nerve function, food", funFact: "Bananas are radioactive — they contain potassium-40, a naturally occurring radioactive isotope. But you'd need to eat 10 million bananas to get a harmful dose." },
  { number: 20, symbol: "Ca", name: "Calcium", mass: 40.078, group: 2, period: 4, category: "alkaline earth metal", electronegativity: 1.0, radius: 197, meltingPoint: 842, boilingPoint: 1484, density: 1.54, oxidationStates: "+2", electronConfig: "[Ar] 4s²", discovered: 1808, discoveredBy: "Humphry Davy", phase: "Solid", ionizationEnergy: 6.113, electronAffinity: 0.018, valence: 2, abundance: "4.1%", hardness: 1.75, conductivity: "good", magnetism: "diamagnetic", crystalStructure: "fcc", protons: 20, neutrons: 20, electrons: 20, shells: [2, 8, 8, 2], xpos: 2, ypos: 4, description: "Most abundant metal in the human body. Essential for bones, teeth, and muscles.", uses: "Cement, bones, cheese making, antacids, plaster", funFact: "The human body contains about 1 kilogram of calcium — enough to make a large piece of chalk." },
  { number: 21, symbol: "Sc", name: "Scandium", mass: 44.956, group: 3, period: 4, category: "transition metal", electronegativity: 1.36, radius: 162, meltingPoint: 1541, boilingPoint: 2836, density: 2.985, oxidationStates: "+3", electronConfig: "[Ar] 3d¹ 4s²", discovered: 1879, discoveredBy: "Lars Fredrik Nilson", phase: "Solid", ionizationEnergy: 6.561, electronAffinity: 0.188, valence: 3, abundance: "0.0026%", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 21, neutrons: 24, electrons: 21, shells: [2, 8, 9, 2], xpos: 3, ypos: 4, description: "Rare, silvery transition metal. Predicted by Mendeleev before its discovery.", uses: "Aerospace alloys, sports equipment, high-intensity lamps", funFact: "Scandium was one of the elements predicted by Mendeleev's periodic table before it was discovered — confirming the table's power." },
  { number: 22, symbol: "Ti", name: "Titanium", mass: 47.867, group: 4, period: 4, category: "transition metal", electronegativity: 1.54, radius: 147, meltingPoint: 1668, boilingPoint: 3287, density: 4.507, oxidationStates: "+4, +3, +2", electronConfig: "[Ar] 3d² 4s²", discovered: 1791, discoveredBy: "William Gregor", phase: "Solid", ionizationEnergy: 6.828, electronAffinity: 0.079, valence: 4, abundance: "0.66%", hardness: 6, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 22, neutrons: 26, electrons: 22, shells: [2, 8, 10, 2], xpos: 4, ypos: 4, description: "Strong, lightweight, corrosion-resistant metal used in aerospace and medicine.", uses: "Aircraft, spacecraft, medical implants, white pigment (TiO₂)", funFact: "Titanium is biocompatible — the human body won't reject it, making it ideal for replacement hips, knees, and dental implants." },
  { number: 23, symbol: "V", name: "Vanadium", mass: 50.942, group: 5, period: 4, category: "transition metal", electronegativity: 1.63, radius: 134, meltingPoint: 1910, boilingPoint: 3407, density: 6.11, oxidationStates: "+5, +4, +3, +2", electronConfig: "[Ar] 3d³ 4s²", discovered: 1801, discoveredBy: "Andrés Manuel del Río", phase: "Solid", ionizationEnergy: 6.746, electronAffinity: 0.525, valence: 5, abundance: "0.019%", hardness: 7, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "bcc", protons: 23, neutrons: 28, electrons: 23, shells: [2, 8, 11, 2], xpos: 5, ypos: 4, description: "Hard, silvery-grey metal. Named after the Norse goddess Vanadis (Freyja).", uses: "Steel alloys, batteries, catalysts, aerospace", funFact: "Vanadium steel was used in Ford's Model T — Henry Ford called it the toughest steel he had ever seen." },
  { number: 24, symbol: "Cr", name: "Chromium", mass: 51.996, group: 6, period: 4, category: "transition metal", electronegativity: 1.66, radius: 128, meltingPoint: 1907, boilingPoint: 2671, density: 7.19, oxidationStates: "+6, +3, +2", electronConfig: "[Ar] 3d⁵ 4s¹", discovered: 1798, discoveredBy: "Louis Nicolas Vauquelin", phase: "Solid", ionizationEnergy: 6.767, electronAffinity: 0.666, valence: 3, abundance: "0.014%", hardness: 8.5, conductivity: "good", magnetism: "antiferromagnetic", crystalStructure: "bcc", protons: 24, neutrons: 28, electrons: 24, shells: [2, 8, 13, 1], xpos: 6, ypos: 4, description: "Gives stainless steel its corrosion resistance. Makes rubies red.", uses: "Stainless steel, chrome plating, pigments, leather tanning", funFact: "The red color of rubies and the green of emeralds are both caused by chromium — different crystal environments, completely different colors." },
  { number: 25, symbol: "Mn", name: "Manganese", mass: 54.938, group: 7, period: 4, category: "transition metal", electronegativity: 1.55, radius: 127, meltingPoint: 1246, boilingPoint: 2061, density: 7.47, oxidationStates: "+7, +4, +2, +3", electronConfig: "[Ar] 3d⁵ 4s²", discovered: 1774, discoveredBy: "Johan Gottlieb Gahn", phase: "Solid", ionizationEnergy: 7.434, electronAffinity: 0, valence: 2, abundance: "0.11%", hardness: 6, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "cubic", protons: 25, neutrons: 30, electrons: 25, shells: [2, 8, 13, 2], xpos: 7, ypos: 4, description: "Essential for steel production. Critical trace element in the human body.", uses: "Steel production, batteries, fertilizers, pigments, coins", funFact: "Manganese nodules litter the ocean floor in vast quantities — they're a potential future source of manganese, cobalt, and nickel." },
  { number: 26, symbol: "Fe", name: "Iron", mass: 55.845, group: 8, period: 4, category: "transition metal", electronegativity: 1.83, radius: 126, meltingPoint: 1538, boilingPoint: 2861, density: 7.87, oxidationStates: "+3, +2, +6", electronConfig: "[Ar] 3d⁶ 4s²", discovered: -5000, discoveredBy: "Ancient civilizations", phase: "Solid", ionizationEnergy: 7.902, electronAffinity: 0.151, valence: 2, abundance: "5.6%", hardness: 4, conductivity: "good", magnetism: "ferromagnetic", crystalStructure: "bcc", protons: 26, neutrons: 30, electrons: 26, shells: [2, 8, 14, 2], xpos: 8, ypos: 4, description: "The most used metal. Core of the Earth. Carries oxygen in blood via hemoglobin.", uses: "Steel, construction, hemoglobin, magnets, tools", funFact: "Earth's core is mostly iron — its magnetic field, which protects life from solar radiation, is generated by convecting liquid iron." },
  { number: 27, symbol: "Co", name: "Cobalt", mass: 58.933, group: 9, period: 4, category: "transition metal", electronegativity: 1.88, radius: 125, meltingPoint: 1495, boilingPoint: 2927, density: 8.9, oxidationStates: "+3, +2", electronConfig: "[Ar] 3d⁷ 4s²", discovered: 1735, discoveredBy: "Georg Brandt", phase: "Solid", ionizationEnergy: 7.881, electronAffinity: 0.662, valence: 2, abundance: "0.003%", hardness: 5, conductivity: "good", magnetism: "ferromagnetic", crystalStructure: "hcp", protons: 27, neutrons: 32, electrons: 27, shells: [2, 8, 15, 2], xpos: 9, ypos: 4, description: "Hard, lustrous metal. Essential for vitamin B12 and EV batteries.", uses: "EV batteries, superalloys, magnets, vitamin B12, blue pigment", funFact: "The word cobalt comes from the German Kobold (goblin) — miners blamed the goblins when cobalt ore gave off toxic arsenic fumes." },
  { number: 28, symbol: "Ni", name: "Nickel", mass: 58.693, group: 10, period: 4, category: "transition metal", electronegativity: 1.91, radius: 124, meltingPoint: 1455, boilingPoint: 2913, density: 8.908, oxidationStates: "+2, +3", electronConfig: "[Ar] 3d⁸ 4s²", discovered: 1751, discoveredBy: "Axel Fredrik Cronstedt", phase: "Solid", ionizationEnergy: 7.64, electronAffinity: 1.156, valence: 2, abundance: "0.009%", hardness: 4, conductivity: "good", magnetism: "ferromagnetic", crystalStructure: "fcc", protons: 28, neutrons: 31, electrons: 28, shells: [2, 8, 16, 2], xpos: 10, ypos: 4, description: "Versatile, corrosion-resistant metal. Key in EV batteries and stainless steel.", uses: "Stainless steel, EV batteries, coins, plating, superalloys", funFact: "The US five-cent coin is called a 'nickel' but contains only 25% nickel — the rest is copper. Pure nickel coins were used in the 19th century." },
  { number: 29, symbol: "Cu", name: "Copper", mass: 63.546, group: 11, period: 4, category: "transition metal", electronegativity: 1.9, radius: 128, meltingPoint: 1084.62, boilingPoint: 2562, density: 8.96, oxidationStates: "+2, +1", electronConfig: "[Ar] 3d¹⁰ 4s¹", discovered: -9000, discoveredBy: "Ancient civilizations", phase: "Solid", ionizationEnergy: 7.727, electronAffinity: 1.228, valence: 2, abundance: "0.005%", hardness: 3, conductivity: "excellent", magnetism: "diamagnetic", crystalStructure: "fcc", protons: 29, neutrons: 35, electrons: 29, shells: [2, 8, 18, 1], xpos: 11, ypos: 4, description: "Excellent conductor of electricity. First metal worked by humans over 10,000 years ago.", uses: "Electrical wiring, plumbing, coinage, antimicrobial surfaces", funFact: "Copper is naturally antimicrobial — bacteria die within hours on copper surfaces. Ancient Egyptians used copper pipes for water 5,000 years ago." },
  { number: 30, symbol: "Zn", name: "Zinc", mass: 65.38, group: 12, period: 4, category: "transition metal", electronegativity: 1.65, radius: 122, meltingPoint: 419.53, boilingPoint: 907, density: 7.14, oxidationStates: "+2", electronConfig: "[Ar] 3d¹⁰ 4s²", discovered: 1746, discoveredBy: "Andreas Sigismund Marggraf", phase: "Solid", ionizationEnergy: 9.394, electronAffinity: 0, valence: 2, abundance: "0.0076%", hardness: 2.5, conductivity: "good", magnetism: "diamagnetic", crystalStructure: "hcp", protons: 30, neutrons: 35, electrons: 30, shells: [2, 8, 18, 2], xpos: 12, ypos: 4, description: "Essential trace element. Used in galvanizing steel and as a dietary supplement.", uses: "Galvanizing, die casting, batteries, sunscreen, supplements", funFact: "Zinc deficiency affects 2 billion people worldwide — it's essential for over 300 enzymes in the human body." },
  { number: 31, symbol: "Ga", name: "Gallium", mass: 69.723, group: 13, period: 4, category: "post-transition metal", electronegativity: 1.81, radius: 136, meltingPoint: 29.76, boilingPoint: 2204, density: 5.91, oxidationStates: "+3", electronConfig: "[Ar] 3d¹⁰ 4s² 4p¹", discovered: 1875, discoveredBy: "Paul Emile Lecoq de Boisbaudran", phase: "Solid", ionizationEnergy: 5.999, electronAffinity: 0.41, valence: 3, abundance: "0.0019%", hardness: 1.5, conductivity: "good", magnetism: "diamagnetic", crystalStructure: "orthorhombic", protons: 31, neutrons: 39, electrons: 31, shells: [2, 8, 18, 3], xpos: 13, ypos: 4, description: "Soft metal that melts just above room temperature. Used in semiconductors.", uses: "Semiconductors, LEDs, solar cells, thermometers", funFact: "Gallium melts at 29.76°C — it literally melts in your hand. It's a liquid on a warm day but a solid in a cool room." },
  { number: 32, symbol: "Ge", name: "Germanium", mass: 72.63, group: 14, period: 4, category: "metalloid", electronegativity: 2.01, radius: 122, meltingPoint: 938.25, boilingPoint: 2833, density: 5.323, oxidationStates: "+4, +2", electronConfig: "[Ar] 3d¹⁰ 4s² 4p²", discovered: 1886, discoveredBy: "Clemens Winkler", phase: "Solid", ionizationEnergy: 7.9, electronAffinity: 1.233, valence: 4, abundance: "0.00015%", hardness: 6, conductivity: "semiconductor", magnetism: "diamagnetic", crystalStructure: "diamond cubic", protons: 32, neutrons: 41, electrons: 32, shells: [2, 8, 18, 4], xpos: 14, ypos: 4, description: "Metalloid predicted by Mendeleev. Early semiconductor in transistors.", uses: "Fiber optics, infrared optics, semiconductors, solar cells", funFact: "Germanium was predicted by Mendeleev (as 'eka-silicon') in 1871 — when it was discovered in 1886, it matched his predictions almost exactly." },
  { number: 33, symbol: "As", name: "Arsenic", mass: 74.922, group: 15, period: 4, category: "metalloid", electronegativity: 2.18, radius: 119, meltingPoint: 817, boilingPoint: 614, density: 5.727, oxidationStates: "+5, +3, -3", electronConfig: "[Ar] 3d¹⁰ 4s² 4p³", discovered: 1250, discoveredBy: "Albertus Magnus", phase: "Solid", ionizationEnergy: 9.815, electronAffinity: 0.814, valence: 5, abundance: "0.00021%", hardness: 3.5, conductivity: "semiconductor", magnetism: "diamagnetic", crystalStructure: "rhombohedral", protons: 33, neutrons: 42, electrons: 33, shells: [2, 8, 18, 5], xpos: 15, ypos: 4, description: "Notorious poison with a long history of use in murder. Also a semiconductor.", uses: "Wood preservatives, semiconductors, pesticides, medicine", funFact: "Arsenic was historically called 'inheritance powder' because it was the favorite poison of those who wanted to inherit wealth quickly." },
  { number: 34, symbol: "Se", name: "Selenium", mass: 78.971, group: 16, period: 4, category: "nonmetal", electronegativity: 2.55, radius: 120, meltingPoint: 220.8, boilingPoint: 685, density: 4.81, oxidationStates: "+6, +4, -2", electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁴", discovered: 1817, discoveredBy: "Jöns Jacob Berzelius", phase: "Solid", ionizationEnergy: 9.752, electronAffinity: 2.021, valence: 2, abundance: "0.000005%", hardness: 2, conductivity: "semiconductor", magnetism: "diamagnetic", crystalStructure: "hexagonal", protons: 34, neutrons: 45, electrons: 34, shells: [2, 8, 18, 6], xpos: 16, ypos: 4, description: "Essential trace element. Converts light to electricity in solar cells.", uses: "Solar cells, glass, pigments, dandruff shampoo, photoconductors", funFact: "Selenium is named after the Moon (Selene) — its discoverer named it as a companion to tellurium, which was named after Earth." },
  { number: 35, symbol: "Br", name: "Bromine", mass: 79.904, group: 17, period: 4, category: "halogen", electronegativity: 2.96, radius: 114, meltingPoint: -7.2, boilingPoint: 58.8, density: 3.1028, oxidationStates: "+5, +3, +1, -1", electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁵", discovered: 1826, discoveredBy: "Antoine Jérôme Balard", phase: "Liquid", ionizationEnergy: 11.814, electronAffinity: 3.365, valence: 1, abundance: "0.00037%", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "orthorhombic", protons: 35, neutrons: 45, electrons: 35, shells: [2, 8, 18, 7], xpos: 17, ypos: 4, description: "One of only two liquid elements at room temperature. Reddish-brown, toxic.", uses: "Flame retardants, pesticides, photography, pharmaceuticals", funFact: "Tyrian purple, the most expensive dye in the ancient world (reserved for royalty), was made from bromine-containing compounds secreted by sea snails." },
  { number: 36, symbol: "Kr", name: "Krypton", mass: 83.798, group: 18, period: 4, category: "noble gas", electronegativity: 3.0, radius: 88, meltingPoint: -157.37, boilingPoint: -153.41, density: 0.00375, oxidationStates: "0, +2", electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁶", discovered: 1898, discoveredBy: "William Ramsay", phase: "Gas", ionizationEnergy: 14.0, electronAffinity: 0, valence: 0, abundance: "0.000001%", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "fcc", protons: 36, neutrons: 48, electrons: 36, shells: [2, 8, 18, 8], xpos: 18, ypos: 4, description: "Noble gas used in high-performance lighting. Name means 'hidden' in Greek.", uses: "High-performance flash lamps, lasers, lighting, photography", funFact: "Krypton-86's orange-red spectral line was once used as the international standard definition of the meter — before lasers replaced it." },
  { number: 37, symbol: "Rb", name: "Rubidium", mass: 85.468, group: 1, period: 5, category: "alkali metal", electronegativity: 0.82, radius: 248, meltingPoint: 39.31, boilingPoint: 688, density: 1.532, oxidationStates: "+1", electronConfig: "[Kr] 5s¹", discovered: 1861, discoveredBy: "Robert Bunsen", phase: "Solid", ionizationEnergy: 4.177, electronAffinity: 0.468, valence: 1, abundance: "0.006%", hardness: 0.3, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "bcc", protons: 37, neutrons: 48, electrons: 37, shells: [2, 8, 18, 8, 1], xpos: 1, ypos: 5, description: "Soft, highly reactive alkali metal discovered via spectroscopy.", uses: "Atomic clocks, medical imaging, research, fireworks (purple)", funFact: "Rubidium was discovered using spectroscopy — Bunsen and Kirchhoff spotted its distinctive red spectral lines before isolating the metal." },
  { number: 38, symbol: "Sr", name: "Strontium", mass: 87.62, group: 2, period: 5, category: "alkaline earth metal", electronegativity: 0.95, radius: 215, meltingPoint: 777, boilingPoint: 1382, density: 2.64, oxidationStates: "+2", electronConfig: "[Kr] 5s²", discovered: 1790, discoveredBy: "Adair Crawford", phase: "Solid", ionizationEnergy: 5.695, electronAffinity: 0.048, valence: 2, abundance: "0.036%", hardness: 1.5, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "fcc", protons: 38, neutrons: 50, electrons: 38, shells: [2, 8, 18, 8, 2], xpos: 2, ypos: 5, description: "Soft alkaline earth metal. Its compounds burn brilliant crimson red.", uses: "Fireworks (red), flares, magnets, historical CRT screens", funFact: "Strontium-90, a radioactive isotope produced in nuclear fallout, mimics calcium and deposits in bones — it was a major concern after nuclear tests." },
  { number: 39, symbol: "Y", name: "Yttrium", mass: 88.906, group: 3, period: 5, category: "transition metal", electronegativity: 1.22, radius: 180, meltingPoint: 1526, boilingPoint: 3336, density: 4.472, oxidationStates: "+3", electronConfig: "[Kr] 4d¹ 5s²", discovered: 1794, discoveredBy: "Johan Gadolin", phase: "Solid", ionizationEnergy: 6.217, electronAffinity: 0.307, valence: 3, abundance: "0.0029%", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 39, neutrons: 50, electrons: 39, shells: [2, 8, 18, 9, 2], xpos: 3, ypos: 5, description: "Rare earth element used in LEDs, lasers, and superconductors.", uses: "LEDs, laser crystals, superconductors, cancer treatment", funFact: "Yttrium, ytterbium, erbium, and terbium are all named after the same place — Ytterby, a village in Sweden near a quarry rich in rare minerals." },
  { number: 40, symbol: "Zr", name: "Zirconium", mass: 91.224, group: 4, period: 5, category: "transition metal", electronegativity: 1.33, radius: 160, meltingPoint: 1855, boilingPoint: 4409, density: 6.52, oxidationStates: "+4", electronConfig: "[Kr] 4d² 5s²", discovered: 1789, discoveredBy: "Martin Heinrich Klaproth", phase: "Solid", ionizationEnergy: 6.634, electronAffinity: 0.426, valence: 4, abundance: "0.016%", hardness: 5, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 40, neutrons: 51, electrons: 40, shells: [2, 8, 18, 10, 2], xpos: 4, ypos: 5, description: "Corrosion-resistant metal vital in nuclear reactors. Gemstone cubic zirconia.", uses: "Nuclear reactors, cubic zirconia gems, ceramics, surgical tools", funFact: "Zirconium crystals found in Australia are the oldest material on Earth at over 4.4 billion years old — older than the Moon." },
  { number: 41, symbol: "Nb", name: "Niobium", mass: 92.906, group: 5, period: 5, category: "transition metal", electronegativity: 1.6, radius: 146, meltingPoint: 2477, boilingPoint: 4744, density: 8.57, oxidationStates: "+5, +3", electronConfig: "[Kr] 4d⁴ 5s¹", discovered: 1801, discoveredBy: "Charles Hatchett", phase: "Solid", ionizationEnergy: 6.759, electronAffinity: 0.893, valence: 5, abundance: "0.002%", hardness: 6, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "bcc", protons: 41, neutrons: 52, electrons: 41, shells: [2, 8, 18, 12, 1], xpos: 5, ypos: 5, description: "Superconducting metal at low temperatures. Strengthens steel alloys.", uses: "Steel alloys, superconducting magnets, MRI machines, jet engines", funFact: "Most of the world's niobium comes from a single mine in Brazil — it's essential for the superconducting magnets in MRI scanners worldwide." },
  { number: 42, symbol: "Mo", name: "Molybdenum", mass: 95.96, group: 6, period: 5, category: "transition metal", electronegativity: 2.16, radius: 139, meltingPoint: 2623, boilingPoint: 4639, density: 10.28, oxidationStates: "+6, +4, +3, +2", electronConfig: "[Kr] 4d⁵ 5s¹", discovered: 1781, discoveredBy: "Carl Wilhelm Scheele", phase: "Solid", ionizationEnergy: 7.092, electronAffinity: 0.746, valence: 6, abundance: "0.00011%", hardness: 5.5, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "bcc", protons: 42, neutrons: 54, electrons: 42, shells: [2, 8, 18, 13, 1], xpos: 6, ypos: 5, description: "High melting point metal essential for high-strength steel alloys.", uses: "High-strength steel, jet engines, lubricants, catalysts, fertilizers", funFact: "Molybdenum is essential for nearly all forms of life — it's a cofactor in enzymes that fix nitrogen from the atmosphere." },
  { number: 43, symbol: "Tc", name: "Technetium", mass: 98, group: 7, period: 5, category: "transition metal", electronegativity: 1.9, radius: 136, meltingPoint: 2157, boilingPoint: 4265, density: 11.5, oxidationStates: "+7, +6, +4", electronConfig: "[Kr] 4d⁵ 5s²", discovered: 1937, discoveredBy: "Carlo Perrier", phase: "Solid", ionizationEnergy: 7.28, electronAffinity: 0.55, valence: 7, abundance: "synthetic", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 43, neutrons: 55, electrons: 43, shells: [2, 8, 18, 13, 2], xpos: 7, ypos: 5, description: "First artificially produced element. Has no stable isotopes.", uses: "Medical imaging (bone, heart, cancer scans), research", funFact: "Technetium-99m is the most widely used medical radioisotope in the world — used in tens of millions of diagnostic scans every year." },
  { number: 44, symbol: "Ru", name: "Ruthenium", mass: 101.07, group: 8, period: 5, category: "transition metal", electronegativity: 2.2, radius: 134, meltingPoint: 2334, boilingPoint: 4150, density: 12.37, oxidationStates: "+8, +6, +4, +3, +2", electronConfig: "[Kr] 4d⁷ 5s¹", discovered: 1844, discoveredBy: "Karl Ernst Claus", phase: "Solid", ionizationEnergy: 7.361, electronAffinity: 1.05, valence: 3, abundance: "0.0000001%", hardness: 6.5, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 44, neutrons: 57, electrons: 44, shells: [2, 8, 18, 15, 1], xpos: 8, ypos: 5, description: "Rare platinum group metal. Hardens platinum and palladium alloys.", uses: "Electrical contacts, platinum alloy hardener, catalysts, data storage", funFact: "Ruthenium is named after Ruthenia, the Latin name for Russia — it was discovered in ores from the Ural Mountains." },
  { number: 45, symbol: "Rh", name: "Rhodium", mass: 102.906, group: 9, period: 5, category: "transition metal", electronegativity: 2.28, radius: 134, meltingPoint: 1964, boilingPoint: 3695, density: 12.41, oxidationStates: "+3, +2, +1", electronConfig: "[Kr] 4d⁸ 5s¹", discovered: 1803, discoveredBy: "William Hyde Wollaston", phase: "Solid", ionizationEnergy: 7.459, electronAffinity: 1.137, valence: 3, abundance: "0.000000002%", hardness: 6, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "fcc", protons: 45, neutrons: 58, electrons: 45, shells: [2, 8, 18, 16, 1], xpos: 9, ypos: 5, description: "Rarest and most expensive precious metal. Used in catalytic converters.", uses: "Catalytic converters, jewelry plating, laboratory crucibles", funFact: "Rhodium is the most expensive naturally occurring element — a single ounce has sold for over $29,000. Catalytic converters use tiny but critical amounts." },
  { number: 46, symbol: "Pd", name: "Palladium", mass: 106.42, group: 10, period: 5, category: "transition metal", electronegativity: 2.2, radius: 137, meltingPoint: 1554.9, boilingPoint: 2963, density: 12.023, oxidationStates: "+4, +2", electronConfig: "[Kr] 4d¹⁰", discovered: 1803, discoveredBy: "William Hyde Wollaston", phase: "Solid", ionizationEnergy: 8.337, electronAffinity: 0.562, valence: 2, abundance: "0.00000006%", hardness: 4.75, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "fcc", protons: 46, neutrons: 60, electrons: 46, shells: [2, 8, 18, 18], xpos: 10, ypos: 5, description: "Precious metal used in catalytic converters and hydrogen storage.", uses: "Catalytic converters, hydrogen purification, electronics, dentistry", funFact: "Palladium can absorb up to 900 times its own volume of hydrogen gas — making it uniquely useful for hydrogen purification and storage." },
  { number: 47, symbol: "Ag", name: "Silver", mass: 107.868, group: 11, period: 5, category: "transition metal", electronegativity: 1.93, radius: 144, meltingPoint: 961.78, boilingPoint: 2162, density: 10.49, oxidationStates: "+1", electronConfig: "[Kr] 4d¹⁰ 5s¹", discovered: -5000, discoveredBy: "Ancient civilizations", phase: "Solid", ionizationEnergy: 7.576, electronAffinity: 1.302, valence: 1, abundance: "0.0000079%", hardness: 2.5, conductivity: "excellent", magnetism: "diamagnetic", crystalStructure: "fcc", protons: 47, neutrons: 61, electrons: 47, shells: [2, 8, 18, 18, 1], xpos: 11, ypos: 5, description: "Best electrical conductor of all elements. Used in jewelry, photography, and medicine.", uses: "Jewelry, electronics, photography, antibacterial coatings, mirrors", funFact: "Silver is the best conductor of electricity of all metals — better than copper and gold. Yet copper dominates because silver is too expensive." },
  { number: 48, symbol: "Cd", name: "Cadmium", mass: 112.411, group: 12, period: 5, category: "transition metal", electronegativity: 1.69, radius: 151, meltingPoint: 321.07, boilingPoint: 767, density: 8.65, oxidationStates: "+2", electronConfig: "[Kr] 4d¹⁰ 5s²", discovered: 1817, discoveredBy: "Friedrich Stromeyer", phase: "Solid", ionizationEnergy: 8.994, electronAffinity: 0, valence: 2, abundance: "0.00000015%", hardness: 2, conductivity: "good", magnetism: "diamagnetic", crystalStructure: "hcp", protons: 48, neutrons: 64, electrons: 48, shells: [2, 8, 18, 18, 2], xpos: 12, ypos: 5, description: "Toxic heavy metal. Used in rechargeable Ni-Cd batteries and yellow pigments.", uses: "Ni-Cd batteries, pigments, coatings, nuclear control rods", funFact: "Itai-itai disease ('it hurts-it hurts') in Japan was caused by cadmium-contaminated water from mining, softening bones so severely that patients broke bones just coughing." },
  { number: 49, symbol: "In", name: "Indium", mass: 114.818, group: 13, period: 5, category: "post-transition metal", electronegativity: 1.78, radius: 167, meltingPoint: 156.6, boilingPoint: 2072, density: 7.31, oxidationStates: "+3", electronConfig: "[Kr] 4d¹⁰ 5s² 5p¹", discovered: 1863, discoveredBy: "Ferdinand Reich", phase: "Solid", ionizationEnergy: 5.786, electronAffinity: 0.3, valence: 3, abundance: "0.000000025%", hardness: 1.2, conductivity: "good", magnetism: "diamagnetic", crystalStructure: "tetragonal", protons: 49, neutrons: 66, electrons: 49, shells: [2, 8, 18, 18, 3], xpos: 13, ypos: 5, description: "Soft, silvery metal essential for touchscreens as ITO (indium tin oxide).", uses: "Touchscreens (ITO), LCD displays, solders, bearings", funFact: "Every touchscreen on every smartphone uses indium tin oxide — and there's less indium on Earth than there is silver, making recycling critical." },
  { number: 50, symbol: "Sn", name: "Tin", mass: 118.71, group: 14, period: 5, category: "post-transition metal", electronegativity: 1.96, radius: 140, meltingPoint: 231.93, boilingPoint: 2602, density: 7.287, oxidationStates: "+4, +2", electronConfig: "[Kr] 4d¹⁰ 5s² 5p²", discovered: -3500, discoveredBy: "Ancient civilizations", phase: "Solid", ionizationEnergy: 7.344, electronAffinity: 1.112, valence: 4, abundance: "0.00023%", hardness: 1.5, conductivity: "good", magnetism: "diamagnetic", crystalStructure: "tetragonal", protons: 50, neutrons: 69, electrons: 50, shells: [2, 8, 18, 18, 4], xpos: 14, ypos: 5, description: "Ancient metal used in bronze. Protects steel as tin cans. 'Tin cry' when bent.", uses: "Soldering, tin cans (steel), bronze, glass coatings, organotin chemicals", funFact: "Tin has the most stable isotopes of any element — ten in total. It also 'screams' when bent, a crackling sound called 'tin cry' caused by crystal structure shifting." },
  { number: 51, symbol: "Sb", name: "Antimony", mass: 121.76, group: 15, period: 5, category: "metalloid", electronegativity: 2.05, radius: 140, meltingPoint: 630.63, boilingPoint: 1587, density: 6.697, oxidationStates: "+5, +3, -3", electronConfig: "[Kr] 4d¹⁰ 5s² 5p³", discovered: -800, discoveredBy: "Ancient civilizations", phase: "Solid", ionizationEnergy: 8.64, electronAffinity: 1.047, valence: 5, abundance: "0.0000002%", hardness: 3, conductivity: "semiconductor", magnetism: "diamagnetic", crystalStructure: "rhombohedral", protons: 51, neutrons: 71, electrons: 51, shells: [2, 8, 18, 18, 5], xpos: 15, ypos: 5, description: "Ancient metalloid used as eye cosmetic kohl. Now in flame retardants.", uses: "Flame retardants, lead-acid batteries, semiconductors, pigments", funFact: "Ancient Egyptians used antimony sulfide as kohl eyeliner — and it may have served as an antibacterial protection against eye infections from the Nile." },
  { number: 52, symbol: "Te", name: "Tellurium", mass: 127.6, group: 16, period: 5, category: "metalloid", electronegativity: 2.1, radius: 142, meltingPoint: 449.51, boilingPoint: 988, density: 6.24, oxidationStates: "+6, +4, -2", electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁴", discovered: 1783, discoveredBy: "Franz-Joseph Müller von Reichenstein", phase: "Solid", ionizationEnergy: 9.009, electronAffinity: 1.971, valence: 2, abundance: "0.000000001%", hardness: 2.25, conductivity: "semiconductor", magnetism: "diamagnetic", crystalStructure: "hexagonal", protons: 52, neutrons: 76, electrons: 52, shells: [2, 8, 18, 18, 6], xpos: 16, ypos: 5, description: "Rare metalloid named after Earth. Used in solar cells and rewritable DVDs.", uses: "Solar cells, rewritable CDs/DVDs, alloys, thermoelectric devices", funFact: "Tellurium is one of the rarest stable elements on Earth — rarer than gold — yet gold ores often contain telluride compounds." },
  { number: 53, symbol: "I", name: "Iodine", mass: 126.904, group: 17, period: 5, category: "halogen", electronegativity: 2.66, radius: 133, meltingPoint: 113.7, boilingPoint: 184.3, density: 4.933, oxidationStates: "+7, +5, +1, -1", electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁵", discovered: 1811, discoveredBy: "Bernard Courtois", phase: "Solid", ionizationEnergy: 10.451, electronAffinity: 3.059, valence: 1, abundance: "0.000000046%", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "orthorhombic", protons: 53, neutrons: 74, electrons: 53, shells: [2, 8, 18, 18, 7], xpos: 17, ypos: 5, description: "Essential for thyroid hormones. Sublimes directly from solid to purple gas.", uses: "Antiseptics, thyroid treatment, photography, nutrition", funFact: "Iodine deficiency is the most common preventable cause of intellectual disability worldwide — simply adding iodine to table salt has helped billions of people." },
  { number: 54, symbol: "Xe", name: "Xenon", mass: 131.293, group: 18, period: 5, category: "noble gas", electronegativity: 2.6, radius: 108, meltingPoint: -111.75, boilingPoint: -108.09, density: 0.005894, oxidationStates: "0, +2, +4, +6, +8", electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁶", discovered: 1898, discoveredBy: "William Ramsay", phase: "Gas", ionizationEnergy: 12.13, electronAffinity: 0, valence: 0, abundance: "0.0000000087%", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "fcc", protons: 54, neutrons: 77, electrons: 54, shells: [2, 8, 18, 18, 8], xpos: 18, ypos: 5, description: "Noble gas used in high-powered flash lamps and ion propulsion engines.", uses: "Flash lamps, ion thrusters, anesthesia, NMR spectroscopy", funFact: "Xenon ion engines are used in deep-space probes — they expel xenon ions to generate thrust, achieving remarkable efficiency over long missions." },
  { number: 55, symbol: "Cs", name: "Cesium", mass: 132.905, group: 1, period: 6, category: "alkali metal", electronegativity: 0.79, radius: 265, meltingPoint: 28.44, boilingPoint: 671, density: 1.93, oxidationStates: "+1", electronConfig: "[Xe] 6s¹", discovered: 1860, discoveredBy: "Robert Bunsen", phase: "Solid", ionizationEnergy: 3.894, electronAffinity: 0.472, valence: 1, abundance: "0.00000019%", hardness: 0.2, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "bcc", protons: 55, neutrons: 78, electrons: 55, shells: [2, 8, 18, 18, 8, 1], xpos: 1, ypos: 6, description: "Softest metal and highly reactive. Atomic clocks use cesium to define the second.", uses: "Atomic clocks, drilling fluids, photoelectric cells, medicine", funFact: "The international definition of one second is based on cesium-133 atoms oscillating exactly 9,192,631,770 times — cesium atomic clocks lose 1 second every 300 million years." },
  { number: 56, symbol: "Ba", name: "Barium", mass: 137.327, group: 2, period: 6, category: "alkaline earth metal", electronegativity: 0.89, radius: 222, meltingPoint: 727, boilingPoint: 1845, density: 3.594, oxidationStates: "+2", electronConfig: "[Xe] 6s²", discovered: 1808, discoveredBy: "Humphry Davy", phase: "Solid", ionizationEnergy: 5.212, electronAffinity: 0.14, valence: 2, abundance: "0.034%", hardness: 1.25, conductivity: "good", magnetism: "diamagnetic", crystalStructure: "bcc", protons: 56, neutrons: 81, electrons: 56, shells: [2, 8, 18, 18, 8, 2], xpos: 2, ypos: 6, description: "Soft alkaline earth metal. Barium sulfate is used in X-ray imaging of the gut.", uses: "X-ray contrast agent (barium meal), fireworks (green), drilling mud", funFact: "A 'barium meal' — drinking barium sulfate before an X-ray — makes your digestive system visible to doctors, since barium strongly absorbs X-rays." },
  { number: 57, symbol: "La", name: "Lanthanum", mass: 138.905, group: 3, period: 6, category: "lanthanide", electronegativity: 1.1, radius: 187, meltingPoint: 920, boilingPoint: 3464, density: 6.145, oxidationStates: "+3", electronConfig: "[Xe] 5d¹ 6s²", discovered: 1839, discoveredBy: "Carl Gustaf Mosander", phase: "Solid", ionizationEnergy: 5.577, electronAffinity: 0.5, valence: 3, abundance: "0.0034%", hardness: 2.5, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hexagonal", protons: 57, neutrons: 82, electrons: 57, shells: [2, 8, 18, 18, 9, 2], xpos: 3, ypos: 9, description: "First of the lanthanides. Used in camera lenses and hydrogen storage.", uses: "Camera lenses, EV batteries, catalytic converters, lighting", funFact: "Lanthanum is found in the rechargeable batteries of hybrid cars — a Toyota Prius battery uses about 10 kg of lanthanum compounds." },
  { number: 58, symbol: "Ce", name: "Cerium", mass: 140.116, group: 3, period: 6, category: "lanthanide", electronegativity: 1.12, radius: 182, meltingPoint: 799, boilingPoint: 3443, density: 6.77, oxidationStates: "+4, +3", electronConfig: "[Xe] 4f¹ 5d¹ 6s²", discovered: 1803, discoveredBy: "Jöns Jacob Berzelius", phase: "Solid", ionizationEnergy: 5.539, electronAffinity: 0.5, valence: 3, abundance: "0.0046%", hardness: 2.5, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "fcc", protons: 58, neutrons: 82, electrons: 58, shells: [2, 8, 18, 19, 9, 2], xpos: 4, ypos: 9, description: "Most abundant rare earth. The flint in lighters is an iron-cerium alloy.", uses: "Catalytic converters, glass polishing, lighter flints, LEDs", funFact: "The 'flint' in cigarette lighters isn't flint at all — it's an alloy called mischmetal, which is mostly cerium, that sparks when struck." },
  { number: 59, symbol: "Pr", name: "Praseodymium", mass: 140.908, group: 3, period: 6, category: "lanthanide", electronegativity: 1.13, radius: 182, meltingPoint: 931, boilingPoint: 3520, density: 6.773, oxidationStates: "+3, +4", electronConfig: "[Xe] 4f³ 6s²", discovered: 1885, discoveredBy: "Carl Auer von Welsbach", phase: "Solid", ionizationEnergy: 5.473, electronAffinity: 0.5, valence: 3, abundance: "0.00086%", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hexagonal", protons: 59, neutrons: 82, electrons: 59, shells: [2, 8, 18, 21, 8, 2], xpos: 5, ypos: 9, description: "Rare earth metal used in powerful magnets and goggles for glassblowers.", uses: "Powerful magnets, aircraft engines, glass coloring, welding goggles", funFact: "Praseodymium-doped glass creates special goggles that filter the intense yellow sodium light of glassblowers' flames — an essential safety tool." },
  { number: 60, symbol: "Nd", name: "Neodymium", mass: 144.242, group: 3, period: 6, category: "lanthanide", electronegativity: 1.14, radius: 181, meltingPoint: 1016, boilingPoint: 3074, density: 7.007, oxidationStates: "+3", electronConfig: "[Xe] 4f⁴ 6s²", discovered: 1885, discoveredBy: "Carl Auer von Welsbach", phase: "Solid", ionizationEnergy: 5.525, electronAffinity: 0.5, valence: 3, abundance: "0.0033%", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hexagonal", protons: 60, neutrons: 84, electrons: 60, shells: [2, 8, 18, 22, 8, 2], xpos: 6, ypos: 9, description: "Key component in the strongest permanent magnets (Nd-Fe-B) in the world.", uses: "Powerful permanent magnets, EV motors, wind turbines, hard drives", funFact: "Neodymium magnets are so powerful that two large ones can crush bones if a hand is caught between them — yet they're in every electric motor and speaker you own." },
  { number: 61, symbol: "Pm", name: "Promethium", mass: 145, group: 3, period: 6, category: "lanthanide", electronegativity: 1.13, radius: 183, meltingPoint: 1042, boilingPoint: 3000, density: 7.26, oxidationStates: "+3", electronConfig: "[Xe] 4f⁵ 6s²", discovered: 1945, discoveredBy: "Jacob A. Marinsky", phase: "Solid", ionizationEnergy: 5.582, electronAffinity: 0.5, valence: 3, abundance: "synthetic", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hexagonal", protons: 61, neutrons: 84, electrons: 61, shells: [2, 8, 18, 23, 8, 2], xpos: 7, ypos: 9, description: "Only radioactive lanthanide. Has no stable isotopes. Named after Prometheus.", uses: "Atomic batteries (pacemakers, spacecraft), luminous paint, thickness gauges", funFact: "Promethium is named after Prometheus, the titan who stole fire from the gods — fittingly, it was first isolated from the fission products of nuclear reactors." },
  { number: 62, symbol: "Sm", name: "Samarium", mass: 150.36, group: 3, period: 6, category: "lanthanide", electronegativity: 1.17, radius: 180, meltingPoint: 1072, boilingPoint: 1794, density: 7.52, oxidationStates: "+3, +2", electronConfig: "[Xe] 4f⁶ 6s²", discovered: 1879, discoveredBy: "Paul Emile Lecoq de Boisbaudran", phase: "Solid", ionizationEnergy: 5.644, electronAffinity: 0.5, valence: 3, abundance: "0.00080%", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "rhombohedral", protons: 62, neutrons: 88, electrons: 62, shells: [2, 8, 18, 24, 8, 2], xpos: 8, ypos: 9, description: "Used in strong permanent magnets that work at high temperatures.", uses: "Samarium-cobalt magnets, cancer treatment, neutron absorption", funFact: "Samarium-cobalt magnets were the strongest permanent magnets available before neodymium magnets were invented — they still outperform neodymium at high temperatures." },
  { number: 63, symbol: "Eu", name: "Europium", mass: 151.964, group: 3, period: 6, category: "lanthanide", electronegativity: 1.2, radius: 180, meltingPoint: 826, boilingPoint: 1529, density: 5.243, oxidationStates: "+3, +2", electronConfig: "[Xe] 4f⁷ 6s²", discovered: 1901, discoveredBy: "Eugène-Anatole Demarçay", phase: "Solid", ionizationEnergy: 5.67, electronAffinity: 0.5, valence: 3, abundance: "0.00018%", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "bcc", protons: 63, neutrons: 89, electrons: 63, shells: [2, 8, 18, 25, 8, 2], xpos: 9, ypos: 9, description: "Brightest luminescent rare earth. Creates red and blue on TV and phone screens.", uses: "Red phosphors in screens, euro banknote security, LEDs", funFact: "Europium provides the red and blue colors in LED displays and is used as a security element in euro banknotes — its fluorescence can only be seen under UV light." },
  { number: 64, symbol: "Gd", name: "Gadolinium", mass: 157.25, group: 3, period: 6, category: "lanthanide", electronegativity: 1.2, radius: 180, meltingPoint: 1312, boilingPoint: 3273, density: 7.9, oxidationStates: "+3", electronConfig: "[Xe] 4f⁷ 5d¹ 6s²", discovered: 1880, discoveredBy: "Jean Charles Galissard de Marignac", phase: "Solid", ionizationEnergy: 6.15, electronAffinity: 0.5, valence: 3, abundance: "0.00063%", hardness: 5, conductivity: "good", magnetism: "ferromagnetic", crystalStructure: "hcp", protons: 64, neutrons: 93, electrons: 64, shells: [2, 8, 18, 25, 9, 2], xpos: 10, ypos: 9, description: "Used as MRI contrast agent. Exceptional neutron absorption in nuclear reactors.", uses: "MRI contrast agent, nuclear reactor control rods, magnets", funFact: "Gadolinium is injected into patients before MRI scans to enhance image contrast — it causes tissues to appear much brighter by altering water molecule behavior." },
  { number: 65, symbol: "Tb", name: "Terbium", mass: 158.925, group: 3, period: 6, category: "lanthanide", electronegativity: 1.2, radius: 177, meltingPoint: 1356, boilingPoint: 3230, density: 8.219, oxidationStates: "+3, +4", electronConfig: "[Xe] 4f⁹ 6s²", discovered: 1843, discoveredBy: "Carl Gustaf Mosander", phase: "Solid", ionizationEnergy: 5.864, electronAffinity: 0.5, valence: 3, abundance: "0.000093%", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 65, neutrons: 94, electrons: 65, shells: [2, 8, 18, 27, 8, 2], xpos: 11, ypos: 9, description: "Provides green phosphorescence in fluorescent lamps and LED screens.", uses: "Green phosphors in screens, solid-state devices, naval sonar", funFact: "Terbium compounds glow brilliant green under UV light, making them essential for fluorescent lamps and the green component of color LED displays." },
  { number: 66, symbol: "Dy", name: "Dysprosium", mass: 162.5, group: 3, period: 6, category: "lanthanide", electronegativity: 1.22, radius: 178, meltingPoint: 1407, boilingPoint: 2562, density: 8.55, oxidationStates: "+3", electronConfig: "[Xe] 4f¹⁰ 6s²", discovered: 1886, discoveredBy: "Paul Emile Lecoq de Boisbaudran", phase: "Solid", ionizationEnergy: 5.939, electronAffinity: 0.5, valence: 3, abundance: "0.00062%", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 66, neutrons: 97, electrons: 66, shells: [2, 8, 18, 28, 8, 2], xpos: 12, ypos: 9, description: "Critical additive to neodymium magnets for high-temperature performance.", uses: "Neodymium magnet additive, nuclear reactor control rods, lasers", funFact: "Dysprosium's name means 'hard to get' in Greek — its discoverer described it as extremely difficult to isolate, requiring 32 attempts to purify." },
  { number: 67, symbol: "Ho", name: "Holmium", mass: 164.93, group: 3, period: 6, category: "lanthanide", electronegativity: 1.23, radius: 176, meltingPoint: 1461, boilingPoint: 2720, density: 8.795, oxidationStates: "+3", electronConfig: "[Xe] 4f¹¹ 6s²", discovered: 1879, discoveredBy: "Marc Delafontaine", phase: "Solid", ionizationEnergy: 6.022, electronAffinity: 0.5, valence: 3, abundance: "0.000115%", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 67, neutrons: 98, electrons: 67, shells: [2, 8, 18, 29, 8, 2], xpos: 13, ypos: 9, description: "Has highest magnetic moment of any element. Used in medical lasers.", uses: "Medical lasers, nuclear reactor control rods, magnets", funFact: "Holmium has the highest magnetic moment of any naturally occurring element — making it a key material for creating the strongest magnetic fields in scientific equipment." },
  { number: 68, symbol: "Er", name: "Erbium", mass: 167.259, group: 3, period: 6, category: "lanthanide", electronegativity: 1.24, radius: 176, meltingPoint: 1529, boilingPoint: 2868, density: 9.066, oxidationStates: "+3", electronConfig: "[Xe] 4f¹² 6s²", discovered: 1843, discoveredBy: "Carl Gustaf Mosander", phase: "Solid", ionizationEnergy: 6.108, electronAffinity: 0.5, valence: 3, abundance: "0.00033%", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 68, neutrons: 99, electrons: 68, shells: [2, 8, 18, 30, 8, 2], xpos: 14, ypos: 9, description: "Amplifies signals in fiber optic cables. Gives glass a pink tint.", uses: "Fiber optic amplifiers, pink glass, lasers, nuclear technology", funFact: "Erbium-doped fiber amplifiers (EDFAs) revolutionized the internet — they boost light signals in undersea fiber optic cables, making global broadband possible." },
  { number: 69, symbol: "Tm", name: "Thulium", mass: 168.934, group: 3, period: 6, category: "lanthanide", electronegativity: 1.25, radius: 176, meltingPoint: 1545, boilingPoint: 1950, density: 9.321, oxidationStates: "+3, +2", electronConfig: "[Xe] 4f¹³ 6s²", discovered: 1879, discoveredBy: "Per Teodor Cleve", phase: "Solid", ionizationEnergy: 6.184, electronAffinity: 0.5, valence: 3, abundance: "0.000045%", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 69, neutrons: 100, electrons: 69, shells: [2, 8, 18, 31, 8, 2], xpos: 15, ypos: 9, description: "Rarest natural lanthanide. Used in portable X-ray machines.", uses: "Portable X-ray devices, lasers, high-temperature superconductors", funFact: "Thulium is named after Thule, the mythical land at the edge of the world — fitting for such a rare and obscure element with niche but critical uses." },
  { number: 70, symbol: "Yb", name: "Ytterbium", mass: 173.04, group: 3, period: 6, category: "lanthanide", electronegativity: 1.1, radius: 176, meltingPoint: 824, boilingPoint: 1196, density: 6.965, oxidationStates: "+3, +2", electronConfig: "[Xe] 4f¹⁴ 6s²", discovered: 1878, discoveredBy: "Jean Charles Galissard de Marignac", phase: "Solid", ionizationEnergy: 6.254, electronAffinity: 0.5, valence: 3, abundance: "0.000028%", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "fcc", protons: 70, neutrons: 103, electrons: 70, shells: [2, 8, 18, 32, 8, 2], xpos: 16, ypos: 9, description: "Used in next-generation atomic clocks far more precise than cesium clocks.", uses: "Atomic clocks, fiber lasers, stainless steel improvement, cancer therapy", funFact: "Ytterbium atomic clocks are so precise they would only lose 1 second every 10 billion years — far more accurate than current cesium-based clocks." },
  { number: 71, symbol: "Lu", name: "Lutetium", mass: 174.967, group: 3, period: 6, category: "lanthanide", electronegativity: 1.27, radius: 174, meltingPoint: 1663, boilingPoint: 3402, density: 9.84, oxidationStates: "+3", electronConfig: "[Xe] 4f¹⁴ 5d¹ 6s²", discovered: 1907, discoveredBy: "Georges Urbain", phase: "Solid", ionizationEnergy: 5.426, electronAffinity: 0.5, valence: 3, abundance: "0.000056%", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 71, neutrons: 104, electrons: 71, shells: [2, 8, 18, 32, 9, 2], xpos: 17, ypos: 9, description: "Densest and hardest lanthanide. Used in PET scan detectors.", uses: "PET scan detectors, cancer treatment, catalysts, LED backlighting", funFact: "Lutetium is named after Lutetia, the Roman name for Paris — it was discovered by French chemist Georges Urbain, who named it after his home city." },
  { number: 72, symbol: "Hf", name: "Hafnium", mass: 178.49, group: 4, period: 6, category: "transition metal", electronegativity: 1.3, radius: 159, meltingPoint: 2233, boilingPoint: 4603, density: 13.31, oxidationStates: "+4", electronConfig: "[Xe] 4f¹⁴ 5d² 6s²", discovered: 1923, discoveredBy: "Dirk Coster", phase: "Solid", ionizationEnergy: 6.825, electronAffinity: 0, valence: 4, abundance: "0.00033%", hardness: 5.5, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 72, neutrons: 106, electrons: 72, shells: [2, 8, 18, 32, 10, 2], xpos: 4, ypos: 6, description: "Absorbs neutrons avidly. Essential in nuclear reactor control rods and processors.", uses: "Nuclear reactor control rods, Intel computer chips, alloys, plasma cutting", funFact: "Hafnium is so similar to zirconium chemically that separating them is extraordinarily difficult — yet their nuclear properties are opposite: zirconium is transparent to neutrons, hafnium absorbs them." },
  { number: 73, symbol: "Ta", name: "Tantalum", mass: 180.948, group: 5, period: 6, category: "transition metal", electronegativity: 1.5, radius: 146, meltingPoint: 3017, boilingPoint: 5458, density: 16.69, oxidationStates: "+5", electronConfig: "[Xe] 4f¹⁴ 5d³ 6s²", discovered: 1802, discoveredBy: "Anders Gustaf Ekeberg", phase: "Solid", ionizationEnergy: 7.549, electronAffinity: 0.322, valence: 5, abundance: "0.000002%", hardness: 6.5, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "bcc", protons: 73, neutrons: 108, electrons: 73, shells: [2, 8, 18, 32, 11, 2], xpos: 5, ypos: 6, description: "Exceptionally corrosion-resistant. Found in virtually every smartphone capacitor.", uses: "Smartphone capacitors, surgical implants, jet engines, chemical processing", funFact: "Your smartphone contains tantalum in its capacitors — and much of the world's tantalum comes from conflict regions, making it a so-called 'conflict mineral.'" },
  { number: 74, symbol: "W", name: "Tungsten", mass: 183.84, group: 6, period: 6, category: "transition metal", electronegativity: 2.36, radius: 139, meltingPoint: 3422, boilingPoint: 5555, density: 19.25, oxidationStates: "+6, +4, +2", electronConfig: "[Xe] 4f¹⁴ 5d⁴ 6s²", discovered: 1783, discoveredBy: "Juan José Elhuyar", phase: "Solid", ionizationEnergy: 7.864, electronAffinity: 0.815, valence: 6, abundance: "0.00013%", hardness: 7.5, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "bcc", protons: 74, neutrons: 110, electrons: 74, shells: [2, 8, 18, 32, 12, 2], xpos: 6, ypos: 6, description: "Highest melting point of all metals. Symbol W from German 'Wolfram'.", uses: "Light bulb filaments, cutting tools, armor-piercing ammunition, X-ray targets", funFact: "Tungsten has the highest melting point of any metal (3,422°C) and the lowest vapor pressure — making it the filament in incandescent bulbs and the tip of arc-welding electrodes." },
  { number: 75, symbol: "Re", name: "Rhenium", mass: 186.207, group: 7, period: 6, category: "transition metal", electronegativity: 1.9, radius: 137, meltingPoint: 3186, boilingPoint: 5596, density: 21.02, oxidationStates: "+7, +6, +4, +2", electronConfig: "[Xe] 4f¹⁴ 5d⁵ 6s²", discovered: 1925, discoveredBy: "Masataka Ogawa", phase: "Solid", ionizationEnergy: 7.833, electronAffinity: 0.15, valence: 7, abundance: "0.0000000026%", hardness: 7, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 75, neutrons: 111, electrons: 75, shells: [2, 8, 18, 32, 13, 2], xpos: 7, ypos: 6, description: "One of the rarest elements. Essential for superalloys in jet engine turbines.", uses: "Jet engine superalloys, catalysts for lead-free gasoline, thermocouples", funFact: "Rhenium was the last stable element to be discovered (1925) — it was predicted by Mendeleev as 'dvi-manganese' and found in platinum ores." },
  { number: 76, symbol: "Os", name: "Osmium", mass: 190.23, group: 8, period: 6, category: "transition metal", electronegativity: 2.2, radius: 135, meltingPoint: 3033, boilingPoint: 5012, density: 22.59, oxidationStates: "+8, +6, +4, +3, +2", electronConfig: "[Xe] 4f¹⁴ 5d⁶ 6s²", discovered: 1803, discoveredBy: "Smithson Tennant", phase: "Solid", ionizationEnergy: 8.438, electronAffinity: 1.1, valence: 3, abundance: "0.000000015%", hardness: 7, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 76, neutrons: 114, electrons: 76, shells: [2, 8, 18, 32, 14, 2], xpos: 8, ypos: 6, description: "Densest naturally occurring element. Produces toxic OsO₄ on contact with air.", uses: "Fountain pen tips, electrical contacts, fingerprint detection, catalysts", funFact: "Osmium is the densest naturally occurring element — a cubic meter weighs 22,590 kg. Its tetroxide form is so toxic that even trace amounts can cause blindness." },
  { number: 77, symbol: "Ir", name: "Iridium", mass: 192.217, group: 9, period: 6, category: "transition metal", electronegativity: 2.2, radius: 136, meltingPoint: 2446, boilingPoint: 4428, density: 22.56, oxidationStates: "+4, +3, +2, +1", electronConfig: "[Xe] 4f¹⁴ 5d⁷ 6s²", discovered: 1803, discoveredBy: "Smithson Tennant", phase: "Solid", ionizationEnergy: 8.967, electronAffinity: 1.565, valence: 3, abundance: "0.0000000001%", hardness: 6.5, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "fcc", protons: 77, neutrons: 115, electrons: 77, shells: [2, 8, 18, 32, 15, 2], xpos: 9, ypos: 6, description: "Most corrosion-resistant metal. Iridium anomaly marks the dinosaur extinction.", uses: "Crucibles, spark plugs, compass bearings, the international kilogram prototype", funFact: "The Cretaceous-Paleogene boundary (when dinosaurs went extinct) is marked by a global layer of iridium — it came from the asteroid that wiped them out 66 million years ago." },
  { number: 78, symbol: "Pt", name: "Platinum", mass: 195.084, group: 10, period: 6, category: "transition metal", electronegativity: 2.28, radius: 138, meltingPoint: 1768.3, boilingPoint: 3825, density: 21.45, oxidationStates: "+4, +2", electronConfig: "[Xe] 4f¹⁴ 5d⁹ 6s¹", discovered: 1735, discoveredBy: "Antonio de Ulloa", phase: "Solid", ionizationEnergy: 8.959, electronAffinity: 2.128, valence: 4, abundance: "0.000000005%", hardness: 3.5, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "fcc", protons: 78, neutrons: 117, electrons: 78, shells: [2, 8, 18, 32, 17, 1], xpos: 10, ypos: 6, description: "Precious, corrosion-resistant metal used in jewelry and catalytic converters.", uses: "Catalytic converters, jewelry, fuel cells, cancer drugs (cisplatin)", funFact: "Cisplatin, one of the most successful cancer chemotherapy drugs ever developed, is a platinum compound — discovered accidentally when scientists were studying electric fields." },
  { number: 79, symbol: "Au", name: "Gold", mass: 196.967, group: 11, period: 6, category: "transition metal", electronegativity: 2.54, radius: 144, meltingPoint: 1064.18, boilingPoint: 2856, density: 19.32, oxidationStates: "+3, +1", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹", discovered: -3000, discoveredBy: "Ancient civilizations", phase: "Solid", ionizationEnergy: 9.226, electronAffinity: 2.309, valence: 1, abundance: "0.000000013%", hardness: 2.5, conductivity: "excellent", magnetism: "diamagnetic", crystalStructure: "fcc", protons: 79, neutrons: 118, electrons: 79, shells: [2, 8, 18, 32, 18, 1], xpos: 11, ypos: 6, description: "Noble metal prized since antiquity. Does not corrode. Used in electronics.", uses: "Jewelry, electronics, dentistry, space equipment, medicine", funFact: "All the gold ever mined in human history would fit into a cube about 21 meters on each side — smaller than a tennis court." },
  { number: 80, symbol: "Hg", name: "Mercury", mass: 200.592, group: 12, period: 6, category: "transition metal", electronegativity: 2.0, radius: 151, meltingPoint: -38.83, boilingPoint: 356.73, density: 13.534, oxidationStates: "+2, +1", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s²", discovered: -1500, discoveredBy: "Ancient civilizations", phase: "Liquid", ionizationEnergy: 10.438, electronAffinity: 0, valence: 2, abundance: "0.000000067%", hardness: null, conductivity: "good", magnetism: "diamagnetic", crystalStructure: "rhombohedral", protons: 80, neutrons: 121, electrons: 80, shells: [2, 8, 18, 32, 18, 2], xpos: 12, ypos: 6, description: "Only metal liquid at room temperature. Highly toxic. Used in thermometers.", uses: "Thermometers, barometers, fluorescent lamps, dental amalgams, switches", funFact: "Mercury is the only metal that is liquid at room temperature. Despite its toxicity, ancient Chinese emperors drank mercury potions hoping to achieve immortality — many died instead." },
  { number: 81, symbol: "Tl", name: "Thallium", mass: 204.38, group: 13, period: 6, category: "post-transition metal", electronegativity: 1.62, radius: 170, meltingPoint: 304, boilingPoint: 1473, density: 11.85, oxidationStates: "+3, +1", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹", discovered: 1861, discoveredBy: "William Crookes", phase: "Solid", ionizationEnergy: 6.108, electronAffinity: 0.2, valence: 1, abundance: "0.00000085%", hardness: 1.2, conductivity: "good", magnetism: "diamagnetic", crystalStructure: "hcp", protons: 81, neutrons: 123, electrons: 81, shells: [2, 8, 18, 32, 18, 3], xpos: 13, ypos: 6, description: "Highly toxic metal once used as rat poison and notorious murder weapon.", uses: "Infrared detectors, cardiac imaging, semiconductor research", funFact: "Thallium was once sold as 'Thallium Ace,' a commercially available rat and ant poison — its tasteless, odorless nature made it a favorite of 20th-century poisoners." },
  { number: 82, symbol: "Pb", name: "Lead", mass: 207.2, group: 14, period: 6, category: "post-transition metal", electronegativity: 2.33, radius: 175, meltingPoint: 327.46, boilingPoint: 1749, density: 11.34, oxidationStates: "+4, +2", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²", discovered: -7000, discoveredBy: "Ancient civilizations", phase: "Solid", ionizationEnergy: 7.417, electronAffinity: 0.364, valence: 4, abundance: "0.00099%", hardness: 1.5, conductivity: "good", magnetism: "diamagnetic", crystalStructure: "fcc", protons: 82, neutrons: 125, electrons: 82, shells: [2, 8, 18, 32, 18, 4], xpos: 14, ypos: 6, description: "Dense, soft metal. Was widely used in pipes and paint before toxicity was understood.", uses: "Batteries, radiation shielding, ammunition, soldering", funFact: "Some historians believe lead poisoning from wine sweetened in lead vessels contributed to the decline of the Roman Empire." },
  { number: 83, symbol: "Bi", name: "Bismuth", mass: 208.98, group: 15, period: 6, category: "post-transition metal", electronegativity: 2.02, radius: 160, meltingPoint: 271.5, boilingPoint: 1564, density: 9.807, oxidationStates: "+5, +3", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³", discovered: 1753, discoveredBy: "Claude François Geoffroy", phase: "Solid", ionizationEnergy: 7.289, electronAffinity: 0.946, valence: 3, abundance: "0.0000000025%", hardness: 2.25, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "rhombohedral", protons: 83, neutrons: 126, electrons: 83, shells: [2, 8, 18, 32, 18, 5], xpos: 15, ypos: 6, description: "Heaviest stable (effectively) element. Forms beautiful rainbow-colored crystals.", uses: "Pepto-Bismol, cosmetics, fire sprinklers, semiconductors, fishing lures", funFact: "Bismuth crystals are breathtaking — they grow in rainbow-hued stepped spirals due to oxide layers forming on the surface. Bismuth is also non-toxic and used in stomach medicine." },
  { number: 84, symbol: "Po", name: "Polonium", mass: 209, group: 16, period: 6, category: "post-transition metal", electronegativity: 2.0, radius: 168, meltingPoint: 254, boilingPoint: 962, density: 9.32, oxidationStates: "+4, +2", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴", discovered: 1898, discoveredBy: "Marie Curie", phase: "Solid", ionizationEnergy: 8.414, electronAffinity: 1.9, valence: 2, abundance: "synthetic", hardness: null, conductivity: "good", magnetism: "diamagnetic", crystalStructure: "cubic", protons: 84, neutrons: 125, electrons: 84, shells: [2, 8, 18, 32, 18, 6], xpos: 16, ypos: 6, description: "Highly radioactive element discovered by Marie Curie. Named after Poland.", uses: "Anti-static devices, nuclear warhead triggers, thermoelectric power (space)", funFact: "Polonium-210 is so intensely radioactive that a lethal dose is smaller than a grain of sand. It was used to assassinate former Russian spy Alexander Litvinenko in 2006." },
  { number: 85, symbol: "At", name: "Astatine", mass: 210, group: 17, period: 6, category: "halogen", electronegativity: 2.2, radius: 150, meltingPoint: 302, boilingPoint: 337, density: 6.4, oxidationStates: "+7, +5, +3, +1, -1", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵", discovered: 1940, discoveredBy: "Dale R. Corson", phase: "Solid", ionizationEnergy: 9.5, electronAffinity: 2.8, valence: 1, abundance: "synthetic", hardness: null, conductivity: "poor", magnetism: "unknown", crystalStructure: "unknown", protons: 85, neutrons: 125, electrons: 85, shells: [2, 8, 18, 32, 18, 7], xpos: 17, ypos: 6, description: "Rarest naturally occurring element. At any moment, less than 25g exists on Earth.", uses: "Cancer treatment (targeted alpha therapy), research only", funFact: "Astatine is so rare that the total amount naturally occurring on Earth at any given moment is estimated at less than 25 grams — the entire element barely exists." },
  { number: 86, symbol: "Rn", name: "Radon", mass: 222, group: 18, period: 6, category: "noble gas", electronegativity: 2.2, radius: 120, meltingPoint: -71, boilingPoint: -61.7, density: 0.00973, oxidationStates: "0, +2", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶", discovered: 1900, discoveredBy: "Friedrich Ernst Dorn", phase: "Gas", ionizationEnergy: 10.749, electronAffinity: 0, valence: 0, abundance: "trace", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "fcc", protons: 86, neutrons: 136, electrons: 86, shells: [2, 8, 18, 32, 18, 8], xpos: 18, ypos: 6, description: "Radioactive noble gas. Seeps into homes and is a leading cause of lung cancer.", uses: "Cancer treatment (historical), earthquake prediction research", funFact: "Radon is the second leading cause of lung cancer after smoking in the US, naturally seeping from rock and soil into poorly ventilated basements and homes." },
  { number: 87, symbol: "Fr", name: "Francium", mass: 223, group: 1, period: 7, category: "alkali metal", electronegativity: 0.7, radius: 270, meltingPoint: 27, boilingPoint: 677, density: 1.87, oxidationStates: "+1", electronConfig: "[Rn] 7s¹", discovered: 1939, discoveredBy: "Marguerite Perey", phase: "Solid", ionizationEnergy: 4.073, electronAffinity: 0.47, valence: 1, abundance: "synthetic", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "bcc", protons: 87, neutrons: 136, electrons: 87, shells: [2, 8, 18, 32, 18, 8, 1], xpos: 1, ypos: 7, description: "Most unstable naturally occurring element. Barely a few ounces exist at any time.", uses: "Research only — used in atomic structure studies", funFact: "Francium is so unstable and rare that it's estimated only 20–30 grams exist naturally on Earth at any given moment. It was discovered by a woman, Marguerite Perey, who named it after France." },
  { number: 88, symbol: "Ra", name: "Radium", mass: 226, group: 2, period: 7, category: "alkaline earth metal", electronegativity: 0.9, radius: 215, meltingPoint: 696, boilingPoint: 1413, density: 5.5, oxidationStates: "+2", electronConfig: "[Rn] 7s²", discovered: 1898, discoveredBy: "Marie Curie", phase: "Solid", ionizationEnergy: 5.279, electronAffinity: 0.1, valence: 2, abundance: "trace", hardness: null, conductivity: "good", magnetism: "unknown", crystalStructure: "bcc", protons: 88, neutrons: 138, electrons: 88, shells: [2, 8, 18, 32, 18, 8, 2], xpos: 2, ypos: 7, description: "Discovered by Marie Curie. Once used in luminous watch dials, causing mass poisoning.", uses: "Cancer treatment (historical), research, luminous paint (historical)", funFact: "Radium Girls — factory workers who painted watch dials with radium paint — were told to lick their brushes to make a fine point. Many died of radiation-induced cancers." },
  { number: 89, symbol: "Ac", name: "Actinium", mass: 227, group: 3, period: 7, category: "actinide", electronegativity: 1.1, radius: 195, meltingPoint: 1050, boilingPoint: 3200, density: 10.07, oxidationStates: "+3", electronConfig: "[Rn] 6d¹ 7s²", discovered: 1899, discoveredBy: "André-Louis Debierne", phase: "Solid", ionizationEnergy: 5.17, electronAffinity: null, valence: 3, abundance: "trace", hardness: null, conductivity: "good", magnetism: "unknown", crystalStructure: "fcc", protons: 89, neutrons: 138, electrons: 89, shells: [2, 8, 18, 32, 18, 9, 2], xpos: 3, ypos: 10, description: "First actinide. Glows blue in the dark from its own radioactive decay.", uses: "Cancer treatment (Ac-225 for targeted alpha therapy), neutron sources", funFact: "Actinium glows a faint blue in the dark — the radiation ionizes surrounding air molecules, creating a ghostly luminescence, similar to Cherenkov radiation." },
  { number: 90, symbol: "Th", name: "Thorium", mass: 232.038, group: 3, period: 7, category: "actinide", electronegativity: 1.3, radius: 179, meltingPoint: 1750, boilingPoint: 4820, density: 11.72, oxidationStates: "+4", electronConfig: "[Rn] 6d² 7s²", discovered: 1829, discoveredBy: "Jöns Jacob Berzelius", phase: "Solid", ionizationEnergy: 6.308, electronAffinity: null, valence: 4, abundance: "0.00060%", hardness: 3, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "fcc", protons: 90, neutrons: 142, electrons: 90, shells: [2, 8, 18, 32, 18, 10, 2], xpos: 4, ypos: 10, description: "Radioactive metal. A potential safer alternative to uranium in nuclear reactors.", uses: "Potential nuclear fuel, gas mantles (camping lanterns), aerospace alloys", funFact: "Thorium-powered reactors could be safer than uranium reactors and produce far less long-lived nuclear waste — several countries are actively developing thorium reactor technology." },
  { number: 91, symbol: "Pa", name: "Protactinium", mass: 231.036, group: 3, period: 7, category: "actinide", electronegativity: 1.5, radius: 163, meltingPoint: 1568, boilingPoint: 4027, density: 15.37, oxidationStates: "+5, +4", electronConfig: "[Rn] 5f² 6d¹ 7s²", discovered: 1913, discoveredBy: "Kasimir Fajans", phase: "Solid", ionizationEnergy: 5.89, electronAffinity: null, valence: 5, abundance: "trace", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "tetragonal", protons: 91, neutrons: 140, electrons: 91, shells: [2, 8, 18, 32, 20, 9, 2], xpos: 5, ypos: 10, description: "Rare, toxic, radioactive actinide. Named 'parent of actinium' as it decays to it.", uses: "Research only — no significant commercial applications", funFact: "Protactinium's name means 'parent of actinium' — it decays into actinium and is one of the rarest and most toxic elements, with no practical uses outside research." },
  { number: 92, symbol: "U", name: "Uranium", mass: 238.029, group: 3, period: 7, category: "actinide", electronegativity: 1.38, radius: 156, meltingPoint: 1132.2, boilingPoint: 4131, density: 19.05, oxidationStates: "+6, +5, +4, +3", electronConfig: "[Rn] 5f³ 6d¹ 7s²", discovered: 1789, discoveredBy: "Martin Heinrich Klaproth", phase: "Solid", ionizationEnergy: 6.194, electronAffinity: null, valence: 6, abundance: "0.00018%", hardness: 6, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "orthorhombic", protons: 92, neutrons: 146, electrons: 92, shells: [2, 8, 18, 32, 21, 9, 2], xpos: 6, ypos: 10, description: "Radioactive actinide. Powers nuclear reactors. Named after the planet Uranus.", uses: "Nuclear fuel, nuclear weapons, radiation shielding (historical)", funFact: "One kilogram of uranium-235 contains as much energy as 3 million kilograms of coal." },
  { number: 93, symbol: "Np", name: "Neptunium", mass: 237, group: 3, period: 7, category: "actinide", electronegativity: 1.36, radius: 155, meltingPoint: 644, boilingPoint: 4000, density: 20.45, oxidationStates: "+6, +5, +4, +3", electronConfig: "[Rn] 5f⁴ 6d¹ 7s²", discovered: 1940, discoveredBy: "Edwin McMillan", phase: "Solid", ionizationEnergy: 6.266, electronAffinity: null, valence: 5, abundance: "synthetic", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "orthorhombic", protons: 93, neutrons: 144, electrons: 93, shells: [2, 8, 18, 32, 22, 9, 2], xpos: 7, ypos: 10, description: "First transuranic element. Named after Neptune, the next planet after Uranus.", uses: "Neutron detection instruments, production of plutonium-238", funFact: "Neptunium was the first transuranic element (beyond uranium) ever synthesized — it was created at Berkeley in 1940 by bombarding uranium with neutrons." },
  { number: 94, symbol: "Pu", name: "Plutonium", mass: 244, group: 3, period: 7, category: "actinide", electronegativity: 1.28, radius: 159, meltingPoint: 639.4, boilingPoint: 3228, density: 19.84, oxidationStates: "+6, +5, +4, +3", electronConfig: "[Rn] 5f⁶ 7s²", discovered: 1940, discoveredBy: "Glenn T. Seaborg", phase: "Solid", ionizationEnergy: 6.026, electronAffinity: null, valence: 4, abundance: "synthetic", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "monoclinic", protons: 94, neutrons: 150, electrons: 94, shells: [2, 8, 18, 32, 24, 8, 2], xpos: 8, ypos: 10, description: "Used in nuclear weapons and spacecraft power. Extremely toxic and radioactive.", uses: "Nuclear weapons, nuclear reactors, RTG power sources for spacecraft", funFact: "The plutonium in the Voyager spacecraft's RTG power source has been generating electricity for over 45 years, powering the farthest human-made object from Earth." },
  { number: 95, symbol: "Am", name: "Americium", mass: 243, group: 3, period: 7, category: "actinide", electronegativity: 1.3, radius: 173, meltingPoint: 1176, boilingPoint: 2011, density: 13.67, oxidationStates: "+6, +5, +4, +3", electronConfig: "[Rn] 5f⁷ 7s²", discovered: 1944, discoveredBy: "Glenn T. Seaborg", phase: "Solid", ionizationEnergy: 5.974, electronAffinity: null, valence: 3, abundance: "synthetic", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hexagonal", protons: 95, neutrons: 148, electrons: 95, shells: [2, 8, 18, 32, 25, 8, 2], xpos: 9, ypos: 10, description: "Synthetic actinide found in most home smoke detectors worldwide.", uses: "Smoke detectors, gamma-ray sources, research", funFact: "There are about 0.29 micrograms of americium-241 in every household ionization smoke detector — a real transuranic element in millions of homes around the world." },
  { number: 96, symbol: "Cm", name: "Curium", mass: 247, group: 3, period: 7, category: "actinide", electronegativity: 1.3, radius: 174, meltingPoint: 1340, boilingPoint: 3110, density: 13.51, oxidationStates: "+4, +3", electronConfig: "[Rn] 5f⁷ 6d¹ 7s²", discovered: 1944, discoveredBy: "Glenn T. Seaborg", phase: "Solid", ionizationEnergy: 5.991, electronAffinity: null, valence: 3, abundance: "synthetic", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hexagonal", protons: 96, neutrons: 151, electrons: 96, shells: [2, 8, 18, 32, 25, 9, 2], xpos: 10, ypos: 10, description: "Named after Marie and Pierre Curie. Used in spacecraft alpha particle X-ray spectrometers.", uses: "Alpha-particle X-ray spectrometer (Mars rovers), pacemaker batteries (historical)", funFact: "Curium was used in the APXS instrument on the Mars rovers — a tiny piece of this synthetic element has been on the surface of Mars, analyzing rocks." },
  { number: 97, symbol: "Bk", name: "Berkelium", mass: 247, group: 3, period: 7, category: "actinide", electronegativity: 1.3, radius: 170, meltingPoint: 986, boilingPoint: null, density: 14.79, oxidationStates: "+4, +3", electronConfig: "[Rn] 5f⁹ 7s²", discovered: 1949, discoveredBy: "Glenn T. Seaborg", phase: "Solid", ionizationEnergy: 6.198, electronAffinity: null, valence: 3, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "hexagonal", protons: 97, neutrons: 150, electrons: 97, shells: [2, 8, 18, 32, 27, 8, 2], xpos: 11, ypos: 10, description: "Named after Berkeley, California. Used only in making heavier elements.", uses: "Production of heavier transuranic elements, research only", funFact: "Berkelium is so rare that only a few milligrams have ever been produced. Scientists once had to wait years for enough berkelium to be created just to confirm the synthesis of element 117." },
  { number: 98, symbol: "Cf", name: "Californium", mass: 251, group: 3, period: 7, category: "actinide", electronegativity: 1.3, radius: 168, meltingPoint: 900, boilingPoint: 1470, density: 15.1, oxidationStates: "+4, +3", electronConfig: "[Rn] 5f¹⁰ 7s²", discovered: 1950, discoveredBy: "Glenn T. Seaborg", phase: "Solid", ionizationEnergy: 6.282, electronAffinity: null, valence: 3, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "hexagonal", protons: 98, neutrons: 153, electrons: 98, shells: [2, 8, 18, 32, 28, 8, 2], xpos: 12, ypos: 10, description: "Powerful neutron emitter. Used in cancer treatment and oil well detection.", uses: "Cancer treatment (neutron therapy), oil well logging, nuclear reactor startup", funFact: "Californium-252 is one of the most expensive materials on Earth at about $27 million per gram — and it's genuinely useful for detecting tumors, gold, and starting nuclear reactors." },
  { number: 99, symbol: "Es", name: "Einsteinium", mass: 252, group: 3, period: 7, category: "actinide", electronegativity: 1.3, radius: 165, meltingPoint: 860, boilingPoint: 996, density: 8.84, oxidationStates: "+3, +2", electronConfig: "[Rn] 5f¹¹ 7s²", discovered: 1952, discoveredBy: "Albert Ghiorso", phase: "Solid", ionizationEnergy: 6.42, electronAffinity: null, valence: 3, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "fcc", protons: 99, neutrons: 153, electrons: 99, shells: [2, 8, 18, 32, 29, 8, 2], xpos: 13, ypos: 10, description: "Named after Einstein. First discovered in fallout from the first hydrogen bomb test.", uses: "Research only — used to synthesize heavier elements like mendelevium", funFact: "Einsteinium was discovered secretly in the radioactive debris of the first hydrogen bomb (Ivy Mike, 1952) — classified for years before the discovery was publicly announced." },
  { number: 100, symbol: "Fm", name: "Fermium", mass: 257, group: 3, period: 7, category: "actinide", electronegativity: 1.3, radius: null, meltingPoint: 1527, boilingPoint: null, density: null, oxidationStates: "+3, +2", electronConfig: "[Rn] 5f¹² 7s²", discovered: 1952, discoveredBy: "Albert Ghiorso", phase: "Solid", ionizationEnergy: 6.5, electronAffinity: null, valence: 3, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 100, neutrons: 157, electrons: 100, shells: [2, 8, 18, 32, 30, 8, 2], xpos: 14, ypos: 10, description: "Named after Fermi. Also discovered in H-bomb fallout. Heaviest element made in bulk.", uses: "Research only — heaviest element that can be produced in macroscopic amounts", funFact: "Fermium was also found secretly in H-bomb fallout. It's the heaviest element that can be created in weighable amounts — beyond fermium, elements must be made one atom at a time." },
  { number: 101, symbol: "Md", name: "Mendelevium", mass: 258, group: 3, period: 7, category: "actinide", electronegativity: 1.3, radius: null, meltingPoint: 827, boilingPoint: null, density: null, oxidationStates: "+3, +2", electronConfig: "[Rn] 5f¹³ 7s²", discovered: 1955, discoveredBy: "Glenn T. Seaborg", phase: "Solid", ionizationEnergy: 6.58, electronAffinity: null, valence: 3, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 101, neutrons: 157, electrons: 101, shells: [2, 8, 18, 32, 31, 8, 2], xpos: 15, ypos: 10, description: "Named after Mendeleev, creator of the periodic table. First element made one atom at a time.", uses: "Research only", funFact: "When mendelevium was first synthesized, the entire first batch was 17 atoms — scientists had to develop entirely new chemistry techniques to study matter one atom at a time." },
  { number: 102, symbol: "No", name: "Nobelium", mass: 259, group: 3, period: 7, category: "actinide", electronegativity: 1.3, radius: null, meltingPoint: 827, boilingPoint: null, density: null, oxidationStates: "+3, +2", electronConfig: "[Rn] 5f¹⁴ 7s²", discovered: 1966, discoveredBy: "Georgy Flerov", phase: "Solid", ionizationEnergy: 6.65, electronAffinity: null, valence: 3, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 102, neutrons: 157, electrons: 102, shells: [2, 8, 18, 32, 32, 8, 2], xpos: 16, ypos: 10, description: "Named after Alfred Nobel. One of the heaviest elements with known chemistry.", uses: "Research only", funFact: "The discovery of nobelium was disputed between US, Swedish, and Soviet teams for years — the IUPAC eventually attributed it to a Soviet group, despite an earlier contested claim." },
  { number: 103, symbol: "Lr", name: "Lawrencium", mass: 266, group: 3, period: 7, category: "actinide", electronegativity: 1.3, radius: null, meltingPoint: 1627, boilingPoint: null, density: null, oxidationStates: "+3", electronConfig: "[Rn] 5f¹⁴ 7s² 7p¹", discovered: 1961, discoveredBy: "Albert Ghiorso", phase: "Solid", ionizationEnergy: 4.9, electronAffinity: null, valence: 3, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 103, neutrons: 163, electrons: 103, shells: [2, 8, 18, 32, 32, 8, 3], xpos: 17, ypos: 10, description: "Last actinide. Named after Lawrence Berkeley Lab founder Ernest Lawrence.", uses: "Research only", funFact: "Lawrencium has an unusual electron configuration — its ionization energy was only measured in 2015 using a single atom at a time, a triumph of modern atomic physics." },
  { number: 104, symbol: "Rf", name: "Rutherfordium", mass: 267, group: 4, period: 7, category: "transition metal", electronegativity: null, radius: null, meltingPoint: 2100, boilingPoint: 5500, density: 23.2, oxidationStates: "+4", electronConfig: "[Rn] 5f¹⁴ 6d² 7s²", discovered: 1969, discoveredBy: "Albert Ghiorso", phase: "Solid", ionizationEnergy: 6.01, electronAffinity: null, valence: 4, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 104, neutrons: 163, electrons: 104, shells: [2, 8, 18, 32, 32, 10, 2], xpos: 4, ypos: 7, description: "Named after Rutherford. First transactinide element. Chemistry resembles hafnium.", uses: "Research only", funFact: "Rutherfordium was another Cold War discovery dispute — the US and Soviet Union both claimed discovery simultaneously during the space race era of element hunting." },
  { number: 105, symbol: "Db", name: "Dubnium", mass: 268, group: 5, period: 7, category: "transition metal", electronegativity: null, radius: null, meltingPoint: null, boilingPoint: null, density: 29.3, oxidationStates: "+5", electronConfig: "[Rn] 5f¹⁴ 6d³ 7s²", discovered: 1970, discoveredBy: "Albert Ghiorso", phase: "Solid", ionizationEnergy: null, electronAffinity: null, valence: 5, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 105, neutrons: 163, electrons: 105, shells: [2, 8, 18, 32, 32, 11, 2], xpos: 5, ypos: 7, description: "Named after Dubna, Russia. Superheavy element that only lasts for seconds.", uses: "Research only", funFact: "Dubnium was named to settle a dispute between US and Soviet scientists who both claimed discovery — it was named after the Soviet nuclear research city of Dubna." },
  { number: 106, symbol: "Sg", name: "Seaborgium", mass: 269, group: 6, period: 7, category: "transition metal", electronegativity: null, radius: null, meltingPoint: null, boilingPoint: null, density: 35.0, oxidationStates: "+6", electronConfig: "[Rn] 5f¹⁴ 6d⁴ 7s²", discovered: 1974, discoveredBy: "Albert Ghiorso", phase: "Solid", ionizationEnergy: null, electronAffinity: null, valence: 6, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 106, neutrons: 163, electrons: 106, shells: [2, 8, 18, 32, 32, 12, 2], xpos: 6, ypos: 7, description: "Named after Glenn Seaborg, the only person to have an element named after them while alive.", uses: "Research only", funFact: "Glenn Seaborg was the first person to have an element named after them while still alive — he co-discovered ten elements and helped transform our understanding of the periodic table." },
  { number: 107, symbol: "Bh", name: "Bohrium", mass: 270, group: 7, period: 7, category: "transition metal", electronegativity: null, radius: null, meltingPoint: null, boilingPoint: null, density: 37.1, oxidationStates: "+7", electronConfig: "[Rn] 5f¹⁴ 6d⁵ 7s²", discovered: 1981, discoveredBy: "Peter Armbruster", phase: "Solid", ionizationEnergy: null, electronAffinity: null, valence: 7, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 107, neutrons: 163, electrons: 107, shells: [2, 8, 18, 32, 32, 13, 2], xpos: 7, ypos: 7, description: "Named after Niels Bohr. Highly unstable — exists for milliseconds.", uses: "Research only", funFact: "Bohrium was first synthesized in 1981 by a German team — only a few dozen atoms have ever been made, each lasting just fractions of a second before decaying." },
  { number: 108, symbol: "Hs", name: "Hassium", mass: 269, group: 8, period: 7, category: "transition metal", electronegativity: null, radius: null, meltingPoint: null, boilingPoint: null, density: 40.7, oxidationStates: "+8", electronConfig: "[Rn] 5f¹⁴ 6d⁶ 7s²", discovered: 1984, discoveredBy: "Peter Armbruster", phase: "Solid", ionizationEnergy: null, electronAffinity: null, valence: 8, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 108, neutrons: 161, electrons: 108, shells: [2, 8, 18, 32, 32, 14, 2], xpos: 8, ypos: 7, description: "Named after Hesse, Germany. Its oxide is volatile like osmium tetroxide.", uses: "Research only", funFact: "Hassium-270 has the longest half-life of any hassium isotope at 22 seconds — an eternity compared to most superheavy elements that vanish in microseconds." },
  { number: 109, symbol: "Mt", name: "Meitnerium", mass: 278, group: 9, period: 7, category: "transition metal", electronegativity: null, radius: null, meltingPoint: null, boilingPoint: null, density: 37.4, oxidationStates: "+9, +6, +3", electronConfig: "[Rn] 5f¹⁴ 6d⁷ 7s²", discovered: 1982, discoveredBy: "Peter Armbruster", phase: "Solid", ionizationEnergy: null, electronAffinity: null, valence: 9, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 109, neutrons: 169, electrons: 109, shells: [2, 8, 18, 32, 32, 15, 2], xpos: 9, ypos: 7, description: "Named after Lise Meitner, physicist who explained nuclear fission.", uses: "Research only", funFact: "Lise Meitner explained nuclear fission but was overlooked for the Nobel Prize — meitnerium, named in her honor, is a small posthumous tribute to one of history's most underappreciated scientists." },
  { number: 110, symbol: "Ds", name: "Darmstadtium", mass: 281, group: 10, period: 7, category: "transition metal", electronegativity: null, radius: null, meltingPoint: null, boilingPoint: null, density: 34.8, oxidationStates: "+6, +4, +2", electronConfig: "[Rn] 5f¹⁴ 6d⁸ 7s²", discovered: 1994, discoveredBy: "Peter Armbruster", phase: "Solid", ionizationEnergy: null, electronAffinity: null, valence: 6, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 110, neutrons: 171, electrons: 110, shells: [2, 8, 18, 32, 32, 16, 2], xpos: 10, ypos: 7, description: "Named after Darmstadt, Germany. Only a few atoms have ever been created.", uses: "Research only", funFact: "Darmstadtium was created by bombarding nickel atoms into lead at high speed — the entire global production of darmstadtium amounts to just a few atoms." },
  { number: 111, symbol: "Rg", name: "Roentgenium", mass: 282, group: 11, period: 7, category: "transition metal", electronegativity: null, radius: null, meltingPoint: null, boilingPoint: null, density: 28.7, oxidationStates: "+5, +3, +1", electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s¹", discovered: 1994, discoveredBy: "Peter Armbruster", phase: "Solid", ionizationEnergy: null, electronAffinity: null, valence: 3, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 111, neutrons: 171, electrons: 111, shells: [2, 8, 18, 32, 32, 17, 1], xpos: 11, ypos: 7, description: "Named after Wilhelm Röntgen, discoverer of X-rays. Extremely unstable.", uses: "Research only", funFact: "Roentgenium was named after Wilhelm Röntgen who discovered X-rays in 1895 — a fitting tribute connecting the pioneer of radiation science to the frontiers of synthetic element creation." },
  { number: 112, symbol: "Cn", name: "Copernicium", mass: 285, group: 12, period: 7, category: "transition metal", electronegativity: null, radius: null, meltingPoint: null, boilingPoint: 84, density: 14.0, oxidationStates: "+4, +2, 0", electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s²", discovered: 1996, discoveredBy: "Peter Armbruster", phase: "Gas", ionizationEnergy: null, electronAffinity: null, valence: 2, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 112, neutrons: 173, electrons: 112, shells: [2, 8, 18, 32, 32, 18, 2], xpos: 12, ypos: 7, description: "Named after Copernicus. May be a gas at room temperature due to relativistic effects.", uses: "Research only", funFact: "Copernicium is predicted to be a gas at room temperature — a 'metal' that behaves like a noble gas due to extreme relativistic effects on its outermost electrons." },
  { number: 113, symbol: "Nh", name: "Nihonium", mass: 286, group: 13, period: 7, category: "post-transition metal", electronegativity: null, radius: null, meltingPoint: 430, boilingPoint: 1130, density: 16.0, oxidationStates: "+3, +1", electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹", discovered: 2004, discoveredBy: "Kosuke Morita", phase: "Solid", ionizationEnergy: null, electronAffinity: null, valence: 3, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 113, neutrons: 173, electrons: 113, shells: [2, 8, 18, 32, 32, 18, 3], xpos: 13, ypos: 7, description: "First element discovered in Asia. Named after Japan (Nihon in Japanese).", uses: "Research only", funFact: "Nihonium was the first element discovered in Asia — Japanese scientists at RIKEN worked for 9 years, creating only 3 atoms, before their discovery was confirmed in 2012." },
  { number: 114, symbol: "Fl", name: "Flerovium", mass: 289, group: 14, period: 7, category: "post-transition metal", electronegativity: null, radius: null, meltingPoint: null, boilingPoint: 210, density: 14.0, oxidationStates: "+6, +4, +2, 0", electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²", discovered: 1999, discoveredBy: "Georgy Flerov", phase: "Solid", ionizationEnergy: null, electronAffinity: null, valence: 4, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 114, neutrons: 175, electrons: 114, shells: [2, 8, 18, 32, 32, 18, 4], xpos: 14, ypos: 7, description: "Named after physicist Georgy Flerov. Expected to be relatively stable for its size.", uses: "Research only", funFact: "Flerovium sits at a predicted 'island of stability' — a theoretical region where superheavy elements have longer half-lives due to favorable nuclear configurations." },
  { number: 115, symbol: "Mc", name: "Moscovium", mass: 290, group: 15, period: 7, category: "post-transition metal", electronegativity: null, radius: null, meltingPoint: 670, boilingPoint: 1400, density: 13.5, oxidationStates: "+3, +1", electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³", discovered: 2003, discoveredBy: "Yuri Oganessian", phase: "Solid", ionizationEnergy: null, electronAffinity: null, valence: 3, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 115, neutrons: 175, electrons: 115, shells: [2, 8, 18, 32, 32, 18, 5], xpos: 15, ypos: 7, description: "Named after Moscow Oblast, Russia. Synthesized in a joint US-Russian collaboration.", uses: "Research only", funFact: "Moscovium was created in a rare US-Russian scientific collaboration — American calcium ions were fired at Russian americium targets at a Dubna laboratory." },
  { number: 116, symbol: "Lv", name: "Livermorium", mass: 293, group: 16, period: 7, category: "post-transition metal", electronegativity: null, radius: null, meltingPoint: 637, boilingPoint: 1000, density: 12.9, oxidationStates: "+4, +2, -2", electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴", discovered: 2000, discoveredBy: "Yuri Oganessian", phase: "Solid", ionizationEnergy: null, electronAffinity: null, valence: 4, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 116, neutrons: 177, electrons: 116, shells: [2, 8, 18, 32, 32, 18, 6], xpos: 16, ypos: 7, description: "Named after Lawrence Livermore National Laboratory in California.", uses: "Research only", funFact: "Livermorium was jointly discovered by the Joint Institute for Nuclear Research in Russia and Lawrence Livermore National Laboratory — hence its name honoring the Californian city." },
  { number: 117, symbol: "Ts", name: "Tennessine", mass: 294, group: 17, period: 7, category: "halogen", electronegativity: null, radius: null, meltingPoint: 700, boilingPoint: 883, density: 7.2, oxidationStates: "+5, +3, +1, -1", electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵", discovered: 2010, discoveredBy: "Yuri Oganessian", phase: "Solid", ionizationEnergy: null, electronAffinity: null, valence: 5, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 117, neutrons: 177, electrons: 117, shells: [2, 8, 18, 32, 32, 18, 7], xpos: 17, ypos: 7, description: "Named after Tennessee, recognizing Oak Ridge, Vanderbilt, and Univ. of Tennessee.", uses: "Research only", funFact: "Creating tennessine required several milligrams of berkelium — itself so rare to produce that a special reactor at Oak Ridge ran for 18 months just to make enough." },
  { number: 118, symbol: "Og", name: "Oganesson", mass: 294, group: 18, period: 7, category: "noble gas", electronegativity: null, radius: null, meltingPoint: 52, boilingPoint: 177, density: 7.0, oxidationStates: "0, +4, +6", electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶", discovered: 2002, discoveredBy: "Yuri Oganessian", phase: "Solid", ionizationEnergy: null, electronAffinity: 0, valence: 0, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 118, neutrons: 176, electrons: 118, shells: [2, 8, 18, 32, 32, 18, 8], xpos: 18, ypos: 7, description: "Named after physicist Yuri Oganessian. Heaviest element confirmed. May be a solid, not a gas.", uses: "Research only — only a few atoms have ever been created", funFact: "Oganesson is so heavy that relativistic effects make it behave nothing like other noble gases — it may actually be a semiconductor." },
];

// Isotope data per element
const ISOTOPE_DATA = {
  1: [
    { symbol: "¹H",  name: "Protium",       massNumber: 1,  neutrons: 0,  abundance: "99.985%",  halfLife: "Stable",            spin: "1/2", binding: 0,     radioactive: false, decayMode: null, notes: "Most common isotope. No neutrons." },
    { symbol: "²H",  name: "Deuterium",     massNumber: 2,  neutrons: 1,  abundance: "0.015%",   halfLife: "Stable",            spin: "1",   binding: 1.112, radioactive: false, decayMode: null, notes: "Heavy hydrogen. Used in NMR and nuclear reactors." },
    { symbol: "³H",  name: "Tritium",       massNumber: 3,  neutrons: 2,  abundance: "Trace",    halfLife: "12.32 years",       spin: "1/2", binding: 2.827, radioactive: true,  decayMode: "β⁻", notes: "Radioactive. Used in thermonuclear weapons and luminescent devices." },
    { symbol: "⁴H",  name: "Hydrogen-4",   massNumber: 4,  neutrons: 3,  abundance: "Synthetic", halfLife: "139 yoctoseconds", spin: "2",   binding: null,  radioactive: true,  decayMode: "n",  notes: "Extremely unstable. Decays by neutron emission." },
  ],
  2: [
    { symbol: "³He",  name: "Helium-3",  massNumber: 3,  neutrons: 1,  abundance: "0.0002%",  halfLife: "Stable",         spin: "1/2", binding: 2.573, radioactive: false, decayMode: null, notes: "Rare stable isotope. Potential future fusion fuel." },
    { symbol: "⁴He",  name: "Helium-4",  massNumber: 4,  neutrons: 2,  abundance: "99.9998%", halfLife: "Stable",         spin: "0",   binding: 7.074, radioactive: false, decayMode: null, notes: "Most abundant. Alpha particles are ⁴He nuclei." },
    { symbol: "⁵He",  name: "Helium-5",  massNumber: 5,  neutrons: 3,  abundance: "Synthetic", halfLife: "700 yoctoseconds", spin: "3/2", binding: null,  radioactive: true,  decayMode: "n",  notes: "Extremely short-lived. Decays by neutron emission." },
    { symbol: "⁶He",  name: "Helium-6",  massNumber: 6,  neutrons: 4,  abundance: "Synthetic", halfLife: "806.7 ms",       spin: "0",   binding: 4.878, radioactive: true,  decayMode: "β⁻", notes: "Beta emitter with halo nucleus structure." },
    { symbol: "⁸He",  name: "Helium-8",  massNumber: 8,  neutrons: 6,  abundance: "Synthetic", halfLife: "119 ms",         spin: "0",   binding: 3.926, radioactive: true,  decayMode: "β⁻", notes: "Neutron-rich halo nucleus." },
  ],
  3: [
    { symbol: "⁶Li",  name: "Lithium-6",   massNumber: 6,  neutrons: 3,  abundance: "7.59%",    halfLife: "Stable",       spin: "1",   binding: 5.332, radioactive: false, decayMode: null,     notes: "Used in nuclear weapons and thermonuclear fusion research." },
    { symbol: "⁷Li",  name: "Lithium-7",   massNumber: 7,  neutrons: 4,  abundance: "92.41%",   halfLife: "Stable",       spin: "3/2", binding: 5.606, radioactive: false, decayMode: null,     notes: "Most abundant lithium isotope. Used in NMR spectroscopy." },
    { symbol: "⁸Li",  name: "Lithium-8",   massNumber: 8,  neutrons: 5,  abundance: "Synthetic", halfLife: "840.3 ms",    spin: "2",   binding: 5.160, radioactive: true,  decayMode: "β⁻",     notes: "Short-lived beta emitter." },
    { symbol: "⁹Li",  name: "Lithium-9",   massNumber: 9,  neutrons: 6,  abundance: "Synthetic", halfLife: "178.3 ms",    spin: "3/2", binding: 5.038, radioactive: true,  decayMode: "β⁻, n", notes: "Decays primarily by beta emission with neutron." },
    { symbol: "¹¹Li", name: "Lithium-11",  massNumber: 11, neutrons: 8,  abundance: "Synthetic", halfLife: "8.75 ms",     spin: "3/2", binding: 4.430, radioactive: true,  decayMode: "β⁻, n", notes: "Two-neutron halo nucleus. Paradigmatic halo nuclide." },
  ],
  4: [
    { symbol: "⁷Be",  name: "Beryllium-7",  massNumber: 7,  neutrons: 3,  abundance: "Synthetic", halfLife: "53.22 days",   spin: "3/2", binding: 5.371, radioactive: true,  decayMode: "ε",  notes: "Produced by cosmic rays. Used in solar neutrino research." },
    { symbol: "⁸Be",  name: "Beryllium-8",  massNumber: 8,  neutrons: 4,  abundance: "Synthetic", halfLife: "81.9 as",      spin: "0",   binding: 7.062, radioactive: true,  decayMode: "2α", notes: "Resonance state crucial for triple-alpha process in stars." },
    { symbol: "⁹Be",  name: "Beryllium-9",  massNumber: 9,  neutrons: 5,  abundance: "100%",      halfLife: "Stable",       spin: "3/2", binding: 6.463, radioactive: false, decayMode: null, notes: "Only stable beryllium isotope. One-neutron halo candidate." },
    { symbol: "¹⁰Be", name: "Beryllium-10", massNumber: 10, neutrons: 6,  abundance: "Trace",     halfLife: "1.51 Myr",     spin: "0",   binding: 6.498, radioactive: true,  decayMode: "β⁻", notes: "Cosmogenic nuclide used in geochronology." },
    { symbol: "¹¹Be", name: "Beryllium-11", massNumber: 11, neutrons: 7,  abundance: "Synthetic", halfLife: "13.81 s",      spin: "1/2", binding: 5.952, radioactive: true,  decayMode: "β⁻", notes: "One-neutron halo nucleus." },
    { symbol: "¹²Be", name: "Beryllium-12", massNumber: 12, neutrons: 8,  abundance: "Synthetic", halfLife: "21.49 ms",     spin: "0",   binding: 5.721, radioactive: true,  decayMode: "β⁻", notes: "Neutron-rich isotope used in nuclear structure studies." },
  ],
  5: [
    { symbol: "¹⁰B",  name: "Boron-10",  massNumber: 10, neutrons: 5,  abundance: "19.9%",    halfLife: "Stable",     spin: "3",   binding: 6.475, radioactive: false, decayMode: null, notes: "High neutron-capture cross section. Used in neutron detectors and cancer therapy." },
    { symbol: "¹¹B",  name: "Boron-11",  massNumber: 11, neutrons: 6,  abundance: "80.1%",    halfLife: "Stable",     spin: "3/2", binding: 6.928, radioactive: false, decayMode: null, notes: "Most abundant boron isotope." },
    { symbol: "⁸B",   name: "Boron-8",   massNumber: 8,  neutrons: 3,  abundance: "Synthetic", halfLife: "770 ms",    spin: "2",   binding: 4.717, radioactive: true,  decayMode: "β⁺, α", notes: "Important in solar neutrino flux studies." },
    { symbol: "¹²B",  name: "Boron-12",  massNumber: 12, neutrons: 7,  abundance: "Synthetic", halfLife: "20.2 ms",   spin: "1",   binding: 6.631, radioactive: true,  decayMode: "β⁻", notes: "Mirror nucleus of ¹²N." },
    { symbol: "¹³B",  name: "Boron-13",  massNumber: 13, neutrons: 8,  abundance: "Synthetic", halfLife: "17.33 ms",  spin: "3/2", binding: 6.496, radioactive: true,  decayMode: "β⁻", notes: "Neutron-rich boron isotope." },
  ],
  6: [
    { symbol: "¹²C",  name: "Carbon-12",  massNumber: 12, neutrons: 6,  abundance: "98.93%",   halfLife: "Stable",       spin: "0",   binding: 7.680, radioactive: false, decayMode: null, notes: "Defines the atomic mass unit. Basis of organic chemistry." },
    { symbol: "¹³C",  name: "Carbon-13",  massNumber: 13, neutrons: 7,  abundance: "1.07%",    halfLife: "Stable",       spin: "1/2", binding: 7.470, radioactive: false, decayMode: null, notes: "Used in NMR spectroscopy and metabolic studies." },
    { symbol: "¹⁴C",  name: "Carbon-14",  massNumber: 14, neutrons: 8,  abundance: "Trace",    halfLife: "5730 years",   spin: "0",   binding: 7.520, radioactive: true,  decayMode: "β⁻", notes: "Used in radiocarbon dating of organic materials." },
    { symbol: "¹⁰C",  name: "Carbon-10",  massNumber: 10, neutrons: 4,  abundance: "Synthetic", halfLife: "19.29 s",     spin: "0",   binding: 6.032, radioactive: true,  decayMode: "β⁺", notes: "Proton-rich isotope; used in PET tracer research." },
    { symbol: "¹¹C",  name: "Carbon-11",  massNumber: 11, neutrons: 5,  abundance: "Synthetic", halfLife: "20.36 min",   spin: "3/2", binding: 6.677, radioactive: true,  decayMode: "β⁺", notes: "Widely used PET radiotracer." },
    { symbol: "¹⁵C",  name: "Carbon-15",  massNumber: 15, neutrons: 9,  abundance: "Synthetic", halfLife: "2.449 s",     spin: "1/2", binding: 7.100, radioactive: true,  decayMode: "β⁻", notes: "One-neutron halo candidate." },
    { symbol: "¹⁶C",  name: "Carbon-16",  massNumber: 16, neutrons: 10, abundance: "Synthetic", halfLife: "747 ms",      spin: "0",   binding: 6.922, radioactive: true,  decayMode: "β⁻, n", notes: "Neutron-rich; decays with neutron emission." },
  ],
  7: [
    { symbol: "¹⁴N",  name: "Nitrogen-14", massNumber: 14, neutrons: 7,  abundance: "99.636%",  halfLife: "Stable",     spin: "1",   binding: 7.476, radioactive: false, decayMode: null, notes: "Most abundant nitrogen isotope. Essential for life." },
    { symbol: "¹⁵N",  name: "Nitrogen-15", massNumber: 15, neutrons: 8,  abundance: "0.364%",   halfLife: "Stable",     spin: "1/2", binding: 7.699, radioactive: false, decayMode: null, notes: "Used as stable isotope tracer in biochemistry." },
    { symbol: "¹³N",  name: "Nitrogen-13", massNumber: 13, neutrons: 6,  abundance: "Synthetic", halfLife: "9.965 min", spin: "1/2", binding: 7.239, radioactive: true,  decayMode: "β⁺", notes: "PET radiotracer. Produced by proton bombardment." },
    { symbol: "¹⁶N",  name: "Nitrogen-16", massNumber: 16, neutrons: 9,  abundance: "Synthetic", halfLife: "7.13 s",    spin: "2",   binding: 7.374, radioactive: true,  decayMode: "β⁻", notes: "Produced in nuclear reactors from oxygen-16." },
    { symbol: "¹⁷N",  name: "Nitrogen-17", massNumber: 17, neutrons: 10, abundance: "Synthetic", halfLife: "4.173 s",   spin: "1/2", binding: 7.286, radioactive: true,  decayMode: "β⁻", notes: "Decays with high-energy beta and neutron." },
  ],
  8: [
    { symbol: "¹⁶O",  name: "Oxygen-16",  massNumber: 16, neutrons: 8,  abundance: "99.757%",  halfLife: "Stable",      spin: "0",   binding: 7.976, radioactive: false, decayMode: null, notes: "Doubly magic nucleus. Most abundant oxygen isotope." },
    { symbol: "¹⁷O",  name: "Oxygen-17",  massNumber: 17, neutrons: 9,  abundance: "0.038%",   halfLife: "Stable",      spin: "5/2", binding: 7.751, radioactive: false, decayMode: null, notes: "Used in NMR and metabolic tracing studies." },
    { symbol: "¹⁸O",  name: "Oxygen-18",  massNumber: 18, neutrons: 10, abundance: "0.205%",   halfLife: "Stable",      spin: "0",   binding: 7.767, radioactive: false, decayMode: null, notes: "Used in paleoclimatology and metabolic studies." },
    { symbol: "¹⁵O",  name: "Oxygen-15",  massNumber: 15, neutrons: 7,  abundance: "Synthetic", halfLife: "122.24 s",   spin: "1/2", binding: 7.464, radioactive: true,  decayMode: "β⁺", notes: "PET radiotracer for blood-flow imaging." },
    { symbol: "¹⁴O",  name: "Oxygen-14",  massNumber: 14, neutrons: 6,  abundance: "Synthetic", halfLife: "70.598 s",   spin: "0",   binding: 7.052, radioactive: true,  decayMode: "β⁺", notes: "Proton-rich isotope." },
    { symbol: "¹⁹O",  name: "Oxygen-19",  massNumber: 19, neutrons: 11, abundance: "Synthetic", halfLife: "26.88 s",    spin: "5/2", binding: 7.566, radioactive: true,  decayMode: "β⁻", notes: "Neutron-rich isotope of oxygen." },
    { symbol: "²⁰O",  name: "Oxygen-20",  massNumber: 20, neutrons: 12, abundance: "Synthetic", halfLife: "13.51 s",    spin: "0",   binding: 7.568, radioactive: true,  decayMode: "β⁻", notes: "Neutron-rich; nuclear structure studies." },
  ],
  9: [
    { symbol: "¹⁹F",  name: "Fluorine-19", massNumber: 19, neutrons: 10, abundance: "100%",      halfLife: "Stable",     spin: "1/2", binding: 7.779, radioactive: false, decayMode: null, notes: "Only stable fluorine isotope. Used in ¹⁹F NMR and MRI." },
    { symbol: "¹⁸F",  name: "Fluorine-18", massNumber: 18, neutrons: 9,  abundance: "Synthetic", halfLife: "109.77 min", spin: "1",   binding: 7.632, radioactive: true,  decayMode: "β⁺", notes: "Most widely used PET radiotracer (FDG-PET)." },
    { symbol: "¹⁷F",  name: "Fluorine-17", massNumber: 17, neutrons: 8,  abundance: "Synthetic", halfLife: "64.49 s",    spin: "5/2", binding: 7.542, radioactive: true,  decayMode: "β⁺", notes: "Proton-rich fluorine isotope." },
    { symbol: "²⁰F",  name: "Fluorine-20", massNumber: 20, neutrons: 11, abundance: "Synthetic", halfLife: "11.163 s",   spin: "2",   binding: 7.720, radioactive: true,  decayMode: "β⁻", notes: "Neutron-rich fluorine isotope." },
    { symbol: "²¹F",  name: "Fluorine-21", massNumber: 21, neutrons: 12, abundance: "Synthetic", halfLife: "4.158 s",    spin: "5/2", binding: 7.615, radioactive: true,  decayMode: "β⁻", notes: "Neutron-rich; used in nuclear structure research." },
  ],
  10: [
    { symbol: "²⁰Ne", name: "Neon-20", massNumber: 20, neutrons: 10, abundance: "90.48%",   halfLife: "Stable",    spin: "0",   binding: 8.032, radioactive: false, decayMode: null, notes: "Most abundant neon isotope." },
    { symbol: "²¹Ne", name: "Neon-21", massNumber: 21, neutrons: 11, abundance: "0.27%",    halfLife: "Stable",    spin: "3/2", binding: 7.972, radioactive: false, decayMode: null, notes: "Used in nucleosynthesis studies." },
    { symbol: "²²Ne", name: "Neon-22", massNumber: 22, neutrons: 12, abundance: "9.25%",    halfLife: "Stable",    spin: "0",   binding: 8.081, radioactive: false, decayMode: null, notes: "Used in isotope ratio studies." },
    { symbol: "¹⁹Ne", name: "Neon-19", massNumber: 19, neutrons: 9,  abundance: "Synthetic", halfLife: "17.22 s",  spin: "1/2", binding: 7.567, radioactive: true,  decayMode: "β⁺", notes: "Proton-rich neon isotope." },
    { symbol: "²³Ne", name: "Neon-23", massNumber: 23, neutrons: 13, abundance: "Synthetic", halfLife: "37.14 s",  spin: "5/2", binding: 7.956, radioactive: true,  decayMode: "β⁻", notes: "Neutron-rich neon isotope." },
    { symbol: "²⁴Ne", name: "Neon-24", massNumber: 24, neutrons: 14, abundance: "Synthetic", halfLife: "3.38 min", spin: "0",   binding: 7.989, radioactive: true,  decayMode: "β⁻", notes: "Neutron-rich neon isotope." },
  ],
  11: [
    { symbol: "²³Na", name: "Sodium-23", massNumber: 23, neutrons: 12, abundance: "100%",      halfLife: "Stable",       spin: "3/2", binding: 8.112, radioactive: false, decayMode: null, notes: "Only stable sodium isotope. Essential biological element." },
    { symbol: "²²Na", name: "Sodium-22", massNumber: 22, neutrons: 11, abundance: "Synthetic", halfLife: "2.6019 years", spin: "3",   binding: 7.915, radioactive: true,  decayMode: "β⁺", notes: "Used as positron source in physics experiments." },
    { symbol: "²⁴Na", name: "Sodium-24", massNumber: 24, neutrons: 13, abundance: "Synthetic", halfLife: "14.957 h",     spin: "4",   binding: 8.063, radioactive: true,  decayMode: "β⁻", notes: "Used medically to study electrolyte balance." },
    { symbol: "²¹Na", name: "Sodium-21", massNumber: 21, neutrons: 10, abundance: "Synthetic", halfLife: "22.49 s",      spin: "3/2", binding: 7.602, radioactive: true,  decayMode: "β⁺", notes: "Proton-rich sodium isotope." },
    { symbol: "²⁵Na", name: "Sodium-25", massNumber: 25, neutrons: 14, abundance: "Synthetic", halfLife: "59.1 s",       spin: "5/2", binding: 8.085, radioactive: true,  decayMode: "β⁻", notes: "Neutron-rich sodium isotope." },
  ],
  12: [
    { symbol: "²⁴Mg", name: "Magnesium-24", massNumber: 24, neutrons: 12, abundance: "78.99%",   halfLife: "Stable",      spin: "0",   binding: 8.261, radioactive: false, decayMode: null, notes: "Most abundant magnesium isotope." },
    { symbol: "²⁵Mg", name: "Magnesium-25", massNumber: 25, neutrons: 13, abundance: "10.00%",   halfLife: "Stable",      spin: "5/2", binding: 8.224, radioactive: false, decayMode: null, notes: "Used in geological age dating." },
    { symbol: "²⁶Mg", name: "Magnesium-26", massNumber: 26, neutrons: 14, abundance: "11.01%",   halfLife: "Stable",      spin: "0",   binding: 8.334, radioactive: false, decayMode: null, notes: "Decay product of ²⁶Al; used in cosmochronology." },
    { symbol: "²³Mg", name: "Magnesium-23", massNumber: 23, neutrons: 11, abundance: "Synthetic", halfLife: "11.317 s",    spin: "3/2", binding: 7.901, radioactive: true,  decayMode: "β⁺", notes: "Proton-rich; studied in nuclear astrophysics." },
    { symbol: "²⁷Mg", name: "Magnesium-27", massNumber: 27, neutrons: 15, abundance: "Synthetic", halfLife: "9.458 min",   spin: "1/2", binding: 8.261, radioactive: true,  decayMode: "β⁻", notes: "Neutron-rich magnesium isotope." },
    { symbol: "²⁸Mg", name: "Magnesium-28", massNumber: 28, neutrons: 16, abundance: "Synthetic", halfLife: "20.915 h",    spin: "0",   binding: 8.272, radioactive: true,  decayMode: "β⁻", notes: "Used in tracer studies in biology." },
  ],
  13: [
    { symbol: "²⁷Al", name: "Aluminum-27", massNumber: 27, neutrons: 14, abundance: "100%",      halfLife: "Stable",      spin: "5/2", binding: 8.332, radioactive: false, decayMode: null, notes: "Only stable aluminum isotope." },
    { symbol: "²⁶Al", name: "Aluminum-26", massNumber: 26, neutrons: 13, abundance: "Trace",     halfLife: "717000 years", spin: "5",   binding: 8.149, radioactive: true,  decayMode: "β⁺", notes: "Important in cosmochronology. Extinct in early solar system." },
    { symbol: "²⁸Al", name: "Aluminum-28", massNumber: 28, neutrons: 15, abundance: "Synthetic", halfLife: "2.245 min",   spin: "3",   binding: 8.270, radioactive: true,  decayMode: "β⁻", notes: "Produced by neutron activation of ²⁷Al." },
    { symbol: "²⁵Al", name: "Aluminum-25", massNumber: 25, neutrons: 12, abundance: "Synthetic", halfLife: "7.183 s",     spin: "5/2", binding: 7.993, radioactive: true,  decayMode: "β⁺", notes: "Proton-rich aluminum isotope." },
    { symbol: "²⁹Al", name: "Aluminum-29", massNumber: 29, neutrons: 16, abundance: "Synthetic", halfLife: "6.56 min",    spin: "5/2", binding: 8.270, radioactive: true,  decayMode: "β⁻", notes: "Neutron-rich aluminum isotope." },
    { symbol: "³⁰Al", name: "Aluminum-30", massNumber: 30, neutrons: 17, abundance: "Synthetic", halfLife: "3.60 s",      spin: "3",   binding: 8.171, radioactive: true,  decayMode: "β⁻", notes: "Neutron-rich; short-lived." },
  ],
  14: [
    { symbol: "²⁸Si", name: "Silicon-28", massNumber: 28, neutrons: 14, abundance: "92.23%",   halfLife: "Stable",      spin: "0",   binding: 8.447, radioactive: false, decayMode: null, notes: "Dominant silicon isotope. Doubly magic number structure debated." },
    { symbol: "²⁹Si", name: "Silicon-29", massNumber: 29, neutrons: 15, abundance: "4.67%",    halfLife: "Stable",      spin: "1/2", binding: 8.449, radioactive: false, decayMode: null, notes: "Used in ²⁹Si NMR spectroscopy of silicates." },
    { symbol: "³⁰Si", name: "Silicon-30", massNumber: 30, neutrons: 16, abundance: "3.10%",    halfLife: "Stable",      spin: "0",   binding: 8.521, radioactive: false, decayMode: null, notes: "Used in isotope dilution mass spectrometry." },
    { symbol: "³²Si", name: "Silicon-32", massNumber: 32, neutrons: 18, abundance: "Trace",    halfLife: "153 years",   spin: "0",   binding: 8.480, radioactive: true,  decayMode: "β⁻", notes: "Cosmogenic nuclide used in dating ocean sediments." },
    { symbol: "²⁷Si", name: "Silicon-27", massNumber: 27, neutrons: 13, abundance: "Synthetic", halfLife: "4.16 s",     spin: "5/2", binding: 8.133, radioactive: true,  decayMode: "β⁺", notes: "Proton-rich silicon isotope." },
    { symbol: "³¹Si", name: "Silicon-31", massNumber: 31, neutrons: 17, abundance: "Synthetic", halfLife: "157.3 min",  spin: "3/2", binding: 8.459, radioactive: true,  decayMode: "β⁻", notes: "Used as tracer in semiconductor research." },
  ],
  15: [
    { symbol: "³¹P",  name: "Phosphorus-31", massNumber: 31, neutrons: 16, abundance: "100%",      halfLife: "Stable",      spin: "1/2", binding: 8.481, radioactive: false, decayMode: null, notes: "Only stable phosphorus isotope. Essential for DNA and ATP." },
    { symbol: "³²P",  name: "Phosphorus-32", massNumber: 32, neutrons: 17, abundance: "Synthetic", halfLife: "14.268 days", spin: "1",   binding: 8.463, radioactive: true,  decayMode: "β⁻", notes: "Widely used in molecular biology as a radiolabel." },
    { symbol: "³³P",  name: "Phosphorus-33", massNumber: 33, neutrons: 18, abundance: "Synthetic", halfLife: "25.35 days",  spin: "1/2", binding: 8.514, radioactive: true,  decayMode: "β⁻", notes: "Lower energy beta than ³²P. Used in DNA sequencing." },
    { symbol: "³⁰P",  name: "Phosphorus-30", massNumber: 30, neutrons: 15, abundance: "Synthetic", halfLife: "2.498 min",   spin: "1",   binding: 8.314, radioactive: true,  decayMode: "β⁺", notes: "First artificially produced radioisotope (Joliot-Curie, 1934)." },
    { symbol: "³⁴P",  name: "Phosphorus-34", massNumber: 34, neutrons: 19, abundance: "Synthetic", halfLife: "12.43 s",     spin: "1",   binding: 8.465, radioactive: true,  decayMode: "β⁻", notes: "Neutron-rich phosphorus isotope." },
  ],
  16: [
    { symbol: "³²S",  name: "Sulfur-32",  massNumber: 32, neutrons: 16, abundance: "94.99%",   halfLife: "Stable",     spin: "0",   binding: 8.493, radioactive: false, decayMode: null, notes: "Most abundant sulfur isotope." },
    { symbol: "³³S",  name: "Sulfur-33",  massNumber: 33, neutrons: 17, abundance: "0.75%",    halfLife: "Stable",     spin: "3/2", binding: 8.498, radioactive: false, decayMode: null, notes: "Used in isotope tracer studies of sulfur metabolism." },
    { symbol: "³⁴S",  name: "Sulfur-34",  massNumber: 34, neutrons: 18, abundance: "4.25%",    halfLife: "Stable",     spin: "0",   binding: 8.584, radioactive: false, decayMode: null, notes: "Fractionated by biological processes; used in geochemistry." },
    { symbol: "³⁶S",  name: "Sulfur-36",  massNumber: 36, neutrons: 20, abundance: "0.01%",    halfLife: "Stable",     spin: "0",   binding: 8.576, radioactive: false, decayMode: null, notes: "Rarest stable sulfur isotope." },
    { symbol: "³⁵S",  name: "Sulfur-35",  massNumber: 35, neutrons: 19, abundance: "Trace",    halfLife: "87.51 days", spin: "3/2", binding: 8.537, radioactive: true,  decayMode: "β⁻", notes: "Cosmogenic; used in hydrology and biochemistry tracers." },
    { symbol: "³¹S",  name: "Sulfur-31",  massNumber: 31, neutrons: 15, abundance: "Synthetic", halfLife: "2.572 s",   spin: "1/2", binding: 8.187, radioactive: true,  decayMode: "β⁺", notes: "Proton-rich sulfur isotope." },
    { symbol: "³⁷S",  name: "Sulfur-37",  massNumber: 37, neutrons: 21, abundance: "Synthetic", halfLife: "5.05 min",  spin: "7/2", binding: 8.531, radioactive: true,  decayMode: "β⁻", notes: "Neutron-rich; short-lived." },
  ],
  17: [
    { symbol: "³⁵Cl", name: "Chlorine-35", massNumber: 35, neutrons: 18, abundance: "75.77%",   halfLife: "Stable",      spin: "3/2", binding: 8.520, radioactive: false, decayMode: null, notes: "More abundant stable chlorine isotope." },
    { symbol: "³⁷Cl", name: "Chlorine-37", massNumber: 37, neutrons: 20, abundance: "24.23%",   halfLife: "Stable",      spin: "3/2", binding: 8.570, radioactive: false, decayMode: null, notes: "Used in isotope ratio analysis." },
    { symbol: "³⁶Cl", name: "Chlorine-36", massNumber: 36, neutrons: 19, abundance: "Trace",    halfLife: "301000 years", spin: "2",  binding: 8.522, radioactive: true,  decayMode: "β⁻", notes: "Used in groundwater dating and nuclear weapons fallout studies." },
    { symbol: "³⁴Cl", name: "Chlorine-34", massNumber: 34, neutrons: 17, abundance: "Synthetic", halfLife: "1.5264 s",   spin: "0",   binding: 8.344, radioactive: true,  decayMode: "β⁺", notes: "Proton-rich short-lived isotope." },
    { symbol: "³⁸Cl", name: "Chlorine-38", massNumber: 38, neutrons: 21, abundance: "Synthetic", halfLife: "37.24 min",  spin: "2",   binding: 8.561, radioactive: true,  decayMode: "β⁻", notes: "Neutron-rich chlorine isotope." },
    { symbol: "³⁹Cl", name: "Chlorine-39", massNumber: 39, neutrons: 22, abundance: "Synthetic", halfLife: "55.6 min",   spin: "3/2", binding: 8.537, radioactive: true,  decayMode: "β⁻", notes: "Neutron-rich chlorine isotope." },
  ],
  18: [
    { symbol: "³⁶Ar", name: "Argon-36", massNumber: 36, neutrons: 18, abundance: "0.3365%",  halfLife: "Stable",      spin: "0",   binding: 8.520, radioactive: false, decayMode: null, notes: "Produced from ³⁶Cl decay; used in geochronology." },
    { symbol: "³⁸Ar", name: "Argon-38", massNumber: 38, neutrons: 20, abundance: "0.0632%",  halfLife: "Stable",      spin: "0",   binding: 8.614, radioactive: false, decayMode: null, notes: "Rare stable argon isotope." },
    { symbol: "⁴⁰Ar", name: "Argon-40", massNumber: 40, neutrons: 22, abundance: "99.6003%", halfLife: "Stable",      spin: "0",   binding: 8.595, radioactive: false, decayMode: null, notes: "Dominant atmospheric argon. Product of ⁴⁰K decay." },
    { symbol: "³⁷Ar", name: "Argon-37", massNumber: 37, neutrons: 19, abundance: "Synthetic", halfLife: "35.04 days",  spin: "3/2", binding: 8.527, radioactive: true,  decayMode: "ε",  notes: "Produced in nuclear explosions. Used in CTBT monitoring." },
    { symbol: "³⁹Ar", name: "Argon-39", massNumber: 39, neutrons: 21, abundance: "Trace",    halfLife: "269 years",   spin: "7/2", binding: 8.563, radioactive: true,  decayMode: "β⁻", notes: "Cosmogenic; used to date groundwater and ice cores." },
    { symbol: "⁴¹Ar", name: "Argon-41", massNumber: 41, neutrons: 23, abundance: "Synthetic", halfLife: "109.61 min",  spin: "7/2", binding: 8.578, radioactive: true,  decayMode: "β⁻", notes: "Monitored around nuclear facilities as activation product." },
    { symbol: "⁴²Ar", name: "Argon-42", massNumber: 42, neutrons: 24, abundance: "Synthetic", halfLife: "32.9 years",  spin: "0",   binding: 8.602, radioactive: true,  decayMode: "β⁻", notes: "Used in tracer experiments." },
  ],
  19: [
    { symbol: "³⁹K",  name: "Potassium-39", massNumber: 39, neutrons: 20, abundance: "93.2581%", halfLife: "Stable",       spin: "3/2", binding: 8.557, radioactive: false, decayMode: null,      notes: "Most abundant potassium isotope. Essential intracellular cation." },
    { symbol: "⁴⁰K",  name: "Potassium-40", massNumber: 40, neutrons: 21, abundance: "0.0117%",  halfLife: "1.248 Gyr",    spin: "4",   binding: 8.538, radioactive: true,  decayMode: "β⁻, ε",  notes: "Natural radioisotope. Source of background radiation in living things." },
    { symbol: "⁴¹K",  name: "Potassium-41", massNumber: 41, neutrons: 22, abundance: "6.7302%",  halfLife: "Stable",       spin: "3/2", binding: 8.576, radioactive: false, decayMode: null,      notes: "Used in isotope ratio studies and NMR." },
    { symbol: "³⁸K",  name: "Potassium-38", massNumber: 38, neutrons: 19, abundance: "Synthetic", halfLife: "7.636 min",   spin: "3",   binding: 8.437, radioactive: true,  decayMode: "β⁺",     notes: "Proton-rich; used in nuclear astrophysics." },
    { symbol: "⁴²K",  name: "Potassium-42", massNumber: 42, neutrons: 23, abundance: "Synthetic", halfLife: "12.355 h",    spin: "2",   binding: 8.555, radioactive: true,  decayMode: "β⁻",     notes: "Used medically to measure potassium distribution." },
    { symbol: "⁴³K",  name: "Potassium-43", massNumber: 43, neutrons: 24, abundance: "Synthetic", halfLife: "22.3 h",      spin: "3/2", binding: 8.576, radioactive: true,  decayMode: "β⁻",     notes: "Used in biomedical tracing studies." },
  ],
  20: [
    { symbol: "⁴⁰Ca", name: "Calcium-40",  massNumber: 40, neutrons: 20, abundance: "96.941%",  halfLife: "Stable",       spin: "0",   binding: 8.551, radioactive: false, decayMode: null,      notes: "Doubly magic nucleus. Most abundant calcium isotope." },
    { symbol: "⁴²Ca", name: "Calcium-42",  massNumber: 42, neutrons: 22, abundance: "0.647%",   halfLife: "Stable",       spin: "0",   binding: 8.617, radioactive: false, decayMode: null,      notes: "Stable calcium isotope." },
    { symbol: "⁴³Ca", name: "Calcium-43",  massNumber: 43, neutrons: 23, abundance: "0.135%",   halfLife: "Stable",       spin: "7/2", binding: 8.601, radioactive: false, decayMode: null,      notes: "Used in ⁴³Ca NMR spectroscopy of biological systems." },
    { symbol: "⁴⁴Ca", name: "Calcium-44",  massNumber: 44, neutrons: 24, abundance: "2.086%",   halfLife: "Stable",       spin: "0",   binding: 8.658, radioactive: false, decayMode: null,      notes: "Used in isotope dilution mass spectrometry." },
    { symbol: "⁴⁶Ca", name: "Calcium-46",  massNumber: 46, neutrons: 26, abundance: "0.004%",   halfLife: "Stable",       spin: "0",   binding: 8.669, radioactive: false, decayMode: null,      notes: "Rarest stable calcium isotope." },
    { symbol: "⁴⁸Ca", name: "Calcium-48",  massNumber: 48, neutrons: 28, abundance: "0.187%",   halfLife: ">6×10¹⁹ yr",  spin: "0",   binding: 8.666, radioactive: true,  decayMode: "2β⁻",    notes: "Doubly magic. Used as projectile to synthesize superheavy elements." },
    { symbol: "⁴¹Ca", name: "Calcium-41",  massNumber: 41, neutrons: 21, abundance: "Trace",    halfLife: "102900 years", spin: "7/2", binding: 8.547, radioactive: true,  decayMode: "ε",      notes: "Cosmogenic; used in bone resorption studies." },
    { symbol: "⁴⁵Ca", name: "Calcium-45",  massNumber: 45, neutrons: 25, abundance: "Synthetic", halfLife: "162.6 days",  spin: "7/2", binding: 8.658, radioactive: true,  decayMode: "β⁻",     notes: "Used in metabolic studies of calcium in bone." },
    { symbol: "⁴⁷Ca", name: "Calcium-47",  massNumber: 47, neutrons: 27, abundance: "Synthetic", halfLife: "4.536 days",  spin: "7/2", binding: 8.665, radioactive: true,  decayMode: "β⁻",     notes: "Used in nuclear medicine for bone studies." },
  ],
  21: [
    { symbol: "⁴⁵Sc", name: "Scandium-45", massNumber: 45, neutrons: 24, abundance: "100%",      halfLife: "Stable",      spin: "7/2", binding: 8.619, radioactive: false, decayMode: null, notes: "Only stable scandium isotope." },
    { symbol: "⁴⁴Sc", name: "Scandium-44", massNumber: 44, neutrons: 23, abundance: "Synthetic", halfLife: "3.9716 h",    spin: "2",   binding: 8.558, radioactive: true,  decayMode: "β⁺", notes: "PET radiotracer candidate in oncology." },
    { symbol: "⁴⁶Sc", name: "Scandium-46", massNumber: 46, neutrons: 25, abundance: "Synthetic", halfLife: "83.787 days", spin: "4",   binding: 8.643, radioactive: true,  decayMode: "β⁻", notes: "Used as radiotracer in oil refinery studies." },
    { symbol: "⁴⁷Sc", name: "Scandium-47", massNumber: 47, neutrons: 26, abundance: "Synthetic", halfLife: "3.3492 days", spin: "7/2", binding: 8.660, radioactive: true,  decayMode: "β⁻", notes: "Promising radioisotope for targeted cancer therapy." },
    { symbol: "⁴³Sc", name: "Scandium-43", massNumber: 43, neutrons: 22, abundance: "Synthetic", halfLife: "3.891 h",     spin: "7/2", binding: 8.530, radioactive: true,  decayMode: "β⁺", notes: "PET imaging isotope of interest." },
  ],
  22: [
    { symbol: "⁴⁶Ti", name: "Titanium-46", massNumber: 46, neutrons: 24, abundance: "8.25%",    halfLife: "Stable",     spin: "0",   binding: 8.656, radioactive: false, decayMode: null, notes: "Lightest stable titanium isotope." },
    { symbol: "⁴⁷Ti", name: "Titanium-47", massNumber: 47, neutrons: 25, abundance: "7.44%",    halfLife: "Stable",     spin: "5/2", binding: 8.661, radioactive: false, decayMode: null, notes: "Used in ⁴⁷Ti NMR spectroscopy." },
    { symbol: "⁴⁸Ti", name: "Titanium-48", massNumber: 48, neutrons: 26, abundance: "73.72%",   halfLife: "Stable",     spin: "0",   binding: 8.723, radioactive: false, decayMode: null, notes: "Most abundant titanium isotope." },
    { symbol: "⁴⁹Ti", name: "Titanium-49", massNumber: 49, neutrons: 27, abundance: "5.41%",    halfLife: "Stable",     spin: "7/2", binding: 8.711, radioactive: false, decayMode: null, notes: "Stable; used in isotope dilution analysis." },
    { symbol: "⁵⁰Ti", name: "Titanium-50", massNumber: 50, neutrons: 28, abundance: "5.18%",    halfLife: "Stable",     spin: "0",   binding: 8.756, radioactive: false, decayMode: null, notes: "Magic neutron number. Used in synthesis of superheavy elements." },
    { symbol: "⁴⁴Ti", name: "Titanium-44", massNumber: 44, neutrons: 22, abundance: "Synthetic", halfLife: "60.0 years", spin: "0",   binding: 8.534, radioactive: true,  decayMode: "ε",  notes: "Produced in supernova explosions. Used in gamma-ray astronomy." },
    { symbol: "⁴⁵Ti", name: "Titanium-45", massNumber: 45, neutrons: 23, abundance: "Synthetic", halfLife: "184.8 min",  spin: "7/2", binding: 8.558, radioactive: true,  decayMode: "β⁺", notes: "PET radiotracer candidate." },
    { symbol: "⁵¹Ti", name: "Titanium-51", massNumber: 51, neutrons: 29, abundance: "Synthetic", halfLife: "5.76 min",   spin: "3/2", binding: 8.706, radioactive: true,  decayMode: "β⁻", notes: "Neutron-rich short-lived isotope." },
  ],
  23: [
    { symbol: "⁵¹V",  name: "Vanadium-51", massNumber: 51, neutrons: 28, abundance: "99.750%",  halfLife: "Stable",      spin: "7/2", binding: 8.742, radioactive: false, decayMode: null, notes: "Most abundant vanadium isotope." },
    { symbol: "⁵⁰V",  name: "Vanadium-50", massNumber: 50, neutrons: 27, abundance: "0.250%",   halfLife: "1.5×10¹⁷ yr", spin: "6",  binding: 8.696, radioactive: true,  decayMode: "ε, β⁻", notes: "Nearly stable; one of the rarest stable nuclides." },
    { symbol: "⁴⁸V",  name: "Vanadium-48", massNumber: 48, neutrons: 25, abundance: "Synthetic", halfLife: "15.9735 days", spin: "4",  binding: 8.612, radioactive: true,  decayMode: "β⁺", notes: "Used in tracer and activation analysis studies." },
    { symbol: "⁴⁹V",  name: "Vanadium-49", massNumber: 49, neutrons: 26, abundance: "Synthetic", halfLife: "329 days",    spin: "7/2", binding: 8.647, radioactive: true,  decayMode: "ε",  notes: "Electron-capture isotope used in geochemistry." },
    { symbol: "⁵²V",  name: "Vanadium-52", massNumber: 52, neutrons: 29, abundance: "Synthetic", halfLife: "3.743 min",   spin: "3",   binding: 8.747, radioactive: true,  decayMode: "β⁻", notes: "Produced by neutron activation of ⁵¹V." },
  ],
  24: [
    { symbol: "⁵⁰Cr", name: "Chromium-50", massNumber: 50, neutrons: 26, abundance: "4.345%",   halfLife: ">1.8×10¹⁷ yr", spin: "0", binding: 8.701, radioactive: false, decayMode: null, notes: "Effectively stable. Potential double beta decay." },
    { symbol: "⁵²Cr", name: "Chromium-52", massNumber: 52, neutrons: 28, abundance: "83.789%",  halfLife: "Stable",       spin: "0",   binding: 8.776, radioactive: false, decayMode: null, notes: "Most abundant chromium isotope. Magic neutron number." },
    { symbol: "⁵³Cr", name: "Chromium-53", massNumber: 53, neutrons: 29, abundance: "9.501%",   halfLife: "Stable",       spin: "3/2", binding: 8.760, radioactive: false, decayMode: null, notes: "Used in ⁵³Cr NMR spectroscopy." },
    { symbol: "⁵⁴Cr", name: "Chromium-54", massNumber: 54, neutrons: 30, abundance: "2.365%",   halfLife: "Stable",       spin: "0",   binding: 8.778, radioactive: false, decayMode: null, notes: "Used in isotope dilution studies." },
    { symbol: "⁵¹Cr", name: "Chromium-51", massNumber: 51, neutrons: 27, abundance: "Synthetic", halfLife: "27.704 days", spin: "7/2", binding: 8.712, radioactive: true,  decayMode: "ε",  notes: "Used in red blood cell labelling and nuclear medicine." },
    { symbol: "⁴⁸Cr", name: "Chromium-48", massNumber: 48, neutrons: 24, abundance: "Synthetic", halfLife: "21.56 h",     spin: "0",   binding: 8.611, radioactive: true,  decayMode: "ε",  notes: "Parent of ⁴⁸V generator system for PET." },
    { symbol: "⁵⁵Cr", name: "Chromium-55", massNumber: 55, neutrons: 31, abundance: "Synthetic", halfLife: "3.497 min",   spin: "3/2", binding: 8.747, radioactive: true,  decayMode: "β⁻", notes: "Neutron-rich short-lived isotope." },
  ],
  25: [
    { symbol: "⁵⁵Mn", name: "Manganese-55", massNumber: 55, neutrons: 30, abundance: "100%",      halfLife: "Stable",       spin: "5/2", binding: 8.765, radioactive: false, decayMode: null, notes: "Only stable manganese isotope." },
    { symbol: "⁵⁴Mn", name: "Manganese-54", massNumber: 54, neutrons: 29, abundance: "Synthetic", halfLife: "312.12 days", spin: "3",   binding: 8.736, radioactive: true,  decayMode: "ε",  notes: "Used as radiotracer in environmental studies." },
    { symbol: "⁵²Mn", name: "Manganese-52", massNumber: 52, neutrons: 27, abundance: "Synthetic", halfLife: "5.591 days",  spin: "6",   binding: 8.698, radioactive: true,  decayMode: "β⁺", notes: "PET radiotracer for MRI-compatible imaging." },
    { symbol: "⁵⁶Mn", name: "Manganese-56", massNumber: 56, neutrons: 31, abundance: "Synthetic", halfLife: "2.5789 h",    spin: "3",   binding: 8.762, radioactive: true,  decayMode: "β⁻", notes: "Produced by neutron activation. Used in neutron detection." },
    { symbol: "⁵³Mn", name: "Manganese-53", massNumber: 53, neutrons: 28, abundance: "Trace",     halfLife: "3.7 Myr",     spin: "7/2", binding: 8.729, radioactive: true,  decayMode: "ε",  notes: "Extinct radionuclide in early solar system." },
  ],
  26: [
    { symbol: "⁵⁴Fe", name: "Iron-54",  massNumber: 54, neutrons: 28, abundance: "5.845%",   halfLife: "Stable",     spin: "0",   binding: 8.736, radioactive: false, decayMode: null, notes: "Doubly magic number. Produced in nuclear burning of stars." },
    { symbol: "⁵⁶Fe", name: "Iron-56",  massNumber: 56, neutrons: 30, abundance: "91.754%",  halfLife: "Stable",     spin: "0",   binding: 8.790, radioactive: false, decayMode: null, notes: "Highest binding energy per nucleon of all nuclides. Final product of stellar fusion." },
    { symbol: "⁵⁷Fe", name: "Iron-57",  massNumber: 57, neutrons: 31, abundance: "2.119%",   halfLife: "Stable",     spin: "1/2", binding: 8.770, radioactive: false, decayMode: null, notes: "Used in Mössbauer spectroscopy." },
    { symbol: "⁵⁸Fe", name: "Iron-58",  massNumber: 58, neutrons: 32, abundance: "0.282%",   halfLife: "Stable",     spin: "0",   binding: 8.792, radioactive: false, decayMode: null, notes: "Used in synthesis of heavy elements by neutron capture." },
    { symbol: "⁵⁵Fe", name: "Iron-55",  massNumber: 55, neutrons: 29, abundance: "Trace",    halfLife: "2.737 years", spin: "3/2", binding: 8.747, radioactive: true,  decayMode: "ε",  notes: "Produced by cosmic ray spallation. Used in environmental tracing." },
    { symbol: "⁵⁹Fe", name: "Iron-59",  massNumber: 59, neutrons: 33, abundance: "Synthetic", halfLife: "44.490 days", spin: "3/2", binding: 8.783, radioactive: true,  decayMode: "β⁻", notes: "Used to study iron metabolism in blood." },
    { symbol: "⁶⁰Fe", name: "Iron-60",  massNumber: 60, neutrons: 34, abundance: "Trace",    halfLife: "2.6 Myr",    spin: "0",   binding: 8.797, radioactive: true,  decayMode: "β⁻", notes: "Supernova tracer found in deep-sea sediments." },
  ],
  27: [
    { symbol: "⁵⁹Co", name: "Cobalt-59",  massNumber: 59, neutrons: 32, abundance: "100%",      halfLife: "Stable",       spin: "7/2", binding: 8.768, radioactive: false, decayMode: null, notes: "Only stable cobalt isotope. Essential trace element (vitamin B₁₂)." },
    { symbol: "⁵⁷Co", name: "Cobalt-57",  massNumber: 57, neutrons: 30, abundance: "Synthetic", halfLife: "271.74 days",  spin: "7/2", binding: 8.718, radioactive: true,  decayMode: "ε",  notes: "Source of 122 keV gamma used in Mössbauer spectroscopy." },
    { symbol: "⁵⁸Co", name: "Cobalt-58",  massNumber: 58, neutrons: 31, abundance: "Synthetic", halfLife: "70.86 days",   spin: "2",   binding: 8.732, radioactive: true,  decayMode: "β⁺, ε", notes: "Radiotracer used in cancer biology." },
    { symbol: "⁶⁰Co", name: "Cobalt-60",  massNumber: 60, neutrons: 33, abundance: "Synthetic", halfLife: "5.2713 years", spin: "5",   binding: 8.747, radioactive: true,  decayMode: "β⁻", notes: "Major source for gamma radiation in radiotherapy and industrial radiography." },
    { symbol: "⁵⁶Co", name: "Cobalt-56",  massNumber: 56, neutrons: 29, abundance: "Synthetic", halfLife: "77.233 days",  spin: "4",   binding: 8.695, radioactive: true,  decayMode: "β⁺, ε", notes: "Produced in supernovae; observed via gamma-ray astronomy." },
    { symbol: "⁶¹Co", name: "Cobalt-61",  massNumber: 61, neutrons: 34, abundance: "Synthetic", halfLife: "1.65 h",       spin: "7/2", binding: 8.749, radioactive: true,  decayMode: "β⁻", notes: "Neutron-rich short-lived cobalt isotope." },
  ],
  28: [
    { symbol: "⁵⁸Ni", name: "Nickel-58",  massNumber: 58, neutrons: 30, abundance: "68.077%",  halfLife: "Stable",      spin: "0",   binding: 8.732, radioactive: false, decayMode: null, notes: "Most abundant nickel isotope." },
    { symbol: "⁶⁰Ni", name: "Nickel-60",  massNumber: 60, neutrons: 32, abundance: "26.223%",  halfLife: "Stable",      spin: "0",   binding: 8.781, radioactive: false, decayMode: null, notes: "Daughter of ⁶⁰Co. Important in nuclear astrophysics." },
    { symbol: "⁶¹Ni", name: "Nickel-61",  massNumber: 61, neutrons: 33, abundance: "1.140%",   halfLife: "Stable",      spin: "3/2", binding: 8.765, radioactive: false, decayMode: null, notes: "Used in ⁶¹Ni NMR spectroscopy." },
    { symbol: "⁶²Ni", name: "Nickel-62",  massNumber: 62, neutrons: 34, abundance: "3.634%",   halfLife: "Stable",      spin: "0",   binding: 8.795, radioactive: false, decayMode: null, notes: "Highest binding energy per nucleon of all stable nuclides." },
    { symbol: "⁶⁴Ni", name: "Nickel-64",  massNumber: 64, neutrons: 36, abundance: "0.926%",   halfLife: "Stable",      spin: "0",   binding: 8.777, radioactive: false, decayMode: null, notes: "Used as target in superheavy element synthesis." },
    { symbol: "⁵⁶Ni", name: "Nickel-56",  massNumber: 56, neutrons: 28, abundance: "Synthetic", halfLife: "6.075 days",  spin: "0",   binding: 8.643, radioactive: true,  decayMode: "ε",  notes: "Doubly magic. Key product of supernova explosions." },
    { symbol: "⁵⁹Ni", name: "Nickel-59",  massNumber: 59, neutrons: 31, abundance: "Trace",    halfLife: "76000 years",  spin: "3/2", binding: 8.736, radioactive: true,  decayMode: "ε",  notes: "Present in cosmic rays and reactor materials." },
    { symbol: "⁶³Ni", name: "Nickel-63",  massNumber: 63, neutrons: 35, abundance: "Synthetic", halfLife: "101.2 years", spin: "1/2", binding: 8.769, radioactive: true,  decayMode: "β⁻", notes: "Used in electron capture detectors and nuclear batteries." },
    { symbol: "⁶⁵Ni", name: "Nickel-65",  massNumber: 65, neutrons: 37, abundance: "Synthetic", halfLife: "2.5 h",       spin: "5/2", binding: 8.763, radioactive: true,  decayMode: "β⁻", notes: "Produced by neutron activation. Short-lived." },
  ],
  29: [
    { symbol: "⁶³Cu", name: "Copper-63", massNumber: 63, neutrons: 34, abundance: "69.15%",   halfLife: "Stable",      spin: "3/2", binding: 8.752, radioactive: false, decayMode: null,      notes: "Most abundant copper isotope." },
    { symbol: "⁶⁵Cu", name: "Copper-65", massNumber: 65, neutrons: 36, abundance: "30.85%",   halfLife: "Stable",      spin: "3/2", binding: 8.757, radioactive: false, decayMode: null,      notes: "Used in isotope tracing and NMR spectroscopy." },
    { symbol: "⁶⁴Cu", name: "Copper-64", massNumber: 64, neutrons: 35, abundance: "Synthetic", halfLife: "12.700 h",   spin: "1",   binding: 8.739, radioactive: true,  decayMode: "β⁺, β⁻", notes: "Dual-mode PET/therapy radioisotope used in oncology." },
    { symbol: "⁶⁷Cu", name: "Copper-67", massNumber: 67, neutrons: 38, abundance: "Synthetic", halfLife: "61.83 h",    spin: "3/2", binding: 8.762, radioactive: true,  decayMode: "β⁻",     notes: "Promising radioisotope for targeted radionuclide therapy." },
    { symbol: "⁶²Cu", name: "Copper-62", massNumber: 62, neutrons: 33, abundance: "Synthetic", halfLife: "9.673 min",  spin: "1",   binding: 8.715, radioactive: true,  decayMode: "β⁺",     notes: "Short-lived PET isotope." },
    { symbol: "⁶¹Cu", name: "Copper-61", massNumber: 61, neutrons: 32, abundance: "Synthetic", halfLife: "3.339 h",    spin: "3/2", binding: 8.718, radioactive: true,  decayMode: "β⁺",     notes: "PET radiotracer candidate." },
    { symbol: "⁶⁶Cu", name: "Copper-66", massNumber: 66, neutrons: 37, abundance: "Synthetic", halfLife: "5.12 min",   spin: "1",   binding: 8.743, radioactive: true,  decayMode: "β⁻",     notes: "Short-lived neutron-rich copper isotope." },
  ],
  30: [
    { symbol: "⁶⁴Zn", name: "Zinc-64",  massNumber: 64, neutrons: 34, abundance: "48.6%",    halfLife: "Stable",      spin: "0",   binding: 8.736, radioactive: false, decayMode: null, notes: "Most abundant zinc isotope." },
    { symbol: "⁶⁶Zn", name: "Zinc-66",  massNumber: 66, neutrons: 36, abundance: "27.9%",    halfLife: "Stable",      spin: "0",   binding: 8.760, radioactive: false, decayMode: null, notes: "Stable zinc isotope used in isotope tracers." },
    { symbol: "⁶⁷Zn", name: "Zinc-67",  massNumber: 67, neutrons: 37, abundance: "4.1%",     halfLife: "Stable",      spin: "5/2", binding: 8.744, radioactive: false, decayMode: null, notes: "Used in ⁶⁷Zn NMR spectroscopy." },
    { symbol: "⁶⁸Zn", name: "Zinc-68",  massNumber: 68, neutrons: 38, abundance: "18.8%",    halfLife: "Stable",      spin: "0",   binding: 8.775, radioactive: false, decayMode: null, notes: "Used as target for ⁶⁷Ga production." },
    { symbol: "⁷⁰Zn", name: "Zinc-70",  massNumber: 70, neutrons: 40, abundance: "0.6%",     halfLife: "Stable",      spin: "0",   binding: 8.765, radioactive: false, decayMode: null, notes: "Rarest stable zinc isotope." },
    { symbol: "⁶⁵Zn", name: "Zinc-65",  massNumber: 65, neutrons: 35, abundance: "Synthetic", halfLife: "243.93 days", spin: "5/2", binding: 8.735, radioactive: true,  decayMode: "ε",  notes: "Used in metabolic tracer studies of zinc." },
    { symbol: "⁶⁹Zn", name: "Zinc-69",  massNumber: 69, neutrons: 39, abundance: "Synthetic", halfLife: "56.4 min",   spin: "1/2", binding: 8.759, radioactive: true,  decayMode: "β⁻", notes: "Neutron-rich short-lived zinc isotope." },
    { symbol: "⁷²Zn", name: "Zinc-72",  massNumber: 72, neutrons: 42, abundance: "Synthetic", halfLife: "46.5 h",     spin: "0",   binding: 8.753, radioactive: true,  decayMode: "β⁻", notes: "Parent of ⁷²Ga; used in PET generator systems." },
  ],
  31: [
    { symbol: "⁶⁹Ga", name: "Gallium-69", massNumber: 69, neutrons: 38, abundance: "60.108%",  halfLife: "Stable",      spin: "3/2", binding: 8.724, radioactive: false, decayMode: null, notes: "More abundant gallium isotope." },
    { symbol: "⁷¹Ga", name: "Gallium-71", massNumber: 71, neutrons: 40, abundance: "39.892%",  halfLife: "Stable",      spin: "3/2", binding: 8.741, radioactive: false, decayMode: null, notes: "Less abundant stable gallium isotope." },
    { symbol: "⁶⁷Ga", name: "Gallium-67", massNumber: 67, neutrons: 36, abundance: "Synthetic", halfLife: "3.2617 days", spin: "3/2", binding: 8.697, radioactive: true,  decayMode: "ε",  notes: "Widely used SPECT radiotracer for tumor imaging." },
    { symbol: "⁶⁸Ga", name: "Gallium-68", massNumber: 68, neutrons: 37, abundance: "Synthetic", halfLife: "67.71 min",   spin: "1",   binding: 8.700, radioactive: true,  decayMode: "β⁺", notes: "Key PET radiotracer (DOTATATE-PET for neuroendocrine tumors)." },
    { symbol: "⁷²Ga", name: "Gallium-72", massNumber: 72, neutrons: 41, abundance: "Synthetic", halfLife: "14.095 h",    spin: "3",   binding: 8.733, radioactive: true,  decayMode: "β⁻", notes: "Neutron-rich gallium isotope." },
    { symbol: "⁷⁰Ga", name: "Gallium-70", massNumber: 70, neutrons: 39, abundance: "Synthetic", halfLife: "21.14 min",   spin: "1",   binding: 8.716, radioactive: true,  decayMode: "β⁻", notes: "Short-lived; produced by neutron activation." },
  ],
  32: [
    { symbol: "⁷⁰Ge", name: "Germanium-70", massNumber: 70, neutrons: 38, abundance: "20.38%",   halfLife: "Stable",      spin: "0",   binding: 8.723, radioactive: false, decayMode: null, notes: "Lightest stable germanium isotope." },
    { symbol: "⁷²Ge", name: "Germanium-72", massNumber: 72, neutrons: 40, abundance: "27.31%",   halfLife: "Stable",      spin: "0",   binding: 8.734, radioactive: false, decayMode: null, notes: "Stable germanium isotope." },
    { symbol: "⁷³Ge", name: "Germanium-73", massNumber: 73, neutrons: 41, abundance: "7.76%",    halfLife: "Stable",      spin: "9/2", binding: 8.717, radioactive: false, decayMode: null, notes: "Used in ⁷³Ge NMR studies." },
    { symbol: "⁷⁴Ge", name: "Germanium-74", massNumber: 74, neutrons: 42, abundance: "36.72%",   halfLife: "Stable",      spin: "0",   binding: 8.749, radioactive: false, decayMode: null, notes: "Most abundant germanium isotope." },
    { symbol: "⁷⁶Ge", name: "Germanium-76", massNumber: 76, neutrons: 44, abundance: "7.83%",    halfLife: "1.78×10²¹ yr", spin: "0",  binding: 8.724, radioactive: true,  decayMode: "2β⁻", notes: "Used in neutrinoless double beta decay experiments (GERDA)." },
    { symbol: "⁶⁸Ge", name: "Germanium-68", massNumber: 68, neutrons: 36, abundance: "Synthetic", halfLife: "270.95 days", spin: "0",   binding: 8.696, radioactive: true,  decayMode: "ε",  notes: "Parent of ⁶⁸Ga. Used in ⁶⁸Ge/⁶⁸Ga PET generators." },
    { symbol: "⁷¹Ge", name: "Germanium-71", massNumber: 71, neutrons: 39, abundance: "Synthetic", halfLife: "11.43 days",  spin: "1/2", binding: 8.710, radioactive: true,  decayMode: "ε",  notes: "Used in radiochemistry studies." },
    { symbol: "⁷⁷Ge", name: "Germanium-77", massNumber: 77, neutrons: 45, abundance: "Synthetic", halfLife: "11.30 h",     spin: "7/2", binding: 8.712, radioactive: true,  decayMode: "β⁻", notes: "Neutron-rich short-lived isotope." },
  ],
  33: [
    { symbol: "⁷⁵As", name: "Arsenic-75",  massNumber: 75, neutrons: 42, abundance: "100%",      halfLife: "Stable",      spin: "3/2", binding: 8.701, radioactive: false, decayMode: null, notes: "Only stable arsenic isotope." },
    { symbol: "⁷³As", name: "Arsenic-73",  massNumber: 73, neutrons: 40, abundance: "Synthetic", halfLife: "80.30 days",  spin: "3/2", binding: 8.658, radioactive: true,  decayMode: "ε",  notes: "Used in radiotracer studies." },
    { symbol: "⁷⁴As", name: "Arsenic-74",  massNumber: 74, neutrons: 41, abundance: "Synthetic", halfLife: "17.77 days",  spin: "2",   binding: 8.656, radioactive: true,  decayMode: "β⁺, β⁻", notes: "Used in studies of arsenic metabolism." },
    { symbol: "⁷⁶As", name: "Arsenic-76",  massNumber: 76, neutrons: 43, abundance: "Synthetic", halfLife: "26.24 h",     spin: "2",   binding: 8.693, radioactive: true,  decayMode: "β⁻", notes: "Used in neutron activation analysis." },
    { symbol: "⁷⁷As", name: "Arsenic-77",  massNumber: 77, neutrons: 44, abundance: "Synthetic", halfLife: "38.83 h",     spin: "3/2", binding: 8.697, radioactive: true,  decayMode: "β⁻", notes: "Potential therapeutic radioisotope." },
    { symbol: "⁷²As", name: "Arsenic-72",  massNumber: 72, neutrons: 39, abundance: "Synthetic", halfLife: "26.0 h",      spin: "2",   binding: 8.625, radioactive: true,  decayMode: "β⁺", notes: "PET radiotracer candidate." },
  ],
  34: [
    { symbol: "⁷⁴Se", name: "Selenium-74", massNumber: 74, neutrons: 40, abundance: "0.89%",    halfLife: "Stable",       spin: "0",   binding: 8.652, radioactive: false, decayMode: null, notes: "Lightest stable selenium isotope." },
    { symbol: "⁷⁶Se", name: "Selenium-76", massNumber: 76, neutrons: 42, abundance: "9.37%",    halfLife: "Stable",       spin: "0",   binding: 8.711, radioactive: false, decayMode: null, notes: "Stable selenium isotope." },
    { symbol: "⁷⁷Se", name: "Selenium-77", massNumber: 77, neutrons: 43, abundance: "7.63%",    halfLife: "Stable",       spin: "1/2", binding: 8.700, radioactive: false, decayMode: null, notes: "Used in ⁷⁷Se NMR spectroscopy." },
    { symbol: "⁷⁸Se", name: "Selenium-78", massNumber: 78, neutrons: 44, abundance: "23.77%",   halfLife: "Stable",       spin: "0",   binding: 8.731, radioactive: false, decayMode: null, notes: "Stable selenium isotope." },
    { symbol: "⁸⁰Se", name: "Selenium-80", massNumber: 80, neutrons: 46, abundance: "49.61%",   halfLife: "Stable",       spin: "0",   binding: 8.712, radioactive: false, decayMode: null, notes: "Most abundant selenium isotope." },
    { symbol: "⁸²Se", name: "Selenium-82", massNumber: 82, neutrons: 48, abundance: "8.73%",    halfLife: "1.08×10²⁰ yr", spin: "0",  binding: 8.695, radioactive: true,  decayMode: "2β⁻", notes: "Used in double beta decay experiments." },
    { symbol: "⁷⁵Se", name: "Selenium-75", massNumber: 75, neutrons: 41, abundance: "Synthetic", halfLife: "119.78 days", spin: "5/2", binding: 8.660, radioactive: true,  decayMode: "ε",  notes: "Used in industrial radiography and selenium metabolism studies." },
    { symbol: "⁷²Se", name: "Selenium-72", massNumber: 72, neutrons: 38, abundance: "Synthetic", halfLife: "8.40 days",   spin: "0",   binding: 8.609, radioactive: true,  decayMode: "ε",  notes: "Parent of ⁷²As; used in generator systems." },
    { symbol: "⁷⁹Se", name: "Selenium-79", massNumber: 79, neutrons: 45, abundance: "Trace",    halfLife: "327000 years", spin: "7/2", binding: 8.720, radioactive: true,  decayMode: "β⁻", notes: "Long-lived fission product of uranium." },
  ],
  35: [
    { symbol: "⁷⁹Br", name: "Bromine-79",  massNumber: 79, neutrons: 44, abundance: "50.69%",   halfLife: "Stable",       spin: "3/2", binding: 8.696, radioactive: false, decayMode: null, notes: "More abundant stable bromine isotope." },
    { symbol: "⁸¹Br", name: "Bromine-81",  massNumber: 81, neutrons: 46, abundance: "49.31%",   halfLife: "Stable",       spin: "3/2", binding: 8.700, radioactive: false, decayMode: null, notes: "Less abundant stable bromine isotope." },
    { symbol: "⁷⁷Br", name: "Bromine-77",  massNumber: 77, neutrons: 42, abundance: "Synthetic", halfLife: "57.04 h",     spin: "3/2", binding: 8.658, radioactive: true,  decayMode: "β⁺, ε", notes: "SPECT radiotracer used in oncology." },
    { symbol: "⁷⁶Br", name: "Bromine-76",  massNumber: 76, neutrons: 41, abundance: "Synthetic", halfLife: "16.2 h",      spin: "1",   binding: 8.630, radioactive: true,  decayMode: "β⁺", notes: "PET radiotracer for labelling organic compounds." },
    { symbol: "⁸²Br", name: "Bromine-82",  massNumber: 82, neutrons: 47, abundance: "Synthetic", halfLife: "35.282 h",    spin: "5",   binding: 8.690, radioactive: true,  decayMode: "β⁻", notes: "Used in leak detection and neutron activation analysis." },
    { symbol: "⁸⁰Br", name: "Bromine-80",  massNumber: 80, neutrons: 45, abundance: "Synthetic", halfLife: "17.66 min",   spin: "1",   binding: 8.680, radioactive: true,  decayMode: "β⁻", notes: "Short-lived; produced by neutron activation." },
    { symbol: "⁸³Br", name: "Bromine-83",  massNumber: 83, neutrons: 48, abundance: "Synthetic", halfLife: "2.40 h",      spin: "3/2", binding: 8.697, radioactive: true,  decayMode: "β⁻", notes: "Neutron-rich bromine isotope." },
  ],
  36: [
    { symbol: "⁷⁸Kr", name: "Krypton-78",  massNumber: 78, neutrons: 42, abundance: "0.355%",   halfLife: "9.2×10²¹ yr", spin: "0",   binding: 8.664, radioactive: false, decayMode: null, notes: "Longest-lived krypton isotope; effectively stable." },
    { symbol: "⁸⁰Kr", name: "Krypton-80",  massNumber: 80, neutrons: 44, abundance: "2.286%",   halfLife: "Stable",      spin: "0",   binding: 8.696, radioactive: false, decayMode: null, notes: "Stable krypton isotope." },
    { symbol: "⁸²Kr", name: "Krypton-82",  massNumber: 82, neutrons: 46, abundance: "11.593%",  halfLife: "Stable",      spin: "0",   binding: 8.718, radioactive: false, decayMode: null, notes: "Stable krypton isotope." },
    { symbol: "⁸³Kr", name: "Krypton-83",  massNumber: 83, neutrons: 47, abundance: "11.500%",  halfLife: "Stable",      spin: "9/2", binding: 8.711, radioactive: false, decayMode: null, notes: "Used in ⁸³Kr NMR of porous materials." },
    { symbol: "⁸⁴Kr", name: "Krypton-84",  massNumber: 84, neutrons: 48, abundance: "56.987%",  halfLife: "Stable",      spin: "0",   binding: 8.718, radioactive: false, decayMode: null, notes: "Most abundant krypton isotope." },
    { symbol: "⁸⁶Kr", name: "Krypton-86",  massNumber: 86, neutrons: 50, abundance: "17.279%",  halfLife: "Stable",      spin: "0",   binding: 8.700, radioactive: false, decayMode: null, notes: "Magic neutron number. Formerly used to define the metre." },
    { symbol: "⁸⁵Kr", name: "Krypton-85",  massNumber: 85, neutrons: 49, abundance: "Trace",    halfLife: "10.756 years", spin: "9/2", binding: 8.696, radioactive: true,  decayMode: "β⁻", notes: "Fission product; used to monitor nuclear reprocessing activity." },
    { symbol: "⁸¹Kr", name: "Krypton-81",  massNumber: 81, neutrons: 45, abundance: "Trace",    halfLife: "229000 years", spin: "7/2", binding: 8.702, radioactive: true,  decayMode: "ε",  notes: "Cosmogenic; used to date old groundwater and ice." },
    { symbol: "⁷⁹Kr", name: "Krypton-79",  massNumber: 79, neutrons: 43, abundance: "Synthetic", halfLife: "35.04 h",     spin: "1/2", binding: 8.663, radioactive: true,  decayMode: "β⁺", notes: "Used in nuclear medicine lung ventilation imaging." },
  ],
  37: [
    { symbol: "⁸⁵Rb", name: "Rubidium-85", massNumber: 85, neutrons: 48, abundance: "72.17%",   halfLife: "Stable",       spin: "5/2", binding: 8.697, radioactive: false, decayMode: null,  notes: "Most abundant rubidium isotope." },
    { symbol: "⁸⁷Rb", name: "Rubidium-87", massNumber: 87, neutrons: 50, abundance: "27.83%",   halfLife: "4.97×10¹⁰ yr", spin: "3/2", binding: 8.713, radioactive: true,  decayMode: "β⁻", notes: "Used in Rb-Sr geochronology and laser cooling experiments." },
    { symbol: "⁸²Rb", name: "Rubidium-82", massNumber: 82, neutrons: 45, abundance: "Synthetic", halfLife: "1.2575 min",  spin: "1",   binding: 8.648, radioactive: true,  decayMode: "β⁺", notes: "Used in myocardial perfusion PET imaging." },
    { symbol: "⁸³Rb", name: "Rubidium-83", massNumber: 83, neutrons: 46, abundance: "Synthetic", halfLife: "86.2 days",   spin: "5/2", binding: 8.663, radioactive: true,  decayMode: "ε",  notes: "Used in atomic physics experiments." },
    { symbol: "⁸⁴Rb", name: "Rubidium-84", massNumber: 84, neutrons: 47, abundance: "Synthetic", halfLife: "32.77 days",  spin: "2",   binding: 8.662, radioactive: true,  decayMode: "β⁺, ε", notes: "Radiotracer isotope." },
    { symbol: "⁸⁶Rb", name: "Rubidium-86", massNumber: 86, neutrons: 49, abundance: "Synthetic", halfLife: "18.642 days", spin: "2",   binding: 8.697, radioactive: true,  decayMode: "β⁻", notes: "Used in soil and hydrology tracer studies." },
  ],
  38: [
    { symbol: "⁸⁴Sr", name: "Strontium-84",  massNumber: 84, neutrons: 46, abundance: "0.56%",    halfLife: "Stable",      spin: "0",   binding: 8.679, radioactive: false, decayMode: null, notes: "Lightest stable strontium isotope." },
    { symbol: "⁸⁶Sr", name: "Strontium-86",  massNumber: 86, neutrons: 48, abundance: "9.86%",    halfLife: "Stable",      spin: "0",   binding: 8.708, radioactive: false, decayMode: null, notes: "Daughter of ⁸⁶Rb; used in Rb-Sr geochronology." },
    { symbol: "⁸⁷Sr", name: "Strontium-87",  massNumber: 87, neutrons: 49, abundance: "7.00%",    halfLife: "Stable",      spin: "9/2", binding: 8.714, radioactive: false, decayMode: null, notes: "Daughter of ⁸⁷Rb. Used in geochronology and provenance studies." },
    { symbol: "⁸⁸Sr", name: "Strontium-88",  massNumber: 88, neutrons: 50, abundance: "82.58%",   halfLife: "Stable",      spin: "0",   binding: 8.733, radioactive: false, decayMode: null, notes: "Magic neutron number. Most abundant strontium isotope." },
    { symbol: "⁸⁹Sr", name: "Strontium-89",  massNumber: 89, neutrons: 51, abundance: "Synthetic", halfLife: "50.56 days",  spin: "5/2", binding: 8.735, radioactive: true,  decayMode: "β⁻", notes: "Used in palliative treatment of bone metastases." },
    { symbol: "⁹⁰Sr", name: "Strontium-90",  massNumber: 90, neutrons: 52, abundance: "Trace",    halfLife: "28.9 years",  spin: "0",   binding: 8.696, radioactive: true,  decayMode: "β⁻", notes: "Major nuclear fallout hazard. Bones accumulate it like calcium." },
    { symbol: "⁸²Sr", name: "Strontium-82",  massNumber: 82, neutrons: 44, abundance: "Synthetic", halfLife: "25.36 days",  spin: "0",   binding: 8.646, radioactive: true,  decayMode: "ε",  notes: "Parent of ⁸²Rb; used in myocardial perfusion PET generators." },
    { symbol: "⁸⁵Sr", name: "Strontium-85",  massNumber: 85, neutrons: 47, abundance: "Synthetic", halfLife: "64.84 days",  spin: "9/2", binding: 8.673, radioactive: true,  decayMode: "ε",  notes: "Used in bone scanning and environmental monitoring." },
  ],
  39: [
    { symbol: "⁸⁹Y",  name: "Yttrium-89",  massNumber: 89, neutrons: 50, abundance: "100%",      halfLife: "Stable",       spin: "1/2", binding: 8.714, radioactive: false, decayMode: null, notes: "Only stable yttrium isotope. Magic neutron number." },
    { symbol: "⁸⁶Y",  name: "Yttrium-86",  massNumber: 86, neutrons: 47, abundance: "Synthetic", halfLife: "14.74 h",      spin: "4",   binding: 8.634, radioactive: true,  decayMode: "β⁺", notes: "PET radiotracer; dosimetry surrogate for ⁹⁰Y therapy." },
    { symbol: "⁸⁷Y",  name: "Yttrium-87",  massNumber: 87, neutrons: 48, abundance: "Synthetic", halfLife: "79.8 h",       spin: "1/2", binding: 8.647, radioactive: true,  decayMode: "β⁺, ε", notes: "Used in SPECT imaging studies." },
    { symbol: "⁸⁸Y",  name: "Yttrium-88",  massNumber: 88, neutrons: 49, abundance: "Synthetic", halfLife: "106.627 days", spin: "4",   binding: 8.667, radioactive: true,  decayMode: "β⁺, ε", notes: "Strong gamma emitter used as calibration source." },
    { symbol: "⁹⁰Y",  name: "Yttrium-90",  massNumber: 90, neutrons: 51, abundance: "Trace",     halfLife: "64.053 h",     spin: "2",   binding: 8.714, radioactive: true,  decayMode: "β⁻", notes: "Widely used in targeted radiotherapy (SIR-Spheres, zevalin)." },
    { symbol: "⁹¹Y",  name: "Yttrium-91",  massNumber: 91, neutrons: 52, abundance: "Synthetic", halfLife: "58.51 days",   spin: "1/2", binding: 8.698, radioactive: true,  decayMode: "β⁻", notes: "Fission product; used in some radiotherapy contexts." },
  ],
  40: [
    { symbol: "⁹⁰Zr", name: "Zirconium-90",  massNumber: 90, neutrons: 50, abundance: "51.45%",   halfLife: "Stable",      spin: "0",   binding: 8.710, radioactive: false, decayMode: null, notes: "Doubly magic nucleus. Most abundant zirconium isotope." },
    { symbol: "⁹¹Zr", name: "Zirconium-91",  massNumber: 91, neutrons: 51, abundance: "11.22%",   halfLife: "Stable",      spin: "5/2", binding: 8.693, radioactive: false, decayMode: null, notes: "Used in ⁹¹Zr NMR spectroscopy of zirconium compounds." },
    { symbol: "⁹²Zr", name: "Zirconium-92",  massNumber: 92, neutrons: 52, abundance: "17.15%",   halfLife: "Stable",      spin: "0",   binding: 8.715, radioactive: false, decayMode: null, notes: "Stable zirconium isotope." },
    { symbol: "⁹⁴Zr", name: "Zirconium-94",  massNumber: 94, neutrons: 54, abundance: "17.38%",   halfLife: "Stable",      spin: "0",   binding: 8.716, radioactive: false, decayMode: null, notes: "Stable zirconium isotope." },
    { symbol: "⁹⁶Zr", name: "Zirconium-96",  massNumber: 96, neutrons: 56, abundance: "2.80%",    halfLife: "2.0×10¹⁹ yr", spin: "0",  binding: 8.664, radioactive: true,  decayMode: "2β⁻", notes: "Used in double beta decay experiments." },
    { symbol: "⁸⁸Zr", name: "Zirconium-88",  massNumber: 88, neutrons: 48, abundance: "Synthetic", halfLife: "83.4 days",   spin: "0",   binding: 8.632, radioactive: true,  decayMode: "ε",  notes: "PET radiotracer. Increasingly used in immuno-PET." },
    { symbol: "⁸⁹Zr", name: "Zirconium-89",  massNumber: 89, neutrons: 49, abundance: "Synthetic", halfLife: "78.41 h",     spin: "9/2", binding: 8.659, radioactive: true,  decayMode: "β⁺", notes: "Long-lived PET isotope for antibody labelling." },
    { symbol: "⁹³Zr", name: "Zirconium-93",  massNumber: 93, neutrons: 53, abundance: "Trace",    halfLife: "1.53 Myr",    spin: "5/2", binding: 8.706, radioactive: true,  decayMode: "β⁻", notes: "Long-lived fission product. Nuclear waste concern." },
    { symbol: "⁹⁵Zr", name: "Zirconium-95",  massNumber: 95, neutrons: 55, abundance: "Synthetic", halfLife: "64.032 days", spin: "5/2", binding: 8.704, radioactive: true,  decayMode: "β⁻", notes: "Fission product; important in early post-detonation fallout." },
  ],
  41: [
    { symbol: "⁹³Nb", name: "Niobium-93",  massNumber: 93, neutrons: 52, abundance: "100%",      halfLife: "Stable",      spin: "9/2", binding: 8.664, radioactive: false, decayMode: null, notes: "Only stable niobium isotope." },
    { symbol: "⁹²Nb", name: "Niobium-92",  massNumber: 92, neutrons: 51, abundance: "Trace",     halfLife: "34.7 Myr",    spin: "7",   binding: 8.643, radioactive: true,  decayMode: "ε",  notes: "Long-lived; extinct radioisotope from early solar system." },
    { symbol: "⁹⁰Nb", name: "Niobium-90",  massNumber: 90, neutrons: 49, abundance: "Synthetic", halfLife: "14.60 h",     spin: "8",   binding: 8.609, radioactive: true,  decayMode: "β⁺", notes: "PET imaging candidate." },
    { symbol: "⁹⁴Nb", name: "Niobium-94",  massNumber: 94, neutrons: 53, abundance: "Trace",     halfLife: "20300 years", spin: "6",   binding: 8.664, radioactive: true,  decayMode: "β⁻", notes: "Activation product in reactor steel." },
    { symbol: "⁹⁵Nb", name: "Niobium-95",  massNumber: 95, neutrons: 54, abundance: "Synthetic", halfLife: "34.975 days", spin: "9/2", binding: 8.663, radioactive: true,  decayMode: "β⁻", notes: "Fission product. Important in reactor coolant monitoring." },
  ],
  42: [
    { symbol: "⁹²Mo", name: "Molybdenum-92",  massNumber: 92, neutrons: 50, abundance: "14.53%",  halfLife: "Stable",      spin: "0",   binding: 8.658, radioactive: false, decayMode: null, notes: "Magic neutron number. Lightest stable molybdenum isotope." },
    { symbol: "⁹⁴Mo", name: "Molybdenum-94",  massNumber: 94, neutrons: 52, abundance: "9.15%",   halfLife: "Stable",      spin: "0",   binding: 8.666, radioactive: false, decayMode: null, notes: "Stable molybdenum isotope." },
    { symbol: "⁹⁵Mo", name: "Molybdenum-95",  massNumber: 95, neutrons: 53, abundance: "15.84%",  halfLife: "Stable",      spin: "5/2", binding: 8.655, radioactive: false, decayMode: null, notes: "Stable; used in isotope geochemistry." },
    { symbol: "⁹⁶Mo", name: "Molybdenum-96",  massNumber: 96, neutrons: 54, abundance: "16.67%",  halfLife: "Stable",      spin: "0",   binding: 8.666, radioactive: false, decayMode: null, notes: "Stable molybdenum isotope." },
    { symbol: "⁹⁷Mo", name: "Molybdenum-97",  massNumber: 97, neutrons: 55, abundance: "9.60%",   halfLife: "Stable",      spin: "5/2", binding: 8.656, radioactive: false, decayMode: null, notes: "Stable molybdenum isotope." },
    { symbol: "⁹⁸Mo", name: "Molybdenum-98",  massNumber: 98, neutrons: 56, abundance: "24.39%",  halfLife: "Stable",      spin: "0",   binding: 8.635, radioactive: false, decayMode: null, notes: "Most abundant molybdenum isotope." },
    { symbol: "¹⁰⁰Mo", name: "Molybdenum-100", massNumber: 100, neutrons: 58, abundance: "9.82%", halfLife: "7.1×10¹⁸ yr", spin: "0",  binding: 8.605, radioactive: true,  decayMode: "2β⁻", notes: "Used in neutrinoless double beta decay experiments (NEMO-3)." },
    { symbol: "⁹⁹Mo", name: "Molybdenum-99",  massNumber: 99, neutrons: 57, abundance: "Trace",   halfLife: "65.924 h",    spin: "1/2", binding: 8.614, radioactive: true,  decayMode: "β⁻", notes: "Parent of ⁹⁹ᵐTc. Most important radionuclide generator in nuclear medicine." },
    { symbol: "⁹³Mo", name: "Molybdenum-93",  massNumber: 93, neutrons: 51, abundance: "Trace",   halfLife: "4000 years",  spin: "5/2", binding: 8.638, radioactive: true,  decayMode: "ε",  notes: "Activation product; long-lived." },
  ],
  43: [
    { symbol: "⁹⁷Tc", name: "Technetium-97",   massNumber: 97, neutrons: 54, abundance: "Synthetic", halfLife: "4.21 Myr",    spin: "9/2", binding: 8.635, radioactive: true, decayMode: "ε",  notes: "Most stable technetium isotope." },
    { symbol: "⁹⁸Tc", name: "Technetium-98",   massNumber: 98, neutrons: 55, abundance: "Synthetic", halfLife: "4.2 Myr",     spin: "6",   binding: 8.630, radioactive: true, decayMode: "β⁻", notes: "Second most stable technetium isotope." },
    { symbol: "⁹⁹Tc", name: "Technetium-99",   massNumber: 99, neutrons: 56, abundance: "Trace",     halfLife: "211100 years", spin: "9/2", binding: 8.613, radioactive: true, decayMode: "β⁻", notes: "Long-lived fission product. Major concern in nuclear waste." },
    { symbol: "⁹⁹ᵐTc", name: "Technetium-99m", massNumber: 99, neutrons: 56, abundance: "Synthetic", halfLife: "6.0072 h",    spin: "1/2", binding: 8.613, radioactive: true, decayMode: "γ, IT", notes: "Most widely used radioisotope in nuclear medicine worldwide (SPECT imaging)." },
    { symbol: "⁹⁵ᵐTc", name: "Technetium-95m", massNumber: 95, neutrons: 52, abundance: "Synthetic", halfLife: "61 days",     spin: "1/2", binding: 8.650, radioactive: true, decayMode: "ε",  notes: "Long-lived metastable isomer used in tracers." },
    { symbol: "⁹⁶Tc", name: "Technetium-96",   massNumber: 96, neutrons: 53, abundance: "Synthetic", halfLife: "4.28 days",   spin: "7",   binding: 8.638, radioactive: true, decayMode: "β⁺, ε", notes: "Used in some diagnostic imaging contexts." },
  ],
  44: [
    { symbol: "⁹⁶Ru", name: "Ruthenium-96",  massNumber: 96,  neutrons: 52, abundance: "5.54%",    halfLife: "Stable",      spin: "0",   binding: 8.630, radioactive: false, decayMode: null, notes: "Lightest stable ruthenium isotope." },
    { symbol: "⁹⁸Ru", name: "Ruthenium-98",  massNumber: 98,  neutrons: 54, abundance: "1.87%",    halfLife: "Stable",      spin: "0",   binding: 8.641, radioactive: false, decayMode: null, notes: "Stable ruthenium isotope." },
    { symbol: "⁹⁹Ru", name: "Ruthenium-99",  massNumber: 99,  neutrons: 55, abundance: "12.76%",   halfLife: "Stable",      spin: "5/2", binding: 8.634, radioactive: false, decayMode: null, notes: "Stable ruthenium isotope." },
    { symbol: "¹⁰⁰Ru", name: "Ruthenium-100", massNumber: 100, neutrons: 56, abundance: "12.60%",  halfLife: "Stable",      spin: "0",   binding: 8.649, radioactive: false, decayMode: null, notes: "Stable ruthenium isotope." },
    { symbol: "¹⁰¹Ru", name: "Ruthenium-101", massNumber: 101, neutrons: 57, abundance: "17.06%",  halfLife: "Stable",      spin: "5/2", binding: 8.637, radioactive: false, decayMode: null, notes: "Stable; used in catalysis research." },
    { symbol: "¹⁰²Ru", name: "Ruthenium-102", massNumber: 102, neutrons: 58, abundance: "31.55%",  halfLife: "Stable",      spin: "0",   binding: 8.643, radioactive: false, decayMode: null, notes: "Most abundant ruthenium isotope." },
    { symbol: "¹⁰⁴Ru", name: "Ruthenium-104", massNumber: 104, neutrons: 60, abundance: "18.62%",  halfLife: "Stable",      spin: "0",   binding: 8.626, radioactive: false, decayMode: null, notes: "Heaviest stable ruthenium isotope." },
    { symbol: "¹⁰³Ru", name: "Ruthenium-103", massNumber: 103, neutrons: 59, abundance: "Synthetic", halfLife: "39.247 days", spin: "3/2", binding: 8.625, radioactive: true,  decayMode: "β⁻", notes: "Fission product; important in reactor safety." },
    { symbol: "¹⁰⁶Ru", name: "Ruthenium-106", massNumber: 106, neutrons: 62, abundance: "Synthetic", halfLife: "373.59 days", spin: "0",   binding: 8.573, radioactive: true,  decayMode: "β⁻", notes: "Fission product used in ophthalmic brachytherapy and environmental monitoring." },
    { symbol: "⁹⁷Ru",  name: "Ruthenium-97",  massNumber: 97,  neutrons: 53, abundance: "Synthetic", halfLife: "2.83 days",   spin: "5/2", binding: 8.618, radioactive: true,  decayMode: "ε",  notes: "Short-lived; produced by proton bombardment." },
  ],
  45: [
    { symbol: "¹⁰³Rh", name: "Rhodium-103",  massNumber: 103, neutrons: 58, abundance: "100%",      halfLife: "Stable",       spin: "1/2", binding: 8.612, radioactive: false, decayMode: null, notes: "Only stable rhodium isotope." },
    { symbol: "¹⁰¹Rh", name: "Rhodium-101",  massNumber: 101, neutrons: 56, abundance: "Synthetic", halfLife: "3.3 years",    spin: "1/2", binding: 8.601, radioactive: true,  decayMode: "ε",  notes: "Long-lived rhodium isotope." },
    { symbol: "¹⁰²Rh", name: "Rhodium-102",  massNumber: 102, neutrons: 57, abundance: "Synthetic", halfLife: "207.3 days",   spin: "6",   binding: 8.593, radioactive: true,  decayMode: "β⁺, ε", notes: "Used in rhodium activation analysis." },
    { symbol: "¹⁰⁵Rh", name: "Rhodium-105",  massNumber: 105, neutrons: 60, abundance: "Synthetic", halfLife: "35.36 h",      spin: "7/2", binding: 8.600, radioactive: true,  decayMode: "β⁻", notes: "Radioisotope for cancer therapy candidate." },
    { symbol: "¹⁰⁶Rh", name: "Rhodium-106",  massNumber: 106, neutrons: 61, abundance: "Synthetic", halfLife: "29.80 s",      spin: "1",   binding: 8.573, radioactive: true,  decayMode: "β⁻", notes: "Daughter of ¹⁰⁶Ru. Fission product." },
  ],
  46: [
    { symbol: "¹⁰²Pd", name: "Palladium-102", massNumber: 102, neutrons: 56, abundance: "1.02%",    halfLife: "Stable",       spin: "0",   binding: 8.583, radioactive: false, decayMode: null, notes: "Lightest stable palladium isotope." },
    { symbol: "¹⁰⁴Pd", name: "Palladium-104", massNumber: 104, neutrons: 58, abundance: "11.14%",   halfLife: "Stable",       spin: "0",   binding: 8.603, radioactive: false, decayMode: null, notes: "Stable palladium isotope." },
    { symbol: "¹⁰⁵Pd", name: "Palladium-105", massNumber: 105, neutrons: 59, abundance: "22.33%",   halfLife: "Stable",       spin: "5/2", binding: 8.590, radioactive: false, decayMode: null, notes: "Most abundant odd-A palladium isotope." },
    { symbol: "¹⁰⁶Pd", name: "Palladium-106", massNumber: 106, neutrons: 60, abundance: "27.33%",   halfLife: "Stable",       spin: "0",   binding: 8.605, radioactive: false, decayMode: null, notes: "Most abundant palladium isotope." },
    { symbol: "¹⁰⁸Pd", name: "Palladium-108", massNumber: 108, neutrons: 62, abundance: "26.46%",   halfLife: "Stable",       spin: "0",   binding: 8.591, radioactive: false, decayMode: null, notes: "Stable palladium isotope." },
    { symbol: "¹¹⁰Pd", name: "Palladium-110", massNumber: 110, neutrons: 64, abundance: "11.72%",   halfLife: "Stable",       spin: "0",   binding: 8.587, radioactive: false, decayMode: null, notes: "Heaviest stable palladium isotope." },
    { symbol: "¹⁰³Pd", name: "Palladium-103", massNumber: 103, neutrons: 57, abundance: "Synthetic", halfLife: "16.991 days",  spin: "5/2", binding: 8.570, radioactive: true,  decayMode: "ε",  notes: "Used in brachytherapy for prostate cancer." },
    { symbol: "¹⁰⁷Pd", name: "Palladium-107", massNumber: 107, neutrons: 61, abundance: "Trace",    halfLife: "6.5 Myr",      spin: "5/2", binding: 8.572, radioactive: true,  decayMode: "β⁻", notes: "Long-lived fission product of uranium." },
    { symbol: "¹⁰⁹Pd", name: "Palladium-109", massNumber: 109, neutrons: 63, abundance: "Synthetic", halfLife: "13.7012 h",   spin: "5/2", binding: 8.567, radioactive: true,  decayMode: "β⁻", notes: "Produced by neutron activation of ¹⁰⁸Pd." },
  ],
  47: [
    { symbol: "¹⁰⁷Ag", name: "Silver-107", massNumber: 107, neutrons: 60, abundance: "51.839%",  halfLife: "Stable",      spin: "1/2", binding: 8.554, radioactive: false, decayMode: null, notes: "More abundant stable silver isotope." },
    { symbol: "¹⁰⁹Ag", name: "Silver-109", massNumber: 109, neutrons: 62, abundance: "48.161%",  halfLife: "Stable",      spin: "1/2", binding: 8.548, radioactive: false, decayMode: null, notes: "Less abundant stable silver isotope." },
    { symbol: "¹⁰⁵Ag", name: "Silver-105", massNumber: 105, neutrons: 58, abundance: "Synthetic", halfLife: "41.29 days",  spin: "1/2", binding: 8.521, radioactive: true,  decayMode: "ε",  notes: "Used in SPECT imaging and biomedical research." },
    { symbol: "¹⁰⁶ᵐAg", name: "Silver-106m", massNumber: 106, neutrons: 59, abundance: "Synthetic", halfLife: "8.28 days", spin: "6",   binding: 8.516, radioactive: true,  decayMode: "β⁺, ε", notes: "Long-lived metastable isomer; used in tracer studies." },
    { symbol: "¹¹¹Ag", name: "Silver-111", massNumber: 111, neutrons: 64, abundance: "Synthetic", halfLife: "7.45 days",   spin: "1/2", binding: 8.523, radioactive: true,  decayMode: "β⁻", notes: "Therapeutic radioisotope for cancer treatment." },
    { symbol: "¹¹⁰ᵐAg", name: "Silver-110m", massNumber: 110, neutrons: 63, abundance: "Synthetic", halfLife: "249.76 days", spin: "6",  binding: 8.515, radioactive: true,  decayMode: "β⁻", notes: "Used as environmental radiotracer." },
  ],
  48: [
    { symbol: "¹⁰⁶Cd", name: "Cadmium-106", massNumber: 106, neutrons: 58, abundance: "1.25%",    halfLife: "Stable",      spin: "0",   binding: 8.535, radioactive: false, decayMode: null, notes: "Lightest stable cadmium isotope." },
    { symbol: "¹⁰⁸Cd", name: "Cadmium-108", massNumber: 108, neutrons: 60, abundance: "0.89%",    halfLife: "Stable",      spin: "0",   binding: 8.552, radioactive: false, decayMode: null, notes: "Stable cadmium isotope." },
    { symbol: "¹¹⁰Cd", name: "Cadmium-110", massNumber: 110, neutrons: 62, abundance: "12.49%",   halfLife: "Stable",      spin: "0",   binding: 8.553, radioactive: false, decayMode: null, notes: "Stable cadmium isotope." },
    { symbol: "¹¹¹Cd", name: "Cadmium-111", massNumber: 111, neutrons: 63, abundance: "12.80%",   halfLife: "Stable",      spin: "1/2", binding: 8.541, radioactive: false, decayMode: null, notes: "Used in ¹¹¹Cd NMR spectroscopy." },
    { symbol: "¹¹²Cd", name: "Cadmium-112", massNumber: 112, neutrons: 64, abundance: "24.13%",   halfLife: "Stable",      spin: "0",   binding: 8.545, radioactive: false, decayMode: null, notes: "Most abundant cadmium isotope." },
    { symbol: "¹¹³Cd", name: "Cadmium-113", massNumber: 113, neutrons: 65, abundance: "12.22%",   halfLife: "8.04×10¹⁵ yr", spin: "1/2", binding: 8.536, radioactive: true,  decayMode: "β⁻", notes: "Effectively stable but formally radioactive. Extremely high neutron absorption." },
    { symbol: "¹¹⁴Cd", name: "Cadmium-114", massNumber: 114, neutrons: 66, abundance: "28.73%",   halfLife: "Stable",      spin: "0",   binding: 8.534, radioactive: false, decayMode: null, notes: "Stable cadmium isotope." },
    { symbol: "¹¹⁶Cd", name: "Cadmium-116", massNumber: 116, neutrons: 68, abundance: "7.49%",    halfLife: "2.8×10¹⁹ yr", spin: "0",  binding: 8.521, radioactive: true,  decayMode: "2β⁻", notes: "Used in double beta decay experiments." },
    { symbol: "¹⁰⁹Cd", name: "Cadmium-109", massNumber: 109, neutrons: 61, abundance: "Synthetic", halfLife: "461.9 days",  spin: "5/2", binding: 8.521, radioactive: true,  decayMode: "ε",  notes: "Used in XRF calibration and tracer studies." },
    { symbol: "¹¹⁵Cd", name: "Cadmium-115", massNumber: 115, neutrons: 67, abundance: "Synthetic", halfLife: "53.46 h",     spin: "1/2", binding: 8.515, radioactive: true,  decayMode: "β⁻", notes: "Fission product and activation product." },
  ],
  49: [
    { symbol: "¹¹³In", name: "Indium-113", massNumber: 113, neutrons: 64, abundance: "4.29%",    halfLife: "Stable",      spin: "9/2", binding: 8.522, radioactive: false, decayMode: null, notes: "Lighter stable indium isotope." },
    { symbol: "¹¹⁵In", name: "Indium-115", massNumber: 115, neutrons: 66, abundance: "95.71%",   halfLife: "4.41×10¹⁴ yr", spin: "9/2", binding: 8.516, radioactive: true,  decayMode: "β⁻", notes: "Most abundant; effectively stable. Longest-lived beta emitter in common use." },
    { symbol: "¹¹¹In", name: "Indium-111", massNumber: 111, neutrons: 62, abundance: "Synthetic", halfLife: "2.8047 days", spin: "9/2", binding: 8.516, radioactive: true,  decayMode: "ε",  notes: "Widely used SPECT radiotracer for oncology and infection imaging." },
    { symbol: "¹¹⁴ᵐIn", name: "Indium-114m", massNumber: 114, neutrons: 65, abundance: "Synthetic", halfLife: "49.51 days", spin: "5",   binding: 8.505, radioactive: true,  decayMode: "ε, β⁻", notes: "Metastable isomer. Used in nuclear medicine studies." },
    { symbol: "¹¹⁰In", name: "Indium-110", massNumber: 110, neutrons: 61, abundance: "Synthetic", halfLife: "4.9 h",       spin: "7",   binding: 8.504, radioactive: true,  decayMode: "β⁺", notes: "Short-lived PET candidate." },
    { symbol: "¹¹⁷In", name: "Indium-117", massNumber: 117, neutrons: 68, abundance: "Synthetic", halfLife: "43.2 min",    spin: "9/2", binding: 8.496, radioactive: true,  decayMode: "β⁻", notes: "Short-lived neutron-rich isotope." },
  ],
  50: [
    { symbol: "¹¹²Sn", name: "Tin-112",  massNumber: 112, neutrons: 62, abundance: "0.97%",    halfLife: "Stable",      spin: "0",   binding: 8.514, radioactive: false, decayMode: null, notes: "Lightest stable tin isotope." },
    { symbol: "¹¹⁴Sn", name: "Tin-114",  massNumber: 114, neutrons: 64, abundance: "0.66%",    halfLife: "Stable",      spin: "0",   binding: 8.523, radioactive: false, decayMode: null, notes: "Stable tin isotope." },
    { symbol: "¹¹⁵Sn", name: "Tin-115",  massNumber: 115, neutrons: 65, abundance: "0.34%",    halfLife: "Stable",      spin: "1/2", binding: 8.514, radioactive: false, decayMode: null, notes: "Stable tin isotope." },
    { symbol: "¹¹⁶Sn", name: "Tin-116",  massNumber: 116, neutrons: 66, abundance: "14.54%",   halfLife: "Stable",      spin: "0",   binding: 8.523, radioactive: false, decayMode: null, notes: "Stable tin isotope." },
    { symbol: "¹¹⁷Sn", name: "Tin-117",  massNumber: 117, neutrons: 67, abundance: "7.68%",    halfLife: "Stable",      spin: "1/2", binding: 8.513, radioactive: false, decayMode: null, notes: "Used in ¹¹⁷Sn Mössbauer spectroscopy." },
    { symbol: "¹¹⁸Sn", name: "Tin-118",  massNumber: 118, neutrons: 68, abundance: "24.22%",   halfLife: "Stable",      spin: "0",   binding: 8.515, radioactive: false, decayMode: null, notes: "Most abundant tin isotope." },
    { symbol: "¹¹⁹Sn", name: "Tin-119",  massNumber: 119, neutrons: 69, abundance: "8.59%",    halfLife: "Stable",      spin: "1/2", binding: 8.505, radioactive: false, decayMode: null, notes: "Used in ¹¹⁹Sn NMR spectroscopy." },
    { symbol: "¹²⁰Sn", name: "Tin-120",  massNumber: 120, neutrons: 70, abundance: "32.58%",   halfLife: "Stable",      spin: "0",   binding: 8.505, radioactive: false, decayMode: null, notes: "Most abundant stable tin isotope." },
    { symbol: "¹²²Sn", name: "Tin-122",  massNumber: 122, neutrons: 72, abundance: "4.63%",    halfLife: "Stable",      spin: "0",   binding: 8.492, radioactive: false, decayMode: null, notes: "Stable tin isotope." },
    { symbol: "¹²⁴Sn", name: "Tin-124",  massNumber: 124, neutrons: 74, abundance: "5.79%",    halfLife: "Stable",      spin: "0",   binding: 8.476, radioactive: false, decayMode: null, notes: "Heaviest stable tin isotope. Tin has the most stable isotopes of any element." },
    { symbol: "¹¹³Sn", name: "Tin-113",  massNumber: 113, neutrons: 63, abundance: "Synthetic", halfLife: "115.09 days", spin: "1/2", binding: 8.502, radioactive: true,  decayMode: "ε",  notes: "Parent of ¹¹³In in generator systems used in nuclear medicine." },
    { symbol: "¹²¹Sn", name: "Tin-121",  massNumber: 121, neutrons: 71, abundance: "Synthetic", halfLife: "27.03 h",     spin: "3/2", binding: 8.470, radioactive: true,  decayMode: "β⁻", notes: "Short-lived neutron-rich isotope." },
    { symbol: "¹²³Sn", name: "Tin-123",  massNumber: 123, neutrons: 73, abundance: "Synthetic", halfLife: "129.2 days",  spin: "11/2", binding: 8.451, radioactive: true, decayMode: "β⁻", notes: "Fission product and neutron-rich isotope." },
    { symbol: "¹²⁶Sn", name: "Tin-126",  massNumber: 126, neutrons: 76, abundance: "Trace",    halfLife: "230000 years", spin: "0",   binding: 8.441, radioactive: true,  decayMode: "β⁻", notes: "Magic neutron number (82). Long-lived fission product." },
  ],
  51: [
    { symbol: "¹²¹Sb", name: "Antimony-121", massNumber: 121, neutrons: 70, abundance: "57.21%",   halfLife: "Stable",      spin: "5/2", binding: 8.465, radioactive: false, decayMode: null, notes: "More abundant stable antimony isotope." },
    { symbol: "¹²³Sb", name: "Antimony-123", massNumber: 123, neutrons: 72, abundance: "42.79%",   halfLife: "Stable",      spin: "7/2", binding: 8.458, radioactive: false, decayMode: null, notes: "Less abundant stable antimony isotope." },
    { symbol: "¹¹⁹Sb", name: "Antimony-119", massNumber: 119, neutrons: 68, abundance: "Synthetic", halfLife: "38.19 h",     spin: "1/2", binding: 8.445, radioactive: true,  decayMode: "ε",  notes: "Used in Mössbauer spectroscopy studies." },
    { symbol: "¹²²Sb", name: "Antimony-122", massNumber: 122, neutrons: 71, abundance: "Synthetic", halfLife: "2.7238 days", spin: "2",   binding: 8.439, radioactive: true,  decayMode: "β⁻", notes: "Used in environmental tracer studies." },
    { symbol: "¹²⁴Sb", name: "Antimony-124", massNumber: 124, neutrons: 73, abundance: "Synthetic", halfLife: "60.20 days",  spin: "3",   binding: 8.447, radioactive: true,  decayMode: "β⁻", notes: "Neutron source when mixed with beryllium." },
    { symbol: "¹²⁵Sb", name: "Antimony-125", massNumber: 125, neutrons: 74, abundance: "Synthetic", halfLife: "2.7586 years", spin: "7/2", binding: 8.449, radioactive: true,  decayMode: "β⁻", notes: "Fission product; important in reactor waste monitoring." },
  ],
  52: [
    { symbol: "¹²⁰Te", name: "Tellurium-120", massNumber: 120, neutrons: 68, abundance: "0.09%",    halfLife: "Stable",       spin: "0",   binding: 8.431, radioactive: false, decayMode: null, notes: "Lightest stable tellurium isotope." },
    { symbol: "¹²²Te", name: "Tellurium-122", massNumber: 122, neutrons: 70, abundance: "2.55%",    halfLife: "Stable",       spin: "0",   binding: 8.454, radioactive: false, decayMode: null, notes: "Stable tellurium isotope." },
    { symbol: "¹²³Te", name: "Tellurium-123", massNumber: 123, neutrons: 71, abundance: "0.89%",    halfLife: ">9.2×10¹⁶ yr", spin: "1/2", binding: 8.444, radioactive: false, decayMode: null, notes: "Effectively stable; universe is too young for its decay to matter." },
    { symbol: "¹²⁴Te", name: "Tellurium-124", massNumber: 124, neutrons: 72, abundance: "4.74%",    halfLife: "Stable",       spin: "0",   binding: 8.456, radioactive: false, decayMode: null, notes: "Stable tellurium isotope." },
    { symbol: "¹²⁵Te", name: "Tellurium-125", massNumber: 125, neutrons: 73, abundance: "7.07%",    halfLife: "Stable",       spin: "1/2", binding: 8.449, radioactive: false, decayMode: null, notes: "Used in ¹²⁵Te NMR spectroscopy." },
    { symbol: "¹²⁶Te", name: "Tellurium-126", massNumber: 126, neutrons: 74, abundance: "18.84%",   halfLife: "Stable",       spin: "0",   binding: 8.454, radioactive: false, decayMode: null, notes: "Most abundant stable tellurium isotope." },
    { symbol: "¹²⁸Te", name: "Tellurium-128", massNumber: 128, neutrons: 76, abundance: "31.74%",   halfLife: "2.2×10²⁴ yr", spin: "0",   binding: 8.448, radioactive: true,  decayMode: "2β⁻", notes: "Longest measured half-life of any radioisotope." },
    { symbol: "¹³⁰Te", name: "Tellurium-130", massNumber: 130, neutrons: 78, abundance: "34.08%",   halfLife: "7.9×10²⁰ yr", spin: "0",   binding: 8.412, radioactive: true,  decayMode: "2β⁻", notes: "Most abundant tellurium isotope. Used in CUORE double beta experiment." },
    { symbol: "¹²⁷ᵐTe", name: "Tellurium-127m", massNumber: 127, neutrons: 75, abundance: "Synthetic", halfLife: "109 days",  spin: "11/2", binding: 8.431, radioactive: true, decayMode: "β⁻", notes: "Long-lived metastable isomer." },
    { symbol: "¹³²Te", name: "Tellurium-132", massNumber: 132, neutrons: 80, abundance: "Synthetic", halfLife: "3.204 days",  spin: "0",   binding: 8.397, radioactive: true,  decayMode: "β⁻", notes: "Major early fission product released in Chernobyl disaster." },
  ],
  53: [
    { symbol: "¹²⁷I",  name: "Iodine-127",  massNumber: 127, neutrons: 74, abundance: "100%",      halfLife: "Stable",      spin: "5/2", binding: 8.432, radioactive: false, decayMode: null, notes: "Only stable iodine isotope. Essential trace nutrient." },
    { symbol: "¹²³I",  name: "Iodine-123",  massNumber: 123, neutrons: 70, abundance: "Synthetic", halfLife: "13.2235 h",   spin: "5/2", binding: 8.389, radioactive: true,  decayMode: "ε",  notes: "Most commonly used radioiodine for SPECT thyroid imaging." },
    { symbol: "¹²⁴I",  name: "Iodine-124",  massNumber: 124, neutrons: 71, abundance: "Synthetic", halfLife: "4.1760 days", spin: "2",   binding: 8.389, radioactive: true,  decayMode: "β⁺", notes: "PET radiotracer for thyroid and cancer imaging." },
    { symbol: "¹²⁵I",  name: "Iodine-125",  massNumber: 125, neutrons: 72, abundance: "Synthetic", halfLife: "59.407 days", spin: "5/2", binding: 8.402, radioactive: true,  decayMode: "ε",  notes: "Widely used in brachytherapy for prostate cancer and in bioassays." },
    { symbol: "¹²⁹I",  name: "Iodine-129",  massNumber: 129, neutrons: 76, abundance: "Trace",     halfLife: "15.7 Myr",    spin: "7/2", binding: 8.427, radioactive: true,  decayMode: "β⁻", notes: "Long-lived fission product. Groundwater contamination marker." },
    { symbol: "¹³¹I",  name: "Iodine-131",  massNumber: 131, neutrons: 78, abundance: "Synthetic", halfLife: "8.0197 days", spin: "7/2", binding: 8.415, radioactive: true,  decayMode: "β⁻", notes: "Major fission product. Used in thyroid cancer therapy and diagnostic." },
    { symbol: "¹³²I",  name: "Iodine-132",  massNumber: 132, neutrons: 79, abundance: "Synthetic", halfLife: "2.295 h",     spin: "4",   binding: 8.394, radioactive: true,  decayMode: "β⁻", notes: "Short-lived early fission product; released in nuclear accidents." },
    { symbol: "¹³³I",  name: "Iodine-133",  massNumber: 133, neutrons: 80, abundance: "Synthetic", halfLife: "20.83 h",     spin: "7/2", binding: 8.396, radioactive: true,  decayMode: "β⁻", notes: "Fission product; important in emergency nuclear medicine." },
  ],
  54: [
    { symbol: "¹²⁴Xe", name: "Xenon-124",  massNumber: 124, neutrons: 70, abundance: "0.095%",   halfLife: "1.8×10²² yr", spin: "0",   binding: 8.388, radioactive: true,  decayMode: "2ε", notes: "Longest measured half-life by direct observation." },
    { symbol: "¹²⁶Xe", name: "Xenon-126",  massNumber: 126, neutrons: 72, abundance: "0.089%",   halfLife: "Stable",      spin: "0",   binding: 8.400, radioactive: false, decayMode: null, notes: "Stable xenon isotope." },
    { symbol: "¹²⁸Xe", name: "Xenon-128",  massNumber: 128, neutrons: 74, abundance: "1.910%",   halfLife: "Stable",      spin: "0",   binding: 8.413, radioactive: false, decayMode: null, notes: "Stable xenon isotope." },
    { symbol: "¹²⁹Xe", name: "Xenon-129",  massNumber: 129, neutrons: 75, abundance: "26.401%",  halfLife: "Stable",      spin: "1/2", binding: 8.410, radioactive: false, decayMode: null, notes: "Used in ¹²⁹Xe NMR and hyperpolarized xenon MRI." },
    { symbol: "¹³⁰Xe", name: "Xenon-130",  massNumber: 130, neutrons: 76, abundance: "4.071%",   halfLife: "Stable",      spin: "0",   binding: 8.419, radioactive: false, decayMode: null, notes: "Stable xenon isotope." },
    { symbol: "¹³¹Xe", name: "Xenon-131",  massNumber: 131, neutrons: 77, abundance: "21.232%",  halfLife: "Stable",      spin: "3/2", binding: 8.413, radioactive: false, decayMode: null, notes: "Daughter of ¹³¹I. Used in nuclear medicine and plasma physics." },
    { symbol: "¹³²Xe", name: "Xenon-132",  massNumber: 132, neutrons: 78, abundance: "26.909%",  halfLife: "Stable",      spin: "0",   binding: 8.405, radioactive: false, decayMode: null, notes: "Most abundant xenon isotope." },
    { symbol: "¹³⁴Xe", name: "Xenon-134",  massNumber: 134, neutrons: 80, abundance: "10.436%",  halfLife: "Stable",      spin: "0",   binding: 8.394, radioactive: false, decayMode: null, notes: "Stable xenon isotope." },
    { symbol: "¹³⁶Xe", name: "Xenon-136",  massNumber: 136, neutrons: 82, abundance: "8.857%",   halfLife: "2.17×10²¹ yr", spin: "0",  binding: 8.378, radioactive: true,  decayMode: "2β⁻", notes: "Magic neutron number (82). Used in EXO-200 and nEXO double beta experiments." },
    { symbol: "¹²⁷Xe", name: "Xenon-127",  massNumber: 127, neutrons: 73, abundance: "Synthetic", halfLife: "36.345 days", spin: "1/2", binding: 8.387, radioactive: true,  decayMode: "ε",  notes: "Used in SPECT and lung ventilation imaging." },
    { symbol: "¹³³Xe", name: "Xenon-133",  massNumber: 133, neutrons: 79, abundance: "Synthetic", halfLife: "5.2474 days", spin: "3/2", binding: 8.393, radioactive: true,  decayMode: "β⁻", notes: "Fission product. Used for lung ventilation studies and nuclear explosion monitoring." },
    { symbol: "¹³⁵Xe", name: "Xenon-135",  massNumber: 135, neutrons: 81, abundance: "Synthetic", halfLife: "9.14 h",      spin: "3/2", binding: 8.375, radioactive: true,  decayMode: "β⁻", notes: "Huge neutron-capture cross section. Major nuclear reactor poison." },
  ],
  55: [
    { symbol: "¹³³Cs", name: "Cesium-133", massNumber: 133, neutrons: 78, abundance: "100%",      halfLife: "Stable",       spin: "7/2", binding: 8.388, radioactive: false, decayMode: null, notes: "Only stable cesium isotope. Used to define the SI second." },
    { symbol: "¹³⁴Cs", name: "Cesium-134", massNumber: 134, neutrons: 79, abundance: "Synthetic", halfLife: "2.0652 years", spin: "4",   binding: 8.377, radioactive: true,  decayMode: "β⁻", notes: "Fission product released in Fukushima and Chernobyl accidents." },
    { symbol: "¹³⁵Cs", name: "Cesium-135", massNumber: 135, neutrons: 80, abundance: "Trace",     halfLife: "2.3 Myr",      spin: "7/2", binding: 8.383, radioactive: true,  decayMode: "β⁻", notes: "Long-lived fission product; nuclear waste concern." },
    { symbol: "¹³⁶Cs", name: "Cesium-136", massNumber: 136, neutrons: 81, abundance: "Synthetic", halfLife: "13.16 days",   spin: "5",   binding: 8.367, radioactive: true,  decayMode: "β⁻", notes: "Fission product. Used as tracer in nuclear fallout studies." },
    { symbol: "¹³⁷Cs", name: "Cesium-137", massNumber: 137, neutrons: 82, abundance: "Trace",     halfLife: "30.17 years",  spin: "7/2", binding: 8.388, radioactive: true,  decayMode: "β⁻", notes: "Major nuclear fallout hazard. Used in medical and industrial radiography." },
    { symbol: "¹³¹Cs", name: "Cesium-131", massNumber: 131, neutrons: 76, abundance: "Synthetic", halfLife: "9.689 days",   spin: "5/2", binding: 8.349, radioactive: true,  decayMode: "ε",  notes: "Emerging brachytherapy agent for brain tumors." },
    { symbol: "¹³²Cs", name: "Cesium-132", massNumber: 132, neutrons: 77, abundance: "Synthetic", halfLife: "6.479 days",   spin: "2",   binding: 8.360, radioactive: true,  decayMode: "β⁺, ε", notes: "Produced by proton irradiation. PET imaging agent." },
  ],
  56: [
    { symbol: "¹³⁰Ba", name: "Barium-130", massNumber: 130, neutrons: 74, abundance: "0.106%",   halfLife: "1.6×10²¹ yr", spin: "0",   binding: 8.367, radioactive: false, decayMode: null, notes: "Effectively stable; extremely long half-life." },
    { symbol: "¹³²Ba", name: "Barium-132", massNumber: 132, neutrons: 76, abundance: "0.101%",   halfLife: "Stable",      spin: "0",   binding: 8.369, radioactive: false, decayMode: null, notes: "Stable barium isotope." },
    { symbol: "¹³⁴Ba", name: "Barium-134", massNumber: 134, neutrons: 78, abundance: "2.417%",   halfLife: "Stable",      spin: "0",   binding: 8.374, radioactive: false, decayMode: null, notes: "Stable barium isotope." },
    { symbol: "¹³⁵Ba", name: "Barium-135", massNumber: 135, neutrons: 79, abundance: "6.592%",   halfLife: "Stable",      spin: "3/2", binding: 8.368, radioactive: false, decayMode: null, notes: "Stable barium isotope." },
    { symbol: "¹³⁶Ba", name: "Barium-136", massNumber: 136, neutrons: 80, abundance: "7.854%",   halfLife: "Stable",      spin: "0",   binding: 8.375, radioactive: false, decayMode: null, notes: "Stable barium isotope." },
    { symbol: "¹³⁷Ba", name: "Barium-137", massNumber: 137, neutrons: 81, abundance: "11.232%",  halfLife: "Stable",      spin: "3/2", binding: 8.365, radioactive: false, decayMode: null, notes: "Daughter of ¹³⁷Cs. Stable barium isotope." },
    { symbol: "¹³⁸Ba", name: "Barium-138", massNumber: 138, neutrons: 82, abundance: "71.698%",  halfLife: "Stable",      spin: "0",   binding: 8.393, radioactive: false, decayMode: null, notes: "Magic neutron number. Most abundant barium isotope." },
    { symbol: "¹³¹Ba", name: "Barium-131", massNumber: 131, neutrons: 75, abundance: "Synthetic", halfLife: "11.50 days",  spin: "1/2", binding: 8.341, radioactive: true,  decayMode: "ε",  notes: "PET isotope used in nuclear medicine generator." },
    { symbol: "¹³³Ba", name: "Barium-133", massNumber: 133, neutrons: 77, abundance: "Synthetic", halfLife: "10.551 years", spin: "1/2", binding: 8.358, radioactive: true,  decayMode: "ε",  notes: "Standard gamma-ray calibration source." },
    { symbol: "¹³⁹Ba", name: "Barium-139", massNumber: 139, neutrons: 83, abundance: "Synthetic", halfLife: "83.06 min",   spin: "7/2", binding: 8.372, radioactive: true,  decayMode: "β⁻", notes: "Short-lived fission product." },
    { symbol: "¹⁴⁰Ba", name: "Barium-140", massNumber: 140, neutrons: 84, abundance: "Synthetic", halfLife: "12.752 days", spin: "0",   binding: 8.353, radioactive: true,  decayMode: "β⁻", notes: "Fission product used to study reactor fuel burn-up." },
  ],
  57: [
    { symbol: "¹³⁸La", name: "Lanthanum-138", massNumber: 138, neutrons: 81, abundance: "0.08881%", halfLife: "1.02×10¹¹ yr", spin: "5",   binding: 8.341, radioactive: true,  decayMode: "β⁻, ε", notes: "Naturally occurring long-lived radioisotope." },
    { symbol: "¹³⁹La", name: "Lanthanum-139", massNumber: 139, neutrons: 82, abundance: "99.91119%", halfLife: "Stable",      spin: "7/2", binding: 8.378, radioactive: false, decayMode: null,     notes: "Magic neutron number. Most abundant lanthanum isotope." },
    { symbol: "¹³⁵La", name: "Lanthanum-135", massNumber: 135, neutrons: 78, abundance: "Synthetic", halfLife: "19.5 h",      spin: "5/2", binding: 8.314, radioactive: true,  decayMode: "ε",      notes: "Short-lived lanthanum isotope." },
    { symbol: "¹³⁷La", name: "Lanthanum-137", massNumber: 137, neutrons: 80, abundance: "Trace",     halfLife: "60000 years", spin: "7/2", binding: 8.334, radioactive: true,  decayMode: "ε",      notes: "Long-lived lanthanum radioisotope." },
    { symbol: "¹⁴⁰La", name: "Lanthanum-140", massNumber: 140, neutrons: 83, abundance: "Synthetic", halfLife: "1.6781 days", spin: "3",   binding: 8.358, radioactive: true,  decayMode: "β⁻",     notes: "Daughter of ¹⁴⁰Ba. Used in fission product studies." },
  ],
  58: [
    { symbol: "¹³⁶Ce", name: "Cerium-136", massNumber: 136, neutrons: 78, abundance: "0.185%",   halfLife: "Stable",       spin: "0",   binding: 8.343, radioactive: false, decayMode: null, notes: "Lightest stable cerium isotope." },
    { symbol: "¹³⁸Ce", name: "Cerium-138", massNumber: 138, neutrons: 80, abundance: "0.251%",   halfLife: "Stable",       spin: "0",   binding: 8.343, radioactive: false, decayMode: null, notes: "Stable cerium isotope." },
    { symbol: "¹⁴⁰Ce", name: "Cerium-140", massNumber: 140, neutrons: 82, abundance: "88.449%",  halfLife: "Stable",       spin: "0",   binding: 8.377, radioactive: false, decayMode: null, notes: "Magic neutron number. Most abundant cerium isotope." },
    { symbol: "¹⁴²Ce", name: "Cerium-142", massNumber: 142, neutrons: 84, abundance: "11.114%",  halfLife: ">5×10¹⁶ yr",  spin: "0",   binding: 8.352, radioactive: false, decayMode: null, notes: "Effectively stable; candidate for double beta decay." },
    { symbol: "¹³⁹Ce", name: "Cerium-139", massNumber: 139, neutrons: 81, abundance: "Synthetic", halfLife: "137.641 days", spin: "3/2", binding: 8.346, radioactive: true,  decayMode: "ε",  notes: "Used in gamma-ray calibration and tracer studies." },
    { symbol: "¹⁴¹Ce", name: "Cerium-141", massNumber: 141, neutrons: 83, abundance: "Synthetic", halfLife: "32.508 days",  spin: "7/2", binding: 8.361, radioactive: true,  decayMode: "β⁻", notes: "Fission product and diagnostic radioisotope." },
    { symbol: "¹⁴⁴Ce", name: "Cerium-144", massNumber: 144, neutrons: 86, abundance: "Synthetic", halfLife: "284.89 days",  spin: "0",   binding: 8.325, radioactive: true,  decayMode: "β⁻", notes: "Fission product. Parent of ¹⁴⁴Pr in generator systems." },
  ],
  59: [
    { symbol: "¹⁴¹Pr", name: "Praseodymium-141", massNumber: 141, neutrons: 82, abundance: "100%",      halfLife: "Stable",      spin: "5/2", binding: 8.354, radioactive: false, decayMode: null, notes: "Magic neutron number. Only stable praseodymium isotope." },
    { symbol: "¹⁴²Pr", name: "Praseodymium-142", massNumber: 142, neutrons: 83, abundance: "Synthetic", halfLife: "19.12 h",     spin: "2",   binding: 8.340, radioactive: true,  decayMode: "β⁻", notes: "Used in radioisotope therapy research." },
    { symbol: "¹⁴³Pr", name: "Praseodymium-143", massNumber: 143, neutrons: 84, abundance: "Synthetic", halfLife: "13.57 days",  spin: "7/2", binding: 8.347, radioactive: true,  decayMode: "β⁻", notes: "Fission product." },
    { symbol: "¹⁴⁴Pr", name: "Praseodymium-144", massNumber: 144, neutrons: 85, abundance: "Synthetic", halfLife: "17.28 min",   spin: "0",   binding: 8.323, radioactive: true,  decayMode: "β⁻", notes: "Daughter of ¹⁴⁴Ce. Short-lived fission product." },
    { symbol: "¹³⁹Pr", name: "Praseodymium-139", massNumber: 139, neutrons: 80, abundance: "Synthetic", halfLife: "4.41 h",      spin: "5/2", binding: 8.317, radioactive: true,  decayMode: "β⁺, ε", notes: "Proton-rich praseodymium isotope." },
  ],
  60: [
    { symbol: "¹⁴²Nd", name: "Neodymium-142", massNumber: 142, neutrons: 82, abundance: "27.2%",    halfLife: "Stable",       spin: "0",   binding: 8.342, radioactive: false, decayMode: null, notes: "Magic neutron number. Most abundant neodymium isotope." },
    { symbol: "¹⁴³Nd", name: "Neodymium-143", massNumber: 143, neutrons: 83, abundance: "12.2%",    halfLife: "Stable",       spin: "7/2", binding: 8.333, radioactive: false, decayMode: null, notes: "Stable neodymium isotope." },
    { symbol: "¹⁴⁴Nd", name: "Neodymium-144", massNumber: 144, neutrons: 84, abundance: "23.8%",    halfLife: "2.29×10¹⁵ yr", spin: "0",  binding: 8.329, radioactive: true,  decayMode: "α",  notes: "Alpha-decaying isotope used in Sm-Nd geochronology." },
    { symbol: "¹⁴⁵Nd", name: "Neodymium-145", massNumber: 145, neutrons: 85, abundance: "8.3%",     halfLife: "Stable",       spin: "7/2", binding: 8.323, radioactive: false, decayMode: null, notes: "Stable neodymium isotope." },
    { symbol: "¹⁴⁶Nd", name: "Neodymium-146", massNumber: 146, neutrons: 86, abundance: "17.2%",    halfLife: "Stable",       spin: "0",   binding: 8.328, radioactive: false, decayMode: null, notes: "Stable neodymium isotope." },
    { symbol: "¹⁴⁸Nd", name: "Neodymium-148", massNumber: 148, neutrons: 88, abundance: "5.7%",     halfLife: "Stable",       spin: "0",   binding: 8.307, radioactive: false, decayMode: null, notes: "Stable neodymium isotope." },
    { symbol: "¹⁵⁰Nd", name: "Neodymium-150", massNumber: 150, neutrons: 90, abundance: "5.6%",     halfLife: "7×10¹⁸ yr",   spin: "0",   binding: 8.283, radioactive: true,  decayMode: "2β⁻", notes: "Used in double beta decay experiments (SNO+, CUORE)." },
    { symbol: "¹⁴⁷Nd", name: "Neodymium-147", massNumber: 147, neutrons: 87, abundance: "Synthetic", halfLife: "10.98 days",  spin: "5/2", binding: 8.302, radioactive: true,  decayMode: "β⁻", notes: "Fission product. Parent of ¹⁴⁷Sm." },
  ],
  61: [
    { symbol: "¹⁴⁵Pm", name: "Promethium-145", massNumber: 145, neutrons: 84, abundance: "Synthetic", halfLife: "17.7 years",  spin: "5/2", binding: 8.296, radioactive: true, decayMode: "ε, α", notes: "Most stable promethium isotope. No stable isotopes exist." },
    { symbol: "¹⁴⁶Pm", name: "Promethium-146", massNumber: 146, neutrons: 85, abundance: "Synthetic", halfLife: "5.53 years",  spin: "3",   binding: 8.288, radioactive: true, decayMode: "ε, β⁻", notes: "Second most stable promethium isotope." },
    { symbol: "¹⁴⁷Pm", name: "Promethium-147", massNumber: 147, neutrons: 86, abundance: "Trace",     halfLife: "2.6234 years", spin: "7/2", binding: 8.293, radioactive: true, decayMode: "β⁻", notes: "Used in nuclear batteries and thickness gauges." },
    { symbol: "¹⁴³Pm", name: "Promethium-143", massNumber: 143, neutrons: 82, abundance: "Synthetic", halfLife: "265 days",    spin: "5/2", binding: 8.291, radioactive: true, decayMode: "ε",   notes: "Magic neutron number. Proton-rich promethium." },
    { symbol: "¹⁴⁸Pm", name: "Promethium-148", massNumber: 148, neutrons: 87, abundance: "Synthetic", halfLife: "5.368 days",  spin: "1",   binding: 8.272, radioactive: true, decayMode: "β⁻", notes: "Short-lived fission product." },
    { symbol: "¹⁴⁹Pm", name: "Promethium-149", massNumber: 149, neutrons: 88, abundance: "Synthetic", halfLife: "53.08 h",     spin: "7/2", binding: 8.273, radioactive: true, decayMode: "β⁻", notes: "Considered for use in nuclear medicine therapy." },
    { symbol: "¹⁵¹Pm", name: "Promethium-151", massNumber: 151, neutrons: 90, abundance: "Synthetic", halfLife: "28.40 h",     spin: "5/2", binding: 8.259, radioactive: true, decayMode: "β⁻", notes: "Fission product of uranium." },
  ],
  62: [
    { symbol: "¹⁴⁴Sm", name: "Samarium-144", massNumber: 144, neutrons: 82, abundance: "3.07%",    halfLife: "Stable",       spin: "0",   binding: 8.303, radioactive: false, decayMode: null, notes: "Magic neutron number." },
    { symbol: "¹⁴⁷Sm", name: "Samarium-147", massNumber: 147, neutrons: 85, abundance: "14.99%",   halfLife: "1.06×10¹¹ yr", spin: "7/2", binding: 8.274, radioactive: true,  decayMode: "α",  notes: "Used in Sm-Nd isotope geochronology." },
    { symbol: "¹⁴⁸Sm", name: "Samarium-148", massNumber: 148, neutrons: 86, abundance: "11.24%",   halfLife: "7×10¹⁵ yr",   spin: "0",   binding: 8.278, radioactive: true,  decayMode: "α",  notes: "Effectively stable alpha emitter." },
    { symbol: "¹⁴⁹Sm", name: "Samarium-149", massNumber: 149, neutrons: 87, abundance: "13.82%",   halfLife: ">2×10¹⁵ yr",  spin: "7/2", binding: 8.271, radioactive: false, decayMode: null, notes: "Huge neutron-capture cross section; reactor poison like ¹³⁵Xe." },
    { symbol: "¹⁵⁰Sm", name: "Samarium-150", massNumber: 150, neutrons: 88, abundance: "7.38%",    halfLife: "Stable",       spin: "0",   binding: 8.262, radioactive: false, decayMode: null, notes: "Stable samarium isotope." },
    { symbol: "¹⁵²Sm", name: "Samarium-152", massNumber: 152, neutrons: 90, abundance: "26.75%",   halfLife: "Stable",       spin: "0",   binding: 8.272, radioactive: false, decayMode: null, notes: "Most abundant samarium isotope." },
    { symbol: "¹⁵⁴Sm", name: "Samarium-154", massNumber: 154, neutrons: 92, abundance: "22.75%",   halfLife: "Stable",       spin: "0",   binding: 8.253, radioactive: false, decayMode: null, notes: "Stable samarium isotope." },
    { symbol: "¹⁵³Sm", name: "Samarium-153", massNumber: 153, neutrons: 91, abundance: "Synthetic", halfLife: "46.284 h",     spin: "3/2", binding: 8.254, radioactive: true,  decayMode: "β⁻", notes: "Used in palliative treatment of bone metastases (Quadramet)." },
    { symbol: "¹⁵¹Sm", name: "Samarium-151", massNumber: 151, neutrons: 89, abundance: "Trace",    halfLife: "88.8 years",   spin: "5/2", binding: 8.258, radioactive: true,  decayMode: "β⁻", notes: "Long-lived fission product; nuclear waste consideration." },
  ],
  63: [
    { symbol: "¹⁵¹Eu", name: "Europium-151", massNumber: 151, neutrons: 88, abundance: "47.81%",   halfLife: "Stable",       spin: "5/2", binding: 8.238, radioactive: false, decayMode: null, notes: "More abundant stable europium isotope." },
    { symbol: "¹⁵³Eu", name: "Europium-153", massNumber: 153, neutrons: 90, abundance: "52.19%",   halfLife: "Stable",       spin: "5/2", binding: 8.248, radioactive: false, decayMode: null, notes: "Less abundant but slightly more neutron-rich stable isotope." },
    { symbol: "¹⁵²Eu", name: "Europium-152", massNumber: 152, neutrons: 89, abundance: "Synthetic", halfLife: "13.516 years", spin: "3",   binding: 8.232, radioactive: true,  decayMode: "β⁺, ε, β⁻", notes: "Standard gamma-ray calibration source. Produced by neutron activation." },
    { symbol: "¹⁵⁴Eu", name: "Europium-154", massNumber: 154, neutrons: 91, abundance: "Synthetic", halfLife: "8.593 years",  spin: "3",   binding: 8.232, radioactive: true,  decayMode: "β⁻", notes: "Activation product in reactor structural materials." },
    { symbol: "¹⁵⁵Eu", name: "Europium-155", massNumber: 155, neutrons: 92, abundance: "Synthetic", halfLife: "4.753 years",  spin: "5/2", binding: 8.235, radioactive: true,  decayMode: "β⁻", notes: "Fission product. Long-lived reactor waste concern." },
    { symbol: "¹⁴⁹Eu", name: "Europium-149", massNumber: 149, neutrons: 86, abundance: "Synthetic", halfLife: "93.1 days",    spin: "5/2", binding: 8.220, radioactive: true,  decayMode: "ε",  notes: "Proton-rich europium isotope." },
  ],
  64: [
    { symbol: "¹⁵²Gd", name: "Gadolinium-152", massNumber: 152, neutrons: 88, abundance: "0.20%",    halfLife: "1.08×10¹⁴ yr", spin: "0",   binding: 8.213, radioactive: true,  decayMode: "α",  notes: "Lightest gadolinium isotope. Alpha-decaying." },
    { symbol: "¹⁵⁴Gd", name: "Gadolinium-154", massNumber: 154, neutrons: 90, abundance: "2.18%",    halfLife: "Stable",       spin: "0",   binding: 8.224, radioactive: false, decayMode: null, notes: "Stable gadolinium isotope." },
    { symbol: "¹⁵⁵Gd", name: "Gadolinium-155", massNumber: 155, neutrons: 91, abundance: "14.80%",   halfLife: "Stable",       spin: "3/2", binding: 8.220, radioactive: false, decayMode: null, notes: "Highest thermal neutron capture cross section of all stable nuclides." },
    { symbol: "¹⁵⁶Gd", name: "Gadolinium-156", massNumber: 156, neutrons: 92, abundance: "20.47%",   halfLife: "Stable",       spin: "0",   binding: 8.224, radioactive: false, decayMode: null, notes: "Most abundant gadolinium isotope." },
    { symbol: "¹⁵⁷Gd", name: "Gadolinium-157", massNumber: 157, neutrons: 93, abundance: "15.65%",   halfLife: "Stable",       spin: "3/2", binding: 8.214, radioactive: false, decayMode: null, notes: "Very high neutron absorption. Used in MRI contrast agents." },
    { symbol: "¹⁵⁸Gd", name: "Gadolinium-158", massNumber: 158, neutrons: 94, abundance: "24.84%",   halfLife: "Stable",       spin: "0",   binding: 8.214, radioactive: false, decayMode: null, notes: "Stable gadolinium isotope." },
    { symbol: "¹⁶⁰Gd", name: "Gadolinium-160", massNumber: 160, neutrons: 96, abundance: "21.86%",   halfLife: "Stable",       spin: "0",   binding: 8.202, radioactive: false, decayMode: null, notes: "Heaviest stable gadolinium isotope." },
    { symbol: "¹⁵³Gd", name: "Gadolinium-153", massNumber: 153, neutrons: 89, abundance: "Synthetic", halfLife: "240.4 days",   spin: "3/2", binding: 8.199, radioactive: true,  decayMode: "ε",  notes: "Used in dual-energy X-ray absorptiometry (DEXA) for bone density." },
    { symbol: "¹⁵⁹Gd", name: "Gadolinium-159", massNumber: 159, neutrons: 95, abundance: "Synthetic", halfLife: "18.479 h",     spin: "3/2", binding: 8.194, radioactive: true,  decayMode: "β⁻", notes: "Potential therapeutic radioisotope." },
  ],
  65: [
    { symbol: "¹⁵⁹Tb", name: "Terbium-159", massNumber: 159, neutrons: 94, abundance: "100%",      halfLife: "Stable",      spin: "3/2", binding: 8.186, radioactive: false, decayMode: null, notes: "Only stable terbium isotope." },
    { symbol: "¹⁴⁹Tb", name: "Terbium-149", massNumber: 149, neutrons: 84, abundance: "Synthetic", halfLife: "4.118 h",     spin: "1/2", binding: 8.126, radioactive: true,  decayMode: "α, β⁺", notes: "Alpha emitter for targeted alpha therapy research." },
    { symbol: "¹⁵²Tb", name: "Terbium-152", massNumber: 152, neutrons: 87, abundance: "Synthetic", halfLife: "17.5 h",      spin: "2",   binding: 8.145, radioactive: true,  decayMode: "β⁺", notes: "PET imaging radioisotope." },
    { symbol: "¹⁵⁵Tb", name: "Terbium-155", massNumber: 155, neutrons: 90, abundance: "Synthetic", halfLife: "5.32 days",   spin: "3/2", binding: 8.164, radioactive: true,  decayMode: "ε",  notes: "SPECT imaging radioisotope." },
    { symbol: "¹⁶¹Tb", name: "Terbium-161", massNumber: 161, neutrons: 96, abundance: "Synthetic", halfLife: "6.906 days",  spin: "3/2", binding: 8.167, radioactive: true,  decayMode: "β⁻", notes: "Promising therapeutic radioisotope; low-energy Auger electrons." },
    { symbol: "¹⁶⁰Tb", name: "Terbium-160", massNumber: 160, neutrons: 95, abundance: "Synthetic", halfLife: "72.3 days",   spin: "3",   binding: 8.165, radioactive: true,  decayMode: "β⁻", notes: "Used as tracer in environmental and biological studies." },
  ],
  66: [
    { symbol: "¹⁵⁶Dy", name: "Dysprosium-156", massNumber: 156, neutrons: 90, abundance: "0.056%",   halfLife: "Stable",      spin: "0",   binding: 8.186, radioactive: false, decayMode: null, notes: "Lightest stable dysprosium isotope." },
    { symbol: "¹⁵⁸Dy", name: "Dysprosium-158", massNumber: 158, neutrons: 92, abundance: "0.095%",   halfLife: "Stable",      spin: "0",   binding: 8.188, radioactive: false, decayMode: null, notes: "Stable dysprosium isotope." },
    { symbol: "¹⁶⁰Dy", name: "Dysprosium-160", massNumber: 160, neutrons: 94, abundance: "2.329%",   halfLife: "Stable",      spin: "0",   binding: 8.193, radioactive: false, decayMode: null, notes: "Stable dysprosium isotope." },
    { symbol: "¹⁶¹Dy", name: "Dysprosium-161", massNumber: 161, neutrons: 95, abundance: "18.889%",  halfLife: "Stable",      spin: "5/2", binding: 8.186, radioactive: false, decayMode: null, notes: "Stable dysprosium isotope." },
    { symbol: "¹⁶²Dy", name: "Dysprosium-162", massNumber: 162, neutrons: 96, abundance: "25.475%",  halfLife: "Stable",      spin: "0",   binding: 8.193, radioactive: false, decayMode: null, notes: "Most abundant dysprosium isotope." },
    { symbol: "¹⁶³Dy", name: "Dysprosium-163", massNumber: 163, neutrons: 97, abundance: "24.896%",  halfLife: "Stable",      spin: "5/2", binding: 8.184, radioactive: false, decayMode: null, notes: "Stable dysprosium isotope." },
    { symbol: "¹⁶⁴Dy", name: "Dysprosium-164", massNumber: 164, neutrons: 98, abundance: "28.260%",  halfLife: "Stable",      spin: "0",   binding: 8.193, radioactive: false, decayMode: null, notes: "Heaviest stable dysprosium isotope." },
    { symbol: "¹⁶⁵Dy", name: "Dysprosium-165", massNumber: 165, neutrons: 99, abundance: "Synthetic", halfLife: "2.334 h",    spin: "7/2", binding: 8.178, radioactive: true,  decayMode: "β⁻", notes: "Used for synovectomy in radiation synovectomy therapy." },
    { symbol: "¹⁶⁶Dy", name: "Dysprosium-166", massNumber: 166, neutrons: 100, abundance: "Synthetic", halfLife: "81.6 h",   spin: "0",   binding: 8.177, radioactive: true,  decayMode: "β⁻", notes: "Parent of ¹⁶⁶Ho. Used in cancer therapy generator systems." },
  ],
  67: [
    { symbol: "¹⁶⁵Ho", name: "Holmium-165",  massNumber: 165, neutrons: 98,  abundance: "100%",      halfLife: "Stable",      spin: "7/2", binding: 8.164, radioactive: false, decayMode: null, notes: "Only stable holmium isotope. Highest magnetic moment of any stable nuclide." },
    { symbol: "¹⁶³Ho", name: "Holmium-163",  massNumber: 163, neutrons: 96,  abundance: "Trace",     halfLife: "4570 years",  spin: "7/2", binding: 8.165, radioactive: true,  decayMode: "ε",  notes: "Long-lived electron-capture isotope." },
    { symbol: "¹⁶⁶Ho", name: "Holmium-166",  massNumber: 166, neutrons: 99,  abundance: "Synthetic", halfLife: "26.827 h",    spin: "0",   binding: 8.151, radioactive: true,  decayMode: "β⁻", notes: "Used in targeted radionuclide therapy for liver cancer (SIRT)." },
    { symbol: "¹⁶⁶ᵐHo", name: "Holmium-166m", massNumber: 166, neutrons: 99, abundance: "Synthetic", halfLife: "1200 years",  spin: "7",   binding: 8.151, radioactive: true,  decayMode: "β⁻", notes: "Long-lived metastable state. Environmental radioactive tracer." },
    { symbol: "¹⁶⁴Ho", name: "Holmium-164",  massNumber: 164, neutrons: 97,  abundance: "Synthetic", halfLife: "29 min",      spin: "1",   binding: 8.147, radioactive: true,  decayMode: "β⁺, ε", notes: "Short-lived holmium isotope." },
  ],
  68: [
    { symbol: "¹⁶²Er", name: "Erbium-162",  massNumber: 162, neutrons: 94,  abundance: "0.139%",   halfLife: "Stable",      spin: "0",   binding: 8.182, radioactive: false, decayMode: null, notes: "Lightest stable erbium isotope." },
    { symbol: "¹⁶⁴Er", name: "Erbium-164",  massNumber: 164, neutrons: 96,  abundance: "1.601%",   halfLife: "Stable",      spin: "0",   binding: 8.184, radioactive: false, decayMode: null, notes: "Stable erbium isotope." },
    { symbol: "¹⁶⁶Er", name: "Erbium-166",  massNumber: 166, neutrons: 98,  abundance: "33.503%",  halfLife: "Stable",      spin: "0",   binding: 8.187, radioactive: false, decayMode: null, notes: "Most abundant erbium isotope." },
    { symbol: "¹⁶⁷Er", name: "Erbium-167",  massNumber: 167, neutrons: 99,  abundance: "22.869%",  halfLife: "Stable",      spin: "7/2", binding: 8.179, radioactive: false, decayMode: null, notes: "Stable erbium isotope." },
    { symbol: "¹⁶⁸Er", name: "Erbium-168",  massNumber: 168, neutrons: 100, abundance: "26.978%",  halfLife: "Stable",      spin: "0",   binding: 8.181, radioactive: false, decayMode: null, notes: "Stable erbium isotope." },
    { symbol: "¹⁷⁰Er", name: "Erbium-170",  massNumber: 170, neutrons: 102, abundance: "14.910%",  halfLife: "Stable",      spin: "0",   binding: 8.162, radioactive: false, decayMode: null, notes: "Heaviest stable erbium isotope." },
    { symbol: "¹⁶⁹Er", name: "Erbium-169",  massNumber: 169, neutrons: 101, abundance: "Synthetic", halfLife: "9.392 days",  spin: "1/2", binding: 8.165, radioactive: true,  decayMode: "β⁻", notes: "Used in radiation synovectomy treatment of rheumatoid arthritis." },
    { symbol: "¹⁷¹Er", name: "Erbium-171",  massNumber: 171, neutrons: 103, abundance: "Synthetic", halfLife: "7.516 h",     spin: "5/2", binding: 8.152, radioactive: true,  decayMode: "β⁻", notes: "Short-lived neutron-rich erbium isotope." },
  ],
  69: [
    { symbol: "¹⁶⁹Tm", name: "Thulium-169",  massNumber: 169, neutrons: 100, abundance: "100%",      halfLife: "Stable",      spin: "1/2", binding: 8.152, radioactive: false, decayMode: null, notes: "Only stable thulium isotope." },
    { symbol: "¹⁶⁷Tm", name: "Thulium-167",  massNumber: 167, neutrons: 98,  abundance: "Synthetic", halfLife: "9.25 days",   spin: "1/2", binding: 8.149, radioactive: true,  decayMode: "ε",  notes: "SPECT radiotracer candidate." },
    { symbol: "¹⁶⁸Tm", name: "Thulium-168",  massNumber: 168, neutrons: 99,  abundance: "Synthetic", halfLife: "93.1 days",   spin: "3",   binding: 8.136, radioactive: true,  decayMode: "β⁺, ε", notes: "Used in gamma-ray sources." },
    { symbol: "¹⁷⁰Tm", name: "Thulium-170",  massNumber: 170, neutrons: 101, abundance: "Synthetic", halfLife: "128.6 days",  spin: "1",   binding: 8.139, radioactive: true,  decayMode: "β⁻", notes: "Used in portable X-ray devices and thickness gauges." },
    { symbol: "¹⁷¹Tm", name: "Thulium-171",  massNumber: 171, neutrons: 102, abundance: "Synthetic", halfLife: "1.92 years",  spin: "1/2", binding: 8.137, radioactive: true,  decayMode: "β⁻", notes: "Long-lived therapeutic radioisotope candidate." },
  ],
  70: [
    { symbol: "¹⁶⁸Yb", name: "Ytterbium-168", massNumber: 168, neutrons: 98,  abundance: "0.123%",   halfLife: "Stable",      spin: "0",   binding: 8.144, radioactive: false, decayMode: null, notes: "Lightest stable ytterbium isotope." },
    { symbol: "¹⁷⁰Yb", name: "Ytterbium-170", massNumber: 170, neutrons: 100, abundance: "2.982%",   halfLife: "Stable",      spin: "0",   binding: 8.143, radioactive: false, decayMode: null, notes: "Stable ytterbium isotope." },
    { symbol: "¹⁷¹Yb", name: "Ytterbium-171", massNumber: 171, neutrons: 101, abundance: "14.09%",   halfLife: "Stable",      spin: "1/2", binding: 8.136, radioactive: false, decayMode: null, notes: "Used in optical atomic clocks." },
    { symbol: "¹⁷²Yb", name: "Ytterbium-172", massNumber: 172, neutrons: 102, abundance: "21.68%",   halfLife: "Stable",      spin: "0",   binding: 8.136, radioactive: false, decayMode: null, notes: "Stable ytterbium isotope." },
    { symbol: "¹⁷³Yb", name: "Ytterbium-173", massNumber: 173, neutrons: 103, abundance: "16.10%",   halfLife: "Stable",      spin: "5/2", binding: 8.126, radioactive: false, decayMode: null, notes: "Stable ytterbium isotope." },
    { symbol: "¹⁷⁴Yb", name: "Ytterbium-174", massNumber: 174, neutrons: 104, abundance: "32.03%",   halfLife: "Stable",      spin: "0",   binding: 8.124, radioactive: false, decayMode: null, notes: "Most abundant ytterbium isotope." },
    { symbol: "¹⁷⁶Yb", name: "Ytterbium-176", massNumber: 176, neutrons: 106, abundance: "12.996%",  halfLife: "Stable",      spin: "0",   binding: 8.113, radioactive: false, decayMode: null, notes: "Heaviest stable ytterbium isotope." },
    { symbol: "¹⁶⁹Yb", name: "Ytterbium-169", massNumber: 169, neutrons: 99,  abundance: "Synthetic", halfLife: "32.018 days", spin: "7/2", binding: 8.124, radioactive: true,  decayMode: "ε",  notes: "Used in portable X-ray and gamma sources." },
    { symbol: "¹⁷⁵Yb", name: "Ytterbium-175", massNumber: 175, neutrons: 105, abundance: "Synthetic", halfLife: "4.185 days",  spin: "7/2", binding: 8.108, radioactive: true,  decayMode: "β⁻", notes: "Therapeutic radioisotope candidate." },
  ],
  71: [
    { symbol: "¹⁷⁵Lu", name: "Lutetium-175",  massNumber: 175, neutrons: 104, abundance: "97.401%",  halfLife: "Stable",      spin: "7/2", binding: 8.103, radioactive: false, decayMode: null, notes: "Most abundant lutetium isotope." },
    { symbol: "¹⁷⁶Lu", name: "Lutetium-176",  massNumber: 176, neutrons: 105, abundance: "2.599%",   halfLife: "3.76×10¹⁰ yr", spin: "7",  binding: 8.099, radioactive: true,  decayMode: "β⁻", notes: "Naturally radioactive. Used in Lu-Hf geochronology." },
    { symbol: "¹⁷⁷Lu", name: "Lutetium-177",  massNumber: 177, neutrons: 106, abundance: "Synthetic", halfLife: "6.6443 days", spin: "7/2", binding: 8.096, radioactive: true,  decayMode: "β⁻", notes: "Most important therapeutic radioisotope (¹⁷⁷Lu-DOTATATE, ¹⁷⁷Lu-PSMA)." },
    { symbol: "¹⁷⁷ᵐLu", name: "Lutetium-177m", massNumber: 177, neutrons: 106, abundance: "Synthetic", halfLife: "160.44 days", spin: "23/2", binding: 8.096, radioactive: true, decayMode: "β⁻, IT", notes: "Long-lived metastable state; studied in targeted therapy." },
    { symbol: "¹⁷³Lu", name: "Lutetium-173",  massNumber: 173, neutrons: 102, abundance: "Synthetic", halfLife: "1.37 years",  spin: "7/2", binding: 8.097, radioactive: true,  decayMode: "ε",  notes: "Longer-lived lutetium isotope." },
    { symbol: "¹⁷⁴Lu", name: "Lutetium-174",  massNumber: 174, neutrons: 103, abundance: "Synthetic", halfLife: "3.31 years",  spin: "1",   binding: 8.088, radioactive: true,  decayMode: "β⁺, ε", notes: "Used in activation analysis." },
  ],
  72: [
    { symbol: "¹⁷⁴Hf", name: "Hafnium-174", massNumber: 174, neutrons: 102, abundance: "0.16%",    halfLife: "2.0×10¹⁵ yr", spin: "0",   binding: 8.082, radioactive: true,  decayMode: "α",  notes: "Very long-lived alpha emitter." },
    { symbol: "¹⁷⁶Hf", name: "Hafnium-176", massNumber: 176, neutrons: 104, abundance: "5.26%",    halfLife: "Stable",       spin: "0",   binding: 8.090, radioactive: false, decayMode: null, notes: "Radiogenic daughter of ¹⁷⁶Lu. Used in Lu-Hf geochronology." },
    { symbol: "¹⁷⁷Hf", name: "Hafnium-177", massNumber: 177, neutrons: 105, abundance: "18.60%",   halfLife: "Stable",       spin: "7/2", binding: 8.083, radioactive: false, decayMode: null, notes: "Very high neutron capture cross section." },
    { symbol: "¹⁷⁸Hf", name: "Hafnium-178", massNumber: 178, neutrons: 106, abundance: "27.28%",   halfLife: "Stable",       spin: "0",   binding: 8.084, radioactive: false, decayMode: null, notes: "Most abundant hafnium isotope." },
    { symbol: "¹⁷⁹Hf", name: "Hafnium-179", massNumber: 179, neutrons: 107, abundance: "13.62%",   halfLife: "Stable",       spin: "9/2", binding: 8.073, radioactive: false, decayMode: null, notes: "Stable hafnium isotope." },
    { symbol: "¹⁸⁰Hf", name: "Hafnium-180", massNumber: 180, neutrons: 108, abundance: "35.08%",   halfLife: "Stable",       spin: "0",   binding: 8.073, radioactive: false, decayMode: null, notes: "Heaviest stable hafnium isotope." },
    { symbol: "¹⁷²Hf", name: "Hafnium-172", massNumber: 172, neutrons: 100, abundance: "Synthetic", halfLife: "1.87 years",   spin: "0",   binding: 8.062, radioactive: true,  decayMode: "ε",  notes: "Parent of ¹⁷²Lu. Used in PET imaging generator." },
    { symbol: "¹⁷⁵Hf", name: "Hafnium-175", massNumber: 175, neutrons: 103, abundance: "Synthetic", halfLife: "70 days",      spin: "5/2", binding: 8.065, radioactive: true,  decayMode: "ε",  notes: "Short-lived hafnium isotope." },
    { symbol: "¹⁸¹Hf", name: "Hafnium-181", massNumber: 181, neutrons: 109, abundance: "Synthetic", halfLife: "42.39 days",   spin: "1/2", binding: 8.055, radioactive: true,  decayMode: "β⁻", notes: "Neutron-rich hafnium isotope." },
    { symbol: "¹⁷⁸ᵐ²Hf", name: "Hafnium-178m2", massNumber: 178, neutrons: 106, abundance: "Synthetic", halfLife: "31 years", spin: "16",  binding: 8.084, radioactive: true,  decayMode: "IT", notes: "High-spin isomer; subject of controversy over gamma-ray induced energy release." },
  ],
  73: [
    { symbol: "¹⁸⁰ᵐTa", name: "Tantalum-180m", massNumber: 180, neutrons: 107, abundance: "0.01201%", halfLife: ">1.2×10¹⁵ yr", spin: "9",  binding: 8.056, radioactive: false, decayMode: null, notes: "Only naturally occurring nuclear isomer. Effectively stable in excited state." },
    { symbol: "¹⁸¹Ta", name: "Tantalum-181",   massNumber: 181, neutrons: 108, abundance: "99.98799%", halfLife: "Stable",       spin: "7/2", binding: 8.060, radioactive: false, decayMode: null, notes: "Most abundant tantalum isotope." },
    { symbol: "¹⁷⁹Ta", name: "Tantalum-179",   massNumber: 179, neutrons: 106, abundance: "Synthetic", halfLife: "1.82 years",  spin: "7/2", binding: 8.044, radioactive: true,  decayMode: "ε",  notes: "Longest-lived tantalum radioisotope after ¹⁸⁰ᵐTa." },
    { symbol: "¹⁸²Ta", name: "Tantalum-182",   massNumber: 182, neutrons: 109, abundance: "Synthetic", halfLife: "114.74 days", spin: "3",   binding: 8.044, radioactive: true,  decayMode: "β⁻", notes: "Used in industrial radiography and tracer studies." },
    { symbol: "¹⁸³Ta", name: "Tantalum-183",   massNumber: 183, neutrons: 110, abundance: "Synthetic", halfLife: "5.1 days",    spin: "7/2", binding: 8.041, radioactive: true,  decayMode: "β⁻", notes: "Short-lived neutron-rich tantalum isotope." },
  ],
  74: [
    { symbol: "¹⁸⁰W",  name: "Tungsten-180",  massNumber: 180, neutrons: 106, abundance: "0.12%",    halfLife: "1.8×10¹⁸ yr", spin: "0",   binding: 8.039, radioactive: true,  decayMode: "α",  notes: "Effectively stable alpha-emitting isotope." },
    { symbol: "¹⁸²W",  name: "Tungsten-182",  massNumber: 182, neutrons: 108, abundance: "26.50%",   halfLife: "Stable",       spin: "0",   binding: 8.043, radioactive: false, decayMode: null, notes: "Radiogenic daughter of ¹⁸²Hf. Used in Hf-W geochronology of planetary formation." },
    { symbol: "¹⁸³W",  name: "Tungsten-183",  massNumber: 183, neutrons: 109, abundance: "14.31%",   halfLife: "Stable",       spin: "1/2", binding: 8.034, radioactive: false, decayMode: null, notes: "Used in ¹⁸³W NMR spectroscopy." },
    { symbol: "¹⁸⁴W",  name: "Tungsten-184",  massNumber: 184, neutrons: 110, abundance: "30.64%",   halfLife: "Stable",       spin: "0",   binding: 8.033, radioactive: false, decayMode: null, notes: "Most abundant tungsten isotope." },
    { symbol: "¹⁸⁶W",  name: "Tungsten-186",  massNumber: 186, neutrons: 112, abundance: "28.43%",   halfLife: "Stable",       spin: "0",   binding: 8.024, radioactive: false, decayMode: null, notes: "Heaviest stable tungsten isotope." },
    { symbol: "¹⁸¹W",  name: "Tungsten-181",  massNumber: 181, neutrons: 107, abundance: "Synthetic", halfLife: "121.2 days",   spin: "9/2", binding: 8.028, radioactive: true,  decayMode: "ε",  notes: "Used in some calibration studies." },
    { symbol: "¹⁸⁵W",  name: "Tungsten-185",  massNumber: 185, neutrons: 111, abundance: "Synthetic", halfLife: "75.1 days",    spin: "3/2", binding: 8.020, radioactive: true,  decayMode: "β⁻", notes: "Produced by neutron activation; used in tracer studies." },
    { symbol: "¹⁸⁷W",  name: "Tungsten-187",  massNumber: 187, neutrons: 113, abundance: "Synthetic", halfLife: "23.72 h",      spin: "3/2", binding: 8.009, radioactive: true,  decayMode: "β⁻", notes: "Short-lived neutron-rich tungsten isotope." },
    { symbol: "¹⁸⁸W",  name: "Tungsten-188",  massNumber: 188, neutrons: 114, abundance: "Synthetic", halfLife: "69.78 days",   spin: "0",   binding: 8.007, radioactive: true,  decayMode: "β⁻", notes: "Parent of ¹⁸⁸Re. Used in ¹⁸⁸W/¹⁸⁸Re generator for cancer therapy." },
  ],
  75: [
    { symbol: "¹⁸⁵Re", name: "Rhenium-185",  massNumber: 185, neutrons: 110, abundance: "37.40%",   halfLife: "Stable",       spin: "5/2", binding: 8.016, radioactive: false, decayMode: null, notes: "Less abundant stable rhenium isotope." },
    { symbol: "¹⁸⁷Re", name: "Rhenium-187",  massNumber: 187, neutrons: 112, abundance: "62.60%",   halfLife: "4.12×10¹⁰ yr", spin: "5/2", binding: 8.013, radioactive: true,  decayMode: "β⁻", notes: "Naturally radioactive. Used in Re-Os geochronology." },
    { symbol: "¹⁸⁶Re", name: "Rhenium-186",  massNumber: 186, neutrons: 111, abundance: "Synthetic", halfLife: "3.7183 days",  spin: "1",   binding: 8.001, radioactive: true,  decayMode: "β⁻, ε", notes: "Used in treatment of bone metastases and synovectomy." },
    { symbol: "¹⁸⁸Re", name: "Rhenium-188",  massNumber: 188, neutrons: 113, abundance: "Synthetic", halfLife: "16.98 h",      spin: "1",   binding: 7.990, radioactive: true,  decayMode: "β⁻", notes: "Daughter of ¹⁸⁸W. Used in targeted cancer radiotherapy." },
    { symbol: "¹⁸⁴Re", name: "Rhenium-184",  massNumber: 184, neutrons: 109, abundance: "Synthetic", halfLife: "169.9 days",   spin: "3",   binding: 8.001, radioactive: true,  decayMode: "ε",  notes: "Long-lived rhenium isotope." },
    { symbol: "¹⁸³Re", name: "Rhenium-183",  massNumber: 183, neutrons: 108, abundance: "Synthetic", halfLife: "70.0 days",    spin: "5/2", binding: 8.003, radioactive: true,  decayMode: "ε",  notes: "Used in tracer experiments." },
  ],
  76: [
    { symbol: "¹⁸⁴Os", name: "Osmium-184",  massNumber: 184, neutrons: 108, abundance: "0.02%",    halfLife: "Stable",       spin: "0",   binding: 7.993, radioactive: false, decayMode: null, notes: "Lightest stable osmium isotope." },
    { symbol: "¹⁸⁶Os", name: "Osmium-186",  massNumber: 186, neutrons: 110, abundance: "1.59%",    halfLife: "2.0×10¹⁵ yr", spin: "0",   binding: 8.001, radioactive: true,  decayMode: "α",  notes: "Radiogenic daughter of ¹⁸⁶Re. Used in Re-Os geochronology." },
    { symbol: "¹⁸⁷Os", name: "Osmium-187",  massNumber: 187, neutrons: 111, abundance: "1.96%",    halfLife: "Stable",       spin: "1/2", binding: 7.993, radioactive: false, decayMode: null, notes: "Radiogenic daughter of ¹⁸⁷Re. Key isotope in Re-Os dating." },
    { symbol: "¹⁸⁸Os", name: "Osmium-188",  massNumber: 188, neutrons: 112, abundance: "13.24%",   halfLife: "Stable",       spin: "0",   binding: 7.997, radioactive: false, decayMode: null, notes: "Stable osmium isotope." },
    { symbol: "¹⁸⁹Os", name: "Osmium-189",  massNumber: 189, neutrons: 113, abundance: "16.15%",   halfLife: "Stable",       spin: "3/2", binding: 7.987, radioactive: false, decayMode: null, notes: "Most abundant odd-A osmium isotope." },
    { symbol: "¹⁹⁰Os", name: "Osmium-190",  massNumber: 190, neutrons: 114, abundance: "26.26%",   halfLife: "Stable",       spin: "0",   binding: 7.985, radioactive: false, decayMode: null, notes: "Stable osmium isotope." },
    { symbol: "¹⁹²Os", name: "Osmium-192",  massNumber: 192, neutrons: 116, abundance: "40.78%",   halfLife: "Stable",       spin: "0",   binding: 7.976, radioactive: false, decayMode: null, notes: "Most abundant osmium isotope. Parent of ¹⁹¹Ir (gamma source)." },
    { symbol: "¹⁸⁵Os", name: "Osmium-185",  massNumber: 185, neutrons: 109, abundance: "Synthetic", halfLife: "93.6 days",    spin: "1/2", binding: 7.978, radioactive: true,  decayMode: "ε",  notes: "Proton-rich osmium isotope." },
    { symbol: "¹⁹¹Os", name: "Osmium-191",  massNumber: 191, neutrons: 115, abundance: "Synthetic", halfLife: "15.4 days",    spin: "9/2", binding: 7.968, radioactive: true,  decayMode: "β⁻", notes: "Parent of ¹⁹¹Ir in generator systems." },
    { symbol: "¹⁹³Os", name: "Osmium-193",  massNumber: 193, neutrons: 117, abundance: "Synthetic", halfLife: "30.11 h",      spin: "3/2", binding: 7.956, radioactive: true,  decayMode: "β⁻", notes: "Short-lived neutron-rich osmium isotope." },
  ],
  77: [
    { symbol: "¹⁹¹Ir", name: "Iridium-191", massNumber: 191, neutrons: 114, abundance: "37.3%",    halfLife: "Stable",      spin: "3/2", binding: 7.955, radioactive: false, decayMode: null, notes: "Less abundant stable iridium isotope." },
    { symbol: "¹⁹³Ir", name: "Iridium-193", massNumber: 193, neutrons: 116, abundance: "62.7%",    halfLife: "Stable",      spin: "3/2", binding: 7.952, radioactive: false, decayMode: null, notes: "More abundant stable iridium isotope." },
    { symbol: "¹⁹²Ir", name: "Iridium-192", massNumber: 192, neutrons: 115, abundance: "Synthetic", halfLife: "73.83 days",  spin: "4",   binding: 7.942, radioactive: true,  decayMode: "β⁻, ε", notes: "Most widely used gamma source for industrial radiography and brachytherapy." },
    { symbol: "¹⁹⁰Ir", name: "Iridium-190", massNumber: 190, neutrons: 113, abundance: "Synthetic", halfLife: "11.78 days",  spin: "4",   binding: 7.943, radioactive: true,  decayMode: "β⁺, ε", notes: "Proton-rich iridium isotope." },
    { symbol: "¹⁸⁹Ir", name: "Iridium-189", massNumber: 189, neutrons: 112, abundance: "Synthetic", halfLife: "13.2 days",   spin: "3/2", binding: 7.942, radioactive: true,  decayMode: "ε",  notes: "Short-lived proton-rich iridium." },
    { symbol: "¹⁹⁴Ir", name: "Iridium-194", massNumber: 194, neutrons: 117, abundance: "Synthetic", halfLife: "19.28 h",     spin: "1",   binding: 7.934, radioactive: true,  decayMode: "β⁻", notes: "Therapeutic radioisotope candidate." },
  ],
  78: [
    { symbol: "¹⁹⁰Pt", name: "Platinum-190", massNumber: 190, neutrons: 112, abundance: "0.012%",   halfLife: "6.5×10¹¹ yr", spin: "0",   binding: 7.940, radioactive: true,  decayMode: "α",  notes: "Very long-lived alpha-emitting platinum isotope." },
    { symbol: "¹⁹²Pt", name: "Platinum-192", massNumber: 192, neutrons: 114, abundance: "0.782%",   halfLife: "Stable",       spin: "0",   binding: 7.943, radioactive: false, decayMode: null, notes: "Stable platinum isotope." },
    { symbol: "¹⁹⁴Pt", name: "Platinum-194", massNumber: 194, neutrons: 116, abundance: "32.86%",   halfLife: "Stable",       spin: "0",   binding: 7.940, radioactive: false, decayMode: null, notes: "Most abundant platinum isotope." },
    { symbol: "¹⁹⁵Pt", name: "Platinum-195", massNumber: 195, neutrons: 117, abundance: "33.78%",   halfLife: "Stable",       spin: "1/2", binding: 7.930, radioactive: false, decayMode: null, notes: "Used in ¹⁹⁵Pt NMR spectroscopy to study platinum cancer drugs." },
    { symbol: "¹⁹⁶Pt", name: "Platinum-196", massNumber: 196, neutrons: 118, abundance: "25.21%",   halfLife: "Stable",       spin: "0",   binding: 7.927, radioactive: false, decayMode: null, notes: "Stable platinum isotope." },
    { symbol: "¹⁹⁸Pt", name: "Platinum-198", massNumber: 198, neutrons: 120, abundance: "7.356%",   halfLife: "Stable",       spin: "0",   binding: 7.914, radioactive: false, decayMode: null, notes: "Heaviest stable platinum isotope." },
    { symbol: "¹⁹¹Pt", name: "Platinum-191", massNumber: 191, neutrons: 113, abundance: "Synthetic", halfLife: "2.802 days",   spin: "3/2", binding: 7.921, radioactive: true,  decayMode: "ε",  notes: "Proton-rich; used in platinum radiotracer studies." },
    { symbol: "¹⁹³Pt", name: "Platinum-193", massNumber: 193, neutrons: 115, abundance: "Synthetic", halfLife: "50 years",     spin: "1/2", binding: 7.926, radioactive: true,  decayMode: "ε",  notes: "Long-lived; produced by neutron irradiation." },
    { symbol: "¹⁹⁷Pt", name: "Platinum-197", massNumber: 197, neutrons: 119, abundance: "Synthetic", halfLife: "19.8915 h",    spin: "1/2", binding: 7.909, radioactive: true,  decayMode: "β⁻", notes: "Used in radiochemical studies of platinum-based drugs." },
  ],
  79: [
    { symbol: "¹⁹⁷Au", name: "Gold-197",  massNumber: 197, neutrons: 118, abundance: "100%",      halfLife: "Stable",      spin: "3/2", binding: 7.916, radioactive: false, decayMode: null, notes: "Only stable gold isotope." },
    { symbol: "¹⁹⁵Au", name: "Gold-195",  massNumber: 195, neutrons: 116, abundance: "Synthetic", halfLife: "186.10 days", spin: "3/2", binding: 7.912, radioactive: true,  decayMode: "ε",  notes: "Used in cardiac function tests and gold colloid studies." },
    { symbol: "¹⁹⁶Au", name: "Gold-196",  massNumber: 196, neutrons: 117, abundance: "Synthetic", halfLife: "6.1669 days", spin: "2",   binding: 7.900, radioactive: true,  decayMode: "β⁻, ε", notes: "Used in radiotracer studies." },
    { symbol: "¹⁹⁸Au", name: "Gold-198",  massNumber: 198, neutrons: 119, abundance: "Synthetic", halfLife: "2.6947 days", spin: "2",   binding: 7.895, radioactive: true,  decayMode: "β⁻", notes: "Used in cancer therapy (colloidal gold) and nuclear medicine." },
    { symbol: "¹⁹⁹Au", name: "Gold-199",  massNumber: 199, neutrons: 120, abundance: "Synthetic", halfLife: "3.139 days",  spin: "3/2", binding: 7.891, radioactive: true,  decayMode: "β⁻", notes: "Candidate therapeutic radioisotope for cancer." },
    { symbol: "¹⁹⁴Au", name: "Gold-194",  massNumber: 194, neutrons: 115, abundance: "Synthetic", halfLife: "38.02 h",     spin: "1",   binding: 7.905, radioactive: true,  decayMode: "β⁺, ε", notes: "Short-lived gold isotope." },
  ],
  80: [
    { symbol: "¹⁹⁶Hg", name: "Mercury-196", massNumber: 196, neutrons: 116, abundance: "0.15%",    halfLife: "Stable",       spin: "0",   binding: 7.896, radioactive: false, decayMode: null, notes: "Lightest stable mercury isotope." },
    { symbol: "¹⁹⁸Hg", name: "Mercury-198", massNumber: 198, neutrons: 118, abundance: "10.04%",   halfLife: "Stable",       spin: "0",   binding: 7.893, radioactive: false, decayMode: null, notes: "Stable mercury isotope." },
    { symbol: "¹⁹⁹Hg", name: "Mercury-199", massNumber: 199, neutrons: 119, abundance: "16.94%",   halfLife: "Stable",       spin: "1/2", binding: 7.883, radioactive: false, decayMode: null, notes: "Used in ¹⁹⁹Hg NMR spectroscopy." },
    { symbol: "²⁰⁰Hg", name: "Mercury-200", massNumber: 200, neutrons: 120, abundance: "23.14%",   halfLife: "Stable",       spin: "0",   binding: 7.884, radioactive: false, decayMode: null, notes: "Stable mercury isotope." },
    { symbol: "²⁰¹Hg", name: "Mercury-201", massNumber: 201, neutrons: 121, abundance: "13.17%",   halfLife: "Stable",       spin: "3/2", binding: 7.873, radioactive: false, decayMode: null, notes: "Stable mercury isotope." },
    { symbol: "²⁰²Hg", name: "Mercury-202", massNumber: 202, neutrons: 122, abundance: "29.74%",   halfLife: "Stable",       spin: "0",   binding: 7.867, radioactive: false, decayMode: null, notes: "Most abundant mercury isotope." },
    { symbol: "²⁰⁴Hg", name: "Mercury-204", massNumber: 204, neutrons: 124, abundance: "6.82%",    halfLife: "Stable",       spin: "0",   binding: 7.849, radioactive: false, decayMode: null, notes: "Heaviest stable mercury isotope." },
    { symbol: "¹⁹⁷Hg", name: "Mercury-197", massNumber: 197, neutrons: 117, abundance: "Synthetic", halfLife: "64.14 h",      spin: "1/2", binding: 7.874, radioactive: true,  decayMode: "ε",  notes: "Used in SPECT renal imaging." },
    { symbol: "²⁰³Hg", name: "Mercury-203", massNumber: 203, neutrons: 123, abundance: "Synthetic", halfLife: "46.612 days",  spin: "5/2", binding: 7.842, radioactive: true,  decayMode: "β⁻", notes: "Used in radiolabelled diuretics for kidney function studies." },
    { symbol: "¹⁹⁴Hg", name: "Mercury-194", massNumber: 194, neutrons: 114, abundance: "Synthetic", halfLife: "444 years",    spin: "0",   binding: 7.868, radioactive: true,  decayMode: "ε",  notes: "Long-lived; used in optical frequency standards." },
  ],
  81: [
    { symbol: "²⁰³Tl", name: "Thallium-203", massNumber: 203, neutrons: 122, abundance: "29.524%",  halfLife: "Stable",       spin: "1/2", binding: 7.845, radioactive: false, decayMode: null, notes: "Less abundant stable thallium isotope." },
    { symbol: "²⁰⁵Tl", name: "Thallium-205", massNumber: 205, neutrons: 124, abundance: "70.476%",  halfLife: "Stable",       spin: "1/2", binding: 7.834, radioactive: false, decayMode: null, notes: "Most abundant thallium isotope." },
    { symbol: "²⁰¹Tl", name: "Thallium-201", massNumber: 201, neutrons: 120, abundance: "Synthetic", halfLife: "72.912 h",     spin: "1/2", binding: 7.851, radioactive: true,  decayMode: "ε",  notes: "Standard SPECT myocardial perfusion imaging agent for >40 years." },
    { symbol: "²⁰²Tl", name: "Thallium-202", massNumber: 202, neutrons: 121, abundance: "Synthetic", halfLife: "12.31 days",   spin: "2",   binding: 7.842, radioactive: true,  decayMode: "ε",  notes: "Produced by cyclotron. Used in some nuclear medicine studies." },
    { symbol: "²⁰⁴Tl", name: "Thallium-204", massNumber: 204, neutrons: 123, abundance: "Synthetic", halfLife: "3.78 years",   spin: "2",   binding: 7.826, radioactive: true,  decayMode: "β⁻, ε", notes: "Used in beta-radiation thickness gauges." },
    { symbol: "²⁰⁶Tl", name: "Thallium-206", massNumber: 206, neutrons: 125, abundance: "Trace",     halfLife: "4.202 min",    spin: "0",   binding: 7.818, radioactive: true,  decayMode: "β⁻", notes: "Member of uranium-238 decay chain." },
    { symbol: "²⁰⁸Tl", name: "Thallium-208", massNumber: 208, neutrons: 127, abundance: "Trace",     halfLife: "3.053 min",    spin: "5",   binding: 7.807, radioactive: true,  decayMode: "β⁻", notes: "Energetic beta/gamma emitter in thorium-232 decay chain." },
  ],
  82: [
    { symbol: "²⁰⁴Pb", name: "Lead-204",  massNumber: 204, neutrons: 122, abundance: "1.4%",     halfLife: "Stable",        spin: "0",   binding: 7.836, radioactive: false, decayMode: null, notes: "Lightest stable lead isotope. Not radiogenic." },
    { symbol: "²⁰⁶Pb", name: "Lead-206",  massNumber: 206, neutrons: 124, abundance: "24.1%",    halfLife: "Stable",        spin: "0",   binding: 7.875, radioactive: false, decayMode: null, notes: "Stable end-product of uranium-238 decay chain. Magic neutron number." },
    { symbol: "²⁰⁷Pb", name: "Lead-207",  massNumber: 207, neutrons: 125, abundance: "22.1%",    halfLife: "Stable",        spin: "1/2", binding: 7.870, radioactive: false, decayMode: null, notes: "Stable end-product of uranium-235 decay chain." },
    { symbol: "²⁰⁸Pb", name: "Lead-208",  massNumber: 208, neutrons: 126, abundance: "52.4%",    halfLife: "Stable",        spin: "0",   binding: 7.868, radioactive: false, decayMode: null, notes: "Doubly magic. Stable end-product of thorium-232 chain. Most abundant lead isotope." },
    { symbol: "²¹⁰Pb", name: "Lead-210",  massNumber: 210, neutrons: 128, abundance: "Trace",    halfLife: "22.3 years",    spin: "0",   binding: 7.834, radioactive: true,  decayMode: "β⁻", notes: "Member of uranium decay chain. Used in dating of ice cores and marine sediments." },
    { symbol: "²¹²Pb", name: "Lead-212",  massNumber: 212, neutrons: 130, abundance: "Trace",    halfLife: "10.622 h",      spin: "0",   binding: 7.833, radioactive: true,  decayMode: "β⁻", notes: "In thorium chain. Used as generator for ²¹²Bi targeted therapy." },
    { symbol: "²¹⁴Pb", name: "Lead-214",  massNumber: 214, neutrons: 132, abundance: "Trace",    halfLife: "26.916 min",    spin: "0",   binding: 7.829, radioactive: true,  decayMode: "β⁻", notes: "In uranium-238 chain. Used as radon progeny indicator." },
    { symbol: "²⁰³Pb", name: "Lead-203",  massNumber: 203, neutrons: 121, abundance: "Synthetic", halfLife: "51.873 h",     spin: "5/2", binding: 7.821, radioactive: true,  decayMode: "ε",  notes: "Useful SPECT radiotracer for lead-protein targeting." },
    { symbol: "²⁰⁵Pb", name: "Lead-205",  massNumber: 205, neutrons: 123, abundance: "Trace",    halfLife: "15.3 Myr",      spin: "5/2", binding: 7.847, radioactive: true,  decayMode: "ε",  notes: "Long-lived; produced by cosmic ray spallation." },
  ],
  83: [
    { symbol: "²⁰⁹Bi", name: "Bismuth-209",  massNumber: 209, neutrons: 126, abundance: "100%",      halfLife: "2.01×10¹⁹ yr", spin: "9/2", binding: 7.848, radioactive: true,  decayMode: "α",  notes: "Formerly considered stable; alpha decay discovered 2003. Effectively stable." },
    { symbol: "²⁰⁷Bi", name: "Bismuth-207",  massNumber: 207, neutrons: 124, abundance: "Synthetic", halfLife: "31.55 years",  spin: "9/2", binding: 7.849, radioactive: true,  decayMode: "ε",  notes: "Standard gamma-ray calibration source." },
    { symbol: "²⁰⁸Bi", name: "Bismuth-208",  massNumber: 208, neutrons: 125, abundance: "Synthetic", halfLife: "3.68×10⁵ yr", spin: "5",   binding: 7.837, radioactive: true,  decayMode: "ε",  notes: "Very long-lived; used in nuclear spectroscopy." },
    { symbol: "²¹²Bi", name: "Bismuth-212",  massNumber: 212, neutrons: 129, abundance: "Trace",     halfLife: "60.55 min",    spin: "1",   binding: 7.823, radioactive: true,  decayMode: "α, β⁻", notes: "In thorium chain. Used in targeted alpha therapy for cancer." },
    { symbol: "²¹³Bi", name: "Bismuth-213",  massNumber: 213, neutrons: 130, abundance: "Trace",     halfLife: "45.59 min",    spin: "9/2", binding: 7.816, radioactive: true,  decayMode: "β⁻, α", notes: "Used in clinical targeted alpha therapy trials." },
    { symbol: "²¹⁴Bi", name: "Bismuth-214",  massNumber: 214, neutrons: 131, abundance: "Trace",     halfLife: "19.7 min",     spin: "1",   binding: 7.808, radioactive: true,  decayMode: "β⁻, α", notes: "Uranium chain member. Used in environmental radon monitoring." },
    { symbol: "²¹⁰Bi", name: "Bismuth-210",  massNumber: 210, neutrons: 127, abundance: "Trace",     halfLife: "5.012 days",   spin: "1",   binding: 7.831, radioactive: true,  decayMode: "β⁻, α", notes: "In uranium-238 decay chain." },
  ],
  84: [
    { symbol: "²⁰⁹Po", name: "Polonium-209",  massNumber: 209, neutrons: 125, abundance: "Synthetic", halfLife: "125.2 years",  spin: "1/2", binding: 7.834, radioactive: true, decayMode: "α",  notes: "Most stable polonium isotope. No stable isotopes of polonium exist." },
    { symbol: "²¹⁰Po", name: "Polonium-210",  massNumber: 210, neutrons: 126, abundance: "Trace",     halfLife: "138.376 days", spin: "0",   binding: 7.834, radioactive: true, decayMode: "α",  notes: "Discovered by Marie Curie. Used as heat source and radiation source. Used to poison Alexander Litvinenko." },
    { symbol: "²⁰⁸Po", name: "Polonium-208",  massNumber: 208, neutrons: 124, abundance: "Synthetic", halfLife: "2.898 years",  spin: "0",   binding: 7.827, radioactive: true, decayMode: "α",  notes: "Second-most stable polonium isotope." },
    { symbol: "²¹²Po", name: "Polonium-212",  massNumber: 212, neutrons: 128, abundance: "Trace",     halfLife: "294.3 ns",     spin: "0",   binding: 7.832, radioactive: true, decayMode: "α",  notes: "Extremely short-lived member of thorium decay chain." },
    { symbol: "²¹⁴Po", name: "Polonium-214",  massNumber: 214, neutrons: 130, abundance: "Trace",     halfLife: "164.3 μs",     spin: "0",   binding: 7.833, radioactive: true, decayMode: "α",  notes: "Very short-lived member of uranium-238 chain." },
    { symbol: "²¹⁶Po", name: "Polonium-216",  massNumber: 216, neutrons: 132, abundance: "Trace",     halfLife: "0.145 s",      spin: "0",   binding: 7.835, radioactive: true, decayMode: "α",  notes: "Short-lived in thorium-232 decay chain." },
    { symbol: "²¹⁸Po", name: "Polonium-218",  massNumber: 218, neutrons: 134, abundance: "Trace",     halfLife: "3.04 min",     spin: "0",   binding: 7.829, radioactive: true, decayMode: "α",  notes: "First member of radon-222 decay series. Radon progeny." },
  ],
  85: [
    { symbol: "²¹⁰At", name: "Astatine-210",  massNumber: 210, neutrons: 125, abundance: "Synthetic", halfLife: "8.1 h",        spin: "5",   binding: 7.822, radioactive: true, decayMode: "α, ε", notes: "Most stable commonly produced astatine isotope." },
    { symbol: "²¹¹At", name: "Astatine-211",  massNumber: 211, neutrons: 126, abundance: "Synthetic", halfLife: "7.214 h",      spin: "9/2", binding: 7.827, radioactive: true, decayMode: "α, ε", notes: "Magic neutron number. Used in targeted alpha therapy for cancer." },
    { symbol: "²⁰⁹At", name: "Astatine-209",  massNumber: 209, neutrons: 124, abundance: "Synthetic", halfLife: "5.41 h",       spin: "9/2", binding: 7.807, radioactive: true, decayMode: "α, ε", notes: "Short-lived; studied for radiolabelling." },
    { symbol: "²¹³At", name: "Astatine-213",  massNumber: 213, neutrons: 128, abundance: "Trace",     halfLife: "125 ns",       spin: "9/2", binding: 7.810, radioactive: true, decayMode: "α",  notes: "Extremely short-lived astatine isotope." },
    { symbol: "²¹⁷At", name: "Astatine-217",  massNumber: 217, neutrons: 132, abundance: "Trace",     halfLife: "32.3 ms",      spin: "9/2", binding: 7.811, radioactive: true, decayMode: "α",  notes: "Short-lived; member of uranium-235 decay chain." },
    { symbol: "²¹⁸At", name: "Astatine-218",  massNumber: 218, neutrons: 133, abundance: "Trace",     halfLife: "1.5 s",        spin: "1",   binding: 7.804, radioactive: true, decayMode: "α",  notes: "Short-lived; member of uranium-238 natural chain." },
  ],
  86: [
    { symbol: "²²²Rn", name: "Radon-222",  massNumber: 222, neutrons: 136, abundance: "Trace",     halfLife: "3.8235 days",  spin: "0",   binding: 7.795, radioactive: true, decayMode: "α",  notes: "Most common naturally occurring radon isotope. Significant indoor radiation hazard." },
    { symbol: "²²⁰Rn", name: "Radon-220",  massNumber: 220, neutrons: 134, abundance: "Trace",     halfLife: "55.6 s",       spin: "0",   binding: 7.806, radioactive: true, decayMode: "α",  notes: "Thoron. Member of thorium-232 decay chain." },
    { symbol: "²¹⁹Rn", name: "Radon-219",  massNumber: 219, neutrons: 133, abundance: "Trace",     halfLife: "3.96 s",       spin: "5/2", binding: 7.800, radioactive: true, decayMode: "α",  notes: "Actinon. Member of uranium-235 decay chain." },
    { symbol: "²²¹Rn", name: "Radon-221",  massNumber: 221, neutrons: 135, abundance: "Synthetic", halfLife: "25 min",       spin: "7/2", binding: 7.791, radioactive: true, decayMode: "β⁻", notes: "Synthetic radon isotope." },
    { symbol: "²¹¹Rn", name: "Radon-211",  massNumber: 211, neutrons: 125, abundance: "Synthetic", halfLife: "14.6 h",       spin: "1/2", binding: 7.816, radioactive: true, decayMode: "α, ε", notes: "Longest-lived synthetic radon isotope." },
    { symbol: "²¹⁸Rn", name: "Radon-218",  massNumber: 218, neutrons: 132, abundance: "Trace",     halfLife: "33.75 ms",     spin: "0",   binding: 7.820, radioactive: true, decayMode: "α",  notes: "Very short-lived; member of uranium-238 chain." },
  ],
  87: [
    { symbol: "²²³Fr", name: "Francium-223",  massNumber: 223, neutrons: 136, abundance: "Trace",     halfLife: "22.00 min",    spin: "3/2", binding: 7.779, radioactive: true, decayMode: "β⁻, α", notes: "Most stable francium isotope. Longest-lived naturally occurring fr. Found in decay chain." },
    { symbol: "²²¹Fr", name: "Francium-221",  massNumber: 221, neutrons: 134, abundance: "Trace",     halfLife: "4.9 min",      spin: "5/2", binding: 7.776, radioactive: true, decayMode: "α, β⁻", notes: "Member of neptunium-237 decay chain." },
    { symbol: "²²²Fr", name: "Francium-222",  massNumber: 222, neutrons: 135, abundance: "Synthetic", halfLife: "14.2 min",     spin: "2",   binding: 7.773, radioactive: true, decayMode: "β⁻", notes: "Short-lived synthetic francium isotope." },
    { symbol: "²¹⁰Fr", name: "Francium-210",  massNumber: 210, neutrons: 123, abundance: "Synthetic", halfLife: "3.18 min",     spin: "6",   binding: 7.778, radioactive: true, decayMode: "α, ε", notes: "Synthetic proton-rich francium." },
    { symbol: "²¹²Fr", name: "Francium-212",  massNumber: 212, neutrons: 125, abundance: "Synthetic", halfLife: "20.0 min",     spin: "5",   binding: 7.783, radioactive: true, decayMode: "α, β⁺", notes: "Used in atomic physics laser trapping experiments." },
  ],
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

function getIsotopes(element) {
  return ISOTOPE_DATA[element.number] || [
    { symbol: `${element.mass.toFixed(0)}${element.symbol}`, name: `${element.name}-${element.mass.toFixed(0)}`, massNumber: Math.round(element.mass), neutrons: Math.round(element.mass) - element.protons, abundance: "Primary", halfLife: "Stable", spin: "unknown", binding: null, radioactive: element.number >= 84, decayMode: element.number >= 84 ? "α" : null, notes: `Most abundant naturally occurring isotope of ${element.name}.` },
  ];
}

const CATEGORY_COLORS = {
  "alkali metal": { light: "#ff6b6b", dark: "#ff4444", label: "Alkali Metal" },
  "alkaline earth metal": { light: "#ffd93d", dark: "#ffcc00", label: "Alkaline Earth" },
  "transition metal": { light: "#6bcb77", dark: "#4caf50", label: "Transition Metal" },
  "post-transition metal": { light: "#4d96ff", dark: "#2979ff", label: "Post-Transition" },
  "metalloid": { light: "#ff9f1c", dark: "#ff8c00", label: "Metalloid" },
  "nonmetal": { light: "#c77dff", dark: "#9c40ff", label: "Nonmetal" },
  "halogen": { light: "#00b4d8", dark: "#0096c7", label: "Halogen" },
  "noble gas": { light: "#ff6392", dark: "#e91e63", label: "Noble Gas" },
  "lanthanide": { light: "#70e000", dark: "#4caf00", label: "Lanthanide" },
  "actinide": { light: "#f72585", dark: "#c2185b", label: "Actinide" },
};

const GROUPS_FILTER = [
  { id: "all", label: "All Elements" },
  { id: "alkali metal", label: "Alkali Metals" },
  { id: "alkaline earth metal", label: "Alkaline Earth" },
  { id: "transition metal", label: "Transition Metals" },
  { id: "post-transition metal", label: "Post-Transition" },
  { id: "metalloid", label: "Metalloids" },
  { id: "nonmetal", label: "Nonmetals" },
  { id: "halogen", label: "Halogens" },
  { id: "noble gas", label: "Noble Gases" },
  { id: "lanthanide", label: "Lanthanides" },
  { id: "actinide", label: "Actinides" },
];

// ─── 3D Isotope Nucleus Visualizer ─────────────────────────────────────────
function IsotopeNucleus3D({ isotope, element, dark, autoRotate }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);
  const rotRef = useRef({ x: 0.4, y: 0 });
  const dragRef = useRef({ dragging: false, lastX: 0, lastY: 0 });
  const catColor = CATEGORY_COLORS[element.category];
  const protonColor = catColor ? catColor.light : "#ff6b6b";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const protons = element.protons;
    const neutrons = isotope.neutrons;
    const total = protons + neutrons;

    // Generate nucleon positions in 3D sphere
    const nucleons = [];
    const r0 = 1.2; // fm
    const nucR = Math.min(50, r0 * Math.cbrt(total) * 8 + 10);
    for (let i = 0; i < total; i++) {
      const isProton = i < protons;
      // Fibonacci sphere distribution
      const phi = Math.acos(1 - (2 * (i + 0.5)) / total);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = (nucR * 0.5) * Math.cbrt(Math.random() * 0.6 + 0.4);
      nucleons.push({
        x: r * Math.sin(phi) * Math.cos(theta) + (Math.random() - 0.5) * 3,
        y: r * Math.sin(phi) * Math.sin(theta) + (Math.random() - 0.5) * 3,
        z: r * Math.cos(phi) + (Math.random() - 0.5) * 3,
        isProton,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const onDown = (e) => { dragRef.current = { dragging: true, lastX: e.clientX || e.touches[0].clientX, lastY: e.clientY || e.touches[0].clientY }; };
    const onMove = (e) => {
      if (!dragRef.current.dragging) return;
      const x = e.clientX || (e.touches && e.touches[0].clientX);
      const y = e.clientY || (e.touches && e.touches[0].clientY);
      if (!x) return;
      rotRef.current.y += (x - dragRef.current.lastX) * 0.012;
      rotRef.current.x += (y - dragRef.current.lastY) * 0.012;
      dragRef.current.lastX = x; dragRef.current.lastY = y;
    };
    const onUp = () => { dragRef.current.dragging = false; };
    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    canvas.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);

    function project(x, y, z, rx, ry) {
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const y1 = y * cosX - z * sinX, z1 = y * sinX + z * cosX;
      const x1 = x * cosY + z1 * sinY, z2 = -x * sinY + z1 * cosY;
      const fov = 350;
      const scale = fov / (fov + z2 + 80);
      return { sx: cx + x1 * scale, sy: cy + y1 * scale, scale, z: z2 };
    }

    function draw(t) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = dark ? "#06060f" : "#f0f0f8";
      ctx.fillRect(0, 0, W, H);

      // Glow background
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, nucR * 2.5);
      bg.addColorStop(0, protonColor + "18"); bg.addColorStop(1, "transparent");
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

      if (autoRotate && !dragRef.current.dragging) {
        rotRef.current.y += 0.008;
      }
      const rx = rotRef.current.x, ry = rotRef.current.y;

      // Project and sort nucleons
      const projected = nucleons.map((n, i) => {
        const proj = project(n.x, n.y, n.z, rx, ry);
        return { ...n, ...proj, i };
      }).sort((a, b) => a.z - b.z);

      // Draw nucleus shell outline
      const shellGrad = ctx.createRadialGradient(cx - nucR * 0.3, cy - nucR * 0.3, 0, cx, cy, nucR * 0.95);
      shellGrad.addColorStop(0, protonColor + "08");
      shellGrad.addColorStop(0.7, protonColor + "04");
      shellGrad.addColorStop(1, protonColor + "12");
      ctx.beginPath(); ctx.arc(cx, cy, nucR * 0.9, 0, Math.PI * 2);
      ctx.fillStyle = shellGrad; ctx.fill();
      ctx.strokeStyle = protonColor + "20"; ctx.lineWidth = 1;
      ctx.stroke();

      // Draw nucleons
      projected.forEach(n => {
        const r = Math.max(3, 6 * n.scale);
        const pulse = Math.sin(t * 1.5 + n.pulse) * 0.15 + 1;
        const rr = r * pulse;
        const color = n.isProton ? protonColor : (dark ? "#aaaacc" : "#6666aa");
        const g = ctx.createRadialGradient(n.sx - rr * 0.35, n.sy - rr * 0.35, 0, n.sx, n.sy, rr * 1.4);
        g.addColorStop(0, "#ffffff");
        g.addColorStop(0.35, color);
        g.addColorStop(1, color + "44");
        ctx.beginPath(); ctx.arc(n.sx, n.sy, rr, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
      });

      // Legend
      ctx.font = "bold 10px monospace"; ctx.textAlign = "left";
      ctx.fillStyle = protonColor;
      ctx.beginPath(); ctx.arc(12, H - 22, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillText(`Proton ×${protons}`, 22, H - 18);
      ctx.fillStyle = dark ? "#aaaacc" : "#6666aa";
      ctx.beginPath(); ctx.arc(12, H - 7, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillText(`Neutron ×${neutrons}`, 22, H - 3);
      ctx.textAlign = "right"; ctx.fillStyle = dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)";
      ctx.font = "9px monospace";
      ctx.fillText("drag · rotate", W - 8, H - 6);
    }

    function loop() { timeRef.current += 0.016; draw(timeRef.current); animRef.current = requestAnimationFrame(loop); }
    loop();
    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("touchstart", onDown);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [isotope, element, dark, autoRotate]);

  return <canvas ref={canvasRef} width={260} height={220} style={{ width: "100%", maxWidth: 260, display: "block", margin: "0 auto", borderRadius: 10, cursor: "grab" }} />;
}

// ─── Isotope Explorer Modal ─────────────────────────────────────────────────
function IsotopeModal({ element, onClose, dark }) {
  const [selected, setSelected] = useState(0);
  const isotopes = getIsotopes(element);
  const iso = isotopes[selected];
  const catColor = CATEGORY_COLORS[element.category] || { light: "#6bcb77", dark: "#4caf50" };
  const accent = dark ? catColor.dark : catColor.light;

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 2000,
      background: dark ? "rgba(0,0,0,0.93)" : "rgba(0,0,30,0.7)",
      backdropFilter: "blur(18px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16, animation: "fadeIn 0.22s ease",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: 860, maxHeight: "92vh",
        background: dark ? "#08081a" : "#f6f6ff",
        borderRadius: 22, border: `1px solid ${accent}44`,
        display: "flex", flexDirection: "column", overflow: "hidden",
        animation: "slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: `0 0 100px ${accent}18, 0 40px 120px rgba(0,0,0,0.7)`,
      }}>
        {/* Header */}
        <div style={{
          padding: "18px 22px 14px",
          background: `linear-gradient(135deg, ${accent}1a 0%, transparent 70%)`,
          borderBottom: `1px solid ${accent}28`, flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: accent + "22", border: `2px solid ${accent}55`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: accent }}>{element.symbol}</span>
                <span style={{ fontSize: 8, opacity: 0.5 }}>{element.number}</span>
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: dark ? "#fff" : "#111" }}>
                  {element.name} Isotopes
                </h2>
                <div style={{ fontSize: 11, opacity: 0.45, marginTop: 3 }}>{isotopes.length} known isotope{isotopes.length !== 1 ? "s" : ""} · Atomic number {element.protons}</div>
              </div>
            </div>
            <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: "50%", background: dark ? "#ffffff15" : "#00000010", border: "none", cursor: "pointer", color: dark ? "#fff" : "#333", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>×</button>
          </div>
          {/* Isotope selector */}
          <div style={{ display: "flex", gap: 6, marginTop: 14, overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
            {isotopes.map((iso, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{
                padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700,
                border: `1px solid ${selected === i ? accent : (dark ? "#ffffff20" : "#00000018")}`,
                background: selected === i ? accent + "28" : "transparent",
                color: selected === i ? accent : (dark ? "#888" : "#666"),
                cursor: "pointer", whiteSpace: "nowrap",
                transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                transform: selected === i ? "scale(1.06)" : "scale(1)",
              }}>
                {iso.symbol}
                {iso.radioactive && <span style={{ marginLeft: 4, fontSize: 9, opacity: 0.7 }}>☢</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ overflowY: "auto", flex: 1, padding: "20px 22px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {/* 3D Nucleus */}
            <div>
              <div style={{ fontSize: 11, opacity: 0.45, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>3D Nucleus Model · {iso.name}</div>
              <div style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${accent}22` }}>
                <IsotopeNucleus3D isotope={iso} element={element} dark={dark} autoRotate={true} />
              </div>
              <div style={{ fontSize: 9, opacity: 0.3, textAlign: "center", marginTop: 5 }}>Protons & neutrons in nucleus · drag to rotate · illustrative</div>

              {/* Stability bar */}
              <div style={{ marginTop: 14, padding: 12, borderRadius: 12, background: dark ? "#ffffff07" : "#00000005", border: `1px solid ${accent}1a` }}>
                <div style={{ fontSize: 10, opacity: 0.45, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Nuclear Stability</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ flex: 1, height: 8, background: dark ? "#ffffff10" : "#00000010", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: 4,
                      width: iso.radioactive ? (iso.halfLife.includes("ms") ? "15%" : iso.halfLife.includes("s") ? "25%" : iso.halfLife.includes("min") ? "35%" : "50%") : "100%",
                      background: iso.radioactive ? `linear-gradient(90deg, #ff6b6b, #ffd93d)` : `linear-gradient(90deg, ${accent}, ${accent}88)`,
                      transition: "width 0.8s ease",
                    }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: iso.radioactive ? "#ff6b6b" : accent, minWidth: 60 }}>
                    {iso.radioactive ? "☢ Unstable" : "✓ Stable"}
                  </span>
                </div>
                {iso.radioactive && <div style={{ fontSize: 11, opacity: 0.6, marginTop: 6 }}>Half-life: <strong>{iso.halfLife}</strong></div>}
              </div>
            </div>

            {/* Details */}
            <div>
              {/* Key stats grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                {[
                  { label: "Mass Number", value: iso.massNumber, icon: "⚛" },
                  { label: "Neutrons", value: iso.neutrons, icon: "⬤" },
                  { label: "Protons", value: element.protons, icon: "+" },
                  { label: "Electrons", value: element.electrons, icon: "−" },
                  { label: "Natural Abundance", value: iso.abundance, icon: "%" },
                  { label: "Nuclear Spin", value: iso.spin, icon: "↻" },
                ].map(({ label, value, icon }) => (
                  <div key={label} style={{ padding: "10px 12px", borderRadius: 10, background: dark ? "#ffffff07" : "#00000005", border: `1px solid ${accent}18`, textAlign: "center" }}>
                    <div style={{ fontSize: 18, marginBottom: 2, opacity: 0.6 }}>{icon}</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: accent }}>{value}</div>
                    <div style={{ fontSize: 9, opacity: 0.4, marginTop: 2 }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Properties list */}
              <div style={{ padding: 14, borderRadius: 12, background: dark ? "#ffffff06" : "#00000004", border: `1px solid ${accent}18`, marginBottom: 12 }}>
                <div style={{ fontSize: 10, opacity: 0.4, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Isotope Properties</div>
                {[
                  ["Full Name", iso.name],
                  ["Symbol", iso.symbol],
                  ["Half-life", iso.halfLife],
                  ["Decay Mode", iso.decayMode || "Stable"],
                  ["Binding Energy/nucleon", iso.binding ? `${iso.binding} MeV` : "N/A"],
                  ["Classification", iso.radioactive ? "Radioactive" : "Stable"],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "5px 0", borderBottom: `1px solid ${dark ? "#ffffff07" : "#00000007"}` }}>
                    <span style={{ opacity: 0.55 }}>{k}</span>
                    <span style={{ fontWeight: 600, color: k === "Decay Mode" && v !== "Stable" ? "#ff6b6b" : "inherit" }}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Notes */}
              {iso.notes && (
                <div style={{ padding: 14, borderRadius: 12, background: accent + "10", border: `1px solid ${accent}28` }}>
                  <div style={{ fontSize: 10, opacity: 0.45, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Notes</div>
                  <div style={{ fontSize: 12, lineHeight: 1.7, opacity: 0.8 }}>{iso.notes}</div>
                </div>
              )}
            </div>
          </div>

          {/* All isotopes comparison table */}
          {isotopes.length > 1 && (
            <div style={{ marginTop: 20, padding: 16, borderRadius: 14, background: dark ? "#ffffff05" : "#00000004", border: `1px solid ${accent}18` }}>
              <div style={{ fontSize: 11, opacity: 0.4, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>All Isotopes Comparison</div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                  <thead>
                    <tr>
                      {["Symbol", "Name", "Neutrons", "Abundance", "Half-life", "Decay", "Stable"].map(h => (
                        <th key={h} style={{ textAlign: "left", padding: "6px 10px", opacity: 0.45, fontWeight: 600, borderBottom: `1px solid ${accent}22`, whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {isotopes.map((iso, i) => (
                      <tr key={i} onClick={() => setSelected(i)} style={{
                        cursor: "pointer",
                        background: selected === i ? accent + "15" : "transparent",
                        transition: "background 0.2s",
                      }}>
                        <td style={{ padding: "7px 10px", fontWeight: 700, color: accent }}>{iso.symbol}</td>
                        <td style={{ padding: "7px 10px", opacity: 0.7 }}>{iso.name}</td>
                        <td style={{ padding: "7px 10px" }}>{iso.neutrons}</td>
                        <td style={{ padding: "7px 10px", opacity: 0.7 }}>{iso.abundance}</td>
                        <td style={{ padding: "7px 10px" }}>{iso.halfLife}</td>
                        <td style={{ padding: "7px 10px", color: iso.decayMode ? "#ff6b6b" : "inherit" }}>{iso.decayMode || "—"}</td>
                        <td style={{ padding: "7px 10px" }}>{iso.radioactive ? "☢" : "✓"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Quiz Modal ─────────────────────────────────────────────────────────────
function QuizModal({ onClose, dark }) {
  const [quizEl, setQuizEl] = useState(null);
  const [questionType, setQuestionType] = useState(null);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [options, setOptions] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef(null);

  const QUESTION_TYPES = [
    { id: "symbol", q: (el) => `What is the chemical symbol for ${el.name}?`, a: (el) => el.symbol, type: "text", hint: (el) => `It's a ${el.category} in period ${el.period}` },
    { id: "name", q: (el) => `What element has the symbol "${el.symbol}"?`, a: (el) => el.name, type: "text", hint: (el) => `Atomic number ${el.number}, discovered in ${el.discovered}` },
    { id: "number", q: (el) => `What is the atomic number of ${el.name}?`, a: (el) => String(el.number), type: "text", hint: (el) => `It has ${el.protons} proton${el.protons !== 1 ? "s" : ""}` },
    { id: "category", q: (el) => `What category does ${el.name} belong to?`, a: (el) => el.category, type: "multi", hint: (el) => `Group ${el.group}, Period ${el.period}` },
    { id: "period", q: (el) => `Which period is ${el.name} in?`, a: (el) => String(el.period), type: "multi", hint: (el) => `It has ${el.shells?.length || el.period} electron shells` },
    { id: "phase", q: (el) => `What phase is ${el.name} at standard temperature and pressure?`, a: (el) => el.phase, type: "multi", hint: (el) => el.meltingPoint ? `Melting point: ${el.meltingPoint}°C` : "Extreme conditions required" },
    { id: "config", q: (el) => `What is the electron configuration of ${el.name}?`, a: (el) => el.electronConfig, type: "multi", hint: (el) => `${el.electrons} total electrons, valence: ${el.valence}` },
    { id: "discovery", q: (el) => `Who discovered ${el.name}?`, a: (el) => el.discoveredBy, type: "text", hint: (el) => `Discovered around ${el.discovered}` },
    { id: "mass", q: (el) => `What is the approximate atomic mass of ${el.name}? (round to nearest whole number)`, a: (el) => String(Math.round(el.mass)), type: "text", hint: (el) => `It's between ${Math.round(el.mass) - 5} and ${Math.round(el.mass) + 5}` },
    { id: "funfact", q: (el) => el.funFact ? `True or False: "${el.funFact.slice(0, 80)}..."` : `What is a notable property of ${el.name}?`, a: (el) => el.funFact ? "True" : el.category, type: el.funFact ? "multi" : "text", hint: (el) => `Think about ${el.name}'s unique properties` },
  ];

  const startNew = useCallback(() => {
    const el = ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)];
    const qt = QUESTION_TYPES[Math.floor(Math.random() * QUESTION_TYPES.length)];
    setQuizEl(el);
    setQuestionType(qt);
    setAnswer("");
    setResult(null);
    setShowHint(false);

    if (qt.type === "multi") {
      const correct = qt.a(el);
      let opts = [correct];
      // Generate wrong options
      if (qt.id === "category") {
        opts = [...new Set([correct, ...Object.keys(CATEGORY_COLORS).filter(c => c !== correct)].slice(0, 4))];
      } else if (qt.id === "period") {
        opts = [...new Set([correct, "1", "2", "3", "4", "5", "6", "7"].filter(p => p !== correct))].slice(0, 4);
      } else if (qt.id === "phase") {
        opts = ["Gas", "Liquid", "Solid"].filter((_, i) => i < 3);
      } else if (qt.id === "config") {
        const others = ELEMENTS.filter(e => e.number !== el.number).sort(() => Math.random() - 0.5).slice(0, 3).map(e => e.electronConfig);
        opts = [...new Set([correct, ...others])].slice(0, 4);
      } else if (qt.id === "funfact") {
        opts = ["True", "False"];
      }
      setOptions(opts.sort(() => Math.random() - 0.5));
    }
  }, []);

  useEffect(() => { startNew(); }, []);
  useEffect(() => { if (!result && inputRef.current) inputRef.current.focus(); }, [quizEl, result]);
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const check = (val) => {
    if (!quizEl || !questionType) return;
    const correct = questionType.a(quizEl).toLowerCase().trim();
    const attempt = (val || answer).toLowerCase().trim();
    const isCorrect = attempt === correct || attempt.replace(/[-\s]/g, "") === correct.replace(/[-\s]/g, "");
    setResult(isCorrect ? "correct" : "wrong");
    setScore(prev => ({ correct: prev.correct + (isCorrect ? 1 : 0), total: prev.total + 1 }));
  };

  const catColor = quizEl ? (CATEGORY_COLORS[quizEl.category] || {}) : {};
  const accent = dark ? (catColor.dark || "#a78bfa") : (catColor.light || "#7c3aed");
  const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 2000,
      background: dark ? "rgba(0,0,0,0.92)" : "rgba(0,0,30,0.68)",
      backdropFilter: "blur(16px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16, animation: "fadeIn 0.22s ease",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: 540,
        background: dark ? "#09091c" : "#f5f5ff",
        borderRadius: 22, border: `1px solid ${accent}44`,
        display: "flex", flexDirection: "column", overflow: "hidden",
        animation: "slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: `0 0 80px ${accent}18, 0 40px 100px rgba(0,0,0,0.6)`,
      }}>
        {/* Header */}
        <div style={{
          padding: "18px 22px 14px",
          background: `linear-gradient(135deg, ${accent}15 0%, transparent 60%)`,
          borderBottom: `1px solid ${accent}28`,
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 26 }}>🎓</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 18, color: dark ? "#fff" : "#111" }}>Element Quiz</div>
                <div style={{ fontSize: 11, opacity: 0.45 }}>Test your periodic table knowledge</div>
              </div>
            </div>
            <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: "50%", background: dark ? "#ffffff15" : "#00000010", border: "none", cursor: "pointer", color: dark ? "#fff" : "#333", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
          </div>
          {/* Score bar */}
          {score.total > 0 && (
            <div style={{ marginTop: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, opacity: 0.6, marginBottom: 5 }}>
                <span>{score.correct}/{score.total} correct</span>
                <span style={{ fontWeight: 700, color: pct >= 70 ? "#6bcb77" : pct >= 40 ? "#ffd93d" : "#ff6b6b" }}>{pct}%</span>
              </div>
              <div style={{ height: 5, background: dark ? "#ffffff10" : "#00000010", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: pct >= 70 ? "#6bcb77" : pct >= 40 ? "#ffd93d" : "#ff6b6b", borderRadius: 3, transition: "width 0.6s ease" }} />
              </div>
            </div>
          )}
        </div>

        {/* Question */}
        <div style={{ padding: "22px 22px 20px", flex: 1 }}>
          {quizEl && questionType && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              {/* Element badge */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                <div style={{ width: 64, height: 64, borderRadius: 14, background: accent + "22", border: `2px solid ${accent}55`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontSize: 8, opacity: 0.5 }}>{quizEl.number}</div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: accent, lineHeight: 1 }}>{quizEl.symbol}</div>
                  <div style={{ fontSize: 8, opacity: 0.4 }}>{quizEl.mass.toFixed(1)}</div>
                </div>
              </div>

              <div style={{ fontSize: 15, fontWeight: 600, textAlign: "center", lineHeight: 1.5, marginBottom: 18, opacity: 0.9 }}>
                {questionType.q(quizEl)}
              </div>

              {/* Answer input or options */}
              {questionType.type === "text" ? (
                <input
                  ref={inputRef}
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && !result && check()}
                  disabled={!!result}
                  placeholder="Type your answer…"
                  style={{
                    width: "100%", padding: "12px 16px", borderRadius: 12, fontSize: 15,
                    border: `1px solid ${result ? (result === "correct" ? "#6bcb77" : "#ff6b6b") : `${accent}44`}`,
                    background: dark ? "#ffffff0a" : "#00000008",
                    color: dark ? "#fff" : "#111",
                    outline: "none", transition: "border-color 0.2s",
                  }}
                />
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {options.map(opt => (
                    <button key={opt} onClick={() => !result && check(opt)} style={{
                      padding: "12px 14px", borderRadius: 12, fontSize: 12, fontWeight: 600,
                      cursor: result ? "default" : "pointer",
                      border: `1px solid ${result ? (opt.toLowerCase() === questionType.a(quizEl).toLowerCase() ? "#6bcb77" : (answer === opt && result === "wrong" ? "#ff6b6b" : `${accent}22`)) : `${accent}33`}`,
                      background: result ? (opt.toLowerCase() === questionType.a(quizEl).toLowerCase() ? "#6bcb7722" : (answer === opt && result === "wrong" ? "#ff6b6b22" : "transparent")) : (dark ? "#ffffff08" : "#00000006"),
                      color: result ? (opt.toLowerCase() === questionType.a(quizEl).toLowerCase() ? "#6bcb77" : "inherit") : "inherit",
                      transition: "all 0.2s",
                      transform: "scale(1)",
                    }}>{opt}</button>
                  ))}
                </div>
              )}

              {/* Result */}
              {result && (
                <div style={{ marginTop: 14, padding: 14, borderRadius: 12, background: result === "correct" ? "#6bcb7715" : "#ff6b6b15", border: `1px solid ${result === "correct" ? "#6bcb7755" : "#ff6b6b55"}`, animation: "slideUp 0.25s ease" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: result === "correct" ? "#6bcb77" : "#ff6b6b", marginBottom: 4 }}>
                    {result === "correct" ? "✅ Correct!" : `❌ The answer was: ${questionType.a(quizEl)}`}
                  </div>
                  <div style={{ fontSize: 11, opacity: 0.6 }}>{quizEl.description}</div>
                </div>
              )}

              {/* Hint */}
              {!result && (
                <div style={{ marginTop: 12, textAlign: "center" }}>
                  {!showHint ? (
                    <button onClick={() => setShowHint(true)} style={{ fontSize: 11, opacity: 0.4, background: "none", border: "none", cursor: "pointer", color: "inherit", textDecoration: "underline" }}>Show hint</button>
                  ) : (
                    <div style={{ fontSize: 11, opacity: 0.6, padding: "8px 14px", borderRadius: 8, background: dark ? "#ffffff07" : "#00000005" }}>💡 {questionType.hint(quizEl)}</div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer buttons */}
        <div style={{ padding: "12px 22px 18px", display: "flex", gap: 8, borderTop: `1px solid ${accent}18` }}>
          {!result ? (
            questionType?.type === "text" && (
              <button onClick={() => check()} style={{ flex: 1, padding: "11px", borderRadius: 12, fontWeight: 700, fontSize: 14, border: `1px solid ${accent}55`, background: accent + "22", color: accent, cursor: "pointer" }}>Check Answer</button>
            )
          ) : (
            <button onClick={startNew} style={{ flex: 1, padding: "11px", borderRadius: 12, fontWeight: 700, fontSize: 14, border: "1px solid #6bcb7755", background: "#6bcb7722", color: "#6bcb77", cursor: "pointer" }}>Next Question →</button>
          )}
          <button onClick={onClose} style={{ padding: "11px 18px", borderRadius: 12, fontWeight: 600, fontSize: 13, border: `1px solid ${dark ? "#ffffff15" : "#00000015"}`, background: "transparent", color: dark ? "#888" : "#666", cursor: "pointer" }}>Exit</button>
        </div>
      </div>
    </div>
  );
}

// ─── 2D Atomic Animation ────────────────────────────────────────────────────
function AtomicAnimation({ element, dark }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const shells = element.shells || [element.electrons];
    const baseRadius = Math.min(W, H) * 0.12;
    const shellGap = Math.min(W, H) * 0.1;
    const electronPositions = shells.map((count, i) => {
      const r = baseRadius + i * shellGap;
      return Array.from({ length: Math.min(count, 12) }, (_, j) => ({
        angle: (j / Math.min(count, 12)) * Math.PI * 2,
        speed: (0.3 + Math.random() * 0.4) * (i % 2 === 0 ? 1 : -1) / (i + 1),
        r,
      }));
    });
    const catColor = CATEGORY_COLORS[element.category];
    const glowColor = catColor ? catColor.light : "#6bcb77";
    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.5);
      bgGrad.addColorStop(0, dark ? "rgba(30,30,50,0.8)" : "rgba(240,240,255,0.8)");
      bgGrad.addColorStop(1, dark ? "rgba(10,10,20,0)" : "rgba(255,255,255,0)");
      ctx.fillStyle = bgGrad; ctx.fillRect(0, 0, W, H);
      electronPositions.forEach((shell, i) => {
        const r = baseRadius + i * shellGap;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = dark ? `rgba(255,255,255,0.12)` : `rgba(0,0,100,0.08)`;
        ctx.lineWidth = 1; ctx.setLineDash([4, 8]); ctx.stroke(); ctx.setLineDash([]);
      });
      const nucGrad = ctx.createRadialGradient(cx - 4, cy - 4, 0, cx, cy, baseRadius * 0.7);
      nucGrad.addColorStop(0, "#fff"); nucGrad.addColorStop(0.3, glowColor); nucGrad.addColorStop(1, dark ? "#1a1a3e" : "#4444cc");
      ctx.beginPath(); ctx.arc(cx, cy, baseRadius * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = nucGrad; ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.max(10, baseRadius * 0.5)}px monospace`;
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(element.symbol, cx, cy);
      electronPositions.forEach((shell, si) => {
        shell.forEach((e) => {
          const a = e.angle + t * e.speed;
          const ex = cx + Math.cos(a) * e.r, ey = cy + Math.sin(a) * e.r;
          const trailLen = 8;
          for (let tr = 0; tr < trailLen; tr++) {
            const ta = a - (tr * 0.15 * Math.sign(e.speed));
            const tx = cx + Math.cos(ta) * e.r, ty = cy + Math.sin(ta) * e.r;
            ctx.beginPath(); ctx.arc(tx, ty, 3 * (1 - tr / trailLen), 0, Math.PI * 2);
            ctx.fillStyle = glowColor + Math.floor((1 - tr / trailLen) * 60).toString(16).padStart(2, "0");
            ctx.fill();
          }
          const eGrad = ctx.createRadialGradient(ex - 1, ey - 1, 0, ex, ey, 5);
          eGrad.addColorStop(0, "#ffffff"); eGrad.addColorStop(0.4, glowColor); eGrad.addColorStop(1, glowColor + "00");
          ctx.beginPath(); ctx.arc(ex, ey, 5, 0, Math.PI * 2);
          ctx.fillStyle = eGrad; ctx.fill();
        });
      });
      ctx.fillStyle = dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
      ctx.font = "10px sans-serif"; ctx.textAlign = "center";
      ctx.fillText(`${element.protons}p  ${element.neutrons}n`, cx, cy + baseRadius * 0.72 + 12);
    }
    function loop() { timeRef.current += 0.016; draw(timeRef.current); animRef.current = requestAnimationFrame(loop); }
    loop();
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [element, dark]);
  return <canvas ref={canvasRef} width={280} height={280} style={{ width: "100%", maxWidth: "280px", display: "block", margin: "0 auto" }} />;
}

// ─── 3D Bohr Model ───────────────────────────────────────────────────────────
function Atom3D({ element, dark }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);
  const rotRef = useRef({ x: 0.3, y: 0 });
  const dragRef = useRef({ dragging: false, lastX: 0, lastY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const catColor = CATEGORY_COLORS[element.category];
    const glowColor = catColor ? catColor.light : "#6bcb77";
    const shells = element.shells || [element.electrons];

    const onMouseDown = (e) => { dragRef.current = { dragging: true, lastX: e.clientX, lastY: e.clientY }; };
    const onMouseMove = (e) => {
      if (!dragRef.current.dragging) return;
      rotRef.current.y += (e.clientX - dragRef.current.lastX) * 0.01;
      rotRef.current.x += (e.clientY - dragRef.current.lastY) * 0.01;
      dragRef.current.lastX = e.clientX; dragRef.current.lastY = e.clientY;
    };
    const onMouseUp = () => { dragRef.current.dragging = false; };
    const onTouchStart = (e) => { dragRef.current = { dragging: true, lastX: e.touches[0].clientX, lastY: e.touches[0].clientY }; };
    const onTouchMove = (e) => {
      if (!dragRef.current.dragging) return;
      rotRef.current.y += (e.touches[0].clientX - dragRef.current.lastX) * 0.01;
      rotRef.current.x += (e.touches[0].clientY - dragRef.current.lastY) * 0.01;
      dragRef.current.lastX = e.touches[0].clientX; dragRef.current.lastY = e.touches[0].clientY;
    };
    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onMouseUp);

    function project3D(x, y, z, rx, ry) {
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const y1 = y * cosX - z * sinX, z1 = y * sinX + z * cosX;
      const x1 = x * cosY + z1 * sinY, z2 = -x * sinY + z1 * cosY;
      const fov = 400, scale = fov / (fov + z2 + 50);
      return { sx: cx + x1 * scale, sy: cy + y1 * scale, scale, z: z2 };
    }

    function drawOrbit(ctx, rx, ry, orbitRadius, tiltX) {
      const steps = 64;
      ctx.beginPath();
      let first = true;
      for (let i = 0; i <= steps; i++) {
        const angle = (i / steps) * Math.PI * 2;
        const x3d = Math.cos(angle) * orbitRadius;
        const y3d = Math.sin(angle) * orbitRadius * Math.cos(tiltX);
        const z3d = Math.sin(angle) * orbitRadius * Math.sin(tiltX);
        const { sx, sy } = project3D(x3d, y3d, z3d, rx, ry);
        if (first) { ctx.moveTo(sx, sy); first = false; } else ctx.lineTo(sx, sy);
      }
      ctx.strokeStyle = dark ? `rgba(255,255,255,0.18)` : `rgba(0,0,100,0.15)`;
      ctx.lineWidth = 0.8; ctx.setLineDash([3, 6]); ctx.stroke(); ctx.setLineDash([]);
    }

    function draw(t) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = dark ? "#08081a" : "#e8e8f8"; ctx.fillRect(0, 0, W, H);
      if (dark) {
        for (let i = 0; i < 40; i++) {
          const sx = (Math.sin(i * 137.5) * 0.5 + 0.5) * W;
          const sy = (Math.sin(i * 97.3 + 1) * 0.5 + 0.5) * H;
          ctx.beginPath(); ctx.arc(sx, sy, 0.5 + Math.sin(t + i) * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${0.2 + Math.sin(t * 0.5 + i) * 0.1})`; ctx.fill();
        }
      }
      const ng = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      ng.addColorStop(0, glowColor + "aa"); ng.addColorStop(1, "transparent");
      ctx.fillStyle = ng; ctx.fillRect(0, 0, W, H);
      const orbits = shells.map((_, i) => ({ r: 30 + i * 28, tiltX: (i * 37 * Math.PI) / 180, count: shells[i] }));
      const electronDots = [];
      orbits.forEach((orb, si) => {
        drawOrbit(ctx, rotRef.current.x, rotRef.current.y + t * 0.3, orb.r, orb.tiltX);
        for (let ei = 0; ei < Math.min(orb.count, 12); ei++) {
          const angle = (ei / Math.min(orb.count, 12)) * Math.PI * 2 + t * (0.5 + si * 0.15) * (si % 2 === 0 ? 1 : -1);
          const x3d = Math.cos(angle) * orb.r;
          const y3d = Math.sin(angle) * orb.r * Math.cos(orb.tiltX);
          const z3d = Math.sin(angle) * orb.r * Math.sin(orb.tiltX);
          const proj = project3D(x3d, y3d, z3d, rotRef.current.x, rotRef.current.y + t * 0.3);
          electronDots.push({ ...proj, shell: si });
        }
      });
      electronDots.sort((a, b) => a.z - b.z);
      const nucR = 14 + Math.min(element.protons, 50) * 0.08;
      const nucG = ctx.createRadialGradient(cx - 3, cy - 3, 0, cx, cy, nucR);
      nucG.addColorStop(0, "#ffffff"); nucG.addColorStop(0.3, glowColor); nucG.addColorStop(1, dark ? "#1a1a3e" : "#2222aa");
      ctx.beginPath(); ctx.arc(cx, cy, nucR, 0, Math.PI * 2); ctx.fillStyle = nucG; ctx.fill();
      ctx.fillStyle = "#fff"; ctx.font = `bold ${Math.max(8, nucR * 0.6)}px monospace`;
      ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(element.symbol, cx, cy);
      electronDots.forEach(({ sx, sy, scale }) => {
        const er = Math.max(3, 5 * scale);
        const eG = ctx.createRadialGradient(sx - 1, sy - 1, 0, sx, sy, er * 1.5);
        eG.addColorStop(0, "#ffffff"); eG.addColorStop(0.4, glowColor); eG.addColorStop(1, glowColor + "00");
        ctx.beginPath(); ctx.arc(sx, sy, er, 0, Math.PI * 2); ctx.fillStyle = eG; ctx.fill();
      });
      ctx.fillStyle = dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
      ctx.font = "10px monospace"; ctx.textAlign = "left";
      ctx.fillText(`${element.protons}p · ${element.neutrons}n · ${element.electrons}e`, 10, H - 10);
      ctx.textAlign = "right"; ctx.fillText("drag to rotate", W - 10, H - 10);
    }
    function loop() { timeRef.current += 0.016; draw(timeRef.current); animRef.current = requestAnimationFrame(loop); }
    loop();
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);
    };
  }, [element, dark]);

  return (
    <div style={{ textAlign: "center" }}>
      <canvas ref={canvasRef} width={280} height={280} style={{ width: "100%", maxWidth: "280px", display: "block", margin: "0 auto", cursor: "grab", borderRadius: "12px" }} />
      <div style={{ fontSize: "10px", opacity: 0.4, marginTop: "4px" }}>3D Bohr Model · Drag to rotate</div>
    </div>
  );
}

// ─── 3D Bond Visualizer ──────────────────────────────────────────────────────
function BondVisualizer3D({ element, dark }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);
  const rotRef = useRef({ x: 0.4, y: 0 });
  const dragRef = useRef({ dragging: false, lastX: 0, lastY: 0 });
  const catColor = CATEGORY_COLORS[element.category];
  const glowColor = catColor ? catColor.light : "#6bcb77";
  const valence = Math.min(element.valence || 2, 6);
  const bondAtoms = [];
  for (let i = 0; i < valence; i++) {
    const angle = (i / valence) * Math.PI * 2;
    const partners = ["H", "O", "C", "N", "F", "Cl"];
    bondAtoms.push({ symbol: partners[i % partners.length], color: ["#c77dff","#ff6b6b","#4d96ff","#6bcb77","#00b4d8","#00b4d8"][i % 6], x: Math.cos(angle) * 70, y: Math.sin(angle) * 70, z: (Math.random() - 0.5) * 30, order: i < 2 ? (element.valence >= 4 ? 2 : 1) : 1 });
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.width, H = canvas.height, cx = W / 2, cy = H / 2;
    const onMouseDown = (e) => { dragRef.current = { dragging: true, lastX: e.clientX, lastY: e.clientY }; };
    const onMouseMove = (e) => {
      if (!dragRef.current.dragging) return;
      rotRef.current.y += (e.clientX - dragRef.current.lastX) * 0.01;
      rotRef.current.x += (e.clientY - dragRef.current.lastY) * 0.01;
      dragRef.current.lastX = e.clientX; dragRef.current.lastY = e.clientY;
    };
    const onMouseUp = () => { dragRef.current.dragging = false; };
    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    function project(x, y, z) {
      const rx = rotRef.current.x, ry = rotRef.current.y;
      const cosX = Math.cos(rx), sinX = Math.sin(rx), cosY = Math.cos(ry), sinY = Math.sin(ry);
      const y1 = y * cosX - z * sinX, z1 = y * sinX + z * cosX;
      const x1 = x * cosY + z1 * sinY, z2 = -x * sinY + z1 * cosY;
      const fov = 400, scale = fov / (fov + z2 + 100);
      return { sx: cx + x1 * scale, sy: cy + y1 * scale, scale, z: z2 };
    }
    function draw(t) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = dark ? "#0a0a1e" : "#f0f0f8"; ctx.fillRect(0, 0, W, H);
      const ng = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
      ng.addColorStop(0, glowColor + "55"); ng.addColorStop(1, "transparent");
      ctx.fillStyle = ng; ctx.fillRect(0, 0, W, H);
      const projCenter = project(0, 0, 0);
      const projAtoms = bondAtoms.map(a => project(a.x, a.y, a.z + Math.sin(t * 0.8 + a.x) * 5));
      projAtoms.forEach((pa, i) => {
        const a = bondAtoms[i], order = a.order || 1;
        for (let b = 0; b < order; b++) {
          const offset = (b - (order - 1) / 2) * 4;
          const dx = pa.sy - projCenter.sy, dy = -(pa.sx - projCenter.sx);
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          ctx.beginPath();
          ctx.moveTo(projCenter.sx + (dx / len) * offset, projCenter.sy + (dy / len) * offset);
          ctx.lineTo(pa.sx + (dx / len) * offset, pa.sy + (dy / len) * offset);
          ctx.strokeStyle = pa.z < 0 ? `${a.color}88` : a.color;
          ctx.lineWidth = 2.5 * pa.scale; ctx.stroke();
        }
        const mx = (projCenter.sx + pa.sx) / 2, my = (projCenter.sy + pa.sy) / 2;
        ctx.fillStyle = dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";
        ctx.font = "8px monospace"; ctx.textAlign = "center";
        ctx.fillText(`${100 + Math.floor(i * 15)}pm`, mx, my - 6);
      });
      projAtoms.forEach((pa, i) => {
        const a = bondAtoms[i], r = 14 * pa.scale;
        const g = ctx.createRadialGradient(pa.sx - r * 0.3, pa.sy - r * 0.3, 0, pa.sx, pa.sy, r);
        g.addColorStop(0, "#fff"); g.addColorStop(0.4, a.color); g.addColorStop(1, a.color + "88");
        ctx.beginPath(); ctx.arc(pa.sx, pa.sy, r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
        ctx.fillStyle = "#fff"; ctx.font = `bold ${Math.max(8, r * 0.7)}px sans-serif`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(a.symbol, pa.sx, pa.sy);
      });
      const cr = 22;
      const cg = ctx.createRadialGradient(cx - 5, cy - 5, 0, cx, cy, cr);
      cg.addColorStop(0, "#fff"); cg.addColorStop(0.3, glowColor); cg.addColorStop(1, dark ? "#1a1a3e" : "#2222aa");
      ctx.beginPath(); ctx.arc(projCenter.sx, projCenter.sy, cr, 0, Math.PI * 2); ctx.fillStyle = cg; ctx.fill();
      ctx.fillStyle = "#fff"; ctx.font = "bold 13px monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(element.symbol, projCenter.sx, projCenter.sy);
      ctx.fillStyle = dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";
      ctx.font = "9px sans-serif"; ctx.textAlign = "right";
      ctx.fillText("drag to rotate · illustrative", W - 8, H - 6);
    }
    function loop() { timeRef.current += 0.016; draw(timeRef.current); animRef.current = requestAnimationFrame(loop); }
    loop();
    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [element, dark]);

  return (
    <div style={{ textAlign: "center" }}>
      <canvas ref={canvasRef} width={280} height={240} style={{ width: "100%", maxWidth: "280px", display: "block", margin: "0 auto", cursor: "grab", borderRadius: "12px" }} />
      <div style={{ fontSize: "10px", opacity: 0.4, marginTop: "4px" }}>3D Bond Structure · Drag to rotate · Illustrative model</div>
    </div>
  );
}

// ─── Orbital Diagram ─────────────────────────────────────────────────────────
function OrbitalDiagram({ element, dark }) {
  const orbitals = [];
  const subshells = ["1s","2s","2p","3s","3p","3d","4s","4p","4d","4f","5s","5p","5d","5f","6s","6p","6d","7s","7p"];
  let remaining = element.electrons;
  const capacities = { s: 2, p: 6, d: 10, f: 14 };
  for (const sub of subshells) {
    if (remaining <= 0) break;
    const type = sub[1];
    const cap = capacities[type];
    const fill = Math.min(remaining, cap);
    orbitals.push({ name: sub, type, capacity: cap, fill, boxes: Math.ceil(cap / 2) });
    remaining -= fill;
  }
  const accent = (CATEGORY_COLORS[element.category] || {}).light || "#6bcb77";
  return (
    <div>
      <div style={{ fontSize: "12px", opacity: 0.5, marginBottom: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Orbital Filling Diagram</div>
      <div style={{ fontFamily: "monospace", fontSize: "12px" }}>
        {orbitals.map(orb => {
          const hund = [];
          for (let b = 0; b < orb.boxes; b++) hund.push({ up: b < orb.fill, down: false });
          if (orb.fill > orb.boxes) for (let b = 0; b < orb.fill - orb.boxes; b++) hund[b].down = true;
          return (
            <div key={orb.name} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <span style={{ width: "24px", color: accent, fontWeight: 700 }}>{orb.name}</span>
              <div style={{ display: "flex", gap: "3px" }}>
                {hund.map((box, bi) => (
                  <div key={bi} style={{ width: "20px", height: "24px", border: `1px solid ${accent}55`, borderRadius: "3px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "9px", lineHeight: 1, background: dark ? "#ffffff08" : "#00000005" }}>
                    {box.down && <span style={{ color: accent }}>↓</span>}
                    {box.up && <span style={{ color: accent }}>↑</span>}
                  </div>
                ))}
              </div>
              <span style={{ opacity: 0.4, fontSize: "10px" }}>{orb.fill}/{orb.capacity}</span>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: "10px", padding: "10px", borderRadius: "8px", background: dark ? "#ffffff06" : "#00000004", fontSize: "11px", opacity: 0.7 }}>
        <strong>Config:</strong> {element.electronConfig}
      </div>
    </div>
  );
}

// ─── Spectral Lines ───────────────────────────────────────────────────────────
function SpectralLines({ element, dark }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    for (let x = 0; x < W; x++) {
      const wl = 380 + (x / W) * 400;
      const r = wl < 440 ? (440 - wl) / 60 : wl > 645 ? (wl - 645) / 135 : wl > 510 ? 1 : (wl - 440) / 70;
      const g = wl < 490 ? 0 : wl < 580 ? (wl - 490) / 90 : wl < 645 ? 1 : (wl - 645) > 0 ? Math.max(0, 1 - (wl - 645) / 135) : 0;
      const b = wl < 440 ? 1 : wl < 510 ? (510 - wl) / 70 : 0;
      ctx.fillStyle = `rgba(${Math.floor(r * 255)},${Math.floor(g * 255)},${Math.floor(b * 255)},0.7)`;
      ctx.fillRect(x, 0, 1, H);
    }
    ctx.fillStyle = dark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.2)";
    ctx.fillRect(0, 0, W, H);
    const lines = [];
    const seed = element.number;
    for (let i = 0; i < 8; i++) {
      const wl = 400 + ((seed * (i + 1) * 37) % 350);
      const intensity = 0.4 + (Math.sin(seed + i) * 0.5 + 0.5) * 0.6;
      lines.push({ wl, intensity });
    }
    lines.forEach(({ wl, intensity }) => {
      const x = ((wl - 380) / 400) * W;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H);
      ctx.strokeStyle = `rgba(255,255,255,${intensity})`; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font = "8px monospace"; ctx.textAlign = "center";
      ctx.fillText(`${Math.round(wl)}nm`, x, H - 4);
    });
    ctx.fillStyle = dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.6)";
    ctx.font = "9px sans-serif"; ctx.textAlign = "left"; ctx.fillText("380nm", 4, 12);
    ctx.textAlign = "right"; ctx.fillText("780nm", W - 4, 12);
  }, [element, dark]);
  return (
    <div>
      <div style={{ fontSize: "12px", opacity: 0.5, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>Emission Spectrum (Simulated)</div>
      <canvas ref={canvasRef} width={320} height={60} style={{ width: "100%", borderRadius: "6px", display: "block" }} />
      <div style={{ fontSize: "10px", opacity: 0.4, marginTop: "4px" }}>Spectral lines are illustrative</div>
    </div>
  );
}

// ─── Reactivity Gauge (FIXED: centered, readable labels) ────────────────────
function ReactivityGauge({ element, dark }) {
  const accent = (CATEGORY_COLORS[element.category] || {}).light || "#6bcb77";
  const eneg = element.electronegativity || 2;
  const ionE = element.ionizationEnergy || 10;
  const reactivity = Math.max(0, Math.min(100, ((4 - eneg) / 4 * 50) + ((25 - ionE) / 25 * 50)));
  const metallic = ["alkali metal","alkaline earth metal","transition metal","post-transition metal","lanthanide","actinide"].includes(element.category) ? 90 : 10;
  const stability = element.number > 82 ? 20 : element.category === "noble gas" ? 100 : Math.min(100, 50 + (element.number % 20) * 2);

  const metrics = [
    { label: "Reactivity", value: reactivity, color: "#ff6b6b" },
    { label: "Metallic", value: metallic, color: "#ffd93d" },
    { label: "Stability", value: stability, color: "#6bcb77" },
  ];

  return (
    <div>
      <div style={{ fontSize: "12px", opacity: 0.5, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>Chemical Character</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {metrics.map(m => (
          <div key={m.label}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
              <span style={{ opacity: 0.65, fontWeight: 600 }}>{m.label}</span>
              <span style={{ fontWeight: 700, color: m.color }}>{Math.round(m.value)}%</span>
            </div>
            <div style={{ height: 10, background: dark ? "#ffffff10" : "#00000010", borderRadius: 5, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${m.value}%`, background: `linear-gradient(90deg, ${m.color}99, ${m.color})`, borderRadius: 5, transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Property Bar ─────────────────────────────────────────────────────────────
function PropertyBar({ label, value, max, unit, color }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "3px", opacity: 0.75 }}>
        <span>{label}</span>
        <span style={{ fontWeight: 600 }}>{value !== null && value !== undefined ? `${value}${unit || ""}` : "N/A"}</span>
      </div>
      <div style={{ height: "5px", background: "rgba(128,128,128,0.2)", borderRadius: "3px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color || "#6bcb77", borderRadius: "3px", transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)" }} />
      </div>
    </div>
  );
}

// ─── Compare Panel ────────────────────────────────────────────────────────────
function ComparePanel({ elements, onRemove, dark }) {
  if (elements.length < 2) return (
    <div style={{ textAlign: "center", opacity: 0.4, padding: "20px", fontSize: "13px" }}>
      Select 2–4 elements to compare.<br />Enable Compare Mode and click elements.
    </div>
  );
  const props = [
    { label: "Atomic Mass", key: "mass", unit: " u", max: 300 },
    { label: "Electronegativity", key: "electronegativity", unit: "", max: 4 },
    { label: "Ionization Energy", key: "ionizationEnergy", unit: " eV", max: 25 },
    { label: "Atomic Radius", key: "radius", unit: " pm", max: 300 },
    { label: "Density", key: "density", unit: " g/cm³", max: 25 },
    { label: "Melting Point", key: "meltingPoint", unit: "°C", max: 4000 },
    { label: "Boiling Point", key: "boilingPoint", unit: "°C", max: 5000 },
    { label: "Electron Affinity", key: "electronAffinity", unit: " eV", max: 4 },
  ];
  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
        {elements.map(el => {
          const accent = (CATEGORY_COLORS[el.category] || {}).light || "#6bcb77";
          return (
            <div key={el.number} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", borderRadius: "10px", background: accent + "22", border: `1px solid ${accent}55`, flex: "1 1 120px" }}>
              <span style={{ fontSize: "20px", fontWeight: 700, color: accent }}>{el.symbol}</span>
              <span style={{ fontSize: "12px", flex: 1 }}>{el.name}</span>
              <button onClick={() => onRemove(el)} style={{ background: "none", border: "none", cursor: "pointer", color: accent, fontSize: "16px", padding: 0 }}>×</button>
            </div>
          );
        })}
      </div>
      {props.map(p => (
        <div key={p.key} style={{ marginBottom: "12px" }}>
          <div style={{ fontSize: "11px", opacity: 0.5, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{p.label}</div>
          {elements.map(el => {
            const val = el[p.key];
            const accent = (CATEGORY_COLORS[el.category] || {}).light || "#6bcb77";
            const pct = val != null ? Math.min(100, (val / p.max) * 100) : 0;
            return (
              <div key={el.number} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <span style={{ width: "28px", fontSize: "11px", fontWeight: 700, color: accent, textAlign: "right" }}>{el.symbol}</span>
                <div style={{ flex: 1, height: "8px", background: "rgba(128,128,128,0.15)", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: accent, borderRadius: "4px", transition: "width 0.8s ease" }} />
                </div>
                <span style={{ width: "64px", fontSize: "10px", opacity: 0.7 }}>{val != null ? `${val}${p.unit}` : "N/A"}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ─── Element Modal ────────────────────────────────────────────────────────────
function ElementModal({ element, onClose, dark, onIsotopes }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [atomView, setAtomView] = useState("2d");
  const catColor = CATEGORY_COLORS[element.category] || { light: "#6bcb77", dark: "#4caf50" };
  const accent = dark ? catColor.dark : catColor.light;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handler); };
  }, [onClose]);

  const tabs = ["overview", "properties", "orbitals", "bonds", "spectrum", "isotopes", "history"];

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: dark ? "rgba(0,0,0,0.88)" : "rgba(0,0,30,0.65)",
      backdropFilter: "blur(14px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "12px", animation: "fadeIn 0.25s ease",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: "820px", maxHeight: "92vh",
        background: dark ? "#0a0a1a" : "#f8f8ff",
        borderRadius: "20px", border: `1px solid ${accent}44`,
        overflow: "hidden", display: "flex", flexDirection: "column",
        animation: "slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: `0 0 80px ${accent}22, 0 40px 100px rgba(0,0,0,0.6)`,
      }}>
        {/* Header */}
        <div style={{
          padding: "20px 24px 0",
          background: `linear-gradient(135deg, ${accent}22 0%, transparent 60%)`,
          borderBottom: `1px solid ${accent}33`, flexShrink: 0,
        }}>
          {/* Title row - fixed close button on mobile */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
            <div style={{ width: "72px", height: "72px", borderRadius: "14px", background: `linear-gradient(135deg, ${accent}33, ${accent}11)`, border: `2px solid ${accent}66`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <div style={{ fontSize: "9px", opacity: 0.6 }}>{element.number}</div>
              <div style={{ fontSize: "28px", fontWeight: 700, lineHeight: 1, color: accent }}>{element.symbol}</div>
              <div style={{ fontSize: "8px", opacity: 0.5 }}>{element.mass.toFixed(2)}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{ margin: 0, fontSize: "clamp(16px,4vw,22px)", fontWeight: 700, color: dark ? "#fff" : "#111" }}>{element.name}</h2>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "6px" }}>
                <span style={{ fontSize: "11px", padding: "2px 9px", borderRadius: "20px", background: accent + "33", color: accent, fontWeight: 600 }}>{catColor.label}</span>
                <span style={{ fontSize: "11px", padding: "2px 9px", borderRadius: "20px", background: dark ? "#ffffff11" : "#00000011", color: dark ? "#aaa" : "#555" }}>Period {element.period} · Group {element.group}</span>
                <span style={{ fontSize: "11px", padding: "2px 9px", borderRadius: "20px", background: dark ? "#ffffff11" : "#00000011", color: dark ? "#aaa" : "#555" }}>{element.phase}</span>
              </div>
              <p style={{ margin: "8px 0 0", fontSize: "12px", opacity: 0.65, lineHeight: 1.5 }}>{element.description}</p>
            </div>
            {/* Close button — always top-right, no wrap */}
            <button onClick={onClose} style={{ width: "34px", height: "34px", minWidth: "34px", borderRadius: "50%", background: dark ? "#ffffff15" : "#00000010", border: "none", cursor: "pointer", color: dark ? "#fff" : "#333", fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginLeft: "auto" }}>×</button>
          </div>
          {/* Tabs */}
          <div style={{ display: "flex", gap: "2px", overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setActiveTab(t)} style={{
                padding: "7px 12px", fontSize: "11px", fontWeight: 600,
                border: "none", borderRadius: "8px 8px 0 0", cursor: "pointer",
                textTransform: "capitalize", whiteSpace: "nowrap",
                background: activeTab === t ? (dark ? "#0a0a1a" : "#f8f8ff") : "transparent",
                color: activeTab === t ? accent : (dark ? "#666" : "#999"),
                borderBottom: activeTab === t ? `2px solid ${accent}` : "2px solid transparent",
                transition: "all 0.2s",
              }}>{t}</button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ overflowY: "auto", flex: 1, padding: "20px 24px" }}>

          {activeTab === "overview" && (
            <div>
              <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginBottom: "12px" }}>
                {["2d", "3d"].map(v => (
                  <button key={v} onClick={() => setAtomView(v)} style={{
                    padding: "5px 16px", borderRadius: "8px", fontSize: "12px", fontWeight: 600,
                    border: `1px solid ${atomView === v ? accent : (dark ? "#ffffff22" : "#00000022")}`,
                    background: atomView === v ? accent + "33" : "transparent",
                    color: atomView === v ? accent : (dark ? "#888" : "#666"), cursor: "pointer",
                  }}>{v.toUpperCase()} Model</button>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
                <div>
                  {atomView === "2d" ? <AtomicAnimation element={element} dark={dark} /> : <Atom3D element={element} dark={dark} />}
                  <div style={{ marginTop: "14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                    {[{ l: "Protons", v: element.protons }, { l: "Neutrons", v: element.neutrons }, { l: "Electrons", v: element.electrons }, { l: "Valence e⁻", v: element.valence }].map(({ l, v }) => (
                      <div key={l} style={{ padding: "10px", borderRadius: "10px", background: dark ? "#ffffff08" : "#00000006", textAlign: "center" }}>
                        <div style={{ fontSize: "18px", fontWeight: 700, color: accent }}>{v}</div>
                        <div style={{ fontSize: "10px", opacity: 0.5 }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: "14px" }}>
                    <div style={{ fontSize: "11px", opacity: 0.5, marginBottom: "8px" }}>Electron Shells</div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {(element.shells || [element.electrons]).map((count, i) => (
                        <div key={i} style={{ textAlign: "center" }}>
                          <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: `2px solid ${accent}66`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, color: accent }}>{count}</div>
                          <div style={{ fontSize: "9px", opacity: 0.4, marginTop: "3px" }}>n={i + 1}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "10px", opacity: 0.5, textTransform: "uppercase", letterSpacing: "1px" }}>Key Properties</div>
                  {[
                    { label: "Atomic Mass", value: `${element.mass} u` },
                    { label: "Electronegativity", value: element.electronegativity ?? "N/A" },
                    { label: "Atomic Radius", value: element.radius ? `${element.radius} pm` : "N/A" },
                    { label: "Electron Config", value: element.electronConfig },
                    { label: "Oxidation States", value: element.oxidationStates },
                    { label: "Phase (STP)", value: element.phase },
                    { label: "Discovered", value: element.discovered < 0 ? `${Math.abs(element.discovered)} BC` : element.discovered },
                    { label: "Crystal Structure", value: element.crystalStructure },
                    { label: "Magnetism", value: element.magnetism },
                    { label: "Abundance", value: element.abundance },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: `1px solid ${dark ? "#ffffff08" : "#00000008"}`, fontSize: "12px" }}>
                      <span style={{ opacity: 0.6 }}>{label}</span>
                      <span style={{ fontWeight: 500, textAlign: "right", maxWidth: "55%" }}>{value}</span>
                    </div>
                  ))}
                  {element.uses && (
                    <div style={{ marginTop: "14px", padding: "12px", borderRadius: "10px", background: accent + "11", border: `1px solid ${accent}22` }}>
                      <div style={{ fontSize: "10px", opacity: 0.5, marginBottom: "5px", textTransform: "uppercase", letterSpacing: "1px" }}>Common Uses</div>
                      <div style={{ fontSize: "12px", lineHeight: 1.6 }}>{element.uses}</div>
                    </div>
                  )}
                </div>
              </div>
              <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                <ReactivityGauge element={element} dark={dark} />
                {element.funFact && (
                  <div style={{ padding: "16px", borderRadius: "12px", background: dark ? "#ffffff06" : "#00000004", border: `1px solid ${accent}22`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div style={{ fontSize: "20px", marginBottom: "8px" }}>💡</div>
                    <div style={{ fontSize: "11px", opacity: 0.4, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>Did You Know?</div>
                    <div style={{ fontSize: "12px", lineHeight: 1.7, opacity: 0.8 }}>{element.funFact}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "properties" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "14px", opacity: 0.5, textTransform: "uppercase", letterSpacing: "1px" }}>Thermal & Physical</div>
                <PropertyBar label="Melting Point" value={element.meltingPoint} max={4000} unit="°C" color={accent} />
                <PropertyBar label="Boiling Point" value={element.boilingPoint} max={5000} unit="°C" color={accent} />
                <PropertyBar label="Density" value={element.density} max={25} unit=" g/cm³" color={accent} />
                {element.hardness && <PropertyBar label="Hardness (Mohs)" value={element.hardness} max={10} unit="" color={accent} />}
                <div style={{ marginTop: "20px", padding: "14px", borderRadius: "12px", background: dark ? "#ffffff06" : "#00000004", border: `1px solid ${accent}22` }}>
                  <div style={{ fontSize: "11px", opacity: 0.5, marginBottom: "10px" }}>PHASE TRANSITIONS</div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", opacity: 0.6, marginTop: "8px" }}>
                    <span>MP: {element.meltingPoint}°C</span>
                    <span>BP: {element.boilingPoint}°C</span>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "14px", opacity: 0.5, textTransform: "uppercase", letterSpacing: "1px" }}>Electronic Properties</div>
                <PropertyBar label="Ionization Energy" value={element.ionizationEnergy} max={25} unit=" eV" color="#ff6b6b" />
                <PropertyBar label="Electron Affinity" value={element.electronAffinity} max={4} unit=" eV" color="#4d96ff" />
                {element.electronegativity && <PropertyBar label="Electronegativity" value={element.electronegativity} max={4} unit="" color="#c77dff" />}
                <div style={{ marginTop: "20px" }}>
                  <div style={{ fontSize: "11px", opacity: 0.5, marginBottom: "10px" }}>CONDUCTIVITY & MAGNETISM</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    {[{ label: "Conductivity", value: element.conductivity, icon: "⚡" }, { label: "Magnetism", value: element.magnetism, icon: "🧲" }].map(({ label, value, icon }) => (
                      <div key={label} style={{ padding: "12px", borderRadius: "10px", background: dark ? "#ffffff08" : "#00000005", border: `1px solid ${accent}22`, textAlign: "center" }}>
                        <div style={{ fontSize: "20px" }}>{icon}</div>
                        <div style={{ fontSize: "11px", fontWeight: 600, marginTop: "4px", color: accent }}>{value}</div>
                        <div style={{ fontSize: "10px", opacity: 0.4 }}>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: "16px", padding: "14px", borderRadius: "12px", background: dark ? "#ffffff06" : "#00000004", border: `1px solid ${accent}22` }}>
                  <div style={{ fontSize: "11px", opacity: 0.5, marginBottom: "10px" }}>ALL PROPERTIES</div>
                  {[["Atomic Number", element.number], ["Atomic Mass", `${element.mass} u`], ["Period", element.period], ["Group", element.group], ["Valence Electrons", element.valence], ["Electron Config", element.electronConfig], ["Crystal Structure", element.crystalStructure], ["Earth Abundance", element.abundance], ["Oxidation States", element.oxidationStates]].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", padding: "5px 0", borderBottom: `1px solid ${dark ? "#ffffff06" : "#00000006"}` }}>
                      <span style={{ opacity: 0.55 }}>{k}</span>
                      <span style={{ fontWeight: 500 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "orbitals" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
              <OrbitalDiagram element={element} dark={dark} />
              <div>
                <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "14px", opacity: 0.5, textTransform: "uppercase", letterSpacing: "1px" }}>Quantum Numbers</div>
                {[
                  { n: "Principal (n)", desc: "Energy level", v: element.shells?.length || 1 },
                  { n: "Angular (ℓ)", desc: "Shape: s=0, p=1, d=2, f=3", v: `0–${Math.min(3, (element.shells?.length || 1) - 1)}` },
                  { n: "Magnetic (mℓ)", desc: "Orientation in space", v: `${-Math.min(3, (element.shells?.length || 1) - 1)}..+${Math.min(3, (element.shells?.length || 1) - 1)}` },
                  { n: "Spin (ms)", desc: "Electron spin", v: "±½" },
                ].map(q => (
                  <div key={q.n} style={{ padding: "12px", borderRadius: "10px", marginBottom: "8px", background: dark ? "#ffffff06" : "#00000004", border: `1px solid ${accent}22` }}>
                    <div style={{ fontWeight: 600, fontSize: "13px", color: accent }}>{q.n} = {q.v}</div>
                    <div style={{ fontSize: "11px", opacity: 0.5, marginTop: "3px" }}>{q.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "bonds" && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "20px" }}>
                <BondVisualizer3D element={element} dark={dark} />
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "14px", opacity: 0.5, textTransform: "uppercase", letterSpacing: "1px" }}>Chemical Bonding</div>
                  <div style={{ display: "grid", gap: "10px" }}>
                    {[
                      { type: "Ionic Bond", strength: "150-400 kJ/mol", desc: "Transfer of electrons between atoms", possible: element.electronegativity != null && (element.electronegativity < 1.5 || element.electronegativity > 3.0), color: "#ff6b6b" },
                      { type: "Covalent Bond", strength: "150-1100 kJ/mol", desc: "Sharing of electrons between atoms", possible: element.electronegativity != null && element.electronegativity >= 1.5 && element.electronegativity <= 3.5, color: "#4d96ff" },
                      { type: "Metallic Bond", strength: "70-850 kJ/mol", desc: "Delocalized electrons in metal lattice", possible: ["alkali metal","alkaline earth metal","transition metal","post-transition metal"].includes(element.category), color: "#ffd93d" },
                      { type: "Van der Waals", strength: "0.5-10 kJ/mol", desc: "Weak temporary dipole forces", possible: true, color: "#6bcb77" },
                    ].map(({ type, strength, desc, possible, color }) => (
                      <div key={type} style={{ padding: "12px", borderRadius: "10px", background: possible ? (dark ? color + "15" : color + "10") : (dark ? "#ffffff05" : "#00000003"), border: `1px solid ${possible ? color + "44" : (dark ? "#ffffff10" : "#00000010")}`, opacity: possible ? 1 : 0.35 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                          <span style={{ fontSize: "12px", fontWeight: 600, color: possible ? color : "inherit" }}>{type}</span>
                          {possible && <span style={{ fontSize: "9px", padding: "2px 6px", background: color + "33", color, borderRadius: "20px", fontWeight: 700 }}>FORMS</span>}
                        </div>
                        <div style={{ fontSize: "10px", fontWeight: 500, opacity: 0.6, marginBottom: "2px" }}>{strength}</div>
                        <div style={{ fontSize: "10px", opacity: 0.5 }}>{desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "spectrum" && (
            <div>
              <SpectralLines element={element} dark={dark} />
              <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
                {[
                  { label: "Ionization Energy", value: element.ionizationEnergy, unit: "eV", desc: "Energy to remove one electron", color: "#ff6b6b" },
                  { label: "Electron Affinity", value: element.electronAffinity, unit: "eV", desc: "Energy released gaining an electron", color: "#4d96ff" },
                  { label: "Work Function", value: element.ionizationEnergy ? (element.ionizationEnergy * 0.6).toFixed(2) : "N/A", unit: "eV", desc: "Energy to emit photoelectron", color: "#ffd93d" },
                  { label: "Plasma Energy", value: element.ionizationEnergy ? (element.ionizationEnergy * 1.2).toFixed(2) : "N/A", unit: "eV", desc: "Estimated plasma excitation", color: "#c77dff" },
                ].map(m => (
                  <div key={m.label} style={{ padding: "14px", borderRadius: "12px", background: dark ? m.color + "12" : m.color + "10", border: `1px solid ${m.color}33` }}>
                    <div style={{ fontSize: "10px", opacity: 0.5, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>{m.label}</div>
                    <div style={{ fontSize: "22px", fontWeight: 700, color: m.color }}>{m.value ?? "N/A"}<span style={{ fontSize: "12px", opacity: 0.6 }}> {m.unit}</span></div>
                    <div style={{ fontSize: "10px", opacity: 0.5, marginTop: "4px" }}>{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ISOTOPES TAB */}
          {activeTab === "isotopes" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                <div style={{ fontSize: 12, opacity: 0.5, textTransform: "uppercase", letterSpacing: 1 }}>
                  {getIsotopes(element).length} known isotope{getIsotopes(element).length !== 1 ? "s" : ""} of {element.name}
                </div>
                <button onClick={() => onIsotopes(element)} style={{ padding: "8px 16px", borderRadius: 10, fontSize: 12, fontWeight: 700, border: `1px solid ${accent}55`, background: accent + "22", color: accent, cursor: "pointer" }}>
                  Open Full Isotope Explorer ↗
                </button>
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {getIsotopes(element).map((iso, i) => (
                  <div key={i} style={{ padding: "14px 16px", borderRadius: 12, background: dark ? "#ffffff06" : "#00000005", border: `1px solid ${iso.radioactive ? "#ff6b6b33" : accent + "22"}`, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 10, background: (iso.radioactive ? "#ff6b6b" : accent) + "22", border: `2px solid ${iso.radioactive ? "#ff6b6b" : accent}44`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <div style={{ fontSize: 8, opacity: 0.5 }}>{iso.massNumber}</div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: iso.radioactive ? "#ff6b6b" : accent }}>{element.symbol}</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 160 }}>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{iso.name} <span style={{ fontSize: 10, opacity: 0.4 }}>{iso.symbol}</span></div>
                      <div style={{ fontSize: 11, opacity: 0.55, marginTop: 3 }}>{iso.neutrons} neutrons · {iso.abundance} · {iso.halfLife}</div>
                      <div style={{ fontSize: 11, opacity: 0.5, marginTop: 2 }}>{iso.notes}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: iso.radioactive ? "#ff6b6b" : "#6bcb77" }}>{iso.radioactive ? "☢ Unstable" : "✓ Stable"}</div>
                      {iso.decayMode && <div style={{ fontSize: 10, opacity: 0.5, marginTop: 2 }}>Decay: {iso.decayMode}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
              <div style={{ display: "flex", gap: "16px", padding: "18px", borderRadius: "14px", background: dark ? "#ffffff06" : "#00000004", border: `1px solid ${accent}22`, marginBottom: "20px", flexWrap: "wrap" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: accent + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", flexShrink: 0 }}>⚗️</div>
                <div>
                  <div style={{ fontSize: "20px", fontWeight: 700, color: accent }}>{element.discovered < 0 ? `${Math.abs(element.discovered)} BC` : element.discovered}</div>
                  <div style={{ fontSize: "12px", opacity: 0.5 }}>Year of Discovery</div>
                  <div style={{ marginTop: "4px", fontSize: "13px" }}>Discovered by <strong>{element.discoveredBy}</strong></div>
                </div>
              </div>
              {element.funFact && (
                <div style={{ marginTop: "20px", padding: "14px", borderRadius: "12px", background: accent + "11", border: `1px solid ${accent}33` }}>
                  <div style={{ fontSize: "10px", opacity: 0.5, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>Fun Fact</div>
                  <div style={{ fontSize: "12px", lineHeight: 1.7 }}>{element.funFact}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Element Card ─────────────────────────────────────────────────────────────
function ElementCard({ element, highlight, dimmed, onClick, dark, inCompare }) {
  const catColor = CATEGORY_COLORS[element.category] || { light: "#888", dark: "#666" };
  const color = dark ? catColor.dark : catColor.light;
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <div
      onClick={() => onClick(element)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        cursor: "pointer", borderRadius: "8px", padding: "4px 3px",
        background: inCompare ? color + "44" : hovered ? color + "33" : highlight ? color + "25" : dimmed ? (dark ? "#ffffff05" : "#00000005") : (dark ? "#ffffff0a" : "#00000008"),
        border: `1px solid ${highlight || hovered || inCompare ? color + "88" : (dark ? "#ffffff10" : "#00000010")}`,
        transform: pressed ? "scale(0.92)" : hovered ? "scale(1.1) translateY(-3px)" : "scale(1)",
        transition: pressed ? "transform 0.08s ease" : "all 0.22s cubic-bezier(0.34,1.56,0.64,1)",
        opacity: dimmed ? 0.3 : 1,
        display: "flex", flexDirection: "column", alignItems: "center",
        minWidth: 0,
        boxShadow: pressed ? "none" : inCompare ? `0 0 10px ${color}55` : hovered ? `0 6px 24px ${color}55, 0 2px 8px ${color}33` : "none",
        userSelect: "none",
        outline: inCompare ? `2px solid ${color}` : "none",
        willChange: "transform",
      }}
    >
      <span style={{ fontSize: "7px", opacity: 0.4, alignSelf: "flex-end", lineHeight: 1 }}>{element.number}</span>
      <span style={{ fontSize: "clamp(10px, 1.8vw, 16px)", fontWeight: 700, color, lineHeight: 1 }}>{element.symbol}</span>
      <span style={{ fontSize: "clamp(5px, 0.9vw, 8px)", opacity: 0.55, lineHeight: 1.2, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "100%" }}>{element.name}</span>
      <span style={{ fontSize: "clamp(4px, 0.7vw, 7px)", opacity: 0.35, lineHeight: 1 }}>{element.mass.toFixed(1)}</span>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isotopeEl, setIsotopeEl] = useState(null);

  const matchesSearch = useCallback((el) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return el.name.toLowerCase().includes(s) || el.symbol.toLowerCase().includes(s) || String(el.number).includes(s) || el.category.toLowerCase().includes(s);
  }, [search]);

  const isHighlighted = useCallback((el) => (groupFilter === "all" || el.category === groupFilter) && matchesSearch(el), [groupFilter, matchesSearch]);
  const anyFilter = search || groupFilter !== "all";

  const handleElementClick = (el) => {
    if (compareMode) {
      setCompareList(prev => {
        if (prev.find(x => x.number === el.number)) return prev.filter(x => x.number !== el.number);
        if (prev.length >= 4) return prev;
        return [...prev, el];
      });
      return;
    }
    setSelected(el);
  };

  const grid = Array.from({ length: 9 }, () => Array(18).fill(null));
  ELEMENTS.forEach(el => { if (el.ypos <= 9 && el.xpos <= 18) grid[el.ypos - 1][el.xpos - 1] = el; });

  const bg = dark ? "#08081a" : "#f0f0f8";
  const text = dark ? "#e8e8ff" : "#111128";
  const surface = dark ? "#10101f" : "#ffffff";
  const border = dark ? "#ffffff12" : "#00000012";

  return (
    <div style={{ minHeight: "100vh", background: bg, color: text, fontFamily: "'Segoe UI', system-ui, sans-serif", display: "flex", flexDirection: "column", paddingBottom: "52px" }}>
      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform:translateY(40px) scale(0.95) } to { opacity:1; transform:translateY(0) scale(1) } }
        @keyframes glow { 0%,100%{text-shadow:0 0 20px #6c63ff88,0 0 40px #ff6b9d44} 50%{text-shadow:0 0 40px #6c63ffbb,0 0 80px #ff6b9d88} }
        @keyframes popIn { from { opacity:0; transform:scale(0.85) } to { opacity:1; transform:scale(1) } }
        * { box-sizing: border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:5px; height:5px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(128,128,200,0.3); border-radius:3px; }
        input { outline:none; }
      `}</style>

      {/* Header */}
      <header style={{ padding: "16px 16px 12px", borderBottom: `1px solid ${border}`, background: surface }}>
        <div style={{ textAlign: "center", marginBottom: "14px" }}>
          <h1 style={{ fontSize: "clamp(28px, 6vw, 52px)", fontWeight: 900, letterSpacing: "-2px", background: "linear-gradient(135deg, #a78bfa, #f472b6, #fb923c, #facc15)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "glow 3s ease-in-out infinite", fontFamily: "'Georgia', serif", display: "inline-block" }}>ELEMENTOS</h1>
          <div style={{ fontSize: "11px", opacity: 0.35, letterSpacing: "4px", textTransform: "uppercase", marginTop: "2px" }}>Interactive Element Explorer · {ELEMENTS.length} of 118 Elements</div>
        </div>

        <div style={{ position: "relative", marginBottom: "12px" }}>
          <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", opacity: 0.4, fontSize: "16px", pointerEvents: "none" }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, symbol, number, or category…" style={{ width: "100%", padding: "11px 14px 11px 42px", borderRadius: "12px", border: `1px solid ${border}`, background: dark ? "#ffffff0a" : "#00000008", color: text, fontSize: "14px" }} />
          {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: text, cursor: "pointer", opacity: 0.5, fontSize: "18px" }}>×</button>}
        </div>

        <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            <button onClick={() => setDark(d => !d)} style={{ padding: "6px 12px", borderRadius: "8px", border: `1px solid ${border}`, background: dark ? "#ffffff15" : "#00000010", color: text, cursor: "pointer", fontSize: "12px", fontWeight: 600 }}>{dark ? "☀️ Light" : "🌙 Dark"}</button>
            <button onClick={() => { setCompareMode(m => !m); if (compareMode) setCompareList([]); }} style={{ padding: "6px 12px", borderRadius: "8px", border: `1px solid ${compareMode ? "#4d96ff88" : border}`, background: compareMode ? "#4d96ff22" : "transparent", color: compareMode ? "#4d96ff" : text, cursor: "pointer", fontSize: "12px", fontWeight: 600 }}>⚖ {compareMode ? `Compare (${compareList.length}/4)` : "Compare"}</button>
            {compareMode && compareList.length >= 2 && <button onClick={() => setShowCompare(true)} style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid #6bcb7788", background: "#6bcb7722", color: "#6bcb77", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}>View →</button>}
            <button onClick={() => setShowQuiz(true)} style={{ padding: "6px 12px", borderRadius: "8px", border: `1px solid #ffd93d55`, background: "#ffd93d15", color: "#ffd93d", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}>🎓 Quiz</button>
          </div>
        </div>

        {/* Group filter pills */}
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginTop: "12px" }}>
          {GROUPS_FILTER.map(g => {
            const catColor = CATEGORY_COLORS[g.id];
            const active = groupFilter === g.id;
            const c = catColor ? (dark ? catColor.dark : catColor.light) : (dark ? "#8888ff" : "#5555cc");
            return (
              <button key={g.id} onClick={() => setGroupFilter(active ? "all" : g.id)} style={{ padding: "4px 10px", borderRadius: "20px", fontSize: "10px", fontWeight: 600, cursor: "pointer", border: `1px solid ${active ? c : (dark ? "#ffffff15" : "#00000015")}`, background: active ? c + "33" : "transparent", color: active ? c : (dark ? "#aaa" : "#666"), transition: "all 0.2s", transform: active ? "scale(1.05)" : "scale(1)" }}>{g.label}</button>
            );
          })}
        </div>
      </header>

      {/* Legend */}
      <div style={{ padding: "7px 16px", background: surface, borderBottom: `1px solid ${border}`, overflowX: "auto" }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ fontSize: "9px", opacity: 0.4, whiteSpace: "nowrap" }}>LEGEND:</span>
          {Object.entries(CATEGORY_COLORS).map(([key, val]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" }}>
              <div style={{ width: "9px", height: "9px", borderRadius: "2px", background: dark ? val.dark : val.light }} />
              <span style={{ fontSize: "9px", opacity: 0.5 }}>{val.label}</span>
            </div>
          ))}
        </div>
      </div>

      {compareMode && (
        <div style={{ padding: "8px 16px", background: "#4d96ff22", borderBottom: "1px solid #4d96ff44", fontSize: "12px", color: "#4d96ff", textAlign: "center" }}>
          ⚖ Compare Mode — click elements to add/remove (max 4).
          {compareList.length >= 2 && <> Click <strong>View →</strong> to compare.</>}
        </div>
      )}

      {/* Periodic Table */}
      <main style={{ flex: 1, padding: "12px 10px", overflowX: "auto" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(18, minmax(38px, 1fr))", gap: "2px", minWidth: "660px" }}>
            {grid.map((row, ri) =>
              row.map((el, ci) => {
                const key = `${ri}-${ci}`;
                if (!el) {
                  if (ri === 5 && ci === 2) return <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px", opacity: 0.3, fontStyle: "italic" }}>57-71</div>;
                  if (ri === 6 && ci === 2) return <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px", opacity: 0.3, fontStyle: "italic" }}>89-103</div>;
                  return <div key={key} style={{ minHeight: "48px" }} />;
                }
                const high = isHighlighted(el);
                const dim = anyFilter && !high;
                const inCmp = compareList.some(x => x.number === el.number);
                return <ElementCard key={el.number} element={el} highlight={high && anyFilter} dimmed={dim} onClick={handleElementClick} dark={dark} inCompare={inCmp} />;
              })
            )}
          </div>

          {/* Stats */}
          <div style={{ marginTop: "16px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {[
              { label: "Total Elements", value: ELEMENTS.length },
              { label: "Metals", value: ELEMENTS.filter(e => ["alkali metal","alkaline earth metal","transition metal","post-transition metal","lanthanide","actinide"].includes(e.category)).length },
              { label: "Nonmetals", value: ELEMENTS.filter(e => ["nonmetal","noble gas","halogen"].includes(e.category)).length },
              { label: "Metalloids", value: ELEMENTS.filter(e => e.category === "metalloid").length },
              { label: "Radioactive", value: ELEMENTS.filter(e => e.number >= 84 || e.number === 43 || e.number === 61).length },
            ].map(({ label, value }) => (
              <div key={label} style={{ padding: "10px 14px", borderRadius: "10px", background: dark ? "#ffffff08" : "#00000006", border: `1px solid ${border}`, flex: 1, minWidth: "90px", textAlign: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: 700, background: "linear-gradient(135deg,#a78bfa,#f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{value}</div>
                <div style={{ fontSize: "9px", opacity: 0.4, marginTop: "2px" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Compare modal */}
          {showCompare && (
            <div onClick={() => setShowCompare(false)} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", animation: "fadeIn 0.2s ease" }}>
              <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: "700px", maxHeight: "90vh", background: dark ? "#0a0a1a" : "#f8f8ff", borderRadius: "20px", border: "1px solid #4d96ff44", overflow: "hidden", display: "flex", flexDirection: "column", animation: "slideUp 0.3s ease" }}>
                <div style={{ padding: "20px 24px", borderBottom: "1px solid #4d96ff22", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
                  <h3 style={{ margin: 0, color: "#4d96ff", fontSize: "18px" }}>Element Comparison</h3>
                  <button onClick={() => setShowCompare(false)} style={{ background: "none", border: "none", cursor: "pointer", color: text, fontSize: "22px" }}>×</button>
                </div>
                <div style={{ overflowY: "auto", flex: 1, padding: "20px 24px" }}>
                  <ComparePanel elements={compareList} onRemove={el => setCompareList(prev => prev.filter(x => x.number !== el.number))} dark={dark} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "10px 20px", background: dark ? "rgba(8,8,26,0.96)" : "rgba(240,240,248,0.96)", borderTop: `1px solid ${border}`, textAlign: "center", backdropFilter: "blur(12px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
        <span style={{ fontSize: "12px", opacity: 0.45 }}>Built by</span>
        <span style={{ fontSize: "13px", fontWeight: 800, background: "linear-gradient(135deg,#a78bfa,#f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "0.5px" }}>Joseph · Akhil</span>
        <span style={{ fontSize: "11px", opacity: 0.25 }}>· ELEMENTOS · {new Date().getFullYear()}</span>
      </footer>

      {/* Modals */}
      {selected && <ElementModal element={selected} onClose={() => setSelected(null)} dark={dark} onIsotopes={(el) => { setIsotopeEl(el); setSelected(null); }} />}
      {isotopeEl && <IsotopeModal element={isotopeEl} onClose={() => setIsotopeEl(null)} dark={dark} />}
      {showQuiz && <QuizModal onClose={() => setShowQuiz(false)} dark={dark} />}
    </div>
  );
}