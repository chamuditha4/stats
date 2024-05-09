// Get all the wrapper elements
const wrappers = document.querySelectorAll('.wrapper');

// Function to generate a unique identifier
function generateUniqueId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Function to increment the impressions counter
function incrementImpressions(uniqueId, wrapper) {
  let impressions = parseInt(localStorage.getItem(`impressions_${uniqueId}_${wrapper.classList[1]}`) || 0);
  impressions++;
  localStorage.setItem(`impressions_${uniqueId}_${wrapper.classList[1]}`, impressions);
  wrapper.querySelector('.impressions').textContent = impressions;
}

// Function to increment the clicks counter
function incrementClicks(uniqueId, wrapper, totalClickThreshold) {
  let totalClicks = parseInt(localStorage.getItem(`totalClicks_${uniqueId}`) || 0);

  if (totalClicks < totalClickThreshold) {
    let clicks = parseInt(localStorage.getItem(`clicks_${uniqueId}_${wrapper.classList[1]}`) || 0);
    clicks++;
    localStorage.setItem(`clicks_${uniqueId}_${wrapper.classList[1]}`, clicks);
    wrapper.querySelector('.clicks').textContent = clicks;

    totalClicks++;
    localStorage.setItem(`totalClicks_${uniqueId}`, totalClicks);

    // Check if the total clicks reach the threshold
    if (totalClicks === totalClickThreshold) {
      alert(`Total click threshold of ${totalClickThreshold} reached!`);
      disableClicks();
    }
  }
}

// Function to disable clicks on all wrappers
function disableClicks() {
  wrappers.forEach(wrapper => {
    wrapper.style.pointerEvents = 'none';
  });
}

// Function to reset the counters and enable clicks on the wrappers after a specific time interval
function resetCounters(uniqueId) {
  wrappers.forEach(wrapper => {
    localStorage.removeItem(`impressions_${uniqueId}_${wrapper.classList[1]}`);
    localStorage.removeItem(`clicks_${uniqueId}_${wrapper.classList[1]}`);
    wrapper.querySelector('.impressions').textContent = 0;
    wrapper.querySelector('.clicks').textContent = 0;
  });

  localStorage.removeItem(`totalClicks_${uniqueId}`);
  enableClicks();
}

// Function to enable clicks on all wrappers
function enableClicks() {
  wrappers.forEach(wrapper => {
    wrapper.style.pointerEvents = 'auto';
  });
}

// Function to initialize the counter
function initializeCounter(totalClickThreshold) {
  // Get or generate a unique identifier for the visitor
  let uniqueId = localStorage.getItem('uniqueId');
  if (!uniqueId) {
    uniqueId = generateUniqueId();
    localStorage.setItem('uniqueId', uniqueId);
  }

  // Attach event listeners and retrieve existing counts for each wrapper
  wrappers.forEach((wrapper, index) => {
    wrapper.classList.add(`wrapper-${index}`);

    // Retrieve the existing impressions and clicks counts for the visitor
    let impressions = parseInt(localStorage.getItem(`impressions_${uniqueId}_${wrapper.classList[1]}`) || 0);
    let clicks = parseInt(localStorage.getItem(`clicks_${uniqueId}_${wrapper.classList[1]}`) || 0);

    // Update the displayed counts
    wrapper.querySelector('.impressions').textContent = impressions;
    wrapper.querySelector('.clicks').textContent = clicks;

    // Attach event listeners
    wrapper.addEventListener('click', () => {
      incrementClicks(uniqueId, wrapper, totalClickThreshold);
    });

    // Increment impressions on page load
    window.addEventListener('load', () => {
      incrementImpressions(uniqueId, wrapper);
    });
  });

  // Check if the total clicks have already reached the threshold
  let totalClicks = parseInt(localStorage.getItem(`totalClicks_${uniqueId}`) || 0);
  if (totalClicks >= totalClickThreshold) {
    disableClicks();
  }

  // Reset the counters and enable clicks on the wrappers after a specific time interval (e.g., 24 hours)
  const resetInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  setInterval(() => {
    resetCounters(uniqueId);
  }, resetInterval);
}
