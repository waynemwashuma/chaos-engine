export const ShapeType = Object.freeze({
  CIRCLE: 0,
  POLYGON: 1
})
export const ObjType = Object.freeze({
  CONSTRAINT: 0,
  BODY: 1,
  COMPOSITE: 2
})

export const BodyType = Object.freeze({
  DYNAMIC:2,
  KINEMATIC:1,
  STATIC:0
})

//Default settings 
export const Settings = {
  //For the world
  angularVelDampen: 0.001,
  linearVelDampen: 0.001,
  posDampen: 0.17,
  linearDamping: 0.01,
  angularDamping: 0.01,
  velocitySolverIterations: 10,
  fixedFrameRate: 0.016,
  
  //For all bodies
  mass: 1,
  restitution: 0.6,
  staticFriction: 0.4,
  kineticFriction: 0.2,
  boundPadding : 0,
  allowSleep: false,
  aabbDetectionOnly: false,
  collisionResponse: true,
  autoUpdateBound: true,
  type:BodyType.DYNAMIC
}