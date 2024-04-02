export class Attribute {
  constructor(data, size) {
    this.size = size
    this.data = data
    this.count = data.length / size
  }
}