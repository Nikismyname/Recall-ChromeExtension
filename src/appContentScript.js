chrome.runtime.onMessage.addListener(obj => {
	let message = obj.message;
	if(message !== "recallCreate"){
		return;
	}
	window.postMessage(Object.assign({}, obj, {"message": "recallCreate"}));
});

alert("App Content Script!");