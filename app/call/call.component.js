"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var call_service_1 = require("~/call.service");
var page_1 = require("tns-core-modules/ui/page");
var CallComponent = /** @class */ (function () {
    function CallComponent(callService, page) {
        this.callService = callService;
        this.page = page;
        this.streaming = true;
    }
    CallComponent.prototype.ngAfterViewInit = function () {
        this.callService.localVideoView = this.page.getViewById('localVideoView');
        this.callService.remoteVideoView = this.page.getViewById('remoteVideoView');
        var from = this.callService.callData.from;
        var to = this.callService.callData.to;
        var sdp = this.callService.callData.sdp;
        var type = this.callService.callData.type;
        if (this.callService.isInitiator) {
            this.callService.call(to, {
                enableAudio: true,
                enableVideo: true
            });
        }
        else {
            this.callService.answer(from, to, sdp, type);
        }
    };
    CallComponent.prototype.stopCall = function () {
        this.callService.stopCall();
        // script to go back
    };
    CallComponent.prototype.chageMicrophone = function () {
        this.callService.changeMicrophoneState();
    };
    CallComponent.prototype.stopStreamVideo = function () {
        this.callService.stopVideo();
    };
    CallComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'call',
            templateUrl: 'call.component.html'
        }),
        __metadata("design:paramtypes", [call_service_1.CallService, page_1.Page])
    ], CallComponent);
    return CallComponent;
}());
exports.CallComponent = CallComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RDtBQUN6RCwrQ0FBNkM7QUFDN0MsaURBQWdEO0FBT2hEO0lBS0ksdUJBQW9CLFdBQXdCLEVBQVUsSUFBVTtRQUE1QyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLFNBQUksR0FBSixJQUFJLENBQU07UUFGaEUsY0FBUyxHQUFHLElBQUksQ0FBQztJQUdqQixDQUFDO0lBRUQsdUNBQWUsR0FBZjtRQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUU1RSxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDNUMsSUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1FBQ3hDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUMxQyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFFNUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRTtZQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQ3BCO2dCQUNJLFdBQVcsRUFBRSxJQUFJO2dCQUNqQixXQUFXLEVBQUUsSUFBSTthQUNwQixDQUNKLENBQ0E7U0FDSjthQUFNO1lBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDaEQ7SUFDTCxDQUFDO0lBRUQsZ0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUIsb0JBQW9CO0lBRXhCLENBQUM7SUFHRCx1Q0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRCx1Q0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBM0NRLGFBQWE7UUFMekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsTUFBTTtZQUNoQixXQUFXLEVBQUUscUJBQXFCO1NBQ3JDLENBQUM7eUNBTW1DLDBCQUFXLEVBQWdCLFdBQUk7T0FMdkQsYUFBYSxDQThDekI7SUFBRCxvQkFBQztDQUFBLEFBOUNELElBOENDO0FBOUNZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYWxsU2VydmljZSB9IGZyb20gJ34vY2FsbC5zZXJ2aWNlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnY2FsbCcsXG4gICAgdGVtcGxhdGVVcmw6ICdjYWxsLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBDYWxsQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gICAgY3VycmVudFVzZXI6IHN0cmluZztcblxuICAgIHN0cmVhbWluZyA9IHRydWU7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhbGxTZXJ2aWNlOiBDYWxsU2VydmljZSwgcHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmNhbGxTZXJ2aWNlLmxvY2FsVmlkZW9WaWV3ID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKCdsb2NhbFZpZGVvVmlldycpO1xuICAgICAgICB0aGlzLmNhbGxTZXJ2aWNlLnJlbW90ZVZpZGVvVmlldyA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgncmVtb3RlVmlkZW9WaWV3Jyk7XG5cbiAgICAgICAgY29uc3QgZnJvbSA9IHRoaXMuY2FsbFNlcnZpY2UuY2FsbERhdGEuZnJvbTtcbiAgICAgICAgY29uc3QgdG8gPSB0aGlzLmNhbGxTZXJ2aWNlLmNhbGxEYXRhLnRvO1xuICAgICAgICBjb25zdCBzZHAgPSB0aGlzLmNhbGxTZXJ2aWNlLmNhbGxEYXRhLnNkcDtcbiAgICAgICAgY29uc3QgdHlwZSA9IHRoaXMuY2FsbFNlcnZpY2UuY2FsbERhdGEudHlwZTtcblxuICAgICAgICBpZiAodGhpcy5jYWxsU2VydmljZS5pc0luaXRpYXRvcikge1xuICAgICAgICAgICAgdGhpcy5jYWxsU2VydmljZS5jYWxsKHRvLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlQXVkaW86IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZVZpZGVvOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYWxsU2VydmljZS5hbnN3ZXIoZnJvbSwgdG8sIHNkcCwgdHlwZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdG9wQ2FsbCgpIHtcbiAgICAgICAgdGhpcy5jYWxsU2VydmljZS5zdG9wQ2FsbCgpO1xuICAgICAgICAvLyBzY3JpcHQgdG8gZ28gYmFja1xuXG4gICAgfVxuXG5cbiAgICBjaGFnZU1pY3JvcGhvbmUoKSB7XG4gICAgICAgIHRoaXMuY2FsbFNlcnZpY2UuY2hhbmdlTWljcm9waG9uZVN0YXRlKCk7XG4gICAgfVxuXG4gICAgc3RvcFN0cmVhbVZpZGVvKCkge1xuICAgICAgICB0aGlzLmNhbGxTZXJ2aWNlLnN0b3BWaWRlbygpO1xuICAgIH1cblxuXG59XG4iXX0=