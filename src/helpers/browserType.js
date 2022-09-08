// Firefox 1.0+
export const isFirefox = typeof InstallTrigger !== "undefined";

// Safari 3.0+ "[object HTMLElementConstructor]"
export const isSafari = /^((?!chrome|android).)*safari/i.test(
  navigator.userAgent
);

console.log({ isSafari });

// Internet Explorer 6-11
export const isIE = /*@cc_on!@*/ false || !!document.documentMode;

// Edge 20+
export const isEdge = !isIE && !!window.StyleMedia;

// Chrome 1 - 71
export const isChrome =
  !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
