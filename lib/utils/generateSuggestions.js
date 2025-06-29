export async function generateProjectSuggestions(resumeData, scholarData) {
  const suggestions = [];

  const skills = resumeData?.skills || [];
  const interests = scholarData?.profile?.interests || [];
  const publications = scholarData?.publications || [];

  suggestions.push(...generateSkillBasedProjects(skills));

  if (interests.length > 0 || publications.length > 0) {
    suggestions.push(...generateResearchBasedProjects(interests, publications));
  }

  suggestions.push(...generateCollaborationSuggestions(skills, interests));
  suggestions.push(...generateCrossDomainProjects(skills, interests));

  return suggestions.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 12);
}

function generateSkillBasedProjects(skills) {
  const projects = [];
  const skillLower = skills.map(s => s.toLowerCase());

  if (skillLower.some(s => ['javascript', 'react', 'node.js', 'html', 'css'].includes(s))) {
    projects.push({
      title: 'Full-Stack Research Collaboration Platform',
      description:
        'Build a platform for researchers to collaborate, share papers, and manage projects.',
      technologies: skills.filter(s =>
        ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS', 'MongoDB', 'PostgreSQL'].includes(s)
      ),
      difficulty: 'Intermediate',
      estimatedTime: '2-3 months',
      category: 'Web Development',
      relevanceScore: calculateRelevanceScore(skills, ['JavaScript', 'React', 'Node.js']),
    });
  }

  if (skillLower.some(s => ['python', 'machine learning', 'tensorflow', 'pytorch'].includes(s))) {
    projects.push(
      {
        title: 'Academic Paper Recommendation System',
        description: 'Develop an ML model that recommends research papers based on user interests.',
        technologies: skills.filter(s =>
          ['Python', 'Machine Learning', 'TensorFlow', 'PyTorch'].includes(s)
        ),
        difficulty: 'Advanced',
        estimatedTime: '3-4 months',
        category: 'Machine Learning',
        relevanceScore: calculateRelevanceScore(skills, ['Python', 'Machine Learning']),
      },
      {
        title: 'Citation Network Analysis Tool',
        description: 'Analyze citation networks to identify research trends using GNNs.',
        technologies: skills.filter(s =>
          ['Python', 'Machine Learning', 'Data Science'].includes(s)
        ),
        difficulty: 'Advanced',
        estimatedTime: '2-3 months',
        category: 'Data Science',
        relevanceScore: calculateRelevanceScore(skills, ['Python', 'Data Science']),
      }
    );
  }

  if (skillLower.some(s => ['python', 'data science', 'sql'].includes(s))) {
    projects.push({
      title: 'Research Impact Dashboard',
      description: 'Interactive dashboard for visualizing research impact metrics.',
      technologies: skills.filter(s => ['Python', 'Data Science', 'SQL'].includes(s)),
      difficulty: 'Intermediate',
      estimatedTime: '1-2 months',
      category: 'Data Visualization',
      relevanceScore: calculateRelevanceScore(skills, ['Python', 'Data Science']),
    });
  }

  if (skillLower.some(s => ['docker', 'aws', 'kubernetes', 'devops'].includes(s))) {
    projects.push({
      title: 'Scalable Research Computing Platform',
      description: 'Deploy cloud-based platform for computational research workloads.',
      technologies: skills.filter(s => ['Docker', 'AWS', 'Kubernetes', 'DevOps'].includes(s)),
      difficulty: 'Advanced',
      estimatedTime: '3-4 months',
      category: 'Cloud Computing',
      relevanceScore: calculateRelevanceScore(skills, ['Docker', 'AWS', 'DevOps']),
    });
  }

  return projects;
}

function generateResearchBasedProjects(interests, publications) {
  const projects = [];
  const interestsLower = interests.map(i => i.toLowerCase());

  if (
    interestsLower.some(
      i => i.includes('artificial intelligence') || i.includes('machine learning')
    )
  ) {
    projects.push({
      title: 'Automated Research Paper Summarization',
      description: 'AI system for generating summaries of research papers.',
      technologies: ['Python', 'NLP', 'Transformers', 'PyTorch'],
      difficulty: 'Advanced',
      estimatedTime: '4-6 months',
      category: 'AI Research',
      relevanceScore: 9,
    });
  }

  if (interestsLower.some(i => i.includes('computer vision') || i.includes('image'))) {
    projects.push({
      title: 'Scientific Image Analysis Pipeline',
      description: 'Computer vision pipeline for extracting data from scientific images.',
      technologies: ['Python', 'OpenCV', 'TensorFlow', 'Deep Learning'],
      difficulty: 'Advanced',
      estimatedTime: '3-4 months',
      category: 'Computer Vision',
      relevanceScore: 8,
    });
  }

  if (
    interestsLower.some(i => i.includes('bioinformatics') || i.includes('computational biology'))
  ) {
    projects.push({
      title: 'Genomic Data Analysis Platform',
      description: 'Interactive platform for analyzing genomic data.',
      technologies: ['Python', 'R', 'Bioinformatics Tools', 'Web Development'],
      difficulty: 'Advanced',
      estimatedTime: '4-5 months',
      category: 'Bioinformatics',
      relevanceScore: 8,
    });
  }

  return projects;
}

function generateCollaborationSuggestions(skills, interests) {
  return [
    {
      title: 'Open Source Research Tools',
      description: 'Contribute to open-source tools for academic research.',
      technologies: skills.slice(0, 5),
      difficulty: 'Beginner to Advanced',
      estimatedTime: 'Ongoing',
      category: 'Open Source',
      relevanceScore: 7,
    },
    {
      title: 'Interdisciplinary Research Project',
      description: 'Collaborate across fields to solve complex problems.',
      technologies: ['Various based on collaboration'],
      difficulty: 'Intermediate',
      estimatedTime: '3-6 months',
      category: 'Collaboration',
      relevanceScore: 6,
    },
  ];
}

function generateCrossDomainProjects(skills, interests) {
  return [
    {
      title: 'Academic Social Network Platform',
      description: 'Specialized social network for researchers.',
      technologies: ['Full-Stack Development', 'Database Design', 'API Development'],
      difficulty: 'Advanced',
      estimatedTime: '4-6 months',
      category: 'Social Platform',
      relevanceScore: 7,
    },
    {
      title: 'Research Funding Tracker',
      description: 'Track and analyze research funding opportunities.',
      technologies: ['Web Scraping', 'Data Analysis', 'Visualization'],
      difficulty: 'Intermediate',
      estimatedTime: '2-3 months',
      category: 'Data Platform',
      relevanceScore: 6,
    },
  ];
}

function calculateRelevanceScore(userSkills, requiredSkills) {
  const userSkillsLower = userSkills.map(s => s.toLowerCase());
  const matching = requiredSkills.filter(skill => userSkillsLower.includes(skill.toLowerCase()));
  const baseScore = (matching.length / requiredSkills.length) * 10;
  return Math.min(10, Math.max(1, Math.round(baseScore)));
}
