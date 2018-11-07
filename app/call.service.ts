import { Injectable } from '@angular/core';
import { from, throwError } from 'rxjs';
import { SocketIO } from 'nativescript-socketio';
import { WebRTC, WebRTCIceCandidate, WebRTCSdp, WebRTCSdpType } from 'nativescript-webrtc-plugin';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class CallService {
    localStream: any;
    remoteStream: any;
    currentUser: string;
    localVideoView: any;
    remoteVideoView: any;
    webrtc: WebRTC;
    other: any;
    localVideoTrack: any;
    microphoneState: boolean = false;
    videoTrack: any;
    videostat: boolean = false;


    constructor(public socket: SocketIO) {

        this.socket.on('call:iceCandidate', data => {
            const sdpMid = data.sdpMid;
            const sdpMLineIndex = data.sdpMLineIndex;
            const sdp = data.sdp;
            if (this.webrtc) {

                this.webrtc.addIceCandidate({
                    sdp: sdp,
                    sdpMid: sdpMid,
                    sdpMLineIndex: sdpMLineIndex
                });
            }
        });

        this.socket.on('call:answered', data => {
            this.webrtc.handleAnswerReceived({sdp: data.sdp, type: data.type});
        });

        this.socket.on('call:answer', data => {
            this.answerCall({
                sdp: data.sdp,
                type: data.type
            }, {enableVideo: true, enableAudio: true});
        });


    }

    isInitiator: boolean;
    callData: any;

    getUsers() {
        this.socket.emit('getUsers', {});
    }

    answerCall(sdp: WebRTCSdp, options) {
        this.webrtc = new WebRTC(options);

        this.webrtc.on('webRTCClientDidReceiveRemoteVideoTrackStream', args => {

            const object = args.object;
            const remoteVideoTrack = object.get('remoteVideoTrack');
            console.log(remoteVideoTrack);
            this.videoTrack = object.get('remoteVideoTrack');
            this.remoteStream = object.get('stream');
            const video = this.remoteVideoView;
            if (video) {
                video.videoTrack = remoteVideoTrack;
            }
        });

        this.webrtc.on('webRTCClientStartCallWithSdp', args => {
            const sdp = args.object.get('sdp');
            const type = args.object.get('type');
            if (type === WebRTCSdpType.ANSWER) {
                this.socket.emit('answered', {
                    from: this.currentUser,
                    to: this.other,
                    sdp: sdp,
                    type: type
                });
            }
        });

        this.webrtc.on('webRTCClientDidGenerateIceCandidate', args => {
            const iceCandidate = args.object.get('iceCandidate') as WebRTCIceCandidate;
            this.socket.emit('iceCandidate', Object.assign({to: this.other, from: this.currentUser}, iceCandidate)
            );
        });

        this.initCamera().then(stream => {
            this.localStream = stream;
            this.setUpLocalView(true);
            this.webrtc.connect();
            this.webrtc.addLocalStream(this.localStream);
            this.webrtc.createAnswerForOfferReceived({
                type: sdp.type,
                sdp: sdp.sdp
            });
        });
    }

    answer(from, to, sdp, type) {
        this.other = from;
        this.answerCall({
            sdp: sdp,
            type: type
        }, {enableVideo: true, enableAudio: true});
    }

    call(username, options) {
        this.other = username;

        this.webrtc = new WebRTC(options);


        this.webrtc.on('webRTCClientDidReceiveRemoteVideoTrackStream', args => {
            const object = args.object;
            const remoteVideoTrack = object.get('remoteVideoTrack');
            const video = this.remoteVideoView;
            console.log(typeof remoteVideoTrack);

            this.remoteStream = object.get('stream');
            if (video) {
                video.videoTrack = remoteVideoTrack;
            }
        });


        this.webrtc.on('webRTCClientStartCallWithSdp', args => {
            const sdp = args.object.get('sdp');
            const type = args.object.get('type');
            if (type === WebRTCSdpType.ANSWER) {
                this.webrtc.handleAnswerReceived({
                    sdp: sdp,
                    type: type
                });
            } else {
                this.socket.emit('call', {
                    from: this.currentUser,
                    to: username,
                    sdp: sdp,
                    type: type
                });
            }
        });

        this.webrtc.on('webRTCClientDidGenerateIceCandidate', args => {
            const iceCandidate = args.object.get('iceCandidate');
            this.socket.emit(
                'iceCandidate',
                Object.assign(
                    {
                        to: username,
                        from: this.currentUser
                    },
                    iceCandidate
                )
            );
        });

        this.initCamera().then(stream => {
            this.localStream = stream;
            this.setUpLocalView(true);
            this.webrtc.connect();
            this.webrtc.addLocalStream(this.localStream);
            this.webrtc.makeOffer();
        });

    }


    private initCamera(): Promise<any> {
        if (WebRTC.hasPermissions()) {
            return this.webrtc.getUserMedia(1);
        } else {
            return from(WebRTC.requestPermissions())
                .pipe(
                    switchMap(() => {
                        if (WebRTC.hasPermissions()) {
                            return from(this.webrtc.getUserMedia(1));
                        }
                        return throwError('Has no permission');
                    })
                )
                .toPromise();
        }
    }

    private setUpLocalView(mirror) {
        const localVideo = this.localVideoView;
        localVideo.mirror = true;
        localVideo.stream = this.localStream;

    }


    // Personals functions.
    changeMicrophoneState() {
        this.microphoneState = !this.microphoneState;

        return this.webrtc.micEnabled(!this.microphoneState);
    }


    stopVideo() {
        const videoTrack = this.localStream.videoTracks.get(0);
        const trackId = videoTrack.id();
        this.videostat = !this.videostat;
        videoTrack.setEnabled(this.videostat);

    }


    stopCall() {

        this.webrtc.disconnect();
    }

}
