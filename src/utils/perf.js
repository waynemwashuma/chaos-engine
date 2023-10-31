export class Perf{
  _start = 0
  _time = 0
  start(){
    this._start = Performance.now()
  }
  end(){
    this._time = Performance.now() - this._start
    return this._time
  }
  fps(){
    return 1000/this._time
  }
}