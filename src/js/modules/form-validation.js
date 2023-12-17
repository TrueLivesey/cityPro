import Inputmask from 'Inputmask';
import JustValidate from 'just-validate';

function formValidation(form, name = null, phone = null, check = null) {
  // PHONE MASK
  const im = new Inputmask('+7 (999)-999-99-99');

  im.mask(phone);

  // VALIDATION
  const validation = new JustValidate(`#${form}`, {
    errorFieldStyle: {
      backgroundColor: 'rgba(255, 105, 114, 1)',
    },
    successFieldStyle: {
      backgroundColor: 'rgba(184, 236, 100, 1)',
    },
    validateBeforeSubmitting: true,
  });

  validation
    .addField(`#${name}`, [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Недостаточное количество символов',
      },
      {
        rule: 'maxLength',
        value: 50,
        errorMessage: 'Вы ввели больше, чем положено',
      },
    ])
    .addField(`#${phone.id}`, [
      {
        rule: 'required',
        errorMessage: 'Вы не ввели телефон',
      },
      {
        rule: 'function',
        errorMessage: 'Недопустимый формат',
        validator: function () {
          const phoneMask = phone.inputmask.unmaskedvalue();
          return phoneMask.length === 10;
        },
      },
    ])
    .addField(`#${check}`, [
      {
        rule: 'required',
        errorMessage: 'Примите соглашение',
      },
    ]);
}

export { formValidation };
