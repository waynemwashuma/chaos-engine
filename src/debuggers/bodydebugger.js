import {} from '../ecs/index.js'

/**
 * @param {Manager} manager
*/
export function bodyDebugger(manager){
  manager.registerSystem("bodydebugger",{
    renderer:null,
    init(manager){
      this.renderer = manager.getSystem('renderer')
    },
    add(body){
      this.renderer.add(body)
    },
    update(){}
  })
  manager.event.add('add',(entity)=>{
    if(entity.has('body')){
      entity.manager.getSystem('bodydebugger').add(new BodySprite(entity.get("body")))
    }
  })
}