let CrossDomain = (function() {
  let _iframe = null;

  function send(target, msg) {
    _iframe = document.createElement('iframe');
    _iframe.src = target;
    _iframe.style = 'display: none;';

    const BODY = document.getElementsByTagName('body')[0];
    BODY.appendChild(_iframe);
    _iframe.onload = () => {
      _iframe.contentWindow.postMessage(msg, target);
      window.location.href = target;
    };
  }

  function destroy() {
    const BODY = document.getElementsByTagName('body')[0];
    BODY.removeChild(_iframe);
    _iframe = null;
  }

  return {
    send,
    destroy
  };
})();

export default CrossDomain;
