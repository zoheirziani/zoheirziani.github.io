// JavaScript HTML DOM EventListener
document.addEventListener('DOMContentLoaded', function () {
    // Get the current year
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    // Find the element with the id "currentYear"
    var currentYearElement = document.getElementById("currentYear");
    // Check if the element exists before updating its content
    if (currentYearElement) {
        // Update the content of the element with the current year
        currentYearElement.textContent = currentYear.toString();
        currentYearElement.setAttribute("datetime", currentYear.toString());
    }
    else {
        console.error('Element with ID "currentYear" not found.');
    }
    fetch('data/social-media.json')
        .then(function (response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then(function (data) {
        var socialMediaContainer = document.getElementById('social-media');
        if (socialMediaContainer) {
            socialMediaContainer.innerHTML = data.social_media.map(function (social, index) { return "\n            <a href=\"".concat(social.url, "\" target=\"_blank\" rel=\"noopener noreferrer\" title=\"").concat(social.title, "\">\n                <img src=\"").concat(social.icon, "\" alt=\"").concat(social.name, "\"  height=\"24\">\n            </a>\n            "); }).join('');
            updateSocialMedia();
        }
    })
        .catch(function (error) {
        console.error('Failed to fetch social media links:', error);
    });
    // Country list in the contact form
    var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];
    var countrySelect = document.getElementById("country");
    if (countrySelect) {
        countries.forEach(function (country) {
            var option = document.createElement("option");
            option.value = country;
            option.textContent = country;
            countrySelect.appendChild(option);
        });
    }
    // Show publications
    fetch('data/research.json')
        .then(function (response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then(function (data) {
        var articlesContainer = document.getElementById('articles');
        var conferencesContainer = document.getElementById('conferences');
        if (articlesContainer) {
            articlesContainer.innerHTML = data.publications.map(function (publication, index) { return "\n            <article>\n                <h4>".concat(index + 1, "/ ").concat(publication.title, "</h4>\n                <p>").concat(formatAuthorsWithHighlight(publication.authors), "</p>\n                <p>Published in <em>").concat(publication.journal, "</em> (").concat(publication.year, ")</p>\n                <p>DOI: <a href=\"").concat(publication.doi, "\" target=\"_blank\">").concat(publication.doi, "</a></p>\n                <a href=\"").concat(publication.pdf, "\" target=\"_self\"><img src=\"/assets/icons/pdf.png\" alt=\"PDF icon\"></a>\n            </article>\n            "); }).join('');
        }
        if (conferencesContainer) {
            conferencesContainer.innerHTML = data.conferences.map(function (conference, index) { return "\n            <article>\n                <h4>".concat(index + 1, "/ ").concat(conference.title, "</h4>\n                <p>").concat(formatAuthorsWithHighlight(conference.authors), "</p>\n                <p>Presented at <em>").concat(conference.conference, "</em> (").concat(conference.year, ")</p>\n                <a href=\"").concat(conference.url, "\" target=\"_self\">&#x21F2;</a>\n            </article>\n            "); }).join('');
        }
    })
        .catch(function (error) {
        console.error('Failed to fetch articles:', error);
    });
    // Portfolio filter functionality
    var buttons = document.querySelectorAll('[data-filter]');
    var items = document.querySelectorAll('.portfolio-item');
    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            var filter = button.getAttribute('data-filter');
            // Remove "active" class from all buttons
            buttons.forEach(function (btn) { return btn.classList.remove('active'); });
            // Add "active" class to the clicked button
            button.classList.add('active');
            items.forEach(function (item) {
                var category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'flex';
                }
                else {
                    item.style.display = 'none';
                }
            });
        });
    });
});
window.addEventListener("scroll", function () {
    var toTopButton = document.getElementById("scroll-to-top");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        toTopButton.style.display = "block";
    }
    else {
        toTopButton.style.display = "none";
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
function updateSocialMedia() {
    var _a;
    // Update social media liks in the header
    var socialMediaContainer = document.getElementById('social-media');
    var socialMediaLinks = Array.prototype.slice.call(socialMediaContainer.children);
    for (var i = socialMediaLinks.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [socialMediaLinks[j], socialMediaLinks[i]], socialMediaLinks[i] = _a[0], socialMediaLinks[j] = _a[1];
    }
    // Remove existing links
    socialMediaContainer.innerHTML = '';
    // Show only the first four links
    var linksToShow = socialMediaLinks.slice(0, 4);
    linksToShow.forEach(function (link) { return socialMediaContainer.appendChild(link); });
}
// to top function
function toTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
// onvalidate function
function validateForm() {
    // Get form elements
    var form = document.forms.namedItem("contact");
    var nameInput = form.elements.namedItem("name");
    var countrySelect = form.elements.namedItem("country");
    // Validate the name field (no numbers or special characters)
    var name = nameInput.value;
    var namePattern = /^[a-zA-Z\s]+$/;
    if (!namePattern.test(name)) {
        alert("Please enter a valid name with only letters.");
        return false;
    }
    // Validate the country field (must select a country)
    var country = countrySelect.value;
    if (country === "") {
        alert("Please select a country.");
        return false;
    }
    return true;
}
// Function to format authors
function formatAuthors(authors) {
    var maxAuthorsToShow = 5;
    if (authors.length > maxAuthorsToShow) {
        // Show first three authors and "et al." for others
        return "".concat(authors.slice(0, 3).join(', '), " et al.");
    }
    else {
        // Join all authors
        return authors.join(', ');
    }
}
// Function to format authors with special handling for "Zoheir Ziani"
function formatAuthorsWithHighlight(authors) {
    var highlightedAuthor = "Zoheir Ziani";
    var formattedAuthors = authors.map(function (author) {
        if (author === highlightedAuthor) {
            return "<strong>".concat(author, "</strong>");
        }
        else {
            return author;
        }
    });
    return formatAuthors(formattedAuthors);
}
