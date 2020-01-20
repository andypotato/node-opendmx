const fs = require('fs');

class OpenDMX {

  // construction
  constructor(streamDevice='/dev/dmx0') {

    this.streamDevice = streamDevice;
    this.stream = fs.createWriteStream(streamDevice);

    // init DMX frame buffer
    this.buffer = Buffer.alloc(513);

    // DMX512 specification requests thie first byte to be zero
    // following 512 bytes are for controlling channels
    this.buffer[0] = 0x00;

    // the OpenDMX adapter has no support for universes
    // therefore the device collection is initialized here
    this.devices = [];
  }
  //----------------------------------------------------------------------------

  // accessors
  addDevice(device, startChannel) {

    // validate start channel
    let channel = parseInt(startChannel, 10);
    if(isNaN(channel) || channel > 512 || channel < 1) {
      console.warn('Invalid start channel:', startChannel);
      return false;
    }

    let endChannel = startChannel + device.numChannels() - 1;

    // ensure end channel is within DMX512 range
    if(endChannel > 512) {
      console.warn('End channel is out of range:', endChannel);
      return false;
    }

    // ensure there is no overlap with existing devices
    for(let idx = 0; idx < this.devices.length; idx++) {
      let sc = this.devices[idx].startChannel;
      let ec = sc + this.devices[idx].device.numChannels() - 1;
      if(this.rangesOverlap(startChannel, endChannel, sc, ec)) {
        console.warn('Device channels overlapping', startChannel, endChannel, sc, ec);
        return false;
      }
    }

    this.devices.push({ device, startChannel });
  }

  render() {

    // copy all device buffers to DMX frame
    this.devices.forEach(d => {
      d.device.buffer.copy(this.buffer, d.startChannel);
    });

    // write frame to DMX device
    this.stream.write(this.buffer);
  }

  reset() {
    // resets the universe to its default state
    this.resetDevices();
    this.resetBuffer();
  }

  resetDevices() {
    this.devices = [];
  }

  resetBuffer() {
    this.buffer = Buffer.alloc(513);
    buffer[0] = 0x00;
  }
  //----------------------------------------------------------------------------

  // helpers
  rangesOverlap(x1, x2, y1, y2) {
    return Math.max(x1, y1) <= Math.min(x2, y2);
  }
  //----------------------------------------------------------------------------
}

module.exports = OpenDMX;
