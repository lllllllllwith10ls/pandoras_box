new GenericThing("siliconDioxide", "silicon dioxide", [{ object: "siliconAtom", amount: 1 }, { object: "oxygenAtom", amount: 2 }]);
new GenericThing("ironOxide", "iron oxide", [{ object: "ironAtom", amount: 1 }, { object: "oxygenAtom", amount: 1 }]);
new GenericThing("magnesiumOxide", "magnesium oxide", [{ object: "magnesiumAtom", amount: 1 }, { object: "oxygenAtom", amount: 1 }]);
new GenericThing("aluminumOxide", "aluminum oxide", [{ object: "aluminumAtom", amount: 2 }, { object: "oxygenAtom", amount: 1 }]);
new GenericThing("calciumOxide", "calcium oxide", [{ object: "calciumAtom", amount: 1 }, { object: "oxygenAtom", amount: 1 }]);
new GenericThing("waterMolecule", "water molecule", [{ object: "hydrogenAtom", amount: 2 }, { object: "oxygenAtom", amount: 1 }]);
new GenericThing("saltMolecule", "salt molecule", [{ object: "sodiumAtom", amount: 1 }, { object: "chlorineAtom", amount: 1 }]);

new GenericThing("nitrogenMolecule", "nitrogen molecule", [{ object: "nitrogenAtom", amount: 2 }]);
new GenericThing("oxygenMolecule", "oxygen molecule", [{ object: "oxygenAtom", amount: 2 }]);
new GenericThing("methaneMolecule", "methane", [{ object: "hydrogenAtom", amount: 4 }, { object: "carbonAtom", amount: 1 }]);
new GenericThing("ethaneMolecule", "ethane", [{ object: "hydrogenAtom", amount: 3 }, { object: "carbonAtom", amount: 2 }, { object: "hydrogenAtom", amount: 3 }]);
new GenericThing("sulfuricAcidMolecule", "sulfuric acid", [{ object: "hydrogenAtom", amount: 1 }, { object: "oxygenAtom", amount: 1 }, { object: "hydrogenAtom", amount: 1 }, { object: "oxygenAtom", amount: 1 }, { object: "sulfurAtom", amount: 1 }, { object: "oxygenAtom", amount: 2 }]);
new GenericThing("carbonDioxideMolecule", "carbon dioxide", [{ object: "oxygenAtom", amount: 1 }, { object: "carbonAtom", amount: 1 }, { object: "oxygenAtom", amount: 1 }]);
new GenericThing("sulfurTrioxideMolecule", "sulfur trioxide", [{ object: "oxygenAtom", amount: 1 }, { object: "sulfurAtom", amount: 1 }, { object: "oxygenAtom", amount: 2 }]);
new GenericThing("ammoniaMolecule", "ammonia", [{ object: "nitrogen", amount: 1 }, { object: "hydrogenAtom", amount: 3 }]);
new GenericThing("hydrogenMolecule", "hydrogen molecule", [{ object: "hydrogen", amount: 2 }]);
new GenericThing("phosphate", "phosphate", [{ object: "phosphorusAtom", amount: 1 }, { object: "oxygenAtom", amount: 4 }]);


new GenericThing("hydrogenAtom", "hydrogen atom", [{ object: "proton", amount: 1 }, { object: "neutron", amount: makeFunction(chance, 0.1) }, { object: "electron", amount: 1 }]);
new GenericThing("heliumAtom", "helium atom", [{ object: "proton", amount: 2 }, { object: "neutron", amount: 2 }, { object: "electron", amount: 2 }]);
new GenericThing("carbonAtom", "carbon atom", [{ object: "proton", amount: 6 }, { object: "neutron", amount: 6 }, { object: "electron", amount: 6 }]);
new GenericThing("nitrogenAtom", "nitrogen atom", [{ object: "proton", amount: 7 }, { object: "neutron", amount: 7 }, { object: "electron", amount: 7 }]);
new GenericThing("oxygenAtom", "oxygen atom", [{ object: "proton", amount: 8 }, { object: "neutron", amount: 8 }, { object: "electron", amount: 8 }]);
new GenericThing("sodiumAtom", "sodium atom", [{ object: "proton", amount: 11 }, { object: "neutron", amount: 12 }, { object: "electron", amount: 11 }]);
new GenericThing("magnesiumAtom", "magnesium atom", [{ object: "proton", amount: 12 }, { object: "neutron", amount: 12 }, { object: "electron", amount: 12 }]);
new GenericThing("aluminumAtom", "aluminum atom", [{ object: "proton", amount: 13 }, { object: "neutron", amount: 14 }, { object: "electron", amount: 13 }]);
new GenericThing("siliconAtom", "silicon atom", [{ object: "proton", amount: 14 }, { object: "neutron", amount: 14 }, { object: "electron", amount: 14 }]);
new GenericThing("phosphorusAtom", "phosphorus atom", [{ object: "proton", amount: 15 }, { object: "neutron", amount: 16 }, { object: "electron", amount: 15 }]);
new GenericThing("sulfurAtom", "sulfur atom", [{ object: "proton", amount: 16 }, { object: "neutron", amount: 16 }, { object: "electron", amount: 16 }]);
new GenericThing("chlorineAtom", "chlorine atom", [{ object: "proton", amount: 17 }, { object: "neutron", amount: 18 }, { object: "electron", amount: 17 }]);
new GenericThing("argonAtom", "argon atom", [{ object: "proton", amount: 18 }, { object: "neutron", amount: 22 }, { object: "electron", amount: 18 }]);
new GenericThing("calciumAtom", "calcium atom", [{ object: "proton", amount: 20 }, { object: "neutron", amount: 20 }, { object: "electron", amount: 20 }]);
new GenericThing("ironAtom", "iron atom", [{ object: "proton", amount: 26 }, { object: "neutron", amount: 30 }, { object: "electron", amount: 26 }]);
new GenericThing("nickelAtom", "nickel atom", [{ object: "proton", amount: 28 }, { object: "neutron", amount: 30 }, { object: "electron", amount: 28 }]);

new GenericThing("heliumNucleus", "helium nucleus", [{ object: "proton", amount: 2 }, { object: "neutron", amount: 2 }]);

new Empty("electron", "electron");
//TODO
new GenericThing("proton", "proton", [{ object: "upQuark", amount: 2, },{ object: "downQuark", amount: 1, }]);
new GenericThing("neutron", "neutron", [{ object: "upQuark", amount: 1, }, { object: "downQuark", amount: 2, }]);

new Empty("upQuark", "up quark");
new Empty("downQuark", "down quark");
new Empty("strangeQuark", "strange quark");
