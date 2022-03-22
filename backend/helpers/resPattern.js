let successPattern = (code, data, status) => {
	return {
		'code': code,
		'data': data,
		'status': status
	};
};

let errorPattern = (code, message, status) => {
	return {
		'code': code,
		'data': message,
		'status': status
	};
};

let successMessage = (code, message) => {
	return {
		'code': code,
		'success': { "message": message }
	};
};

module.exports = {
	successPattern,
	errorPattern,
	successMessage
};
