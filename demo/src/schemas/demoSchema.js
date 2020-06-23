import { createOrderedMap } from "@ui-schema/ui-schema";

const demoSchema = columns => createOrderedMap({
    type: 'object',
    properties: {
        Select: {
            type: 'string',
            widget: 'Select',
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
            default: 'notice'
        },
    }
});

export { demoSchema }
