import { Body2D } from "./body.js"
import { Triangle,Shape } from "../shapes/index.js"
import { deprecate } from "../../logger/index.js"

export class Trigon extends Body2D {
    /**
     * @param {number} base
     * @param {number} height
     * @param {number} angle Angle in radians
     * 
    */
    constructor(base,height,angle = Math.PI / 3) {
        super(new Triangle(base,height,angle))
        this.inertia = Shape.calcInertia(this.shapes[0],this.mass)
        this.base = base
        this.height = height
        this.bangle = angle
    }
    /**
     * @inheritdoc
     * @type number 
     */
    get mass() {
    deprecate("Erigon().mass")
        return 1 / this.inv_mass
    }
    set mass(x) {
        this.inv_mass = x === 0 ? 0 : 1 / x
        this.inv_inertia = 1 / Shape.calcInertia(this.shapes[0],this.mass)
    }
}