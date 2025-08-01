import {anyone} from 'Payload/access/anyone';
import {authenticated} from 'Payload/access/authenticated';

import type {CollectionConfig} from 'payload';

export const Stores: CollectionConfig = {
    access: {
        create: authenticated,
        delete: authenticated,
        read: anyone,
        update: authenticated
    },
    admin: {
        defaultColumns: ['name', 'storeType', 'createdAt', 'updatedAt'],
        description: 'Eine Liste aller Stores für den Storefinder.',
        group: 'Storefinder Konfiguration',
        pagination: {
            defaultLimit: 100,
            limits: [100, 200, 300, 400, 500]
        },
        useAsTitle: 'name'
    },
    fields: [
        {
            label: 'Name',
            name: 'name',
            type: 'text'
        }
    ],
    folders: true,
    slug: 'stores'
};