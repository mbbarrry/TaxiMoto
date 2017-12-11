import Config from './Config'

export default class Db {
	static set(dbPath, data) {
        return Config.firebase.database().ref(dbPath).set(data);
	}

	// static getUserPath(userId) {
	// 	return "/user/" + userId;
	// }
}

