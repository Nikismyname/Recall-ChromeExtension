chrome.runtime.onMessage.addListener( function (req, sender, sendResponse) {
	let message = req.message;
	if(message !== "getVideoName"){
		return;
	}

	let titles = document.getElementsByClassName("title");
    var titlesList = Array.prototype.slice.call(titles);
	let title = titlesList.filter(x=> x.tagName === "H1")[0];
	let name = title.textContent;
	console.log(name); 
	sendResponse(name);
	return true;
});