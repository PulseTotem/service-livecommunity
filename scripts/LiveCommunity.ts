/**
 * @author Christian Brel <christian@pulsetotem.fr, ch.brel@gmail.com>
 */

/// <reference path="../t6s-core/core-backend/scripts/server/SourceServer.ts" />
/// <reference path="../t6s-core/core-backend/scripts/Logger.ts" />
/// <reference path="../t6s-core/core-backend/scripts/server/RouterItf.ts" />

/// <reference path="./LiveCommunityNamespaceManager.ts" />
/// <reference path="./routers/UploadRouter.ts" />

/**
 * Represents the PulseTotem LiveCommunity' Service.
 *
 * @class LiveCommunity
 * @extends SourceServer
 */
class LiveCommunity extends SourceServer {

	static upload_directory : string;

    /**
     * Constructor.
     *
     * @param {number} listeningPort - Server's listening port..
     * @param {Array<string>} arguments - Server's command line arguments.
	 * @param {string} uploadDir - Upload directory path.
	 */
	constructor(listeningPort : number, arguments : Array<string>, uploadDir : string = "") {
        super(listeningPort, arguments, uploadDir);

		Logger.debug(uploadDir);

        this.init();
    }

    /**
     * Method to init the LiveCommunity server.
     *
     * @method init
     */
    init() {
        var self = this;

        this.addNamespace("LiveCommunity", LiveCommunityNamespaceManager);

		this.app.use("/uploads", (new UploadRouter()).getRouter());
    }
}

/**
 * Server's LiveCommunity listening port.
 *
 * @property _LiveCommunityListeningPort
 * @type number
 * @private
 */
var _LiveCommunityListeningPort : number = process.env.PORT || 6015;

/**
 * Server's LiveCommunity command line arguments.
 *
 * @property _LiveCommunityArguments
 * @type Array<string>
 * @private
 */
var _LiveCommunityArguments : Array<string> = process.argv;

if (process.env.LIVECOMMUNITY_UPLOAD_DIR == undefined) {
	LiveCommunity.upload_directory = "/tmp/uploads";
} else {
	LiveCommunity.upload_directory = process.env.LIVECOMMUNITY_UPLOAD_DIR;
}

var serverInstance = new LiveCommunity(_LiveCommunityListeningPort, _LiveCommunityArguments, LiveCommunity.upload_directory);
serverInstance.run();