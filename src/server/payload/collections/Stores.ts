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
            tabs: [
                {
                    fields: [
                        {
                            label: 'Store Name',
                            name: 'name',
                            required: true,
                            type: 'text'
                        },
                        {
                            label: 'Store Partner',
                            name: 'storeType',
                            required: true,
                            type: 'text'
                        },
                        {
                            fields: [
                                {
                                    fields: [
                                        {
                                            label: 'Straße',
                                            name: 'street',
                                            required: true,
                                            type: 'text'
                                        },
                                        {
                                            label: 'Hausnummer',
                                            name: 'streetNumber',
                                            type: 'text'
                                        }
                                    ],
                                    type: 'row'
                                },
                                {
                                    fields: [
                                        {
                                            label: 'Stadt',
                                            name: 'city',
                                            required: true,
                                            type: 'text'
                                        },
                                        {
                                            label: 'Postleihzahl',
                                            name: 'zip',
                                            required: true,
                                            type: 'text'
                                        }
                                    ],
                                    type: 'row'
                                },
                                {
                                    label: 'Koordinaten',
                                    name: 'coordinates',
                                    required: true,
                                    type: 'point'
                                }
                            ],
                            interfaceName: 'StoreAddress',
                            label: 'Store Adresse',
                            name: 'address',
                            type: 'group'
                        }
                    ],
                    label: 'General'
                },
                {
                    fields: [
                        {
                            label: 'Funnel',
                            name: 'funnel',
                            options: [
                                {
                                    label: 'Awareness',
                                    value: 'Awareness'
                                },
                                {
                                    label: 'NoiseCancelling',
                                    value: 'NoiseCancelling'
                                },
                                {
                                    label: 'AwareMode',
                                    value: 'AwareMode'
                                },
                                {
                                    label: 'SoundQuality',
                                    value: 'SoundQuality'
                                },
                                {
                                    label: 'Sale',
                                    value: 'Sale'
                                }
                            ],
                            type: 'select'
                        },
                        {
                            label: 'Motive',
                            name: 'motive',
                            options: [
                                {
                                    label: 'Berlin',
                                    value: 'Berlin'
                                },
                                {
                                    label: 'München',
                                    value: 'Muenchen'
                                },
                                {
                                    label: 'Stuttgart',
                                    value: 'Stuttgart'
                                },
                                {
                                    label: 'Dortmund',
                                    value: 'Dortmund'
                                },
                                {
                                    label: 'Dortmund',
                                    value: 'Dortmund'
                                },
                                {
                                    label: 'Duesseldorf',
                                    value: 'Duesseldorf'
                                },
                                {
                                    label: 'Koeln',
                                    value: 'Koeln'
                                },
                                {
                                    label: 'Hamburg',
                                    value: 'Hamburg'
                                },
                                {
                                    label: 'Frankfurt',
                                    value: 'Frankfurt'
                                },
                                {
                                    label: 'Generisch',
                                    value: 'Generisch'
                                }
                            ],
                            type: 'select'
                        },
                        {
                            label: 'Format',
                            name: 'format',
                            options: [
                                {
                                    label: 'fireplace',
                                    value: 'fireplace'
                                },
                                {
                                    label: 'sitebar',
                                    value: 'sitebar'
                                },
                                {
                                    label: 'contentad',
                                    value: 'contentad'
                                },
                                {
                                    label: 'interstitial',
                                    value: 'interstitial'
                                }
                            ],
                            type: 'select'
                        },
                        {
                            label: 'Page',
                            name: 'page',
                            type: 'text'
                        }
                    ],
                    interfaceName: 'ReferringMedia',
                    label: 'Referral Details',
                    name: 'referringMedia'
                }
            ],
            type: 'tabs'
        }
    ],
    slug: 'stores'
};