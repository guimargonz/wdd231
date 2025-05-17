// Footer - Current Year
const currentYearSpan = document.getElementById('currentyear');
const currentYear = new Date().getFullYear();
if (currentYearSpan) {
    currentYearSpan.textContent = currentYear;
}

// Footer - Last Modified Date
const lastModifiedParagraph = document.getElementById('lastModified');
if (lastModifiedParagraph) {
    lastModifiedParagraph.textContent = "Last Modified: " + document.lastModified;
}