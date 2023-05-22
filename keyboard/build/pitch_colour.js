"use strict";

/**
 * GUI keyboard
 * @param {*} id 
 * @param {*} numKeys 
 * @returns {object} this
 */

var Keyboard = function Keyboard() {
    var _this = this;

    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "keyboard";
    var numKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 12;

    this.element = cm.create("div", {
        className: "keyboard",
        id: id
    });
    var divs = ["overlay", "underlay", "whiteKeys", "blackKeys"];
    divs.forEach(function (item) {
        _this[item] = cm.create("div", { id: item });
    });
    this.id = id;
    this.keys = this.populate(numKeys);
    this.keys.forEach(function (key) {
        return _this.underlay.appendChild(key);
    });
    this.element.appendChild(this.underlay);
    this.element.appendChild(this.overlay);
    this.overlay.appendChild(this.whiteKeys);
    this.overlay.appendChild(this.blackKeys);
    this.elementSetup();
    var width = this.whiteKeys.children.length * measurements.white;
    this.element.style.width = width + "px";
    return this;
};

Keyboard.constructor = Keyboard;

Keyboard.prototype.populate = function () {
    var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 12;

    var outputArray = [];
    for (var i = 0; i < number; i++) {
        outputArray[i] = cm.create("div", {
            className: "pianoNote",
            id: noteNames[i % 12].replace(" ", "") + "_" + this.id
        });
    }
    return outputArray;
};

// Object.defineProperty(Keyboard.prototype,'name',{})

Keyboard.prototype.setColours = function () {
    var selection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : colourSelection;

    colourSelection = selection;
    var tempNoteReference = {};
    Array.from(this.underlay.children).forEach(function (note, i, array) {
        tempNoteReference[note.id] = noteColours[selection].names[i % 12];
        note.style.backgroundColor = noteColours[selection].names[i % 12];
        setLabelText(note, i);
    });
    Array.from(this.element.querySelectorAll(".visual")).forEach(function (note, i, array) {
        note.style.backgroundColor = tempNoteReference[note.id];
    });
};

Keyboard.prototype.elementSetup = function () {
    var _this2 = this;

    /**
     * Set the screen reader accessible layer first.
     * I'm making two separate layers so that we can control where the black notes sit while enabling a linear path through the keyboard.
     */
    this.element.querySelectorAll(".pianoNote").forEach(function (note, i, array) {
        var offset = 0;
        var isBlack = isBlackKey(i);
        var previousWidth = i > 0 ? parseInt(array[i - 1].style.width) : 0;
        var previousOffset = i > 0 ? parseInt(array[i - 1].style.left) : 0;
        offset = previousOffset + previousWidth;
        offset -= isBlack ? 10 : 0;
        var isPrevBlackKey = false;
        if (i > 0) {
            isPrevBlackKey = array[i - 1].getAttribute("data-colour") == "black";
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
            left: offset + "px",
            width: (isBlack ? 20 : 30) + "px",
            height: (isBlack ? 70 : 130) + "px",
            "background-color": isBlack ? "black" : "white"
        });
        note.addEventListener("click", playNote);
    });

    /**
     * Set the pointer layer..
     * Separate divs so that black notes can sit on top.
     */
    this.element.querySelectorAll(".pianoNote").forEach(function (note, i) {
        var cloneNote = note.cloneNode(true);
        cloneNote.setAttribute("class", "visual pianoNote");
        cloneNote.setAttribute("aria-hidden", true);
        cloneNote.style.borderWidth = "2px";
        cloneNote.addEventListener("mousedown", playNote);
        cloneNote.addEventListener("mousedown", setCurrentColour);
        cloneNote.style.backgroundColor = noteColours[colourSelection].names[i % 12];
        var targetId = note.id.includes("sharp") ? "blackKeys" : "whiteKeys";
        var target = _this2.element.querySelector("#" + targetId);
        target.appendChild(cloneNote);
    });
};
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var test, colourToggle;

var getColourFromHex = function getColourFromHex(hex) {
    return Object.keys(COLOURS).find(function (key) {
        return COLOURS[key] === hex.toUpperCase();
    });
};

var getHexFromColour = function getHexFromColour(colourName) {
    return Object.entries(COLOURS).find(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            item = _ref2[1];

        return key.toLowerCase() === colourName.toLowerCase();
    })[1];
    // return COLOURS[colourName];
};

/**
 * HTML piano keyboard
 * Charles Matthews (Blurring the Boundaries Arts) 2022
 * Additional colour features in collaboration with Joel Daze
 */

var measurements = {
    white: 30,
    black: 20
};

var toggles = {
    noteName: true,
    noteColour: true
};

var setLabelText = function setLabelText(note, i) {
    var labelText = "";
    if (toggles.noteName) labelText += noteNames[i % 12].replace(" sharp", "-sharp") + "-" + (parseInt(i / 12) + 4) + ",";
    if (toggles.noteColour) labelText += noteColours[colourSelection].names[i % 12];
    note.setAttribute("aria-label", labelText);
};

var colourSelection = "newton_12";

/**
 * Check if a MIDI note number is a black key
 * @param {number} x MIDI note number
 * @returns {boolean}
 */

var isBlackKey = function isBlackKey(x) {
    return [1, 3, 6, 8, 10].includes(x % 12);
};

var noteColours = {
    newton_12: {
        names: ["Red", "OrangeRed", "Orange", "Gold", "Yellow", "YellowGreen", "Green", "LightSeaGreen", "Blue", "BlueViolet", "Indigo", "Purple"],
        description: "Color wheel with added accidentals, based on Newton's system.",
        author: "Charles Matthews"
    },
    daze: {
        names: ["Orange", "NavajoWhite", "Magenta", // Mauve
        "PaleGreen", "Aqua", // Aqua green E
        "Yellow", // yellow lemon, more red than blue
        "Tan", // Rust
        "Red", "Orchid", // Lilac
        "Purple", "LimeGreen", "DeepSkyBlue" // Deep pool blue / deep end blue
        ],
        description: "Colour Pitch Assembly by Joel Daze.  Please reference this project if used.",
        author: "Joel Daze"
    },
    purples: {
        names: ["Purple", "Indigo", "DarkViolet", "BlueViolet", "MediumSlateBlue", "SlateBlue", "MediumOrchid", "Violet", "Plum", "Orchid", "MediumPurple", "DarkOrchid"],
        description: "A set of purples",
        author: "Charles Matthews"
    }
};

var colourBuffer = "#000000";
var setNewColour = function setNewColour() {
    colourBuffer = this.value;
};

var setCurrentColour = function setCurrentColour() {
    console.log(this.getAttribute("class"));
    console.log("colourBuffer", colourBuffer);
    if (this.getAttribute("class") == "button") {
        noteColours[colourSelection].names.forEach(function (x, i, array) {
            return array[i] = colourBuffer;
        });
        test.setColours();
    } else if (this.getAttribute("class").includes("pianoNote")) {
        if (colourToggle.checked) {
            noteColours[colourSelection].names[this.dataset.index % 12] = colourBuffer;
            test.setColours();
            setPresetIcons();
        } else {
            console.log(this.style.backgroundColor);
            colourBuffer = getHexFromColour(this.style.backgroundColor);
            console.log("background and buffer:", this.style.backgroundColor, colourBuffer);
            document.getElementById("colourWell").value = colourBuffer;
        }
    }
};

var WedgeIcon = function WedgeIcon(id, templateName, presetName) {
    var numberOfDivisions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 12;

    this.element = document.getElementById(templateName).cloneNode(true);
    this.element.id = id;
    this.element.setAttribute('class', "colourIcon " + id);
    this.element.style.display = "inline-block";
    console.log(this.element.querySelector('.sectors'));
    for (var i = 0; i < numberOfDivisions; i++) {
        var clone = document.querySelector("#preset_template_" + numberOfDivisions + " .sectors path").cloneNode(true);
        this.element.querySelector('.sectors').appendChild(clone);
        clone.id = "test_sector_" + i;
        clone.setAttribute('transform', "rotate(" + i * (360 / numberOfDivisions) + ")");
    }

    this.colourIcon(presetName);
};

WedgeIcon.constructor = WedgeIcon;

/**
 * Set up colour icon according to colour selection
 * @param {string} selection colour selection index
 */

WedgeIcon.prototype.colourIcon = function (selection) {
    Array.from(this.element.querySelector(".sectors").children).forEach(function (wedge, i, array) {
        wedge.style.fill = noteColours[selection].names[i];
    });
};

var setColourIcons = function setColourIcons(selectedId) {
    presetArray.forEach(function (x) {
        x.element.querySelector('circle').setAttribute('stroke', x.element.id == selectedId ? 'white' : 'black');
        x.element.setAttribute('transform', x.element.id == selectedId ? 'rotate(360)' : 'rotate(0)');
    });
};

var presetArray = [];
var setPresetIcons = function setPresetIcons() {
    document.getElementById("presetIcons").innerHTML = "";
    Object.keys(noteColours).forEach(function (item, i) {
        console.log('item', item);
        var testIcon = new WedgeIcon("preset_" + i, "preset_template", item);
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

var synth = new Tone.PolySynth().toDestination();
var playNote = function playNote(e) {
    Tone.start();
    console.log(cm.mtos(this.dataset.note));
    synth.triggerAttackRelease(Tone.Frequency(parseFloat(this.dataset.note) - 36, "midi").toFrequency(), 0.3);
    e.preventDefault();
};

var playElement = function playElement(element) {
    Tone.start();
    synth.triggerAttackRelease(Tone.Frequency(parseFloat(element.dataset.note) - 36, "midi").toFrequency(), 0.3);
};

/**
 * Array of note names. We could modify this to label sharps and flats appropriately, depending on a user determined key signature.
 */
var noteNames = ["C", "C sharp", "D", "D sharp", "E", "F", "F sharp", "G", "G sharp", "A", "A sharp", "B"];

var keyMap = {
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

// TODO: add octave shift button

var playKey = function playKey(e) {
    var thisCode = e.code.replace("Key", "");
    if (Object.keys(keyMap).includes(thisCode)) {
        playElement(document.querySelectorAll(".pianoNote")[keyMap[thisCode]]);
    }
};

var loader = function loader() {
    colourToggle = document.getElementById("colourToggle");
    test = new Keyboard("keyboard", 12);
    document.body.appendChild(test.element);
    document.getElementById("templateMenu").oninput = function () {
        test.setColours(this.value);
        console.log('new id', document.querySelector(".colourIcon[data-name*=\"" + this.value + "\"]").id);
        setColourIcons(document.querySelector(".colourIcon[data-name*=\"" + this.value + "\"]").id);
    };

    // document.getElementById('colourSetter').onclick = setCurrentColour;
    document.getElementById("colourToggle").oninput = function () {
        console.log(this.checked);
    };
    document.getElementById("colourWell").oninput = setNewColour;

    window.addEventListener("keydown", playKey);
    setPresetIcons();
};
"use strict";

/**
 * Official CSS colours with hex codes
 */

var COLOURS = {
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
'use strict';

console.log('test');

var pentaWedge = function pentaWedge() {
    Array.from(document.querySelector('#preset_1 .sectors').children).forEach(function (wedge, i) {
        wedge.dataset.colour = wedge.style.fill;
        wedge.dataset.note = noteNames[i];
        var pentatonic = ['C', 'D', 'E', 'G', 'A'];
        wedge.style.opacity = pentatonic.includes(wedge.dataset.note) ? 1 : 0;
        var mode2 = ['D', 'D sharp', 'F', 'F sharp', 'G sharp', 'A', 'B', 'C'];
        wedge.style.opacity = mode2.includes(wedge.dataset.note) ? 1 : 0;
    });
};

var mode2Wedge = function mode2Wedge() {

    Array.from(document.querySelector('#preset_1 .sectors').children).forEach(function (wedge, i) {
        wedge.dataset.colour = wedge.style.fill;
        wedge.dataset.note = noteNames[i];

        var mode2 = ['D', 'D sharp', 'F', 'F sharp', 'G sharp', 'A', 'B', 'C'];
        wedge.style.opacity = mode2.includes(wedge.dataset.note) ? 1 : 0.5;
        wedge.style.fill = mode2.includes(wedge.dataset.note) ? wedge.dataset.colour : 'black';
    });
};

function orderFifths() {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach(function (x) {
        return console.log(Math.floor(x * 7) % 12);
    });
}

// modes: rotate
// [0,1,2,3,4,5,6,7,8,9,10,11].map(x=>Math.floor(x*7)%12)
'use strict';

/**
 * Clear the test pallette area and clone the current preset icon
 */

var createTestPalette = function createTestPalette() {
    var container = document.querySelector('#colour_palette');
    container.innerHTML = '';
    var clone = document.querySelector('#preset_' + 1).cloneNode('true');
    container.appendChild(clone);
    clone.id = 'test_palette';
    clone.querySelector('.over').style.display = 'none';
    clone.setAttribute('width', '400px');
};

var orderByFifths = function orderByFifths() {
    var fifths = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    var group = document.querySelector('#colour_palette svg .sectors');
    var cycleOfFifths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (x) {
        return Math.floor(x * 7) % 12;
    });
    Array.from(group.children).forEach(function (wedge, i) {
        console.log(wedge);
        wedge.setAttribute('transform', 'rotate(' + (fifths ? cycleOfFifths[i] * 30 : i * 30) + ')');
        wedge.addEventListener('click', function () {
            console.log(this.style.fill);
        });
    });

    // let templateWedge = document.querySelector('#test_sector_0');
    // console.log(templateWedge)
    // let container = document.querySelector('#preset_0 .sectors');
    // for(let i=0;i<11;i++){
    //     let newWedge = templateWedge.cloneNode(true);
    //     container.appendChild(newWedge)
    //     newWedge.setAttribute('data-color',noteColours.daze.names[i+1]);
    //     newWedge.style.fill = noteColours.daze.names[i+1];
    //     newWedge.setAttribute('fill',noteColours.daze.names[i+1]);
    //     newWedge.id=newWedge.id.replace('_0',`_${i+1}`)
    //     newWedge.setAttribute('transform-origin',`center center`)
    //     newWedge.setAttribute('transform',`rotate(${(cycleOfFifths[i]+1)*30})`)
    //         console.log(i, newWedge)

    // }
};
