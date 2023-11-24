export class Perf{
  _start = 0
  _time = 0
  start(){
    this._start = performance.now()
  }
  end(){
    this._time = performance.now() - this._start
    return this._time
  }
  fps(){
    return 1000/this._time
  }
}