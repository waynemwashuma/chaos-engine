import { error } from "../logger/index.js";

/**
 * Handled the keyboard input of an application on a PC.
 */
export class Keyboard {
  A = false
  B = false
  C = false
  D = false
  E = false
  F = false
  G = false
  H = false
  I = false
  J = false
  K = false
  L = false
  M = false
  N = false
  O = false
  P = false
  Q = false
  R = false
  S = false
  T = false
  U = false
  V = false
  W = false
  X = false
  Y = false
  Z = false
}
export class KeyboardPlugin {
  register(manager) {
    const eh = manager.getResource("domeventhandler")
    if (!eh) return error("The resource `DOMEventHandler()` is required to be set first before `KeyboardPlugin()` is registered.")
    const keyboard = new Keyboard()
    manager.setResource(keyboard)
    eh.add("keydown", e =>
      keyboard[normalizeKey(e.code)] = true
    )
    eh.add("keyup", e =>
      keyboard[normalizeKey(e.code)] = false
    )

  }
}

/**
 * Ensures that keycodes are produced in a consistent manner
 * 
 * @param {string} keycode
 * @returns {string}
 */
function normalizeKey(keycode) {
  const r = keycode.includes('Key') ?
    keycode.slice(3, keycode.length) :
    keycode
  return r.toUpperCase()
}