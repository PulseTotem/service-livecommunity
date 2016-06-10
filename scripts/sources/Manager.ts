/**
 * @author Christian Brel <christian@pulsetotem.fr, ch.brel@gmail.com>
 */

/// <reference path="../../t6s-core/core-backend/scripts/Logger.ts" />
/// <reference path="../../t6s-core/core-backend/scripts/server/SourceItf.ts" />

/// <reference path="../../t6s-core/core-backend/t6s-core/core/scripts/infotype/Cmd.ts" />
/// <reference path="../../t6s-core/core-backend/t6s-core/core/scripts/infotype/CmdList.ts" />

/// <reference path="../LiveCommunityNamespaceManager.ts" />

var uuid : any = require('node-uuid');

class Manager extends SourceItf {

	/**
	 * Constructor.
	 *
	 * @param {Object} params - Source's params.
	 * @param {LiveCommunityNamespaceManager} guestBookNamespaceManager - NamespaceManager attached to Source.
	 */
	constructor(params : any, liveCommunityNamespaceManager : LiveCommunityNamespaceManager) {
		super(params, liveCommunityNamespaceManager);

		if (this.checkParams(["InfoDuration", "Limit"])) {
			this.run();
		}
	}

	/**
	 * Method to run action attached to Source.
	 *
	 * @method run
	 */
	public run() {
		var cmd : Cmd = new Cmd(uuid.v1());
		cmd.setDurationToDisplay(parseInt(this.getParams().InfoDuration));
		cmd.setCmd("Wait");
		var args : Array<string> = new Array<string>();
		args.push(this.getSourceNamespaceManager().socket.id);
		cmd.setArgs(args);

		var list : CmdList = new CmdList(uuid.v1());
		list.addCmd(cmd);

		this.getSourceNamespaceManager().sendNewInfoToClient(list);
	}
}