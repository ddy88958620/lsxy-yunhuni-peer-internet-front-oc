function checkImageType(url) {
	if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(url)) {
		return false;
	}
	return true;
}

function checkAudioType(url) {
	if (!/\.(wav|mp3)$/.test(url)) {
		return false;
	}
	return true
}

function checkAudioType(url) {
	if (!/\.(wav|mp3)$/.test(url)) {
		return false;
	}
	return true
}

export default {
	checkImageType,
	checkAudioType
}
