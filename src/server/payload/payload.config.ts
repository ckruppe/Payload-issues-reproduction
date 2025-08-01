import path, {resolve} from 'path';
import {fileURLToPath} from 'url';

import {mongooseAdapter} from '@payloadcms/db-mongodb';
import {seoPlugin} from '@payloadcms/plugin-seo';
import {BoldFeature, ItalicFeature, lexicalEditor, UnderlineFeature} from '@payloadcms/richtext-lexical';
import {buildConfig} from 'payload';
import {de} from 'payload/i18n/de';
import sharp from 'sharp';

import {authenticated} from 'Payload/access/authenticated';
import {exampleAccess} from 'Payload/access/exampleAccess';
import {AdminUsers, Stores} from 'Payload/collections';
import {generateSeoTitle} from 'Payload/hooks/generateSeoTitle';
import {generateSeoUrl} from 'Payload/hooks/generateSeoUrl';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
        importMap: {baseDir: resolve(dirname, '../../client/ui/components/admin')},
        livePreview: {
            breakpoints: [
                {
                    height: 667,
                    label: 'Mobile',
                    name: 'mobile',
                    width: 375
                },
                {
                    height: 1024,
                    label: 'Tablet',
                    name: 'tablet',
                    width: 768
                },
                {
                    height: 900,
                    label: 'Desktop',
                    name: 'desktop',
                    width: 1440
                }
            ]
        },
        meta: {
            icons: [{url: '/favicon.ico'}],
            titleSuffix: '- Payload template'
        },
        user: AdminUsers.slug
    },
    collections: [AdminUsers, Stores],
    cors: [process.env.NEXT_PUBLIC_BASE_URL],
    csrf: [process.env.NEXT_PUBLIC_BASE_URL],
    db: mongooseAdapter({url: process.env.MONGODB_URI}),
    editor: lexicalEditor({
        /**
         * The `features` method returns an array of editor features that define the available text formatting options.
         * In this case, it includes the underline, bold, and italic features.
         * These features extend the editor's capabilities, allowing users to apply basic formatting to their text.
         *
         * @returns An array of features, such as underline, bold, and italic, which enable text formatting options in the editor.
         *
         * @example
         * ```tsx
         * const editorFeatures = lexicalEditor.features();
         * ```
         */
        features() {
            return [
                UnderlineFeature(),
                BoldFeature(),
                ItalicFeature()
            ];
        }
    }),
    folders: {
        browseByFolder: false,
        collectionOverrides: [({collection}) => ({
            ...collection,
            access: {
                ...collection.access,
                create: authenticated,
                delete: exampleAccess,
                read: authenticated,
                update: authenticated
            }
        })],
        collectionSpecific: true,
        debug: false,
        fieldName: 'folder',
        slug: 'folders'
    },
    i18n: {supportedLanguages: {de}},
    plugins: [
        seoPlugin({
            generateTitle: generateSeoTitle(),
            generateURL: generateSeoUrl()
        })
    ],
    secret: process.env.PAYLOAD_SECRET,
    sharp,
    typescript: {outputFile: resolve(dirname, '../../../types/payload-types.ts')}
});