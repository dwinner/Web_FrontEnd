// Проверка, реализует ли объект методы с переданными аргументами

function quacks(o) {
    for (var i = 1; i < arguments.length; i++) {
        var currentArg = arguments[i];

        switch (typeof currentArg) {
            case "string":
                if (typeof o[currentArg] !== "function") {
                    return false;
                }
                continue;
            case "function":
                currentArg = currentArg.prototype;
            case "object":
                for (var m in currentArg) {
                    if (currentArg && currentArg.hasOwnProperty(m)) {
                        if (typeof currentArg[m] !== "function") {
                            continue;
                        }
                        if (typeof o[m] !== "function") {
                            return false;
                        }
                    }
                }

        }
    }

    return true;
}