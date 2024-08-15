let startTime;
let endTime;
let totalTime;

// Search for controls bar so that we can add our timing controls to it.
let existingControls;
const controlsSearchInterval = setInterval(searchForExistingControls, 500)

// Get the video element, we will extract the time from this.
const video = document.querySelector("video");

// Finds the youtube video player controls
function searchForExistingControls() {
    console.log("Searching for controls...");
    const body = document.querySelector("body");
    console.log(body);
    videoControls = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-right-controls");
    if(videoControls != undefined) {
        createControls();
        clearInterval(controlsSearchInterval);
    }
}

// Adds our timing controls to the player
function createControls() {
    // Create button to set start time
    const setStartTimeButton = document.createElement("button");
    setStartTimeButton.setAttribute("class", "ytp-button");
    setStartTimeButton.innerHTML = `<svg width="30px" height="100%" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 4a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1zm7.219.376a1 1 0 111.562 1.249L11.28 10l3.5 4.375a1 1 0 11-1.562 1.249l-4-5a1 1 0 010-1.25l4-5z" fill="#e6e6e6"/></svg>`;
    setStartTimeButton.addEventListener("click", setStartTime);

    const setEndTimeButton = document.createElement("button");
    setEndTimeButton.setAttribute("class", "ytp-button");
    setEndTimeButton.innerHTML = `<svg width="30px" height="100%" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M14 4a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1zm-7.219.376l4 5a1 1 0 010 1.249l-4 5a1 1 0 11-1.562-1.25l3.5-4.374-3.5-4.376a1 1 0 111.562-1.25z" fill="#e6e6e6"/></svg>`;
    setEndTimeButton.addEventListener("click", setEndTime);

    videoControls.append(setStartTimeButton);
    videoControls.append(setEndTimeButton);
}

// Sets the start selection time
function setStartTime() {
    startTime = document.querySelector("video").currentTime;
    updateSelectedTime();
}

// Sets the end selection time
function setEndTime() {
    endTime = document.querySelector("video").currentTime;
    updateSelectedTime();
}

// Recalculates the selected time portion
function updateSelectedTime() {
    if(document.querySelector("#timeDisplayMenu") == undefined) {
        createTimeDisplayMenu();
    }

    if(startTime == undefined || endTime == undefined) return;
    totalTime = endTime - startTime;
    console.log(`Start: ${formatTime(startTime)} | End: ${formatTime(endTime)} | Total: ${formatTime(totalTime)}`);

    updateTimeDisplayMenu();
}

function formatTime(timeInSecs) {
    // Convert seconds to milliseconds
    const timeInMillisecs = timeInSecs * 1000;
  
    // Get hours, minutes, seconds, and milliseconds
    const hours = Math.floor(timeInMillisecs / 3600000);
    const minutes = Math.floor((timeInMillisecs % 3600000) / 60000);
    const seconds = Math.floor((timeInMillisecs % 60000) / 1000);
    const milliseconds = Math.floor(timeInMillisecs % 1000);
  
    // Pad with zeros if necessary
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMilliseconds = milliseconds.toString().padStart(3, '0');
  
    // Return the formatted time string
    const formattedString = `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`
    if(formattedString.includes("NaN")) {
        return "N/A";
    }
    if(formattedString.includes("-1")) {
        return "N/A";
    }

    return formattedString;
  }

  // Create a menu to display the timing information
  function createTimeDisplayMenu() {
    console.log("creating time display menu");
    const timeDisplayMenu = document.createElement("div");
    timeDisplayMenu.id = "timeDisplayMenu";
    
    const menuContainer = document.querySelector("#player");
    menuContainer.append(timeDisplayMenu);

    updateTimeDisplayMenu();
  }

  // Update the time display
  function updateTimeDisplayMenu() {
    const timeDisplayMenu = document.querySelector("#timeDisplayMenu");
    if(timeDisplayMenu == undefined) return;
    timeDisplayMenu.outerHTML = `
        <div id="timeDisplayMenu" style="position: absolute; left: 0; top: 0; height: auto; width: 30%; color: white; background-color: rgba(0, 0, 0, 0.75); font-size: 1.5rem; margin: 1rem; padding: 1rem; border-radius: 1rem;">
            <h2>Timing Tool</h2>
            <p>Start time: ${formatTime(startTime) ?? "N/A"}</p>
            <p>End time: ${formatTime(endTime) ?? "N/A"}</p>
            <p>Total time: ${formatTime(totalTime) ?? "N/A"}</p>
        </div>
    `;
  }