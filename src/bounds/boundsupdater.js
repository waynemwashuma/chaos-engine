import { System } from '../ecs/index.js';

export class BoundsUpdater extends System {
  constructor() {
    super()
  }
  init(manager) {
    manager.setComponentList("bounds", [])
    
  }
  update(dt) {

  }
}