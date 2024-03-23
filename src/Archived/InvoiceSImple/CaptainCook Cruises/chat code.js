var timestamp_UTC = new Date();
var timeNowSydney = timestamp_UTC.toLocaleTimeString("en-AU", {timeZone: "Australia/Sydney", hourCycle: 'h23'})


function timeFallsBetween(sydneyTime, hourStart, hourEnd) {
    //timeFallsBetween('24:00:07', 10, 24)
    var sydneyTimeArray = sydneyTime.split(':')
    var sydneyHours = parseInt(sydneyTimeArray[0]) //24
    var sydneyMinutes = parseInt(sydneyTimeArray[1]) //00
    var requirementOne = (hourStart<=sydneyHours && sydneyHours<hourEnd)
    var requirementTwo = (sydneyHours===hourEnd && sydneyMinutes>-1 && sydneyMinutes<1)
    if(requirementOne || requirementTwo) {
        return true;
    }
    return false;
}
if (timeFallsBetween(timeNowSydney, 10, 24)) {
    //Australian Live Chat Function
	window.__lc = window.__lc || {};
	window.__lc.license = 3051452;
	(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src='https://cdn.livechatinc.com/tracking.js',t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))
} else {
    // USA Live Chat Function
    function initFreshChat() {
        window.fcWidget.init({
        token: "16654096-30b7-42c1-8a1b-8d2cba1ee6a8",
        host: "https://wchat.freshchat.com",
        siteId: "1005"
        });
        }
        function initialize(i,t){var e;i.getElementById(t)?initFreshChat():((e=i.createElement("script")).id=t,e.async=!0,e.src="https://wchat.freshchat.com/js/widget.js",e.onload=initFreshChat,i.head.appendChild(e))}function initiateCall(){initialize(document,"freshchat-js-sdk")}window.addEventListener?window.addEventListener("load",initiateCall,!1):window.attachEvent("load",initiateCall,!1);
}