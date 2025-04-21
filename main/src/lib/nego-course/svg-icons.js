// Create SVG icons for the negotiation course
// These will be used for visual enhancements throughout the course

// Function to create SVG element with proper attributes
function createSVG(width, height, viewBox, paths, fill = "#2c3e50") {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.setAttribute("viewBox", viewBox);
  svg.setAttribute("fill", "none");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  
  paths.forEach(pathData => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    path.setAttribute("fill", fill);
    svg.appendChild(path);
  });
  
  return svg;
}

// Function to insert SVG into a container element
function insertSVG(containerId, svgElement) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = '';
    container.appendChild(svgElement);
  }
}

// Create icons when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Create and insert icons for each section
  
  // Behavioral Tactics Icon
  const behavioralIcon = createSVG(
    "48", 
    "48", 
    "0 0 24 24", 
    ["M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"],
    "#3498db"
  );
  
  // Cultural Aspects Icon
  const culturalIcon = createSVG(
    "48", 
    "48", 
    "0 0 24 24", 
    ["M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"],
    "#e74c3c"
  );
  
  // Harvard Framework Icon
  const harvardIcon = createSVG(
    "48", 
    "48", 
    "0 0 24 24", 
    ["M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"],
    "#27ae60"
  );
  
  // Assessment Icon
  const assessmentIcon = createSVG(
    "48", 
    "48", 
    "0 0 24 24", 
    ["M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"],
    "#f39c12"
  );
  
  // Insert icons where needed
  const iconContainers = [
    { id: 'behavioral-icon', svg: behavioralIcon },
    { id: 'cultural-icon', svg: culturalIcon },
    { id: 'harvard-icon', svg: harvardIcon },
    { id: 'assessment-icon', svg: assessmentIcon }
  ];
  
  iconContainers.forEach(container => {
    if (document.getElementById(container.id)) {
      insertSVG(container.id, container.svg);
    }
  });
  
  // Create animated icons for interactive elements
  
  // Create handshake icon for negotiation success
  const handshakeIcon = createSVG(
    "64", 
    "64", 
    "0 0 24 24", 
    ["M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"],
    "#27ae60"
  );
  
  if (document.getElementById('handshake-icon')) {
    insertSVG('handshake-icon', handshakeIcon);
  }
});

// Export SVG creation functions for use in other scripts
export { createSVG, insertSVG };
