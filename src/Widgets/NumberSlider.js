import React from "react";
import { FormGroup, Slider, RangeSlider } from "@blueprintjs/core";
import { unstable_trace as trace } from "scheduler/tracing";
import { TransTitle, extractValue, memo, updateValue } from "@ui-schema/ui-schema";
import { List } from "immutable";

const BaseSlider = ({
    schema,
    storeKeys,
    onChange,
    value
}) => {

    let min = 0;
    let max = 100;
    let defaultVal = min;
    let multipleOf = undefined;
    let minItems = undefined;
    //let maxItems = undefined;
    let isArray = false
    if (schema.get('type') === 'array') {
        isArray = true
        if (schema.getIn(['items', 'type']) !== 'number') {
            return null
        }

        min = typeof schema.getIn(['items', 'minimum']) === 'number' ? schema.getIn(['items', 'minimum']) :
            typeof schema.getIn(['items', 'exclusiveMinimum']) === 'number' ? schema.getIn(['items', 'exclusiveMinimum']) + 1 : min;
        max = typeof schema.getIn(['items', 'maximum']) === 'number' ? schema.getIn(['items', 'maximum']) :
            typeof schema.getIn(['items', 'exclusiveMaximum']) === 'number' ? schema.getIn(['items', 'exclusiveMaximum']) - 1 : max;
        multipleOf = schema.getIn(['items', 'multipleOf']);

        minItems = schema.get('minItems');
        //maxItems = schema.get('maxItems');
        if (minItems < 2 || !minItems) {
            minItems = 2;
        }
        defaultVal = new Array(minItems).fill(null).map(() => min);
        if (schema.getIn(['view', 'track']) === 'inverted') {
            defaultVal[defaultVal.length - 1] = max;
        }
    } else {
        min = typeof schema.get('minimum') === 'number' ? schema.get('minimum') :
            typeof schema.get('exclusiveMinimum') === 'number' ? schema.get('exclusiveMinimum') + 1 : min;
        max = typeof schema.get('maximum') === 'number' ? schema.get('maximum') :
            typeof schema.get('exclusiveMaximum') === 'number' ? schema.get('exclusiveMaximum') - 1 : max;
        multipleOf = schema.get('multipleOf');
        defaultVal = min;
    }

    const Component = schema.get('type') === 'array' ? RangeSlider : Slider;
    const readOnly = schema.get('readOnly') === true

    return (
        <Component
            value={(isArray ?
                value && value.size ? value.toJS() : defaultVal :
                typeof value === 'number' ? value : defaultVal)}
            min={min}
            max={max}
            stepSize={multipleOf}
            labelStepSize={multipleOf}
            onChange={(value) => trace("numberslider onchange", performance.now(), () => {
                if (isArray) {
                    onChange(updateValue(storeKeys, List(value)));
                } else {
                    if (isNaN(value * 1)) {
                        console.error('Invalid Type: input not a number in:', value);
                        return;
                    }
                    onChange(updateValue(storeKeys, value * 1));
                }
            })}
            disabled={readOnly}
        />
    );
};

const SliderMulti = extractValue(memo(BaseSlider));

const NumberSlider = (props) => {
    const Component = props.schema.get('type') === 'array' ? SliderMulti : BaseSlider;
    return (
        <FormGroup label={<TransTitle schema={props.schema} storeKeys={props.storeKeys} ownKey={props.ownKey} />}>
            <Component {...props} />
        </FormGroup>
    );
};

export { NumberSlider }
