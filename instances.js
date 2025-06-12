let instances = [];
let instanceCount = 0;
let defaultProperties = {
    "multiverse!cohortSize": 1,
    "galaxyCluster!clusterSize": 2,
    "galaxyCluster!dwarf": false,
    "star!starAge": 2,
    "galaxyHalo!size": 2,
    "star!starType": "G  main sequence star",
    "planet!systemType": "inner",
    "planet!temperature": "temperate",
    "planet!size": "terrestrialPlanet",
    "oceans!type": "waterOcean",
    "moon!isMoon": false,
};

class Instance {
    constructor(name, children, properties = {}) {
		this.name=name;
        this.parent = null;
        this.initproperties = properties;
        this.properties = null;
		this.children=children;
		this.id=instanceCount;
		this.html='<div id="div'+this.id+'">'
        +'<a href="javascript:toggle('+this.id+');" style="padding-right:8px;" '
        +'"><span class="arrow" id="arrow'+this.id+'">+</span> '
        +this.name+'</a><div id="container'+this.id+'" class="thing" style="display:none;'+'">'
        +'</div></div>';
		this.generated=false;
		this.display=false;
		instanceCount++;
		instances.push(this);
	}
    generate() {
        this.generated = true;
        this.assignParents();
        this.resetHtml();
    }
    
    resetHtml() {
		this.html='<div id="div'+this.id+'">'
        +'<a href="javascript:toggle('+this.id+');" style="padding-right:8px;" '
        +'"><span class="arrow" id="arrow'+this.id+'">+</span> '
        +this.name+'</a><div id="container'+this.id+'" class="thing" style="display:none;'+'">'
        +'</div></div>';
        let str="";
        for (let i in this.children)
        {
            if(!document.getElementById("div"+this.children[i].id))
            {
                str+=this.children[i].html;
            }
            else
            {
                str+=document.getElementById("div"+this.children[i].id).outerHTML ;
            }
        }
        if (document.getElementById("container" + this.id)) {
            document.getElementById("container" + this.id).innerHTML = str;
        }
    }
    toggle() {
        if (this.display==false)
        {

            if (this.generated==false) {
                this.generate();
            }


            this.display = true;
            if (document.getElementById("container" + this.id)) {
                document.getElementById("container" + this.id).style.display = "block";
                document.getElementById("arrow" + this.id).innerHTML = "-";
            }
        }
        else if (this.display==true)
        {
            this.display=false;
            document.getElementById("container"+this.id).style.display="none";
            document.getElementById("arrow"+this.id).innerHTML="+";
        }
    }
    find() {
        let current = this;
        while(current) {
            if(current.display == false) {
                current.toggle();
            }
            current = current.parent;
        }
        document.getElementById("div"+this.id).scrollIntoView({
            behavior: 'smooth'
        });
    }
    assignParents() {
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].parent = this;
            if (!this.children[i].properties) {
                this.children[i].properties = Object.assign({}, this.properties, this.children[i].initproperties);
            }
            if (Object.keys(this.children[i].properties).some((x) => !Object.keys(defaultProperties).includes(x))) {
                throw new Error("Unknown PropertyKeys:" + Object.keys(this.children[i].properties).filter((x) => !Object.keys(defaultProperties).includes(x)));
            }
            if (Object.keys(defaultProperties).some((x) => !Object.keys(this.children[i].properties).includes(x))) {
                throw new Error("Undefined PropertyKeys:" + Object.keys(defaultProperties).filter((x) => !Object.keys(this.children[i].properties).includes(x)));
            }
        }
    }
}

class EmptyInstance extends Instance {
	constructor(name) {
        super(name, [], {});
		this.html='<div id="div'+this.id+'">'
        +this.name+'</div>';
		this.generated=true;
		this.display=true;
	}
    toggle() {
        return;
    }
}

function toggle(id)
{
    instances[id].toggle();
}