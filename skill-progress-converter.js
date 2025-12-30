/**
 * Convert skill tags to progress bars
 * This script automatically converts the old skill-tag elements to new progress bar design
 */

// Skill percentages mapping
const skillPercentages = {
    // Programming
    'Python': 90,
    'C': 75,
    'Java': 75,
    'SQL': 75,
    // Web
    'HTML': 95,
    'CSS': 95,
    'JavaScript': 80,
    'ReactJS': 80,
    // ML & AI
    'PyTorch': 90,
    'Scikit-learn': 90,
    'HuggingFace': 80,
    'TensorFlow': 80,
    'OpenCV': 80,
    // Gen AI
    'LLMs': 90,
    'SLMs': 90,
    'Prompt Engineering': 95,
    'Model Fine-tuning': 85,
    'RAG': 85,
    'Model Optimization': 85,
    // Data Science
    'NumPy': 95,
    'Pandas': 95,
    'Matplotlib': 85,
    'Data Preprocessing': 85,
    'Feature Engineering': 85,
    // Tools
    'Docker': 80,
    'n8n': 70,
    'VS Code': 95,
    'MS Office': 85,
    'Canva': 95,
    'Jupyter Notebook': 95,
    // Soft Skills
    'Leadership': 90,
    'Problem Solving': 95,
    'Creative Thinking': 95,
    'Critical Thinking': 95,
    'Teamwork': 95,
    'Literature Review': 90,
    'Experimental Design': 85
};

function convertSkillTagsToProgressBars() {
    // Find all skill-tags elements
    const skillTags = document.querySelectorAll('.skill-tag');

    skillTags.forEach(tag => {
        // Get skill information
        const icon = tag.querySelector('i');
        const skillNameSpan = tag.querySelectorAll('span')[0];
        const skillName = skillNameSpan.textContent.trim();
        const percentage = skillPercentages[skillName] || 75; // Default to 75% if not found

        // Create new skill-item structure
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';

        skillItem.innerHTML = `
            <div class="skill-header">
                <span class="skill-name">
                    ${icon ? icon.outerHTML : ''}
                    ${skillName}
                </span>
                <span class="skill-percentage">${percentage}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: 0%"  data-width="${percentage}%"></div>
            </div>
        `;

        // Replace the old tag with new item
        tag.parentNode.replaceChild(skillItem, tag);
    });

    // Animate progress bars after a short delay
    setTimeout(() => {
        const progressFills = document.querySelectorAll('.progress-fill');
        progressFills.forEach(fill => {
            const targetWidth = fill.getAttribute('data-width');
            fill.style.width = targetWidth;
        });
    }, 200);
}

// Run conversion when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', convertSkillTagsToProgressBars);
} else {
    convertSkillTagsToProgressBars();
}
