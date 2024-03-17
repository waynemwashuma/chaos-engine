
 ## v0.8.0

 - Added `TweenPlugin()` to manage tweens
 - Added new plugins related to physics including `Physics2DPlugin()` , `Broadphase2DPlugin()` ,`Narrowphase2DPlugin()` and `Intergrator2DPlugin()`
 - Added a new plugin `Renderer2DPlugin()` for rendering onto 2d context of canvas
 - Added method `Manager().registerPlugin()` to add plugins onto the `Manager()`
 - Fixed a bug on the collision manifold generation
 - Deactivated static friction due to instability
 - ` Geometry.getNormals()` is now a static method.
 - Changed `Shape.calcInertia()` to a static method
 - Removed `Composite()` and `HeightMap()`
 - Removed `ImpulseSolver` , `ContactSolver` and `FrictionSolllver` which are replaced by `CollisionManifold.sopve()`
 - Moved `SAT` and moved functionality to `SATNarrowPhase`
 - Changed `Shape.getNormals()` to be static
 - Changed `Shape.getVertices()` to a static method
 - Added a verlet intergrator
 - Implemented warmstarting
 - Added Coulomb friction to the bodies which applies kinetic and static friction
 - Added friction resolution to the new Collision solver
 - Created a new solver
 - `Query()` added to help cache and iterate entities and their components
 - Deprecated all instance methods of `Renderer2D` in favor of static methods
 - Deprecated all instance methods of `Vector2()` in favor of static methods
 - Changed first parameter of `Angle()` to accept radians, nor degrees
 - Added `LoadManager()` to monitor state of loaders
 - deprecated `Logger` in favor of decomposing its functions
 - Deprecated all instance methods of `Color()` in favor of static merhods
 - Deprecated all instance methods of `BoundingBox()` and `BoundingCircle()`
 - Deprecated all instance methods of `Matrix3x2()` in favor of static methods
 - Deprecated `Clock().update()` in favor of `Clock().update()`
 - Removed all methods named `.toJson()` and `fromJson()` and getters `CHAOS_CLASSNAME` and `CHAOS_OBJ_TYPE` from all classes
 - Deprecated `Camera()` in favor of `Camera2D()`
 - Deprecated `Renderer2D().clear()` in favor of `Renderer2D.clear()`
 - New static method `geometry.setAttributes()` to update vertex attributes
 - Changed `Renderer().setViewPort()` and `Renderer().bintTo()` to static methods
 - Redefined System
 - `Query()` added to help cache and iterate entities and their components
 - Fixed a bug within contact data creation
 - Added a new structure `ArchetypeType()`
 - Added `Noise()` to create pseudo-random numbers.
 - Added `CorcleBuffer.init()` method
 - Made `StaticImageMaterial` become  centered
 - Added new method `Interpolation.cosine()` for cosine interpolation
 - Added new merhod `Vector.rotateFast()` for optimisation purposes
 - Added a new option `autoPlay` on manager to detemine if manger should play on creation
 - Added `Transform.scale` property for scaling entities
 - removed `BufferGeometry.init()` as it is no longer used
 - Parameter `accumulate` of `Clock.update()` is now optional
 - Added a new property `Transform.lastPosition`
 - Added a new method `Ovwrlaps.colliding` to check if two `boundingCircle()` and/or `BoundingSquare()` are colliding
 - Added `Entity.id` to keep track of entities
 - Added options to the `bodyDebugger()` to extend functionality
 - Added a second parameter `manager` on `System.update()`
 - Fixed the method `Pool.give()`
 - Added new method `BoundingBox.translate()` to translate a `BoundingBox()` around
 - Fixed `Broadphase()` not included in main namespace
 - Deprecated `World()` in favour of using `World2D()`
 - Deprecated `Body` in favor of `Body2D()`
 - Removed `Err` as it is replaced by `Logger`
 - New module `Logger` to provide same functionality as `Err`
 - Added new method `IndexedList.has()`
 - Fixed `Cookie.get()`
 - Added a new loader `TextureLoader()` to load in images as textures
 - Added a new loader `SoundLoader()` to load sound
 - Removed `Loader()` class
 - `Manager.loader` is no longer available

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

