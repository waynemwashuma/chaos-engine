export function raycastDebugger(manager) {
  manager.registerSystem("raycastDebugger", {
    renderer: null,
    raycaster: null,
    init(manager) {
      const that = this
      this.renderer = manager.getSystem("renderer")
      this.raycaster = manager.getSystem("raycaster")
      setupDebugger(this)
      manager.events.add("clear", e => {
        setupDebugger(that)
      })
    },
    update(dt) {}
  })
}

function setupDebugger(debug) {
  debug.renderer.add({
    render(ctx) {
      debug.raycaster.objects.forEach(e => {
        ctx.save()
        ctx.beginPath()
        ctx.translate(...e._transform.position)
        e.rays.forEach(r => {
          ctx.moveTo(0, 0)
          ctx.lineTo(
            r.direction.x * r.maxLength,
            r.direction.y * r.maxLength
          )
          ctx.lineWidth = 2
        })
        ctx.strokeStyle = "rgba(255,255,255,0.5)"
        ctx.stroke()
        ctx.closePath()
        ctx.restore()
        e.collisionResults.forEach(r => {
          r.collisions.forEach(c => {
            c.points.forEach(p => {
              ctx.beginPath()
              ctx.arc(...p.point, 3, 0, Math.PI * 2)
              ctx.strokeStyle = "white"
              ctx.stroke()
              ctx.closePath()
            })
          })
        })
      })
    }
  })
}