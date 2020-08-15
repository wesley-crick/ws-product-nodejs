const maxCallsPerMin = 5;	// How many times any API endpoints can be hit per minute

const RateLimit = class RateLimit {
	
	/**
	 * 
	 * @param {Int} userId 
	 * @param {DateTime} currentDate 
	 */
	constructor(userId, currentDate) {
		this.userId = userId;
		this._floorMinute(currentDate);

		this.numOfHits = 0;
	}

	/**
	 * Floor given date down to minute, aka 0 seconds, 0 ms
	 * 
	 * @param {DateTime} currentDate 
	 */
	_floorMinute(currentDate) {
		this.currentDate = currentDate;
		this.currentDate.setSeconds(0);
		this.currentDate.setMilliseconds(0);
	}

	/**
	 * Has the current user used up their allowed number of calls
	 * 
	 * @returns {Boolean} True if they are still within the limit, else false
	 */
	isValid() {

		// Check if it is no longer the current minute
		const d = new Date();
		const diff = d - this.currentDate;
		if ( diff > 60000 ) {	// It is not so reset the rate limit
			this._floorMinute(d);
			this.numOfHits = 0;
		}

		if ( this.numOfHits > maxCallsPerMin ) {
			return false;
		}

		this.numOfHits++;

		return true;
	}

	/**
	 * Find the user in the array of rate limits
	 * 
	 * @param {RateLimit[]} rateLimitArr All users using the system
	 * @param {Int} userId The user ID of the person using the system
	 */
	static findUser(rateLimitArr, userId) {
		let rateLimit = rateLimitArr.find(r => r.userId == userId);
		if ( !rateLimit ) {
			rateLimit = new RateLimit(userId, new Date());
			rateLimitArr.push(rateLimit);
		}
		return rateLimit;
	}
}

module.exports.RateLimit = RateLimit