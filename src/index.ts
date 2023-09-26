  document.getElementById("lorem").onsubmit = async (event) => {
    event.preventDefault()

    //Get the current selected Element
    let el = await webflow.getSelectedElement();

    //Get current element's style
    const currentStyle = await el.getStyles();

    //Get style
    const emojiStyle = await webflowStyleManager("emoji-style");


    //Create a new element that will display the text-emoji
    const labelElement = await webflow.createDOM('b');
    labelElement.setStyles([...currentStyle, emojiStyle]);
    labelElement.setTextContent(clicked);

    //Make sure the element can add children
    if ( el && el.configurable && el.children){

      el.setChildren([...el.getChildren(), labelElement] );
      
      await el.save();
    }


  }
  var clicked;

/* Check if specified style exists.If not, create a new style */
const webflowStyleManager = async (styleName: string) => {
  //Check if this style exists to avoid duplicate styles 
    const style = await webflow.getStyleByName(styleName);
    if (style) {
      //Return existing style 
      return style;
    } else {
      //return a newly created style
      const emojiStyle = webflow.createStyle(styleName);
      emojiStyle.setProperties({ color: '#FF00FF'});
      return emojiStyle;
    }
}