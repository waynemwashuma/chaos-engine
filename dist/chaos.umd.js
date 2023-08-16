/*
 * @author Wayne Mwashuma
 * {@link https://github.com/waynemwashuma/chaos-engine.git}
 * @copyright  2023-2023 Wayne Mwashuma
 * @license MIT
 *
 * 
 * MIT License

Copyright (c) 2023 Wayne Mwashuma

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.CHAOS = {}));
})(this, (function (exports) { 'use strict';

  /**
   * This module is used to check if bounds of a body overlap
   */
  const Overlaps = {
    /**
     * Checks if two AABB overlap
     * 
     * @param {BoundingBox} a
     * @param {BoundingBox} b
     */
    AABBColliding(a, b) {
      return (
        a.min.x <= b.max.x &&
        a.max.x >= b.min.x &&
        a.min.y <= b.max.y &&
        a.max.y >= b.min.y
      )
    },
    /**
     * Checks if two BoundingCircles overlap
     * 
     * @param {BoundingCircle} a
     * @param {BoundingCircle} b
     */
    boundSpheresColliding(a, b) {
      const distance = (a.pos.x - b.pos.x) * (a.pos.x - b.pos.x) +
        (a.pos.y - b.pos.y) * (a.pos.y - b.pos.y);
      return distance < a.r * a.r + b.r * b.r;
    },
      /**
       * Checks if An AABB and a CircleBound overlap
       * 
       * @param {BoundingBox} a
       * @param {BoundingCircle} b
       */
    AABBvsSphere(a, b) {
      const x = Math.max(a.min.x, Math.min(b.pos.x, a.max.x));
      const y = Math.max(a.min.y, Math.min(b.pos.y, a.max.y));
      const distance =
        (x - b.pos.x) * (x - b.pos.x) +
        (y - b.pos.y) * (y - b.pos.y);

      return distance < b.r;
    }
  };

  let marker = `🚀Chaos Engine Says::::\n`;
  let mess = [];

  /**
   * A set of functions to streamline logging of items to the console
  */
  const Err = {};

  /**
   * Logs out a warning to the console.
   * 
   * @memberof Err
   * @param {string} message
   */
  Err.warn = function(message) {
    console.warn(marker + message);
  };

  /**
   * Throws a fatal error.
   * 
   * @memberof Err
   * @param {string} message
   */
  Err.throw = function(message) {
    throw new Error(marker + message)
  };

  /**
   * Logs out a non fatal error to the console.
   * 
   * @memberof Err
   * @param {string} message
   */
  Err.error = function(message) {
    console.error(marker + message);
  };

  /**
   * Logs out a message to the console.
   * 
   * @memberof Err
   * @param {string} message
   */
  Err.log = function(message) {
    console.log(marker + message);
  };
  /**
   * Logs out a warning once to the console.
   * 
   * @memberof Err
   * @param {string} message
   */
  Err.warnOnce = function(message) {
    if (mess.includes(message)) return
    mess.push(message);
    Err.warn(message);
  };
  /**
   * Logs out a message,warning or error to the console according to the supplied log function.
   * 
   * @memberof Err
   * @param {boolean} test
   * @param {string} message
   * @param {Function} errfunc
   */
  Err.assert = function(test, errfunc, message) {
    if (!test) errfunc(message);
    return test
  };

  /**
   * Contains a subset of useful functionality.
   * 
   * @module Utils
   */
  const Utils$1 = {};
  let tmpID = 0;

  /**
   * Appends the second array to the first.
   * 
   * @memberof Utils
   * @template T
   * @param {T[]} arr1
   * @param {T[]} arr2
   */
  Utils$1.appendArr = function(arr1, arr2) {
    for (var i = 0; i < arr2.length; i++) {
      arr1.push(arr2[i]);
    }
  };
  /**
   * Clears an array
   * 
   * @memberof Utils
   * @template T
   * @param {T[]} arr
   */
  Utils$1.clearArr = function(arr) {
    for (var i = arr.length; i > 0; i--) {
      arr.pop();
    }
  };
  /**
   * Removes a number of items at the end of an array
   * 
   * @memberof Utils
   * @template T
   * @param {T[]} arr
   * @param {number} number
   */
  Utils$1.popArr = function(arr, number) {
    let length = arr.length;
    for (var i = length; i > length - number; i--) {
      arr.pop();
    }
  };
  /**
   * Removes an element by its index from an array
   * 
   * @memberof Utils
   * @template T
   * @param {T[]} arr
   * @param {number} index
   */
  Utils$1.removeElement = function(arr, index) {
    if (index == -1) return null
    if (arr.length - 1 == index) return arr.pop()

    let temp = arr[index];
    arr[index] = arr.pop();
    return temp
  };
  /**
   * Generates a unique id when called
   * 
   * @memberof Utils
   */
  Utils$1.generateID = function() {
    return (tmpID += 1)
  };

  /**
   * Mixes the functions required by a component into a class.
   * 
   * @memberof Utils
   * @param {Function} component the class/constructor function to add methods to.
   * @param {boolean} [overrideInit=true]
   * @param {boolean} [overrideUpdate=true]
   */
  Utils$1.inheritComponent = function(component, overrideInit = true, overrideUpdate = true) {
    if (component == void 0 || typeof component !== "function") return
    let proto = component.prototype;

    if (proto.destroy) {
      let destroy = component.destroy;
      proto.destroy = function() {
        this.entity = null;
        destroy.call(this);
      };
    } else {
      proto.destroy = function() {
        this.entity = null;
      };
    }
    if (proto.init && overrideInit) {
      let init = proto.init;
      proto.init = function(entity) {
        this.entity = entity;
        init.call(this, entity);
      };
    } else if (!proto.init) {
      proto.init = function(entity) {
        this.entity = entity;
      };
    }
    if (!proto.update && overrideUpdate) {
      proto.update = function() {
        Err.warnOnce("Please override the update function in the component " + proto.constructor.name);

      };
    }
    proto.get = function(n) {
      return this.entity.getComponent(n);
    };
    proto.requires = function(...names) {
      for (var i = 0; i < names.length; i++)
        if (!this.entity.has(names[i]))
          Err.throw(`The component \`${this.CHOAS_CLASSNAME}\` requires another component \`${names[i]}\` but cannot find it in the Entity with id ${this.entity.id}`);
    };

    proto.query = function(bound, target = []) {
      return this.entity.query(bound, target)
    };
    Object.defineProperty(proto, "CHOAS_CLASSNAME", {
      get: function() {
        return this.constructor.name.toLowerCase()
      },
      enumerable: true,
      configurable: false
    });
    Object.defineProperty(proto, "CHAOS_OBJ_TYPE", {
      get: function() {
        return "component"
      },
      enumerable: true,
      configurable: false
    });
  };

  Utils$1.inheritSystem = function(system) {
    if (system == void 0 || typeof system !== "function") return
    let proto = system.prototype;
    if (!proto.init) {
      proto.init = function() {
        Err.warnOnce("Please override the init method in the system " + proto.constructor.name);
      };
    }
    if (!proto.update) {
      proto.update = function() {
        Err.warnOnce("Please override the update method in the system " + proto.constructor.name);

      };
    }
    if (!proto.add) {
      proto.add = function(component) {
        this.objects.push(component);
      };
    }

    if (!proto.remove) {
      proto.remove = function(component) {
        let index = this.objects.indexOf(component);
        Utils$1.removeElement(this.objects, index);
      };
    }
  };

  /**
   * Handles time management for the game.
  */
  class Clock {
    /**
     * Last time the clock was updated
     * 
     * @private
     * @type number
    */
    lastcall = 0
    /**
     * Difference between the last call in the last frame and current call.
     * 
     * @type number 
    */
    dt = 0
    /*getFrameRate(){
      return 1/(this.dt/1000)
    }
    getRoundedFrameRate(){
      return Math.round(this.getFrameRate())
    }*/
    /**
     * Updates the clock
     * 
     * @param {number} accumulate
    */
    update(accumulate){
      this.dt = accumulate - this.lastcall || 0;
      //this.framerate = this.getFrameRate()
      this.lastcall = accumulate; 
      this.delta = this.dt/1000;
      return this.delta
    }
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
  class Component {
    /**
     * @type Entity | null
    */
    entity = null
  }
  Utils$1.inheritComponent(Component);
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
  class BoundingBox extends Component {
    /**
     * 
     * @type Vector_like
     */
    pos = null
    /**
     * The upper limit of the bounding box
     * 
     * @type Vector_like
     */
    max = null
    /**
     * The lower limit of the bounding box
     * 
     * @type Vector_like
     */
    min = null
    /**
     * @param {number} [minX=0]
     * @param {number} [minY=0]
     * @param {number} [maxX=0]
     * @param {number} [maxY=0]
     */
    constructor(minX = 0, minY = 0, maxX = 0, maxY = 0) {
      super();
      this.pos = {
        x: 0,
        y: 0
      };
      this.max = {
        x: maxX,
        y: maxY
      };
      this.min = {
        x: minX,
        y: minY
      };
    }
    /**
     * 
     * Checks to see if this intersects with another bounding box
     * @param {BoundingCircle | BoundingBox} bound the bound to check  intersection with
     * @returns boolean
     **/
    intersects(bound) {
      if (bound.r)
        return Overlaps.AABBvsSphere(this, bound)
      return Overlaps.AABBColliding(this, bound)
    }
    /**
     * Calculates the bounds of the body
     * 
     * @param {Body} body Body to calculate max and min from
     * @param {Number} padding increases the size of the bounds
     */
    calculateBounds(body, padding = 0) {
      let minX = Number.MAX_SAFE_INTEGER,
        minY = Number.MAX_SAFE_INTEGER,
        maxX = -Number.MAX_SAFE_INTEGER,
        maxY = -Number.MAX_SAFE_INTEGER;

      if (body.shapes.length == 0) {
        this.min.x = body.position.x;
        this.max.x = body.position.x;
        this.min.y = body.position.y;
        this.max.y = body.position.y;
        this.pos.x = body.position.x;
        this.pos.y = body.position.y;
        return
      }
      for (var i = 0; i < body.shapes.length; i++) {
        let shape = body.shapes[i];
        if (shape.type == 0) {
          let idx = body.position.x - shape.radius,
            idy = body.position.y - shape.radius,
            mdx = body.position.x + shape.radius,
            mdy = body.position.y + shape.radius;
          if (!minX || idx < minX) minX = idx;
          if (!maxX || mdx > maxX) maxX = mdx;
          if (!minY || idy < minY) minY = idy;
          if (!maxY || mdy > maxY) maxY = mdy;
          continue
        }
        for (var j = 0; j < shape.vertices.length; j++) {
          let vertex = shape.vertices[j];
          if (vertex.x < minX) minX = vertex.x;
          if (vertex.x > maxX) maxX = vertex.x;
          if (vertex.y < minY) minY = vertex.y;
          if (vertex.y > maxY) maxY = vertex.y;
        }
      }
      this.min.x = minX - padding;
      this.max.x = maxX + padding;
      this.min.y = minY - padding;
      this.max.y = maxY + padding;
      this.pos.x = body.position.x;
      this.pos.y = body.position.y;
    }
    /**
     * Translates this bound to the given position.
     * 
     * @param {Vector} pos
     */
    update(pos) {
      let dx = pos.x - this.pos.x;
      let dy = pos.y - this.pos.y;

      this.pos.x = pos.x;
      this.pos.y = pos.y;
      this.min.x += dx;
      this.max.x += dx;
      this.min.y += dy;
      this.max.y += dy;
    }
    /**
     * Deep copies a bounding box to a new one.
     * 
     * @returns BoundingBox
    */
    clone() {
      return new BoundingBox(this.min.x, this.min.y, this.max.x, this.max.y)
    }
    /**
     * Deep copies another bounding box.
     * 
     * @param {BoundingBox} bounds
    */
    copy(bounds) {
      this.pos.x = bounds.pos.x;
      this.pos.y = bounds.pos.y;
      this.min.x = bounds.min.x;
      this.min.y = bounds.min.y;
      this.max.x = bounds.max.x;
      this.max.y = bounds.max.y;
    }
    /**
     * Combines two bounds to create a new one that covers the previous two.
     * 
     * @param {BoundingBox} bound1 
     * @param {BoundingBox} bound2 
     * @param {BoundingBox} target Bound to store results into.
     * @returns BoundingBox
     */
    static union(bound1, bound2, target) {
      target = target || new BoundingBox();

      target.max.x = bound1.max.x > bound2.max.x ? bound1.max.x : bound2.max.x;
      target.max.y = bound1.max.y > bound2.max.y ? bound1.max.y : bound2.max.y;
      target.min.x = bound1.min.x < bound2.min.x ? bound1.min.x : bound2.min.x;
      target.min.y = bound1.min.y < bound2.min.y ? bound1.min.y : bound2.min.y;
      return target
    }
  }

  /**
   * A circular bound that is used to contain a body so that broadphase can be used for quick collision detection.
   */
  class BoundingCircle {
    /**
     * 
     * @type number
    */
    r = 0
    /**
     * 
     * @type Vector_like
    */
    pos = null
    /**
     * @param {number} [r=0]
     */
    constructor(r = 0) {
      this.r = r;
      this.pos = { x: 0, y: 0 };
    }
    /**
     * 
     * Checks to see if this intersects with another bounding box
     * @param { BoundingCircle | BoundingBox } bound the bound to check  intersection with
     **/
    intersects(bound) {
      if (bound.r)
        return Overlaps.boundSpheresColliding(this, bound)
      return Overlaps.AABBvsSphere(bound, this)
    }
    /**
     * Calculates the bounds of the body
     * 
     * @param {Body} body Body to calculate max and min from
     * @@param {Number} padding increases the size of the bounds
     */
    calculateBounds(body, padding = 0) {
      let radsq = 0,
        shape,
        vertices,
        tmp;
      for (var i = 0; i < body.shapes.length; i++) {
        shape = body.shapes[i];
        if (shape.radius) {
          tmp = shape.radius * shape.radius;
          if (tmp > radsq) radsq = tmp;
          continue
        }
        for (var j = 0; j < body.shapes[i].vertices.length; j++) {
          vertices = body.shapes[i].vertices;
          for (var j = 0; j < vertices.length; j++) {
            tmp = vertices[j].distanceToSquared(body.position);
            if (tmp > radsq) radsq = tmp;
          }
          
        }
      }
      this.pos.x = body.position.x;
      this.pos.y = body.position.y;
      this.r = Math.sqrt(radsq);
    }
    /**
     * Translates this bound to the given position.
     */
    update(pos) {
      //let dx = pos.x - this.pos.x
      //let dy = pos.y - this.pos.y

      this.pos.x = pos.x;
      this.pos.y = pos.y;
    }
  }

  const RHI = Math.PI / 180,
    RHI_INV = 1 / RHI;

  /**
   * Creates a random number between the parameters
   * 
   * @param {number} [min=0] The minimal bound of the random number
   * @param {number} [max=1] The maximum bound of the random number
   * @returns {number}
   */
  function rand(min = 0, max = 1) {
    return Math.random() * (max - min) + min
  }

  /**
   * Returns the square of a number
   * 
   * @param {number} x The number to square
   *  @returns {number}
  */
  function sq(x) {
    return x * x
  }
  /**
   * Returns the power of a number by a given exponent.
   * 
   *  @param {number} x the number to power.
   *  @param {number} [e=2] The number to power by.
   *  @returns {number}
  */
  function exp(x, e = 2) {
    return x ** e
  }
  /**
   * Returns the square root pf a number
   * 
   * @param {number} x The number to root 
   * @returns {number}
  */
  function sqrt(x) {
    return Math.sqrt(x)
  }


  /**
   * Interpolates between two numbers by a constant t.
   * 
   *  @param {number} a The minimal bound of the interpolation.
   *  @param {number} b The maximum bound of the interpolation.
   *  @param {number} t A number between 0 and 1 to interpopate by.Any other number greater than 1 or less than 0 will extapolate beyond b or a respectively.
   *  @returns {number}
  */
  function lerp(a, b, t) {
    return a + t * (b - a)
  }

  /**
   * Rounds a given value to a given precision.
   * 
   *  @param {number} number The number to round.
   *  @param {number} [precision=4] How many decimal places there should be.
   *  @returns {number}
  */
  function round(number, precision = 4) {
    precision = 10 ** precision;
    return Math.round(number * precision) / precision
  }

  /**
   * Clamps a value between two numbers.
   * 
   *  @param {number} value The number to clamp.
   *  @param {number} min The minimal bound of the clamped number.
   *  @param {number} max The maximum bound of the clamped number.
   *  @returns {number}
  */
  function clamp(value, min, max) {
    if (value < min) return min
    if (value > max) return max
    return value
  }

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
  function map(v, x1, y1, x2, y2) {
    return x2 + v * (y2 - x2) / (y1 - x1)
  }
  /**
   * Returns a unique number given from a pair of numbers
   *  @param {number} a
   *  @param {number} b
   *  @returns {number}
  */
  function naturalizePair(a, b) {
    if (a > b)
      return (a + b) * (a + b + 1) / 2 + a;
    return (a + b) * (a + b + 1) / 2 + b;
  }

  /**
   * Converts a degree to a radian.
   * 
   * @param {number} deg number to convert.
   *  @returns {number}
  */
  function degToRad(deg) {
    return deg * RHI
  }

  /**
   * Converts a radian to a degree.
   * 
   * @param {number} rad number to convert.
   *  @returns {number}
  */
  function radToDeg(rad) {
    return rad * RHI_INV
  }

  let obj$1 = {
    x: 0,
    y: 0
  };
  let TWO_PI = Math.PI * 2;
  /**
   * This is a 2D vector class.
   * 
   * @author Wayne Mwashuma <mwashumawayne@gmail.com>
   * @license MIT
   */
  class Vector {
    /**
     * @param {number} x the x coordinate of the vector
     * @param {number} y the y coordinate of the vector
     */
    constructor(x, y) {
      this.x = x || 0;
      this.y = y || 0;
    }
    get CHOAS_CLASSNAME() {
      return this.constructor.name.toLowerCase()
    }
    get CHAOS_OBJ_TYPE() {
      return "vector"
    }
    /**
     *Calculates length of this vector and returns 
     * it
     * 
     * @returns {number}
     */
    magnitude() {
      return Math.sqrt(this.magnitudeSquared());
    };
    /**
     * Sets a vector to have the given length.
     * 
     * @param {number} length 
     */
    setMagnitude(length) {
      this.normalize().multiply(length);
    }
    /**
     *Calculates length squared of vector and returns it
     */
    magnitudeSquared() {
      return this.y ** 2 + this.x ** 2
    }
    /**
     *Calculates length of this vector to another vector
     * @param {Vector} v the other vector
     */
    distanceTo(v) {
      obj$1.x = this.x - v.x;
      obj$1.y = this.y - v.y;
      return Math.sqrt(Vector.prototype.magnitudeSquared.call(obj$1))
    }
    /**
     *Calculates length squared of this vector to another vector
     * 
     * @param {Vector} v the other vector
     * @returns {number}
     */
    distanceToSquared(v) {
      obj$1.x = this.x - v.x;
      obj$1.y = this.y - v.y;
      return Vector.prototype.magnitudeSquared.call(obj$1)
    }
    /**
     * Adds a given vector into this 
     * 
     * @param {Vector} v
     * @returns {this}
     */
    add(v) {
      this.x += v.x;
      this.y += v.y;
      return this
    }
    /**
     * Adds a scalar value into this vector's
     * x and y values
     * 
     * @param {number} n
     * @returns {this}
     */
    addScalar(n) {
      this.x += n;
      this.y += n;
      return this
    }
    /**
     * Subtracts a given vector from this vector
     * 
     * @param {Vector} v
     * @returns {this}
     */
    sub(v) {
      this.x -= v.x;
      this.y -= v.y;
      return this
    }
    /**
     * Subtracts a scalar value from this vector's x and y values.
     * 
     * @param {number} n
     * @returns {this}
     */
    subScalar(n) {
      this.x -= n;
      this.y -= n;
      return this
    }
    /**
     * Calculates the dot product of two vectors.
     * 
     * @param {Vector} v
     * @returns {number}
     */
    dot(v) {
      return this.x * v.x + this.y * v.y
    }
    /**
     * Calculates the cross product of two vectors.
     * 
     * @param {Vector} v
     * @returns {number}
     */
    cross(v) {
      return this.x * v.y - this.y * v.x
    }
    /**
     * Multiplies this vector with a scalar.
     * 
     * @param {number} n 
     * @returns {this}
     */
    multiply(n) {
      this.x *= n;
      this.y *= n;
      return this
    }
    /**
     * Divides this vector with a scalar.
     * 
     * @param {number} n 
     * @returns {this}
     */
    divide(n) {
      this.multiply(1 / n);
      return this
    }
    /**
     * Makes this vector a unit vector by 
     * dividing its components with its length.
     * 
     * @returns {this}
     */
    normalize() {
      const length = this.magnitude();
      if (length == 0) return this
      this.x = this.x / length;
      this.y = this.y / length;
      return this
    };
    /**
     * Checks to see if this vector is equal to
     * another vector.
     * 
     * @param {Vector} v
     * @returns {boolean}
     */
    equals(v) {
      return v.x === this.x && v.y === this.y
    }
    /**
     * Checks if the vector length is zero.
     * 
     * @returns {boolean}
     */
    equalsZero() {
      return this.x === 0 && this.y === 0
    }
    /**
     * Returns a scaled vector normal to this vector,when scaled to 1,it returns a unit vector.
     * 
     * @param {number} l the length of the vector returned.
     * @param {Vector} [target = Vector] Vector in which results are stored.
     * @returns {Vector}
     */
    normal(l = 1, target) {
      target = target || new Vector();
      target.copy(this).normalize();
      return target.set(-target.y * l, target.x * l);
    };
    /**
     * Returns the normal to a vector, the normal has the same length as the vector.
     * 
     * @param {Vector} [target = Vector] Vector in which results are stored.
     *  @returns {Vector}
     */
    normalFast(target = new Vector()) {
      return target.set(-this.y, this.x)
    }
    /**
     * Rotates this vector by a given angle in radians.
     * 
     * @param {number} rad Angle in radians
     * @returns {this}
     */
    rotate(rad) {
      let
        x = this.x,
        cos = Math.cos(rad),
        sin = Math.sin(rad);
      this.x = x * cos - this.y * sin;
      this.y = x * sin + this.y * cos;
      return this
    };
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
    toArray(target = [], offset = 0) {
      target[offset] = this.x;
      target[offset + 1] = this.y;
      return target;
    }
    /**
     * Copies x and y values of this vector to 
     * a new vector and returns the new vector.
     * 
     * @return Vector
     */
    clone() {
      return new Vector(this.x, this.y)
    }
    /**
     * Copies x and y values of another vector
     * to this vector.
     * 
     * @@param {Vector} v 
     * @return this
     */
    copy(v) {
      this.x = v.x;
      this.y = v.y;
      return this
    }
    /**
     * Sets x and y values of this vector to the given parameter.
     * 
     * @param {Number} x 
     * @param {Number} y
     * @returns {this}
     */
    set(x, y) {
      this.x = x;
      this.y = y;
      return this
    }
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
    draw(ctx, x = 0, y = 0, color = "red", scale = 1) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(this.x * scale + x, this.y * scale + y);
      //ctx.arc(this.x * scale + x, this.y * scale + y, 2, 0, Math.PI * 2)
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.strokeStyle = "black";
      ctx.closePath();
      return this
    }
    /**
     * Negates the values of this vector.
     * 
     * @returns {this}
     */
    reverse() {
      return this.multiply(-1)
    }
    /**
     * Returns a vector of this reflected on a sirface perpendicular to the normal.
     * 
     * @param {number} normal the unit vector perpendicular to reflection surface
     * @param {Vector} [target]
     * @return {Vector}
     */
    reflect(normal, target = new Vector()) {
      return target.copy(normal).multiply(this.dot(normal) * 2).sub(this)
    }
    /**
     * Forces this vector to have a length 
     * between the min and max.
     * 
     * @param {number} [min = 0] The smallest value 
     * the length of this vector is allowed to have.
     * @param {number} [max = 1] The biggest value the length of this vector is allowed to have.
     * @returns {this}
     */
    clamp(min = 0, max = 1) {
      let length = this.magnitude();
      if (length == 0) return this
      if (length > max)
        return this.multiply(max / length)
      if (length < min)
        return this.multiply(min / length)
      return this
    }

    [Symbol.iterator] = function*() {
      yield this.x;
      yield this.y;
    }
    /**
     * Gets the angle (in degrees) between two
     * vectors in the range 0° to 360° in the anticlockwise direction from v1 to v2
     * 
     * @param {Vector} v1 start of the angle
     * @param {Vector} v2 end of the angle
     * @returns {number}
     */
    static getAbsDegBtwn(v1, v2) {
      let a = v1.cross(v2);
      let deg = Vector.getDegBtwn(v1, v2);
      return a < 0 ? deg : 360 - deg
    }
    /**
     * Same as `Vector.getAbsDegBtwn` but returns in radians.
     * 
     * @param { Vector } v1 start of the angle
     * @param { Vector } v2 end of the angle
     * @returns {number}
     **/
    static getAbsRadBtwn(v1, v2) {
      let a = v1.cross(v2);
      let deg = Vector.getDegBtwn(v1, v2);
      return a < 0 ? deg : 360 - deg
    }
    /**
     * Gets the angle (in radians) between two
     * vectors in the shortest direction from v1 to v2 in the range of `0` to `Math.PI`
     * 
     * @param {Vector} v1 start of the angle
     * @param {Vector} v2 end of the angle
     * @returns {number}
     */
    static getRadBtwn(v1, v2) {
      return Math.acos(v1.dot(v2) / (v1.magnitude() * v2.magnitude()))
    }
    /**
     * Gets the angle (in degrees) between two
     * vectors in shortest direction from v1 to v2 in the range `0°` to `180°`
     * 
     * @param {Vector} v1 start of the angle
     * @param {Vector} v2 end of the angle
     * @returns {number}
     */
    static getDegBtwn(v1, v2) {
      return Vector.getRadBtwn(v1, v2) * 180 / Math.PI
    }
    /**
     * Returns a unit vector pointing in the
     * given angle starting from the positive x axis.
     * 
     * @param {number} radian angle in radians from 0 to `Math.PI * 2`
     * @param {Vector} [target] Vector to store results in.
     * @returns {Vector}
     */
    static fromRad(radian, target = new Vector()) {
      return target.set(Math.cos(radian), Math.sin(radian))
    }
    /**
     * Returns a unit vector pointing in the
     * given angle from the positive x axis
     * 
     * @param {number} degree angle in radians from `0°` to `360°`
     * @param {Vector} [target] Vector to store results in.
     * @returns {Vector}
     */
    static fromDeg(degree, target) {
      return Vector.fromRad(degree * Math.PI / 180, target)
    }
    /**
     * Generates a new unit Vector in a random direction
     * 
     * @param {Vector} [target]
     * @returns {Vector}
     */
    static random(target) {
      return Vector.fromRad(Math.random() * TWO_PI, target)
    }
    /**
     * Returns a Vector that has been lerped between v1 and v2
     * @param {Vector} v1 the vector to lerp from
     * @param {Vector} v2 the vector to lerp from
     * @param {number} t a value from 0 to 1 to scale the new Vector between v1 and v2
     * @param {Vector} [target] the vector to store results into
     * 
     * @returns {Vector}
     */
    static lerp(v1, v2, t, target = new Vector()) {
      target = target || new Vector();
      return target.copy(v1).set(
        (v2.x - v1.x) * t + v1.x,
        (v2.y - v1.y) * t + v1.y
      )
    }

    /**
     * Returns the angle in degrees between the positive x-axis and the vector.
     * 
     * @param {Vector} v
     * @returns {number}
     */
    static toDeg(v) {
      return Vector.toRad(v) / Math.PI * 180
    }

    /**
     * Returns the angle in radians between the positive x-axis and the vector.
     * 
     * @param {Vector} v
     * @returns {number}
     */
    static toRad(v) {
      let a = Math.atan2(v.y, v.x);
      return a < 0 ? TWO_PI + a : a
    }

    /**
     * A vector whose x and y values will remain 0.
     * 
     * @static
     * @readonly
     * @type {Vector}
     */
    static ZERO = Object.freeze(new Vector())

  }

  /**
   * Wrapper class since JavaScript doesn't support references to numbers explicitly.
   * Keeps record of the orientation of an entity.
   */
  class Angle {
    /**
     * Orientation in degrees.
     * 
     * @private
     * @type number
     */
    _deg = 0
    /**
     * Orientation in radians.
     * 
     * @private
     * @type number
     */
    _rad = 0
    /**
     * @param {number} [deg=0] Orientation in degrees.
     */
    constructor(deg = 0) {
      this._deg = deg || 0;
      this._rad = deg * Math.PI / 2 || 0;
    }
    get CHOAS_CLASSNAME() {
      return this.constructor.name.toLowerCase()
    }
    get CHAOS_OBJ_TYPE() {
      return "angle"
    }
    /**
     * The orientation in degrees.
     */
    set degree(x) {
      this._deg = x;
      this._rad = x * Math.PI / 180;
    }
    /**
     * The orientation in radians.
     */
    set radian(x) {
      this._rad = x;
      this._deg = x * 180 / Math.PI;
    }
    get radian() {
      return this._rad
    }
    get degree() {
      return this._deg
    }
    /**
     * Copies the orientation of another angle.
     * 
     * @param {Angle} angle
     */
    copy(angle) {
      this.degree = angle.degree;
    }

    static fromJSON(obj) {
      return new Angle(obj._deg)
    }
  }

  /**
   * A class that is used to transform positions through rotation, scaling and translation.
   */
  class Matrix2 {
    /**
     *  @param {number} [a=1]
     *  @param {number} [b=0]
     *  @param {number} [c=0]
     *  @param {number} [d=1]
     *  @param {number} [e=0]
     *  @param {number} [f=0]
    */
    constructor(a = 1, b = 0, c = 0, d = 1, e = 0, f = 0) {

      this.a = a;
      this.b = b;
      this.c = c;
      this.d = d;
      this.e = e;
      this.f = f;
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} scaleX
     * @param {number} scaleY
     * @param {number} rotation
     * 
     * @returns this
     */
    setFromTransform(x, y, scaleX, scaleY, rotation) {
      let cos = Math.cos(rotation);
      let sin = Math.sin(rotation);

      this.a = cos * scaleX;
      this.b = sin * scaleX;
      this.c = -sin * scaleY;
      this.d = cos * scaleY;
      this.e = x;
      this.f = y;
      return this;
    };
    /**
     * Multiplies with another matrix,
     *  A * B = C, where B is this matrix
     * 
     * @param {Matrix2} m
     * @returns this
     */
    prepend(m) {
      let x = this.e;
      let a1 = this.a;
      let c1 = this.c;
      this.a = a1 * m.a + this.b * m.c;
      this.b = a1 * m.b + this.b * m.d;
      this.c = c1 * m.a + this.d * m.c;
      this.d = c1 * m.b + this.d * m.d;
      this.e = x * m.a + this.f * m.c + m.e;
      this.f = x * m.b + this.f * m.d + m.f;
      return this;
    };
    /**
     * Multiplies with another matrix,
     *  A * B = C, where A is this matrix
     * 
     * @param {Matrix2} m
     * @returns {this}
     */
    append(m) {
      let a1 = this.a;
      let b1 = this.b;
      let c1 = this.c;
      let d1 = this.d;
      this.a = m.a * a1 + m.b * c1;
      this.b = m.a * b1 + m.b * d1;
      this.c = m.c * a1 + m.d * c1;
      this.d = m.c * b1 + m.d * d1;
      this.e = m.e * a1 + m.f * c1 + this.e;
      this.f = m.e * b1 + m.f * d1 + this.f;
      return this;
    }
    /**
     * Makes a matrix to be an identity matrix.
     * 
     * @returns this
     */
    identity() {
      this.a = 1;
      this.b = 0;
      this.c = 0;
      this.d = 1;
      this.e = 0;
      this.f = 0;
      return this;
    };
    /**
     * Rotates the matrix by the given angle.
     * 
     * @param {number} radians
     * @returns this
     */
    rotate(radians) {

      let cos = Math.cos(radians);
      let sin = Math.sin(radians);
      let a1 = this.a;
      let c1 = this.c;
      let x = this.e;
      this.a = a1 * cos - this.b * sin;
      this.b = a1 * sin + this.b * cos;
      this.c = c1 * cos - this.d * sin;
      this.d = c1 * sin + this.d * cos;
      this.e = x * cos - this.f * sin;
      this.f = x * sin + this.f * cos;
      return this;
    };
    /**
     * Translates a matrix by a given amount.
     * 
     * @param {number} x
     * @param {number} y
     * @returns this
     */
    translate(x, y) {
      this.e += x;
      this.f += y;
      return this;
    };
    /**
     * Scales a matrix by a given amount.
     * 
     * @param {number} x
     * @param {number} y
     * @returns this
     */
    scale(x, y) {
      this.a *= x;
      this.d *= y;
      return this;
    };
    /**
     * Transforms the given vector.
     * 
     * @param {Vector} v
     */
    transform(v) {
      let x = v.x;

      v.x = this.a * x + this.c * v.y + this.e;
      v.y = this.b * x + this.d * v.y + this.f;
      return v;
    };
    /**
     * Inverts the matrix.
     *
     * @returns this
     */
    invert() {
      let a = this.a;
      let b = this.b;
      let c = this.c;
      let d = this.d;
      let x = this.e;
      let n = a * d - b * c;
      this.a = d / n;
      this.b = -b / n;
      this.c = -c / n;
      this.d = a / n;
      this.e = (c * this.f - d * x) / n;
      this.f = -(a * this.f - b * x) / n;
      return this;
    };
    /**
     * Copies a matrix into this matrix.
     * 
     * @param {Matrix2} m
     * @returns this
     */
    copy(m) {
      this.a = m.a;
      this.b = m.b;
      this.c = m.c;
      this.d = m.d;
      this.e = m.e;
      this.f = m.f;
      return this;
    }
    /**
     * Creates a new matrix,fills its values with this ones and returns the former.
     * 
     * @returns Matrix2
     */
    clone() {
      return new Matrix2().copy(this);
    }
    /**
     * Deeply checks if a matrix is equal to another.
     * 
     * @param {Matrix2} matrix
     * @returns boolean
     */
    equals(matrix) {
      return (this.a === matrix.a && this.b === matrix.b && this.c === matrix.c && this.d === matrix.d && this.e === matrix.e && this.f === matrix.f);
    }

    [Symbol.iterator] = function*() {
      yield this.a;
      yield this.b;
      yield this.c;
      yield this.d;
      yield this.e;
      yield this.f;
    }
  }

  class Geometry {
    constructor(vertices) {
      this.vertices = vertices;
      this.normals = this.calcFaceNormals();
      this._dynNormals = this.normals.map(e=>e.clone());
    }
    get CHOAS_CLASSNAME() {
      return this.constructor.name.toLowerCase()
    }
    get CHAOS_OBJ_TYPE() {
      return "geometry"
    }
    getNormals(rad,target) {
      target = target || [];
      for (var i = 0; i < this.normals.length; i++) {
        target.push(this._dynNormals[i].copy(this.normals[i]).rotate(rad));
      }
      return target
    }
    calcFaceNormals() {
      const axes = [],
        { vertices } = this;
      for (var i = 0; i < vertices.length; i++) {
        let axis = vertices[i >= vertices.length ? vertices.length - 1 : i]
          .clone()
          .sub(vertices[i + 1 >= vertices.length ? 0 : i + 1]).normal();
        for (var j = 0; j < axes.length; j++) {
          if (axis.equals(axes[j]) || axis.clone().reverse().equals(axes[j])) {
            axis = null;
            break
          }
        }
        if (!axis) continue
        axes.push(axis);
      }
      return axes
    }
    transform(vertices,pos, rad, n) {
      for (let i = 0; i < this.vertices.length; i++) {
        let vertex = vertices[i];
        vertex.copy(this.vertices[i]);
        vertex.rotate(rad);
        vertex.multiply(n);
        vertex.add(pos);
      }
    }
  }

  /**@enum {number}*/
  const ShapeType = Object.freeze({
    CIRCLE: 0,
    POLYGON: 1
  });
  /**@enum {number}*/
  const ObjType = Object.freeze({
    CONSTRAINT: 0,
    BODY: 1,
    COMPOSITE: 2
  });
  /**@enum {number}*/
  const BodyType = Object.freeze({
    DYNAMIC:2,
    KINEMATIC:1,
    STATIC:0
  });

  //Default settings 
  const Settings = {
    //For the world
    posDampen: 0.80,
    linearDamping: 0.001,
    angularDamping: 0.001,
    velocitySolverIterations: 10,
    fixedFrameRate: 0.016,
    
    //For all bodies
    mass: 1,
    restitution: 0.6,
    staticFriction: 0.4,
    kineticFriction: 0.2,
    boundPadding : 0,
    allowSleep: false,
    aabbDetectionOnly: false,
    collisionResponse: true,
    autoUpdateBound: true,
    type:BodyType.DYNAMIC
  };

  let tmp1$c = new Vector();

  /**
   * This class makes a body tangible
   * to collision detection and response.Without it,the body will not be able to interact with other bodies.
   */
  class Shape {
    /**
     * Used to determine what type of shape this is.
     * 
     * @type number
     * @readonly
     */
    type = ShapeType.POLYGON
    /**
     * The offset angle of this shape from this body's angle.
     * 
     * @type number
     */
    offAngle = 0
    /**
     * The offset position of this shape from this body's position.
     * 
     * @type Vector
     */
    offPosition = null
    /**
     * The vertices describing the shape.
     * 
     * @type Vector[]
    */
    vertices = null
    /**
     * Keeps the original normals and vertices of this shape
     * 
     * @type Geometry
    */
    geometry = null

    /**
     * @param {Vector[]} vertices The vertices of the shape in local space coordinates.
     * @param {Vector} [offset=vector] offset position relative to parent body
     * @param {number} [offsetAngle=0] offset angle relative to parent body.
     */
    constructor(vertices, offset = new Vector(), offsetAngle = 0) {
      this.offPosition = offset;
      this.offAngle = offsetAngle * Math.PI / 180;
      this.vertices = vertices.map(v => v.clone());
      this.geometry = new Geometry(vertices);
    }

    get CHOAS_CLASSNAME() {
      return this.constructor.name.toLowerCase()
    }
    get CHAOS_OBJ_TYPE() {
      return "shape"
    }
    /**
     * The area occupied by a shape.
     * @type number
    */
    get area(){
      return 0
    }
    /**
     * Returns the normals of the faces when rotated.
     * 
     * @param {Shape} shape
     * @param {Vector[]} [target=[]] An array where results are stored.
     * @returns {Vector[]}
     */
    getNormals(shape, target) {
      return this.geometry.getNormals(this.angle, target)
    }
    /**
     * Transforms the local coordinates of the vertices to world coordinates.
     * 
     * @param {Vector} position the world position of the body
     * @param {number} angle the orientation of body
     * @param {number} scale the scale of the body
     */
    update(position, angle, scale) {
      this.angle = this.offAngle + angle;
      this.geometry.transform(this.vertices, tmp1$c.copy(position).add(this.offPosition), this.angle, 1 , position);
    }

    /**
     * Returns the world coordinates of the vertices.
     * 
     * @param {Vector} axis
     * @param {Vector[]} target 
     * @returns {Vector[]}
     */
    getVertices(axis,target) {
      return this.vertices
    }

    /**
     * Calculates the inertia of a given shape.
     * 
     * @virtual
     * @returns {number}
     */
    static calcInertia() {
      throw new Error("Implement in the children classes")
    }
    static CIRCLE = 0
    static POLYGON = 1
  }

  class Line extends Shape {
    constructor(length,offset,offsetAngle) {
      let start = new Vector(1).multiply(length / 2),
        end = new Vector(1).multiply(-length / 2);
      super([start, end],offset,offsetAngle);
      this.length = length;
    }
  }

  let _vec1 = new Vector();
  let _vec2 = new Vector();

  /**
   * A circular shape.
   * 
   * 
   * @augments Shape
   */
  class Circle extends Shape {
    angle = 0
    radius = 0
    /**
     * @param {number} radius 
     * @param {Vector} offset Positional offset from the body center.
     *  @param {number} offsetAngle Angular offset from the body center.
     */
    constructor(radius, offset, offsetAngle) {

      //the first vertex is position 
      super([], offset, offsetAngle);
      this.vertices = [new Vector(), new Vector(), new Vector()];
      this.radius = radius;
      this.type = Shape.CIRCLE;
    }
    get position() {
      return this.vertices[0]
    }
    /**
     * @inheritdoc
     * @param {number} mass
     * @param {number} radius 
     */
    static calcInertia(mass, radius) {
      return mass * (radius * radius) / 4
    }
    /**
     * @inheritdoc
     * 
     * @param {Vector} axis
     * @param {Vector[]}} target 
     * @returns {Vector[]}
     */
    getVertices(axis, target) {
      target = target || [];
      let v1 = _vec1.copy(axis).multiply(-this.radius).add(this.position);
      let v2 = _vec2.copy(axis).multiply(this.radius).add(this.position);
      target[0] = v1.clone();
      target[1] = v2.clone();
      return target
    }
    /**
     * 
     * @param {Shape} shape 
     * @param {Vector[]} [target=[]] target
     * @returns Array<Vector>
     */
    getNormals(shape, target = []) {
      let min = null,
        vertex = null;
      for (let i = 0; i < shape.vertices.length; i++) {
        let a = this.position.distanceToSquared(shape.vertices[i]);
        if (!min || min > a) {
          vertex = shape.vertices[i];
          min = a;
        }
      }
      if (!vertex) vertex = shape.position;
      target.push(_vec1.copy(vertex).sub(this.position).normalize().clone());
      return target
    }
    /**
     * @inheritdoc
     * 
     * @param {Vector} position
     * @param {number} angle
     * @param {number} scale 
     */
    update(position, angle, scale) {
      this.position.copy(position).add(this.offPosition);
      this.angle = this.offAngle + angle;
    }
    get area() {
      return Math.PI * this.radius * this.radius
    }
  }

  class Rectangle extends Shape {
    /**
     * @type number
     */
    height = 0
    /**
     * @type number
     */
    width = 0
    /**
     * @param {number} width
     * @param {number} height
     * @param {Vector} offset Positional offset from the body center.
     *  @param {number} offsetAngle Angular offset from the body center.
     */
    constructor(width, height, offset, offsetAngle) {
      let v1 = new Vector(-width / 2, -height / 2);
      let v2 = new Vector(-width / 2, height / 2);
      let v3 = new Vector(width / 2, height / 2);
      let v4 = new Vector(width / 2, -height / 2);
      super([v1, v2, v3, v4], offset, offsetAngle);
      this.height = height;
      this.width = width;
    }
    /**
     * @inheritdoc
     * @param {number} mass of the body
     * @param {number} width
     * @param {number} height
     * @returns number
     */
    static calcInertia(mass, width, height) {
      return mass * (sq(width) + sq(height)) / 12
    }
    get area() {
      return this.width * this.height
    }

  }

  let tmp1$b = new Vector(),
    tmp2$9 = new Vector();

  /**
   * A triangular shape.
   * 
   * @augments Shape
   */
  class Triangle extends Shape {
    /**
     * @param {number} length1 Length of one side.
     * @param {number} length2 Length of a second side.
     * @param {number} angle The angle between the two sides.
     * @param {Vector} offset Positional offset from the body center.
     * @param {number} offsetAngle Angular offset from the body center.
     * 
     */
    constructor(length1, length2, angle, offset, offsetAngle) {
      let l1 = tmp1$b.set(1, 0).multiply(length1);
      let l2 = Vector.fromDeg(angle, tmp2$9).multiply(length2);
      super([
         new Vector(
          -l1.x / 2,
          -l2.y / 2
        ),
          new Vector(
          l1.x / 2,
          -l2.y / 2
        ),
          new Vector(
          l2.x / 2,
          l2.y / 2
        )
        ], offset, offsetAngle);
    }
  }

  /**
   * Holds information needed for collision detection and response.
   * 
   * @implements Component
   */
  class Body {
    /**
     * Unique identification of a body.
     * 
     * @type number
     */
    id = Utils$1.generateID()
    /**
     * World space coordinates of a body
     * 
     * @private
     * @type Vector
     */
    _position = new Vector()
    /**
     * velocity of a body.Speed in pixels per second.
     * 
     * @private
     * @type Vector
     */
    _velocity = new Vector()
    /**
     * acceleration of a body in pixels per second squared.
     * 
     * @private
     * @type Vector
     */
    _acceleration = new Vector()
    /**
     * World space orientation of a body
     * 
     * @private
     * @type Angle
     */
    _orientation = new Angle()
    /**
     * Rotation of a body
     * 
     * @private
     * @type Angle
     */
    _rotation = new Angle()
    /**
     * Mass of the body.
     * 
     * @private
     * @type number
     * @default 1
     */
    _mass = 1
    /**
     * Rotational inertia of the body.
     * 
     * @private
     * @type number
     */
    _inertia = 1
    /**
     * Type of the body e.g Dynamic, Kinematic or Static.
     * 
     * @private
     * @type number
     */
    _type = 0
    /**
     * Anchors of the body in local space.
     * 
     * @private
     * @type Vector[]
     */
    _localanchors = []
    /**
     * The original anchors of the body in local space.
     * 
     * @private
     * @type Vector[]
     */
    anchors = []
    /**
     * Position of a body in the last frame..
     * 
     * @type Vector
     */
    lastPosition = new Vector()
    /**
     * Inverse mass of the body.
     * 
     * @type number
     */
    inv_mass = 0
    /**
     * Inverse inertia of the body.
     * 
     * @type number
     */
    inv_inertia = 0
    /**
     * The bounciness of the body between 0 and 1.
     * 
     * @type number
     * @default Settings.restitution
     */
    restitution = Settings.restitution
    /**
     * The friction of the body between 0 and 1 that affects it before it moves.
     * 
     * @type number
     * @default Settings.staticFriction
     */
    staticFriction = Settings.staticFriction
    /**
     * The friction of the body between 0 and 1that affects it after it moves.
     * 
     * @type number
     * @default Settings.kineticFriction
     */
    kineticFriction = Settings.kineticFriction
    /**
     * The padding of the body's bounds.
     * 
     * @type number
     * @default Settings.boundPadding
     */
    boundPadding = Settings.boundPadding
    /**
     * The index of the body in its manager.
     * 
     * @package
     * @type number
     * @default -1
     */
    index = -1
    /**
     * Used to describe how bodies will collide with each other.
     * Bodies in the same layer or layer 0 will always collide with each other unless they are in different groups.
     * Bodies in the same group will not collied with each other.
     * 
     * @type {{layer:number, group: number}}
     * @default -1
     */
    mask = {
      layer: 0,
      group: 0
    }
    /**
     * Object containing the body
     * 
     * @type Entity | null
     */
    entity = null
    /**
     * World space bounds of a body.
     * 
     * @type BoundingBox | BoundingCircle | null
     */
    bounds = null
    /**
     * Shapes a body is comprised of.
     * 
     * @type Shape[]
     */
    shapes = null
    /**
     * Client of the body inside a broadphase.
     * 
     * @package
     * @type Object | null
     */
    client = null
    /**
     * Whether the body should sleep when at rest or not.
     * 
     * @type boolean
     * @default Settings.allowSleep
     */
    allowSleep = Settings.allowSleep
    /**
     * If the body is asleep or not.
     * 
     * @type boolean
     */
    sleeping = false
    /**
     * Whether the body should detect collisions with bounds only.If true,no collision response will occur.Precollision event only will be fired.
     * 
     * @type boolean
     * @default Settings.aabbDetectionOnly
     */
    aabbDetectionOnly = Settings.aabbDetectionOnly
    /**
     * Whether the body should respond to collisions.If false,no collision response will occur but collision events will still be fired.
     * 
     * @type boolean
     * @default Settings.collisionResponsefired
     */
    collisionResponse = Settings.collisionResponse
    /**
     * Whether or not the bounds should be automatically updated.
     * 
     * @type boolean
     * @default Settings.autoUpdateBound
     */
    autoUpdateBound = Settings.autoUpdateBound
    /**
     * @param {Shape[]} shapes
     */
    constructor(...shapes) {
      this.type = Settings.type;
      this.shapes = shapes;
      this.mass = 1;
      this.inertia = 1;
    }
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
    set type(x) {
      if (x === Body.STATIC || x === Body.KINEMATIC) this.mass = 0;
      this._type = x;
    }
    get type() {
      return this._type
    }
    /**
     * Used to determine what it is in a world.
     * 
     * @package
     * @type number 
     */
    get physicsType() {
      return ObjType.BODY
    }
    get CHOAS_CLASSNAME() {
      return this.constructor.name.toLowerCase()
    }
    get CHAOS_OBJ_TYPE() {
      return "body"
    }
    /**
     * Acceleration of a body
     * 
     * @type Vector
     */
    get acceleration() {
      return this._acceleration
    }
    set acceleration(x) {
      this._acceleration.copy(x);
    }
    /**
     * Velocity of a body
     * 
     * @type Vector
     */
    get velocity() {
      return this._velocity
    }
    set velocity(x) {
      this._velocity.copy(x);
    }
    /**
     * Rotation of a body
     * 
     * @type Angle
     */
    get rotation() {
      return this._rotation
    }
    set rotation(x) {
      this._rotation.copy(x);
    }
    /**
     * Orientation of a body in degrees.
     * 
     * @type number
     */
    set angle(angle) {
      this.orientation.degree = angle;
    }
    get angle() {
      return this.orientation.degree
    }
    /**
     * Mass of a body.
     * 
     * @type number
     */
    set mass(x) {
      this._mass = x;
      this.inv_mass = x === 0 ? 0 : 1 / x;
      if (x == 0) this.inertia = 0;
    }
    get mass() {
      return this._mass
    }
    /**
     * Density of a body.
     *
     * @type number
     */
    set density(x) {
      let area = 0;
      for (var i = 0; i < this.shapes.length; i++) {
        area += this.shapes[i].area;
      }
      this.mass = x * area * 0.01;
    }
    get density() {
      let area = 0;
      for (var i = 0; i < this.shapes.length; i++) {
        area += this.shapes[i].area;
      }
      return 100 * this.mass / area
    }
    /**
     * Rotational inertia of a body.
     * 
     * @type number
     */
    set inertia(x) {
      this._inertia = x;
      this.inv_inertia = x == 0 ? 0 : 1 / x;
    }
    get inertia() {
      return this._inertia
    }
    /**
     * World space position of a body
     * 
     * @type Vector
     */
    get position() {
      return this._position
    }
    set position(x) {
      this._position.copy(x);
    }
    /**
     * Orientation of a body
     * 
     * @type Angle
     */
    set orientation(r) {
      this._orientation.copy(r);
    }
    get orientation() {
      return this._orientation
    }
    /**
     * Angular velocity of a body in degrees
     * 
     * @type number 
     */
    get angularVelocity() {
      return this.rotation.degree
    }
    set angularVelocity(x) {
      this.rotation.degree = x;
    }
    /**
     * Sets an anchor that is relative to the center of the body into it.The anchor's world coordinates will be updated when the body too is updated.
     * 
     * @param {Vector} v The anchor arm
     * @returns {number}
     */
    setAnchor(v) {
      this.anchors.push(new Vector(v.x, v.y).rotate(this.orientation.radian).add(this.position));
      return this._localanchors.push(v) - 1
    }
    /**
     * Gets an anchor in its local space coordinate form.
     * Treat the returned value as read-only.
     * 
     * @param {number} index the position of the
     * @returns {Vector}
     */
    getAnchor(index) {
      return this.anchors[index]
    }
    /**
     * Returns a rotated anchor relative to the body.
     * 
     * @param {number} index The position of the anchor.
     * @param {Vector} [target=Vector] Vector to store results in.
     * @returns {Vector}
     */
    getLocalAnchor(index, target = new Vector()) {
      return target.copy(this._localanchors[index]).rotate(this.orientation.radian)
    }
    /**
     * Applies a force to a body affecting its direction of travel and rotation.
     * 
     * 
     * @param {Vector} force The force to be applied.
     * @param {Vector} [arm=Vector] The collision arm.
     */
    applyForce(force, arm = Vector.ZERO) {
      this.acceleration.add(force.multiply(this.inv_mass));
      this.rotation.degree += arm.cross(force) * this.inv_inertia;
    }

    /**
     * Initializes the body to its given.Called by the world or an entity manager.
     * 
     * @param {Entity | null} entity
     * @param {boolean} [composited=false]
     */
    init(entity, composited = false) {
      this.entity = entity;
      if (composited) {
        this.bounds = new BoundingBox();
        this.update();
        return
      }
      this.requires("transform", "movable", "bounds");

      let transform = entity.get("transform");
      let bounds = entity.get("bounds").bounds;
      let move = entity.get("movable");
      this._acceleration = move.acceleration;
      this._rotation = move.rotation;
      this._velocity = move.velocity;
      this._position = transform.position;
      this._orientation = transform.orientation;
      this.bounds = bounds;

      this.update();
    }

    /**
     * This updates the world coordinates of shapes, anchors and bounds.
     */
    update() {
      for (var i = 0; i < this.shapes.length; i++) {
        this.shapes[i].update(this.position, this._orientation.radian);
      }
      for (var i = 0; i < this.anchors.length; i++) {
        this.anchors[i].copy(this._localanchors[i]).rotate(this.orientation.radian);//.add(this.position)
      }
      if (this.autoUpdateBound)
        this.bounds.calculateBounds(this, this.boundPadding);
      this.bounds.update(this.position);
      //this.angle = this.angle > 360 ? this.angle - 360 : this.angle < 0 ? 360 + this.angle : this.angle
    }
    /**
     *Body type that dictates a body cannot move nor respond to collisions.
     * 
     * @static
     * @type number*/
    static STATIC = ObjType.STATIC
    /**
     * Body type that dictates a body can move but not respond to collisions.
     * 
     * @static
     * @type number
     */
    static KINEMATIC = ObjType.KINEMATIC
    /**
     * Body type that dictates a body can move and respond to collisions.
     * 
     * @static
     * @type number
    */
    static DYNAMIC = ObjType.DYNAMIC
  }
  Utils$1.inheritComponent(Body, false, false);

  class HeightMap extends Body {
    constructor(step, heights) {
      let l = [],
        j = [];
      for (let i = 0; i < heights.length; i++) {
        l.push(new Vector(step * i, heights[i]));
      }
      for (let i = 1; i < l.length; i++) {
        let line = new Line(l[i - 1], l[i]);
        j.push(line);
      }
      super(new Vector(), ...j);
      this.mass = 0;
      this.mask.layer = 0;
    }
  }

  /**
   * A body with a circle shape on it.
   * 
   * @augments Body
   */
  class Ball extends Body {
    /**
     * @param {number} radius
    */
    constructor(radius) {
      super(new Circle(radius));
      this.inertia = Circle.calcInertia(this.mass, radius);
    }
    /**
     * @inheritdoc
     * @type number 
     */
    get mass() {
      return this._mass
    }
    set mass(x) {
      this._mass = x;
      this.inv_mass = x === 0 ? 0 : 1 / x;
      this.inertia = Circle.calcInertia(this.mass, this.shapes[0].radius);
    }
  }

  /**
   * A body with a rectangle shape on it.
   * 
   * @augments Body
  */
  class Box extends Body {
    /**
     * @param {number} w
     * @param {number} h
    */
    constructor(w,h) {
      super(new Rectangle(w,h));
      this.inertia = Rectangle.calcInertia(this._mass,w,h);
      
    }
    /**
     * @inheritdoc
     * @type number 
    */
    set mass(x){
      this._mass = x;
      this.inv_mass = x === 0 ? 0 : 1 / x;
      this.inertia = Rectangle.calcInertia(x,this.shapes[0].width,this.shapes[0].height);
    }
    get mass(){
      return this._mass
    }
  }

  /**
   * Holds a group of related bodies and constraints.
   */
  class Composite {
    /**
     * Entity this belongs to.
     * 
     * @type Entity | null
     */
    entity = null
    /**
     * List of bodies contained.
     *
     * @type Body[]
     */
    bodies = []
    /**
     * List of bodies contained.
     *
     * @type Constraint[]
     */
    constraints = []
    /**
     * Used to determine what it is in a world.
     * 
     * @package
     * @type number 
     */
    get physicsType() {
      return ObjType.COMPOSITE
    }
    /**
     * Initializes the body to its given.Called by the world or an entity manager.
     * 
     * @param {Entity | null} entity
     * @param {boolean} composited
     */
    init(entity) {
      this.bodies.forEach(e => {
        e.init(entity, true);
      });
      this.requires("transform");

    }
    /**
     * @param {Constraint | Body} object
     */
    add(object) {
      if (object.physicsType === ObjType.CONSTRAINT)
        return this.constraints.push(object)
      if (object.physicsType === ObjType.BODY)
        this.bodies.push(object);
    }
    /**
     * This updates the world coordinates of shapes, anchors and bounds.
     */
    update() {
      this.lastPosition.copy(this.position);
    }
    /**
     * Acceleration of a body
     * 
     * @type Vector
     */
    get acceleration() {
      let acceleration = new Vector();
      for (var i = 0; i < this.bodies.length; i++) {
        acceleration.copy(this.bodies[i].acceleration);
      }
      return acceleration.divide(this.bodies.length)
    }
    set acceleration(x) {
      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].acceleration = x;
      }
    }
    /**
     * Velocity of a body
     * 
     * @type Vector
     */
    get velocity() {
      let velocity = new Vector();

      for (var i = 0; i < this.bodies.length; i++) {
        velocity.add(this.bodies[i].velocity);
      }
      return velocity.divide(this.bodies.length)
    }
    set velocity(x) {
      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].velocity.copy(x);
      }
    }
    /**
     * Orientation of a body in degrees.
     * 
     * @type number
     */
    get angle() {
      let angle = 0;
      for (var i = 0; i < this.bodies.length; i++) {
        angle += this.bodies[i].angle;
      }
    }
    set angle(angle) {
      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].angle = x;
      }
    }

    /**
     * Mass of a body.
     * 
     * @type number
     */
    set mass(x) {
      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].mass = x;
      }
    }
    get mass() {
      let mass = 0;
      for (var i = 0; i < this.bodies.length; i++) {
        mass += this.bodies[i].mass;
      }
      return mass
    }
    /**
     * Density of a body.
     * 
     * @type number
     */
    set density(x) {
      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].density = x;
      }
    }
    get density() {
      let density = 0;
      for (var i = 0; i < this.bodies.length; i++) {
        density += this.bodies[i].density;
      }
      return density / this.bodies.length
    }
    /**
     * Position of a body
     * 
     * @type Vector
     */
    get position() {
      let position = new Vector();
      for (var i = 0; i < this.shapes.length; i++) {
        position.add(this.bodies[i].position);
      }
      return position
    }
    set position(x) {
      let dp = x.clone().sub(this.position);
      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].position.add(dp);
      }
    }
    /**
     * Orientation of a body
     * 
     * @type Angle
     */
    set orientation(r) {
      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].orientation.copy(r);
      }
    }
    get orientation() {
      let ang = 0;
      for (var i = 0; i < this.bodies.length; i++) {
        ang += this.bodies[i].orientation;
      }
      return ang / this.bodies.length
    }
    /**
     * Angular velocity of a body.
     * 
     * @type number
     */
    get angularVelocity() {
      let ang = 0;
      for (var i = 0; i < this.bodies.length; i++) {
        ang += this.bodies[i].angularVelocity;
      }
      return ang / this.bodies.length
    }
    set angularVelocity(x) {
      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].angularVelocity = x;
      }
    }
  }
  Utils$1.inheritComponent(Composite);

  /**
   * Base class for constructing different types of constraints.
   * 
   * @abstract
   * @see DistanceConstraint
   * @see SpringConstraint
   */
  class Constraint {
    /**
     * @param {Body} body1
     * @param {Body} body2
     * @param {Vector} localA
     * @param {Vector} localB
     */
    constructor(body1, body2, localA, localB) {
      this.body1 = body1;
      this.body2 = body2;
      this.localA = localA || new Vector();
      this.localB = localB || new Vector();
      this.stiffness = 50;
      this.dampening = 0.03;
    }
    /**
     * Determine type of object this is in the world.
     * 
     * @package
     * @type number
     */
    get physicsType() {
      return ObjType.CONSTRAINT
    }
    get CHOAS_CLASSNAME() {
      return this.constructor.name.toLowerCase()
    }
    get CHAOS_OBJ_TYPE() {
      return "constraint"
    }
    /**
     * Will refactor this out later.
     * 
     * @protected
     * @param {Body} body1
     * @param {Body} body2
     * @param {number} dt
     */
    behavior(body1, body2,dt) {
      body2.position.copy(body1.position);
    }
    /**
     * Updates constraint forces
     *
     * @param {number} dt
     */
    update(dt) {
      this.behavior(this.body1, this.body2,dt);
    }
  }

  let tmp1$a = new Vector(),
    tmp2$8 = new Vector(),
    tmp3$5 = new Vector(),
    tmp4$4 = new Vector(),
    tmp5$3 = new Vector();

  /**
   * This constraint is stronger than a spring in the sense that it will not oscilate as such as a spring constraint.
   */
  class DistanceConstraint extends Constraint {
    /**
     * @param {Body} body1
     * @param {Body} body2
     * @param {Vector} localA
     * @param {Vector} localB
     */
    constructor(body1, body2, localA, localB) {
      super(body1, body2,localA,localB);
      this.fixed = !body1.mass || !body2.mass;
      this.dampening = 1;
      this.maxDistance = 1;
      this.stiffness = 1;
    }
    /**
     * @inheritdoc
     * 
     * @param {Body} body1
     * @param {Body} body2
     * @param {number} dt
    */
    behavior(body1, body2,dt) {
      let arm1 = tmp1$a.copy(this.localA),
        arm2 = tmp2$8.copy(this.localB),
        pos1 = tmp3$5.copy(body1.position).add(arm1),
        pos2 = tmp4$4.copy(body2.position).add(arm2),
        dist = pos1.sub(pos2),
        magnitude = dist.magnitude();

      if (magnitude === 0) {
        return
      }
      let difference = (magnitude - this.maxDistance) / magnitude,
        force = dist.multiply(difference * this.stiffness * this.dampening),
        massTotal = body1.inv_mass + body2.inv_mass;
        body1.inv_inertia + body2.inv_inertia;
      tmp4$4.copy(force);
      force.divide(massTotal * 2);

      body1.velocity.add(tmp5$3.copy(force).multiply(-body1.inv_mass).divide(dt));
      body2.velocity.add(tmp5$3.copy(force).multiply(body2.inv_mass).divide(dt));

      body1.position.add(tmp5$3.copy(force).multiply(-body1.inv_mass));
      body2.position.add(tmp5$3.copy(force).multiply(body2.inv_mass));

      body1.rotation.radian += tmp4$4.cross(arm1) * body1.inv_inertia;
      body2.rotation.radian += tmp4$4.cross(arm2) * -body2.inv_inertia;
    }
  }

  let tmp1$9 = new Vector(),
    tmp2$7 = new Vector(),
    tmp3$4 = new Vector(),
    tmp4$3 = new Vector(),
    tmp5$2 = new Vector(),
    zero = new Vector();
   /**
    * A constraint that acts like a spring between two bodies
   */
  class SpringConstraint extends Constraint {
    /**
     * @param {Body} body1
     * @param {Body} body2
     * @param {Vector} localA
     * @param {Vector} localB
     */
    constructor(body1, body2, localA, localB) {
      super(body1, body2);
      this.localA = new Vector().copy(localA || zero);
      this.localB = new Vector().copy(localB || zero);
      this.fixed = !body1.mass || !body2.mass;
      this.dampening = 1;
      this.maxDistance = 100;
      this.stiffness = 1;
    }
      /**
     * @inheritdoc
     * 
     * @param {Body} body1
     * @param {Body} body2
     * @param {number} dt
    */
    behavior(body1, body2, dt) {
      let arm1 = tmp1$9.copy(this.localA),
        arm2 = tmp2$7.copy(this.localB),
        pos1 = tmp3$4.copy(body1.position).add(arm1),
        pos2 = tmp4$3.copy(body2.position).add(arm2),
        dist = pos1.sub(pos2),
        magnitude = dist.magnitude();

      if (magnitude === 0) {
        return
      }
      let difference = (magnitude - this.maxDistance) / magnitude,
        force = dist.multiply(difference * this.stiffness * this.dampeninging),
        massTotal = body1.inv_mass + body2.inv_mass,
        inertiaTotal = body1.inv_inertia + body2.inv_inertia;
        force.divide(massTotal + inertiaTotal);
        body1.velocity.add(tmp5$2.copy(force).multiply(-body1.inv_mass));
        body2.velocity.add(tmp5$2.copy(force).multiply(body2.inv_mass));
        
        body1.rotation.radian += force.cross(arm1) * body1.inv_inertia;
        body2.rotation.radian += force.cross(arm2) * -body2.inv_inertia;
    }
  }

  let position = new Vector();
  let acceleration = new Vector();
  let velocity = new Vector();

  /**
   * Verlet intergration.
   * Used so that constraints can be stable at little performance cost.
  */
  class VerletSolver {
    /**
     * @param {Body} body
     * @param {number} dt
     */
    static solve(body, dt) {
      acceleration.copy(body.acceleration).multiply(dt * 0.5);
      velocity.copy(body.velocity);
      position.copy(body.position);
      body.acceleration.set(0, 0);
      body.velocity.add(acceleration);
      position.add(velocity.multiply(dt)).add(acceleration.multiply(dt));
      body.position = position;
      body.angle += body.angularVelocity * dt;
    }
  }

  let tmp1$8 = new Vector(),
    tmp2$6 = new Vector(),
    tmp3$3 = new Vector(),
    tmp4$2 = new Vector(),
    tmp5$1 = new Vector();

  /**
   * Solves for impulse along collision tangent for a given body pair.
  */
  const FrictionSolver = {
    /***/
    solve(manifold) {
      let { bodyA: a, bodyB: b, ca1, ca2, restitution, impulse } = manifold;
      let { axis } = manifold.contactData;
      if (impulse <= 0) return
      let a$va = tmp1$8.set(ca1.y * -a.rotation._rad, ca1.x * a.rotation._rad);
      let a$vb = tmp2$6.set(ca2.y * -b.rotation._rad, ca2.x * b.rotation._rad);
      let va = tmp3$3.copy(a.velocity).add(a$va);
      let vb = tmp4$2.copy(b.velocity).add(a$vb);
      let relVel = va.sub(vb);
      if (relVel.magnitudeSquared() === 0)
        return
      let tangent = axis.normal(1, tmp4$2);
      tangent = tangent.multiply(tangent.dot(relVel));
      if (tangent.magnitudeSquared() === 0) return
      tangent.normalize();

      let relV = tangent.dot(relVel);

      let sf = Math.min(a.staticFriction, b.staticFriction);
      let kf = Math.min(a.kineticFriction, b.kineticFriction);
      let j = -relV / (
        (a.inv_mass + b.inv_mass) +
        sq((ca1.dot(tangent)) * a.inv_inertia + sq(ca2.dot(tangent)) * b.inv_inertia)
      );

      let jt;
      if (Math.abs(j) <= impulse * sf) {
        jt = tangent.multiply(j);

      } else {
        jt = tangent.multiply(j * kf);
      }

      manifold.velA.add(tmp5$1.copy(jt).multiply(a.inv_mass));
      manifold.velB.add(tmp5$1.copy(jt).multiply(-b.inv_mass));
      manifold.rotA += ca1.cross(jt) * a.inv_inertia;
      manifold.rotB += ca2.cross(jt) * -b.inv_inertia;
    }
  };

  let v = { x: 0, y: 0 };

  let velocityLimit = 1;
  let angularVelocityLimit = 1;
  let impulselimit = 0.8;

  /**
   * Determines if the body pair should be put to sleep.
  */
  const ContactSolver = {
    solve(a, b, impulse, contactNo) {
      if (contactNo == 2) {
        if (Math.abs(a.angularVelocity) > angularVelocityLimit) a.angularVelocity = 0;
        if (Math.abs(b.angularVelocity) > angularVelocityLimit) b.angularVelocity = 0;
      }
      if (impulse > impulselimit) return
      if (a.velocity.magnitude() > velocityLimit && Math.abs(a.angularVelocity) > angularVelocityLimit) return
      if (b.velocity.magnitude() > velocityLimit && Math.abs(b.angularVelocity) > angularVelocityLimit) return
      if (!a.allowSleep || !b.allowSleep)
        return
      a.sleeping = true;
      a.velocity = v;
      a.acceleration = v;
      b.sleeping = true;
      b.velocity = v;
      b.acceleration = v;
    }
  };

  const tmp1$7 = new Vector(),
    tmp2$5 = new Vector();
  let dampen = Settings.posDampen;

  /**
   * Solves the interpenetration of bodies.
  */
  const PenetrationSolver = {
    solve(manifold, inv_dt) {
      let { bodyA, bodyB, ca1, ca2 } = manifold;
      let { axis, overlap } = manifold.contactData;

      const dampened = overlap * dampen;
      const a = dampened / (bodyA.inv_mass + bodyB.inv_mass + sq(ca1.cross(axis)) * bodyA.inv_inertia + sq(ca2.cross(axis)) * bodyB.inv_inertia);
      let jp = tmp2$5.copy(axis).multiply(a);
      bodyA.velocity.add(tmp1$7.copy(jp).multiply(bodyA.inv_mass * inv_dt));
      bodyB.velocity.add(tmp1$7.copy(jp).multiply(-bodyB.inv_mass * inv_dt));
      bodyA.rotation.radian += ca1.cross(jp) * bodyA.inv_inertia * inv_dt;
      bodyB.rotation.radian += ca2.cross(jp) * -bodyB.inv_inertia * inv_dt;
      manifold.contactData.lastOverlap = overlap;
    }
  };

  let tmp1$6 = new Vector(),
    tmp2$4 = new Vector(),
    tmp3$2 = new Vector(),
    tmp4$1 = new Vector();

  /**
   * Solves for the collision normal impulse of a given body pair.
  */
  const ImpulseSolver = {
    solve(manifold) {
      let { bodyA, bodyB, ca1, ca2, restitution } = manifold;
      let { axis } = manifold.contactData;
      let a$va = tmp1$6.set(ca1.y * -bodyA.rotation.radian, ca1.x * bodyA.rotation.radian);
      let a$vb = tmp2$4.set(ca2.y * -bodyB.rotation.radian, ca2.x * bodyB.rotation.radian);
      let va = tmp3$2.copy(bodyA.velocity).add(a$va);
      let vb = tmp4$1.copy(bodyB.velocity).add(a$vb);
      let vp = va.sub(vb);
      let vp_p = axis.dot(vp);

      if (vp_p >= 0) {
        manifold.impulse = 0;
        return
      }
      ////this used to be -(1 + restitution) but when i changed it,stability ensued.
      //i think the reason of the previous instability is because i changed the penetration solver to be impulse based from position based.
      //so.. i came back to that....
      let j = -(restitution) * vp_p / (
        (bodyA.inv_mass + bodyB.inv_mass) +
        sq(ca1.cross(axis)) * bodyA.inv_inertia +
        sq(ca2.cross(axis)) * bodyB.inv_inertia);

      let jn = axis.clone().multiply(j);
      let ang1 = ca1.cross(jn) * bodyA.inv_inertia;
      let ang2 = ca2.cross(jn) * -bodyB.inv_inertia;
      let vel1 = jn.clone().multiply(bodyA.inv_mass);
      let vel2 = jn.clone().multiply(-bodyB.inv_mass);
      manifold.velA.copy(vel1);
      manifold.velB.copy(vel2);
      manifold.rotA = ang1;
      manifold.rotB = ang2;
      manifold.impulse = j;
    }
  };

  const _arr = [],
    tmp1$5 = {
      overlap: 0,
      verticesA: null,
      verticesB: null,
      axis: new Vector(),
      vertex: null,
      shape: null
    },
    tmp2$3 = {
      min: 0,
      max: 0,
      indexN: 0
    },
    tmp3$1 = {
      min: 0,
      max: 0,
      indexN: 0
    },
    tmp4 = new Vector(),
    tmp5 = new Vector(),
    tmp6 = new Vector();

  /**
   * Used for narrowphase collision detection and contact info generation.
   */
  const SAT = {
    /**
     * @param {Body} body1
     * @param {Body} body2
     * @param {Manifold} manifold
     */
    shapesInBodyCollided(body1, body2, manifold) {
      let shapesA = body1.shapes,
        shapesB = body2.shapes;
      for (var i = 0; i < shapesA.length; i++) {
        for (var j = 0; j < shapesB.length; j++) {
          SAT.shapesCollided(shapesA[i], shapesB[j], manifold);
        }
      }
      if (manifold.overlap < 0) return manifold
      let body = manifold.dorminantShape,
        axis = tmp5.copy(manifold.axis),
        shape1 = manifold.shapes[0],
        shape2 = manifold.shapes[1];
      let overload = [];
      const vertices1 = SAT.findNearSupports(manifold.vertShapeA, axis, []);
      const vertices2 = SAT.findNearSupports(manifold.vertShapeB, tmp6.copy(axis).reverse(), []);
      for (var i = 0; i < vertices1.length; i++) {
        if (SAT.shapeContains(shape2, vertices1[i])) {
          overload.push(vertices1[i]);
        }
      }
      if (overload.length < 2) {
        for (var i = 0; i < vertices2.length; i++) {
          if (SAT.shapeContains(shape1, vertices2[i])) {
            overload.push(vertices2[i]);
            if (!overload.length)
              shape = shape2;
          }
        }
      }
      //some random error happened when this is not there.
      //Dont know if it isnt there now but i dont want to risk it ¯⁠\⁠_⁠(⁠ツ⁠)⁠_⁠/⁠¯
      if (overload.length == 0) {
        overload.push(vertices1[0]);
      }

      overload = SAT.findNearSupports(overload, axis, []);
      if (body == shape2) axis.reverse();
      if (body == shape1) {
        manifold.verticesA[0] = overload[0];
        manifold.verticesB[0] = overload[0].clone().add(tmp6.copy(axis).multiply(manifold.overlap));
        if (overload.length == 2) {
          manifold.verticesA[1] = overload[1];
          manifold.verticesB[1] = overload[1].clone().add(tmp6.copy(axis).multiply(manifold.overlap));
        }
      }
      if (body == shape2) {
        manifold.verticesA[0] = overload[0].clone()
          .add(tmp6.copy(axis).multiply(manifold.overlap));
        manifold.verticesB[0] = overload[0];
        if (overload.length == 2) {
          manifold.verticesA[1] = overload[1].clone().add(tmp6.copy(axis).multiply(manifold.overlap));
          manifold.verticesB[1] = overload[1];
        }
      }
      manifold.contactNo = overload.length;
      return manifold
    },
    /**
     * @param {Shape} shape1
     * @param {Shape} shape2
     * @param {Object} target
     */
    shapesCollided(shape1, shape2, target) {
      let arr = _arr,
        boundary;
      Utils$1.clearArr(arr);
      shape1.getNormals(shape2, arr);
      boundary = arr.length;
      shape2.getNormals(shape1, arr);

      SAT.projectShapesToAxes(shape1, shape2, arr, target, boundary);
    },
    /**
     * @param {Shape} shapeA
     * @param {Shape} shapeB
     * @param {Vector[]} axes
     * @param {Manifold} shapeA
     * @param {number} iu
     */
    projectShapesToAxes(shapeA, shapeB, axes, manifold, iu) {
      let temp = tmp1$5;
      temp.vertex = null;
      temp.body = null;
      temp.overlap = Infinity;
      for (let i = 0; i < axes.length; i++) {
        let axis = tmp4.copy(axes[i]);

        let verticesA = shapeA.getVertices(axis);
        let verticesB = shapeB.getVertices(axis);
        let p1 = SAT.projectVerticesToAxis(verticesA, axis, tmp2$3);
        let p2 = SAT.projectVerticesToAxis(verticesB, axis, tmp3$1);
        let min = p1.max < p2.max ? p1.max : p2.max;
        let max = p1.min > p2.min ? p1.min : p2.min;
        let overlap = min - max;
        if (overlap < 0) return manifold

        if (p1.max < p2.max) axis.reverse();
        if (
          (p1.max > p2.max && p1.min < p2.min) ||
          (p2.max > p1.max && p2.min < p1.min)
        ) {
          let max = Math.abs(p1.max - p2.max),
            min = Math.abs(p1.min - p2.min);
          if (min < max) {
            overlap += min;
          } else {
            overlap += max;
            axis.reverse();
          }
        }
        if (overlap < temp.overlap) {
          temp.overlap = overlap;
          temp.axis.copy(axis);
          temp.shape = i <= iu - 1 ? shapeB : shapeA;
          temp.indexA = p1.indexN;
          temp.indexB = p2.indexN;
          temp.verticesA = verticesA;
          temp.verticesB = verticesB;
        }
      }
      if (temp.overlap > manifold.overlap) {
        manifold.overlap = temp.overlap;
        manifold.axis.copy(temp.axis);
        manifold.dorminantShape = temp.shape;
        manifold.shapes[0] = shapeA;
        manifold.shapes[1] = shapeB;
        manifold.vertShapeA = temp.verticesA;
        manifold.vertShapeB = temp.verticesB;
        manifold.indexA = temp.indexA;
        manifold.indexB = temp.indexB;
        manifold.done = true;
      }
      return manifold
    },
    /**
     * @param {Vector[]} vertices
     * @param {Vector} axis
     * @param {Object} target
     */
    projectVerticesToAxis(vertices, axis, target) {
      let min = Infinity,
        max = -Infinity,
        nearVertex = null,
        length = vertices.length;

      for (let i = 0; i < length; i++) {
        let point = axis.dot(vertices[i]);
        if (point < min) {
          min = point;
          nearVertex = i;
        }
        if (point > max) {
          max = point;
        }
      }
      target.min = min;
      target.max = max;
      target.indexN = nearVertex;
      return target
    },
    /**
     * @param {Vector[]} vertices
     * @param {Vector} axis
     * @param {Vector[]} target
     * @param {number} nearVertexIndex
     */
    findNearSupports(vertices, axis, target = [], nearVertexIndex) {
      let min = Infinity,
        nearVertices = target,
        length = vertices.length;

      for (let i = 0; i < length; i++) {
        let point = axis.dot(vertices[i]);
        if (
          Math.abs(point - min) <= 0.1 &&
          !nearVertices.includes(vertices[i])
        ) {
          nearVertices.push(vertices[i]);
          continue
        }
        if (point < min) {
          min = point;
          Utils$1.clearArr(nearVertices);
          nearVertices.push(vertices[i]);
          i = -1;
        }
      }
      return nearVertices
    },
    /**
     * @param {Shape} shape
     * @param {Vector} point
     */
    shapeContains(shape, point) {
      if (shape.type == "circle")
        return SAT.circleContains(shape.position, shape.radius, point)
      return SAT.verticesContain(shape.vertices, point)
    },
    /**
     * @param {Vector} position
     * @param {number} radius
     * @param {Vector} point
     */
    circleContains(position, radius, point) {
      let dx = point.x - position.x,
        dy = point.y - position.y;
      if (dx * dx + dy * dy > radius * radius)
        return false
      return true
    },
    /**
     * @param {Vector[]} vertices
     * @param {number} point 
     */
    verticesContain(vertices, point) {
      var pointX = point.x,
        pointY = point.y,
        length = vertices.length,
        vertex = vertices[length - 1],
        nextVertex;
      if (length < 2) return false
      for (var i = 0; i < length; i++) {
        nextVertex = vertices[i];
        if ((pointX - vertex.x) * (nextVertex.y - vertex.y) +
          (pointY - vertex.y) * (vertex.x - nextVertex.x) < 0) {
          return false;
        }
        vertex = nextVertex;
      }

      return true;
    }
  };

  /**
   * This is an abstract class that extended to classes that are used to filter out unnecessary collision checks to boost performance.
   * 
   * @abstract
   * @see QuadtreeBroadphase
   * @see GridBroadphase
   * @see AABBBroadphase
   */
  class Broadphase {
    /**
     * Checks to see if two bodies can proceed to have their bounding boxes checked 
     * 
     * @param {Body} a
     * @param {Body} b
     */
    canCollide(a, b) {
      if (a.mass == 0 && b.mass == 0)
        return false
      if (
        (a.mask.group !== 0 && b.mask.group !== 0) &&
        a.mask.group == b.mask.group
      ) return false
      if (a.mask.layer && b.mask.layer && a.mask.layer !== b.mask.layer)
        return false
      if (a.sleeping && b.sleeping) return false
      //console.log(a.mass,b.mass);
      return true
    }
    /**
     * Adds a body to the broadphase
     * 
     * @param {Body} obj
     */
    insert(obj) {}
    /**
     * Removes a body from the broadphase
     * 
     * @param {Body} obj
     */
    remove(obj) {}

    /**
     * Renders a representation of a broadphase
     */
    draw(ctx) {}
    /**
     * Updates the internals of the broadphase if needed.
     * 
     * @param {Body[]} bodies
     */
    update(bodies) {}
    /**
     * Gets all possibly colliding pairs.
     * 
     * @param {CollisionPair[]} target Empty array to store results.
     * @returns {CollisionPair[]}
     */
    getCollisionPairs(target) {}

    /**
     * Returns bodies that are within the given bound.
     * 
     * @param {Bounds} bounds Region to check in.
     * @param {Body[]} target Empty array to store results.
     * @returns {Body[]}
     */
    query(bounds, target) {}
  }

  /**
   * Most basic broadphase.Should be used when number of bodies are few(i.e less than 100)
  */
  class NaiveBroadphase extends Broadphase {
    /**
     * @private
     * @type Body[]
    */
    bodies = null
    constructor(world) {
      super();
      this.bodies = world.objects;
    }
    /**
     * @inheritdoc
     * @param {Bounds} bound Region to check in.
     * @param {Body[]} target Empty array to store results.
     * @returns {Body[]}
    */
    query(bound, target) {
      closeObjects = target || [];
      for (var i = 0; i < this.objects.length; i++) {
        let ob = this.world.objects[i];
        if (ob.bounds.intersects(bound) < dist)
          closeObjects.push(ob);
      }
      return closeObjects
    }
    /**
     * @inheritdoc
     * @param {CollisionPair[]} target Empty array to store results.
     * @returns {CollisionPair[]}
    */
    getCollisionPairs(target) {
      target = target || [];
      let bodies = this.bodies,
        length = bodies.length;
      for (let i = 0; i < length; i++) {
        let a = bodies[i];
        for (let j = i + 1; j < length; j++) {
          let b = bodies[j];
          if(!this.canCollide(a,b))continue
          if (!a.bounds.intersects(b.bounds))
            continue
          let list = {
            a,
            b
          };
          if (a.aabbDetectionOnly || b.aabbDetectionOnly) continue
          if (!a.shapes.length || !b.shapes.length) continue
          target.push(list);
        }
      }
      return target
    }

  }

  let Client$1 = class Client {
    constructor(body) {
      this.body = body;
      this.bounds = body.bounds.clone();
      this.node = null;
    }
  };

  class Node {
    /**@type Node[]*/
    children = []
    /**@type Body[]*/
    objects = []
    /**@type Node*/
    root = null
    /**@type Node*/
    parent = null
    /**@type boolean*/
    hasObjects = false
    /**@type number*/
    index = -1
    /**@type Tree*/
    global = null
    /**@type Vector_like*/
    dims = null
    /**@type number*/
    depth = -1
    /**@type {{
      max:Vector_like,
      min:Vector_like
    }}*/
    bounds = null
    /**
     * @param {{
      max:Vector_like,
      min:Vector_like
    }} bounds
    */
    constructor(bounds) {
      this.bounds = bounds;
      this.dims = {
        x: this.bounds.max.x - this.bounds.min.x,
        y: this.bounds.max.y - this.bounds.min.y
      };
    }
    /**
     * @param {Node} node
     */
    add(node) {
      node.index = this.children.length;
      this.children.push(node);
      node.depth = this.depth + 1;
      node.parent = this;
      node.global = this.global;
    }
    clear() {
      for (var i = 0; i < this.children.length; i++) {
        const node = nodes[i];

        this.children.remove(node);
        node.parent = null;
        node.global = null;
      }
    }
    /**
     * @param {number} depth
     */
    split(depth = 1) {
      let w = this.dims.x / 2;
      let h = this.dims.y / 2;
      let topLeft = new Node({
        min: {
          x: this.bounds.min.x,
          y: this.bounds.min.y
        },
        max: {
          x: this.bounds.min.x + w,
          y: this.bounds.min.y + h
        }
      });
      let topRight = new Node({
        min: {
          x: this.bounds.min.x + w,
          y: this.bounds.min.y
        },
        max: {
          x: this.bounds.max.x,
          y: this.bounds.max.y - h
        }
      });
      let bottomLeft = new Node({
        min: {
          x: this.bounds.min.x,
          y: this.bounds.min.y + h
        },
        max: {
          x: this.bounds.max.x - w,
          y: this.bounds.max.y
        }
      });
      let bottomRight = new Node({
        min: {
          x: this.bounds.min.x + w,
          y: this.bounds.min.y + h
        },
        max: {
          x: this.bounds.max.x,
          y: this.bounds.max.y
        }
      });
      this.add(topLeft);
      this.add(topRight);
      this.add(bottomLeft);
      this.add(bottomRight);
      if (depth <= 1) return
      this.children.forEach(e => e.split(depth - 1));
    }
    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "blue";
      ctx.strokeRect(this.bounds.min.x, this.bounds.min.y, this.dims.x, this.dims.y);
      ctx.stroke();
      ctx.closePath();
    }
    /**
     * @return boolean
     */
    isLeafNode() {
      return this.children.length == 0
    }
    /**
     * @return boolean
     */
    childrenHaveObj() {
      return this.children.length > 0 || (
        this.children[0].hasObjects ||
        this.children[1].hasObjects ||
        this.children[2].hasObjects ||
        this.children[3].hasObjects
      )
    }
    /**
     * @param {Bounds} bounds
     * @return boolean
     */
    intersects(bounds) {
      if (bounds.r)
        return Overlaps.AABBvsSphere(this.bounds, bounds)
      return Overlaps.AABBColliding(this.bounds, bounds)
    }
    /**
     * @param {Bounds} bounds
     * @return boolean
     */
    contains(bounds) {
      return (
        bounds.max.x < this.bounds.max.x &&
        bounds.max.y < this.bounds.max.y &&
        bounds.min.x > this.bounds.min.x &&
        bounds.min.y > this.bounds.min.y
      )
    }
    /**
     * @inheritdoc
     * @param {Bounds} bounds
     * @param {Body[]} [target]
     * @returns boolean
     */
    query(bounds, target = []) {
      if (!this.intersects(bounds))
        return target
      if (!this.isLeafNode()) {
        for (var i = 0; i < this.children.length; i++) {
          this.children[i].query(bounds, target);
        }
      }
      for (var i = 0; i < this.objects.length; i++) {
        let a = this.objects[i];
        if (a.bounds.intersects(bounds))
          target.push(a);
      }
      return target
    }
    /**
     * @param {Body} obj
     * @returns boolean
     */
    insertObject(obj) {
      if (!this.contains(obj.bounds))
        return false
      if (!this.isLeafNode()) {
        for (var i = 0; i < this.children.length; i++) {
          let r = this.children[i].insertObject(obj);
          if (r) {
            this.hasObjects = true;
            return true
          }
        }
      }
      if (this.contains(obj.bounds)) {
        this.objects.push(obj);
        obj.lastPosition.copy(obj.bounds.pos);
        this.hasObjects = true;
        return true
      }
      return false
    }
    /**
     * @param {Vector_like} position
     * @returns boolean
     */
    isInNode(position) {
      if (
        position.x > this.bounds.min.x &&
        position.y > this.bounds.min.y &&
        position.x < this.bounds.max.x &&
        position.y < this.bounds.max.y
      )
        return true
      return false
    }
    isRootNode() {
      return !this.parent
    }
    /**
     * @param {Body} obj
     */
    updateObject(obj) {
      this.removeObject(obj);
      this.global.insert(obj);
      return true
    }
    /**
     * @param {Body} obj
     * @returns boolean
     */
    removeObject(obj) {
      if (!this.isInNode(obj.lastPosition))
        return false
      let t = this.objects.indexOf(obj);
      if (t !== -1) {
        Utils$1.removeElement(this.objects, t);
        if (
          this.objects.length == 0 &&
          this.childrenHaveObj()
        ) this.hasObjects = false;
        return true
      }
      if (!this.isLeafNode()) {
        for (var i = 0; i < this.children.length; i++) {

          let r = this.children[i].removeObject(obj);
          if (r) {
            if (
              this.objects.length == 0 &&
              this.childrenHaveObj()
            ) this.hasObjects = false;
            return true
          }
        }
      }
      return false
    }
    /**
     * @param {Traverser} func
     * @param {[]} target
     *  @returns []
     */
    traverse(func, target) {
      if (!this.isLeafNode()) {
        for (var i = 0; i < 4; i++) {
          let t = this.children[i].traverse(func, target);
          if (t != undefined &&
            (typeof t == "object" && t.length)) return target
        }
      }
      func(this, target);
      if (this.isRootNode()) {
        return target
      }
    }
    /**
     * @param {CollisionPair[]} target
     * @param {CollisionPair[]} stack
     */
    getCollisionPairs(target, stack) {
      if (!this.hasObjects) return
      if (!this.isLeafNode()) {
        Utils$1.appendArr(stack, this.objects);
        for (var i = 0; i < 4; i++) {
          this.children[i].getCollisionPairs(target, stack);
        }
        Utils$1.popArr(stack, this.objects.length);
      }
      let length = stack.length,
        obLength = this.objects.length,
        a, b;
      if (obLength == 0) return
      for (var i = 0; i < obLength; i++) {
        for (var j = i + 1; j < obLength; j++) {
          a = this.objects[i];
          b = this.objects[j];
          if (a.index == b.index) continue
          if (!this.global.canCollide(a, b)) continue
          if (!a.bounds.intersects(b.bounds))
            continue
          target.push({
            a,
            b
          });
        }
      }

      for (var i = 0; i < length; i++) {
        for (var j = 0; j < obLength; j++) {
          a = stack[i];
          b = this.objects[j];
          if (!this.global.canCollide(a, b)) continue
          if (!a.bounds.intersects(b.bounds))
            continue
          target.push({
            a,
            b
          });
        }
      }


    }
  }

  /**
   * This is a bounded broadphase that is used to speed up collision testing on sparse number of objects over a large area.
   * 
   * @extends Broadphase
   */
  class Tree extends Broadphase {
    /**
     * @param {Bounds} bounds The region it operates on.
     * @param {number} [maxdepth=3] Maximum number of branches.
     * 
     */
    constructor(bounds, maxdepth = 3) {
      bounds = bounds || {
        min: {
          x: 0,
          y: 0
        },
        max: {
          x: 1000,
          y: 1000
        }
      };
      super();
      this._root = new Node(bounds);
      this._root.global = this;
      this._root.depth = 0;
      this.maxDepth = maxdepth;
      this.bounds = bounds;

      if (maxdepth) this._root.split(maxdepth);
    }
    _insert(client) {
      client.bounds.copy(client.body.bounds);
      if (!this._root.contains(obj.bounds))
        return //console.log("out of bounds");
      this._root.insertObject(obj);
    }
    /**
     * @inheritdoc
     * @param {Body} obj
     */
    insert(obj) {
      let client = body.client;
      if (client == null) {
        client = body.client = new Client$1(body);
      }
      this._insert(client);
    }
    _remove(client) {
      return this._root.removeObject(obj)
    }
    /**
     * @inheritdoc
     * @param {Body} obj
     */
    remove(obj) {
      if (obj.client == null) return false
      return this._remove(obj.client)
    }
    /**
     * @inheritdoc
     * @param {Body[]} bodies
     */
    update(bodies) {
      for (var i = 0; i < bodies.length; i++) {
        this._remove(bodies[i].client);
        this._insert(bodies[i].client);
      }

    }
    /**
     * @inheritdoc
     * @param {Bounds} bounds Region to check in.
     * @param {Body[]} target Empty array to store results.
     * @returns {Body[]}
     */
    query(bounds, target) {
      this._root.query(bounds, target);
      return target
    }
    /**
     * A depth first search of the quadtree that applies the given function to its nodes.
     * 
     * @param {Function} func The function that checks every node unless it returns true.
     * 
     */
    traverse(func) {
      return this._root.traverse(func)
    }
    /**
     * @inheritdoc
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
      this._root.traverse(e => {
        if (e.hasObjects) {
          e.children.forEach(r => r.draw(ctx));
        }
      });
      ctx.fillStyle = "black";
    }
    /**
     * Resizes a quadtree to a new bound size.
     * This method should not be used without care.
     * 
     * @param {Bounds} bounds.
     * 
     */
    recalculateBounds(bounds) {
      if (!bounds) return
      let ob = this._root.traverse((e, arr) => {
        let length = e.objects.length;
        for (var i = 0; i < length; i++) {
          arr.push(e.objects[i]);
        }
      }, []);
      this._root = new Node(bounds);
      this._root.split();
      ob.forEach(e => {
        this.insert(ob);
      });
    }
    /**
     * @inheritdoc
     * @param {CollisionPair[]} target Empty array to store results.
     * @returns {CollisionPair[]}
     */
    getCollisionPairs(target) {
      this._root.getCollisionPairs(target, []);
    }
  }

  /**
   * @callback Traverser
   * @param {Node} node
   * @returns boolean
  */

  let floor = Math.floor;
  class Client {
    constructor(body) {
      this.body = body;
      this.bounds = body.bounds.clone();
    }
  }

  /**
   * This is a bounded broadphase that is used to speed up collision testing on dense number of objects over a small area.
   * 
   * @extends Broadphase
   */
  class Grid extends Broadphase {
    bins = []
    bounds = null
    constructor(bounds, divX, divY) {
      super();
      this.bounds = bounds;
      this.divX = divX;
      this.divY = divY;
      for (let i = 0; i < divX; i++) {
        let Xbin = [];
        for (let j = 0; j < divY; j++) {
          Xbin.push([]);
        }
        this.bins.push(Xbin);
      }
    }
    _hash(x, y) {
      let key = [0, 0],
        minX = this.bounds.min.x,
        minY = this.bounds.min.y,
        width = this.bounds.max.x - this.bounds.min.x,
        height = this.bounds.max.y - this.bounds.min.y;

      key[0] = floor(
        ((x - minX) / width) * this.divX);
      key[1] = floor(((y - minY) / height) * this.divY);
      return key
    }
    /**
     * @inheritdoc
     * @private
     * @param {Client} client
     */
    _insert(client) {
      client.bounds.copy(client.body.bounds);
      let [x1, y1] = this._hash(client.bounds.min.x, client.bounds.min.y);
      let [x2, y2] = this._hash(client.bounds.max.x, client.bounds.max.y);


      if (x1 > this.divX - 1 || x1 < 0) return
      if (y1 > this.divY - 1 || y1 < 0) return
      if (x2 > this.divX - 1 || x2 < 0) return
      if (y2 > this.divY - 1 || y2 < 0) return

      for (let i = x1; i <= x2; i++) {
        for (var j = y1; j <= y2; j++) {
          this.bins[i][j].push(client);
        }
      }
    }
    /**
     * @inheritdoc
     * @param {Body} body
     */
    insert(body) {
      let client = body.client;
      if (client == null) {
        client = body.client = new Client(body);
      }
      this._insert(client);
    }
    /**
     * @inheritdoc
     * @private
     * @param {Client} client
     */
    _remove(client) {
      let [x1, y1] = this._hash(client.bounds.max.x, client.bounds.max.y);
      let [x2, y2] = this._hash(client.bounds.max.x, client.bounds.max.y);

      if (x1 > this.divX - 1 || x1 < 0) return
      if (y1 > this.divY - 1 || y1 < 0) return
      if (x2 > this.divX - 1. || x2 < 0) return
      if (y2 > this.divY - 1. || y2 < 0) return

      for (let i = x1; i <= x2; i++) {
        for (let j = y1; j <= y2; j++) {
          let index = this.bins[i][j].indexOf(client);
          Utils$1.removeElement(this.bins[i][j], index);
        }
      }
    }
    /**
     * @inheritdoc
     * @param {Body} body
     */
    remove(body) {
      if (body.client === null) return
      this._remove(body.client);
    }
    /**
     * @inheritdoc
     * @private
     * @param {Body} body
     */
    _update(body) {
      this._remove(body.client);
      this._insert(body.client);
    }
    /**
     * @inheritdoc
     * @param {Body[]} bodies
     */
    update(bodies) {
      for (var i = 0; i < bodies.length; i++) {
        this._update(bodies[i]);
      }
    }
    _naiveCheck(arr, ids, target) {
      for (var j = 0; j < arr.length; j++) {
        for (var k = j + 1; k < arr.length; k++) {
          let a = arr[j];
          let b = arr[k];
          let id = naturalizePair(a.id, b.id);

          if (ids.has(id)) continue
          if (!this.canCollide(a, b)) continue
          if (!a.bounds.intersects(b.bounds))
            continue
          ids.add(id);
          target.push({
            a,
            b
          });
        }
      }
    }
    /**
     * @inheritdoc
     * @param {CollisionPair[]} target Empty array to store results.
     * @returns {CollisionPair[]}
     */
    getCollisionPairs(target) {
      //When bodies are in more than one bin,there is a possibility that they might show up in more than one collision,this remedies that.
      let ids = new Set();
      for (let i = 0; i < divX; i++) {
        for (let j = 0; j < divY; j++) {
          this._naiveCheck(this.bins[i][j], ids, target);
        }
      }
      return target
    }
  }

  /**
   * Class responsible for updating bodies,constraints and composites.
   */
  class World {
    /**
     * Used to check if a manifold is persistent.
     * 
     * @type number
     * @private
     */
    count = 0
    /**
     * A record of collision manifolds.
     * 
     * @type Map<number,Manifold>
     * @protected
     */
    records = new Map()
    /**
     * A list of bodies.
     * 
     * @type Body[]
     * @private
     */
    objects = []
    /**
     * A list of constraints fixed to a static object.
     * 
     * @type Constraint[]
     * @private
     */
    fixedConstraits = []
    /**
     * A list of constraints fixed to two dynamic bodies.
     * 
     * @type Array<Constraint>
     * @private
     */
    constraints = []
    /**
     * A value between 0 and 1 used to dampen linear velocity of bodies.
     * 
     * @type number
     */
    linearDamping = Settings.linearDamping
    /**
     * A value between 0 and 1 used to dampen angular velocity of bodies.
     * 
     * @type number
     */
    angularDamping = Settings.angularDamping

    /**
     * The number of times to solve for velocity.A high number results in much more stable stacking.
     * 
     * @type number
     */
    velocitySolverIterations = Settings.velocitySolverIterations
    /**
     * The collision manifolds that have passed narrowphase and verified to be colliding.
     * 
     * @type Manifold[]
     */
    CLMDs = []
    /**
     * The collision manifolds that have passed broadphase and could be colliding
     * 
     * 
     * @type CollisionPair[]
     */
    contactList = []
    /**
     * The gravitational pull of the world.
     * 
     * @type Vector
     */
    gravitationalAcceleration = new Vector(0, 0)
    /**
     * Time in seconds that a single frame takes.This has more precedence than the first parameter of World.update(),set to this to zero if you want to use the latter as the delta time.
     * 
     * @type number
     */
    fixedFrameRate = Settings.fixedFrameRate
    /**
     * 
     * @type { {lastTimestamp:number,total: number}}
     * @ignore
     */
    perf = {
      lastTimestamp: 0,
      total: 0
    }
    /**
     * This is a cheap way of determining which pairs of bodies could be colliding.
     * 
     * @type Broadphase
     */
    broadphase = null
    /**
     * @constructor World
     * 
     */
    constructor() {
      this.broadphase = new NaiveBroadphase(this);
    }
    set gravity(x) {
      if (typeof x === "object")
        return this.gravitationalAcceleration.copy(x)
      this.gravitationalAcceleration.set(0, x);
    }
    /**
     * Gravitational pull of the world,will affect all bodies except static bodies.
     * 
     * @type {Vector }
     */
    get gravity() {
      return this.gravitationalAcceleration
    }
    /**
     * @private
     */
    narrowPhase() {
      let
        collisionData,
        manifold;

      for (var i = 0; i < this.contactList.length; i++) {
        let { a, b } = this.contactList[i];
        a.sleeping = false;
        b.sleeping = false;
        let id = naturalizePair(a.id, b.id);
        if (!this.records.has(id))
          this.records.set(id, {
            bodyA: a,
            bodyB: b,
            contactData: {
              lastOverlap: 0,
              overlap: -Infinity,
              done: false,
              axis: new Vector(),
              verticesA: [],
              verticesB: [],
              vertShapeA: null,
              vertShapeB: null,
              contactNo: 0,
              shapes: [],
              indexA: 0,
              indexB: 0
            },
            stmp: -1,
            impulse: 0,
            persistent: false,
            ca1: new Vector(),
            ca2: new Vector(),
            restitution: 0,
            staticFriction: 0,
            kineticFriction: 0,
            velA: new Vector(),
            velB: new Vector(),
            rotA: 0,
            rotB: 0
          });
        manifold = this.records.get(id);
        collisionData = manifold.contactData;
        collisionData.overlap = -Infinity;
        collisionData.done = false;
        SAT.shapesInBodyCollided(a, b, collisionData);
        if (collisionData.overlap < 0 || !collisionData.done) continue
        if (collisionData.contactNo == 2) {
          Vector.lerp(
            collisionData.verticesA[0],
            collisionData.verticesA[1],
            0.5,
            manifold.ca1
          ).sub(a.position);
          Vector.lerp(
            collisionData.verticesB[0],
            collisionData.verticesB[1],
            0.5,
            manifold.ca2
          ).sub(b.position);
        } else {
          manifold.ca1.copy(collisionData.verticesA[0]).sub(a.position);
          manifold.ca2.copy(collisionData.verticesB[0]).sub(b.position);
        }
        manifold.restitution = a.restitution < b.restitution ? a.restitution : b.restitution;
        manifold.staticFriction = a.staticFriction < b.staticFriction ? a.staticFriction : b.staticFriction;
        manifold.kineticFriction = a.kineticFriction < b.kineticFriction ? a.kineticFriction : b.kineticFriction;
        if (a.collisionResponse && b.collisionResponse)
          this.CLMDs.push(manifold);

      }
    }
    /*
     * @private
     */
    broadPhase() {
      this.contactList = [];
      this.broadphase.getCollisionPairs(this.contactList);
    }
    /**
     * @private
     */
    collisionDetection() {
      this.broadPhase();
      this.narrowPhase();
    }
    /**
     * @private
     * @param {number} dt 
     */
    collisionResponse(dt) {
      let length = this.CLMDs.length,
        manifold,
        inv_dt = 1 / dt;
        this.count - 1;



      for (var j = 0; j < this.velocitySolverIterations; j++) {
        for (let i = 0; i < length; i++) {
          manifold = this.CLMDs[i];
          manifold.velA.set(0, 0);
          manifold.velB.set(0, 0);
          manifold.rotA = 0;
          manifold.rotB = 0;
          ImpulseSolver.solve(manifold);
          FrictionSolver.solve(manifold);
        }
        for (var i = 0; i < length; i++) {
          manifold = this.CLMDs[i];
          manifold.bodyA.velocity.add(manifold.velA);
          manifold.bodyB.velocity.add(manifold.velB);
          manifold.bodyA.rotation.radian += manifold.rotA;
          manifold.bodyB.rotation.radian += manifold.rotB;
        }
      }

      for (let i = 0; i < length; i++) {
        manifold = this.CLMDs[i];
        PenetrationSolver.solve(manifold, inv_dt);
      }

      for (let i = 0; i < length; i++) {
        manifold = this.CLMDs[i];
        manifold.stmp = this.count;
        ContactSolver.solve(
          manifold.bodyA,
          manifold.bodyB,
          manifold.impulse,
          manifold.contactData.contactNo
        );
      }
    }
    /**
     * @private
     * @param {number} dt 
     * @param {number} length 
     */
    intergrate(dt, length) {
      for (var i = 0; i < length; i++) {
        let a = this.objects[i];
        if (!a.sleeping)
          VerletSolver.solve(a, dt);
      }
    }
    /**
     * @private
     * @param {number} length 
     * @param {number} dt 
     */
    applyGravity(length, dt) {
      this.gravitationalAcceleration.clone().multiply(dt);
      for (var i = 0; i < length; i++) {
        let a = this.objects[i];
        if (a.mass)
          a.acceleration.add(this.gravitationalAcceleration);
      }
    }
    /**
     * @private
     * @param {number} dt
     */
    updateConstraints(dt) {
      let length = this.constraints.length,
        fixedlength = this.fixedConstraits.length;
      for (var i = 0; i < fixedlength; i++) {
        this.fixedConstraits[i].update(dt);
      }
      for (var i = 0; i < length; i++) {
        this.constraints[i].update(dt);
      }
    }
    /**
     * @private
     * @param {number} length 
     */
    updateBodies(length) {
      let ld = 1 - this.linearDamping;
      let ad = 1 - this.angularDamping;
      for (var i = 0; i < length; i++) {
        this.objects[i].update();
        this.objects[i].velocity.multiply(ld);
        this.objects[i].angularVelocity = this.objects[i].angularVelocity * ad;
      }
    }
    /**
     * 
     * 
     * @param {Number} delta the time passed between the last call and this call.
     */
    update(delta) {
      this.perf.lastTimestamp = performance.now();
      let dt = this.fixedFrameRate || delta;
      let length = this.objects.length;
      this.CLMDs = [];

      this.applyGravity(length, dt);
      this.updateBodies(length);
      this.updateConstraints(dt);
      this.broadphase.update();
      this.collisionDetection();
      this.collisionResponse(dt);
      this.updateConstraints(dt);
      this.intergrate(dt, length);
      this.updateBodies(length);
      this.count += 1;
      this.perf.total = performance.now() - this.perf.lastTimestamp;
    }

    /**
     * Initializes the manager.
     * 
     * @param {Manager} manager
     */
    init(manager) {
      manager.setComponentList("body", this.objects);
    }
    /**
     * Adds an object to the world.
     * 
     * @param {Body | Composite | Constraint} object
     */
    add(object) {
      if (object.physicsType == ObjType.BODY) {
        this.addBody(object);
      } else if (object.physicsType == ObjType.CONSTRAINT) {
        this.addConstraint(object);
      } else if (object.physicsType == ObjType.COMPOSITE) {
        this.addComposite(object);
      }
    }
    /**
     * Adds a body to the physics world
     * @param {Body} body Body to insert to world
     */
    addBody(body) {
      //must update vertices and bounds so that Broadphase works properly
      body.update();
      body.index = this.objects.length;
      this.objects.push(body);
      this.broadphase.insert(body);
    }
    /**
     * Removes an object from the world
     * @param {Body | Composite | Constraint} object
     */
    remove(object) {
      if (object.physicsType == ObjType.BODY) {
        this.removeBody(object);
      } else if (object.physicsType == ObjType.CONSTRAINT) {
        this.removeContraint(object);
      } else if (object.physicsType == ObjType.COMPOSITE) {
        this.removeComposite(object);
      }
    }
    /**
     * Removes a body from the physics world
     * @param {Body} body Body to remove from world
     * 
     * @returns Body
     */
    removeBody(body) {
      this.broadphase.remove(body);
      if (Utils$1.removeElement(this.objects, body.index)) {
        if (body.index === this.objects.length)
          return
        this.objects[body.index].index = body.index;
      }
      return body
    }
    /**
     * Adds a constraint to the physics world
     * @param {Constraint} constraint constaint to add to world
     */
    addConstraint(constraint) {
      if (constraint.fixed) {
        constraint.index = this.fixedConstraits.length;
        this.fixedConstraits.push(constraint);
        return
      }
      constraint.index = this.constraints.length;
      this.constraints.push(constraint);
    }
    /**
     * Removes a constraint from the physics world
     * @param {Constraint} constraint constaint to add to world
     * 
     * @returns Constraint
     */
    removeContraint(constraint) {
      let arr = constraint.fixed ? this.fixedConstraits : this.constraints;
      let temp = arr.pop();
      if(constraint.index == arr.length) return constraint
      arr[constraint.index] = temp;
      temp.index = constraint.index;
      constraint.index = -1;
      return constraint
    }

    /**
     * Adds a composite to the physics world.
     * 
     * @param {Composite} composite composite to add to world
     */
    addComposite(composite) {
      for (var i = 0; i < composite.bodies.length; i++) {
        this.addBody(composite.bodies[i]);
      }
      for (var i = 0; i < composite.constraints.length; i++) {
        this.addConstraint(composite.constraints[i]);
      }
    }
    /**
     * Removes a composite from the physics world.
     * 
     * @param {Composite} composite composite to remove
     */
    removeComposite(composite) {
      for (var i = 0; i < composite.bodies.length; i++) {
        this.removeBody(composite.bodies[i]);
      }
      for (var i = 0; i < composite.constraints.length; i++) {
        this.removeContraint(composite.constraints[i]);
      }
    }
    /**
     * Searches for objects in a given bounds and returns them.
     * 
     * @param {Bounds} bound the region to search in
     * @param {Array<Body>} [target = []] an array to store results in
     * @returns Array<Body>
     */
    query(bound, target = []) {
      this.broadphase.query(bound, target);
      return target
    }
  }

  class Camera {
    /**
     * @private
     * @type Vector
     */
    _position = new Vector()
    /**
     * @private
     * @type Vector
     */
    transformMatrix = new Matrix2()
    /**
     * @type Renderer
     */
    renderer = null
    constructor(renderer) {
      this.renderer = renderer;
    }
    /**
     * @type Vector
     */
    get position() {
      return this._position
    }
    set position(x) {
      this._position.copy(x);
    }
    update() {}
    dispose() {
      this.renderer = null;
    }
  }

  /**
   * This is an abstract class from which different types of renderers are implemented.
   * 
   * @abstract
   * @see Renderer2D
   * @see WebGLRenderer
   * @see WebGPURenderer
   */
  class Renderer {
    /**
     * @type number
    */
    _rafID = 0
    /**
     * Used to throttle the frame rate.
     * 
     * @private
     * @rype number
     */
    _accumulator = 0
    /**
     * A list of meshes.
     * 
     * @type Sprite[]
     */
    objects = []
    /**
     * Used for monitoring perfomance of the renderer
     * 
     */
    perf = {
      lastTimestamp: 0,
      total: 0
    }
    /**
     * @private
     * @type {HTMLCanvasElement}
     */
    domElement = null
    /**@type {CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext}*/
    ctx = null
    /**
     * @type {Camera}
     */
    camera = null
    /**
     * @param {CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext} context
     * @param {HTMLCanvasElement} canvas element to draw on
     */
    constructor(canvas, context) {
      this.domElement = canvas;
      this.ctx = context;
      this.camera = new Camera(this);
      this.clock = new Clock();
    }
    /**
     * Instantiates the renderer.
     * 
     * @param {Manager} manager
     */
    init(manager) {
      manager.setComponentList("sprite", this.objects);
    }
    /**
     * Clears the canvas on which the renderer draws on.
     */
    clear() {

      throw "Override Renderer.clear()"
    }
    /**
     * Updates the objects within the renderer.
     * 
     * @param {number} dt
     */
    update(dt) {
      throw "Override Renderer.update()"
    }
    /**
     * Requests an animation frame.
     * 
     * @protected
     */
    RAF() {
      this._rafID = requestAnimationFrame(this._update);
    }
    /**
     * Starts the rendering cycle of a renderer.
     */
    play() {
      this.RAF();
    }
    /**
     * Stops the rendering cycle of a renderer.
     */
    pause() {
      cancelAnimationFrame(this._rafID);
    }
    /**
     * Attaches the renderer to a given html element by its selector.
     * 
     * @param {string} selector A css selector string that is passed to document.querySelector
     * @param {true} focus whether to shift focus of input to the element pr not
     */
    bindTo(selector, focus = true) {
      let element = document.querySelector(selector);
      this.domElement.remove();
      this.domElement.style.backgroundColor = "grey";
      this.domElement.style.touchAction = "none";
      element.append(this.domElement);
    }
    /**
     * Adds a mesh to the renderer.
     * 
     * @param {Sprite} Sprite
     */
    add(sprite) {
      this.objects.push(sprite);
    }
    /**
     * Removes the given sprite from the renderer.
     * 
     * @param {Sprite} sprite
     */
    remove(sprite) {
      this.objects.splice(this.objects.indexOf(sprite), 1);
    }
    /**
     * Requests fullscreen for the renderer.
     */
    requestFullScreen() {
      this.domElement.parentElement.requestFullscreen();
    }
    /**
     * Sets the width and height of the canvas being rendered to.
     * 
     * @param {number} w Width of the canvas.
     * @param {number} h Height of the canvas.
     */
    setViewport(w, h) {
      let canvas = this.domElement;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.width = w;
      canvas.height = h;
    }
    /**
     * Width of the renderer
     * 
     * @type number
     */
    get width() {
      return this.domElement.width
    }
    set width(x) {
      this.domElement.width = x;
    }
    /**
     * Height of the renderer
     * 
     * @type number
     */
    get height() {
      return this.domElement.height
    }
    set height(x) {
      return this.domElement.height = x
    }
  }

  /**
   * Renders images and paths to the 2D context of a canvas.
   * 
   * @extends Renderer
  */
  class Renderer2D extends Renderer {
    frameRate = 1 / 60
    renderLast = []
    /**
    @param {HTMLCanvasElement} [canvas] element to draw on
    */
    constructor(canvas) {
      canvas = canvas || document.createElement("canvas");
      super(canvas,canvas.getContext("2d"));
      
    }

    add(sprite){
      super.add(sprite);
      sprite.geometry?.init(this.ctx);
    }
    clear() {
      this.ctx.setTransform();
      let h = this.height,
        w = this.width;
      this.ctx.clearRect(0, 0, w, h);
    }
    update(dt) {
      this.camera.update(dt);
      this.perf.lastTimestamp = performance.now();
      this.clear();
      if (this.background != void 0)
        this.background.update(this, dt);
      for (var i = 0; i < this.objects.length; i++) {
        this.objects[i].render(this.ctx, dt);
      }
      for (var i = 0; i < this.renderLast.length; i++) {
        this.renderLast[i].update(this, dt, this.camera.transform);
      }
      this.perf.total = performance.now() - this.perf.lastTimestamp;
    }
    _update = (accumulate)=> {
      let dt = this.clock.update(accumulate);
      if (this._accumulator < this.frameRate) {
        this._accumulator += dt;
        this.RAF();
        return
      }
      this.update(dt || this._accumulator);
      this.RAF();
      this._accumulator = 0;
    }
    
    addUI(mesh) {
      this.renderLast.push(mesh);
    }
    requestFullScreen() {
      this.domElement.parentElement.requestFullscreen();
    }
  }

  //Dont get too excited yet :)


  /**
   * Renders images and paths to the webgpu context of a canvas.
   * 
   * @extends Renderer
  */
  class WebGPURenderer extends Renderer{
    constructor(){
      throw new Error("Dont get too excited yet :)")
    }
  }

  /**
   * Renders images and paths to the webgl context of a canvas.
   * 
   * @extends Renderer
   */
  class WebGLRenderer extends Renderer{
    constructor(){
      throw new Error("Hold your horses there!I haven't implemented this yet!")
    }
  }

  /**
   * This is the base class used to render images and paths onto the renderer.
   * Extend it to create your custom behaviour.
   * 
   * @implements Component
   */
  class Sprite {
    /**
     * @private
     */
    _position = null
    /**
     * @private
     */
    _orientation = null
    /**
     * @private
     */
    _scale = null
    /**
     * @private
     */
    geometry = null
    /**
     * @private
     */
    material = null
    /**
     * @type Group | null
     */
    parent = null
    /**
     * @param {BufferGeometry} geometry
     * @param {Material} material
     */
    constructor(geometry, material) {
      this.geometry = geometry;
      this.material = material;
    }
    /**
     * Angle in degrees
     * 
     * @type number
     */
    get angle() {
      return this._orientation.radian * 180 / Math.PI
    }
    set angle(x) {
      this._orientation.degree = x;
    }
    /**
     * World space position.
     * 
     * @type Vector
     */
    get position() {
      return this._position
    }
    set position(x) {
      this._position.copy(x);
    }
    /**
     * Orientation of the sprite
     * 
     * @type Angle
     */
    get orientation() {
      return this._orientation
    }
    set orientation(x) {
      this._orientation.copy(x);
    }
    /**
     * Override this function.
     * The canvas is already transformed to the position and rotation of the sprite.
     * 
     * @protected
     * 
     */
    draw(ctx) {

    }
    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} dt
     */
    render(ctx, dt) {
      ctx.save();
      ctx.beginPath();
      ctx.translate(...this._position);
      ctx.rotate(this._orientation.radian);
      ctx.scale(...this._scale);
      this.draw(ctx, dt);
      this.material?.render(ctx,dt,this.geometry?.drawable);
      ctx.closePath();
      ctx.restore();
    }
    /**
     * @param {Entity} entity
     */
    init(entity) {
      if(!entity){
        this._position = new Vector();
        this._orientation = new Angle();
        this._scale = new Vector(1,1);
        return
      }
      this.entity = entity;
      this.requires("transform");
      let transform = entity.get("transform");
      this._position = transform.position;
      this._orientation = transform.orientation;
      //TODO - Correct this later
      this._scale = new Vector(1,1);
      return this
    }


    update() {}
  }
  Utils$1.inheritComponent(Sprite);

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  function line(ctx, x1, y1, x2, y2) {
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  function rect(ctx, x, y, w, h) {
    ctx.rect(x, y, w, h);
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  function circle(ctx, x, y, r) {
    ctx.arc(x, y, r, 0, Math.PI * 2);
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  function vertices(ctx, vertices, close = true) {
    if (vertices.length < 2) return;
    ctx.moveTo(vertices[0].x, vertices[0].y);
    for (var i = 1; i < vertices.length; i++) {
      ctx.lineTo(vertices[i].x, vertices[i].y);
    }
    if (close)
      ctx.lineTo(vertices[0].x, vertices[0].y);
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  function arc(ctx, x, y, r, start, end) {
    ctx.arc(x, y, r, start, end);
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  function fillText(ctx, text, x, y) {
    ctx.fillText(text, x, y);
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  function fill(ctx, color = "black", fillRule) {
    ctx.fillStyle = color;
    ctx.fill(fillRule);
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  function stroke(ctx, color = "black", width = 1) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  function drawImage(
    ctx,
    img,
    x,
    y,
    w = img.width,
    h = img.height,
    ix = 0,
    iy = 0
  ) {
    ctx.drawImage(img, w * ix, h * iy, w, h,
      x,
      y,
      w, h);
  }

  class BufferGeometry {
    /**
     * @readonly
     * @type Vector[]
     */
    vertices = null
    /**
     * @package
     * @type Path2D | WebGLVertexArrayObject
     */
    drawable = null
    /**
     * @param {Vector[]} vertices
     */
    constructor(vertices) {
      this.vertices = vertices || [];
    }
    /**
     * @package
     * @param {CanvasRenderingContext2D} ctx
     */
    init(ctx) {
      let path = this.drawable = new Path2D();
      vertices(path, this.vertices, true);
    }
  }

  class CircleGeometry {
    /**
     * @param {number} radius
     */
    constructor(radius) {
      this.radius = radius;
    }
    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    init(ctx) {
      this._drawable = new Path2D();
      circle(path, this.vertices, true);
    }
    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
      circle(ctx, 0, 0, this.radius);
    }
  }

  /**
   * @interface
  */
  class Material{
    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} dt
     * @param {Path2D} [path]
    */
    render(ctx,dt,path){
      throw "Override this method in derived class"
    }
  }

  /**
   * 
   * @implements Material
  */
  class BasicMaterial {
    /**
     * 
     * @type string
     * @default "white"
     */
    fill = "white"
    /**
     * 
     * @type string
     * @default "black"
     */
    stroke = "black"
    /**
     * 
     * @type boolean
     * @default false
     */
    wireframe = false
    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} dt
     * @param {Path2D} path
     */
    render(ctx,dt, path) {
      if (!this.wireframe) {
        ctx.fillStyle = this.fill;
        ctx.fill(path);
      }
      ctx.strokeStyle = this.stroke;
      ctx.stroke(path);
    }
  }

  /**
   * 
   * @implements Material
   */
  class StaticImageMaterial {
    /**
     * @readonly
     * @type Image
     */
    image = null
    /**
     * 
     * @type number
     */
    width = 100
    /**
     * 
     * @type number
     */
    height = 100
    /**
     * @param {Image} img
     */
    constructor(img) {
      //TODO - Find a way to load images synchronously.
      this.image = img;
    }
    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
      ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
    }
  }

  /**
   * 
   * @implements Material
  */
  class SpriteMaterial {
    /**
     * @type HTMLImageElement
     */
    img = null
    /**
     * The index of the current action.
     * 
     * @private
     * @type number
     */
    _index = 0
    /**
     * The current action's max frame index.
     * 
     * @private
     * @type number
     */
    _maxFrame = 0
    /**
     * The current frame of an action.
     * 
     * @private
     * @type number
     */
    _frame = 0
    /**
     * Used with ImageSprite#frameRate to throttle the fps of the sprite.
     * 
     * @private
     * @type number
     */
    _accumulator = 0
    /**
     * The maximum frames for each given action.
     * 
     * @type number
     */
    frameRate = 1 / 60
    /**
     * The current action.
     * 
     * @private
     * @type number[]
     */
    _maxFrames = null
    /**
     * The width of the sprite.
     * 
     * @type number
     */
    width = 0
    /**
     * The height of the sprite..
     * 
     * @type number
     */
    height = 0
    /**
     * The width of a frame.
     * 
     * @private
     * @type number
     */
    frameWidth = 0
    /**
     * The height of a frame..
     * 
     * @private
     * @type number
     */
    frameHeight = 0
    /**
     * @param {HTMLImageElement} img Image to draw
     * @param {number} [frames] Number of cutouts in the sprite in the X axis of the image.
     * @param {number} [actions] Number of cutouts in the sprite in the Y axis of the image.
     */
    constructor(img, frames=1, actions=1) {
      this.img = img;
      this.setup(frames,actions);
    }
    setup(frames,actions) {
      this._maxFrame = frames - 1;
      this.width = this.img.width;
      this.height = this.img.height;
      this.frameWidth = this.img.width / (frames || 1);
      this.frameHeight = this.img.height / actions;
    }
      /**
     * Sets max number of frames for a given action
     * 
     * @param {number} action 
     * @param {number} max
     */
    setMaxFrames(action, max) {
      this._maxFrames = max;
    }
    /**
     * Sets a given action to be rendered
     * 
     * @param {number} index
     */
    setAction(index) {
      this._maxFrame = (this._maxFrames[index] || 0);
      this._index = index;
      this._frame = 0;
    }
    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} dt
     */
    render(ctx,dt) {
      drawImage(
        ctx,
        this.img,
        -this.frameWidth / 2,
        -this.frameHeight / 2,
        this.frameWidth,
        this.frameHeight,
        this._frame,
        this._index
      );
      this._accumulator += dt;
      if (this._accumulator < this.frameRate) return
      this._accumulator = 0;
      this._frame += 1;
      if (this._frame >= this._maxFrame)
        this._frame = 0;
    }
  }

  let r = new Vector();
  let material$1 = new BasicMaterial();
  material$1.wireframe = true;
  /**
   * This draws a body from the physics System.
   * 
   * @augments Sprite
   */
  class BodySprite extends Sprite {
    /**
     * @private
     * @type Body
     */
    body = null
    /**
     * Determine whether to draw a representation of the velocity.
     * 
     * @type {boolean}
     */
    drawVelocity = false
    /**
     * Determine whether to draw the bounding box.
     * 
     * @type {boolean}
     */
    drawBounds = false
    /**
     * @param {{}} [options={}] 
     * @param {boolean} [options.drawVelocity=false] Determine whether to draw a representation of the velocity.
     * @param {boolean} [options.drawBounds=false] Determine whether to draw the bounding box.
     */
    constructor(options = {}) {
      super();
      this.drawVelocity = options.drawVelocity || false;
      this.drawBounds = options.drawBounds || false;
    }
    /**
     * @inheritdoc
    */
    render(ctx, dt) {

      if (this.body.physicsType == ObjType.COMPOSITE) {
        for (var i = 0; i < this.body.bodies.length; i++) {
          this._drawShapes(this.body.bodies[i], ctx);

        }
      } else {
        this._drawShapes(this.body, ctx);
      }
      if (this.drawVelocity == true)
        this._drawVelocity(this.body, ctx);
      if (this.drawBounds == true)
        this._drawBound(this.body, ctx);
    }
    /**
     * @private
     * @param {Body} body
     * @param {CanvasRenderingContext2D} renderer
     */
    _drawVelocity(body, ctx) {
      ctx.beginPath();
      line(
        ctx,
        body.position.x,
        body.position.y,
        body.position.x + body.velocity.x,
        body.position.y + body.velocity.y
      );
      stroke(ctx, "cyan");
      ctx.closePath();
    }
    /**
     * @private
     * @param {Body} body
     * @param {CanvasRenderingContext2D} renderer
     */
    _drawBound(body, ctx) {
      ctx.beginPath();
      if (body.bounds.r) {
        circle(ctx, ...body.position, body.bounds.r);
      } else {
        rect(
          ctx,
          body.bounds.min.x,
          body.bounds.min.y,
          body.bounds.max.x - this.body.bounds.min.x,
          body.bounds.max.y - this.body.bounds.min.y
        );
      }
      stroke(ctx,"red");
      ctx.closePath();
    }
    /**
     * @private
     * @param {Body} body
     * @param {CanvasRenderingContext2D} renderer
     */
    _drawShapes(body, ctx) {
      ctx.beginPath();
      for (var i = 0; i < body.shapes.length; i++) {
        let shape = body.shapes[i];
        if (shape.type === Shape.CIRCLE) {
          circle(
            ctx,
            shape.position.x,
            shape.position.y,
            shape.radius);
          Vector.fromRad(shape.angle, r).multiply(shape.radius);
          line(ctx,...shape.position,
            shape.position.x + r.x,
            shape.position.y + r.y);
        } else {
          vertices(ctx,shape.vertices, true);
        }
      }
      stroke(ctx);
      ctx.closePath();
    }
    /**
     * @inheritdoc
     * @param {Entity} entity
     */
    init(parent) {
      this.body = parent.get("body");
      super.init(parent);
    }
  }

  let geometry = new BufferGeometry([
    new Vector(-10, -10),
    new Vector(-10, 10),
    new Vector(20, 0)
    ]);
  let material = new BasicMaterial();
  material.fill = "purple";
  /**
   * Used for debugging agents.
   * 
   * @augments Sprite
   */
  class AgentSprite extends Sprite {
    /**
     * 
     * @private
     * @type Agent
     */
    agent = null
    constructor() {
      super(geometry,material);
    }
    /**
     * @inheritdoc
     * @param {Entity} entity 
     */
    init(entity) {
      super.init(entity);
      this.requires("agent");
      this.agent = entity.get("agent");
    }
    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
      this.agent.draw(ctx);
      super.render(ctx);
    }
  }

  class DebugMesh extends Sprite {
    constructor(manager) {
      super();
      this.manager = manager;
      this.count = 25;
      this.now = 0;
      this.lastPerf = {};
      this.drawBounds = false;
    }
    render(ctx, dt) {
      this.now++;
      let renderer = this.manager.getSystem("renderer");
      let world = this.manager.getSystem("world");
      let phy = world?.perf?.total,
        rend = renderer?.perf?.total,
        framerate = 1 / dt;

      if (this.now > this.count) {
        this.lastPerf.rate = round(framerate, 2);
        this.lastPerf.actual = round(1 / (rend + phy) * 1000, 2);
        this.lastPerf.phy = round(phy, 2);
        this.lastPerf.ren = round(rend, 2);
        this.lastPerf.tot = round(this.manager.perf.total, 2);
        this.now = 0;
      }
      ctx.begin();
      ctx.translate( renderer.width - 80, 80);
      ctx.fill("cyan");
      ctx.fillText(this.lastPerf.actual + "afps", 0, -20);
      ctx.fillText("render: " + this.lastPerf.ren + "ms", 0, 0);
      ctx.fillText("physics: " + this.lastPerf.phy + "ms", 0, 10);
      ctx.fillText("total: " + this.lastPerf.tot + "ms", 0, 20);
      ctx.fillText(`bodies: ${world?.objects?.length}`, 0, 30);

      if (this.lastPerf.rate > 59)
        ctx.fill("cyan");
      else if (this.lastPerf.rate > 29)
        ctx.fill("orange");
      else if (this.lastPerf.rate <= 29)
        ctx.fill("red");

      ctx.fillText(this.lastPerf.rate + "fps", 0, -30);
      ctx.close();
      ctx.translate( -renderer.width + 80, -80);
    }
  }

  /**
   * Its a fricking particle!
   */
  class Particle {
    /**
     * @readonly
     * @type Vector
     */
    position = null
    /**
     * @readonly
     * @type Vector
     */
    velocity = null
    /**
     * @type boolean
     */
    active = true
    /**
     * @type number
     */
    radius = 0
    /**
     * @type {{r:number,b:number,g:number,a:number}}
     */
    color = null
    /**
     * @private
     * @type number
     */
    _life = 0
    /**
     * @readonly
     * @type number
     */
    lifespan = 0
    /**
     * @param {Vector} pos
     * @param {number} radius
     * @param {number} [lifespan=5] In seconds
     */
    constructor(pos, radius, lifespan = 5) {
      this.position = pos;
      this.velocity = new Vector();
      this.radius = radius;
      this.color = {
        r: 100,
        g: 255,
        b: 255,
        a: 1
      };
      this.lifespan = lifespan;
      this._life = 0;
    }
    /**
     * Renders a particle.
     */
    draw(ctx) {
      ctx.beginPath();
      circle(ctx, ...this.position, this.radius);
      fill(ctx, `rgba(${this.color.r},${this.color.g},${this.color.b},${this.color.a})`);
      ctx.closePath();
    }
    /**
     * Updates a particle's lifetime
     */
    update(ctx, dt) {
      this._life += dt;
      this.position.add(this.velocity);
      this.active = this._life < this.lifespan;
    }
  }

  /**
   * This creates a particle system 
   * @augments Sprite
   */
  let System$1 = class System extends Sprite {
    /**
     * @private
     */
    _particles = []
    /**
     * @type number
     * @default 1
     */
    initial = 0
    /**
     * @type number
     * @default 1
     */
    frameIncrease = 0
    /**
     * @type number
     * @default 1
     */
    max = 0
    /**
     * @param {number} [initial=1] Number of particles to start with.
     * @param {number} [max=100] Maximum number of particles.
     * param {number} [increment=5] Maximum number of particles.
     */
    constructor(initial = 1, max = 100, increment = 5) {
      super();
      this.initial = initial;
      this.frameIncrease = increment;
      this.max = max;
    }

    /**
     * @protected
     * @param {number} n
     */
    initParticles(n) {
      for (var i = 0; i < n; i++) {
        this._particles.push(this.create());
      }
    }

    /**
     * override this to return an object created from your own class extending the particle class
     * 
     * @protected
     */
    create() {
      return new Particle(
        new Vector(...this.position),
        rand(1, 10),
        rand(1, 6)
      )
    }
    /**
     * @inheritdoc
     */
    init(entity) {
      super.init(entity);
      this.initParticles(this.initial);
    }
    /**
     * @protected
     * @param {Particle} p
     */
    behavior(p,dt) {
      p.velocity.set(
        p.velocity.x + rand(-1, 1)*dt,
        p.velocity.y + rand(0, 0.3)*dt
      );
    }
    /**
     * @inheritdoc
     */
    render(ctx, dt) {
      for (let i = this._particles.length - 1; i > 0; i--) {
        let p = this._particles[i];
        p.update(ctx, dt);
        this.behavior(p,dt);
        p.draw(ctx, dt);
        if (!p.active) {
          this._particles.splice(i, 1);
        }
      }
      if (this._particles.length < this.max) {
        this.initParticles(this.frameIncrease);
      }
    }
  };

  /**
   * Used for grouping similar.
   * 
   * @augments Sprite
   */
  class Group extends Sprite {
    /**
     * @private
     * @type Sprite[]
     */
    _children = null
    /**
     * @private
     * @type Group
     */
    parent = null
    /**
     * @param {Sprite[]} sprites
     */
    constructor(sprites = []) {
      super();
      this._children = sprites;
    }
    get CHOAS_CLASSNAME() {
      return this.constructor.name.toLowerCase()
    }
    get CHAOS_OBJ_TYPE() {
      return "group"
    }

    /**
     * Adds another sprite to this one
     * 
     * @param {Sprite | Group} sprite
     */
    add(sprite) {
      this._children.push(sprite);
      sprite.parent = this;
    }
    /**
     * Removes another sprite to this one
     * 
     * @param {Sprite | Group} sprite
     * @param {boolean} [recursive=false]
     * @param {number} [index]
     */
    remove(sprite, recursive = false, index) {
      let inx = index ?? this._children.indexOf(sprite);
      if (inx !== -1) {
        this._children[inx].parent = null;
        Utils.removeElement(this._children, inx);
        return true
      }
      if (!recursive) return false
      for (var i = 0; i < this._children.length; i++) {
        if (this._children.CHAOS_OBJ_TYPE == "group") {
          let t = this._children[i].remove(sprite, recursive, index);
          if (t) return true
        }
      }
      return false
    }
    /**
     * @inheritdoc
     */
    render(ctx, dt) {
      for (var i = 0; i < this._children.length; i++) {
        this._children[i].render(ctx, dt);
      }
    }
  }

  class Layer{
    speed = 1
    constructor(img){
      this.img = img;
    }
    draw(ctx,x,y){
      ctx.drawImage(this.img,x,y);
    }
    update(ctx,dt){
      
    }
  }

  class ParallaxBackground {
    constructor(...layers) {
      this.layers =layers || [];
    }
    update(ctx,dt){
      this.layers.forEach(layer=>{
        layer.draw(ctx,dt);
      });
    }
  }

  /**
   * Contains values showing which features are supported,general model of the device and browser used.
   */

  const DEVICE = {
    /**
     * Whether this device supports WebGPU
     * 
     * @type boolean
     */
    webgpu: false,
    /**
     * Whether this device supports WebGL
     * 
     * @type boolean
     */
    webgl: false,
    /**
     * Whether this device supports 2D canvas
     * 
     * @type boolean
     */
    canvas: false,
    /**
     * Whether this device supports WebAudio
     * 
     * @type boolean
     */
    webAudio: false,
    /**
     * Whether this device supports Audio tag.
     * 
     * @type boolean
     */
    audio: false,

    /**
     * A list of audio extensions this device supports.
     * 
     * @type array<string>
     */
    supportedAudio: [],
    /**
     * A list of image extensions this device supports.
     * 
     * @type array<string>
     */
    supportedImages: [],

    /**
     * Whether this device uses windows
     * 
     * @type boolean
     */
    windows: false,
    /**
     * Whether this device uses MacOS
     * 
     * @type boolean
     */
    mac: false,
    /**
     * Whether this device uses android
     * 
     * @type boolean
     */
    android: false,
    /**
     * Whether this device uses linux
     * 
     * @type boolean
     */
    linux: false,
    /**
     * Whether this device uses IOS
     * 
     * @type boolean
     */
    ios: false,

    /**
     * If browser used is Chrome.
     * 
     * @type boolean
     */
    chrome: false,
    /**
     * If browser used is FireFox.
     * 
     * @type boolean
     */
    firefox: false,
    /**
     * If browser used is Edge.
     * 
     * @type boolean
     */
    edge: false,
    /**
     * If browser used is Internet Explorer.
     * 
     * @type boolean
     */
    ie: false,
    /**
     * If browser used is Safari.
     * 
     * @type boolean
     */
    safari: false,
    /**
     * If browser used is Opera.
     * 
     * @type boolean
     */
    opera: false

  };
  const ua = navigator.userAgent;
  const ae = new Audio();

  if (/Android/.test(ua)) {
    DEVICE.android = true;
  }
  else if (/iP[ao]d|iPhone/i.test(ua)) {
    DEVICE.ios = true;
  }
  else if (/Linux/.test(ua)) {
    DEVICE.linux = true;
  }
  else if (/Mac OS/.test(ua)) {
    DEVICE.mac = true;
  }
  else if (/Windows/.test(ua)) {
    DEVICE.windows = true;
  }


  if (window.AudioContext && window.AudioBuffer && window.AudioBufferSourceNode) {
    DEVICE.webAudio = true;
  }

  if (/Chrome/.test(ua)) {
    DEVICE.chrome = true;
  }
  else if (/Firefox/.test(ua)) {
    DEVICE.firefox = true;
  }
  else if (/Trident/.test(ua)) {
    DEVICE.edge = true;
  }
  else if (/Opera/.test(ua))
  {
    DEVICE.opera = true;
  }
  else if (/Safari/.test(ua))
  {
    DEVICE.safari = true;
  }

  if (DEVICE.audio = !!ae.canPlayType)
  {
    if (ae.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''))
    {
      DEVICE.supportedAudio.push("ogg");
    }

    if (ae.canPlayType('audio/mpeg;').replace(/^no$/, ''))
    {
      DEVICE.supportedAudio.push("mp3");
    }
    if (ae.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''))
    {
      DEVICE.supportedAudio.push("wav");
    }

    if (ae.canPlayType('audio/x-m4a;').replace(/^no$/,'') || ae.canPlayType('audio/aac;').replace(/^no$/, ''))
    {
      DEVICE.supportedAudio.push("m4a");
    }
  }

  DEVICE.canvas = !!window.CanvasRenderingContext2D;
  DEVICE.webgl = !!window.WebGLRenderingContext;

  Object.freeze(DEVICE);
  Object.freeze(DEVICE.supportedAudio);
  Object.freeze(DEVICE.supportedImages);

  class Loader {
    constructor(manager) {
      this._toload = [];
      this.imgs = {};
      this.sfx = {};
      this.json = {};
      this._progressBytes = 0;
      this._totalBytes = 0;
      this._filesErr = 0;
      this._filesLoaded = 0;
      this._totalFileNo = 0;
      const that = this;
      this.onfinish = null;
      this._handlers = {
        onload: function(xhr, e) {
          let type = that._getType(xhr.responseURL);
          let name = that._getName(xhr.responseURL);
          if (e.lengthComputable === false) {
            that._handlers.onerror(xhr, e);
            return
          }
          if (type === "image") {
            that.imgs[name] = new Image();
            that.imgs[name].src = URL.createObjectURL(xhr.response);
          } else if (type === "audio") {
            that.sfx[name] = xhr.response;
            //if using webAudio,just set it to the buffer 
            //else find a way to put this buffer into an audio tag
          } else if (type === "json") {
            that.json[name] = JSON.parse(xhr.response);
          } else {
            return Err.warn(`The file in url ${xhr.responseURL} is not loaded into the loader because its extension name is not supported.`)
          }
          that._filesLoaded += 1;

          if (that._filesLoaded + that._filesErr === that._totalFileNo && that.onfinish) {
            that.onfinish();
          }

        },
        onheadload: function(e) {
          if (e.total === 0 || !e.lengthComputable) return
          that._totalBytes += e.total;
          let xhr = new XMLHttpRequest();
          xhr.open('GET', files.images[i], true);

          xhr.onload = e => that._handlers.onload(xhr);
          xhr.onerror = that._handlers.onerror(xhr);
          xhr.send();
        },
        onerror: function(e) {
          that._filesErr += 1;
          Err.warn(`The file ${e.responseURL} could not be loaded as the file might not exist in current url`);
          if (that._filesLoaded + that._filesErr === that._totalFileNo && that.onfinish) that.onfinish();
        }
      };
    }
    _getName(url) {
      if (url.includes("/")) {
        let tmp = url.split("/");
        url = tmp[tmp.length - 1];
      }
      return url.split(".")[0]
    }
    _getType(url) {
      let ext;
      if (url.includes("/")) {
        let tmp = url.split("/");
        url = tmp[tmp.length - 1];
      }
      ext = url.split(".")[1];

      if (ext === "jpg" || ext === "png" || ext === "jpeg") return "image"
      if (ext === "mp3" || ext === "ogg") return "audio"
      if (ext === "json") return "json"
    }
    loadAll(files = {}) {
      this._totalFileNo =
        (files.images?.length || 0) +
        (files.audio?.length || 0) +
        (files.json?.length || 0);
      if (this._totalFileNo === 0) {
        this.onfinish();
        return
      }
      if (files.images) {
        for (var i = 0; i < files.images.length; i++) {
          let xhr = new XMLHttpRequest();
          xhr.open('GET', files.images[i], true);
          xhr.responseType = "blob";
          xhr.onload = e => {
            this._handlers.onload(xhr, e);

          };
          xhr.onerror = e => this._handlers.onerror(xhr);
          xhr.send();

        }
      }
      if (files.audio) {
        for (var i = 0; i < files.audio.length; i++) {
          let xhr = new XMLHttpRequest();
          xhr.responseType = "arraybuffer";
          xhr.open('GET', files.audio[i], true);
          xhr.onload = e => this._handlers.onload(xhr, e);
          xhr.onerror = e => this._handlers.onerror(xhr);
          xhr.send();

        }
      }
      if (files.json) {
        for (var i = 0; i < files.json.length; i++) {
          files.json[i];
          let xhr = new XMLHttpRequest();
          xhr.responseType = "text";
          xhr.open('GET', files.json[i], true);
          xhr.onload = e => this._handlers.onload(xhr, e);
          xhr.onerror = e => this._handlers.onerror(xhr);
          xhr.send();
        }

      }
    }
  }

  /**
   * This class manages all events by a game manager.
   * When adding a handler to an event with another handler,the latter will not be overriden,rather,the former will be added to complement the latter.
   */
  class EventDispatcher {
    /**
     * A dictionary of callback functions
     * 
     * @private
     * @type Object<string,function[]>
     */
    handlers = {}
    /**
     * This fires all event handlers of a certain event.
     * 
     * @param {string} n the name of event fired.
     * @param {any} data The payload of the event.
     */
    trigger(n, data) {
      if (n in this.handlers)
        this.handlers[n].forEach(h => h(data));
    }
    /**
     * Ignore this,must be here for it to be a system.Might make this class not a system later
     */
    init() {}
    /**
     * Adds an event handler to an event dispatcher.
     * 
     * @param {string} name name of the event.
     * @param {function} handler Function to be called when the event is triggered.
     */
    add(name, handler) {
      if (name in this.handlers) {
        this.handlers[name].push(handler);
        return
      }
      this.handlers[name] = [handler];
    }
  }

  /**
   * This handles events created by the DOM.
   */
  class DOMEventHandler {
    /**
     * A dictionary of callback functions
     * 
     * @private
     * @type Object<string,function[]>
     */
    handlers = {}
    /**
     * A dictionary of the main callback functions
     * 
     * @private
     * @type Object<string,function>
     */
    _evHandlers = {}
    /**
     * Adds an eventlistener.
     * 
     * @param {string} e Name of the DOMEvent.
     * @param {function} h The eventlistener.
     */
    add(e, h) {
      if (this.handlers[e])
        return this.handlers[e].push(h)
      this.handlers[e] = [h];
      let listener = (event) => {
        let handlers = this.handlers[e];
        for (var i = 0; i < handlers.length; i++) {
          handlers[i](event);
        }
      };
      document.addEventListener(e, listener);
      this._evHandlers[e] = listener;
    }
    /**
     * Removes an eventlistener.
     * 
     * @param {string} e Name of the DOMEvent.
     * @param {function} h The eventlistener.
     */
    remove(e, h) {
      this.handlers[e].splice(this.handlers[e].indexOf(h), 1);
      if (!this.handlers[e].length)
        this.dispose(e);
    }
    /**
     * Removes all eventlisteners of an event.
     * 
     * @param {string} e Name of the DOMEvent.
     * @param {function} h The eventlistener.
     */
    disposeEvent(e) {
      document.removeEventListener(e, this._evHandlers[e]);
      delete this.handlers[e];
      delete this._evHandlers[e];
    }
    /**
     * Clears all eventlisteners of every event registered.
     */
    clear() {
      for (var ev in this.handlers) {
        this.dispose(ev);
      }
    }
    /* 
    Donno why this is here,but i do know past me has a reason for this being here.
    Ill leave it for now.
    */
    init() {}
  }

  /**
   * This provides a way to fire off an entity's collision event handler registered to it.
   * 
   * @param {CollisionPair[]} clmds an array of collision manifolds
  */
  function defaultCollisionHandler(clmds) {
    let a, b;
    for (let i = 0; i < clmds.length; i++) {
      a = clmds[i].bodyA.entity.getHandler("collision");
      b = clmds[i].bodyB.entity.getHandler("collision");

      if (a) a.call(
        clmds[i].bodyA.entity,
        clmds[i].bodyB.entity,
        clmds[i]
      );
      if (b) b.call(
        clmds[i].bodyB.entity,
        clmds[i].bodyA.entity,
        clmds[i]
      );
    }
  }

  /**
   * This provides a way to fire off an entity's precollision event handler registered to it
   * 
   * @param {Manifold[]} clmds an array of collision manifolds
  */
  function defaultPrecollisionHandler(clmds) {
    let a, b;
    for (let i = 0; i < clmds.length; i++) {
      a = clmds[i].a.entity.getHandler("precollision");
      b = clmds[i].b.entity.getHandler("precollision");

      if (a) a.call(
        clmds[i].a.entity,
        clmds[i].b.entity,
        clmds[i]
      );
      if (b) b.call(
        clmds[i].b.entity,
        clmds[i].a.entity,
        clmds[i]
      );
    }
  }

  /**@enum {string}*/
  const Events = {
    COLLISION : "collision",
    PRECOLLISION : "precollision",
    PREUPDATE : "preupdate",
    POSTUPDATE : "postupdate",
     UPDATE : "postupdate",  
     INITIALIZE : "init",
     ADD : "add",
     REMOVE : "remove",
     PAUSE : "pause",
     PLAY : "play"
  };

  /**
   * Handled the keyboard input of an application on a PC.
  */
  class Keyboard {
    /**
     * Dictionary of keys showing if they are active or not.
     * 
     * @type Object<string,boolean>
    */
    keys = {}
    /**
     * @param {DOMEventHandler} eh
    */
    constructor(eh) {
      this.keys = {};
      this.init(eh);
    }
    /**
     * Ensures that keycodes are produced in a consistent manner
     * 
     * @private
     * @param {string} keycode
     * @returns {string}
    */
    normalize(keycode) {
      let r = keycode;
      if (keycode.includes('Key')) {
        r = r.slice(3, r.length);
      }
      return r.toUpperCase()
    }
    /**
     * Adds Keyboard events to the DOM.
     * 
     * @param {DOMEventHandler} eh
    */
    init(eh) {
      eh.add('keydown',this._onDown);
      eh.add('keyup',this._onUp);
    }
    /**
     * @private
    */
    _onDown = e => {
      let key = this.normalize(e.code);
      this.keys[key] = true;
      this.activeKeys.push(key);
    }
      /**
       * @private
       */
    _onUp = e =>{
      this.keys[this.normalize(e.code)] = false;
    }
  }

  /**
   * This handles all inputs from mouse and touchpad on laptops
   */

  class Mouse {
    /**
     * Number of times the mouse has been clicked.
     * 
     * @type number
     */
    clickCount = 0
    /**
     * If the mouse is being dragged or not.
     * 
     * @type boolean
     */
    dragging = false
    /**
     * The position from which the mouse is being dragged.
     * 
     * @type Vector_like
     */
    dragLastPosition = { x: 0, y: 0 }
    /**
     * Distance vector between the last frame's position and current position.
     * 
     * @type Vector_like
     */
    delta = { x: 0, y: 0 }
    /**
     * Position of the mouse in current frame.
     * 
     * @type Vector_like
     */
    position = { x: 0, y: 0 }
    /**

     * Position of the mouse in last frame.

     * 
     * @type Vector_like
     */
    lastPosition = { x: 0, y: 0 }
    /**
     * If the left mouse button is pressed or not.
     * 
     * @type boolean
     */
    leftbutton = false
    /**
     * If the right mouse button is pressed or not.
     * 
     * @type boolean
     */
    rightbutton = false
    /**
     * @param {DOMEventHandler} eh
     */
    constructor(eh) {
      this.init(eh);
    }
    /**
     * Checks to see if the vector provided is
     * within a dragbox if mouse is being dragged with a right or left button down
     * 
     * @param {Vector_like} pos an object containing x and y coordinates to be checked
     * @returns {Boolean}
     * 
     */
    inDragBox(pos) {
      if (!this.dragging) return false
      if (pos.x > this.dragLastPosition.x && pos.x < this.position.x &&
        pos.y > this.dragLastPosition.y &&
        pos.y < this.position.y) {
        return false
      }
      return true
    }
    /**
     * Initializes the mouse by appending to the DOM
     *
     */
    init(eh) {
      eh.add('click', this._onClick);
      eh.add('mousedown', this._onDown);
      eh.add('mouseup', this._onUp);
      eh.add('mousewheel', this._onWheel);
      eh.add('mousemove', this._onMove);
      eh.add("contextmenu", this._onContextMenu);
    }
    /**
     * @private
     */
    _onClick = (e) => {
      ++this.clickCount;
    }
    /**
     * @private
     */
    _onMove = (e) => {
      this.position.x = e.clientX;

      this.position.y = e.clientY;

      if (this.lastPosition.x === undefined) {
        this.lastPosition = { ...this.position };
      }
      this.delta.x = this.position.x - this.lastPosition.x;
      this.delta.y = this.position.y - this.lastPosition.y;
      this.dragging = this.leftbutton || this.rightbutton ? true : false;
      if (!this.dragging) {
        this.dragLastPosition.x = e.clientX;
        this.dragLastPosition.y = e.clientY;
      }
    }
    /**
     * @private
     */
    _onDown = (e) => {
      switch (e.button) {

        case 0:

          this.leftbutton = true;
          break;
        case 2:
          this.rightbutton = true;
          break;
      }
    }
    /**
     * @private
     */
    _onUp = (e) => {
      switch (e.button) {
        case 0:
          this.leftbutton = false;
          break;
        case 2:
          this.rightbutton = false;
          break;
      }
    }
    /**
     * @private
     */
    _onWheel = (e) => {
    }
    /**
     * @private
     */
    _onContextMenu = (e) => {
      e.preventDefault();
    }
    /**
     * Updates the mouse internals.
     */
    update() {
      this.lastPosition = { ...this.position };
    }
  }

  /**
   * Handles the touch input of an application from a smartphone,tablet or PCs with touchscreens.
   * 
   * Realized i need to massively change this to make it work well.
   */
  class Touch {
    constructor(eh) {
      this.clickCount = 0;
      this.touches = [];
      this.init(eh);
    }
    /**
     * Checks to see if the position is within the dragbox of the first two touches.
     * Not yet fully implemented
     * 
     * @param Vector_like
     */
    inDragBox(pos) {
      if (pos.x > this.dragLastPosition.x && pos.x < this.dragLastPosition.x + this.position.x &&
        pos.y > this.dragLastPosition.y && pos.y < this.dragLastPosition.y + this.position.y) {
        return false
      }
      return true
    }
    /**
     * Adds Touch events to the DOM.
     * 
     * @param {DOMEventHandler} eh
     */
    init(eh) {
      eh.add('touchstart', this._onDown);
      eh.add('touchend', this._onUp);
      eh.add('touchmove', this._onMove);
    }
    _onMove = (e) => {
      e.preventDefault();
    }
    _onDown = (e) => {
      this.touches = e.touches;
    }
    _onUp = (e) => {
      this.touches = e.touches;
    }
    update(){}
  }

  /**
   * This handles all inputs from the mouse,touch and keyboards.
   * 
   */
  class Input {
    /**
     * This attaches callbacks to the DOM.
     * 
     * @type DOMEventHandler
    */
    DOMEventHandler = null
    /**
     * 
     * @type Mouse
    */
    mouse = null
    /**
     * 
     * @type Touch
    */
    touch = null
    /**
     * 
     * @type Keyboard
    */
    keyboard = null
    /**
     * @param {DOMEventHandler} eventHandler
    */
    constructor(eventHandler) {
      this.DOMEventHandler = eventHandler || new DOMEventHandler();
      this.mouse = new Mouse(this.DOMEventHandler);
      this.touch = new Touch(this.DOMEventHandler);
      this.keyboard = new Keyboard(this.DOMEventHandler);
    }
    /**
     * Updates all inputs.
    */
    update() {
      this.mouse.update();
      this.touch.update();
    }
    /**
     * Remove all bindings to the DOM for all input types.
    */
    dispose() {
      //TODO remove eventlisteners
      this.mouse.dispose();
      this.keyboard.dispose();
      this.touch.dispose();
    }
  }

  /**
   * 
   */
  /**
   * This class is responsible for managing all
   * entities and ensuring that systems are updated every frame.
   * 
   */
  class Manager {
    /**
     * RAF number of current frame.Used for pausing the manager.
     * 
     * @private
     * @type number
     */
    _rafID = undefined
    /**
     * @private
     * @type {Object<string, function>}
     */
    _classes = {}
    /**
     * 
     * @private
     * @type Object<string,Component[]>
     */
    _componentLists = {}
    /**
     * 
     * @private
     * @type System[]
     */
    _systems = []
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
    _coreSystems = {
      world: null,
      renderer: null,
      input: null,
      //TODO - cleanup this events prop
      events: null,
      audio: null
    }
    /**
     * 
     * @private
     * @type boolean
     */
    _initialized = false
    /**
     * Whether or not the manager is playing.
     * 
     * @type boolean
     */
    playing = false
    /**
     * 
     * @private
     * @type Object<string, number>
     */
    _systemsMap = {}
    /**
     * 
     * @private
     * @type Object<string, string>
     */
    _compMap = {}
    /**
     * Master clock for the game
     * 
     * @type Clock
     */
    clock = new Clock()
    /**
     * 
     * @private
     * @type Entity[]
     */
    objects = []
    /**
     * 
     * @private
     * @type number
     */
    _accumulator = 0
    /**
     * Ideal framerate of the manager.Not implemented corrretly.
     * TODO correct it
     * 
     * @type number
     */
    frameRate = 0
    /**
     * 
     * @ignore.
     * This is an artifact of me debugging this.
     * TODO - Should implement a better soluton
    */
    perf = {
      lastTimestamp: 0,
      total: 0
    }
    /**
     * look at Loader for more info.
     * 
     * @readonly
     * @type Loader
    */
    loader = new Loader()
    /**
     * @readonly
     * @type EventDispatcher
    */
    events = new EventDispatcher()
    /**
     * @private
     */
    _update = accumulate => {
      let dt = this.clock.update(accumulate);

      if (this._accumulator < this.frameRate) {
        this._accumulator += dt;
        this.RAF();
        return
      }
      this.events.trigger("updateStart");
      this.update(dt);
      this.events.trigger("update");
      this.events.trigger("updateEnd");
      this._accumulator = 0;
      this.RAF();
    }
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
    constructor(options = {}) {
      options = Object.assign({
        autoPlay: true,
        physics: true,
        renderer: true,
        input: true
      }, options);
      if (options.input)
        this.registerSystem("input", new Input());
      if (options.physics) {
        this.registerSystem("world", new World());
        this.events.add("collision", defaultCollisionHandler);
        this.events.add("precollision", defaultPrecollisionHandler);
      }
      if (options.renderer)
        this.registerSystem("renderer", new Renderer2D());
      this.loader.onfinish = e => {
        this.init();
        this.play();
      };
      this.loader.loadAll(options.files);
    }
    /**
     * This initializes the manager.
     * No need to call this function directly.
     * This is called after the preloader finishes loading all its files.
     * 
     */
    init() {
      for (var i = 0; i < this.objects.length; i++) {
        this.objects[i].init(this);
      }
      //this.initSystems()
      this.events.trigger("init", this);
      this.update(0);
      this._initialized = true;
      if (this.playing) this.play();
    }
    /**
     * Adds an entity to the manager and initializes it.
     * 
     * @param {Entity} object The entity to add
     */
    add(object) {
      if (object.manager) {
        Err.warn(`The entity with id ${object.id} has already been added to a manager.It will be ignored and not added to the manager`, object);
        return
      }
      this.objects.push(object);
      object.init(this);
      this.events.trigger("add", object);
    }
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
    addComponent(n, c) {
      if (n === "body") {
        this._coreSystems.world.add(c);
        return
      }
      if (n === "sprite") {
        this._coreSystems.renderer.add(c);
        return
      }
      if (n in this._componentLists)
        this._componentLists[n].push(c);
    }
    /**
     * This removes a component from a componentList
     * if the componentList is there else exits
     * without an error.
     * There is no need for you to use this method
     * as it is for internal use only and may change in the future 
     * @param { string } n name of the component *
     * @param { Component } c An object implementing Component interface
     */
    removeComponent(n, c) {
      if (n === "body") {
        this._coreSystems.world.remove(c);
        return
      }
      if (n === "sprite") {
        this._coreSystems.renderer.remove(c);
        return
      }
      if (n in this._componentLists)
        Utils$1.removeElement(this._componentLists[n], this._componentLists[n].indexOf(c));
    }
    /**
     * Removes an entity from the manager.
     * Note that this doesn't destroy the entity, only removes it and its components from the manager.
     * To destroy the entity,use `Entity.destroy()` method.
     * 
     * @param {Entity} object The entity to remove
     */
    remove(object) {
      let index = this.objects.indexOf(object);
      object.removeComponents();
      Utils$1.removeElement(this.objects, index);
      this.events.trigger("remove", object);

    }
    /**
     * This removes all of the entities and components from the manager
     */
    clear() {
      for (let i = this.objects.length - 1; i >= 0; i--) {
        this.remove(this.objects[i]);
      }
    }
    /**
     * This method requests an animation frame from the browser
     * 
     * @private
     */
    RAF() {
      this._rafID = requestAnimationFrame(this._update);
    }
    /**
     * This starts up the update loop of the manager
     */
    play() {
      if (!this._initialized) {
        this.playing = true;
        return
      }
      this.RAF();
      this.events.trigger("play");
    }
    /**
     * This stops the update loop of the manager
     */
    pause() {
      if (!this._initialized) {
        this.playing = false;
        return
      }
      cancelAnimationFrame(this._rafID);
      this.events.trigger("pause");
    }
    /**
     * This method might be useless as systems are initialized on being added
     * 
     * @private 
     */
    initSystems() {
      for (var i = 0; i < this._systems.length; i++) {
        for (var j = 0; j < this._systems[i].length; j++) {
          this._systems[i][j].init(this);
        }
      }
    }

    /**
     * Marches the update loop forward,updating
     * the systems
     * You shouldn't mess with this/call it or everything will explode with undetectable errors.
     * 
     * @private
     */
    update(dt = 0.016) {
      let world = this._coreSystems["world"],
        renderer = this._coreSystems["renderer"],
        input = this._coreSystems["input"];

      let totalTS = performance.now();

      //the only reason this is here is that
      //i need to debug stuff visually - ill remove it later.
      if (renderer) renderer.clear();

      for (var i = 0; i < this._systems.length; i++) {
        this._systems[i].update(dt);
      }
      if (input) input.update();
      if (world) world.update(dt);
      if (renderer) renderer.update(dt);
      if (world) {
        this.events.trigger("precollision", world.contactList);
        this.events.trigger("collision", world.CLMDs);
      }
      this.perf.total = performance.now() - totalTS;
    }
    /**
     * This registers a class into the manager so that ot can be used in cloning an entity.
     * 
     * @param {function} obj The class or constructor function to register
     * @param {boolean} override Whether to override an existing class
     */
    registerClass(obj, override = false) {
      let n = obj.name.toLowerCase();
      if (n in this._classes && !override) return Err.warn(`The class \`${obj.name}\` is already registered.Set the second parameter of \`Manager.registerClass()\` to true if you wish to override the set class`)
      this._classes[n] = obj;
    }
    /**
     * Used to register a system
     * 
     * @param {string} n The name for the system
     * @param {System} sys The system to be addad
     * 
     * @param {string} [cn=n] The componentList name that the system will primarily take care of
     */
    registerSystem(n, sys, cn = n) {
      if (sys.init) sys.init(this);
      if (this._systemsMap[n] !== undefined) return
      switch (n) {
        case "events":
          this._coreSystems.events = sys;
          break
        case "world":
          this._coreSystems.world = sys;
          break
        case "renderer":
          this._coreSystems.renderer = sys;
          break
        case "input":
          this._coreSystems.input = sys;
          break
        default:
          this._systemsMap[n] = this._systems.length;
          this._systems.push(sys);
          this._compMap[cn] = n;
      }
    }
    /**
     * Gets the named system
     * 
     * @param {string} n the name the system was registered with.
     * 
     * @return {System}
     */
    getSystem(n) {
      if (n in this._coreSystems)
        return this._coreSystems[n]
      return this._systems[this._systemsMap[n]]
    }
    /**
     * Removes a system from the manager.
     * 
     * @param {string} n The name of the system.
     * 
     */
    unregisterSystem(n) {
      if (n in this._coreSystems)
        return this._systems[this._systemsMap[n]] = null
      delete this._systems[this._systemsMap[n]];
      delete this._systemsMap[n];
    }
    /**
     * Used to create a componentList in the manager.componentsA component must have the same name as the componentList to be added into it.
     * 
     * @param {string} n The name of the components to store into the created componentlist
     * @param {Component[]} [arr=[]] A reference to the array to store components in.
     */
    setComponentList(n, arr = []) {
      this._componentLists[n] = arr;
    }
    /**
     * Used to create a componentList in the manager.A component must have the same name as the componentList to be added into it.
     * 
     * @param {string} n The name of the components to store into the created componentlist
     * @returns {Component[]} An array of components
     */
    getComponentList(n) {
      return this._componentList[n]
    }
    /**
     * Finds the first entity with all the components and returns it.
     * 
     * @param {Array<String>} comps An array containing the component names to be searched
     * @returns {Entity} 
     */
    getEntityByComponents(comps) {
      for (let i = 0; i < entities.length; i++) {
        for (let j = 0; j < comps.length; j++) {
          if (!entities[i].has(comps[j])) continue
          return entities[i]
        }
      }
    }
    /**
     * Finds the first entity with all the tag and returns it.
     * 
     * @param {Array<String>} comps An array containing the component names to be searched
     * @param {Entity[]} [entities = Manager#objects] The array of entities to search in.Defaults to the manager's entity list
     * 
     * @returns {Entity[]} 
     */
    getEntitiesByComponents(comps, entities = this.objects, target = []) {
      for (let i = 0; i < entities.length; i++) {
        for (let j = 0; j < comps.length; j++) {
          if (!entities[i].has(comps[j])) continue
          target.push(entities[i]);
        }
      }
      return target
    }
    /**
     * Finds the first entity with all the tag and returns it.
     * 
     * @param {Array<String>} tags An array containing the tags to be searched
     * @returns {Entity} 
     */
    getEntityByTags(tags) {
      for (let i = 0; i < entities.length; i++) {
        for (let j = 0; j < tags.length; j++) {
          if (!entities[i].hasTag(tags[j])) continue
          return entities[i]
        }
      }
    }
    /**
     * Finds the entities with all the tag and returns them in an array.
     * 
     * @param {string[]} tags An array containing the tags to be searched
     * @param {Entity[]} [entities = Manager#objects] The array of entities to search in. Defaults to the manager's entity list
     * 
     * @returns {Entity[]} 
     */
    getEntitiesByTags(tags, entities = this.objects, target = []) {
      for (let i = 0; i < entities.length; i++) {
        for (let j = 0; j < tags.length; j++) {
          if (!entities[i].hasTag(tags[j])) continue
          target.push(entities[i]);
        }
      }
    }
    /**
     * Ignore this,im going to remove it and the rest of cloning utilities.
     * @private
     * @deprecated
     */
    infertype(obj) {
      let n = obj.CHOAS_CLASSNAME;
      if (n) {
        if (n in this._classes)
          return new this._classes[n]()
        Err.throw(`Class \`${n}\` is not registered in the manager thus cannot be used in cloning.Use \`Manager.registerClass\` to register it into this manager.`);
      }
      return obj instanceof Array ? [] : {}
    }
    /**
     * Deep copies an entity
     * 
     * @deprecated
     * @returns {Entity}
     */
    clone(obj) {
      if (typeof obj !== "object") return obj
      let object = this.infertype(obj);
      for (var key in obj) {
        object[key] = this.clone(obj[key]);
      }
      return object
    }
    /**
     * Creates a system that allows you to use the `Component.update` method for the given componentList whose name is given.
     * 
     * @param {string} name The name of componentList this system is taking care of.
     * 
     * @returns {System}
     */
    static DefaultSystem(name) {
      let n = name;
      return {
        init(manager) {
          manager.setComponentList(n);
        },
        update(dt) {
          let comp = manager.getComponentList(n);
          for (let i = 0; i < comp.length; i++) {
            comp[i].update(dt);
          }
        },
        add(comp) {
          manager.getComponentList(n).push(comp);
        },
        remove(comp) {
          let list = manager.getComponentList(n),
            index = list.indexOf(comp);
          Utils$1.removeElement(list, index);
        }
      }
    }
  }

  /**
   * Updates components assigned to it.
   * 
   * @interface
  */
  class System{}

  Utils$1.inheritSystem(System);

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
  class Movable extends Component {
    entity = null
    constructor(x, y, a) {
      super();
      this.velocity = new Vector(x,y);
      this.rotation = new Angle(a);
      this.acceleration = new Vector();
    }
  }

  /**
   * Holds transformation info of an entity 
   * 
   * @implements Component
  */
  class Transform {
    entity = null
    constructor(x,y,a){
      this.position = new Vector(x,y);
      this.orientation = new Angle(a);
    }
    init(){}
  }

  /**
   * Component to hold the bounds of an entity.
   * 
   * @implements Component
   */
  class Bound extends Component {
    /**
     * The actual bounds.Used for collision detection.
     * 
     * @type BoundingBox | BoundingCircle
     */
    bounds = new BoundingBox()
    entity = null
  }

  /**
   * This is a container to hold components,tags and event handlers.
   * 
   * @class
   * @public
   */
  class Entity {
    /**
     * Dictionary of component to manage.
     * 
     * @private
     * @type Object<string,Component>
     */
    _components = {}
    /**
     * Dictionary of handlers to call during an event.
     * 
     * @private
     * @type Object<string,function>
     */
    _handlers = {}
    /**
     * A list of tags to identify an entity.
     * 
     * @private
     * @type Set<string>
     */
    _tags = new Set()
    /**
     * The manager handling this entity.
     * 
     * @private
     * @type Manager
     */
    _global = null
    /**
     * A flag to show if the entity is added to a manager.
     * 
     * @type {boolean}
     */
    active = false

    get CHAOS_OBJ_TYPE() {
      return "entity"
    }
    get CHAOS_CLASSNAME() {
      return this.constructor.name.toLowerCase()
    }
    /**
     * Removes all components and handlers from an entity while removing it from its manager
     */
    destroy() {
      this.removeSelf();
      for (let k in this._components) {
        let comp = this._components[k];
        if (comp.destroy)
          comp.destroy();
        delete this._components[k];
      }
      for (let k in this._handlers) {
        delete this._handlers[k];
      }

    }
    /**
     * Removes an entity and its components from its manager whilst retaining its components and handlers
     */
    removeSelf() {
      if (this._global) this._global.remove(this);
      this.active = false;
      this._global = null;
    }
    /**
     * Removes all components of an entity from its manager but keeps the entity inside the manager.
     * This is an internal function so no need on your part to use it.
     */
    removeComponents() {
      if (this._global === void 0) return
      for (var k in this._components) {
        this._global.removeComponent(k, this._components[k]);
      }
    }
    /**
     * Gets the current manager of an entity
     * 
     * @returns {Manager}
     */
    get manager() {
      return this._global
    }
    /**
     * Adds a component into an entity
     * 
     * @param {String} n Name of the component.
     * @param {Component} c The component to add.
     * 
     * @returns {this}
     */
    attach(n, c) {
      this._components[n] = c;
      if (this.manager) {
        c.init(this);
        this._global.addComponent(n, c);
      }
      return this
    }
    /**
     * Removes a component from an entity.
     * 
     * @param {String} n Name pf the component
     * @rerurns {this}
     */
    remove(n) {
      this._global.removeComponent(n, this._components[n]);
      delete this._components[n];
      return this
    }
    /**
     * Registers a function to handle a named event.
     * 
     * @param {string} n Name of the event
     * @param {function} h The function to be called when an event is fired.
     */
    register(n, h) {
      this._handlers[n] = h;
    }
    /**
     * Removes an event handler function of the given name
     * 
     * @param {string} n Name of the event
     */
    unregister(n) {
      if (!(n in this._handlers)) return
      delete this._handlers[n];
    }
    /**
     * Returns an event handler which can be fired during an event
     * 
     * @param {string} n Name of the event
     * @returns {function | undefined}
     */
    getHandler(n) {
      return this._handlers[n]
    }
    /**
     * Returns the named component.
     * 
     * @param {string} n Name of the component.
     * @returns {Component | undefined }
     */
    get(n) {
      return this._components[n]
    }
    /**
     * Used to check if the component exists in an entity
     * 
     * @param {string} n Name of the component.
     * @returns {boolean}
     */
    has(n) {
      return n in this._components
    }
    /**
     * Adds a tag into an entity.
     * 
     * @param {string} n The tag to be added
     */
    addTag(n) {
      this._tags.add(n);
    }
    /**
     * Removes a tag from an entity.
     * 
     * @param {string} n The tag to be added
     */
    removeTag(n) {
      this._tags.delete(n);
    }
    /**
     * Checks if a tag exists in an entity.
     * 
     * @param {string} n The tag to be added
     * @returns {boolean}
     */
    hasTag(n) {
      return this._tags.has(n)
    }
    /**
     * Initializes the components within an entity and marks it as active.
     * It is called by an instance of a game manager so no need to call it manually
     * 
     * @package
     * @param {Manager} global
     */
    init(global) {
      this._global = global;
      this.active = true;
      for (let k in this._components) {
        this._components[k].init(this);
        global.addComponent(k, this._components[k]);
      }
    }
    /**
     * A helper function to create a new Entity with transform,movable and bounds components.
     * 
     * @returns {Entity}
     */
    static Default(x, y, a) {
      return new Entity()
        .attach("transform", new Transform(x, y, a))
        .attach("movable", new Movable())
        .attach("bounds", new Bound())
    }
    /**
     * Search an entity's manager for entities in a given bound.
     * 
     * @param {Bounds} bound the region to search entitities in.
     * @param {Entity[]} [target=[]] An array to store results in.
     * @returns {Entity[]}
     */
    query(bound, target = []) {
      return this._global.query(bound, target)
    }
  }

  /**
   * This class is responsible for playing a singular sound.
   */
  class Sfx {
    /**
     * @private
     * @type {AudioBuffer}
     */
    _soundBuffer = null
    /**
     * @private
     * @type {AudioBufferSourceNode}
     */
    _source = null
    /**
     * @private
     * @type {function}
     */
    _onended = null
    /**
     * @private
     * @type {AudioNode}
     */
    _destination = null
    /**
     * @private
     * @type {number}
     */
    _playingOffset = 0
    /**
     * Time on the sound to begin playing 
     * 
     * @type {number}
     */
    offset = 0
    /**
     * Whether to start from the beginning after sound has finished playing.
     * 
     * @type {boolean}
     */
    loop = false
    /**
     * @private
     * @type {number}
     */
    delay = 0
    /**
     * how long to play the sound.
     * 
     * @type {number}
     */
    duration = 0
    /**
     * @param {AudioHandler} handler 
     * @param {AudioBuffer} buffer
     */
    constructor(handler, buffer) {
      this.handler = handler;
      this.ctx = handler.ctx;
      this._soundBuffer = buffer;
      this._destination = handler.masterGainNode;
      this.finished = false;
      this.id = -1;
      this.duration = buffer.duration;

    }
    /**
     * Set callback when the sound finishes playing.
    */
    set onended(x) {
      this._onended = x;
    }
    /**
     * Plays an sfx from the beginning.
     */
    play() {
      this._playingOffset = this.offset;
      this.resume();
    }
    /**
     * Continues playing an sfx from where it was paused.
     */
    resume() {
      this._source = this.ctx.createBufferSource();
      this._source.buffer = this._soundBuffer;
      this._startTime = Date.now();
      this._source.connect(this._destination);
      this._source.start(this.delay, this._playingOffset, this.duration);
      this._source.loop = this.loop;
    }
    /**
     * Halts playing of an sfx.
     */
    pause() {
      this._source.stop();
      let time = (Date.now() - this._startTime) / 1000 + this._playingOffset;
      this._playingOffset = this.duration <= time ? this.offset : time;
    }
    /**
     * Disconnects this sfx from its current destination.
     */
    disconnect() {
      this._source.disconnect();
    }
    /**
     * Sets the given audionode to be the output destination of an sfx
     * 
     * @param {AudioNode} node
     */
    connect(node) {
      if (node)
        this._destination = node;
      if (!this._source) return;
      this._source.disconnect();
      this._source.connect(this._destination);
    }
  }

  /**
   * Manages playing of audio using Web Audio.
   */
  class AudioHandler {
    /**
     * Audio context to use.
     * 
     *  @private
     * @type AudioContext
     */
    ctx = new AudioContext()
    /**
     * List of audio buffers to use.
     * 
     *  @private
     * @type Object<string,AudioBuffer>
     */
    sfx = {}
    /**
     * The name of the background music playing.
     * 
     *  @private
     * @type string
     */
    _backname = ""
    /**
     * The audiobuffer of the background music.
     * 
     *  @private
     * @type AudioBuffer
     */
    _background = null
    /**
     * List of playing sounds
     * 
     * @private
     * @type Sfx[]
     */
    playing = []
    /**
     * What to play after loading the audiobuffers.
     * 
     * @private
     */
    toplay = {}
    /**
     * Volume to resume playing when unmuted.
     * 
     * @private
     * @type number
     */
    _mute = 1
    /**
     * Master volume for all sounds.
     * 
     * @private
     * @type AudioNode
     */
    masterGainNode = null
    /**
     * @type string
     */
    baseUrl = ""
      /**
       * If the manager can play a sound.
     * @type boolean
     */
    canPlay = false
    constructor() {
      this.masterGainNode = this.ctx.createGain();
      this.masterGainNode.connect(this.ctx.destination);
      this.canPlay = this.ctx.state == "running";
      let that = this;
      window.addEventListener("pointerdown", function resume() {
        that.ctx.resume();
        if (that.ctx.state == "running") {
          removeEventListener("pointerdown", resume);
          that.canPlay = true;
        }
      });
    }
    /**
     * Load a sound into a sound manager
     * 
     * @param {string} src
     */
    load(src) {
      let name = src.split(".")[0];
      fetch(this.baseUrl + "/" + src)
        .then(e => e.arrayBuffer())
        .then(e => this.ctx.decodeAudioData(e))
        .then(e => {
          this.sfx[name] = e;
          if (this._backname == name)
            this.playMusic(name);
          if (name in this.toplay) {
            this.playEffect(name);
          }
        }).catch(err => console.log(err));
    }
    /**
     * Loads all audio from the loader.
     * 
     * @param {Loader} loader
     */
    loadFromLoader(loader) {
      for (var n in loader.sfx) {
        let name = n;
        this.ctx.decodeAudioData(loader.sfx[n]).then(e => {
          this.sfx[n] = e;
          if (this._backname == name)
            this.playMusic(name);
          if (name in this.toplay) {
            this.playEffect(name);
          }
        });
      }
    }
    /**
     * Plays a single audio as the background in a loop throughout the game
     * 
     * @param {string} name
     */
    playBackgroundMusic(name) {
      this._backname = name;
      if (!(name in this.sfx))
        return
      this._background = new Sfx(this, this.sfx[name]);
      this._background.loop = true;
      this._background.play();
    }
    /**
     * Plays a sound only once.
     * 
     * @param {string} name Name of audio to play.
     * @param {number} [offset] Where to start playing the audio.It is in seconds.
     * @param {number} [duration] how long in seconds will the audio defaults to total duration of the selected audio. 
     */
    playEffect(name, offset = 0, duration = 0) {
      if (!(name in this.sfx)) {
        this.toplay[name] = 1;
        return
      }
      let s = new Sfx(this, this.sfx[name]);
      let id = this.playing.length;
      s.id = id;
      s.offset = offset;
      if (duration)
        s.duration = duration;
      this.playing.push(s);
      s.play();
    }

    /**
     * Creates and returns an SFX.
     * 
     * @param {string} name
     * @rerurns Sfx
     */
    createSfx(name) {
      ///throw error if name is not in this.
      return new Sfx(this, this.sfx[name])
    }
    /**
     * Pauses currently playing sounds.
     */
    pauseAll() {
      this.playing.forEach(sound => {
        sound.stop();
      });
    }
    /**
     * Sets the volume to zero.Sounds will continue playing but not be audible.
     */
    mute() {
      this._mute = this.masterGainNode.gain;
      this.masterGainNode.gain = 0;

    }
    /**
     * Restores the volume before it was muted.
     */
    unmute() {
      this.masterGainNode.gain = this._mute;
    }
    /**
     * Removes an sfx from the handler and disconnects it from its destination.
     * 
     * @param {Sfx} sfx
     */
    remove(sfx) {
      let id = this.playing.indexOf(sfx);
      if (id == -1) return
      sfx.disconnect();
      Utils$1.removeElement(this.playing, id);
    }
  }

  /**
   * A system that manages agent components by updating them.
   */
  class AgentManager {
    /**
     * A list of agents to update every frame.
     * 
     * @type Agent[]
    */
    objects = []
    /**
     * Initializes the manager.
     * 
     * @param {Manager} manager
    */
    init(manager) {
      manager.setComponentList("agent", this.objects);
    }
    /**
     * Update all registered agents.
     * 
     * @param {number} dt
    */
    update(dt) {
      let inv_dt = 1 / dt;
      for (var i = 0; i < this.objects.length; i++) {
        this.objects[i].update(inv_dt);
      }
    }
  }

  /**
   * Manages the behaviours for an agent.
   * 
   * @package
   */
  class BehaviourManager {
    /**
     * A list of behaviors
     * 
     * @type Behaviour[]
     */
    _behaviours = []
    /**
     * Accumulated force from behaviours to apply to agent
     */
    _accumulated = new Vector()
    /**
     * Adds a behavior to the manager
     * 
     * @param {Behaviour} behaviour 
     */
    add(behaviour) {
      this._behaviours.push(behaviour);
      if (this.active) behaviour.init(this._agent);
    }
    /**
     * Removes a behavior to the manager
     * 
     * @param {Behaviour} behaviour 
     */
    remove(behaviour) {
      Utils$1.removeElement(this._behaviours, this._behaviours.indexOf(behaviour));
    }
    /**
     * Boots up the behavoiurs of the agent that contains it.
     * 
     * @param {Agent} agent 
     */
    init(agent) {
      this._agent = agent;
      for (var i = 0; i < this._behaviours.length; i++) {
        this._behaviours[i].init(agent);
      }
    }
    /**
     * Updates the behaviours of the agent and applies changes to agent.
     * 
     * @param {number} inv_dt
     */
    update(inv_dt) {
      let result = new Vector();
      this._accumulated.set(0, 0);
      for (let i = 0; i < this._behaviours.length; i++) {
        this._behaviours[i].calc(result, inv_dt);
        this._accumulated.add(result);
      }
      this._agent.acceleration.add(this._accumulated);
      this._agent.orientation.radian = Vector.toRad(this._agent.velocity);
    }
    /**
     * Removes all behaviours from a manager.
     */
    clear() {
      Utils$1.clearArr(this._behaviours);
    }
    /**
     * @ignore
     * Used for visually debugging items.
     */
    draw(renderer) {
      this._behaviours.forEach(b => b.draw(renderer));
    }
  }

  /**
   * This is a component class used to add AI behavior to an entity.
   * 
   * @implements Component
   */
  class Agent {
    /**
     * The position of the entity.
     * 
     * @type Vector
     */
    position = null
    /**
     * The velocity of the entity.
     * 
     * @type Vector
     */
    velocity = null
    /**
     * The acceleration of the entity.
     * 
     * @type Vector
     */
    acceleration = null
    /**
     * The orientation of the entity.
     * 
     * @type Angle
     */
    orientation = null
    /**
     * The rotation of the entity.
     * 
     * @type Angle
     */
    rotation = null
    /**
     * The maximum speed of the agent in pixels per second.
     * 
     * @type number
     */
    maxSpeed = 20
    /**
     * Maximum rotation of the agent in radians per second
     * Not yet implemented.
     */
    maxTurnRate = 5
    /**
     * 
     * @private
     * @type BehaviourManager
     */
    behaviours = new BehaviourManager()
    /**
     * @inheritdoc
     * @param {Entity} entity
     */
    init(entity) {
      this.entity = entity;
      this.requires("transform", "movable");
      let move = entity.get("movable"),
        transform = entity.get("transform");
      this.velocity = move.velocity;
      this.rotation = move.rotation;
      this.position = transform.position;
      this.orientation = transform.orientation;
      this.acceleration = move.acceleration;
      this.behaviours.init(this);
    }
    /**
     * Adds a behavior to the agent.
     * 
     * @param {Behaviour} behaviour
     */
    add(behaviour) {
      this.behaviours.add(behaviour);
    }
    /**
     * Removes a behavior to the agent.
     * 
     * @param {Behaviour} behaviour
     */
    remove(behaviour) {
      this.behaviours.remove(behaviour);
    }
    /**
     * @inheritdoc
     * @param {number} inv_dt Inverse of delta time i.e frameRate.
     */
    update(inv_dt) {
      this.behaviours.update(inv_dt);
    }
    /**
     * @param {Renderer} renderer
     */
    draw(renderer) {
      this.behaviours.draw(renderer);
    }
  }
  Utils$1.inheritComponent(Agent);

  /**
   * Base class for implementing customized behaviours.
   * 
   * @abstract
   */

  class Behaviour {
    /**
     * The position of the agent.
     * 
     * @type Vector
     */
    position = null
    /**
     * The velocity of the agent.
     * 
     * @type Vector
     */
    velocity = null
    /**
     * The maximum speed a behaviour will reach when active.
     * 
     * @type number
     */

    maxSpeed = 1000
    /**
     * Maximum force a behaviour will exert on the agent.This affects acceleration, deceleration and turn rate of the agent.
     * 
     * @type number
     */
    maxForce = 1000
    /**
     * Whether to exert a behaviour's calculated force onto its agent
     */
    active = true

    /**
     * Sets up a behavior to work on an agent.
     * 
     * @param {Agent} agent
     */
    init(agent) {}
    /**
     * Calculates the amount of force required to satisfy a behavior.
     * 
     * @param {Vector} target
     * @param {number} inv_dt
     * @returns Vector the first parameter
     */
    calc(target, inv_dt) {}
    /**
     * Used to debug a behavior visually.
     * 
     * @param {Renderer} renderer
     */
    draw(renderer) {}
  }

  let tmp1$4 = new Vector();
  /**
   * Creates a behaviour to evade a certain position.
   * 
   * @augments Behaviour
  */
  class EvadeBehaviour extends Behaviour {
    /**
     * Distance in which to begin evading.
     * 
     * @type number
    */
    radius = 200
    /**
     * @param {Vector} pursuer
    */
    constructor(pursuer) {
      super();
      this.pursuer = pursuer;
    }
      /**
     * @inheritdoc
     * @param {Agent} agent
     */
    init(agent) {
      this.position = agent.position;
      this.velocity = agent.velocity;
      
    }
      /**
     * @inheritdoc
     * @param {Vector} target
     * @param {number} inv_dt
     * @returns Vector the first parameter
     */
    calc(target,inv_dt) {
      let difference = tmp1$4.copy(this.position).sub(this.pursuer);
      let length = difference.magnitude();
      if(length == 0 || length > this.radius)return
      difference.setMagnitude(map(length,0,this.radius,this.maxSpeed,0));
      let steering = difference.sub(this.velocity).multiply(inv_dt);
      
      steering.clamp(0, this.maxForce);
      target.copy(steering);
    }
  }

  let tmp1$3 = new Vector(),
    tmp2$2 = new Vector();
    
  /**
   * Creates a behaviour that is used to make an agent wander in an organic manner.
   * 
   * @augments Behaviour
  */
  class WanderBehaviour extends Behaviour {
    /**
     * This sets a point on the perimeter circle that is infront of the agent.
     * 
     * @type number
     */
    _theta = 90
    /**
     * This clamps the offset that modify the WandererBehaviour#theta value each frame.
     * 
    * @type number
    */
    dtheta = 10
    /**
     * How big should the circle in front of the agent be.
    */
    _radius = 100
    constructor() {
      super();
    }
    /**
     * @inheritdoc
     * @param {Agent} agent
     */
    init(agent) {
      this.position = agent.position;
      this.velocity = agent.velocity;
    }
    /**
     * @inheritdoc
     * @param {Vector} target
     * @param {number} inv_dt
     * @returns Vector the first parameter
     */
    calc(target, inv_dt) {

      this._theta += rand(-this.dtheta, +this.dtheta);
      let forward = tmp1$3.copy(this.velocity);
      if (forward.equalsZero())
        Vector.random(forward);
      let radius = this._radius * 0.8;
      forward.setMagnitude(this._radius);
      //ctx.arc(...tmp2.copy(this.position).add(forward), radius, 0, Math.PI * 2)
      //ctx.stroke()
      Vector.fromDeg(this._theta + Vector.toDeg(this.velocity), tmp2$2).multiply(radius);
      forward.add(tmp2$2);
      //forward.draw(ctx,...this.position)
      forward.setMagnitude(this.maxSpeed);
      forward.sub(this.velocity).multiply(inv_dt).clamp(0, this.maxForce);
      target.copy(forward);
    }

  }

  /**
   * Not impemented.
   * 
   * @augments Behaviour
  */
  class Pursuit {
    constructor() {

    }
      /**
       * @inheritdoc
       * @param {Agent} agent
       */
    init(){
      
    }
      /**
       * @inheritdoc
       * @param {Vector} target
       * @param {number} inv_dt
       * @returns Vector the first parameter
       */
    calc(target){
      
    }
  }

  /**
   * not complete.
   * 
   * @augments Behaviour
   */
  class Flock {
    /**
     * @type Agent[]
     */
    neighbours = []
    constructor() {}
    /**
     * @inheritdoc
     * @param {Agent} agent
     * 
     */
    init(agent) {

    }
    /**
     * @inheritdoc
     * @param {Vector} target
     * @param {number} inv_dt
     * @returns Vector the first parameter
     */
    calc(target,inv_dt) {

    }
  }

  let tmp1$2 = new Vector();
    
  /**
   * Creates a behaviour to seek out a target and move towards it.
   * 
   * @augments Behaviour
  */
  class SeekBehaviour extends Behaviour {
    /**
     * Not implemented.
     * Radius in which to seek out the target.
     * 
     * @type number
    */
    radius = 100
    constructor(target) {
      super();
      this.target = target;
    }
      /**
       * @inheritdoc
       * @param {Agent} agent
       */
    init(agent) {
      this.position = agent.position;
      this.velocity = agent.velocity;
    }
      /**
       * @inheritdoc
       * @param {Vector} target
       * @param {number} inv_dt
       * @returns Vector the first parameter
       */
    calc(target,inv_dt) {
      let difference = tmp1$2.copy(this.target).sub(this.position);
      difference.setMagnitude(this.maxSpeed);
      let steering = difference.sub(this.velocity).multiply(inv_dt);
      
      steering.clamp(0, this.maxForce);
      target.copy(steering);
    }
  }

  let tmp1$1 = new Vector(),
    tmp2$1 = new Vector();

  /**
   * This provides a seek behaviour which slows down when the agent approaches a target.
   * 
   * @augments Behaviour
   */
  class ArriveBehaviour extends Behaviour {
    /**
     * Radius in which to expect the agent to start slowing down.
     * 
     * @type number
     */
    radius = 1000
    /**
     * @param {Vector} target
     */
    constructor(target) {
      super();
      this.target = target;
    }

    /**
     * @inheritdoc
     * @param {Agent} agent
     */
    init(agent) {
      this.position = agent.position;
      this.velocity = agent.velocity;
    }
    /**
     * @inheritdoc
     * @param {Vector} target
     * @param {number} inv_dt
     * @returns Vector the first parameter
     */
    calc(target, inv_dt) {
      let difference = tmp1$1.copy(this.target).sub(this.position);
      let velocity = tmp2$1.copy(this.velocity);
      let length = difference.magnitude();

      if (length < this.radius) {
        difference.setMagnitude(map(length, 0, this.radius, 0, this.maxSpeed));
      } else {
        difference.setMagnitude(this.maxSpeed);
      }

      let steering = difference.sub(velocity).multiply(inv_dt);

      steering.clamp(0, this.maxForce);
      steering.draw(ctx, ...this.position);
      target.add(steering);
    }
  }

  const tmp1 = new Vector();
  const tmp2 = new Vector();
  const tmp3 = new Vector();
  /**
   * Creates a behaviour that follows a certain path.
   * 
   * @augments Behaviour
   */
  class PathFollowing extends Behaviour {
    /**
     * The path taken by a pathfollowing behaviour.
     * 
     * @type Path
     */
    path = null
    /**
     * @param {Path} path
     */
    constructor(path) {
      super();
      this.path = path;
      path.speed = this.maxSpeed;
    }
    /**
     * @inheritdoc
     * @param {Vector} target
     * @param {number} inv_dt
     * @returns Vector the first parameter
     */
    calc(target, inv_dt) {
      tmp1.copy(this.position);
      let [p1, p2] = this.path.current();
      tmp2.copy(p2).sub(p1).magnitude();
      tmp2.normalize();

      let proj = tmp2.dot(tmp1.sub(p1));
      tmp3.copy(tmp2).multiply(proj);
      let projPoint = this.path.update(proj);
      tmp1.copy(projPoint).sub(this.position);
      let length = tmp1.magnitude();
      if (length < this.velocity.magnitude()) {
        tmp1.setMagnitude(map(length, 0, this.maxSpeed, 0, this.maxSpeed));
      }
      let steering = tmp1.sub(this.velocity).multiply(inv_dt);

      steering.clamp(0, this.maxForce);
      target.add(steering);

      return target
    }
    /**
     * Removes all points on the path.
     */
    clear() {
      this.path.clear();
    }
    /**
     * @inheritdoc
     * @param {Agent} agent
     */
    init(agent) {
      this.position = agent.position;
      this.velocity = agent.velocity;
    }
    /**
     * Adds a point into the path.
     * 
     * @param {Vector} point
     */
    add(point) {
      this.path.add(point);
    }
    /**
     * If the agent should start at the beginning after reaching the ent of the path.
     * 
     * @type boolean
     */
    set loop(x) {
      this.path.loop = x;
    }
    get loop() {
      return this.path.loop
    }
    /**
     * Sets a new path to follow.
     *
     * @param {Path} path
     */
    setPath(path) {
      this.path = path;
    }
    draw(ctx) {
      ctx.beginPath();
      circle(ctx, ...this.path.point(), 4);
      fill(ctx, "blue");
      ctx.closePath();
      ctx.beginPath();
      circle(ctx, ...this.path.point(), this.path.tolerance);
      stroke(ctx, "blue");
      ctx.closePath();
      this.path.draw(ctx);
    }
  }

  let tmp = new Vector();
  class Path {
    _points = []
    _index = 0
    speed = 20
    tolerance = 20
    _lerp_t = 0
    _lerpdist = 0
    _way = [0, 1]
    _finished = false
    _lerpedPoint = new Vector()
    loop = false
    add(point) {
      this._points.push(point);

      return this
    }

    clear() {
      this._points.length = 0;
      this._way[0] = 0;
      this._way[1] = 0;
      this._lerp_t = 0;
      this._finished = false;

      return this
    }
    advance() {
      if (this._points.length < 2) return false
      if (this._way[1] == this._points.length - 1 &&
        !this.loop) return false
      if (
        this._way[1] == this._points.length - 1 &&
        this.loop
      ) {
        this._way[0] = this._points.length - 1;
        this._way[1] = 0;
        this._lerp_t = 0;
        return true
      }
      this._way[0] = this._way[1];
      this._way[1] += 1;
      this._lerp_t = 0;
      return true
    }
    update(lerpdist = this._lerpdist) {
      if (this._finished) return this._lerpedPoint
      let dist = tmp.copy(this._points[this._way[0]]).sub(this._points[this._way[1]]).magnitude();
      this._lerp_t = (this.speed + lerpdist) / dist;
      if (this._lerp_t > 1 && (dist - lerpdist) < this.tolerance) {
        if (!this.advance()) this._finished = true;
      }
      this._lerp_t = clamp(this._lerp_t, 0, 1);
      Vector.lerp(
        this._points[this._way[0]],
        this._points[this._way[1]],
        this._lerp_t,
        this._lerpedPoint
      );
      return this._lerpedPoint
    }
    current() {
      return [
        this._points[this._way[0]],
        this._points[this._way[1]]
        ]
    }
    point() {
      return this._lerpedPoint
    }
    get path() {
      return this._points
    }
    draw(ctx) {
      ctx.beginPath();
      vertices(ctx, this._points, this.loop);
      stroke(ctx, "lightgreen");
      ctx.closePath();
    }
  }

  /**
   * Used to manipulate and read from the cookie string.
   * 
   * @module Cookie
  */

  const Cookies = {
    /**
     * Adds a cookie pair to cookies.
     * 
     * @param {string} n Key of the cookie.
     * @param {string} v The value of the cookie.
     * @param {number} [=12000] Max age of the cookie before it is deleted.
    */
    set(n, v, maxAge= 12000) {
      document.cookie = `${n}=${v};maxAge=${maxAge}`;
    },
    /**
     * Returns the value of the given key.
     * 
     * @param {string} n Key of the cookie
     * @returns {string}
    */
    get(n) {
      let arr = document.cookie.split(";");
      for (var i = 0; i < arr.length; i++) {
        let pair = arr[i].split('=');
        if (pair[0].includes(n))
          return pair[1]
      }
    },
    /**
     * Removes a cookie by its key from cookies.
     * 
     * @param {string} n Key of the cookie
    */
    delete(n){
      document.cookie = `${n}=; max-age=0`;
    },
    /**
     * Removes all cookies that are contained on the document.
    */
    clear() {
      let arr = document.cookie.split(";");
      for (var i = 0; i < arr.length; i++) {
        let pair = arr[i].split('=');
        this.delete(pair[0]);
      }
    }
  };

  /**
   * This provides temporary storage when your application tab is open.
   * 
   * @module Session
  */
  const Session = {
    /**
     * Adds a value to sessions
     * 
     * @param {string} k 
     * @param {any} v
    */
    set(k,v) {
      JSON.stringify(v);
      sessionStorage.setItem(k,v);
    },
    /**
     * Gets a value from sessions using a key
     * 
     * @param {string} k A key to retrieve a value
    */
    get(k) {
      let json = sessionStorage.getItem(k);
      return JSON.parse(json)
    },
    /**
     * Removes everything from sessions
    */
    clear() {
      sessionStorage.clear();
    }
  };

  /**
   * This provides permanent storage
  */

  const Storage = {
    /**
     * Adds a value to local storage
     * 
     * @param {string} k 
     * @param {any} v
    */
    set(k,v) {
      JSON.stringify(v);
      localStorage.setItem(k,v);
    },
    /**
     * Gets a value from local storage by its key.
     * 
     * @param {string} k
    */
    get(k) {
      let json = localStorage.getItem(k);
      return JSON.parse(json)
    },
    /**
     * Removes everything from local storage 
    */
    clear() {
      localStorage.clear();
    }
  };

  exports.Agent = Agent;
  exports.AgentManager = AgentManager;
  exports.AgentSprite = AgentSprite;
  exports.Angle = Angle;
  exports.ArriveBehaviour = ArriveBehaviour;
  exports.AudioHandler = AudioHandler;
  exports.Ball = Ball;
  exports.BasicMaterial = BasicMaterial;
  exports.Behaviour = Behaviour;
  exports.Body = Body;
  exports.BodySprite = BodySprite;
  exports.BoundingBox = BoundingBox;
  exports.BoundingCircle = BoundingCircle;
  exports.Box = Box;
  exports.BufferGeometry = BufferGeometry;
  exports.Circle = Circle;
  exports.CircleGeometry = CircleGeometry;
  exports.Clock = Clock;
  exports.Component = Component;
  exports.Composite = Composite;
  exports.Constraint = Constraint;
  exports.Cookies = Cookies;
  exports.DEVICE = DEVICE;
  exports.DOMEventHandler = DOMEventHandler;
  exports.DebugMesh = DebugMesh;
  exports.DistanceConstraint = DistanceConstraint;
  exports.Entity = Entity;
  exports.Err = Err;
  exports.EvadeBehaviour = EvadeBehaviour;
  exports.EventDispatcher = EventDispatcher;
  exports.Events = Events;
  exports.Flock = Flock;
  exports.Geometry = Geometry;
  exports.Grid = Grid;
  exports.Group = Group;
  exports.HeightMap = HeightMap;
  exports.Input = Input;
  exports.Keyboard = Keyboard;
  exports.Layer = Layer;
  exports.Line = Line;
  exports.Loader = Loader;
  exports.Manager = Manager;
  exports.Material = Material;
  exports.Matrix = Matrix2;
  exports.Matrix2 = Matrix2;
  exports.Mouse = Mouse;
  exports.Movable = Movable;
  exports.NaiveBroadphase = NaiveBroadphase;
  exports.Overlaps = Overlaps;
  exports.ParallaxBackground = ParallaxBackground;
  exports.Particle = Particle;
  exports.ParticleSystemSprite = System$1;
  exports.Path = Path;
  exports.PathFollowing = PathFollowing;
  exports.Pursuit = Pursuit;
  exports.QuadTreeBroadphase = Tree;
  exports.Rectangle = Rectangle;
  exports.Renderer = Renderer;
  exports.Renderer2D = Renderer2D;
  exports.SeekBehaviour = SeekBehaviour;
  exports.Session = Session;
  exports.Sfx = Sfx;
  exports.Shape = Shape;
  exports.SpringConstraint = SpringConstraint;
  exports.Sprite = Sprite;
  exports.SpriteMaterial = SpriteMaterial;
  exports.StaticImageMaterial = StaticImageMaterial;
  exports.Storage = Storage;
  exports.System = System;
  exports.Touch = Touch;
  exports.Transform = Transform;
  exports.Triangle = Triangle;
  exports.Utils = Utils$1;
  exports.Vector = Vector;
  exports.WanderBehaviour = WanderBehaviour;
  exports.WebGLRenderer = WebGLRenderer;
  exports.WebGPURenderer = WebGPURenderer;
  exports.World = World;
  exports.arc = arc;
  exports.circle = circle;
  exports.clamp = clamp;
  exports.defaultCollisionHandler = defaultCollisionHandler;
  exports.defaultPrecollisionHandler = defaultPrecollisionHandler;
  exports.degToRad = degToRad;
  exports.drawImage = drawImage;
  exports.exp = exp;
  exports.fill = fill;
  exports.fillText = fillText;
  exports.lerp = lerp;
  exports.line = line;
  exports.map = map;
  exports.naturalizePair = naturalizePair;
  exports.radToDeg = radToDeg;
  exports.rand = rand;
  exports.rect = rect;
  exports.round = round;
  exports.sq = sq;
  exports.sqrt = sqrt;
  exports.stroke = stroke;
  exports.vertices = vertices;

}));
/**
 * @typedef Bounds
 * @property {Vector_like} max
 * @property {Vector_like} min
 *//**
 * @typedef CollisionPair
 * @property {Body} a
 * @property {Body} b
*/

/**
 * @typedef Manifold
 * @property {Body} bodyA 
 * @property {Body} bodyB
 * @property {ContactManifold} contactData
 * @property {number} stmp
 * @property {number} impulse
 * @property {boolean} persistent 
 * @property {Vector} ca1
 * @property {Vector} ca2
 * @property {number} restitution
 * @property {number} staticFriction
 * @property {number} kineticFriction
 * @property {Vector} velA
 * @property {Vector} velB
 * @property {number} rotA
 * @property {number} rotB
 */

/**
 * @typedef ContactManifold
 * @property {number} lastOverlap
 * @property {number} overlap=-Infinity
 * @property {boolean} done=false
 * @property {Vector} axis
 * @property {Vector[]} verticesA
 * @property {Vector[]} verticesB
 * @property {Shape} vertShapeA
 * @property {Shape} vertShapeB
 * @property {number} contactNo
 * @property {number} indexA
 * @property {number} indexB
 *//**
 * @typedef Vector_like
 * @property {number} x
 * @property {number} y
 */