(this.webpackJsonpfront=this.webpackJsonpfront||[]).push([[0],{29:function(n,t,e){n.exports=e(55)},34:function(n,t,e){},55:function(n,t,e){"use strict";e.r(t);var a=e(5),r=e.n(a),o=e(22),i=e.n(o),u=(e(34),e(23)),l=e(10),c=e(24),s=e.n(c),d=function(n){return s.a.get("http://api.digitransit.fi/geocoding/v1/search?text=".concat(n))};function f(){var n=Object(u.a)(["{\n        plan(\n            from: {lon: ",", lat: ","}\n        to: {lat: 60.175294, lon: 24.684855}\n        numItineraries: 3\n    ) {\n        itineraries {\n            legs {\n                from {\n                    lat\n                    lon\n                    name\n                    stop {\n                        code\n                        name\n                    }\n                }\n                startTime\n                endTime\n                mode\n                duration\n                realTime\n                distance\n                transitLeg\n            }\n        }\n    }\n}"]);return f=function(){return n},n}var m=new l.a({uri:"https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql"}),p=function(){return d(" Pohjoinen Rautatiekatu, 25").then((function(n){m.query({query:Object(l.b)(f(),n.data.bbox[2],n.data.bbox[3])}).then((function(n){console.log("response to graphQL"),console.log(n)}))})),r.a.createElement("div",null)};var g=function(){return r.a.createElement("div",null,r.a.createElement("h2",null,"Eficode ennakko"),r.a.createElement(p,null))};i.a.render(r.a.createElement(g,null),document.getElementById("root"))}},[[29,1,2]]]);
//# sourceMappingURL=main.f2a852ef.chunk.js.map