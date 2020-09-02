import React, { createContext, useMemo, useState } from 'react';
import { AppTheme } from './theme';

export type State = {
    readonly theme: string;
    readonly changeTheme: (newTheme: string) => void;
};

export type State2 = {
    readonly count: number;
    readonly increase: () => void;
};

/* First we will make a new context */
export const Context = createContext<State>(null);
export const Context2 = createContext<State2>(null);

/* Then create a provider Component */
export const ContextProvider = (props) => {
    const [theme, setTheme] = useState<string>(AppTheme.LIGHT);

    const context = useMemo(
        () => ({
            theme: theme,
            changeTheme: (newTheme: any) => setTheme(newTheme),
        }),
        [theme],
    );

    return <Context.Provider value={context} {...props} />;
};

export const CountProvider = (props) => {
    const [count, setCount] = useState<number>(0);
    console.log('context props', props);
    const context = useMemo(
        () => ({
            count: count,
            increase: () => setCount((prevState) => prevState + 1),
        }),
        [count],
    );

    return <Context2.Provider value={context} {...props} />;
};

/* then make a consumer which will surface it */
export const ContextConsumer = Context.Consumer;
export const CountConsumer = Context2.Consumer;

export const store = [ContextProvider, CountProvider];

export const Compose = ({ providers = [], children, props }) => {
    if (providers.length === 0) {
        return children;
    }
    return providers.reduce((acc, cur) => React.createElement(cur, props, acc), children);
};
