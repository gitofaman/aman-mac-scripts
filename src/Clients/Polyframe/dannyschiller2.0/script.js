//music-block
//https://foundation-media.ffm.to/hastaladorada

nextPageLink = 'https://foundation-media.ffm.to/hastaladorada';
$.ajax({
  url: nextPageLink,
  success: function (response) {
    let element = $(response).find(".player-container.box-shadow")
    $(".music-block").prepend(element);
  },
  complete: function () {
    console.log('done!!')
  }
});