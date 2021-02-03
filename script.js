//password module
//scoped, but you can still access the password in console if you know the variable name below
//So, for example, go to CodePen's console and type passwordModule.password
var passwordModule = {
  password: "qwerty",
  errorCount: 0,
  container: $(".content-box"),
  inputWrapper: $(".content"),
  inputBox: $(".ui-password-input"),
  submitButton: $(".ui-submit"),
  errorBox: $(".passwordError"),
  url_link: 'https://goopkitchen.olo.com/',
  lockedOutDiv: "<h2> Oops, password has been entered incorrectly too many times!" + 
  "<p>Please refresh the page and try again in 5 minutes.</p>",

  init: function() {   
    var self = this;
    
    //if they have been locked out, dont let them try again
    //idk for sure if this will work IRL, but it should
    if(this.getCookie("LockedOut") === "true") {
      this.container.html("").append(this.lockedOutDiv);
    }
    
    //submit click watcher
    this.submitButton.click(function() {
      self.passwordValidator(self.inputBox.val());
    });

    //input enter watcher
    this.inputBox.keypress(function(e) {
      if(e.which == 13) {
        self.passwordValidator(self.inputBox.val());
      }
    });
  },

  //password validator funciton
  passwordValidator: function(sentPassword) {
    if(sentPassword === this.password) {
      window.location.href = this.url_link;
    } else {
      this.errorHandler(sentPassword);
    }
  },

  //error handler function
  errorHandler: function(sentPassword) { 
    this.inputBox.val("");
    this.errorCount++;

    if(this.errorCount >= 5) {
      this.container.html("").append(this.lockedOutDiv);
      this.setCookie("lockedOut", "true");
      console.log(document.cookie);
      return;
    }

    if(sentPassword === "undefined" || sentPassword === "") {
      this.errorBox.text("Please enter a password").show();
    } else {
      this.errorBox.text("Incorrect password").show();
    } 
  },

  //setCookie, str8 from w3schools (ew, i know)
  setCookie: function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  },

  //getCookie, str8 from w3schools (ew, i know)
  getCookie: function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length,c.length);
      }
    }
    return "";
  }

};

//init on load
$(function() {
  passwordModule.init();
})