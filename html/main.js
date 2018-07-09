(function (w, d) {
  const conn = initConnObject();

  const result = {
    el:    null,
    value: null,
  };

  function initConnObject() {
    return {
      instance:  null,
      subUrl:    '',
      timeoutId: null,
      tryCount:  5,
    };
  }

  function onMessage(message) {
    console.log('onMessage', message);
    clearTimeout(conn.timeoutId);
    conn.tryCount = 5;
    try {
      console.log('onMessage:data', JSON.parse(message.data));
      result.value = JSON.parse(message.data);
    } catch (e) {
      if (!message.lastEventId.length) {
        const msgArr = message.data.split('\n');
        console.log('onMessage:catch:msgArr', msgArr);
        message.lastEventId = msgArr[0];
        result.value = JSON.parse(msgArr[1]);
        console.log('onMessage:catch:data:string', msgArr[1]);
        console.log('onMessage:catch:data:object', result.value);
      }
    }
    result.el.innerHTML = JSON.stringify(result.value, null, 2);
    console.log('onMessage:result', result);
  }

  function onError(error) {
    console.error('onError', error);
    conn.instance.close();
    conn.timeoutId = setTimeout(function () {
      --conn.tryCount;
      if (conn.tryCount >= 0) {
        subscription(conn.subUrl);
      } else {
        clearTimeout(conn.timeoutId);
      }
    }, 5000);
  }

  function subscription(sub) {
    if (sub) {
      var source = new EventSource(
        sub + '?date=' + new Date().valueOf(),
        {
          withCredentials: false
        }
      );
      source.withCredentials = true;
      source.onmessage = onMessage;
      source.onerror = onError;
      conn.instance = source;
      conn.subUrl = sub;
      console.log('source', source);
    } else {
      console.error('Invalid input data', {sub: sub});
    }
  }

  function initPage() {

    function makeSubscription(evt) {
      var subInput = d.querySelector('#sub');
      var sub = subInput.value;
      console.log({
        evt: evt,
        sub: subInput.value
      });

      subscription(sub);
    }

    function submitCb(evt) {
      return makeSubscription(evt);
    }

    function retryCb() {
      conn.tryCount = 5;
      clearTimeout(conn.timeoutId);
      conn.timeoutId = null;
      return function (evt) {
        return makeSubscription(evt);
      };
    }

    function closeCb(evt) {
      conn.tryCount = 5;
      clearTimeout(conn.timeoutId);
      conn.timeoutId = null;
      if (conn.instance) {
        conn.instance.close();
        conn.instance = null;
        result.el.innerHTML = 'Closed connection';
      }
    }

    function initSubmitButton() {
      var submitButton = d.querySelector('#submit');
      submitButton.addEventListener('click', submitCb, false);
    }

    function initRetryButton() {
      var retryButton = d.querySelector('#retry');
      retryButton.addEventListener('click', retryCb(), false);
    }

    function initCloseButton() {
      var closeButton = d.querySelector('#close');
      closeButton.addEventListener('click', closeCb, false);
    }

    function initForm() {
      initSubmitButton();
      initRetryButton();
      initCloseButton();
    }

    result.el = d.querySelector('#message');
    initForm();
  }

  d.addEventListener('DOMContentLoaded', function (event) {
    //do work
    initPage();
  });

}(window, document));