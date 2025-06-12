function core(properties) {
    let size = properties["planet!size"];
    let amount = 0;
    switch (size) {
        case "dwarfPlanet":
            amount = 25;
            break;
        case "terrestrialPlanet":
            amount = 50;
            break;
        case "superEarth":
            amount = 75;
            break;
        case "iceGiant":
            amount = 100;
            break;
        case "gasGiant":
            amount = 125;
            break;
        case "superJupiter":
            amount = 150;
            break;
        default:
            amount = 0;
    }
    amount = Rand(Math.floor(amount / 2), amount);
    let stuff = [];
    for (let i = 0; i < amount; i++) {
        stuff.push({
            object: Math.random() > 0.5 ? "ironChunk" : "nickelChunk",
            amount: 1,
        });
    }
    return new GenericInstance("core", stuff);
}

function mantle(properties) {
    let size = properties["planet!size"];
    let temp = properties["planet!temperature"];
    let amount = 0;
    switch (size) {
        case "dwarfPlanet":
            amount = 50;
            break;
        case "terrestrialPlanet":
            amount = 75;
            break;
        case "superEarth":
            amount = 100;
    }
    amount = Rand(Math.floor(amount / 2), amount);
    let stuff = (temp === "cold" || temp === "frozen") ? [{
        object: "water",
        amount: amount,
    }] : [{
        object: "lava",
        amount: amount,
    }];
    
    return new GenericInstance("mantle", stuff);
}


function crust(properties) {
    let size = properties["planet!size"];
    let oceanType = properties["oceans!type"];
  
    let amount = 0;
    switch (size) {
        case "superEarth":
            amount = 25;
            break;
        case "terrestrialPlanet":
            amount = 10;
            break;
        case "dwarfPlanet":
            amount = 5;
            break;
    }
    let amount1 = Rand(Math.floor(amount / 2), amount);
    let stuff = [{
        object: "landmass",
        amount: amount1,
    }];
    if (oceanType !== "none") {
        let amount2 = Rand(Math.floor(amount / 2), amount);
        stuff.push({
            object: "ocean",
            amount: amount2,
        });
    }
    return new GenericInstance("crust", stuff);
}


function atmosphere(properties) {
    let size = properties["planet!size"];
    let oceanType = properties["oceans!type"];
    let temp = properties["planet!temperature"];
    let amount = 0;
    switch (size) {
        case "superEarth":
            amount = 100;
            break;
        case "terrestrialPlanet":
            amount = 75;
            break;
        case "dwarfPlanet":
            amount = 50;
            break;
    }
    let types = ["sodiumVapor", "carbonDioxideCloud", "waterCloud", "nitrogenCloud", "argonCloud", "methaneCloud", "sulfuricCloud", "ammoniaCloud"];
    let proportions = [0, 0, 0, 0, 0, 0];
    switch (temp) {
        case "scorched":
            proportions = [70, 20, 0, 5, 5, 0, 5, 0];
            break;
        case "hot":
            proportions = [50, 20, 5, 10, 5, 0, 5, 0];
            break;
        case "warm":
            if (oceanType === "sulfuricOcean") {
                proportions = [0, 30, 5, 40, 5, 5, 15, 0];
            } else {
                proportions = [0, 30, 10, 40, 5, 5, 0, 0];
            }
            break;
        case "temperate":
            if (oceanType === "sulfuricOcean") {
                proportions = [0, 20, 5, 50, 5, 1, 15, 0];
            } else {
                proportions = [0, 20, 10, 50, 5, 1, 0, 0];
            }
            break;
        case "cool":
            proportions = [0, 10, 15, 30, 5, 50];
            
            break;
        case "cold":
            if (oceanType === "ammoniaOcean") {
                proportions = [0, 10, 0, 20, 10, 40, 0, 2];
            } else {
            
                proportions = [0, 10, 0, 20, 10, 60, 0, 0];
            }
            break;
    }
    let stuff = [];
    amount = Rand(Math.floor(amount / 2), amount);
    for (let j = 0; j < amount; j++) {
        stuff.push({
            object: chooseWeighted2(types, proportions),
            amount: 1,
        });
    }
    return new GenericInstance("atmosphere", stuff);
}

function jovialAtmosphere(properties) {
    let size = properties["planet!size"];
    let temp = properties["planet!temperature"];
    let amount = 0;
    switch (size) {
        case "iceGiant":
            amount = 50;
            break;
        case "gasGiant":
            amount = 100;
            break;
        case "superJupiter":
            amount = 150;
            break;
    }
    let types = ["sodiumVapor", "methaneCloud", "hydrogenCloud", "heliumCloud", "waterCloud", "silicaCloud"];
    let proportions = [0, 0, 0, 0, 0];
    if (size === "superJupiter") {
        proportions = [0, 10, 40, 20, 10, 0];
        if (temp === "scorched") {
            proportions = [20, 10, 40, 20, 10, 20];
        }
    } else {
        switch (temp) {
            case "scorched":
                proportions = [45, 5, 5, 50, 0, 20];
                break;
            case "hot":
                proportions = [10, 10, 40, 30, 10, 0];
                break;
            case "warm":
            case "temperate":
                proportions = [0, 10, 40, 20, 10, 0];
                break;
            case "cool":
                proportions = [0, 30, 30, 20, 20, 0];
                break;
            case "cold":
                proportions = [0, 30, 30, 10, 30, 0];
                break;
            case "frozen":
                proportions = [0, 50, 25, 5, 20, 0];
                break;
        }
    }
    let stuff = [];
    amount = Rand(Math.floor(amount / 2), amount);
    for (let j = 0; j < amount; j++) {
        stuff.push({
            object: chooseWeighted2(types, proportions),
            amount: 1,
        });
    }
    return new GenericInstance("atmosphere", stuff);
}

function jovialMantle(properties) {
    let size = properties["planet!size"];
    let amount = 0;
    switch (size) {
        case "iceGiant":
            amount = 50;
            break;
        case "gasGiant":
            amount = 100;
            break;
        case "superJupiter":
            amount = 150;
            break;
    }
    let stuff = [];
    for (let i = 0; i < amount; i++) {
        stuff.push({
            object: chooseWeighted2(["liquidHydrogen", "liquidHelium", "methaneDrop", "diamond"], [1, 1, 1, 0.02]),
            amount: 1,
        });
    }
    return new GenericInstance("mantle", stuff);
}


function landmass(properties) {
    let oceanType = properties["oceans!type"];
    let temp = properties["planet!temperature"];
    let stuff = [];
    switch (temp) {
        case "scorched":
            stuff.push(["volcano", 0.1], ["lava", 1], ["rock", 0.5]);
            break;
        case "hot":
            stuff.push(["volcano", 0.1], ["lava", 0.5], ["rock", 1]);
            break;
        case "warm":
            stuff.push(["volcano", 0.1], ["mountain", 0.1], ["lava", 0.1], ["rock", 1]);
            break;
        case "temperate":
            stuff.push(["volcano", 0.05], ["mountain", 0.1], ["rock", 1]);
            break;
        case "cool":
            stuff.push(["mountain", 0.1], ["rock", 1], ["ice", 1]);
            break;
        case "cold":
            stuff.push(["cryovolcano", 0.1], ["iceMountain", 0.1], ["rock", 0.5], ["ice", 1]);
            break;
        case "frozen":
            stuff.push(["iceMountain", 0.1], ["ice", 0.5], ["solidAir", 1]);
            break;
    }
    if (oceanType !== "none") {
        stuff.push(["lake", 0.2]);
    }
    let stuff2 = [];
    let amount = Rand(25, 40);
    for (let i = 0; i < amount; i++) {
        let thing = chooseWeighted(stuff);
        stuff2.push({
            object: thing,
            amount: 1,
        });
    }
    return new GenericInstance("landmass", stuff2);
}


function ocean(properties) {
    let oceanType = properties["oceans!type"];
    let temp = properties["planet!temperature"];
    let stuff = [];
    let name = "";
    switch (oceanType) {
        case "lavaOcean":
            name = "lava ";
            stuff.push({
                object: "volcano",
                amount: makeFunction(Rand, 3, 4),
            }, {
                object: "shore",
                amount: makeFunction(Rand, 3, 4),
            }, {
                object: "rockberg",
                amount: (temp === "hot") ? makeFunction(Rand, 3, 4) : 0,
            }, {
                object: "lava",
                amount: makeFunction(Rand, 200, 500),
            });
            break;
        case "waterOcean":
            name = "water ";
            stuff.push({
                object: "mountain",
                amount: makeFunction(Rand, 3, 4),
            }, {
                object: "hydrothermalVent",
                amount: makeFunction(Rand, 3, 4),
            }, {
                object: "shore",
                amount: makeFunction(Rand, 3, 4),
            }, {
                object: "iceberg",
                amount: (temp === "cool") ? makeFunction(Rand, 3, 4) : 0,
            }, {
                object: "saltWater",
                amount: makeFunction(Rand, 200, 500),
            });
            break;
        case "sulfuricOcean":
            name = "sulfuric ";
            stuff.push({
                object: "mountain",
                amount: makeFunction(Rand, 3, 4),
            }, {
                object: "hydrothermalVent",
                amount: makeFunction(Rand, 3, 4),
            }, {
                object: "shore",
                amount: makeFunction(Rand, 3, 4),
            }, {
                object: "sulfuricberg",
                amount: (temp === "temperate") ? makeFunction(Rand, 3, 4) : 0,
            }, {
                object: "sulfuricAcidDrop",
                amount: makeFunction(Rand, 200, 500),
            });
            break;
        case "hydrocarbonOcean":
            name = "hydrocarbon ";
            stuff.push({
                object: "iceMountain",
                amount: makeFunction(Rand, 3, 4),
            }, {
                object: "cryovent",
                amount: makeFunction(Rand, 3, 4),
            }, {
                object: "shore",
                amount: makeFunction(Rand, 3, 4),
            }, {
                object: "hydrocarbonDrop",
                amount: makeFunction(Rand, 200, 500),
            });
            break;
        case "ammoniaOcean":
            name = "ammonia ";
            stuff.push({
                object: "iceMountain",
                amount: makeFunction(Rand, 3, 4),
            }, {
                object: "cryovent",
                amount: makeFunction(Rand, 3, 4),
            }, {
                object: "shore",
                amount: makeFunction(Rand, 3, 4),
            }, {
                object: "ammoniaDrop",
                amount: makeFunction(Rand, 200, 500),
            });
            break;
        default:
            name = "error invalid ";
    }
    return new GenericInstance(name + "ocean", stuff);
}

function liquidType(properties) {
    
    let oceanType = properties["oceans!type"];
    let name = "";
    let land = "";
    let sea = "";
    switch (oceanType) {
        case "lavaOcean":
            name = "lava ";
            land = "rock";
            sea = "lava";
            break;
        case "waterOcean":
            name = "water ";
            land = "sand";
            sea = "saltWater";
            break;
        case "sulfuricOcean":
            name = "sulfuric ";
            land = "sand";
            sea = "sulfuricAcidDrop";
            break;
        case "hydrocarbonOcean":
            name = "hydrocarbon ";
            land = "ice";
            sea = "hydrocarbonDrop";
            break;
        case "ammoniaOcean":
            name = "ammonia ";
            land = "ice";
            sea = "ammoniaDrop";
            break;
        default:
            name = "error invalid ";
    }
    return {
        name: name,
        land: land,
        sea: sea
    };
}

function shore(properties) {
    let oceanType = liquidType(properties);
    return new GenericInstance(oceanType.name + "coast", [{
        object: oceanType.land,
        amount: makeFunction(Rand, 50, 70),
    }, {
        object: oceanType.sea,
        amount: makeFunction(Rand, 20, 30),
    }]);
}

function lake(properties) {
    let oceanType = liquidType(properties);
    return new GenericInstance(oceanType.name + "lake", [{
        object: oceanType.sea,
        amount: makeFunction(Rand, 50, 100),
    }]);
}


new Thing("planetMantle", "mantle", mantle);
new Thing("planetCore", "core", core);
new Thing("planetCrust", "crust", crust);
new Thing("atmosphere", "atmosphere", atmosphere);
new Thing("jovialAtmosphere", "atmosphere", jovialAtmosphere);
new Thing("jovialMantle", "mantle", jovialMantle);
new Thing("jovialMantle", "mantle", jovialMantle);
new Thing("landmass", "landmass", landmass);
new Thing("ocean", "ocean", ocean);
new Thing("shore", "shore", shore);
new Thing("lake", "lake", lake);

new GenericThing("mountain", "mountain", [{
    object: "rock",
    amount: makeFunction(Rand, 50, 100),
}]);

new GenericThing("rockberg", "rockberg", [{
    object: "rock",
    amount: makeFunction(Rand, 50, 100),
}]);
new GenericThing("iceberg", "iceberg", [{
    object: "ice",
    amount: makeFunction(Rand, 50, 100),
}],);
new GenericThing("sulfuricberg", "sulfuric acidberg", [{
    object: "sulfuricAcidIce",
    amount: makeFunction(Rand, 50, 100),
}],);

new GenericThing("volcano", "volcano", [{
    object: "rock",
    amount: makeFunction(Rand, 50, 70),
}, {
    object: "lava",
    amount: makeFunction(Rand, 20, 30),
}]);

new GenericThing("hydrothermalVent", "hydrothermal vent", [{
    object: "rock",
    amount: makeFunction(Rand, 20, 30),
}, {
    object: "lava",
    amount: makeFunction(Rand, 1, 2),
}]);
new GenericThing("cryovolcano", "cryovolcano", [{
    object: "ice",
    amount: makeFunction(Rand, 50, 70),
}, {
    object: "water",
    amount: makeFunction(Rand, 20, 30),
}]);
new GenericThing("cryovent", "cryovent", [{
    object: "ice",
    amount: makeFunction(Rand, 20, 30),
}, {
    object: "water",
    amount: makeFunction(Rand, 1, 2),
}]);
new GenericThing("iceMountain", "ice mountain", [{
    object: "ice",
    amount: makeFunction(Rand, 50, 100),
}]);
