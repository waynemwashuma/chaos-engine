export const Easing = {
  /**
   * @type {EasingFunc}
   */
  linear: function(x) {
    return x;
  },
  /**
   * @type {EasingFunc}
   */
  quadraticIn: function(x) {
    return x * x;
  },
  /**
   * @type {EasingFunc}
   */
  quadraticOut: function(x) {
    return x * (2 - x);
  },
  /**
   * @type {EasingFunc}
   */
  quadraticInOut: function(x) {
    if ((x *= 2) < 1) {
      return 0.5 * x * x;
    }
    return -0.5 * (--x * (x - 2) - 1);
  },
  /**
   * @type {EasingFunc}
   */
  cubicIn: function(x) {
    return x * x * x;
  },
  /**
   * @type {EasingFunc}
   */
  cubicOut: function(x) {
    return --x * x * x + 1;
  },
  /**
   * @type {EasingFunc}
   */
  cubicInOut: function(x) {
    if ((x *= 2) < 1) {
      return 0.5 * x * x * x;
    }
    return 0.5 * ((x -= 2) * x * x + 2);
  },
  /**
   * @type {EasingFunc}
   */
  quarticIn: function(x) {
    return x * x * x * x;
  },
  /**
   * @type {EasingFunc}
   */
  quarticOut: function(x) {
    return 1 - --x * x * x * x;
  },
  /**
   * @type {EasingFunc}
   */
  quarticInOut: function(x) {
    if ((x *= 2) < 1) {
      return 0.5 * x * x * x * x;
    }
    return -0.5 * ((x -= 2) * x * x * x - 2);
  },
  /**
   * @type {EasingFunc}
   */
  quinticIn: function(x) {
    return x * x * x * x * x;
  },
  /**
   * @type {EasingFunc}
   */
  quinticOut: function(x) {
    return --x * x * x * x * x + 1;
  },
  /**
   * @type {EasingFunc}
   */
  quinticInOut: function(x) {
    if ((x *= 2) < 1) {
      return 0.5 * x * x * x * x * x;
    }
    return 0.5 * ((x -= 2) * x * x * x * x + 2);
  },
  /**
   * @type {EasingFunc}
   */
  sinusoidalIn: function(x) {
    return 1 - Math.sin(((1.0 - x) * Math.PI) / 2);
  },
  /**
   * @type {EasingFunc}
   */
  sinusoidalOut: function(x) {
    return Math.sin((x * Math.PI) / 2);
  },
  /**
   * @type {EasingFunc}
   */
  sinusoidalInOut: function(x) {
    return 0.5 * (1 - Math.sin(Math.PI * (0.5 - x)));
  },
  /**
   * @type {EasingFunc}
   */
  exponentialIn: function(x) {
    return x === 0 ? 0 : Math.pow(1024, x - 1);
  },
  /**
   * @type {EasingFunc}
   */
  exponentialOut: function(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  },
  /**
   * @type {EasingFunc}
   */
  exponentialInOut: function(x) {
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    if ((x *= 2) < 1) {
      return 0.5 * Math.pow(1024, x - 1);
    }
    return 0.5 * (-Math.pow(2, -10 * (x - 1)) + 2);
  },
  /**
   * @type {EasingFunc}
   */
  circularIn: function(x) {
    return 1 - Math.sqrt(1 - x * x);
  },
  /**
   * @type {EasingFunc}
   */
  circularOut: function(x) {
    return Math.sqrt(1 - --x * x);
  },
  /**
   * @type {EasingFunc}
   */
  circularInOut: function(x) {
    if ((x *= 2) < 1) {
      return -0.5 * (Math.sqrt(1 - x * x) - 1);
    }
    return 0.5 * (Math.sqrt(1 - (x -= 2) * x) + 1);
  },
  /**
   * @type {EasingFunc}
   */
  elasticIn: function(x) {
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    return -Math.pow(2, 10 * (x - 1)) * Math.sin((x - 1.1) * 5 * Math.PI);
  },
  /**
   * @type {EasingFunc}
   */
  elasticOut: function(x) {
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    return Math.pow(2, -10 * x) * Math.sin((x - 0.1) * 5 * Math.PI) + 1;
  },
  /**
   * @type {EasingFunc}
   */
  elasticInOut: function(x) {
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    x *= 2;
    if (x < 1) {
      return -0.5 * Math.pow(2, 10 * (x - 1)) * Math.sin((x - 1.1) * 5 * Math.PI);
    }
    return 0.5 * Math.pow(2, -10 * (x - 1)) * Math.sin((x - 1.1) * 5 * Math.PI) + 1;
  },
  /**
   * @type {EasingFunc}
   */
  backIn: function(x) {
    var s = 1.70158;
    return x === 1 ? 1 : x * x * ((s + 1) * x - s);
  },
  /**
   * @type {EasingFunc}
   */
  backOut: function(x) {
    var s = 1.70158;
    return x === 0 ? 0 : --x * x * ((s + 1) * x + s) + 1;
  },
  /**
   * @type {EasingFunc}
   */
  backInOut: function(x) {
    var s = 1.70158 * 1.525;
    if ((x *= 2) < 1) {
      return 0.5 * (x * x * ((s + 1) * x - s));
    }
    return 0.5 * ((x -= 2) * x * ((s + 1) * x + s) + 2);
  },
  /**
   * @type {EasingFunc}
   */
  bounceIn: function(x) {
    return 1 - Easing.bounceOut(1 - x);
  },
  /**
   * @type {EasingFunc}
   */
  bounceOut: function(x) {
    if (x < 1 / 2.75) {
      return 7.5625 * x * x;
    }
    else if (x < 2 / 2.75) {
      return 7.5625 * (x -= 1.5 / 2.75) * x + 0.75;
    }
    else if (x < 2.5 / 2.75) {
      return 7.5625 * (x -= 2.25 / 2.75) * x + 0.9375;
    }
    else {
      return 7.5625 * (x -= 2.625 / 2.75) * x + 0.984375;
    }
  },
  /**
   * @type {EasingFunc}
   */
  bounceInOut: function(x) {
    if (x < 0.5) {
      return Easing.bounceIn(x * 2) * 0.5;
    }
    return Easing.bounceOut(x * 2 - 1) * 0.5 + 0.5;
  },
}

export const Interpolation = {
  /**
   * @param {number} p0
   * @param {number} p1
   * @param {number} t
   * 
   * @returns {number}
   */
  Linear: function(p0, p1, t) {
    return (p1 - p0) * t + p0
  },
  /**
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} t
   * 
   * @returns {number}
   */
  CatmullRom: function(p0, p1, p2, p3, t) {
    const v0 = (p2 - p0) * 0.5
    const v1 = (p3 - p1) * 0.5
    const t2 = t * t
    const t3 = t * t2

    return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1
  },
  /**
   * @param {number} p0
   * @param {number} p1
   * @param {number} t
   */
  cosine(p0, p1, t) {
    const c = (1 - Math.cos(t * 3.1415927)) * .5
    return (1 - c) * p0 + c * p1
  }
}