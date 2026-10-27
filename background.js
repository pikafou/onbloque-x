// Clic sur l'icône : démarre sur l'onglet X ouvert, sinon ouvre x.com et démarre au chargement.
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url && tab.url.startsWith('https://x.com/')) {
    chrome.tabs.sendMessage(tab.id, { a: 'start' }).catch(async () => {
      await chrome.storage.local.set({ go: true });
      chrome.tabs.reload(tab.id);
    });
  } else {
    await chrome.storage.local.set({ go: true });
    chrome.tabs.create({ url: 'https://x.com/home' });
  }
});
