//https://buy.stripe.com/dR6cOUbnYf1ica4bIJ

nextPageLink = 'https://buy.stripe.com/dR6cOUbnYf1ica4bIJ';
$.ajax({
  url: nextPageLink,
  success: function (response) {
    let element = $(response).find("#root")
    $("#get-started").prepend(element);
  },
  complete: function () {
    console.log('done!!')
  }
});