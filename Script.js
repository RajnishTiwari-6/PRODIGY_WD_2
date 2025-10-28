// Project data
const projects = [
    {
        title: "Weather App",
        description: "Real-time weather application with 7-day forecasts, interactive maps, and location-based alerts using OpenWeather API.",
        tech: ["HTML", "CSS", "JavaScript", "APIs"],
        github: "#",
        demo: "#",
        image: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png"
    },
    {
        title: "Data Visualization Dashboard",
        description: "Interactive analytics dashboard with real-time data visualization, charts, and customizable widgets for business insights.",
        tech: ["HTML", "CSS", "JavaScript", "D3.js"],
        github: "#",
        demo: "#",
        image: "https://via.placeholder.com/350x200"
    },
    {
        title: "Portfolio Website",
        description: "Modern, responsive personal portfolio website with smooth animations and SEO optimization.",
        tech: ["HTML", "CSS", "JavaScript"],
        github: "#",
        demo: "#",
        image: "https://via.placeholder.com/350x200"
    },
    {
        title: "E-Commerce Platform",
        description: "Full-stack e-commerce application with user authentication, product catalog, shopping cart, and payment integration.",
        tech: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"],
        github: "#",
        demo: "#",
        image: "https://via.placeholder.com/350x200"
    },
    {
        title: "Task Management System",
        description: "Collaborative task management app with real-time updates, team workspaces, and productivity analytics.",
        tech: ["HTML", "CSS", "JavaScript", "Firebase"],
        github: "#",
        demo: "#",
        image: "https://via.placeholder.com/350x200"
    }
];

// Load projects when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    setupMobileMenu();
    setupScrollAnimation();
});

// Function to load projects into the grid
function loadProjects() {
    const projectGrid = document.querySelector('.project-grid');
    
    projects.forEach(project => {
        const projectCard = `
            <div class="project-card">
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.demo}" target="_blank" class="demo-link">
                            <i class="fas fa-external-link-alt"></i>
                            Live Demo
                        </a>
                        <a href="${project.github}" target="_blank" class="code-link">
                            <i class="fab fa-github"></i>
                            View Code
                        </a>
                    </div>
                </div>
            </div>
        `;
        projectGrid.innerHTML += projectCard;
    });
}

// Mobile menu functionality
function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Navbar scroll effect
function setupScrollAnimation() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Add shadow to navbar on scroll
        if (window.scrollY > 20) {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        // Update active nav link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 60;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
