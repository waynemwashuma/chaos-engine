'use strict';

var vendors = ['ms','moz','webkit','o'];

for (let x = 0; x < vendors.length && !window.AudioContext; ++x) {
  window.AudioContext = window[vendors[x] + 'AudioContext'];
}
