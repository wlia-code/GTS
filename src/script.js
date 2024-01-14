function submitServiceRequest() {
    var form = document.getElementById('serviceForm');

    // Check form validity before submitting
    if (!form.checkValidity()) {
        // The form is not valid, display a message near the form
        displayNotification('Please fill in all required fields.', 'alert-danger');
        return;
    }

    // If the form is valid, hide any previous notifications
    hideNotification();

    var deviceType = document.getElementById('deviceType').value;
    var model = document.getElementById('model').value;
    var issue = document.getElementById('issue').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    // Create an object with the form data
    var formData = {
        deviceType: deviceType,
        model: model,
        issue: issue,
        email: email,
        phone: phone
    };

    // Use the FormData API to construct the request body
    var requestBody = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
        requestBody.append(key, value);
    });

    // Make a POST request to FormSubmit
    fetch('https://formsubmit.co/ajax/ffecd3cf280123c03b07a454e2a8aea5', {
        method: 'POST',
        body: requestBody
    })
    .then(response => response.json())
    .then(data => {
        // You can handle the server response here
        console.log('FormSubmit response:', data);

        // Clear the form
        form.reset();

        // Show a confirmation message
        displayNotification('Tjänstförfrågan skickad framgångsrikt!', 'alert-success');

        // Hide the confirmation after 3 seconds
        setTimeout(hideNotification, 3000);
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        // Handle the error as needed
        displayNotification('Error submitting form. Please try again later.', 'alert-danger');
    });
}

// Function to display a notification message
function displayNotification(message, className) {
    var notification = document.getElementById('notification');
    notification.innerHTML = message;
    notification.className = 'alert ' + className;
    notification.style.display = 'block';
}

// Function to hide the notification
function hideNotification() {
    var notification = document.getElementById('notification');
    notification.style.display = 'none';
}

// Language switcher function
function switchLanguage(lang) {
    const langElements = {
        'en': {
            'service-request-text': 'Submit a service request:',
            'device-type-label': 'Device Type:',
            'pc-option': 'PC',
            'mobile-option': 'Mobile',
            'laptop-option': 'Laptop',
            'model-label': 'Model Name or Number:',
            'issue-label': 'Issue:',
            'email-label': 'Email:',
            'phone-label': 'Phone Number:',
            'submit-button': 'Submit',
            'confirmation-message': 'Service request submitted successfully!',
            'our-mission-heading': 'Our Mission',
            'our-mission-text': 'We are dedicated to providing top-notch service for all your PC, mobile, and laptop needs. Our mission is to ensure customer satisfaction through quality repairs and excellent customer service. We aim to make technology work seamlessly for you!'
        },
        'sv': {
            'service-request-text': 'Skicka in en tjänstförfrågan:',
            'device-type-label': 'Enhets typ:',
            'pc-option': 'Dator',
            'mobile-option': 'Mobil',
            'laptop-option': 'Laptop',
            'model-label': 'Modellnamn eller nummer:',
            'issue-label': 'Problem:',
            'email-label': 'E-post:',
            'phone-label': 'Telefonnummer:',
            'submit-button': 'Skicka',
            'confirmation-message': 'Tjänstförfrågan skickad framgångsrikt!',
            'our-mission-heading': 'Vår mission',
            'our-mission-text': 'Vi är dedikerade till att erbjuda toppservice för alla dina PC-, mobil- och laptopbehov. Vår mission är att säkerställa kundnöjdhet genom kvalitetsreparationer och utmärkt kundservice. Vi strävar efter att göra tekniken smidig för dig!'
        }
    };

    Object.keys(langElements[lang]).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.innerHTML = langElements[lang][key];
        }
    });
}

