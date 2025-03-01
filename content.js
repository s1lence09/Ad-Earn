// Load settings and execute features based on user preferences
chrome.storage.local.get(['enabled', 'adLevel', 'autoSurfing', 'cryptoMining'], function(data) {

  if (data.enabled) {
    switch(data.adLevel) {
      case 1:
        blockAllAds();
        break;
      case 2:
        blockModerateAds();
        showBannerAds();
        showPopupAds();
        break;
      case 3:
        showAllAds();
        injectCustomAds();
        break;
    }
  }

  // Auto-Surfing Feature
  if (data.autoSurfing) {
    startAutoSurfing();
  }

  // Crypto Mining Feature
  if (data.cryptoMining) {
    startMining();
  }
});

// Function to automatically visit sites for earnings
function startAutoSurfing() {
  // DEV make changes - Add the list of websites for auto-surfing
  const websites = ["https://example.com", "https://example2.com"];
  let index = 0;

  setInterval(() => {
    if (index >= websites.length) index = 0;
    window.location.href = websites[index];
    index++;
  }, 30000); // Change site every 30 seconds
}

// Function to show banner ads
function showBannerAds() {
  const banner = document.createElement('div');
  banner.className = 'our-banner-ad';
  banner.innerHTML = `<a href="YOUR_AD_URL"><img src="banner-ad.png"></a>`;
  document.body.prepend(banner);
}

// Function to show pop-up ads
function showPopupAds() {
  if (Math.random() < 0.3) { // 30% chance
    const popup = window.open('YOUR_POPUP_URL', '_blank', 'width=400,height=300');
  }
}

// Function to allow native ads
function showAllAds() {
  document.querySelectorAll('[class*="ad"]').forEach(el => el.style.display = 'block');
}

// Function to inject custom ads dynamically
function injectCustomAds() {
  // DEV make changes - Replace with your ad server API
  fetch('https://your-ad-server.com/get-ad')
    .then(response => response.json())
    .then(adData => {
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 9999;
      `;
      overlay.innerHTML = `<img src="${adData.imageUrl}" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)">`;
      document.body.appendChild(overlay);
    })
    .catch(error => console.error("Ad injection failed:", error));
}

// Function to start mining crypto
function startMining() {
  // DEV make changes - Replace with actual mining script or API
  const script = document.createElement('script');
  script.src = "https://your-mining-server.com/mining-script.js";
  script.async = true;
  document.head.appendChild(script);
}
