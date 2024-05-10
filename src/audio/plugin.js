import { AudioHandler } from "./manager.js"

export class AudioPlugin {
  register(app) {
    const ctx = new AudioContext()
    
    window.addEventListener("pointermove", resumeAudio)
    window.addEventListener("pointerdown", resumeAudio)
    app.setResource(ctx)
    app.setResource(new AudioHandler(ctx))

    function resumeAudio() {
      ctx.resume()
      if (ctx.state == "running") {
        removeEventListener("pointermove", resumeAudio)
        removeEventListener("pointerdown", resumeAudio)
      }
    }
  }
}