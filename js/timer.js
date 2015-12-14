var TimeCounter = new (function () {

    var incrementTime = 500;
    var currentTime = 0;

    $(function () {
        TimeCounter.Timer = $.timer(updateTimer, incrementTime, true);
    });

    function updateTimer() {
        currentTime += incrementTime;
    }

    this.resetStopwatch = function () {
        currentTime = 0;
    };

    this.getCurrentTimeInSeconds = function () {
        return currentTime / 1000;
    };
});
uuid = guid(); 