import type {Access} from 'payload';
import type {FolderInterface} from 'types/payload-types';

/**
 * Example access control function for demonstration or testing purposes.
 * This access handler logs its arguments to the console and always returns `false`,
 * effectively denying access to any operation using this rule. It is typically used
 * during development to inspect the shape of access parameters or test fallback behaviors
 * when access is explicitly blocked.
 * The function accepts the full access context, including the request object and any
 * additional parameters such as user data or document metadata. However, it does not
 * perform any meaningful validation or logic.
 *
 * @param props      The access context properties, including the request object and any additional arguments.
 * @param props.req  The HTTP request object containing headers, user session, etc.
 * @param props.args Additional access context arguments such as data or document state.
 * @returns Always returns `false`, meaning access is denied.
 *
 * @example
 * ```ts
 * const canAccess = exampleAccess({ req, data: { name: 'Test' } }); // false
 * ```
 */
export const exampleAccess: Access<FolderInterface> = ({req, ...args}) => {
    console.log('noSystemFolders', args);

    return false;
};