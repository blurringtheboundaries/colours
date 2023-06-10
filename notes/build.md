``` 
"build": "npm link @matthewscharles/socket-mapper && npm link serial-mapper && webpack ./test_src/test.js -o ./test && babel keyboard/src -o keyboard/build/pitch_colour.js; node compile.js; jsdoc -c jsdoc.json",
```