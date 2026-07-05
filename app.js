import easymidi from "easymidi";

import InputCollector from "./modules/InputCollector.js";
import Clock from "./modules/Clock.js";

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

//

const clockInput = new easymidi.Input("IAC Driver clock");

const clock = new Clock(clockInput);


