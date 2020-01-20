# Node.js OpenDMX USB Interface
This library will let you control [DMX512](https://en.wikipedia.org/wiki/DMX512) devices via the Enttec OpenDMX (or compatible) USB dongle.

## Driver installation
To use this library you need to install the [OpenDMX device driver](https://github.com/lowlander/dmx_usb_module) first. Additional installation instructions can be found [here](https://opendmx.net/index.php/LLA,_OpenDMX_USB_and_Q_Light_Controller_Tutorial) and [here](http://www.erwinrol.com/page/projects/open-dmx-usb/).

## Usage

Create the OpenDMX controller interface:
```
let dmx = new OpenDMX();
```
Create a DMX device. In this example a simple RGB light (3 channels) is created. Pull requests for additional devices are welcome!
```
let light = new Devices.LEDRGB();
```

Add the device to the collection of devices along with a starting channel. Since the RGB light uses 3 channels, the channels 1-3 in this DMX universe are now occupied.
```
dmx.addDevice(light, 1);
```
Change the light to red color (just for example)
```
light.red();
```
Render the DMX universe
```
dmx.render();
```
Your LED light should now switch to red color.
```
light.off();
dmx.render();
```
Your LED light should now be switched off.

## Common driver related issues
Instructions below are for Debian / Ubuntu or Raspbian distributions.

### The kernel driver can't be compiled
Make sure you have the necessary build tools installed.
```
sudo apt install git bc bison flex libssl-dev make
```

### The USB dongle is recognized as /dev/ttyUSBx instead of /dev/dmx0
Most likely you did not blacklist the default serial driver. Check the section "Blacklist the other serial drivers" in the [installation tutorial](https://opendmx.net/index.php/LLA,_OpenDMX_USB_and_Q_Light_Controller_Tutorial).

If for some reason blacklisting the serial driver doesn't work you can remove it from your system entirely using these steps:

 - Find your current system architecture using `uname -a`
 - Move the file `ftdi_sio.ko` from `/lib/modules/<your_architecture>/kernel/drivers/usb/serial` to a location where the system can't find it.
 - Move your DMX device driver `dmx_usb.ko` to the folder above
 - Run `sudo depmod` 

The file `/lib/modules/<your_architecture>/modules.alias` should now contain some new entries similar to this:

```
alias usb:v0403p6006d[1-9]*dc*dsc*dp*ic*isc*ip*in* dmx_usb
alias usb:v0403p6006d0[4-9]*dc*dsc*dp*ic*isc*ip*in* dmx_usb
alias usb:v0403p6001d[1-9]*dc*dsc*dp*ic*isc*ip*in* dmx_usb
alias usb:v0403p6001d0[4-9]*dc*dsc*dp*ic*isc*ip*in* dmx_usb
```

### The DMX device can only be opened as root user
You need to create a `udev` rule to automatically change device permissions once you plug in the dongle:

- Find your dongle's vendor and device ID using `lsusb`. You will find both IDs as `ID <vendor ID>:<device ID>` in the output. If for example your output reads: `Bus 001 Device 005: ID 0403:6001 Future Technology Devices International, Ltd FT232 Serial (UART) IC` then `0403` is the vendor ID and `6001` is the device ID.
- In `/etc/udev/rules.d` create a new file and name it `50-dmx.rules`. Add the following content to the file:

```
ATTRS{idVendor}=="<vendor ID>", ATTRS{idProduct}=="<device ID>", SUBSYSTEMS=="usb", ACTION=="add", MODE="0660", GROUP="plugdev"
```
Replace `<vendor ID>` and `<device ID>` with the values you found above. You can also adjust the `GROUP` value to match your requirements. Afterwards reboot your system, plug in the USB controller and it should have the requested permissions.

## Current limitations
- Only Linux is supported at the moment
- Only one dongle at the same time is supported
- No USB serial devices can be connected at the same time due to driver conflicts
