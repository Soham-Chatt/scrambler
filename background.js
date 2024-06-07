let popupWindowId;

function createPopup() {
  if (popupWindowId) {
    browser.windows.update(popupWindowId, { focused: true });
  } else {
    browser.windows.create({
      url: "popup.html",
      type: "popup",
      width: 250,
      height: 200,
      left: screen.availWidth - 260,
      top: screen.availHeight - 220
    }).then(windowInfo => {
      popupWindowId = windowInfo.id;
      browser.windows.onRemoved.addListener(onRemoved);
    });
  }
}

function onRemoved(windowId) {
  if (windowId === popupWindowId) {
    popupWindowId = null;
  }
}

browser.browserAction.onClicked.addListener(createPopup);
