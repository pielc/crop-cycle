import CustomEventEmitter from "../common/CustomEventEmitter.js";

export default class Clock extends CustomEventEmitter {
  constructor(input) {
    super();

    this.count = 1;
    this.started = false;

    this.timeoutId = null;
    this.NO_CLOCK_AFTER_TIMEOUT = 200;

    this.COUNT_PER_CYCLE = 48;

    this.handleStart = this.#handleStart.bind(this);
    this.handleClock = this.#handleClock.bind(this);

    input.on("start", this.handleStart);
    input.on("clock", this.handleClock);
  }

  #handleStart(_) {
    this.started = true;
  }

  #handleClock(_) {
    if (!this.started) return;

    if (this.count++ >= this.COUNT_PER_CYCLE) this.count = 1;

    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.started = false;
      this.count = 1;
    }, this.NO_CLOCK_AFTER_TIMEOUT);

    this.emit(`top${this.count}`);
  }
}
