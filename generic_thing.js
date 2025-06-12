let genericThings = {};

class Thing {
	constructor(id,name,instanceFunction) {
        this.name = name;
        this.instanceFunction = instanceFunction;
		genericThings[id] = this;
	}
    getInstance(properties) {
        return this.instanceFunction(properties);
    }
}


class GenericThing extends Thing {
    constructor(id, name, contains) {
        super(id, name, (properties) => new GenericInstance(name, contains, properties));
	}
}


function getInstanceById(thing, properties = {}) {
    if (genericThings[thing]) {
        return genericThings[thing].getInstance(properties);
    } else {
        return new GenericInstance(thing + " [WIP]", [{
            object: "placeholder",
            amount: 1,
        }]);
    }
}

class GenericInstance extends Instance {
	constructor(name,children,properties) {
		super(name,[],properties);
        this.childrenGenerator = children;
	}
    
    generate() {
        
        this.children = this.children.concat(parseGeneration(this.childrenGenerator,this.properties));
        super.generate();
        this.generated = true;
    }
}


class ShuffledInstance extends Instance {
	constructor(name,children,properties) {
        super(name, [], properties);
        this.childrenGenerator = children;
	}
    
    generate() {
        this.children = this.children.concat(parseGeneration(this.childrenGenerator,this.properties));
        shuffleArray(this.children);
        this.assignParents();
        super.generate();
        this.generated = true;
    }
}


class ShuffledThing extends Thing {
    constructor(id, name, contains) {
        super(id, name, (properties) => new ShuffledInstance(name, contains, properties));
	}
}

class ComplexThing extends Thing {
    constructor(id, name, contains) {
        super(id, name, (properties) => new ComplexInstance(this.name, contains, properties));
    }
}

class ComplexInstance extends Instance {
	constructor(name,children,properties) {
		super(name,[],properties);
        this.childrenGenerator = children;
	}
    
    generate() {
        this.children = this.children.concat(this.childrenGenerator(this.properties));
        this.assignParents();
        super.generate();
        this.generated = true;
    }
}

function parseGeneration(childInput, properties = {}) {
    
    let children = [];
    for (let i = 0; i < childInput.length; i++) {
        
        let makeAmount;
        if(childInput[i].amount instanceof Function) {
            makeAmount = childInput[i].amount();
        } else {
            makeAmount = childInput[i].amount;
        }
        let childProperties = {};
        if (childInput[i].properties) {
            childProperties = childInput[i].properties;
        }
        
        for (let ii=0;ii<makeAmount;ii++) {
            let toMake=childInput[i].object;

            if (toMake instanceof Function) {
                if(childInput[i].otherVars) {
                    let otherVars = childInput[i].otherVars
                    toMake = toMake(...otherVars);
                } else {
                    toMake = toMake();
                }
            } else if(typeof toMake === "string") {
                toMake = getInstanceById(toMake,Object.assign(properties,childProperties));
            }
            if (typeof childInput[i].name === "string") {
                toMake = rename(toMake,childInput[i].name);
            }
            children.push(toMake);
        }
    }
    return children;
}


class Empty extends Thing {
    constructor(id, name) {
        super(id, name, () => new EmptyInstance(this.name));
    }
}


let imaginaryDodecahedron = new GenericThing("imaginaryDodecahedron", "imaginary dodecahedron", [{
    object: "imaginaryDodecahedron",
    amount: makeFunction(Rand, 10, 50),
}]);

function boxContents(cheeseLevel, notDescender = true, properties) {
    cheeseChance = 1 - 1 / (1 + cheeseLevel / 5);
    if (cheeseLevel === 0) {
        cheeseChance = 0.05;
    }
    if (chance(cheeseChance) === 1 && notDescender) {
        return parseGeneration([{
            object: cheeseBox(cheeseLevel + 1),
            amount: 1,
        }, {
            object: "cheeseburger",
            amount: 1,
        }]);
    }
    let boxes = Rand(10, 20);
    let result = [];
    for (let i = 0; i < boxes; i++) {
        if (chance(0.01) === 1) {
            result.push(cheeseBox(1));
        }
        else {
            result.push(getInstanceById("theBox"));
        }
    }
    result.push(getInstanceById("SPACE"));
    shuffleArray(result);
    for (let i = 0; i < cheeseLevel; i++) {
        result.unshift(getInstanceById("cheeseburgerHole"));
    }
    if (notDescender) {
        result.push(new DescenderInstance(() => boxContents(0, false)));
    }
    return result;
}


let theBox = new Thing("theBox","the box",makeFunction(boxContents,0,true));
function cheeseBox(n) {
    let name = "box";
    for(let i = 0; i < n; i++)
    {
        name = "cheese" + name;
    }
    return new ComplexInstance(name,makeFunction(boxContents,n));
}
let nothing = new Empty("nothing","nothing");

nothing.getInstance = function() {
    if(chance(0.001))
    {
        return new GenericInstance(this.name,[{
            object: "theBox",
            amount: 1,
        }]);
    }
    return new EmptyInstance(this.name);
}


let cheeseburgerHole = new GenericThing("cheeseburgerHole","cheeseburger shaped void",[{
    object: "nothing",
    amount: 1,
}]);

let cheeseburger = new GenericThing("cheeseburger","cheeseburger",[{
    object: "placeholder",
    amount: 1,
}]);

let placeholder = new GenericThing("placeholder","placeholder contents",[{
    object: "nothing",
    amount: 1,
}]);

let deepfield = new Thing("deepfield","deepfield",xfieldContents);


function xfieldContents(notDescender = true) {
    let fields = Rand(10,20);
    let result = []
    for(let i = 0; i < fields; i++)
    {
        if(chance(0.1) === 1)
        {
            result.push(getInstanceById("nonfield"));
        }
        else
        {
            result.push(xfield());
        }
    }
    shuffleArray(result);
    if(notDescender)
    {
        result.push(new DescenderInstance(() => xfieldContents(false)));
    }
    return result;
}


function xfield() {
    let name = randomName(1,10) + "field";
    if(genericThings[name])
    {
        return getInstanceById(name);
    }
    return new ComplexInstance(name,xfieldContents);
}

let SPACE = new GenericThing("SPACE","S P A C E",[{
    object: "deepfield",
    amount: makeFunction(Rand,10,20),
},{
    object: () => new DescenderInstance(() => parseGeneration([{
        object: "deepfield",
        amount: makeFunction(Rand,10,20),
    }])),
    amount: 1,
}]);



let nonfield = new GenericThing("nonfield","nonfield",[{
    object: makeFunction(parathing,6),
    amount: makeFunction(Rand,10,20),
},{
    object: () => new DescenderInstance(() => parseGeneration([{
        object: makeFunction(parathing,6),
        amount: makeFunction(Rand,10,20),
    }])),
    amount: 1,
}]);



function parafieldContents(level)
{
    let things = Rand(10,20);
    let result = [];
    for(let i = 0; i < things; i++)
    {
        result.push(parathing(level));
    }
    result.push(new DescenderInstance(() => parseGeneration([{
        object: makeFunction(parathing,level),
        amount: makeFunction(Rand,10,20),
    }])))
    return result;
}


function parafield(level)
{
    if(level === 0)
    {
        return getInstanceById("itfield");
    }
    return new ComplexInstance(level === 1 ? "antifield" : "parafield",makeFunction(parafieldContents,level));
}

function parathingContents(level)
{
    let things = Rand(10,20);
    let result = [];
    for(let i = 0; i < things; i++)
    {
        result.push(parathing(level));
    }
    things = Rand(10,20);
    for(let i = 0; i < things; i++)
    {
        result.push(parafield(level-1));
    }
    shuffleArray(result);
    return result;
}


function parathing(level)
{
    let gibberish = 0;
    switch (level) {
        case 6:
            gibberish = 12288;
            break;
        case 5:
            gibberish = 4096;
            break;
        case 4:
            gibberish = 2048;
            break;
        case 3:
            gibberish = 1024;
            break;
        case 2:
            gibberish = 592;
            break;
        case 1:
            gibberish = 128;
            break;
        default:
            gibberish = 0;
    }
    return new ComplexInstance(extremeGibberish(10,20,gibberish),makeFunction(parathingContents,level));
}


let itfield = new GenericThing("itfield","itfield",[{
    object: "itfield",
    amount: makeFunction(Rand,10,20),
}]);