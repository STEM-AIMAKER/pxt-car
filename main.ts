
//% weight=10 color=#1E90FF icon="\uf136" block="HANSHIN STEM AI Car"
namespace aicar {
    let serialInited = 0;

    export enum CarActions {
        //% blockId="go forward" block="Forward"
        GoForward = 0,
        //% blockId="go back" block="Back"
        GoBack = 1,
        //% blockId="go left" block="Left"
        GoLeft = 2,
        //% blockId="go right" block="Right"
        GoRight = 3,
        //% blockId="stop car" block="Stop"
        GoStop = 4
    }

    export enum CarMode {
        //% blockId="manual mode" block="Manual"
        ManualModel=0,
        //% blockId="ai mode" block="AI"
        AIModel=1
    }

    export enum LaneColorFilter{
        //% blockId="white" block="White"
        White=0,
        //% blockId="orange" block="Orange"
        Orange=1,
        //% blockId="blue" block="Blue"
        Blue=2,
        //% blockId="black" block="Black"
        Black=3
    }

    function initSerial(): void {
        if( 0 == serialInited ) {
            serial.redirect(
                SerialPin.P12,
                SerialPin.P14,
                BaudRate.BaudRate9600
            );
            serialInited = 1;
        }
    }
    //% weight=90
    //% blockId=car_switchMode block="Switch car mode to |%mode"
    //% mode.fieldEditor="gridpicker" mode.fieldOptions.columns=2
    export function switchMode(mode : CarMode): void {
        let cmd = "";
        let subCmd = "";
        initSerial();
        switch ( mode )
        {
            case 1:
                cmd = "ModeAI              ";
                subCmd = "Start               ";
                break;
            case 0:
                cmd = "ModeManual          ";
                subCmd = "Stop                ";
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
    //% blockId=car_Run block="Run car|%action"
    //% action.fieldEditor="gridpicker" action.fieldOptions.columns=2
    export function carRun(action: CarActions): void {
        let cmd = "";
        initSerial();
        switch (action) {
            case 0:
                cmd = "Forward             ";
                break;
            case 1:
                cmd = "Back                ";
                break;
            case 2:
                cmd = "Left                ";
                break;
            case 3:
                cmd = "Right               ";
                break;
            case 4:
                cmd = "Stop                ";
                break;
        }

        if (cmd.length > 0) {
            serial.writeString(cmd);
            basic.pause(50);
        }
    }

    //% weight=90
    //% blockId=car_changeLaneColor block="Change lane color to |%color"
    //% color.fieldEditor="gridpicker" color.fieldOptions.columns=2
    export function changeLaneColor(color : LaneColorFilter): void{
            let cmd = "";
            initSerial();
            switch( color )
            {
                case 0:
                    cmd = "White               ";
                    break;
                case 1:
                    cmd = "Orange              ";
                    break;
                case 2:
                    cmd = "Blue                ";
                    break;
                case 3:
                    cmd = "Black               ";
                    break;
            }

            if( cmd.length > 0 ) {
                serial.writeString(cmd);
                basic.pause(100);
            }
    }
} 