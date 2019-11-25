//
// useTime hook
//
import { useEffect, useState } from 'react';
import { getTime } from './getTime';
import { DateTime } from 'luxon';

interface IUseTimeOptions {
    _getTime: () => DateTime
}
export const useTime = (
    refreshCycleMilliseconds: number = 100,
    // For testing purposes
    _getTime = getTime,
    _setInterval = setInterval,
    _clearInterval = clearInterval,
): DateTime => {
    // Returns the current time
    // and queues re-renders every `refreshCycle` milliseconds (default: 100ms)

    const [now, setNow] = useState(_getTime());

    useEffect(() => {
        // Regularly set time in state
        // (this will cause your component to re-render frequently)
        const intervalId = _setInterval(
            () => setNow(_getTime()),
            refreshCycleMilliseconds,
        );

        // Cleanup interval
        return () => _clearInterval(intervalId);

        // Specify dependencies for useEffect
    }, [
        refreshCycleMilliseconds,
        setNow,
        // Because of testing
        _setInterval, _clearInterval, _getTime
    ]);

    return now;
};
