import { createContext} from 'react';

// Define the type for the context value
interface GlobalContextValue {
    requestConfig: {
        url: string;
    };
}

// Create a context
export const GlobalContext = createContext<GlobalContextValue>({requestConfig:{url: ""} });

