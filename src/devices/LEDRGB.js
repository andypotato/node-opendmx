class LEDRGBDevice {
  
  // construction
  constructor() {
    this.buffer = Buffer.alloc(3);
  }
  //----------------------------------------------------------------------------

  // accessors
  numChannels() {
    return this.buffer.length;
  }

  setColor(r, g, b) {
    this.buffer[0] = r,
    this.buffer[1] = g,
    this.buffer[2] = b;
  }

  off() {
    this.setColor(0, 0, 0);
  }

  white() {
    this.setColor(255, 255, 255);
  }

  red() {
    this.setColor(255, 0, 0);
  }

  green() {
    this.setColor(0, 255, 0);
  }

  yellow() {
    this.setColor(255, 255, 0);
  }

  blue() {
    this.setColor(0, 0, 255);
  }
  //----------------------------------------------------------------------------
}

module.exports = LEDRGBDevice;
