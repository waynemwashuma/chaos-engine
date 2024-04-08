export class CommandQueue extends Array {}
export class CommandsPlugin {
  register(manager) {
    manager.setResource("commandqueue", new CommandQueue())
    manager.registerSystem(executeCommands)
    manager.registerSystem(clearCommandQueue)
  }
}

function executeCommands(manager) {
  const queue = manager.getResource("commandqueue")

  for (let i = 0; i < queue.length; i++) {
    queue[i].execute()
  }
}

function clearCommandQueue(manager) {
  const queue = manager.getResource("commandqueue")
  
  queue.length = 0
}