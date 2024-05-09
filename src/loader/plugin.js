import {
  ImageLoader,
  SoundLoader,
  LoadManager
} from "./resources/index.js"

export class LoaderPlugin{
  register(manager){
    const loadmanager = new LoadManager()
    manager.setResource(loadmanager)
    manager.setResource(new ImageLoader(loadmanager))
    manager.setResource(new SoundLoader(loadmanager))
  }
}