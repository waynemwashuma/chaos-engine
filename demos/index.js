import * as demos from "./demo.js"
import { materials } from "./marterial.js"
import { box } from "./box.js"
import { random } from "./random.js"
import { boxheap } from "./boxheap.js"
import { circleheap } from "./circleheap.js"
import { stacking } from "./stacking.js"
import { pyramid } from "./pyramid.js"
import { circle } from "./circle.js"
import { circlestacking } from "./circlestack.js"
import { triangle } from "./triangle.js"
import { friction } from "./friction.js"
import { restitution } from "./restitution.js"
import { collisionmasks } from "./collisionmasks.js"
import { circlerestitution } from "./restitutioncircle.js"
import { Storage } from 'chaos-studio';
import { easing } from "./easing.js"


/*
import { bridge } from "./bridge.js"
import { car } from "./car.js"
import { constraint } from "./constraints.js"
import { pathfollower } from "./pathfollower.js"
import { particle } from "./particle.js"
import { wanderer } from "./wanderer.js"
import { seeker } from "./seeker.js"
import { raycaster } from "./raycaster.js"
*/

//Renderer
demos.register("materials", materials)

//Physics
demos.register("box", box)
demos.register("circle", circle)
demos.register("triangle", triangle)
demos.register("pyramid", pyramid)
demos.register("random", random)
demos.register("box stack", stacking)
demos.register("circle stack", circlestacking)
demos.register("box heap", boxheap)
demos.register("circle heap", circleheap)
demos.register("box restitution", restitution)
demos.register("circle restitution", circlerestitution)
demos.register("friction", friction)
demos.register("collision mask", collisionmasks)

//Tween
demos.register("easing", easing)
/*

demos.register("constraints", constraint)
demos.register("bridge", bridge)
demos.register("car", car)

demos.register("raycaster", raycaster)

//Renderer
demos.register("particle", particle)

//AI
demos.register("pathfollower", pathfollower)
demos.register("wanderer", wanderer)
demos.register("seeker", seeker)
*/

demos.init("#can")
demos.play(Storage.get("setup") || "materials")
main()

function main() {
  const optionTab = document.querySelector("#options-checkbox")

  createDropDown("demos", demos.examples.keys(), e => {
    demos.play(e.target.value)
  }, optionTab)
  createCheckbox("pause", "Pause", pauseOrplay, optionTab)
  const slider = createSlider("slide", "slide", 0, 100, () => {}, optionTab)
}

function pauseOrplay(ev) {
  ev.currentTarget.checked ? demos.manager.pause() : demos.manager.play()
}
//UI functions
function createDropDown(id, options, onChange, parent) {
  const select = document.createElement("select")
  for (let n of options) {
    const option = document.createElement("option")
    option.value = n
    option.innerHTML = n
    select.append(option)
  }
  select.onchange = onChange
  if (parent) parent.append(select)
}

function createCheckbox(id, text, onInput, parent) {
  const p = document.createElement("p")
  p.id = id;
  p.classList.add("checkbox")
  let box = p.appendChild(document.createElement("input"))
  let label = p.appendChild(document.createElement("label"))
  box.type = "checkbox"
  box.addEventListener("change", onInput)
  label.appendChild(document.createTextNode(text))
  if (parent) parent.append(p)
  return p
}

function createSlider(id, text, min, max, onInput, parent) {
  const p = document.createElement("p")
  p.id = id;
  p.classList.add("checkbox")
  const slider = p.appendChild(document.createElement("input"))
  const label = p.appendChild(document.createElement("label"))
  label.appendChild(document.createTextNode(text))
  if (parent) parent.append(p)

  slider.oninput = onInput
  slider.type = "range"
  slider.min = min
  slider.max = max
  return p
}