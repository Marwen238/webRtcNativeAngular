import { AfterViewInit, Component } from '@angular/core';
import { CallService } from '~/call.service';
import { Page } from 'tns-core-modules/ui/page';

@Component({
    moduleId: module.id,
    selector: 'call',
    templateUrl: 'call.component.html'
})
export class CallComponent implements AfterViewInit {
    currentUser: string;

    streaming = true;

    constructor(private callService: CallService, private page: Page) {
    }

    ngAfterViewInit() {
        this.callService.localVideoView = this.page.getViewById('localVideoView');
        this.callService.remoteVideoView = this.page.getViewById('remoteVideoView');

        const from = this.callService.callData.from;
        const to = this.callService.callData.to;
        const sdp = this.callService.callData.sdp;
        const type = this.callService.callData.type;

        if (this.callService.isInitiator) {
            this.callService.call(to,
                {
                    enableAudio: true,
                    enableVideo: true
                }
            )
            ;
        } else {
            this.callService.answer(from, to, sdp, type);
        }
    }

    stopCall() {
        this.callService.stopCall();
        // script to go back

    }


    chageMicrophone() {
        this.callService.changeMicrophoneState();
    }

    stopStreamVideo() {
        this.callService.stopVideo();
    }


}
