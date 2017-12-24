var mails = [];
var readMails = [];
var openPrograms = [];
var settings = {
  background: 0,
  font: undefined,
  username: undefined,
  name: undefined,
  chatwith: undefined,
  music: undefined,
  website: undefined,
  wifi: 'OFF',
  notepad: undefined,
  priorWindow: undefined,
  chatcheck: false,
  progress:0
};
var permissions = {
  startMenu: true,
  userAccount: true,

}
var chats = {}
document.cookie = [];

$(document).ready(function() {
  openMainMenu()
})

function openMainMenu() {
  $("#container").hide();
  $("#container").fadeIn(2000);
  $("#container").removeAttr('style');
  $("#container").html(' ');
  mails = [];
  openPrograms = [];
  $("#container").append("<span style='position:absolute;Top:5vh;width:100%;text-align:center;color:white;font-size:15vw;'>[Undefined]</span>");
  $("#container").append("<span class='mainMenuSpan'><span onClick='reset();$(this).hide()' class='changeFont' id='newgame' style='font-family:tahoma;font-size:20'>New Game</span></span>");
  if (document.cookie != "") {
    $("#container").append("<span class='mainMenuSpan' style='Bottom:5vh'><span onClick='loadSave()' class='changeFont' style='font-size:20;font-family:tahoma'>Load Game</span></span>");
  }
}

function reset() {
  settings = {
    background: 0,
    music: 'Undercover.mp3',
    chatcheck: false
  };
  programs.forEach(function(e){
    eval("permissions."+e.replace(" ","_")+" = true");
  })
  permissions.sendChat = false;
  $("#container").fadeOut(3000);
  setTimeout(function(){
    createInterface()
  },4000);
}

function createInterface() {
  document.getElementById("music_menu").pause();
  $("#container").html(' ');
  changeBG(settings.background);
  $("#container").append("<div class='menubarbutton' onclick='$(\".menuWindow\").toggle();'><span class='changeFont' style='font-family:tahoma'>Start</span></div>");
  $("#container").append("<div class='menubar'></div>");
  $(".menubar").append("<span style='padding-right:0.5%;'><img id='internetIcon' src='img/ico_internet_OFF.png' height='24' alt='nointernet'></span>");
  $("#container").append("<div class='menuWindow' onmouseleave='$(\".menuWindow\").hide()' style='display:none'></div>");
  $(".menuWindow").append("<div class='menuvak'></div>");
  programs.forEach(function(name) {
    displayName = name;
    name = name.replace(" ", '_');
    $(".menuvak").append("<div class='menuitem' id='menuitem_" + name + "' onclick='openProgram(\"" + name + "\")'><img src='img/ico_" + name + ".png' alt='icon'><span class='menuItemtext'>" + displayName + "</span></div>");
  })
  changePermission(false,'Bootube');
  changePermission(false,'User_Account');
  $.each(permissions,function(e,f){changePermission(f,e)});
  $("#container").fadeIn(2000);
  openProgram("Music_Streamer");
  setMusic(settings.music);
  if(settings.progress==0 || settings.progress==undefined || settings.progress=='undefined'){
    setTimeout(function(){startGame()},60000);
  }
}

function save() {
  document.cookie = "mails=" + mails;
  document.cookie = "readmails=" + readMails;
  if ($(".notepad").length) {
    settings.notepad = $(".notepad").val().replace(/(?:\r\n|\r|\n)/g, '<br>');
  }
  document.cookie = "settings_notepad=" + settings.notepad;
  if ($(".messengerChat").length) {
    friends.forEach(function(e) {
      var friendChat = $("#friendChat_" + e).html();
      document.cookie = "chatLog_" + e + "=" + friendChat;
    })
  }
  $.each(settings, function(e, f) {
    document.cookie = "settings_" + e + "=" + f;
  })
  $.each(permissions, function(e, f) {
    document.cookie = "permissions_" + e + "=" + f;
  })
}

function loadSave() {
  var data = document.cookie.split("; ");
  data.forEach(function(e) {
    var i = e.indexOf('=');
    f = [e.slice(0, i), e.slice(i + 1)];
    if (f[0].includes('settings_')) {
      var g = f[0].replace('_', '.');
      eval(g + "='" + f[1] + "'");
    } else if (f[0].includes('permissions_')) {
      var g = f[0].replace('_', '.');
      eval(g + "='" + f[1] + "'");
    } else if (f[0].includes('chatLog_')) {
      g = f[0].split('_');
      eval("chats." + g[1] + "='" + f[1] + "'");
    } else if (f[0].includes('mails')) {
      var maillist = f[1].split(',');
      mails = maillist;
    } else if (f[0].includes('readMails')) {
      var maillist = f[1].split(',');
      readMails = maillist;
    }
  })
  $("#container").fadeOut(3000);
  setTimeout(function(){
    createInterface()
  },4000);
}

function openProgram(name) {
  displayName = name.replace("_", ' ');
  if (eval("permissions." + name) == true || eval("permissions." + name) == 'true') {
    if (openPrograms.indexOf(name) == -1) {
      openPrograms.push(name);
      var window = openWindow(name);
      var frame = window;
      window.append("<div id='" + name + "topbar' class='topbar'><img style='margin-left:3px' src='img/ico_" + name + ".png' width='16px' height='16px' alt='icon'><span style='padding-left:1%'> " + displayName + "</span><span class='windowControl'><img src='img/ico_close.png' onClick='closeWindow(\"" + name + "\")''></span></div>");
      window.append("<div id='frame" + name + "' class='window'></div>");
      window = $("#frame" + name);
      switch (name) {
        case 'Internet_Adventurer':
          window.append("<div class='internetAdventurerAdressbar'><select id='searchBar' disabled></select><img src='img/ico_GO.png' alt='GO' onClick='InternetAdventurerSearch()'></div>");
          frame.css("overflow-x", "hidden");
          window.append("<div class='internetPage'></div>");
          IASetAdressBar('http://www.boogle.com/search');
          setIAPage(0);
          break;
        case 'BF_Messenger':
          window.append("<div style='position:relative;height:80%;' id='messengerContent'><div class='messengerFriends'>Contacts:</div></div>");
          $("#messengerContent").append("<div class='messengerChat'>Chat with: <b><span id='chatterName'>" + settings.chatwith + "</span></b><br><hr><div id='chatArea'></div></div>");
          frame.css("overflow-x", "hidden");
          frame.css("height", '50vh');
          frame.css("resize", "vertical");
          friends.forEach(function(e) {
            $(".messengerFriends").append("<div class='friend' id='friend_" + e + "' onClick='messengerChatWith(\"" + e + "\")'>" + e + "</div>");
            $("#chatArea").append("<div class='friendChat' id='friendChat_" + e + "'></div>");
          });
          $.each(chats, function(e, f) {
            $("#friendChat_" + e).append(f);
          })
          online.forEach(function(e) {
            $("#friend_" + e).prepend('<img src="img/ico_onlineindicator_green.png" alt="online"> ');
          });
          offline.forEach(function(e) {
            $("#friend_" + e).prepend('<img src="img/ico_onlineindicator_red.png" alt="offline"> ');
          });
          /<br\s*[\/]?>/gi
          window.append('<div class="chatInput"><input type="text" id="chatInput"><input type="submit" onClick="sendMessage()" value="Send"></div>');
          messengerChatWith("Jack462");
          enterkeyhandle();
          break;
        case 'Coldmail':
          window.append("<div style='padding:5px;overflow-y:auto;overflow-x:auto;height:80%'>Hey there " + settings.name + "! Welcome to your mail.<br><table id='mailtable'></table></div>");
          $("#mailtable").append("<tr><td><input type='button' onClick='refreshMail()' value='Refresh e-mails'></td><td><input type='button' value='Write a new mail' disabled></td><td><input type='button' onclick='clearInbox()' value='Clear inbox'></td></tr>");
          $("#mailtable").append("<tr id='mailtablehead'><th>From:</th><th>Subject:</th><th>Date:</th></tr>");
          refreshMail();
          break;
        case 'Bootube':
          window.append("<span style='padding:2px;'>Something went wrong! Please try again later.</font>");
          frame.css("height", "initial").css("width", "initial");
          break;
        case 'Notepad':
          window.append("<textarea class='notepad' readonly></textarea>");
          frame.css("overflow", "hidden");
          if (settings.notepad != undefined) {
            settings.notepad = settings.notepad.replace(/<br>/g, "\r\n");
            $(".notepad").html(settings.notepad);
          }
          break;
        case 'Preferences':
          window.append("<b>Change your settings here:</b><br>");
          window.append("<table id='preferenceTable'></table>");
          $("#preferenceTable").append("<tr id='preferenceTableBGs'><td>Background:</td></tr>")
          frame.css("width", "initial");
          backgrounds.forEach(function(e) {
            $("#preferenceTableBGs").append("<td style='cursor:pointer' onClick='changeBG(\"" + e + "\")'><img src='img/bg_" + e + ".jpg' style='background-size:contain;' width='115px' height='80px'></td>");
          });
          $("#preferenceTable").append("<tr><td></td></tr>");
          $("#preferenceTable").append("<tr id='preferenceTableFonts'><td>Typeface:</td></tr>")
          fonts.forEach(function(e) {
            $("#preferenceTableFonts").append("<td class='changeFont' style='cursor:pointer;font-family:" + e + "' onClick='changeFont(\"" + e + "\")'>" + e + "</td>");
          });
          break;
        case 'Music_Streamer':
          window.append("<audio controls loop autoplay id='audio'></audio>")
          frame.css("height", "initial").css("width", "initial");
          document.getElementById("audio").volume = 0.2;
          setMusic(settings.music);
          break;
        case 'Music_Library':
          window.append("<table id='musiclibrary'></table>");
          $("#musiclibrary").append("<tr><th>Filename</th><th>File type</th></tr>");
          frame.css("height", "initial").css("width", "initial");
          musicLibrary.forEach(function(e) {
            f = e.replace("_", " ")
            f = f.split(".");
            $("#musiclibrary").append("<tr onclick='setMusic(\"" + e + "\")'><td class='musicLibraryFile'>" + f[0] + "</td><td>mp3</td></tr>");
          })
          break;
        case 'Save_Progress':
          frame.remove();
          var index = openPrograms.indexOf("Save_Progress");
          openPrograms.splice(index, 1);
          save();
          alert("Progress succesfully saved!");
          break;
        case 'Instant_Shutdown':
          openMainMenu();
          break;
        case 'User_Account':
          window.append("<table class='userAccountSettings'></table>");
          frame.css("height", "initial").css("width", "initial");
          $(".userAccountSettings").append("<tr><th colspan='2'>Current user account settings:</th></tr>");
          $(".userAccountSettings").append("<tr class='userAccountTr'><td>Account name:</td><td><input type='text' value='" + settings.username + "' id='UAS_username'></td></tr>");
          $(".userAccountSettings").append("<tr class='userAccountTr'><td>Name:</td><td><input type='text' value='" + settings.name + "' id='UAS_name'></td></tr>");
          $(".userAccountSettings").append("<tr class='userAccountTr'><th colspan='2'><input type='submit' onClick='changeUserSettings()' value='Submit changes'></th></tr>");
          break;
        case 'admincommands':
          window.append("Use F12 to get to the console, type:<br>- addMessage('person name','message')<br>- ColdMailadd(id) (the ID is a number of the pre-defined email)<br>- setNotepad('text') to edit the notepad<br>- changePermission(true/false,'name of the program with underscores instead of spaces') This one is to enable/disable programs");
          break
      }
    } else {
      $("#" + name).toggle();
    }
    priorWindow(name);
  } else {
    document.getElementById("FX_error").play();
  }
}

function changePermission(status,naam){
    eval("permissions."+naam+" = "+status);
    $("#"+naam).hide();
    if(status=='false' || status==false){
      $("#menuitem_"+naam).addClass("disabled");
    } else {
      $("#menuitem_"+naam).removeClass("disabled");
    }
}

function changeUserSettings() {
  settings.username = $("#UAS_username").val();
  settings.name = $("#UAS_name").val();
  $("#UAS_username").val(settings.username);
  $("#UAS_name").val(settings.name);
  $(".userAccountSettings").append("<tr id='UAsucces'><td colspan='2'>Success!</td></tr>");
  if(settings.progress==1){
    act2();
  }
  setTimeout(function() {
    $("#UAsucces").remove()
  }, 4000)
}

function setMusic(file) {
  if (!$("#audio").length) {
    openProgram("Music_Streamer");
  }
  var musicElement = $("#audio");
  $("#Music_Streamer").show();
  musicElement.html("<source src='music/" + file + "' type='audio/mp3'>");
  document.getElementById("audio").load();
  settings.music = file;
  $("#Music_Streamertopbar").html("<img style='margin-left:3px' src='img/ico_Music_Streamer.png' width='16px' height='16px' alt='icon'><span style='padding-left:1%'> Music Streamer - " + settings.music + "</span><span class='windowControl'><img src='img/ico_close.png' onClick='closeWindow(\"Music_Streamer\")''></span>");
}

function ColdMailadd(id) {
  mails.push(id);
  $("#menuitem_Coldmail").addClass("notification");
}

function refreshMail() {
  $(".emailintable").each(function() {
    $(".emailintable").remove()
  })
  $(".mailcontent").each(function() {
    $(".mailcontent").remove()
  })
  mails.forEach(function(id) {
    var email = eval("email_" + id);
    $("#mailtablehead").after("<tr class='emailintable' onclick='openMail(\"" + id + "\")' id='mail" + email.id + "'><td id='mailfrom" + email.id + "'>" + email.from + "</td><td id='mailsubject" + email.id + "'>" + email.subject + "</td><td id='maildate" + email.id + "'>" + email.date + "</td></tr>");
  })
  readMails.forEach(function(id) {
    $("#mail" + id).css("color", "gray");
  })
  $("#menuitem_Coldmail").removeClass("notification");
}

function clearInbox() {
  mails = [];
  refreshMail();
}

function openMail(id) {
  var mail = $("#mail" + id);
  mail.after("<tr class='mailcontent' id='mail_+" + id + "_content'><td class='mailcontent' colspan='3'>" + eval("email_" + id + ".content") + "</td></tr>")
  mail.removeAttr("onclick");
  readMails.push(id);
  $("#mail" + id).css("color", "gray");
}

function openWindow(name) {
  var randomx = Math.floor(Math.random() * 10) + 5;
  var randomy = Math.floor(Math.random() * 10) + 5;
  $("#container").append("<div id='" + name + "' class='frame' style='Top:" + randomy + "vh;Left:" + randomx + "vw' onmousedown='priorWindow(\"" + name + "\")'></div>");
  $(".frame").each(function() {
    $(".frame").draggable({
      containment: "parent",
      handle: ".topbar"
    });
  })
  return $('#' + name);
}

function closeWindow(name) {
  $("#" + name).hide();
  if (name == "Music_Streamer") {
    document.getElementById("audio").pause();
  }
}

function priorWindow(id) {
  $(".frame").each(function() {
    $(".frame").css("z-index", "1");
  })
  $("#" + id).css("z-index", 5);
  settings.priorWindow = id;
  $("#menuitem_" + id).removeClass("notification");
}

function changeBG(image) {
  $("#container").css("background-image", "url('img/bg_" + image + ".jpg')")
  settings.background = image;
}

function changeFont(e) {
  $("*:not(.changeFont)").css("font-family", e);
  settings.font = e;
}

function IASetAdressBar(value) {
  $("#searchBar").html("<option>" + value + "</option>");
  settings.website = value;
}

function setIAPage(id) {
  $(".internetPage").html("<img src='img/ico_loading.gif' width='10%' alt='loading'>");
  switch (id) {
    default: var page = "<b>No internet!</b><br><hr>There does not appear to be a connection to the internet!<br><Br>Possible causes:<br>- Your operating system doesn't support internet<br>- Your router isn't properly configured<br><br>You can reestablish your internet experience by fixing these issues";
    break;
  }
  setTimeout(function() {
    $(".internetPage").html(page)
  }, 2000);
}

function internetStatus(status) {
  $("#internetIcon").attr("src", "img/ico_internet_" + status + ".png");
  settings.wifi = status;
}

function InternetAdventurerSearch() {

}

function messengerChatWith(name) {
  $(".friendChat").each(function() {
    $(".friendChat").hide();
  })
  settings.chatwith = name;
  $("#friendChat_" + name).show();
  $("#chatterName").text(settings.chatwith);
  $("#friend_" + settings.chatwith).removeClass("notification");
}

function addMessage(name, message) {
  if (settings.chatcheck == false) {
    openProgram('BF_Messenger');
    settings.chatcheck = true;
  }
  $("#friendChat_" + name).append(name + ": " + message + "<br>");
  $("#menuitem_BF_Messenger").addClass("notification");
  $("#friend_" + name).addClass("notification");
}

function sendMessage() {
  if(permissions.sendChat){
    if ($('#chatInput').val() != '') {
      $("#friendChat_" + settings.chatwith).append("<span style='color:gray'>" + settings.name + ": " + $('#chatInput').val() + "</span><br>");
      $('#chatInput').val('');
      $("#friend_" + settings.chatwith).removeClass("notification");
    }
  } else {
    document.getElementById("FX_error").play();
  }
}

function fabMessage(to,message) {
  if ($('#chatInput').val() != '') {
    $("#friendChat_" + to).append(settings.name + ": " + $('#chatInput').val() + "<br>");
  }
}

function setNotepad(message) {
  $(".notepad").html(message);
  $("#menuitem_Notepad").addClass("notification");
  settings.notepad = message;
}

function enterkeyhandle() {
  $(document).keypress(function(e) {
    if (e.which == 13) {
      sendMessage();
    }
  });
}
