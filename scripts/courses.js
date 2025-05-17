const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to the world of computer programming and problem solving. Students will learn essentials of programming including data types, control structures, functions, and problem decomposition. Students will use the Python programming language to develop simple scripts. No prior programming experience is assumed.',
        technology: ['Python'],
        completed: true // Change to true if you have completed this course
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the a broad range of fundamental web technologies including HTML, CSS, design, accessibility, and basic JavaScript. The course focuses on current best practices and professional web development standards for creating well structured, accessible, and responsive web sites.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true // Change to true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior programming experience and focuses on functional programming techniques. Students will learn how to think about problems from a functional programming perspective. Students will also learn how to design, implement, and test functions. The course also teaches students how to effectively debug programs. Students will use the Python programming language to develop programs.',
        technology: ['Python'],
        completed: true // Change to true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior programming experience and focuses on object-oriented programming techniques. Students will learn how to think about problems from an object-oriented perspective. Students will also learn how to design, implement, and test classes. The course also teaches students how to effectively debug programs. Students will use the Python programming language to develop programs.',
        technology: ['Python'],
        completed: false // Change to true if completed
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds upon the WDD 130 - Web Fundamentals course. It focuses on using JavaScript to dynamically manipulate the Document Object Model (DOM) in a web browser. Students will learn how to make web pages interactive and respond to user events. The course covers fundamental JavaScript concepts, working with the DOM, handling events, and using JSON for data exchange.',
        technology: ['JavaScript', 'DOM', 'JSON'],
        completed: false // Change to true if completed
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course is the first in a series of two courses that build upon the WDD 130 and WDD 131 courses. It focuses on the client-side of web development using HTML, CSS, and JavaScript. Students will learn to build responsive and interactive user interfaces. Topics include modern CSS layouts (Flexbox, Grid), JavaScript frameworks/libraries introduction (though not deeply covered), and best practices in frontend development.',
        technology: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
        completed: false // This is the current course, so likely false
    }
];

const courseCardsContainer = document.getElementById('course-cards-container');
const totalCreditsSpan = document.getElementById('credits-value');

const filterAllButton = document.getElementById('filter-all');
const filterWDDButton = document.getElementById('filter-wdd');
const filterCSEButton = document.getElementById('filter-cse');

function displayCourses(filteredCourses) {
    if (!courseCardsContainer) return;
    courseCardsContainer.innerHTML = ''; // Clear existing cards

    if (filteredCourses.length === 0) {
        courseCardsContainer.innerHTML = '<p>No courses match the current filter.</p>';
        if (totalCreditsSpan) totalCreditsSpan.textContent = '0';
        return;
    }

    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        if (course.completed) {
            card.classList.add('completed');
        }

        let techList = course.technology.join(', ');

        card.innerHTML = `
            <h3>${course.subject} ${course.number}: ${course.title}</h3>
            <p class="credits">Credits: ${course.credits}</p>
            <p>${course.description}</p>
            <p><strong>Technologies:</strong> ${techList}</p>
            <p class="status">Status: ${course.completed ? 'Completed' : 'Not Completed'}</p>
        `;
        courseCardsContainer.appendChild(card);
    });

    // Calculate and display total credits for the filtered courses
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    if (totalCreditsSpan) {
        totalCreditsSpan.textContent = totalCredits;
    }
}

// Event Listeners for filter buttons
if (filterAllButton) {
    filterAllButton.addEventListener('click', () => displayCourses(courses));
}
if (filterWDDButton) {
    filterWDDButton.addEventListener('click', () => {
        const wddCourses = courses.filter(course => course.subject === 'WDD');
        displayCourses(wddCourses);
    });
}
if (filterCSEButton) {
    filterCSEButton.addEventListener('click', () => {
        const cseCourses = courses.filter(course => course.subject === 'CSE');
        displayCourses(cseCourses);
    });
}

// Initial display of all courses
if (courseCardsContainer) { // Only run if the container exists on the page
  displayCourses(courses);
}