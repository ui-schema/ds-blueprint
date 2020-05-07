import React from "react";
import { FormGroup, Checkbox } from "@blueprintjs/core";
import { Map, List } from "immutable";
import { TransTitle, Trans, beautifyKey, extractValue, memo, updateValue, } from "@ui-schema/ui-schema";
import { useUID } from "react-uid";

const OptionCheck = ({ currentValue, label, onChange, readOnly }) => {
    const uid = useUID();

    return (
        <Checkbox
            id={'uis-' + uid}
            label={label}
            checked={currentValue}
            onChange={onChange}
            inline={true}
            disabled={readOnly} />
    );
};

const OptionsCheckValue = extractValue(memo(({ enumVal, storeKeys, value, onChange, trans, readOnly }) => enumVal ?
    enumVal.map((enum_name) => {
        const isActive = value && value.contains && typeof value.contains(enum_name) !== 'undefined' ? value.contains(enum_name) : false;
        const relativeT = List(['enum', enum_name]);

        return <OptionCheck
            readOnly={readOnly}
            key={enum_name}
            currentValue={isActive}
            onChange={() => {
                if (isActive) {
                    onChange(updateValue(storeKeys, value.delete(value.indexOf(enum_name))));
                } else {
                    onChange(updateValue(
                        storeKeys,
                        value ? value.push(enum_name) : List([]).push(enum_name))
                    );
                }
            }}
            label={<Trans
                schema={trans}
                text={storeKeys.insert(0, 'widget').concat(relativeT).join('.')}
                context={Map({ 'relative': relativeT })}
                fallback={beautifyKey(enum_name)}
            />}
        />
    }).valueSeq()
    : null
));

const OptionsCheck = ({
    ownKey,
    schema,
    storeKeys,
    showValidity,
    valid,
    required,
    errors,
    row
}) => {
    const enumVal = schema.get('enum');
    if (!enumVal) return null;
    const readOnly = schema.get('readOnly') === true

    return (
        <FormGroup
            label={<TransTitle schema={schema} storeKeys={storeKeys} ownKey={ownKey} />}
        >
            <OptionsCheckValue enumVal={enumVal} storeKeys={storeKeys} trans={schema.get('t')} readOnly={readOnly} />
        </FormGroup>
    );
};

export { OptionsCheck };
