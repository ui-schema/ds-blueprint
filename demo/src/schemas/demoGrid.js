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
        TextField_readOnly: {
            type: 'string',
            readOnly: true,
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
        Object: {
            type: 'object',
            title: 'Inner-Object',
            properties: {
                TextField: {
                    type: 'string',
                    view: {
                        sizeXs: columns,
                    }
                }
            }
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
                1,
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
        },
        NumberSlider_Array_Readonly: {
            type: 'array',
            readOnly: true,
            widget: 'NumberSlider',
            default: [2, 6],
            items:
            {
                type: 'number',
                minimum: 1,
                maximum: 10,
                multipleOf: 1
            },
            view: {
                sizeXs: columns,
            }
        },
        date: {
            type: 'string',
            format: 'date',
            widget: 'Date',
            date: {
                format: 'yy-MM-DD',
                variant: 'inline',
                clearable: true,
            },
            view: {
                sizeXs: 4
            }
        },
        Time: {
            type: 'string',
            format: 'time',
            widget: 'Time',
            date: {
                variant: 'static',
                formatData: 'HH:mm',
                openTo: 'year',
                keyboard: false,
                autoOk: true,
                minDate: '10:20',
                maxDate: '20:20',
            },
            view: {
                sizeXs: 4
            }
        },
        DateTime: {
            type: 'string',
            format: 'date+time',
            widget: 'DateTime',
            date: {
                variant: 'static',
                formatData: 'yyyy-MM-dd HH',
                views: ['year', 'month', 'date', 'hours'],
                openTo: 'year',
                keyboard: false,
                autoOk: true,
                minDate: '2018',
                maxDate: '2023',
            },
            view: {
                sizeXs: 4
            }
        },
    }
});

export { schemaGrid }
