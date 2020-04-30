import React from "react";
import { Map, List } from "immutable";
import { RadioGroup, Radio } from "@blueprintjs/core";
import { TransTitle, Trans, beautifyKey, updateValue, } from "@ui-schema/ui-schema";
import { ValidityHelperText } from "../Component/LocaleHelperText";
import { useUID } from "react-uid";
//import '@blueprintjs/core/lib/css/blueprint.css';

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
    console.log('render')

    const enumVal = schema.get('enum');
    if (!enumVal) return null;

    const selectedValue = typeof value !== 'undefined' ? value : (schema.get('default') || '');

    return (
        <RadioGroup
            label={<TransTitle schema={schema} storeKeys={storeKeys} ownKey={ownKey} />}
            selectedValue={selectedValue}
            onChange={(e) => { console.log(e.currentTarget.value); updateValue(storeKeys, e.currentTarget.value); } }
            inline={true}
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
