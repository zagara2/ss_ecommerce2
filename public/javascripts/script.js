$('.userLoginForm').on('submit', function(event) {
  event.preventDefault();
  var userId = $('#userId').val();
  localStorage.setItem('userId', userId);
})
// $(".trade-btn").click(function(event) {
  // console.log(event.target)
  // var dataObject = {
  //   UserId: localStorage.getItem('userId'),
  //   ItemId: $(event.target).data("id")
  // }
  // $.ajax({
  //   url: "/trade",
  //   type: "PUT",
  //   data: JSON.stringify(dataObject),
  //   contentType: "application/json" 
  // });
// });

$('.trade-form').submit(function(event) {
  event.preventDefault();
  var userItemId = $("input:radio[name='userItems']:checked").val();
  var tradeItemId = $("input:radio[name='tradeItems']:checked").val();
  var userId = localStorage.getItem('userId');
  // console.log(userItemId)
  var dataObject = {
    UserId: userId,
    UserItemId: userItemId,
    TradeItemId: tradeItemId
  }
  $.ajax({
    url: "/trade",
    type: "PUT",
    data: JSON.stringify(dataObject),
    contentType: "application/json" 
  });
})