const K_HOST = "owner";
const K_PRESENTER = "presenter";
const K_PARTICIPANT = "viewer";

const onConfigured = () => console.log('Custom pod ready');
const caughtUp = () => setPermissions();
const roleChanged = () => setPermissions();
const setPermissions = () => {
    if (hasPermission()) {
        roll_button.style.visibility = "visible";
    } else {
        roll_button.style.visibility = "hidden";
    }
}

const hasPermission = () => {
    if (typeof syncConnector != "undefined") {
        const user = syncConnector.getMyUserDetails();
        return user.data.role == K_HOST || user.data.role == K_PRESENTER;
    } else {
        return true;
    }
}

const syncMessageReceived = (event) => {
    const msgName = event.msgNm;
    const msgVal = event.msgVal;
    console.log(`[syncMessageReceived] (${msgName}): ${msgVal}`);
    const data = JSON.parse(msgVal);
    switch (msgName) {
        case "roll":
            rollDice(data.number)
            break;
        default:
            break;
    }
}


try {
    var syncConnector = ConnectCustomSDK.SyncConnector || {};
} catch (err) {
    console.warn("SyncConnector not initalized");
}
if (typeof syncConnector !== "undefined") {
    syncConnector.init(
      onConfigured,
      "com.camerondahl.dice",
      "1.0.001",
      "connectsdkhook"
    );
    syncConnector.registerCallback("syncMessageReceived", syncMessageReceived);
    syncConnector.registerCallback("caughtUp", caughtUp);
    syncConnector.registerCallback("roleChanged", roleChanged);
}