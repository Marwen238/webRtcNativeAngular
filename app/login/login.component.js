"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_socketio_1 = require("nativescript-socketio");
var call_service_1 = require("~/call.service");
var router_1 = require("nativescript-angular/router");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(callService, socket, router) {
        this.callService = callService;
        this.socket = socket;
        this.router = router;
        this.username = '';
        this.socket.on('login', function (data) {
            router.navigate(['/main']);
        });
    }
    LoginComponent.prototype.login = function (event) {
        this.callService.currentUser = this.username;
        this.socket.emit('add user', {
            username: this.username
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            templateUrl: 'login.component.html'
        }),
        __metadata("design:paramtypes", [call_service_1.CallService,
            nativescript_socketio_1.SocketIO,
            router_1.RouterExtensions])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELCtEQUFpRDtBQUNqRCwrQ0FBNkM7QUFDN0Msc0RBQStEO0FBTy9EO0lBR0Usd0JBQ1UsV0FBd0IsRUFDeEIsTUFBZ0IsRUFDaEIsTUFBd0I7UUFGeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBVTtRQUNoQixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUxsQyxhQUFRLEdBQVcsRUFBRSxDQUFDO1FBT3BCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFBLElBQUk7WUFDMUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsOEJBQUssR0FBTCxVQUFNLEtBQUs7UUFDVCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUMzQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDeEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQWxCVSxjQUFjO1FBTDFCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLE9BQU87WUFDakIsV0FBVyxFQUFFLHNCQUFzQjtTQUNwQyxDQUFDO3lDQUt1QiwwQkFBVztZQUNoQixnQ0FBUTtZQUNSLHlCQUFnQjtPQU52QixjQUFjLENBbUIxQjtJQUFELHFCQUFDO0NBQUEsQUFuQkQsSUFtQkM7QUFuQlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ja2V0SU8gfSBmcm9tICduYXRpdmVzY3JpcHQtc29ja2V0aW8nO1xuaW1wb3J0IHsgQ2FsbFNlcnZpY2UgfSBmcm9tICd+L2NhbGwuc2VydmljZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnbG9naW4nLFxuICB0ZW1wbGF0ZVVybDogJ2xvZ2luLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCB7XG4gIHVzZXJuYW1lOiBzdHJpbmcgPSAnJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNhbGxTZXJ2aWNlOiBDYWxsU2VydmljZSxcbiAgICBwcml2YXRlIHNvY2tldDogU29ja2V0SU8sXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnNcbiAgKSB7XG4gICAgdGhpcy5zb2NrZXQub24oJ2xvZ2luJywgZGF0YSA9PiB7XG4gICAgICByb3V0ZXIubmF2aWdhdGUoWycvbWFpbiddKTtcbiAgICB9KTtcbiAgfVxuXG4gIGxvZ2luKGV2ZW50KSB7XG4gICAgdGhpcy5jYWxsU2VydmljZS5jdXJyZW50VXNlciA9IHRoaXMudXNlcm5hbWU7XG4gICAgdGhpcy5zb2NrZXQuZW1pdCgnYWRkIHVzZXInLCB7XG4gICAgICB1c2VybmFtZTogdGhpcy51c2VybmFtZVxuICAgIH0pO1xuICB9XG59XG4iXX0=