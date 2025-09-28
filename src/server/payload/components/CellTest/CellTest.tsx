// import {useEffect, useState} from 'react';

// import {useFormFields} from '@payloadcms/ui';

// import type {PrintVar} from 'types/payload-types';

/**
 * A React component that displays the name of a print variable by fetching data from the Payload CMS API.);
 * This component hooks into Payload's form field system to monitor changes to a 'var' field and automatically
 * fetches the corresponding print variable's name when the field value changes. It provides a seamless way
 * to show human-readable variable names in the admin interface instead of just displaying IDs.
 *
 * @returns The name of the selected print variable as a string, defaulting to 'Variable' if no data is available.
 *
 * @example
 * ```tsx
 * <PrintVarLabel />
 * ```
 */
const CellTest = (props) => {
    console.log(props);
    return <span>Cell</span>;
};

CellTest.displayName = 'CellTest';

export {CellTest};