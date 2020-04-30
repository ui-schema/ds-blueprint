import { widgetsBase } from "./widgetsBase";
import { NumberRenderer, StringRenderer, TextRenderer } from "./Widgets/TextField";

const widgets = { ...widgetsBase };

widgets.types = {
    string: StringRenderer,
    number: NumberRenderer
};

widgets.custom = {
    Text: TextRenderer
};

export { widgets };
