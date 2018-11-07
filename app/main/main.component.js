"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var call_service_1 = require("~/call.service");
var router_1 = require("nativescript-angular/router");
var nativescript_socketio_1 = require("nativescript-socketio");
var MainComponent = /** @class */ (function () {
    function MainComponent(callService, zone, router, socket) {
        this.callService = callService;
        this.zone = zone;
        this.router = router;
        this.socket = socket;
    }
    MainComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.users = [];
        this.socket.on('user joined', function (data) {
            _this.zone.run(function () {
                _this.users.push(data);
            });
        });
        this.socket.on('call:incoming', function (data) {
            _this.zone.run(function () {
                _this.callService.isInitiator = false;
                _this.callService.callData = {
                    to: data.to,
                    from: data.from,
                    sdp: data.sdp,
                    type: data.type
                };
                _this.router.navigate(['call']);
            });
        });
        this.socket.on('getUsers', function (data) {
            _this.users = data.slice();
        });
        this.callService.getUsers();
    };
    MainComponent.prototype.callUser = function (event) {
        var user = this.users[event.index];
        this.callService.isInitiator = true;
        this.callService.callData = {
            to: user.username,
            from: this.callService.currentUser
        };
        this.router.navigate(['call']);
    };
    MainComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'main',
            templateUrl: 'main.component.html'
        }),
        __metadata("design:paramtypes", [call_service_1.CallService,
            core_1.NgZone,
            router_1.RouterExtensions,
            nativescript_socketio_1.SocketIO])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYWluLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwRDtBQUUxRCwrQ0FBNkM7QUFDN0Msc0RBQStEO0FBQy9ELCtEQUFpRDtBQU9qRDtJQUdJLHVCQUNXLFdBQXdCLEVBQ3ZCLElBQVksRUFDWixNQUF3QixFQUN4QixNQUFnQjtRQUhqQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN2QixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBVTtJQUU1QixDQUFDO0lBRUQsZ0NBQVEsR0FBUjtRQUFBLGlCQTBCQztRQXpCRyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUVoQixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsVUFBQSxJQUFJO1lBQzlCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUNWLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsVUFBQSxJQUFJO1lBQ2hDLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUNWLEtBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztnQkFDckMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUc7b0JBQ3hCLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtvQkFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO29CQUNiLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtpQkFDbEIsQ0FBQztnQkFDRixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFBLElBQUk7WUFDM0IsS0FBSSxDQUFDLEtBQUssR0FBTyxJQUFJLFFBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELGdDQUFRLEdBQVIsVUFBUyxLQUFvQjtRQUN6QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUc7WUFDeEIsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ2pCLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVc7U0FDckMsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBL0NRLGFBQWE7UUFMekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsTUFBTTtZQUNoQixXQUFXLEVBQUUscUJBQXFCO1NBQ3JDLENBQUM7eUNBSzBCLDBCQUFXO1lBQ2pCLGFBQU07WUFDSix5QkFBZ0I7WUFDaEIsZ0NBQVE7T0FQbkIsYUFBYSxDQWdEekI7SUFBRCxvQkFBQztDQUFBLEFBaERELElBZ0RDO0FBaERZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBOZ1pvbmUsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSXRlbUV2ZW50RGF0YSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC12aWV3JztcbmltcG9ydCB7IENhbGxTZXJ2aWNlIH0gZnJvbSAnfi9jYWxsLnNlcnZpY2UnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTb2NrZXRJTyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1zb2NrZXRpbyc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdtYWluJyxcbiAgICB0ZW1wbGF0ZVVybDogJ21haW4uY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIE1haW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHVzZXJzOiBhbnlbXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgY2FsbFNlcnZpY2U6IENhbGxTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgIHByaXZhdGUgc29ja2V0OiBTb2NrZXRJT1xuICAgICkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnVzZXJzID0gW107XG5cbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ3VzZXIgam9pbmVkJywgZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ2NhbGw6aW5jb21pbmcnLCBkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsbFNlcnZpY2UuaXNJbml0aWF0b3IgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxTZXJ2aWNlLmNhbGxEYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICB0bzogZGF0YS50byxcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogZGF0YS5mcm9tLFxuICAgICAgICAgICAgICAgICAgICBzZHA6IGRhdGEuc2RwLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBkYXRhLnR5cGVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnY2FsbCddKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNvY2tldC5vbignZ2V0VXNlcnMnLCBkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMudXNlcnMgPSBbLi4uZGF0YV07XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNhbGxTZXJ2aWNlLmdldFVzZXJzKCk7XG4gICAgfVxuXG4gICAgY2FsbFVzZXIoZXZlbnQ6IEl0ZW1FdmVudERhdGEpIHtcbiAgICAgICAgY29uc3QgdXNlciA9IHRoaXMudXNlcnNbZXZlbnQuaW5kZXhdO1xuICAgICAgICB0aGlzLmNhbGxTZXJ2aWNlLmlzSW5pdGlhdG9yID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jYWxsU2VydmljZS5jYWxsRGF0YSA9IHtcbiAgICAgICAgICAgIHRvOiB1c2VyLnVzZXJuYW1lLFxuICAgICAgICAgICAgZnJvbTogdGhpcy5jYWxsU2VydmljZS5jdXJyZW50VXNlclxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ2NhbGwnXSk7XG4gICAgfVxufVxuIl19