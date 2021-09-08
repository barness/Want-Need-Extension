// background.js

// Wrap in an onInstalled callback in order to avoid unnecessary work
// every time the background script is run
chrome.runtime.onInstalled.addListener(() => {
  // Page actions are disabled by default and enabled on select tabs
  chrome.action.disable();

  // Clear all rules to ensure only our expected rules are set
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    // Declare a rule to enable the action on example.com pages
    let exampleRule = {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {urlContains: 'checkout'},
        })
      ],
      actions: [new chrome.declarativeContent.ShowAction()],
    };

    // Finally, apply our new array of rules
    let rules = [exampleRule];
    chrome.declarativeContent.onPageChanged.addRules(rules);
  });
});

// chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
//   if (changeInfo.status == 'complete') {
//     chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
//       let current_url = String(tabs[0].url);
//       // use `current_url` here inside the callback because it's asynchronous!
//       console.log(`THE URL IS: ${current_url}`);
//       if (current_url.includes("checkout")) {
//         console.log(`THIS IS CHECKOUT TIME`);
//         chrome.tabs.create({url:"popup.html"});
//       };
//     });
//   };
// });
