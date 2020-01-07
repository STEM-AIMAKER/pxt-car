# pxt-car

## Usage

### Predefined data type
This is a enumeration indicating the actions of the car including ``forward,back,right,left and stop``. 
```block
enum CarActions{forward,back,left,right,stop}
```
the ``CarMode`` represents two modes ``Manual`` and ``AI``.
```block
enum CarMode{Manual,AI}
```
and the ``LaneColorFilter`` provides four items for lane's color including ``white``,``blue``,``black`` and ``orange``.
```block
enum LaneColorFilter{white,orange,blue,black}
```

### Initializing serial
You can use the function to initialize the default output pin for serial port and baud rate

```block
aicar.initSerial()
```

### Switching mode
You can call the function ``switchMode()`` with the argument of ``CarMode`` to switch the mode between ``Manual`` and ``AI``.
```block
aicar.switchMode(CarMode)
```

### Running car's actions
You can call the function ``carRun()`` with the argument of ``CarActions`` to make the car run specific action.
```block
aicar.carRun(CarActions)
```

### Changing lane's color
You can call the function ``changeLaneColor()`` with the argument of ``LaneColorFilter`` to change lane's color.
```block
aicar.changeLaneColor(LaneColorFilter)
```

## TODO

- [ ] Add a reference for your blocks here
- [ ] Add "- beta" to the GitHub project description if you are still iterating it.
- [ ] Turn on your automated build on https://travis-ci.org
- [ ] Use "pxt bump" to create a tagged release on GitHub
- [ ] On GitHub, create a new file named LICENSE. Select the MIT License template.
- [ ] Get your package reviewed and approved https://makecode.microbit.org/extensions/approval

Read more at https://makecode.microbit.org/extensions

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

