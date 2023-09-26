var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.getElementById("lorem").onsubmit = (event) => __awaiter(this, void 0, void 0, function* () {
    event.preventDefault();
    //Get the current selected Element
    let el = yield webflow.getSelectedElement();
    //Get current element's style
    const currentStyle = yield el.getStyles();
    //Get style
    const emojiStyle = yield webflowStyleManager("emoji-style");
    emojiStyle.setProperties({ color: '#FF00FF' });
    //Create a new element that will display the text-emoji
    const labelElement = yield webflow.createDOM('b');
    labelElement.setStyles([...currentStyle, emojiStyle]);
    labelElement.setTextContent(clicked);
    //Make sure the element can add children
    if (el && el.configurable && el.children) {
        el.setChildren([...el.getChildren(), labelElement]);
        yield el.save();
    }
});
var clicked;
/* Check if specified style exists.If not, create a new style */
const webflowStyleManager = (styleName) => __awaiter(this, void 0, void 0, function* () {
    //Check if this style exists to avoid duplicate styles 
    const style = yield webflow.getStyleByName(styleName);
    if (style) {
        //Return existing style 
        return style;
    }
    else {
        //return a newly created style
        return webflow.createStyle(styleName);
    }
});
