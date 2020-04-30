import { widgetsBase } from "./widgetsBase";
import { NumberRenderer, StringRenderer, TextRenderer } from "./Widgets/TextField";
import { BoolRenderer } from "./Widgets/OptionsBoolean";
import { OptionsRadio } from "./Widgets/OptionsRadio";

const widgets = { ...widgetsBase };

widgets.types = {
    string: StringRenderer,
    number: NumberRenderer,
    boolean: BoolRenderer,
};

widgets.custom = {
    Text: TextRenderer,
    OptionsRadio
};

export { widgets };
