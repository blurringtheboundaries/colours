var test, colourToggle;


/**
 * Official CSS colours with hex codes
 */

const COLOURS = {
    // A
    AliceBlue: "#F0F8FF",
    AntiqueWhite: "#FAEBD7",
    Aqua: "#00FFFF",
    Aquamarine: "#7FFFD4",
    Azure: "#F0FFFF",

    // B
    Beige: "#F5F5DC",
    Bisque: "#FFE4C4",
    Black: "#000000",
    BlanchedAlmond: "#FFEBCD",
    Blue: "#0000FF",
    BlueViolet: "#8A2BE2",
    Brown: "#A52A2A",
    BurlyWood: "#DEB887",

    // C
    CadetBlue: "#5F9EA0",
    Chartreuse: "#7FFF00",
    Chocolate: "#D2691E",
    Coral: "#FF7F50",
    CornflowerBlue: "#6495ED",
    CornSilk: "#FFF8DC",
    Crimson: "#DC143C",
    Cyan: "#00FFFF",

    // D
    DarkBlue: "#00008B",
    DarkCyan: "#008B8B",
    DarkGoldenRod: "#B8860B",
    DarkGray: "#A9A9A9",
    DarkGreen: "#006400",
    DarkGrey: "#A9A9A9",
    DarkKhaki: "#BDB76B",
    DarkMagenta: "#8B008B",
    DarkOliveGreen: "#556B2F",
    DarkOrange: "#FF8C00",
    DarkOrchid: "#9932CC",
    DarkRed: "#8B0000",
    DarkSalmon: "#E9967A",
    DarkSeaGreen: "#8FBC8F",
    DarkSlateBlue: "#483D8B",
    DarkSlateGray: "#2F4F4F",
    DarkSlateGrey: "#2F4F4F",
    DarkTurquoise: "#00CED1",
    DarkViolet: "#9400D3",
    DeepPink: "#FF1493",
    DeepSkyBlue: "#00BFFF",
    DimGray: "#696969",
    DimGrey: "#696969",
    DodgerBlue: "#1E90FF",

    // F
    FireBrick: "#B22222",
    FloralWhite: "#FFFAF0",
    ForestGreen: "#228B22",
    Fuchsia: "#FF00FF",

    // G
    Gainsboro: "#DCDCDC",
    GhostWhite: "#F8F8FF",
    Gold: "#FFD700",
    GoldenRod: "#DAA520",
    Gray: "#808080",
    Green: "#008000",
    GreenYellow: "#ADFF2F",
    Grey: "#808080",

    // H
    HoneyDew: "#F0FFF0",
    HotPink: "#FF69B4",

    // I
    IndianRed: "#CD5C5C",
    Indigo: "#4B0082",
    Ivory: "#FFFFF0",

    // K
    Khaki: "#F0E68C",

    // L
    Lavender: "#E6E6FA",
    LavenderBlush: "#FFF0F5",
    LawnGreen: "#7CFC00",
    LemonChiffon: "#FFFACD",
    LightBlue: "#ADD8E6",
    LightCoral: "#F08080",
    LightCyan: "#E0FFFF",
    LightGoldenRodYellow: "#FAFAD2",
    LightGray: "#D3D3D3",
    LightGreen: "#90EE90",
    LightGrey: "#D3D3D3",
    LightPink: "#FFB6C1",
    LightSalmon: "#FFA07A",
    LightSeaGreen: "#20B2AA",
    LightSkyBlue: "#87CEFA",
    LightSlateGray: "#778899",
    LightSlateGrey: "#778899",
    LightSteelBlue: "#B0C4DE",
    LightYellow: "#FFFFE0",
    Lime: "#00FF00",
    LimeGreen: "#32CD32",
    Linen: "#FAF0E6",

    // M
    Magenta: "#FF00FF",
    Maroon: "#800000",
    MediumAquamarine: "#66CDAA",
    MediumBlue: "#0000CD",
    MediumOrchid: "#BA55D3",
    MediumPurple: "#9370DB",
    MediumSeaGreen: "#3CB371",
    MediumSlateBlue: "#7B68EE",
    MediumSpringGreen: "#00FA9A",
    MediumTurquoise: "#48D1CC",
    MediumVioletRed: "#C71585",
    MidnightBlue: "#191970",
    MintCream: "#F5FFFA",
    MistyRose: "#FFE4E1",
    Moccasin: "#FFE4B5",

    // N
    NavajoWhite: "#FFDEAD",
    Navy: "#000080",

    // O
    OldLace: "#FDF5E6",
    Olive: "#808000",
    OliveDrab: "#6B8E23",
    Orange: "#FFA500",
    OrangeRed: "#FF4500",
    Orchid: "#DA70D6",

    // P
    PaleGoldenRod: "#EEE8AA",
    PaleGreen: "#98FB98",
    PaleTurquoise: "#AFEEEE",
    PaleVioletRed: "#DB7093",
    PapayaWhip: "#FFEFD5",
    PeachPuff: "#FFDAB9",
    Peru: "#CD853F",
    Pink: "#FFC0CB",
    Plum: "#DDA0DD",
    PowderBlue: "#B0E0E6",
    Purple: "#800080",

    // R
    RebeccaPurple: "#663399",
    Red: "#FF0000",
    RosyBrown: "#BC8F8F",
    RoyalBlue: "#4169E1",

    // S
    SaddleBrown: "#8B4513",
    Salmon: "#FA8072",
    SandyBrown: "#F4A460",
    Seagreen: "#2E8B57",
    Seashell: "#FFF5EE",
    Sienna: "#A0522D",
    Silver: "#C0C0C0",
    SkyBlue: "#87CEEB",
    SlateBlue: "#6A5ACD",
    SlateGray: "#708090",
    SlateGrey: "#708090",
    Snow: "#FFFAFA",
    SpringGreen: "#00FF7F",
    SteelBlue: "#4682B4",

    // T
    Tan: "#D2B48C",
    Teal: "#008080",
    Thistle: "#D8BFD8",
    Tomato: "#FF6347",
    Turquoise: "#40E0D0",

    // V
    Violet: "#EE82EE",

    // W
    Wheat: "#F5DEB3",
    White: "#FFFFFF",
    WhiteSmoke: "#F5F5F5",

    // Y
    Yellow: "#FFFF00",
    YellowGreen: "#9ACD32"
};

const getColourFromHex = function (hex) {
    return Object.keys(COLOURS).find(
        (key) => COLOURS[key] === hex.toUpperCase()
    );
};

const getHexFromColour = function (colourName) {
    return Object.entries(COLOURS).find(
        ([key, item]) => key.toLowerCase() === colourName.toLowerCase()
    )[1];
    // return COLOURS[colourName];
};

/**
 * HTML piano keyboard
 * Charles Matthews (Blurring the Boundaries Arts) 2022
 * Additional colour features in collaboration with Joel Daze
 */

const measurements = {
    white: 30,
    black: 20
};

const toggles = {
    noteName: true,
    noteColour: true
};



const setLabelText = function (note, i) {
    let labelText = "";
    if (toggles.noteName)
        labelText += `${noteNames[i % 12].replace(" sharp", "-sharp")}-${
            parseInt(i / 12) + 4
        },`;
    if (toggles.noteColour)
        labelText += noteColours[colourSelection].names[i % 12];
    note.setAttribute("aria-label", labelText);
};

let colourSelection = "newton_12";

/**
 * Check if a MIDI note number is a black key
 * @param {number} x MIDI note number
 * @returns {boolean}
 */

const isBlackKey = (x) => [1, 3, 6, 8, 10].includes(x % 12);

const noteColours = {
    newton_12: {
        names: [
            "Red",
            "OrangeRed",
            "Orange",
            "Gold",
            "Yellow",
            "YellowGreen",
            "Green",
            "LightSeaGreen",
            "Blue",
            "BlueViolet",
            "Indigo",
            "Purple"
        ],
        description:
            "Color wheel with added accidentals, based on Newton's system.",
        author: "Charles Matthews"
    },
    daze: {
        names: [
            "Orange",
            "Bisque",
            "Magenta", // Mauve
            "PaleGreen",
            "Aqua", // Aqua green E
            "Yellow", // yellow lemon, more red than blue
            "Sienna", // Rust
            "Red",
            "Orchid", // Lilac
            "Purple",
            "LimeGreen",
            "DeepSkyBlue" // Deep pool blue / deep end blue
        ],
        description:
            "Colour Pitch Assembly by Joel Daze.  Please reference this project if used.",
        author: "Joel Daze"
    },
    purples: {
        names: [
            "Purple",
            "Indigo",
            "DarkViolet",
            "BlueViolet",
            "MediumSlateBlue",
            "SlateBlue",
            "MediumOrchid",
            "Violet",
            "Plum",
            "Orchid",
            "MediumPurple",
            "DarkOrchid"
        ],
        description: "A set of purples",
        author: "Charles Matthews"
    }
};

let colourBuffer = "#000000";
const setNewColour = function () {
    colourBuffer = this.value;
};

const setCurrentColour = function () {
    console.log(this.getAttribute("class"));
    console.log("colourBuffer", colourBuffer);
    if (this.getAttribute("class") == "button") {
        noteColours[colourSelection].names.forEach(
            (x, i, array) => (array[i] = colourBuffer)
        );
        test.setColours();
    } else if (this.getAttribute("class").includes("pianoNote")) {
        if (colourToggle.checked) {
            noteColours[colourSelection].names[
                this.dataset.index % 12
            ] = colourBuffer;
            test.setColours();
            setPresetIcons();
        } else {
            console.log(this.style.backgroundColor);
            colourBuffer = getHexFromColour(this.style.backgroundColor);
            console.log(
                "background and buffer:",
                this.style.backgroundColor,
                colourBuffer
            );
            document.getElementById("colourWell").value = colourBuffer;
        }
    }
};

const WedgeIcon = function (id, templateName, presetName) {
    this.element = document.getElementById(templateName).cloneNode(true);
    this.element.id = id;
    this.element.setAttribute('class',`colourIcon ${id}`)
    this.element.style.display = "inline-block";
    this.colourIcon(presetName);
};

WedgeIcon.constructor = WedgeIcon;
WedgeIcon.prototype.colourIcon = function (selection) {
    Array.from(this.element.querySelector(".sectors").children).forEach(
        (wedge, i, array) => {
            wedge.style.fill = noteColours[selection].names[i];
        }
    );
};

const setColourIcons = function(selectedId){
   presetArray.forEach(x=>{
       x.element.querySelector('circle')
           .setAttribute('stroke',x.element.id == selectedId ? 'white' : 'black');
       x.element.setAttribute('transform',x.element.id == selectedId ? 'rotate(360)' : 'rotate(0)')
   })
}

let presetArray = [];
const setPresetIcons = function () {
    document.getElementById("presetIcons").innerHTML = "";
    Object.keys(noteColours).forEach((item, i) => {
        console.log('item',item)
        let testIcon = new WedgeIcon(`preset_${i}`, "preset_template", item);
        testIcon.element.dataset.name = item;
        testIcon.element.onclick = function () {
            document.getElementById("templateMenu").value = item;
            document.getElementById("templateMenu").oninput();
            //TODO: move this to templateMenu.oninput, need to set from preset name instead of id
                setColourIcons(this.id);

        };
        presetArray.push(testIcon);
        document.getElementById("presetIcons").appendChild(testIcon.element);
    });
};

/**
 * Basic synth for testing purposes..
 */

const synth = new Tone.PolySynth().toDestination();
const playNote = function (e) {
    Tone.start();
    console.log(cm.mtos(this.dataset.note));
    synth.triggerAttackRelease(
        Tone.Frequency(
            parseFloat(this.dataset.note) - 36,
            "midi"
        ).toFrequency(),
        0.3
    );
    e.preventDefault();
};

const playElement = function (element) {
    Tone.start();
    synth.triggerAttackRelease(
        Tone.Frequency(
            parseFloat(element.dataset.note) - 36,
            "midi"
        ).toFrequency(),
        0.3
    );
};

/**
 * Array of note names. We could modify this to label sharps and flats appropriately, depending on a user determined key signature.
 */
const noteNames = [
    "C",
    "C sharp",
    "D",
    "D sharp",
    "E",
    "F",
    "F sharp",
    "G",
    "G sharp",
    "A",
    "A sharp",
    "B"
];

const keyMap = {
    A: 0, // C
    W: 1, // C#
    S: 2, // D
    E: 3, // D#
    D: 4, // E
    F: 5, // F
    T: 6, // F#
    G: 7, // G
    Y: 8, // G#
    H: 9, // A
    U: 10, // A#
    J: 11, // B
    K: 12 // C'
};

/**
 * @class
 */

const Keyboard = function (id = "keyboard", numKeys = 12) {
    this.element = cm.create("div", {
        className: "keyboard",
        id: id
    });
    let divs = ["overlay", "underlay", "whiteKeys", "blackKeys"];
    divs.forEach((item) => {
        this[item] = cm.create("div", { id: item });
    });
    this.id = id;
    this.keys = this.populate(numKeys);
    this.keys.forEach((key) => this.underlay.appendChild(key));
    this.element.appendChild(this.underlay);
    this.element.appendChild(this.overlay);
    this.overlay.appendChild(this.whiteKeys);
    this.overlay.appendChild(this.blackKeys);
    this.elementSetup();
    let width = this.whiteKeys.children.length * measurements.white;
    this.element.style.width = `${width}px`;
    return this;
};

Keyboard.constructor = Keyboard;
Keyboard.prototype.populate = function (number = 12) {
    let outputArray = [];
    for (let i = 0; i < number; i++) {
        outputArray[i] = cm.create("div", {
            className: "pianoNote",
            id: `${noteNames[i % 12].replace(" ", "")}_${this.id}`
        });
    }
    return outputArray;
};

// Object.defineProperty(Keyboard.prototype,'name',{})

Keyboard.prototype.setColours = function (selection = colourSelection) {
    colourSelection = selection;
    let tempNoteReference = {};
    Array.from(this.underlay.children).forEach((note, i, array) => {
        tempNoteReference[note.id] = noteColours[selection].names[i % 12];
        note.style.backgroundColor = noteColours[selection].names[i % 12];
        setLabelText(note, i);
    });
    Array.from(this.element.querySelectorAll(".visual")).forEach(
        (note, i, array) => {
            note.style.backgroundColor = tempNoteReference[note.id];
        }
    );
};

Keyboard.prototype.elementSetup = function () {
    /**
     * Set the screen reader accessible layer first.
     * I'm making two separate layers so that we can control where the black notes sit while enabling a linear path through the keyboard.
     */
    this.element.querySelectorAll(".pianoNote").forEach((note, i, array) => {
        let offset = 0;
        let isBlack = isBlackKey(i);
        let previousWidth = i > 0 ? parseInt(array[i - 1].style.width) : 0;
        let previousOffset = i > 0 ? parseInt(array[i - 1].style.left) : 0;
        offset = previousOffset + previousWidth;
        offset -= isBlack ? 10 : 0;
        let isPrevBlackKey = false;
        if (i > 0) {
            isPrevBlackKey =
                array[i - 1].getAttribute("data-colour") == "black";
            offset -= isPrevBlackKey ? 10 : 0;
        }
        note.setAttribute("data-colour", isBlack ? "black" : "white");
        note.setAttribute("data-note", i + 60);
        note.setAttribute("data-index", i);
        note.setAttribute("data-noteName", noteNames[i % 12]);
        note.setAttribute("role", "button");
        setLabelText(note, i);
        Object.assign(note.style, {
            "border-style": "solid",
            "border-width": "1px",
            position: "absolute",
            left: `${offset}px`,
            width: `${isBlack ? 20 : 30}px`,
            height: `${isBlack ? 70 : 130}px`,
            "background-color": isBlack ? "black" : "white"
        });
        note.addEventListener("click", playNote);
    });

    /**
     * Set the pointer layer..
     * Separate divs so that black notes can sit on top.
     */
    this.element.querySelectorAll(".pianoNote").forEach((note, i) => {
        let cloneNote = note.cloneNode(true);
        cloneNote.setAttribute("class", "visual pianoNote");
        cloneNote.setAttribute("aria-hidden", true);
        cloneNote.style.borderWidth = "2px";
        cloneNote.addEventListener("mousedown", playNote);
        cloneNote.addEventListener("mousedown", setCurrentColour);
        cloneNote.style.backgroundColor =
            noteColours[colourSelection].names[i % 12];
        let targetId = note.id.includes("sharp") ? "blackKeys" : "whiteKeys";
        let target = this.element.querySelector("#" + targetId);
        target.appendChild(cloneNote);
    });
};

// TODO: add octave shift button

const playKey = function (e) {
    let thisCode = e.code.replace("Key", "");
    if (Object.keys(keyMap).includes(thisCode)) {
        playElement(document.querySelectorAll(".pianoNote")[keyMap[thisCode]]);
    }
};





const loader = function(){
    colourToggle = document.getElementById("colourToggle");
    test = new Keyboard("keyboard", 12);
    document.body.appendChild(test.element);
    document.getElementById("templateMenu").oninput = function () {
        test.setColours(this.value);
        console.log('new id',document.querySelector(`.colourIcon[data-name*="${this.value}"]`).id)
        setColourIcons(document.querySelector(`.colourIcon[data-name*="${this.value}"]`).id)
        
    };
    
    // document.getElementById('colourSetter').onclick = setCurrentColour;
    document.getElementById("colourToggle").oninput = function () {
        console.log(this.checked);
    };
    document.getElementById("colourWell").oninput = setNewColour;

    window.addEventListener("keydown", playKey);
    setPresetIcons();
}