/**
 * @author Christian Brel <christian@pulsetotem.fr, ch.brel@gmail.com>
 */

/// <reference path="../t6s-core/core-backend/scripts/session/SessionSourceNamespaceManager.ts" />

/// <reference path="./sources/Manager.ts" />

/// <reference path="../t6s-core/core-backend/t6s-core/core/scripts/infotype/Cmd.ts" />
/// <reference path="../t6s-core/core-backend/t6s-core/core/scripts/infotype/CmdList.ts" />
/// <reference path="../t6s-core/core-backend/t6s-core/core/scripts/infotype/priorities/InfoPriority.ts" />

/**
 * Represents the PulseTotem LiveCommunity's SessionSourceNamespaceManager for each call from PulseTotem's Client.
 *
 * @class LiveCommunityNamespaceManager
 * @extends SessionSourceNamespaceManager
 */
class LiveCommunityNamespaceManager extends SessionSourceNamespaceManager {

    /**
     * Constructor.
     *
     * @constructor
     * @param {any} socket - The socket.
     */
    constructor(socket : any) {
        super(socket);
	    this.addListenerToSocket('Manager', function(params : any, self : LiveCommunityNamespaceManager) { (new Manager(params, self)) });
    }
}