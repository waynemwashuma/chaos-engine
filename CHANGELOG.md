
 ## v0.7.0

 - Refactored the `mixin()` function
 - Fixed the method `Body.applyForce()`
 - Added `Body.applyImpulse()` method
 - Added `LineGeometry()` , `BoxGeometry()` and `TriangleGeometru()`
 - Constants have been added
 - New class `Color()` for color management
 - Added `Body.addShape()` method to add shapes to a body
 - Added new material `TextMaterial()` for text rendering
 - Added new event `clear` onto manager
 - Fixed an error in `Angle()` constructor
 - Fixed issues with raycasting
 - Fixed unwanted stretching of `SpriteMaterial()`
 - Fixed `SpriteMaterial.setMaxFrames()` to set up max frames correctly
 - Fixed an error on `SpriteMaterial.setAction()`
 - Modified raycaster to have basic working
 - vscode config added

 ## v0.6.0

 - New methods `IndexedList.get()` and `IndexedList.set()`
 - New module for raycasting into world
 - Deprecated `Angle.radian` and `Angle.degree` in favor of `Angle.value` , Added `Angle.cos` and `Angle.sin`
 - Fixed undefined reference to `Err` module
 - Fixed `Manager.getComponentList()`
 - New`BufferGeometry.updateVertices()` to update vertices dynamically
 - Fixed error in `System()`
 - Fixed `bodyDebugger()`
 - Fixed working of `IndexedList()`
 - Added `IndexedList.get()` to fetch a stored value by its key
 - Refactored `manager.addComponent()` and `manager.removeComponent()`
 - Fixed movable of composited bodies not removed from manager componentList
 - Fixed bug on `Composite()` where it doesn't move when added to `World()`
 - Cleared up some unwanted code
 - Fixed `Intergrator.update()`
 - Added `World.enableIntergrate` to enable/disable intergration of a world
 - Fixed crashing errors in `Manager.addComponent()` and `Manager.removeComponent()`
 - Fixed `Manager.unregisterSystem()` to properly remove core systems
 - `Movable.torque` added to store torque
 - Added new class `Intergrator()` for inergrating movement into transforms
 - Moved out `Bound()` , `Movable()` and `Transform()` components to intergrator folder
 - `Err.deprecate()` parameters and functionality
 - Removed a duplicate export of `Rectangle()`
 - `Component.requires()` parameters
 - `bodyDebugger()` added to debug
 - Intergrators now clear torque every update
 - Fixed a prototype implementation error on `Body()` by inheriting from `Component()`
 - Fixed  `Perf()` and added it to manager
 - Added `fpsDebugger()` to display fps
 - New class `Tween()` for animating objects
 - Added `TweenManager()` for animations
 - Depreciated `Entity.Default()` in favour of

 ## 0.5.1


 ## v0.5.0

 - fixed `Manager.getEntityByTags()` and
 - Signal value doesnt change

 ## v0.4.13

 - `Component.implement()` to replace `Utils.inheritComponent()`
 - Removed `Utils.inheritSystem()`.Use `System.implement()` instead
 - New function `mixin()` for prototype injection
 - Renamed `Vec2()` to `Vector2()`
 - Added `Signal()` class
 - `Overlaps.AABBvsSphere` returned incorrect results
 - Fixed renderer to scale on multiple devices
 - Added a perf manager
 - Added World.imtergrator property.
 - depreciated to Err module.
 - Created a boilerplate function for generating a manager with default systems.
 - added a new function createEntity() to reduce boilerplate.

 ## v0.4.12

 - Added restitution demo
 - Fixed an error when getting position from `Composite()`
 - Fixed up `PathFollowing()` behaviour

 ## v0.4.1

 - Fixed a collision response of trigondue to rad/deg conversion error
 - Added a feature to `BodySprite()`
 - the stuff i broke forced a merge without thinking,i regret that for the past 4 hours
 - Added an new body `Trigon()` for singular triangle shape
 - Fixed up traingle shape
 - Fixed a minor error on keyboard
 - `NarrowPhase()` and `SATNarrowPhase()`for narrow phase of the physics engine module
 - Fixed `Verlet` intergrator
 - Updated `Verlet.solve()` and `Euler.solve()`intergrators to use torque
 - Added `Body.torque`
 - Fixed potentially undefined behaviour in static `Vector.lerp()`
 - Fixed issue where `Manager.getEntitiesByTags()` does not return the expected results
 - Fixed issue where an entity is removedfrom a `Manager()` using `Manager.remove()`,it cannot be added to another `Manager()`
 - Added `StaticImageMaterial.offset`
 - Removed `ImageMaterial()` as it is a dublicate of `StaticImageMaterial()`
 - Fixed a getter error on `Composite.type`
 - `ImageMaterial()` for rendering images
 - Added `Composite.type`

 ## v0.4.0

 - Added easing and interpolation functions
 - Serialization method for `Sprite()`
 - `Geometry.toJson()` throwing error
 - Serialization methods for `BoundingBox()` and `BoundingCircle()`
 - Serialization of `Movable()` component
 - Serialization method for `Vector()`
 - FIxed issue where serialization not working as intended in `Angle()`
 - Serialization method for `Transform()`,`Movable()` and `Bounds()` components
 - Serialization method set to instance instead of static
 - Serialization method for `Constriant()`
 - Serialization method for `Circle()`
 - Deserialization method for `Shape()` and `Geometry()`
 - Serialization method for `Shape()` and `Geometry()`
 - Implemented serialization method for `Body()`
 - Added serialization to `Component()` class
 - Added methods `init()`,`destroy()`,`update()`,`get()` and `requires()` to `Component()`
 - Implemented serialization of entities.
 - Added new function `wrapAngle()`
 - New methods of `Angle()` for serialization
 - conversion in `Angle()` constructor
 - Added `IndexedList()` datastructure
 - `Manager.query()` to search forentities using the physics system
 - Fixed `defaultCollisionHandler()` and`defaultPrecollisionHandler()` not working
 - Fixed `Camera()` and added a basic camera controller
 - Intergrated `Bounds()` into main namespace
 - Fixed error due to `Sprite.draw()` removed

 ## v0.3.0

