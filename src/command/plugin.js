import { EntityCommands } from "./resources/index.js"

export class CommandsPlugin {
  register(app) {
    app
      .setResource(new EntityCommands(app.registry))
      .registerUpdateSystem(executeCommands)
  }
}

function executeCommands(registry) {
  const commands = registry.getResource("entitycommands")

  commands.apply(registry)
  commands.clear()
}