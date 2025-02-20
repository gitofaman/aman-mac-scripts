$(document).ready(function () {
    var $loopDivs = $('.loop-div');
  
    function isHidden($el) {
      return $el.is(':hidden');
    }
  
    // Making sure loop div covers the whole width of the window
    $loopDivs.each(function () {
      var $loopParentDiv = $(this);
  
      if (!isHidden($loopParentDiv)) {
        var $loopDiv = $loopParentDiv.children().first();
        var loopDivWidth = $loopDiv.outerWidth();
        var loopDivCopyTimes = Math.round((window.innerWidth * 2) / loopDivWidth);
  
        for (var i = 0; i <= loopDivCopyTimes; i++) {
          var $copiedDiv = $loopDiv.clone(true);
          $loopParentDiv.append($copiedDiv);
        }
      }
    });
  
    $loopDivs.each(function () {
      var $loopParentDiv = $(this);
  
      if (!isHidden($loopParentDiv)) {
        var moveDistance = 0;
        var isPaused = false;
        var timeToMove1000px = parseInt($loopParentDiv.attr('move-1000-time')) || 2000;
        var timeToMove = Math.round(timeToMove1000px / 1000);
        var moveFrom = $loopParentDiv.attr('move-from') || 'right';
        var moveSum = '-';
  
        if (moveFrom === 'left') {
          $loopParentDiv.css('justify-content', 'flex-end');
          moveSum = '';
        } else {
          $loopParentDiv.css('justify-content', 'flex-start');
        }
  
        console.log(moveFrom);
  
        setInterval(function () {
          if (!isPaused) {
            $loopParentDiv.css('transform', `translateX(${moveSum}${moveDistance}px)`);
  
            var distanceBetween =
              $loopParentDiv.children().eq(1).offset().left -
              $loopParentDiv.children().eq(0).offset().left;
  
            moveDistance++;
            if (moveDistance >= distanceBetween * 2) {
              moveDistance = distanceBetween;
            }
          }
        }, timeToMove);
  
        if ($loopParentDiv.attr('on-hover') === 'pause') {
          $loopParentDiv.on('mouseover', function () {
            isPaused = true;
          });
  
          $loopParentDiv.on('mouseout', function () {
            isPaused = false;
          });
        }
      }
    });
  });
  