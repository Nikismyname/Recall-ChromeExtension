//directory can be "root", "current", "chooseLater"
let inProduction = false; 
let appUrlSelector;
if (inProduction) {
	appUrlSelector = "https://recall-angular-backend.herokuapp.com/*";
} else {
	appUrlSelector = "http://localhost:4200/*";
}

function getCurrentUrl(directory) {
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
		let url = tabs[0].url;
		if(!url.toUpperCase().includes("YOUTUBE")){
			alert("You Can Only Add YouTube Videos!");
			return;
		}
		let currentTabId = tabs[0].id;
		chrome.tabs.sendMessage(currentTabId, {"message": "getVideoName"}, function (name) {
			let encodedUrl = encodeURIComponent(url);
			getRecallTab(encodedUrl, name, directory);
		});
	});
}

function getRecallTab(url, name, directory){
	chrome.tabs.query({"url": appUrlSelector}, function (tabs) {
		let tabId = tabs[0].id;
		chrome.tabs.sendMessage(tabId, {"message": "recallCreate", "url": url, "name": name, "directory": directory });
	});
};

document.getElementById("addToRecalCurrentDirectory").addEventListener("click",() => getCurrentUrl("current"));
document.getElementById("addToRecalRootDirectory").addEventListener("click",() => getCurrentUrl("root"));
document.getElementById("addToRecalChooseLater").addEventListener("click",() => getCurrentUrl("chooseLater"));

