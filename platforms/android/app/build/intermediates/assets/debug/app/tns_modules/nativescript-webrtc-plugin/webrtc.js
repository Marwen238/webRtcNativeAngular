"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webrtc_common_1 = require("./webrtc.common");
var observable_1 = require("tns-core-modules/data/observable");
var view_1 = require("tns-core-modules/ui/core/view");
var utils_1 = require("tns-core-modules/utils/utils");
var permissions = require("nativescript-permissions");
var webrtc_common_2 = require("./webrtc.common");
exports.IceConnectionState = webrtc_common_2.IceConnectionState;
exports.IceServer = webrtc_common_2.IceServer;
exports.IceGatheringState = webrtc_common_2.IceGatheringState;
exports.Quality = webrtc_common_2.Quality;
exports.SignalingState = webrtc_common_2.SignalingState;
exports.WebRTCDataChannelMessageType = webrtc_common_2.WebRTCDataChannelMessageType;
exports.WebRTCDataChannelState = webrtc_common_2.WebRTCDataChannelState;
exports.WebRTCSdpType = webrtc_common_2.WebRTCSdpType;
exports.WebRTCState = webrtc_common_2.WebRTCState;
var WebRTC = /** @class */ (function (_super) {
    __extends(WebRTC, _super);
    function WebRTC(options) {
        if (options === void 0) { options = { enableAudio: true, enableVideo: true }; }
        var _this = _super.call(this) || this;
        var nativeIceServers;
        if (options.iceServers) {
            nativeIceServers = new java.util.ArrayList();
            options.iceServers.forEach(function (iceServer) {
                var server = org.webrtc.PeerConnection.IceServer.builder(iceServer.url);
                if (iceServer.username) {
                    server.setUsername(iceServer.username);
                }
                if (iceServer.password) {
                    server.setPassword(iceServer.password);
                }
                nativeIceServers.add(server.createIceServer());
            });
        }
        if (nativeIceServers) {
            _this.webrtc = new co.fitcom.fancywebrtc.FancyWebRTC(utils_1.ad.getApplicationContext(), new java.lang.Boolean(!!options.enableVideo).booleanValue(), new java.lang.Boolean(!!options.enableAudio).booleanValue(), nativeIceServers);
        }
        else {
            _this.webrtc = new co.fitcom.fancywebrtc.FancyWebRTC(utils_1.ad.getApplicationContext(), new java.lang.Boolean(!!options.enableVideo).booleanValue(), new java.lang.Boolean(!!options.enableAudio).booleanValue());
        }
        var ref = new WeakRef(_this);
        _this.webrtc.setListener(new co.fitcom.fancywebrtc.FancyWebRTCListener({
            webRTCClientDidReceiveError: function (param0, param1) {
                var owner = ref.get();
                owner.notify({
                    eventName: 'webRTCClientDidReceiveError',
                    object: observable_1.fromObject({
                        client: owner,
                        error: param1
                    })
                });
            },
            webRTCClientStartCallWithSdp: function (param0, param1) {
                var owner = ref.get();
                var type;
                switch (param1.type) {
                    case org.webrtc.SessionDescription.Type.OFFER:
                        type = webrtc_common_1.WebRTCSdpType.OFFER;
                        break;
                    case org.webrtc.SessionDescription.Type.PRANSWER:
                        type = webrtc_common_1.WebRTCSdpType.PRANSWER;
                        break;
                    case org.webrtc.SessionDescription.Type.ANSWER:
                        type = webrtc_common_1.WebRTCSdpType.ANSWER;
                        break;
                }
                owner.notify({
                    eventName: 'webRTCClientStartCallWithSdp',
                    object: observable_1.fromObject({
                        client: owner,
                        sdp: param1.description,
                        type: type
                    })
                });
            },
            webRTCClientDataChannelStateChanged: function (param0, param1, param2) {
                var owner = ref.get();
                var state;
                switch (param2) {
                    case org.webrtc.DataChannel.State.CONNECTING:
                        state = webrtc_common_1.WebRTCDataChannelState.CONNECTING;
                        break;
                    case org.webrtc.DataChannel.State.CLOSED:
                        state = webrtc_common_1.WebRTCDataChannelState.CLOSED;
                        break;
                    case org.webrtc.DataChannel.State.CLOSING:
                        state = webrtc_common_1.WebRTCDataChannelState.CLOSING;
                        break;
                    case org.webrtc.DataChannel.State.OPEN:
                        state = webrtc_common_1.WebRTCDataChannelState.OPEN;
                        break;
                }
                owner.notify({
                    eventName: 'webRTCClientDataChannelStateChanged',
                    object: observable_1.fromObject({
                        client: owner,
                        name: param1,
                        state: state
                    })
                });
            },
            webRTCClientDataChannelMessageType: function (param0, param1, param2, param3) {
                var owner = ref.get();
                var type;
                switch (param3) {
                    case co.fitcom.fancywebrtc.FancyWebRTC.DataChannelMessageType.TEXT:
                        type = webrtc_common_1.WebRTCDataChannelMessageType.TEXT;
                        break;
                    case co.fitcom.fancywebrtc.FancyWebRTC.DataChannelMessageType
                        .BINARY:
                        type = webrtc_common_1.WebRTCDataChannelMessageType.BINARY;
                        break;
                }
                owner.notify({
                    eventName: 'webRTCClientDataChannelMessageType',
                    object: observable_1.fromObject({
                        client: owner,
                        name: param1,
                        message: param2,
                        type: type
                    })
                });
            },
            webRTCClientOnRemoveStream: function (param0, param1) {
                var owner = ref.get();
                owner.notify({
                    eventName: 'webRTCClientOnRemoveStream',
                    object: observable_1.fromObject({
                        client: owner,
                        stream: param1
                    })
                });
            },
            webRTCClientDidReceiveRemoteVideoTrackStream: function (param0, param1, param2) {
                var owner = ref.get();
                owner.notify({
                    eventName: 'webRTCClientDidReceiveRemoteVideoTrackStream',
                    object: observable_1.fromObject({
                        client: owner,
                        remoteVideoTrack: param1,
                        stream: param2
                    })
                });
            },
            webRTCClientDidGenerateIceCandidate: function (param0, param1) {
                var owner = ref.get();
                owner.notify({
                    eventName: 'webRTCClientDidGenerateIceCandidate',
                    object: observable_1.fromObject({
                        client: owner,
                        iceCandidate: {
                            sdp: param1.sdp,
                            sdpMid: param1.sdpMid,
                            sdpMLineIndex: param1.sdpMLineIndex,
                            serverUrl: param1.serverUrl
                        }
                    })
                });
            },
            webRTCClientOnRenegotiationNeeded: function (param0) {
                var owner = ref.get();
                owner.notify({
                    eventName: 'webRTCClientOnRenegotiationNeeded',
                    object: observable_1.fromObject({
                        client: owner
                    })
                });
            },
            webRTCClientOnIceCandidatesRemoved: function (param0, param1) {
                var owner = ref.get();
                owner.notify({
                    eventName: 'webRTCClientOnRenegotiationNeeded',
                    object: observable_1.fromObject({
                        client: owner,
                        candidates: param1
                    })
                });
            },
            webRTCClientOnIceConnectionChange: function (param0, param1) {
                var owner = ref.get();
                var state;
                switch (param1) {
                    case org.webrtc.PeerConnection.IceConnectionState.NEW:
                        state = webrtc_common_1.IceConnectionState.NEW;
                        break;
                    case org.webrtc.PeerConnection.IceConnectionState.CHECKING:
                        state = webrtc_common_1.IceConnectionState.CHECKING;
                        break;
                    case org.webrtc.PeerConnection.IceConnectionState.CONNECTED:
                        state = webrtc_common_1.IceConnectionState.CONNECTED;
                        break;
                    case org.webrtc.PeerConnection.IceConnectionState.COMPLETED:
                        state = webrtc_common_1.IceConnectionState.COMPLETED;
                        break;
                    case org.webrtc.PeerConnection.IceConnectionState.FAILED:
                        state = webrtc_common_1.IceConnectionState.FAILED;
                        break;
                    case org.webrtc.PeerConnection.IceConnectionState.DISCONNECTED:
                        state = webrtc_common_1.IceConnectionState.DISCONNECTED;
                        break;
                    case org.webrtc.PeerConnection.IceConnectionState.CLOSED:
                        state = webrtc_common_1.IceConnectionState.CLOSED;
                        break;
                }
                owner.notify({
                    eventName: 'webRTCClientOnIceConnectionChange',
                    object: observable_1.fromObject({
                        client: owner,
                        state: state
                    })
                });
            },
            webRTCClientOnIceConnectionReceivingChange: function (param0, param1) {
                var owner = ref.get();
                owner.notify({
                    eventName: 'webRTCClientOnIceConnectionReceivingChange',
                    object: observable_1.fromObject({
                        client: owner,
                        change: param1
                    })
                });
            },
            webRTCClientOnIceGatheringChange: function (param0, param1) {
                var owner = ref.get();
                var state;
                switch (param1) {
                    case org.webrtc.PeerConnection.IceGatheringState.NEW:
                        state = webrtc_common_1.IceGatheringState.NEW;
                        break;
                    case org.webrtc.PeerConnection.IceGatheringState.GATHERING:
                        state = webrtc_common_1.IceGatheringState.GATHERING;
                        break;
                    case org.webrtc.PeerConnection.IceGatheringState.COMPLETE:
                        state = webrtc_common_1.IceGatheringState.COMPLETE;
                        break;
                }
                owner.notify({
                    eventName: 'webRTCClientOnIceGatheringChange',
                    object: observable_1.fromObject({
                        client: owner,
                        state: state
                    })
                });
            },
            webRTCClientOnSignalingChange: function (param0, param1) {
                var owner = ref.get();
                var state;
                switch (param0) {
                    case org.webrtc.PeerConnection.SignalingState.CLOSED:
                        state = webrtc_common_1.SignalingState.CLOSED;
                        break;
                    case org.webrtc.PeerConnection.SignalingState.HAVE_LOCAL_OFFER:
                        state = webrtc_common_1.SignalingState.HAVE_LOCAL_OFFER;
                        break;
                    case org.webrtc.PeerConnection.SignalingState.HAVE_LOCAL_PRANSWER:
                        state = webrtc_common_1.SignalingState.HAVE_LOCAL_PRANSWER;
                        break;
                    case org.webrtc.PeerConnection.SignalingState.HAVE_REMOTE_OFFER:
                        state = webrtc_common_1.SignalingState.HAVE_REMOTE_OFFER;
                        break;
                    case org.webrtc.PeerConnection.SignalingState.HAVE_REMOTE_PRANSWER:
                        state = webrtc_common_1.SignalingState.HAVE_REMOTE_PRANSWER;
                        break;
                    case org.webrtc.PeerConnection.SignalingState.STABLE:
                        state = webrtc_common_1.SignalingState.STABLE;
                        break;
                }
                owner.notify({
                    eventName: 'webRTCClientOnIceGatheringChange',
                    object: observable_1.fromObject({
                        client: owner,
                        state: state
                    })
                });
            },
            webRTCClientOnCameraSwitchDone: function (param0, param1) {
                var owner = ref.get();
                owner.notify({
                    eventName: 'webRTCClientOnCameraSwitchDone',
                    object: observable_1.fromObject({
                        client: owner,
                        done: param1
                    })
                });
            },
            webRTCClientOnCameraSwitchError: function (param0, param1) {
                var owner = ref.get();
                owner.notify({
                    eventName: 'webRTCClientOnCameraSwitchError',
                    object: observable_1.fromObject({
                        client: owner,
                        message: param1
                    })
                });
            }
        }));
        return _this;
    }
    WebRTC.requestPermissions = function (explanation) {
        return permissions.requestPermission([
            android.Manifest.permission.CAMERA,
            android.Manifest.permission.RECORD_AUDIO
        ], explanation);
    };
    WebRTC.hasPermissions = function () {
        return (permissions.hasPermission(android.Manifest.permission.CAMERA) &&
            permissions.hasPermission(android.Manifest.permission.RECORD_AUDIO));
    };
    WebRTC.init = function () {
        co.fitcom.fancywebrtc.FancyWebRTC.init(utils_1.ad.getApplicationContext());
    };
    WebRTC.prototype.dataChannelSend = function (name, data, type) {
        var nativeType;
        switch (type) {
            case webrtc_common_1.WebRTCDataChannelMessageType.BINARY:
                nativeType =
                    co.fitcom.fancywebrtc.FancyWebRTC.DataChannelMessageType.BINARY;
                break;
            case webrtc_common_1.WebRTCDataChannelMessageType.TEXT:
                nativeType =
                    co.fitcom.fancywebrtc.FancyWebRTC.DataChannelMessageType.TEXT;
                break;
        }
        this.webrtc.dataChannelSend(name, data, nativeType);
    };
    WebRTC.prototype.dataChannelClose = function (name) {
        this.webrtc.dataChannelClose(name);
    };
    WebRTC.prototype.dataChannelCreate = function (name) {
        this.webrtc.dataChannelCreate(name);
    };
    WebRTC.prototype.switchCamera = function (trackId) {
        this.webrtc.switchCamera(trackId);
    };
    WebRTC.prototype.handleAnswerReceived = function (answer) {
        var nativeType;
        switch (answer.type) {
            case webrtc_common_1.WebRTCSdpType.ANSWER:
                nativeType = org.webrtc.SessionDescription.Type.ANSWER;
                break;
            case webrtc_common_1.WebRTCSdpType.OFFER:
                nativeType = org.webrtc.SessionDescription.Type.OFFER;
                break;
            case webrtc_common_1.WebRTCSdpType.PRANSWER:
                nativeType = org.webrtc.SessionDescription.Type.PRANSWER;
                break;
        }
        var sdp = new org.webrtc.SessionDescription(nativeType, answer.sdp);
        this.webrtc.handleAnswerReceived(sdp);
    };
    WebRTC.prototype.connect = function () {
        if (!this.webrtc)
            return;
        this.webrtc.connect();
    };
    WebRTC.prototype.disconnect = function () {
        if (this.webrtc) {
            this.webrtc.disconnect();
        }
    };
    WebRTC.prototype.micEnabled = function (enabled) {
        this.webrtc.micEnabled(enabled);
    };
    WebRTC.prototype.toggleMic = function () {
        this.webrtc.toggleMic();
    };
    WebRTC.prototype.speakerEnabled = function (enabled) {
        this.webrtc.speakerEnabled(enabled);
    };
    WebRTC.prototype.createAnswerForOfferReceived = function (sdp) {
        var nativeSdp = new org.webrtc.SessionDescription(org.webrtc.SessionDescription.Type.OFFER, sdp.sdp);
        this.webrtc.createAnswerForOfferReceived(nativeSdp, new org.webrtc.MediaConstraints());
    };
    WebRTC.prototype.makeOffer = function () {
        if (this.webrtc != null) {
            this.webrtc.makeOffer(new org.webrtc.MediaConstraints());
        }
    };
    WebRTC.prototype.addLocalStream = function (stream) {
        this.webrtc.addLocalStream(stream);
    };
    WebRTC.prototype.addIceCandidate = function (iceCandidate) {
        var candidate = new org.webrtc.IceCandidate(iceCandidate.sdpMid, iceCandidate.sdpMLineIndex, iceCandidate.sdp);
        this.webrtc.addIceCandidate(candidate);
    };
    WebRTC.prototype.enableTrack = function (trackId, enable) {
        this.webrtc.enableTrack(trackId, enable);
    };
    WebRTC.prototype.getUserMedia = function (quality) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var nativeQuality = co.fitcom.fancywebrtc.FancyWebRTC.Quality.LOWEST;
            switch (quality) {
                case webrtc_common_1.Quality.HIGHEST:
                    nativeQuality = co.fitcom.fancywebrtc.FancyWebRTC.Quality.HIGHEST;
                    break;
                case webrtc_common_1.Quality.MAX_480P:
                    nativeQuality = co.fitcom.fancywebrtc.FancyWebRTC.Quality.MAX_480P;
                    break;
                case webrtc_common_1.Quality.MAX_720P:
                    nativeQuality = co.fitcom.fancywebrtc.FancyWebRTC.Quality.MAX_720P;
                    break;
                case webrtc_common_1.Quality.MAX_1080P:
                    nativeQuality = co.fitcom.fancywebrtc.FancyWebRTC.Quality.MAX_1080P;
                    break;
                case webrtc_common_1.Quality.MAX_2160P:
                    nativeQuality = co.fitcom.fancywebrtc.FancyWebRTC.Quality.MAX_2160P;
                    break;
                default:
                    nativeQuality = co.fitcom.fancywebrtc.FancyWebRTC.Quality.LOWEST;
                    break;
            }
            _this.webrtc.getUserMedia(nativeQuality, new co.fitcom.fancywebrtc.FancyWebRTCListener.GetUserMediaListener({
                webRTCClientOnGetUserMedia: function (param0, param1) {
                    resolve(param1);
                },
                webRTCClientOnGetUserMediaDidReceiveError: function (param0, param1) {
                    reject(param1);
                }
            }));
        });
    };
    return WebRTC;
}(webrtc_common_1.Common));
exports.WebRTC = WebRTC;
var WebRTCView = /** @class */ (function (_super) {
    __extends(WebRTCView, _super);
    function WebRTCView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebRTCView.prototype.createNativeView = function () {
        return new co.fitcom.fancywebrtc.FancyWebRTCView(this._context, null);
    };
    Object.defineProperty(WebRTCView.prototype, "mirror", {
        set: function (mirror) {
            if (this.nativeView) {
                this.nativeView.setMirror(mirror);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebRTCView.prototype, "videoTrack", {
        set: function (track) {
            if (this.nativeView) {
                this.nativeView.setVideoTrack(track);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebRTCView.prototype, "stream", {
        set: function (stream) {
            this._stream = stream;
            if (stream.videoTracks && stream.videoTracks.size() > 0) {
                this.videoTrack = stream.videoTracks.get(0);
            }
        },
        enumerable: true,
        configurable: true
    });
    return WebRTCView;
}(view_1.View));
exports.WebRTCView = WebRTCView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicnRjLmFuZHJvaWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3ZWJydGMuYW5kcm9pZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQVl5QjtBQUV6QiwrREFBOEQ7QUFDOUQsc0RBQXFEO0FBQ3JELHNEQUFrRDtBQUNsRCxzREFBd0Q7QUFFeEQsaURBYXlCO0FBWnJCLDZDQUFBLGtCQUFrQixDQUFBO0FBQ2xCLG9DQUFBLFNBQVMsQ0FBQTtBQUNULDRDQUFBLGlCQUFpQixDQUFBO0FBQ2pCLGtDQUFBLE9BQU8sQ0FBQTtBQUNQLHlDQUFBLGNBQWMsQ0FBQTtBQUNkLHVEQUFBLDRCQUE0QixDQUFBO0FBQzVCLGlEQUFBLHNCQUFzQixDQUFBO0FBSXRCLHdDQUFBLGFBQWEsQ0FBQTtBQUNiLHNDQUFBLFdBQVcsQ0FBQTtBQUtmO0lBQTRCLDBCQUFNO0lBRzlCLGdCQUNJLE9BQStEO1FBQS9ELHdCQUFBLEVBQUEsWUFBMEIsV0FBVyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFDO1FBRG5FLFlBR0ksaUJBQU8sU0F3VFY7UUF2VEcsSUFBSSxnQkFBMEMsQ0FBQztRQUMvQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUU7WUFDcEIsZ0JBQWdCLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzdDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsU0FBUztnQkFDaEMsSUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FDdEQsU0FBUyxDQUFDLEdBQUcsQ0FDaEIsQ0FBQztnQkFDRixJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUU7b0JBQ3BCLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUMxQztnQkFFRCxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUU7b0JBQ3BCLE1B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TyxHQUFHLE1BQU0sQ0FBQztZQUN0QixJQUFJLE1BQU0sQ0FBQyxXQUFXLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ3JELElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDL0M7UUFDTCxDQUFDOzs7T0FBQTtJQUNMLGlCQUFDO0FBQUQsQ0FBQyxBQXpCRCxDQUFnQyxXQUFJLEdBeUJuQztBQXpCWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tbW9uLFxuICAgIEljZUNvbm5lY3Rpb25TdGF0ZSxcbiAgICBJY2VHYXRoZXJpbmdTdGF0ZSxcbiAgICBRdWFsaXR5LFxuICAgIFNpZ25hbGluZ1N0YXRlLFxuICAgIFdlYlJUQ0RhdGFDaGFubmVsTWVzc2FnZVR5cGUsXG4gICAgV2ViUlRDRGF0YUNoYW5uZWxTdGF0ZSxcbiAgICBXZWJSVENJY2VDYW5kaWRhdGUsXG4gICAgV2ViUlRDT3B0aW9ucyxcbiAgICBXZWJSVENTZHAsXG4gICAgV2ViUlRDU2RwVHlwZVxufSBmcm9tICcuL3dlYnJ0Yy5jb21tb24nO1xuXG5pbXBvcnQgeyBmcm9tT2JqZWN0IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3JztcbmltcG9ydCB7IGFkIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91dGlscy91dGlscyc7XG5pbXBvcnQgKiBhcyBwZXJtaXNzaW9ucyBmcm9tICduYXRpdmVzY3JpcHQtcGVybWlzc2lvbnMnO1xuXG5leHBvcnQge1xuICAgIEljZUNvbm5lY3Rpb25TdGF0ZSxcbiAgICBJY2VTZXJ2ZXIsXG4gICAgSWNlR2F0aGVyaW5nU3RhdGUsXG4gICAgUXVhbGl0eSxcbiAgICBTaWduYWxpbmdTdGF0ZSxcbiAgICBXZWJSVENEYXRhQ2hhbm5lbE1lc3NhZ2VUeXBlLFxuICAgIFdlYlJUQ0RhdGFDaGFubmVsU3RhdGUsXG4gICAgV2ViUlRDSWNlQ2FuZGlkYXRlLFxuICAgIFdlYlJUQ09wdGlvbnMsXG4gICAgV2ViUlRDU2RwLFxuICAgIFdlYlJUQ1NkcFR5cGUsXG4gICAgV2ViUlRDU3RhdGVcbn0gZnJvbSAnLi93ZWJydGMuY29tbW9uJztcblxuZGVjbGFyZSB2YXIgY28sIG9yZztcblxuZXhwb3J0IGNsYXNzIFdlYlJUQyBleHRlbmRzIENvbW1vbiB7XG4gICAgcHJpdmF0ZSB3ZWJydGM6IGFueSAvKiBjby5maXRjb20uZmFuY3l3ZWJydGMuRmFuY3lXZWJSVEMgKi87XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgb3B0aW9uczogV2ViUlRDT3B0aW9ucyA9IHtlbmFibGVBdWRpbzogdHJ1ZSwgZW5hYmxlVmlkZW86IHRydWV9XG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGxldCBuYXRpdmVJY2VTZXJ2ZXJzOiBqYXZhLnV0aWwuQXJyYXlMaXN0PGFueT47XG4gICAgICAgIGlmIChvcHRpb25zLmljZVNlcnZlcnMpIHtcbiAgICAgICAgICAgIG5hdGl2ZUljZVNlcnZlcnMgPSBuZXcgamF2YS51dGlsLkFycmF5TGlzdCgpO1xuICAgICAgICAgICAgb3B0aW9ucy5pY2VTZXJ2ZXJzLmZvckVhY2goaWNlU2VydmVyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZXJ2ZXIgPSBvcmcud2VicnRjLlBlZXJDb25uZWN0aW9uLkljZVNlcnZlci5idWlsZGVyKFxuICAgICAgICAgICAgICAgICAgICBpY2VTZXJ2ZXIudXJsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBpZiAoaWNlU2VydmVyLnVzZXJuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlcnZlci5zZXRVc2VybmFtZShpY2VTZXJ2ZXIudXNlcm5hbWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpY2VTZXJ2ZXIucGFzc3dvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyLnNldFBhc3N3b3JkKGljZVNlcnZlci5wYXNzd29yZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5hdGl2ZUljZVNlcnZlcnMuYWRkKHNlcnZlci5jcmVhdGVJY2VTZXJ2ZXIoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuYXRpdmVJY2VTZXJ2ZXJzKSB7XG4gICAgICAgICAgICB0aGlzLndlYnJ0YyA9IG5ldyBjby5maXRjb20uZmFuY3l3ZWJydGMuRmFuY3lXZWJSVEMoXG4gICAgICAgICAgICAgICAgYWQuZ2V0QXBwbGljYXRpb25Db250ZXh0KCksXG4gICAgICAgICAgICAgICAgbmV3IGphdmEubGFuZy5Cb29sZWFuKCEhb3B0aW9ucy5lbmFibGVWaWRlbykuYm9vbGVhblZhbHVlKCksXG4gICAgICAgICAgICAgICAgbmV3IGphdmEubGFuZy5Cb29sZWFuKCEhb3B0aW9ucy5lbmFibGVBdWRpbykuYm9vbGVhblZhbHVlKCksXG4gICAgICAgICAgICAgICAgbmF0aXZlSWNlU2VydmVyc1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMud2VicnRjID0gbmV3IGNvLmZpdGNvbS5mYW5jeXdlYnJ0Yy5GYW5jeVdlYlJUQyhcbiAgICAgICAgICAgICAgICBhZC5nZXRBcHBsaWNhdGlvbkNvbnRleHQoKSxcbiAgICAgICAgICAgICAgICBuZXcgamF2YS5sYW5nLkJvb2xlYW4oISFvcHRpb25zLmVuYWJsZVZpZGVvKS5ib29sZWFuVmFsdWUoKSxcbiAgICAgICAgICAgICAgICBuZXcgamF2YS5sYW5nLkJvb2xlYW4oISFvcHRpb25zLmVuYWJsZUF1ZGlvKS5ib29sZWFuVmFsdWUoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlZiA9IG5ldyBXZWFrUmVmKHRoaXMpO1xuICAgICAgICB0aGlzLndlYnJ0Yy5zZXRMaXN0ZW5lcihcbiAgICAgICAgICAgIG5ldyBjby5maXRjb20uZmFuY3l3ZWJydGMuRmFuY3lXZWJSVENMaXN0ZW5lcih7XG4gICAgICAgICAgICAgICAgd2ViUlRDQ2xpZW50RGlkUmVjZWl2ZUVycm9yKHBhcmFtMDogYW55LCBwYXJhbTE6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvd25lciA9IHJlZi5nZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgb3duZXIubm90aWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogJ3dlYlJUQ0NsaWVudERpZFJlY2VpdmVFcnJvcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3Q6IGZyb21PYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudDogb3duZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IHBhcmFtMVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB3ZWJSVENDbGllbnRTdGFydENhbGxXaXRoU2RwKHBhcmFtMDogYW55LCBwYXJhbTE6IGFueSk6IHZvaWQge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvd25lciA9IHJlZi5nZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR5cGU7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocGFyYW0xLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugb3JnLndlYnJ0Yy5TZXNzaW9uRGVzY3JpcHRpb24uVHlwZS5PRkZFUjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gV2ViUlRDU2RwVHlwZS5PRkZFUjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugb3JnLndlYnJ0Yy5TZXNzaW9uRGVzY3JpcHRpb24uVHlwZS5QUkFOU1dFUjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gV2ViUlRDU2RwVHlwZS5QUkFOU1dFUjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugb3JnLndlYnJ0Yy5TZXNzaW9uRGVzY3JpcHRpb24uVHlwZS5BTlNXRVI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IFdlYlJUQ1NkcFR5cGUuQU5TV0VSO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG93bmVyLm5vdGlmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6ICd3ZWJSVENDbGllbnRTdGFydENhbGxXaXRoU2RwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdDogZnJvbU9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50OiBvd25lcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZHA6IHBhcmFtMS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0eXBlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHdlYlJUQ0NsaWVudERhdGFDaGFubmVsU3RhdGVDaGFuZ2VkKFxuICAgICAgICAgICAgICAgICAgICBwYXJhbTA6IGFueSxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0xOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtMjogYW55XG4gICAgICAgICAgICAgICAgKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG93bmVyID0gcmVmLmdldCgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhdGU7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocGFyYW0yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIG9yZy53ZWJydGMuRGF0YUNoYW5uZWwuU3RhdGUuQ09OTkVDVElORzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IFdlYlJUQ0RhdGFDaGFubmVsU3RhdGUuQ09OTkVDVElORztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugb3JnLndlYnJ0Yy5EYXRhQ2hhbm5lbC5TdGF0ZS5DTE9TRUQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBXZWJSVENEYXRhQ2hhbm5lbFN0YXRlLkNMT1NFRDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugb3JnLndlYnJ0Yy5EYXRhQ2hhbm5lbC5TdGF0ZS5DTE9TSU5HOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gV2ViUlRDRGF0YUNoYW5uZWxTdGF0ZS5DTE9TSU5HO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBvcmcud2VicnRjLkRhdGFDaGFubmVsLlN0YXRlLk9QRU46XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBXZWJSVENEYXRhQ2hhbm5lbFN0YXRlLk9QRU47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgb3duZXIubm90aWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogJ3dlYlJUQ0NsaWVudERhdGFDaGFubmVsU3RhdGVDaGFuZ2VkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdDogZnJvbU9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50OiBvd25lcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBwYXJhbTEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGU6IHN0YXRlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHdlYlJUQ0NsaWVudERhdGFDaGFubmVsTWVzc2FnZVR5cGUoXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtMDogYW55LFxuICAgICAgICAgICAgICAgICAgICBwYXJhbTE6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0yOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtMzogYW55XG4gICAgICAgICAgICAgICAgKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG93bmVyID0gcmVmLmdldCgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdHlwZTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwYXJhbTMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgY28uZml0Y29tLmZhbmN5d2VicnRjLkZhbmN5V2ViUlRDLkRhdGFDaGFubmVsTWVzc2FnZVR5cGUuVEVYVDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gV2ViUlRDRGF0YUNoYW5uZWxNZXNzYWdlVHlwZS5URVhUO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBjby5maXRjb20uZmFuY3l3ZWJydGMuRmFuY3lXZWJSVEMuRGF0YUNoYW5uZWxNZXNzYWdlVHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5CSU5BUlk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IFdlYlJUQ0RhdGFDaGFubmVsTWVzc2FnZVR5cGUuQklOQVJZO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG93bmVyLm5vdGlmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6ICd3ZWJSVENDbGllbnREYXRhQ2hhbm5lbE1lc3NhZ2VUeXBlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdDogZnJvbU9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50OiBvd25lcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBwYXJhbTEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogcGFyYW0yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgd2ViUlRDQ2xpZW50T25SZW1vdmVTdHJlYW0ocGFyYW0wOiBhbnksIHBhcmFtMTogYW55KTogdm9pZCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG93bmVyID0gcmVmLmdldCgpO1xuICAgICAgICAgICAgICAgICAgICBvd25lci5ub3RpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lOiAnd2ViUlRDQ2xpZW50T25SZW1vdmVTdHJlYW0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiBmcm9tT2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQ6IG93bmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbTogcGFyYW0xXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHdlYlJUQ0NsaWVudERpZFJlY2VpdmVSZW1vdGVWaWRlb1RyYWNrU3RyZWFtKFxuICAgICAgICAgICAgICAgICAgICBwYXJhbTA6IGFueSxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0xOiBhbnksXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtMjogYW55XG4gICAgICAgICAgICAgICAgKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG93bmVyID0gcmVmLmdldCgpO1xuICAgICAgICAgICAgICAgICAgICBvd25lci5ub3RpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lOiAnd2ViUlRDQ2xpZW50RGlkUmVjZWl2ZVJlbW90ZVZpZGVvVHJhY2tTdHJlYW0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiBmcm9tT2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQ6IG93bmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW90ZVZpZGVvVHJhY2s6IHBhcmFtMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW06IHBhcmFtMlxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB3ZWJSVENDbGllbnREaWRHZW5lcmF0ZUljZUNhbmRpZGF0ZShwYXJhbTA6IGFueSwgcGFyYW0xOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3duZXIgPSByZWYuZ2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIG93bmVyLm5vdGlmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6ICd3ZWJSVENDbGllbnREaWRHZW5lcmF0ZUljZUNhbmRpZGF0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3Q6IGZyb21PYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudDogb3duZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNlQ2FuZGlkYXRlOiA8V2ViUlRDSWNlQ2FuZGlkYXRlPntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RwOiBwYXJhbTEuc2RwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZHBNaWQ6IHBhcmFtMS5zZHBNaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkcE1MaW5lSW5kZXg6IHBhcmFtMS5zZHBNTGluZUluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJVcmw6IHBhcmFtMS5zZXJ2ZXJVcmxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHdlYlJUQ0NsaWVudE9uUmVuZWdvdGlhdGlvbk5lZWRlZChwYXJhbTA6IGFueSk6IHZvaWQge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvd25lciA9IHJlZi5nZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgb3duZXIubm90aWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogJ3dlYlJUQ0NsaWVudE9uUmVuZWdvdGlhdGlvbk5lZWRlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3Q6IGZyb21PYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudDogb3duZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgd2ViUlRDQ2xpZW50T25JY2VDYW5kaWRhdGVzUmVtb3ZlZChcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0wOiBhbnksXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtMTogbmF0aXZlLkFycmF5PGFueT5cbiAgICAgICAgICAgICAgICApOiB2b2lkIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3duZXIgPSByZWYuZ2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIG93bmVyLm5vdGlmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6ICd3ZWJSVENDbGllbnRPblJlbmVnb3RpYXRpb25OZWVkZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiBmcm9tT2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQ6IG93bmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZXM6IHBhcmFtMVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB3ZWJSVENDbGllbnRPbkljZUNvbm5lY3Rpb25DaGFuZ2UocGFyYW0wOiBhbnksIHBhcmFtMTogYW55KTogdm9pZCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG93bmVyID0gcmVmLmdldCgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhdGU7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocGFyYW0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIG9yZy53ZWJydGMuUGVlckNvbm5lY3Rpb24uSWNlQ29ubmVjdGlvblN0YXRlLk5FVzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IEljZUNvbm5lY3Rpb25TdGF0ZS5ORVc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIG9yZy53ZWJydGMuUGVlckNvbm5lY3Rpb24uSWNlQ29ubmVjdGlvblN0YXRlLkNIRUNLSU5HOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gSWNlQ29ubmVjdGlvblN0YXRlLkNIRUNLSU5HO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBvcmcud2VicnRjLlBlZXJDb25uZWN0aW9uLkljZUNvbm5lY3Rpb25TdGF0ZS5DT05ORUNURUQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBJY2VDb25uZWN0aW9uU3RhdGUuQ09OTkVDVEVEO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBvcmcud2VicnRjLlBlZXJDb25uZWN0aW9uLkljZUNvbm5lY3Rpb25TdGF0ZS5DT01QTEVURUQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBJY2VDb25uZWN0aW9uU3RhdGUuQ09NUExFVEVEO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBvcmcud2VicnRjLlBlZXJDb25uZWN0aW9uLkljZUNvbm5lY3Rpb25TdGF0ZS5GQUlMRUQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBJY2VDb25uZWN0aW9uU3RhdGUuRkFJTEVEO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBvcmcud2VicnRjLlBlZXJDb25uZWN0aW9uLkljZUNvbm5lY3Rpb25TdGF0ZS5ESVNDT05ORUNURUQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBJY2VDb25uZWN0aW9uU3RhdGUuRElTQ09OTkVDVEVEO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBvcmcud2VicnRjLlBlZXJDb25uZWN0aW9uLkljZUNvbm5lY3Rpb25TdGF0ZS5DTE9TRUQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBJY2VDb25uZWN0aW9uU3RhdGUuQ0xPU0VEO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG93bmVyLm5vdGlmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6ICd3ZWJSVENDbGllbnRPbkljZUNvbm5lY3Rpb25DaGFuZ2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiBmcm9tT2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQ6IG93bmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB3ZWJSVENDbGllbnRPbkljZUNvbm5lY3Rpb25SZWNlaXZpbmdDaGFuZ2UoXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtMDogYW55LFxuICAgICAgICAgICAgICAgICAgICBwYXJhbTE6IGJvb2xlYW5cbiAgICAgICAgICAgICAgICApOiB2b2lkIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3duZXIgPSByZWYuZ2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIG93bmVyLm5vdGlmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6ICd3ZWJSVENDbGllbnRPbkljZUNvbm5lY3Rpb25SZWNlaXZpbmdDaGFuZ2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiBmcm9tT2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQ6IG93bmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogcGFyYW0xXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHdlYlJUQ0NsaWVudE9uSWNlR2F0aGVyaW5nQ2hhbmdlKHBhcmFtMDogYW55LCBwYXJhbTE6IGFueSk6IHZvaWQge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvd25lciA9IHJlZi5nZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXRlO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHBhcmFtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBvcmcud2VicnRjLlBlZXJDb25uZWN0aW9uLkljZUdhdGhlcmluZ1N0YXRlLk5FVzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IEljZUdhdGhlcmluZ1N0YXRlLk5FVztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugb3JnLndlYnJ0Yy5QZWVyQ29ubmVjdGlvbi5JY2VHYXRoZXJpbmdTdGF0ZS5HQVRIRVJJTkc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBJY2VHYXRoZXJpbmdTdGF0ZS5HQVRIRVJJTkc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIG9yZy53ZWJydGMuUGVlckNvbm5lY3Rpb24uSWNlR2F0aGVyaW5nU3RhdGUuQ09NUExFVEU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBJY2VHYXRoZXJpbmdTdGF0ZS5DT01QTEVURTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvd25lci5ub3RpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lOiAnd2ViUlRDQ2xpZW50T25JY2VHYXRoZXJpbmdDaGFuZ2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiBmcm9tT2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQ6IG93bmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB3ZWJSVENDbGllbnRPblNpZ25hbGluZ0NoYW5nZShwYXJhbTA6IGFueSwgcGFyYW0xOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3duZXIgPSByZWYuZ2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwYXJhbTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugb3JnLndlYnJ0Yy5QZWVyQ29ubmVjdGlvbi5TaWduYWxpbmdTdGF0ZS5DTE9TRUQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBTaWduYWxpbmdTdGF0ZS5DTE9TRUQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIG9yZy53ZWJydGMuUGVlckNvbm5lY3Rpb24uU2lnbmFsaW5nU3RhdGUuSEFWRV9MT0NBTF9PRkZFUjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IFNpZ25hbGluZ1N0YXRlLkhBVkVfTE9DQUxfT0ZGRVI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIG9yZy53ZWJydGMuUGVlckNvbm5lY3Rpb24uU2lnbmFsaW5nU3RhdGUuSEFWRV9MT0NBTF9QUkFOU1dFUjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IFNpZ25hbGluZ1N0YXRlLkhBVkVfTE9DQUxfUFJBTlNXRVI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIG9yZy53ZWJydGMuUGVlckNvbm5lY3Rpb24uU2lnbmFsaW5nU3RhdGUuSEFWRV9SRU1PVEVfT0ZGRVI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBTaWduYWxpbmdTdGF0ZS5IQVZFX1JFTU9URV9PRkZFUjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugb3JnLndlYnJ0Yy5QZWVyQ29ubmVjdGlvbi5TaWduYWxpbmdTdGF0ZS5IQVZFX1JFTU9URV9QUkFOU1dFUjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IFNpZ25hbGluZ1N0YXRlLkhBVkVfUkVNT1RFX1BSQU5TV0VSO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBvcmcud2VicnRjLlBlZXJDb25uZWN0aW9uLlNpZ25hbGluZ1N0YXRlLlNUQUJMRTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IFNpZ25hbGluZ1N0YXRlLlNUQUJMRTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIG93bmVyLm5vdGlmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6ICd3ZWJSVENDbGllbnRPbkljZUdhdGhlcmluZ0NoYW5nZScsXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3Q6IGZyb21PYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudDogb3duZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGU6IHN0YXRlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHdlYlJUQ0NsaWVudE9uQ2FtZXJhU3dpdGNoRG9uZShwYXJhbTA6IGFueSwgcGFyYW0xOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG93bmVyID0gcmVmLmdldCgpO1xuICAgICAgICAgICAgICAgICAgICBvd25lci5ub3RpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lOiAnd2ViUlRDQ2xpZW50T25DYW1lcmFTd2l0Y2hEb25lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdDogZnJvbU9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50OiBvd25lcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb25lOiBwYXJhbTFcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgd2ViUlRDQ2xpZW50T25DYW1lcmFTd2l0Y2hFcnJvcihwYXJhbTA6IGFueSwgcGFyYW0xOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3duZXIgPSByZWYuZ2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIG93bmVyLm5vdGlmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6ICd3ZWJSVENDbGllbnRPbkNhbWVyYVN3aXRjaEVycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdDogZnJvbU9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50OiBvd25lcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBwYXJhbTFcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByZXF1ZXN0UGVybWlzc2lvbnMoZXhwbGFuYXRpb24/OiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gcGVybWlzc2lvbnMucmVxdWVzdFBlcm1pc3Npb24oXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgYW5kcm9pZC5NYW5pZmVzdC5wZXJtaXNzaW9uLkNBTUVSQSxcbiAgICAgICAgICAgICAgICBhbmRyb2lkLk1hbmlmZXN0LnBlcm1pc3Npb24uUkVDT1JEX0FVRElPXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZXhwbGFuYXRpb25cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGhhc1Blcm1pc3Npb25zKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgcGVybWlzc2lvbnMuaGFzUGVybWlzc2lvbihhbmRyb2lkLk1hbmlmZXN0LnBlcm1pc3Npb24uQ0FNRVJBKSAmJlxuICAgICAgICAgICAgcGVybWlzc2lvbnMuaGFzUGVybWlzc2lvbihhbmRyb2lkLk1hbmlmZXN0LnBlcm1pc3Npb24uUkVDT1JEX0FVRElPKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgY28uZml0Y29tLmZhbmN5d2VicnRjLkZhbmN5V2ViUlRDLmluaXQoYWQuZ2V0QXBwbGljYXRpb25Db250ZXh0KCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkYXRhQ2hhbm5lbFNlbmQoXG4gICAgICAgIG5hbWU6IHN0cmluZyxcbiAgICAgICAgZGF0YTogc3RyaW5nLFxuICAgICAgICB0eXBlOiBXZWJSVENEYXRhQ2hhbm5lbE1lc3NhZ2VUeXBlXG4gICAgKSB7XG4gICAgICAgIGxldCBuYXRpdmVUeXBlO1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgV2ViUlRDRGF0YUNoYW5uZWxNZXNzYWdlVHlwZS5CSU5BUlk6XG4gICAgICAgICAgICAgICAgbmF0aXZlVHlwZSA9XG4gICAgICAgICAgICAgICAgICAgIGNvLmZpdGNvbS5mYW5jeXdlYnJ0Yy5GYW5jeVdlYlJUQy5EYXRhQ2hhbm5lbE1lc3NhZ2VUeXBlLkJJTkFSWTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgV2ViUlRDRGF0YUNoYW5uZWxNZXNzYWdlVHlwZS5URVhUOlxuICAgICAgICAgICAgICAgIG5hdGl2ZVR5cGUgPVxuICAgICAgICAgICAgICAgICAgICBjby5maXRjb20uZmFuY3l3ZWJydGMuRmFuY3lXZWJSVEMuRGF0YUNoYW5uZWxNZXNzYWdlVHlwZS5URVhUO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud2VicnRjLmRhdGFDaGFubmVsU2VuZChuYW1lLCBkYXRhLCBuYXRpdmVUeXBlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGF0YUNoYW5uZWxDbG9zZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy53ZWJydGMuZGF0YUNoYW5uZWxDbG9zZShuYW1lKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGF0YUNoYW5uZWxDcmVhdGUobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMud2VicnRjLmRhdGFDaGFubmVsQ3JlYXRlKG5hbWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzd2l0Y2hDYW1lcmEodHJhY2tJZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMud2VicnRjLnN3aXRjaENhbWVyYSh0cmFja0lkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlQW5zd2VyUmVjZWl2ZWQoYW5zd2VyOiBXZWJSVENTZHApIHtcbiAgICAgICAgbGV0IG5hdGl2ZVR5cGU7XG4gICAgICAgIHN3aXRjaCAoYW5zd2VyLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgV2ViUlRDU2RwVHlwZS5BTlNXRVI6XG4gICAgICAgICAgICAgICAgbmF0aXZlVHlwZSA9IG9yZy53ZWJydGMuU2Vzc2lvbkRlc2NyaXB0aW9uLlR5cGUuQU5TV0VSO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBXZWJSVENTZHBUeXBlLk9GRkVSOlxuICAgICAgICAgICAgICAgIG5hdGl2ZVR5cGUgPSBvcmcud2VicnRjLlNlc3Npb25EZXNjcmlwdGlvbi5UeXBlLk9GRkVSO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBXZWJSVENTZHBUeXBlLlBSQU5TV0VSOlxuICAgICAgICAgICAgICAgIG5hdGl2ZVR5cGUgPSBvcmcud2VicnRjLlNlc3Npb25EZXNjcmlwdGlvbi5UeXBlLlBSQU5TV0VSO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNkcCA9IG5ldyBvcmcud2VicnRjLlNlc3Npb25EZXNjcmlwdGlvbihuYXRpdmVUeXBlLCBhbnN3ZXIuc2RwKTtcbiAgICAgICAgdGhpcy53ZWJydGMuaGFuZGxlQW5zd2VyUmVjZWl2ZWQoc2RwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29ubmVjdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLndlYnJ0YykgcmV0dXJuO1xuICAgICAgICB0aGlzLndlYnJ0Yy5jb25uZWN0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRpc2Nvbm5lY3QoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLndlYnJ0Yykge1xuICAgICAgICAgICAgdGhpcy53ZWJydGMuZGlzY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG1pY0VuYWJsZWQoZW5hYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLndlYnJ0Yy5taWNFbmFibGVkKGVuYWJsZWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGVNaWMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMud2VicnRjLnRvZ2dsZU1pYygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzcGVha2VyRW5hYmxlZChlbmFibGVkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMud2VicnRjLnNwZWFrZXJFbmFibGVkKGVuYWJsZWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVBbnN3ZXJGb3JPZmZlclJlY2VpdmVkKHNkcDogV2ViUlRDU2RwKSB7XG4gICAgICAgIGNvbnN0IG5hdGl2ZVNkcCA9IG5ldyBvcmcud2VicnRjLlNlc3Npb25EZXNjcmlwdGlvbihcbiAgICAgICAgICAgIG9yZy53ZWJydGMuU2Vzc2lvbkRlc2NyaXB0aW9uLlR5cGUuT0ZGRVIsXG4gICAgICAgICAgICBzZHAuc2RwXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMud2VicnRjLmNyZWF0ZUFuc3dlckZvck9mZmVyUmVjZWl2ZWQoXG4gICAgICAgICAgICBuYXRpdmVTZHAsXG4gICAgICAgICAgICBuZXcgb3JnLndlYnJ0Yy5NZWRpYUNvbnN0cmFpbnRzKClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbWFrZU9mZmVyKCkge1xuICAgICAgICBpZiAodGhpcy53ZWJydGMgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy53ZWJydGMubWFrZU9mZmVyKG5ldyBvcmcud2VicnRjLk1lZGlhQ29uc3RyYWludHMoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkTG9jYWxTdHJlYW0oc3RyZWFtOiBhbnkpIHtcbiAgICAgICAgdGhpcy53ZWJydGMuYWRkTG9jYWxTdHJlYW0oc3RyZWFtKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkSWNlQ2FuZGlkYXRlKGljZUNhbmRpZGF0ZTogV2ViUlRDSWNlQ2FuZGlkYXRlKSB7XG4gICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IG5ldyBvcmcud2VicnRjLkljZUNhbmRpZGF0ZShcbiAgICAgICAgICAgIGljZUNhbmRpZGF0ZS5zZHBNaWQsXG4gICAgICAgICAgICBpY2VDYW5kaWRhdGUuc2RwTUxpbmVJbmRleCxcbiAgICAgICAgICAgIGljZUNhbmRpZGF0ZS5zZHBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy53ZWJydGMuYWRkSWNlQ2FuZGlkYXRlKGNhbmRpZGF0ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGVuYWJsZVRyYWNrKHRyYWNrSWQ6IHN0cmluZywgZW5hYmxlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMud2VicnRjLmVuYWJsZVRyYWNrKHRyYWNrSWQsIGVuYWJsZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFVzZXJNZWRpYShxdWFsaXR5PzogUXVhbGl0eSk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBsZXQgbmF0aXZlUXVhbGl0eSA9IGNvLmZpdGNvbS5mYW5jeXdlYnJ0Yy5GYW5jeVdlYlJUQy5RdWFsaXR5LkxPV0VTVDtcbiAgICAgICAgICAgIHN3aXRjaCAocXVhbGl0eSkge1xuICAgICAgICAgICAgICAgIGNhc2UgUXVhbGl0eS5ISUdIRVNUOlxuICAgICAgICAgICAgICAgICAgICBuYXRpdmVRdWFsaXR5ID0gY28uZml0Y29tLmZhbmN5d2VicnRjLkZhbmN5V2ViUlRDLlF1YWxpdHkuSElHSEVTVDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBRdWFsaXR5Lk1BWF80ODBQOlxuICAgICAgICAgICAgICAgICAgICBuYXRpdmVRdWFsaXR5ID0gY28uZml0Y29tLmZhbmN5d2VicnRjLkZhbmN5V2ViUlRDLlF1YWxpdHkuTUFYXzQ4MFA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgUXVhbGl0eS5NQVhfNzIwUDpcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlUXVhbGl0eSA9IGNvLmZpdGNvbS5mYW5jeXdlYnJ0Yy5GYW5jeVdlYlJUQy5RdWFsaXR5Lk1BWF83MjBQO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFF1YWxpdHkuTUFYXzEwODBQOlxuICAgICAgICAgICAgICAgICAgICBuYXRpdmVRdWFsaXR5ID0gY28uZml0Y29tLmZhbmN5d2VicnRjLkZhbmN5V2ViUlRDLlF1YWxpdHkuTUFYXzEwODBQO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFF1YWxpdHkuTUFYXzIxNjBQOlxuICAgICAgICAgICAgICAgICAgICBuYXRpdmVRdWFsaXR5ID0gY28uZml0Y29tLmZhbmN5d2VicnRjLkZhbmN5V2ViUlRDLlF1YWxpdHkuTUFYXzIxNjBQO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBuYXRpdmVRdWFsaXR5ID0gY28uZml0Y29tLmZhbmN5d2VicnRjLkZhbmN5V2ViUlRDLlF1YWxpdHkuTE9XRVNUO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy53ZWJydGMuZ2V0VXNlck1lZGlhKFxuICAgICAgICAgICAgICAgIG5hdGl2ZVF1YWxpdHksXG4gICAgICAgICAgICAgICAgbmV3IGNvLmZpdGNvbS5mYW5jeXdlYnJ0Yy5GYW5jeVdlYlJUQ0xpc3RlbmVyLkdldFVzZXJNZWRpYUxpc3RlbmVyKHtcbiAgICAgICAgICAgICAgICAgICAgd2ViUlRDQ2xpZW50T25HZXRVc2VyTWVkaWEocGFyYW0wOiBhbnksIHBhcmFtMTogYW55KTogdm9pZCB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHBhcmFtMSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHdlYlJUQ0NsaWVudE9uR2V0VXNlck1lZGlhRGlkUmVjZWl2ZUVycm9yKFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW0wOiBhbnksXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbTE6IHN0cmluZ1xuICAgICAgICAgICAgICAgICAgICApOiB2b2lkIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChwYXJhbTEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFdlYlJUQ1ZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgICBwcml2YXRlIF9zdHJlYW06IGFueTtcblxuICAgIGNyZWF0ZU5hdGl2ZVZpZXcoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIG5ldyBjby5maXRjb20uZmFuY3l3ZWJydGMuRmFuY3lXZWJSVENWaWV3KHRoaXMuX2NvbnRleHQsIG51bGwpO1xuICAgIH1cblxuICAgIHNldCBtaXJyb3IobWlycm9yOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLm5hdGl2ZVZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMubmF0aXZlVmlldy5zZXRNaXJyb3IobWlycm9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldCB2aWRlb1RyYWNrKHRyYWNrOiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMubmF0aXZlVmlldykge1xuICAgICAgICAgICAgdGhpcy5uYXRpdmVWaWV3LnNldFZpZGVvVHJhY2sodHJhY2spO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0IHN0cmVhbShzdHJlYW06IGFueSkge1xuICAgICAgICB0aGlzLl9zdHJlYW0gPSBzdHJlYW07XG4gICAgICAgIGlmIChzdHJlYW0udmlkZW9UcmFja3MgJiYgc3RyZWFtLnZpZGVvVHJhY2tzLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMudmlkZW9UcmFjayA9IHN0cmVhbS52aWRlb1RyYWNrcy5nZXQoMCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=