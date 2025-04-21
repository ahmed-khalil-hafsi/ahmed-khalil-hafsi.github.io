// Interactive Exercise: Influence Strategy Role-Play
// This JavaScript file handles the interactive exercise for the Behavioral Tactics module

document.addEventListener('DOMContentLoaded', function() {
  // Exercise state
  let currentScenario = 0;
  let userChoices = [];
  let score = {
    relationship: 0,
    outcome: 0,
    ethics: 0
  };

  // DOM elements
  const scenarioContainer = document.getElementById('scenario-container');
  const optionsContainer = document.getElementById('options-container');
  const feedbackContainer = document.getElementById('feedback-container');
  const progressIndicator = document.getElementById('progress-indicator');
  const nextButton = document.getElementById('next-button');
  const resultsContainer = document.getElementById('results-container');

  // Scenario data
  const scenarios = [
    {
      id: 1,
      situation: "The client mentions they've received a lower quote from a competitor.",
      question: "How do you respond to this information?",
      options: [
        {
          id: "a",
          text: "Immediately offer to match the competitor's price.",
          feedback: "This accommodating response may secure the deal but sacrifices your margin unnecessarily. Consider exploring the value proposition before adjusting price.",
          scores: { relationship: 1, outcome: -1, ethics: 1 }
        },
        {
          id: "b",
          text: "Question the quality and service level of the competitor's offering.",
          feedback: "This competitive approach might create defensiveness. While it's important to differentiate your offering, direct criticism of competitors can damage trust.",
          scores: { relationship: -1, outcome: 0, ethics: 0 }
        },
        {
          id: "c",
          text: "Ask what aspects of the competitor's proposal are most appealing to them.",
          feedback: "This collaborative approach helps uncover the client's underlying interests and priorities, allowing you to address their specific concerns rather than just competing on price.",
          scores: { relationship: 2, outcome: 2, ethics: 2 }
        },
        {
          id: "d",
          text: "Emphasize that several other clients have chosen your solution over competitors recently.",
          feedback: "This uses social proof as an influence tactic, which can be effective but should be backed by specific examples to avoid seeming manipulative.",
          scores: { relationship: 0, outcome: 1, ethics: 1 }
        }
      ]
    },
    {
      id: 2,
      situation: "The client is concerned about the implementation timeline for your software solution.",
      question: "How do you address their concern?",
      options: [
        {
          id: "a",
          text: "Create artificial urgency by suggesting prices will increase next month.",
          feedback: "This hard bargaining tactic may create pressure but risks damaging trust if the deadline is perceived as arbitrary or manipulative.",
          scores: { relationship: -2, outcome: 0, ethics: -2 }
        },
        {
          id: "b",
          text: "Offer a phased implementation approach with clear milestones.",
          feedback: "This collaborative solution addresses their concern directly while providing flexibility and transparency. It demonstrates understanding of their needs.",
          scores: { relationship: 2, outcome: 2, ethics: 2 }
        },
        {
          id: "c",
          text: "Point out that your implementation timeline is standard in the industry.",
          feedback: "Using legitimacy (industry standards) can be effective, but this approach doesn't address their specific concerns or explore underlying interests.",
          scores: { relationship: 0, outcome: 1, ethics: 1 }
        },
        {
          id: "d",
          text: "Suggest they speak with reference clients who had similar concerns initially.",
          feedback: "This uses social proof effectively and provides evidence rather than just assertions. It addresses their concern while building credibility.",
          scores: { relationship: 1, outcome: 2, ethics: 2 }
        }
      ]
    },
    {
      id: 3,
      situation: "The client requests extensive customization that would strain your development resources.",
      question: "How do you handle this request?",
      options: [
        {
          id: "a",
          text: "Agree to all customizations to secure the contract.",
          feedback: "This accommodating approach may win the deal but creates risk of underdelivery and resource strain. Setting realistic expectations is important for long-term success.",
          scores: { relationship: 1, outcome: -2, ethics: -1 }
        },
        {
          id: "b",
          text: "Firmly refuse any customization beyond your standard offering.",
          feedback: "This competitive stance protects your resources but may damage the relationship and lose the opportunity to find a workable middle ground.",
          scores: { relationship: -2, outcome: -1, ethics: 0 }
        },
        {
          id: "c",
          text: "Explore which customizations are most critical to their business needs.",
          feedback: "This collaborative approach helps prioritize requirements and find a solution that addresses their most important needs while managing your resource constraints.",
          scores: { relationship: 2, outcome: 2, ethics: 2 }
        },
        {
          id: "d",
          text: "Offer a higher-tier package that includes some customizations at a premium price.",
          feedback: "This creates a compromise that provides value to the client while ensuring you're compensated for additional work. It's a balanced approach that can satisfy both parties.",
          scores: { relationship: 1, outcome: 2, ethics: 1 }
        }
      ]
    },
    {
      id: 4,
      situation: "Negotiations have stalled over contract terms regarding intellectual property rights.",
      question: "What approach do you take to move forward?",
      options: [
        {
          id: "a",
          text: "Suggest bringing in legal experts from both sides to resolve the issue.",
          feedback: "This approach acknowledges the complexity of the issue and brings in appropriate expertise. It shows respect for the importance of the concern while seeking resolution.",
          scores: { relationship: 1, outcome: 1, ethics: 2 }
        },
        {
          id: "b",
          text: "Present examples of how similar terms have worked successfully with other clients.",
          feedback: "Using social proof and precedent can be effective in establishing legitimacy for your proposed terms. This provides context that may help overcome concerns.",
          scores: { relationship: 1, outcome: 2, ethics: 2 }
        },
        {
          id: "c",
          text: "Create a sense of urgency by mentioning another client is interested in the same implementation slot.",
          feedback: "This competitive tactic may create pressure but risks being perceived as manipulative if not truthful. It doesn't address the substantive issue at hand.",
          scores: { relationship: -2, outcome: 0, ethics: -2 }
        },
        {
          id: "d",
          text: "Explore the specific concerns behind their position on intellectual property.",
          feedback: "This collaborative approach focuses on interests rather than positions. Understanding their underlying concerns may reveal solutions that protect both parties' essential interests.",
          scores: { relationship: 2, outcome: 2, ethics: 2 }
        }
      ]
    },
    {
      id: 5,
      situation: "The client asks for a significant discount at the final stage of negotiations.",
      question: "How do you respond to this last-minute request?",
      options: [
        {
          id: "a",
          text: "Firmly state that the price has already been established and cannot be changed.",
          feedback: "This competitive stance protects your margin but may create tension at a critical moment. Consider whether there's room for some flexibility or creative alternatives.",
          scores: { relationship: -1, outcome: 0, ethics: 1 }
        },
        {
          id: "b",
          text: "Offer a small discount to close the deal quickly.",
          feedback: "This compromising approach may secure the agreement but sets a precedent that last-minute demands will be accommodated, potentially affecting future negotiations.",
          scores: { relationship: 1, outcome: 0, ethics: 1 }
        },
        {
          id: "c",
          text: "Ask why they're requesting a discount at this stage.",
          feedback: "This collaborative approach seeks to understand the underlying interest or concern, which may reveal alternative solutions beyond just price reduction.",
          scores: { relationship: 2, outcome: 1, ethics: 2 }
        },
        {
          id: "d",
          text: "Offer additional value (training, support) instead of reducing the price.",
          feedback: "This creative approach maintains your price point while providing additional value that may address their concerns. It's a constructive alternative to direct price concessions.",
          scores: { relationship: 2, outcome: 2, ethics: 2 }
        }
      ]
    }
  ];

  // Initialize the exercise
  function initExercise() {
    displayScenario(currentScenario);
    updateProgress();
    
    nextButton.addEventListener('click', handleNextButtonClick);
  }

  // Display the current scenario
  function displayScenario(index) {
    if (index >= scenarios.length) {
      showResults();
      return;
    }

    const scenario = scenarios[index];
    
    scenarioContainer.innerHTML = `
      <h3>Scenario ${scenario.id}</h3>
      <p class="situation">${scenario.situation}</p>
      <p class="question">${scenario.question}</p>
    `;
    
    optionsContainer.innerHTML = '';
    scenario.options.forEach(option => {
      const optionElement = document.createElement('div');
      optionElement.className = 'option';
      optionElement.innerHTML = `
        <input type="radio" name="scenario-${scenario.id}" id="option-${scenario.id}-${option.id}" value="${option.id}">
        <label for="option-${scenario.id}-${option.id}">${option.text}</label>
      `;
      optionsContainer.appendChild(optionElement);
      
      // Add event listener to each option
      optionElement.querySelector('input').addEventListener('change', function() {
        handleOptionSelection(scenario, option);
      });
    });
    
    feedbackContainer.innerHTML = '';
    nextButton.style.display = 'none';
  }

  // Handle option selection
  function handleOptionSelection(scenario, selectedOption) {
    userChoices[currentScenario] = selectedOption.id;
    
    // Update scores
    score.relationship += selectedOption.scores.relationship;
    score.outcome += selectedOption.scores.outcome;
    score.ethics += selectedOption.scores.ethics;
    
    // Display feedback
    feedbackContainer.innerHTML = `
      <div class="feedback ${getFeedbackClass(selectedOption.scores)}">
        <h4>Feedback:</h4>
        <p>${selectedOption.feedback}</p>
      </div>
    `;
    
    nextButton.style.display = 'block';
  }

  // Determine feedback class based on scores
  function getFeedbackClass(scores) {
    const total = scores.relationship + scores.outcome + scores.ethics;
    if (total >= 4) return 'feedback-excellent';
    if (total >= 2) return 'feedback-good';
    if (total >= 0) return 'feedback-neutral';
    return 'feedback-needs-improvement';
  }

  // Handle next button click
  function handleNextButtonClick() {
    currentScenario++;
    if (currentScenario < scenarios.length) {
      displayScenario(currentScenario);
      updateProgress();
    } else {
      showResults();
    }
  }

  // Update progress indicator
  function updateProgress() {
    progressIndicator.innerHTML = `Scenario ${currentScenario + 1} of ${scenarios.length}`;
  }

  // Show final results
  function showResults() {
    scenarioContainer.style.display = 'none';
    optionsContainer.style.display = 'none';
    feedbackContainer.style.display = 'none';
    nextButton.style.display = 'none';
    progressIndicator.style.display = 'none';
    
    // Normalize scores to 0-100 scale
    const maxPossibleScore = scenarios.length * 2; // Assuming max 2 points per scenario per category
    const normalizedScores = {
      relationship: Math.round((score.relationship + maxPossibleScore) * 50 / maxPossibleScore),
      outcome: Math.round((score.outcome + maxPossibleScore) * 50 / maxPossibleScore),
      ethics: Math.round((score.ethics + maxPossibleScore) * 50 / maxPossibleScore)
    };
    
    const totalScore = Math.round((normalizedScores.relationship + normalizedScores.outcome + normalizedScores.ethics) / 3);
    
    resultsContainer.innerHTML = `
      <h2>Your Influence Strategy Results</h2>
      <div class="score-summary">
        <p>Overall Score: <strong>${totalScore}%</strong></p>
        <div class="score-breakdown">
          <div class="score-category">
            <h3>Relationship Building</h3>
            <div class="score-bar">
              <div class="score-fill" style="width: ${normalizedScores.relationship}%"></div>
            </div>
            <p>${normalizedScores.relationship}%</p>
          </div>
          <div class="score-category">
            <h3>Outcome Achievement</h3>
            <div class="score-bar">
              <div class="score-fill" style="width: ${normalizedScores.outcome}%"></div>
            </div>
            <p>${normalizedScores.outcome}%</p>
          </div>
          <div class="score-category">
            <h3>Ethical Approach</h3>
            <div class="score-bar">
              <div class="score-fill" style="width: ${normalizedScores.ethics}%"></div>
            </div>
            <p>${normalizedScores.ethics}%</p>
          </div>
        </div>
      </div>
      
      <div class="results-analysis">
        <h3>Analysis</h3>
        <p>${getAnalysis(normalizedScores)}</p>
      </div>
      
      <div class="development-recommendations">
        <h3>Development Recommendations</h3>
        <ul>
          ${getRecommendations(normalizedScores)}
        </ul>
      </div>
      
      <div class="action-buttons">
        <button id="retry-button" class="btn btn-secondary">Try Again</button>
        <button id="continue-button" class="btn btn-primary">Continue to Next Module</button>
      </div>
    `;
    
    resultsContainer.style.display = 'block';
    
    // Add event listeners to result buttons
    document.getElementById('retry-button').addEventListener('click', resetExercise);
    document.getElementById('continue-button').addEventListener('click', function() {
      window.location.href = '/modules/cultural-aspects';
    });
  }

  // Generate analysis based on scores
  function getAnalysis(scores) {
    if (scores.relationship >= 75 && scores.outcome >= 75 && scores.ethics >= 75) {
      return "Excellent! You demonstrate a balanced approach to influence that builds relationships, achieves outcomes, and maintains ethical standards. Your strategies show sophistication and adaptability.";
    } else if (scores.relationship >= 60 && scores.outcome >= 60 && scores.ethics >= 60) {
      return "Good work! You generally balance relationship considerations with achieving outcomes while maintaining ethical standards. With some refinement, you can further enhance your influence effectiveness.";
    } else if (scores.ethics < 50) {
      return "Your approach to influence may benefit from greater attention to ethical considerations. While achieving outcomes is important, sustainable success requires maintaining trust and integrity.";
    } else if (scores.relationship < 50) {
      return "Your approach may benefit from greater focus on relationship building. Strong relationships creat
(Content truncated due to size limit. Use line ranges to read in chunks)