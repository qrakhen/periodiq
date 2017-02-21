/**
 * Button Action
 * @extends AbstractAction */
 class ButtonAction extends require(__dirname + '/../../abstract/element.action.js') {

     /**
      * Will be called for each found DOM node for this element,
      * so the element parameter is NOT an periodiq Element class object,
      * @param {DomNode} element element dom node, queried by id. */
     constructor(element) {
         super(element);
         element.addEventListener('click', function() {
             this.event.trigger('sers', element.id, { grias: 'erna' });
         }.bind(this));
     }
 }

 module.exports = ButtonAction;
