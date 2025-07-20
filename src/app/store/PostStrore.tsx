import { makeAutoObservable } from "mobx";

class RootStore {
  employeeName = "John Doe";

  constructor() {
    makeAutoObservable(this);
  }

  setEmployeeName(name) {
    this.employeeName = name;
  }
}

let store;

export function InitializeStore() {
  const _store = store ?? new RootStore();

  if (typeof window === "undefined") return _store;
  if (!store) store = _store;

  return _store;
}
