"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable");
var Common = /** @class */ (function (_super) {
    __extends(Common, _super);
    function Common() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultServers = [
            'stun:stun.l.google.com:19302',
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
            'stun:stun3.l.google.com:19302',
            'stun:stun4.l.google.com:19302'
        ];
        return _this;
    }
    return Common;
}(observable_1.Observable));
exports.Common = Common;
var Quality;
(function (Quality) {
    Quality[Quality["MAX_480P"] = 0] = "MAX_480P";
    Quality[Quality["MAX_720P"] = 1] = "MAX_720P";
    Quality[Quality["MAX_1080P"] = 2] = "MAX_1080P";
    Quality[Quality["MAX_2160P"] = 3] = "MAX_2160P";
    Quality[Quality["HIGHEST"] = 4] = "HIGHEST";
    Quality[Quality["LOWEST"] = 5] = "LOWEST";
})(Quality = exports.Quality || (exports.Quality = {}));
var WebRTCDataChannelMessageType;
(function (WebRTCDataChannelMessageType) {
    WebRTCDataChannelMessageType["BINARY"] = "binary";
    WebRTCDataChannelMessageType["TEXT"] = "text";
})(WebRTCDataChannelMessageType = exports.WebRTCDataChannelMessageType || (exports.WebRTCDataChannelMessageType = {}));
var SignalingState;
(function (SignalingState) {
    SignalingState["STABLE"] = "stable";
    SignalingState["HAVE_LOCAL_OFFER"] = "have-local-offer";
    SignalingState["HAVE_LOCAL_PRANSWER"] = "have-local-pranswer";
    SignalingState["HAVE_REMOTE_OFFER"] = "have-remote-offer";
    SignalingState["HAVE_REMOTE_PRANSWER"] = "have-remote-pranswer";
    SignalingState["CLOSED"] = "closed";
})(SignalingState = exports.SignalingState || (exports.SignalingState = {}));
var IceGatheringState;
(function (IceGatheringState) {
    IceGatheringState["NEW"] = "new";
    IceGatheringState["GATHERING"] = "gathering";
    IceGatheringState["COMPLETE"] = "complete";
})(IceGatheringState = exports.IceGatheringState || (exports.IceGatheringState = {}));
var IceConnectionState;
(function (IceConnectionState) {
    IceConnectionState["NEW"] = "new";
    IceConnectionState["CHECKING"] = "checking";
    IceConnectionState["CONNECTED"] = "connected";
    IceConnectionState["COMPLETED"] = "completed";
    IceConnectionState["FAILED"] = "failed";
    IceConnectionState["DISCONNECTED"] = "disconnected";
    IceConnectionState["CLOSED"] = "closed";
})(IceConnectionState = exports.IceConnectionState || (exports.IceConnectionState = {}));
var WebRTCDataChannelState;
(function (WebRTCDataChannelState) {
    WebRTCDataChannelState["CONNECTING"] = "connecting";
    WebRTCDataChannelState["CLOSED"] = "closed";
    WebRTCDataChannelState["CLOSING"] = "closing";
    WebRTCDataChannelState["OPEN"] = "open";
})(WebRTCDataChannelState = exports.WebRTCDataChannelState || (exports.WebRTCDataChannelState = {}));
var IceServer = /** @class */ (function () {
    function IceServer() {
    }
    return IceServer;
}());
exports.IceServer = IceServer;
var WebRTCState;
(function (WebRTCState) {
    WebRTCState[WebRTCState["CONNECTING"] = 0] = "CONNECTING";
    WebRTCState[WebRTCState["DISCONNECTED"] = 1] = "DISCONNECTED";
    WebRTCState[WebRTCState["CONNECTED"] = 2] = "CONNECTED";
})(WebRTCState = exports.WebRTCState || (exports.WebRTCState = {}));
var WebRTCSdpType;
(function (WebRTCSdpType) {
    WebRTCSdpType["OFFER"] = "offer";
    WebRTCSdpType["PRANSWER"] = "prAnswer";
    WebRTCSdpType["ANSWER"] = "answer";
})(WebRTCSdpType = exports.WebRTCSdpType || (exports.WebRTCSdpType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicnRjLmNvbW1vbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndlYnJ0Yy5jb21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrREFBOEQ7QUFFOUQ7SUFBNEIsMEJBQVU7SUFBdEM7UUFBQSxxRUFRQztRQVBDLG9CQUFjLEdBQWtCO1lBQzlCLDhCQUE4QjtZQUM5QiwrQkFBK0I7WUFDL0IsK0JBQStCO1lBQy9CLCtCQUErQjtZQUMvQiwrQkFBK0I7U0FDaEMsQ0FBQzs7SUFDSixDQUFDO0lBQUQsYUFBQztBQUFELENBQUMsQUFSRCxDQUE0Qix1QkFBVSxHQVFyQztBQVJZLHdCQUFNO0FBVW5CLElBQVksT0FPWDtBQVBELFdBQVksT0FBTztJQUNqQiw2Q0FBUSxDQUFBO0lBQ1IsNkNBQVEsQ0FBQTtJQUNSLCtDQUFTLENBQUE7SUFDVCwrQ0FBUyxDQUFBO0lBQ1QsMkNBQU8sQ0FBQTtJQUNQLHlDQUFNLENBQUE7QUFDUixDQUFDLEVBUFcsT0FBTyxHQUFQLGVBQU8sS0FBUCxlQUFPLFFBT2xCO0FBRUQsSUFBWSw0QkFHWDtBQUhELFdBQVksNEJBQTRCO0lBQ3RDLGlEQUFpQixDQUFBO0lBQ2pCLDZDQUFhLENBQUE7QUFDZixDQUFDLEVBSFcsNEJBQTRCLEdBQTVCLG9DQUE0QixLQUE1QixvQ0FBNEIsUUFHdkM7QUFhRCxJQUFZLGNBT1g7QUFQRCxXQUFZLGNBQWM7SUFDeEIsbUNBQWlCLENBQUE7SUFDakIsdURBQXFDLENBQUE7SUFDckMsNkRBQTJDLENBQUE7SUFDM0MseURBQXVDLENBQUE7SUFDdkMsK0RBQTZDLENBQUE7SUFDN0MsbUNBQWlCLENBQUE7QUFDbkIsQ0FBQyxFQVBXLGNBQWMsR0FBZCxzQkFBYyxLQUFkLHNCQUFjLFFBT3pCO0FBRUQsSUFBWSxpQkFJWDtBQUpELFdBQVksaUJBQWlCO0lBQzNCLGdDQUFXLENBQUE7SUFDWCw0Q0FBdUIsQ0FBQTtJQUN2QiwwQ0FBcUIsQ0FBQTtBQUN2QixDQUFDLEVBSlcsaUJBQWlCLEdBQWpCLHlCQUFpQixLQUFqQix5QkFBaUIsUUFJNUI7QUFFRCxJQUFZLGtCQVFYO0FBUkQsV0FBWSxrQkFBa0I7SUFDNUIsaUNBQVcsQ0FBQTtJQUNYLDJDQUFxQixDQUFBO0lBQ3JCLDZDQUF1QixDQUFBO0lBQ3ZCLDZDQUF1QixDQUFBO0lBQ3ZCLHVDQUFpQixDQUFBO0lBQ2pCLG1EQUE2QixDQUFBO0lBQzdCLHVDQUFpQixDQUFBO0FBQ25CLENBQUMsRUFSVyxrQkFBa0IsR0FBbEIsMEJBQWtCLEtBQWxCLDBCQUFrQixRQVE3QjtBQUVELElBQVksc0JBS1g7QUFMRCxXQUFZLHNCQUFzQjtJQUNoQyxtREFBeUIsQ0FBQTtJQUN6QiwyQ0FBaUIsQ0FBQTtJQUNqQiw2Q0FBbUIsQ0FBQTtJQUNuQix1Q0FBYSxDQUFBO0FBQ2YsQ0FBQyxFQUxXLHNCQUFzQixHQUF0Qiw4QkFBc0IsS0FBdEIsOEJBQXNCLFFBS2pDO0FBRUQ7SUFBQTtJQUlBLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBSlksOEJBQVM7QUFZdEIsSUFBWSxXQUlYO0FBSkQsV0FBWSxXQUFXO0lBQ3JCLHlEQUFVLENBQUE7SUFDViw2REFBWSxDQUFBO0lBQ1osdURBQVMsQ0FBQTtBQUNYLENBQUMsRUFKVyxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQUl0QjtBQUVELElBQVksYUFJWDtBQUpELFdBQVksYUFBYTtJQUN2QixnQ0FBZSxDQUFBO0lBQ2Ysc0NBQXFCLENBQUE7SUFDckIsa0NBQWlCLENBQUE7QUFDbkIsQ0FBQyxFQUpXLGFBQWEsR0FBYixxQkFBYSxLQUFiLHFCQUFhLFFBSXhCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlJztcblxuZXhwb3J0IGNsYXNzIENvbW1vbiBleHRlbmRzIE9ic2VydmFibGUge1xuICBkZWZhdWx0U2VydmVyczogQXJyYXk8c3RyaW5nPiA9IFtcbiAgICAnc3R1bjpzdHVuLmwuZ29vZ2xlLmNvbToxOTMwMicsXG4gICAgJ3N0dW46c3R1bjEubC5nb29nbGUuY29tOjE5MzAyJyxcbiAgICAnc3R1bjpzdHVuMi5sLmdvb2dsZS5jb206MTkzMDInLFxuICAgICdzdHVuOnN0dW4zLmwuZ29vZ2xlLmNvbToxOTMwMicsXG4gICAgJ3N0dW46c3R1bjQubC5nb29nbGUuY29tOjE5MzAyJ1xuICBdO1xufVxuXG5leHBvcnQgZW51bSBRdWFsaXR5IHtcbiAgTUFYXzQ4MFAsXG4gIE1BWF83MjBQLFxuICBNQVhfMTA4MFAsXG4gIE1BWF8yMTYwUCxcbiAgSElHSEVTVCxcbiAgTE9XRVNUXG59XG5cbmV4cG9ydCBlbnVtIFdlYlJUQ0RhdGFDaGFubmVsTWVzc2FnZVR5cGUge1xuICBCSU5BUlkgPSAnYmluYXJ5JyxcbiAgVEVYVCA9ICd0ZXh0J1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdlYlJUQ0ljZUNhbmRpZGF0ZSB7XG4gIHNkcE1pZDogc3RyaW5nO1xuICBzZHBNTGluZUluZGV4OiBudW1iZXI7XG4gIHNkcDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdlYlJUQ1NkcCB7XG4gIHR5cGU6IFdlYlJUQ1NkcFR5cGU7XG4gIHNkcDogc3RyaW5nO1xufVxuXG5leHBvcnQgZW51bSBTaWduYWxpbmdTdGF0ZSB7XG4gIFNUQUJMRSA9ICdzdGFibGUnLFxuICBIQVZFX0xPQ0FMX09GRkVSID0gJ2hhdmUtbG9jYWwtb2ZmZXInLFxuICBIQVZFX0xPQ0FMX1BSQU5TV0VSID0gJ2hhdmUtbG9jYWwtcHJhbnN3ZXInLFxuICBIQVZFX1JFTU9URV9PRkZFUiA9ICdoYXZlLXJlbW90ZS1vZmZlcicsXG4gIEhBVkVfUkVNT1RFX1BSQU5TV0VSID0gJ2hhdmUtcmVtb3RlLXByYW5zd2VyJyxcbiAgQ0xPU0VEID0gJ2Nsb3NlZCdcbn1cblxuZXhwb3J0IGVudW0gSWNlR2F0aGVyaW5nU3RhdGUge1xuICBORVcgPSAnbmV3JyxcbiAgR0FUSEVSSU5HID0gJ2dhdGhlcmluZycsXG4gIENPTVBMRVRFID0gJ2NvbXBsZXRlJ1xufVxuXG5leHBvcnQgZW51bSBJY2VDb25uZWN0aW9uU3RhdGUge1xuICBORVcgPSAnbmV3JyxcbiAgQ0hFQ0tJTkcgPSAnY2hlY2tpbmcnLFxuICBDT05ORUNURUQgPSAnY29ubmVjdGVkJyxcbiAgQ09NUExFVEVEID0gJ2NvbXBsZXRlZCcsXG4gIEZBSUxFRCA9ICdmYWlsZWQnLFxuICBESVNDT05ORUNURUQgPSAnZGlzY29ubmVjdGVkJyxcbiAgQ0xPU0VEID0gJ2Nsb3NlZCdcbn1cblxuZXhwb3J0IGVudW0gV2ViUlRDRGF0YUNoYW5uZWxTdGF0ZSB7XG4gIENPTk5FQ1RJTkcgPSAnY29ubmVjdGluZycsXG4gIENMT1NFRCA9ICdjbG9zZWQnLFxuICBDTE9TSU5HID0gJ2Nsb3NpbmcnLFxuICBPUEVOID0gJ29wZW4nXG59XG5cbmV4cG9ydCBjbGFzcyBJY2VTZXJ2ZXIge1xuICB1c2VybmFtZT86IHN0cmluZztcbiAgcGFzc3dvcmQ/OiBzdHJpbmc7XG4gIHVybDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdlYlJUQ09wdGlvbnMge1xuICBpY2VTZXJ2ZXJzPzogSWNlU2VydmVyW107XG4gIGVuYWJsZVZpZGVvPzogYm9vbGVhbjtcbiAgZW5hYmxlQXVkaW8/OiBib29sZWFuO1xufVxuXG5leHBvcnQgZW51bSBXZWJSVENTdGF0ZSB7XG4gIENPTk5FQ1RJTkcsXG4gIERJU0NPTk5FQ1RFRCxcbiAgQ09OTkVDVEVEXG59XG5cbmV4cG9ydCBlbnVtIFdlYlJUQ1NkcFR5cGUge1xuICBPRkZFUiA9ICdvZmZlcicsXG4gIFBSQU5TV0VSID0gJ3ByQW5zd2VyJyxcbiAgQU5TV0VSID0gJ2Fuc3dlcidcbn1cbiJdfQ==