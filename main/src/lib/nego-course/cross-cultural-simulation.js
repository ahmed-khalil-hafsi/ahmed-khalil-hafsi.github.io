// Cross-Cultural Negotiation Simulation
// This JavaScript file handles the interactive simulation for the Cultural Aspects module

document.addEventListener('DOMContentLoaded', function() {
  // Simulation state
  let currentStep = 0;
  let selectedCountry = null;
  let userChoices = [];
  let score = {
    cultural_awareness: 0,
    relationship_building: 0,
    communication: 0,
    adaptability: 0
  };
  let totalScenarios = 0; // Will be set based on selected country

  // DOM elements
  const countrySelectorContainer = document.getElementById('country-selector'); // Renamed for clarity
  const startSimulationButton = document.getElementById('start-simulation-button');
  const simulationContainer = document.getElementById('simulation-container');
  const scenarioContainer = document.getElementById('scenario-container');
  const optionsContainer = document.getElementById('options-container');
  const feedbackContainer = document.getElementById('feedback-container');
  const progressIndicator = document.getElementById('progress-indicator');
  const nextButton = document.getElementById('next-button');
  const resultsContainer = document.getElementById('results-container');

  // Ensure all required elements exist
  if (!countrySelectorContainer || !startSimulationButton || !simulationContainer || !scenarioContainer || !optionsContainer || !feedbackContainer || !progressIndicator || !nextButton || !resultsContainer) {
    console.error("Simulation Error: One or more required HTML elements are missing.");
    // Optionally disable the simulation or show an error message to the user
    if (countrySelectorContainer) {
        countrySelectorContainer.innerHTML = "<p>Error: Simulation cannot load because page structure is incomplete.</p>";
    }
    return; // Stop execution if essential elements are missing
  }


  // Country data
  const countries = [
    {
      id: "germany",
      name: "Germany",
      description: "German business culture values directness, precision, and expertise. Negotiations tend to be fact-based with clear processes and thorough preparation expected."
    },
    {
      id: "china",
      name: "China",
      description: "Chinese business culture emphasizes relationship-building (guanxi), hierarchy, and indirect communication. Patience and long-term orientation are essential."
    },
    {
      id: "japan",
      name: "Japan",
      description: "Japanese business culture values harmony (wa), consensus decision-making, and indirect communication. Formality and respect for hierarchy are important."
    },
    {
      id: "southeast_asia",
      name: "Southeast Asia",
      description: "Southeast Asian business cultures (varying by country) generally value relationship-building, face-saving, and hierarchical respect. Communication tends to be indirect."
    }
  ];

  // Scenario data store
  const scenarioData = {};

  // German scenarios
  scenarioData.germany = [
    {
      id: 1,
      situation: "You arrive for your first meeting with the German negotiation team. After brief introductions, they immediately want to discuss technical specifications.",
      question: "How do you respond to this direct approach?",
      options: [
        { id: "a", text: "Suggest spending some time getting to know each other first before diving into business.", feedback: "While relationship-building is important in many cultures, Germans typically prefer to separate business and personal matters. Your suggestion might be seen as inefficient use of time.", scores: { cultural_awareness: -1, relationship_building: 0, communication: 0, adaptability: 0 } },
        { id: "b", text: "Proceed with the technical discussion, demonstrating your thorough preparation and expertise.", feedback: "Good choice. German business culture values expertise, thoroughness, and efficiency. Being prepared to discuss technical details shows respect for their approach to business.", scores: { cultural_awareness: 2, relationship_building: 1, communication: 2, adaptability: 2 } },
        { id: "c", text: "Tell a few jokes to lighten the mood before getting down to business.", feedback: "Germans typically maintain a clear separation between business and personal matters. Humor in business settings, especially with new contacts, may be perceived as unprofessional.", scores: { cultural_awareness: -2, relationship_building: -1, communication: -1, adaptability: -1 } },
        { id: "d", text: "Apologize for not being ready to discuss technical details and ask to reschedule.", feedback: "This approach may damage your credibility. In German business culture, thorough preparation is expected, and not being ready might be perceived as unprofessional.", scores: { cultural_awareness: 0, relationship_building: -1, communication: -1, adaptability: -1 } }
      ]
    },
    {
      id: 2,
      situation: "During the negotiation, your German counterpart directly points out several flaws in your proposal.",
      question: "How do you respond to this criticism?",
      options: [
        { id: "a", text: "Take offense and suggest they're being unnecessarily harsh.", feedback: "This response misinterprets German communication norms. Direct criticism is not personal but focused on improving the business outcome. Taking offense may damage your credibility.", scores: { cultural_awareness: -2, relationship_building: -2, communication: -2, adaptability: -2 } },
        { id: "b", text: "Thank them for the feedback and address each point with factual responses.", feedback: "Excellent choice. This response aligns with German communication preferences for directness and fact-based discussion. Addressing criticism objectively demonstrates professionalism.", scores: { cultural_awareness: 2, relationship_building: 2, communication: 2, adaptability: 2 } },
        { id: "c", text: "Deflect by changing the subject to more positive aspects of your proposal.", feedback: "This approach may be perceived as evasive. German business culture values addressing issues directly rather than avoiding them. Deflection might reduce trust in your transparency.", scores: { cultural_awareness: -1, relationship_building: -1, communication: -1, adaptability: -1 } },
        { id: "d", text: "Respond with criticism of their approach to show you won't be pushed around.", feedback: "While Germans appreciate directness, this response confuses directness with confrontation. Criticism should be factual and constructive, not retaliatory.", scores: { cultural_awareness: -1, relationship_building: -2, communication: -1, adaptability: -1 } }
      ]
    },
    {
      id: 3,
      situation: "The German team has presented a detailed 30-page contract for your review.",
      question: "What is your approach to handling this document?",
      options: [
        { id: "a", text: "Suggest simplifying the contract to focus only on key points.", feedback: "This approach doesn't align with German business practices, which value thoroughness and detail. Suggesting simplification might be interpreted as trying to avoid clear commitments.", scores: { cultural_awareness: -1, relationship_building: 0, communication: -1, adaptability: -1 } },
        { id: "b", text: "Review it thoroughly with your legal team and come prepared with specific questions and proposed amendments.", feedback: "Excellent approach. This demonstrates respect for German thoroughness and attention to detail. Coming prepared with specific questions shows you take the agreement seriously.", scores: { cultural_awareness: 2, relationship_building: 2, communication: 2, adaptability: 2 } },
        { id: "c", text: "Skim it quickly and sign to show trust and goodwill.", feedback: "This approach would likely concern your German counterparts. Thorough review is expected, and skipping this step might be seen as careless rather than trusting.", scores: { cultural_awareness: -2, relationship_building: -1, communication: -1, adaptability: -2 } },
        { id: "d", text: "Express surprise at the length and suggest that a handshake agreement should be sufficient.", feedback: "This response shows a lack of cultural awareness. In German business culture, detailed written agreements are standard and important. Verbal agreements are not considered sufficient.", scores: { cultural_awareness: -2, relationship_building: -1, communication: -2, adaptability: -1 } }
      ]
    },
    {
      id: 4,
      situation: "You notice that your German counterparts always arrive exactly on time for meetings and expect to end precisely at the scheduled time.",
      question: "How do you adapt to this time management approach?",
      options: [
        { id: "a", text: "Arrive 5-10 minutes early for all meetings and come fully prepared.", feedback: "Excellent choice. This demonstrates respect for German punctuality and efficiency. Being prepared allows you to use the allotted time effectively.", scores: { cultural_awareness: 2, relationship_building: 2, communication: 1, adaptability: 2 } },
        { id: "b", text: "Arrive exactly on time but be flexible about end times if the discussion is productive.", feedback: "Arriving on time is good, but expecting flexibility about end times doesn't align with German time management. They typically expect meetings to end as scheduled.", scores: { cultural_awareness: 1, relationship_building: 0, communication: 0, adaptability: 0 } },
        { id: "c", text: "Maintain your usual flexible approach to time to show you're relaxed and relationship-focused.", feedback: "This approach doesn't respect German cultural norms regarding time management. Punctuality is highly valued and being late may be perceived as disrespectful or unprofessional.", scores: { cultural_awareness: -2, relationship_building: -1, communication: -1, adaptability: -2 } },
        { id: "d", text: "Joke about different cultural approaches to time when you arrive a few minutes late.", feedback: "This response fails to adapt to German expectations and may come across as dismissive of their cultural norms. Punctuality is taken seriously in German business culture.", scores: { cultural_awareness: -2, relationship_building: -1, communication: -1, adaptability: -2 } }
      ]
    }
  ];

  // Chinese scenarios
  scenarioData.china = [
    {
      id: 1,
      situation: "You've just arrived in China for your first negotiation meeting. Your Chinese counterparts suggest having dinner together before discussing any business.",
      question: "How do you respond to this invitation?",
      options: [
        { id: "a", text: "Politely decline, suggesting you'd prefer to start with business discussions to use time efficiently.", feedback: "This response doesn't align with Chinese business culture, which prioritizes relationship-building before business. Declining the dinner may be perceived as disinterest in building a relationship.", scores: { cultural_awareness: -2, relationship_building: -2, communication: -1, adaptability: -1 } },
        { id: "b", text: "Accept enthusiastically and prepare some questions about Chinese culture and your hosts' backgrounds.", feedback: "Excellent choice. This demonstrates understanding of the importance of relationship-building (guanxi) in Chinese business culture. Showing interest in their culture and backgrounds helps establish trust.", scores: { cultural_awareness: 2, relationship_building: 2, communication: 2, adaptability: 2 } },
        { id: "c", text: "Accept but immediately bring up business topics during the dinner.", feedback: "While accepting the invitation is good, focusing on business during a social dinner doesn't align with Chinese expectations. Social events are for relationship-building, not business discussions.", scores: { cultural_awareness: 0, relationship_building: -1, communication: -1, adaptability: 0 } },
        { id: "d", text: "Accept but mention you're on a tight schedule and can only stay briefly.", feedback: "This response sends mixed signals. Accepting shows some cultural awareness, but emphasizing time constraints may suggest you don't value the relationship-building process that's central to Chinese business culture.", scores: { cultural_awareness: -1, relationship_building: -1, communication: 0, adaptability: -1 } }
      ]
    },
    {
      id: 2,
      situation: "During negotiations, your Chinese counterpart says 'We will consider this carefully' in response to your proposal.",
      question: "How do you interpret and respond to this statement?",
      options: [
        { id: "a", text: "Take it as a positive sign and press for a definitive answer before the meeting ends.", feedback: "This misinterprets Chinese communication patterns. 'We will consider this' often indicates reluctance or disagreement. Pressing for an immediate answer shows lack of cultural awareness.", scores: { cultural_awareness: -2, relationship_building: -1, communication: -2, adaptability: -1 } },
        { id: "b", text: "Recognize this may indicate concerns and ask indirect questions to uncover specific issues.", feedback: "Excellent response. This shows understanding of indirect communication in Chinese culture. The phrase often indicates concerns, and indirect questions help uncover issues while preserving face.", scores: { cultural_awareness: 2, relationship_building: 2, communication: 2, adaptability: 2 } },
        { id: "c", text: "Accept the statement at face value and wait for them to respond in their own time.", feedback: "This shows some cultural sensitivity by not pushing, but misses an opportunity to address potential concerns. A more proactive approach would be to explore underlying issues indirectly.", scores: { cultural_awareness: 1, relationship_building: 1, communication: 0, adaptability: 1 } },
        { id: "d", text: "Express frustration with the lack of a clear answer and emphasize your need for directness.", feedback: "This response shows poor cultural awareness. Demanding directness in a culture that values indirect communication and face-saving may damage the relationship and negotiation process.", scores: { cultural_awareness: -2, relationship_building: -2, communication: -2, adaptability: -2 } }
      ]
    },
    {
      id: 3,
      situation: "You notice that the most senior Chinese executive rarely speaks during the negotiation, while junior team members do most of the talking.",
      question: "How do you handle this dynamic?",
      options: [
        { id: "a", text: "Direct your most important points and questions to the junior team members who are doing the talking.", feedback: "This approach doesn't recognize the hierarchical nature of Chinese business culture. While junior members may speak more, key decisions rest with senior executives.", scores: { cultural_awareness: -1, relationship_building: -1, communication: -1, adaptability: -1 } },
        { id: "b", text: "Respectfully address the senior executive directly and frequently, even if responses come from others.", feedback: "Excellent approach. This shows respect for hierarchy in Chinese business culture. Addressing the senior person acknowledges their authority while allowing the communication pattern to continue.", scores: { cultural_awareness: 2, relationship_building: 2, communication: 2, adaptability: 2 } },
        { id: "c", text: "Ask why the senior executive isn't participating more actively in the discussion.", feedback: "This question could cause embarrassment and disrupt harmony. It fails to recognize that the senior person's role might be observation and final approval, not active discussion.", scores: { cultural_awareness: -2, relationship_building: -1, communication: -2, adaptability: -1 } },
        { id: "d", text: "Ignore the hierarchy and treat everyone on the team as equals in the discussion.", feedback: "Ignoring hierarchy in Chinese business culture can be perceived as disrespectful. Recognizing and respecting seniority is crucial for building rapport and effective communication.", scores: { cultural_awareness: -1, relationship_building: -2, communication: -1, adaptability: -1 } }
      ]
    },
    {
      id: 4,
      situation: "After several rounds of negotiation, the Chinese team suggests revisiting a point you thought was already agreed upon.",
      question: "How should you react?",
      options: [
        { id: "a", text: "Express frustration and point out that this issue was already settled.", feedback: "This direct confrontation can cause loss of face and damage the relationship. Agreements in Chinese culture can sometimes be seen as provisional until the final signing.", scores: { cultural_awareness: -2, relationship_building: -1, communication: -2, adaptability: -1 } },
        { id: "b", text: "Patiently reopen the discussion, seeking to understand their new perspective or concern.", feedback: "Excellent approach. This demonstrates patience and flexibility, which are valued in Chinese negotiations. It respects their process and allows for maintaining harmony.", scores: { cultural_awareness: 2, relationship_building: 2, communication: 2, adaptability: 2 } },
        { id: "c", text: "Agree reluctantly but make it clear you're unhappy about reopening the point.", feedback: "While agreeing shows some flexibility, expressing unhappiness directly can still disrupt harmony. A more neutral, patient approach is generally better.", scores: { cultural_awareness: 0, relationship_building: 0, communication: -1, adaptability: 1 } },
        { id: "d", text: "Refuse to discuss it further, stating that agreed points are final.", feedback: "This rigid approach doesn't align with the often iterative nature of Chinese negotiations and may lead to deadlock or damage the relationship.", scores: { cultural_awareness: -1, relationship_building: -2, communication: -1, adaptability: -2 } }
      ]
    }
  ];

  // Japanese scenarios
  scenarioData.japan = [
    {
      id: 1,
      situation: "You present your proposal to the Japanese team. After your presentation, there is a long period of silence.",
      question: "How do you interpret and react to this silence?",
      options: [
        { id: "a", text: "Assume they disagree or are uninterested and quickly offer concessions.", feedback: "Silence in Japanese culture often signifies consideration, not necessarily disagreement. Offering concessions prematurely weakens your position.", scores: { cultural_awareness: -2, relationship_building: -1, communication: -1, adaptability: -1 } },
        { id: "b", text: "Wait patiently, allowing them time to consider your proposal internally.", feedback: "Excellent choice. This shows respect for the Japanese communication style, where silence is used for thought and consensus building. Patience is key.", scores: { cultural_awareness: 2, relationship_building: 2, communication: 2, adaptability: 2 } },
        { id: "c", text: "Fill the silence by repeating your main points or asking direct questions.", feedback: "Interrupting the silence can be seen as impatient or disrespectful. It disrupts their internal processing and consensus-building.", scores: { cultural_awareness: -1, relationship_building: -1, communication: -1, adaptability: -1 } },
        { id: "d", text: "Ask directly if they understood your proposal or if there's a problem.", feedback: "Direct confrontation or questioning can cause discomfort in Japanese culture, which values harmony. A more indirect approach is preferable.", scores: { cultural_awareness: -1, relationship_building: -1, communication: -2, adaptability: -1 } }
      ]
    },
    {
      id: 2,
      situation: "Your Japanese counterpart says, 'That is very interesting, but it might be difficult for us.'",
      question: "What is the likely meaning behind this statement?",
      options: [
        { id: "a", text: "They are genuinely interested but see some minor obstacles.", feedback: "This interpretation likely misses the nuance. In Japanese indirect communication, 'difficult' often politely signals disagreement or refusal.", scores: { cultural_awareness: -1, relationship_building: 0, communication: -2, adaptability: -1 } },
        { id: "b", text: "This is likely a polite way of saying 'no' or expressing significant disagreement.", feedback: "Good interpretation. Due to the emphasis on harmony, direct refusal is rare. 'Difficult' often implies rejection without causing confrontation.", scores: { cultural_awareness: 2, relationship_building: 1, communication: 2, adaptability: 1 } },
        { id: "c", text: "They need more detailed information to make a decision.", feedback: "While possible, the phrase 'might be difficult' is a stronger indicator of disagreement than a simple request for more data in this context.", scores: { cultural_awareness: 0, relationship_building: 0, communication: -1, adaptability: 0 } },
        { id: "d", text: "They are trying to negotiate a lower price or better terms.", feedback: "While negotiation is the goal, this specific phrasing is more likely about rejecting the current proposal politely rather than a direct negotiation tactic.", scores: { cultural_awareness: -1, relationship_building: 0, communication: -1, adaptability: 0 } }
      ]
    },
    {
      id: 3,
      situation: "You are exchanging business cards (meishi) with the Japanese team. You casually glance at the card and put it in your pocket.",
      question: "What signal does this send?",
      options: [
        { id: "a", text: "It signals efficiency and focus on getting down to business.", feedback: "This misreads the cultural significance. The exchange of meishi is a formal ritual, and casual treatment can be seen as disrespectful.", scores: { cultural_awareness: -2, relationship_building: -2, communication: -1, adaptability: -1 } },
        { id: "b", text: "It shows you are relaxed and informal, which helps build rapport.", feedback: "Informality during the meishi exchange is inappropriate in Japanese business culture. It signals lack of respect for the person and their position.", scores: { cultural_awareness: -2, relationship_building: -2, communication: -1, adaptability: -2 } },
        { id: "c", text: "It may be perceived as disrespectful, as the card represents the individual and their company.", feedback: "Correct. Meishi should be received with two hands, studied carefully, and treated with respect (e.g., placed in a cardholder or on the table).", scores: { cultural_awareness: 2, relationship_building: 1, communication: 1, adaptability: 1 } },
        { id: "d", text: "It doesn't matter much; the focus should be on the negotiation content.", feedback: "This overlooks the importance of process and ritual in Japanese business culture. How you handle the meishi exchange significantly impacts perception.", scores: { cultural_awareness: -1, relationship_building: -1, communication: 0, adaptability: -1 } }
      ]
    },
     {
      id: 4,
      situation: "The Japanese team consists of several members, and decisions seem to take a long time, involving discussions amongst themselves.",
      question: "What is the best way to approach this decision-making process?",
      options: [
        { id: "a", text: "Identify the most senior person and try to get a quick decision directly from them.", feedback: "This approach ignores the Japanese consensus-building process (nemawashi/ringi). Decisions require input and agreement from multiple levels.", scores: { cultural_awareness: -1, relationship_building: -1, communication: -1, adaptability: -1 } },
        { id: "b", text: "Provide detailed information and allow ample time for their internal consensus process.", feedback: "Excellent strategy. Respecting their process, providing necessary data, and demonstrating patience are crucial for successful negotiations in Japan.", scores: { cultural_awareness: 2, relationship_building: 2, communication: 2, adaptability: 2 } },
        { id: "c", text: "Express impatience and emphasize the need for faster decision-making to meet deadlines.", feedback: "Pressuring the Japanese team can be counterproductive and damage the relationship. Their process values thoroughness and harmony over speed.", scores: { cultural_awareness: -2, relationship_building: -2, communication: -2, adaptability: -2 } },
        { id: "d", text: "Try to build relationships with junior members to influence the decision from the bottom up.", feedback: "While relationships are important, decisions ultimately follow the formal consensus process involving relevant stakeholders and hierarchy.", scores: { cultural_awareness: 0, relationship_building: 1, communication: 0, adaptability: 0 } }
      ]
    }
  ];

  // Southeast Asian scenarios (Generalizing, but acknowledging diversity)
  scenarioData.southeast_asia = [
    {
      id: 1,
      situation: "Your counterpart from Southeast Asia invites you for coffee or a meal before discussing business.",
      question: "How should you respond?",
      options: [
        { id: "a", text: "Accept and use the time to build personal rapport before raising business topics.", feedback: "Excellent choice. Relationship-building is often crucial in Southeast Asian business cultures. Social interaction before business talk helps establish trust.", scores: { cultural_awareness: 2, relationship_building: 2, communication: 1, adaptability: 2 } },
        { id: "b", text: "Decline politely, explaining you prefer to focus on the agenda first.", feedback: "This may be perceived as overly task-focused or dismissive of the importance of relationships, potentially hindering trust development.", scores: { cultural_awareness: -1, relationship_building: -2, communication: -1, adaptability: -1 } },
        { id: "c", text: "Accept, but steer the conversation towards business objectives quickly.", feedback: "Accepting is good, but rushing to business during a social setting might undermine the purpose of building rapport, which is often the primary goal.", scores: { cultural_awareness: 0, relationship_building: -1, communication: 0, adaptability: 0 } },
        { id: "d", text: "Suggest meeting at the office instead to save time.", feedback: "This misses the cultural significance of the invitation, which is about building a relationship outside the formal office environment.", scores: { cultural_awareness: -1, relationship_building: -1, communication: -1, adaptability: -1 } }
      ]
    },
    {
      id: 2,
      situation: "During the discussion, your counterpart avoids direct disagreement and instead says something like, 'Yes, that's one way to look at it.'",
      question: "How do you interpret this?",
      options: [
        { id: "a", text: "Assume they agree with your point and move on.", feedback: "This likely misinterprets the indirect communication style common in Southeast Asia. Avoiding direct disagreement is often done to maintain harmony.", scores: { cultural_awareness: -2, relationship_building: -1, communication: -2, adaptability: -1 } },
        { id: "b", text: "Recognize this as potential polite disagreement and probe gently for their perspective.", feedback: "Good interpretation. This phrasing often signals reservation. Gently exploring their views, perhaps indirectly, is a good way to uncover concerns.", scores: { cultural_awareness: 2, relationship_building: 1, communication: 2, adaptability: 2 } },
        { id: "c", text: "Ask them directly if they agree or disagree with your point.", feedback: "Directly asking for agreement/disagreement can put them in an uncomfortable position, potentially forcing them to breach politeness norms.", scores: { cultural_awareness: -1, relationship_building: -1, communication: -1, adaptability: -1 } },
        { id: "d", text: "Ignore the comment as vague and restate your point more forcefully.", feedback: "Ignoring the subtlety and increasing directness goes against the cultural preference for indirectness and harmony, likely damaging rapport.", scores: { cultural_awareness: -1, relationship_building: -1, communication: -2, adaptability: -2 } }
      ]
    },
    {
      id: 3,
      situation: "You need a decision quickly, but the process seems slow, potentially involving unseen stakeholders or family members.",
      question: "What is your best course of action?",
      options: [
        { id: "a", text: "Politely inquire about the decision-making process and typical timelines.", feedback: "Good approach. Showing understanding and respectfully asking about the process is better than making demands. This acknowledges potential complexities.", scores: { cultural_awareness: 1, relationship_building: 1, communication: 1, adaptability: 1 } },
        { id: "b", text: "Express urgency and pressure the main contact for an immediate decision.", feedback: "Applying pressure can be counterproductive, especially if it causes loss of face or disregards hierarchical or familial influences common in the region.", scores: { cultural_awareness: -2, relationship_building: -2, communication: -1, adaptability: -2 } },
        { id: "c", text: "Try to bypass your main contact and reach out to higher authorities directly.", feedback: "Bypassing established contacts can be seen as disrespectful and may violate hierarchical norms, damaging the relationship.", scores: { cultural_awareness: -1, relationship_building: -2, communication: -1, adaptability: -1 } },
        { id: "d", text: "Patiently wait and continue strengthening the relationship with your main contact.", feedback: "While patience is important, simply waiting without understanding the process might not be sufficient. Combining patience with polite inquiry is often best.", scores: { cultural_awareness: 1, relationship_building: 2, communication: 0, adaptability: 1 } }
      ]
    },
     {
      id: 4,
      situation: "Your counterpart compliments your company extensively but offers vague answers regarding commitment.",
      question: "How should you handle this situation?",
      options: [
        { id: "a", text: "Take the compliments as a sign of strong interest and assume commitment will follow.", feedback: "Compliments are often part of politeness and relationship-building in Southeast Asia but don't necessarily equate to commitment. Vague answers need further exploration.", scores: { cultural_awareness: -1, relationship_building: 0, communication: -1, adaptability: -1 } },
        { id: "b", text: "Thank them for the compliments and gently seek clarification on specific next steps or concerns.", feedback: "Good balance. Acknowledge the politeness while gently guiding the conversation towards concrete details without being overly demanding or direct.", scores: { cultural_awareness: 2, relationship_building: 1, communication: 2, adaptability: 2 } },
        { id: "c", text: "Dismiss the compliments and demand clear, direct answers about their commitment.", feedback: "Dismissing compliments can seem rude, and demanding directness ignores the cultural preference for indirectness and face-saving.", scores: { cultural_awareness: -2, relationship_building: -2, communication: -2, adaptability: -2 } },
        { id: "d", text: "Mirror their vagueness, hoping they will eventually become more specific.", feedback: "While mirroring can sometimes be useful, simply being vague back might lead to misunderstandings or lack of progress. Gentle clarification is needed.", scores: { cultural_awareness: 0, relationship_building: 0, communication: -1, adaptability: 0 } }
      ]
    }
  ];


  // --- Core Simulation Functions ---

  function populateCountrySelector() {
    const selectorPara = countrySelectorContainer.querySelector('p'); // Get the paragraph inside the selector div
    if (!selectorPara) {
        console.error("Could not find paragraph element within country selector to append buttons.");
        return;
    }

    countries.forEach(country => {
      const button = document.createElement('button');
      button.textContent = country.name;
      button.classList.add('country-button'); // Add class for styling
      button.dataset.countryId = country.id; // Store country ID
      button.addEventListener('click', () => selectCountry(country.id, button));
      // Append button after the paragraph:
      selectorPara.parentNode.insertBefore(button, selectorPara.nextSibling);
    });
  }

  function selectCountry(countryId, clickedButton) {
    selectedCountry = countryId;
    // Highlight selected button (optional styling)
    const buttons = countrySelectorContainer.querySelectorAll('.country-button');
    buttons.forEach(btn => btn.classList.remove('selected'));
    clickedButton.classList.add('selected');
    // Enable start button
    startSimulationButton.disabled = false;
  }

  function startSimulation() {
    if (!selectedCountry || !scenarioData[selectedCountry]) {
        alert("Please select a country first.");
        return;
    }

    // Reset state for a new simulation run
    currentStep = 0;
    userChoices = [];
    score = { cultural_awareness: 0, relationship_building: 0, communication: 0, adaptability: 0 };
    totalScenarios = scenarioData[selectedCountry].length;

    // Hide selector, show simulation area
    countrySelectorContainer.style.display = 'none';
    startSimulationButton.style.display = 'none'; // Also hide the start button itself
    resultsContainer.style.display = 'none'; // Hide results if previously shown
    simulationContainer.style.display = 'block';
    nextButton.style.display = 'none'; // Hide next button initially

    displayScenario();
  }

  function displayScenario() {
    const currentScenario = scenarioData[selectedCountry][currentStep];

    // Update Progress
    progressIndicator.textContent = `Scenario ${currentStep + 1} of ${totalScenarios}`;

    // Display Situation and Question
    const situationP = scenarioContainer.querySelector('h4 + p');
    const questionP = scenarioContainer.querySelector('h5 + p');
    if (situationP && questionP) {
        situationP.textContent = currentScenario.situation;
        questionP.textContent = currentScenario.question;
    } else {
        console.error("Could not find scenario/question paragraph elements.");
    }


    // Clear previous options and feedback
    optionsContainer.innerHTML = '<h5>Choose your response:</h5>'; // Reset options header
    feedbackContainer.style.display = 'none';
    feedbackContainer.querySelector('p').textContent = '';

    // Display Options (as buttons)
    currentScenario.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option.text;
      button.classList.add('option-button'); // Add class for styling
      button.dataset.optionId = option.id;
      button.addEventListener('click', () => selectOption(option));
      optionsContainer.appendChild(button);
    });

    // Hide next button until an option is selected
    nextButton.style.display = 'none';
  }

  function selectOption(selectedOption) {
    // Disable option buttons after selection
    const optionButtons = optionsContainer.querySelectorAll('.option-button');
    optionButtons.forEach(button => {
        button.disabled = true;
        if (button.dataset.optionId === selectedOption.id) {
            button.classList.add('selected'); // Highlight selected option
        }
    });

    // Update score
    updateScore(selectedOption.scores);

    // Record choice (optional)
    userChoices.push({ scenario: currentStep + 1, choice: selectedOption.id });

    // Display feedback
    displayFeedback(selectedOption.feedback);

    // Show next button
    if (currentStep < totalScenarios - 1) {
      nextButton.textContent = 'Next Scenario';
    } else {
      nextButton.textContent = 'Show Results';
    }
    nextButton.style.display = 'inline-block'; // Use inline-block or block as per your layout needs
  }

  function updateScore(scoresToAdd) {
    for (const key in scoresToAdd) {
      if (score.hasOwnProperty(key)) {
        score[key] += scoresToAdd[key];
      }
    }
    // console.log("Current Score:", score); // For debugging
  }

  function displayFeedback(feedbackText) {
      const feedbackP = feedbackContainer.querySelector('p');
      if(feedbackP) {
          feedbackP.textContent = feedbackText;
          feedbackContainer.style.display = 'block';
      } else {
          console.error("Could not find feedback paragraph element.");
      }
  }

  function nextStep() {
    currentStep++;
    if (currentStep < totalScenarios) {
      displayScenario();
    } else {
      displayResults();
    }
  }

  function displayResults() {
    // Hide simulation area, show results
    simulationContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    resultsContainer.innerHTML = '<h3>Simulation Results</h3>'; // Clear previous results

    const resultsList = document.createElement('ul');

    for (const key in score) {
      const listItem = document.createElement('li');
      // Convert snake_case to Title Case for display
      const titleCaseKey = key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
      listItem.textContent = `${titleCaseKey}: ${score[key]}`; // Basic score display
      resultsList.appendChild(listItem);
    }
    resultsContainer.appendChild(resultsList);

    // Add interpretation or overall feedback based on scores (Example)
    const overallFeedback = document.createElement('p');
    let totalScore = Object.values(score).reduce((sum, val) => sum + val, 0);
    // Very basic interpretation example - needs refinement!
    if (totalScore > (totalScenarios * 4)) { // Example threshold
        overallFeedback.textContent = "Excellent! You demonstrated strong cross-cultural awareness and adaptability.";
    } else if (totalScore > 0) {
        overallFeedback.textContent = "Good job! You navigated most situations well, but there's room to further refine your cross-cultural skills.";
    } else {
        overallFeedback.textContent = "There are opportunities to improve your understanding and adaptation to different cultural negotiation styles. Review the module content and feedback.";
    }
    resultsContainer.appendChild(overallFeedback);


    // Add a button to restart or go back
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Simulation';
    restartButton.addEventListener('click', () => {
        // Reset UI to initial state
        resultsContainer.style.display = 'none';
        simulationContainer.style.display = 'none';
        countrySelectorContainer.style.display = 'block';
        startSimulationButton.style.display = 'inline-block'; // Or block
        startSimulationButton.disabled = true;
        // Clear selected country style
        const buttons = countrySelectorContainer.querySelectorAll('.country-button');
        buttons.forEach(btn => btn.classList.remove('selected'));
        selectedCountry = null; // Reset selected country
    });
    resultsContainer.appendChild(restartButton);

  }

  // --- Initialization and Event Listeners ---

  populateCountrySelector();
  startSimulationButton.addEventListener('click', startSimulation);
  nextButton.addEventListener('click', nextStep);

}); // End DOMContentLoaded