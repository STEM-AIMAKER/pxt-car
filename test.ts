// tests go here; this will not be compiled when this package is used as a library
aicar.switchMode(aicar.CarMode.ManualModel);
aicar.carRun(aicar.CarActions.GoForward);
basic.pause(1000);
aicar.carRun(aicar.CarActions.GoLeft);
basic.pause(1000);
aicar.carRun(aicar.CarActions.GoRight);
basic.pause(1000);
aicar.carRun(aicar.CarActions.GoBack);
basic.pause(1000);
aicar.carRun(aicar.CarActions.GoStop);
aicar.changeLaneColor(aicar.LaneColorFilter.White);
aicar.switchMode(aicar.CarMode.AIModel)
basic.pause(5000);
aicar.switchMode(aicar.CarMode.ManualModel);
