new Thing("universe", "universe", newUniverse);

function newUniverse(properties) {
    let name = "universe";

    let size = Rand(2, 6);
    if (size == 6 && coin(0.5)) {
        size = Rand(6, 20);
    }
	
    return new GenericInstance(name, [{
        object: "hubbleVolume",
        amount: makeFunction(Rand, 10, 20)
    }, {
        object: () => new DescenderInstance(() => parseGeneration([{
            object: "hubbleVolume",
            amount: makeFunction(Rand, 10, 20),
        }])),
        amount: 1,
    }], { "galaxyCluster!clusterSize": size });
}


new Thing("hubbleVolume", "hubble volume", hubbleVolume);


function hubbleVolume(properties) {
    let name = "hubble volume";
	
    return new GenericInstance("hubble volume", [{
        object: "galaxyCluster",
        properties: { "galaxyCluster!dwarf": false },
        amount: makeFunction(Rand, 10, 20)
    }, {
        object: "galaxyCluster",
        properties: { "galaxyCluster!dwarf": true },
        amount: makeFunction(Rand, 20, 50)
    }, {
        object: "galaxyClusterVoid",
        properties: { "galaxyCluster!dwarf": false },
        amount: makeFunction(Rand, 10, 20)
    }]);
}

new Thing("galaxyCluster", "galaxy cluster", (properties) => galaxyCluster(properties, false));
new Thing("galaxyClusterVoid", "galaxy void", (properties) => galaxyCluster(properties, true));

function galaxyCluster(properties, isVoid) {
    let level = properties["galaxyCluster!clusterSize"];
    let dwarf = properties["galaxyCluster!dwarf"];
    if (level === 0) {
        if (isVoid) {
            return getInstanceById("galaxyVoid", properties);
        } else {
            return getInstanceById("galaxy", properties);
        }
    } else {
        let clusterNames = ["", " cluster", " supercluster", " hypercluster", " ultracluster"];
        if (isVoid) {
            clusterNames = ["", " cluster void", " supervoid", " hypervoid", " ultravoid"];
        }
        let name = "";
        if (level < clusterNames.length) {
            name = (isVoid ? "galactic" : "galaxy") + clusterNames[level];
        } else if (level === clusterNames.length) {
            name = "turtlie" + (isVoid ? " void" : "");
        } else if (level > clusterNames.length) {
            name = "order " + (level - clusterNames.length + 1) + " turtlie" + (isVoid ? " void" : "");
        }
        if (dwarf) {
            name = "dwarf " + name;
        }
        let stuff = [{
            object: "galaxyCluster",
            properties: { "galaxyCluster!clusterSize": level - 1, "galaxyCluster!dwarf": false },
            amount: makeFunction(Rand, dwarf ? 2 : (isVoid ? 0 : 5), dwarf ? 5 : (isVoid ? 1 : 10))
        }, {
            object: "galaxyCluster",
            properties: { "galaxyCluster!clusterSize": level - 1, "galaxyCluster!dwarf": true },
            amount: makeFunction(Rand, dwarf ? 5 : (isVoid ? 0 : 10), dwarf ? 10 : (isVoid ? 3 : 25))
        }, {
            object: "galaxyClusterVoid",
            properties: { "galaxyCluster!clusterSize": level - 1, "galaxyCluster!dwarf": false },
            amount: makeFunction(Rand, dwarf ? 2 : 5, dwarf ? 5 : 10)
        }];
        return new GenericInstance(name, stuff);
    }
}


new Thing("galaxy", "galaxy", newGalaxy);



function newGalaxy(properties) {
    let dwarf = properties["galaxyCluster!dwarf"];
    let type = choose(["elliptical", "spiral"]);
    if (dwarf) {
        type = choose(["irregular", "elliptical", "elliptical"]);
    }
    let name = (dwarf && type !== "irregular" ? "dwarf " : "") + type + " " + "galaxy";
    let starAge = type == "spiral" ? 2 : (type == "irregular" ? 1 : 3);
    let starProps = { "star!starAge": starAge };
    let stuff = [{
        object: "galaxyCore",
        amount: 1,
        properties: { "star!starAge": 3 },
    }];
    if (type == "spiral") {
        stuff.push({
            object: "spiralArm",
            amount: makeFunction(Rand, 2, 5),
            properties: starProps,
        }, {
            object: "galaxyHalo",
            amount: 1,
            properties: { "galaxyHalo!size": 2, "star!starAge": 3 },
        });
    } else if (type == "elliptical" && !dwarf) {
        if (coin(0.1)) {
            stuff.push({
                object: "starBelt",
                amount: makeFunction(Rand, 50, 100),
                properties: starProps,
            }, {
                object: "galaxyHalo",
                amount: 1,
                properties: { "galaxyHalo!size": 3, "star!starAge": 3 },
            });
        } else {
            stuff.push({
                object: "starBelt",
                amount: makeFunction(Rand, 10, 20),
                properties: starProps,
            }, {
                object: "galaxyHalo",
                amount: 1,
                properties: { "galaxyHalo!size": 2, "star!starAge": 3 },
            });
        }
    } else if (dwarf) {
        stuff.push({
            object: "starBelt",
            amount: makeFunction(Rand, 2, 5),
            properties: starProps,
        });
        if (type == "elliptical") {
            stuff.push({
                object: "galaxyHalo",
                amount: 1,
                properties: { "galaxyHalo!size": 1, "star!starAge": 3 },
            });
        }
    }
    return new GenericInstance(name, stuff);
}


new Thing("galaxyHalo", "galactic halo", galaxyHalo);

function galaxyHalo(properties) {
    let size = properties["galaxyHalo!size"];
    let rand = function () { };
    let rand2 = function () { };
    switch (size) {
        case 1:
            rand = makeFunction(Rand, 2, 5);
            rand2 = makeFunction(Rand, 10, 20);
            break;
        case 2:
            rand = makeFunction(Rand, 5, 10);
            rand2 = makeFunction(Rand, 30, 40);
            break;
        case 3:
            rand = makeFunction(Rand, 10, 20);
            rand2 = makeFunction(Rand, 50, 75);
            break;
        default:
            rand = makeFunction(Rand, 1, 1);
            rand2 = makeFunction(Rand, 1, 1);
            break;
    }
    return new GenericInstance("galactic halo", [{
        object: "globularCluster",
        amount: rand
    }, {
        object: "solarSystem",
        amount: rand2,
    }, {
        object: "intergalacticMedium",
        amount: 1,
    }]);
}


new GenericThing("galaxyVoid", "galactic void", [{
    object: "globularCluster",
    amount: makeFunction(Rand, 10, 20),
    properties: { "star!starAge": 3 },
}, {
    object: "solarSystem",
    amount: makeFunction(Rand, 50, 75),
    properties: { "star!starAge": 3 },
}, {
    object: "intergalacticMedium",
    amount: 1,
}]);

    
new GenericThing("galaxyCore", "galactic core", [{
    object: "blackHole",
    amount: 1,
}, {
    object: "solarSystem",
    amount: makeFunction(Rand, 100, 175),
}]);

new GenericThing("globularCluster", "globular cluster", [{
    object: "blackHole",
    amount: 1,
}, {
    object: "solarSystem",
    amount: makeFunction(Rand, 20, 30),
}]);

new GenericThing("spiralArm", "spiral arm", [{
    object: "starBelt",
    amount: makeFunction(Rand, 10, 20),
}]);
new GenericThing("starBelt", "stellar belt", [{
    object: "starBubble",
    amount: makeFunction(Rand, 5, 10),
}]);
new GenericThing("starBubble", "stellar bubble", [{
    object: "starCloud",
    amount: makeFunction(Rand, 10, 20),
}]);
new GenericThing("starCloud", "stellar cloud", [{
    object: "solarSystem",
    amount: makeFunction(Rand, 20, 50),
}, {
    object: "interstellarMedium",
    amount: 1,
}]);


new ShuffledThing("intergalacticMedium", "intergalactic medium", [{
    object: "hydrogenCloud",
    amount: makeFunction(Rand, 25, 50),
}, {
    object: "heliumCloud",
    amount: makeFunction(Rand, 5, 10),
}, {
    object: "hydrogenMolecule",
    amount: makeFunction(Rand, 10, 25),
}, {
    object: "heliumAtom",
    amount: makeFunction(Rand, 10, 25),
}, {
    object: "proton",
    amount: makeFunction(Rand, 25, 50),
}, {
    object: "electron",
    amount: makeFunction(Rand, 30, 60),
}, {
    object: "heliumNucleus",
    amount: makeFunction(Rand, 5, 10),
}, {
    object: "darkMatter",
    amount: 0, //todo
    }]);

    
new ShuffledThing("interstellarMedium", "interstellar medium", [{
    object: "hydrogenCloud",
    amount: makeFunction(Rand, 25, 50),
}, {
    object: "heliumCloud",
    amount: makeFunction(Rand, 5, 10),
}, {
    object: "hydrogenMolecule",
    amount: makeFunction(Rand, 10, 25),
}, {
    object: "heliumAtom",
    amount: makeFunction(Rand, 10, 25),
}, {
    object: "proton",
    amount: makeFunction(Rand, 25, 50),
}, {
    object: "electron",
    amount: makeFunction(Rand, 30, 60),
}, {
    object: "heliumNucleus",
    amount: makeFunction(Rand, 5, 10),
}]);


//todo
new Empty("blackHole", "black hole");




function solarSystem(properties) {
    let age = properties["star!starAge"];
    if (coin(0.4)) {
        return multipleSystem(age);
    }
    let type = pickStar(age, false);
    let planets = generatePlanets(type);
    let stuff = [{
        object: "genericStar",
        amount: 1,
        properties: { "star!starType": type },
    }];
    stuff = stuff.concat(planets);
    if (type == "planemo") {
        properties["planet!systemType"] = "far";
        properties["star!starType"] = "planemo";
        return getInstanceById("planet", properties);
    } else if (planets.length === 0) {
        properties["star!starType"] = type;
        return getInstanceById("genericStar", properties);
    } else {
        return new GenericInstance(type + " stellar system", stuff);
    }
}

function multipleSystem(age) {
    let names = ["error", "error", "binary", "ternary", "quaternary", "quinary", "senary", "septenary"];
    let numStarOptions = [2, 3, 4, 5, 6, 7];
    let proportions = [5, 4, 1, 0.1, 0.01];
    let numStars = chooseWeighted2(numStarOptions, proportions);
    let stuff = [];
    let types = [];
    for (let i = 0; i < numStars; i++) {
        let type = pickStar(age, true);
        types.push(type);
        stuff.push({
            object: "binaryInnerSystem",
            amount: 1,
            properties: { "star!starType": type },
        });
    }
    let planets = generatePlanets("binary");
    stuff = stuff.concat(planets);
    return new GenericInstance(names[numStars] + " stellar system", stuff);
}


function binaryInnerSystem(properties) {
    let type = properties["star!starType"];
    let planets = generatePlanets(type, true);
    let stuff = [{
        object: "genericStar",
        amount: 1,
        properties: { "star!starType": type },
    }];
    stuff = stuff.concat(planets);
    if (planets.length === 0) {
        properties["star!starType"] = type;
        return getInstanceById("genericStar", properties);
    }
    return new GenericInstance(type + " stellar system", stuff);
}

function pickStar(age, binary) {
    let types = ["O", "B", "A", "F", "G", "K", "M", "red giant", "red supergiant", "brown dwarf", "planemo", "stellar remnant"];
    let proportions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    switch (age) {
        case 1:
            proportions = [2, 3, 4, 6, 7.5, 10, 20, 1, 0.1, 15, 25, 1];
            break;
        case 2:
            proportions = [1, 2, 3, 5, 10, 12.5, 25, 4, 1, 15, 25, 5];
            break;
        case 3:
            proportions = [0.2, 0.5, 1, 2, 3, 7.5, 25, 20, 5, 15, 25, 10];
            break;
    }
    if (binary) {
        proportions[10] = 0;
    }
    let type = chooseWeighted2(types, proportions);
    if (type == "stellar remnant") {
        let chance = Math.random();
        type = chooseWeighted2(["black hole", "neutron star", "white dwarf"], [1, 2, 10]);
    }
    if (type.length == 1) {
        type += " main sequence star";
    }
    return type;
}

function generatePlanets(star, binaryInner = false) {
    let systems = ["close", "inner", "outer", "far"];
    let proportions = [0, 0, 0, 0];
    star = star.replace(" main sequence star", "");
    switch (star) {
        case "O":
            proportions = [Rand(60, 70), Rand(10, 20), Rand(0, 10), Rand(10, 20)];
            break;
        case "B":
            proportions = [Rand(30, 40), Rand(15, 25), Rand(5, 15), Rand(15, 25)];
            break;
        case "A":
            proportions = [Rand(20, 40), Rand(10, 25), Rand(5, 25), Rand(15, 30)];
            break;
        case "F":
            proportions = [Rand(20, 40), Rand(10, 25), Rand(20, 35), Rand(25, 40)];
            break;
        case "G":
            proportions = [Rand(10, 35), Rand(10, 25), Rand(30, 40), Rand(25, 50)];
            break;
        case "K":
            proportions = [Rand(5, 10), Rand(10, 20), Rand(40, 50), Rand(30, 60)];
            break;
        case "M":
            proportions = [Rand(0, 10), Rand(5, 10), Rand(30, 70), Rand(20, 70)];
            break;
        case "red giant":
            proportions = [Rand(60, 70), Rand(10, 30), Rand(0, 10), Rand(15, 25)];
            break;
        case "red supergiant":
            proportions = [Rand(70, 80), Rand(20, 30), Rand(0, 10), Rand(1, 5)];
            break;
        case "brown dwarf":
            proportions = [0, 0, 1, 100];
            break;
        case "planemo":
            proportions = [0, 0, 0, 100];
            break;
        case "white dwarf":
            proportions = [0, 0, Rand(5, 10), 100];
            break;
        case "neutron star":
            proportions = [0, 0, Rand(2, 5), 100];
            break;
        case "black hole":
            proportions = [0, Rand(2, 5), Rand(5, 10), 80];
            break;
        case "binary":
            proportions = [0, 0, Rand(10, 20), Rand(10, 20)];
            break;
    }
    if (binaryInner) {
        proportions[2] = 0;
        proportions[3] = 0;
    }
    let planets = [];
    let planetNum = Rand(0, 10);
    if (proportions.every(v => { return v === 0; })) {
        planetNum = 0;
    }
    for (let i = 0; i < planetNum; i++) {
        let system = chooseWeighted2(systems, proportions);
        planets.push({
            object: "planet",
            amount: 1,
            properties: { "planet!systemType": system },
        });
    }
    return planets;
}


new Thing("solarSystem", "solar system", solarSystem);
new Thing("binaryInnerSystem", "binary inner system", binaryInnerSystem);
new Thing("genericStar", "star", star);


function star(properties) {
    let type = properties["star!starType"];
    if (type == "brown dwarf") {
        return rename(getInstanceById("superJupiter", Object.assign({}, properties, { "planet!temperature": Math.random() > 0.9 ? "cool" : "cold" })), "brown dwarf");
    }
    if (type == "neutron star") {
        return new GenericInstance(type, [{
            object: "neutronStarCrust",
            amount: 1
        }, {
            object: "neutronStarMantle",
            amount: 1
        }, {
            object: "neutronStarCore",
            amount: 1
        }], properties);
    }
    if (type == "white dwarf") {
        return new GenericInstance(type, [{
            object: "whiteDwarfLayer",
            amount: 1,
            name: "crust"
        }, {
            object: "whiteDwarfLayer",
            amount: 1,
            name: "mantle"
        }, {
            object: "whiteDwarfLayer",
            amount: 1,
            name: "core"
        }], properties);
    }
    if (type == "black hole") {
        return getInstanceById("blackHole", properties);
    }
    return new GenericInstance(type, [{
        object: "starCorona",
        amount: 1
    }, {
        object: "starLayer",
        amount: 1,
        name: "convective zone"
    }, {
        object: "starLayer",
        amount: 1,
        name: "radiative zone"
    }, {
        object: "starLayer",
        amount: 1,
        name: "core"
    }], properties);
}


new GenericThing("starLayer", "star layer", [{
    object: "stellarMatter",
    amount: makeFunction(Rand, 100, 200),
}]);


new GenericThing("whiteDwarfLayer", "white dwarf layer", [{
    object: "electronDegenerateMatter",
    amount: makeFunction(Rand, 100, 200),
}]);


new GenericThing("starCorona", "corona", [{
    object: "proton",
    amount: makeFunction(Rand, 50, 100),
}, {
    object: "electron",
    amount: makeFunction(Rand, 50, 100),
}]);

    
let neutronStarCrust = new GenericThing("neutronStarCrust", "crust", [{
    object: "ironChunk",
    amount: makeFunction(Rand, 50, 100),
    name: "neutron star matter"
}, {
    object: "nuclearPasta",
    amount: makeFunction(Rand, 10, 20),
}]);
let neutronStarMantle = new GenericThing("neutronStarMantle", "mantle", [{
    object: "nuclearPasta",
    amount: makeFunction(Rand, 50, 100),
}]);
let neutronStarCore = new GenericThing("neutronStarCore", "core", [{
    object: "quarkGluonPlasma",
    amount: makeFunction(Rand, 50, 100),
}]);



function generatePlanet(properties) {
    let system = properties["planet!systemType"];
    let star = properties["star!starType"];
    let num = Math.random() * 100;
    switch (star) {
        case "O":
            num += 30;
            break;
        case "B":
            num += 20;
            break;
        case "A":
            num += 10;
            break;
        case "K":
            num -= 10;
            break;
        case "M":
            num -= 15;
            break;
        case "red giant":
            num += 25;
            break;
        case "red supergiant":
            num += 40;
            break;
        case "brown dwarf":
            num -= 10;
            break;
        case "planemo":
            num -= 30;
            break;
        case "white dwarf":
            num -= 10;
            break;
        case "neutron star":
            num += 10;
            break;
        case "black hole":
            num += 20;
            break;
    }
    let temp = "null";
    let types = ["asteroidBelt", "dwarfPlanet", "terrestrialPlanet", "superEarth", "iceGiant", "gasGiant", "superJupiter"];
    let proportions = [0, 0, 0, 0, 0, 0, 0];
    switch (system) {
        case "close":
            proportions = [5, 20, 50, 10, 15, 20, 10];
            if (num > 30) {
                temp = "scorched";
            } else if (num > 10) {
                temp = "hot";
            } else {
                temp = "warm";
            }
            break;
        case "inner":
            proportions = [10, 20, 50, 10, 10, 10, 5];
            if (num > 70) {
                temp = "scorched";
            } else if (num > 50) {
                temp = "hot";
            } else if (num > 30) {
                temp = "warm";
            } else {
                temp = "temperate";
            }
            break;
        case "outer":
            proportions = [10, 20, 10, 20, 40, 30, 20];
            if (num > 60) {
                temp = "cool";
            } else if (num > 20) {
                temp = "cold";
            } else {
                temp = "frozen";
            }
            break;
        case "far":
            proportions = [10, 40, 10, 20, 50, 20, 10];
            if (num > 90) {
                temp = "cold";
            } else {
                temp = "frozen";
            };
            break;
    }
    let type = chooseWeighted2(types, proportions);
    let props = Object.assign({}, properties, { "planet!temperature": temp, "moon!isMoon": false });
    return getInstanceById(type, props);
}


function asteroidBelt(properties) {
    let star = properties["star!starType"];
    let temp = properties["planet!temperature"];
    let name = " asteroid belt";
    if (star === "planemo") {
        name = " asteroid cloud";
    }
    let stuff = [{
        object: "asteroid",
        amount: makeFunction(Rand, 100, 200),
    }];
    return new GenericInstance(temp + " " + name, stuff, properties);
}




function rockyPlanet(properties, size) {
    let moon = properties["moon!isMoon"];
    let temp = properties["planet!temperature"];
    let hasAtmosphere = false;
    if (coin(0.3) && temp !== "frozen" || size === "superEarth") {
        hasAtmosphere = true;
    }
    //   let lifeStuff = oceansAndLife(temp,hasAtmosphere);
    //   let lifeType = lifeStuff[1];
    //   let species = lifeStuff[2];
    let oceanType = oceans(temp, hasAtmosphere);
    stuff = [{
        object: "planetCrust",
        amount: 1,
        properties: { "planet!size": size, "oceans!type": oceanType },
    }, {
        object: "planetMantle",
        amount: 1,
        properties: { "planet!size": size, "oceans!type": oceanType },
    }, {
        object: "planetCore",
        amount: 1,
        properties: { "planet!size": size, "oceans!type": oceanType },
    }];
    if (hasAtmosphere) {
        stuff.push({
            object: "atmosphere",
            amount: 1,
            properties: { "planet!size": size, "oceans!type": oceanType },
        });
    }
    let name = "";
    let moonChoices = [];
    let moonProportions = [];
    if (!moon) {
        switch (size) {
            case "dwarfPlanet":
                name = "dwarf planet";
                moonProportions = [10, 10, 30, 50];
                moonChoices = [
                    [
                        {
                            object: "dwarfPlanet",
                            amount: 1,
                            properties: { "moon!isMoon": true },
                        }, {
                            object: "asteroid",
                            amount: makeFunction(Rand, 0, 6),
                            properties: { "moon!isMoon": true },
                        }
                    ], [
                        {
                            object: "asteroid",
                            amount: makeFunction(Rand, 0, 4),
                            properties: { "moon!isMoon": true },
                        }
                    ], [
                        {
                            object: "asteroid",
                            amount: makeFunction(Rand, 0, 2),
                            properties: { "moon!isMoon": true },
                        }
                    ], []];
                break;
            case "terrestrialPlanet":
                name = "terrestrial planet";
                moonProportions = [20, 30, 40, 50];
                moonChoices = [
                    [
                        {
                            object: "dwarfPlanet",
                            amount: makeFunction(Rand, 1, 3),
                            properties: { "moon!isMoon": true },
                        }, {
                            object: "asteroid",
                            amount: makeFunction(Rand, 0, 6),
                            properties: { "moon!isMoon": true },
                        }
                    ], [
                        {
                            object: "asteroid",
                            amount: makeFunction(Rand, 0, 6),
                            properties: { "moon!isMoon": true },
                        }
                    ], [
                        {
                            object: "asteroid",
                            amount: makeFunction(Rand, 0, 2),
                            properties: { "moon!isMoon": true },
                        }
                    ], []];
                break;
            case "superEarth":
                name = "super earth";
                moonProportions = [10, 30, 40, 20];
                moonChoices = [
                    [
                        {
                            object: "terrestrialPlanet",
                            amount: 1,
                            properties: { "moon!isMoon": true },
                        }, {
                            object: "dwarfPlanet",
                            amount: makeFunction(Rand, 0, 3),
                            properties: { "moon!isMoon": true },
                        }, {
                            object: "asteroid",
                            amount: makeFunction(Rand, 0, 6),
                            properties: { "moon!isMoon": true },
                        }
                    ], [
                        {
                            object: "dwarfPlanet",
                            amount: makeFunction(Rand, 1, 5),
                            properties: { "moon!isMoon": true },
                        }, {
                            object: "asteroid",
                            amount: makeFunction(Rand, 0, 4),
                            properties: { "moon!isMoon": true },
                        }
                    ], [
                        {
                            object: "asteroid",
                            amount: makeFunction(Rand, 0, 20),
                            properties: { "moon!isMoon": true },
                        }
                    ], []];
                break;
        }
        stuff = stuff.concat(chooseWeighted2(moonChoices, moonProportions));
    } else {
        switch (size) {
            case "dwarfPlanet":
                name = "small moon";
                break;
            case "terrestrialPlanet":
                name = "large moon";
                break;
            case "superEarth":
                name = "huge moon";
                break;
            default:
                name = "error";
        }
    }
    return new GenericInstance(temp + " " + name/* + (lifeType !== "none" ? " with " + lifeType : "")*/, stuff, properties);
}

function oceans(temp, hasAtmosphere) {
    
    let oceanType = "none";
    switch (temp) {
        case "scorched":
            oceanType = "lavaOcean";
            break;
        case "hot":
            if (coin(0.2)) {
                oceanType = "lavaOcean";
            }
            break;
        case "warm":
            if (coin(0.7) && hasAtmosphere) {
                oceanType = chooseWeighted2(["waterOcean", "sulfuricOcean"], [5, 2]);
            }
            break;
        case "temperate":
            if (coin(0.8) && hasAtmosphere) {
                oceanType = chooseWeighted2(["waterOcean", "sulfuricOcean"], [7, 2]);
            }
            break;
        case "cool":
            if (coin(0.6) && hasAtmosphere) {
                oceanType = "waterOcean";
            }
            break;
        case "cold":
            if (coin(0.8) && hasAtmosphere) {
                oceanType = chooseWeighted2(["hydrocarbonOcean", "ammoniaOcean"], [2, 1]);
            }
            break;
        case "frozen":
        default:
            oceanType = "none";
            break;
    }
    return oceanType;
}


function gasPlanet(properties, size) {
    let moon = properties["moon!isMoon"];
    let temp = properties["planet!temperature"];
    stuff = [{
        object: "jovialAtmosphere",
        amount: 1,
        properties: { "planet!size": size },
    }, {
        object: "jovialMantle",
        amount: 1,
        properties: { "planet!size": size },
    }, {
        object: "planetCore",
        amount: 1,
        properties: { "planet!size": size },
    }];
    let name = "";
    let moonChoices = [];
    let moonProportions = [];
    if (!moon) {
        switch (size) {
            case "iceGiant":
                name = "ice giant";
                moonProportions = [1, 5, 20, 10];
                moonChoices = [
                    [
                        {
                            object: "superEarth",
                            amount: 1,
                            properties: { "moon!isMoon": true },
                        }, {
                            object: "dwarfPlanet",
                            amount: makeFunction(Rand, 0, 3),
                            properties: { "moon!isMoon": true },
                        }, {
                            object: "asteroid",
                            amount: makeFunction(Rand, 0, 5),
                            properties: { "moon!isMoon": true },
                        }
                    ], [
                        {
                            object: "terrestrialPlanet",
                            amount: 1,
                            properties: { "moon!isMoon": true },
                        },
                        {
                            object: "dwarfPlanet",
                            amount: makeFunction(Rand, 0, 3),
                            properties: { "moon!isMoon": true },
                        }, {
                            object: "asteroid",
                            amount: makeFunction(Rand, 0, 10),
                            properties: { "moon!isMoon": true },
                        }
                    ], [
                        {
                            object: "dwarfPlanet",
                            amount: makeFunction(Rand, 0, 5),
                            properties: { "moon!isMoon": true },
                        }, {
                            object: "asteroid",
                            amount: makeFunction(Rand, 0, 20),
                            properties: { "moon!isMoon": true },
                        }
                    ], [
                        {
                            object: "asteroid",
                            amount: makeFunction(Rand, 0, 30),
                            properties: { "moon!isMoon": true },
                        }
                    ]];
                break;
            case "gasGiant":
                name = "gas giant";
                moonProportions = [5, 10, 30, 20];
                moonChoices = [
                    [
                        {
                            object: "superEarth",
                            amount: 1,
                            properties: { "moon!isMoon": true },
                        }, {
                            object: "dwarfPlanet",
                            amount: makeFunction(Rand, 0, 5),
                            properties: { "moon!isMoon": true },
                        }, {
                            object: "asteroid",
                            amount: makeFunction(Rand, 0, 10),
                            properties: { "moon!isMoon": true },
                        }
                    ], [
                        {
                            object: "terrestrialPlanet",
                            amount: 1,
                            properties: { "moon!isMoon": true },
                        },
                        {
                            object: "dwarfPlanet",
                            amount: makeFunction(Rand, 0, 5),
                            properties: { "moon!isMoon": true },
                        }, {
                            object: "asteroid",
                            amount: makeFunction(Rand, 0, 10),
                            properties: { "moon!isMoon": true },
                        }
                    ], [
                        {
                            object: "dwarfPlanet",
                            amount: makeFunction(Rand, 0, 15),
                            properties: { "moon!isMoon": true },
                        }, {
                            object: "asteroid",
                            amount: makeFunction(Rand, 0, 100),
                            properties: { "moon!isMoon": true },
                        }
                    ], [
                        {
                            object: "asteroid",
                            amount: makeFunction(Rand, 0, 50),
                            properties: { "moon!isMoon": true },
                        }
                    ]];
                break;
            case "superJupiter":
                name = "super jupiter";
                moonProportions = [1, 10, 30, 10];
                moonChoices = [
                    [
                        {
                            object: "iceGiant",
                            amount: 1,
                            properties: { "moon!isMoon": true },
                        }, {
                            object: "dwarfPlanet",
                            amount: makeFunction(Rand, 0, 5),
                            properties: { "moon!isMoon": true },
                        }, {
                            object: "asteroid",
                            amount: makeFunction(Rand, 0, 10),
                            properties: { "moon!isMoon": true },
                        }
                    ], [
                        {
                            object: "superEarth",
                            amount: makeFunction(Rand, 0, 3),
                            properties: { "moon!isMoon": true },
                        },
                        {
                            object: "terrestrialPlanet",
                            amount: makeFunction(Rand, 0, 5),
                            properties: { "moon!isMoon": true },
                        },
                        {
                            object: "dwarfPlanet",
                            amount: makeFunction(Rand, 0, 10),
                            properties: { "moon!isMoon": true },
                        }, {
                            object: "asteroid",
                            amount: makeFunction(Rand, 0, 20),
                            properties: { "moon!isMoon": true },
                        }
                    ], [
                        {
                            object: "dwarfPlanet",
                            amount: makeFunction(Rand, 0, 30),
                            properties: { "moon!isMoon": true },
                        }, {
                            object: "asteroid",
                            amount: makeFunction(Rand, 0, 150),
                            properties: { "moon!isMoon": true },
                        }
                    ], [
                        {
                            object: "asteroid",
                            amount: makeFunction(Rand, 0, 100),
                            properties: { "moon!isMoon": true },
                        }
                    ]];
                break;
        }
        stuff = stuff.concat(chooseWeighted2(moonChoices, moonProportions));
    } else {
        switch (size) {
            case "iceGiant":
                name = "gigantic moon";
                break;
            default:
                name = "error";
        }
    }
    return new GenericInstance(temp + " gas giant", stuff, properties);
}

function asteroid(properties) {
    let temp = properties["planet!temperature"];
    let moon = properties["moon!isMoon"];
    let types = ["molten", "metallic", "rocky", "icy"];
    let proportions = [0, 0, 0, 0];
    switch (temp) {
        case "scorched":
            proportions = [60, 30, 10, 0];
            break;
        case "hot":
            proportions = [40, 40, 20, 0];
            break;
        case "warm":
        case "temperate":
            proportions = [0, 30, 70, 0];
            break;
        case "cool":
            proportions = [0, 30, 60, 10];
            break;
        case "cold":
            proportions = [0, 20, 20, 60];
            break;
        case "frozen":
            proportions = [0, 10, 10, 80];
            break;
    }
    let type = chooseWeighted2(types, proportions);
    amount = Rand(50, 100);
    let stuff = [];
    for (let i = 0; i < amount; i++) {
        switch (type) {
            case "metallic":
                stuff.push({
                    object: Math.random() > 0.5 ? "ironChunk" : "nickelChunk",
                    amount: 1,
                });
                break;
            case "molten":
                stuff.push({
                    object: Math.random() > 0.1 ? "lava" : (Math.random() > 0.5 ? "ironChunk" : "nickelChunk"),
                    amount: 1,
                });
                break;
            case "rocky":
                stuff.push({
                    object: "rock",
                    amount: 1,
                });
                break;
            case "icy":
                stuff.push({
                    object: Math.random() > 0.1 ? "ice" : "rock",
                    amount: 1,
                });
                break;
        }
    }
    return new GenericInstance(temp + " asteroid" + (moon ? " moon" : ""), stuff);
}

new Thing("planet", "planet", generatePlanet);
new Thing("asteroidBelt", "asteroid belt", asteroidBelt);
new Thing("asteroid", "asteroid", asteroid);
new Thing("dwarfPlanet", "dwarf planet", (p) => rockyPlanet(p,"dwarfPlanet"));
new Thing("terrestrialPlanet", "terrestrial planet", (p) => rockyPlanet(p,"terrestrialPlanet"));
new Thing("superEarth", "super earth", (p) => rockyPlanet(p,"superEarth"));
new Thing("iceGiant", "ice giant", (p) => gasPlanet(p,"iceGiant"));
new Thing("gasGiant", "gas giant", (p) => gasPlanet(p,"gasGiant"));
new Thing("superJupiter", "super jupiter", (p) => gasPlanet(p,"superJupiter"));
