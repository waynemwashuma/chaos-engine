export type TweenUpdate = (lerpFunc: Function, to: T, from: T, t: number, into: T) => void;
export type Traverser = (node: Node) => boolean;
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
    ca1: Vector2;
    ca2: Vector2;
    restitution: number;
    staticFriction: number;
    kineticFriction: number;
    velA: Vector2;
    velB: Vector2;
    rotA: number;
    rotB: number;
};
export type ContactManifold = {
    lastOverlap: number;
    overlap: number;
    done: boolean;
    axis: Vector2;
    verticesA: Vector2[];
    verticesB: Vector2[];
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
export class Agent extends Component {
    position: Vector2;
    velocity: Vector2;
    acceleration: Vector2;
    orientation: Angle;
    rotation: Angle;
    maxSpeed: number;
    maxTurnRate: number;
    private behaviours;
    add(behaviour: Behaviour): void;
    remove(behaviour: Behaviour): void;
    draw(ctx: CanvasRenderingContext2D): void;
}
export class AgentManager extends System {
    objects: Agent[];
    init(manager: Manager): void;
    update(dt: number): void;
}
export class AgentSprite extends Sprite {
    constructor();
    private agent;
    init(entity: Entity): void;
    render(ctx: CanvasRenderingContext2D): void;
}
export class Angle {
    constructor(deg?: number);
    private _value;
    private _cos;
    private _sin;
    set value(arg: number);
    get value(): number;
    get CHOAS_CLASSNAME(): string;
    get CHAOS_OBJ_TYPE(): string;
    set degree(arg: number);
    get degree(): number;
    set _rad(arg: number);
    get _rad(): number;
    set _deg(arg: number);
    get _deg(): number;
    set radian(arg: number);
    get radian(): number;
    get cos(): number;
    get sin(): number;
    copy(angle: Angle): void;
    fromJSON(obj: any): void;
    toJson(): {
        deg: number;
        type: string | number;
    };
}
export function AngleUpdate(lerpFunc: any, to: any, from: any, t: any, into: any): void;
export class ArriveBehaviour extends Behaviour {
    constructor(target: Vector2);
    radius: number;
    target: Vector2;
}
export class AudioHandler {
    private ctx;
    private sfx;
    private _backname;
    private _background;
    private playing;
    private toplay;
    private _mute;
    private masterGainNode;
    baseUrl: string;
    canPlay: boolean;
    load(src: string): void;
    loadFromLoader(loader: Loader): void;
    playBackgroundMusic(name: string): void;
    playEffect(name: string, offset?: number, duration?: number): void;
    createSfx(name: string): Sfx;
    pauseAll(): void;
    mute(): void;
    unmute(): void;
    remove(sfx: Sfx): void;
}
export class Ball extends Body {
    constructor(radius: number);
}
export class BasicMaterial implements Material {
    fill: string;
    stroke: string;
    wireframe: boolean;
    render(ctx: CanvasRenderingContext2D, dt: number, path: Path2D): void;
}
export class Behaviour {
    position: Vector2;
    velocity: Vector2;
    maxSpeed: number;
    maxForce: number;
    active: boolean;
    init(agent: Agent): void;
    calc(target: Vector2, inv_dt: number): void;
    draw(renderer: Renderer): void;
}
export class Body extends Component {
    static STATIC: number;
    static KINEMATIC: number;
    static DYNAMIC: number;
    constructor(...shapes: Shape[]);
    id: number;
    _transform: Transform$1;
    _movable: Movable$1;
    _mass: number;
    private _inertia;
    private _type;
    private _localanchors;
    private anchors;
    lastPosition: Vector2;
    inv_mass: number;
    inv_inertia: number;
    restitution: number;
    staticFriction: number;
    kineticFriction: number;
    boundPadding: number;
    index: number;
    mask: {
        layer: number;
        group: number;
    };
    entity: Entity | null;
    bounds: BoundingBox | BoundingCircle | null;
    shapes: Shape[];
    client: any | null;
    allowSleep: boolean;
    sleeping: boolean;
    aabbDetectionOnly: boolean;
    collisionResponse: boolean;
    autoUpdateBound: boolean;
    set type(arg: number);
    get type(): number;
    set mass(arg: number);
    get mass(): number;
    set inertia(arg: number);
    get inertia(): number;
    get physicsType(): number;
    set acceleration(arg: Vector2);
    get acceleration(): Vector2;
    set velocity(arg: Vector2);
    get velocity(): Vector2;
    set rotation(arg: Angle);
    get rotation(): Angle;
    set angle(arg: number);
    get angle(): number;
    set density(arg: number);
    get density(): number;
    set position(arg: Vector2);
    get position(): Vector2;
    set orientation(arg: Angle);
    get orientation(): Angle;
    set angularVelocity(arg: number);
    get angularVelocity(): number;
    set torque(arg: number);
    get torque(): number;
    set angularAcceleration(arg: number);
    get angularAcceleration(): number;
    setAnchor(v: Vector2): number;
    getAnchor(index: number): Vector2;
    getLocalAnchor(index: number, target?: Vector2): Vector2;
    applyForce(force: Vector2, arm?: Vector2): void;
    init(entity?: Entity, composited?: boolean): void;
    update(): void;
    toJson(): {
        id: number;
        position: any;
        velocity: any;
        acceleration: any;
        orientation: {
            deg: number;
            type: string | number;
        };
        rotation: {
            deg: number;
            type: string | number;
        };
        shapes: any[];
        anchors: any[];
        collisionResponse: boolean;
        allowSleep: boolean;
        type: string;
        phyType: number;
        mass: number;
        inertia: number;
        autoUpdateBound: boolean;
        boundPadding: number;
        aabbDetectionOnly: boolean;
        mask: {
            layer: number;
            group: number;
        };
    };
    fromJson(obj: any): void;
}
export class BodySprite extends Sprite {
    constructor(options?: {});
    private body;
    drawVelocity: boolean;
    drawBounds: boolean;
    drawPosition: boolean;
    render(ctx: CanvasRenderingContext2D, dt: number): void;
      _drawCenter(body: any, ctx: any): void;
    private _drawVelocity;
    private _drawBound;
    private _drawShapes;
    init(parent: Entity): void;
}
declare class Bound$1 extends Component {
    bounds: BoundingBox | BoundingCircle;
    toJson(): {
        bounds: {
            posX: number;
            posY: number;
            r: number;
        } | {
            posX: number;
            posY: number;
            minX: number;
            minY: number;
            maxX: number;
            maxY: number;
        };
    };
    fromJson(obj: any): void;
}
export class BoundingBox extends Component {
    static union(bound1: BoundingBox, bound2: BoundingBox, target: BoundingBox): BoundingBox;
    constructor(minX?: number, minY?: number, maxX?: number, maxY?: number);
    pos: Vector_like;
    max: Vector_like;
    min: Vector_like;
    intersects(bound: BoundingCircle | BoundingBox): boolean;
    calculateBounds(body: Body, padding?: number): void;
    update(pos: Vector2): void;
    clone(): BoundingBox;
    copy(bounds: BoundingBox): void;
    toJson(): {
        posX: number;
        posY: number;
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
    };
    fromJson(obj: any): void;
}
export class BoundingCircle {
    constructor(r?: number);
    r: number;
    pos: Vector_like;
    intersects(bound: BoundingCircle | BoundingBox): boolean;
    calculateBounds(body: Body, padding?: number): void;
    update(pos: Vector_like): void;
    toJson(): {
        posX: number;
        posY: number;
        r: number;
    };
    fromJson(obj: any): void;
}
export class Box extends Body {
    constructor(w: number, h: number);
}
export class BufferGeometry {
    constructor(vertices: Vector2[]);
    readonly vertices: Vector2[];
    drawable: Path2D | WebGLVertexArrayObject;
    init(ctx: CanvasRenderingContext2D): void;
    updateVertices(data: any): void;
}
export class CamController {
    constructor(camera: Camera);
    readonly offset: Vector2;
    transform: Transform;
    targetPosition: any;
    targetOrientation: Angle;
    follow(position: Vector2, orientation?: Angle): void;
    followEntity(entity: Entity): void;
    setOffset(x: number, y: number): void;
    init(): void;
    update(): void;
}
export class Camera {
    readonly transform: Transform;
    set position(arg: Vector2);
    get position(): Vector2;
    update(): void;
}
export class Circle extends Shape {
    static calcInertia(mass: number, radius: number): number;
    constructor(radius: number, offset: Vector2, offsetAngle: number);
    radius: number;
    vertices: Vector2$1[];
    type: number;
    get position(): Vector2$1;
    toJson(): {
        radius: number;
        offset: Vector2;
        offAngle: number;
        shapeType: number;
        type: string;
    };
    fromJson(obj: any): Circle;
}
export class CircleGeometry {
    constructor(radius: number);
    radius: number;
    init(ctx: CanvasRenderingContext2D): void;
    _drawable: Path2D;
    render(ctx: CanvasRenderingContext2D): void;
}
export class Clock {
    private lastcall;
    dt: number;
    update(accumulate: number): number;
}
export function ColorUpdate(lerpFunc: any, to: any, from: any, t: any, into: any): void;
export class Component {
    static fromJson(): void;
    static toJson(): void;
    static implement(component: any): void;
    destroy(): void;
    get CHOAS_CLASSNAME(): string;
    get CHAOS_OBJ_TYPE(): string;
    init(entity: Entity): void;
    update(dt: number): void;
    get(entity: any, n: string): any;
    requires(entity: any, ...names: string[]): void;
    query(entity: any, bound: CircleBounding | BoxBounding, target?: Entity): any;
}
export class Composite extends Component {
    entity: Entity | null;
    bodies: Body[];
    constraints: Constraint[];
    get physicsType(): number;
    add(object: Constraint | Body): number;
    update(): void;
    set acceleration(arg: Vector2);
    get acceleration(): Vector2;
    set velocity(arg: Vector2);
    get velocity(): Vector2;
    set angle(arg: number);
    get angle(): number;
    set mass(arg: number);
    get mass(): number;
    set type(arg: number);
    get type(): number;
    set density(arg: number);
    get density(): number;
    set position(arg: Vector2);
    get position(): Vector2;
    set orientation(arg: number);
    get orientation(): number;
    set angularVelocity(arg: number);
    get angularVelocity(): number;
}
export class Constraint {
    constructor(body1: Body, body2: Body, localA: Vector2, localB: Vector2);
    body1: Body;
    body2: Body;
    localA: any;
    localB: any;
    stiffness: number;
    dampening: number;
    get physicsType(): number;
    get CHOAS_CLASSNAME(): string;
    get CHAOS_OBJ_TYPE(): string;
    protected behavior(body1: Body, body2: Body, dt: number): void;
    update(dt: number): void;
    toJson(): {
        body1: number;
        body2: number;
        localA: any;
        localB: any;
        stiffness: number;
        dampening: number;
        type: string;
    };
    fromJson(obj: any, world: any): Constraint;
}
export namespace Cookies {
    export function set(n: string, v: string, maxAge?: number): void;
    export function get(n: string): string;
    function _delete(n: string): void;
    export { _delete as delete };
    export function clear(): void;
}
export namespace DEVICE {
    let audio: boolean;
    let canvas: boolean;
    let webgl: boolean;
}
export class DOMEventHandler {
    private handlers;
    private _evHandlers;
    add(e: string, h: Function): number;
    remove(e: string, h: Function): void;
    disposeEvent(e: string): void;
    clear(): void;
    init(): void;
}
export class DistanceConstraint extends Constraint {
    fixed: boolean;
    maxDistance: number;
}
export namespace Easing {
    function linear(x: any): any;
    function quadraticIn(x: any): number;
    function quadraticOut(x: any): number;
    function quadraticInOut(x: any): number;
    function cubicIn(x: any): number;
    function cubicOut(x: any): number;
    function cubicInOut(x: any): number;
    function quarticIn(x: any): number;
    function quarticOut(x: any): number;
    function quarticInOut(x: any): number;
    function quinticIn(x: any): number;
    function quinticOut(x: any): number;
    function quinticInOut(x: any): number;
    function sinusoidalIn(x: any): number;
    function sinusoidalOut(x: any): number;
    function sinusoidalInOut(x: any): number;
    function exponentialIn(x: any): number;
    function exponentialOut(x: any): number;
    function exponentialInOut(x: any): number;
    function circularIn(x: any): number;
    function circularOut(x: any): number;
    function circularInOut(x: any): number;
    function elasticIn(x: any): number;
    function elasticOut(x: any): number;
    function elasticInOut(x: any): number;
    function backIn(x: any): number;
    function backOut(x: any): number;
    function backInOut(x: any): number;
    function bounceIn(x: any): number;
    function bounceOut(x: any): number;
    function bounceInOut(x: any): number;
}
export class Entity {
    static Default(x: number, y: number, a: number): Entity;
    private _components;
    private _handlers;
    private _tags;
    private _global;
    active: boolean;
    get CHAOS_OBJ_TYPE(): string;
    get CHAOS_CLASSNAME(): any;
    destroy(): void;
    removeSelf(): void;
    reset(): void;
    removeComponents(): void;
    get manager(): Manager;
    attach(n: string, c: Component): this;
    remove(n: string): this;
    register(n: string, h: Function): void;
    unregister(n: string): void;
    getHandler(n: string): Function | undefined;
    get(n: string): Component | undefined;
    has(n: string): boolean;
    addTag(n: string): void;
    removeTag(n: string): void;
    hasTag(n: string): boolean;
    init(global: Manager): void;
    query(bound: Bounds, target?: Entity[]): Entity[];
    fromJSON(obj: {}, compList: Map<string, Function>): this;
    toJson(): {
        deg: number;
        type: string;
    };
}
declare var error$1: Readonly<{
    __proto__: any;
    warn: typeof warn;
    throws: typeof throws;
    error: typeof error;
    log: typeof log;
    warnOnce: typeof warnOnce;
    assert: typeof assert;
    deprecate: typeof deprecate;
}>;
export class EulerSolver {
    static solve(transform: any, movable: any, dt: number): void;
}
export class EvadeBehaviour extends Behaviour {
    constructor(pursuer: Vector2);
    radius: number;
    pursuer: Vector2;
}
export class EventDispatcher {
    private handlers;
    trigger(n: string, data: any): void;
    init(): void;
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
export class Flock extends Behaviour {
    neighbours: Agent[];
}
export class Geometry {
    constructor(vertices: Vector2[]);
    vertices: Vector2[];
    normals: Vector2[];
    _dynNormals: Vector2[];
    get CHOAS_CLASSNAME(): string;
    get CHAOS_OBJ_TYPE(): string;
    getNormals(rad: number, target: Vector2[]): Vector2[];
    private calcFaceNormals;
    transform(vertices: Vector2[], pos: Vector2, rad: any, n: number): void;
    toJson(): {
        vertices: any[];
    };
    fromJson(obj: any): void;
}
export class Group extends Sprite {
    constructor(sprites?: Sprite[]);
    private _children;
    get CHOAS_CLASSNAME(): string;
    get CHAOS_OBJ_TYPE(): string;
    add(sprite: Sprite | Group): void;
    remove(sprite: Sprite | Group, recursive?: boolean, index?: number): boolean;
    render(ctx: CanvasRenderingContext2D, dt: number): void;
}
export class IndexedList {
    _keys: any;
    _list: any[];
    get(name: any): any;
    push(name: any, value: any): void;
    remove(name: any): void;
    values(): any[];
}
export class Input {
    constructor(eventHandler: DOMEventHandler);
    DOMEventHandler: DOMEventHandler;
    mouse: Mouse;
    touch: Touch;
    keyboard: Keyboard;
    update(): void;
    dispose(): void;
}
export class Intergrator extends System {
    active: boolean;
    solver: typeof EulerSolver.solve;
    objects: any[];
    init(manager: any): void;
    update(dt: any): void;
}
export namespace Interpolation {
    function Linear(p0: any, p1: any, t: any): any;
    function Bernstein(n: any, i: any): any;
    function Factorial(n: any): number;
    function CatmullRom(p0: any, p1: any, p2: any, p3: any, t: any): any;
}
export class Keyboard {
    constructor(eh: DOMEventHandler);
    keys: {
        [x: string]: boolean;
    };
    private normalize;
    init(eh: DOMEventHandler): void;
    private _onDown;
    private _onUp;
}
export class Line extends Shape {
    constructor(length: number, offset: Vector2, offsetAngle: any);
    length: number;
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
export class Manager {
    private static DefaultSystem;
    constructor(options?: {});
    private _rafID;
    private _classes;
    private _componentLists;
    private _systems;
    private _coreSystems;
    private _initialized;
    playing: boolean;
    private _systemsMap;
    private _compMap;
    clock: Clock;
    private objects;
    private _accumulator;
    frameRate: number;
    perf: Perf;
    readonly loader: Loader;
    readonly events: EventDispatcher;
    private _update;
    init(): void;
    add(object: Entity): void;
    addComponent(n: string, c: Component): void;
    removeComponent(n: string, c: Component): void;
    remove(object: Entity): void;
    clear(): void;
    private RAF;
    play(): void;
    pause(): void;
    private initSystems;
    private update;
    registerSystem(n: string, sys: System, cn?: string): void;
    getSystem(n: string): System;
    unregisterSystem(n: string): void;
    setComponentList(n: string, arr?: Component[]): void;
    getComponentList(n: string): Component[];
    getEntityByComponents(comps: Array<string>, entities?: Entity[]): Entity;
    getEntitiesByComponents(comps: Array<string>, entities?: Entity[], target?: Entity[]): Entity[];
    getEntityByTags(tags: Array<string>, entities?: Entity[]): Entity;
    getEntitiesByTags(tags: string[], entities?: Entity[], target?: Entity[]): Entity[];
    query(bound: BoundingCircle | BoundingBpx): Body[];
}
export class Material {
    render(ctx: CanvasRenderingContext2D, dt: number, path?: Path2D): void;
}
export class Matrix2 {
    constructor(a?: number, b?: number, c?: number, d?: number, e?: number, f?: number);
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    setFromTransform(x: number, y: number, scaleX: number, scaleY: number, rotation: number): this;
    prepend(m: Matrix2): this;
    append(m: Matrix2): this;
    identity(): this;
    rotate(radians: number): this;
    translate(x: number, y: number): this;
    scale(x: number, y: number): this;
    transform(v: Vector2): Vector2;
    invert(): this;
    copy(m: Matrix2): this;
    clone(): Matrix2;
    equals(matrix: Matrix2): boolean;
}
export class Mouse {
    constructor(eh: DOMEventHandler);
    clickCount: number;
    dragging: boolean;
    dragLastPosition: Vector_like;
    delta: Vector_like;
    position: Vector_like;
    lastPosition: Vector_like;
    leftbutton: boolean;
    rightbutton: boolean;
    inDragBox(pos: Vector_like): boolean;
    init(eh: DOMEventHandler): void;
    private _onClick;
    private _onMove;
    private _onDown;
    private _onUp;
    private _onWheel;
    private _onContextMenu;
    update(): void;
}
declare class Movable$1 extends Component {
    constructor(x: number, y: number, a: number);
    transform: any;
    velocity: Vector2$1;
    rotation: Angle;
    acceleration: Vector2$1;
    torque: Angle;
    init(entity: any): void;
    toJson(): {
        velocity: Vector2$1;
        rotation: {
            deg: number;
            type: string | number;
        };
        acceleration: Vector2$1;
    };
    fromJson(obj: any): void;
}
export class NaiveBroadphase extends Broadphase {
    constructor(world: World);
    private bodies;
}
export class NarrowPhase {
    records: any;
    getCollisionPairs(contactList: any, clmds: any): void;
}
export namespace Overlaps {
    function AABBColliding(a: BoundingBox, b: BoundingBox): boolean;
    function boundSpheresColliding(a: BoundingCircle, b: BoundingCircle): boolean;
    function AABBvsSphere(a: BoundingBox, b: BoundingCircle): boolean;
}
export class Particle {
    constructor(pos: Vector2, radius: number, lifespan?: number);
    readonly position: Vector2;
    readonly velocity: Vector2;
    active: boolean;
    radius: number;
    color: {
        r: number;
        b: number;
        g: number;
        a: number;
    };
    private _life;
    readonly lifespan: number;
    draw(ctx: CanvasRenderingContext2D): void;
    update(ctx: CanvasRenderingContext2D, dt: number): void;
}
export class ParticleSystemSprite extends Sprite {
    constructor(initial?: number, max?: number, increment?: number);
    private _particles;
    initial: number;
    frameIncrease: number;
    max: number;
    protected initParticles(n: number): void;
    protected create(): Particle;
    init(entity: Entity): void;
    protected behavior(p: Particle, dt: number): void;
    render(ctx: CanvasRenderingContext2D, dt: number): void;
}
export class Path {
    private _points;
    private _index;
    speed: number;
    tolerance: number;
    private _lerp_t;
    private _lerpdist;
    private _way;
    private _finished;
    private _lerpedPoint;
    loop: boolean;
    add(point: Vector2): this;
    clear(): this;
    advance(): boolean;
    update(lerpdist?: number): Vector2$1;
    current(): any[];
    point(): Vector2$1;
    get path(): any[];
    draw(ctx: CanvasRenderingContext2D): void;
}
export class PathFollowing extends Behaviour {
    constructor(path: Path);
    path: Path;
    calc(target: Vector2, inv_dt: number): Vector2;
    clear(): void;
    add(point: Vector2): void;
    set loop(arg: boolean);
    get loop(): boolean;
    setPath(path: Path): void;
    draw(ctx: any): void;
}
export class Perf {
    _start: number;
    _time: number;
    start(): void;
    end(): number;
    fps(): number;
}
export class Pursuit extends Behaviour {
    init(): void;
    calc(target: Vector2): void;
}
export class QuadTreeBroadphase extends Broadphase {
    constructor(bounds: Bounds, maxdepth?: number);
    _root: Node;
    maxDepth: number;
    bounds: Bounds;
    _insert(client: any): void;
    _remove(client: any): boolean;
    remove(obj: Body): boolean;
    traverse(func: Function): any[];
    draw(ctx: CanvasRenderingContext2D): void;
    recalculateBounds(bounds: any): void;
}
export class Ray {
    constructor(origin?: Vector2$1, direction?: Vector2$1);
    maxLength: number;
    _origin: Vector2$1;
    _direction: Vector2$1;
    set direction(arg: Vector2$1);
    get direction(): Vector2$1;
    set origin(arg: Vector2$1);
    get origin(): Vector2$1;
    setOrigin(x: any, y: any): void;
    setDirection(x: any, y: any): void;
}
export type RayCastModes = number;
export namespace RayCastModes {
    let NONE: number;
    let NEAREST: number;
    let FIRST: number;
    let ANY: number;
}
export class RayCollisionResult {
    distance: number;
    object: any;
    points: any[];
    ray: any;
}
export class RaycastManager extends System {
    objects: any[];
    bodies: any;
    init(manager: any): void;
}
export class RaycastResult {
    ray: any;
    mode: number;
    collisions: any[];
}
export class Raycaster extends Component {
    constructor(number?: number, angleSpace?: number);
    rays: any[];
    initialDir: any[];
    _number: number;
    _angle: number;
    _transform: any;
    _lastangle: number;
    init(entity: any): void;
    update(bodies: any): void;
    draw(ctx: CanvasRenderingContext2D): void;
    add(): void;
}
export class Rectangle extends Shape {
    static calcInertia(mass: number, width: number, height: number): number;
    constructor(width: number, height: number, offset: Vector2, offsetAngle: number);
    height: number;
    width: number;
}
export class Renderer {
    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext);
    _rafID: number;
    private _accumulator;
    objects: Sprite[];
    perf: {
        lastTimestamp: number;
        total: number;
    };
    private domElement;
    ctx: CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext;
    camera: Camera;
    clock: Clock;
    init(manager: Manager): void;
    clear(): void;
    update(dt: number): void;
    protected RAF(): void;
    play(): void;
    pause(): void;
    bindTo(selector: string, focus?: true): void;
    add(sprite: Sprite | Group): void;
    remove(sprite: Sprite): void;
    requestFullScreen(): void;
    setViewport(w: number, h: number): void;
    set width(arg: number);
    get width(): number;
    set height(arg: number);
    get height(): number;
}
export class Renderer2D extends Renderer {
    constructor(canvas?: HTMLCanvasElement);
    frameRate: number;
    renderLast: any[];
    private _update;
    addUI(sprite: Sprite): void;
}
export class SATNarrowPhase extends NarrowPhase {
    getCollisionPairs(contactList: CollisionPair[], clmds?: Manifold[]): Manifold[];
}
export class SeekBehaviour extends Behaviour {
    constructor(target: Vector2);
    radius: number;
    target: Vector2;
}
export namespace Session {
    function set(k: string, v: any): void;
    function get(k: string): any;
    function clear(): void;
}
export class Sfx {
    constructor(handler: AudioHandler, buffer: AudioBuffer);
    private _soundBuffer;
    private _source;
    private _onended;
    private _destination;
    private _playingOffset;
    offset: number;
    loop: boolean;
    private delay;
    duration: number;
    handler: AudioHandler;
    ctx: AudioContext;
    finished: boolean;
    id: number;
    set onended(arg: any);
    play(): void;
    resume(): void;
    _startTime: number;
    pause(): void;
    disconnect(): void;
    connect(node: AudioNode): void;
}
export class Shape {
    static calcInertia(): number;
    static CIRCLE: number;
    static POLYGON: number;
    constructor(vertices: Vector2[], offset?: Vector2, offsetAngle?: number);
    readonly type: number;
    offAngle: number;
    offPosition: Vector2;
    vertices: Vector2[];
    geometry: Geometry;
    get CHOAS_CLASSNAME(): string;
    get CHAOS_OBJ_TYPE(): string;
    get area(): number;
    getNormals(shape: Shape, target?: Vector2[]): Vector2[];
    update(position: Vector2, angle: number, scale: number): void;
    angle: number;
    getVertices(axis: Vector2, target: Vector2[]): Vector2[];
    toJson(): {
        type: string;
        geometry: {
            vertices: any[];
        };
        shapwType: number;
        offset: any;
        offAngle: number;
    };
    fromJson(obj: any): void;
}
export class Signal {
    constructor(value: any);
    _listeners: any[];
    _value: any;
    set value(arg: any);
    get value(): any;
    addListener(listener: any, callOnce?: boolean): void;
    removeListener(listener: any): void;
    _detach(bindingIndex: any): void;
}
export class SpringConstraint extends Constraint {
    localA: Vector2$1;
    localB: Vector2$1;
    fixed: boolean;
    maxDistance: number;
}
export class Sprite implements Component {
    constructor(geometry: BufferGeometry, material: Material);
    private _position;
    private _orientation;
    private _scale;
    private geometry;
    private material;
    parent: Group | null;
    set angle(arg: number);
    get angle(): number;
    set position(arg: Vector2);
    get position(): Vector2;
    set orientation(arg: Angle);
    get orientation(): Angle;
    render(ctx: any, dt: any): void;
    init(entity: Entity): this;
    entity: Entity;
    toJson(): {
        pos: any;
        angle: any;
        geometry: any;
        material: any;
        parent: any;
    };
    fromJson(obj: any, renderer: any): void;
}
export class SpriteMaterial implements Material {
    constructor(img: HTMLImageElement, frames?: number, actions?: number);
    img: HTMLImageElement;
    private _index;
    private _maxFrame;
    private _frame;
    private _accumulator;
    frameRate: number;
    private _maxFrames;
    width: number;
    height: number;
    private frameWidth;
    private frameHeight;
    setup(frames: number, actions: number): void;
    setMaxFrames(action: number, max: number): void;
    setAction(index: number): void;
    render(ctx: CanvasRenderingContext2D, dt: number): void;
}
export class StaticImageMaterial implements Material {
    constructor(img: new (width?: number, height?: number) => HTMLImageElement);
    readonly image: new (width?: number, height?: number) => HTMLImageElement;
    width: number;
    height: number;
    offset: Vector_like;
    render(ctx: CanvasRenderingContext2D): void;
}
export namespace Storage {
    function set(k: string, v: any): void;
    function get(k: string): any;
    function clear(): void;
}
export class System {
    static implement(system: any): void;
    init(): void;
    update(): void;
    add(component: any): void;
    remove(component: any): void;
}
export class Touch {
    constructor(eh: DOMEventHandler);
    touches: TouchEvent[];
    clickCount: number;
    inDragBox(pos: Vector_like): boolean;
    init(eh: DOMEventHandler): void;
    private _onMove;
    private _onDown;
    private _onUp;
    update(): void;
}
declare class Transform$1 extends Component {
    constructor(x: number, y: number, a: number);
    position: Vector2$1;
    orientation: Angle;
    init(): void;
    toJson(): {
        position: Vector2$1;
        orientation: {
            deg: number;
            type: string | number;
        };
    };
    fromJson(obj: any): void;
}
export class Triangle extends Shape {
    static calcInertia(mass: any, base: any, height: any, angle: any): number;
    constructor(base: number, height: number, angle: number, offset: Vector2, offsetAngle: number);
}
export class Trigon extends Body {
    constructor(base: number, height: number, angle?: number);
    base: number;
    height: number;
    bangle: number;
}
export class Tween {
    constructor(into: any);
    _duration: number;
    _repeat: boolean;
    active: boolean;
    _to: T;
    _from: any;
    _into: any;
    _interpolationFunc: (p0: any, p1: any, t: any) => any;
    _easingFunction: (x: any) => any;
    _timeTaken: number;
    _updateFunc: typeof NoUpdateThrow;
    _next: any;
    init(entity: any): void;
    to(x: T): this;
    from(x: T): this;
    duration(t: T): this;
    repeat(): this;
    play(): void;
    stop(): void;
    onUpdate(callback: any): this;
    easing(func: any): this;
    interpolant(func: any): this;
    update(dt: any): void;
    chain(next: any): this;
}
export class TweenManager extends System {
    objects: any[];
    init(manager: any): void;
    update(dt: any): void;
}
declare var common: Readonly<{
    __proto__: any;
    appendArr: typeof appendArr;
    clearArr: typeof clearArr;
    popArr: typeof popArr;
    removeElement: typeof removeElement;
    generateID: typeof generateID;
    inheritComponent: typeof inheritComponent;
    mixin: typeof mixin;
}>;
export class Vec2 extends Vector2$1 {
    constructor(x: any, y: any);
}
export class Vector extends Vector2$1 {
    constructor(x: any, y: any);
}
declare class Vector2$1 {
    static getAbsDegBtwn(v1: Vector2, v2: Vector2): number;
    static getAbsRadBtwn(v1: Vector2, v2: Vector2): number;
    static getRadBtwn(v1: Vector2, v2: Vector2): number;
    static getDegBtwn(v1: Vector2, v2: Vector2): number;
    static fromRad(radian: number, target?: Vector2): Vector2;
    static fromDeg(degree: number, target?: Vector2): Vector2;
    static random(target?: Vector2): Vector2;
    static lerp(v1: Vector2, v2: Vector2, t: number, target?: Vector2): Vector2;
    static toDeg(v: Vector2): number;
    static toRad(v: Vector2): number;
    static readonly ZERO: Vector2;
    constructor(x: number, y: number);
    x: number;
    y: number;
    get CHOAS_CLASSNAME(): string;
    get CHAOS_OBJ_TYPE(): string;
    magnitude(): number;
    setMagnitude(length: number): void;
    magnitudeSquared(): number;
    distanceTo(v: Vector2): number;
    distanceToSquared(v: Vector2): number;
    add(v: Vector2): this;
    addScalar(n: number): this;
    sub(v: Vector2): this;
    subScalar(n: number): this;
    dot(v: Vector2): number;
    cross(v: Vector2): number;
    multiply(n: number): this;
    divide(n: number): this;
    normalize(): this;
    equals(v: Vector2): boolean;
    equalsZero(): boolean;
    normal(l?: number, target?: Vector2): Vector2;
    normalFast(target?: Vector2): Vector2;
    rotate(rad: number): this;
    toArray(target?: number[], offset?: number): number[];
    clone(): Vector2$1;
    copy(v: Vector2): this;
    set(x: number, y: number): this;
    draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): this;
    reverse(): this;
    reflect(normal: number, target?: Vector2): Vector2;
    clamp(min?: number, max?: number): this;
    toJson(): this;
    fromJson(obj: any): void;
}
export function Vector2Update(lerpFunc: Function, to: T, from: T, t: number, into: T): void;
export function Vector3Update(lerpFunc: any, to: any, from: any, t: any, into: any): void;
export class WanderBehaviour extends Behaviour {
    _theta: number;
    dtheta: number;
    _radius: number;
}
export class WebGLRenderer extends Renderer {
    constructor();
}
export class WebGPURenderer extends Renderer {
    constructor();
}
export class World {
    private count;
    protected records: Map<number, Manifold>;
    private objects;
    private fixedConstraits;
    private constraints;
    linearDamping: number;
    angularDamping: number;
    velocitySolverIterations: number;
    CLMDs: Manifold[];
    contactList: CollisionPair[];
    gravitationalAcceleration: Vector2;
    fixedFrameRate: number;
    perf: {
        lastTimestamp: number;
        total: number;
    };
    broadphase: Broadphase;
    narrowphase: NarrowPhase;
    intergrator: Intergrator;
    enableIntergrate: boolean;
    set gravity(arg: Vector2);
    get gravity(): Vector2;
    private narrowPhase;
    broadPhase(): void;
    private collisionDetection;
    private collisionResponse;
    private intergrate;
    private applyGravity;
    private updateConstraints;
    private updateBodies;
    update(delta: number): void;
    init(manager: Manager): void;
    add(object: Body | Composite | Constraint): void;
    addBody(body: Body): void;
    remove(object: Body | Composite | Constraint): void;
    removeBody(body: Body): Body;
    addConstraint(constraint: Constraint): void;
    removeContraint(constraint: Constraint): Constraint;
    addComposite(composite: Composite): void;
    removeComposite(composite: Composite): void;
    query(bound: Bounds, target?: Array<Body>): Body[];
}
export function arc(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, start: number, end: number): void;
export function bodyDebugger(manager: Manager): void;
export function circle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number): void;
export function clamp(value: number, min: number, max: number): number;
export function createEntity(x: number, y: number, a: number): Entity;
export function createManager(options?: {
    autoPlay?: boolean;
    files?: any;
    physics?: boolean;
    renderer?: boolean;
    input?: boolean;
}): Manager;
export function defaultCollisionHandler(clmds: CollisionPair[]): void;
export function defaultPrecollisionHandler(clmds: Manifold[]): void;
export function degToRad(deg: number): number;
export function drawImage(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w?: number, h?: number, ix?: number, iy?: number): void;
export function exp(x: number, e?: number): number;
export function fill(ctx: CanvasRenderingContext2D, color?: string, fillRule?: string): void;
export function fillText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number): void;
export function fpsDebugger(manager: any): void;
export function lerp(a: number, b: number, t: number): number;
export function line(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number): void;
export function map(v: number, x1: number, y1: number, x2: number, y2: number): number;
export function mixin(from: any, to: any, props?: any[]): void;
export function naturalizePair(a: number, b: number): number;
export function radToDeg(rad: number): number;
export function rand(min?: number, max?: number): number;
export function rect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number): void;
export function round(number: number, precision?: number): number;
export function sq(x: number): number;
export function sqrt(x: number): number;
export function stroke(ctx: CanvasRenderingContext2D, color?: string, width?: number): void;
export function vertices(ctx: CanvasRenderingContext2D, vertices: Vector2[], close?: boolean): void;
export function wrapAngle(x: any): any;
declare class Node {
    constructor(bounds: {
        max: Vector_like;
        min: Vector_like;
    });
    children: Node[];
    objects: Body[];
    root: Node;
    parent: Node;
    hasObjects: boolean;
    index: number;
    global: Tree;
    dims: Vector_like;
    depth: number;
    bounds: {
        max: Vector_like;
        min: Vector_like;
    };
    add(node: Node): void;
    clear(): void;
    split(depth?: number): void;
    draw(ctx: CanvasRenderingContext2D): void;
    isLeafNode(): boolean;
    childrenHaveObj(): boolean;
    intersects(bounds: Bounds): boolean;
    contains(bounds: Bounds): boolean;
    query(bounds: Bounds, target?: Body[]): Body[];
    insertObject(obj: Body): boolean;
    isInNode(position: Vector_like): boolean;
    isRootNode(): boolean;
    updateObject(obj: Body): boolean;
    removeObject(obj: Body): boolean;
    traverse<T>(func: Traverser, target: T[]): T[];
    getCollisionPairs(target: CollisionPair[], stack: CollisionPair[]): void;
}
declare function warn(message: string): void;
declare function throws(message: string): void;
declare function error(message: string): void;
declare function log(message: string): void;
declare function warnOnce(message: string): void;
declare function assert(test: boolean, errfunc: Function, message: string): boolean;
declare function deprecate(original: any, replacement?: string): void;
declare class Broadphase {
    canCollide(a: Body, b: Body): boolean;
    insert(obj: Body): void;
    remove(obj: Body): void;
    draw(ctx: any): void;
    update(bodies: Body[]): void;
    getCollisionPairs(target: CollisionPair[]): CollisionPair[];
    query(bounds: Bounds, target: Body[]): Body[];
}
declare let r: Vector2$1;
declare const a: Vector2$1;
declare function NoUpdateThrow(): void;
declare function appendArr<T>(arr1: T[], arr2: T[]): void;
declare function clearArr<T>(arr: T[]): void;
declare function popArr<T>(arr: T[], number: number): void;
declare function removeElement<T>(arr: T[], index: number): T;
declare function generateID(): number;
declare function inheritComponent(component: Function, overrideInit?: boolean, overrideUpdate?: boolean): void;
export { Bound$1 as Bound, error$1 as Err, Matrix2 as Matrix, Movable$1 as Movable, Transform$1 as Transform, common as Utils, Vector2$1 as Vector2 };
