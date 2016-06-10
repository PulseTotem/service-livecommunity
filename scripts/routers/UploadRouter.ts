/**
 * @author Christian Brel <christian@pulsetotem.fr, ch.brel@gmail.com>
 */

/// <reference path="../../t6s-core/core-backend/scripts/Logger.ts" />
/// <reference path="../../t6s-core/core-backend/scripts/server/RouterItf.ts" />

/// <reference path="../LiveCommunity.ts" />

var fs : any = require('fs');
var child_process : any = require('child_process');

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

		/*var files = req.body.files;

		// writing audio file to disk
		this.writeFile(files.audio);

		if (files.isFirefox == 'true') {
			res.status(200).json(files.audio.name);
		}

		if (files.isFirefox != 'true') {
			// writing video file to disk
			this.writeFile(files.video);

			this.merge(res, files);
		}*/
		this.merge(res, req.files, req.body.file.filename);
	}

	merge(response, files, filename) {
		// its probably *nix, assume ffmpeg is available
		var audioFile = files['file[audio-blob]'].path;
		var videoFile = files['file[video-blob]'].path;
		var mergedFile = LiveCommunity.upload_directory + '/' + filename + '-merged.webm';

		var command = "ffmpeg -i " + videoFile + " -i " + audioFile + " " + mergedFile;

		child_process.exec(command, function (error, stdout, stderr) {
			//if (stdout) console.log(stdout);
			if (stderr) console.log(stderr);

			if (error) {
				console.log('exec error: ' + error);
				response.status(500).send({ 'error': error });
			} else {
				response.status(200).json(filename + '-merged.webm');

				// removing audio/video files
				//fs.unlink(audioFile);
				//fs.unlink(videoFile);
			}

		});
	}

	writeFile(file) {
		var fileRootName = file.name.split('.').shift(),
			fileExtension = file.name.split('.').pop(),
			filePathBase = LiveCommunity.upload_directory + '/',
			fileRootNameWithBase = filePathBase + fileRootName,
			filePath = fileRootNameWithBase + '.' + fileExtension,
			fileID = 2,
			fileBuffer;

		while (fs.existsSync(filePath)) {
			filePath = fileRootNameWithBase + '(' + fileID + ').' + fileExtension;
			fileID += 1;
		}

		file.contents = file.contents.split(',').pop();

		fileBuffer = new Buffer(file.contents, "base64");

		fs.writeFileSync(filePath, fileBuffer);
	}
}