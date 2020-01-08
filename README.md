# pxt-car

## Usage

### Predefined data type
This is a enumeration indicating the actions of the car including ``forward``,``back``,``right``,``left`` and ``stop``. 
```block
enum CarActions{Forward,Back,Left,Right,Stop}
```
the ``CarMode`` represents two modes ``Manual`` and ``AI``.
```block
enum CarMode{Manual,AI}
```
and the ``LaneColorFilter`` provides four items for lane's color including ``white``,``blue``,``black`` and ``orange``.
```block
enum LaneColorFilter{White,Orange,Blue,Black}
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

## Link
If some errors occurred, you will need to search for it using the full Github repo URL. eg: https://github.com/stem-hanshin/pxt-car/

## License
MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

