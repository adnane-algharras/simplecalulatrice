'use strict';

var Calculator = {

  display: document.querySelector('#display div'),
  significantDigits: 9,
  currentOperationEle: null,
  result: 0,
  currentInput: '',
  operationToBeApplied: '',
  inputDigits: 0,
  decimalMark: false,

  updateDisplay: function updateDisplay() {
    var value = this.currentInput || this.result.toString();

    var infinite = new RegExp((1 / 0) + '', 'g');
    var outval = value.replace(infinite, '∞').replace(NaN, 'Error');
    this.display.textContent = outval;

    var screenWidth = this.display.parentNode.offsetWidth - 60;
    var valWidth = this.display.offsetWidth;
    var scaleFactor = Math.min(1, screenWidth / valWidth);
    //this.display.style.MozTransform = 'scale(' + scaleFactor + ')';
    // Work around for bug #989403
    this.display.style.fontSize = 5.5 * scaleFactor + 'rem';
  },

  

  

  init: function init() {
    this.display.style.lineHeight = + this.display.offsetHeight + "px";
    document.addEventListener('mousedown', this);
    document.addEventListener('touchstart', function(evt){
      var target = evt.target;
      if ((target.dataset.type == "value") || (target.value == "C") || (target.value == "=")) {
        target.classList.add("active");
      }
    });
    document.addEventListener('touchend', function(evt){
      var target = evt.target;
      if ((target.dataset.type == "value") || (target.value == "C") || (target.value == "=")) {
        target.classList.remove("active");
      }
    });
    this.updateDisplay();
  },

  // handles the operator highlight
  removeCurrentOperationEle: function removeCurrentOperationEle() {
    if (this.currentOperationEle) {
      this.currentOperationEle.classList.remove('active');
      this.currentOperationEle = null;
    }
  },

  handleEvent: function handleEvent(evt) {
    var target = evt.target;
    var value = target.value;

    // Adding haptic feedback on key press
    navigator.vibrate(50);
    switch (target.dataset.type) {
      case 'value':
        this.appendDigit(value);
        break;
      case 'operator':
        if (value === '-' && this.currentInput === '-') {
          return;
        }
        this.removeCurrentOperationEle();
        if (this.currentInput || this.result) {
          target.classList.add('active');
        }
        this.currentOperationEle = target;
        if (this.currentInput || this.result || value === '-') {
          this.appendOperator(value);
        }
        break;
      case 'command':
        switch (value) {
          case '=':
            if (this.currentInput && this.operationToBeApplied &&
                typeof this.result === 'number') {
              this.removeCurrentOperationEle();
              this.calculate();
            }
            break;
          case 'C':
            this.removeCurrentOperationEle();
            this.backSpace();
            break;
        }
        break;
    }
  }
};

Calculator.maxDisplayableValue = '1e' + Calculator.significantDigits - 1;

window.addEventListener('load', function load(evt) {
  window.removeEventListener('load', load);
  Calculator.init();
});
