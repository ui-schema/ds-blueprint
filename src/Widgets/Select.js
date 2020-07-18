import React from "react";
import { Map, List } from "immutable";
import { FormGroup, MenuItem, Button } from "@blueprintjs/core";
import { Select, MultiSelect } from "@blueprintjs/select";
import { TransTitle, Trans, beautifyKey, updateValue, extractValue, memo } from "@ui-schema/ui-schema";

const itemRenderer = (
    multiple,
    item,
    translateItemName,
    currentValue,
    { handleClick, modifiers }
) => {
    var selected
    if (multiple) {
        selected = currentValue.includes(item)
    } else {
        selected = currentValue === item
    }

    return (
        <MenuItem
            key={item}
            active={modifiers.active}
            disabled={modifiers.disabled}
            text={translateItemName(item)}
            onClick={handleClick}
            shouldDismissPopover={false}
            icon={selected ? "tick" : "blank"}
        />
    );
}

const itemPredicate = (
    query,
    item,
    translateItemNameRaw
) => {
    var trans = translateItemNameRaw(item)
    var value

    trans? value = trans: value = item

    return String(value).toLowerCase().indexOf(query.toLowerCase()) >= 0;
}

const addValuesMultiple = (
    value,
    currentValue,
    storeKeys
) => {
    var targetValues = []
    if (currentValue) {
        targetValues = currentValue.toArray()
    }

    if (targetValues.includes(value)) {
        targetValues = targetValues.filter((item) => item !== value)
    } else {
        targetValues.push(value)
    }

    return updateValue(storeKeys, List(targetValues))
}

const removeValuesMultiple = (
    value,
    currentValue,
    storeKeys
) => {
    var targetValues = []
    if (currentValue) {
        targetValues = currentValue.toArray()
    }

    return updateValue(storeKeys, List(targetValues.filter((item) => item !== value)))
}

const BaseSelect = ({
    Renderer,
    multiple = false,
    storeKeys,
    ownKey,
    schema,
    value,
    onChange,
    t
}) => {
    if (!schema) return null;

    const enum_val = schema.get('enum');
    if (!enum_val) return null;

    const readOnly = schema.get('readOnly') === true

    let currentValue = undefined;
    if (multiple) {
        currentValue = typeof value !== 'undefined' ? value : (List(schema.get('default')) || List());

        Renderer.props = {
            ...Renderer.props,
            selectedItems: currentValue.toArray(),
            tagInputProps: {
                onRemove: (value) => onChange(removeValuesMultiple(value, currentValue, storeKeys)),
                disabled: readOnly
            },
            tagRenderer: (item) => <Trans
                schema={schema.get('t')}
                text={storeKeys.insert(0, 'widget').concat(List(['enum', item])).join('.')}
                context={Map({ 'relative': List(['enum', item]) })}
                fallback={beautifyKey(item)}
            />
        }
    } else {
        currentValue = typeof value !== 'undefined' ? value : (schema.get('default') || '');

        Renderer.props = {
            ...Renderer.props,
            activeItem: currentValue
        }
    }

    const translateItemName = (enum_name) => <Trans
        schema={schema.get('t')}
        text={storeKeys.insert(0, 'widget').concat(List(['enum', enum_name])).join('.')}
        context={Map({ 'relative': List(['enum', enum_name]) })}
        fallback={beautifyKey(enum_name)}
    />

    const translateItemNameRaw = (enum_name) => {
        let text = storeKeys.insert(0, 'widget').concat(List(['enum', enum_name])).join('.')
        let context = Map({ 'relative': List(['enum', enum_name]) })

        return t(text, context, schema)
    }

    return (
        <FormGroup label={<TransTitle schema={schema} storeKeys={storeKeys} ownKey={ownKey} />}>
            <Renderer.Component
                disabled={readOnly}
                items={enum_val.toArray()}
                itemRenderer={(item, props) => itemRenderer(multiple, item, translateItemName, currentValue, props)}
                itemPredicate={(query, item) => itemPredicate(query, item, translateItemNameRaw)}
                onItemSelect={(value) =>
                    multiple ?
                        onChange(addValuesMultiple(value, currentValue, storeKeys)) :
                        onChange(updateValue(storeKeys, value))
                }
                filterable={true}
                popoverProps={{
                    minimal: true
                }}
                {...Renderer.props}>
                <Button
                    disabled={readOnly}
                    fill={true}
                    text={currentValue? <Trans
                        schema={schema.get('t')}
                        text={storeKeys.insert(0, 'widget').concat(List(['enum', currentValue])).join('.')}
                        context={Map({ 'relative': List(['enum', currentValue]) })}
                        fallback={beautifyKey(currentValue)}
                    />: ""}
                    rightIcon="caret-down" />
            </Renderer.Component>
        </FormGroup>
    );
};

const SelectSingle = (props) => {
    return (
        <BaseSelect
            {...props}
            Renderer={{
                Component: Select,
                props: {
                    /*inputProps: {
                        fill: true
                    },
                    popoverProps: {
                        fill: true
                    }*/
                }
            }}
        />
    );
}

const SelectMulti = extractValue(memo((props) => {
    return (
        <BaseSelect
            {...props}
            Renderer={{
                Component: MultiSelect,
                props: {
                    fill: true,
                    tagRenderer: (item) => item,
                    /*tagInputProps: {
                        tagProps: {
                            intent: Intent.PRIMARY
                        }
                    }*/
                }
            }}
            multiple={true}
        />
    );
}))

export { SelectSingle as Select, SelectMulti };
