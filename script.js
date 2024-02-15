let timeoutId;

const typeaheadInput = document.getElementById('typeahead');
const suggestionsList = document.getElementById('suggestions-list');

typeaheadInput.addEventListener('input', () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(getSuggestions, 500);
});

typeaheadInput.addEventListener('blur', () => {
    // Clear suggestions when focus is lost
    clearSuggestions();
});

function getSuggestions() {
    const text = typeaheadInput.value.trim();

    if (text === '') {
        clearSuggestions();
        return;
    }

    fetch(`https://api.frontendexpert.io/api/fe/glossary-suggestions?text=${text}`)
        .then(response => response.json())
        .then(data => displaySuggestions(data))
        .catch(error => console.error('Error fetching suggestions:', error));
}

function displaySuggestions(suggestions) {
    suggestionsList.innerHTML = ''; // Clear previous suggestions

    if (suggestions.length === 0) {
        return;
    }

    // const ul = document.createElement('ul');
    suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        li.addEventListener('click', () => {
            typeaheadInput.value = suggestion;
            clearSuggestions();
        });
        suggestionsList.appendChild(li);
    });

    // suggestionsList.appendChild(ul);
}

function clearSuggestions() {
    suggestionsList.innerHTML = '';
}
