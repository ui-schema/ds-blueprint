import React from "react";
import { TransTitle, updateValue } from "@ui-schema/ui-schema";
import { FormGroup } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import moment from "moment";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";

const DatePicker = ({
    schema,
    onChange,
    value,
    storeKeys,
    ownKey
}) => {
    //const variant = schema.getIn(['date', 'variant']) || 'inline'
    const dateFormat = schema.getIn(['date', 'format']) || 'yy-MM-DD';
    //const dateFormatData = schema.getIn(['date', 'formatData']) || dateFormat;
    const readOnly = schema.get('readOnly') === true
    const additionalProps = {};
    additionalProps['orientation'] = schema.getIn(['date', 'orientation']);
    

    return (
        <FormGroup label={<TransTitle schema={schema} storeKeys={storeKeys} ownKey={ownKey} />}>
            <DateInput
                onChange={(date) => {
                    if (date) {
                        onChange(updateValue(storeKeys, moment(date).format(dateFormat)))
                    } else {
                        onChange(updateValue(storeKeys, null))
                    }
                }}
                formatDate={(date) => moment(date).format(dateFormat)}
                parseDate={(str) => moment(str, dateFormat).toDate()}
                value={value}
                disabled={readOnly}
            />
        </FormGroup>
    )

    /*return <DateTimeBase
        dateFormat={dateFormat}
        dateFormatData={dateFormatData}
        additionalProps={additionalProps}
        Component={Component}
        schema={schema}
        keyboard={keyboard}
        {...props}
    />*/
};

export { DatePicker };
