//directory can be "root", "current", "chooseLater"
let inProduction = false; 
let appUrlSelector;
if (inProduction) {
	appUrlSelector = "https://recall-angular-backend.herokuapp.com/*";
} else {
	appUrlSelector = "http://localhost:4200/*";
}

function getCurrentUrl(directory) {
	chrome.tabs.query({'active': true ,currentWindow: true}, function (tabs) {
		let url = tabs[0].url;
		if(!url.toUpperCase().includes("YOUTUBE.COM/WATCH") && !url.toUpperCase().includes("VIMEO.COM/")){
			alert("You Can Only Add YouTube and Vimeo Videos!");
			return;
		}
		let currentTabId = tabs[0].id;
		chrome.tabs.sendMessage(currentTabId, { "message": "getVideoName" }, function (obj) {
			let name = obj.name; 
			let type = obj.type;
			let encodedUrl = encodeURIComponent(url);
			getRecallTab(encodedUrl, name, directory, type);
		});
	});
}

function getRecallTab(url, name, directory, type){
	chrome.tabs.query({"url": appUrlSelector}, function (tabs) {
		let tabId = tabs[0].id;
		let shouldOpen = document.getElementById("shouldRedirect").checked;
		chrome.tabs.sendMessage(tabId,
			{
				"message": "recallCreate",
				"url": url,
				"name": name,
				"directory": directory, 
				"shouldOpen": shouldOpen,
				"type": type,
			});
		
		let shouldFocus = document.getElementById("shouldFocus").checked;
		if (shouldFocus) {
			var updateProperties = { 'active': true };
			chrome.tabs.update(tabId, updateProperties, (tab) => { });
		}
	});
};

document.getElementById("addToRecalCurrentDirectory").addEventListener("click",() => getCurrentUrl("current"));
document.getElementById("addToRecalRootDirectory").addEventListener("click",() => getCurrentUrl("root"));
document.getElementById("addToRecalChooseLater").addEventListener("click",() => getCurrentUrl("chooseLater"));

