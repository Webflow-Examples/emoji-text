var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const emojiMap = {
    smile: "😊",
    wink: "😉",
    heart: "😍",
    cry: "😭"
};
// default to smile
let selectedEmoji = emojiMap.smile;
addButtonListeners();
document.getElementById("extension-form").onsubmit = (event) => __awaiter(this, void 0, void 0, function* () {
    event.preventDefault();
    // Get the current selected Element
    let el = yield webflow.getSelectedElement();
    // If styles can be set on the Element
    if (el && el.styles && el.configurable && el.children) {
        //Get current element's style
        const currentStyle = yield el.getStyles();
        // Get style
        const emojiStyle = yield createOrUseStyle("emoji-style");
        // Create a new element that will display the text-emoji
        const labelElement = yield webflow.createDOM("span");
        labelElement.setStyles([...currentStyle, emojiStyle]);
        labelElement.setTextContent(selectedEmoji);
        el.setChildren([...el.getChildren(), labelElement]);
        yield el.save();
    }
    else {
        alert("Please select a text element");
    }
});
// Check if specified style exists. If not, create a new style
function createOrUseStyle(styleName) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check if this style exists to avoid duplicate styles
        const style = yield webflow.getStyleByName(styleName);
        if (style) {
            // Return existing style
            return style;
        }
        else {
            // Create a new style, return it
            const emojiStyle = webflow.createStyle(styleName);
            emojiStyle.setProperties({ "background-color": "#FF00FF" });
            return emojiStyle;
        }
    });
}
function handleEmojiClick(emoji) {
    selectedEmoji = emoji;
}
function addButtonListeners() {
    document.getElementById("smile").onclick = () => {
        handleEmojiClick(emojiMap.smile);
    };
    document.getElementById("wink").onclick = () => {
        handleEmojiClick(emojiMap.wink);
    };
    document.getElementById("heart").onclick = () => {
        handleEmojiClick(emojiMap.heart);
    };
    document.getElementById("cry").onclick = () => {
        handleEmojiClick(emojiMap.cry);
    };
}
