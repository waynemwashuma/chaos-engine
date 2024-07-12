# Chaos-engine

[![DeepScan grade](https://deepscan.io/api/teams/22133/projects/25462/branches/809490/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=22133&pid=25462&bid=809490)
![npm](https://img.shields.io/npm/dt/chaos-studio)
![npm](https://img.shields.io/npm/v/chaos-studio)
![NPM](https://img.shields.io/npm/l/chaos-studio)
![GitHub Repo stars](https://img.shields.io/github/stars/waynemwashuma/chaos-engine)

 This is a 2d game engine with physics,a basic canvas renderer,AI,audio management through web audio,an event system and many more features.

## Features of this game engine.

 - An entity-component-system architecture where entities are made up of components and components are updated by their respective systems.Data-driven systems only.
 - A semi-realistic physics engine that features the following:
 
    -> Collision Masking:Used to allow or disallow physical bodies from colliding with each other.

    -> Narrowphase:Provides collision manifold from a given pair of bodies if the bodies are colliding.
    
    -> Broadphase:Used to improve performance of the physics world by calculating pairs of bodies that could possibly be colliding.
    
    -> Static and Dynamic bodies types:Static bodies do not respond to collision with other bodies(due to infinite mass) while dynamic bodies respond to collision forces.
    
    -> Friction:Bodies colliding experience friction between their two surfaces.
    
    -> Sleeping:Bodies at rest do not need to be tested every frame hence are put to "sleep" to improve performance of the physics engine.
    
    -> ~~Distance constraints:Used to constrain two bodies at a certain distance.~~(disabled)
    
    -> Querying:The world can be queried to know if bodies are within a certain range(either a bounding-box or bounding-circle).
    
    -> Iterative solving for velocity to improve non-rotational stacking.
    
    -> Shapes:Various convex shapes are supported in the physics engine.
 - A set of loaders to load game assets.
 - A storage API to store data in cookies, sessions or local storage.
 - An input abstraction that normalizes input from the keyboard,mouse and touch on mobile devices.
 - A math library with support for 2D and 3D vectors, matrices and quaternion.

## Usage
TODO

## **** WARNING ****

This is not yet a stable version hence dont rely on it to make production apps yet.
As of now,there is major refactor of this engine.
This will make the engine move away completely from partly data driven/object-oriented ECS to fully data-driven ECS.
All Previous `System()`s will be converted into `Plugin()`s in order to fit will with the new architecture.
Components such as `Body2D()` will no longer inherit from `Component()` but will be stand alone instead.

# **** FUTURE WORK ****
 
 - [ ] Add a webgl renderer
 - [ ] Stabilize rotational stacking in the physics engine
 - [ ] Add a state management system into the engine.
 - [ ] Add a hierarchy plugin for the entities
 - [ ] Add an animation system.
 - [ ] Add tutorials to this game engine
 - [ ] Add appropriate demos to the project and get a website running for them
 - [ ] Add some error handling mechanisms 
 - [ ] Kinematic bodies
 - [ ] More AI behaviours
