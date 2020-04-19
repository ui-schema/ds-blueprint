import React from 'react';
import {schemaGrid} from "./schemas/demoGrid";
import {widgets,} from "../../src";
import {SchemaEditor, isInvalid, createOrderedMap, createStore} from "@ui-schema/ui-schema";
import {browserT} from "./t";
import "@blueprintjs/core/lib/css/blueprint.css";
import "flexboxgrid/dist/flexboxgrid.css";

/*const useStyle = () => {
    React.useEffect(() => {
        styles.use();
        stylesGrid.use();

        return () => {
            styles.unuse()
            stylesGrid.unuse()
        };
    }, []);

    return null;
};*/


const MainStore = () => {
    const [showValidity, setShowValidity] = React.useState(false);
    const [store, setStore] = React.useState(() => createStore(createOrderedMap({})));
    const [schema/*, setSchema*/] = React.useState(schemaGrid(12));

    return <React.Fragment>
        <SchemaEditor
            schema={schema}
            store={store}
            onChange={setStore}
            widgets={widgets}
            showValidity={showValidity}
            t={browserT}
        />

        <button onClick={() => setShowValidity(!showValidity)}>validity</button>
        {isInvalid(store.getValidity()) ? 'invalid' : 'valid'}

    </React.Fragment>
};

export default () => {
    return <div style={{display: 'flex'}}>
        <MainStore/>
    </div>
};
