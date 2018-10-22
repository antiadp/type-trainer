module.exports = {

    DEM : (CPM, allErrors, ACC) => {
        var dem = (CPM - allErrors) * ACC
        return Math.round(dem)
    },
    ACC : (length, endErrors,) => {
        var acc;
            acc = (length - endErrors) / length
        
        if (acc.isNaN || acc === Infinity || acc === -Infinity || acc <= 0) {
            acc = 0
        }
        return Math.round(acc*100)

    },
    CPM : (timeElapsed, length) => {
        var cpm;
        if (timeElapsed === 0) {
            cpm = (length / (1))
        } else {
            cpm = (length / ((timeElapsed) / 60))
        }

        return Math.round(cpm)
    },
    WPM : (timeElapsed, length, allErrors) => {
        var wpm;
        var minutesElapsed = timeElapsed / 60
        if (timeElapsed === 0) {
            wpm = ((length / 5) - allErrors) / 1
        } else {
            wpm = (((length - allErrors) / 5) / ((minutesElapsed)))
        }
        if (wpm.isNaN || wpm === Infinity || wpm === -Infinity || wpm <= 0) {
            wpm = 0
        }
        return Math.round(wpm)

    }
}