var IN_GLOBAL_SCOPE=!0;window.PR_SHOULD_USE_CONTINUATION=!0;var prettyPrintOne,prettyPrint;!function(){function e(e){function t(e){var t=e.charCodeAt(0);if(92!==t)return t;var n=e.charAt(1);return t=d[n],t?t:n>="0"&&"7">=n?parseInt(e.substring(1),8):"u"===n||"x"===n?parseInt(e.substring(2),16):e.charCodeAt(1)}function n(e){if(32>e)return(16>e?"\\x0":"\\x")+e.toString(16);var t=String.fromCharCode(e);return"\\"===t||"-"===t||"]"===t||"^"===t?"\\"+t:t}function r(e){var r=e.substring(1,e.length-1).match(new RegExp("\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]","g")),i=[],a="^"===r[0],o=["["];a&&o.push("^");for(var s=a?1:0,l=r.length;l>s;++s){var c=r[s];if(/\\[bdsw]/i.test(c))o.push(c);else{var u,d=t(c);l>s+2&&"-"===r[s+1]?(u=t(r[s+2]),s+=2):u=d,i.push([d,u]),65>u||d>122||(65>u||d>90||i.push([32|Math.max(65,d),32|Math.min(u,90)]),97>u||d>122||i.push([-33&Math.max(97,d),-33&Math.min(u,122)]))}}i.sort(function(e,t){return e[0]-t[0]||t[1]-e[1]});for(var p=[],f=[],s=0;s<i.length;++s){var h=i[s];h[0]<=f[1]+1?f[1]=Math.max(f[1],h[1]):p.push(f=h)}for(var s=0;s<p.length;++s){var h=p[s];o.push(n(h[0])),h[1]>h[0]&&(h[1]+1>h[0]&&o.push("-"),o.push(n(h[1])))}return o.push("]"),o.join("")}function i(e){for(var t=e.source.match(new RegExp("(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)","g")),i=t.length,s=[],l=0,c=0;i>l;++l){var u=t[l];if("("===u)++c;else if("\\"===u.charAt(0)){var d=+u.substring(1);d&&(c>=d?s[d]=-1:t[l]=n(d))}}for(var l=1;l<s.length;++l)-1===s[l]&&(s[l]=++a);for(var l=0,c=0;i>l;++l){var u=t[l];if("("===u)++c,s[c]||(t[l]="(?:");else if("\\"===u.charAt(0)){var d=+u.substring(1);d&&c>=d&&(t[l]="\\"+s[d])}}for(var l=0;i>l;++l)"^"===t[l]&&"^"!==t[l+1]&&(t[l]="");if(e.ignoreCase&&o)for(var l=0;i>l;++l){var u=t[l],p=u.charAt(0);u.length>=2&&"["===p?t[l]=r(u):"\\"!==p&&(t[l]=u.replace(/[a-zA-Z]/g,function(e){var t=e.charCodeAt(0);return"["+String.fromCharCode(-33&t,32|t)+"]"}))}return t.join("")}for(var a=0,o=!1,s=!1,l=0,c=e.length;c>l;++l){var u=e[l];if(u.ignoreCase)s=!0;else if(/[a-z]/i.test(u.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi,""))){o=!0,s=!1;break}}for(var d={"b":8,"t":9,"n":10,"v":11,"f":12,"r":13},p=[],l=0,c=e.length;c>l;++l){var u=e[l];if(u.global||u.multiline)throw new Error(""+u);p.push("(?:"+i(u)+")")}return new RegExp(p.join("|"),s?"gi":"g")}function t(e,t){function n(e){var l=e.nodeType;if(1==l){if(r.test(e.className))return;for(var c=e.firstChild;c;c=c.nextSibling)n(c);var u=e.nodeName.toLowerCase();("br"===u||"li"===u)&&(i[s]="\n",o[s<<1]=a++,o[s++<<1|1]=e)}else if(3==l||4==l){var d=e.nodeValue;d.length&&(d=t?d.replace(/\r\n?/g,"\n"):d.replace(/[ \t\r\n]+/g," "),i[s]=d,o[s<<1]=a,a+=d.length,o[s++<<1|1]=e)}}var r=/(?:^|\s)nocode(?:\s|$)/,i=[],a=0,o=[],s=0;return n(e),{"sourceCode":i.join("").replace(/\n$/,""),"spans":o}}function n(e,t,n,r){if(t){var i={"sourceCode":t,"basePos":e};n(i),r.push.apply(r,i.decorations)}}function r(e){for(var t=void 0,n=e.firstChild;n;n=n.nextSibling){var r=n.nodeType;t=1===r?t?e:n:3===r?H.test(n.nodeValue)?e:t:t}return t===e?void 0:t}function i(t,r){var i,a={};!function(){for(var n=t.concat(r),o=[],s={},l=0,c=n.length;c>l;++l){var u=n[l],d=u[3];if(d)for(var p=d.length;--p>=0;)a[d.charAt(p)]=u;var f=u[1],h=""+f;s.hasOwnProperty(h)||(o.push(f),s[h]=null)}o.push(/[\0-\uffff]/),i=e(o)}();var o=r.length,s=function(e){for(var t=e.sourceCode,l=e.basePos,u=[l,M],d=0,p=t.match(i)||[],f={},h=0,g=p.length;g>h;++h){var m,v=p[h],y=f[v],b=void 0;if("string"==typeof y)m=!1;else{var x=a[v.charAt(0)];if(x)b=v.match(x[1]),y=x[0];else{for(var w=0;o>w;++w)if(x=r[w],b=v.match(x[1])){y=x[0];break}b||(y=M)}m=y.length>=5&&"lang-"===y.substring(0,5),!m||b&&"string"==typeof b[1]||(m=!1,y=N),m||(f[v]=y)}var k=d;if(d+=v.length,m){var S=b[1],E=v.indexOf(S),$=E+S.length;b[2]&&($=v.length-b[2].length,E=$-S.length);var C=y.substring(5);n(l+k,v.substring(0,E),s,u),n(l+k+E,S,c(C,S),u),n(l+k+$,v.substring($),s,u)}else u.push(l+k,y)}e.decorations=u};return s}function a(e){var t=[],n=[];e.tripleQuotedStrings?t.push([I,/^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,null,"'\""]):e.multiLineStrings?t.push([I,/^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,null,"'\"`"]):t.push([I,/^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,null,"\"'"]),e.verbatimStrings&&n.push([I,/^@\"(?:[^\"]|\"\")*(?:\"|$)/,null]);var r=e.hashComments;r&&(e.cStyleComments?(r>1?t.push([A,/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,null,"#"]):t.push([A,/^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/,null,"#"]),n.push([I,/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/,null])):t.push([A,/^#[^\r\n]*/,null,"#"])),e.cStyleComments&&(n.push([A,/^\/\/[^\r\n]*/,null]),n.push([A,/^\/\*[\s\S]*?(?:\*\/|$)/,null]));var a=e.regexLiterals;if(a){var o=a>1?"":"\n\r",s=o?".":"[\\S\\s]",l="/(?=[^/*"+o+"])(?:[^/\\x5B\\x5C"+o+"]|\\x5C"+s+"|\\x5B(?:[^\\x5C\\x5D"+o+"]|\\x5C"+s+")*(?:\\x5D|$))+/";n.push(["lang-regex",RegExp("^"+j+"("+l+")")])}var c=e.types;c&&n.push([P,c]);var u=(""+e.keywords).replace(/^ | $/g,"");u.length&&n.push([R,new RegExp("^(?:"+u.replace(/[\s,]+/g,"|")+")\\b"),null]),t.push([M,/^\s+/,null," \r\n	 "]);var d="^.[^\\s\\w.$@'\"`/\\\\]*";return e.regexLiterals&&(d+="(?!s*/)"),n.push([L,/^@[a-z_$][a-z_$@0-9]*/i,null],[P,/^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/,null],[M,/^[a-z_$][a-z_$@0-9]*/i,null],[L,new RegExp("^(?:0x[a-f0-9]+|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)(?:e[+\\-]?\\d+)?)[a-z]*","i"),null,"0123456789"],[M,/^\\[\s\S]?/,null],[O,new RegExp(d),null]),i(t,n)}function o(e,t,n){function r(e){var t=e.nodeType;if(1!=t||a.test(e.className)){if((3==t||4==t)&&n){var l=e.nodeValue,c=l.match(o);if(c){var u=l.substring(0,c.index);e.nodeValue=u;var d=l.substring(c.index+c[0].length);if(d){var p=e.parentNode;p.insertBefore(s.createTextNode(d),e.nextSibling)}i(e),u||e.parentNode.removeChild(e)}}}else if("br"===e.nodeName)i(e),e.parentNode&&e.parentNode.removeChild(e);else for(var f=e.firstChild;f;f=f.nextSibling)r(f)}function i(e){function t(e,n){var r=n?e.cloneNode(!1):e,i=e.parentNode;if(i){var a=t(i,1),o=e.nextSibling;a.appendChild(r);for(var s=o;s;s=o)o=s.nextSibling,a.appendChild(s)}return r}for(;!e.nextSibling;)if(e=e.parentNode,!e)return;for(var n,r=t(e.nextSibling,0);(n=r.parentNode)&&1===n.nodeType;)r=n;c.push(r)}for(var a=/(?:^|\s)nocode(?:\s|$)/,o=/\r\n?|\n/,s=e.ownerDocument,l=s.createElement("li");e.firstChild;)l.appendChild(e.firstChild);for(var c=[l],u=0;u<c.length;++u)r(c[u]);t===(0|t)&&c[0].setAttribute("value",t);var d=s.createElement("ol");d.className="linenums";for(var p=Math.max(0,t-1|0)||0,u=0,f=c.length;f>u;++u)l=c[u],l.className="L"+(u+p)%10,l.firstChild||l.appendChild(s.createTextNode(" ")),d.appendChild(l);e.appendChild(d)}function s(e){var t=/\bMSIE\s(\d+)/.exec(navigator.userAgent);t=t&&+t[1]<=8;var n=/\n/g,r=e.sourceCode,i=r.length,a=0,o=e.spans,s=o.length,l=0,c=e.decorations,u=c.length,d=0;c[u]=i;var p,f;for(f=p=0;u>f;)c[f]!==c[f+2]?(c[p++]=c[f++],c[p++]=c[f++]):f+=2;for(u=p,f=p=0;u>f;){for(var h=c[f],g=c[f+1],m=f+2;u>=m+2&&c[m+1]===g;)m+=2;c[p++]=h,c[p++]=g,f=m}u=c.length=p;var v,y=e.sourceNode;y&&(v=y.style.display,y.style.display="none");try{for(;s>l;){var b,x=(o[l],o[l+2]||i),w=c[d+2]||i,m=Math.min(x,w),k=o[l+1];if(1!==k.nodeType&&(b=r.substring(a,m))){t&&(b=b.replace(n,"\r")),k.nodeValue=b;var S=k.ownerDocument,E=S.createElement("span");E.className=c[d+1];var $=k.parentNode;$.replaceChild(E,k),E.appendChild(k),x>a&&(o[l+1]=k=S.createTextNode(r.substring(m,x)),$.insertBefore(k,E.nextSibling))}a=m,a>=x&&(l+=2),a>=w&&(d+=2)}}finally{y&&(y.style.display=v)}}function l(e,t){for(var n=t.length;--n>=0;){var r=t[n];V.hasOwnProperty(r)?f.console&&console.warn("cannot override language handler %s",r):V[r]=e}}function c(e,t){return e&&V.hasOwnProperty(e)||(e=/^\s*</.test(t)?"default-markup":"default-code"),V[e]}function u(e){var n=e.langExtension;try{var r=t(e.sourceNode,e.pre),i=r.sourceCode;e.sourceCode=i,e.spans=r.spans,e.basePos=0,c(n,i)(e),s(e)}catch(a){f.console&&console.log(a&&a.stack||a)}}function d(e,t,n){var r=document.createElement("div");r.innerHTML="<pre>"+e+"</pre>",r=r.firstChild,n&&o(r,n,!0);var i={"langExtension":t,"numberLines":n,"sourceNode":r,"pre":1};return u(i),r.innerHTML}function p(e,t){function n(e){return a.getElementsByTagName(e)}function i(){for(var t=f.PR_SHOULD_USE_CONTINUATION?g.now()+250:1/0;v<c.length&&g.now()<t;v++){for(var n=c[v],a=E,l=n;l=l.previousSibling;){var d=l.nodeType,p=(7===d||8===d)&&l.nodeValue;if(p?!/^\??prettify\b/.test(p):3!==d||/\S/.test(l.nodeValue))break;if(p){a={},p.replace(/\b(\w+)=([\w:.%+-]+)/g,function(e,t,n){a[t]=n});break}}var h=n.className;if((a!==E||b.test(h))&&!x.test(h)){for(var $=!1,C=n.parentNode;C;C=C.parentNode){var T=C.tagName;if(S.test(T)&&C.className&&b.test(C.className)){$=!0;break}}if(!$){n.className+=" prettyprinted";var _=a.lang;if(!_){_=h.match(y);var I;!_&&(I=r(n))&&k.test(I.tagName)&&(_=I.className.match(y)),_&&(_=_[1])}var R;if(w.test(n.tagName))R=1;else{var A=n.currentStyle,P=s.defaultView,L=A?A.whiteSpace:P&&P.getComputedStyle?P.getComputedStyle(n,null).getPropertyValue("white-space"):0;R=L&&"pre"===L.substring(0,3)}var O=a.linenums;(O="true"===O||+O)||(O=h.match(/\blinenums\b(?::(\d+))?/),O=O?O[1]&&O[1].length?+O[1]:!0:!1),O&&o(n,O,R),m={"langExtension":_,"sourceNode":n,"numberLines":O,"pre":R},u(m)}}}v<c.length?setTimeout(i,250):"function"==typeof e&&e()}for(var a=t||document.body,s=a.ownerDocument||document,l=[n("pre"),n("code"),n("xmp")],c=[],d=0;d<l.length;++d)for(var p=0,h=l[d].length;h>p;++p)c.push(l[d][p]);l=null;var g=Date;g.now||(g={"now":function(){return+new Date}});var m,v=0,y=/\blang(?:uage)?-([\w.]+)(?!\S)/,b=/\bprettyprint\b/,x=/\bprettyprinted\b/,w=/pre|xmp/i,k=/^code$/i,S=/^(?:pre|code|xmp)$/i,E={};i()}var f=window,h=["break,continue,do,else,for,if,return,while"],g=[h,"auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],m=[g,"catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],v=[m,"alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],y=[m,"abstract,assert,boolean,byte,extends,final,finally,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"],b=[y,"as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,internal,into,is,let,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where"],x="all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",w=[m,"debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],k="caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",S=[h,"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],E=[h,"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],$=[h,"as,assert,const,copy,drop,enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv,pub,pure,ref,self,static,struct,true,trait,type,unsafe,use"],C=[h,"case,done,elif,esac,eval,fi,function,in,local,set,then,until"],T=[v,b,w,k,S,E,C],_=/^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/,I="str",R="kwd",A="com",P="typ",L="lit",O="pun",M="pln",D="tag",q="dec",N="src",F="atn",U="atv",B="nocode",j="(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*",H=/\S/,z=a({"keywords":T,"hashComments":!0,"cStyleComments":!0,"multiLineStrings":!0,"regexLiterals":!0}),V={};l(z,["default-code"]),l(i([],[[M,/^[^<?]+/],[q,/^<!\w[^>]*(?:>|$)/],[A,/^<\!--[\s\S]*?(?:-\->|$)/],["lang-",/^<\?([\s\S]+?)(?:\?>|$)/],["lang-",/^<%([\s\S]+?)(?:%>|$)/],[O,/^(?:<[%?]|[%?]>)/],["lang-",/^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),["default-markup","htm","html","mxml","xhtml","xml","xsl"]),l(i([[M,/^[\s]+/,null," 	\r\n"],[U,/^(?:\"[^\"]*\"?|\'[^\']*\'?)/,null,"\"'"]],[[D,/^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],[F,/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],[O,/^[=<>\/]+/],["lang-js",/^on\w+\s*=\s*\"([^\"]+)\"/i],["lang-js",/^on\w+\s*=\s*\'([^\']+)\'/i],["lang-js",/^on\w+\s*=\s*([^\"\'>\s]+)/i],["lang-css",/^style\s*=\s*\"([^\"]+)\"/i],["lang-css",/^style\s*=\s*\'([^\']+)\'/i],["lang-css",/^style\s*=\s*([^\"\'>\s]+)/i]]),["in.tag"]),l(i([],[[U,/^[\s\S]+/]]),["uq.val"]),l(a({"keywords":v,"hashComments":!0,"cStyleComments":!0,"types":_}),["c","cc","cpp","cxx","cyc","m"]),l(a({"keywords":"null,true,false"}),["json"]),l(a({"keywords":b,"hashComments":!0,"cStyleComments":!0,"verbatimStrings":!0,"types":_}),["cs"]),l(a({"keywords":y,"cStyleComments":!0}),["java"]),l(a({"keywords":C,"hashComments":!0,"multiLineStrings":!0}),["bash","bsh","csh","sh"]),l(a({"keywords":S,"hashComments":!0,"multiLineStrings":!0,"tripleQuotedStrings":!0}),["cv","py","python"]),l(a({"keywords":k,"hashComments":!0,"multiLineStrings":!0,"regexLiterals":2}),["perl","pl","pm"]),l(a({"keywords":E,"hashComments":!0,"multiLineStrings":!0,"regexLiterals":!0}),["rb","ruby"]),l(a({"keywords":w,"cStyleComments":!0,"regexLiterals":!0}),["javascript","js"]),l(a({"keywords":x,"hashComments":3,"cStyleComments":!0,"multilineStrings":!0,"tripleQuotedStrings":!0,"regexLiterals":!0}),["coffee"]),l(a({"keywords":$,"cStyleComments":!0,"multilineStrings":!0}),["rc","rs","rust"]),l(i([],[[I,/^[\s\S]+/]]),["regex"]);var W=f.PR={"createSimpleLexer":i,"registerLangHandler":l,"sourceDecorator":a,"PR_ATTRIB_NAME":F,"PR_ATTRIB_VALUE":U,"PR_COMMENT":A,"PR_DECLARATION":q,"PR_KEYWORD":R,"PR_LITERAL":L,"PR_NOCODE":B,"PR_PLAIN":M,"PR_PUNCTUATION":O,"PR_SOURCE":N,"PR_STRING":I,"PR_TAG":D,"PR_TYPE":P,"prettyPrintOne":IN_GLOBAL_SCOPE?f.prettyPrintOne=d:prettyPrintOne=d,"prettyPrint":prettyPrint=IN_GLOBAL_SCOPE?f.prettyPrint=p:prettyPrint=p};"function"==typeof define&&define.amd&&define("google-code-prettify",[],function(){return W})}(),PR.registerLangHandler(PR.createSimpleLexer([["opn",/^[\(\{\[]+/,null,"([{"],["clo",/^[\)\}\]]+/,null,")]}"],[PR.PR_COMMENT,/^;[^\r\n]*/,null,";"],[PR.PR_PLAIN,/^[\t\n\r \xA0]+/,null,"	\n\r  "],[PR.PR_STRING,/^\"(?:[^\"\\]|\\[\s\S])*(?:\"|$)/,null,'"']],[[PR.PR_KEYWORD,/^(?:def|if|do|let|quote|var|fn|loop|recur|throw|try|monitor-enter|monitor-exit|defmacro|defn|defn-|macroexpand|macroexpand-1|for|doseq|dosync|dotimes|and|or|when|not|assert|doto|proxy|defstruct|first|rest|cons|defprotocol|deftype|defrecord|reify|defmulti|defmethod|meta|with-meta|ns|in-ns|create-ns|import|intern|refer|alias|namespace|resolve|ref|deref|refset|new|set!|memfn|to-array|into-array|aset|gen-class|reduce|map|filter|find|nil?|empty?|hash-map|hash-set|vec|vector|seq|flatten|reverse|assoc|dissoc|list|list?|disj|get|union|difference|intersection|extend|extend-type|extend-protocol|prn)\b/,null],[PR.PR_TYPE,/^:[0-9a-zA-Z\-]+/]]),["clj"]),PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[ \t\r\n\f]+/,null," 	\r\n\f"]],[[PR.PR_STRING,/^\"(?:[^\n\r\f\\\"]|\\(?:\r\n?|\n|\f)|\\[\s\S])*\"/,null],[PR.PR_STRING,/^\'(?:[^\n\r\f\\\']|\\(?:\r\n?|\n|\f)|\\[\s\S])*\'/,null],["lang-css-str",/^url\(([^\)\"\']+)\)/i],[PR.PR_KEYWORD,/^(?:url|rgb|\!important|@import|@page|@media|@charset|inherit)(?=[^\-\w]|$)/i,null],["lang-css-kw",/^(-?(?:[_a-z]|(?:\\[0-9a-f]+ ?))(?:[_a-z0-9\-]|\\(?:\\[0-9a-f]+ ?))*)\s*:/i],[PR.PR_COMMENT,/^\/\*[^*]*\*+(?:[^\/*][^*]*\*+)*\//],[PR.PR_COMMENT,/^(?:<!--|-->)/],[PR.PR_LITERAL,/^(?:\d+|\d*\.\d+)(?:%|[a-z]+)?/i],[PR.PR_LITERAL,/^#(?:[0-9a-f]{3}){1,2}\b/i],[PR.PR_PLAIN,/^-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i],[PR.PR_PUNCTUATION,/^[^\s\w\'\"]+/]]),["css"]),PR.registerLangHandler(PR.createSimpleLexer([],[[PR.PR_KEYWORD,/^-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i]]),["css-kw"]),PR.registerLangHandler(PR.createSimpleLexer([],[[PR.PR_STRING,/^[^\)\"\']+/]]),["css-str"]),PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[\t\n\r \xA0]+/,null,"	\n\r  "]],[[PR.PR_COMMENT,/^#!(?:.*)/],[PR.PR_KEYWORD,/^\b(?:import|library|part of|part|as|show|hide)\b/i],[PR.PR_COMMENT,/^\/\/(?:.*)/],[PR.PR_COMMENT,/^\/\*[^*]*\*+(?:[^\/*][^*]*\*+)*\//],[PR.PR_KEYWORD,/^\b(?:class|interface)\b/i],[PR.PR_KEYWORD,/^\b(?:assert|break|case|catch|continue|default|do|else|finally|for|if|in|is|new|return|super|switch|this|throw|try|while)\b/i],[PR.PR_KEYWORD,/^\b(?:abstract|const|extends|factory|final|get|implements|native|operator|set|static|typedef|var)\b/i],[PR.PR_TYPE,/^\b(?:bool|double|Dynamic|int|num|Object|String|void)\b/i],[PR.PR_KEYWORD,/^\b(?:false|null|true)\b/i],[PR.PR_STRING,/^r?[\']{3}[\s|\S]*?[^\\][\']{3}/],[PR.PR_STRING,/^r?[\"]{3}[\s|\S]*?[^\\][\"]{3}/],[PR.PR_STRING,/^r?\'(\'|(?:[^\n\r\f])*?[^\\]\')/],[PR.PR_STRING,/^r?\"(\"|(?:[^\n\r\f])*?[^\\]\")/],[PR.PR_PLAIN,/^[a-z_$][a-z0-9_]*/i],[PR.PR_PUNCTUATION,/^[~!%^&*+=|?:<>\/-]/],[PR.PR_LITERAL,/^\b0x[0-9a-f]+/i],[PR.PR_LITERAL,/^\b\d+(?:\.\d*)?(?:e[+-]?\d+)?/i],[PR.PR_LITERAL,/^\b\.\d+(?:e[+-]?\d+)?/i],[PR.PR_PUNCTUATION,/^[(){}\[\],.;]/]]),["dart"]),PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[\t\n\x0B\x0C\r ]+/,null,"	\n\f\r "],[PR.PR_STRING,/^\"(?:[^\"\\\n\x0C\r]|\\[\s\S])*(?:\"|$)/,null,'"'],[PR.PR_LITERAL,/^[a-z][a-zA-Z0-9_]*/],[PR.PR_LITERAL,/^\'(?:[^\'\\\n\x0C\r]|\\[^&])+\'?/,null,"'"],[PR.PR_LITERAL,/^\?[^ \t\n({]+/,null,"?"],[PR.PR_LITERAL,/^(?:0o[0-7]+|0x[\da-f]+|\d+(?:\.\d+)?(?:e[+\-]?\d+)?)/i,null,"0123456789"]],[[PR.PR_COMMENT,/^%[^\n]*/],[PR.PR_KEYWORD,/^(?:module|attributes|do|let|in|letrec|apply|call|primop|case|of|end|when|fun|try|catch|receive|after|char|integer|float,atom,string,var)\b/],[PR.PR_KEYWORD,/^-[a-z_]+/],[PR.PR_TYPE,/^[A-Z_][a-zA-Z0-9_]*/],[PR.PR_PUNCTUATION,/^[.,;]/]]),["erlang","erl"]),PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[\t\n\r \xA0]+/,null,"	\n\r  "],[PR.PR_PLAIN,/^(?:\"(?:[^\"\\]|\\[\s\S])*(?:\"|$)|\'(?:[^\'\\]|\\[\s\S])+(?:\'|$)|`[^`]*(?:`|$))/,null,"\"'"]],[[PR.PR_COMMENT,/^(?:\/\/[^\r\n]*|\/\*[\s\S]*?\*\/)/],[PR.PR_PLAIN,/^(?:[^\/\"\'`]|\/(?![\/\*]))+/i]]),["go"]),PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[\t\n\x0B\x0C\r ]+/,null,"	\n\f\r "],[PR.PR_STRING,/^\"(?:[^\"\\\n\x0C\r]|\\[\s\S])*(?:\"|$)/,null,'"'],[PR.PR_STRING,/^\'(?:[^\'\\\n\x0C\r]|\\[^&])\'?/,null,"'"],[PR.PR_LITERAL,/^(?:0o[0-7]+|0x[\da-f]+|\d+(?:\.\d+)?(?:e[+\-]?\d+)?)/i,null,"0123456789"]],[[PR.PR_COMMENT,/^(?:(?:--+(?:[^\r\n\x0C]*)?)|(?:\{-(?:[^-]|-+[^-\}])*-\}))/],[PR.PR_KEYWORD,/^(?:case|class|data|default|deriving|do|else|if|import|in|infix|infixl|infixr|instance|let|module|newtype|of|then|type|where|_)(?=[^a-zA-Z0-9\']|$)/,null],[PR.PR_PLAIN,/^(?:[A-Z][\w\']*\.)*[a-zA-Z][\w\']*/],[PR.PR_PUNCTUATION,/^[^\t\n\x0B\x0C\r a-zA-Z0-9\'\"]+/]]),["hs"]),PR.registerLangHandler(PR.createSimpleLexer([["opn",/^\(+/,null,"("],["clo",/^\)+/,null,")"],[PR.PR_COMMENT,/^;[^\r\n]*/,null,";"],[PR.PR_PLAIN,/^[\t\n\r \xA0]+/,null,"	\n\r  "],[PR.PR_STRING,/^\"(?:[^\"\\]|\\[\s\S])*(?:\"|$)/,null,'"']],[[PR.PR_KEYWORD,/^(?:block|c[ad]+r|catch|con[ds]|def(?:ine|un)|do|eq|eql|equal|equalp|eval-when|flet|format|go|if|labels|lambda|let|load-time-value|locally|macrolet|multiple-value-call|nil|progn|progv|quote|require|return-from|setq|symbol-macrolet|t|tagbody|the|throw|unwind)\b/,null],[PR.PR_LITERAL,/^[+\-]?(?:[0#]x[0-9a-f]+|\d+\/\d+|(?:\.\d+|\d+(?:\.\d*)?)(?:[ed][+\-]?\d+)?)/i],[PR.PR_LITERAL,/^\'(?:-*(?:\w|\\[\x21-\x7e])(?:[\w-]*|\\[\x21-\x7e])[=!?]?)?/],[PR.PR_PLAIN,/^-*(?:[a-z_]|\\[\x21-\x7e])(?:[\w-]*|\\[\x21-\x7e])[=!?]?/i],[PR.PR_PUNCTUATION,/^[^\w\t\n\r \xA0()\"\\\';]+/]]),["cl","el","lisp","lsp","scm","ss","rkt"]),PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[\t\n\r \xA0]+/,null,"	\n\r  "],[PR.PR_STRING,/^(?:\"(?:[^\"\\]|\\[\s\S])*(?:\"|$)|\'(?:[^\'\\]|\\[\s\S])*(?:\'|$))/,null,"\"'"]],[[PR.PR_COMMENT,/^--(?:\[(=*)\[[\s\S]*?(?:\]\1\]|$)|[^\r\n]*)/],[PR.PR_STRING,/^\[(=*)\[[\s\S]*?(?:\]\1\]|$)/],[PR.PR_KEYWORD,/^(?:and|break|do|else|elseif|end|false|for|function|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,null],[PR.PR_LITERAL,/^[+-]?(?:0x[\da-f]+|(?:(?:\.\d+|\d+(?:\.\d*)?)(?:e[+\-]?\d+)?))/i],[PR.PR_PLAIN,/^[a-z_]\w*/i],[PR.PR_PUNCTUATION,/^[^\w\t\n\r \xA0][^\w\t\n\r \xA0\"\'\-\+=]*/]]),["lua"]),PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[\t\n\r \xA0]+/,null,"	\n\r  "],[PR.PR_COMMENT,/^#(?:if[\t\n\r \xA0]+(?:[a-z_$][\w\']*|``[^\r\n\t`]*(?:``|$))|else|endif|light)/i,null,"#"],[PR.PR_STRING,/^(?:\"(?:[^\"\\]|\\[\s\S])*(?:\"|$)|\'(?:[^\'\\]|\\[\s\S])(?:\'|$))/,null,"\"'"]],[[PR.PR_COMMENT,/^(?:\/\/[^\r\n]*|\(\*[\s\S]*?\*\))/],[PR.PR_KEYWORD,/^(?:abstract|and|as|assert|begin|class|default|delegate|do|done|downcast|downto|elif|else|end|exception|extern|false|finally|for|fun|function|if|in|inherit|inline|interface|internal|lazy|let|match|member|module|mutable|namespace|new|null|of|open|or|override|private|public|rec|return|static|struct|then|to|true|try|type|upcast|use|val|void|when|while|with|yield|asr|land|lor|lsl|lsr|lxor|mod|sig|atomic|break|checked|component|const|constraint|constructor|continue|eager|event|external|fixed|functor|global|include|method|mixin|object|parallel|process|protected|pure|sealed|trait|virtual|volatile)\b/],[PR.PR_LITERAL,/^[+\-]?(?:0x[\da-f]+|(?:(?:\.\d+|\d+(?:\.\d*)?)(?:e[+\-]?\d+)?))/i],[PR.PR_PLAIN,/^(?:[a-z_][\w']*[!?#]?|``[^\r\n\t`]*(?:``|$))/i],[PR.PR_PUNCTUATION,/^[^\t\n\r \xA0\"\'\w]+/]]),["fs","ml"]),PR.registerLangHandler(PR.createSimpleLexer([],[]),["none"]),PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_STRING,/^(?:\'(?:[^\'\r\n]|\\.)*(?:\'|$))/,null,"'"],[PR.PR_PLAIN,/^\s+/,null," \r\n	 "]],[[PR.PR_COMMENT,/^(?:\/\/[^\r\n]*)|\(\*[\s\S]*?(?:\*\)|$)|^\{[\s\S]*?(?:\}|$)/,null],[PR.PR_KEYWORD,/^(?:AND|ARRAY|AS|ASM|BEGIN|CASE|CLASS|CONST|CONSTRUCTOR|DESTRUCTOR|DISPINTERFACE|DIV|DO|DOWNTO|ELSE|END|EXCEPT|EXPORTS|FILE|FINALIZATION|FINALLY|FOR|FUNCTION|GOTO|IF|IMPLEMENTATION|IN|INHERITED|INITIALIZATION|INLINE|INTERFACE|IS|LABEL|LIBRARY|MOD|NIL|NOT|OBJECT|OF|OR|PACKED|PROCEDURE|PROGRAM|PROPERTY|RAISE|RECORD|REPEAT|RESOURCESTRING|SET|SHL|SHR|STRING|THEN|THREADVAR|TO|TRY|TYPE|UNIT|UNTIL|USES|VAR|WHILE|WITH|XOR)\b/i,null],[PR.PR_LITERAL,/^(?:true|false|self|nil)/i,null],[PR.PR_PLAIN,/^[a-z][a-z0-9]*/i,null],[PR.PR_LITERAL,/^(?:\$[a-f0-9]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+\-]?\d+)?)/i,null,"0123456789"],[PR.PR_PUNCTUATION,/^.[^\s\w\.$@\'\/]*/,null]]),["pascal"]),PR.registerLangHandler(PR.sourceDecorator({"keywords":"bytes,default,double,enum,extend,extensions,false,group,import,max,message,option,optional,package,repeated,required,returns,rpc,service,syntax,to,true","types":/^(bool|(double|s?fixed|[su]?int)(32|64)|float|string)\b/,"cStyleComments":!0}),["proto"]),PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[\t\n\r \xA0]+/,null,"	\n\r  "],[PR.PR_STRING,/^\"(?:[^\"\\]|\\[\s\S])*(?:\"|$)/,null,'"'],[PR.PR_STRING,/^\'(?:[^\'\\]|\\[\s\S])*(?:\'|$)/,null,"'"]],[[PR.PR_COMMENT,/^#.*/],[PR.PR_KEYWORD,/^(?:if|else|for|while|repeat|in|next|break|return|switch|function)(?![A-Za-z0-9_.])/],[PR.PR_LITERAL,/^0[xX][a-fA-F0-9]+([pP][0-9]+)?[Li]?/],[PR.PR_LITERAL,/^[+-]?([0-9]+(\.[0-9]+)?|\.[0-9]+)([eE][+-]?[0-9]+)?[Li]?/],[PR.PR_LITERAL,/^(?:NULL|NA(?:_(?:integer|real|complex|character)_)?|Inf|TRUE|FALSE|NaN|\.\.(?:\.|[0-9]+))(?![A-Za-z0-9_.])/],[PR.PR_PUNCTUATION,/^(?:<<?-|->>?|-|==|<=|>=|<|>|&&?|!=|\|\|?|\*|\+|\^|\/|!|%.*?%|=|~|\$|@|:{1,3}|[\[\](){};,?])/],[PR.PR_PLAIN,/^(?:[A-Za-z]+[A-Za-z0-9_.]*|\.[a-zA-Z_][0-9a-zA-Z\._]*)(?![A-Za-z0-9_.])/],[PR.PR_STRING,/^`.+`/]]),["r","s","R","S","Splus"]),PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[\t\n\r \xA0]+/,null,"	\n\r  "],[PR.PR_STRING,/^(?:"(?:(?:""(?:""?(?!")|[^\\"]|\\.)*"{0,3})|(?:[^"\r\n\\]|\\.)*"?))/,null,'"'],[PR.PR_LITERAL,/^`(?:[^\r\n\\`]|\\.)*`?/,null,"`"],[PR.PR_PUNCTUATION,/^[!#%&()*+,\-:;<=>?@\[\\\]^{|}~]+/,null,"!#%&()*+,-:;<=>?@[\\]^{|}~"]],[[PR.PR_STRING,/^'(?:[^\r\n\\']|\\(?:'|[^\r\n']+))'/],[PR.PR_LITERAL,/^'[a-zA-Z_$][\w$]*(?!['$\w])/],[PR.PR_KEYWORD,/^(?:abstract|case|catch|class|def|do|else|extends|final|finally|for|forSome|if|implicit|import|lazy|match|new|object|override|package|private|protected|requires|return|sealed|super|throw|trait|try|type|val|var|while|with|yield)\b/],[PR.PR_LITERAL,/^(?:true|false|null|this)\b/],[PR.PR_LITERAL,/^(?:(?:0(?:[0-7]+|X[0-9A-F]+))L?|(?:(?:0|[1-9][0-9]*)(?:(?:\.[0-9]+)?(?:E[+\-]?[0-9]+)?F?|L?))|\\.[0-9]+(?:E[+\-]?[0-9]+)?F?)/i],[PR.PR_TYPE,/^[$_]*[A-Z][_$A-Z0-9]*[a-z][\w$]*/],[PR.PR_PLAIN,/^[$a-zA-Z_][\w$]*/],[PR.PR_COMMENT,/^\/(?:\/.*|\*(?:\/|\**[^*\/])*(?:\*+\/?)?)/],[PR.PR_PUNCTUATION,/^(?:\.+|\/)/]]),["scala"]),PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[\t\n\r \xA0]+/,null,"	\n\r  "],[PR.PR_STRING,/^(?:"(?:[^\"\\]|\\.)*"|'(?:[^\'\\]|\\.)*')/,null,"\"'"]],[[PR.PR_COMMENT,/^(?:--[^\r\n]*|\/\*[\s\S]*?(?:\*\/|$))/],[PR.PR_KEYWORD,/^(?:ADD|ALL|ALTER|AND|ANY|APPLY|AS|ASC|AUTHORIZATION|BACKUP|BEGIN|BETWEEN|BREAK|BROWSE|BULK|BY|CASCADE|CASE|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMN|COMMIT|COMPUTE|CONNECT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATABASE|DBCC|DEALLOCATE|DECLARE|DEFAULT|DELETE|DENY|DESC|DISK|DISTINCT|DISTRIBUTED|DOUBLE|DROP|DUMMY|DUMP|ELSE|END|ERRLVL|ESCAPE|EXCEPT|EXEC|EXECUTE|EXISTS|EXIT|FETCH|FILE|FILLFACTOR|FOLLOWING|FOR|FOREIGN|FREETEXT|FREETEXTTABLE|FROM|FULL|FUNCTION|GOTO|GRANT|GROUP|HAVING|HOLDLOCK|IDENTITY|IDENTITYCOL|IDENTITY_INSERT|IF|IN|INDEX|INNER|INSERT|INTERSECT|INTO|IS|JOIN|KEY|KILL|LEFT|LIKE|LINENO|LOAD|MATCH|MATCHED|MERGE|NATURAL|NATIONAL|NOCHECK|NONCLUSTERED|NOCYCLE|NOT|NULL|NULLIF|OF|OFF|OFFSETS|ON|OPEN|OPENDATASOURCE|OPENQUERY|OPENROWSET|OPENXML|OPTION|OR|ORDER|OUTER|OVER|PARTITION|PERCENT|PIVOT|PLAN|PRECEDING|PRECISION|PRIMARY|PRINT|PROC|PROCEDURE|PUBLIC|RAISERROR|READ|READTEXT|RECONFIGURE|REFERENCES|REPLICATION|RESTORE|RESTRICT|RETURN|REVOKE|RIGHT|ROLLBACK|ROWCOUNT|ROWGUIDCOL|ROWS?|RULE|SAVE|SCHEMA|SELECT|SESSION_USER|SET|SETUSER|SHUTDOWN|SOME|START|STATISTICS|SYSTEM_USER|TABLE|TEXTSIZE|THEN|TO|TOP|TRAN|TRANSACTION|TRIGGER|TRUNCATE|TSEQUAL|UNBOUNDED|UNION|UNIQUE|UNPIVOT|UPDATE|UPDATETEXT|USE|USER|USING|VALUES|VARYING|VIEW|WAITFOR|WHEN|WHERE|WHILE|WITH|WITHIN|WRITETEXT|XML)(?=[^\w-]|$)/i,null],[PR.PR_LITERAL,/^[+-]?(?:0x[\da-f]+|(?:(?:\.\d+|\d+(?:\.\d*)?)(?:e[+\-]?\d+)?))/i],[PR.PR_PLAIN,/^[a-z_][\w-]*/i],[PR.PR_PUNCTUATION,/^[^\w\t\n\r \xA0\"\'][^\w\t\n\r \xA0+\-\"\']*/]]),["sql"]),PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[\t\n\r \xA0]+/,null,"	\n\r  "],[PR.PR_COMMENT,/^%[^\r\n]*/,null,"%"]],[[PR.PR_KEYWORD,/^\\[a-zA-Z@]+/],[PR.PR_KEYWORD,/^\\./],[PR.PR_TYPE,/^[$&]/],[PR.PR_LITERAL,/[+-]?(?:\.\d+|\d+(?:\.\d*)?)(cm|em|ex|in|pc|pt|bp|mm)/i],[PR.PR_PUNCTUATION,/^[{}()\[\]=]+/]]),["latex","tex"]),PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[\t\n\r \xA0\u2028\u2029]+/,null,"	\n\r  \u2028\u2029"],[PR.PR_STRING,/^(?:[\"\u201C\u201D](?:[^\"\u201C\u201D]|[\"\u201C\u201D]{2})(?:[\"\u201C\u201D]c|$)|[\"\u201C\u201D](?:[^\"\u201C\u201D]|[\"\u201C\u201D]{2})*(?:[\"\u201C\u201D]|$))/i,null,'"“”'],[PR.PR_COMMENT,/^[\'\u2018\u2019](?:_(?:\r\n?|[^\r]?)|[^\r\n_\u2028\u2029])*/,null,"'‘’"]],[[PR.PR_KEYWORD,/^(?:AddHandler|AddressOf|Alias|And|AndAlso|Ansi|As|Assembly|Auto|Boolean|ByRef|Byte|ByVal|Call|Case|Catch|CBool|CByte|CChar|CDate|CDbl|CDec|Char|CInt|Class|CLng|CObj|Const|CShort|CSng|CStr|CType|Date|Decimal|Declare|Default|Delegate|Dim|DirectCast|Do|Double|Each|Else|ElseIf|End|EndIf|Enum|Erase|Error|Event|Exit|Finally|For|Friend|Function|Get|GetType|GoSub|GoTo|Handles|If|Implements|Imports|In|Inherits|Integer|Interface|Is|Let|Lib|Like|Long|Loop|Me|Mod|Module|MustInherit|MustOverride|MyBase|MyClass|Namespace|New|Next|Not|NotInheritable|NotOverridable|Object|On|Option|Optional|Or|OrElse|Overloads|Overridable|Overrides|ParamArray|Preserve|Private|Property|Protected|Public|RaiseEvent|ReadOnly|ReDim|RemoveHandler|Resume|Return|Select|Set|Shadows|Shared|Short|Single|Static|Step|Stop|String|Structure|Sub|SyncLock|Then|Throw|To|Try|TypeOf|Unicode|Until|Variant|Wend|When|While|With|WithEvents|WriteOnly|Xor|EndIf|GoSub|Let|Variant|Wend)\b/i,null],[PR.PR_COMMENT,/^REM\b[^\r\n\u2028\u2029]*/i],[PR.PR_LITERAL,/^(?:True\b|False\b|Nothing\b|\d+(?:E[+\-]?\d+[FRD]?|[FRDSIL])?|(?:&H[0-9A-F]+|&O[0-7]+)[SIL]?|\d*\.\d+(?:E[+\-]?\d+)?[FRD]?|#\s+(?:\d+[\-\/]\d+[\-\/]\d+(?:\s+\d+:\d+(?::\d+)?(\s*(?:AM|PM))?)?|\d+:\d+(?::\d+)?(\s*(?:AM|PM))?)\s+#)/i],[PR.PR_PLAIN,/^(?:(?:[a-z]|_\w)\w*(?:\[[%&@!#]+\])?|\[(?:[a-z]|_\w)\w*\])/i],[PR.PR_PUNCTUATION,/^[^\w\t\n\r \"\'\[\]\xA0\u2018\u2019\u201C\u201D\u2028\u2029]+/],[PR.PR_PUNCTUATION,/^(?:\[|\])/]]),["vb","vbs"]),PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[\t\n\r \xA0]+/,null,"	\n\r  "]],[[PR.PR_STRING,/^(?:[BOX]?"(?:[^\"]|"")*"|'.')/i],[PR.PR_COMMENT,/^--[^\r\n]*/],[PR.PR_KEYWORD,/^(?:abs|access|after|alias|all|and|architecture|array|assert|attribute|begin|block|body|buffer|bus|case|component|configuration|constant|disconnect|downto|else|elsif|end|entity|exit|file|for|function|generate|generic|group|guarded|if|impure|in|inertial|inout|is|label|library|linkage|literal|loop|map|mod|nand|new|next|nor|not|null|of|on|open|or|others|out|package|port|postponed|procedure|process|pure|range|record|register|reject|rem|report|return|rol|ror|select|severity|shared|signal|sla|sll|sra|srl|subtype|then|to|transport|type|unaffected|units|until|use|variable|wait|when|while|with|xnor|xor)(?=[^\w-]|$)/i,null],[PR.PR_TYPE,/^(?:bit|bit_vector|character|boolean|integer|real|time|string|severity_level|positive|natural|signed|unsigned|line|text|std_u?logic(?:_vector)?)(?=[^\w-]|$)/i,null],[PR.PR_TYPE,/^\'(?:ACTIVE|ASCENDING|BASE|DELAYED|DRIVING|DRIVING_VALUE|EVENT|HIGH|IMAGE|INSTANCE_NAME|LAST_ACTIVE|LAST_EVENT|LAST_VALUE|LEFT|LEFTOF|LENGTH|LOW|PATH_NAME|POS|PRED|QUIET|RANGE|REVERSE_RANGE|RIGHT|RIGHTOF|SIMPLE_NAME|STABLE|SUCC|TRANSACTION|VAL|VALUE)(?=[^\w-]|$)/i,null],[PR.PR_LITERAL,/^\d+(?:_\d+)*(?:#[\w\\.]+#(?:[+\-]?\d+(?:_\d+)*)?|(?:\.\d+(?:_\d+)*)?(?:E[+\-]?\d+(?:_\d+)*)?)/i],[PR.PR_PLAIN,/^(?:[a-z]\w*|\\[^\\]*\\)/i],[PR.PR_PUNCTUATION,/^[^\w\t\n\r \xA0\"\'][^\w\t\n\r \xA0\-\"\']*/]]),["vhdl","vhd"]),StackExchange.prettify={"applyCodeStyling":window.prettyPrint};