# Chaos-engine
 2d game engine with physics,a basic canvas renderer,AI,audio management through web audio,an event system and many more features.

## Changes made since v 0.0.0

 - Made the manager use entity-component-systems instead of the Inheritance model
 
 - Added AI system that follows the Craig - Renolds implementation 
 
 - Refactored the code to fit the new entity component system model
 
 - Added some features to physics including:
    -> Collision Masking

    -> Narrowphase.
    
    -> Broadphase.
    
    -> distance constraints.
    
    -> Static and Dynamic bodies(may add kinematic later on).
    
    -> Composite bodies(not complete).
    
    -> Friction(was removed temporarily due to instability it causes).
    
    -> Sleeping introduced to improve performance.
    
    -> Querying regions through the broadphase(not done for AABBBroadphase).
    
    -> Iterative solving for velocity to improve non-rotational stacking.
    
 - Improved the collision detection.
 - Removed the Line body as it didn't work well with the physics system.
 - The event system with the physics system interact to provide you with collision events.
 - Refactored to remove event system from the physics part and made it standalone.
 
 - Added Camera system to the renderer
 - Added new methods to the renderer to prevent direct need for canvas context.
 
 - Included a loader to preload assets(not completed yet).
 - Included a storage API to store data in cookies,sessions or localstorage(may include indexedDB later on).
 - Added a way to support playing audio using Web Audio(may need to add an Audio tag fallback).
 
 - Added methods to search for entities with specific tags and/or components.
 
 - Improved input handling of touch devices.
 
 - Added documentation to the Vector class.
 
 - Renamed Mesh classes to Sprite.
### **** WARNING ****

Upgrade from v0.0.0 to v0.1.0 as it is not yet stable

 Some of these include breaking changes like 
 the transfer from inheritance model to the 
 entity component systems model
 
The legacy folder contains the last working
form of the inheritance model,check the differences between the last commit and it(many changes were realised between the two)

Major changes were made during the last two months.Check the differences between legacy and src

This is not yet a stable version hence dont rely on it to make production apps

 
 
### **** FUTURE WORK ****
 
 - Add a webgl renderer(dont have a direct plan for this yet)
 - Stabilize the collision response to work well with large forces such as (gravity =  10000)
 - Stabilize rotational stacking in the physics engine
 - Add game state class for managing the game
 
 - Migrate some other parts of the code to the new model( Meshes for example )
 - Add an animation system.
 - Add tutorials to this game engine
 - Add documentation to every file in this project.
 - Add appropriate demos to the project and get a website running for them
 - Add some error handling mechanisms 