app.directive('googleVoice', function(SpeechFactory) {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'js/common/directives/google-voice/google-voice.html',
    link: function(scope, element, attrs) {

      var final_transcript;
      var recognizing = false;
      scope.icon = "fa-play-circle";
      scope.recordButtonMessage = "Start recording";

      if (!('webkitSpeechRecognition' in window)) {
        upgrade();
      } else {
        var recognition = new webkitSpeechRecognition();
        console.log('recognition: ', recognition);
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = function(event) {
          console.log('RECORDING STARTED');
          scope.icon = "fa-stop-circle";
          scope.recordButtonMessage = "Stop recording";
          scope.$digest();
          recognizing = true;
        }

        recognition.onresult = function(event) {
          var interim_transcript = '';

          for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              final_transcript += event.results[i][0].transcript;
            } else {
              interim_transcript += event.results[i][0].transcript;
            }
          }
        };
        recognition.onerror = function(event) {
          console.log('RECORDING ERROR');
        }

        recognition.onend = function() {
          console.log('RECORDING ENDED: ', final_transcript);
          SpeechFactory.setDreamText(final_transcript);
          scope.icon = "fa-play-circle";
          scope.recordButtonMessage = "Start recording";
          scope.$digest();
          recognizing = false;
        }
      }

      function startButton() {
        if (!recognizing) {
          final_transcript = '';
          recognition.lang = 'en-US';
          recognition.start();
        } else {
          recognition.stop();
        }
      }

      element.on('click', startButton);

    }
  }
})