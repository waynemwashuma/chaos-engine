import { TransformPlugin } from '../transform/index.js';
import { MovablePlugin } from '../movable/index.js';
import { LoaderPlugin } from '../loader/index.js';
import { TimePlugin } from '../app/index.js';
import { InputPlugin } from '../inputs/index.js';
import { AudioPlugin } from '../audio/index.js';
import { ProfilerPlugin } from '../profiler/index.js';
import { Canvas2DRendererPlugin } from '../render-canvas2d/index.js';

export class DefaultPlugin {
  register(app) {
    app
      .registerPlugin(new TransformPlugin())
      .registerPlugin(new MovablePlugin())
      .registerPlugin(new LoaderPlugin())
      .registerPlugin(new TimePlugin())
      .registerPlugin(new InputPlugin())
      .registerPlugin(new AudioPlugin())
      .registerPlugin(new ProfilerPlugin())
      .registerPlugin(new Canvas2DRendererPlugin())
  }
}