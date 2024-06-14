export class Command {
  type = "command"
  constructor(value) {
    this.arguments = value
  }
  execute() {}
  undo() {}
}