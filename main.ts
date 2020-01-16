
//% weight=10 color=#1E90FF icon="\uf136"
namespace COBot {
    let serialInited = 0;
    let pinsInited = 0;

    export enum CarActions {
        //% blockId="GoForward" block="Go Forward"
        GoForward = 0,
        //% blockId="GoBack" block="Go back"
        GoBack = 1,
        //% blockId="GoLeft" block="Go Left"
        GoLeft = 2,
        //% blockId="GoRight" block="Go Right"
        GoRight = 3,
        //% blockId="GoStop" block="Stop Car"
        GoStop = 4
    }

    export enum CarMode {
        //% blockId="ManualMode" block="Manual"
        ManualModel=0,
        //% blockId="AIMode" block="AI"
        AIModel=1
    }

    export enum LaneColorFilter{
        //% blockId="White" block="White"
        White=0,
        //% blockId="Orange" block="Orange"
        Orange=1,
        //% blockId="Blue" block="Blue"
        Blue=2,
        //% blockId="Black" block="Black"
        Black=3
    }

    export enum Motors{
        //% blockId="LeftMotor" block="Left Motor"
        LeftMotor=0,
        //% blockId="RightMotor" block="Right Motor"
        RightMotor=1,
        //% blockId="BothMotor" block="Both Motor"
        BothMotor=2
    }

    export enum Directions
    {
        //% blockId="Positive" block="Positive"
        Positive=0,
        //% blockId="Negative" block="Negative"
        Negative=1
    }

    function initSerial(): void {
        if( 0 == serialInited ) {
            serial.redirect(
                SerialPin.P8,
                SerialPin.P16,
                BaudRate.BaudRate9600
            );
            serialInited = 1;
        }
    }

    function initPins(): void {
        if (pinsInited == 0 )
        {
            pinsInited = 1;
            pins.analogSetPeriod(AnalogPin.P0, 10);
            pins.analogSetPeriod(AnalogPin.P1, 10);
        }
    }

    function executeLeftMotor( speed: number, direct: Directions ): void {
        if( direct == Directions.Positive )
            pins.digitalWritePin(DigitalPin.P14, 1)
        else
            pins.digitalWritePin(DigitalPin.P14, 0)
        
        let sp = 0;
        if (speed > 80)
            speed = 80;
        sp = speed * 1023 / 100;
        pins.analogWritePin(AnalogPin.P0, sp)
    }

    function executeRightMotor( speed: number, direct: Directions ): void {
        if (direct == Directions.Positive)
            pins.digitalWritePin(DigitalPin.P15, 1)
        else
            pins.digitalWritePin(DigitalPin.P15, 0)

        if( speed > 80 )
            speed = 80;

        let sp = 0;
        sp = speed * 1023 / 100;
        pins.analogWritePin(AnalogPin.P1, sp)
    }

    // //% blockId=isAICmd block="is %cmd AI command"
    // export function isAICmd(cmd: string): boolean {
    //     let ret = false;
    //     let head = cmd.charAt(0);
    //     if( head == "m" )
    //         ret = true;

    //     return ret;
    // }

    // //% blockId=aiRunMotor block="AI run motor %cmd"
    // export function aiRunMotor(cmd: string) : void {
    //     initSerial();
    //     if( isAICmd(cmd) )
    //     {
    //         let rd = cmd.charAt(1);
    //         let rsStr = cmd.charAt(2) + cmd.charAt(3);

    //         let ld = cmd.charAt(4);
    //         let lsStr = cmd.charAt(5) + cmd.charAt(6);
            
    //         let rdd = Directions.Positive;
    //         if( rd == "1" )
    //             rdd = Directions.Negative;
            
    //         let ldd = Directions.Positive;
    //         if (ld == "1")
    //             ldd = Directions.Negative;
            
    //         let rss = parseInt(rsStr);
    //         let lss = parseInt(lsStr);

    //         serial.writeString(cmd);
            
    //         runMotor(Motors.LeftMotor, lss, ldd);
    //         runMotor(Motors.RightMotor, rss, rdd);
                       
    //     }
    // }

    //% blockId=runMotor block="run Motor |%motor at speed %speed %direction"
    //% motor.fieldEditor="gridpicker" motor.fieldOptions.columns=1
    //% speed.min=0 speed.max=100
    //% direction.fieldEditor="gridpicker" direction.fieldOptions.columns=1
    export function runMotor(motor: Motors, speed: number, direction : Directions): void {
        initPins();
        switch( motor )
        {
            case Motors.LeftMotor:
                executeLeftMotor(speed,direction);
                break;
            case Motors.RightMotor:
                executeRightMotor(speed, direction);
                break;
            case Motors.BothMotor:
                executeLeftMotor(speed, direction);
                executeRightMotor(speed, direction);
                break;
        }
    }
    
    //% blockId=startAI block="In AI mode, Start car to run"
    export function startAI():void {
        // ST
        let cmd = "ST";
        initSerial();
        serial.writeString(cmd);        
        basic.pause(100);
    }

    //% blockId=stopCar block="Stop car"
    export function stopCar() : void {
        // SO
        let cmd = "SO";
        initSerial();
        serial.writeString(cmd);
        basic.pause(100);
    }

    //% weight=90
    //% blockId=switchMode block="Switch car mode to |%mode"
    //% mode.fieldEditor="gridpicker" mode.fieldOptions.columns=2
    export function switchMode(mode : CarMode): void {
        let cmd = "";
        let subCmd = "";
        initSerial();
        switch ( mode )
        {
            case CarMode.AIModel:
                cmd = "MA";
                pins.setPull(DigitalPin.P0, PinPullMode.PullUp)
                pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
                pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
                pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
                break;
            case CarMode.ManualModel:
                cmd = "MM";
                pins.setPull(DigitalPin.P0, PinPullMode.PullDown)
                pins.setPull(DigitalPin.P1, PinPullMode.PullDown)
                pins.setPull(DigitalPin.P14, PinPullMode.PullDown)
                pins.setPull(DigitalPin.P15, PinPullMode.PullDown)
                carRun(CarActions.GoStop);
                break;
        }

        if( cmd.length > 0 ){
            serial.writeString(cmd);
            basic.pause(100);
        }

        if( subCmd.length > 0 ) {
            serial.writeString(subCmd);
            basic.pause(100);
        }
    }

    //% weight=90
    //% blockId=carRun block="Run car|%action at full speed"
    //% action.fieldEditor="gridpicker" action.fieldOptions.columns=2
    export function carRun(action: CarActions): void {
        //let cmd = "";
        //initSerial();
        initPins();
        switch (action) {
            case CarActions.GoForward:
                //cmd = "Forward             ";
                executeLeftMotor(100, Directions.Positive);
                executeRightMotor(100, Directions.Positive);
                break;
            case CarActions.GoBack:
                //cmd = "Back                ";
                executeLeftMotor(100, Directions.Negative);
                executeRightMotor(100, Directions.Negative);
                break;
            case CarActions.GoLeft:
                //cmd = "Left                ";
                executeLeftMotor(0, Directions.Negative);
                executeRightMotor(100, Directions.Positive);
                break;
            case CarActions.GoRight:
                //cmd = "Right               ";
                executeLeftMotor(100, Directions.Positive);
                executeRightMotor(0, Directions.Negative);
                break;
            case CarActions.GoStop:
                //cmd = "Stop                ";
                executeLeftMotor(0, Directions.Positive);
                executeRightMotor(0, Directions.Negative);
                break;
        }
        // if (cmd.length > 0) {
        //     serial.writeString(cmd);
        //     basic.pause(50);
        // }
    }

    //% weight=90
    //% blockId=changeLaneColor block="Change lane color to |%color"
    //% color.fieldEditor="gridpicker" color.fieldOptions.columns=2
    export function changeLaneColor(color : LaneColorFilter): void{
            let cmd = "";
            initSerial();
            switch( color )
            {
                case 0:
                    cmd = "WH"; // white
                    break;
                case 1:
                    cmd = "OR"; // orange
                    break;
                case 2:
                    cmd = "BU"; // blue
                    break;
                case 3:
                    cmd = "BL"; // black
                    break;
            }

            if( cmd.length > 0 ) {
                serial.writeString(cmd);
                basic.pause(100);
            }
    }
} 
