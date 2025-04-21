// Harvard 7 Elements Framework Exercise
// This JavaScript file handles the interactive exercise for applying the 7 Elements Framework

document.addEventListener('DOMContentLoaded', function() {
  // Exercise state
  let currentStep = 0;
  let userResponses = {};
  let evaluationScores = {
    interests: 0,
    alternatives: 0,
    options: 0,
    legitimacy: 0,
    communication: 0,
    relationship: 0,
    commitments: 0
  };

  // DOM elements
  const exerciseContainer = document.getElementById('exercise-container');
  const scenarioContainer = document.getElementById('scenario-container');
  const elementContainer = document.getElementById('element-container');
  const responseContainer = document.getElementById('response-container');
  const feedbackContainer = document.getElementById('feedback-container');
  const navigationContainer = document.getElementById('navigation-container');
  const resultsContainer = document.getElementById('results-container');

  // The job offer negotiation scenario
  const scenario = {
    title: "Job Offer Negotiation",
    description: `
      <p>You've received a job offer from TechInnovate, a growing technology company. You're excited about the role and the company, but several aspects of the offer don't fully meet your needs:</p>
      <ul>
        <li><strong>Salary:</strong> $85,000 (you were hoping for $95,000-100,000 based on your research)</li>
        <li><strong>Start date:</strong> Two weeks from now (you need at least four weeks to wrap up your current project)</li>
        <li><strong>Remote work:</strong> Only one day per week remote (you'd prefer at least two days)</li>
        <li><strong>Professional development:</strong> No specific budget mentioned (this is important for your career growth)</li>
      </ul>
      <p>You need to prepare for a negotiation with the hiring manager, Alex, who seems interested in bringing you on board but has mentioned budget constraints.</p>
    `
  };

  // The 7 elements with prompts and model answers
  const elements = [
    {
      id: "interests",
      title: "Interests",
      prompt: "What are your underlying interests in this negotiation? What might be the hiring manager's interests?",
      instructions: "Identify at least 3 of your key interests and 3 possible interests of the hiring manager.",
      modelAnswer: `
        <h4>Your Interests:</h4>
        <ul>
          <li>Fair compensation that reflects your market value and experience</li>
          <li>Work-life balance through flexible remote work options</li>
          <li>Sufficient transition time to properly conclude your current role</li>
          <li>Professional growth and skill development opportunities</li>
          <li>Building a positive relationship with your new manager and team</li>
        </ul>
        
        <h4>Hiring Manager's Possible Interests:</h4>
        <ul>
          <li>Filling the position with a qualified candidate quickly</li>
          <li>Staying within budget constraints</li>
          <li>Ensuring team cohesion and collaboration (which may affect remote work policies)</li>
          <li>Minimizing onboarding time and maximizing productivity</li>
          <li>Setting precedents that won't cause problems with other employees</li>
        </ul>
        
        <h4>Shared Interests:</h4>
        <ul>
          <li>Establishing a productive working relationship</li>
          <li>Ensuring you can perform effectively in the role</li>
          <li>Creating a sustainable arrangement that works long-term</li>
        </ul>
      `,
      evaluationCriteria: [
        "Identified multiple personal interests beyond just salary",
        "Considered the hiring manager's perspective and constraints",
        "Recognized both tangible and intangible interests",
        "Identified potential shared interests"
      ]
    },
    {
      id: "alternatives",
      title: "Alternatives (BATNA)",
      prompt: "What is your BATNA (Best Alternative To a Negotiated Agreement) in this situation? How might you improve it?",
      instructions: "Describe your current BATNA and at least 2 ways you could improve it before or during the negotiation.",
      modelAnswer: `
        <h4>Your Current BATNA:</h4>
        <ul>
          <li>Remaining in your current position while continuing your job search</li>
          <li>You have an initial interview scheduled with another company next week, but no offer yet</li>
          <li>Your current job is stable but offers limited growth opportunities</li>
        </ul>
        
        <h4>Ways to Improve Your BATNA:</h4>
        <ul>
          <li>Accelerate your search process with other companies to potentially generate competing offers</li>
          <li>Discuss growth opportunities or a potential raise with your current employer</li>
          <li>Research the job market more thoroughly to strengthen your understanding of your market value</li>
          <li>Develop a concrete plan for staying in your current role that addresses your growth concerns</li>
        </ul>
        
        <h4>Hiring Manager's Possible BATNA:</h4>
        <ul>
          <li>Continuing their search for other candidates</li>
          <li>Redistributing the work among existing team members</li>
          <li>Reconsidering the role's scope or requirements</li>
        </ul>
      `,
      evaluationCriteria: [
        "Clearly identified current alternatives if agreement isn't reached",
        "Suggested practical ways to improve BATNA",
        "Considered the strength of your BATNA relative to the offer",
        "Recognized the hiring manager's potential alternatives"
      ]
    },
    {
      id: "options",
      title: "Options",
      prompt: "What creative options might satisfy both your interests and the hiring manager's interests?",
      instructions: "Generate at least 4 potential options that could address the key issues (salary, start date, remote work, professional development).",
      modelAnswer: `
        <h4>Salary Options:</h4>
        <ul>
          <li>A slightly lower base salary with a performance-based bonus that could bring total compensation to your target range</li>
          <li>A scheduled salary review after 6 months based on specific performance metrics</li>
          <li>A signing bonus to bridge the gap between their offer and your target</li>
          <li>Additional benefits (like extra vacation days) to offset the lower salary</li>
        </ul>
        
        <h4>Start Date Options:</h4>
        <ul>
          <li>A phased start where you work part-time for the first two weeks while concluding your current project</li>
          <li>Starting full-time in four weeks but making yourself available for important meetings or training during the transition</li>
          <li>Starting in two weeks but with the understanding that you'll need some flexibility to wrap up previous commitments</li>
        </ul>
        
        <h4>Remote Work Options:</h4>
        <ul>
          <li>Two fixed remote days per week</li>
          <li>One fixed remote day plus flexibility for additional remote work based on meeting schedules and deliverables</li>
          <li>A trial period of increased remote work with a review after 90 days</li>
          <li>Flexibility to adjust in-office days based on team collaboration needs</li>
        </ul>
        
        <h4>Professional Development Options:</h4>
        <ul>
          <li>A specific annual budget for courses, conferences, or certifications</li>
          <li>Dedicated time allocation for professional development activities</li>
          <li>Mentorship program or regular coaching sessions with senior staff</li>
          <li>Opportunity to lead projects that develop specific skills you're interested in</li>
        </ul>
      `,
      evaluationCriteria: [
        "Generated multiple options for each key issue",
        "Created options that address both parties' interests",
        "Demonstrated creativity beyond simple compromises",
        "Considered package deals that link multiple issues"
      ]
    },
    {
      id: "legitimacy",
      title: "Legitimacy",
      prompt: "What objective standards or criteria could you use to support your requests?",
      instructions: "Identify at least 3 sources of legitimacy you could reference during the negotiation.",
      modelAnswer: `
        <h4>Salary Standards:</h4>
        <ul>
          <li>Industry salary surveys showing median compensation for similar roles in your area (e.g., Glassdoor, PayScale, or Bureau of Labor Statistics data)</li>
          <li>Specific salary ranges from comparable job postings</li>
          <li>Your documented performance and achievements that justify higher compensation</li>
        </ul>
        
        <h4>Start Date Standards:</h4>
        <ul>
          <li>Standard notice periods in your industry (typically 2-4 weeks)</li>
          <li>Contractual obligations to your current employer</li>
          <li>Professional ethics regarding project completion and transition</li>
        </ul>
        
        <h4>Remote Work Standards:</h4>
        <ul>
          <li>Current industry trends showing increased remote work flexibility</li>
          <li>Studies on productivity and remote work</li>
          <li>Policies at comparable companies in the industry</li>
          <li>Your demonstrated history of productive remote work</li>
        </ul>
        
        <h4>Professional Development Standards:</h4>
        <ul>
          <li>Industry benchmarks for professional development budgets</li>
          <li>The company's stated values around employee growth and development</li>
          <li>Specific skills required for success in the role that require ongoing development</li>
        </ul>
      `,
      evaluationCriteria: [
        "Identified specific, relevant external standards",
        "Included multiple types of legitimacy (market data, precedent, etc.)",
        "Connected standards directly to your requests",
        "Considered how to present standards objectively rather than self-servingly"
      ]
    },
    {
      id: "communication",
      title: "Communication",
      prompt: "How will you communicate effectively during this negotiation?",
      instructions: "Outline your communication strategy, including key messages and questions you'll ask.",
      modelAnswer: `
        <h4>Key Messages to Communicate:</h4>
        <ul>
          <li>Your enthusiasm about the role and company</li>
          <li>The value you'll bring based on your specific experience and skills</li>
          <li>Your desire to find mutually beneficial solutions</li>
          <li>The importance of a few key adjustments to make the offer work for you</li>
        </ul>
        
        <h4>Questions to Uncover Interests:</h4>
        <ul>
          <li>"What factors were considered in structuring this offer?"</li>
          <li>"How does the team typically collaborate, and what role does in-person work play?"</li>
          <li>"What are the company's expectations regarding professional development?"</li>
          <li>"What are the biggest priorities for this role in the first few months?"</li>
        </ul>
        
        <h4>Active Listening Strategies:</h4>
        <ul>
          <li>Paraphrasing to confirm understanding: "So what I'm hearing is..."</li>
          <li>Asking clarifying questions before responding to concerns</li>
          <li>Taking notes on key points raised</li>
          <li>Acknowledging constraints while exploring solutions: "I understand the budget constraints. Perhaps we could explore..."</li>
        </ul>
        
        <h4>Framing Approaches:</h4>
        <ul>
          <li>Frame requests in terms of mutual benefit</li>
          <li>Present options rather than demands</li>
          <li>Use "I" statements rather than accusatory language</li>
          <li>Reference objective standards when making requests</li>
        </ul>
      `,
      evaluationCriteria: [
        "Planned both speaking and listening aspects of communication",
        "Included specific questions to uncover interests",
        "Considered how to frame requests constructively",
        "Prepared to acknowledge the other party's concerns"
      ]
    },
    {
      id: "relationship",
      title: "Relationship",
      prompt: "How will you build and maintain a positive relationship during and after this negotiation?",
      instructions: "Describe at least 3 strategies for building relationship while still addressing substantive issues.",
      modelAnswer: `
        <h4>Relationship-Building Strategies:</h4>
        <ul>
          <li>Express genuine enthusiasm about joining the team and contributing to the company's mission</li>
          <li>Acknowledge and appreciate the time and effort the hiring manager has invested in the recruitment process</li>
          <li>Separate relationship issues from substantive negotiation points</li>
          <li>Find opportunities for authentic connection based on shared professional interests</li>
        </ul>
        
        <h4>Communication Approaches:</h4>
        <ul>
          <li>Use collaborative language ("we," "together," "mutual") rather than oppositional framing</li>
          <li>Express understanding of constraints while problem-solving: "I understand the budget limitations. How might we work within those while addressing..."</li>
          <li>Show respect for their expertise and perspective</li>
          <li>Maintain a positive, problem-solving tone even when discussing differences</li>
        </ul>
        
        <h4>Long-term Relationship Considerations:</h4>
        <ul>
          <li>Consider how requests and communication will affect your working relationship after you join</li>
          <li>Demonstrate the collaborative approach you'll bring to the role</li>
          <li>End the negotiation positively regardless of outcome</li>
          <li>Follow up with a thank-you note acknowledging their time and consideration</li>
        </ul>
      `,
      evaluationCriteria: [
        "Balanced relationship concerns with substantive issues",
        "Included specific relationship-building approaches",
        "Considered both short and long-term relationship impacts",
        "Demonstrated understanding of relationship as distinct from liking"
      ]
    },
    {
      id: "commitments",
      title: "Commitments",
      prompt: "What commitments will you seek, and what commitments are you prepared to make?",
      instructions: "Outline the specific commitments you want from the employer and what you're willing to commit to in return.",
      modelAnswer: `
        <h4>Commitments You'll Seek:</h4>
        <ul>
          <li>A revised offer letter with specific terms for salary, start date, and remote work arrangements</li>
          <li>Written confirmation of the professional development budget and how it can be utilized</li>
          <li>Clear performance expectations and review timeline, especially if a performance-based raise is discussed</li>
          <li>Specific remote work policy details, including any flexibility provisions</li>
        </ul>
        
        <h4>Commitments You're Prepared to Make:</h4>
        <ul>
          <li>A firm start date once terms are agreed upon</li>
          <li>Availability for certain onboarding activities before your official start date</li>
          <li>Specific performance goals for your first 3-6 months</li>
          <li>Regular check-ins about remote work effectiveness</li>
          <li>Transparency about any challenges during the transition period</li>
        </ul>
        
        <h4>Process for Finalizing Commitments:</h4>
        <ul>
          <li>Request verbal agreements be documented in a revised offer letter</li>
          <li>Clarify any ambiguous terms before signing</li>
          <li>Establish a timeline for receiving an
(Content truncated due to size limit. Use line ranges to read in chunks)