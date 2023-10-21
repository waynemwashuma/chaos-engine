import { Body } from "./body.js"
import { Triangle } from "../shapes/index.js"

export class Trigon extends Body {
    /**
     * @param {number} base
     * @param {number} height
     * @param {number} angle
     * 
    */
    constructor(base, height, angle = 60) {
        super(new Triangle(base, height / Math.cos(angle), angle))
        this.inertia = Triangle.calcInertia(this.mass, base, height, angle)
        this.base = base
        this.height = height
        this.bangle = angle
    }
    /**
     * @inheritdoc
     * @type number 
     */
    get mass() {
        return this._mass
    }
    set mass(x) {
        this._mass = x
        this.inv_mass = x === 0 ? 0 : 1 / x
        this.inertia = Triangle.calcInertia(this.mass, this.base, this.height,this.bangle)
    }
}