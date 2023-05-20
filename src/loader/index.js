class Loader {
  constructor(manager) {
    this.imgs = {}
    this.sfx = {}
    this.json = {}
    this._progressBytes = 0
    this._totalBytes = 0
    this._totalFileNo = 0
    const that = this
    this._handlers = {
      onload: function(e) {

      },
      onprogress: function(e) {

      },
      onheadload: function(e) {
        if(e.total === 0 || !e.lengthComputable)return
        this._totalBytes = e.total
        let xhr = new XMLHttpRequest();
        xhr.open('GET', files.images[i], true)
        xhr.responseType = "arraybuffer"
        xhr.onload = this._handlers.onload
        xhr.onprogress = this._handlers.onprogress
        xhr.onerror = console.log
        xhr.onload = this._handlers.onload
        xhr.send()
      },
      onerror:function (e) {
        console.log(e);
      }
    }
  }
  loadImg(path) {
    let img = new Image()
    img.onprogress = this._handlers.onprogress
    img.onload = this._handlers.onload
    this.imgs.push(img)
  }
  loadSfx(path) {
    let sfx = new Audio()
    sfx.onload = this._handlers.onload
    this.sfx.push(sfx)
  }
  loadAll(files) {
    this._totalFileNo = file?.images?.length + files?.audio?.length
    if (files?.images) {
      for (var i = 0; i < files.images.length; i++) {
        let xhr = new XMLHttpRequest();
        xhr.open('HEAD', files.images[i], true)
        
        xhr.onload = this._handlers.onheadload
        xhr.onerror = console.log
        xhr.send()
      }
    }
    if (files.audio) {
      for (var i = 0; i < files.audio.length; i++) {
        let xhr = new XMLHttpRequest();
        xhr.open('HEAD', files.audio[i], true);
        xhr.onload = (e) => this._handlers.onheadload
        xhr.onerror = (event) => console.log(event);
        xhr.send();
      }
    }
  }
}
export {
  Loader
}