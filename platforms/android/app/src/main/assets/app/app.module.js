"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var angular_1 = require("nativescript-socketio/angular");
var environment_1 = require("./environment");
var call_component_1 = require("~/call/call.component");
var main_component_1 = require("~/main/main.component");
var login_component_1 = require("~/login/login.component");
// Uncomment and add to NgModule imports if you need to use two-way binding
var forms_1 = require("nativescript-angular/forms");
var call_service_1 = require("~/call.service");
var nativescript_webrtc_plugin_1 = require("nativescript-webrtc-plugin");
var angular_2 = require("nativescript-webrtc-plugin/angular");
nativescript_webrtc_plugin_1.WebRTC.init();
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [app_component_1.AppComponent],
            imports: [
                nativescript_module_1.NativeScriptModule,
                angular_1.SocketIOModule.forRoot(environment_1.server),
                forms_1.NativeScriptFormsModule,
                angular_2.WebRTCModule,
                app_routing_1.AppRoutingModule
            ],
            declarations: [app_component_1.AppComponent, call_component_1.CallComponent, main_component_1.MainComponent, login_component_1.LoginComponent],
            providers: [call_service_1.CallService],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFFL0MseURBQStEO0FBQy9ELDZDQUF1QztBQUN2Qyx3REFBc0Q7QUFDdEQsd0RBQXNEO0FBQ3RELDJEQUF5RDtBQUN6RCwyRUFBMkU7QUFDM0Usb0RBQXFFO0FBQ3JFLCtDQUE2QztBQUM3Qyx5RUFBb0Q7QUFDcEQsOERBQWtFO0FBQ2xFLG1DQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7QUFnQmQ7SUFBQTtJQUNBLENBQUM7SUFEWSxTQUFTO1FBZHJCLGVBQVEsQ0FBQztZQUNOLFNBQVMsRUFBRSxDQUFDLDRCQUFZLENBQUM7WUFDekIsT0FBTyxFQUFFO2dCQUNMLHdDQUFrQjtnQkFDbEIsd0JBQWMsQ0FBQyxPQUFPLENBQUMsb0JBQU0sQ0FBQztnQkFDOUIsK0JBQXVCO2dCQUN2QixzQkFBWTtnQkFDWiw4QkFBZ0I7YUFDbkI7WUFDRCxZQUFZLEVBQUUsQ0FBQyw0QkFBWSxFQUFFLDhCQUFhLEVBQUUsOEJBQWEsRUFBRSxnQ0FBYyxDQUFDO1lBQzFFLFNBQVMsRUFBRSxDQUFDLDBCQUFXLENBQUM7WUFDeEIsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7U0FDOUIsQ0FBQztPQUVXLFNBQVMsQ0FDckI7SUFBRCxnQkFBQztDQUFBLEFBREQsSUFDQztBQURZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGUnO1xuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gJy4vYXBwLnJvdXRpbmcnO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSAnLi9hcHAuY29tcG9uZW50JztcblxuaW1wb3J0IHsgU29ja2V0SU9Nb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtc29ja2V0aW8vYW5ndWxhcic7XG5pbXBvcnQgeyBzZXJ2ZXIgfSBmcm9tICcuL2Vudmlyb25tZW50JztcbmltcG9ydCB7IENhbGxDb21wb25lbnQgfSBmcm9tICd+L2NhbGwvY2FsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFpbkNvbXBvbmVudCB9IGZyb20gJ34vbWFpbi9tYWluLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gJ34vbG9naW4vbG9naW4uY29tcG9uZW50Jztcbi8vIFVuY29tbWVudCBhbmQgYWRkIHRvIE5nTW9kdWxlIGltcG9ydHMgaWYgeW91IG5lZWQgdG8gdXNlIHR3by13YXkgYmluZGluZ1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDYWxsU2VydmljZSB9IGZyb20gJ34vY2FsbC5zZXJ2aWNlJztcbmltcG9ydCB7IFdlYlJUQyB9IGZyb20gJ25hdGl2ZXNjcmlwdC13ZWJydGMtcGx1Z2luJztcbmltcG9ydCB7IFdlYlJUQ01vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC13ZWJydGMtcGx1Z2luL2FuZ3VsYXInO1xuV2ViUlRDLmluaXQoKTtcblxuQE5nTW9kdWxlKHtcbiAgICBib290c3RyYXA6IFtBcHBDb21wb25lbnRdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgICAgICBTb2NrZXRJT01vZHVsZS5mb3JSb290KHNlcnZlciksXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgICAgICBXZWJSVENNb2R1bGUsXG4gICAgICAgIEFwcFJvdXRpbmdNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW0FwcENvbXBvbmVudCwgQ2FsbENvbXBvbmVudCwgTWFpbkNvbXBvbmVudCwgTG9naW5Db21wb25lbnRdLFxuICAgIHByb3ZpZGVyczogW0NhbGxTZXJ2aWNlXSxcbiAgICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV1cbn0pXG5cbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUge1xufVxuIl19