import { widgetsBase } from "./widgetsBase";
import { NumberRenderer, StringRenderer, TextRenderer } from "./Widgets/TextField";
import { BoolRenderer } from "./Widgets/OptionsBoolean";
import { OptionsRadio } from "./Widgets/OptionsRadio";
import { OptionsCheck } from "./Widgets/OptionsCheck";
import { Select, SelectMulti } from "./Widgets/Select";
import { NumberSlider } from "./Widgets/NumberSlider";

const widgets = { ...widgetsBase };

widgets.types = {
    string: StringRenderer,
    number: NumberRenderer,
    boolean: BoolRenderer,
};

widgets.custom = {
    Text: TextRenderer,
    OptionsRadio,
    OptionsCheck,
    Select,
    SelectMulti,
    NumberSlider
};

export { widgets };
