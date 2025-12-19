// Iframe Toggle
function toggleIframe() {
    const iframeContainer = document.getElementById('iframeContainer');
    if (iframeContainer.style.display === 'none' || iframeContainer.style.display === '') {
        iframeContainer.style.display = 'flex'; // Use flex to center
    } else {
        iframeContainer.style.display = 'none';
    }
}

// Close iframe when clicking outside
document.addEventListener('DOMContentLoaded', function () {
    const iframeContainer = document.getElementById('iframeContainer');
    if (iframeContainer) {
        iframeContainer.addEventListener('click', function (e) {
            if (e.target === iframeContainer) {
                iframeContainer.style.display = 'none';
            }
        });
    }
});

// Drag and Drop Functionality
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    const dropZone = ev.target;

    if (dropZone.classList.contains('drop-zone')) {
        // Get the text content of the dragged item
        const codeText = draggedElement.querySelector('code').textContent;

        // Update drop zone
        dropZone.textContent = codeText;
        dropZone.classList.add('filled');
        dropZone.setAttribute('data-answer', data);

        // Hide the dragged element
        draggedElement.style.opacity = '0.3';
        draggedElement.draggable = false;
    }
}

// Check Drag and Drop Answer
function checkDragDrop() {
    const drop1 = document.getElementById('drop1');
    const drop2 = document.getElementById('drop2');
    const resultBox = document.getElementById('drag-drop-result');

    const answer1 = drop1.getAttribute('data-answer');
    const answer2 = drop2.getAttribute('data-answer');

    // Correct answers: option1 for drop1, option2 for drop2
    if (answer1 === 'option1' && answer2 === 'option2') {
        resultBox.className = 'result-box correct';
        resultBox.innerHTML = `
            <strong>✓ Correct!</strong><br>
            <p style="margin-top: 0.5rem;">The Fibonacci function uses:</p>
            <ol style="margin-top: 0.5rem;">
                <li><code>if (n <= 1)</code> as the base case to return n when n is 0 or 1</li>
                <li><code>return fibonacci(n-1) + fibonacci(n-2);</code> as the recursive case to calculate the sum of previous two numbers</li>
            </ol>
        `;
    } else {
        resultBox.className = 'result-box incorrect';
        resultBox.innerHTML = `
            <strong>✗ Incorrect</strong><br>
            <p style="margin-top: 0.5rem;">Try again! Remember:</p>
            <ul style="margin-top: 0.5rem;">
                <li>The first blank should check if n is less than or equal to 1 (base case)</li>
                <li>The second blank should return the sum of the previous two Fibonacci numbers (recursive case)</li>
            </ul>
        `;
    }

    resultBox.style.display = 'block';
}

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 20;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Print functionality
function printGuide() {
    window.print();
}

// Copy code to clipboard
function copyCode(button) {
    const codeBlock = button.previousElementSibling.querySelector('code');
    const code = codeBlock.textContent;

    navigator.clipboard.writeText(code).then(function () {
        button.textContent = '✓ Copied!';
        button.style.backgroundColor = '#34a853';

        setTimeout(function () {
            button.textContent = 'Copy Code';
            button.style.backgroundColor = '#1a73e8';
        }, 2000);
    }).catch(function (err) {
        console.error('Failed to copy code: ', err);
    });
}

// Add copy buttons to code blocks
document.addEventListener('DOMContentLoaded', function () {
    const codeContainers = document.querySelectorAll('.code-container');

    codeContainers.forEach(container => {
        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'Copy Code';
        copyBtn.className = 'btn-copy-code';
        copyBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 6px 12px;
            background-color: #1a73e8;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 0.85rem;
            cursor: pointer;
            font-family: 'Inter', sans-serif;
            transition: background-color 0.2s ease;
        `;

        copyBtn.addEventListener('mouseenter', function () {
            this.style.backgroundColor = '#1557b0';
        });

        copyBtn.addEventListener('mouseleave', function () {
            if (this.textContent !== '✓ Copied!') {
                this.style.backgroundColor = '#1a73e8';
            }
        });

        copyBtn.addEventListener('click', function () {
            copyCode(this);
        });

        container.style.position = 'relative';
        container.appendChild(copyBtn);
    });
});

// Search functionality (optional enhancement)
function searchGuide() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const text = section.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

// Progress tracker
window.addEventListener('scroll', function () {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    let progressBar = document.getElementById('progressBar');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'progressBar';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: #2383e2;
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }

    progressBar.style.width = scrolled + '%';
});

// Keyboard shortcuts
document.addEventListener('keydown', function (e) {
    // Ctrl/Cmd + P to print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        printGuide();
    }

    // Escape to close iframe
    if (e.key === 'Escape') {
        const iframeContainer = document.getElementById('iframeContainer');
        if (iframeContainer && iframeContainer.style.display === 'block') {
            iframeContainer.style.display = 'none';
        }
    }
});

// Table of contents active link
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.table-of-contents a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
            link.style.fontWeight = '600';
            link.style.color = '#1557b0';
        } else {
            link.style.fontWeight = '400';
            link.style.color = '#1a73e8';
        }
    });
});

console.log('ICP Exam Guide loaded successfully! Guide prepared by Shantanu.');
