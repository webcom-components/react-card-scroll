setTimeout(() => {
	const devServer = document.createElement('script');
	devServer.setAttribute('src', `http://${window.location.host}/webpack-dev-server.js`);
	document.body.appendChild(devServer);
});