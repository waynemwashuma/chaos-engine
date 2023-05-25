import {DEVICE} from "../device/index.js"

class Loader {
  constructor(manager) {
    this._toload = []
    this.imgs = {}
    this.sfx = {}
    this.json = {}
    this._progressBytes = 0
    this._totalBytes = 0
    this._totalFileNo = 0
    const that = this
    this._handlers = {
      onload: function(e) {
        let type = that._getType(e.responseURL)
        let name = that._getName(e.responseURL)
        if(type == "image"){
          that.imgs[name] = new Image()
          that.imgs[name].src = URL.createObjectURL(e.response)
        }else if(type == "audio"){
          
        }
      },
      onprogress: function(e) {

      },
      onheadload: function(e) {
        if (e.total === 0 || !e.lengthComputable) return
        that._totalBytes += e.total
        let xhr = new XMLHttpRequest();
        xhr.open('GET', files.images[i], true)
        
        xhr.onload = that._handlers.onload
        xhr.onprogress = that._handlers.onprogress
        xhr.onerror = console.log
        xhr.onload = that._handlers.onload
        xhr.send()
      },
      onerror: function(e,name) {
        console.log(e);
      }
    }
  }
  _getName(url) {
    let ext
    if (url.includes("/")) {
      let tmp = url.split("/")
      url = tmp[tmp.length - 1]
    }
    return url.split(".")[0]
  }
  _getType(url) {
    let ext
    if (url.includes("/")) {
      let tmp = url.split("/")
      url = tmp[tmp.length - 1]
    }
    ext = url.split(".")[1]

    if (ext === "jpg" || ext === "png" || ext === "jpeg") return "image"
    if (ext === "mp3" || ext === "ogg") return "audio"
    throw Error(`The file extension ${ext} is not supported by the loader`)
  }
  loadImage(url) {

  }
  loadSfx() {

  }
  loadAll(files) {
    this._totalFileNo = files.images?.length + files.audio?.length + files.json?.length
    let that = this
    if (files.images) {
      for (var i = 0; i < files.images.length; i++) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', files.images[i],true)
xhr.responseType = "blob"
        xhr.onload = e => this._handlers.onload(xhr, files.images[i])
        xhr.onerror = e => this._handlers.onerror(e, files.images[i])
        xhr.send()
      }
    }
    if (files.audio) {
      for (var i = 0; i < files.audio.length; i++) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', files.audio[i], true);
        xhr.onload = e => this._handlers.onload(xhr, files.audio[i])
        xhr.onerror = e => this._handlers.onerror(e, files.audio[i])
        xhr.send();
      }
    }
  }
}

let l = new Loader()

l.loadAll({
  images : ["/fire.jpg"],
  audio:["dv.mp3"]
})
export {
  Loader
}