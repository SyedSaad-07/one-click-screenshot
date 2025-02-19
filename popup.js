document.getElementById("screenshotBtn").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "capture_screenshot" }, (response) => {
        if (chrome.runtime.lastError || !response.success) {
            console.error("Failed to capture screenshot:", chrome.runtime.lastError?.message || response.error);
            return;
        }

        const dataUrl = response.dataUrl;
        if (!dataUrl) {
            console.error("No data URL received.");
            return;
        }

        // Download the screenshot
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `screenshot-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});