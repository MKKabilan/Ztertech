document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    alert('Right-click is disabled on this site.');
  });

document.addEventListener('keydown', function (e) {
    if (e.key === "F12" || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') || 
        (e.ctrlKey && e.key === 'U')) {
      e.preventDefault();
    }
  });