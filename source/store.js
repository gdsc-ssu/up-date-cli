import { observable, action } from "mobx";
import { createContext } from "react";

export class Store {
    // input
    @observable
    input = "";
    @action
    updateInput = (input) => {
        this.input = input;
    };

    // selectedIndex
    @observable
    selectedIndex = 0;
    @action
    selectNext = () => {
      const index = this.selectedIndex + 1;
      if (index >= 0 && this.results.length > index) {
        this.selectedIndex = index;
      }
    };
    @action
    selectPrev = () => {
      const index = this.selectedIndex - 1;
      if (index >= 0 && this.results.length > index) {
        this.selectedIndex = index;
      }
    };
  }
  
  export const store = new Store();
  export const StoreContext = createContext(store);