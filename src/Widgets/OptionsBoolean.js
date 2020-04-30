import React from "react";
import { Switch } from "@blueprintjs/core";
import { TransTitle, updateValue } from "@ui-schema/ui-schema";

const BoolRenderer = ({ ownKey, value, onChange, schema, storeKeys, showValidity, valid, required }) => {
    const currentVal = !!value;

    return (
        <Switch
            checked={currentVal}
            onChange={() => onChange(updateValue(storeKeys, !currentVal))}
            label={<><TransTitle schema={schema} storeKeys={storeKeys} ownKey={ownKey} />{required ? ' *' : ''}</>}
        />
    );
};

export { BoolRenderer };
