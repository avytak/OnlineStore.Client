import{a as V}from"./chunk-M5FCNNXV.js";import{Ba as g,Ca as u,E as m,F as l,Ka as f,La as y,V as r,W as a,ba as v,ia as p,jb as _,mb as h,na as s,ta as c,ua as o,vb as S,xb as I,za as d}from"./chunk-ZDQ2P6Y7.js";function b(i,t){i&1&&(c(0,"div"),f(1,"Verifying..."),o())}function A(i,t){if(i&1){let e=d();c(0,"button",2),g("click",function(){m(e);let C=u(2);return l(C.goToLogin())}),f(1,"Go to Login"),o()}}function R(i,t){if(i&1&&(c(0,"div")(1,"p"),f(2),o(),p(3,A,2,0,"button",1),o()),i&2){let e=u();r(2),y(e.message),r(),s("ngIf",e.verificationStatus==="success")}}var x=class i{constructor(t,e,n){this.route=t;this.router=e;this.apiAuthService=n}verificationStatus="loading";message="";ngOnInit(){let t=this.route.snapshot.queryParamMap.get("code"),e=this.route.snapshot.queryParamMap.get("id");if(!t||!e){this.verificationStatus="error",this.message="Invalid verification link.";return}this.apiAuthService.verifyUser(t,e).subscribe({next:n=>{n.success?(this.verificationStatus="success",this.message="Your email has been successfully verified. You can now log in."):(this.verificationStatus="error",this.message=n.message||"Verification failed. Please try again later.")},error:()=>{this.verificationStatus="error",this.message="Verification failed. Please try again later."}})}goToLogin(){this.router.navigate(["/login"])}static \u0275fac=function(e){return new(e||i)(a(S),a(I),a(V))};static \u0275cmp=v({type:i,selectors:[["app-verify"]],decls:2,vars:2,consts:[[4,"ngIf"],[3,"click",4,"ngIf"],[3,"click"]],template:function(e,n){e&1&&p(0,b,2,0,"div",0)(1,R,4,2,"div",0),e&2&&(s("ngIf",n.verificationStatus==="loading"),r(),s("ngIf",n.verificationStatus!=="loading"))},dependencies:[h,_],encapsulation:2})};export{x as VerifyComponent};
