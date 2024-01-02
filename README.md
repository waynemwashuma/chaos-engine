# Chaos-engine

[![DeepScan grade](https://deepscan.io/api/teams/22133/projects/25462/branches/809490/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=22133&pid=25462&bid=809490)
![npm](https://img.shields.io/npm/dt/chaos-studio)
![npm](https://img.shields.io/npm/v/chaos-studio)
![NPM](https://img.shields.io/npm/l/chaos-studio)
![GitHub Repo stars](https://img.shields.io/github/stars/waynemwashuma/chaos-engine)

 This is a 2d game engine with physics,a basic canvas renderer,AI,audio management through web audio,an event system and many more features.

## Features of this game engine.

 - An entity-component-system architecture where entities are made up of components and components are updated by their respective systems.Both object-oriented and data-driven systems are allowed.
 
 - An AI system that follows the Craig - Renolds implementation.It provides means to follow a target,evade another entity,follow a path and wandering about in the game world.
 
 - A semi-realistic physics engine that features the following:
 
    -> Collision Masking:Used to allow or disallow physical bodies from colliding with each other.

    -> Narrowphase:Provides collision manifold from a given pair of bodies if the bodies are colliding.
    
    -> Broadphase:Used to improve performance of the physics world by calculating pairs of bodies that could possibly be colliding.
    
    -> Distance constraints:Used to constrain two bodies at a certain distance.
    
    -> Static and Dynamic bodies types:Static bodies do not respond to collision with other bodies(due to infinite mass) while dynamic bodies respond to collision forces.
    
    -> Composite bodies:It is a composition of several bodies and constraints.
    
    -> Friction:Bodies colliding experience friction between their two surfaces.
    
    -> Sleeping:Bodies at rest do not need to be tested every frame hence are put to "sleep" to improve performance of the physics engine.
    
    -> Querying:The world can be queried to know if bodies are within a certain range(either a bounding-box or bounding-circle).
    
    -> Iterative solving for velocity to improve non-rotational stacking.
    
    -> Shapes:Various shapes are supported in the physics engine.
    
 - An event system to provide defined events such as the collision event and user defined events.
 - A loader to preload game assets.
 - A storage API to store data in cookies,sessions or localstorage.
 
 - An input abstraction that normalizes input from the keyboard,mouse and touch on mobile devices.
 
 - A math library with support for 2D vectors.

## Usage
### Downloading and installing.
In order to get a copy of the engine ,enter the following command on your node project.

```bash
npm i chaos-studio
```
Import it into your project like this:

```javascript
import * as CHAOS from "chaos-studio"
```
#### OR

Get the [umd file](https://github.com/waynemwashuma/chaos-engine/dist/chaos.umd.js)
from the dist folder of the [repository](https://github.com/waynemwashuma/chaos-engine),
put it in your root directory and add it to
your html page like so:

```html
<head>
  <title>Load Example</title>
  <script src="./chaos.umd.js"></script>
</head>
```
This way,the "CHAOS" module name will be available on the window object.

### OR
import the library from unpkg.com like this:

```html
<head>
  <script src="https://unpkg.com/chaos-studio@latest/dist/chaos.umd.js"></script>
</head>

```

### Creating an example
#### Setup game
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
//the canvas will be a child to the queried  html element(renderer will attach it to the html element with id of "can")
renderer.bindTo("#can")

//This sets the width and height of the renderer to cover the entire screen.
renderer.setViewport(innerWidth, innerHeight)

//applies gravity to the world.
world.gravity = 900
```
#### Add a box to the game

So far there is nothing on the screen... Lets fix that.
```javascript
//Creates an entity on which we can add(attach) component to.
let box = CHAOS.createEntity(innerWidth/2,innerHeight/2)

//Creates a physics component.
let boxBody = new CHAOS.Box(40, 40)

//Creates a component that can be rendered onto the screen.
let boxSprite = new CHAOS.BodySprite()

//Adds the physics body to the entity.
box.attach("body", boxBody)

//Adds the sprite to the entity.
box.attach("sprite", boxSprite)

//Adds the box to the game to be updated every frame.
game.add(box)
```
#### Adding ground

Now you should see a box falling into nothingness.
Lets add ground it can land on.
```javascript
//Creates an entity that we call ground on which we can add(attach) component to.
let ground = CHAOS.createEntity(innerWidth / 2, innerHeight - 100)

//Creates a physics component to iteract physically with other entities
let groundBody = new CHAOS.Box(400, 20)

//Adds the sprite to the entity.
let groundSprite = new CHAOS.BodySprite()

//sets the body to not move or respond to collisions.
groundBody.type = CHAOS.Body.STATIC

//Adds the physics body to the entity.
ground.attach("body", groundBody)

//Adds the sprite to the entity.
ground.attach("sprite", groundSprite)

//Adds the ground to the game to be updated every frame.
game.add(ground)
```


## **** WARNING ****

~~This is not yet a stable version hence dont rely on it to make production apps yet.~~
 
 
## **** FUTURE WORK ****
 
 - [ ] Add a webgl renderer(~~dont have a direct plan for this yet~~ Now i do :) ) 
 - [ ] Stabilize the collision response to work well with large forces such as (gravity =  10000)
 - [ ] Stabilize rotational stacking in the physics engine
 - [ ] ~~Add game state class for managing the game~~
 - [ ] Add an animation system.
 - [ ] Add tutorials to this game engine
 - [ ] Add appropriate demos to the project and get a website running for them
 - [ ] Add some error handling mechanisms 
 - [x] Add Serialization/Deserialization of objects(on the way)
 - [ ] Kinematic bodies.
 - [ ] Collision masking using bits(bit masking)
 - [ ] More AI behaviors.
 - [ ] Add indexedDB to Storage API.
 - [ ] An audio tag fallback to Web audio (if necessary )