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
    overlap: number;
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
export class Agent implements Component {
    position: Vector;
    velocity: Vector;
    acceleration: Vector;
    orientation: Angle;
    rotation: Angle;
    maxSpeed: number;
    maxTurnRate: number;
    private behaviours;
    init(entity: Entity): void;
    entity: Entity;
    add(behaviour: Behaviour): void;
    remove(behaviour: Behaviour): void;
    update(inv_dt: number): void;
    draw(ctx: CanvasRenderingContext2D): void;
}
export class AgentManager {
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
    private _deg;
    private _rad;
    get CHOAS_CLASSNAME(): string;
    get CHAOS_OBJ_TYPE(): string;
    set degree(arg: number);
    get degree(): number;
    set radian(arg: number);
    get radian(): number;
    copy(angle: Angle): void;
    fromJSON(obj: any): void;
    toJson(): {
        deg: number;
        type: string | number;
    };
}
export class ArriveBehaviour extends Behaviour {
    constructor(target: Vector);
    radius: number;
    target: Vector;
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
    position: Vector;
    velocity: Vector;
    maxSpeed: number;
    maxForce: number;
    active: boolean;
    init(agent: Agent): void;
    calc(target: Vector, inv_dt: number): void;
    draw(renderer: Renderer): void;
}
export class Body implements Component {
    static STATIC: number;
    static KINEMATIC: number;
    static DYNAMIC: number;
    constructor(...shapes: Shape[]);
    id: number;
    private _position;
    private _velocity;
    private _acceleration;
    private _orientation;
    private _rotation;
    private _mass;
    private _inertia;
    private _type;
    private _localanchors;
    private anchors;
    lastPosition: Vector;
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
    get CHOAS_CLASSNAME(): string;
    get CHAOS_OBJ_TYPE(): string;
    set acceleration(arg: Vector);
    get acceleration(): Vector;
    set velocity(arg: Vector);
    get velocity(): Vector;
    set rotation(arg: Angle);
    get rotation(): Angle;
    set angle(arg: number);
    get angle(): number;
    set density(arg: number);
    get density(): number;
    set position(arg: Vector);
    get position(): Vector;
    set orientation(arg: Angle);
    get orientation(): Angle;
    set angularVelocity(arg: number);
    get angularVelocity(): number;
    setAnchor(v: Vector): number;
    getAnchor(index: number): Vector;
    getLocalAnchor(index: number, target?: Vector): Vector;
    applyForce(force: Vector, arm?: Vector): void;
    init(entity: Entity | null, composited?: boolean): void;
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
    render(ctx: CanvasRenderingContext2D, dt: number): void;
    private _drawVelocity;
    private _drawBound;
    private _drawShapes;
    init(parent: Entity): void;
}
export class Bound extends Component implements Component {
    bounds: BoundingBox | BoundingCircle;
    entity: any;
    toJson(): {
        bounds: {
            posX: number;
            posY: number;
            minX: number;
            minY: number;
            maxX: number;
            maxY: number;
        } | {
            posX: number;
            posY: number;
            r: number;
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
    update(pos: Vector): void;
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
    constructor(vertices: Vector[]);
    readonly vertices: Vector[];
    drawable: Path2D | WebGLVertexArrayObject;
    init(ctx: CanvasRenderingContext2D): void;
}
export class CamController {
    constructor(camera: Camera);
    readonly offset: Vector;
    transform: Transform;
    targetPosition: any;
    targetOrientation: Angle;
    follow(position: Vector, orientation?: Angle): void;
    followEntity(entity: Entity): void;
    setOffset(x: number, y: number): void;
    init(): void;
    update(): void;
}
export class Camera {
    readonly transform: Transform;
    set position(arg: Vector);
    get position(): Vector;
    update(): void;
}
export class Circle extends Shape {
    static calcInertia(mass: number, radius: number): number;
    constructor(radius: number, offset: Vector, offsetAngle: number);
    radius: number;
    vertices: {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): any;
        addScalar(n: number): any;
        sub(v: any): any;
        subScalar(n: number): any;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): any;
        divide(n: number): any;
        normalize(): any;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): any;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): any;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): any;
        reverse(): any;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): any;
        toJson(): any;
        fromJspn(obj: any): void;
    }[];
    type: number;
    get position(): {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): any;
        addScalar(n: number): any;
        sub(v: any): any;
        subScalar(n: number): any;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): any;
        divide(n: number): any;
        normalize(): any;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): any;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): any;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): any;
        reverse(): any;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): any;
        toJson(): any;
        fromJspn(obj: any): void;
    };
    toJson(): {
        radius: number;
        offset: Vector;
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
    delta: number;
}
export class Component {
    static fromJson(): void;
    static toJson(): void;
    entity: Entity | null;
    destroy(): void;
    get CHOAS_CLASSNAME(): string;
    get CHAOS_OBJ_TYPE(): string;
    init(entity: Entity): void;
    update(dt: number): void;
    get(n: string): any;
    requires(...names: string[]): void;
    query(bound: CircleBounding | BoxBounding, target?: Entity): Entity[];
}
export class Composite {
    entity: Entity | null;
    bodies: Body[];
    constraints: Constraint[];
    get physicsType(): number;
    init(entity: Entity | null): void;
    add(object: Constraint | Body): number;
    update(): void;
    set acceleration(arg: Vector);
    get acceleration(): Vector;
    set velocity(arg: Vector);
    get velocity(): Vector;
    set angle(arg: number);
    get angle(): number;
    set mass(arg: number);
    get mass(): number;
    set density(arg: number);
    get density(): number;
    set position(arg: Vector);
    get position(): Vector;
    set orientation(arg: number);
    get orientation(): number;
    set angularVelocity(arg: number);
    get angularVelocity(): number;
}
export class Constraint {
    constructor(body1: Body, body2: Body, localA: Vector, localB: Vector);
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
    namespace Linear {
        function In(x: any): any;
        function Out(x: any): any;
        function InOut(x: any): any;
    }
    namespace Quadratic {
        export function In_1(x: any): number;
        export { In_1 as In };
        export function Out_1(x: any): number;
        export { Out_1 as Out };
        export function InOut_1(x: any): number;
        export { InOut_1 as InOut };
    }
    namespace Cubic {
        export function In_2(x: any): number;
        export { In_2 as In };
        export function Out_2(x: any): number;
        export { Out_2 as Out };
        export function InOut_2(x: any): number;
        export { InOut_2 as InOut };
    }
    namespace Quartic {
        export function In_3(x: any): number;
        export { In_3 as In };
        export function Out_3(x: any): number;
        export { Out_3 as Out };
        export function InOut_3(x: any): number;
        export { InOut_3 as InOut };
    }
    namespace Quintic {
        export function In_4(x: any): number;
        export { In_4 as In };
        export function Out_4(x: any): number;
        export { Out_4 as Out };
        export function InOut_4(x: any): number;
        export { InOut_4 as InOut };
    }
    namespace Sinusoidal {
        export function In_5(x: any): number;
        export { In_5 as In };
        export function Out_5(x: any): number;
        export { Out_5 as Out };
        export function InOut_5(x: any): number;
        export { InOut_5 as InOut };
    }
    namespace Exponential {
        export function In_6(x: any): number;
        export { In_6 as In };
        export function Out_6(x: any): number;
        export { Out_6 as Out };
        export function InOut_6(x: any): number;
        export { InOut_6 as InOut };
    }
    namespace Circular {
        export function In_7(x: any): number;
        export { In_7 as In };
        export function Out_7(x: any): number;
        export { Out_7 as Out };
        export function InOut_7(x: any): number;
        export { InOut_7 as InOut };
    }
    namespace Elastic {
        export function In_8(x: any): number;
        export { In_8 as In };
        export function Out_8(x: any): number;
        export { Out_8 as Out };
        export function InOut_8(x: any): number;
        export { InOut_8 as InOut };
    }
    namespace Back {
        export function In_9(x: any): number;
        export { In_9 as In };
        export function Out_9(x: any): number;
        export { Out_9 as Out };
        export function InOut_9(x: any): number;
        export { InOut_9 as InOut };
    }
    namespace Bounce {
        export function In_10(x: any): number;
        export { In_10 as In };
        export function Out_10(x: any): number;
        export { Out_10 as Out };
        export function InOut_10(x: any): number;
        export { InOut_10 as InOut };
    }
    function generatePow(power: any): {
        In: (x: any) => number;
        Out: (x: any) => number;
        InOut: (x: any) => number;
    };
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
declare namespace Err$1 {
    export function warn(message: string): void;
    function _throw(message: string): never;
    export { _throw as throw };
    export function error(message: string): void;
    export function log(message: string): void;
    export function warnOnce(message: string): void;
    export function assert(test: boolean, errfunc: Function, message: string): boolean;
}
export class EvadeBehaviour extends Behaviour {
    constructor(pursuer: Vector);
    radius: number;
    pursuer: Vector;
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
export class Flock {
    neighbours: Agent[];
    init(agent: Agent): void;
    calc(target: Vector, inv_dt: number): void;
}
export class Geometry {
    constructor(vertices: Vector[]);
    vertices: Vector[];
    normals: Vector[];
    _dynNormals: Vector[];
    get CHOAS_CLASSNAME(): string;
    get CHAOS_OBJ_TYPE(): string;
    getNormals(rad: number, target: Vector[]): Vector[];
    private calcFaceNormals;
    transform(vertices: Vector[], pos: Vector, rad: any, n: number): void;
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
export class Input {
    constructor(eventHandler: DOMEventHandler);
    DOMEventHandler: DOMEventHandler;
    mouse: Mouse;
    touch: Touch;
    keyboard: Keyboard;
    update(): void;
    dispose(): void;
}
export namespace Interpolation {
    export function Linear_1(p0: any, p1: any, t: any): any;
    export { Linear_1 as Linear };
    export function Bernstein(n: any, i: any): any;
    export function Factorial(n: any): number;
    export function CatmullRom(p0: any, p1: any, p2: any, p3: any, t: any): any;
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
    constructor(length: number, offset: Vector, offsetAngle: any);
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
    static DefaultSystem(name: string): System;
    constructor(options?: {
        autoPlay?: boolean;
        files?: any;
        physics?: boolean;
        renderer?: boolean;
        input?: boolean;
    });
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
    perf: {
        lastTimestamp: number;
        total: number;
    };
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
    registerClass(obj: Function, override?: boolean): void;
    registerSystem(n: string, sys: System, cn?: string): void;
    getSystem(n: string): System;
    unregisterSystem(n: string): void;
    setComponentList(n: string, arr?: Component[]): void;
    getComponentList(n: string): Component[];
    getEntityByComponents(comps: Array<string>): Entity;
    getEntitiesByComponents(comps: Array<string>, entities?: Entity[], target?: Entity[]): Entity[];
    getEntityByTags(tags: Array<string>): Entity;
    getEntitiesByTags(tags: string[], entities?: Entity[], target?: Entity[]): Entity[];
    private infertype;
    private clone;
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
    transform(v: Vector): Vector;
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
export class Movable extends Component implements Component {
    constructor(x: number, y: number, a: number);
    entity: any;
    velocity: {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): any;
        addScalar(n: number): any;
        sub(v: any): any;
        subScalar(n: number): any;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): any;
        divide(n: number): any;
        normalize(): any;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): any;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): any;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): any;
        reverse(): any;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): any;
        toJson(): any;
        fromJspn(obj: any): void;
    };
    rotation: Angle;
    acceleration: {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): any;
        addScalar(n: number): any;
        sub(v: any): any;
        subScalar(n: number): any;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): any;
        divide(n: number): any;
        normalize(): any;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): any;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): any;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): any;
        reverse(): any;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): any;
        toJson(): any;
        fromJspn(obj: any): void;
    };
    toJson(): {
        velocity: {
            x: number;
            y: number;
            readonly CHOAS_CLASSNAME: string;
            readonly CHAOS_OBJ_TYPE: string;
            magnitude(): number;
            setMagnitude(length: number): void;
            magnitudeSquared(): number;
            distanceTo(v: any): number;
            distanceToSquared(v: any): number;
            add(v: any): any;
            addScalar(n: number): any;
            sub(v: any): any;
            subScalar(n: number): any;
            dot(v: any): number;
            cross(v: any): number;
            multiply(n: number): any;
            divide(n: number): any;
            normalize(): any;
            equals(v: any): boolean;
            equalsZero(): boolean;
            normal(l?: number, target?: any): any;
            normalFast(target?: any): any;
            rotate(rad: number): any;
            toArray(target?: number[], offset?: number): number[];
            clone(): any;
            copy(v: any): any;
            set(x: number, y: number): any;
            draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): any;
            reverse(): any;
            reflect(normal: number, target?: any): any;
            clamp(min?: number, max?: number): any;
            toJson(): any;
            fromJspn(obj: any): void;
        };
        rotation: {
            deg: number;
            type: string | number;
        };
        acceleration: {
            x: number;
            y: number;
            readonly CHOAS_CLASSNAME: string;
            readonly CHAOS_OBJ_TYPE: string;
            magnitude(): number;
            setMagnitude(length: number): void;
            magnitudeSquared(): number;
            distanceTo(v: any): number;
            distanceToSquared(v: any): number;
            add(v: any): any;
            addScalar(n: number): any;
            sub(v: any): any;
            subScalar(n: number): any;
            dot(v: any): number;
            cross(v: any): number;
            multiply(n: number): any;
            divide(n: number): any;
            normalize(): any;
            equals(v: any): boolean;
            equalsZero(): boolean;
            normal(l?: number, target?: any): any;
            normalFast(target?: any): any;
            rotate(rad: number): any;
            toArray(target?: number[], offset?: number): number[];
            clone(): any;
            copy(v: any): any;
            set(x: number, y: number): any;
            draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): any;
            reverse(): any;
            reflect(normal: number, target?: any): any;
            clamp(min?: number, max?: number): any;
            toJson(): any;
            fromJspn(obj: any): void;
        };
    };
    fromJson(obj: any): void;
}
export class NaiveBroadphase extends Broadphase {
    constructor(world: World);
    private bodies;
}
export namespace Overlaps {
    function AABBColliding(a: BoundingBox, b: BoundingBox): boolean;
    function boundSpheresColliding(a: BoundingCircle, b: BoundingCircle): boolean;
    function AABBvsSphere(a: BoundingBox, b: BoundingCircle): boolean;
}
export class Particle {
    constructor(pos: Vector, radius: number, lifespan?: number);
    readonly position: Vector;
    readonly velocity: Vector;
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
    add(point: Vector): this;
    clear(): this;
    advance(): boolean;
    update(lerpdist?: number): {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): any;
        addScalar(n: number): any;
        sub(v: any): any;
        subScalar(n: number): any;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): any;
        divide(n: number): any;
        normalize(): any;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): any;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): any;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): any;
        reverse(): any;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): any;
        toJson(): any;
        fromJspn(obj: any): void;
    };
    current(): any[];
    point(): {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): any;
        addScalar(n: number): any;
        sub(v: any): any;
        subScalar(n: number): any;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): any;
        divide(n: number): any;
        normalize(): any;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): any;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): any;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): any;
        reverse(): any;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): any;
        toJson(): any;
        fromJspn(obj: any): void;
    };
    get path(): any[];
    draw(ctx: CanvasRenderingContext2D): void;
}
export class PathFollowing extends Behaviour {
    constructor(path: Path);
    path: Path;
    calc(target: Vector, inv_dt: number): Vector;
    clear(): void;
    add(point: Vector): void;
    set loop(arg: boolean);
    get loop(): boolean;
    setPath(path: Path): void;
    draw(ctx: any): void;
}
export class Pursuit {
    init(): void;
    calc(target: Vector): void;
}
declare class Tree extends Broadphase {
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
export class Rectangle extends Shape {
    static calcInertia(mass: number, width: number, height: number): number;
    constructor(width: number, height: number, offset: Vector, offsetAngle: number);
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
export class SeekBehaviour extends Behaviour {
    constructor(target: Vector);
    radius: number;
    target: Vector;
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
    constructor(vertices: Vector[], offset?: Vector, offsetAngle?: number);
    readonly type: number;
    offAngle: number;
    offPosition: Vector;
    vertices: Vector[];
    geometry: Geometry;
    get CHOAS_CLASSNAME(): string;
    get CHAOS_OBJ_TYPE(): string;
    get area(): number;
    getNormals(shape: Shape, target?: Vector[]): Vector[];
    update(position: Vector, angle: number, scale: number): void;
    angle: number;
    getVertices(axis: Vector, target: Vector[]): Vector[];
    toJson(): void;
    fromJson(obj: any): void;
}
export class SpringConstraint extends Constraint {
    localA: {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): any;
        addScalar(n: number): any;
        sub(v: any): any;
        subScalar(n: number): any;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): any;
        divide(n: number): any;
        normalize(): any;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): any;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): any;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): any;
        reverse(): any;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): any;
        toJson(): any;
        fromJspn(obj: any): void;
    };
    localB: {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): any;
        addScalar(n: number): any;
        sub(v: any): any;
        subScalar(n: number): any;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): any;
        divide(n: number): any;
        normalize(): any;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): any;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): any;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): any;
        reverse(): any;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): any;
        toJson(): any;
        fromJspn(obj: any): void;
    };
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
    set position(arg: Vector);
    get position(): Vector;
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
    render(ctx: CanvasRenderingContext2D): void;
}
export namespace Storage {
    function set(k: string, v: any): void;
    function get(k: string): any;
    function clear(): void;
}
export class System {
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
export class Transform implements Component {
    constructor(x: number, y: number, a: number);
    entity: any;
    position: {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): any;
        addScalar(n: number): any;
        sub(v: any): any;
        subScalar(n: number): any;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): any;
        divide(n: number): any;
        normalize(): any;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): any;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): any;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): any;
        reverse(): any;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): any;
        toJson(): any;
        fromJspn(obj: any): void;
    };
    orientation: Angle;
    init(): void;
    toJson(): {
        position: {
            x: number;
            y: number;
            readonly CHOAS_CLASSNAME: string;
            readonly CHAOS_OBJ_TYPE: string;
            magnitude(): number;
            setMagnitude(length: number): void;
            magnitudeSquared(): number;
            distanceTo(v: any): number;
            distanceToSquared(v: any): number;
            add(v: any): any;
            addScalar(n: number): any;
            sub(v: any): any;
            subScalar(n: number): any;
            dot(v: any): number;
            cross(v: any): number;
            multiply(n: number): any;
            divide(n: number): any;
            normalize(): any;
            equals(v: any): boolean;
            equalsZero(): boolean;
            normal(l?: number, target?: any): any;
            normalFast(target?: any): any;
            rotate(rad: number): any;
            toArray(target?: number[], offset?: number): number[];
            clone(): any;
            copy(v: any): any;
            set(x: number, y: number): any;
            draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): any;
            reverse(): any;
            reflect(normal: number, target?: any): any;
            clamp(min?: number, max?: number): any;
            toJson(): any;
            fromJspn(obj: any): void;
        };
        orientation: {
            deg: number;
            type: string | number;
        };
    };
    fromJson(obj: any): void;
}
export class Triangle extends Shape {
    constructor(length1: number, length2: number, angle: number, offset: Vector, offsetAngle: number);
}
declare namespace Utils$1 {
    function appendArr<T>(arr1: T[], arr2: T[]): void;
    function clearArr<T>(arr: T[]): void;
    function popArr<T>(arr: T[], number: number): void;
    function removeElement<T>(arr: T[], index: number): T;
    function generateID(): number;
    function inheritComponent(component: Function, overrideInit?: boolean, overrideUpdate?: boolean): void;
    function inheritSystem(system: Function): void;
}
declare let Vector$1: {
    new (x: number, y: number): {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): this;
        addScalar(n: number): this;
        sub(v: any): this;
        subScalar(n: number): this;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): this;
        divide(n: number): this;
        normalize(): this;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): this;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): this;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): this;
        reverse(): this;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): this;
        toJson(): any;
        fromJspn(obj: any): void;
    };
    getAbsDegBtwn(v1: {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): this;
        addScalar(n: number): this;
        sub(v: any): this;
        subScalar(n: number): this;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): this;
        divide(n: number): this;
        normalize(): this;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): this;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): this;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): this;
        reverse(): this;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): this;
        toJson(): any;
        fromJspn(obj: any): void;
    }, v2: {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): this;
        addScalar(n: number): this;
        sub(v: any): this;
        subScalar(n: number): this;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): this;
        divide(n: number): this;
        normalize(): this;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): this;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): this;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): this;
        reverse(): this;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): this;
        toJson(): any;
        fromJspn(obj: any): void;
    }): number;
    getAbsRadBtwn(v1: {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): this;
        addScalar(n: number): this;
        sub(v: any): this;
        subScalar(n: number): this;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): this;
        divide(n: number): this;
        normalize(): this;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): this;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): this;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): this;
        reverse(): this;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): this;
        toJson(): any;
        fromJspn(obj: any): void;
    }, v2: {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): this;
        addScalar(n: number): this;
        sub(v: any): this;
        subScalar(n: number): this;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): this;
        divide(n: number): this;
        normalize(): this;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): this;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): this;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): this;
        reverse(): this;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): this;
        toJson(): any;
        fromJspn(obj: any): void;
    }): number;
    getRadBtwn(v1: {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): this;
        addScalar(n: number): this;
        sub(v: any): this;
        subScalar(n: number): this;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): this;
        divide(n: number): this;
        normalize(): this;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): this;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): this;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): this;
        reverse(): this;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): this;
        toJson(): any;
        fromJspn(obj: any): void;
    }, v2: {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): this;
        addScalar(n: number): this;
        sub(v: any): this;
        subScalar(n: number): this;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): this;
        divide(n: number): this;
        normalize(): this;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): this;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): this;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): this;
        reverse(): this;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): this;
        toJson(): any;
        fromJspn(obj: any): void;
    }): number;
    getDegBtwn(v1: {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): this;
        addScalar(n: number): this;
        sub(v: any): this;
        subScalar(n: number): this;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): this;
        divide(n: number): this;
        normalize(): this;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): this;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): this;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): this;
        reverse(): this;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): this;
        toJson(): any;
        fromJspn(obj: any): void;
    }, v2: {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): this;
        addScalar(n: number): this;
        sub(v: any): this;
        subScalar(n: number): this;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): this;
        divide(n: number): this;
        normalize(): this;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): this;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): this;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): this;
        reverse(): this;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): this;
        toJson(): any;
        fromJspn(obj: any): void;
    }): number;
    fromRad(radian: number, target?: {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): this;
        addScalar(n: number): this;
        sub(v: any): this;
        subScalar(n: number): this;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): this;
        divide(n: number): this;
        normalize(): this;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): this;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): this;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): this;
        reverse(): this;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): this;
        toJson(): any;
        fromJspn(obj: any): void;
    }): {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): this;
        addScalar(n: number): this;
        sub(v: any): this;
        subScalar(n: number): this;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): this;
        divide(n: number): this;
        normalize(): this;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): this;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): this;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): this;
        reverse(): this;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): this;
        toJson(): any;
        fromJspn(obj: any): void;
    };
    fromDeg(degree: number, target?: {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): this;
        addScalar(n: number): this;
        sub(v: any): this;
        subScalar(n: number): this;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): this;
        divide(n: number): this;
        normalize(): this;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): this;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): this;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): this;
        reverse(): this;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): this;
        toJson(): any;
        fromJspn(obj: any): void;
    }): {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): this;
        addScalar(n: number): this;
        sub(v: any): this;
        subScalar(n: number): this;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): this;
        divide(n: number): this;
        normalize(): this;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): this;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): this;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): this;
        reverse(): this;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): this;
        toJson(): any;
        fromJspn(obj: any): void;
    };
    random(target?: {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): this;
        addScalar(n: number): this;
        sub(v: any): this;
        subScalar(n: number): this;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): this;
        divide(n: number): this;
        normalize(): this;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): this;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): this;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): this;
        reverse(): this;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): this;
        toJson(): any;
        fromJspn(obj: any): void;
    }): {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): this;
        addScalar(n: number): this;
        sub(v: any): this;
        subScalar(n: number): this;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): this;
        divide(n: number): this;
        normalize(): this;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): this;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): this;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): this;
        reverse(): this;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): this;
        toJson(): any;
        fromJspn(obj: any): void;
    };
    lerp(v1: {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): this;
        addScalar(n: number): this;
        sub(v: any): this;
        subScalar(n: number): this;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): this;
        divide(n: number): this;
        normalize(): this;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): this;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): this;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): this;
        reverse(): this;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): this;
        toJson(): any;
        fromJspn(obj: any): void;
    }, v2: {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): this;
        addScalar(n: number): this;
        sub(v: any): this;
        subScalar(n: number): this;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): this;
        divide(n: number): this;
        normalize(): this;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): this;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): this;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): this;
        reverse(): this;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): this;
        toJson(): any;
        fromJspn(obj: any): void;
    }, t: number, target?: {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): this;
        addScalar(n: number): this;
        sub(v: any): this;
        subScalar(n: number): this;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): this;
        divide(n: number): this;
        normalize(): this;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): this;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): this;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): this;
        reverse(): this;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): this;
        toJson(): any;
        fromJspn(obj: any): void;
    }): {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): this;
        addScalar(n: number): this;
        sub(v: any): this;
        subScalar(n: number): this;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): this;
        divide(n: number): this;
        normalize(): this;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): this;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): this;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): this;
        reverse(): this;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): this;
        toJson(): any;
        fromJspn(obj: any): void;
    };
    toDeg(v: {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): this;
        addScalar(n: number): this;
        sub(v: any): this;
        subScalar(n: number): this;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): this;
        divide(n: number): this;
        normalize(): this;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): this;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): this;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): this;
        reverse(): this;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): this;
        toJson(): any;
        fromJspn(obj: any): void;
    }): number;
    toRad(v: {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): this;
        addScalar(n: number): this;
        sub(v: any): this;
        subScalar(n: number): this;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): this;
        divide(n: number): this;
        normalize(): this;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): this;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): this;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): this;
        reverse(): this;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): this;
        toJson(): any;
        fromJspn(obj: any): void;
    }): number;
    readonly ZERO: {
        x: number;
        y: number;
        readonly CHOAS_CLASSNAME: string;
        readonly CHAOS_OBJ_TYPE: string;
        magnitude(): number;
        setMagnitude(length: number): void;
        magnitudeSquared(): number;
        distanceTo(v: any): number;
        distanceToSquared(v: any): number;
        add(v: any): this;
        addScalar(n: number): this;
        sub(v: any): this;
        subScalar(n: number): this;
        dot(v: any): number;
        cross(v: any): number;
        multiply(n: number): this;
        divide(n: number): this;
        normalize(): this;
        equals(v: any): boolean;
        equalsZero(): boolean;
        normal(l?: number, target?: any): any;
        normalFast(target?: any): any;
        rotate(rad: number): this;
        toArray(target?: number[], offset?: number): number[];
        clone(): any;
        copy(v: any): any;
        set(x: number, y: number): this;
        draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): this;
        reverse(): this;
        reflect(normal: number, target?: any): any;
        clamp(min?: number, max?: number): this;
        toJson(): any;
        fromJspn(obj: any): void;
    };
};
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
    gravitationalAcceleration: Vector;
    fixedFrameRate: number;
    perf: {
        lastTimestamp: number;
        total: number;
    };
    broadphase: Broadphase;
    set gravity(arg: Vector);
    get gravity(): Vector;
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
export function circle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number): void;
export function clamp(value: number, min: number, max: number): number;
export function defaultCollisionHandler(clmds: CollisionPair[]): void;
export function defaultPrecollisionHandler(clmds: Manifold[]): void;
export function degToRad(deg: number): number;
export function drawImage(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w?: number, h?: number, ix?: number, iy?: number): void;
export function exp(x: number, e?: number): number;
export function fill(ctx: CanvasRenderingContext2D, color?: string, fillRule?: string): void;
export function fillText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number): void;
export function lerp(a: number, b: number, t: number): number;
export function line(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number): void;
export function map(v: number, x1: number, y1: number, x2: number, y2: number): number;
export function naturalizePair(a: number, b: number): number;
export function radToDeg(rad: number): number;
export function rand(min?: number, max?: number): number;
export function rect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number): void;
export function round(number: number, precision?: number): number;
export function sq(x: number): number;
export function sqrt(x: number): number;
export function stroke(ctx: CanvasRenderingContext2D, color?: string, width?: number): void;
export function vertices(ctx: CanvasRenderingContext2D, vertices: Vector[], close?: boolean): void;
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
declare class Broadphase {
    canCollide(a: Body, b: Body): boolean;
    insert(obj: Body): void;
    remove(obj: Body): void;
    draw(ctx: any): void;
    update(bodies: Body[]): void;
    getCollisionPairs(target: CollisionPair[]): CollisionPair[];
    query(bounds: Bounds, target: Body[]): Body[];
}
declare let r: {
    x: number;
    y: number;
    readonly CHOAS_CLASSNAME: string;
    readonly CHAOS_OBJ_TYPE: string;
    magnitude(): number;
    setMagnitude(length: number): void;
    magnitudeSquared(): number;
    distanceTo(v: any): number;
    distanceToSquared(v: any): number;
    add(v: any): this;
    addScalar(n: number): this;
    sub(v: any): this;
    subScalar(n: number): this;
    dot(v: any): number;
    cross(v: any): number;
    multiply(n: number): this;
    divide(n: number): this;
    normalize(): this;
    equals(v: any): boolean;
    equalsZero(): boolean;
    normal(l?: number, target?: any): any;
    normalFast(target?: any): any;
    rotate(rad: number): this;
    toArray(target?: number[], offset?: number): number[];
    clone(): any;
    copy(v: any): any;
    set(x: number, y: number): this;
    draw(ctx: CanvasRenderingContext2D, x?: number, y?: number, color?: string, scale?: number): this;
    reverse(): this;
    reflect(normal: number, target?: any): any;
    clamp(min?: number, max?: number): this;
    toJson(): any;
    fromJspn(obj: any): void;
};
export { Err$1 as Err, Matrix2 as Matrix, Tree as QuadTreeBroadphase, Utils$1 as Utils, Vector$1 as Vector };
