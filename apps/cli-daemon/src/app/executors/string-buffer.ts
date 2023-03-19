import { TerminalRecord } from '@angular-cli-gui/shared/data';

import { stringToArray } from '../utils';

export class StringBuffer {
  private _data: TerminalRecord[] = [];
  private counter = 1;

  get data(): TerminalRecord[] {
    return this._data.slice(0);
  }

  constructor(private readonly bufferSize?: number) {}

  add(data: Buffer): void {
    const dataStrings = stringToArray(data.toString('utf8'));

    this._data = this._data.concat(
      dataStrings.map((s) => ({
        id: this.counter++,
        timestamp: Date.now(),
        content: s,
      }))
    );

    if (this.bufferSize && this._data.length > this.bufferSize) {
      this._data.splice(0, this._data.length - this.bufferSize);
    }
  }

  clear(): void {
    this._data = [];
  }
}
