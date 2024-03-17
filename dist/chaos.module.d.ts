export type BodyDebbuggerOptions = {
    drawBounds?: boolean;
    drawPosition?: boolean;
    drawVelocity?: boolean;
    clearRenderer?: boolean;
    drawCollisionArm?: boolean;
    drawContacts?: boolean;
    clear?: boolean;
};
export type EventHandlerFunc = (data: any) => void;
export type signalListener<T> = (value: T) => void;
export type Tuple = import("typescript").TupleType;
export type SystemFunc = (manager: Manager) => void;
export type ManagerOptions = {
    autoplay: boolean;
};
export type Plugin = {
    register: SystemFunc;
};
export type TweenUpdate<T> = (lerpFunc: LerpFunc, to: T, from: T, t: number, into: T) => void;
export type LerpFunc = (p0: number, p1: number, t: number) => number;
export type TweenPluginOptions = {
    name: string;
};
export type IntergratorFunc = (transform: Transform, movable: Movable, dt: number) => void;
export type IntergratorPluginOptions = {
    enableDamping?: boolean;
    linearDamping?: number;
    angularDamping?: number;
    intergrator?: "euler" | "verlet";
};
export type Physics2DPluginOptions = {
    enableGravity?: boolean;
    gravity?: Vector2;
    broadphase?: Broadphase;
    narrowphase?: NarrowPhase;
    intergratorOpt?: any;
};
export type Bounds = {
    max: Vector_like;
    min: Vector_like;
};
export type EasingFunc = (t: number) => number;
export type CollisionPair = {
    a: Body2D;
    b: Body2D;
};
export type Manifold = {
    bodyA: Body2D;
    bodyB: Body2D;
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
export function AABBColliding(a: BoundingBox, b: BoundingBox): boolean;
export function AABBvsSphere(a: BoundingBox, b: BoundingCircle): boolean;
export class Agent {
    static update(agent: Agent, transform: any, movable: any, inv_dt: number): void;
    static updateBehaviours(behaviours: string | any[], transform: any, movable: {
        acceleration: {
            add: (arg0: Vector2) => void;
        };
        torque: number;
    }, inv_dt: number): void;
    maxSpeed: number;
    maxTurnRate: number;
    behaviours: Behaviour[];
    add(behaviour: Behaviour): void;
    remove(behaviour: Behaviour): void;
}
export class AgentManager {
}
export class Angle {
    static copy(angle: Angle): void;
    constructor(rad?: number);
    value: number;
    set degree(x: number);
    get degree(): number;
    set radian(x: number);
    get radian(): number;
}
export function AngleUpdate(lerpFunc: LerpFunc, to: Angle, from: Angle, t: number, into: Angle): void;
export class NaiveArchTypeTable {
    list: Archetype[];
    private _createArchetype;
    private _ArcheTypeHasOnly;
    private _getArchetype;
    private _getArchetypes;
    insert(entity: Entity, components: {
        [x: string]: any;
    }): void;
    remove(entity: Entity): void;
    get(entity: Entity, compnames: string[]): any[];
    query(compnames: string[], out?: any[]): any[];
    clear(): void;
}
export class ArriveBehaviour extends Behaviour {
    constructor(target: Vector2);
    radius: number;
    target: Vector2;
    calc(position: Vector2, velocity: Vector2, target: Vector2, inv_dt: number): void;
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
    playBackgroundMusic(name: string): void;
    playEffect(name: string, offset?: number, duration?: number): void;
    createSfx(name: string): Sfx;
    pauseAll(): void;
    mute(): void;
    unmute(): void;
    remove(sfx: Sfx): void;
}
export class Ball extends Body2D {
    constructor(radius: number);
}
export class BasicMaterial implements Material {
    type: number;
    fill: string;
    stroke: string;
    wireframe: boolean;
}
export class Behaviour {
    maxSpeed: number;
    maxForce: number;
    active: boolean;
}
export class Body extends Body2D {
}
export class Body2D {
    static calculateBounds(body: Body2D, bound: BoundingBox, padding?: number): void;
    static update(body: Body2D, position: Vector2, orientation: number, scale: Vector2, bounds: BoundingBox): void;
    static setMass(body: Body2D, mass: number): void;
    static setInertia(body: Body2D, inertia: number): void;
    static setType(body: Body2D, type: number): void;
    static setDensity(body: Body2D, density: number): void;
    static readonly STATIC: number;
    static readonly DYNAMIC: number;
    constructor(shape: Shape);
    readonly id: number;
    inv_mass: number;
    inv_inertia: number;
    restitution: number;
    staticFriction: number;
    kineticFriction: number;
    boundPadding: number;
    mask: {
        layer: number;
        group: number;
    };
    readonly shape: Shape;
    allowSleep: boolean;
    sleeping: boolean;
    aabbDetectionOnly: boolean;
    collisionResponse: boolean;
    autoUpdateBound: boolean;
    set type(x: number);
    get type(): number;
    set mass(x: number);
    get mass(): number;
    set density(x: number);
    get density(): number;
    set inertia(x: number);
    get inertia(): number;
    setAnchor(v: Vector2): number;
    getAnchor(index: number): Vector2;
    getLocalAnchor(index: number, angle: number, target?: Vector2): Vector2;
}
export namespace BoundType {
    let BOX: number;
    let CIRCLE: number;
}
export class BoundingBox {
    static copy(bound: BoundingBox, out?: BoundingBox): BoundingBox;
    static translate(bound: BoundingBox, x: number, y: number, out?: BoundingBox): BoundingBox;
    static union(bound1: BoundingBox, bound2: BoundingBox, out?: BoundingBox): BoundingBox;
    constructor(minX?: number, minY?: number, maxX?: number, maxY?: number);
    type: number;
    max: Vector_like;
    min: Vector_like;
    intersects(bound: BoundingCircle | BoundingBox): boolean;
    translate(x: number, y: number): BoundingBox;
    clone(): BoundingBox;
    copy(bounds: BoundingBox): void;
}
export class BoundingCircle {
    static translate(bound: BoundingCircle, x: any, y: any, out?: BoundingCircle): BoundingCircle;
    static copy(bound: BoundingCircle, out?: BoundingCircle): BoundingCircle;
    constructor(r?: number);
    type: number;
    r: number;
    pos: Vector_like;
    intersects(bound: BoundingCircle | BoundingBox): boolean;
    translate(x: number, y: number): void;
}
export class Box extends Body2D {
    constructor(w: number, h: number);
}
export class BoxGeometry extends BufferGeometry {
    constructor(width: number, height: number);
}
export class Broadphase {
    update(_bodies: Entity[][], _bounds: BoundingBox[][]): void;
    getCollisionPairs(_target: CollisionPair[]): CollisionPair[];
    query(_bounds: Bounds, _target: Entity[]): Entity[];
}
export class Broadphase2DPlugin {
    constructor(broadphase?: Broadphase);
    broadphase: Broadphase;
    register(manager: Manager): void;
}
export class BufferGeometry {
    static initCanvas2D(geometry: BufferGeometry): void;
    static setAttribute(geometry: BufferGeometry, name: string, attribute: any[]): void;
    attributes: Record<string, any[] | undefined>;
    drawable: Path2D | null;
}
export class Camera extends Camera2D {
}
export class Camera2D {
    readonly transform: Transform;
    set position(x: Vector2);
    get position(): Vector2;
    update(): void;
}
export class Circle extends Shape {
    constructor(radius: number);
    type: number;
    get position(): Vector2;
    set radius(x: number);
    get radius(): number;
    get area(): number;
}
export class CircleGeometry extends BufferGeometry {
    constructor(radius: number);
}
export class Clock {
    static update(clock: Clock, accumulate?: number): number;
    private lastcall;
    dt: number;
    update(accumulate?: number): number;
}
export class CollisionData {
    overlap: number;
    done: boolean;
    axis: Vector2;
    tangent: Vector2;
    contactPoints: Vector2[];
    contactNo: number;
}
export class CollisionManifold<T> {
    static warmstart<T_1>(manifold: CollisionManifold<T_1>, movableA: Movable, movableB: Movable, bodyA: Body2D, bodyB: Body2D): void;
    static applyImpulse<T_2>(jacobian: Jacobian, movableA: Movable, movableB: Movable, bodyA: Body2D, bodyB: Body2D, lambda: number): void;
    static prepare<T_3>(manifold: CollisionManifold<T_3>, bodyA: Body2D, bodyB: Body2D, movableA: Movable, movableB: Movable, positionA: Vector_like, positionB: Vector_like, inv_dt: number): void;
    static solve<T_4>(manifold: CollisionManifold<T_4>, movableA: Movable, movableB: Movable, bodyA: Body2D, bodyB: Body2D): void;
    constructor(a: T, b: T);
    entityA: T;
    entityB: T;
    contactData: CollisionData;
    impulse: number[];
    tImpulse: number[];
    nbias: number[];
    nJacobian: Jacobian[];
    tJacobian: Jacobian[];
    restitution: number;
    staticFriction: number;
    kineticFriction: number;
    effectiveMass: number[];
    nLambda: number[];
    tLambda: number[];
}
export class Color {
    static random(min?: number, max?: number, out?: Color): Color;
    static set(color: Color, r: number, g: number, b: number, a?: number): Color;
    static copy(color: Color, out?: Color): Color;
    static add(color1: Color, color2: Color, out?: Color): Color;
    static sub(color1: Color, color2: Color, out?: Color): Color;
    static darken(color: Color, scale: number, out?: Color): typeof Color;
    static lighten(color: Color, scale: number, out?: Color): Color;
    static lerp(color1: Color, color2: Color, t: number, out?: Color): Color;
    constructor(r?: number, g?: number, b?: number, alpha?: number);
    set(r: number, g: number, b: number, alpha?: number): Color;
    clone(): Color;
    copy(color: Color): Color;
    add(color: Color): Color;
    r: any;
    g: any;
    b: any;
    a: any;
    darken(scale: number): Color;
    lighten(scale: number): Color;
    lerp(color: Color, alpha: number): Color;
    random(min?: number, max?: number): Color;
    toArray(array: number[], offset?: number): number[];
}
export function ColorUpdate(lerpFunc: LerpFunc, to: Color, from: Color, t: number, into: Color): void;
export class Constraint {
    constructor(body1: Body2D, body2: Body2D, localA: Vector2, localB: Vector2);
    localA: Vector2;
    localB: Vector2;
    body1: Body2D;
    body2: Body2D;
    stiffness: number;
    dampening: number;
    get physicsType(): number;
    protected behavior(body1: Body2D, body2: Body2D, dt: number): void;
    update(dt: number): void;
}
export namespace Cookies {
    export function set(n: string, v: string, maxAge?: number): void;
    export function get(n: string): string;
    function _delete(n: string): void;
    export { _delete as delete };
    export function clear(): void;
}
export const DEG2RAD: number;
export namespace DEVICE {
    let audio: boolean;
    let canvas: boolean;
    let webgl: boolean;
}
export class DOMEventHandler {
    private handlers;
    private _evHandlers;
    add(e: keyof DocumentEventMap, h: Function): number;
    remove(e: keyof DocumentEventMap, h: Function): void;
    disposeEvent(e: keyof DocumentEventMap): void;
    clear(): void;
    init(): void;
}
export class DistanceConstraint extends Constraint {
    fixed: boolean;
    maxDistance: number;
}
export namespace Easing {
    let linear: EasingFunc;
    let quadraticIn: EasingFunc;
    let quadraticOut: EasingFunc;
    let quadraticInOut: EasingFunc;
    let cubicIn: EasingFunc;
    let cubicOut: EasingFunc;
    let cubicInOut: EasingFunc;
    let quarticIn: EasingFunc;
    let quarticOut: EasingFunc;
    let quarticInOut: EasingFunc;
    let quinticIn: EasingFunc;
    let quinticOut: EasingFunc;
    let quinticInOut: EasingFunc;
    let sinusoidalIn: EasingFunc;
    let sinusoidalOut: EasingFunc;
    let sinusoidalInOut: EasingFunc;
    let exponentialIn: EasingFunc;
    let exponentialOut: EasingFunc;
    let exponentialInOut: EasingFunc;
    let circularIn: EasingFunc;
    let circularOut: EasingFunc;
    let circularInOut: EasingFunc;
    let elasticIn: EasingFunc;
    let elasticOut: EasingFunc;
    let elasticInOut: EasingFunc;
    let backIn: EasingFunc;
    let backOut: EasingFunc;
    let backInOut: EasingFunc;
    let bounceIn: EasingFunc;
    let bounceOut: EasingFunc;
    let bounceInOut: EasingFunc;
}
export class Entity {
    index: number;
    archIndex: number;
    get CHAOS_OBJ_TYPE(): string;
    get CHAOS_CLASSNAME(): string;
}
export class EvadeBehaviour extends Behaviour {
    constructor(pursuer: Vector2);
    radius: number;
    pursuer: Vector2;
    calc(position: Vector2, velocity: Vector2, target: Vector2, inv_dt: number): void;
}
export class EventDispatcher {
    private handlers;
    private events;
    trigger(n: string, data: any): void;
    add(name: string, handler: EventHandlerFunc): void;
    addEvent(n: string, data: any): void;
    getEvent(n: string): any;
    clear(): void;
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
    calc(target: Vector2, inv_dt: number): void;
}
export class Geometry {
    static getNormals(geometry: Geometry, angle: number, out?: Vector2[]): Vector2[];
    static calcFaceNormals(vertices: Vector2[]): Vector2[];
    static transform(vertices: Vector2[], pos: Vector2, angle: number, scale: Vector2, out: Vector2[]): void;
    constructor(vertices: Vector2[]);
    vertices: Vector2[];
    normals: Vector2[];
    _dynNormals: Vector2[];
}
export class Group extends Sprite<any, any> {
    constructor(sprites?: Sprite<any, any>[]);
    private _children;
    private parent;
    add(sprite: Sprite<any, any> | Group): void;
    remove(sprite: Sprite<any, any> | Group, recursive?: boolean, index?: number): boolean;
    render(ctx: CanvasRenderingContext2D, dt: number): void;
}
export const HALF_PI: number;
export class ImageLoader extends Loader<{
    buffer: ArrayBuffer;
    dimensions: Vector_like;
}> {
    constructor(manager?: LoadManager);
}
export class IndexedList<T> {
    private _keys;
    _actualKeys: string[];
    private _list;
    get(name: string): T;
    set(name: string, value: T): void;
    remove(name: string): void;
    keys(): string[];
    values(): T[];
    has(name: string): any;
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
export class Intergrator2DPlugin {
    constructor(options?: IntergratorPluginOptions);
    options: IntergratorPluginOptions;
    register(manager: Manager): void;
}
export namespace Interpolation {
    function Linear(p0: number, p1: number, t: number): number;
    function Bernstein(n: number, i: number): number;
    function Factorial(n: number): number;
    function CatmullRom(p0: number, p1: number, p2: number, p3: number, t: number): number;
    function cosine(p0: number, p1: number, t: number): number;
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
    constructor(length: number);
}
export class LineGeometry extends BufferGeometry {
    constructor(length: number);
}
export class LoadManager {
    static itemStart(manager: LoadManager, url: string): void;
    static itemFinish(manager: LoadManager, request: Response): void;
    static finish(manager: LoadManager): void;
    static itemError(manager: LoadManager, request: Response): void;
    _total: number;
    _sucessful: number;
    _failed: number;
    onItemFinish: typeof NOOP;
    onItemStart: typeof NOOP;
    onItemError: typeof NOOP;
    onFinish: typeof NOOP;
    onError: typeof NOOP;
}
export class Loader<T> {
    constructor(manager?: LoadManager);
    _resources: {
        [x: string]: T;
    };
    manager: LoadManager;
    baseUrl: string;
    name(): any;
    verify(_extension: string): boolean;
    parse(_request: Response): Promise<T | undefined>;
    load(url: string): Promise<void>;
    get(name: string): T;
}
export namespace Logger {
    function warn(message: string): void;
    function throws(message: string): never;
    function error(message: string): void;
    function log(message: string): void;
    function warnOnce(message: string): void;
    function assert(test: boolean, message: string, errfunc?: (message: string) => void): boolean;
    function deprecate(original: string, replacement?: string): void;
}
export class Manager {
    constructor(options?: ManagerOptions);
    private _rafID;
    private _table;
    private _systems;
    private _initialized;
    private _resources;
    playing: boolean;
    private clock;
    private _accumulator;
    frameRate: number;
    readonly events: EventDispatcher;
    private _update;
    init(): void;
    create(components: Record<string, any>): Entity;
    remove(entity: Entity): void;
    get<T>(entity: Entity, ...compNames: string[]): T;
    set<T_1>(entity: Entity, components: T_1): void;
    query<T_2>(...compNames: string[]): Query<T_2>;
    queryEvent(name: string): any;
    getResource<T_3>(name: string): T_3;
    setResource<T_4>(name: string, resource: T_4): void;
    clear(): void;
    private RAF;
    play(): void;
    pause(): void;
    private update;
    registerSystem(sys: SystemFunc): void;
    registerPlugin(plugin: Plugin): void;
}
export class Material {
    static render(material: Material, ctx: CanvasRenderingContext2D, dt: number, path?: Path2D): void;
    type: number;
}
export class Matrix3x2 {
    static setFromTransform(matrix: Matrix3x2, x: number, y: number, angle: number, scaleX: number, scaleY: number): Matrix3x2;
    static multiply(m1: Matrix3x2, m2: Matrix3x2, out?: Matrix3x2): Matrix3x2;
    static identity(out?: Matrix3x2): Matrix3x2;
    static rotate(matrix: Matrix3x2, angle: number, out?: Matrix3x2): Matrix3x2;
    static translate(matrix: Matrix3x2, x: any, y: any, out?: Matrix3x2): Matrix3x2;
    static scale(matrix: Matrix3x2, x: number, y: number, out?: Matrix3x2): Matrix3x2;
    static transformVector2(matrix: Matrix3x2, v: Vector_like, out?: Vector2): Vector2;
    static invert(matrix: Matrix3x2, out?: Matrix3x2): Matrix3x2;
    static copy(matrix: Matrix3x2, out?: Matrix3x2): Matrix3x2;
    constructor(a?: number, b?: number, c?: number, d?: number, e?: number, f?: number);
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    setFromTransform(x: number, y: number, scaleX: number, scaleY: number, rotation: number): this;
    prepend(m: Matrix3x2): this;
    append(m: Matrix3x2): this;
    rotate(radians: number): this;
    identity(): this;
    translate(x: number, y: number): this;
    scale(x: number, y: number): this;
    transform(v: Vector2): Vector2;
    invert(): this;
    copy(m: Matrix3x2): this;
    clone(): Matrix3x2;
    equals(matrix: Matrix3x2): boolean;
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
export class Movable {
    constructor(x?: number, y?: number, a?: number);
    velocity: Vector2;
    rotation: number;
    acceleration: Vector2;
    torque: number;
    applyForce(force: Vector2, inv_mass: number, inv_inertia: number, arm?: Vector2): void;
    applyImpulse(impulse: Vector2, inv_mass: number, inv_inertia: number, arm?: Vector2): void;
}
export class NaiveBroadphase extends Broadphase {
    private entities;
    private bounds;
    query(bound: BoundingBox, target?: Entity[]): Entity[];
    getCollisionPairs(target?: CollisionPair[]): CollisionPair[];
}
export class NarrowPhase {
    static canCollide(a: Body2D, b: Body2D): boolean;
    getCollisionPairs(_manager: Manager, _contactList: CollisionPair[], _clmds?: CollisionManifold<Entity>[]): CollisionManifold<Entity>[];
}
export class Narrowphase2DPlugin {
    constructor(narrowphase?: NarrowPhase);
    narrowphase: NarrowPhase;
    register(manager: Manager): void;
}
export class Noise {
    constructor(seed?: number);
    seed: number;
    get1D(x: number): number;
    get2D(x: number, y: number): number;
}
export const PI: number;
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
    private advance;
    update(lerpdist?: number): Vector2;
    current(): Vector2[];
    point(): Vector2;
    get path(): Vector2[];
    draw(ctx: CanvasRenderingContext2D): void;
}
export class PathFollowing extends Behaviour {
    constructor(path: Path);
    path: Path;
    calc(position: Vector2, velocity: Vector2, target: Vector2, inv_dt: number): Vector2;
    clear(): void;
    add(point: Vector2): void;
    set loop(x: boolean);
    get loop(): boolean;
    setPath(path: Path): void;
}
export class Perf {
    _start: number;
    _time: number;
    start(): void;
    end(): number;
    fps(): number;
}
export class Physics2DPlugin {
    constructor(options?: Physics2DPluginOptions);
    gravity: Vector2;
    enableGravity: true;
    broadphase: Broadphase2DPlugin;
    narrowphase: Narrowphase2DPlugin;
    intergrator: Intergrator2DPlugin;
    register(manager: Manager): void;
}
export class Pool<T> {
    constructor(number: number, create: () => T);
    _pool: T[];
    _create: () => T;
    set size(x: number);
    get size(): number;
    give(): T;
    take(obj: T): void;
    protected create(): {};
}
export class Pursuit extends Behaviour {
    calc(target: Vector2, inv_dt: number): void;
}
export class Query<T> {
    constructor(...componentTypes: string[]);
    type: string[];
    number: number;
    components: T | null;
    raw(): T;
    each(callback: (comp: T) => void): void;
}
export const RAD2DEG: number;
export class Ray {
    constructor(origin?: Vector2, direction?: Vector2);
    maxLength: number;
    private _origin;
    private _direction;
    set direction(x: Vector2);
    get direction(): Vector2;
    set origin(x: Vector2);
    get origin(): Vector2;
    setOrigin(x: number, y: number): void;
    setDirection(x: number, y: number): void;
    lookAt(x: number, y: number): void;
}
export type RayCastModes = number;
export namespace RayCastModes {
    let NONE: number;
    let NEAREST: number;
    let FIRST: number;
    let ANY: number;
}
export class RayCollisionResult<T> {
    constructor(object: T);
    object: T;
    readonly points: RayPoint[];
}
export class RayPoint {
    constructor(point: Vector2, distance: number);
    point: Vector2;
    distance: number;
}
export class Raycast2D {
    static castToBody<T>(ray: Ray, body: Body2D, value: T): RayCollisionResult<T>;
    static cast<T_1 extends Shape, U>(ray: Ray, shape: T_1, value: U, results?: RayCollisionResult<U>): RayCollisionResult<U>;
    static testCircle<T_2>(ray: Ray, position: Vector_like, radius: number, results: RayCollisionResult<T_2>): RayCollisionResult<T_2>;
    static testVertices<T_3>(ray: Ray, vertices: Vector2[], result: RayCollisionResult<T_3>): RayCollisionResult<T_3>;
}
export class Rectangle extends Shape {
    constructor(width: number, height: number);
}
export class Renderer {
    static bindTo(renderer: Renderer, selector: string, focus?: boolean): void;
    static requestFullScreen(renderer: Renderer): Promise<void>;
    static setViewport(renderer: Renderer, w: number, h: number): void;
    constructor(canvas: HTMLCanvasElement);
    domElement: HTMLCanvasElement;
    camera: Camera2D;
    set width(x: number);
    get width(): number;
    set height(x: number);
    get height(): number;
}
export class Renderer2D extends Renderer {
    static clear(renderer: Renderer2D): void;
    static render<T extends BufferGeometry, U extends Material>(ctx: CanvasRenderingContext2D, sprite: Sprite<T, U>, position: Vector2, orientation: number, scale: Vector2, dt: number): void;
    constructor(canvas?: HTMLCanvasElement, context?: CanvasRenderingContext2D);
    ctx: CanvasRenderingContext2D;
    bindTo(selector: string, focus?: boolean): void;
    setViewport(x: number, y: number): void;
    clear(): void;
}
export class Renderer2DPlugin {
    constructor(renderer?: Renderer2D);
    renderer: Renderer2D;
    camera: Camera2D;
    register(manager: Manager): void;
    setViewport(width: number, height: number): void;
    bindTo(selector: string): void;
}
export class SATNarrowphase extends NarrowPhase {
    static shapesInBodyCollided(body1: Body2D, body2: Body2D, manifold: CollisionData): CollisionData;
    static shapesCollided(shapeA: Shape, shapeB: Shape, target: CollisionData): void;
    static projectShapesToAxes(shapeA: Shape, shapeB: Shape, axes: Vector_like[], manifold: CollisionData): CollisionData;
    static projectVerticesToAxis(vertices: Vector_like[], axis: Vector_like, target: {
        min: any;
        max: any;
    }): {
        min: any;
        max: any;
    };
    static findNearSupports(vertices: Vector2[], axis: Vector2, target?: Vector2[]): Vector2[];
    static shapeContains(shape: Shape, point: Vector2): boolean;
    static circleContains(position: Vector2, radius: number, point: Vector2): boolean;
    static verticesContain(vertices: Vector2[], point: Vector2): boolean;
    clmdrecord: any;
}
export const SQRT2: number;
export class SeekBehaviour extends Behaviour {
    constructor(target: Vector2);
    radius: number;
    target: Vector2;
    calc(position: Vector2, velocity: Vector2, target: Vector2, inv_dt: number): void;
}
export namespace Session {
    function set(k: string, v: any): void;
    function get<T>(k: string): T;
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
    _startTime: number;
    finished: boolean;
    id: number;
    set onended(x: Function);
    play(): void;
    resume(): void;
    pause(): void;
    disconnect(): void;
    connect(node: AudioNode): void;
}
export class Shape {
    static getNormals(shape: Shape, refshape: Shape, out?: Vector2[]): Vector2[];
    static update<T extends Shape>(shape: T, position: Vector2, angle: number, scale: Vector2): void;
    static getVertices<T_1 extends Shape>(shape: T_1, axis: Vector2, out?: Vector2[]): Vector2[];
    static getArea(shape: Shape): number;
    static calcInertia(shape: Shape, mass: number): number;
    static CIRCLE: number;
    static POLYGON: number;
    constructor(vertices: Vector2[]);
    readonly type: number;
    angle: number;
    vertices: Vector2[];
    geometry: Geometry;
}
export class Signal<T> {
    constructor(value: T);
    _listeners: signalListener<T>[];
    _value: T;
    set value(x: T);
    get value(): T;
    addListener(listener: signalListener<T>, callOnce?: boolean): void;
    removeListener(listener: signalListener<T>): void;
    private _detach;
}
export class SoundLoader extends Loader<{
    buffer: ArrayBuffer;
}> {
    constructor(manager?: LoadManager);
}
export class SpringConstraint extends Constraint {
    fixed: boolean;
    maxDistance: number;
}
export class Sprite<T extends BufferGeometry, U extends Material> {
    static render<T_1 extends BufferGeometry, U_1 extends Material>(ctx: CanvasRenderingContext2D, sprite: Sprite<T_1, U_1>, position: Vector2, orientation: number, scale: Vector2, dt: number): void;
    constructor(geometry: T, material: U);
    private geometry;
    private material;
}
export class SpriteMaterial implements Material {
    constructor(img: HTMLImageElement, frames?: number, actions?: number);
    type: number;
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
}
export class StaticImageMaterial implements Material {
    constructor(img: new (width?: number, height?: number) => HTMLImageElement, width?: number, height?: number);
    type: number;
    readonly image: new (width?: number, height?: number) => HTMLImageElement;
    width: number;
    height: number;
    offset: Vector_like;
}
export namespace Storage {
    function set(k: string, v: any): void;
    function get<T>(k: string): T;
    function clear(): void;
}
export const TWO_PI: number;
export class TextMaterial extends Material {
    constructor(text: string);
    text: string;
    center: boolean;
    color: string;
    fill: boolean;
    font: string;
}
export class Touch {
    constructor(eh: DOMEventHandler);
    touches: TouchEvent[];
    clickCount: number;
    init(eh: DOMEventHandler): void;
    private _onMove;
    private _onDown;
    private _onUp;
    update(): void;
}
export class Transform {
    constructor(x?: number, y?: number, a?: number);
    position: Vector2;
    orientation: number;
    scale: Vector2;
}
export class Triangle extends Shape {
    constructor(base: number, height: number, angle: number);
}
export class TriangleGeometry extends BufferGeometry {
    constructor(base: number, height: number, angle?: number);
}
export class Trigon extends Body2D {
    constructor(base: number, height: number, angle?: number);
}
export class Tween<T> {
    static update<U>(tween: Tween<U>, dt: number): void;
    constructor(to: T, from: T, into: T);
    _duration: number;
    _repeat: boolean;
    active: boolean;
    private _to;
    private _from;
    private _into;
    private _interpolationFunc;
    private _easingFunction;
    private _timeTaken;
    private _updateFunc;
    private _next;
    to(x: T): this;
    from(x: T): this;
    duration(t: number): this;
    repeat(): this;
    play(): void;
    stop(): void;
    onUpdate(callback: TweenUpdate<T>): this;
    easing(callback: EasingFunc): this;
    interpolant(callback: LerpFunc): this;
    chain(next: Tween<T>): this;
}
export class TweenPlugin<T> {
    constructor(name: any);
    name: any;
    register(manager: {
        setResource: (arg0: any, arg1: never[]) => void;
        registerSystem: (arg0: (manager: any) => void) => void;
    }): void;
}
declare var common: Readonly<{
    __proto__: any;
    appendArr: typeof appendArr;
    clearArr: typeof clearArr;
    generateID: typeof generateID;
    mixin: typeof mixin;
    popArr: typeof popArr;
    removeElement: typeof removeElement;
}>;
export class Vec2 extends Vector2 {
    constructor(x: number, y: number);
}
export class Vector extends Vector2 {
    constructor(x: number, y: number);
}
export class Vector2 {
    static magnitudeSquared(v: Vector_like): number;
    static magnitude(v: Vector_like): number;
    static setMagnitude(v: Vector_like, length: number, out?: Vector2): Vector2;
    static distanceTo(v1: Vector_like, v2: Vector_like): number;
    static distanceToSquared(v1: Vector_like, v2: Vector_like): number;
    static add(v1: Vector_like, v2: Vector_like, out?: Vector_like): Vector_like;
    static addScalar(v1: Vector_like, n: number, out?: Vector_like): Vector_like;
    static sub(v1: Vector_like, v2: Vector_like, out?: Vector_like): Vector_like;
    static subScalar(v1: Vector_like, n: number, out?: Vector_like): Vector_like;
    static multiply(v1: Vector_like, v2: Vector_like, out?: Vector_like): Vector_like;
    static multiplyScalar(v1: Vector_like, n: number, out?: Vector_like): Vector_like;
    static divide(v1: Vector_like, v2: Vector_like, out?: Vector_like): Vector_like;
    static divideScalar(v1: Vector_like, n: number, out?: Vector_like): Vector_like;
    static dot(v1: Vector_like, v2: Vector_like): number;
    static cross(v1: Vector_like, v2: Vector_like): number;
    static crossScalar(v1: Vector_like, n: number, out?: Vector_like): Vector_like;
    static normalize(v: Vector_like, out?: Vector_like): Vector_like;
    static equal(v1: Vector_like, v2: Vector_like): boolean;
    static absEqual(v1: Vector_like, v2: Vector_like): boolean;
    static equalsZero(v: Vector_like): boolean;
    static normal(v: Vector_like, out?: Vector_like): Vector_like;
    static rotate(v: Vector_like, angle: number, out?: Vector_like): Vector_like;
    static rotateFast(v: Vector_like, cos: number, sin: number, out?: Vector_like): Vector_like;
    static copy(v: Vector_like, out?: Vector_like): Vector_like;
    static set(v: Vector_like, x: number, y: number): Vector_like;
    static reverse(v: Vector_like, out?: Vector_like): Vector_like;
    static reflect(v: Vector_like, normal: Vector_like, out?: Vector_like): Vector_like;
    static clampMagnitude(v: Vector_like, min: number, max: number, out: Vector_like): Vector_like;
    static getAbsDegBtwn(v1: Vector2, v2: Vector2): number;
    static getAbsAngleBetween(v1: Vector2, v2: Vector2): number;
    static getAngleBetween(v1: Vector2, v2: Vector2): number;
    static getDegBtwn(v1: Vector2, v2: Vector2): number;
    static fromAngle(radian: number, out?: Vector2): Vector2;
    static random(out?: Vector2): Vector2;
    static lerp(v1: Vector2, v2: Vector2, t: number, out?: Vector2): Vector2;
    static toAngle(v: Vector2): number;
    static readonly ZERO: Vector2;
    constructor(x?: number, y?: number);
    x: number;
    y: number;
    magnitudeSquared(): number;
    magnitude(): number;
    setMagnitude(length: number): this;
    distanceTo(v: Vector2): number;
    distanceToSquared(v: Vector2): number;
    add(v: Vector2): this;
    addScalar(n: number): this;
    sub(v: Vector2): this;
    subScalar(n: number): this;
    multiply(n: number): this;
    rotateFast(cos: number, sin: number): this;
    toArray(target?: number[], offset?: number): number[];
    clone(): Vector_like;
    copy(v: Vector2): this;
    set(x: number, y: number): this;
    reflect(normal: Vector2, target?: Vector2): Vector2;
    clamp(min?: number, max?: number): this;
    dot(v: Vector2): number;
    cross(v: Vector2): number;
    normalize(): this;
    normal(l?: number, target?: Vector2): Vector2;
    normalFast(target?: Vector2): Vector2;
    rotate(rad: number): this;
    divide(n: number): this;
    equals(v: Vector2): boolean;
    equalsZero(): boolean;
    reverse(): this;
}
export function Vector2Update(lerpFunc: LerpFunc, to: Vector2, from: Vector2, t: number, into: Vector2): void;
export function Vector3Update(lerpFunc: LerpFunc, to: T, from: T, t: number, into: T): void;
export class WanderBehaviour extends Behaviour {
    _theta: number;
    dtheta: number;
    _radius: number;
    calc(velocity: Vector2, target: Vector2, inv_dt: number): Vector2;
}
export class WebGLRenderer extends Renderer {
    constructor();
}
export class WebGPURenderer extends Renderer {
    constructor();
}
export class World extends World2D {
    constructor(...args: any[]);
}
export class World2D {
    static narrowPhase(manager: any, world: World2D, contactList: CollisionPair[]): CollisionManifold<Entity>[];
    static broadPhase(world: World2D): CollisionPair[];
    static collisionDetection(manager: any, world: World2D): void;
    static collisionResponse(manager: Manager, world: World2D, CLMDs: string | any[], dt: number): void;
    static applyGravity(gravity: Vector2, movable: Movable[][], bodies: Body2D[][]): void;
    static updateBodies(transform: Transform[][], bounds: BoundingBox[][], bodies: Body2D[][]): void;
    static update(manager: Manager, world: World2D, entities: Entity[][], transform: Transform[][], movable: Movable[][], bounds: BoundingBox[][], bodies: Body2D[][], dt: number): void;
    CLMDs: CollisionManifold<Entity>[];
    contactList: CollisionPair[];
    gravitationalAcceleration: Vector2;
    fixedFrameRate: number;
    broadphase: Broadphase;
    narrowphase: NarrowPhase;
    set gravity(x: Vector2);
    get gravity(): Vector2;
    query<T extends Entity>(bound: Bounds, out?: T[]): T[];
}
export function applyGravity(manager: Manager): void;
export function arc(ctx: CanvasRenderingContext2D | Path2D, x: number, y: number, r: number, start: number, end: number): void;
export function assert(test: boolean, message: string, errfunc?: (message: string) => void): boolean;
export function bodyDebugger(manager: Manager, options?: BodyDebbuggerOptions): void;
export function boundSpheresColliding(a: BoundingCircle, b: BoundingCircle): boolean;
export function boundsColliding(bound1: BoundingBox | BoundingCircle, bound2: BoundingCircle | BoundingBox): boolean;
export function circle(ctx: CanvasRenderingContext2D | Path2D, x: number, y: number, r: number): void;
export function clamp(value: number, min: number, max: number): number;
export function collisionResponse(manager: Manager): void;
export function createEntity(x: number, y: number, a: number): Entity;
export function createManager(options?: {
    autoPlay?: boolean;
    physics?: boolean;
    renderer?: boolean;
    input?: boolean;
}): void;
export function dampenVelocity(manager: Manager): void;
export function defaultCollisionHandler(clmds: Manifold[]): void;
export function defaultPrecollisionHandler(clmds: CollisionPair[]): void;
export function degToRad(deg: number): number;
export function deprecate(original: string, replacement?: string): void;
export function drawImage(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w?: number, h?: number, ix?: number, iy?: number, dw?: number, dh?: number): void;
export const epilson: number;
export function error(message: string): void;
export function exp(x: number, e?: number): number;
export function fill(ctx: CanvasRenderingContext2D, color?: string, fillRule?: CanvasFillRule): void;
export function fillText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number): void;
export function fpsDebugger(manager: Manager): void;
export function lerp(a: number, b: number, t: number): number;
export function line(ctx: CanvasRenderingContext2D | Path2D, x1: number, y1: number, x2: number, y2: number): void;
export function log(message: string): void;
export function map(v: number, x1: number, y1: number, x2: number, y2: number): number;
export function mixin(from: any, to: any, props?: string[]): void;
export function naivebroadphaseUpdate(manager: Manager): void;
export function naturalizePair(a: number, b: number): number;
export function radToDeg(rad: number): number;
export function rand(min?: number, max?: number): number;
export function raycastDebugger(manager: Manager): void;
export function rect(ctx: CanvasRenderingContext2D | Path2D, x: number, y: number, w: number, h: number): void;
export function round(number: number, precision?: number): number;
export function satNarrowphaseUpdate(manager: Manager): void;
export function sq(x: number): number;
export function sqrt(x: number): number;
export function stroke(ctx: CanvasRenderingContext2D, color?: string, width?: number): void;
export function throws(message: string): void;
export function updateBodies(manager: Manager): void;
export function updateTransformEuler(manager: Manager): void;
export function updateTransformVerlet(manager: Manager): void;
export function vertices(ctx: CanvasRenderingContext2D | Path2D, vertices: Vector2[], close?: boolean): void;
export function warn(message: string): void;
export function warnOnce(message: string): void;
export function wrapAngle(x: number): number;
declare class Archetype {
    entities: Entity[];
    components: Map<string, any>;
    keys: string[];
    insert(entity: Entity, components: {
        [x: string]: any;
    }): number | void;
    remove(entity: Entity): void;
    get(entity: Entity, compnames: {
        [x: string]: any;
    }): any[];
    setComponentList(name: string, list: any[]): void;
    getComponentLists(name: string): any;
    hasComponentList(name: string): any;
}
declare class Jacobian {
    constructor(va?: Vector_like, vb?: Vector_like, wa?: number, wb?: number);
    va: Vector2;
    wa: number;
    vb: Vector2;
    wb: number;
    set(va?: Vector_like, vb?: Vector_like, wa?: number, wb?: number): void;
}
declare function NOOP(..._args: any): void;
declare function appendArr<T>(arr1: T[], arr2: T[]): void;
declare function clearArr<T>(arr: T[]): void;
declare function generateID(): number;
declare function popArr<T>(arr: T[], number: number): void;
declare function removeElement<T>(arr: T[], index: number): T;
export { NaiveArchTypeTable as ArchetypeTable, common as Utils };
