import { useCallback, useState } from 'react';

export const useBool = (defaultValue) => {
    const [value, setValue] = useState(defaultValue);

    const onToggle = useCallback(() => {
        setValue((v) => !v);
    }, []);

    const setFalse = useCallback(() => {
        setValue(false);
    }, []);

    const setTrue = useCallback(() => {
        setValue(false);
    }, []);

    return {
        value,
        onToggle,
        setFalse,
        setTrue,
    };
};
