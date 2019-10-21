import { ScrollingStrategy } from './Strategy/Interfaces';
import { ScrollMagicStrategy } from './Strategy/ScrollMagic';
import { ArteStrategy } from './Strategy/Arte';
import { Scene } from '..';

export enum ScrollStrategyName {
  Default = 'default',
  ScrollMagic = 'scrollmagic',
}

export class Scroller {

  private strategy: ScrollingStrategy;

  constructor(page: any, strategyName: ScrollStrategyName | string, props?: any) {
    
    console.log('Use scrolling strategy:', strategyName);

    if (strategyName === ScrollStrategyName.ScrollMagic) {
      this.strategy = new ScrollMagicStrategy(page, props);
    } else {
      this.strategy = new ArteStrategy(page, props);
    }
  }

  registerScene(section: Scene) {
    this.strategy.registerScene(section);
  }

  start() {
    this.strategy.start();
  }

  reset(): void {
    this.strategy.reset();
  }
}