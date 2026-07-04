import CustomEventEmitter from "../common/CustomEventEmitter.js";

export default class InputCollector extends CustomEventEmitter {
  constructor(input) {
    super();

    this.NEW_BATCH_TIMEOUT = 3000;

    this.timeoutId = null;
    this.newBatch = true;

    this.handleNoteOn = this.#handleNoteOn.bind(this);
    this.handleNoteOff = this.#handleNoteOff.bind(this);

    input.on("noteon", this.handleNoteOn);
    input.on("noteoff", this.handleNoteOff);
  }

  #handleNoteOn(msg) {
    if (this.newBatch) {
      this.emit("newbatch");
      this.newBatch = false;
    }
    const { note, velocity, ...rest } = msg;
    clearTimeout(this.timeoutId);
    this.emit("newnote", { note, velocity });

    this.timeoutId = setTimeout(() => {
      this.newBatch = true;
    }, this.NEW_BATCH_TIMEOUT);
  }

  #handleNoteOff(msg) {}
}
