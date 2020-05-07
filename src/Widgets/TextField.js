import React from "react";
import { FormGroup, InputGroup, NumericInput, TextArea } from "@blueprintjs/core";
import { useUID } from "react-uid";
import { unstable_trace as trace } from "scheduler/tracing";
import { TransTitle, updateValue, updateValidity, mapSchema, checkNativeValidity, getDisplayName } from "@ui-schema/ui-schema";

const withBaseRenderer = RendererComponent => {
    const WithBaseRenderer = ({
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
        const readOnly = schema.get('readOnly') === true

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
                        onChange(updateValue(storeKeys, value));
                    })}
                    disabled={readOnly}
                />
            </FormGroup>
        );
    }
    WithBaseRenderer.displayName = `WithBaseRenderer(${getDisplayName(RendererComponent)})`;

    return WithBaseRenderer
};

const StringRenderer = withBaseRenderer(({ schema, ...props }) => {
    const { onChange } = props
    return (
        <InputGroup
            {...props}
            onChange={(e) => onChange(e.target.value)}
        />
    )
})

const TextRenderer = withBaseRenderer(({ schema, ...props }) => {
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

const NumberRenderer = withBaseRenderer(({ schema, ...props }) => {
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
