
import { EventEmitter } from "node:events";

export default class CustomEventEmitter extends EventEmitter {

  emit(name, data) {
    console.log(`-- new event (${name}) - ${data ? JSON.stringify(data) : "no data"} --`);
    super.emit(name, data);
  }
}
