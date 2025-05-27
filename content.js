console.log('[Gmail Favicon Extension] content.js loaded');

function updateFaviconWithUnreadCount(count) {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#D93025';
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = String(count).length >= 3 ? 'bold 28px sans-serif' : 'bold 36px sans-serif';
    ctx.fillText(count, 32, 34);

    const oldFavicon = document.querySelector("link[rel~='icon']");
    if (oldFavicon) oldFavicon.remove();

    const newFavicon = document.createElement('link');
    newFavicon.rel = 'icon';
    newFavicon.href = canvas.toDataURL('image/png');
    document.head.appendChild(newFavicon);

    if (count !== "0") {
      console.log("[Gmail Favicon Extension] Favicon updated with count:", count);
    }
  } catch (e) {
    console.error("[Gmail Favicon Extension] Favicon update error:", e);
  }
}

function getUnreadFromDOM() {
  const title = document.title;
  const match = title.match(/\((\d+)\)/);
  if (match) return match[1];
  return "0";
}

function monitorUnreadCount() {
  const count = getUnreadFromDOM();
  if (count != null) {
    updateFaviconWithUnreadCount(count);
  }
}

monitorUnreadCount();
setInterval(monitorUnreadCount, 3000);