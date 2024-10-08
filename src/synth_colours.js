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
        description: "Color wheel with added accidentals, based on Newton's system.",
        author: "Charles Matthews"
    },
    daze: {
        names: [
            "Orange",
            "Pale Orange",
            "Magenta", // Mauve
            "Greenish Grey",
            "Sea green", // Aqua green E
            "Yellow", // yellow lemon, more red than blue
            "Rust", // Rust
            "Red",
            "Lilac", // Lilac
            "Purple",
            "Pale Green",
            "Deep pool blue" // Deep pool blue / deep end blue
        ],
        namesHTML: [
            "Orange",
            "NavajoWhite",
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
        hex: [
            '#ff9933',
            '#ffcc99',
            '#f85af8',
            '#c3fcc8',
            '#0cffff',
            '#ffff03',
            '#e0b5a2',
            '#ff0101',
            '#c37596',
            '#cc66ff',
            '#33cc33',
            '#0783dc'
        ],
        led: [
            '#FFA500',
            '#FFE4C4',
            '#FF00FF',
            '#18FB18',
            '#00FFFF',
            '#FFFF00',
            '#A03211',
            '#FF0000',
            '#DA70D6',
            '#800080',
            '#00CD00',
            '#00BFFF'
        ],
        description: "Colour Pitch Assembly by Joel Daze.  Please reference this project if used.",
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


export { noteColours, COLOURS };