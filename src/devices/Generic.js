class GenericDevice {
  
  // construction
  constructor(numChannels) {
    this.buffer = Buffer.alloc(numChannels);
  }
  //----------------------------------------------------------------------------

  // accessors
  numChannels() {
    return this.buffer.length;
  }

  setChannel(channel, value) {

    // Note: channel values start with "1" (NOT ZERO)

    // validate channel number
    if(channel > this.buffer.length) {
      return false;
    }

    // validate value
    if(isNaN(value) || value < 0 || value > 255) {
      return false;
    }

    this.buffer[channel - 1] = value;
  }

  setChannels(values) {
    // expects object with format:
    // { channel1: value1, channel2: value2 ... }
    for(let [channel, value] of Object.entries(values)) {
      this.setChannel(channel, value);
    }
  }
  //----------------------------------------------------------------------------
}

module.exports = GenericDevice;
