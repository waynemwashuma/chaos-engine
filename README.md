# Chaos-engine
 2d game engine with physics,a basic canvas renderer,AI,audio management through web audio,an event system and many more features.

## Changes made since v 0.0.0

 - Made the manager use entity-component-systems instead of the Inheritance model
 
 - Added AI system that follows the Craig - Renolds implementation 
 
 - Refactored the code to fit the new entity component system model
 
 - Added some features to physics including:

    -> Collision Masking.

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
 
 - Added Camera system to the renderer.
 - Added new methods to the renderer to prevent direct need for canvas context.
 
 - Included a loader to preload assets(not completed yet).
 - Included a storage API to store data in cookies,sessions or localstorage(may include indexedDB later on).
 - Added a way to support playing audio using Web Audio(may need to add an Audio tag fallback).
 
 - Added methods to search for entities with specific tags and/or components.
 
 - Improved input handling of touch devices.
 
 - Added documentation to the Vector class.
 
 - Renamed Mesh classes to Sprite.

# Usage
## Downloading and installing.
In order to get a copy of the engine ,enter the following command on your node project

```bash
npm i chaos-studio
```
Import it into your project like this:
```javascript
import * as CHAOS from "chaos-studio"
```
### OR:

Get the umd file from the dist folder of the [repository](https://github.com/waynemwashuma/chaos-engine),put it in your root directory and add it to your html page like so:

```html
<html>
  <title>Load Example</title>
  <script src="./chaos.umd.js"></script>
</html>
```
This way,the "CHAOS" module name will be available on the window object.

## Creating an example
### Setup game
Now we can create a small demo.
Add this to your html file in the body tag for this example to work
```html
<div id="can"></div>
```
In your JavaScript file,do this:
```javascript
//creates a new game manager for us to handle the game's entities.
let game = new CHAOS.Manager()

//we need to draw the entities on the screen.
//that is done through a renderer.
let renderer = new CHAOS.Renderer2D()

//this will keep track of physics.
let world = new CHAOS.World()

//this adds the world and renderer to the game so that they can be updated every frame.
game.registerSystem("renderer", renderer)
game.registerSystem("world", world)

//this binds the renderer to html.
renderer.bindTo("#can")

//This sets the width and height of the renderer to cover the entire screen.
renderer.setViewport(innerWidth, innerHeight)

//applies gravity to the world.
world.gravity = 900
```
# Add a box to the game

So far there is nothing on the screen... Lets fix that.
```javascript
//Creates an entity on which we can add(attach) component to.
let box = CHAOS.Entity.Default(innerWidth / 2, 100)

//Creates a physics component.
let boxBody = new CHAOS.Box(40, 40)

//Creates a component that can be rendered onto the screen.
let boxMesh = new CHAOS.BodySprite()

//Adds the physics body to the entity.
box.attach("body", boxBody)

//Adds the sprite to the entity.
box.attach("mesh", boxMesh)

//Adds the box to the game to be updated every frame.
game.add(box)
```
### Adding groundhttp

Now you should see a box falling into nothingness.
Lets add ground it can land on.
```javascript
//Creates an entity that we call ground on which we can add(attach) component to.
let ground = CHAOS.Entity.Default(innerWidth / 2, innerHeight - 100)

//Creates a component that can be rendered onto the screen.
let groundBody = new CHAOS.Box(400, 20)

//Adds the sprite to the entity.
let groundMesh = new CHAOS.BodySprite()

//sets the body to not move or respond to collisions.
groundBody.type = CHAOS.Body.STATIC

//Adds the physics body to the entity.
ground.attach("body", groundBody)

//Adds the sprite to the entity.
ground.attach("mesh", groundMesh)

//Adds the ground to the game to be updated every frame.
game.add(ground)
```


# **** WARNING ****

Upgrade from v0.0.0 to v0.1.0 as it is not yet stable

Some of these include breaking changes like 
the transfer from inheritance model to the 
entity component systems model
 
The legacy folder contains the last working
form of the inheritance model,check the differences between the last commit and it(many changes were realised between the two)

Major changes were made during the last two months.Check the differences between legacy and src

This is not yet a stable version hence dont rely on it to make production apps

 
 
# **** FUTURE WORK ****
 
 - Add a webgl renderer(dont have a direct plan for this yet)🟠
 - Stabilize the collision response to work well with large forces such as (gravity =  10000)
 - Stabilize rotational stacking in the physics engine
 - Add game state class for managing the game
 
 - Migrate some other parts of the code to the new model( Meshes for example )✅
 - Add an animation system.
 - Add tutorials to this game engine
 - Add documentation to every file in this project.✅
 - Add appropriate demos to the project and get a website running for them 🟠
 - Add some error handling mechanisms 🟠