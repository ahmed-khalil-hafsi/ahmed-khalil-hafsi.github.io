// Create a sample radar chart for negotiation styles
const sampleRadarChart = {
  type: 'radar',
  data: {
    labels: ['Competing', 'Accommodating', 'Avoiding', 'Collaborating', 'Compromising'],
    datasets: [{
      label: 'Your Style Profile',
      data: [65, 45, 30, 85, 70],
      backgroundColor: 'rgba(52, 152, 219, 0.2)',
      borderColor: 'rgba(52, 152, 219, 1)',
      pointBackgroundColor: 'rgba(52, 152, 219, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
    }]
  },
  options: {
    elements: {
      line: {
        borderWidth: 3
      }
    },
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    }
  }
};

// Create a sample bar chart for cultural comparison
const culturalComparisonChart = {
  type: 'bar',
  data: {
    labels: ['US', 'Germany', 'China', 'Japan', 'SE Asia'],
    datasets: [
      {
        label: 'Directness in Communication',
        data: [85, 95, 30, 25, 35],
        backgroundColor: 'rgba(52, 152, 219, 0.7)',
      },
      {
        label: 'Relationship Focus',
        data: [45, 35, 90, 80, 85],
        backgroundColor: 'rgba(231, 76, 60, 0.7)',
      },
      {
        label: 'Time Orientation',
        data: [40, 65, 90, 85, 70],
        backgroundColor: 'rgba(46, 204, 113, 0.7)',
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cultural Dimensions in Negotiation'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Score (0-100)'
        }
      }
    }
  }
};

// Create a sample pie chart for negotiation outcomes
const negotiationOutcomesChart = {
  type: 'pie',
  data: {
    labels: ['Win-Win', 'Win-Lose', 'Lose-Lose', 'Compromise'],
    datasets: [{
      data: [45, 25, 10, 20],
      backgroundColor: [
        'rgba(46, 204, 113, 0.7)',
        'rgba(231, 76, 60, 0.7)',
        'rgba(127, 140, 141, 0.7)',
        'rgba(241, 196, 15, 0.7)'
      ],
      borderColor: [
        'rgba(46, 204, 113, 1)',
        'rgba(231, 76, 60, 1)',
        'rgba(127, 140, 141, 1)',
        'rgba(241, 196, 15, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Negotiation Outcome Distribution'
      }
    }
  }
};

// Create a sample line chart for negotiation preparation impact
const preparationImpactChart = {
  type: 'line',
  data: {
    labels: ['No Prep', 'Basic Prep', 'Moderate Prep', 'Thorough Prep', 'Advanced Prep'],
    datasets: [
      {
        label: 'Outcome Quality',
        data: [30, 45, 65, 85, 95],
        borderColor: 'rgba(52, 152, 219, 1)',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        tension: 0.3,
        fill: true
      },
      {
        label: 'Relationship Quality',
        data: [40, 50, 70, 85, 90],
        borderColor: 'rgba(46, 204, 113, 1)',
        backgroundColor: 'rgba(46, 204, 113, 0.1)',
        tension: 0.3,
        fill: true
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Impact of Preparation on Negotiation Results'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Score (0-100)'
        }
      }
    }
  }
};

// Export the charts for use in components
export { 
  sampleRadarChart, 
  culturalComparisonChart, 
  negotiationOutcomesChart, 
  preparationImpactChart 
};
