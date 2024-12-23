/*================ toggle icon navbar =================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/*================ scroll sections avtive link =================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
    /*================== sticky navbar ==================*/
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    /*================== remove toggle icon and navbar when click navbar link (scroll) ==================*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

};

/*================== scroll reveal ==================*/
ScrollReveal({ 
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top'});
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom'});
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left'});
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right'});

/*================== typed js ==================*/
const typed = new Typed('.multiple-text', {
    strings: ['Software Engineer', 'Web Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});



const year = new Date().getFullYear();
document.getElementById("currentyear").textContent = year;


const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = `Last Modification: ${lastModified}`;


const courses = [
    {
        subject: 'CSE',
        number: 110,
        className: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        className: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        className: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        className: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        className: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        className: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];


// Function to create each class card
function createClassCard(course) {
    const container = document.querySelector('.services-container');

    const figure = document.createElement('div');
    figure.classList.add('services-box'); // Add a class for easier styling

    const subject = document.createElement('h3');
    subject.textContent = `${course.subject} ${course.number}`;
    figure.appendChild(subject);

    container.appendChild(figure);
}

// Function to display course details in modal
function displayCourseDetails(course) {
    const courseDetails = document.querySelector('dialog.course-details');
    console.log(courseDetails); // Esto debería mostrar el elemento en la consola si existe

    if (!courseDetails) {
        console.error('El elemento dialog.course-details no fue encontrado.');
        return;
    }    courseDetails.innerHTML = `
        <button id="closeModal">❌</button>
        <h1>${course.subject} ${course.number}</h1>
        <h3>${course.className}</h3>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Certificate:</strong> ${course.certificate}</p>
        <p><strong>Description:</strong> ${course.description}</p>
        <p><strong>Technology:</strong> ${course.technology.join(', ')}</p>
    `;

    courseDetails.showModal();

    // Close modal when clicking the close button
    document.getElementById('closeModal').addEventListener('click', () => {
        courseDetails.close();
    });

    // Close modal when clicking outside of it
    courseDetails.addEventListener('click', (e) => {
        if (e.target === courseDetails) {
            courseDetails.close();
        }
    });
}

// Function to add event listeners to each class card after filtering
function addCardClickEvents() {
    const cards = document.querySelectorAll('.services-box');
    cards.forEach(card => {
        const courseId = card.querySelector('h3').textContent.split(' ')[1]; // Get course number
        const course = courses.find(c => c.number == courseId);
        if (course) {
            card.addEventListener('click', () => displayCourseDetails(course));
        }
    });
}

function showTotalCredits() {
    const totalCredits = courses.reduce((total, clase) => total + clase.credits, 0);
    document.getElementById('creditCount').textContent = totalCredits;
}

showTotalCredits();

document.querySelector('.filter-classes').addEventListener('click', function(event) {
    event.preventDefault();

    if (event.target.tagName === 'A') {
        const filter = event.target.textContent.toLowerCase();
        const container = document.querySelector('.services-container');
        container.innerHTML = ''; // Clear existing content

        let filteredClasses;

        switch (filter) {
            case 'all':
                filteredClasses = courses;
                break;
            case 'cse':
                filteredClasses = courses.filter(clases => clases.subject === 'CSE');
                break;
            case 'wdd':
                filteredClasses = courses.filter(clases => clases.subject === 'WDD');
                break;
            default:
                filteredClasses = courses;
        }

        filteredClasses.forEach(createClassCard);
        addCardClickEvents(); // Reapply click events after filtering
    }
});

// Initial card rendering and event binding
courses.forEach(createClassCard);
addCardClickEvents();