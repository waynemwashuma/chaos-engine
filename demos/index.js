import * as demos from "./demo.js"
import { materials } from "./marterial.js"
import { box } from "./box.js"
import { random } from "./random.js"
import { stacking } from "./stacking.js"
import { pyramid } from "./pyramid.js"
import { circle } from "./circle.js"
import { circlestacking } from "./circlestack.js"
import { triangle } from "./triangle.js"
import { friction } from "./friction.js"
import { restitution } from "./restitution.js"
import { animation } from "./animation.js"


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
demos.register("stack", stacking)
demos.register("circlestacking", circlestacking)
demos.register("pyramid", pyramid)
demos.register("random", random)
demos.register("restitution", restitution)
demos.register("friction", friction)

//Animation
//demos.register("animation", animation)
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

main()

function main() {
  let optionTab = document.querySelector("#options-checkbox")
  let demoOption = document.querySelector("#demos")
  for (let n of demos.examples.keys()) {
    let option = document.createElement("option")
    option.value = n
    option.innerHTML = n
    demoOption.append(option)
  }
  demoOption.onchange = () => {
    demos.play(demoOption.value)
  }
  createCheckbox("pause", "Pause", (ev) => {
    ev.currentTarget.checked ? demos.manager.pause() : demos.manager.play()
  },optionTab)
  //const slider = createSlider("slide","slide",0,100,()=>{},optionTab)
}

function createCheckbox(id, text,onInput, parent) {
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
function createSlider(id,text,min,max,onInput,parent){
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