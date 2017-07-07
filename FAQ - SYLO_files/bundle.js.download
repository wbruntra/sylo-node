(function() {
  var EMAIL_RE = /.+@.+\..+/;

  // smooth scrolling between sections

  function initScrollDriver(sections) {
    var buttons = sections.map(function(section, index) {
      if (index === sections.length - 1) {
        return null;
      }
      var button = document.createElement('button');
      button.className = 'scroll-driver';
      button.onclick = function() {
        sections[index + 1].scrollIntoView({ behavior: 'smooth' });
      }
      var img = document.createElement('img');
      img.width = '24px';
      img.height = '24px';
      img.src = '../icons/icon_arrow_downward_white_24px.svg';
      button.appendChild(img);
      return button;
    });

    sections.forEach(function(section, index) {
      if (section.id === 'smart') {
        var h4 = document.createElement('h4');
        h4.className = 'scroll-message';
        h4.textContent = "You've got my attention...";
        section.appendChild(h4);
      }
      if (buttons[index]) {
        section.appendChild(buttons[index]);
      }
    });
  }

  // Generic form event listeners / xhr logic

  function setupForm(form, fields, onSuccess) {
    var submitted = false;
    var errorMessage = document.getElementById('contact-form__error');
    var requiredFields = fields.filter(function(field) {
      return field.required;
    });
    var errorElements = requiredFields.map(function(field) {
      var span = document.createElement('span');
      span.className = 'error';
      if (field.type === 'email') {
        span.textContent = 'Invalid email address';
      } else {
        span.textContent = 'This field is required';
      }
      return span;
    })

    requiredFields.forEach(function(field, index) {
      field.addEventListener('keyup', function(e) {
        if (submitted && field.classList.contains('error')) {
          field.classList.remove('error');
          field.parentNode.removeChild(errorElements[index]);
        }
      });
    });

    form.addEventListener('submit', function(e) {
      function onError() {
        fields.forEach(function(field) {
          field.removeAttribute('disabled');
        });

        errorMessage.textContent = 'Please try again';
        errorMessage.classList.remove('hidden');
      }

      e.preventDefault();
      submitted = true;

      var fieldError = false;
      requiredFields.forEach(function(field, index) {
        if (!field.value || !field.value.trim() || (field.type === 'email' && !field.value.match(EMAIL_RE))) {
          fieldError = true;
          field.classList.add('error');
          field.parentNode.appendChild(errorElements[index]);
        }
      });

      if (!fieldError) {
        fields.forEach(function(field) {
          field.setAttribute('disabled', true);
        });

        var xhr = new XMLHttpRequest();
        xhr.open('POST', form.action, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 300) {
            onSuccess();
          } else {
            onError();
          }
        };
        xhr.onerror = function(e) {
          // http://stackoverflow.com/a/31942201/3437335
          // CORS error thrown, we assume the form has posted

          onSuccess();
        };

        /// TRY submitting all fields with true/false
        /// TRY submitting one value for whole group
        xhr.send(
          fields.map(function(field) {
            return field.id + '=' + encodeURIComponent(field.value);
          }).join('&')
        );
      }
    });
  }

  // header event listeners

  var hamburger = document.getElementById('hamburger');
  if (hamburger) {
    var sideTrayMenuOpen = false;
    var hoverDisabled = false;
    var aboutSubmenu = document.getElementById('about-submenu');

    hamburger.addEventListener('click', function() {
      sideTrayMenuOpen = !sideTrayMenuOpen;
      hamburger.setAttribute('aria-expanded', sideTrayMenuOpen);
      hamburger.setAttribute('aria-pressed', sideTrayMenuOpen);
    });

    var submenu = aboutSubmenu.querySelector('.navigation-submenu');
    aboutSubmenu.addEventListener('mouseenter', function() {
      submenu.setAttribute('aria-hidden', false);
    });
    aboutSubmenu.addEventListener('mouseleave', function() {
      submenu.setAttribute('aria-hidden', true);
    });
  }


  // footer event listeners

  var emailSignupForm = document.querySelector('form[name="email-signup"]');
  if (emailSignupForm) {
    var emailSignupFormSubmitted = false;
    var formContents = emailSignupForm.querySelector('.form__contents');
    var email = emailSignupForm.querySelector('input[type="email"]');
    var human = emailSignupForm.querySelector('input[type="text"]');
    var submit = emailSignupForm.querySelector('input[type="submit"]');
    var errorMessage = document.createElement('div');
    errorMessage.className = 'error';
    errorMessage.textContent = 'Enter a valid email';

    email.addEventListener('keyup', function(e) {
      if (emailSignupFormSubmitted) {
        if (errorMessage.textContent !== 'Enter a valid email') {
          errorMessage.textContent = 'Enter a valid email';
        }
        emailSignupFormSubmitted = false;
        formContents.removeChild(errorMessage);
        email.classList.remove('error');
      }
    });

    emailSignupForm.addEventListener('submit', function(e) {
      function emailSignupSuccess() {
        var successMessage = document.createElement('p');
        successMessage.textContent = "Please check your inbox and verify your email. Then stay up to date on everything SYLO!";
        emailSignupForm.parentNode.replaceChild(successMessage, emailSignupForm);
      }

      function emailSignupError() {
        submit.removeAttribute('disabled');
        email.removeAttribute('disabled');

        errorMessage.textContent = 'Please try again';
        formContents.appendChild(errorMessage);
        email.classList.add('error');
      }

      e.preventDefault();
      emailSignupFormSubmitted = true;
      if (!email.value || !email.value.trim() || !email.value.match(EMAIL_RE)) {
        formContents.appendChild(errorMessage);
        email.classList.add('error');
      } else {
        submit.setAttribute('disabled', true);
        email.setAttribute('disabled', true);

        document.MC_callback = function(data) {
          if (data.result === 'success') {
            emailSignupSuccess();
          } else {
            emailSignupError();
          }
        };

        var script = document.createElement('script');
        script.type = 'text/javascript';
        var url = "//meetsylo.us15.list-manage.com/subscribe/post-json?u=5f4dc1ccf93330a637ad62ce3&amp;id=58d5e7dce7" +
          "&EMAIL=" + encodeURIComponent(email.value) +
          "&" + encodeURIComponent(human.id) + "=" + encodeURIComponent(human.value) +
          "&c=document.MC_callback";
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  }

  // scrolling for brands

  var brands = document.getElementById('brands');
  if (brands) {
    initScrollDriver([
      document.getElementById('why'),
      document.getElementById('measurement'),
      document.getElementById('what'),
      document.getElementById('report'),
    ]);
  }

  // scrolling for creators

  var creators = document.getElementById('creators');
  if (creators) {
    initScrollDriver([
      document.getElementById('hello'),
      document.getElementById('why'),
      document.getElementById('insights'),
      document.getElementById('app'),
    ]);
  }

  // scrolling for about

  var about = document.getElementById('about');
  if (about) {
    initScrollDriver([
      document.getElementById('mission'),
      document.getElementById('partners'),
      document.getElementById('careers'),
      document.getElementById('location'),
    ]);
  }

  // faq event listeners

  var faqMenuToggle = document.getElementById('faq-menu__toggle');
  if (faqMenuToggle) {
    var faqMenu = document.querySelector('.faq-menu');
    var faqMenuOpen = false;
    faqMenuToggle.addEventListener('click', function() {
      if (faqMenuOpen) {
        faqMenu.classList.remove('open');
      } else {
        faqMenu.classList.add('open');
      }

      faqMenuOpen = !faqMenuOpen;
    });
  }

  // shared exit logic for contact Forms

  var exitForm = document.getElementById('exit-form');
  if (exitForm) {
    if (window.location && window.location.search && window.location.search.indexOf('?next=') === 0) {
      var href = window.location.search.slice(6);
      if (href !== '/') {
        exitForm.setAttribute('href', href);
      }
    }
  }

  // Contact us form

  var contactUs = document.getElementById('contact-us');
  var contactUsForm = document.getElementById('form1');
  if (contactUs && contactUsForm) {
    var contactUsFields = [
      document.getElementById('Field8'),
      document.getElementById('Field10'),
      document.getElementById('Field4'),
      document.getElementById('Field5'),
      document.getElementById('Field6'),
      document.getElementById('Field7'),
      document.getElementById('saveForm'),
      document.getElementById('comment'),
      document.getElementById('idstamp'),
    ];

    function contactUsFormSuccess() {
      var success = document.createElement('div');
      success.className = 'success';
      var successHeader = document.createElement('h3');
      successHeader.textContent = 'Your message has been sent!';
      var successMessage = document.createElement('p');
      var successMessage1 = document.createElement('span');
      successMessage1.textContent = "We'll get back to you in a New York minute. In the meantime, check out our ";
      var successMessageLink = document.createElement('a');
      successMessageLink.className = "faq-link";
      successMessageLink.href = "/faq";
      successMessageLink.textContent = "FAQs";
      var successMessage2 = document.createElement('span');
      successMessage2.textContent = ". You never know what you'll learn.";
      var cta = document.createElement('a');
      cta.href = '/';
      cta.className = 'cta-button';
      cta.textContent = 'Ok, thanks!';

      successMessage.appendChild(successMessage1);
      successMessage.appendChild(successMessageLink);
      successMessage.appendChild(successMessage2);
      success.appendChild(successHeader);
      success.appendChild(successMessage);
      success.appendChild(cta);

      contactUsForm.parentNode.replaceChild(success, contactUsForm);
    }

    setupForm(
      contactUsForm,
      contactUsFields,
      contactUsFormSuccess
    );
  }


  // contact form selector

  var contact = document.getElementById('contact');
  if (contact) {
    if (window.location && window.location.search && window.location.search.indexOf('?next=') === 0) {
      var links = Array.prototype.slice.call(contact.querySelectorAll('a'));
      links.forEach(function(link) {
        link.setAttribute('href', link.getAttribute('href') + window.location.search);
      });
    }
  }

  // Brand contact form

  var contactBrand = document.getElementById('contact__brand');
  var contactBrandForm = document.getElementById('form2');
  if (contactBrand && contactBrandForm) {
    var contactBrandFields = [
      document.getElementById('Field2'),
      document.getElementById('Field8'),
      document.getElementById('Field3'),
      document.getElementById('Field4'),
      document.getElementById('Field5'),
      document.getElementById('Field6'),
      document.getElementById('saveForm'),
      document.getElementById('comment'),
      document.getElementById('idstamp'),
      document.getElementById('Field10'),
    ];

    function contactBrandFormSuccess() {
      var h1 = document.getElementsByTagName('h1')[0];
      h1.textContent = "Powerful you have become.";
      var success = document.createElement('div');
      success.className = 'success';
      var successMessage = document.createElement('p');
      successMessage.textContent = "Your brand is on the path to greatness. A SYLO team member will be in touch soon with next steps.";
      var cta = document.createElement('a');
      cta.href = '/';
      cta.className = 'cta-button';
      cta.textContent = 'High five';

      success.appendChild(successMessage);
      success.appendChild(cta);

      contactBrandForm.parentNode.replaceChild(success, contactBrandForm);
    }

    setupForm(
      contactBrandForm,
      contactBrandFields,
      contactBrandFormSuccess
    );
  }


  // Creator contact form

  var contactCreator = document.getElementById('contact__creator');
  var contactCreatorForm = document.getElementById('form3');
  if (contactCreator && contactCreatorForm) {
    var contactCreatorFields = [
      document.getElementById('Field2'),
      document.getElementById('Field8'),
      document.getElementById('Field4'),
      document.getElementById('Field5'),
      document.getElementById('Field3'),
      document.getElementById('Field6'),
      document.getElementById('saveForm'),
      document.getElementById('comment'),
      document.getElementById('idstamp'),
      document.getElementById('Field12'),
    ];

    function contactCreatorFormSuccess() {
      var h1 = document.getElementsByTagName('h1')[0];
      if (h1 && h1.textContent.trim()) {
        h1.textContent = "First learn stand. Then learn fly.";
      }
      var success = document.createElement('div');
      success.className = 'success';
      var successMessage = document.createElement('p');
      successMessage.textContent = "Your social content is about to blast off. A SYLO team member will be in touch soon with launch codes.";

      var cta = document.createElement('a');
      cta.href = '/';
      cta.className = 'cta-button';
      cta.textContent = 'Drop the mic';

      success.appendChild(successMessage);
      success.appendChild(cta);

      contactCreatorForm.parentNode.replaceChild(success, contactCreatorForm);
    }

    setupForm(
      contactCreatorForm,
      contactCreatorFields,
      contactCreatorFormSuccess
    );
  }
})();
