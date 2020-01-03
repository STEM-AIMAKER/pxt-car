
//% weight=10 color=#1E90FF icon="\uf136" block="Stem AI Car"
namespace aicar {
    let serialInited = 0;

    export enum CarActions {
        //% blockId="go forward" block="forward"
        GoForward = 0,
        //% blockId="go back" block="back"
        GoBack = 1,
        //% blockId="go left" block="left"
        GoLeft = 2,
        //% blockId="go right" block="right"
        GoRight = 3,
        //% blockId="stop car" block="stop"
        GoStop = 4
    }

    export enum CarMode {
        //% blockId="manual mode" block="manual"
        ManualModel=0,
        //% blockId="ai mode" block="ai"
        AIModel=1
    }

    export enum LaneColorFilter{
        //% blockId="white" block="white"
        White=0,
        //% blockId="orange" block="orange"
        Orange=1,
        //% blockId="blue" block="blue"
        Blue=2,
        //% blockId="black" block="black"
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
    //% blockId=car_switchMode block="switch car mode to |%mode"
    //% mode.fieldEditor="gridpicker" mode.fieldOptions.columns=2
    export function switchMode(mode : CarMode): void {
        let cmd = "";
        let subCmd = "";
        initSerial();
        switch ( mode )
        {
            case 0:
                cmd = "ModeAI              ";
                subCmd = "Start               ";
                break;
            case 1:
                cmd = "ModeManual          ";
                subCmd = "Stop                ";
                break;
        }

        if( cmd.length > 0 )
            serial.writeString(cmd);

        if( subCmd.length > 0 ) {
            basic.pause(300);
            serial.writeString(subCmd);
        }

    }

    //% weight=90
    //% blockId=car_Run block="run car|%action"
    //% action.fieldEditor="gridpicker" action.fieldOptions.columns=5
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

        if (cmd.length > 0)
            serial.writeString(cmd);
    }

    //% weight=90
    //% blockId=car_changeLaneColor block="change lane color to |%color"
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

            if( cmd.length > 0 )
                serial.writeString(cmd);
    }
} 