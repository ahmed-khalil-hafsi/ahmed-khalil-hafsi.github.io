// Negotiator Style Assessment Tool
// This JavaScript file handles the interactive assessment for determining negotiation style

document.addEventListener('DOMContentLoaded', function() {
  // Assessment state
  let userResponses = {};
  let styleScores = {
    competing: 0,
    accommodating: 0,
    avoiding: 0,
    collaborating: 0,
    compromising: 0
  };

  // DOM elements
  const assessmentForm = document.getElementById('negotiation-style-form');
  const resultsSection = document.querySelector('.results-section');
  const primaryStyleElement = document.getElementById('primary-style');
  const secondaryStyleElement = document.getElementById('secondary-style');
  const primaryStyleDescription = document.getElementById('primary-style-description');
  const secondaryStyleDescription = document.getElementById('secondary-style-description');
  const strengthsList = document.getElementById('strengths-list');
  const challengesList = document.getElementById('challenges-list');
  const adaptationStrategies = document.getElementById('adaptation-strategies');
  const developmentRecommendations = document.getElementById('development-recommendations');
  const developmentActions = document.getElementById('development-actions');
  const saveResultsButton = document.getElementById('save-results');
  const printResultsButton = document.getElementById('print-results');

  // Style descriptions and characteristics
  const styleData = {
    competing: {
      title: "Competing",
      description: "You tend to approach negotiations with a focus on achieving your own goals, often using assertive tactics and direct communication. You're comfortable standing your ground and advocating strongly for your position.",
      strengths: [
        "Effective in crisis situations requiring quick decisions",
        "Good at defending against highly competitive counterparts",
        "Able to achieve goals when resources are limited",
        "Willing to take unpopular stands when necessary",
        "Direct and clear in communication"
      ],
      challenges: [
        "May damage relationships through overly aggressive tactics",
        "Can miss creative solutions by focusing too much on winning",
        "Might create resistance and defensiveness in counterparts",
        "May overlook long-term relationship consequences",
        "Could develop reputation as difficult to work with"
      ],
      development: [
        "Practice active listening techniques to better understand others' perspectives",
        "Experiment with asking more questions before advocating your position",
        "Work on recognizing situations where a competitive approach is less effective",
        "Develop skills in exploring interests rather than focusing solely on positions",
        "Practice framing proposals in terms of mutual benefit"
      ]
    },
    accommodating: {
      title: "Accommodating",
      description: "You tend to prioritize relationships over substantive outcomes in negotiations. You're willing to make concessions to maintain harmony and are attentive to others' needs and concerns.",
      strengths: [
        "Builds and preserves positive relationships",
        "Creates goodwill that may benefit future interactions",
        "Helps resolve conflicts quickly",
        "Shows generosity and consideration",
        "Effective when the issue is more important to the other party"
      ],
      challenges: [
        "May sacrifice important interests unnecessarily",
        "Can create resentment if your needs are consistently unmet",
        "Might be taken advantage of by competitive negotiators",
        "Could be perceived as weak or indecisive",
        "May lead to suboptimal solutions"
      ],
      development: [
        "Practice articulating your own interests and needs more clearly",
        "Set clear boundaries about what you can and cannot accommodate",
        "Develop techniques for making concessions conditionally rather than unilaterally",
        "Work on distinguishing between relationship preservation and unnecessary yielding",
        "Practice recognizing when accommodation is strategic versus habitual"
      ]
    },
    avoiding: {
      title: "Avoiding",
      description: "You tend to postpone or sidestep conflicts in negotiations. You may prefer to withdraw from potentially contentious situations and are comfortable delaying decisions when tensions arise.",
      strengths: [
        "Prevents escalation of conflicts when emotions are high",
        "Creates time to gather more information before engaging",
        "Effective for trivial issues not worth the time to address",
        "Can be strategic when postponing would improve your position",
        "Preserves energy for more important matters"
      ],
      challenges: [
        "Important issues may remain unresolved",
        "Can create frustration in counterparts seeking resolution",
        "May miss opportunities that require timely action",
        "Could be perceived as uninterested or uncommitted",
        "Problems might grow larger when left unaddressed"
      ],
      development: [
        "Develop skills to distinguish between strategic avoidance and habitual avoidance",
        "Practice addressing smaller conflicts to build confidence",
        "Learn techniques for managing emotions during difficult conversations",
        "Create structured approaches for addressing issues you tend to avoid",
        "Work on direct but diplomatic communication methods"
      ]
    },
    collaborating: {
      title: "Collaborating",
      description: "You tend to approach negotiations with a focus on finding solutions that satisfy all parties involved. You value creative problem-solving and are willing to invest time in understanding different perspectives.",
      strengths: [
        "Creates innovative solutions that maximize value for all parties",
        "Builds strong relationships through mutual problem-solving",
        "Addresses underlying interests rather than just positions",
        "Leads to high commitment to implemented solutions",
        "Effective for complex issues with multiple dimensions"
      ],
      challenges: [
        "Can be time-consuming and resource-intensive",
        "May be inappropriate for simple issues with clear solutions",
        "Requires willing participation from all parties",
        "Can be difficult when time is limited",
        "Might be exploited by counterparts not acting in good faith"
      ],
      development: [
        "Develop skills in recognizing when collaboration is and isn't appropriate",
        "Practice more efficient collaborative processes for simpler issues",
        "Learn to balance relationship-building with task accomplishment",
        "Work on helping reluctant counterparts engage in collaborative processes",
        "Develop techniques for moving from positions to interests more quickly"
      ]
    },
    compromising: {
      title: "Compromising",
      description: "When collaboration isn't feasible, you often seek middle ground solutions that provide fair outcomes for all parties. You're pragmatic and willing to give some ground to reach agreement.",
      strengths: [
        "Finds expedient solutions when time is limited",
        "Creates perception of fairness through mutual concessions",
        "Effective when parties have equal power",
        "Provides a fallback when collaboration isn't working",
        "Practical approach for moderately important issues"
      ],
      challenges: [
        "May leave value on the table compared to collaborative solutions",
        "Can focus on positions rather than underlying interests",
        "Might result in agreements that fully satisfy no one",
        "Could become a habitual approach even when better options exist",
        "May be perceived as lacking commitment to optimal outcomes"
      ],
      development: [
        "Practice exploring interests before moving to compromise solutions",
        "Develop skills in distinguishing when compromise is and isn't appropriate",
        "Learn to use objective criteria to ensure compromises are fair",
        "Work on creative option generation before settling on middle ground",
        "Practice framing compromises in terms of mutual gains rather than mutual sacrifice"
      ]
    }
  };

  // Question mapping to styles
  const questionMapping = {
    // Approach to Conflict
    "q1": { style: "avoiding", reverse: false },
    "q2": { style: "competing", reverse: false },
    "q3": { style: "collaborating", reverse: false },
    "q4": { style: "accommodating", reverse: false },
    "q5": { style: "compromising", reverse: false },
    
    // Communication Style
    "q6": { style: "competing", reverse: false },
    "q7": { style: "collaborating", reverse: false },
    "q8": { style: "avoiding", reverse: false },
    "q9": { style: "compromising", reverse: false },
    "q10": { style: "collaborating", reverse: false },
    
    // Additional questions would be mapped here
    // For demonstration, we'll add some mappings for questions that would be in a complete assessment
    "q11": { style: "competing", reverse: false },
    "q12": { style: "accommodating", reverse: false },
    "q13": { style: "avoiding", reverse: false },
    "q14": { style: "collaborating", reverse: false },
    "q15": { style: "compromising", reverse: false },
    "q16": { style: "competing", reverse: false },
    "q17": { style: "accommodating", reverse: false },
    "q18": { style: "avoiding", reverse: false },
    "q19": { style: "collaborating", reverse: false },
    "q20": { style: "compromising", reverse: false },
    "q21": { style: "competing", reverse: false },
    "q22": { style: "accommodating", reverse: false },
    "q23": { style: "avoiding", reverse: false },
    "q24": { style: "collaborating", reverse: false },
    "q25": { style: "compromising", reverse: false },
    "q26": { style: "competing", reverse: false },
    "q27": { style: "accommodating", reverse: false },
    "q28": { style: "avoiding", reverse: false },
    "q29": { style: "collaborating", reverse: false },
    "q30": { style: "compromising", reverse: false }
  };

  // Initialize the assessment
  function initAssessment() {
    if (assessmentForm) {
      assessmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        processAssessment();
      });
    }
    
    if (saveResultsButton) {
      saveResultsButton.addEventListener('click', saveResults);
    }
    
    if (printResultsButton) {
      printResultsButton.addEventListener('click', printResults);
    }
  }

  // Process the assessment form
  function processAssessment() {
    // Reset scores
    for (let style in styleScores) {
      styleScores[style] = 0;
    }
    
    // Collect responses
    const formData = new FormData(assessmentForm);
    for (let [name, value] of formData.entries()) {
      userResponses[name] = parseInt(value);
      
      // Update style scores
      if (questionMapping[name]) {
        const mapping = questionMapping[name];
        const score = mapping.reverse ? (6 - parseInt(value)) : parseInt(value);
        styleScores[mapping.style] += score;
      }
    }
    
    // Normalize scores based on number of questions per style
    const styleQuestionCounts = {};
    for (let question in questionMapping) {
      const style = questionMapping[question].style;
      styleQuestionCounts[style] = (styleQuestionCounts[style] || 0) + 1;
    }
    
    for (let style in styleScores) {
      if (styleQuestionCounts[style]) {
        styleScores[style] = styleScores[style] / styleQuestionCounts[style];
      }
    }
    
    // Display results
    displayResults();
  }

  // Display assessment results
  function displayResults() {
    // Sort styles by score
    const sortedStyles = Object.entries(styleScores)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);
    
    const primaryStyle = sortedStyles[0];
    const secondaryStyle = sortedStyles[1];
    
    // Update results elements
    if (primaryStyleElement) {
      primaryStyleElement.textContent = styleData[primaryStyle].title;
    }
    
    if (secondaryStyleElement) {
      secondaryStyleElement.textContent = styleData[secondaryStyle].title;
    }
    
    if (primaryStyleDescription) {
      primaryStyleDescription.textContent = styleData[primaryStyle].description;
    }
    
    if (secondaryStyleDescription) {
      secondaryStyleDescription.textContent = styleData[secondaryStyle].description;
    }
    
    // Update strengths list
    if (strengthsList) {
      strengthsList.innerHTML = '';
      styleData[primaryStyle].strengths.forEach(strength => {
        const li = document.createElement('li');
        li.textContent = strength;
        strengthsList.appendChild(li);
      });
      
      // Add a couple from secondary style
      styleData[secondaryStyle].strengths.slice(0, 2).forEach(strength => {
        const li = document.createElement('li');
        li.textContent = strength;
        strengthsList.appendChild(li);
      });
    }
    
    // Update challenges list
    if (challengesList) {
      challengesList.innerHTML = '';
      styleData[primaryStyle].challenges.forEach(challenge => {
        const li = document.createElement('li');
        li.textContent = challenge;
        challengesList.appendChild(li);
      });
    }
    
    // Update adaptation strategies
    if (adaptationStrategies) {
      adaptationStrategies.innerHTML = generateAdaptationStrategies(primaryStyle, secondaryStyle);
    }
    
    // Update development recommendations
    if (developmentRecommendations) {
      developmentRecommendations.innerHTML = generateDevelopmentRecommendations(primaryStyle, sortedStyles);
    }
    
    // Update development actions
    if (developmentActions) {
      developmentActions.innerHTML = '';
      styleData[primaryStyle].development.slice(0, 3).forEach(action => {
        const li = document.createElement('li');
        li.textContent = action;
        developmentActions.appendChild(li);
      });
    }
    
    // Create chart data for visualization
    createStyleChart(styleScores);
    
    // Show results section
    if (resultsSection) {
      resultsSection.style.display = 'block';
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Generate adaptation strategies based on styles
  function generateAdaptationStrategies(primaryStyle, secondaryStyle) {
    const adaptationContent = {
      competing: {
        heading: "Adapting Your Competitive Approach",
        content: `
          <p>Your competitive style can be highly effective in certain situations, but may need adaptation in others:</p>
          <ul>
            <li><strong>When dealing with relationship-focused counterparts:</strong> Take time for rapport-building and frame your proposals in terms of mutual benefit.</li>
            <li><strong>When facing complex problems:</strong> Shift toward your ${styleData[secondaryStyle].title.toLowerCase()} tendencies to explore creative solutions that address multiple interests.</li>
            <li><strong>In long-term partnerships:</strong> Balance advocacy with inquiry, asking questions to understand others' perspectives before presenting your position.</li>
            <li><strong>In cross-cultural contexts:</strong> Research cultural norms around directness and competition, adjusting your approach accordingly.</li>
          </ul>
        `
      },
      accommodating: {
        heading: "Adapting Your Accommodating Approach",
        content: `
          <p>Your accommodating style builds positive relationships, but may need adaptation in certain contexts:</p>
          <ul>
            <li><strong>When your interests are critical:</strong> Draw on your ${styleData[secondaryStyle].title.toLowerCase()} tendencies to ensure your key needs are
(Content truncated due to size limit. Use line ranges to read in chunks)