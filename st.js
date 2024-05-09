// Get all the wrapper elements
const wrappers = document.querySelectorAll(".wrapper");

// Function to generate a unique identifier
function generateUniqueId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Function to increment the impressions counter
function incrementImpressions(uniqueId, wrapper) {
  let impressions = parseInt(
    localStorage.getItem(`impressions_${uniqueId}_${wrapper.classList[1]}`) || 0
  );
  impressions++;
  localStorage.setItem(
    `impressions_${uniqueId}_${wrapper.classList[1]}`,
    impressions
  );
  if (wrapper.getAttribute("data-count-enabled") === "true") {
    wrapper.querySelector(".impressions").textContent = impressions;
  }
}

// Function to increment the clicks counter
function incrementClicks(uniqueId, wrapper) {
  let totalClicks = parseInt(
    localStorage.getItem(`totalClicks_${uniqueId}`) || 0
  );

  if (totalClicks < getTotalClickThreshold()) {
    let clicks = parseInt(
      localStorage.getItem(`clicks_${uniqueId}_${wrapper.classList[1]}`) || 0
    );
    clicks++;
    localStorage.setItem(`clicks_${uniqueId}_${wrapper.classList[1]}`, clicks);
    if (wrapper.getAttribute("data-count-enabled") === "true") {
      wrapper.querySelector(".clicks").textContent = clicks;
    }

    totalClicks++;
    localStorage.setItem(`totalClicks_${uniqueId}`, totalClicks);

    // Check if the total clicks reach the threshold
    if (totalClicks === getTotalClickThreshold()) {
      alert(`Total click threshold of ${getTotalClickThreshold()} reached!`);
      hideWrappers();
    }
  }
}

// Function to hide all wrappers
function hideWrappers() {
  wrappers.forEach((wrapper) => {
    wrapper.style.display = "none";
  });
}

// Function to reset the counters and show the wrappers after a specific time interval
function resetCounters(uniqueId) {
  wrappers.forEach((wrapper) => {
    localStorage.removeItem(`impressions_${uniqueId}_${wrapper.classList[1]}`);
    localStorage.removeItem(`clicks_${uniqueId}_${wrapper.classList[1]}`);
    if (wrapper.getAttribute("data-count-enabled") === "true") {
      wrapper.querySelector(".impressions").textContent = 0;
      //wrapper.querySelector('.clicks').textContent = 0;
    }
  });

  localStorage.removeItem(`totalClicks_${uniqueId}`);
  showWrappers();
}

// Function to show all wrappers
function showWrappers() {
  wrappers.forEach((wrapper) => {
    wrapper.style.display = "block";
  });
}

// Function to retrieve the total click threshold from the script attribute
function getTotalClickThreshold() {
  const script = document.querySelector("script[data-total-click-threshold]");
  return script
    ? parseInt(script.getAttribute("data-total-click-threshold"))
    : 10;
}

// Function to retrieve the reset interval from the script attribute
function getResetInterval() {
  const script = document.querySelector("script[data-reset-interval]");
  return script ? parseInt(script.getAttribute("data-reset-interval")) : 86400;
}

// Get or generate a unique identifier for the visitor
let uniqueId = localStorage.getItem("uniqueId");
if (!uniqueId) {
  uniqueId = generateUniqueId();
  localStorage.setItem("uniqueId", uniqueId);
}

// Attach event listeners and retrieve existing counts for each wrapper
wrappers.forEach((wrapper, index) => {
  wrapper.classList.add(`wrapper-${index}`);

  // Retrieve the existing impressions and clicks counts for the visitor
  let impressions = parseInt(
    localStorage.getItem(`impressions_${uniqueId}_${wrapper.classList[1]}`) || 0
  );
  let clicks = parseInt(
    localStorage.getItem(`clicks_${uniqueId}_${wrapper.classList[1]}`) || 0
  );

  // Update the displayed counts only for enabled wrappers
  if (wrapper.getAttribute("data-count-enabled") === "true") {
    wrapper.querySelector(".impressions").textContent = impressions;
    wrapper.querySelector(".clicks").textContent = clicks;
  } else {
    wrapper.querySelector(".impressions").textContent = "";
    wrapper.querySelector(".clicks").textContent = "";
  }

  // Attach event listeners
  wrapper.addEventListener("click", () => {
    incrementClicks(uniqueId, wrapper);
  });

  // Increment impressions on page load
  window.addEventListener("load", () => {
    incrementImpressions(uniqueId, wrapper);
  });
});

// Check if the total clicks have already reached the threshold
let totalClicks = parseInt(
  localStorage.getItem(`totalClicks_${uniqueId}`) || 0
);
if (totalClicks >= getTotalClickThreshold()) {
  hideWrappers();
}

// Reset the counters and show the wrappers after the specified reset interval
setInterval(() => {
  resetCounters(uniqueId);
}, getResetInterval() * 1000);
