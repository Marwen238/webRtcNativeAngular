"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
var _1 = require("../");
element_registry_1.registerElement('WebRTCView', function () { return _1.WebRTCView; });
var WebRTCViewDirective = /** @class */ (function () {
    function WebRTCViewDirective() {
    }
    WebRTCViewDirective = __decorate([
        core_1.Directive({
            selector: 'WebRTCView'
        })
    ], WebRTCViewDirective);
    return WebRTCViewDirective;
}());
exports.WebRTCViewDirective = WebRTCViewDirective;
exports.NSWEBRTCVIEW_DIRECTIVES = [WebRTCViewDirective];
var WebRTCModule = /** @class */ (function () {
    function WebRTCModule() {
    }
    WebRTCModule = __decorate([
        core_1.NgModule({
            declarations: [exports.NSWEBRTCVIEW_DIRECTIVES],
            exports: [exports.NSWEBRTCVIEW_DIRECTIVES]
        })
    ], WebRTCModule);
    return WebRTCModule;
}());
exports.WebRTCModule = WebRTCModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRDtBQUNwRCwwRUFBd0U7QUFDeEUsd0JBQWlDO0FBRWpDLGtDQUFlLENBQUMsWUFBWSxFQUFFLGNBQU0sT0FBQSxhQUFVLEVBQVYsQ0FBVSxDQUFDLENBQUM7QUFLaEQ7SUFBQTtJQUNBLENBQUM7SUFEWSxtQkFBbUI7UUFIL0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1NBQ3pCLENBQUM7T0FDVyxtQkFBbUIsQ0FDL0I7SUFBRCwwQkFBQztDQUFBLEFBREQsSUFDQztBQURZLGtEQUFtQjtBQUduQixRQUFBLHVCQUF1QixHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQU83RDtJQUFBO0lBQ0EsQ0FBQztJQURZLFlBQVk7UUFKeEIsZUFBUSxDQUFDO1lBQ04sWUFBWSxFQUFFLENBQUMsK0JBQXVCLENBQUM7WUFDdkMsT0FBTyxFQUFFLENBQUMsK0JBQXVCLENBQUM7U0FDckMsQ0FBQztPQUNXLFlBQVksQ0FDeEI7SUFBRCxtQkFBQztDQUFBLEFBREQsSUFDQztBQURZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeSc7XG5pbXBvcnQgeyBXZWJSVENWaWV3IH0gZnJvbSAnLi4vJztcblxucmVnaXN0ZXJFbGVtZW50KCdXZWJSVENWaWV3JywgKCkgPT4gV2ViUlRDVmlldyk7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnV2ViUlRDVmlldydcbn0pXG5leHBvcnQgY2xhc3MgV2ViUlRDVmlld0RpcmVjdGl2ZSB7XG59XG5cbmV4cG9ydCBjb25zdCBOU1dFQlJUQ1ZJRVdfRElSRUNUSVZFUyA9IFtXZWJSVENWaWV3RGlyZWN0aXZlXTtcblxuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW05TV0VCUlRDVklFV19ESVJFQ1RJVkVTXSxcbiAgICBleHBvcnRzOiBbTlNXRUJSVENWSUVXX0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIFdlYlJUQ01vZHVsZSB7XG59XG4iXX0=