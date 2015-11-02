$(document).ready(function() {
  var streams = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","comster404","brunofin","thomasballinger","noobs2ninjas","medrybw","beohoff"]
  streams.forEach(function(stream) {
    var template = {};
    $.getJSON("https://api.twitch.tv/kraken/channels/" + stream + "?callback=?")
     .done(function(channel) {
      if (channel.error) {
        console.log("ERROR: " + channel + " " + channel.error);
      } else {
        template.channel = stream;
        template.name = channel.display_name;
        template.url = channel.url;
        if (!channel.logo) {
          template.avatar = "404user.png";
        } else {
          template.avatar = channel.logo;
        }
        $.getJSON( "https://api.twitch.tv/kraken/streams/" + stream + "?callback=?")
         .done(function(data) {
          if (!data.stream) {
            template.desc = "Offline";
          } else {
            template.desc = data.stream.channel.status;
          }
          $("#streams").loadTemplate($("template"), template);
        });
      }
    });
  });
});
