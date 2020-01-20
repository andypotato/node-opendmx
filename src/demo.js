const { OpenDMX, Devices } = require('./index');

let dmx = new OpenDMX();
let light = new Devices.LEDRGB();
dmx.addDevice(light, 1);

light.white();
dmx.render();

setTimeout(() => { 
  light.red();
  dmx.render();
}, 1000);

setTimeout(() => { 
  light.green();
  dmx.render();
}, 2000);

setTimeout(() => { 
  light.blue();
  dmx.render();
}, 3000);

setTimeout(() => { 
  light.off();
  dmx.render();
}, 4000);
