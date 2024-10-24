const getTop = el => $(el).offset().top;

const scrollToElementTop = (el, spaceFromTop) => {
  $('html, body').animate({ scrollTop: getTop(el) - spaceFromTop }, 'slow');
};

const animateEl = (el, animateJson, aduration) => {
  $(el).animate(animateJson, aduration);
};

const sendFirstStepForm = (formStep) => {
  const valuePairs = $(formStep).find('input').map((_, input) => `${input.name}: ${input.value}`).get();
  $('[first-step-data]').text(valuePairs.join('\n'));
  setTimeout(() => {
    $('[first-step-form]').submit();
  }, 3000);
};

$('[form-main]').each(function() {
  const mainForm = $(this);
  const quoteProgressLine = mainForm.find('.quote-progress-line');
  const bookingField = mainForm.find('[booking-field]');
  const finalSubmitBtn = mainForm.find('[final-submit-btn]');
  const formSteps = mainForm.find('.form-step');
  const stepIndicators = mainForm.find('.flow-step');
  const popup = mainForm.find('.popup');

  const dataInputPairs = [
    { input: null, value: null, attr: 'address-text' },
    { input: null, value: null, attr: 'move-date' },
    { input: null, value: null, attr: 'move-time' },
    { input: null, value: null, attr: 'move-space' },
    { input: null, value: null, attr: 'move-store-time' }
  ];

  const updateInnerText = (attr, text) => {
    mainForm.find(`[${attr}]`).text(text);
  };

  const updateDetails = () => {
    dataInputPairs.forEach(pair => {
      if (!pair.value && pair.input) {
        pair.value = pair.input.val();
      }
      updateInnerText(pair.attr, pair.value);
    });
  };

  const updateRadioValue = (inputAttr, index) => {
    const inputName = mainForm.find(`[${inputAttr}]`).attr('name');
    mainForm.find(`[name=${inputName}]`).on('click', function() {
      dataInputPairs[index].value = this.value;
      updateDetails();
    });
  };

  const updateInputValue = (inputAttr, index) => {
    const input = mainForm.find(`[${inputAttr}]`);
    if (input.length) {
      dataInputPairs[index].input = input;
      input.on('focusout', function() {
        dataInputPairs[index].value = this.value;
        updateDetails();
      });
    }
  };

  updateInputValue('address-input', 0);
  updateInputValue('move-date-input', 1);
  updateRadioValue('move-time-input', 2);
  updateRadioValue('move-space-input', 3);
  updateRadioValue('move-store-time-input', 4);

  const openPopup = () => {
    updateDetails();
    popup.css({ opacity: 0, transform: 'translateY(40px)' }).show();
    animateEl(popup, { opacity: 1, translateY: 0 }, 300);
  };

  const closePopup = () => {
    updateDetails();
    animateEl(popup, { opacity: 0, translateY: 40 }, 300);
    setTimeout(() => popup.hide(), 300);
  };

  mainForm.find('[close-popup]').on('click', closePopup);

  const formStepsArray = formSteps.toArray();
  let activeStepIndex = 0;
  const totalSteps = formSteps.length;
  let firstStepDone = false;

  const makeStepActive = (index) => {
    activeStepIndex = index;
    if (index === 1 && !firstStepDone) {
      firstStepDone = true;
      sendFirstStepForm(formSteps.first());
    }
    formSteps.hide().eq(index).show();
    stepIndicators.removeClass('is--done').slice(0, index + 1).addClass('is--done');
    quoteProgressLine.css('width', `${((index + 1) / totalSteps) * 100}%`);
    scrollToElementTop(formSteps.eq(index), 0);
  };

  const makeInputInvalid = (input, messageIndex) => {
    const messages = ['Please add a value', 'Please select an option', 'Please add correct email'];
    if (!input.hasClass('invalid')) {
      input.addClass('invalid').after(`<div class="invalid-text">${messages[messageIndex]}</div>`);
    }
  };

  const makeInputValid = (input) => {
    input.removeClass('invalid').next('.invalid-text').remove();
  };

  const updateCondition = (step) => {
    const inputs = step.find('input, select').not(':disabled').filter(':visible');
    let valid = true;
    inputs.each(function() {
      if (!this.value.trim() || (this.type === 'email' && (!this.value.includes('@') || !this.value.includes('.')))) {
        makeInputInvalid($(this), this.type === 'email' ? 2 : 0);
        valid = false;
      }
    });
    if (step.attr('radio-var-index')) {
      const index = parseInt(step.attr('radio-var-index'));
      if (!dataInputPairs[index].value) {
        makeInputInvalid(step.find('input[type="radio"]').parent(), 1);
        valid = false;
      }
    }
    return valid;
  };

  formSteps.each(function() {
    const step = $(this);
    step.find(`[next-step-btn]`).on('click', () => {
      if (updateCondition(step)) {
        makeStepActive(activeStepIndex + 1);
      }
    });
    step.find('input').on('focus', function() {
      makeInputValid($(this));
    });
    step.find(`[prev-step-btn]`).on('click', () => {
      makeStepActive(activeStepIndex - 1);
    });
  });

  mainForm.on('submit', (event) => {
    if (activeStepIndex + 1 < totalSteps) {
      event.preventDefault();
      if (updateCondition(formSteps.eq(activeStepIndex))) {
        makeStepActive(activeStepIndex + 1);
      }
    } else {
      bookingField.find('input').val(dataInputPairs.map(pair => pair.value).join(', '));
    }
  });

  makeStepActive(0);

  $('[show-date-detail]').on('click', function() {
    const dateDetail = mainForm.find('.date-detail');
    dateDetail.toggleClass('expanded');
  });
});
