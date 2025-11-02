interface SocialMedia {
    name: string;
    title: string;
    url: string;
    icon: string;
}
interface SocilaMediaResponse {
    social_media: SocialMedia[];
}
interface Publication {
    title: string;
    authors: string[];
    journal?: string;
    conference?: string;
    year: number;
    doi?: string;
    url?: string;
    abstract?: string;
    pdf?: string;
}
interface PublicationsResponse {
    publications: Publication[];
    conferences: Publication[];
}
interface Project {
    link: string;
    category: string;
    imgSrc: string;
    imgAlt: string;
    title: string;
    description: string;
}
// JavaScript HTML DOM EventListener
document.addEventListener('DOMContentLoaded', function() {
    // Get the current year
    let currentDate: Date = new Date();
    let currentYear: number = currentDate.getFullYear();
    // Find the element with the id "currentYear"
    let currentYearElement: HTMLElement | null = document.getElementById("currentYear");
    // Check if the element exists before updating its content
    if (currentYearElement) {
        // Update the content of the element with the current year
        currentYearElement.textContent = currentYear.toString();
        currentYearElement.setAttribute("datetime", currentYear.toString());
    } else {
        console.error('Element with ID "currentYear" not found.');
    }

    fetch('data/social-media.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data: SocilaMediaResponse) => {
        const socialMediaContainer = document.getElementById('social-media');

        if (socialMediaContainer) {
            socialMediaContainer.innerHTML = data.social_media.map((social, index) => `
            <a href="${social.url}" target="_blank" rel="noopener noreferrer" title="${social.title}">
                <img src="${social.icon}" alt="${social.name}"  height="24">
            </a>
            `).join('');
            updateSocialMedia()
        }
    })
    .catch(error => {
    console.error('Failed to fetch social media links:', error);
    });

    // Country list in the contact form
    const countries: readonly string[] = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda","Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain","Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia","Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso","Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic","Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the","Congo, Republic of the", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic","Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador","Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland","France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala","Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India","Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan","Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait","Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein","Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta","Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco","Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal","Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway","Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru","Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis","Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe","Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia","Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka","Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania","Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam","Yemen", "Zambia", "Zimbabwe"];
    const countrySelect: HTMLElement | null = document.getElementById("country");
    if (countrySelect) {
        countries.forEach(country => {
            const option: HTMLOptionElement = document.createElement("option");
            option.value = country;
            option.textContent = country;
            countrySelect.appendChild(option);
        });
    }

    // Show publications
    fetch('data/research.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data: PublicationsResponse) => {
        const articlesContainer = document.getElementById('articles');
        const conferencesContainer = document.getElementById('conferences');

        if (articlesContainer) {
            articlesContainer.innerHTML = data.publications.map((publication, index) => `
            <article>
                <h4>${index + 1}/ ${publication.title}</h4>
                <p>${formatAuthorsWithHighlight(publication.authors)}</p>
                <p>Published in <em>${publication.journal}</em> (${publication.year})</p>
                <p>DOI: <a href="${publication.doi}" target="_blank">${publication.doi}</a></p>
                <a href="${publication.pdf}" target="_self"><img src="/assets/icons/pdf.png" alt="PDF icon"></a>
            </article>
            `).join('');
        }
        if (conferencesContainer) {
            conferencesContainer.innerHTML = data.conferences.map( (conference, index) => `
            <article>
                <h4>${index + 1}/ ${conference.title}</h4>
                <p>${formatAuthorsWithHighlight(conference.authors)}</p>
                <p>Presented at <em>${conference.conference}</em> (${conference.year})</p>
                <a href="${conference.url}" target="_self">&#x21F2;</a>
            </article>
            `).join('');
        }
    })
    .catch(error => {
    console.error('Failed to fetch articles:', error);
    });

    // Portfolio filter functionality
    const buttons = document.querySelectorAll('[data-filter]') as NodeListOf<HTMLButtonElement>;
    const items = document.querySelectorAll('.portfolio-item') as NodeListOf<HTMLDivElement>;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter') as string;
            
            // Remove "active" class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            // Add "active" class to the clicked button
            button.classList.add('active');

            items.forEach(item => {
                const category = item.getAttribute('data-category') as string;
                if (filter === 'all' || category === filter) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

});


window.addEventListener("scroll", function() {
    let toTopButton: HTMLElement | null = document.getElementById("scroll-to-top");
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		toTopButton.style.display = "block";
	} else {
		toTopButton.style.display = "none";
	}
});

/////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
function updateSocialMedia(): void {
    // Update social media liks in the header
    const socialMediaContainer = document.getElementById('social-media') as HTMLDivElement;
    const socialMediaLinks = Array.prototype.slice.call(socialMediaContainer.children) as HTMLElement[];
    for (let i = socialMediaLinks.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [socialMediaLinks[i], socialMediaLinks[j]] = [socialMediaLinks[j], socialMediaLinks[i]];
    }
    // Remove existing links
    socialMediaContainer.innerHTML = '';
    // Show only the first four links
    const linksToShow = socialMediaLinks.slice(0, 4);
    linksToShow.forEach(link => socialMediaContainer.appendChild(link));
}

// to top function
function toTop(): void {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

// onvalidate function
function validateForm(): boolean {
    // Get form elements
    const form = document.forms.namedItem("contact") as HTMLFormElement;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const countrySelect = form.elements.namedItem("country") as HTMLSelectElement;
    // Validate the name field (no numbers or special characters)
    const name = nameInput.value;
    const namePattern = /^[a-zA-Z\s]+$/;
    if (!namePattern.test(name)) {
        alert("Please enter a valid name with only letters.");
        return false;
    }
    // Validate the country field (must select a country)
    const country = countrySelect.value;
    if (country === "") {
        alert("Please select a country.");
        return false;
    }
    return true;
}

// Function to format authors
function formatAuthors(authors: string[]): string {
    const maxAuthorsToShow = 5;
    if (authors.length > maxAuthorsToShow) {
        // Show first three authors and "et al." for others
        return `${authors.slice(0, 3).join(', ')} et al.`;
    } else {
        // Join all authors
        return authors.join(', ');
    }
}

// Function to format authors with special handling for "Zoheir Ziani"
function formatAuthorsWithHighlight(authors: string[]): string {
    const highlightedAuthor = "Zoheir Ziani";
    const formattedAuthors = authors.map(author => {
        if (author === highlightedAuthor) {
            return `<strong>${author}</strong>`;
        } else {
            return author;
        }
    });

    return formatAuthors(formattedAuthors);
}

