
new ShuffledThing("lava", "lava", [{
    object: "siliconDioxide",
    amount: makeFunction(Rand, 50, 100),
}, {
    object: "ironOxide",
    amount: makeFunction(Rand, 20, 50),
}, {
    object: "magnesiumOxide",
    amount: makeFunction(Rand, 10, 25),
}, {
    object: "aluminumOxide",
    amount: makeFunction(Rand, 40, 60),
}, {
    object: "calciumOxide",
    amount: makeFunction(Rand, 20, 50),
}]);

new ShuffledThing("rock", "rock", [{
    object: "siliconDioxide",
    amount: makeFunction(Rand, 50, 100),
}, {
    object: "ironOxide",
    amount: makeFunction(Rand, 20, 50),
}, {
    object: "magnesiumOxide",
    amount: makeFunction(Rand, 10, 25),
}, {
    object: "aluminumOxide",
    amount: makeFunction(Rand, 40, 60),
}, {
    object: "calciumOxide",
    amount: makeFunction(Rand, 20, 50),
}]);

new ShuffledThing("sand", "sand", [{
    object: "sandGrain",
    amount: makeFunction(Rand, 20, 30),
}]);

new ShuffledThing("sandGrain", "grain of sand", [{
    object: "siliconDioxide",
    amount: makeFunction(Rand, 5, 10),
}]);

new ShuffledThing("water", "water drop", [{
    object: "waterMolecule",
    amount: makeFunction(Rand, 50, 100),
}, {
    object: "saltMolecule",
    amount: makeFunction(chance, 0.1),
}]);

new GenericThing("ice", "ice", [{
    object: "waterMolecule",
    amount: makeFunction(Rand, 50, 100),
}]);

new ShuffledThing("saltWater", "salt water drop", [{
    object: "waterMolecule",
    amount: makeFunction(Rand, 50, 100),
}, {
    object: "saltMolecule",
    amount: makeFunction(Rand, 2, 3),
}]);


new ShuffledThing("sulfuricAcidDrop", "sulfuric acid drop", [{
    object: "sulfuricAcidMolecule",
    amount: makeFunction(Rand, 50, 100),
}, {
    object: "waterMolecule",
    amount: makeFunction(Rand, 2, 3),
}, {
    object: "sulfurTrioxideMolecule",
    amount: makeFunction(Rand, 2, 3),
}]);

    
new ShuffledThing("sulfuricCloud", "sulfuric acid cloud", [{
    object: "sulfuricAcidMolecule",
    amount: makeFunction(Rand, 50, 100),
}, {
    object: "sulfurTrioxideMolecule",
    amount: makeFunction(Rand, 2, 3),
}]);

    
new GenericThing("sulfuricAcidIce", "frozen sulfuric acid", [{
    object: "sulfuricAcidMolecule",
    amount: makeFunction(Rand, 50, 100),
}]);

new ShuffledThing("ice", "ice", [{
    object: "waterMolecule",
    amount: makeFunction(Rand, 50, 100),
}]);

new ShuffledThing("ironChunk", "iron chunk", [{
    object: "ironAtom",
    amount: makeFunction(Rand, 50, 100),
}]);

new ShuffledThing("nickelChunk", "nickel chunk", [{
    object: "nickelAtom",
    amount: makeFunction(Rand, 50, 100),
}]);

new ShuffledThing("solidAir", "solid air", [{
    object: "nitrogenMolecule",
    amount: makeFunction(Rand, 50, 100),
}, {
    object: "methaneMolecule",
    amount: makeFunction(Rand, 50, 100),
}, {
    object: "carbonDioxideMolecule",
    amount: makeFunction(Rand, 50, 100),
}]);

new GenericThing("nitrogenCloud", "nitrogen cloud", [{
    object: "nitrogenMolecule",
    amount: makeFunction(Rand, 50, 100),
}]);

new ShuffledThing("stellarMatter", "stellar matter", [{
    object: "proton",
    amount: makeFunction(Rand, 50, 100),
}, {
    object: "electron",
    amount: makeFunction(Rand, 50, 120),
}, {
    object: "heliumNucleus",
    amount: makeFunction(Rand, 20, 30),
}]);

new GenericThing("electronDegenerateMatter", "electron degenerate matter", [{
    object: "carbonAtom",
    amount: makeFunction(Rand, 100, 200),
}]);

new ShuffledThing("nuclearPasta", "nuclear pasta", [{
    object: "neutron",
    amount: makeFunction(Rand, 100, 200),
}, {
    object: "proton",
    amount: makeFunction(chance, 0.5),
}, {
    object: "electron",
    amount: makeFunction(chance, 0.5),
}]);

new GenericThing("oxygenCloud", "oxygen cloud", [{
    object: "oxygenMolecule",
    amount: makeFunction(Rand, 50, 100),
}]);

new GenericThing("argonCloud", "argon cloud", [{
    object: "argonAtom",
    amount: makeFunction(Rand, 50, 100),
}]);

new GenericThing("methaneCloud", "methane cloud", [{
    object: "methaneMolecule",
    amount: makeFunction(Rand, 50, 100),
}]);

new ShuffledThing("hydrocarbonDrop", "hydrocarbon drop", [{
    object: "methaneMolecule",
    amount: makeFunction(Rand, 25, 50),
}, {
    object: "ethaneMolecule",
    amount: makeFunction(Rand, 25, 50),
}]);

new GenericThing("methaneDrop", "methane drop", [{
    object: "methaneMolecule",
    amount: makeFunction(Rand, 50, 100),
}]);

new GenericThing("ammoniaDrop", "ammonia drop", [{
    object: "ammonia",
    amount: makeFunction(Rand, 50, 100),
}]);

new GenericThing("carbonDioxideCloud", "carbon dioxide cloud", [{
    object: "carbonDioxideMolecule",
    amount: makeFunction(Rand, 50, 100),
}]);

new GenericThing("sodiumVapor", "sodium vapor", [{
    object: "sodiumAtom",
    amount: makeFunction(Rand, 50, 100),
}]);

new GenericThing("ammoniaCloud", "ammonia cloud", [{
    object: "ammonia",
    amount: makeFunction(Rand, 50, 100),
}]);

new GenericThing("waterCloud", "water cloud", [{
    object: "waterMolecule",
    amount: makeFunction(Rand, 50, 100),
}]);

new GenericThing("hydrogenCloud", "hydrogen cloud", [{
    object: "hydrogenMolecule",
    amount: makeFunction(Rand, 50, 100),
}]);

new GenericThing("heliumCloud", "helium cloud", [{
    object: "heliumAtom",
    amount: makeFunction(Rand, 50, 100),
}]);

new GenericThing("liquidHydrogen", "liquid hydrogen", [{
    object: "hydrogenMolecule",
    amount: makeFunction(Rand, 50, 100),
}]);

new GenericThing("liquidHelium", "liquid helium", [{
    object: "heliumAtom",
    amount: makeFunction(Rand, 50, 100),
}]);

new GenericThing("diamond", "diamond", [{
    object: "carbonAtom",
    amount: makeFunction(Rand, 50, 100),
}]);


new ShuffledThing("quarkGluonPlasma", "quark-gluon plasma", [{
    object: "upQuark",
    amount: makeFunction(Rand, 50, 100),
},{
    object: "downQuark",
    amount: makeFunction(Rand, 50, 100),
},{
    object: "strangeQuark",
    amount: makeFunction(Rand, 2, 3),
}]);