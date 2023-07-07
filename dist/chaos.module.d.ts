export type Bounds = {
    max: Vector_like;
    min: Vector_like;
};
export type CollisionPair = {
    a: Body;
    b: Body;
};
export type Manifold = {
    bodyA: Body;
    bodyB: Body;
    contactData: ContactManifold;
    stmp: number;
    impulse: number;
    persistent: boolean;
    ca1: Vector;
    ca2: Vector;
    restitution: number;
    staticFriction: number;
    kineticFriction: number;
    velA: Vector;
    velB: Vector;
    rotA: number;
    rotB: number;
};
export type ContactManifold = {
    lastOverlap: number;
    /**
     * =-Infinity
     */
    overlap: number;
    /**
     * =false
     */
    done: boolean;
    axis: Vector;
    verticesA: Vector[];
    verticesB: Vector[];
    vertShapeA: Shape;
    vertShapeB: Shape;
    contactNo: number;
    indexA: number;
    indexB: number;
};
export type Vector_like = {
    x: number;
    y: number;
};
/**
 * This is a component class used to add AI behavior to an entity.
 *
 * @implements Component
 */
export class Agent implements Component {
    /**
     * The position of the entity.
     *
     * @type Vector
     */
    position: Vector;
    /**
     * The velocity of the entity.
     *
     * @type Vector
     */
    velocity: Vector;
    /**
     * The acceleration of the entity.
     *
     * @type Vector
     */
    acceleration: Vector;
    /**
     * The orientation of the entity.
     *
     * @type Angle
     */
    orientation: Angle;
    /**
     * The rotation of the entity.
     *
     * @type Angle
     */
    rotation: Angle;
    /**
     * The maximum speed of the agent in pixels per second.
     *
     * @type number
     */
    maxSpeed: number;
    /**
     * Maximum rotation of the agent in radians per second
     * Not yet implemented.
     */
    maxTurnRate: number;
    /**
     *
     * @private
     * @type BehaviourManager
     */
    private behaviours;
    /**
     * @inheritdoc
     * @param {Entity} entity
     */
    init(entity: Entity): void;
    entity: Entity;
    /**
     * Adds a behavior to the agent.
     *
     * @param {Behaviour} behaviour
     */
    add(behaviour: Behaviour): void;
    /**
     * Removes a behavior to the agent.
     *
     * @param {Behaviour} behaviour
     */
    remove(behaviour: Behaviour): void;
    /**
     * @inheritdoc
     * @param {number} inv_dt Inverse of delta time i.e frameRate.
     */
    update(inv_dt: number): void;
    Entity: any;
    /**
     * @param {Renderer} renderer
     */
    draw(renderer: Renderer): void;
}
/**
 * A system that manages agent components by updating them.
 */
export class AgentManager {
    /**
     * A list of agents to update every frame.
     *
     * @type Agent[]
    */
    objects: Agent[];
    /**
     * Initializes the manager.
     *
     * @param {Manager} manager
    */
    init(manager: Manager): void;
    /**
     * Update all registered agents.
     *
     * @param {number} dt
    */
    update(dt: number): void;
}
export class AgentSprite extends Sprite {
    /**
     *
     * @private
     * @type Agent
     */
    private agent;
    /**
     * @param {Entity} entity
     */
    init(entity: Entity): void;
    /**
     * @param {Renderer} renderer
     */
    draw(renderer: Renderer): void;
    /**
     * @param {Renderer} renderer
     */
    render(renderer: Renderer): void;
}
/**
 * Wrapper class since JavaScript doesn't support references to numbers explicitly.
 * Keeps record of the orientation of an entity.
 */
export class Angle {
    static fromJSON(obj: any): Angle;
    /**
     * @param {number} [deg=0] Orientation in degrees.
     */
    constructor(deg?: number);
    /**
     * Orientation in degrees.
     *
     * @private
     * @type number
     */
    private _deg;
    /**
     * Orientation in radians.
     *
     * @private
     * @type number
     */
    private _rad;
    get CHOAS_CLASSNAME(): any;
    get CHAOS_OBJ_TYPE(): string;
    /**
     * The orientation in degrees.
     */
    set degree(arg: number);
    get degree(): number;
    /**
     * The orientation in radians.
     */
    set radian(arg: number);
    get radian(): number;
    /**
     * Copies the orientation of another angle.
     *
     * @param {Angle} angle
     */
    copy(angle: Angle): void;
}
/**
 * This provides a seek behaviour which slows down when the agent approaches a target.
 *
 * @augments Behaviour
 */
export class ArriveBehaviour extends Behaviour {
    /**
     * @param {Vector} target
     */
    constructor(target: Vector);
    /**
     * Radius in which to expect the agent to start slowing down.
     *
     * @type number
     */
    radius: number;
    target: Vector;
}
/**
 * Manages playing of audio using Web Audio.
 */
export class AudioHandler {
    /**
     * Audio context to use.
     *
     *  @private
     * @type AudioContext
     */
    private ctx;
    /**
     * List of audio buffers to use.
     *
     *  @private
     * @type Object<string,AudioBuffer>
     */
    private sfx;
    /**
     * The name of the background music playing.
     *
     *  @private
     * @type string
     */
    private _backname;
    /**
     * The audiobuffer of the background music.
     *
     *  @private
     * @type AudioBuffer
     */
    private _background;
    /**
     * List of playing sounds
     *
     * @deprecated
     */
    playing: any[];
    /**
     * What to play after loading the audiobuffers.
     *
     * @ignore
     */
    toplay: {};
    /**
     * @ignore
     */
    baseUrl: string;
    /**
     * Volume to resume playing when unmuted.
     *
     * @private
     * @type number
     */
    private _mute;
    /**
     * Master volume for all sounds.
     *
     * @private
     * @type AudioNode
    */
    private masterGainNode;
    canPlay: boolean;
    /**
     * Load a sound into a sound manager
     *
     * @param {string} src
     */
    load(src: string): void;
    /**
     * Loads all audio from the loader.
     *
     * @param {Loader} loader
     */
    loadFromLoader(loader: Loader): void;
    /**
     * Plays a single audio as the background in a loop throughout the game
     *
     * @param {string} name
     */
    playBackgroundMusic(name: string): void;
    /**
     * Plays a sound only once.
     *
     * @param {string} name Name of audio to play.
     * @param {number} [offset] Where to start playing the audio.It is in seconds.
     * @param {number} [duration] how long in seconds will the audio defaults to total duration of the selected audio.
     */
    playEffect(name: string, offset?: number, duration?: number): void;
    /**
     * Creates and returns an SFX.
     *
     * @param {string} name
     * @rerurns Sfx
    */
    createSfx(name: string): Sfx;
    /**
     * Pauses currently playing sounds.
     */
    pauseAll(): void;
    /**
     * Sets the volume to zero.Sounds will continue playing but not be audible.
     */
    mute(): void;
    /**
     * Restores the volume before it was muted.
     */
    unmute(): void;
    /**
     * Removes an sfx from the handler and disconnects it from its destination.
     *
     * @param {Sfx} sfx
     */
    remove(sfx: Sfx): void;
}
/**
 * A body with a circle shape on it.
 *
 * @augments Body
 */
export class Ball extends Body {
    /**
     * @param {number} radius
    */
    constructor(radius: number);
}
export class BasicMaterial {
    fill: string;
    lineWidth: number;
    stroke: string;
    wireframe: boolean;
    render(ctx: any): void;
}
/**
 * Base class for implementing customized behaviours.
 *
 * @abstract
 */
export class Behaviour {
    /**
     * The position of the agent.
     *
     * @type Vector
     */
    position: Vector;
    /**
     * The velocity of the agent.
     *
     * @type Vector
     */
    velocity: Vector;
    /**
     * The maximum speed a behaviour will reach when active.
     *
     * @type number
     */
    maxSpeed: number;
    /**
     * Maximum force a behaviour will exert on the agent.This affects acceleration, deceleration and turn rate of the agent.
     *
     * @type number
     */
    maxForce: number;
    /**
     * Whether to exert a behaviour's calculated force onto its agent
     */
    active: boolean;
    /**
     * Sets up a behavior to work on an agent.
     *
     * @param {Agent} agent
     */
    init(agent: Agent): void;
    /**
     * Calculates the amount of force required to satisfy a behavior.
     *
     * @param {Vector} target
     * @param {number} inv_dt
     * @returns Vector the first parameter
     */
    calc(target: Vector, inv_dt: number): void;
    /**
     * Used to debug a behavior visually.
     *
     * @param {Renderer} renderer
     */
    draw(renderer: Renderer): void;
}
/**
 * Holds information needed for collision detection and response.
 *
 * @implements Component
 */
export class Body implements Component {
    /**
     *Body type that dictates a body cannot move nor respond to collisions.
     *
     * @static
     * @type number*/
    static STATIC: number;
    /**
     * Body type that dictates a body can move but not respond to collisions.
     *
     * @static
     * @type number
     */
    static KINEMATIC: number;
    /**
     * Body type that dictates a body can move and respond to collisions.
     *
     * @static
     * @type number
    */
    static DYNAMIC: number;
    /**
     * @param {Shape[]} shapes
     */
    constructor(...shapes: Shape[]);
    /**
     * Unique identification of a body.
     *
     * @type number
     */
    id: number;
    /**
     * World space coordinates of a body
     *
     * @private
     * @type Vector
     */
    private _position;
    /**
     * velocity of a body.Speed in pixels per second.
     *
     * @private
     * @type Vector
     */
    private _velocity;
    /**
     * acceleration of a body in pixels per second squared.
     *
     * @private
     * @type Vector
     */
    private _acceleration;
    /**
     * World space orientation of a body
     *
     * @private
     * @type Angle
     */
    private _orientation;
    /**
     * Rotation of a body
     *
     * @private
     * @type Angle
     */
    private _rotation;
    /**
     * Mass of the body.
     *
     * @private
     * @type number
     * @default 1
     */
    private _mass;
    /**
     * Rotational inertia of the body.
     *
     * @private
     * @type number
     */
    private _inertia;
    /**
     * Type of the body e.g Dynamic, Kinematic or Static.
     *
     * @private
     * @type number
     */
    private _type;
    /**
     * Anchors of the body in local space.
     *
     * @private
     * @type Vector[]
     */
    private _localanchors;
    /**
     * The original anchors of the body in local space.
     *
     * @private
     * @type Vector[]
     */
    private anchors;
    /**
     * Position of a body in the last frame..
     *
     * @type Vector
     */
    lastPosition: Vector;
    /**
     * Inverse mass of the body.
     *
     * @type number
     */
    inv_mass: number;
    /**
     * Inverse inertia of the body.
     *
     * @type number
     */
    inv_inertia: number;
    /**
     * The bounciness of the body between 0 and 1.
     *
     * @type number
     * @default Settings.restitution
     */
    restitution: number;
    /**
     * The friction of the body between 0 and 1 that affects it before it moves.
     *
     * @type number
     * @default Settings.staticFriction
     */
    staticFriction: number;
    /**
     * The friction of the body between 0 and 1that affects it after it moves.
     *
     * @type number
     * @default Settings.kineticFriction
     */
    kineticFriction: number;
    /**
     * The padding of the body's bounds.
     *
     * @type number
     * @default Settings.boundPadding
     */
    boundPadding: number;
    /**
     * The index of the body in its manager.
     *
     * @package
     * @type number
     * @default -1
     */
    index: number;
    /**
     * Used to describe how bodies will collide with each other.
     * Bodies in the same layer or layer 0 will always collide with each other unless they are in different groups.
     * Bodies in the same group will not collied with each other.
     *
     * @type {{layer:number, group: number}}
     * @default -1
     */
    mask: {
        layer: number;
        group: number;
    };
    /**
     * Object containing the body
     *
     * @type Entity | null
     */
    entity: Entity | null;
    /**
     * World space bounds of a body.
     *
     * @type BoundingBox | BoundingCircle | null
     */
    bounds: BoundingBox | BoundingCircle | null;
    /**
     * Shapes a body is comprised of.
     *
     * @type Shape[]
     */
    shapes: Shape[];
    /**
     * Client of the body inside a broadphase.
     *
     * @package
     * @type Object | null
     */
    client: any | null;
    /**
     * Whether the body should sleep when at rest or not.
     *
     * @type boolean
     * @default Settings.allowSleep
     */
    allowSleep: boolean;
    /**
     * If the body is asleep or not.
     *
     * @type boolean
     */
    sleeping: boolean;
    /**
     * Whether the body should detect collisions with bounds only.If true,no collision response will occur.Precollision event only will be fired.
     *
     * @type boolean
     * @default Settings.aabbDetectionOnly
     */
    aabbDetectionOnly: boolean;
    /**
     * Whether the body should respond to collisions.If false,no collision response will occur but collision events will still be fired.
     *
     * @type boolean
     * @default Settings.collisionResponsefired
     */
    collisionResponse: boolean;
    /**
     * Whether or not the bounds should be automatically updated.
     *
     * @type boolean
     * @default Settings.autoUpdateBound
     */
    autoUpdateBound: boolean;
    /**
     * Type of a body.It includes the static and dynamic for now.
     * Static bodies do not move and do not react to collisions.
     * Dynamic bodies move and respond to collisions.
     * Kinematic bodies move but do not respond to collisions.
     *
     * @example
     * let body = new Body()
     * body.type = Body.STATIC
     *
     */
    set type(arg: number);
    get type(): number;
    /**
     * Mass of a body.
     *
     * @type number
     */
    set mass(arg: number);
    get mass(): number;
    /**
     * Rotational inertia of a body.
     *
     * @type number
     */
    set inertia(arg: number);
    get inertia(): number;
    /**
     * Used to determine what it is in a world.
     *
     * @package
     * @type number
     */
    get physicsType(): number;
    get CHOAS_CLASSNAME(): any;
    get CHAOS_OBJ_TYPE(): string;
    set acceleration(arg: Vector);
    /**
     * Acceleration of a body
     *
     * @type Vector
     */
    get acceleration(): Vector;
    set velocity(arg: Vector);
    /**
     * Velocity of a body
     *
     * @type Vector
     */
    get velocity(): Vector;
    set rotation(arg: Angle);
    /**
     * Rotation of a body
     *
     * @type Angle
     */
    get rotation(): Angle;
    /**
     * Orientation of a body in degrees.
     *
     * @type number
     */
    set angle(arg: number);
    get angle(): number;
    /**
     * Density of a body.
     *
     * @type number
     */
    set density(arg: number);
    get density(): number;
    set position(arg: Vector);
    /**
     * World space position of a body
     *
     * @type Vector
     */
    get position(): Vector;
    /**
     * Orientation of a body
     *
     * @type Angle
     */
    set orientation(arg: Angle);
    get orientation(): Angle;
    set angularVelocity(arg: number);
    /**
     * Angular velocity of a body in degrees
     *
     * @type number
     */
    get angularVelocity(): number;
    /**
     * Sets an anchor that is relative to the center of the body into it.The anchor's world coordinates will be updated when the body too is updated.
     *
     * @param {Vector} v The anchor arm
     * @returns {number}
     */
    setAnchor(v: Vector): number;
    /**
     * Gets an anchor in its local space coordinate form.
     * Treat the returned value as read-only.
     *
     * @param {number} index the position of the
     * @returns {Vector}
     */
    getAnchor(index: number): Vector;
    /**
     * Returns a rotated anchor relative to the body.
     *
     * @param {number} index The position of the anchor.
     * @param {Vector} [target=Vector] Vector to store results in.
     * @returns {Vector}
     */
    getLocalAnchor(index: number, target?: Vector): Vector;
    /**
     * Applies a force to a body affecting its direction of travel and rotation.
     *
     *
     * @param {Vector} force The force to be applied.
     * @param {Vector} [arm=Vector] The collision arm.
     */
    applyForce(force: Vector, arm?: Vector): void;
    /**
     * Initializes the body to its given.Called by the world or an entity manager.
     *
     * @param {Entity | null} entity
     * @param {boolean} [composited=false]
     */
    init(entity: Entity | null, composited?: boolean): void;
    /**
     * This updates the world coordinates of shapes, anchors and bounds.
     */
    update(): void;
}
export class BodySprite extends Sprite {
    /**
     * @param {{}} [options={}]
     * @param {boolean} [options.drawVelocity=false] Determine whether to draw a representation of the velocity.
     * @param {boolean} [options.drawBounds=false] Determine whether to draw the bounding box.
     */
    constructor(options?: {});
    /**
     * @private
     * @type Body
     */
    private body;
    /**
     * Determine whether to draw a representation of the velocity.
     *
     * @type {boolean}
     */
    drawVelocity: boolean;
    /**
     * Determine whether to draw the bounding box.
     *
     * @type {boolean}
     */
    drawBounds: boolean;
    /**
     * @private
     * @param {Body} body
     * @param {Renderer} renderer
     */
    private _drawVelocity;
    /**
     * @private
     * @param {Body} body
     * @param {Renderer} renderer
     */
    private _drawBound;
    /**
     * @private
     * @param {Body} body
     * @param {Renderer} renderer
     */
    private _drawShapes;
    /**
     * @package
     * @param {Entity} parent
     */
    init(parent: Entity): void;
}
/**
 * Destroys the component.
 *
 * @function
 * @name Component#destroy
*/
/**
 * Initializes a component.
 *
 * @function
 * @name Component#init
 * @param {Entity} entity
 */
/**
 * Updates a component.Called by the system which manages its type.
 *
 * @function
 * @name Component#update
 * @param {number} dt
 */
/**
 * Gets a component in the entity containing this entity.
 *
 * @function
 * @name Component#requires
 * @param {string} ...names
 * @throws Qhen a named component isnt in the parent entity
 */
/**
 * A rectangular bound that is used to contain a body so that broadphase can be used for quick collision detection.
 */
export class BoundingBox extends Component {
    /**
     * Combines two bounds to create a new one that covers the previous two.
     *
     * @param {BoundingBox} bound1
     * @param {BoundingBox} bound2
     * @param {BoundingBox} target Bound to store results into.
     * @returns BoundingBox
     */
    static union(bound1: BoundingBox, bound2: BoundingBox, target: BoundingBox): BoundingBox;
    /**
     * @param {number} [minX=0]
     * @param {number} [minY=0]
     * @param {number} [maxX=0]
     * @param {number} [maxY=0]
     */
    constructor(minX?: number, minY?: number, maxX?: number, maxY?: number);
    /**
     *
     * @type Vector_like
     */
    pos: Vector_like;
    /**
     * The upper limit of the bounding box
     *
     * @type Vector_like
     */
    max: Vector_like;
    /**
     * The lower limit of the bounding box
     *
     * @type Vector_like
     */
    min: Vector_like;
    /**
     *
     * Checks to see if this intersects with another bounding box
     * @param { BoundingBox} bound the bound to check  intersection with
     *
     * @param { BoundingCircle | BoundingBox } bound the bound to check  intersection with
     **/
    intersects(bound: BoundingBox): boolean;
    /**
     * Calculates the bounds of the body
     *
     * @param {Body} body Body to calculate max and min from
     * @@param {Number} padding increases the size of the bounds
     */
    calculateBounds(body: Body, padding?: number): void;
    /**
     * Translates this bound to the given position.
     *
     * @param {Vector} pos
     */
    update(pos: Vector): void;
    /**
     * Deep copies a bounding box to a new one.
     *
     * @returns BoundingBox
    */
    clone(): BoundingBox;
    /**
     * Deep copies another bounding box.
     *
     * @param {BoundingBox} bounds
    */
    copy(bounds: BoundingBox): void;
}
/**
 * A circular bound that is used to contain a body so that broadphase can be used for quick collision detection.
 */
export class BoundingCircle {
    /**
     * @param {number} [r=0]
     */
    constructor(r?: number);
    /**
     *
     * @type number
    */
    r: number;
    /**
     *
     * @type Vector_like
    */
    pos: Vector_like;
    /**
     *
     * Checks to see if this intersects with another bounding box
     * @param { BoundingBox} bound the bound to check  intersection with
     *
     * @param { BoundingCircle | BoundingBox } bound the bound to check  intersection with
     **/
    intersects(bound: BoundingBox): boolean;
    /**
     * Calculates the bounds of the body
     *
     * @param {Body} body Body to calculate max and min from
     * @@param {Number} padding increases the size of the bounds
     */
    calculateBounds(body: Body, padding?: number): void;
    /**
     * Translates this bound to the given position.
     */
    update(pos: any): void;
}
/**
 * A body with a rectangle shape on it.
 *
 * @augments Body
*/
export class Box extends Body {
    /**
     * @param {number} w
     * @param {number} h
    */
    constructor(w: number, h: number);
}
export class BufferGeometry {
    constructor(vertices: any);
    vertices: any;
    render(renderer: any): void;
}
/**
 * A circular shape.
 *
 *
 * @augments Shape
 */
export class Circle extends Shape {
    /**
     * @inheritdoc
     * @param {number} mass
     * @param {number} radius
     */
    static calcInertia(mass: number, radius: number): number;
    /**
     * @param {number} radius
     * @param {Vector} offset Positional offset from the body center.
     *  @param {number} offsetAngle Angular offset from the body center.
     */
    constructor(radius: number, offset: Vector, offsetAngle: number);
    radius: number;
    type: number;
    get position(): Vector;
    /**
     *
     * @param {Shape} shape
     * @param {Vector[]} [target=[]] target
     * @returns Array<Vector>
     */
    getNormals(shape: Shape, target?: Vector[]): Vector[];
}
export class CircleGeometry {
    constructor(radius: any);
    radius: any;
    render(renderer: any): void;
}
/**
 * Handles time management for the game.
*/
export class Clock {
    /**
     * Last time the clock was updated
     *
     * @private
     * @type number
    */
    private lastcall;
    /**
     * Difference between the last call in the last frame and current call.
     *
     * @type number
    */
    dt: number;
    /**
     * Updates the clock
     *
     * @param {number} accumulate
    */
    update(accumulate: number): number;
    delta: number;
}
/**
 * A helper class.
 * Since there are no interfaces in JavaScript,
 * you might have to extend this to create a component, but there is another solution.
 * Use instead Utils.inheritComponent if you have your own hierarchy of classes.
 * In typescript,this would be an interface.
 *
 * @interface
 *
 */
export class Component {
    /**
     * @type Entity | null
    */
    entity: Entity | null;
}
/**
 * Holds a group of related bodies and constraints.
 */
export class Composite {
    /**
     * Entity this belongs to.
     *
     * @type Entity | null
     */
    entity: Entity | null;
    /**
     * List of bodies contained.
     *
     * @type Body[]
     */
    bodies: Body[];
    /**
     * List of bodies contained.
     *
     * @type Constraint[]
     */
    constraints: Constraint[];
    /**
     * Used to determine what it is in a world.
     *
     * @package
     * @type number
     */
    get physicsType(): number;
    /**
     * Initializes the body to its given.Called by the world or an entity manager.
     *
     * @param {Entity | null} entity
     * @param {boolean} composited
     */
    init(entity: Entity | null): void;
    /**
     * @param {Constraint | Body} object
     */
    add(object: Constraint | Body): number;
    /**
     * This updates the world coordinates of shapes, anchors and bounds.
     */
    update(): void;
    set acceleration(arg: Vector);
    /**
     * Acceleration of a body
     *
     * @type Vector
     */
    get acceleration(): Vector;
    set velocity(arg: Vector);
    /**
     * Velocity of a body
     *
     * @type Vector
     */
    get velocity(): Vector;
    /**
     * Orientation of a body in degrees.
     *
     * @type number
     */
    set angle(arg: void);
    get angle(): void;
    /**
     * Mass of a body.
     *
     * @type number
     */
    set mass(arg: number);
    get mass(): number;
    /**
     * Density of a body.
     *
     * @type number
     */
    set density(arg: number);
    get density(): number;
    set position(arg: Vector);
    /**
     * Position of a body
     *
     * @type Vector
     */
    get position(): Vector;
    /**
     * Orientation of a body
     *
     * @type Angle
     */
    set orientation(arg: any);
    set angularVelocity(arg: number);
    /**
     * Angular velocity of a body.
     *
     * @type number
     */
    get angularVelocity(): number;
}
/**
 * Base class for constructing different types of constraints.
 *
 * @abstract
 * @see DistanceConstraint
 * @see SpringConstraint
 */
export class Constraint {
    /**
     * @param {Body} body1
     * @param {Body} body2
     * @param {Vector} localA
     * @param {Vector} localB
     */
    constructor(body1: Body, body2: Body, localA: Vector, localB: Vector);
    body1: Body;
    body2: Body;
    localA: Vector;
    localB: Vector;
    stiffness: number;
    dampening: number;
    /**
     * Determine type of object this is in the world.
     *
     * @package
     * @type number
     */
    get physicsType(): number;
    get CHOAS_CLASSNAME(): any;
    get CHAOS_OBJ_TYPE(): string;
    /**
     * Will refactor this out later.
     *
     * @protected
     * @param {Body} body1
     * @param {Body} body2
     * @param {number} dt
     */
    protected behavior(body1: Body, body2: Body, dt: number): void;
    /**
     * Updates constraint forces
     *
     * @param {number} dt
     */
    update(dt: number): void;
}
export namespace Cookies {
    /**
     * Adds a cookie pair to cookies.
     *
     * @param {string} n Key of the cookie.
     * @param {string} v The value of the cookie.
     * @param {number} [=12000] Max age of the cookie before it is deleted.
    */
    export function set(n: string, v: string, maxAge?: number): void;
    /**
     * Returns the value of the given key.
     *
     * @param {string} n Key of the cookie
     * @returns {string}
    */
    export function get(n: string): string;
    /**
     * Removes a cookie by its key from cookies.
     *
     * @param {string} n Key of the cookie
    */
    function _delete(n: string): void;
    export { _delete as delete };
    /**
     * Removes all cookies that are contained on the document.
    */
    export function clear(): void;
}
export namespace DEVICE {
    let audio: boolean;
    let canvas: boolean;
    let webgl: boolean;
}
/**
 * This handles events created by the DOM.
 */
export class DOMEventHandler {
    /**
     * A dictionary of callback functions
     *
     * @private
     * @type Object<string,function[]>
     */
    private handlers;
    /**
     * A dictionary of the main callback functions
     *
     * @private
     * @type Object<string,function>
     */
    private _evHandlers;
    /**
     * Adds an eventlistener.
     *
     * @param {string} e Name of the DOMEvent.
     * @param {function} h The eventlistener.
     */
    add(e: string, h: Function): number;
    /**
     * Removes an eventlistener.
     *
     * @param {string} e Name of the DOMEvent.
     * @param {function} h The eventlistener.
     */
    remove(e: string, h: Function): void;
    /**
     * Removes all eventlisteners of an event.
     *
     * @param {string} e Name of the DOMEvent.
     * @param {function} h The eventlistener.
     */
    disposeEvent(e: string): void;
    /**
     * Clears all eventlisteners of every event registered.
     */
    clear(): void;
    init(): void;
}
export class DebugMesh extends Sprite {
    constructor(manager: any);
    manager: any;
    count: number;
    now: number;
    lastPerf: {};
    drawBounds: boolean;
}
/**
 * This constraint is stronger than a spring in the sense that it will not oscilate as such as a spring constraint.
 */
export class DistanceConstraint extends Constraint {
    fixed: boolean;
    dampen: number;
    maxDistance: number;
}
/**
 * This is a container to hold components,tags and event handlers.
 *
 * @class
 * @public
 */
export class Entity {
    /**
     * A helper function to create a new Entity with transform,movable and bounds components.
     *
     * @returns {Entity}
     */
    static Default(x: any, y: any, a: any): Entity;
    /**
     * Dictionary of component to manage.
     *
     * @private
     * @type Object<string,Component>
     */
    private _components;
    /**
     * Dictionary of handlers to call during an event.
     *
     * @private
     * @type Object<string,function>
     */
    private _handlers;
    /**
     * A list of tags to identify an entity.
     *
     * @private
     * @type Set<string>
     */
    private _tags;
    /**
     * The manager handling this entity.
     *
     * @private
     * @type Manager
     */
    private _global;
    /**
     * A flag to show if the entity is added to a manager.
     *
     * @type {boolean}
     */
    active: boolean;
    get CHAOS_OBJ_TYPE(): string;
    get CHAOS_CLASSNAME(): any;
    /**
     * Removes all components and handlers from an entity while removing it from its manager
     */
    destroy(): void;
    /**
     * Removes an entity and its components from its manager whilst retaining its components and handlers
     */
    removeSelf(): void;
    /**
     * Removes all components of an entity from its manager but keeps the entity inside the manager.
     * This is an internal function so no need on your part to use it.
     */
    removeComponents(): void;
    /**
     * Gets the current manager of an entity
     *
     * @returns {Manager}
     */
    get manager(): Manager;
    /**
     * Adds a component into an entity
     *
     * @param {String} n Name of the component.
     * @param {Component} c The component to add.
     *
     * @returns {this}
     */
    attach(n: string, c: Component): this;
    /**
     * Removes a component from an entity.
     *
     * @param {String} n Name pf the component
     * @rerurns {this}
     */
    remove(n: string): this;
    /**
     * Registers a function to handle a named event.
     *
     * @param {string} n Name of the event
     * @param {function} h The function to be called when an event is fired.
     */
    register(n: string, h: Function): void;
    /**
     * Removes an event handler function of the given name
     *
     * @param {string} n Name of the event
     */
    unregister(n: string): void;
    /**
     * Returns an event handler which can be fired during an event
     *
     * @param {string} n Name of the event
     * @returns {function | undefined}
     */
    getHandler(n: string): Function | undefined;
    /**
     * Returns the named component.
     *
     * @param {string} n Name of the component.
     * @returns {Component | undefined }
     */
    get(n: string): Component | undefined;
    /**
     * Used to check if the component exists in an entity
     *
     * @param {string} n Name of the component.
     * @returns {boolean}
     */
    has(n: string): boolean;
    /**
     * Adds a tag into an entity.
     *
     * @param {string} n The tag to be added
     */
    addTag(n: string): void;
    /**
     * Removes a tag from an entity.
     *
     * @param {string} n The tag to be added
     */
    removeTag(n: string): void;
    /**
     * Checks if a tag exists in an entity.
     *
     * @param {string} n The tag to be added
     * @returns {boolean}
     */
    hasTag(n: string): boolean;
    /**
     * Initializes the components within an entity and marks it as active.
     * It is called by an instance of a game manager so no need to call it manually
     *
     * @package
     * @param {Manager} global
     */
    init(global: Manager): void;
    /**
     * Search an entity's manager for entities in a given bound.
     *
     * @param {Bounds} bound the region to search entitities in.
     * @param {Entity[]} [target=[]] An array to store results in.
     * @returns {Entity[]}
     */
    query(bound: Bounds, target?: Entity[]): Entity[];
}
export namespace Err {
    /**
     * Logs out a warning to the console.
     *
     * @memberof Err
     * @param {string} message
     */
    export function warn(message: string): void;
    /**
     * Throws a fatal error.
     *
     * @memberof Err
     * @param {string} message
     */
    function _throw(message: string): never;
    export { _throw as throw };
    /**
     * Logs out a non fatal error to the console.
     *
     * @memberof Err
     * @param {string} message
     */
    export function error(message: string): void;
    /**
     * Logs out a message to the console.
     *
     * @memberof Err
     * @param {string} message
     */
    export function log(message: string): void;
    /**
     * Logs out a warning once to the console.
     *
     * @memberof Err
     * @param {string} message
     */
    export function warnOnce(message: string): void;
    /**
     * Logs out a message,warning or error to the console according to the supplied log function.
     *
     * @memberof Err
     * @param {boolean} test
     * @param {string} message
     * @param {Function} errfunc
     */
    export function assert(test: boolean, errfunc: Function, message: string): boolean;
}
/**
 * Creates a behaviour to evade a certain position.
 *
 * @augments Behaviour
*/
export class EvadeBehaviour extends Behaviour {
    /**
     * @param {Vector} pursuer
    */
    constructor(pursuer: Vector);
    /**
     * Distance in which to begin evading.
     *
     * @type number
    */
    radius: number;
    pursuer: Vector;
}
/**
 * This class manages all events by a game manager.
 * When adding a handler to an event with another handler,the latter will not be overriden,rather,the former will be added to complement the latter.
 */
export class EventDispatcher {
    /**
     * A dictionary of callback functions
     *
     * @private
     * @type Object<string,function[]>
     */
    private handlers;
    /**
     * This fires all event handlers of a certain event.
     *
     * @param {string} n the name of event fired.
     * @param {any} data The payload of the event.
     */
    trigger(n: string, data: any): void;
    /**
     * Ignore this,must be here for it to be a system.Might make this class not a system later
     */
    init(): void;
    /**
     * Adds an event handler to an event dispatcher.
     *
     * @param {string} name name of the event.
     * @param {function} handler Function to be called when the event is triggered.
     */
    add(name: string, handler: Function): void;
}
export type Events = string;
export namespace Events {
    let COLLISION: string;
    let PRECOLLISION: string;
    let PREUPDATE: string;
    let POSTUPDATE: string;
    let UPDATE: string;
    let INITIALIZE: string;
    let ADD: string;
    let REMOVE: string;
    let PAUSE: string;
    let PLAY: string;
}
/**
 * not complete.
 *
 * @augments Behaviour
*/
export class Flock {
    neighbours: any[];
    /**
     * @inheritdoc
     * @param {Agent} agent
     *
     */
    init(): void;
    /**
     * @inheritdoc
     * @param {Vector} target
     * @param {number} inv_dt
     * @returns Vector the first parameter
     */
    calc(target: Vector): void;
}
export class Geometry {
    constructor(vertices: any);
    vertices: any;
    normals: any[];
    _dynNormals: any[];
    get CHOAS_CLASSNAME(): any;
    get CHAOS_OBJ_TYPE(): string;
    getNormals(rad: any, target: any): any;
    calcFaceNormals(): any[];
    transform(vertices: any, pos: any, rad: any, n: any): void;
}
/**
 * This is a bounded broadphase that is used to speed up collision testing on dense number of objects over a small area.
 *
 * @extends Broadphase
 */
export class Grid extends Broadphase {
    constructor(bounds: any, divX: any, divY: any);
    bins: any[];
    bounds: any;
    divX: any;
    divY: any;
    _hash(x: any, y: any): number[];
    /**
     * @inheritdoc
     * @private
     * @param {Client} client
     */
    private _insert;
    /**
     * @inheritdoc
     * @private
     * @param {Client} client
     */
    private _remove;
    /**
     * @inheritdoc
     * @private
     * @param {Body} body
     */
    private _update;
    _naiveCheck(arr: any, ids: any, target: any): void;
}
export class HeightMap extends Body {
    constructor(step: any, heights: any);
}
/**
 * Renders an image-sprite frame by frame.
 * The frames of the image should have equal width and height in respect to each other.
 *
 * @augments Sprite
 */
export class ImageSprite extends Sprite {
    /**
     * @param {HTMLImageElement} img Image to draw
     * @param {number} frames Maximum number of cutouts in the sprite in the X axis of the image.
     * @param {number} actions Maximum number of cutouts in the sprite in the Y axis of the image.
     */
    constructor(img: HTMLImageElement, frames: number, actions: number);
    _index: number;
    _maxFrame: number;
    _frame: number;
    _accumulator: number;
    _dt: number;
    frameRate: number;
    _maxFrames: any;
    width: number;
    height: number;
    frameWidth: number;
    frameHeight: number;
    img: HTMLImageElement;
    /**
     * Sets max number of frames for a given action
     *
     * @param {number} action
     * @paran {number} max
     */
    setMaxFrames(action: number, max: any): void;
    /**
     * Sets a given action to be rendered
     *
     * @param {number} action
     * @paran {number} max
     */
    setAction(index: any): void;
}
/**
 * This handles all inputs from the mouse,touch and keyboards.
 *
 */
export class Input {
    /**
     * @param {DOMEventHandler} eventHandler
    */
    constructor(eventHandler: DOMEventHandler);
    /**
     * This attaches callbacks to the DOM.
     *
     * @type DOMEventHandler
    */
    DOMEventHandler: DOMEventHandler;
    /**
     *
     * @type Mouse
    */
    mouse: Mouse;
    /**
     *
     * @type Touch
    */
    touch: Touch;
    /**
     *
     * @type Keyboard
    */
    keyboard: Keyboard;
    /**
     * Updates all inputs.
    */
    update(): void;
    /**
     * Remove all bindings to the DOM for all input types.
    */
    dispose(): void;
}
/**
 * Handled the keyboard input of an application on a PC.
*/
export class Keyboard {
    /**
     * @param {DOMEventHandler} eh
    */
    constructor(eh: DOMEventHandler);
    /**
     * Dictionary of keys showing if they are active or not.
     *
     * @type Object<string,boolean>
    */
    keys: {
        [x: string]: boolean;
    };
    activeKeys: any[];
    /**
     * Ensures that keycodes are produced in a consistent manner
     *
     * @private
     * @param {string} keycode
     * @returns {string}
    */
    private normalize;
    /**
     * Adds Keyboard events to the DOM.
     *
     * @param {DOMEventHandler} eh
    */
    init(eh: DOMEventHandler): void;
    _onDown: (e: any) => void;
    _onUp: (e: any) => void;
    ondown(e: any): void;
    onup(e: any): void;
}
export class Layer {
    constructor(img: any);
    speed: number;
    img: any;
    draw(ctx: any, x: any, y: any): void;
    update(ctx: any, dt: any): void;
}
export class Line extends Shape {
    constructor(length: any, offset: any, offsetAngle: any);
    length: any;
}
export class Loader {
    constructor(manager: any);
    _toload: any[];
    imgs: {};
    sfx: {};
    json: {};
    _progressBytes: number;
    _totalBytes: number;
    _filesErr: number;
    _filesLoaded: number;
    _totalFileNo: number;
    onfinish: any;
    _handlers: {
        onload: (xhr: any, e: any) => void;
        onheadload: (e: any) => void;
        onerror: (e: any) => void;
    };
    _getName(url: any): any;
    _getType(url: any): "audio" | "image" | "json";
    loadAll(files?: {}): void;
}
/**
 *
 */
/**
 * This class is responsible for managing all
 * entities and ensuring that systems are updated every frame.
 *
 */
export class Manager {
    /**
     * Creates a system that allows you to use the `Component.update` method for the given componentList whose name is given.
     *
     * @param {string} name The name of componentList this system is taking care of.
     *
     * @returns {System}
     */
    static DefaultSystem(name: string): System;
    /**
     * Creates a new instance of Manager class
     *
     * @param {Object} [options]
     * @param {boolean} [options.autoPlay=true] Whether the manager should immediately start playing after initialization
     * @param {Object} [options.files={}] This is passed onto the Loader.Please check `Loader.load()` for more information on it.
     * @param {boolean} [options.physics=true] Adds physics world as a System.
     * @param {boolean} [options.renderer=true] Adds a renderer as a system.
     * @param {boolean} [options.input=true] Adds input as a system.
     *
     **/
    constructor(options?: {
        autoPlay?: boolean;
        files?: any;
        physics?: boolean;
        renderer?: boolean;
        input?: boolean;
    });
    /**
     * RAF number of current frame.Used for pausing the manager.
     *
     * @private
     * @type number
     */
    private _rafID;
    /**
     * @private
     * @type {Object<string, function>}
     */
    private _classes;
    /**
     *
     * @private
     * @type Object<string,Component[]>
     */
    private _componentLists;
    /**
     *
     * @private
     * @type System[]
     */
    private _systems;
    /**
     *
     * @private
     * @type {{
       world:World,
       renderer:Renderer,
       input:Input,
       audio:AudioHandler
     }}
     */
    private _coreSystems;
    /**
     *
     * @private
     * @type boolean
     */
    private _initialized;
    /**
     * Whether or not the manager is playing.
     *
     * @type boolean
     */
    playing: boolean;
    /**
     *
     * @private
     * @type Object<string, number>
     */
    private _systemsMap;
    /**
     *
     * @private
     * @type Object<string, string>
     */
    private _compMap;
    /**
     * Master clock for the game
     *
     * @type Clock
     */
    clock: Clock;
    /**
     *
     * @private
     * @type Entity[]
     */
    private objects;
    /**
     *
     * @private
     * @type number
     */
    private _accumulator;
    /**
     * Ideal framerate of the manager.Not implemented corrretly.
     * TODO correct it
     *
     * @type number
     */
    frameRate: number;
    /**
     *
     * @ignore.
     * This is an artifact of me debugging this.
     * TODO - Should implement a better soluton
    */
    perf: {
        lastTimestamp: number;
        total: number;
    };
    /**
     * look at Loader for more info.
     *
     * @readonly
     * @type Loader
    */
    readonly loader: Loader;
    /**
     * @readonly
     * @type EventDispatcher
    */
    readonly events: EventDispatcher;
    /**
     * @private
     */
    private _update;
    /**
     * This initializes the manager.
     * No need to call this function directly.
     * This is called after the preloader finishes loading all its files.
     *
     */
    init(): void;
    /**
     * Adds an entity to the manager and initializes it.
     *
     * @param {Entity} object The entity to add
     */
    add(object: Entity): void;
    /**
     * This adds a component to a componentList
     * if the componentList is there else exits
     * without an error.
     * There is no need for you to use this method
     * as it is for internal use only and may change in the future
     *
     * @param {string} n name of the component
     * @param {Component} c An object implementing Component
     */
    addComponent(n: string, c: Component): void;
    /**
     * This removes a component from a componentList
     * if the componentList is there else exits
     * without an error.
     * There is no need for you to use this method
     * as it is for internal use only and may change in the future
     * @param { string } n name of the component *
     * @param { Component } c An object implementing Component interface
     */
    removeComponent(n: string, c: Component): void;
    /**
     * Removes an entity from the manager.
     * Note that this doesn't destroy the entity, only removes it and its components from the manager.
     * To destroy the entity,use `Entity.destroy()` method.
     *
     * @param {Entity} object The entity to remove
     */
    remove(object: Entity): void;
    /**
     * This removes all of the entities and components from the manager
     */
    clear(): void;
    /**
     * This method requests an animation frame from the browser
     *
     * @private
     */
    private RAF;
    /**
     * This starts up the update loop of the manager
     */
    play(): void;
    /**
     * This stops the update loop of the manager
     */
    pause(): void;
    /**
     * This method might be useless as systems are initialized on being added
     *
     * @private
     */
    private initSystems;
    /**
     * Marches the update loop forward,updating
     * the systems
     * You shouldn't mess with this/call it or everything will explode with undetectable errors.
     *
     * @private
     */
    private update;
    /**
     * This registers a class into the manager so that ot can be used in cloning an entity.
     *
     * @param {function} obj The class or constructor function to register
     * @param {boolean} override Whether to override an existing class
     */
    registerClass(obj: Function, override?: boolean): void;
    /**
     * Used to register a system
     *
     * @param {string} n The name for the system
     * @param {System} sys The system to be addad
     *
     * @param {string} [cn=n] The componentList name that the system will primarily take care of
     */
    registerSystem(n: string, sys: System, cn?: string): void;
    /**
     * Gets the named system
     *
     * @param {string} n the name the system was registered with.
     *
     * @return {System}
     */
    getSystem(n: string): System;
    /**
     * Removes a system from the manager.
     *
     * @param {string} n The name of the system.
     *
     */
    unregisterSystem(n: string): any;
    /**
     * Used to create a componentList in the manager.componentsA component must have the same name as the componentList to be added into it.
     *
     * @param {string} n The name of the components to store into the created componentlist
     * @param {Component[]} [arr=[]] A reference to the array to store components in.
     */
    setComponentList(n: string, arr?: Component[]): void;
    /**
     * Used to create a componentList in the manager.A component must have the same name as the componentList to be added into it.
     *
     * @param {string} n The name of the components to store into the created componentlist
     * @returns {Component[]} An array of components
     */
    getComponentList(n: string): Component[];
    /**
     * Finds the first entity with all the components and returns it.
     *
     * @param {Array<String>} comps An array containing the component names to be searched
     * @param {Entity[]} [entities = Manager#objects] The array of entities to search in.Defaults to the manager's entity list
     *
     * @returns {Entity}
     */
    getEntityByComponents(comps: Array<string>, entities?: Entity[]): Entity;
    /**
     * Finds the first entity with all the tag and returns it.
     *
     * @param {Array<String>} comps An array containing the component names to be searched
     * @param {Entity[]} [entities = Manager#objects] The array of entities to search in.Defaults to the manager's entity list
     *
     * @returns {Entity[]}
     */
    getEntitiesByComponents(comps: Array<string>, entities?: Entity[], target?: any[]): Entity[];
    /**
     * Finds the first entity with all the tag and returns it.
     *
     * @param {Array<String>} tags An array containing the tags to be searched
     * @param {Entity[]} [entities = Manager#objects] The array of entities to search in.Defaults to the manager's entity list
     *
     * @returns {Entity}
     */
    getEntityByTags(tags: Array<string>, entities?: Entity[]): Entity;
    /**
     * Finds the entities with all the tag and returns them in an array.
     *
     * @param {string[]} tags An array containing the tags to be searched
     * @param {Entity[]} [entities = Manager#objects] The array of entities to search in. Defaults to the manager's entity list
     *
     * @returns {Entity[]}
     */
    getEntitiesByTags(tags: string[], entities?: Entity[], target?: any[]): Entity[];
    /**
     * Ignore this,im going to remove it and the rest of cloning utilities.
     * @private
     * @deprecated
     */
    private infertype;
    /**
     * Deep copies an entity
     *
     * @deprecated
     * @returns {Entity}
     */
    clone(obj: any): Entity;
}
export class Material {
    render(): void;
}
/**
 * A class that is used to transform positions through rotation, scaling and translation.
 */
export class Matrix2 {
    /**
     *  @param {number} [a=1]
     *  @param {number} [b=0]
     *  @param {number} [c=0]
     *  @param {number} [d=1]
     *  @param {number} [e=0]
     *  @param {number} [f=0]
    */
    constructor(a?: number, b?: number, c?: number, d?: number, e?: number, f?: number);
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} scaleX
     * @param {number} scaleY
     * @param {number} rotation
     *
     * @returns this
     */
    setFromTransform(x: number, y: number, scaleX: number, scaleY: number, rotation: number): this;
    /**
     * Multiplies with another matrix,
     *  A * B = C, where B is this matrix
     *
     * @param {Matrix2} m
     * @returns this
     */
    prepend(m: Matrix2): this;
    /**
     * Multiplies with another matrix,
     *  A * B = C, where A is this matrix
     *
     * @param {Matrix2} m
     * @returns {this}
     */
    append(m: Matrix2): this;
    /**
     * Makes a matrix to be an identity matrix.
     *
     * @returns this
     */
    identity(): this;
    /**
     * Rotates the matrix by the given angle.
     *
     * @param {number} radians
     * @returns this
     */
    rotate(radians: number): this;
    /**
     * Translates a matrix by a given amount.
     *
     * @param {number} x
     * @param {number} y
     * @returns this
     */
    translate(x: number, y: number): this;
    /**
     * Scales a matrix by a given amount.
     *
     * @param {number} x
     * @param {number} y
     * @returns this
     */
    scale(x: number, y: number): this;
    /**
     * Transforms the given vector.
     *
     * @param {Vector} v
     */
    transform(v: Vector): Vector;
    /**
     * Inverts the matrix.
     *
     * @returns this
     */
    invert(): this;
    /**
     * Copies a matrix into this matrix.
     *
     * @param {Matrix2} m
     * @returns this
     */
    copy(m: Matrix2): this;
    /**
     * Creates a new matrix,fills its values with this ones and returns the former.
     *
     * @returns Matrix2
     */
    clone(): Matrix2;
    /**
     * Deeply checks if a matrix is equal to another.
     *
     * @param {Matrix2} matrix
     * @returns boolean
     */
    equals(matrix: Matrix2): boolean;
}
/**
 * This handles all inputs from mouse and touchpad on laptops
 */
export class Mouse {
    /**
     * @param {DOMEventHandler} eh
     */
    constructor(eh: DOMEventHandler);
    /**
     * Number of times the mouse has been clicked.
     *
     * @type number
     */
    clickCount: number;
    /**
     * If the mouse is being dragged or not.
     *
     * @type boolean
     */
    dragging: boolean;
    /**
     * The position from which the mouse is being dragged.
     *
     * @type Vector_like
     */
    dragLastPosition: Vector_like;
    /**
     * Distance vector between the last frame's position and current position.
     *
     * @type Vector_like
     */
    delta: Vector_like;
    /**
     * Position of the mouse in current frame.
     *
     * @type Vector_like
     */
    position: Vector_like;
    /**
     * If the left mouse button is pressed or not.
     *
     * @type boolean
     */
    leftbutton: boolean;
    /**
     * If the right mouse button is pressed or not.
     *
     * @type boolean
     */
    rightbutton: boolean;
    lastPosition: {
        x: number;
        y: number;
    };
    /**
     * Checks to see if the vector provided is
     * within a dragbox if mouse is being dragged with a right or left button down
     *
     * @param {Vector} pos an object containing x and y coordinates to be checked
     * @returns {Boolean}
     *
     */
    inDragBox(pos: Vector): boolean;
    /**
     * Initializes the mouse by appending to the DOM
     *
     */
    init(eh: any): void;
    _onClick: (e: any) => void;
    _onMove: (e: any) => void;
    _onDown: (e: any) => void;
    _onUp: (e: any) => void;
    _onWheel: (e: any) => void;
    _onContextMenu: (e: any) => void;
    onmove(e: any): void;
    onclick(e: any): void;
    ondown(e: any): void;
    onup(e: any): void;
    onwheel(e: any): void;
    oncontextmenu(e: any): void;
    /**
     * Updates the mouse internals.
    */
    update(): void;
}
/**
 *
 * @function
 * @name System#add
 * @param {Component} component
*/
/**
 *
 * @function
 * @name System#remove
 * @param {Component} component
*/
/**
 *
 * @function
 * @name System#init
 * @param {Manager} manager
 */
/**
 *
 * @function
 * @name System#update
 * @param {number} dt
 */
/**
 * Component to hold requirements for an entity to move.
 *
 * @implements Component
*/
export class Movable extends Component implements Component {
    constructor(x: any, y: any, a: any);
    entity: any;
    velocity: Vector;
    rotation: Angle;
    acceleration: Vector;
}
/**
 * Most basic broadphase.Should be used when number of bodies are few(i.e less than 100)
*/
export class NaiveBroadphase extends Broadphase {
    constructor(world: any);
    /**
     * @private
     * @type Body[]
    */
    private bodies;
    /**
     * @inheritdoc
     * @param {Bounds} bounds Region to check in.
     * @param {Body[]} target Empty array to store results.
     * @returns {Body[]}
    */
    query(bound: any, target: Body[]): Body[];
    /**
     * @inheritdoc
     * @param {array} target Empty array to store results.
     * @returns {CollisionPair[]}
    */
    getCollisionPairs(target: any[]): CollisionPair[];
}
export namespace Overlaps {
    /**
     * Checks if two AABB overlap
     *
     * @param {BoundingBox} a
     * @param {BoundingBox} b
     */
    function AABBColliding(a: BoundingBox, b: BoundingBox): boolean;
    /**
     * Checks if two BoundingCircles overlap
     *
     * @param {BoundingCircle} a
     * @param {BoundingCircle} b
     */
    function boundSpheresColliding(a: BoundingCircle, b: BoundingCircle): boolean;
    /**
     * Checks if An AABB and a CircleBound overlap
     *
     * @param {BoundingBox} a
     * @param {BoundingCircle} b
     */
    function AABBvsSphere(a: BoundingBox, b: BoundingCircle): boolean;
}
export class ParallaxBackground {
    constructor(...layers: any[]);
    layers: any[];
    update(ctx: any, dt: any): void;
}
/**
 * Its a fricking particle!
*/
export class Particle {
    /**
     * @param {Vector} pos
     * @param {number} radius
     * @param {number} [lifespan=5] In seconds
    */
    constructor(pos: Vector, radius: number, lifespan?: number);
    position: Vector;
    active: boolean;
    velocity: Vector;
    radius: number;
    color: {
        r: number;
        g: number;
        b: number;
        a: number;
    };
    lifespan: number;
    _life: number;
    /**
     * Renders a particle.
    */
    draw(ctx: any): void;
    /**
     * Updates a particle's lifetime
    */
    update(ctx: any, dt: any): void;
}
/**
 * This creates a particle system
 * @augments Sprite
 */
declare let System$1: {
    new (initial?: number, max?: number, increment?: number): {
        initial: number;
        frameIncrease: number;
        max: number;
        /**
         * @protected
         */
        initParticles(n: any): void;
        /**
         * override this to return an object created from your own class extending the particle class
         *
         * @protected
         */
        create(): Particle;
        /**
         * @inheritdoc
         */
        init(entity: any): void;
        /**
         * @protected
         */
        behavior(p: any): void;
        /**
         * @inheritdoc
         */
        render(ctx: any, dt: any): void;
        /**
         * @private
         */
        _position: Vector;
        /**
         * @private
         */
        _orientation: Angle;
        scale: Vector;
        /**
         * @private
         */
        geometry: any;
        material: any;
        parent: any;
        angle: number;
        position: Vector;
        orientation: Angle;
        /**
         * Override this function.
         * The canvas is already transformed to the position and rotation of the sprite.
         *
         */
        draw(render: any): void;
        entity: any;
        update(): void;
    };
};
export class Path {
    _points: any[];
    _index: number;
    speed: number;
    tolerance: number;
    _lerp_t: number;
    _lerpdist: number;
    _way: number[];
    _finished: boolean;
    _lerpedPoint: Vector;
    loop: boolean;
    add(point: any): this;
    clear(): this;
    advance(): boolean;
    update(lerpdist?: number): Vector;
    current(): any[];
    point(): Vector;
    get path(): any[];
    draw(renderer: any): void;
}
/**
 * Creates a behaviour that follows a certain path.
 *
 * @augments Behaviour
*/
export class PathFollowing extends Behaviour {
    /**
     * @param {Path} path
    */
    constructor(path: Path);
    /**
     * The path taken by a pathfollowing behaviour.
     *
     * @type Path
    */
    path: Path;
    /**
     * @inheritdoc
     * @param {Vector} target
     * @param {number} inv_dt
     * @returns Vector the first parameter
     */
    calc(target: Vector, inv_dt: number): Vector;
    /**
     * Removes all points on the path.
    */
    clear(): void;
    /**
     * Adds a point into the path.
     *
     * @param {Vector} point
    */
    add(point: Vector): void;
    /**
     * If the agent should start at the beginning after reaching the ent of the path.
     *
     * @type boolean
    */
    set loop(arg: boolean);
    get loop(): boolean;
    /**
     * Sets a new path to follow.
     *
     * @param {Path} path
    */
    setPath(path: Path): void;
    draw(renderer: any): void;
}
/**
 * Not impemented.
 *
 * @augments Behaviour
*/
export class Pursuit {
    /**
     * @inheritdoc
     * @param {Agent} agent
     */
    init(): void;
    /**
     * @inheritdoc
     * @param {Vector} target
     * @param {number} inv_dt
     * @returns Vector the first parameter
     */
    calc(target: Vector): void;
}
/**
 * This is a bounded broadphase that is used to speed up collision testing on sparse number of objects over a large area.
 *
 * @extends Broadphase
 */
declare class Tree extends Broadphase {
    /**
     * @param {Bounds} bounds The region it operates on.
     * @param {number} [maxdepth=3] Maximum number of branches.
     *
     */
    constructor(bounds: Bounds, maxdepth?: number);
    _root: Node;
    maxDepth: number;
    bounds: Bounds;
    _insert(client: any): void;
    _remove(client: any): boolean;
    /**
     * @inheritdoc
     * @param {Body} obj
     */
    remove(obj: Body): boolean;
    /**
     * A depth first search of the quadtree that applies the given function to its nodes.
     *
     * @param {function} func The function that checks every node unless it returns true.
     *
     */
    traverse(func: Function): any;
    /**
     * Resizes a quadtree to a new bound size.
     * This method should not be used without care.
     *
     * @param {Bounds} bounds.
     *
     */
    recalculateBounds(bounds: any): void;
}
export class Rectangle extends Shape {
    /**
     * @inheritdoc
     * @param {number} mass of the body
     * @param {number} width
     * @param {number} height
     * @returns number
     */
    static calcInertia(mass: number, width: number, height: number): number;
    /**
     * @param {number} width
     * @param {number} height
     * @param {Vector} offset Positional offset from the body center.
     *  @param {number} offsetAngle Angular offset from the body center.
     */
    constructor(width: number, height: number, offset: Vector, offsetAngle: number);
    /**
     * @type number
     */
    height: number;
    /**
     * @type number
     */
    width: number;
}
/**
 * This is an abstract class from which different types of renderers are implemented.
 *
 * @abstract
 * @see Renderer2D
 * @see WebGLRenderer
 * @see WebGPURenderer
 */
export class Renderer {
    /**
     * @param {CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext} context
     * @param {HTMLCanvasElement} canvas element to draw on
     */
    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext);
    /**
     * Used to throttle the frame rate.
     *
     * @private
     * @rype number
     */
    private _accumulator;
    /**
     * A list of meshes.
     *
     * @type Sprite[]
     */
    objects: Sprite[];
    /**
     * Used for monitoring perfomance of the renderer
     *
     */
    perf: {
        lastTimestamp: number;
        total: number;
    };
    /**
     * @private
     * @type {HTMLCanvasElement}
     */
    private domElement;
    /**@type {CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext}*/
    ctx: CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext;
    camera: any;
    clock: Clock;
    /**
     * Instantiates the renderer.
     *
     * @param {Manager} manager
     */
    init(manager: Manager): void;
    /**
     * Clears the canvas on which the renderer draws on.
     */
    clear(): void;
    /**
     * Updates the objects within the renderer
     */
    update(dt: any): void;
    /**
     * Requests an animation frame.
     *
     * @protected
     */
    protected RAF(): void;
    _rafID: number;
    /**
     * Starts the rendering cycle of a renderer.
     */
    play(): void;
    /**
     * Stops the rendering cycle of a renderer.
     */
    pause(): void;
    /**
     * Attaches the renderer to a given html element by its selector.
     *
     * @param {string} selector A css selector string that is passed to document.querySelector
     * @param {true} focus whether to shift focus of input to the element pr not
     */
    bindTo(selector: string, focus?: true): void;
    /**
     * Adds a mesh to the renderer.
     *
     * @param {Sprite} Sprite
     */
    add(sprite: any): void;
    /**
     * Removes the given sprite from the renderer.
     *
     * @param {Sprite} sprite
     */
    remove(sprite: Sprite): void;
    /**
     * Requests fullscreen for the renderer.
     */
    requestFullScreen(): void;
    /**
     * Sets the width and height of the canvas being rendered to.
     *
     * @param {number} w Width of the canvas.
     * @param {number} h Height of the canvas.
     */
    setViewport(w: number, h: number): void;
    set width(arg: number);
    /**
     * Width of the renderer
     *
     * @type number
     */
    get width(): number;
    set height(arg: number);
    /**
     * Height of the renderer
     *
     * @type number
     */
    get height(): number;
}
/**
 * Renders images and paths to the 2D context of a canvas.
 *
 * @extends Renderer
*/
export class Renderer2D extends Renderer {
    /**
    @param {HTMLCanvasElement} [canvas] element to draw on
    */
    constructor(canvas?: HTMLCanvasElement);
    _fill: string;
    _stroke: string;
    frameRate: number;
    renderLast: any[];
    push(): void;
    pop(): void;
    reset(): void;
    translate(x: any, y: any): void;
    scale(x: any, y: any): void;
    rotate(rad: any): void;
    line(x1: any, y1: any, x2: any, y2: any): void;
    rect(x: any, y: any, w: any, h: any): void;
    circle(x: any, y: any, r: any): void;
    vertices(vertices: any, close?: boolean): void;
    arc(x: any, y: any, r: any, start: any, end: any): void;
    fillText(text: any, x: any, y: any): void;
    fill(color: string, fillRule: any): void;
    stroke(color?: string, width?: number): void;
    begin(): void;
    close(): void;
    clip(): void;
    drawImage(img: any, x: any, y: any, w?: any, h?: any, ix?: number, iy?: number): void;
    _update: (accumulate: any) => void;
    addUI(mesh: any): void;
}
/**
 * Creates a behaviour to seek out a target and move towards it.
 *
 * @augments Behaviour
*/
export class SeekBehaviour extends Behaviour {
    constructor(target: any);
    /**
     * Not implemented.
     * Radius in which to seek out the target.
     *
     * @type number
    */
    radius: number;
    target: any;
}
export namespace Session {
    /**
     * Adds a value to sessions
     *
     * @param {string} k
     * @param {any} v
    */
    function set(k: string, v: any): void;
    /**
     * Gets a value from sessions using a key
     *
     * @param {string} k A key to retrieve a value
    */
    function get(k: string): any;
    /**
     * Removes everything from sessions
    */
    function clear(): void;
}
/**
 * This class is responsible for playing a singular sound.
 */
export class Sfx {
    /**
     * @param {AudioHandler} handler
     * @param {AudioBuffer} buffer
     */
    constructor(handler: AudioHandler, buffer: AudioBuffer);
    /**
     * @private
     * @type {AudioBuffer}
     */
    private _soundBuffer;
    /**
     * @private
     * @type {AudioBufferSourceNode}
     */
    private _source;
    /**
     * @private
     * @type {function}
     */
    private _onended;
    /**
     * @private
     * @type {AudioNode}
     */
    private _destination;
    /**
     * @private
     * @type {number}
     */
    private _playingOffset;
    /**
     * Time on the sound to begin playing
     *
     * @type {number}
     */
    offset: number;
    /**
     * Whether to start from the beginning after sound has finished playing.
     *
     * @type {boolean}
     */
    loop: boolean;
    /**
     * @private
     * @type {number}
     */
    private delay;
    /**
     * how long to play the sound.
     *
     * @type {number}
     */
    duration: number;
    handler: AudioHandler;
    ctx: AudioContext;
    finished: boolean;
    id: number;
    /**
     * Set callback when the sound finishes playing.
    */
    set onended(arg: any);
    /**
     * Plays an sfx from the beginning.
     */
    play(): void;
    /**
     * Continues playing an sfx from where it was paused.
     */
    resume(): void;
    _startTime: number;
    /**
     * Halts playing of an sfx.
     */
    pause(): void;
    /**
     * Disconnects this sfx from its current destination.
     */
    disconnect(): void;
    /**
     * Sets the given audionode to be the output destination of an sfx
     *
     * @param {AudioNode} node
     */
    connect(node: AudioNode): void;
}
/**
 * This class makes a body tangible
 * to collision detection and response.Without it,the body will not be able to interact with other bodies.
 */
export class Shape {
    /**
     * Calculates the inertia of a given shape.
     *
     * @virtual
     * @returns {number}
     */
    static calcInertia(): number;
    static CIRCLE: number;
    static POLYGON: number;
    /**
     * @param {Vector[]} vertices The vertices of the shape in local space coordinates.
     * @param {Vector} [offset=vector] offset position relative to parent body
     * @param {number} [offsetAngle=0] offset angle relative to parent body.
     */
    constructor(vertices: Vector[], offset?: Vector, offsetAngle?: number);
    /**
     * Used to determine what type of shape this is.
     *
     * @type number
     * @readonly
     */
    readonly type: number;
    /**
     * The offset angle of this shape from this body's angle.
     *
     * @type number
     */
    offAngle: number;
    /**
     * The offset position of this shape from this body's position.
     *
     * @type Vector
     */
    offPosition: Vector;
    /**
     * The vertices describing the shape.
     *
     * @type Vector[]
    */
    vertices: Vector[];
    /**
     * Keeps the original normals and vertices of this shape
     *
     * @type Geometry
    */
    geometry: Geometry;
    get CHOAS_CLASSNAME(): any;
    get CHAOS_OBJ_TYPE(): string;
    /**
     * The area occupied by a shape.
     * @type number
    */
    get area(): number;
    /**
     * Returns the normals of the faces when rotated.
     *
     * @param {} body
     * @param {} [target=[]] An array where results are stored.
     * @returns {Array<Vector>}
     */
    getNormals(body: any, target?: any): Array<Vector>;
    /**
     * Transforms the local coordinates of the vertices to world coordinates.
     *
     * @param {Vector} position the world position of the body
     * @param {number} angle the orientation of body
     * @param {number} scale the scale of the body
     */
    update(position: Vector, angle: number, scale: number): void;
    angle: number;
    /**
     * Returns the world coordinates of the vertices.
     *
     * @param {Vector} axis
     * @param {Vector[]}} target
     * @returns {Vector[]}
     */
    getVertices(axis: Vector, target: any): Vector[];
}
/**
 * A constraint that acts like a spring between two bodies
*/
export class SpringConstraint extends Constraint {
    fixed: boolean;
    dampen: number;
    maxDistance: number;
}
/**
 * This is the base class used to render images and paths onto the renderer.
 * Extend it to create your custom behaviour.
 *
 * @implements Component
 */
export class Sprite implements Component {
    constructor(geometry: any, material: any);
    /**
     * @private
     */
    private _position;
    /**
     * @private
     */
    private _orientation;
    scale: Vector;
    /**
     * @private
     */
    private geometry;
    material: any;
    parent: any;
    set angle(arg: number);
    get angle(): number;
    set position(arg: Vector);
    get position(): Vector;
    set orientation(arg: Angle);
    get orientation(): Angle;
    /**
     * Override this function.
     * The canvas is already transformed to the position and rotation of the sprite.
     *
     */
    draw(render: any): void;
    render(render: any, dt: any): void;
    init(entity: any): void;
    entity: any;
    update(): void;
}
/**
 * Renders a single image with no frames.
 *
 * @augments Sprite
*/
export class StaticImageSprite extends Sprite {
    /**
     * @param {HTMLImageElement} img Image to draw
    */
    constructor(img: HTMLImageElement);
    img: HTMLImageElement;
    width: number;
    height: number;
    frameWidth: number;
    frameHeight: number;
    /**
     * @param {Renderer} ctx
     */
    draw(renderer: any): void;
    _accumulator: number;
    _frame: number;
}
export namespace Storage {
    /**
     * Adds a value to local storage
     *
     * @param {string} k
     * @param {any} v
    */
    function set(k: string, v: any): void;
    /**
     * Gets a value from local storage by its key.
     *
     * @param {string} k
    */
    function get(k: string): any;
    /**
     * Removes everything from local storage
    */
    function clear(): void;
}
/**
 * Updates components assigned to it.
 *
 * @interface
*/
export class System {
}
/**
 * Handles the touch input of an application from a smartphone,tablet or PCs with touchscreens.
 *
 * Realized i need to massively change this to make it work well.
 */
export class Touch {
    constructor(eh: any);
    clickCount: number;
    touches: any[];
    /**
     * Checks to see if the position is within the dragbox of the first two touches.
     * Not yet fully implemented
     */
    inDragBox(pos: any): boolean;
    /**
     * Adds Touch events to the DOM.
     *
     * @param {DOMEventHandler} eh
     */
    init(eh: DOMEventHandler): void;
    _onMove: (e: any) => void;
    _onDown: (e: any) => void;
    _onUp: (e: any) => void;
    onmove(e: any): void;
    onclick(e: any): void;
    ondown(e: any): void;
    onup(e: any): void;
    onwheel(e: any): void;
    update(): void;
}
/**
 * Holds transformation info of an entity
 *
 * @implements Component
*/
export class Transform implements Component {
    constructor(x: any, y: any, a: any);
    entity: any;
    position: Vector;
    orientation: Angle;
    init(): void;
}
/**
 * A triangular shape.
 *
 * @augments Shape
 */
export class Triangle extends Shape {
    /**
     * @param {number} length1 Length of one side.
     * @param {number} length2 Length of a second side.
     * @param {number} angle The angle between the two sides.
     * @param {Vector} offset Positional offset from the body center.
     * @param {number} offsetAngle Angular offset from the body center.
     *
     */
    constructor(length1: number, length2: number, angle: number, offset: Vector, offsetAngle: number);
}
export namespace Utils {
    /**
     * Appends the second array to the first.
     *
     * @memberof Utils
     * @param {any[]} arr1
     * @param {any[]} arr1
     */
    function appendArr(arr1: any[], arr2: any): void;
    /**
     * Clears an array
     *
     * @memberof Utils
     * @param {any[]} arr
     */
    function clearArr(arr: any[]): void;
    /**
     * Removes a number of items at the end of an array
     *
     * @memberof Utils
     * @param {any[]} arr
     * @param {number} number
     */
    function popArr(arr: any[], number: number): void;
    /**
     * Removes an element by its index from an array
     *
     * @memberof Utils
     * @param {any[]} arr
     * @param {number} index
     */
    function removeElement(arr: any[], index: number): any;
    /**
     * Generates a unique id when called
     *
     * @memberof Utils
     */
    function generateID(): number;
    /**
     * Mixes the functions required by a component into a class.
     *
     * @memberof Utils
     * @param {Object} component the class to add methods to.
     * @param {boolean} [overrideInit=true]
     * @param {boolean} [overrideUpdate=true]
     */
    function inheritComponent(component: any, overrideInit?: boolean, overrideUpdate?: boolean): void;
    function inheritSystem(system: any): void;
}
/**
 * This is a 2D vector class.
 *
 * @author Wayne Mwashuma <mwashumawayne@gmail.com>
 * @license MIT
 */
export class Vector {
    /**
     * Gets the angle (in degrees) between two
     * vectors in the range 0° to 360° in the anticlockwise direction from v1 to v2
     *
     * @param {Vector} v1 start of the angle
     * @param {Vector} v2 end of the angle
     * @returns {number}
     */
    static getAbsDegBtwn(v1: Vector, v2: Vector): number;
    /**
     * Same as `Vector.getAbsDegBtwn` but returns in radians.
     *
     * @param { Vector } v1 start of the angle
     * @param { Vector } v2 end of the angle
     * @returns {number}
     **/
    static getAbsRadBtwn(v1: Vector, v2: Vector): number;
    /**
     * Gets the angle (in radians) between two
     * vectors in the shortest direction from v1 to v2 in the range of `0` to `Math.PI`
     *
     * @param {Vector} v1 start of the angle
     * @param {Vector} v2 end of the angle
     * @returns {number}
     */
    static getRadBtwn(v1: Vector, v2: Vector): number;
    /**
     * Gets the angle (in degrees) between two
     * vectors in shortest direction from v1 to v2 in the range `0°` to `180°`
     *
     * @param {Vector} v1 start of the angle
     * @param {Vector} v2 end of the angle
     * @returns {number}
     */
    static getDegBtwn(v1: Vector, v2: Vector): number;
    /**
     * Returns a unit vector pointing in the
     * given angle starting from the positive x axis.
     *
     * @param {number} radian angle in radians from 0 to `Math.PI * 2`
     * @param {Vector} target Vector to store results in.
     * @returns {Vector}
     */
    static fromRad(radian: number, target?: Vector): Vector;
    /**
     * Returns a unit vector pointing in the
     * given angle from the positive x axis
     *
     * @param {number} degree angle in radians from `0°` to `360°`
     * @param {Vector} target Vector to store results in.
     * @returns {Vector}
     */
    static fromDeg(degree: number, target: Vector): Vector;
    /**
     * Generates a new unit Vector in a random direction
     *
     * @returns {Vector}
     */
    static random(target: any): Vector;
    /**
     * Returns a Vector that has been lerped between v1 and v2
     * @param {Vector} v1 the vector to lerp from
     * @param {Vector} v2 the vector to lerp from
     * @param {number} t a value from 0 to 1 to scale the new Vector between v1 and v2
     * @param {Vector} target the vector to store results into
     *
     * @returns {Vector}
     */
    static lerp(v1: Vector, v2: Vector, t: number, target: Vector): Vector;
    /**
     * Returns the angle in degrees between the positive x-axis and the vector.
     *
     * @param {Vector} v
     * @returns {number}
     */
    static toDeg(v: Vector): number;
    /**
     * Returns the angle in radians between the positive x-axis and the vector.
     *
     * @param {Vector} v
     * @returns {number}
     */
    static toRad(v: Vector): number;
    /**
     * A vector whose x and y values will remain 0.
     *
     * @type {Vector}
     */
    static ZERO: Vector;
    /**
     * @param {number} x the x coordinate of the vector
     * @param {number} y the y coordinate of the vector
     */
    constructor(x: number, y: number);
    x: number;
    y: number;
    get CHOAS_CLASSNAME(): any;
    get CHAOS_OBJ_TYPE(): string;
    /**
     *Calculates length of this vector and returns
     * it
     *
     * @returns {number}
     */
    magnitude(): number;
    /**
     * Sets a vector to have the given length.
     *
     * @param {number} length
     */
    setMagnitude(length: number): void;
    /**
     *Calculates length squared of vector and returns it
     */
    magnitudeSquared(): number;
    /**
     *Calculates length of this vector to another vector
     * @param {Vector} v the other vector
     */
    distanceTo(v: Vector): number;
    /**
     *Calculates length squared of this vector to another vector
     *
     * @param {Vector} v the other vector
     * @returns {number}
     */
    distanceToSquared(v: Vector): number;
    /**
     * Adds a given vector into this
     *
     * @param {Vector} v
     * @returns {this}
     */
    add(v: Vector): this;
    /**
     * Adds a scalar value into this vector's
     * x and y values
     *
     * @param {number} n
     * @returns {this}
     */
    addScalar(n: number): this;
    /**
     * Subtracts a given vector from this vector
     *
     * @param {Vector} v
     * @returns {this}
     */
    sub(v: Vector): this;
    /**
     * Subtracts a scalar value from this vector's x and y values.
     *
     * @param {number} n
     * @returns {this}
     */
    subScalar(n: number): this;
    /**
     * Calculates the dot product of two vectors.
     *
     * @param {Vector} v
     * @returns {number}
     */
    dot(v: Vector): number;
    /**
     * Calculates the cross product of two vectors.
     *
     * @param {Vector} vproduct
     * @returns {number}
     */
    cross(v: any): number;
    /**
     * Multiplies this vector with a scalar.
     *
     * @param {number} n
     * @returns {this}
     */
    multiply(n: number): this;
    /**
     * Divides this vector with a scalar.
     *
     * @param {number} n
     * @returns {this}
     */
    divide(n: number): this;
    /**
     * Makes this vector a unit vector by
     * dividing its components with its length.
     *
     * @returns {this}
     */
    normalize(): this;
    /**
     * Checks to see if this vector is equal to
     * another vector.
     *
     * @param {Vector} v
     * @returns {boolean}
     */
    equals(v: Vector): boolean;
    /**
     * Checks if the vector length is zero.
     *
     * @returns {boolean}
     */
    equalsZero(): boolean;
    /**
     * Returns a scaled vector normal to this vector,when scaled to 1,it returns a unit vector.
     *
     * @param {number} l the length of the vector returned.
     * @param {Vector} [target = Vector] Vector in which results are stored.
     * @returns {Vector}
     */
    normal(l?: number, target?: Vector): Vector;
    /**
     * Returns the normal to a vector, the normal has the same length as the vector.
     *
     * @param {Vector} [target = Vector] Vector in which results are stored.
     *  @returns {Vector}
     */
    normalFast(target?: Vector): Vector;
    /**
     * Rotates this vector by a given angle in radians.
     *
     * @param {Vector} Angle in radians
     * @returns {this}
     */
    rotate(rad: any): this;
    /**
     * Returns an array with x and y values of
     * this vector pushed into the array in
     * that order.
     *
     * @param {number[]} [target = []] The array to
     * push values.Defaults to creating a new
     * array if not provided one
     * @returns number[]
     */
    toArray(target?: number[], offset?: number): number[];
    /**
     * Copies x and y values of this vector to
     * a new vector and returns the new vector.
     *
     * @return Vector
     */
    clone(): Vector;
    /**
     * Copies x and y values of another vector
     * to this vector.
     *
     * @@param {Vector} v
     * @return this
     */
    copy(v: Vector): this;
    /**
     * Sets x and y values of this vector to the given parameter.
     *
     * @param {Number} x
     * @param {Number} y
     * @returns {this}
     */
    set(x: number, y: number): this;
    /**
     * Draws this vector to a 2D canvas.
     *
     * @param {CanvasRenderingContext2D} ctx the context to draw on.
     * @param {number} x Translates the x-coordinate origin of the vector
     * @param {number} y Translates the y-coordinate origin of the vector
     * @param {string} color a CSS string that
     * is supplied to the rendering context.Can
     *  be a hex(e.g "0xFFFFFF"),rgb(e.g "rgb(255,255,255)"),hsl or a color name(e.g "white")
     * @param {Number} scale A value that
     * lengthens or shortens the length of the vector
     * @returns {this}
     */
    draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): this;
    /**
     * Negates the values of this vector.
     *
     * @returns {this}
     */
    reverse(): this;
    /**
     * Returns a vector of this reflected on a sirface perpendicular to the normal.
     *
     * @param {number} normal the unit vector perpendicular to reflection surface
     * @return {Vector}
     */
    reflect(normal: number, target: any): Vector;
    /**
     * Forces this vector to have a length
     * between the min and max.
     *
     * @param {number} [min = 0] The smallest value
     * the length of this vector is allowed to have.
     * @param {number} [max = 1] The biggest value the length of this vector is allowed to have.
     * @returns {this}
     */
    clamp(min?: number, max?: number): this;
}
/**
 * Creates a behaviour that is used to make an agent wander in an organic manner.
 *
 * @augments Behaviour
*/
export class WanderBehaviour extends Behaviour {
    /**
     * This sets a point on the perimeter circle that is infront of the agent.
     *
     * @type number
     */
    _theta: number;
    /**
     * This clamps the offset that modify the WandererBehaviour#theta value each frame.
     *
    * @type number
    */
    dtheta: number;
    /**
     * How big should the circle in front of the agent be.
    */
    _radius: number;
}
/**
 * Renders images and paths to the webgl context of a canvas.
 *
 * @extends Renderer
 */
export class WebGLRenderer extends Renderer {
    constructor();
}
/**
 * Renders images and paths to the webgpu context of a canvas.
 *
 * @extends Renderer
*/
export class WebGPURenderer extends Renderer {
    constructor();
}
/**
 * Class responsible for updating bodies,constraints and composites.
 */
export class World {
    /**
     * Used to check if a manifold is persistent.
     *
     * @type number
     * @private
     */
    private count;
    /**
     * A record of collision manifolds.
     *
     * @type Map<number,Manifold>
     * @protected
     */
    protected records: Map<number, Manifold>;
    /**
     * A list of bodies.
     *
     * @type Array<Body>
     * @private
     */
    private objects;
    /**
     * A list of constraints fixed to a static object.
     *
     * @type Array<Constraint>
     * @private
     */
    private fixedConstraits;
    /**
     * A list of constraints fixed to two dynamic bodies.
     *
     * @type Array<Constraint>
     * @private
     */
    private constraints;
    /**
     * A value between 0 and 1 used to dampen linear velocity of bodies.
     *
     * @type number
     */
    linearDamping: number;
    /**
     * A value between 0 and 1 used to dampen angular velocity of bodies.
     *
     * @type number
     */
    angularDamping: number;
    /**
     * The number of times to solve for velocity.A high number results in much more stable stacking.
     *
     * @type number
     */
    velocitySolverIterations: number;
    /**
     * The collision manifolds that have passed narrowphase and verified to be colliding.
     *
     * @type Array<Manifold>
     */
    CLMDs: Array<Manifold>;
    /**
     * The collision manifolds that have passed broadphase and could be colliding
     *
     *
     * @type CollisionPair[]
     */
    contactList: CollisionPair[];
    /**
     * The gravitational pull of the world.
     *
     * @type Vector
     */
    gravitationalAcceleration: Vector;
    /**
     * Time in seconds that a single frame takes.This has more precedence than the first parameter of World.update(),set to this to zero if you want to use the latter as the delta time.
     *
     * @type number
     */
    fixedFrameRate: number;
    /**
     *
     * @type { {lastTimestamp:number,total: number}}
     * @ignore
     */
    perf: {
        lastTimestamp: number;
        total: number;
    };
    /**
     * This is a cheap way of determining which pairs of bodies could be colliding.
     *
     * @type Broadphase
     */
    broadphase: Broadphase;
    set gravity(arg: Vector);
    /**
     * Gravitational pull of the world,will affect all bodies except static bodies.
     *
     * @type {Vector }
     */
    get gravity(): Vector;
    /**
     * @private
     */
    private narrowPhase;
    broadPhase(): void;
    /**
     * @private
     */
    private collisionDetection;
    /**
     * @private
     * @param {number} dt
     */
    private collisionResponse;
    /**
     * @private
     * @param {number} dt
     * @param {number} length
     */
    private intergrate;
    /**
     * @private
     * @param {number} length
     * @param {number} dt
     */
    private applyGravity;
    /**
     * @private
     * @param {number} dt
     */
    private updateConstraints;
    /**
     * @private
     * @param {number} length
     */
    private updateBodies;
    /**
     *
     *
     * @param {Number} dt the time passed between the last call and this call.
     */
    update(delta: any): void;
    /**
     * Initializes the manager.
     *
     * @param {Manager} manager
     */
    init(manager: Manager): void;
    /**
     * Adds an object to the world.
     *
     * @param {Body | Composite | Constraint} object
     */
    add(object: Body | Composite | Constraint): void;
    /**
     * Adds a body to the physics world
     * @param {Body} body Body to insert to world
     */
    addBody(body: Body): void;
    /**
     * Removes an object from the world
     * @param {Body | Composite | Constraint} object
     */
    remove(object: Body | Composite | Constraint): void;
    /**
     * Removes a body from the physics world
     * @param {Body} body Body to remove from world
     *
     * @returns Body
     */
    removeBody(body: Body): Body;
    /**
     * Adds a constraint to the physics world
     * @param {Constraint} constraint constaint to add to world
     */
    addConstraint(constraint: Constraint): void;
    /**
     * Removes a constraint from the physics world
     * @param {Constraint} constraint constaint to add to world
     *
     * @returns Constraint
     */
    removeContraint(constraint: Constraint): Constraint;
    /**
     * Adds a composite to the physics world.
     *
     * @param {Composite} composite composite to add to world
     */
    addComposite(composite: Composite): void;
    /**
     * Removes a composite from the physics world.
     *
     * @param {Composite} composite composite to remove
     */
    removeComposite(composite: Composite): void;
    /**
     * Searches for objects in a given bounds and returns them.
     *
     * @param {Bounds} bound the region to search in
     * @param {Array<Body>} [target = []] an array to store results in
     * @returns Array<Body>
     */
    query(bound: Bounds, target?: Array<Body>): Body[];
}
/**
 * Clamps a value between two numbers.
 *
 *  @param {number} value The number to clamp.
 *  @param {number} min The minimal bound of the clamped number.
 *  @param {number} max The maximum bound of the clamped number.
 *  @returns {number}
*/
export function clamp(value: number, min: number, max: number): number;
/**
 * This provides a way to fire off an entity's collision event handler registered to it.
 *
 * @param {CollisionPair[]} clmds an array of collision manifolds
*/
export function defaultCollisionHandler(clmds: CollisionPair[]): void;
/**
 * This provides a way to fire off an entity's precollision event handler registered to it
 *
 * @param {Manifold[]} clmds an array of collision manifolds
*/
export function defaultPrecollisionHandler(clmds: Manifold[]): void;
/**
 * Converts a degree to a radian.
 *
 * @param {number} deg number to convert.
 *  @returns {number}
*/
export function degToRad(deg: number): number;
/**
 * Returns the power of a number by a given exponent.
 *
 *  @param {number} x the number to power.
 *  @param {number} [e=2] The number to power by.
 *  @returns {number}
*/
export function exp(x: number, e?: number): number;
/**
 * Interpolates between two numbers by a constant t.
 *
 *  @param {number} a The minimal bound of the interpolation.
 *  @param {number} b The maximum bound of the interpolation.
 *  @param {number} t A number between 0 and 1 to interpopate by.Any other number greater than 1 or less than 0 will extapolate beyond b or a respectively.
 *  @returns {number}
*/
export function lerp(a: number, b: number, t: number): number;
/**
 * Maps a value from one range to another.
 *
 *  @param {number} v
 *  @param {number} x1
 *  @param {number} y1
 *  @param {number} x2
 *  @param {number} y2
 *  @returns {number}
*/
export function map(v: number, x1: number, y1: number, x2: number, y2: number): number;
/**
 * Returns a unique number given from a pair of numbers
 *  @param {number} a
 *  @param {number} b
 *  @returns {number}
*/
export function naturalizePair(a: number, b: number): number;
/**
 * Converts a radian to a degree.
 *
 * @param {number} rad number to convert.
 *  @returns {number}
*/
export function radToDeg(rad: number): number;
/**
 * Creates a random number between the parameters
 *
 * @param {number} [min=0] The minimal bound of the random number
 * @param {number} [max=1] The maximum bound of the random number
 * @returns {number}
 */
export function rand(min?: number, max?: number): number;
/**
 * Rounds a given value to a given precision.
 *
 *  @param {number} number The number to round.
 *  @param {number} [precision=4] How many decimal places there should be.
 *  @returns {number}
*/
export function round(number: number, precision?: number): number;
/**
 * Returns the square of a number
 *
 * @param {number} x The number to square
 *  @returns {number}
*/
export function sq(x: number): number;
/**
 * Returns the square root pf a number
 *
 * @param {number} x The number to root
 * @returns {number}
*/
export function sqrt(x: number): number;
/**
 * This is an abstract class that extended to classes that are used to filter out unnecessary collision checks to boost performance.
 *
 * @abstract
 * @see QuadtreeBroadphase
 * @see GridBroadphase
 * @see AABBBroadphase
 */
declare class Broadphase {
    /**
     * Checks to see if two bodies can proceed to have their bounding boxes checked
     *
     * @param {Body} a
     * @param {Body} b
     */
    canCollide(a: Body, b: Body): boolean;
    /**
     * Adds a body to the broadphase
     *
     * @param {Body} obj
     */
    insert(obj: Body): void;
    /**
     * Removes a body from the broadphase
     *
     * @param {Body} obj
     */
    remove(obj: Body): void;
    /**
     * Renders a representation of a broadphase
     */
    draw(ctx: any): void;
    /**
     * Updates the internals of the broadphase if needed.
     *
     * @param {Body[]} bodies
     */
    update(bodies: Body[]): void;
    /**
     * Gets all possibly colliding pairs.
     *
     * @param {CollisionPair[]} target Empty array to store results.
     * @returns {CollisionPair[]}
     */
    getCollisionPairs(target: CollisionPair[]): CollisionPair[];
    /**
     * Returns bodies that are within the given bound.
     *
     * @param {Bounds} bounds Region to check in.
     * @param {Body[]} target Empty array to store results.
     * @returns {Body[]}
     */
    query(bounds: Bounds, target: Body[]): Body[];
}
declare class Node {
    constructor(bounds: any);
    children: any[];
    objects: any[];
    parent: any;
    global: any;
    index: number;
    root: any;
    bounds: any;
    hasObjects: boolean;
    depth: number;
    dims: {
        x: number;
        y: number;
    };
    add(node: any): void;
    clear(): void;
    split(depth?: number): void;
    draw(ctx: any): void;
    isLeafNode(): boolean;
    childrenHaveObj(): any;
    intersects(bounds: any): boolean;
    contains(bounds: any): boolean;
    query(bounds: any, target: any): any;
    insertObject(obj: any): boolean;
    isInNode(position: any): boolean;
    isRootNode(): boolean;
    updateObject(obj: any): boolean;
    removeObject(obj: any): boolean;
    traverse(func: any, target: any): any;
    getCollisionPairs(target: any, stack: any): void;
}
export { Matrix2 as Matrix, System$1 as ParticleSystemSprite, Tree as QuadTreeBroadphase };
