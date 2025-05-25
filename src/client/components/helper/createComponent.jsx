import React from 'react';
import { handleError } from './handleError';

/**
 * Create a React component from a function, like the Component constructor, but with error handling.
 * 
 * @param {function} code - The function that returns the component.
 * @returns {React.Component} The component object created
 */
const createComponent = (code) => {
    const filename = new Error().stack.split('\n')[2].trim().split(' ').pop().split('/').pop();

    const Component = (variables) => {
        return handleError(filename, variables, () => {
            return code(variables);
        })
    }
    return Component;
}

export default createComponent