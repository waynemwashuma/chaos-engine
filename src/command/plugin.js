import { CommandQueue } from "./resources/index.js"

export class CommandsPlugin {
  register(manager) {
    manager.setResource(new CommandQueue())
    manager.registerSystem(executeCommands)
    manager.registerSystem(clearCommandQueue)
  }
}

function executeCommands(manager) {
  const queue = manager.getResource("commandqueue")

  for (let i = 0; i < queue.length; i++) {
    queue[i].execute(manager)
  }
}

function clearCommandQueue(manager) {
  const queue = manager.getResource("commandqueue")

  queue.length = 0
}