import { App } from '../app.js'

/**
 * @callback SystemFunc
 * @param {Registry} registry
 * @returns {void}
 */

/**
 * @typedef RegisterFunc
 * @property {App} app
 * @returns {void}
 */

/**
 * @typedef Plugin
 * @property {RegisterFunc} register
 */