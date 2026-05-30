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

// ─── 2D Atomic Animation (existing, kept) ────────────────────────────────────
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
      ctx.beginPath(); ctx.arc(cx, cy, baseRadius * 0.7, 0, Math.PI * 2);
      const nGlow = ctx.createRadialGradient(cx, cy, baseRadius * 0.4, cx, cy, baseRadius * 0.9);
      nGlow.addColorStop(0, glowColor + "66"); nGlow.addColorStop(1, "transparent");
      ctx.fillStyle = nGlow; ctx.fill();
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

    const onMouseDown = (e) => {
      dragRef.current = { dragging: true, lastX: e.clientX, lastY: e.clientY };
    };
    const onMouseMove = (e) => {
      if (!dragRef.current.dragging) return;
      rotRef.current.y += (e.clientX - dragRef.current.lastX) * 0.01;
      rotRef.current.x += (e.clientY - dragRef.current.lastY) * 0.01;
      dragRef.current.lastX = e.clientX; dragRef.current.lastY = e.clientY;
    };
    const onMouseUp = () => { dragRef.current.dragging = false; };
    const onTouchStart = (e) => {
      dragRef.current = { dragging: true, lastX: e.touches[0].clientX, lastY: e.touches[0].clientY };
    };
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
      const fov = 400;
      const scale = fov / (fov + z2 + 50);
      return { sx: cx + x1 * scale, sy: cy + y1 * scale, scale, z: z2 };
    }

    function drawOrbit(ctx, rx, ry, orbitRadius, tiltX, tiltY, color) {
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
      ctx.strokeStyle = color; ctx.lineWidth = 0.8;
      ctx.setLineDash([3, 6]); ctx.stroke(); ctx.setLineDash([]);
    }

    function draw(t) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, W, H);
      const rx = rotRef.current.x, ry = rotRef.current.y + t * 0.3;

      // Stars background
      ctx.fillStyle = dark ? "#08081a" : "#e8e8f8";
      ctx.fillRect(0, 0, W, H);
      if (dark) {
        for (let i = 0; i < 40; i++) {
          const sx = (Math.sin(i * 137.5) * 0.5 + 0.5) * W;
          const sy = (Math.sin(i * 97.3 + 1) * 0.5 + 0.5) * H;
          const sr = 0.5 + Math.sin(t + i) * 0.3;
          ctx.beginPath(); ctx.arc(sx, sy, sr, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${0.2 + Math.sin(t * 0.5 + i) * 0.1})`; ctx.fill();
        }
      }

      // Nucleus glow
      const ng = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      ng.addColorStop(0, glowColor + "aa"); ng.addColorStop(1, "transparent");
      ctx.fillStyle = ng; ctx.fillRect(0, 0, W, H);

      // Draw orbits for each shell
      const orbits = shells.map((_, i) => ({
        r: 30 + i * 28,
        tiltX: (i * 37 * Math.PI) / 180,
        count: shells[i],
      }));

      const electronDots = [];
      orbits.forEach((orb, si) => {
        const orbColor = dark ? `rgba(255,255,255,0.18)` : `rgba(0,0,100,0.15)`;
        drawOrbit(ctx, rx, ry, orb.r, orb.tiltX, 0, orbColor);
        for (let ei = 0; ei < Math.min(orb.count, 12); ei++) {
          const baseAngle = (ei / Math.min(orb.count, 12)) * Math.PI * 2;
          const angle = baseAngle + t * (0.5 + si * 0.15) * (si % 2 === 0 ? 1 : -1);
          const x3d = Math.cos(angle) * orb.r;
          const y3d = Math.sin(angle) * orb.r * Math.cos(orb.tiltX);
          const z3d = Math.sin(angle) * orb.r * Math.sin(orb.tiltX);
          const proj = project3D(x3d, y3d, z3d, rx, ry + t * 0.3);
          electronDots.push({ ...proj, shell: si, ei });
        }
      });

      // Sort by z for painter's algo
      electronDots.sort((a, b) => a.z - b.z);

      // Draw nucleus
      const nucR = 14 + Math.min(element.protons, 50) * 0.08;
      const nucG = ctx.createRadialGradient(cx - 3, cy - 3, 0, cx, cy, nucR);
      nucG.addColorStop(0, "#ffffff"); nucG.addColorStop(0.3, glowColor); nucG.addColorStop(1, dark ? "#1a1a3e" : "#2222aa");
      ctx.beginPath(); ctx.arc(cx, cy, nucR, 0, Math.PI * 2);
      ctx.fillStyle = nucG; ctx.fill();
      ctx.fillStyle = "#fff"; ctx.font = `bold ${Math.max(8, nucR * 0.6)}px monospace`;
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(element.symbol, cx, cy);

      // Draw electrons
      electronDots.forEach(({ sx, sy, scale, shell }) => {
        const er = Math.max(3, 5 * scale);
        const eG = ctx.createRadialGradient(sx - 1, sy - 1, 0, sx, sy, er * 1.5);
        eG.addColorStop(0, "#ffffff"); eG.addColorStop(0.4, glowColor); eG.addColorStop(1, glowColor + "00");
        ctx.beginPath(); ctx.arc(sx, sy, er, 0, Math.PI * 2);
        ctx.fillStyle = eG; ctx.fill();
      });

      // HUD
      ctx.fillStyle = dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
      ctx.font = "10px monospace"; ctx.textAlign = "left";
      ctx.fillText(`${element.protons}p · ${element.neutrons}n · ${element.electrons}e`, 10, H - 10);
      ctx.textAlign = "right";
      ctx.fillText("drag to rotate", W - 10, H - 10);
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

  // Generate bond partners based on valence
  const bondAtoms = [];
  const valence = Math.min(element.valence || 2, 6);
  for (let i = 0; i < valence; i++) {
    const angle = (i / valence) * Math.PI * 2;
    const bondPartners = ["H", "O", "C", "N", "F", "Cl"];
    bondAtoms.push({
      symbol: bondPartners[i % bondPartners.length],
      color: ["#c77dff","#ff6b6b","#4d96ff","#6bcb77","#00b4d8","#00b4d8"][i % 6],
      x: Math.cos(angle) * 70, y: Math.sin(angle) * 70, z: (Math.random() - 0.5) * 30,
      order: i < 2 ? (element.valence >= 4 ? 2 : 1) : 1,
    });
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
      ctx.fillStyle = dark ? "#0a0a1e" : "#f0f0f8";
      ctx.fillRect(0, 0, W, H);

      // Central glow
      const ng = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
      ng.addColorStop(0, glowColor + "55"); ng.addColorStop(1, "transparent");
      ctx.fillStyle = ng; ctx.fillRect(0, 0, W, H);

      // Animate slight wobble
      const wobble = Math.sin(t * 0.5) * 0.05;

      const projCenter = project(0, 0, 0);
      const projAtoms = bondAtoms.map(a => project(a.x, a.y, a.z + Math.sin(t * 0.8 + a.x) * 5));

      // Draw bonds (back to front)
      projAtoms.forEach((pa, i) => {
        const a = bondAtoms[i];
        const order = a.order || 1;
        for (let b = 0; b < order; b++) {
          const offset = (b - (order - 1) / 2) * 4;
          ctx.beginPath();
          const dx = pa.sy - projCenter.sy, dy = -(pa.sx - projCenter.sx);
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          ctx.moveTo(projCenter.sx + (dx / len) * offset, projCenter.sy + (dy / len) * offset);
          ctx.lineTo(pa.sx + (dx / len) * offset, pa.sy + (dy / len) * offset);
          ctx.strokeStyle = pa.z < 0 ? `${a.color}88` : a.color;
          ctx.lineWidth = 2.5 * pa.scale;
          ctx.stroke();
        }
        // Bond length label
        const mx = (projCenter.sx + pa.sx) / 2, my = (projCenter.sy + pa.sy) / 2;
        ctx.fillStyle = dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";
        ctx.font = "8px monospace"; ctx.textAlign = "center";
        ctx.fillText(`${100 + Math.floor(i * 15)}pm`, mx, my - 6);
      });

      // Draw partner atoms
      projAtoms.forEach((pa, i) => {
        const a = bondAtoms[i];
        const r = 14 * pa.scale;
        const g = canvas.getContext("2d").createRadialGradient(pa.sx - r * 0.3, pa.sy - r * 0.3, 0, pa.sx, pa.sy, r);
        g.addColorStop(0, "#fff"); g.addColorStop(0.4, a.color); g.addColorStop(1, a.color + "88");
        ctx.beginPath(); ctx.arc(pa.sx, pa.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        ctx.fillStyle = "#fff"; ctx.font = `bold ${Math.max(8, r * 0.7)}px sans-serif`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(a.symbol, pa.sx, pa.sy);
      });

      // Draw central atom
      const cr = 22;
      const cg = ctx.createRadialGradient(cx - 5, cy - 5, 0, cx, cy, cr);
      cg.addColorStop(0, "#fff"); cg.addColorStop(0.3, glowColor); cg.addColorStop(1, dark ? "#1a1a3e" : "#2222aa");
      ctx.beginPath(); ctx.arc(projCenter.sx, projCenter.sy, cr, 0, Math.PI * 2);
      ctx.fillStyle = cg; ctx.fill();
      ctx.fillStyle = "#fff"; ctx.font = "bold 13px monospace";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(element.symbol, projCenter.sx, projCenter.sy);

      ctx.fillStyle = dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";
      ctx.font = "9px sans-serif"; ctx.textAlign = "right";
      ctx.fillText("drag to rotate · illustrative", W - 8, H - 6);
    }

    function loop() { timeRef.current += 0.016; draw(timeRef.current); animRef.current = requestAnimationFrame(loop); }
    loop();
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
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

// ─── Electron Orbital Visualizer ─────────────────────────────────────────────
function OrbitalDiagram({ element, dark }) {
  const orbitals = [];
  const config = element.electronConfig || "";
  const subshells = ["1s","2s","2p","3s","3p","3d","4s","4p","4d","4f","5s","5p","5d","5f","6s","6p","6d","7s","7p"];
  const totalElectrons = element.electrons;
  let remaining = totalElectrons;
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
          const boxes = [];
          let placed = 0;
          // Fill with arrows: ↑↓
          for (let b = 0; b < orb.boxes; b++) {
            let up = false, down = false;
            if (placed < orb.fill) { up = true; placed++; }
            if (placed < orb.fill && orb.fill > orb.boxes) { down = true; placed++; }
            else if (placed < orb.fill && orb.boxes <= orb.fill) {
              if (b < orb.fill - orb.boxes) { down = true; placed++; }
            }
            boxes.push({ up, down });
          }
          // Recalculate
          let p = 0;
          const recalcBoxes = [];
          for (let b = 0; b < orb.boxes; b++) {
            const up = p < orb.fill;
            if (up) p++;
            const down = up && orb.fill > orb.boxes && p < orb.fill;
            if (down) p++;
            recalcBoxes.push({ up, down: false });
          }
          // Hund's rule: fill all up first, then pair
          const hund = [];
          for (let b = 0; b < orb.boxes; b++) hund.push({ up: b < orb.fill, down: false });
          if (orb.fill > orb.boxes) for (let b = 0; b < orb.fill - orb.boxes; b++) hund[b].down = true;

          return (
            <div key={orb.name} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <span style={{ width: "24px", color: accent, fontWeight: 700 }}>{orb.name}</span>
              <div style={{ display: "flex", gap: "3px" }}>
                {hund.map((box, bi) => (
                  <div key={bi} style={{
                    width: "20px", height: "24px", border: `1px solid ${accent}55`,
                    borderRadius: "3px", display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", fontSize: "9px", lineHeight: 1,
                    background: dark ? "#ffffff08" : "#00000005",
                  }}>
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
    // Draw rainbow spectrum background
    for (let x = 0; x < W; x++) {
      const wl = 380 + (x / W) * 400;
      const r = wl < 440 ? (440 - wl) / 60 : wl > 645 ? (wl - 645) / 135 : wl > 510 ? 1 : (wl - 440) / 70;
      const g = wl < 490 ? 0 : wl < 580 ? (wl - 490) / 90 : wl < 645 ? 1 : (wl - 645) > 0 ? Math.max(0, 1 - (wl - 645) / 135) : 0;
      const b = wl < 440 ? 1 : wl < 510 ? (510 - wl) / 70 : 0;
      ctx.fillStyle = `rgba(${Math.floor(r * 255)},${Math.floor(g * 255)},${Math.floor(b * 255)},0.7)`;
      ctx.fillRect(x, 0, 1, H);
    }
    // Add dark overlay
    ctx.fillStyle = dark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.2)";
    ctx.fillRect(0, 0, W, H);
    // Generate spectral lines based on element properties (simulated)
    const lines = [];
    const seed = element.number;
    for (let i = 0; i < 8; i++) {
      const wl = 400 + ((seed * (i + 1) * 37) % 350);
      const intensity = 0.4 + (Math.sin(seed + i) * 0.5 + 0.5) * 0.6;
      lines.push({ wl, intensity });
    }
    lines.forEach(({ wl, intensity }) => {
      const x = ((wl - 380) / 400) * W;
      ctx.beginPath();
      ctx.moveTo(x, 0); ctx.lineTo(x, H);
      ctx.strokeStyle = `rgba(255,255,255,${intensity})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font = "8px monospace"; ctx.textAlign = "center";
      ctx.fillText(`${Math.round(wl)}nm`, x, H - 4);
    });
    ctx.fillStyle = dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.6)";
    ctx.font = "9px sans-serif"; ctx.textAlign = "left";
    ctx.fillText("380nm", 4, 12);
    ctx.textAlign = "right";
    ctx.fillText("780nm", W - 4, 12);
  }, [element, dark]);
  return (
    <div>
      <div style={{ fontSize: "12px", opacity: 0.5, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>Emission Spectrum (Simulated)</div>
      <canvas ref={canvasRef} width={320} height={60} style={{ width: "100%", borderRadius: "6px", display: "block" }} />
      <div style={{ fontSize: "10px", opacity: 0.4, marginTop: "4px" }}>Spectral lines are illustrative — based on element properties</div>
    </div>
  );
}

// ─── Reactivity Clock ─────────────────────────────────────────────────────────
function ReactivityGauge({ element, dark }) {
  const accent = (CATEGORY_COLORS[element.category] || {}).light || "#6bcb77";
  const eneg = element.electronegativity || 2;
  const ionE = element.ionizationEnergy || 10;
  const reactivity = Math.max(0, Math.min(100, ((4 - eneg) / 4 * 50) + ((25 - ionE) / 25 * 50)));
  const metallic = ["alkali metal","alkaline earth metal","transition metal","post-transition metal","lanthanide","actinide"].includes(element.category) ? 90 : 10;
  const stability = element.number > 82 ? 20 : element.category === "noble gas" ? 100 : Math.min(100, 50 + (element.number % 20) * 2);

  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const drawArc = (x, y, r, startA, endA, color, width) => {
      ctx.beginPath(); ctx.arc(x, y, r, startA, endA);
      ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineCap = "round"; ctx.stroke();
    };
    const metrics = [
      { label: "Reactivity", value: reactivity, color: "#ff6b6b" },
      { label: "Metallic", value: metallic, color: "#ffd93d" },
      { label: "Stability", value: stability, color: "#6bcb77" },
    ];
    const cx = W / 2, cy = H * 0.55;
    const startA = Math.PI * 0.75, totalA = Math.PI * 1.5;
    metrics.forEach((m, i) => {
      const r = 50 - i * 15;
      drawArc(cx, cy, r, startA, startA + totalA, dark ? "#ffffff12" : "#00000012", 10);
      drawArc(cx, cy, r, startA, startA + (m.value / 100) * totalA, m.color, 10);
      ctx.fillStyle = m.color; ctx.font = "9px sans-serif"; ctx.textAlign = "center";
      const labelAngle = startA + (m.value / 100) * totalA;
      const lx = cx + Math.cos(labelAngle) * (r + 14), ly = cy + Math.sin(labelAngle) * (r + 14);
      ctx.fillText(`${Math.round(m.value)}%`, lx, ly);
    });
    ctx.fillStyle = dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)";
    ctx.font = "bold 11px monospace"; ctx.textAlign = "center";
    ctx.fillText(metrics.map(m => m.label).join(" · "), cx, H - 8);
    metrics.forEach((m, i) => {
      const dotX = 30 + i * 80;
      ctx.beginPath(); ctx.arc(dotX, H - 20, 4, 0, Math.PI * 2);
      ctx.fillStyle = m.color; ctx.fill();
    });
  }, [element, dark]);

  return (
    <div>
      <div style={{ fontSize: "12px", opacity: 0.5, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>Chemical Character</div>
      <canvas ref={canvasRef} width={240} height={140} style={{ width: "100%", maxWidth: "240px", display: "block" }} />
    </div>
  );
}

// ─── Property Bar (existing) ───────────────────────────────────────────────
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
      Select 2–4 elements to compare.<br />Hold Shift + click an element.
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

// ─── Element Modal (enhanced) ─────────────────────────────────────────────────
function ElementModal({ element, onClose, dark }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [atomView, setAtomView] = useState("2d");
  const catColor = CATEGORY_COLORS[element.category] || { light: "#6bcb77", dark: "#4caf50" };
  const accent = dark ? catColor.dark : catColor.light;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const tabs = ["overview", "properties", "orbitals", "bonds", "spectrum", "history"];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: dark ? "rgba(0,0,0,0.88)" : "rgba(0,0,30,0.65)",
        backdropFilter: "blur(14px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "12px",
        animation: "fadeIn 0.25s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: "820px", maxHeight: "92vh",
          background: dark ? "#0a0a1a" : "#f8f8ff",
          borderRadius: "20px",
          border: `1px solid ${accent}44`,
          overflow: "hidden",
          display: "flex", flexDirection: "column",
          animation: "slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          boxShadow: `0 0 80px ${accent}22, 0 40px 100px rgba(0,0,0,0.6)`,
        }}
      >
        {/* Header */}
        <div style={{
          padding: "20px 24px 0",
          background: `linear-gradient(135deg, ${accent}22 0%, transparent 60%)`,
          borderBottom: `1px solid ${accent}33`,
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "14px", flexWrap: "wrap" }}>
            <div style={{
              width: "72px", height: "72px", borderRadius: "14px",
              background: `linear-gradient(135deg, ${accent}33, ${accent}11)`,
              border: `2px solid ${accent}66`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <div style={{ fontSize: "9px", opacity: 0.6 }}>{element.number}</div>
              <div style={{ fontSize: "28px", fontWeight: 700, lineHeight: 1, color: accent }}>{element.symbol}</div>
              <div style={{ fontSize: "8px", opacity: 0.5 }}>{element.mass.toFixed(2)}</div>
            </div>
            <div style={{ flex: 1, minWidth: "180px" }}>
              <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 700, color: dark ? "#fff" : "#111" }}>{element.name}</h2>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "6px" }}>
                <span style={{ fontSize: "11px", padding: "2px 9px", borderRadius: "20px", background: accent + "33", color: accent, fontWeight: 600 }}>{catColor.label}</span>
                <span style={{ fontSize: "11px", padding: "2px 9px", borderRadius: "20px", background: dark ? "#ffffff11" : "#00000011", color: dark ? "#aaa" : "#555" }}>Period {element.period} · Group {element.group}</span>
                <span style={{ fontSize: "11px", padding: "2px 9px", borderRadius: "20px", background: dark ? "#ffffff11" : "#00000011", color: dark ? "#aaa" : "#555" }}>{element.phase}</span>
              </div>
              <p style={{ margin: "8px 0 0", fontSize: "12px", opacity: 0.65, lineHeight: 1.5 }}>{element.description}</p>
            </div>
            <button onClick={onClose} style={{ width: "30px", height: "30px", borderRadius: "50%", background: dark ? "#ffffff15" : "#00000010", border: "none", cursor: "pointer", color: dark ? "#fff" : "#333", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>×</button>
          </div>
          {/* Tabs — horizontally scrollable on mobile */}
          <div style={{ display: "flex", gap: "2px", overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setActiveTab(t)} style={{
                padding: "7px 12px", fontSize: "11px", fontWeight: 600,
                border: "none", borderRadius: "8px 8px 0 0",
                cursor: "pointer", textTransform: "capitalize", whiteSpace: "nowrap",
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

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div>
              {/* Atom view toggle */}
              <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginBottom: "12px" }}>
                {["2d", "3d"].map(v => (
                  <button key={v} onClick={() => setAtomView(v)} style={{
                    padding: "5px 16px", borderRadius: "8px", fontSize: "12px", fontWeight: 600,
                    border: `1px solid ${atomView === v ? accent : (dark ? "#ffffff22" : "#00000022")}`,
                    background: atomView === v ? accent + "33" : "transparent",
                    color: atomView === v ? accent : (dark ? "#888" : "#666"),
                    cursor: "pointer",
                  }}>{v.toUpperCase()} Model</button>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
                <div>
                  {atomView === "2d" ? <AtomicAnimation element={element} dark={dark} /> : <Atom3D element={element} dark={dark} />}
                  <div style={{ marginTop: "14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                    {[
                      { l: "Protons", v: element.protons },
                      { l: "Neutrons", v: element.neutrons },
                      { l: "Electrons", v: element.electrons },
                      { l: "Valence e⁻", v: element.valence },
                    ].map(({ l, v }) => (
                      <div key={l} style={{ padding: "10px", borderRadius: "10px", background: dark ? "#ffffff08" : "#00000006", textAlign: "center" }}>
                        <div style={{ fontSize: "18px", fontWeight: 700, color: accent }}>{v}</div>
                        <div style={{ fontSize: "10px", opacity: 0.5 }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  {/* Electron shells visualization */}
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
                  {/* Uses */}
                  {element.uses && (
                    <div style={{ marginTop: "14px", padding: "12px", borderRadius: "10px", background: accent + "11", border: `1px solid ${accent}22` }}>
                      <div style={{ fontSize: "10px", opacity: 0.5, marginBottom: "5px", textTransform: "uppercase", letterSpacing: "1px" }}>Common Uses</div>
                      <div style={{ fontSize: "12px", lineHeight: 1.6 }}>{element.uses}</div>
                    </div>
                  )}
                </div>
              </div>
              {/* Reactivity gauge */}
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

          {/* PROPERTIES */}
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
                  <div style={{ position: "relative", height: "40px" }}>
                    <div style={{ position: "absolute", inset: "50% 0 0", height: "4px", background: `linear-gradient(to right, #4488ff, #ffaa00, #ff4444)`, borderRadius: "2px", transform: "translateY(-50%)" }} />
                    {["Solid", "Liquid", "Gas"].map((p, i) => (
                      <div key={p} style={{ position: "absolute", left: `${i * 50}%`, textAlign: "center", transform: "translateX(-50%)" }}>
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: ["#4488ff", "#ffaa00", "#ff4444"][i], border: "2px solid white", margin: "0 auto 4px" }} />
                        <div style={{ fontSize: "9px", opacity: 0.5 }}>{p}</div>
                      </div>
                    ))}
                  </div>
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
                    {[
                      { label: "Conductivity", value: element.conductivity, icon: "⚡" },
                      { label: "Magnetism", value: element.magnetism, icon: "🧲" },
                    ].map(({ label, value, icon }) => (
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
                  {[
                    ["Atomic Number", element.number],
                    ["Atomic Mass", `${element.mass} u`],
                    ["Period", element.period],
                    ["Group", element.group],
                    ["Valence Electrons", element.valence],
                    ["Electron Config", element.electronConfig],
                    ["Crystal Structure", element.crystalStructure],
                    ["Earth Abundance", element.abundance],
                    ["Oxidation States", element.oxidationStates],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", padding: "5px 0", borderBottom: `1px solid ${dark ? "#ffffff06" : "#00000006"}` }}>
                      <span style={{ opacity: 0.55 }}>{k}</span>
                      <span style={{ fontWeight: 500 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ORBITALS (new tab) */}
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
                  <div key={q.n} style={{ padding: "12px", borderRadius: "10px", marginBottom: "8px", background: dark ? "#ffffff06" : "#00000004", border: `1px solid ${(CATEGORY_COLORS[element.category] || {}).light || "#6bcb77"}22` }}>
                    <div style={{ fontWeight: 600, fontSize: "13px", color: (CATEGORY_COLORS[element.category] || {}).light || "#6bcb77" }}>{q.n} = {q.v}</div>
                    <div style={{ fontSize: "11px", opacity: 0.5, marginTop: "3px" }}>{q.desc}</div>
                  </div>
                ))}
                <div style={{ marginTop: "16px", padding: "14px", borderRadius: "12px", background: dark ? "#ffffff06" : "#00000004" }}>
                  <div style={{ fontSize: "11px", opacity: 0.4, marginBottom: "8px" }}>AUFBAU PRINCIPLE</div>
                  <div style={{ fontSize: "12px", lineHeight: 1.7, opacity: 0.7 }}>
                    Electrons fill orbitals from lowest to highest energy. Hund's rule: one electron per orbital before pairing. Pauli exclusion: no two electrons share all four quantum numbers.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BONDS (enhanced with 3D) */}
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
                      { type: "Metallic Bond", strength: "70-850 kJ/mol", desc: "Delocalized electrons in metal lattice", possible: ["alkali metal", "alkaline earth metal", "transition metal", "post-transition metal"].includes(element.category), color: "#ffd93d" },
                      { type: "Hydrogen Bond", strength: "5-30 kJ/mol", desc: "Weak electrostatic attraction to H", possible: ["N", "O", "F"].includes(element.symbol), color: "#c77dff" },
                      { type: "Van der Waals", strength: "0.5-10 kJ/mol", desc: "Weak temporary dipole forces", possible: true, color: "#6bcb77" },
                      { type: "Coordinate Bond", strength: "200-500 kJ/mol", desc: "Lone pair donation from one atom", possible: element.valence >= 1, color: "#ff9f1c" },
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
              <div style={{ padding: "16px", borderRadius: "14px", background: dark ? "#ffffff06" : "#00000004", border: `1px solid ${accent}22` }}>
                <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "12px", opacity: 0.5 }}>BOND STRENGTH COMPARISON</div>
                {[
                  { label: "Triple Bond (C≡C)", value: 835, max: 1000 },
                  { label: "Double Bond (C=C)", value: 614, max: 1000 },
                  { label: "Single Bond (C-C)", value: 347, max: 1000 },
                  { label: "Ionic (NaCl)", value: 411, max: 1000 },
                  { label: "Hydrogen (H₂O)", value: 18, max: 1000 },
                ].map(({ label, value, max }) => (
                  <PropertyBar key={label} label={label} value={value} max={max} unit=" kJ/mol" color={accent} />
                ))}
              </div>
            </div>
          )}

          {/* SPECTRUM (new tab) */}
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
              <div style={{ marginTop: "20px", padding: "16px", borderRadius: "12px", background: dark ? "#ffffff06" : "#00000004" }}>
                <div style={{ fontSize: "11px", opacity: 0.4, marginBottom: "8px" }}>ABOUT EMISSION SPECTRA</div>
                <div style={{ fontSize: "12px", lineHeight: 1.7, opacity: 0.7 }}>
                  When electrons jump between energy levels, they emit or absorb photons of specific wavelengths — creating unique spectral "fingerprints." Every element's spectrum is unique, which is how astronomers determine the composition of stars millions of light-years away.
                </div>
              </div>
            </div>
          )}

          {/* HISTORY (existing) */}
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
              <div style={{ position: "relative", paddingLeft: "22px", borderLeft: `2px solid ${accent}33` }}>
                {[
                  { year: element.discovered < 0 ? `${Math.abs(element.discovered)} BC` : element.discovered, event: `${element.name} first discovered by ${element.discoveredBy}` },
                  { year: "1869", event: `Placed in Mendeleev's periodic table (Group ${element.group})` },
                  { year: "1913", event: `Atomic number ${element.number} confirmed by Moseley's X-ray experiments` },
                  { year: "1932", event: `Isotopes and neutron count (${element.neutrons}n) established by Chadwick's discovery` },
                  { year: "Today", event: `Critical applications: ${element.conductivity === "excellent" ? "high-performance conductors" : element.category === "noble gas" ? "inert gas applications" : "industrial and chemical uses"}` },
                ].map(({ year, event }) => (
                  <div key={year} style={{ marginBottom: "18px", position: "relative" }}>
                    <div style={{ position: "absolute", left: "-27px", width: "10px", height: "10px", borderRadius: "50%", background: accent, top: "4px" }} />
                    <div style={{ fontSize: "11px", fontWeight: 700, color: accent, marginBottom: "3px" }}>{year}</div>
                    <div style={{ fontSize: "12px", opacity: 0.7 }}>{event}</div>
                  </div>
                ))}
              </div>
              {element.funFact && (
                <div style={{ marginTop: "20px", padding: "14px", borderRadius: "12px", background: accent + "11", border: `1px solid ${accent}33` }}>
                  <div style={{ fontSize: "10px", opacity: 0.5, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>Fun Fact</div>
                  <div style={{ fontSize: "12px", lineHeight: 1.7 }}>{element.funFact}</div>
                </div>
              )}
              <div style={{ marginTop: "16px", padding: "14px", borderRadius: "12px", background: dark ? "#ffffff06" : "#00000004" }}>
                <div style={{ fontSize: "10px", opacity: 0.5, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>Symbol Origin</div>
                <div style={{ fontSize: "12px", lineHeight: 1.7 }}>
                  {element.symbol !== element.name.slice(0, element.symbol.length)
                    ? `The symbol "${element.symbol}" comes from its ${element.discoveredBy.includes("Ancient") ? "ancient name" : "Latin or Greek name"}, not directly from "${element.name}".`
                    : `The symbol "${element.symbol}" is derived directly from the element's name.`}
                  {" "}This element has {element.shells?.length || 1} electron shell{(element.shells?.length || 1) > 1 ? "s" : ""} with the configuration {element.electronConfig}.
                </div>
              </div>
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
  return (
    <div
      onClick={() => onClick(element)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer", borderRadius: "8px", padding: "4px 3px",
        background: inCompare ? color + "44" : hovered ? color + "33" : highlight ? color + "25" : dimmed ? (dark ? "#ffffff05" : "#00000005") : (dark ? "#ffffff0a" : "#00000008"),
        border: `1px solid ${highlight || hovered || inCompare ? color + "88" : (dark ? "#ffffff10" : "#00000010")}`,
        transform: hovered ? "scale(1.08) translateY(-2px)" : "scale(1)",
        transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
        opacity: dimmed ? 0.3 : 1,
        display: "flex", flexDirection: "column", alignItems: "center",
        minWidth: 0, boxShadow: inCompare ? `0 0 10px ${color}55` : hovered ? `0 4px 20px ${color}44` : "none",
        userSelect: "none", outline: inCompare ? `2px solid ${color}` : "none",
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
  const [quizMode, setQuizMode] = useState(false);
  const [quizEl, setQuizEl] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizResult, setQuizResult] = useState(null);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });

  const matchesSearch = useCallback((el) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return el.name.toLowerCase().includes(s) || el.symbol.toLowerCase().includes(s) || String(el.number).includes(s) || el.category.toLowerCase().includes(s);
  }, [search]);

  const isHighlighted = useCallback((el) => {
    return (groupFilter === "all" || el.category === groupFilter) && matchesSearch(el);
  }, [groupFilter, matchesSearch]);

  const anyFilter = search || groupFilter !== "all";

  const handleElementClick = (el, e) => {
    if (compareMode) {
      setCompareList(prev => {
        if (prev.find(x => x.number === el.number)) return prev.filter(x => x.number !== el.number);
        if (prev.length >= 4) return prev;
        return [...prev, el];
      });
      return;
    }
    if (quizMode) return;
    setSelected(el);
  };

  const startQuiz = () => {
    const idx = Math.floor(Math.random() * ELEMENTS.length);
    setQuizEl(ELEMENTS[idx]);
    setQuizAnswer("");
    setQuizResult(null);
    setQuizMode(true);
  };
  const checkQuiz = () => {
    if (!quizEl) return;
    const correct = quizAnswer.trim().toLowerCase() === quizEl.symbol.toLowerCase() || quizAnswer.trim().toLowerCase() === quizEl.name.toLowerCase();
    setQuizResult(correct ? "correct" : "wrong");
    setQuizScore(prev => ({ correct: prev.correct + (correct ? 1 : 0), total: prev.total + 1 }));
  };
  const nextQuiz = () => startQuiz();

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
        * { box-sizing: border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:5px; height:5px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(128,128,200,0.3); border-radius:3px; }
        input { outline:none; }
        .quiz-input { width:100%; padding:10px 14px; border-radius:10px; background:transparent; border:1px solid rgba(255,255,255,0.2); color:inherit; font-size:16px; }
      `}</style>

      {/* Header */}
      <header style={{ padding: "16px 16px 12px", borderBottom: `1px solid ${border}`, background: surface }}>
        {/* Title — always centered */}
        <div style={{ textAlign: "center", marginBottom: "14px" }}>
          <h1 style={{
            fontSize: "clamp(28px, 6vw, 52px)", fontWeight: 900,
            letterSpacing: "-2px",
            background: "linear-gradient(135deg, #a78bfa, #f472b6, #fb923c, #facc15)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "glow 3s ease-in-out infinite",
            fontFamily: "'Georgia', serif",
            display: "inline-block",
          }}>ELEMENTOS</h1>
          <div style={{ fontSize: "11px", opacity: 0.35, letterSpacing: "4px", textTransform: "uppercase", marginTop: "2px" }}>
            Interactive Element Explorer · {ELEMENTS.length} of 118 Elements
          </div>
        </div>

        {/* Search bar — full width */}
        <div style={{ position: "relative", marginBottom: "12px" }}>
          <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", opacity: 0.4, fontSize: "16px", pointerEvents: "none" }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, symbol, number, or category…"
            style={{
              width: "100%", padding: "11px 14px 11px 42px",
              borderRadius: "12px", border: `1px solid ${border}`,
              background: dark ? "#ffffff0a" : "#00000008",
              color: text, fontSize: "14px",
            }}
          />
          {search && (
            <button onClick={() => setSearch("")} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: text, cursor: "pointer", opacity: 0.5, fontSize: "18px" }}>×</button>
          )}
        </div>

        {/* Controls row */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            <button onClick={() => setDark(d => !d)} style={{ padding: "6px 12px", borderRadius: "8px", border: `1px solid ${border}`, background: dark ? "#ffffff15" : "#00000010", color: text, cursor: "pointer", fontSize: "12px", fontWeight: 600 }}>
              {dark ? "☀️ Light" : "🌙 Dark"}
            </button>
            <button
              onClick={() => { setCompareMode(m => !m); if (compareMode) setCompareList([]); }}
              style={{ padding: "6px 12px", borderRadius: "8px", border: `1px solid ${compareMode ? "#4d96ff88" : border}`, background: compareMode ? "#4d96ff22" : "transparent", color: compareMode ? "#4d96ff" : text, cursor: "pointer", fontSize: "12px", fontWeight: 600 }}
            >⚖ {compareMode ? `Compare (${compareList.length}/4)` : "Compare"}</button>
            {compareMode && compareList.length >= 2 && (
              <button onClick={() => setShowCompare(true)} style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid #6bcb7788", background: "#6bcb7722", color: "#6bcb77", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}>View Comparison →</button>
            )}
            <button onClick={quizMode ? () => setQuizMode(false) : startQuiz} style={{ padding: "6px 12px", borderRadius: "8px", border: `1px solid ${quizMode ? "#ffd93d88" : border}`, background: quizMode ? "#ffd93d22" : "transparent", color: quizMode ? "#ffd93d" : text, cursor: "pointer", fontSize: "12px", fontWeight: 600 }}>
              {quizMode ? "✕ Exit Quiz" : "🎓 Quiz"}
            </button>
          </div>
          {quizMode && quizScore.total > 0 && (
            <div style={{ fontSize: "12px", opacity: 0.7 }}>
              Score: <strong>{quizScore.correct}/{quizScore.total}</strong> ({Math.round((quizScore.correct / quizScore.total) * 100)}%)
            </div>
          )}
        </div>

        {/* Quiz panel */}
        {quizMode && quizEl && (
          <div style={{ marginTop: "12px", padding: "16px", borderRadius: "14px", background: dark ? "#1a1a2e" : "#e8e8ff", border: "1px solid #ffd93d44" }}>
            <div style={{ fontSize: "12px", opacity: 0.5, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>Element Quiz</div>
            <div style={{ fontSize: "15px", marginBottom: "10px" }}>
              What is the element with atomic number <strong style={{ color: "#ffd93d" }}>{quizEl.number}</strong>?
              <span style={{ opacity: 0.5, fontSize: "12px" }}> (symbol or name)</span>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
              <input
                className="quiz-input"
                value={quizAnswer}
                onChange={e => setQuizAnswer(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !quizResult && checkQuiz()}
                placeholder="Type symbol or name…"
                style={{ flex: 1, minWidth: "160px" }}
                disabled={!!quizResult}
              />
              {!quizResult
                ? <button onClick={checkQuiz} style={{ padding: "10px 16px", borderRadius: "10px", background: "#ffd93d33", border: "1px solid #ffd93d66", color: "#ffd93d", cursor: "pointer", fontWeight: 700, whiteSpace: "nowrap" }}>Check</button>
                : <button onClick={nextQuiz} style={{ padding: "10px 16px", borderRadius: "10px", background: "#6bcb7733", border: "1px solid #6bcb7766", color: "#6bcb77", cursor: "pointer", fontWeight: 700, whiteSpace: "nowrap" }}>Next →</button>
              }
            </div>
            {quizResult && (
              <div style={{ marginTop: "10px", padding: "10px", borderRadius: "8px", background: quizResult === "correct" ? "#6bcb7722" : "#ff6b6b22", border: `1px solid ${quizResult === "correct" ? "#6bcb7755" : "#ff6b6b55"}`, fontSize: "13px" }}>
                {quizResult === "correct" ? "✅ Correct!" : `❌ The answer was ${quizEl.symbol} — ${quizEl.name}`}
              </div>
            )}
          </div>
        )}

        {/* Group filter pills */}
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginTop: "12px" }}>
          {GROUPS_FILTER.map(g => {
            const catColor = CATEGORY_COLORS[g.id];
            const active = groupFilter === g.id;
            const c = catColor ? (dark ? catColor.dark : catColor.light) : (dark ? "#8888ff" : "#5555cc");
            return (
              <button key={g.id} onClick={() => setGroupFilter(active ? "all" : g.id)} style={{
                padding: "4px 10px", borderRadius: "20px", fontSize: "10px", fontWeight: 600,
                cursor: "pointer", border: `1px solid ${active ? c : (dark ? "#ffffff15" : "#00000015")}`,
                background: active ? c + "33" : "transparent", color: active ? c : (dark ? "#aaa" : "#666"),
                transition: "all 0.2s", transform: active ? "scale(1.05)" : "scale(1)",
              }}>{g.label}</button>
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

      {/* Compare mode banner */}
{compareMode && (
  <div
    style={{
      padding: "8px 16px",
      background: "#4d96ff22",
      borderBottom: "1px solid #4d96ff44",
      fontSize: "12px",
      color: "#4d96ff",
      textAlign: "center",
    }}
  >
    ⚖ Compare Mode — click elements to add/remove (max 4).{" "}
    {compareList.length >= 2 && (
      <>Click <strong>View Comparison →</strong> to see side-by-side.</>
    )}
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
                return (
                  <ElementCard key={el.number} element={el} highlight={high && anyFilter} dimmed={dim} onClick={handleElementClick} dark={dark} inCompare={inCmp} />
                );
              })
            )}
          </div>

          {/* Stats bar */}
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

          {/* Comparison modal */}
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

      {/* Sticky footer */}
      <footer style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        padding: "10px 20px",
        background: dark ? "rgba(8,8,26,0.96)" : "rgba(240,240,248,0.96)",
        borderTop: `1px solid ${border}`,
        textAlign: "center",
        backdropFilter: "blur(12px)",
        zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
      }}>
        <span style={{ fontSize: "12px", opacity: 0.45 }}>Built by</span>
        <span style={{ fontSize: "13px", fontWeight: 800, background: "linear-gradient(135deg,#a78bfa,#f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "0.5px" }}>Joseph · Akhil</span>
        <span style={{ fontSize: "11px", opacity: 0.25 }}>· ELEMENTOS · {new Date().getFullYear()}</span>
      </footer>

      {/* Element Modal */}
      {selected && <ElementModal element={selected} onClose={() => setSelected(null)} dark={dark} />}
    </div>
  );
}