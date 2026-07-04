import easymidi from "easymidi";

import InputCollector from "./modules/InputCollector.js";

console.log("beep boop");

const inputs = easymidi.getInputs();

console.log(inputs);

const input = new easymidi.Input("Arturia KeyStep 37");

//

let actualNotes = [];

const inputCollector = new InputCollector(input);

inputCollector.on("newnote", (note) => {
  actualNotes.push(note);
  console.log(actualNotes);
});

inputCollector.on("newbatch", () => (actualNotes = []));
