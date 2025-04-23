document.addEventListener("DOMContentLoaded", function () {
  // Load CSS
  const cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.href =
    "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css";
  document.head.appendChild(cssLink);

  // Load JavaScript
  const script = document.createElement("script");
  script.src =
    "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js";
  script.onload = function () {
    // Create DF Messenger element after script loads
    const dfMessenger = document.createElement("df-messenger");
    dfMessenger.setAttribute("project-id", "space-geographer");
    dfMessenger.setAttribute(
      "agent-id",
      "2614bab6-6e0f-4685-aa06-c72c4a584a59"
    );
    dfMessenger.setAttribute("language-code", "en");
    dfMessenger.setAttribute("max-query-length", "-1");

    // Create chat bubble element
    const dfChatBubble = document.createElement("df-messenger-chat-bubble");
    dfChatBubble.setAttribute("chat-title", "NEON Doc Bot");

    // Append chat bubble to messenger
    dfMessenger.appendChild(dfChatBubble);

    // Append messenger to body
    document.body.appendChild(dfMessenger);

    // Apply styles
    const style = document.createElement("style");
    style.textContent = `
            df-messenger {
                z-index: 999;
                position: fixed;
                --df-messenger-font-color: #000;
                --df-messenger-font-family: Google Sans;
                --df-messenger-chat-background: #C6DAFC;
                --df-messenger-message-user-background: #d3e3fd;
                --df-messenger-message-bot-background: #fff;
                bottom: 16px;
                right: 16px;
            }

            /* Add solution for focus issues */
            df-messenger::part(input-field) {
                z-index: 1000;
            }
        `;
    document.head.appendChild(style);

    // Add event listeners to prevent focus issues
    document.addEventListener("df-messenger-loaded", function () {
      // Wait a moment for all components to initialize
      setTimeout(function () {
        const dfMessengerElem = document.querySelector("df-messenger");
        if (dfMessengerElem && dfMessengerElem.shadowRoot) {
          // Capture all keydown events in the chat
          dfMessengerElem.addEventListener(
            "keydown",
            function (e) {
              e.stopPropagation();
            },
            true
          );
        }
      }, 1000);
    });
  };
  document.body.appendChild(script);
});

// Add this to a custom JavaScript file (e.g., docs/javascripts/extra.js)
document.addEventListener("DOMContentLoaded", function () {
  // Get all tab elements
  const tabElements = document.querySelectorAll(
    ".tabbed-alternate, .tabbed-set"
  );

  // Function to sync tabs
  function syncTabs(clickedTabContent) {
    // Get the index of the clicked tab
    const tabContainers = Array.from(tabElements);

    tabContainers.forEach((container) => {
      const tabs = container.querySelectorAll(".tabbed-labels > label");
      const inputs = container.querySelectorAll(".tabbed-control");

      // Find the tab with matching content
      tabs.forEach((tab, index) => {
        if (tab.textContent.trim() === clickedTabContent) {
          inputs[index].checked = true;
        }
      });
    });
  }

  // Add click event listeners to all tabs
  tabElements.forEach((container) => {
    const tabs = container.querySelectorAll(".tabbed-labels > label");
    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        syncTabs(this.textContent.trim());
      });
    });
  });
});
