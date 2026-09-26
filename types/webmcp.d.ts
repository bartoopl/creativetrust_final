// WebMCP declarative API attributes (https://github.com/webmachinelearning/webmcp/blob/main/declarative-api-explainer.md).
// React passes unknown lowercase attributes through to the DOM; these declarations only teach TypeScript about them.
import 'react';

// The type parameter must match React's declarations for interface merging, even though it is unused here.
/* eslint-disable @typescript-eslint/no-unused-vars */

declare module 'react' {
    interface FormHTMLAttributes<T> {
        toolname?: string;
        tooldescription?: string;
        /** Lets the agent submit without the user reviewing the form. Not used on this site. */
        toolautosubmit?: boolean;
    }
    interface InputHTMLAttributes<T> {
        toolparamdescription?: string;
    }
    interface TextareaHTMLAttributes<T> {
        toolparamdescription?: string;
    }
    interface SelectHTMLAttributes<T> {
        toolparamdescription?: string;
    }
}
