import { Scene } from "../..";

export interface ScrollingStrategy {
  
  /**
   * Register new section for scrolling
   * @param element Scrolling section
   * @param props Properties
   */
  registerScene(section: Scene): void;

  start(): void;
  
  /**
   * Reset registered elements
   */
  reset(): void;
}