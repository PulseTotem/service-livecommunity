/**
 * @author Christian Brel <christian@pulsetotem.fr, ch.brel@gmail.com>
 */

/// <reference path="../../t6s-core/core-backend/scripts/Logger.ts" />
/// <reference path="../../t6s-core/core-backend/scripts/server/RouterItf.ts" />

/**
 * UploadRouter class.
 *
 * @class UploadRouter
 * @extends RouterItf
 */
class UploadRouter extends RouterItf {

	/**
	 * Constructor.
	 */
	constructor() {
		super();
	}

	/**
	 * Method called during Router creation.
	 *
	 * @method buildRouter
	 */
	buildRouter() {
		var self = this;

		this.router.post('/', function(req, res) { self.newUpload(req, res); });
	}

	/**
	 * Manage new Upload.
	 *
	 * @method newUpload
	 * @param {Express.Request} req - Request object.
	 * @param {Express.Response} res - Response object.
	 */
	newUpload(req : any, res : any) {
		Logger.debug(req);
		res.status(200).end();
	}
}