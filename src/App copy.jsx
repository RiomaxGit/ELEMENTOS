import { useState, useEffect, useRef, useCallback } from "react";

const ELEMENTS = [
  { number: 1, symbol: "H", name: "Hydrogen", mass: 1.008, group: 1, period: 1, category: "nonmetal", electronegativity: 2.20, radius: 53, meltingPoint: -259.16, boilingPoint: -252.88, density: 0.00009, oxidationStates: "+1, -1", electronConfig: "1s¹", discovered: 1766, discoveredBy: "Henry Cavendish", phase: "Gas", ionizationEnergy: 13.598, electronAffinity: 0.754, valence: 1, abundance: "0.15%", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "hexagonal", protons: 1, neutrons: 0, electrons: 1, shells: [1], xpos: 1, ypos: 1, description: "The lightest and most abundant element in the universe, forming stars and water." },
  { number: 2, symbol: "He", name: "Helium", mass: 4.003, group: 18, period: 1, category: "noble gas", electronegativity: null, radius: 31, meltingPoint: -272.2, boilingPoint: -268.93, density: 0.000179, oxidationStates: "0", electronConfig: "1s²", discovered: 1868, discoveredBy: "Pierre Janssen", phase: "Gas", ionizationEnergy: 24.587, electronAffinity: 0, valence: 0, abundance: "24%", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "hexagonal", protons: 2, neutrons: 2, electrons: 2, shells: [2], xpos: 18, ypos: 1, description: "Second most abundant element in the universe. Used in balloons and MRI machines." },
  { number: 3, symbol: "Li", name: "Lithium", mass: 6.941, group: 1, period: 2, category: "alkali metal", electronegativity: 0.98, radius: 167, meltingPoint: 180.54, boilingPoint: 1342, density: 0.534, oxidationStates: "+1", electronConfig: "[He] 2s¹", discovered: 1817, discoveredBy: "Johan August Arfwedson", phase: "Solid", ionizationEnergy: 5.392, electronAffinity: 0.618, valence: 1, abundance: "0.002%", hardness: 0.6, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "bcc", protons: 3, neutrons: 4, electrons: 3, shells: [2, 1], xpos: 1, ypos: 2, description: "Lightest metal, crucial for lithium-ion batteries and psychiatric medication." },
  { number: 4, symbol: "Be", name: "Beryllium", mass: 9.012, group: 2, period: 2, category: "alkaline earth metal", electronegativity: 1.57, radius: 112, meltingPoint: 1287, boilingPoint: 2469, density: 1.85, oxidationStates: "+2", electronConfig: "[He] 2s²", discovered: 1798, discoveredBy: "Louis Nicolas Vauquelin", phase: "Solid", ionizationEnergy: 9.323, electronAffinity: 0, valence: 2, abundance: "0.00019%", hardness: 5.5, conductivity: "good", magnetism: "diamagnetic", crystalStructure: "hcp", protons: 4, neutrons: 5, electrons: 4, shells: [2, 2], xpos: 2, ypos: 2, description: "Lightweight, stiff metal used in aerospace and X-ray windows. Highly toxic." },
  { number: 5, symbol: "B", name: "Boron", mass: 10.81, group: 13, period: 2, category: "metalloid", electronegativity: 2.04, radius: 87, meltingPoint: 2075, boilingPoint: 4000, density: 2.34, oxidationStates: "+3", electronConfig: "[He] 2s² 2p¹", discovered: 1808, discoveredBy: "Humphry Davy", phase: "Solid", ionizationEnergy: 8.298, electronAffinity: 0.277, valence: 3, abundance: "0.00086%", hardness: 9.3, conductivity: "semiconductor", magnetism: "diamagnetic", crystalStructure: "rhombohedral", protons: 5, neutrons: 6, electrons: 5, shells: [2, 3], xpos: 13, ypos: 2, description: "Hard metalloid used in glass, ceramics, and as a semiconductor dopant." },
  { number: 6, symbol: "C", name: "Carbon", mass: 12.011, group: 14, period: 2, category: "nonmetal", electronegativity: 2.55, radius: 67, meltingPoint: 3550, boilingPoint: 4027, density: 2.267, oxidationStates: "+4, +2, -4", electronConfig: "[He] 2s² 2p²", discovered: -3750, discoveredBy: "Ancient peoples", phase: "Solid", ionizationEnergy: 11.26, electronAffinity: 1.263, valence: 4, abundance: "0.18%", hardness: 10, conductivity: "varies", magnetism: "diamagnetic", crystalStructure: "diamond cubic", protons: 6, neutrons: 6, electrons: 6, shells: [2, 4], xpos: 14, ypos: 2, description: "Basis of all known life, exists as diamond and graphite. Essential for organic chemistry." },
  { number: 7, symbol: "N", name: "Nitrogen", mass: 14.007, group: 15, period: 2, category: "nonmetal", electronegativity: 3.04, radius: 56, meltingPoint: -210.0, boilingPoint: -195.79, density: 0.00125, oxidationStates: "+5,+4,+3,+2,-3", electronConfig: "[He] 2s² 2p³", discovered: 1772, discoveredBy: "Daniel Rutherford", phase: "Gas", ionizationEnergy: 14.534, electronAffinity: 0, valence: 3, abundance: "78%", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "hexagonal", protons: 7, neutrons: 7, electrons: 7, shells: [2, 5], xpos: 15, ypos: 2, description: "Makes up 78% of Earth's atmosphere. Essential for proteins, DNA, and fertilizers." },
  { number: 8, symbol: "O", name: "Oxygen", mass: 15.999, group: 16, period: 2, category: "nonmetal", electronegativity: 3.44, radius: 48, meltingPoint: -218.79, boilingPoint: -182.96, density: 0.00143, oxidationStates: "-2, -1", electronConfig: "[He] 2s² 2p⁴", discovered: 1774, discoveredBy: "Carl Wilhelm Scheele", phase: "Gas", ionizationEnergy: 13.618, electronAffinity: 1.461, valence: 2, abundance: "21%", hardness: null, conductivity: "poor", magnetism: "paramagnetic", crystalStructure: "cubic", protons: 8, neutrons: 8, electrons: 8, shells: [2, 6], xpos: 16, ypos: 2, description: "Essential for respiration. Makes up 21% of atmosphere and 65% of the human body." },
  { number: 9, symbol: "F", name: "Fluorine", mass: 18.998, group: 17, period: 2, category: "halogen", electronegativity: 3.98, radius: 42, meltingPoint: -219.67, boilingPoint: -188.12, density: 0.0017, oxidationStates: "-1", electronConfig: "[He] 2s² 2p⁵", discovered: 1886, discoveredBy: "Henri Moissan", phase: "Gas", ionizationEnergy: 17.423, electronAffinity: 3.401, valence: 1, abundance: "0.054%", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "cubic", protons: 9, neutrons: 10, electrons: 9, shells: [2, 7], xpos: 17, ypos: 2, description: "Most electronegative element, extremely reactive. Used in toothpaste and Teflon." },
  { number: 10, symbol: "Ne", name: "Neon", mass: 20.18, group: 18, period: 2, category: "noble gas", electronegativity: null, radius: 38, meltingPoint: -248.59, boilingPoint: -246.05, density: 0.0009, oxidationStates: "0", electronConfig: "[He] 2s² 2p⁶", discovered: 1898, discoveredBy: "William Ramsay", phase: "Gas", ionizationEnergy: 21.565, electronAffinity: 0, valence: 0, abundance: "0.0018%", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "fcc", protons: 10, neutrons: 10, electrons: 10, shells: [2, 8], xpos: 18, ypos: 2, description: "Noble gas famous for its brilliant orange-red glow in neon signs." },
  { number: 11, symbol: "Na", name: "Sodium", mass: 22.99, group: 1, period: 3, category: "alkali metal", electronegativity: 0.93, radius: 190, meltingPoint: 97.79, boilingPoint: 882.8, density: 0.968, oxidationStates: "+1", electronConfig: "[Ne] 3s¹", discovered: 1807, discoveredBy: "Humphry Davy", phase: "Solid", ionizationEnergy: 5.139, electronAffinity: 0.548, valence: 1, abundance: "2.36%", hardness: 0.5, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "bcc", protons: 11, neutrons: 12, electrons: 11, shells: [2, 8, 1], xpos: 1, ypos: 3, description: "Soft, reactive metal. Component of table salt (NaCl) and essential for nerve function." },
  { number: 12, symbol: "Mg", name: "Magnesium", mass: 24.305, group: 2, period: 3, category: "alkaline earth metal", electronegativity: 1.31, radius: 160, meltingPoint: 650, boilingPoint: 1090, density: 1.738, oxidationStates: "+2", electronConfig: "[Ne] 3s²", discovered: 1755, discoveredBy: "Joseph Black", phase: "Solid", ionizationEnergy: 7.646, electronAffinity: 0, valence: 2, abundance: "2.33%", hardness: 2.5, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 12, neutrons: 12, electrons: 12, shells: [2, 8, 2], xpos: 2, ypos: 3, description: "Light structural metal essential for chlorophyll and hundreds of enzymes in the body." },
  { number: 13, symbol: "Al", name: "Aluminium", mass: 26.982, group: 13, period: 3, category: "post-transition metal", electronegativity: 1.61, radius: 143, meltingPoint: 660.32, boilingPoint: 2519, density: 2.698, oxidationStates: "+3", electronConfig: "[Ne] 3s² 3p¹", discovered: 1825, discoveredBy: "Hans Christian Ørsted", phase: "Solid", ionizationEnergy: 5.986, electronAffinity: 0.441, valence: 3, abundance: "8.23%", hardness: 2.75, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "fcc", protons: 13, neutrons: 14, electrons: 13, shells: [2, 8, 3], xpos: 13, ypos: 3, description: "Third most abundant element, lightweight and corrosion-resistant. Widely used in packaging and transport." },
  { number: 14, symbol: "Si", name: "Silicon", mass: 28.085, group: 14, period: 3, category: "metalloid", electronegativity: 1.90, radius: 111, meltingPoint: 1414, boilingPoint: 3265, density: 2.329, oxidationStates: "+4, +2, -4", electronConfig: "[Ne] 3s² 3p²", discovered: 1824, discoveredBy: "Jöns Jacob Berzelius", phase: "Solid", ionizationEnergy: 8.152, electronAffinity: 1.385, valence: 4, abundance: "28.2%", hardness: 6.5, conductivity: "semiconductor", magnetism: "diamagnetic", crystalStructure: "diamond cubic", protons: 14, neutrons: 14, electrons: 14, shells: [2, 8, 4], xpos: 14, ypos: 3, description: "Basis of modern electronics and computer chips. Second most abundant element in Earth's crust." },
  { number: 15, symbol: "P", name: "Phosphorus", mass: 30.974, group: 15, period: 3, category: "nonmetal", electronegativity: 2.19, radius: 98, meltingPoint: 44.15, boilingPoint: 280.5, density: 1.82, oxidationStates: "+5, +3, -3", electronConfig: "[Ne] 3s² 3p³", discovered: 1669, discoveredBy: "Hennig Brand", phase: "Solid", ionizationEnergy: 10.487, electronAffinity: 0.747, valence: 3, abundance: "0.099%", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "cubic", protons: 15, neutrons: 16, electrons: 15, shells: [2, 8, 5], xpos: 15, ypos: 3, description: "Essential for DNA, RNA, and ATP. Found in bones and teeth. Used in fertilizers." },
  { number: 16, symbol: "S", name: "Sulfur", mass: 32.06, group: 16, period: 3, category: "nonmetal", electronegativity: 2.58, radius: 88, meltingPoint: 115.21, boilingPoint: 444.72, density: 2.067, oxidationStates: "+6, +4, -2", electronConfig: "[Ne] 3s² 3p⁴", discovered: -2000, discoveredBy: "Ancient peoples", phase: "Solid", ionizationEnergy: 10.36, electronAffinity: 2.077, valence: 2, abundance: "0.042%", hardness: 2.0, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "orthorhombic", protons: 16, neutrons: 16, electrons: 16, shells: [2, 8, 6], xpos: 16, ypos: 3, description: "Yellow nonmetal essential for proteins. Used in gunpowder, rubber vulcanization, and fertilizers." },
  { number: 17, symbol: "Cl", name: "Chlorine", mass: 35.45, group: 17, period: 3, category: "halogen", electronegativity: 3.16, radius: 79, meltingPoint: -101.5, boilingPoint: -34.04, density: 0.00321, oxidationStates: "+7,+5,+3,+1,-1", electronConfig: "[Ne] 3s² 3p⁵", discovered: 1774, discoveredBy: "Carl Wilhelm Scheele", phase: "Gas", ionizationEnergy: 12.968, electronAffinity: 3.613, valence: 1, abundance: "0.017%", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "orthorhombic", protons: 17, neutrons: 18, electrons: 17, shells: [2, 8, 7], xpos: 17, ypos: 3, description: "Toxic yellow-green gas used to disinfect water and produce PVC and bleach." },
  { number: 18, symbol: "Ar", name: "Argon", mass: 39.948, group: 18, period: 3, category: "noble gas", electronegativity: null, radius: 71, meltingPoint: -189.36, boilingPoint: -185.85, density: 0.00178, oxidationStates: "0", electronConfig: "[Ne] 3s² 3p⁶", discovered: 1894, discoveredBy: "Lord Rayleigh", phase: "Gas", ionizationEnergy: 15.76, electronAffinity: 0, valence: 0, abundance: "0.93%", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "fcc", protons: 18, neutrons: 22, electrons: 18, shells: [2, 8, 8], xpos: 18, ypos: 3, description: "Third most abundant gas in air. Used in light bulbs, welding, and as an inert shield." },
  { number: 19, symbol: "K", name: "Potassium", mass: 39.098, group: 1, period: 4, category: "alkali metal", electronegativity: 0.82, radius: 243, meltingPoint: 63.38, boilingPoint: 759, density: 0.862, oxidationStates: "+1", electronConfig: "[Ar] 4s¹", discovered: 1807, discoveredBy: "Humphry Davy", phase: "Solid", ionizationEnergy: 4.341, electronAffinity: 0.501, valence: 1, abundance: "2.09%", hardness: 0.4, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "bcc", protons: 19, neutrons: 20, electrons: 19, shells: [2, 8, 8, 1], xpos: 1, ypos: 4, description: "Essential electrolyte for nerve and muscle function. Vital for plant growth and nutrition." },
  { number: 20, symbol: "Ca", name: "Calcium", mass: 40.078, group: 2, period: 4, category: "alkaline earth metal", electronegativity: 1.00, radius: 194, meltingPoint: 842, boilingPoint: 1484, density: 1.55, oxidationStates: "+2", electronConfig: "[Ar] 4s²", discovered: 1808, discoveredBy: "Humphry Davy", phase: "Solid", ionizationEnergy: 6.113, electronAffinity: 0.018, valence: 2, abundance: "4.15%", hardness: 1.75, conductivity: "good", magnetism: "diamagnetic", crystalStructure: "fcc", protons: 20, neutrons: 20, electrons: 20, shells: [2, 8, 8, 2], xpos: 2, ypos: 4, description: "Essential for bones, teeth, and muscle function. Most abundant metal in the human body." },
  { number: 21, symbol: "Sc", name: "Scandium", mass: 44.956, group: 3, period: 4, category: "transition metal", electronegativity: 1.36, radius: 184, meltingPoint: 1541, boilingPoint: 2830, density: 2.985, oxidationStates: "+3", electronConfig: "[Ar] 3d¹ 4s²", discovered: 1879, discoveredBy: "Lars Fredrik Nilson", phase: "Solid", ionizationEnergy: 6.561, electronAffinity: 0.188, valence: 3, abundance: "0.0022%", hardness: null, conductivity: "moderate", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 21, neutrons: 24, electrons: 21, shells: [2, 8, 9, 2], xpos: 3, ypos: 4, description: "Rare lightweight metal used in aerospace alloys and sports equipment." },
  { number: 22, symbol: "Ti", name: "Titanium", mass: 47.867, group: 4, period: 4, category: "transition metal", electronegativity: 1.54, radius: 176, meltingPoint: 1668, boilingPoint: 3287, density: 4.507, oxidationStates: "+4, +3, +2", electronConfig: "[Ar] 3d² 4s²", discovered: 1791, discoveredBy: "William Gregor", phase: "Solid", ionizationEnergy: 6.828, electronAffinity: 0.079, valence: 4, abundance: "0.565%", hardness: 6.0, conductivity: "moderate", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 22, neutrons: 26, electrons: 22, shells: [2, 8, 10, 2], xpos: 4, ypos: 4, description: "Lightweight, strong metal with excellent corrosion resistance. Used in implants and aerospace." },
  { number: 23, symbol: "V", name: "Vanadium", mass: 50.942, group: 5, period: 4, category: "transition metal", electronegativity: 1.63, radius: 171, meltingPoint: 1910, boilingPoint: 3407, density: 6.11, oxidationStates: "+5,+4,+3,+2", electronConfig: "[Ar] 3d³ 4s²", discovered: 1801, discoveredBy: "Andrés Manuel del Río", phase: "Solid", ionizationEnergy: 6.746, electronAffinity: 0.525, valence: 5, abundance: "0.019%", hardness: 7.0, conductivity: "moderate", magnetism: "paramagnetic", crystalStructure: "bcc", protons: 23, neutrons: 28, electrons: 23, shells: [2, 8, 11, 2], xpos: 5, ypos: 4, description: "Hard metal used in steel alloys and as a catalyst. Found in some crude oils." },
  { number: 24, symbol: "Cr", name: "Chromium", mass: 51.996, group: 6, period: 4, category: "transition metal", electronegativity: 1.66, radius: 166, meltingPoint: 1907, boilingPoint: 2671, density: 7.15, oxidationStates: "+6,+3,+2", electronConfig: "[Ar] 3d⁵ 4s¹", discovered: 1798, discoveredBy: "Louis Nicolas Vauquelin", phase: "Solid", ionizationEnergy: 6.767, electronAffinity: 0.666, valence: 3, abundance: "0.014%", hardness: 8.5, conductivity: "good", magnetism: "antiferromagnetic", crystalStructure: "bcc", protons: 24, neutrons: 28, electrons: 24, shells: [2, 8, 13, 1], xpos: 6, ypos: 4, description: "Lustrous, hard metal used to make stainless steel and chrome plating." },
  { number: 25, symbol: "Mn", name: "Manganese", mass: 54.938, group: 7, period: 4, category: "transition metal", electronegativity: 1.55, radius: 161, meltingPoint: 1246, boilingPoint: 2061, density: 7.44, oxidationStates: "+7,+4,+3,+2", electronConfig: "[Ar] 3d⁵ 4s²", discovered: 1774, discoveredBy: "Carl Wilhelm Scheele", phase: "Solid", ionizationEnergy: 7.434, electronAffinity: 0, valence: 2, abundance: "0.11%", hardness: 6.0, conductivity: "moderate", magnetism: "paramagnetic", crystalStructure: "cubic", protons: 25, neutrons: 30, electrons: 25, shells: [2, 8, 13, 2], xpos: 7, ypos: 4, description: "Essential trace element. Used in steel production and dry cell batteries." },
  { number: 26, symbol: "Fe", name: "Iron", mass: 55.845, group: 8, period: 4, category: "transition metal", electronegativity: 1.83, radius: 126, meltingPoint: 1538, boilingPoint: 2861, density: 7.874, oxidationStates: "+3, +2", electronConfig: "[Ar] 3d⁶ 4s²", discovered: -3000, discoveredBy: "Ancient peoples", phase: "Solid", ionizationEnergy: 7.902, electronAffinity: 0.151, valence: 2, abundance: "5.63%", hardness: 4.0, conductivity: "good", magnetism: "ferromagnetic", crystalStructure: "bcc", protons: 26, neutrons: 30, electrons: 26, shells: [2, 8, 14, 2], xpos: 8, ypos: 4, description: "Most used metal on Earth. Essential component of hemoglobin and steel." },
  { number: 27, symbol: "Co", name: "Cobalt", mass: 58.933, group: 9, period: 4, category: "transition metal", electronegativity: 1.88, radius: 125, meltingPoint: 1495, boilingPoint: 2927, density: 8.9, oxidationStates: "+3, +2", electronConfig: "[Ar] 3d⁷ 4s²", discovered: 1735, discoveredBy: "Georg Brandt", phase: "Solid", ionizationEnergy: 7.881, electronAffinity: 0.662, valence: 3, abundance: "0.003%", hardness: 5.0, conductivity: "good", magnetism: "ferromagnetic", crystalStructure: "hcp", protons: 27, neutrons: 32, electrons: 27, shells: [2, 8, 15, 2], xpos: 9, ypos: 4, description: "Blue pigment metal used in magnets, lithium batteries, and vitamin B12." },
  { number: 28, symbol: "Ni", name: "Nickel", mass: 58.693, group: 10, period: 4, category: "transition metal", electronegativity: 1.91, radius: 124, meltingPoint: 1455, boilingPoint: 2913, density: 8.908, oxidationStates: "+3, +2", electronConfig: "[Ar] 3d⁸ 4s²", discovered: 1751, discoveredBy: "Axel Fredrik Cronstedt", phase: "Solid", ionizationEnergy: 7.64, electronAffinity: 1.156, valence: 2, abundance: "0.0089%", hardness: 4.0, conductivity: "good", magnetism: "ferromagnetic", crystalStructure: "fcc", protons: 28, neutrons: 31, electrons: 28, shells: [2, 8, 16, 2], xpos: 10, ypos: 4, description: "Corrosion-resistant metal. Used in coins, stainless steel, and rechargeable batteries." },
  { number: 29, symbol: "Cu", name: "Copper", mass: 63.546, group: 11, period: 4, category: "transition metal", electronegativity: 1.90, radius: 128, meltingPoint: 1084.62, boilingPoint: 2927, density: 8.96, oxidationStates: "+2, +1", electronConfig: "[Ar] 3d¹⁰ 4s¹", discovered: -9000, discoveredBy: "Ancient peoples", phase: "Solid", ionizationEnergy: 7.727, electronAffinity: 1.235, valence: 2, abundance: "0.0068%", hardness: 3.0, conductivity: "excellent", magnetism: "diamagnetic", crystalStructure: "fcc", protons: 29, neutrons: 35, electrons: 29, shells: [2, 8, 18, 1], xpos: 11, ypos: 4, description: "Excellent electrical and thermal conductor. Used in wiring, plumbing, and as essential nutrient." },
  { number: 30, symbol: "Zn", name: "Zinc", mass: 65.38, group: 12, period: 4, category: "transition metal", electronegativity: 1.65, radius: 122, meltingPoint: 419.53, boilingPoint: 907, density: 7.133, oxidationStates: "+2", electronConfig: "[Ar] 3d¹⁰ 4s²", discovered: 1746, discoveredBy: "Andreas Marggraf", phase: "Solid", ionizationEnergy: 9.394, electronAffinity: 0, valence: 2, abundance: "0.0079%", hardness: 2.5, conductivity: "good", magnetism: "diamagnetic", crystalStructure: "hcp", protons: 30, neutrons: 35, electrons: 30, shells: [2, 8, 18, 2], xpos: 12, ypos: 4, description: "Used to galvanize steel. Essential for immune function, wound healing, and enzyme activity." },
  { number: 31, symbol: "Ga", name: "Gallium", mass: 69.723, group: 13, period: 4, category: "post-transition metal", electronegativity: 1.81, radius: 136, meltingPoint: 29.76, boilingPoint: 2204, density: 5.91, oxidationStates: "+3", electronConfig: "[Ar] 3d¹⁰ 4s² 4p¹", discovered: 1875, discoveredBy: "Paul Emile Lecoq de Boisbaudran", phase: "Solid", ionizationEnergy: 5.999, electronAffinity: 0.41, valence: 3, abundance: "0.0019%", hardness: 1.5, conductivity: "moderate", magnetism: "diamagnetic", crystalStructure: "orthorhombic", protons: 31, neutrons: 39, electrons: 31, shells: [2, 8, 18, 3], xpos: 13, ypos: 4, description: "Melts in your hand at 30°C. Used in LEDs, semiconductors, and solar panels." },
  { number: 32, symbol: "Ge", name: "Germanium", mass: 72.63, group: 14, period: 4, category: "metalloid", electronegativity: 2.01, radius: 125, meltingPoint: 938.25, boilingPoint: 2833, density: 5.323, oxidationStates: "+4, +2", electronConfig: "[Ar] 3d¹⁰ 4s² 4p²", discovered: 1886, discoveredBy: "Clemens Winkler", phase: "Solid", ionizationEnergy: 7.9, electronAffinity: 1.233, valence: 4, abundance: "0.00014%", hardness: 6.0, conductivity: "semiconductor", magnetism: "diamagnetic", crystalStructure: "diamond cubic", protons: 32, neutrons: 41, electrons: 32, shells: [2, 8, 18, 4], xpos: 14, ypos: 4, description: "Semiconductor predicted by Mendeleev. Used in fiber optics, infrared optics, and transistors." },
  { number: 33, symbol: "As", name: "Arsenic", mass: 74.922, group: 15, period: 4, category: "metalloid", electronegativity: 2.18, radius: 114, meltingPoint: 816.9, boilingPoint: 614, density: 5.727, oxidationStates: "+5,+3,-3", electronConfig: "[Ar] 3d¹⁰ 4s² 4p³", discovered: 1250, discoveredBy: "Albertus Magnus", phase: "Solid", ionizationEnergy: 9.815, electronAffinity: 0.814, valence: 3, abundance: "0.00018%", hardness: 3.5, conductivity: "semiconductor", magnetism: "diamagnetic", crystalStructure: "rhombohedral", protons: 33, neutrons: 42, electrons: 33, shells: [2, 8, 18, 5], xpos: 15, ypos: 4, description: "Toxic metalloid historically used as poison. Now used in semiconductors and wood preservatives." },
  { number: 34, symbol: "Se", name: "Selenium", mass: 78.971, group: 16, period: 4, category: "nonmetal", electronegativity: 2.55, radius: 103, meltingPoint: 221, boilingPoint: 685, density: 4.819, oxidationStates: "+6,+4,-2", electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁴", discovered: 1817, discoveredBy: "Jöns Jacob Berzelius", phase: "Solid", ionizationEnergy: 9.752, electronAffinity: 2.021, valence: 2, abundance: "0.0000005%", hardness: 2.0, conductivity: "semiconductor", magnetism: "diamagnetic", crystalStructure: "hexagonal", protons: 34, neutrons: 45, electrons: 34, shells: [2, 8, 18, 6], xpos: 16, ypos: 4, description: "Photoconductive nonmetal. Used in solar cells, glass-making, and dietary supplements." },
  { number: 35, symbol: "Br", name: "Bromine", mass: 79.904, group: 17, period: 4, category: "halogen", electronegativity: 2.96, radius: 94, meltingPoint: -7.3, boilingPoint: 58.8, density: 3.102, oxidationStates: "+5,+1,-1", electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁵", discovered: 1826, discoveredBy: "Antoine Jérôme Balard", phase: "Liquid", ionizationEnergy: 11.814, electronAffinity: 3.364, valence: 1, abundance: "0.0003%", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "orthorhombic", protons: 35, neutrons: 45, electrons: 35, shells: [2, 8, 18, 7], xpos: 17, ypos: 4, description: "One of only two liquid elements at room temperature. Used in flame retardants." },
  { number: 36, symbol: "Kr", name: "Krypton", mass: 83.798, group: 18, period: 4, category: "noble gas", electronegativity: null, radius: 88, meltingPoint: -157.36, boilingPoint: -153.22, density: 0.00375, oxidationStates: "0, +2", electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁶", discovered: 1898, discoveredBy: "William Ramsay", phase: "Gas", ionizationEnergy: 14.0, electronAffinity: 0, valence: 0, abundance: "0.000114%", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "fcc", protons: 36, neutrons: 48, electrons: 36, shells: [2, 8, 18, 8], xpos: 18, ypos: 4, description: "Dense noble gas used in high-powered lasers and specialized lighting." },
  { number: 37, symbol: "Rb", name: "Rubidium", mass: 85.468, group: 1, period: 5, category: "alkali metal", electronegativity: 0.82, radius: 265, meltingPoint: 39.31, boilingPoint: 688, density: 1.532, oxidationStates: "+1", electronConfig: "[Kr] 5s¹", discovered: 1861, discoveredBy: "Robert Bunsen", phase: "Solid", ionizationEnergy: 4.177, electronAffinity: 0.468, valence: 1, abundance: "0.009%", hardness: 0.3, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "bcc", protons: 37, neutrons: 48, electrons: 37, shells: [2, 8, 18, 8, 1], xpos: 1, ypos: 5, description: "Soft, reactive alkali metal. Used in atomic clocks and medical imaging." },
  { number: 38, symbol: "Sr", name: "Strontium", mass: 87.62, group: 2, period: 5, category: "alkaline earth metal", electronegativity: 0.95, radius: 219, meltingPoint: 777, boilingPoint: 1382, density: 2.64, oxidationStates: "+2", electronConfig: "[Kr] 5s²", discovered: 1790, discoveredBy: "Adair Crawford", phase: "Solid", ionizationEnergy: 5.695, electronAffinity: 0.052, valence: 2, abundance: "0.036%", hardness: 1.5, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "fcc", protons: 38, neutrons: 50, electrons: 38, shells: [2, 8, 18, 8, 2], xpos: 2, ypos: 5, description: "Alkaline earth metal that burns bright red. Used in fireworks and bone treatments." },
  { number: 39, symbol: "Y", name: "Yttrium", mass: 88.906, group: 3, period: 5, category: "transition metal", electronegativity: 1.22, radius: 212, meltingPoint: 1526, boilingPoint: 3336, density: 4.472, oxidationStates: "+3", electronConfig: "[Kr] 4d¹ 5s²", discovered: 1794, discoveredBy: "Johan Gadolin", phase: "Solid", ionizationEnergy: 6.217, electronAffinity: 0.307, valence: 3, abundance: "0.0033%", hardness: null, conductivity: "moderate", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 39, neutrons: 50, electrons: 39, shells: [2, 8, 18, 9, 2], xpos: 3, ypos: 5, description: "Rare earth metal used in LED phosphors, camera lenses, and cancer treatment." },
  { number: 40, symbol: "Zr", name: "Zirconium", mass: 91.224, group: 4, period: 5, category: "transition metal", electronegativity: 1.33, radius: 206, meltingPoint: 1855, boilingPoint: 4409, density: 6.511, oxidationStates: "+4", electronConfig: "[Kr] 4d² 5s²", discovered: 1789, discoveredBy: "Martin Heinrich Klaproth", phase: "Solid", ionizationEnergy: 6.634, electronAffinity: 0.426, valence: 4, abundance: "0.016%", hardness: 5.0, conductivity: "moderate", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 40, neutrons: 51, electrons: 40, shells: [2, 8, 18, 10, 2], xpos: 4, ypos: 5, description: "Corrosion-resistant metal used in nuclear reactors and as a diamond substitute in jewelry." },
  { number: 41, symbol: "Nb", name: "Niobium", mass: 92.906, group: 5, period: 5, category: "transition metal", electronegativity: 1.6, radius: 198, meltingPoint: 2477, boilingPoint: 4744, density: 8.57, oxidationStates: "+5, +3", electronConfig: "[Kr] 4d⁴ 5s¹", discovered: 1801, discoveredBy: "Charles Hatchett", phase: "Solid", ionizationEnergy: 6.759, electronAffinity: 0.917, valence: 5, abundance: "0.002%", hardness: 6.0, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "bcc", protons: 41, neutrons: 52, electrons: 41, shells: [2, 8, 18, 12, 1], xpos: 5, ypos: 5, description: "Superconducting metal used in MRI machines, particle accelerators, and jet engines." },
  { number: 42, symbol: "Mo", name: "Molybdenum", mass: 95.95, group: 6, period: 5, category: "transition metal", electronegativity: 2.16, radius: 190, meltingPoint: 2623, boilingPoint: 4639, density: 10.28, oxidationStates: "+6,+4,+3,+2", electronConfig: "[Kr] 4d⁵ 5s¹", discovered: 1781, discoveredBy: "Carl Wilhelm Scheele", phase: "Solid", ionizationEnergy: 7.092, electronAffinity: 0.746, valence: 6, abundance: "0.00011%", hardness: 5.5, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "bcc", protons: 42, neutrons: 54, electrons: 42, shells: [2, 8, 18, 13, 1], xpos: 6, ypos: 5, description: "High melting point metal used in high-strength steel alloys and as a catalyst." },
  { number: 43, symbol: "Tc", name: "Technetium", mass: 98, group: 7, period: 5, category: "transition metal", electronegativity: 1.9, radius: 183, meltingPoint: 2157, boilingPoint: 4265, density: 11.5, oxidationStates: "+7,+4", electronConfig: "[Kr] 4d⁵ 5s²", discovered: 1937, discoveredBy: "Carlo Perrier", phase: "Solid", ionizationEnergy: 7.28, electronAffinity: 0.55, valence: 7, abundance: "trace", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 43, neutrons: 55, electrons: 43, shells: [2, 8, 18, 13, 2], xpos: 7, ypos: 5, description: "First artificially produced element. Radioactive, used in medical imaging as Tc-99m." },
  { number: 44, symbol: "Ru", name: "Ruthenium", mass: 101.07, group: 8, period: 5, category: "transition metal", electronegativity: 2.2, radius: 178, meltingPoint: 2334, boilingPoint: 4150, density: 12.45, oxidationStates: "+8,+4,+3,+2", electronConfig: "[Kr] 4d⁷ 5s¹", discovered: 1844, discoveredBy: "Karl Ernst Claus", phase: "Solid", ionizationEnergy: 7.361, electronAffinity: 1.05, valence: 4, abundance: "0.000001%", hardness: 6.5, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 44, neutrons: 57, electrons: 44, shells: [2, 8, 18, 15, 1], xpos: 8, ypos: 5, description: "Platinum group metal used in hard disk coatings and as a chemical catalyst." },
  { number: 45, symbol: "Rh", name: "Rhodium", mass: 102.91, group: 9, period: 5, category: "transition metal", electronegativity: 2.28, radius: 173, meltingPoint: 1964, boilingPoint: 3695, density: 12.41, oxidationStates: "+3", electronConfig: "[Kr] 4d⁸ 5s¹", discovered: 1803, discoveredBy: "William Hyde Wollaston", phase: "Solid", ionizationEnergy: 7.459, electronAffinity: 1.137, valence: 3, abundance: "0.0000002%", hardness: 6.0, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "fcc", protons: 45, neutrons: 58, electrons: 45, shells: [2, 8, 18, 16, 1], xpos: 9, ypos: 5, description: "Rarest and most precious metal. Used in catalytic converters and jewelry." },
  { number: 46, symbol: "Pd", name: "Palladium", mass: 106.42, group: 10, period: 5, category: "transition metal", electronegativity: 2.20, radius: 169, meltingPoint: 1554.9, boilingPoint: 2963, density: 12.023, oxidationStates: "+4, +2", electronConfig: "[Kr] 4d¹⁰", discovered: 1803, discoveredBy: "William Hyde Wollaston", phase: "Solid", ionizationEnergy: 8.337, electronAffinity: 0.562, valence: 4, abundance: "0.00000063%", hardness: 4.75, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "fcc", protons: 46, neutrons: 60, electrons: 46, shells: [2, 8, 18, 18], xpos: 10, ypos: 5, description: "Rare metal used in catalytic converters and hydrogen purification membranes." },
  { number: 47, symbol: "Ag", name: "Silver", mass: 107.87, group: 11, period: 5, category: "transition metal", electronegativity: 1.93, radius: 145, meltingPoint: 961.78, boilingPoint: 2162, density: 10.49, oxidationStates: "+1", electronConfig: "[Kr] 4d¹⁰ 5s¹", discovered: -4000, discoveredBy: "Ancient peoples", phase: "Solid", ionizationEnergy: 7.576, electronAffinity: 1.302, valence: 1, abundance: "0.0000079%", hardness: 2.5, conductivity: "excellent", magnetism: "diamagnetic", crystalStructure: "fcc", protons: 47, neutrons: 61, electrons: 47, shells: [2, 8, 18, 18, 1], xpos: 11, ypos: 5, description: "Highest electrical and thermal conductivity of all elements. Used in jewelry, mirrors, and antimicrobials." },
  { number: 48, symbol: "Cd", name: "Cadmium", mass: 112.41, group: 12, period: 5, category: "transition metal", electronegativity: 1.69, radius: 151, meltingPoint: 321.07, boilingPoint: 767, density: 8.65, oxidationStates: "+2", electronConfig: "[Kr] 4d¹⁰ 5s²", discovered: 1817, discoveredBy: "Friedrich Stromeyer", phase: "Solid", ionizationEnergy: 8.994, electronAffinity: 0, valence: 2, abundance: "0.000015%", hardness: 2.0, conductivity: "moderate", magnetism: "diamagnetic", crystalStructure: "hcp", protons: 48, neutrons: 64, electrons: 48, shells: [2, 8, 18, 18, 2], xpos: 12, ypos: 5, description: "Toxic metal used in rechargeable NiCd batteries and as a yellow pigment." },
  { number: 49, symbol: "In", name: "Indium", mass: 114.82, group: 13, period: 5, category: "post-transition metal", electronegativity: 1.78, radius: 167, meltingPoint: 156.6, boilingPoint: 2072, density: 7.31, oxidationStates: "+3", electronConfig: "[Kr] 4d¹⁰ 5s² 5p¹", discovered: 1863, discoveredBy: "Ferdinand Reich", phase: "Solid", ionizationEnergy: 5.786, electronAffinity: 0.3, valence: 3, abundance: "0.00025%", hardness: 1.2, conductivity: "good", magnetism: "diamagnetic", crystalStructure: "tetragonal", protons: 49, neutrons: 66, electrons: 49, shells: [2, 8, 18, 18, 3], xpos: 13, ypos: 5, description: "Soft metal used in touchscreens as indium tin oxide (ITO) coating." },
  { number: 50, symbol: "Sn", name: "Tin", mass: 118.71, group: 14, period: 5, category: "post-transition metal", electronegativity: 1.96, radius: 145, meltingPoint: 231.93, boilingPoint: 2602, density: 7.287, oxidationStates: "+4, +2", electronConfig: "[Kr] 4d¹⁰ 5s² 5p²", discovered: -3000, discoveredBy: "Ancient peoples", phase: "Solid", ionizationEnergy: 7.344, electronAffinity: 1.112, valence: 4, abundance: "0.00022%", hardness: 1.5, conductivity: "good", magnetism: "diamagnetic", crystalStructure: "tetragonal", protons: 50, neutrons: 69, electrons: 50, shells: [2, 8, 18, 18, 4], xpos: 14, ypos: 5, description: "Used in solder, bronze alloys, and tin-plated steel cans. Makes a cry sound when bent." },
  { number: 51, symbol: "Sb", name: "Antimony", mass: 121.76, group: 15, period: 5, category: "metalloid", electronegativity: 2.05, radius: 133, meltingPoint: 630.63, boilingPoint: 1587, density: 6.697, oxidationStates: "+5,+3,-3", electronConfig: "[Kr] 4d¹⁰ 5s² 5p³", discovered: -3000, discoveredBy: "Ancient peoples", phase: "Solid", ionizationEnergy: 8.64, electronAffinity: 1.047, valence: 3, abundance: "0.00002%", hardness: 3.0, conductivity: "semiconductor", magnetism: "diamagnetic", crystalStructure: "rhombohedral", protons: 51, neutrons: 71, electrons: 51, shells: [2, 8, 18, 18, 5], xpos: 15, ypos: 5, description: "Brittle metalloid used in flame retardants and as an alloying agent in batteries." },
  { number: 52, symbol: "Te", name: "Tellurium", mass: 127.6, group: 16, period: 5, category: "metalloid", electronegativity: 2.1, radius: 123, meltingPoint: 449.51, boilingPoint: 988, density: 6.24, oxidationStates: "+6,+4,-2", electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁴", discovered: 1782, discoveredBy: "Franz-Joseph Müller", phase: "Solid", ionizationEnergy: 9.009, electronAffinity: 1.971, valence: 2, abundance: "0.0000001%", hardness: 2.25, conductivity: "semiconductor", magnetism: "diamagnetic", crystalStructure: "hexagonal", protons: 52, neutrons: 76, electrons: 52, shells: [2, 8, 18, 18, 6], xpos: 16, ypos: 5, description: "Rare metalloid used in solar panels, thermoelectric devices, and as a semiconductor." },
  { number: 53, symbol: "I", name: "Iodine", mass: 126.9, group: 17, period: 5, category: "halogen", electronegativity: 2.66, radius: 115, meltingPoint: 113.7, boilingPoint: 184.3, density: 4.933, oxidationStates: "+7,+5,+1,-1", electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁵", discovered: 1811, discoveredBy: "Bernard Courtois", phase: "Solid", ionizationEnergy: 10.451, electronAffinity: 3.059, valence: 1, abundance: "0.000014%", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "orthorhombic", protons: 53, neutrons: 74, electrons: 53, shells: [2, 8, 18, 18, 7], xpos: 17, ypos: 5, description: "Essential for thyroid hormone production. Used as antiseptic and in photography." },
  { number: 54, symbol: "Xe", name: "Xenon", mass: 131.29, group: 18, period: 5, category: "noble gas", electronegativity: null, radius: 108, meltingPoint: -111.79, boilingPoint: -108.12, density: 0.00589, oxidationStates: "0, +2, +4, +6", electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁶", discovered: 1898, discoveredBy: "William Ramsay", phase: "Gas", ionizationEnergy: 12.13, electronAffinity: 0, valence: 0, abundance: "0.0000087%", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "fcc", protons: 54, neutrons: 77, electrons: 54, shells: [2, 8, 18, 18, 8], xpos: 18, ypos: 5, description: "Dense noble gas used in powerful flash lamps, ion thrusters, and anesthesia." },
  { number: 55, symbol: "Cs", name: "Caesium", mass: 132.91, group: 1, period: 6, category: "alkali metal", electronegativity: 0.79, radius: 298, meltingPoint: 28.44, boilingPoint: 671, density: 1.873, oxidationStates: "+1", electronConfig: "[Xe] 6s¹", discovered: 1860, discoveredBy: "Robert Bunsen", phase: "Solid", ionizationEnergy: 3.894, electronAffinity: 0.472, valence: 1, abundance: "0.00019%", hardness: 0.2, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "bcc", protons: 55, neutrons: 78, electrons: 55, shells: [2, 8, 18, 18, 8, 1], xpos: 1, ypos: 6, description: "Most electropositive metal. Used in atomic clocks that define the SI second." },
  { number: 56, symbol: "Ba", name: "Barium", mass: 137.33, group: 2, period: 6, category: "alkaline earth metal", electronegativity: 0.89, radius: 253, meltingPoint: 727, boilingPoint: 1897, density: 3.51, oxidationStates: "+2", electronConfig: "[Xe] 6s²", discovered: 1808, discoveredBy: "Humphry Davy", phase: "Solid", ionizationEnergy: 5.212, electronAffinity: 0.145, valence: 2, abundance: "0.034%", hardness: 1.25, conductivity: "good", magnetism: "diamagnetic", crystalStructure: "bcc", protons: 56, neutrons: 81, electrons: 56, shells: [2, 8, 18, 18, 8, 2], xpos: 2, ypos: 6, description: "Soft reactive metal. Barium sulfate used in medical imaging (barium meals) and paints." },
  { number: 57, symbol: "La", name: "Lanthanum", mass: 138.91, group: 3, period: 6, category: "lanthanide", electronegativity: 1.1, radius: 240, meltingPoint: 920, boilingPoint: 3464, density: 6.162, oxidationStates: "+3", electronConfig: "[Xe] 5d¹ 6s²", discovered: 1839, discoveredBy: "Carl Gustav Mosander", phase: "Solid", ionizationEnergy: 5.577, electronAffinity: 0.5, valence: 3, abundance: "0.0034%", hardness: 2.5, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "dhcp", protons: 57, neutrons: 82, electrons: 57, shells: [2, 8, 18, 18, 9, 2], xpos: 4, ypos: 8, description: "First lanthanide, used in camera lenses, hydrogen storage, and high-refractive glass." },
  { number: 58, symbol: "Ce", name: "Cerium", mass: 140.12, group: 3, period: 6, category: "lanthanide", electronegativity: 1.12, radius: 235, meltingPoint: 798, boilingPoint: 3443, density: 6.77, oxidationStates: "+4, +3", electronConfig: "[Xe] 4f¹ 5d¹ 6s²", discovered: 1803, discoveredBy: "Wilhelm Hisinger", phase: "Solid", ionizationEnergy: 5.539, electronAffinity: 0.5, valence: 4, abundance: "0.0046%", hardness: 2.5, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "fcc", protons: 58, neutrons: 82, electrons: 58, shells: [2, 8, 18, 19, 9, 2], xpos: 5, ypos: 8, description: "Most abundant rare earth. Used in catalytic converters and as a glass polishing agent." },
  { number: 59, symbol: "Pr", name: "Praseodymium", mass: 140.91, group: 3, period: 6, category: "lanthanide", electronegativity: 1.13, radius: 235, meltingPoint: 931, boilingPoint: 3520, density: 6.77, oxidationStates: "+3", electronConfig: "[Xe] 4f³ 6s²", discovered: 1885, discoveredBy: "Carl Auer von Welsbach", phase: "Solid", ionizationEnergy: 5.473, electronAffinity: 0.5, valence: 3, abundance: "0.00086%", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "dhcp", protons: 59, neutrons: 82, electrons: 59, shells: [2, 8, 18, 21, 8, 2], xpos: 6, ypos: 8, description: "Rare earth used in high-strength permanent magnets (NdFeB) and green glass colorants." },
  { number: 60, symbol: "Nd", name: "Neodymium", mass: 144.24, group: 3, period: 6, category: "lanthanide", electronegativity: 1.14, radius: 229, meltingPoint: 1021, boilingPoint: 3074, density: 7.01, oxidationStates: "+3", electronConfig: "[Xe] 4f⁴ 6s²", discovered: 1885, discoveredBy: "Carl Auer von Welsbach", phase: "Solid", ionizationEnergy: 5.525, electronAffinity: 0.5, valence: 3, abundance: "0.0033%", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "dhcp", protons: 60, neutrons: 84, electrons: 60, shells: [2, 8, 18, 22, 8, 2], xpos: 7, ypos: 8, description: "Used to make the strongest known permanent magnets found in motors and hard drives." },
  { number: 61, symbol: "Pm", name: "Promethium", mass: 145, group: 3, period: 6, category: "lanthanide", electronegativity: 1.13, radius: 236, meltingPoint: 1042, boilingPoint: 3000, density: 7.26, oxidationStates: "+3", electronConfig: "[Xe] 4f⁵ 6s²", discovered: 1945, discoveredBy: "Jacob A. Marinsky", phase: "Solid", ionizationEnergy: 5.582, electronAffinity: 0.5, valence: 3, abundance: "trace", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "dhcp", protons: 61, neutrons: 84, electrons: 61, shells: [2, 8, 18, 23, 8, 2], xpos: 8, ypos: 8, description: "Only radioactive lanthanide with no stable isotopes. Used in nuclear batteries." },
  { number: 62, symbol: "Sm", name: "Samarium", mass: 150.36, group: 3, period: 6, category: "lanthanide", electronegativity: 1.17, radius: 229, meltingPoint: 1072, boilingPoint: 1900, density: 7.52, oxidationStates: "+3, +2", electronConfig: "[Xe] 4f⁶ 6s²", discovered: 1879, discoveredBy: "Paul Emile Lecoq de Boisbaudran", phase: "Solid", ionizationEnergy: 5.644, electronAffinity: 0.5, valence: 3, abundance: "0.00073%", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "rhombohedral", protons: 62, neutrons: 88, electrons: 62, shells: [2, 8, 18, 24, 8, 2], xpos: 9, ypos: 8, description: "Used in powerful samarium-cobalt permanent magnets and cancer treatment." },
  { number: 63, symbol: "Eu", name: "Europium", mass: 151.96, group: 3, period: 6, category: "lanthanide", electronegativity: 1.2, radius: 233, meltingPoint: 822, boilingPoint: 1596, density: 5.244, oxidationStates: "+3, +2", electronConfig: "[Xe] 4f⁷ 6s²", discovered: 1901, discoveredBy: "Eugène-Anatole Demarçay", phase: "Solid", ionizationEnergy: 5.67, electronAffinity: 0.5, valence: 3, abundance: "0.0002%", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "bcc", protons: 63, neutrons: 89, electrons: 63, shells: [2, 8, 18, 25, 8, 2], xpos: 10, ypos: 8, description: "Produces the red and blue colors in euro banknote security inks and TV phosphors." },
  { number: 64, symbol: "Gd", name: "Gadolinium", mass: 157.25, group: 3, period: 6, category: "lanthanide", electronegativity: 1.2, radius: 233, meltingPoint: 1313, boilingPoint: 3273, density: 7.9, oxidationStates: "+3", electronConfig: "[Xe] 4f⁷ 5d¹ 6s²", discovered: 1880, discoveredBy: "Jean Charles Galissard de Marignac", phase: "Solid", ionizationEnergy: 6.15, electronAffinity: 0.5, valence: 3, abundance: "0.00063%", hardness: 5.0, conductivity: "moderate", magnetism: "ferromagnetic", crystalStructure: "hcp", protons: 64, neutrons: 93, electrons: 64, shells: [2, 8, 18, 25, 9, 2], xpos: 11, ypos: 8, description: "Used as an MRI contrast agent and in nuclear reactor shielding. Unique magnetic properties." },
  { number: 65, symbol: "Tb", name: "Terbium", mass: 158.93, group: 3, period: 6, category: "lanthanide", electronegativity: 1.1, radius: 225, meltingPoint: 1356, boilingPoint: 3230, density: 8.23, oxidationStates: "+3", electronConfig: "[Xe] 4f⁹ 6s²", discovered: 1843, discoveredBy: "Carl Gustaf Mosander", phase: "Solid", ionizationEnergy: 5.864, electronAffinity: 0.5, valence: 3, abundance: "0.000093%", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 65, neutrons: 94, electrons: 65, shells: [2, 8, 18, 27, 8, 2], xpos: 12, ypos: 8, description: "Used in green phosphors for TV screens and in fuel cells and sonar devices." },
  { number: 66, symbol: "Dy", name: "Dysprosium", mass: 162.5, group: 3, period: 6, category: "lanthanide", electronegativity: 1.22, radius: 228, meltingPoint: 1412, boilingPoint: 2567, density: 8.551, oxidationStates: "+3", electronConfig: "[Xe] 4f¹⁰ 6s²", discovered: 1886, discoveredBy: "Paul Emile Lecoq de Boisbaudran", phase: "Solid", ionizationEnergy: 5.939, electronAffinity: 0.5, valence: 3, abundance: "0.00062%", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 66, neutrons: 97, electrons: 66, shells: [2, 8, 18, 28, 8, 2], xpos: 13, ypos: 8, description: "Used to enhance neodymium magnets for electric vehicles and wind turbines." },
  { number: 67, symbol: "Ho", name: "Holmium", mass: 164.93, group: 3, period: 6, category: "lanthanide", electronegativity: 1.23, radius: 226, meltingPoint: 1474, boilingPoint: 2700, density: 8.795, oxidationStates: "+3", electronConfig: "[Xe] 4f¹¹ 6s²", discovered: 1878, discoveredBy: "Marc Delafontaine", phase: "Solid", ionizationEnergy: 6.022, electronAffinity: 0.5, valence: 3, abundance: "0.00012%", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 67, neutrons: 98, electrons: 67, shells: [2, 8, 18, 29, 8, 2], xpos: 14, ypos: 8, description: "Has highest magnetic moment of natural elements. Used in lasers for eye and kidney surgery." },
  { number: 68, symbol: "Er", name: "Erbium", mass: 167.26, group: 3, period: 6, category: "lanthanide", electronegativity: 1.24, radius: 226, meltingPoint: 1529, boilingPoint: 2868, density: 9.066, oxidationStates: "+3", electronConfig: "[Xe] 4f¹² 6s²", discovered: 1843, discoveredBy: "Carl Gustaf Mosander", phase: "Solid", ionizationEnergy: 6.108, electronAffinity: 0.5, valence: 3, abundance: "0.00036%", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 68, neutrons: 99, electrons: 68, shells: [2, 8, 18, 30, 8, 2], xpos: 15, ypos: 8, description: "Amplifies light in fiber optic cables. Gives rose-pink color to glasses and ceramics." },
  { number: 69, symbol: "Tm", name: "Thulium", mass: 168.93, group: 3, period: 6, category: "lanthanide", electronegativity: 1.25, radius: 222, meltingPoint: 1545, boilingPoint: 1950, density: 9.321, oxidationStates: "+3, +2", electronConfig: "[Xe] 4f¹³ 6s²", discovered: 1879, discoveredBy: "Per Teodor Cleve", phase: "Solid", ionizationEnergy: 6.184, electronAffinity: 0.5, valence: 3, abundance: "0.000052%", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 69, neutrons: 100, electrons: 69, shells: [2, 8, 18, 31, 8, 2], xpos: 16, ypos: 8, description: "Rarest lanthanide. Used in portable X-ray machines and laser materials." },
  { number: 70, symbol: "Yb", name: "Ytterbium", mass: 173.05, group: 3, period: 6, category: "lanthanide", electronegativity: 1.1, radius: 222, meltingPoint: 819, boilingPoint: 1196, density: 6.965, oxidationStates: "+3, +2", electronConfig: "[Xe] 4f¹⁴ 6s²", discovered: 1878, discoveredBy: "Jean Charles Galissard de Marignac", phase: "Solid", ionizationEnergy: 6.254, electronAffinity: 0.5, valence: 3, abundance: "0.000031%", hardness: null, conductivity: "good", magnetism: "diamagnetic", crystalStructure: "fcc", protons: 70, neutrons: 103, electrons: 70, shells: [2, 8, 18, 32, 8, 2], xpos: 17, ypos: 8, description: "Used in atomic clocks and as a stress gauge in materials science." },
  { number: 71, symbol: "Lu", name: "Lutetium", mass: 174.97, group: 3, period: 6, category: "lanthanide", electronegativity: 1.27, radius: 217, meltingPoint: 1663, boilingPoint: 3402, density: 9.84, oxidationStates: "+3", electronConfig: "[Xe] 4f¹⁴ 5d¹ 6s²", discovered: 1907, discoveredBy: "Georges Urbain", phase: "Solid", ionizationEnergy: 5.426, electronAffinity: 0.5, valence: 3, abundance: "0.000079%", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 71, neutrons: 104, electrons: 71, shells: [2, 8, 18, 32, 9, 2], xpos: 18, ypos: 8, description: "Densest and hardest lanthanide. Used in PET scan detectors and as a catalyst." },
  { number: 72, symbol: "Hf", name: "Hafnium", mass: 178.49, group: 4, period: 6, category: "transition metal", electronegativity: 1.3, radius: 208, meltingPoint: 2233, boilingPoint: 4603, density: 13.31, oxidationStates: "+4", electronConfig: "[Xe] 4f¹⁴ 5d² 6s²", discovered: 1923, discoveredBy: "Dirk Coster", phase: "Solid", ionizationEnergy: 6.825, electronAffinity: 0, valence: 4, abundance: "0.0033%", hardness: 5.5, conductivity: "moderate", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 72, neutrons: 106, electrons: 72, shells: [2, 8, 18, 32, 10, 2], xpos: 4, ypos: 6, description: "Used in nuclear reactor control rods and high-temperature alloys." },
  { number: 73, symbol: "Ta", name: "Tantalum", mass: 180.95, group: 5, period: 6, category: "transition metal", electronegativity: 1.5, radius: 200, meltingPoint: 3017, boilingPoint: 5458, density: 16.654, oxidationStates: "+5", electronConfig: "[Xe] 4f¹⁴ 5d³ 6s²", discovered: 1802, discoveredBy: "Anders Gustaf Ekeberg", phase: "Solid", ionizationEnergy: 7.549, electronAffinity: 0.322, valence: 5, abundance: "0.00017%", hardness: 6.5, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "bcc", protons: 73, neutrons: 108, electrons: 73, shells: [2, 8, 18, 32, 11, 2], xpos: 5, ypos: 6, description: "Highly corrosion-resistant metal used in capacitors for electronics and surgical implants." },
  { number: 74, symbol: "W", name: "Tungsten", mass: 183.84, group: 6, period: 6, category: "transition metal", electronegativity: 2.36, radius: 193, meltingPoint: 3422, boilingPoint: 5555, density: 19.25, oxidationStates: "+6,+4,+2", electronConfig: "[Xe] 4f¹⁴ 5d⁴ 6s²", discovered: 1783, discoveredBy: "Juan José Elhuyar", phase: "Solid", ionizationEnergy: 7.864, electronAffinity: 0.815, valence: 6, abundance: "0.00015%", hardness: 7.5, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "bcc", protons: 74, neutrons: 110, electrons: 74, shells: [2, 8, 18, 32, 12, 2], xpos: 6, ypos: 6, description: "Highest melting point of all elements. Used in light bulb filaments and drill bits." },
  { number: 75, symbol: "Re", name: "Rhenium", mass: 186.21, group: 7, period: 6, category: "transition metal", electronegativity: 1.9, radius: 188, meltingPoint: 3186, boilingPoint: 5596, density: 21.02, oxidationStates: "+7,+4,+2", electronConfig: "[Xe] 4f¹⁴ 5d⁵ 6s²", discovered: 1925, discoveredBy: "Masataka Ogawa", phase: "Solid", ionizationEnergy: 7.833, electronAffinity: 0.15, valence: 7, abundance: "0.000000026%", hardness: 7.0, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 75, neutrons: 111, electrons: 75, shells: [2, 8, 18, 32, 13, 2], xpos: 7, ypos: 6, description: "One of rarest elements, second highest melting point. Used in jet engine alloys." },
  { number: 76, symbol: "Os", name: "Osmium", mass: 190.23, group: 8, period: 6, category: "transition metal", electronegativity: 2.2, radius: 185, meltingPoint: 3033, boilingPoint: 5012, density: 22.59, oxidationStates: "+8,+4,+3,+2", electronConfig: "[Xe] 4f¹⁴ 5d⁶ 6s²", discovered: 1803, discoveredBy: "Smithson Tennant", phase: "Solid", ionizationEnergy: 8.438, electronAffinity: 1.1, valence: 4, abundance: "0.0000015%", hardness: 7.0, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "hcp", protons: 76, neutrons: 114, electrons: 76, shells: [2, 8, 18, 32, 14, 2], xpos: 8, ypos: 6, description: "Densest naturally occurring element. Its tetroxide is highly toxic but used in fingerprinting." },
  { number: 77, symbol: "Ir", name: "Iridium", mass: 192.22, group: 9, period: 6, category: "transition metal", electronegativity: 2.2, radius: 180, meltingPoint: 2446, boilingPoint: 4428, density: 22.56, oxidationStates: "+4,+3", electronConfig: "[Xe] 4f¹⁴ 5d⁷ 6s²", discovered: 1803, discoveredBy: "Smithson Tennant", phase: "Solid", ionizationEnergy: 8.967, electronAffinity: 1.565, valence: 4, abundance: "0.0000004%", hardness: 6.5, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "fcc", protons: 77, neutrons: 115, electrons: 77, shells: [2, 8, 18, 32, 15, 2], xpos: 9, ypos: 6, description: "Most corrosion-resistant metal known. Evidence of iridium anomaly marks the dinosaur extinction event." },
  { number: 78, symbol: "Pt", name: "Platinum", mass: 195.08, group: 10, period: 6, category: "transition metal", electronegativity: 2.28, radius: 177, meltingPoint: 1768.3, boilingPoint: 3825, density: 21.45, oxidationStates: "+4, +2", electronConfig: "[Xe] 4f¹⁴ 5d⁹ 6s¹", discovered: 1748, discoveredBy: "Antonio de Ulloa", phase: "Solid", ionizationEnergy: 8.959, electronAffinity: 2.128, valence: 4, abundance: "0.00000037%", hardness: 3.5, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "fcc", protons: 78, neutrons: 117, electrons: 78, shells: [2, 8, 18, 32, 17, 1], xpos: 10, ypos: 6, description: "Precious metal used in catalytic converters, jewelry, and cancer chemotherapy drugs." },
  { number: 79, symbol: "Au", name: "Gold", mass: 196.97, group: 11, period: 6, category: "transition metal", electronegativity: 2.54, radius: 174, meltingPoint: 1064.18, boilingPoint: 2856, density: 19.3, oxidationStates: "+3, +1", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹", discovered: -2600, discoveredBy: "Ancient peoples", phase: "Solid", ionizationEnergy: 9.226, electronAffinity: 2.309, valence: 3, abundance: "0.0000003%", hardness: 2.5, conductivity: "excellent", magnetism: "diamagnetic", crystalStructure: "fcc", protons: 79, neutrons: 118, electrons: 79, shells: [2, 8, 18, 32, 18, 1], xpos: 11, ypos: 6, description: "Malleable, corrosion-resistant precious metal. Symbol of wealth and used in electronics." },
  { number: 80, symbol: "Hg", name: "Mercury", mass: 200.59, group: 12, period: 6, category: "transition metal", electronegativity: 2.0, radius: 171, meltingPoint: -38.83, boilingPoint: 356.73, density: 13.546, oxidationStates: "+2, +1", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s²", discovered: -2000, discoveredBy: "Ancient peoples", phase: "Liquid", ionizationEnergy: 10.438, electronAffinity: 0, valence: 2, abundance: "0.000000067%", hardness: null, conductivity: "moderate", magnetism: "diamagnetic", crystalStructure: "rhombohedral", protons: 80, neutrons: 121, electrons: 80, shells: [2, 8, 18, 32, 18, 2], xpos: 12, ypos: 6, description: "Only metal liquid at room temperature. Highly toxic. Used in thermometers and fluorescent lamps." },
  { number: 81, symbol: "Tl", name: "Thallium", mass: 204.38, group: 13, period: 6, category: "post-transition metal", electronegativity: 1.62, radius: 156, meltingPoint: 304, boilingPoint: 1473, density: 11.85, oxidationStates: "+3, +1", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹", discovered: 1861, discoveredBy: "William Crookes", phase: "Solid", ionizationEnergy: 6.108, electronAffinity: 0.2, valence: 1, abundance: "0.00053%", hardness: 1.2, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "hcp", protons: 81, neutrons: 123, electrons: 81, shells: [2, 8, 18, 32, 18, 3], xpos: 13, ypos: 6, description: "Highly toxic soft metal, formerly used in rat poison. Now used in medical imaging." },
  { number: 82, symbol: "Pb", name: "Lead", mass: 207.2, group: 14, period: 6, category: "post-transition metal", electronegativity: 2.33, radius: 175, meltingPoint: 327.46, boilingPoint: 1749, density: 11.34, oxidationStates: "+4, +2", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²", discovered: -7000, discoveredBy: "Ancient peoples", phase: "Solid", ionizationEnergy: 7.417, electronAffinity: 0.364, valence: 4, abundance: "0.00099%", hardness: 1.5, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "fcc", protons: 82, neutrons: 125, electrons: 82, shells: [2, 8, 18, 32, 18, 4], xpos: 14, ypos: 6, description: "Dense, toxic soft metal. Used in car batteries, radiation shielding, and historically in paints." },
  { number: 83, symbol: "Bi", name: "Bismuth", mass: 208.98, group: 15, period: 6, category: "post-transition metal", electronegativity: 2.02, radius: 156, meltingPoint: 271.5, boilingPoint: 1564, density: 9.807, oxidationStates: "+5, +3", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³", discovered: 1400, discoveredBy: "Basil Valentine", phase: "Solid", ionizationEnergy: 7.285, electronAffinity: 0.946, valence: 3, abundance: "0.0000025%", hardness: 2.25, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "rhombohedral", protons: 83, neutrons: 126, electrons: 83, shells: [2, 8, 18, 32, 18, 5], xpos: 15, ypos: 6, description: "Heaviest stable element with a beautiful rainbow oxide. Non-toxic replacement for lead." },
  { number: 84, symbol: "Po", name: "Polonium", mass: 209, group: 16, period: 6, category: "post-transition metal", electronegativity: 2.0, radius: 167, meltingPoint: 254, boilingPoint: 962, density: 9.32, oxidationStates: "+4, +2", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴", discovered: 1898, discoveredBy: "Marie Curie", phase: "Solid", ionizationEnergy: 8.417, electronAffinity: 1.9, valence: 4, abundance: "trace", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "cubic", protons: 84, neutrons: 125, electrons: 84, shells: [2, 8, 18, 32, 18, 6], xpos: 16, ypos: 6, description: "Highly radioactive element discovered by Marie Curie. Used in antistatic devices." },
  { number: 85, symbol: "At", name: "Astatine", mass: 210, group: 17, period: 6, category: "halogen", electronegativity: 2.2, radius: 150, meltingPoint: 302, boilingPoint: 337, density: null, oxidationStates: "+7,+5,+1,-1", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵", discovered: 1940, discoveredBy: "Dale R. Corson", phase: "Solid", ionizationEnergy: 9.0, electronAffinity: 2.8, valence: 1, abundance: "trace", hardness: null, conductivity: "poor", magnetism: "unknown", crystalStructure: "unknown", protons: 85, neutrons: 125, electrons: 85, shells: [2, 8, 18, 32, 18, 7], xpos: 17, ypos: 6, description: "Rarest naturally occurring element on Earth. Used in cancer treatment (alpha radiation therapy)." },
  { number: 86, symbol: "Rn", name: "Radon", mass: 222, group: 18, period: 6, category: "noble gas", electronegativity: null, radius: 145, meltingPoint: -71, boilingPoint: -61.7, density: 0.00973, oxidationStates: "0", electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶", discovered: 1900, discoveredBy: "Friedrich Ernst Dorn", phase: "Gas", ionizationEnergy: 10.745, electronAffinity: 0, valence: 0, abundance: "trace", hardness: null, conductivity: "poor", magnetism: "diamagnetic", crystalStructure: "fcc", protons: 86, neutrons: 136, electrons: 86, shells: [2, 8, 18, 32, 18, 8], xpos: 18, ypos: 6, description: "Radioactive noble gas. Second leading cause of lung cancer from natural uranium decay." },
  { number: 87, symbol: "Fr", name: "Francium", mass: 223, group: 1, period: 7, category: "alkali metal", electronegativity: 0.7, radius: null, meltingPoint: 27, boilingPoint: 677, density: null, oxidationStates: "+1", electronConfig: "[Rn] 7s¹", discovered: 1939, discoveredBy: "Marguerite Perey", phase: "Solid", ionizationEnergy: 4.073, electronAffinity: 0.486, valence: 1, abundance: "trace", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "bcc", protons: 87, neutrons: 136, electrons: 87, shells: [2, 8, 18, 32, 18, 8, 1], xpos: 1, ypos: 7, description: "Rarest naturally occurring element. Extremely radioactive with half-life of only 22 minutes." },
  { number: 88, symbol: "Ra", name: "Radium", mass: 226, group: 2, period: 7, category: "alkaline earth metal", electronegativity: 0.9, radius: null, meltingPoint: 700, boilingPoint: 1737, density: 5.0, oxidationStates: "+2", electronConfig: "[Rn] 7s²", discovered: 1898, discoveredBy: "Marie Curie", phase: "Solid", ionizationEnergy: 5.279, electronAffinity: 0.1, valence: 2, abundance: "trace", hardness: null, conductivity: "good", magnetism: "paramagnetic", crystalStructure: "bcc", protons: 88, neutrons: 138, electrons: 88, shells: [2, 8, 18, 32, 18, 8, 2], xpos: 2, ypos: 7, description: "Highly radioactive metal discovered by Marie Curie. Historically used in glow-in-dark paint." },
  { number: 89, symbol: "Ac", name: "Actinium", mass: 227, group: 3, period: 7, category: "actinide", electronegativity: 1.1, radius: null, meltingPoint: 1051, boilingPoint: 3198, density: 10.07, oxidationStates: "+3", electronConfig: "[Rn] 6d¹ 7s²", discovered: 1899, discoveredBy: "André-Louis Debierne", phase: "Solid", ionizationEnergy: 5.17, electronAffinity: 0.35, valence: 3, abundance: "trace", hardness: null, conductivity: "moderate", magnetism: "paramagnetic", crystalStructure: "fcc", protons: 89, neutrons: 138, electrons: 89, shells: [2, 8, 18, 32, 18, 9, 2], xpos: 3, ypos: 9, description: "Highly radioactive, glows blue in the dark. Used in cancer radiotherapy." },
  { number: 90, symbol: "Th", name: "Thorium", mass: 232.04, group: 3, period: 7, category: "actinide", electronegativity: 1.3, radius: null, meltingPoint: 1750, boilingPoint: 4788, density: 11.72, oxidationStates: "+4", electronConfig: "[Rn] 6d² 7s²", discovered: 1829, discoveredBy: "Jöns Jacob Berzelius", phase: "Solid", ionizationEnergy: 6.307, electronAffinity: 0.608, valence: 4, abundance: "0.0006%", hardness: 3.0, conductivity: "moderate", magnetism: "paramagnetic", crystalStructure: "fcc", protons: 90, neutrons: 142, electrons: 90, shells: [2, 8, 18, 32, 18, 10, 2], xpos: 4, ypos: 9, description: "Weakly radioactive metal. Considered a future nuclear fuel with much less waste than uranium." },
  { number: 91, symbol: "Pa", name: "Protactinium", mass: 231.04, group: 3, period: 7, category: "actinide", electronegativity: 1.5, radius: null, meltingPoint: 1572, boilingPoint: 4000, density: 15.37, oxidationStates: "+5, +4", electronConfig: "[Rn] 5f² 6d¹ 7s²", discovered: 1913, discoveredBy: "Kasimir Fajans", phase: "Solid", ionizationEnergy: 5.89, electronAffinity: 0.55, valence: 5, abundance: "trace", hardness: null, conductivity: "moderate", magnetism: "paramagnetic", crystalStructure: "tetragonal", protons: 91, neutrons: 140, electrons: 91, shells: [2, 8, 18, 32, 20, 9, 2], xpos: 5, ypos: 9, description: "Rare, highly toxic, and radioactive metal. Found in uranium ores, precursor to uranium-233." },
  { number: 92, symbol: "U", name: "Uranium", mass: 238.03, group: 3, period: 7, category: "actinide", electronegativity: 1.38, radius: 196, meltingPoint: 1135, boilingPoint: 4131, density: 19.1, oxidationStates: "+6,+5,+4,+3", electronConfig: "[Rn] 5f³ 6d¹ 7s²", discovered: 1789, discoveredBy: "Martin Heinrich Klaproth", phase: "Solid", ionizationEnergy: 6.194, electronAffinity: 0, valence: 6, abundance: "0.00018%", hardness: 6.0, conductivity: "moderate", magnetism: "paramagnetic", crystalStructure: "orthorhombic", protons: 92, neutrons: 146, electrons: 92, shells: [2, 8, 18, 32, 21, 9, 2], xpos: 6, ypos: 9, description: "Radioactive metal, primary fuel for nuclear reactors. Half-life of 4.5 billion years." },
  { number: 93, symbol: "Np", name: "Neptunium", mass: 237, group: 3, period: 7, category: "actinide", electronegativity: 1.36, radius: null, meltingPoint: 644, boilingPoint: 4000, density: 20.45, oxidationStates: "+6,+5,+4,+3", electronConfig: "[Rn] 5f⁴ 6d¹ 7s²", discovered: 1940, discoveredBy: "Edwin McMillan", phase: "Solid", ionizationEnergy: 6.266, electronAffinity: 0, valence: 5, abundance: "trace", hardness: null, conductivity: "moderate", magnetism: "paramagnetic", crystalStructure: "orthorhombic", protons: 93, neutrons: 144, electrons: 93, shells: [2, 8, 18, 32, 22, 9, 2], xpos: 7, ypos: 9, description: "First transuranium element. Radioactive, found in trace amounts in uranium ores." },
  { number: 94, symbol: "Pu", name: "Plutonium", mass: 244, group: 3, period: 7, category: "actinide", electronegativity: 1.28, radius: null, meltingPoint: 640, boilingPoint: 3230, density: 19.816, oxidationStates: "+6,+5,+4,+3", electronConfig: "[Rn] 5f⁶ 7s²", discovered: 1940, discoveredBy: "Glenn T. Seaborg", phase: "Solid", ionizationEnergy: 6.026, electronAffinity: 0, valence: 4, abundance: "trace", hardness: null, conductivity: "moderate", magnetism: "paramagnetic", crystalStructure: "monoclinic", protons: 94, neutrons: 150, electrons: 94, shells: [2, 8, 18, 32, 24, 8, 2], xpos: 8, ypos: 9, description: "Key fissile material for nuclear weapons and reactors. Extremely radioactive and toxic." },
  { number: 95, symbol: "Am", name: "Americium", mass: 243, group: 3, period: 7, category: "actinide", electronegativity: 1.3, radius: null, meltingPoint: 1176, boilingPoint: 2607, density: 13.67, oxidationStates: "+4, +3", electronConfig: "[Rn] 5f⁷ 7s²", discovered: 1944, discoveredBy: "Glenn T. Seaborg", phase: "Solid", ionizationEnergy: 5.974, electronAffinity: 0, valence: 3, abundance: "synthetic", hardness: null, conductivity: "moderate", magnetism: "paramagnetic", crystalStructure: "dhcp", protons: 95, neutrons: 148, electrons: 95, shells: [2, 8, 18, 32, 25, 8, 2], xpos: 9, ypos: 9, description: "Synthetic actinide found in smoke detectors as Am-241. Created in nuclear reactors." },
  { number: 96, symbol: "Cm", name: "Curium", mass: 247, group: 3, period: 7, category: "actinide", electronegativity: 1.3, radius: null, meltingPoint: 1345, boilingPoint: 3110, density: 13.51, oxidationStates: "+4, +3", electronConfig: "[Rn] 5f⁷ 6d¹ 7s²", discovered: 1944, discoveredBy: "Glenn T. Seaborg", phase: "Solid", ionizationEnergy: 5.991, electronAffinity: 0, valence: 3, abundance: "synthetic", hardness: null, conductivity: "moderate", magnetism: "paramagnetic", crystalStructure: "dhcp", protons: 96, neutrons: 151, electrons: 96, shells: [2, 8, 18, 32, 25, 9, 2], xpos: 10, ypos: 9, description: "Named after Marie and Pierre Curie. Used in alpha particle X-ray spectrometers on Mars rovers." },
  { number: 97, symbol: "Bk", name: "Berkelium", mass: 247, group: 3, period: 7, category: "actinide", electronegativity: 1.3, radius: null, meltingPoint: 986, boilingPoint: null, density: 14.79, oxidationStates: "+4, +3", electronConfig: "[Rn] 5f⁹ 7s²", discovered: 1949, discoveredBy: "Glenn T. Seaborg", phase: "Solid", ionizationEnergy: 6.198, electronAffinity: 0, valence: 3, abundance: "synthetic", hardness: null, conductivity: "moderate", magnetism: "unknown", crystalStructure: "dhcp", protons: 97, neutrons: 150, electrons: 97, shells: [2, 8, 18, 32, 27, 8, 2], xpos: 11, ypos: 9, description: "Radioactive synthetic element named after Berkeley, California. Very rare, only micrograms produced." },
  { number: 98, symbol: "Cf", name: "Californium", mass: 251, group: 3, period: 7, category: "actinide", electronegativity: 1.3, radius: null, meltingPoint: 900, boilingPoint: null, density: 15.1, oxidationStates: "+4, +3", electronConfig: "[Rn] 5f¹⁰ 7s²", discovered: 1950, discoveredBy: "Glenn T. Seaborg", phase: "Solid", ionizationEnergy: 6.282, electronAffinity: 0, valence: 3, abundance: "synthetic", hardness: null, conductivity: "moderate", magnetism: "unknown", crystalStructure: "dhcp", protons: 98, neutrons: 153, electrons: 98, shells: [2, 8, 18, 32, 28, 8, 2], xpos: 12, ypos: 9, description: "Used as a neutron source for detecting gold and silver ore and treating cancer." },
  { number: 99, symbol: "Es", name: "Einsteinium", mass: 252, group: 3, period: 7, category: "actinide", electronegativity: 1.3, radius: null, meltingPoint: 860, boilingPoint: null, density: 8.84, oxidationStates: "+3", electronConfig: "[Rn] 5f¹¹ 7s²", discovered: 1952, discoveredBy: "Albert Ghiorso", phase: "Solid", ionizationEnergy: 6.42, electronAffinity: 0, valence: 3, abundance: "synthetic", hardness: null, conductivity: "moderate", magnetism: "unknown", crystalStructure: "fcc", protons: 99, neutrons: 153, electrons: 99, shells: [2, 8, 18, 32, 29, 8, 2], xpos: 13, ypos: 9, description: "Named after Albert Einstein. Discovered in debris of first hydrogen bomb test." },
  { number: 100, symbol: "Fm", name: "Fermium", mass: 257, group: 3, period: 7, category: "actinide", electronegativity: 1.3, radius: null, meltingPoint: 1527, boilingPoint: null, density: null, oxidationStates: "+3", electronConfig: "[Rn] 5f¹² 7s²", discovered: 1952, discoveredBy: "Albert Ghiorso", phase: "Solid", ionizationEnergy: 6.5, electronAffinity: 0, valence: 3, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 100, neutrons: 157, electrons: 100, shells: [2, 8, 18, 32, 30, 8, 2], xpos: 14, ypos: 9, description: "Named after Enrico Fermi. No practical uses due to extreme rarity, only atoms produced at a time." },
  { number: 101, symbol: "Md", name: "Mendelevium", mass: 258, group: 3, period: 7, category: "actinide", electronegativity: 1.3, radius: null, meltingPoint: 827, boilingPoint: null, density: null, oxidationStates: "+3", electronConfig: "[Rn] 5f¹³ 7s²", discovered: 1955, discoveredBy: "Albert Ghiorso", phase: "Solid", ionizationEnergy: 6.58, electronAffinity: 0, valence: 3, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 101, neutrons: 157, electrons: 101, shells: [2, 8, 18, 32, 31, 8, 2], xpos: 15, ypos: 9, description: "Named after Dmitri Mendeleev, creator of the periodic table. Only nanograms ever produced." },
  { number: 102, symbol: "No", name: "Nobelium", mass: 259, group: 3, period: 7, category: "actinide", electronegativity: 1.3, radius: null, meltingPoint: 827, boilingPoint: null, density: null, oxidationStates: "+3, +2", electronConfig: "[Rn] 5f¹⁴ 7s²", discovered: 1966, discoveredBy: "Georgy Flyorov", phase: "Solid", ionizationEnergy: 6.65, electronAffinity: 0, valence: 3, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 102, neutrons: 157, electrons: 102, shells: [2, 8, 18, 32, 32, 8, 2], xpos: 16, ypos: 9, description: "Named after Alfred Nobel. Synthetic element with no known practical applications." },
  { number: 103, symbol: "Lr", name: "Lawrencium", mass: 262, group: 3, period: 7, category: "actinide", electronegativity: 1.3, radius: null, meltingPoint: 1627, boilingPoint: null, density: null, oxidationStates: "+3", electronConfig: "[Rn] 5f¹⁴ 7s² 7p¹", discovered: 1961, discoveredBy: "Albert Ghiorso", phase: "Solid", ionizationEnergy: 4.9, electronAffinity: 0, valence: 3, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 103, neutrons: 159, electrons: 103, shells: [2, 8, 18, 32, 32, 8, 3], xpos: 17, ypos: 9, description: "Last actinide element. Named after Ernest Lawrence, inventor of the cyclotron." },
  { number: 104, symbol: "Rf", name: "Rutherfordium", mass: 267, group: 4, period: 7, category: "transition metal", electronegativity: null, radius: null, meltingPoint: 2100, boilingPoint: 5500, density: 23.2, oxidationStates: "+4", electronConfig: "[Rn] 5f¹⁴ 6d² 7s²", discovered: 1969, discoveredBy: "Albert Ghiorso", phase: "Solid", ionizationEnergy: 6.01, electronAffinity: 0, valence: 4, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 104, neutrons: 163, electrons: 104, shells: [2, 8, 18, 32, 32, 10, 2], xpos: 4, ypos: 7, description: "Named after Ernest Rutherford. Superheavy transactinide element with no practical uses." },
  { number: 105, symbol: "Db", name: "Dubnium", mass: 268, group: 5, period: 7, category: "transition metal", electronegativity: null, radius: null, meltingPoint: null, boilingPoint: null, density: 29.3, oxidationStates: "+5", electronConfig: "[Rn] 5f¹⁴ 6d³ 7s²", discovered: 1970, discoveredBy: "Albert Ghiorso", phase: "Solid", ionizationEnergy: null, electronAffinity: 0, valence: 5, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 105, neutrons: 163, electrons: 105, shells: [2, 8, 18, 32, 32, 11, 2], xpos: 5, ypos: 7, description: "Named after Dubna, Russia. Transactinide element, only atoms produced at a time." },
  { number: 106, symbol: "Sg", name: "Seaborgium", mass: 271, group: 6, period: 7, category: "transition metal", electronegativity: null, radius: null, meltingPoint: null, boilingPoint: null, density: 35.0, oxidationStates: "+6", electronConfig: "[Rn] 5f¹⁴ 6d⁴ 7s²", discovered: 1974, discoveredBy: "Albert Ghiorso", phase: "Solid", ionizationEnergy: null, electronAffinity: 0, valence: 6, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 106, neutrons: 165, electrons: 106, shells: [2, 8, 18, 32, 32, 12, 2], xpos: 6, ypos: 7, description: "Named after Glenn T. Seaborg. Extremely radioactive with half-life of only minutes." },
  { number: 107, symbol: "Bh", name: "Bohrium", mass: 272, group: 7, period: 7, category: "transition metal", electronegativity: null, radius: null, meltingPoint: null, boilingPoint: null, density: 37.1, oxidationStates: "+7", electronConfig: "[Rn] 5f¹⁴ 6d⁵ 7s²", discovered: 1981, discoveredBy: "Gottfried Münzenberg", phase: "Solid", ionizationEnergy: null, electronAffinity: 0, valence: 7, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 107, neutrons: 165, electrons: 107, shells: [2, 8, 18, 32, 32, 13, 2], xpos: 7, ypos: 7, description: "Named after Niels Bohr. Decays rapidly with half-life of 17 seconds for most stable isotope." },
  { number: 108, symbol: "Hs", name: "Hassium", mass: 277, group: 8, period: 7, category: "transition metal", electronegativity: null, radius: null, meltingPoint: null, boilingPoint: null, density: 40.7, oxidationStates: "+8", electronConfig: "[Rn] 5f¹⁴ 6d⁶ 7s²", discovered: 1984, discoveredBy: "Gottfried Münzenberg", phase: "Solid", ionizationEnergy: null, electronAffinity: 0, valence: 8, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 108, neutrons: 169, electrons: 108, shells: [2, 8, 18, 32, 32, 14, 2], xpos: 8, ypos: 7, description: "Named after Hesse, Germany. Predicted to be a solid metal with very high melting point." },
  { number: 109, symbol: "Mt", name: "Meitnerium", mass: 278, group: 9, period: 7, category: "transition metal", electronegativity: null, radius: null, meltingPoint: null, boilingPoint: null, density: 37.4, oxidationStates: "+6, +3", electronConfig: "[Rn] 5f¹⁴ 6d⁷ 7s²", discovered: 1982, discoveredBy: "Gottfried Münzenberg", phase: "Solid", ionizationEnergy: null, electronAffinity: 0, valence: 3, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 109, neutrons: 169, electrons: 109, shells: [2, 8, 18, 32, 32, 15, 2], xpos: 9, ypos: 7, description: "Named after Lise Meitner, co-discoverer of nuclear fission. Highly unstable." },
  { number: 110, symbol: "Ds", name: "Darmstadtium", mass: 281, group: 10, period: 7, category: "transition metal", electronegativity: null, radius: null, meltingPoint: null, boilingPoint: null, density: 34.8, oxidationStates: "+8,+6,+4,+2", electronConfig: "[Rn] 5f¹⁴ 6d⁸ 7s²", discovered: 1994, discoveredBy: "Sigurd Hofmann", phase: "Solid", ionizationEnergy: null, electronAffinity: 0, valence: 6, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 110, neutrons: 171, electrons: 110, shells: [2, 8, 18, 32, 32, 16, 2], xpos: 10, ypos: 7, description: "Named after Darmstadt, Germany. Decays in milliseconds. No practical applications." },
  { number: 111, symbol: "Rg", name: "Roentgenium", mass: 282, group: 11, period: 7, category: "transition metal", electronegativity: null, radius: null, meltingPoint: null, boilingPoint: null, density: 28.7, oxidationStates: "+3, +1", electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s¹", discovered: 1994, discoveredBy: "Sigurd Hofmann", phase: "Solid", ionizationEnergy: null, electronAffinity: 0, valence: 3, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 111, neutrons: 171, electrons: 111, shells: [2, 8, 18, 32, 32, 17, 2], xpos: 11, ypos: 7, description: "Named after Wilhelm Röntgen, discoverer of X-rays. Extremely radioactive and unstable." },
  { number: 112, symbol: "Cn", name: "Copernicium", mass: 285, group: 12, period: 7, category: "transition metal", electronegativity: null, radius: null, meltingPoint: null, boilingPoint: null, density: 23.7, oxidationStates: "+4, +2", electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s²", discovered: 1996, discoveredBy: "Sigurd Hofmann", phase: "Gas", ionizationEnergy: null, electronAffinity: 0, valence: 2, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 112, neutrons: 173, electrons: 112, shells: [2, 8, 18, 32, 32, 18, 2], xpos: 12, ypos: 7, description: "Named after Nicolaus Copernicus. May be a gas at room temperature unlike other metals." },
  { number: 113, symbol: "Nh", name: "Nihonium", mass: 286, group: 13, period: 7, category: "post-transition metal", electronegativity: null, radius: null, meltingPoint: 430, boilingPoint: 1130, density: 16.0, oxidationStates: "+3, +1", electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹", discovered: 2004, discoveredBy: "Kosuke Morita", phase: "Solid", ionizationEnergy: null, electronAffinity: 0, valence: 3, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 113, neutrons: 173, electrons: 113, shells: [2, 8, 18, 32, 32, 18, 3], xpos: 13, ypos: 7, description: "Named after Japan (Nihon). First element discovered in Asia. Decays in milliseconds." },
  { number: 114, symbol: "Fl", name: "Flerovium", mass: 289, group: 14, period: 7, category: "post-transition metal", electronegativity: null, radius: null, meltingPoint: null, boilingPoint: null, density: 14.0, oxidationStates: "+6, +4, +2", electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²", discovered: 1999, discoveredBy: "Yuri Oganessian", phase: "Solid", ionizationEnergy: null, electronAffinity: 0, valence: 4, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 114, neutrons: 175, electrons: 114, shells: [2, 8, 18, 32, 32, 18, 4], xpos: 14, ypos: 7, description: "Named after Flerov Laboratory. May behave like a noble gas rather than a metal. Very unstable." },
  { number: 115, symbol: "Mc", name: "Moscovium", mass: 290, group: 15, period: 7, category: "post-transition metal", electronegativity: null, radius: null, meltingPoint: 400, boilingPoint: 1100, density: 13.5, oxidationStates: "+3, +1", electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³", discovered: 2003, discoveredBy: "Yuri Oganessian", phase: "Solid", ionizationEnergy: null, electronAffinity: 0, valence: 3, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 115, neutrons: 175, electrons: 115, shells: [2, 8, 18, 32, 32, 18, 5], xpos: 15, ypos: 7, description: "Named after Moscow Oblast, Russia. Confirmed as element 115 in 2015. Decays in microseconds." },
  { number: 116, symbol: "Lv", name: "Livermorium", mass: 293, group: 16, period: 7, category: "post-transition metal", electronegativity: null, radius: null, meltingPoint: 637, boilingPoint: 1085, density: 12.9, oxidationStates: "+4, +2", electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴", discovered: 2000, discoveredBy: "Yuri Oganessian", phase: "Solid", ionizationEnergy: null, electronAffinity: 0, valence: 4, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 116, neutrons: 177, electrons: 116, shells: [2, 8, 18, 32, 32, 18, 6], xpos: 16, ypos: 7, description: "Named after Livermore, California. Decays almost immediately with half-life of milliseconds." },
  { number: 117, symbol: "Ts", name: "Tennessine", mass: 294, group: 17, period: 7, category: "halogen", electronegativity: null, radius: null, meltingPoint: 623, boilingPoint: 883, density: 7.17, oxidationStates: "+5, +3, +1, -1", electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵", discovered: 2010, discoveredBy: "Yuri Oganessian", phase: "Solid", ionizationEnergy: null, electronAffinity: 0, valence: 1, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 117, neutrons: 177, electrons: 117, shells: [2, 8, 18, 32, 32, 18, 7], xpos: 17, ypos: 7, description: "Named after Tennessee, USA. Newest confirmed element. Expected to have properties of a metalloid." },
  { number: 118, symbol: "Og", name: "Oganesson", mass: 294, group: 18, period: 7, category: "noble gas", electronegativity: null, radius: null, meltingPoint: 52, boilingPoint: 177, density: 7.0, oxidationStates: "0, +4, +6", electronConfig: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶", discovered: 2002, discoveredBy: "Yuri Oganessian", phase: "Solid", ionizationEnergy: null, electronAffinity: 0, valence: 0, abundance: "synthetic", hardness: null, conductivity: "unknown", magnetism: "unknown", crystalStructure: "unknown", protons: 118, neutrons: 176, electrons: 118, shells: [2, 8, 18, 32, 32, 18, 8], xpos: 18, ypos: 7, description: "Named after physicist Yuri Oganessian. Heaviest element confirmed. May be a solid, not a gas." },
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

function AtomicAnimation({ element, dark }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;

    const shells = element.shells || [element.electrons];
    const maxShell = shells.length;
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

      // Background glow
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.5);
      bgGrad.addColorStop(0, dark ? "rgba(30,30,50,0.8)" : "rgba(240,240,255,0.8)");
      bgGrad.addColorStop(1, dark ? "rgba(10,10,20,0)" : "rgba(255,255,255,0)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Draw shells
      electronPositions.forEach((shell, i) => {
        const r = baseRadius + i * shellGap;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = dark ? `rgba(255,255,255,0.12)` : `rgba(0,0,100,0.08)`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Nucleus
      const nucGrad = ctx.createRadialGradient(cx - 4, cy - 4, 0, cx, cy, baseRadius * 0.7);
      nucGrad.addColorStop(0, "#fff");
      nucGrad.addColorStop(0.3, glowColor);
      nucGrad.addColorStop(1, dark ? "#1a1a3e" : "#4444cc");
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = nucGrad;
      ctx.fill();

      // Nucleus glow
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 0.7, 0, Math.PI * 2);
      const nGlow = ctx.createRadialGradient(cx, cy, baseRadius * 0.4, cx, cy, baseRadius * 0.9);
      nGlow.addColorStop(0, glowColor + "66");
      nGlow.addColorStop(1, "transparent");
      ctx.fillStyle = nGlow;
      ctx.fill();

      // Nucleus text
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.max(10, baseRadius * 0.5)}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(element.symbol, cx, cy);

      // Draw electrons
      electronPositions.forEach((shell, si) => {
        shell.forEach((e, ei) => {
          const a = e.angle + t * e.speed;
          const ex = cx + Math.cos(a) * e.r;
          const ey = cy + Math.sin(a) * e.r;

          // Electron glow trail
          const trailLen = 8;
          for (let tr = 0; tr < trailLen; tr++) {
            const ta = a - (tr * 0.15 * Math.sign(e.speed));
            const tx = cx + Math.cos(ta) * e.r;
            const ty = cy + Math.sin(ta) * e.r;
            ctx.beginPath();
            ctx.arc(tx, ty, 3 * (1 - tr / trailLen), 0, Math.PI * 2);
            ctx.fillStyle = glowColor + Math.floor((1 - tr / trailLen) * 60).toString(16).padStart(2, "0");
            ctx.fill();
          }

          // Electron
          const eGrad = ctx.createRadialGradient(ex - 1, ey - 1, 0, ex, ey, 5);
          eGrad.addColorStop(0, "#ffffff");
          eGrad.addColorStop(0.4, glowColor);
          eGrad.addColorStop(1, glowColor + "00");
          ctx.beginPath();
          ctx.arc(ex, ey, 5, 0, Math.PI * 2);
          ctx.fillStyle = eGrad;
          ctx.fill();
        });
      });

      // Protons & neutrons count
      ctx.fillStyle = dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
      ctx.font = "10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`${element.protons}p  ${element.neutrons}n`, cx, cy + baseRadius * 0.72 + 12);
    }

    function loop() {
      timeRef.current += 0.016;
      draw(timeRef.current);
      animRef.current = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [element, dark]);

  return (
    <canvas
      ref={canvasRef}
      width={280}
      height={280}
      style={{ width: "100%", maxWidth: "280px", display: "block", margin: "0 auto" }}
    />
  );
}

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

function ElementModal({ element, onClose, dark }) {
  const [activeTab, setActiveTab] = useState("overview");
  const catColor = CATEGORY_COLORS[element.category] || { light: "#6bcb77", dark: "#4caf50" };
  const accent = dark ? catColor.dark : catColor.light;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const tabs = ["overview", "properties", "bonds", "history"];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: dark ? "rgba(0,0,0,0.85)" : "rgba(0,0,30,0.65)",
        backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
        animation: "fadeIn 0.25s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: "780px", maxHeight: "90vh",
          background: dark ? "#0f0f1a" : "#f8f8ff",
          borderRadius: "20px",
          border: `1px solid ${accent}44`,
          overflow: "hidden",
          display: "flex", flexDirection: "column",
          animation: "slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          boxShadow: `0 0 60px ${accent}33, 0 30px 80px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Header */}
        <div style={{
          padding: "24px 28px 0",
          background: `linear-gradient(135deg, ${accent}22 0%, transparent 60%)`,
          borderBottom: `1px solid ${accent}33`,
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", marginBottom: "16px" }}>
            <div style={{
              width: "80px", height: "80px", borderRadius: "16px",
              background: `linear-gradient(135deg, ${accent}33, ${accent}11)`,
              border: `2px solid ${accent}66`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <div style={{ fontSize: "9px", opacity: 0.6 }}>{element.number}</div>
              <div style={{ fontSize: "32px", fontWeight: 700, lineHeight: 1, color: accent }}>{element.symbol}</div>
              <div style={{ fontSize: "8px", opacity: 0.5 }}>{element.mass.toFixed(2)}</div>
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: 0, fontSize: "26px", fontWeight: 700, color: dark ? "#fff" : "#111" }}>{element.name}</h2>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "6px" }}>
                <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: accent + "33", color: accent, fontWeight: 600 }}>
                  {catColor.label}
                </span>
                <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: dark ? "#ffffff11" : "#00000011", color: dark ? "#aaa" : "#555" }}>
                  Period {element.period} · Group {element.group}
                </span>
                <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: dark ? "#ffffff11" : "#00000011", color: dark ? "#aaa" : "#555" }}>
                  {element.phase}
                </span>
              </div>
              <p style={{ margin: "10px 0 0", fontSize: "13px", opacity: 0.65, lineHeight: 1.5 }}>{element.description}</p>
            </div>
            <button
              onClick={onClose}
              style={{
                width: "32px", height: "32px", borderRadius: "50%",
                background: dark ? "#ffffff15" : "#00000010",
                border: "none", cursor: "pointer",
                color: dark ? "#fff" : "#333",
                fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}
            >×</button>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "4px" }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setActiveTab(t)} style={{
                padding: "8px 16px", fontSize: "12px", fontWeight: 600,
                border: "none", borderRadius: "8px 8px 0 0",
                cursor: "pointer", textTransform: "capitalize",
                background: activeTab === t ? (dark ? "#0f0f1a" : "#f8f8ff") : "transparent",
                color: activeTab === t ? accent : (dark ? "#666" : "#999"),
                borderBottom: activeTab === t ? `2px solid ${accent}` : "2px solid transparent",
                transition: "all 0.2s",
              }}>{t}</button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ overflowY: "auto", flex: 1, padding: "24px 28px" }}>
          {activeTab === "overview" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <AtomicAnimation element={element} dark={dark} />
                <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
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
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "12px", opacity: 0.5, textTransform: "uppercase", letterSpacing: "1px" }}>Key Properties</div>
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
                  <div key={label} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "8px 0", borderBottom: `1px solid ${dark ? "#ffffff08" : "#00000008"}`,
                    fontSize: "13px",
                  }}>
                    <span style={{ opacity: 0.6 }}>{label}</span>
                    <span style={{ fontWeight: 500, textAlign: "right", maxWidth: "55%" }}>{value}</span>
                  </div>
                ))}

                {/* Electron shells visualization */}
                <div style={{ marginTop: "16px" }}>
                  <div style={{ fontSize: "12px", opacity: 0.5, marginBottom: "8px" }}>Electron Shells</div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {(element.shells || [element.electrons]).map((count, i) => (
                      <div key={i} style={{ textAlign: "center" }}>
                        <div style={{
                          width: "36px", height: "36px", borderRadius: "50%",
                          border: `2px solid ${accent}66`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "14px", fontWeight: 700, color: accent,
                        }}>{count}</div>
                        <div style={{ fontSize: "9px", opacity: 0.4, marginTop: "3px" }}>n={i + 1}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "properties" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "16px", opacity: 0.5, textTransform: "uppercase", letterSpacing: "1px" }}>Thermal & Physical</div>
                <PropertyBar label="Melting Point" value={element.meltingPoint} max={4000} unit="°C" color={accent} />
                <PropertyBar label="Boiling Point" value={element.boilingPoint} max={5000} unit="°C" color={accent} />
                <PropertyBar label="Density" value={element.density} max={25} unit=" g/cm³" color={accent} />
                {element.hardness && <PropertyBar label="Hardness (Mohs)" value={element.hardness} max={10} unit="" color={accent} />}

                <div style={{ marginTop: "20px", padding: "16px", borderRadius: "12px", background: dark ? "#ffffff06" : "#00000004", border: `1px solid ${accent}22` }}>
                  <div style={{ fontSize: "12px", opacity: 0.5, marginBottom: "12px" }}>PHASE TRANSITIONS</div>
                  <div style={{ position: "relative", height: "40px" }}>
                    <div style={{ position: "absolute", inset: "50% 0 0", height: "4px", background: `linear-gradient(to right, #4488ff, #ffaa00, #ff4444)`, borderRadius: "2px", transform: "translateY(-50%)" }} />
                    {["Solid", "Liquid", "Gas"].map((p, i) => (
                      <div key={p} style={{ position: "absolute", left: `${i * 50}%`, textAlign: "center", transform: "translateX(-50%)" }}>
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: ["#4488ff","#ffaa00","#ff4444"][i], border: "2px solid white", margin: "0 auto 4px" }} />
                        <div style={{ fontSize: "9px", opacity: 0.5 }}>{p}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", opacity: 0.6, marginTop: "8px" }}>
                    <span>MP: {element.meltingPoint}°C</span>
                    <span>BP: {element.boilingPoint}°C</span>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "16px", opacity: 0.5, textTransform: "uppercase", letterSpacing: "1px" }}>Electronic Properties</div>
                <PropertyBar label="Ionization Energy" value={element.ionizationEnergy} max={25} unit=" eV" color="#ff6b6b" />
                <PropertyBar label="Electron Affinity" value={element.electronAffinity} max={4} unit=" eV" color="#4d96ff" />
                {element.electronegativity && <PropertyBar label="Electronegativity" value={element.electronegativity} max={4} unit="" color="#c77dff" />}

                <div style={{ marginTop: "20px" }}>
                  <div style={{ fontSize: "12px", opacity: 0.5, marginBottom: "10px" }}>CONDUCTIVITY & MAGNETISM</div>
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

                <div style={{ marginTop: "16px", padding: "16px", borderRadius: "12px", background: dark ? "#ffffff06" : "#00000004", border: `1px solid ${accent}22` }}>
                  <div style={{ fontSize: "12px", opacity: 0.5, marginBottom: "10px" }}>ALL PROPERTIES AT A GLANCE</div>
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
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", padding: "5px 0", borderBottom: `1px solid ${dark ? "#ffffff06" : "#00000006"}` }}>
                      <span style={{ opacity: 0.55 }}>{k}</span>
                      <span style={{ fontWeight: 500 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "bonds" && (
            <div>
              <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "16px", opacity: 0.5, textTransform: "uppercase", letterSpacing: "1px" }}>Chemical Bonding</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
                {[
                  { type: "Ionic Bond", strength: "150-400 kJ/mol", desc: "Transfer of electrons between atoms", possible: element.electronegativity != null && (element.electronegativity < 1.5 || element.electronegativity > 3.0), color: "#ff6b6b" },
                  { type: "Covalent Bond", strength: "150-1100 kJ/mol", desc: "Sharing of electrons between atoms", possible: element.electronegativity != null && element.electronegativity >= 1.5 && element.electronegativity <= 3.5, color: "#4d96ff" },
                  { type: "Metallic Bond", strength: "70-850 kJ/mol", desc: "Delocalized electrons in metal lattice", possible: ["alkali metal","alkaline earth metal","transition metal","post-transition metal"].includes(element.category), color: "#ffd93d" },
                  { type: "Hydrogen Bond", strength: "5-30 kJ/mol", desc: "Weak electrostatic attraction to H", possible: ["N","O","F"].includes(element.symbol), color: "#c77dff" },
                  { type: "Van der Waals", strength: "0.5-10 kJ/mol", desc: "Weak temporary dipole forces", possible: true, color: "#6bcb77" },
                  { type: "Coordinate Bond", strength: "200-500 kJ/mol", desc: "Lone pair donation from one atom", possible: element.valence >= 1, color: "#ff9f1c" },
                ].map(({ type, strength, desc, possible, color }) => (
                  <div key={type} style={{
                    padding: "16px", borderRadius: "12px",
                    background: possible ? (dark ? color + "15" : color + "10") : (dark ? "#ffffff05" : "#00000003"),
                    border: `1px solid ${possible ? color + "44" : (dark ? "#ffffff10" : "#00000010")}`,
                    opacity: possible ? 1 : 0.4,
                    transition: "all 0.3s",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: possible ? color : "inherit" }}>{type}</span>
                      {possible && <span style={{ fontSize: "9px", padding: "2px 6px", background: color + "33", color, borderRadius: "20px", fontWeight: 700 }}>FORMS</span>}
                    </div>
                    <div style={{ fontSize: "11px", fontWeight: 500, opacity: 0.6, marginBottom: "4px" }}>{strength}</div>
                    <div style={{ fontSize: "11px", opacity: 0.5 }}>{desc}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "24px", padding: "20px", borderRadius: "14px", background: dark ? "#ffffff06" : "#00000004", border: `1px solid ${accent}22` }}>
                <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "14px", opacity: 0.5 }}>BOND STRENGTH COMPARISON</div>
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

          {activeTab === "history" && (
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
              <div style={{ display: "flex", gap: "16px", padding: "20px", borderRadius: "14px", background: dark ? "#ffffff06" : "#00000004", border: `1px solid ${accent}22`, marginBottom: "20px" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: accent + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", flexShrink: 0 }}>⚗️</div>
                <div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: accent }}>{element.discovered < 0 ? `${Math.abs(element.discovered)} BC` : element.discovered}</div>
                  <div style={{ fontSize: "13px", opacity: 0.5 }}>Year of Discovery</div>
                  <div style={{ marginTop: "6px", fontSize: "14px" }}>Discovered by <strong>{element.discoveredBy}</strong></div>
                </div>
              </div>

              <div style={{ position: "relative", paddingLeft: "24px", borderLeft: `2px solid ${accent}33` }}>
                {[
                  { year: element.discovered < 0 ? `${Math.abs(element.discovered)} BC` : element.discovered, event: `${element.name} first discovered by ${element.discoveredBy}` },
                  { year: "1869", event: `Placed in Mendeleev's periodic table (Group ${element.group})` },
                  { year: "1913", event: `Atomic number ${element.number} confirmed by Moseley's X-ray experiments` },
                  { year: "1932", event: `Isotopes and neutron count (${element.neutrons}n) established by Chadwick's discovery` },
                  { year: "Today", event: `Critical applications: ${element.conductivity === "excellent" ? "high-performance conductors" : element.category === "noble gas" ? "inert gas applications" : "industrial and chemical uses"}` },
                ].map(({ year, event }) => (
                  <div key={year} style={{ marginBottom: "20px", position: "relative" }}>
                    <div style={{ position: "absolute", left: "-29px", width: "10px", height: "10px", borderRadius: "50%", background: accent, top: "4px" }} />
                    <div style={{ fontSize: "12px", fontWeight: 700, color: accent, marginBottom: "4px" }}>{year}</div>
                    <div style={{ fontSize: "13px", opacity: 0.7 }}>{event}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "20px", padding: "16px", borderRadius: "12px", background: accent + "11", border: `1px solid ${accent}33` }}>
                <div style={{ fontSize: "12px", opacity: 0.5, marginBottom: "8px" }}>FUN FACT</div>
                <div style={{ fontSize: "13px" }}>
                  {element.symbol !== element.name.slice(0, element.symbol.length)
                    ? `The symbol "${element.symbol}" comes from its ${element.discoveredBy.includes("Ancient") ? "ancient name" : "Latin or Greek name"}, not directly from "${element.name}".`
                    : `The symbol "${element.symbol}" is derived directly from the element's name.`}
                  {" "}This element has {element.shells?.length || 1} electron shell{(element.shells?.length || 1) > 1 ? "s" : ""} with a configuration of {element.electronConfig}.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ElementCard({ element, highlight, dimmed, onClick, dark }) {
  const catColor = CATEGORY_COLORS[element.category] || { light: "#888", dark: "#666" };
  const color = dark ? catColor.dark : catColor.light;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onClick(element)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
        borderRadius: "8px",
        padding: "4px 3px",
        background: hovered
          ? color + "33"
          : highlight
            ? color + "25"
            : dimmed
              ? (dark ? "#ffffff05" : "#00000005")
              : (dark ? "#ffffff0a" : "#00000008"),
        border: `1px solid ${highlight || hovered ? color + "88" : (dark ? "#ffffff10" : "#00000010")}`,
        transform: hovered ? "scale(1.08) translateY(-2px)" : "scale(1)",
        transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
        opacity: dimmed ? 0.3 : 1,
        display: "flex", flexDirection: "column", alignItems: "center",
        minWidth: 0,
        boxShadow: hovered ? `0 4px 20px ${color}44` : "none",
        userSelect: "none",
      }}
    >
      <span style={{ fontSize: "7px", opacity: 0.4, alignSelf: "flex-end", lineHeight: 1 }}>{element.number}</span>
      <span style={{ fontSize: "clamp(10px, 1.8vw, 16px)", fontWeight: 700, color, lineHeight: 1 }}>{element.symbol}</span>
      <span style={{ fontSize: "clamp(5px, 0.9vw, 8px)", opacity: 0.55, lineHeight: 1.2, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "100%" }}>{element.name}</span>
      <span style={{ fontSize: "clamp(4px, 0.7vw, 7px)", opacity: 0.35, lineHeight: 1 }}>{element.mass.toFixed(1)}</span>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [hoverGroup, setHoverGroup] = useState(null);

  const matchesSearch = useCallback((el) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      el.name.toLowerCase().includes(s) ||
      el.symbol.toLowerCase().includes(s) ||
      String(el.number).includes(s) ||
      el.category.toLowerCase().includes(s)
    );
  }, [search]);

  const isHighlighted = useCallback((el) => {
    const gMatch = groupFilter === "all" || el.category === groupFilter;
    const sMatch = matchesSearch(el);
    return gMatch && sMatch;
  }, [groupFilter, matchesSearch]);

  const anyFilter = search || groupFilter !== "all";

  // Build grid: 18 cols × 9 rows (standard layout placeholder)
  // We'll position elements at their xpos/ypos
  const grid = Array.from({ length: 9 }, () => Array(18).fill(null));
  ELEMENTS.forEach(el => {
    if (el.ypos <= 9 && el.xpos <= 18) {
      grid[el.ypos - 1][el.xpos - 1] = el;
    }
  });

  const bg = dark ? "#08081a" : "#f0f0f8";
  const text = dark ? "#e8e8ff" : "#111128";
  const surface = dark ? "#12122a" : "#ffffff";
  const border = dark ? "#ffffff12" : "#00000012";

  return (
    <div style={{ minHeight: "100vh", background: bg, color: text, fontFamily: "'Segoe UI', system-ui, sans-serif", display: "flex", flexDirection: "column" }}>
      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform:translateY(40px) scale(0.95) } to { opacity:1; transform:translateY(0) scale(1) } }
        @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        * { box-sizing: border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:6px; height:6px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(128,128,200,0.3); border-radius:3px; }
        input { outline:none; }
      `}</style>

      {/* Header */}
      <header style={{ padding: "20px 24px 16px", borderBottom: `1px solid ${border}`, background: surface }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <h1 style={{ fontSize: "clamp(18px, 3vw, 28px)", fontWeight: 800, letterSpacing: "-0.5px", background: "linear-gradient(135deg, #6c63ff, #ff6b9d, #ffd93d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                ⚛ Periodic Table
              </h1>
              <p style={{ fontSize: "12px", opacity: 0.4, marginTop: "2px" }}>Interactive Element Explorer · {ELEMENTS.length} Elements</p>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {/* Search */}
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", opacity: 0.4, fontSize: "14px" }}>🔍</span>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search elements..."
                  style={{
                    padding: "8px 12px 8px 32px", borderRadius: "10px",
                    border: `1px solid ${border}`,
                    background: dark ? "#ffffff0a" : "#00000008",
                    color: text, fontSize: "13px", width: "180px",
                    transition: "all 0.2s",
                  }}
                />
              </div>
              {/* Dark mode toggle */}
              <button
                onClick={() => setDark(d => !d)}
                style={{
                  padding: "8px 16px", borderRadius: "10px", border: `1px solid ${border}`,
                  background: dark ? "#ffffff15" : "#00000010", color: text,
                  cursor: "pointer", fontSize: "13px", fontWeight: 600,
                  transition: "all 0.2s",
                }}
              >
                {dark ? "☀️ Light" : "🌙 Dark"}
              </button>
            </div>
          </div>

          {/* Group filter pills */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {GROUPS_FILTER.map(g => {
              const catColor = CATEGORY_COLORS[g.id];
              const active = groupFilter === g.id;
              const c = catColor ? (dark ? catColor.dark : catColor.light) : (dark ? "#8888ff" : "#5555cc");
              return (
                <button
                  key={g.id}
                  onClick={() => setGroupFilter(active ? "all" : g.id)}
                  onMouseEnter={() => setHoverGroup(g.id)}
                  onMouseLeave={() => setHoverGroup(null)}
                  style={{
                    padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: 600,
                    cursor: "pointer", border: `1px solid ${active ? c : (dark ? "#ffffff15" : "#00000015")}`,
                    background: active ? c + "33" : "transparent",
                    color: active ? c : (dark ? "#aaa" : "#666"),
                    transition: "all 0.2s",
                    transform: active ? "scale(1.05)" : "scale(1)",
                  }}
                >{g.label}</button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Legend */}
      <div style={{ padding: "8px 24px", background: surface, borderBottom: `1px solid ${border}`, overflowX: "auto" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", maxWidth: "1400px", margin: "0 auto" }}>
          <span style={{ fontSize: "10px", opacity: 0.4, whiteSpace: "nowrap" }}>LEGEND:</span>
          {Object.entries(CATEGORY_COLORS).map(([key, val]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "3px", background: dark ? val.dark : val.light }} />
              <span style={{ fontSize: "10px", opacity: 0.5 }}>{val.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <main style={{ flex: 1, padding: "16px 12px", overflowX: "auto" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(18, minmax(42px, 1fr))",
            gap: "3px",
            minWidth: "720px",
          }}>
            {grid.map((row, ri) =>
              row.map((el, ci) => {
                const key = `${ri}-${ci}`;
                if (!el) {
                  // Special label cells
                  if (ri === 5 && ci === 2) return <div key={key} style={{ gridColumn: "3/4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", opacity: 0.3, fontStyle: "italic" }}>57-71</div>;
                  if (ri === 6 && ci === 2) return <div key={key} style={{ gridColumn: "3/4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", opacity: 0.3, fontStyle: "italic" }}>89-103</div>;
                  return <div key={key} style={{ minHeight: "52px" }} />;
                }
                const high = isHighlighted(el);
                const dim = anyFilter && !high;
                return (
                  <ElementCard
                    key={el.number}
                    element={el}
                    highlight={high && anyFilter}
                    dimmed={dim}
                    onClick={setSelected}
                    dark={dark}
                  />
                );
              })
            )}
          </div>

          {/* Stats bar */}
          <div style={{ marginTop: "20px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {[
              { label: "Total Elements", value: ELEMENTS.length },
              { label: "Metals", value: ELEMENTS.filter(e => ["alkali metal","alkaline earth metal","transition metal","post-transition metal","lanthanide","actinide"].includes(e.category)).length },
              { label: "Nonmetals", value: ELEMENTS.filter(e => ["nonmetal","noble gas","halogen"].includes(e.category)).length },
              { label: "Metalloids", value: ELEMENTS.filter(e => e.category === "metalloid").length },
              { label: "Radioactive", value: ELEMENTS.filter(e => e.number >= 84 || e.number === 43 || e.number === 61).length },
            ].map(({ label, value }) => (
              <div key={label} style={{ padding: "12px 16px", borderRadius: "10px", background: dark ? "#ffffff08" : "#00000006", border: `1px solid ${border}`, flex: 1, minWidth: "100px", textAlign: "center" }}>
                <div style={{ fontSize: "22px", fontWeight: 700, background: "linear-gradient(135deg,#6c63ff,#ff6b9d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{value}</div>
                <div style={{ fontSize: "10px", opacity: 0.4, marginTop: "2px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        width: "100%", padding: "14px 24px",
        background: dark ? "#0a0a1e" : "#e8e8f8",
        borderTop: `1px solid ${border}`,
        textAlign: "center",
      }}>
        <span style={{ fontSize: "13px", opacity: 0.5 }}>Built by </span>
        <span style={{ fontSize: "13px", fontWeight: 700, background: "linear-gradient(135deg,#6c63ff,#ff6b9d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Joseph, Akhil</span>
        <span style={{ fontSize: "13px", opacity: 0.3 }}> · Interactive Periodic Table · {new Date().getFullYear()}</span>
      </footer>

      {/* Modal */}
      {selected && <ElementModal element={selected} onClose={() => setSelected(null)} dark={dark} />}
    </div>
  );
}