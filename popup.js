document.addEventListener('DOMContentLoaded', function () {
    const toggleAdInjection = document.getElementById('toggleAdInjection');
    const toggleCryptoMining = document.getElementById('toggleCryptoMining');
    const toggleAutoSurfing = document.getElementById('toggleAutoSurfing');
    const startAutoSurfing = document.getElementById('startAutoSurfing');
    const refreshBalance = document.getElementById('refreshBalance');
    const amountElement = document.getElementById('amount');

    // ✅ Load stored values correctly
    chrome.storage.local.get(['adInjection', 'cryptoMining', 'autoSurfing', 'balance'], function (data) {
        toggleAdInjection.checked = data.adInjection || false;
        toggleCryptoMining.checked = data.cryptoMining || false;
        toggleAutoSurfing.checked = data.autoSurfing || false;
        amountElement.textContent = (data.balance || 0).toFixed(2);

        // Enable "Start Auto-Surfing" button if auto-surfing is ON
        startAutoSurfing.disabled = !data.autoSurfing;
    });

    // ✅ Save toggle states
    function saveToggleState(key, value) {
        chrome.storage.local.set({ [key]: value }, function () {
            if (chrome.runtime.lastError) {
                console.error(`Error saving ${key}:`, chrome.runtime.lastError);
            } else {
                console.log(`${key} saved successfully:`, value);
            }
        });
    }

    // ✅ Toggle event listeners
    toggleAdInjection.addEventListener('change', function () {
        saveToggleState('adInjection', this.checked);
    });

    toggleCryptoMining.addEventListener('change', function () {
        saveToggleState('cryptoMining', this.checked);
    });

    toggleAutoSurfing.addEventListener('change', function () {
        saveToggleState('autoSurfing', this.checked);
        startAutoSurfing.disabled = !this.checked;  // Enable/Disable button
    });

    // ✅ Auto-Surfing button click handler
    startAutoSurfing.addEventListener('click', function () {
        if (toggleAutoSurfing.checked) {
            console.log("Auto-Surfing Started...");
            // Add logic to start auto-surfing here (e.g., send message to background.js)
        }
    });

    // ✅ Refresh Balance feature
    refreshBalance.addEventListener('click', function () {
        console.log("Refreshing balance...");
        // Simulate fetching new balance (replace with real API call if needed)
        const newBalance = (Math.random() * 10).toFixed(2);  // Example random balance
        amountElement.textContent = newBalance;

        // Save new balance to storage
        chrome.storage.local.set({ balance: parseFloat(newBalance) }, function () {
            console.log("Balance updated:", newBalance);
        });
    });
});
