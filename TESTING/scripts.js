//Only god, aqentjus and chatGBT know how this works :D

document.addEventListener('DOMContentLoaded', function () {
    // Fetch and render posts
    fetch('posts.json')
        .then(response => response.json())
        .then(posts => fetchAndRenderPosts(posts))
        .then(() => startTypingAnimation())
        .catch(error => console.error('Error fetching or rendering posts:', error));
});

async function fetchAndRenderPosts(posts) {
    try {
        // Ensure consistent date parsing
        posts.forEach(post => {
            post.date = new Date(post.date);
        });

        // Fetch all markdown content concurrently
        const markdownPromises = posts.map(post => fetch(`posts/${post.fileName}`).then(response => response.text()));
        const markdownContents = await Promise.all(markdownPromises);

        // Parse and render posts
        const portfolioContainer = document.getElementById('portfolio-container');
        portfolioContainer.innerHTML = ''; // Clear existing posts

        // Sort posts by date in descending order
        posts.sort((a, b) => b.date - a.date);

        // Reverse the order of posts to display newest at the top
        posts.reverse();

        posts.forEach((post, index) => {
            const { title, date, description, fullContent } = parseMarkdownMetadata(markdownContents[index]);
            const postElement = createPostElement(title, date, description);
            postElement.addEventListener('click', () => showSingleView(title, date, description, fullContent));
            portfolioContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error fetching or rendering posts:', error);
    }
}


function parseMarkdownMetadata(markdown) {
    const lines = markdown.split('\n');
    const title = lines[0].replace('#', '').trim();
    const dateMatch = /Date:\s*(.+)/.exec(markdown);
    const date = dateMatch ? new Date(dateMatch[1]) : null;
    const descriptionMatch = /Description:\s*(.+)/.exec(markdown);
    const description = descriptionMatch ? descriptionMatch[1] : null;

    // Find the index of the line that starts with "Content:"
    const contentIndex = lines.findIndex(line => line.trim().startsWith('Content:'));
    const fullContent = contentIndex !== -1 ? lines.slice(contentIndex + 1).join('\n') : '';

    return { title, date, description, fullContent };
}

function createPostElement(title, date, description) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
        <h2>${title}</h2>
        <p>Date: ${date ? date.toLocaleDateString() : 'Unknown'}</p>
        <p>${description || 'No description available.'}</p>
    `;
    return postElement;
}

function showSingleView(title, date, description, fullContent) {
    const portfolioContainer = document.getElementById('portfolio-container');
    portfolioContainer.innerHTML = ''; // Clear existing posts

    const postElement = createPostElement(title, date, description);
    const contentElement = document.createElement('div');

    // Parse the markdown content and replace ![image](1.jpg) with <img src="1.jpg" alt="image">
    const parsedContent = parseMarkdownImages(fullContent);
    contentElement.innerHTML = parsedContent;

    postElement.appendChild(contentElement);
    portfolioContainer.appendChild(postElement);
}

function parseMarkdownImages(content) {
    // Regular expression to find markdown image syntax ![alt text](image url)
    const imageRegex = /!\[([^\]]+)\]\(([^)]+)\)/g;

    // Custom markdown syntax for additional space
    const spaceRegex = /\/\/\s*/g;

    return content.replace(imageRegex, '<img src="$2" alt="$1">').replace(spaceRegex, '<br><br>');
}

function startTypingAnimation() {
    // Add typing animation to the home page
    const animatedText = document.getElementById('animated-text');
    const texts = ["Networking Wizard","Python Programmer", "Web Developer","Used to work at WithSecure","Cybersecurity student","I hate the world: 'it just works'","Data hoarder", "I like to watch movies","Nerd", "You can find me on LinkedIn", "Huge fan of horology","You can also find me on Github","I like to learn new stuff","You can find me on Instagram", "Moro Alli ;D"];
    let index = 0;
    let currentText = '';
    let letterIndex = 0;

    function type() {
        if (letterIndex < texts[index].length) {
            currentText += texts[index].charAt(letterIndex);
            animatedText.innerHTML = currentText;
            letterIndex++;
            setTimeout(type, 50); // Adjust typing speed as needed
        } else {
            setTimeout(erase, 1000); // Wait before erasing
        }
    }

    function erase() {
        if (letterIndex > 0) {
            currentText = currentText.slice(0, -1);
            animatedText.innerHTML = currentText;
            letterIndex--;
            setTimeout(erase, 50); // Adjust erasing speed as needed
        } else {
            index = (index + 1) % texts.length;
            setTimeout(type, 500); // Wait before typing the next text
        }
    }

    setTimeout(type, 500); // Start typing animation
}
