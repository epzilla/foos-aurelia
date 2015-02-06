import {Config} from './config';

export class LocalStorage {
  static inject() { return [Config]; }
  constructor (config) {
    this.prefix = config.conf().localStoragePrefix || '';
    this.ls = window.localStorage;
  }

  get (key) {
    let prefixedKey = this.prefix.concat('-', key);
    return JSON.parse(this.ls.getItem(prefixedKey));
  }

  set (key, value) {
    let prefixedKey = this.prefix.concat('-', key);
    this.ls.setItem(prefixedKey, JSON.stringify(value));
    return this.get(prefixedKey);
  }
}