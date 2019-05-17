chrome.runtime.onMessage.addListener( function (req, sender, sendResponse) {
	let message = req.message;
	if(message !== "getVideoName"){
		return;
	}

	let titles = document.getElementsByClassName("_1fHNK");
	var titlesList = Array.prototype.slice.call(titles);
	let title = titlesList[0];
	let name = title.textContent;
	console.log(name); 
	sendResponse({ name: name, type: "vimeo" });
	return true;
});