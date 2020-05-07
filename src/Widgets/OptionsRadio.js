import React from "react";
import { Map, List } from "immutable";
import { RadioGroup, Radio } from "@blueprintjs/core";
import { TransTitle, Trans, beautifyKey, updateValue, } from "@ui-schema/ui-schema";
import { useUID } from "react-uid";

const OptionsRadio = ({
    ownKey,
    schema,
    value,
    onChange,
    storeKeys,
    showValidity,
    valid,
    required,
    errors,
    row
}) => {
    const enumVal = schema.get('enum');
    if (!enumVal) return null;

    const selectedValue = typeof value !== 'undefined' ? value : (schema.get('default') || '');
    const readOnly = schema.get('readOnly') === true

    return (
        <RadioGroup
            label={<TransTitle schema={schema} storeKeys={storeKeys} ownKey={ownKey} />}
            selectedValue={selectedValue}
            onChange={(e) => onChange(updateValue(storeKeys, e.currentTarget.value))}
            inline={true}
            disabled={readOnly}
        >
            {enumVal ? enumVal.map((enum_name) => {
                const uid = useUID();
                return (<Radio
                    key={uid}
                    value={enum_name}
                    label={<Trans
                        schema={schema.get('t')}
                        text={storeKeys.insert(0, 'widget').concat(List(['enum', enum_name])).join('.')}
                        context={Map({ 'relative': List(['enum', enum_name]) })}
                        fallback={beautifyKey(enum_name)}
                    />}
                />)
            }).valueSeq() : null}
        </RadioGroup>
    );
};

export { OptionsRadio };
