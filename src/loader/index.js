import { DEVICE } from "../device/index.js"

class Loader {
  constructor(manager) {
    this._toload = []
    this.imgs = {}
    this.sfx = {}
    this.json = {}
    this._progressBytes = 0
    this._totalBytes = 0
    this._filesLoaded = 0
    this._totalFileNo = 0
    const that = this
    this.onfinish = null
    this._handlers = {
      onload: function(xhr,e) {
        let type = that._getType(xhr.responseURL)
        let name = that._getName(xhr.responseURL)
        if (type === "image") {
          that.imgs[name] = new Image()
          that.imgs[name].src = URL.createObjectURL(xhr.response)
        } else if (type === "audio") {
          that.sfx[name] = xhr.response
          //it using webAudio,just set it to the buffer 
          //else find a way to put this buffer into an audio tag
        } else if (type === "json") {
          that.json[name] = JSON.parse(xhr.response)
        } else {
          return Err.warn(`The file in url ${e.responseURL} is not loaded in the loader because its extension name is not supported`)
        }
        that._filesLoaded += 1
        if (that._filesLoaded == that._totalFileNo && that.onfinish)
          that.onfinish()
      },
      onheadload: function(e) {
        if (e.total === 0 || !e.lengthComputable) return
        that._totalBytes += e.total
        let xhr = new XMLHttpRequest();
        xhr.open('GET', files.images[i], true)

        xhr.onload = e => that._handlers.onload(xhr)
        xhr.onerror = console.log
        xhr.send()
      },
      onerror: function(e, name) {
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
    if (ext === "json") return "json"
  }
  loadAll(files) {
    this._totalFileNo =
      (files.images?.length || 0) +
      (files.audio?.length || 0) +
      (files.json?.length || 0)
    if (files.images) {
      for (var i = 0; i < files.images.length; i++) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', files.images[i], true)
        xhr.responseType = "blob"
        xhr.onload = e => this._handlers.onload(xhr)
        xhr.onerror = e => this._handlers.onerror(xhr)
        xhr.send()
      }
    }
    if (files.audio) {
      for (var i = 0; i < files.audio.length; i++) {
        let xhr = new XMLHttpRequest();
        xhr.responseType = "arraybuffer"
        xhr.open('GET', files.audio[i], true);
        xhr.onprogress = e => {
          console.log(e.total,e.loaded);
        }
        xhr.onload = e => this._handlers.onload(xhr)
        xhr.onerror = e => this._handlers.onerror(xhr)
        xhr.send();
      }
    }
    if (files.json) {
      for (var i = 0; i < files.json.length; i++) {
        let name = files.json[i]
        let xhr = new XMLHttpRequest();
        xhr.responseType = "text"
        xhr.open('GET', files.json[i], true);
        xhr.onload = e => this._handlers.onload(xhr)
        xhr.onerror = e => this._handlers.onerror(xhr)
        xhr.send();
      }

    }
  }
}

let l = new Loader()

l.loadAll({
  images: ["/fire.jpg"],
  audio: ["dv.mp3"],
  json: ["res.json"]
})
console.log(l);
export {
  Loader
}