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
    this.buffer[channel] = value;
  }
  //----------------------------------------------------------------------------
}

module.exports = GenericDevice;
