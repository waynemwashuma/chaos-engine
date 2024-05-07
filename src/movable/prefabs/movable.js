import { Velocity2D, Rotation2D, Acceleration2D, Torque2D } from '../components/index.js';

export function createMovable2D(x = 0, y = 0, a = 0) {
  return [new Velocity2D(), new Rotation2D(), new Acceleration2D(), new Torque2D()]
}