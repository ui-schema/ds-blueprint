import React from "react";
import { FormGroup, InputGroup, NumericInput, TextArea } from "@blueprintjs/core";
import { useUID } from "react-uid";
import { unstable_trace as trace } from "scheduler/tracing";
import { TransTitle, updateValue, updateValidity, mapSchema, checkNativeValidity } from "@ui-schema/ui-schema";

const BaseRenderer = RendererComponent => ({
    type,
    multiline,
    rows,
    rowsMax,
    storeKeys,
    ownKey,
    schema,
    value,
    onChange,
    showValidity,
    valid,
    errors,
    required,
    style,
    onClick,
    onFocus,
    onBlur,
    onKeyUp,
    onKeyDown,
    inputProps = {},
    InputProps = {},
    inputRef: customInputRef
}) => {
    const uid = useUID();
    // todo: this could break law-of-hooks
    const inputRef = customInputRef || React.useRef();

    const format = schema.get('format');
    const currentRef = inputRef.current;

    inputProps = mapSchema(inputProps, schema);
    valid = checkNativeValidity(currentRef, valid);

    React.useEffect(() => {
        if (currentRef) {
            onChange(updateValidity(storeKeys, valid));
        }
    }, [valid]);

    return (
        <FormGroup label={<TransTitle schema={schema} storeKeys={storeKeys} ownKey={ownKey} />}>
            <RendererComponent
                id={uid}
                value={typeof value !== 'undefined' ? value : ''}
                fill={true}
                inputRef={inputRef}
                onChange={(value) => trace("textfield onchange", performance.now(), () => {
                    console.log(value)
                    onChange(updateValue(storeKeys, value));
                })}
            />
        </FormGroup>
    );
};

const StringRenderer = BaseRenderer(({ schema, ...props }) => {
    const { onChange } = props
    return (
        <InputGroup
            {...props}
            onChange={(e) => onChange(e.target.value)}
        />
    )
})

const TextRenderer = BaseRenderer(({ schema, ...props }) => {
    const { onChange } = props
    return (
        <TextArea
            {...props}
            /* https://github.com/palantir/blueprint/issues/4072 */
            inputRef={null}
            onChange={(e) => onChange(e.target.value)}
        />
    )
})

const NumberRenderer = BaseRenderer(({ schema, ...props }) => {
    const { onChange } = props
    return (
        <NumericInput
            {...props}
            allowNumericCharactersOnly={true}
            onValueChange={(value) => onChange(value)}
        />
    )
})

export { StringRenderer, NumberRenderer, TextRenderer };
