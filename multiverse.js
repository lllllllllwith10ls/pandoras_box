class Multiverse extends Thing {
    constructor(id, name, generator) {
        super(id, name, () => new MultiverseInstance(name, generator));
    }
}

class MultiverseInstance extends Instance {
    constructor(name, generator) {
        super(name, []);
        this.generator = generator;
        this.html = '<div id="div' + this.id + '">'
            + '<a href="javascript:toggle(' + this.id + ');" style="padding-right:8px;" '
            + '"><span class="arrow" id="arrow' + this.id + '">+</span> '
            + this.name + '</a><div id="container' + this.id + '" class="thing" style="display:none;' + '">'
            + '</div></div>';
    }
    
    generate() {
        
        this.children = [new Ascender(this.generator)];
        this.assignParents();
        this.grown = true;
        super.generate();
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].generate();
        }
    }
}


class Ascender extends Instance {
    constructor(childrenGenerator) {
        super("ascender", []);
        this.childrenGenerator = childrenGenerator;
        this.html = '<div id="div' + this.id + '">'
            + '<a href="javascript:toggle(' + this.id + ');" style="padding-right:8px;" '
            + '"><span class="arrow" id="arrow' + this.id + '">^</span>'
            + '</a><div id="container' + this.id + '" class="thing" style="display:none;' + '">'
            + '</div></div>';
        this.level = 0;
    }
    
    generate() {
        this.children = this.childrenGenerator(0);
        this.level++;
        this.assignParents();
        document.getElementById("container" + this.id).style.display = "block";
        super.generate();
    }
    
    toggle() {
        let child = this.children;
        let childHtml = document.getElementById("container" + this.id).innerHTML;
        this.children = this.childrenGenerator(this.level);
        this.level++;
        this.assignParents();
        this.resetHtml();
        this.children[0].toggle();
        if (this.children[0].children[0] instanceof Ascender) {
            this.children[0].children[0].children = child;
            document.getElementById("container" + this.children[0].children[0].id).innerHTML = childHtml;
        }
        else {
            this.children[0].children = child;
            document.getElementById("container" + this.children[0].id).innerHTML = childHtml;
        }
    }
}


class Descender extends Thing {
    constructor(id, childrenGenerator) {
        super(id, "...more", () => new DescenderInstance(this.childrenGenerator));
    }
}
class DescenderInstance extends Instance {
    constructor(childrenGenerator) {
        super("descender", []);
        this.childrenGenerator = childrenGenerator;
        this.html = '<div id="div' + this.id + '">'
            + '<a href="javascript:toggle(' + this.id + ');" style="padding-right:8px;" '
            + '"><span class="arrow" id="arrow' + this.id + '">...more</span>'
            + '</a>'
            + '</div></div>';
        this.level = 0;
    }
    
    toggle() {
        let children = this.childrenGenerator(this.level);
        this.level++;
        this.parent.children.pop();
        this.parent.children = this.parent.children.concat(children);
        this.parent.children.push(this);
        this.parent.assignParents();
        this.parent.resetHtml();
    }
}


let debugDescender = new Descender("debugDescender", () => parseGeneration([{
    object: "debugMultiverse",
    amount: makeFunction(Rand, 10, 50),
}, {
    object: "imaginaryDodecahedron",
    amount: makeFunction(Rand, 10, 50),
}]));

let debugMultiverse = new Multiverse("debugMultiverse", "imaginary dodecahedroverse", () => parseGeneration([{
    object: "debugMultiverse",
    amount: makeFunction(Rand, 10, 50),
}, {
    object: "imaginaryDodecahedron",
    amount: makeFunction(Rand, 10, 50),
}, {
    object: "debugDescender",
    amount: 1,
}]));


let multiverse = new Multiverse("multiverse", "multiverse", (level) => parseGeneration([{
    object: "universeCohort",
    amount: makeFunction(Rand, 10, 50),
    properties: { "multiverse!cohortSize": level }
}]));


new Thing("universeCohort", "universe cohort", universeCohort);

function universeCohort(properties) {
    let level = properties["multiverse!cohortSize"];
    if (level === 0) {
        return getInstanceById("universe", properties);
    } else {
        return new GenericInstance("universe cohort", [{
            object: "universeCohort",
            amount: makeFunction(Rand, 10, 50),
            properties: { "multiverse!cohortSize": level - 1 }
        }]);
    }
}