class Taxon {
	constructor(name, organisms, generator, level) {
        this.name = name;
		this.generator = generator;
        this.organismCounts = organisms;
        this.subTaxa = [];
        this.level = level;
        this.generated = false;
	}
    generate() {
        this.subTaxa = this.subTaxa.concat(this.generator(this,this.organismCounts,this.level));
        for(let i = 0; i < this.subTaxa.length; i++) {
            this.subTaxa[i].root = this.root;
        }
        this.generated = true;
    }
    getOrganism(habitat) {
        if(!this.generated) {
            this.generate();
        }
        let subTaxa = this.subTaxa.slice();
        shuffleArray(subTaxa);
        for(let i = 0; i < subTaxa.length; i++) {
            let organism = subTaxa[i].getOrganism(habitat);
            if(organism != null) {
                return organism;
            }
        }
        return null;
    }
    getInstance() {
        if(!this.generated) {
            this.generate();
        }
        return new TaxonInstance(this.name,this.subTaxa);
    }
}


class TaxonInstance extends Instance {
	constructor(name,subTaxa) {
		super(name,[]);
        this.subTaxa = subTaxa
	}
    
    generate() {
        for (let i = 0; i < this.subTaxa.length; i++) {
            this.children.push(this.subTaxa[i].getInstance());
        }
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].parent = this;
        }
        super.generate();
        this.generated = true;
    }
}

class Biosphere extends Taxon {
	constructor(name, organisms, generator) {
		super(name, organisms, generator, Infinity);
	}
}


class Species extends Taxon {
	constructor(name, generator) {
        super(name, 0, generator);
        this.used = false;
	}
    getOrganism() {
        if(!this.used) {
            this.used = true;
            return this;
        } else {
            return null
        }
    }
    getInstance() {
        return new Instance(this.name,[new Button(makeFunction(this.find,this),"find")]);
    }
    getInstance2() {
        return new EmptyInstance(this.name);
    }
    find(species) {
        let current = species.root;
        if(!species.used) {
            if(!current.generated) {
                current.generate(species);
            }
            while(!current.organisms.includes(species)) {
                let choices = [];
                for(let i = 0; i < current.children.length; i++) {
                    if(current.children[i] instanceof BiosphereInstance) {
                        choices.push([current.children[i],current.children[i].unusedOrganisms(species.habitatType)]);
                    }
                }
                current = chooseWeighted(choices);
                if(!current.generated) {
                    current.generate(species);
                }
            }
            species.used = true;
        } else {
            current = species.firstHabitat;
        }
        let found = false;
        while(!found) {
            if(!current.generated) {
                current.generate();
            }
            let children = current.children.slice();
            shuffleArray(children);
            let throwError = true;
            for(let i = 0; i < children.length; i++) {
                if(children[i] instanceof BiosphereInstance && children[i].organisms.includes(species)) {
                    current = children[i];
                    throwError = false;
                    break;
                }
                if(children[i].name == species.name) {
                    current = children[i];
                    found = true;
                    throwError = false;
                    break;
                }
            }
            if(throwError) {
                throw new Error("Could not find organism!");
            }
        }
        current.find();
    }
}


let organism = new Empty("organism","_organism");

class BiosphereRealization {
	constructor(id, name, generator, biosphereGenerator) {
		this.name = name;
		this.generator = generator;
		this.biosphereGenerator = biosphereGenerator;
		genericThings[id] = this;
	}
    getInstance(organisms = 0, biosphereRoot = false) {
        if(biosphereRoot) {
            let biosphere = new Biosphere("taxonomy", organisms, this.biosphereGenerator);
            let instance = new BiosphereInstance(this.name,this.generator,biosphere,organisms,true);
            biosphere.root = instance;
            return instance;
        } else {
            return new BiosphereInstance(this.name,this.generator,null,organisms,false);
        }
    }
}

class BiosphereInstance extends Instance {
	constructor(name,generator,biosphere,organismCounts,biosphereRoot) {
		super(name,[]);
        this.childrenGenerator = generator;
        this.biosphere = biosphere;
        this.organisms = [];
        this.organismCounts = organismCounts;
        this.biosphereRoot = biosphereRoot;
	}
    
    generate(findOrganism) {
        this.children = this.children.concat(this.childrenGenerator(this,findOrganism));
        for (let i = 0; i < this.children.length; i++) {
            if(this.children[i] instanceof EmptyInstance && this.children[i].name == "_organism") {
                this.children[i] = choose(this.organisms).getInstance2();
            }
        }
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].parent = this;
        }
        super.generate();
        this.generated = true;
    }
    
    unusedOrganisms(habitat) {
        if(isNaN(this.organismCounts[habitat])) {
            return 0;
        } else if(!this.generated) {
            return this.organismCounts[habitat];
        } else {
            let result = 0;
            for(let i = 0; i < this.children.length; i++) {
                if(this.children[i] instanceof BiosphereInstance) {
                    result += this.children[i].unusedOrganisms(habitat);
                }
            }
            return result;
        }
    }
}


class Button extends Instance {
	constructor(func,name) {
		super("button",[]);
        this.func = func;
		this.html='<div id="div'+this.id+'">'
        +'<a href="javascript:toggle('+this.id+');" style="padding-right:8px;" '
        +'"><span class="arrow" id="arrow'+this.id+'">' + name + '</span>'
        +'</a><div id="container'+this.id+'" class="thing" style="display:none;'+'">'
        +'</div></div>';
	}
    
    generate() {
        super.generate();
    }
    
    toggle() {
        this.func();
    }
}


function taxonNamer(level) {
    switch(level) {
        case 7: return "domain";
        case 6: return "kingdom";
        case 5: return "phylum";
        case 4: return "class";
        case 3: return "order";
        case 2: return "family";
        case 1: return "genus";
        case 0: return "species";
        default: return "nonexistent taxon";
    }
}

function debugBiosphereGenerator(taxon, count, level) {
    if(level > 8) {
        level = 8;
    }
    if(level > 1) {
        let result = [];
        let taxaCount = Rand(1,count/Math.exp(level));
        for(let i = 0; i < taxaCount; i++) {
            result.push(0);
        }
        while(count > 0) {
            let i = Rand(0,result.length-1);
            let amount = Rand(1,count/5);
            result[i] += amount;
            count -= amount;
        }
        let result2 = [];
        for(let i = 0; i < result.length; i++) {
            if(result[i] > 0) {
                result2.push(new Taxon(randomName(5,10) + " (" + taxonNamer(level-1) + ")", result[i], debugBiosphereGenerator, level-1));
            }
        }
        return result2;
    }
    if(level == 1) {
        let result = [];
        for(let i = 0; i < count; i++) {
            result.push(new Species(taxon.name.substring(0, taxon.name.indexOf("(genus)")) + randomName(5,10),null));
        }
        return result;
    }
    throw new Error("Invalid level!");
}



function defaultBiosphereRealizationGeneratorHelper(instance, findOrganism, generator, args) {
    let result = instance.biosphereRoot ? [instance.biosphere.getInstance()] : [];
    result = result.concat(generator(instance));
    for(let i = 0; i < result.length; i++) {
        result[i].biosphere = instance.biosphere;
    }

    if (args.createOrganisms) {
        let organismCount2 = instance.organismCounts[instance.habitatType];
        if (findOrganism && coin(organismCount2 / instance.organismCounts[instance.habitatType])) {
            organismCount2--;
            instance.organisms.push(findOrganism);
        }
        for (let i = 0; i < organismCount2; i++) {
            instance.organisms.push(instance.biosphere.getOrganism());
        }
    }
    
    for (let i = 0; i < instance.organisms.length; i++) {
        instance.organisms[i].firstHabitat = instance;
    }
    
    let organismCounts = structuredClone(instance.organismCounts);
    organismCounts[instance.habitatType] -= instance.organisms.length;
    for (let i in organismCounts) {
        organisms = organismCounts[i];
        while (organisms > 0) {
            let habitat = choose(result);
            let count = Rand(1, organisms / 5);
            if (!habitat.organismCount) {
                habitat.organismCount[i] = count;
            } else {
                habitat.organismCount[i] += count;
            }
            organisms -= count;
        }
    }
    
    if(instance.organisms.length > 0) {
        let organisms = parseGeneration([{
            object: "organism",
            amount: makeFunction(Rand,20,100),
        }]);
        for(let i = 0; i < instance.organisms.length; i++) {
            organisms.push(instance.organisms[i].getInstance2());
        }
        shuffleArray(organisms);
        result = result.concat(organisms);
    }
    return result;
}

function defaultBiosphereRealizationGenerator(generator, args) {
    return function(instance, findOrganism) {return defaultBiosphereRealizationGeneratorHelper(instance, findOrganism, generator, args)}
}
function debugBiosphereRealizationGenerator(instance, findOrganism) {
    return parseGeneration([{
        object: "debugBiosphere",
        amount: makeFunction(Rand, 1, 3),
    }]);
}


let debugBiosphere = new BiosphereRealization("debugBiosphere", "biosphere test", defaultBiosphereRealizationGenerator(debugBiosphereRealizationGenerator), debugBiosphereGenerator);