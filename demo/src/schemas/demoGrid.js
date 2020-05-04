import { createOrderedMap } from "@ui-schema/ui-schema";

const schemaGrid = columns => createOrderedMap({
    type: 'object',
    properties: {
        TextField: {
            type: 'string',
            view: {
                sizeXs: columns,
            }
        },
        Text: {
            type: 'string',
            widget: 'Text',
            view: {
                rows: 1,
                rowsMax: 5,
                sizeXs: columns
            }
        },
        Number: {
            type: 'number',
            view: {
                sizeXs: columns,
            }
        },
        OptionsBoolean: {
            type: 'boolean',
            view: {
                sizeXs: columns,
            }
        },
        OptionsRadio: {
            type: 'string',
            widget: 'OptionsRadio',
            view: {
                sizeXs: columns / 3,
            },
            enum: ['left', 'center', 'right'],
            default: 'center'
        },
        OptionsCheck: {
            type: 'string',
            widget: 'OptionsCheck',
            view: {
                sizeXs: columns / 3,
            },
            enum: ['check1', 'check2', 'check3'],
        },
        Select: {
            type: 'string',
            widget: 'Select',
            view: {
                sizeXs: columns / 2,
            },
            enum: [
                "sidebar_left",
                "sidebar_right",
                "notice",
                "content",
                "footer"
            ],
            default: 'notice'
        },
        SelectMulti: {
            type: 'string',
            widget: 'SelectMulti',
            view: {
                sizeXs: columns / 2,
            },
            enum: [
                "sidebar_left",
                "sidebar_right",
                "notice",
                "content",
                "footer"
            ],
            default: [
                'notice'
            ]
        },
        NumberSlider: {
            type: 'number',
            widget: 'NumberSlider',
            minimum: 0,
            maximum: 5,
            multipleOf: 2,
            default: 2,
            view: {
                sizeXs: columns / 2
            }
        },
        NumberSlider_Array: {
            type: 'array',
            widget: 'NumberSlider',
            default: [2, 4],
            items:
            {
                type: 'number',
                minimum: 1,
                maximum: 5,
                multipleOf: 1
            },
            view: {
                sizeXs: columns / 2,
            }
        }
    }
});

export { schemaGrid }
