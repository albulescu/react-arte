import { ScrollingStrategy } from "./Interfaces";
import { Scene } from "../..";

export interface ArteProperties {}

export class ArteStrategy implements ScrollingStrategy {

  constructor(_page: React.RefObject<HTMLElement>, _props: ArteProperties) {
    // TODO: Write code here
  }

  registerScene(_scene: Scene): void {
    // TODO: Write code here
  }

  start() {
    // TODO: Write code here
  }

  reset() {
    // TODO: Write code here
  }
}