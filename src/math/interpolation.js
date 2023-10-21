export const Easing = {
  Linear: {
    In: function(x) {
      return x;
    },
    Out: function(x) {
      return x;
    },
    InOut: function(x) {
      return x;
    },
  },
  Quadratic: {
    In: function(x) {
      return x * x;
    },
    Out: function(x) {
      return x * (2 - x);
    },
    InOut: function(x) {
      if ((x *= 2) < 1) {
        return 0.5 * x * x;
      }
      return -0.5 * (--x * (x - 2) - 1);
    },
  },
  Cubic: {
    In: function(x) {
      return x * x * x;
    },
    Out: function(x) {
      return --x * x * x + 1;
    },
    InOut: function(x) {
      if ((x *= 2) < 1) {
        return 0.5 * x * x * x;
      }
      return 0.5 * ((x -= 2) * x * x + 2);
    },
  },
  Quartic: {
    In: function(x) {
      return x * x * x * x;
    },
    Out: function(x) {
      return 1 - --x * x * x * x;
    },
    InOut: function(x) {
      if ((x *= 2) < 1) {
        return 0.5 * x * x * x * x;
      }
      return -0.5 * ((x -= 2) * x * x * x - 2);
    },
  },
  Quintic: {
    In: function(x) {
      return x * x * x * x * x;
    },
    Out: function(x) {
      return --x * x * x * x * x + 1;
    },
    InOut: function(x) {
      if ((x *= 2) < 1) {
        return 0.5 * x * x * x * x * x;
      }
      return 0.5 * ((x -= 2) * x * x * x * x + 2);
    },
  },
  Sinusoidal: {
    In: function(x) {
      return 1 - Math.sin(((1.0 - x) * Math.PI) / 2);
    },
    Out: function(x) {
      return Math.sin((x * Math.PI) / 2);
    },
    InOut: function(x) {
      return 0.5 * (1 - Math.sin(Math.PI * (0.5 - x)));
    },
  },
  Exponential: {
    In: function(x) {
      return x === 0 ? 0 : Math.pow(1024, x - 1);
    },
    Out: function(x) {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    },
    InOut: function(x) {
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
  },
  Circular: {
    In: function(x) {
      return 1 - Math.sqrt(1 - x * x);
    },
    Out: function(x) {
      return Math.sqrt(1 - --x * x);
    },
    InOut: function(x) {
      if ((x *= 2) < 1) {
        return -0.5 * (Math.sqrt(1 - x * x) - 1);
      }
      return 0.5 * (Math.sqrt(1 - (x -= 2) * x) + 1);
    },
  },
  Elastic: {
    In: function(x) {
      if (x === 0) {
        return 0;
      }
      if (x === 1) {
        return 1;
      }
      return -Math.pow(2, 10 * (x - 1)) * Math.sin((x - 1.1) * 5 * Math.PI);
    },
    Out: function(x) {
      if (x === 0) {
        return 0;
      }
      if (x === 1) {
        return 1;
      }
      return Math.pow(2, -10 * x) * Math.sin((x - 0.1) * 5 * Math.PI) + 1;
    },
    InOut: function(x) {
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
  },
  Back: {
    In: function(x) {
      var s = 1.70158;
      return x === 1 ? 1 : x * x * ((s + 1) * x - s);
    },
    Out: function(x) {
      var s = 1.70158;
      return x === 0 ? 0 : --x * x * ((s + 1) * x + s) + 1;
    },
    InOut: function(x) {
      var s = 1.70158 * 1.525;
      if ((x *= 2) < 1) {
        return 0.5 * (x * x * ((s + 1) * x - s));
      }
      return 0.5 * ((x -= 2) * x * ((s + 1) * x + s) + 2);
    },
  },
  Bounce: {
    In: function(x) {
      return 1 - Easing.Bounce.Out(1 - x);
    },
    Out: function(x) {
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
    InOut: function(x) {
      if (x < 0.5) {
        return Easing.Bounce.In(x * 2) * 0.5;
      }
      return Easing.Bounce.Out(x * 2 - 1) * 0.5 + 0.5;
    },
  },
  generatePow: function(power) {
    if (power === void 0) { power = 4; }
    power = power < Number.EPSILON ? Number.EPSILON : power;
    power = power > 10000 ? 10000 : power;
    return {
      In: function(x) {
        return Math.pow(x, power);
      },
      Out: function(x) {
        return 1 - Math.pow((1 - x), power);
      },
      InOut: function(x) {
        if (x < 0.5) {
          return Math.pow((x * 2), power) / 2;
        }
        return (1 - Math.pow((2 - x * 2), power)) / 2 + 0.5;
      },
    };
  },
}

export const Interpolation = {
  Linear: function(p0, p1, t) {
    return (p1 - p0) * t + p0
  },
  Bernstein: function(n, i) {
    const fc = Interpolation.Utils.Factorial

    return fc(n) / fc(i) / fc(n - i)
  },
  Factorial: (function() {
    const a = [1]

    return function(n) {
      let s = 1

      if (a[n]) {
        return a[n]
      }

      for (let i = n; i > 1; i--) {
        s *= i
      }

      a[n] = s
      return s
    }
  })(),

  CatmullRom: function(p0, p1, p2, p3, t) {
    const v0 = (p2 - p0) * 0.5
    const v1 = (p3 - p1) * 0.5
    const t2 = t * t
    const t3 = t * t2

    return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1
  },
}