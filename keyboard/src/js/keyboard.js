/**
 * GUI keyboard
 * @param {*} id 
 * @param {*} numKeys 
 * @returns {object} this
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