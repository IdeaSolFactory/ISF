var app = {
    myform: $("#myform"),
    contact: $(".contact-btn"),
    next: $(".next-btn"),
    prev: $(".prev-btn"),
    emailRegx: new RegExp('.+@.+\..+'),
    map: "",
    marker: "",

    init: function() {
        $(document).ready(function() {
            $('#fullpage').fullpage({
                css3: true,
                afterResize: function(){window.scrollTo(0,0);}
            });
        });

        emailjs.init("user_jRfXICwtPI5cpqnRTrj5A");
        this.myform.submit(this.sendMail.bind(this));

        this.next.click(this.nextPage.bind(this));
        this.prev.click(this.prevPage.bind(this));

        this.contact.click(this.onContact.bind(this));        
    },

    initMap() {
        var self = this;
        
        self.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 47.5361321, lng: 19.0408205},
          zoom: 17
        });
        
        self.marker = new google.maps.Marker({
            position: {lat: 47.5361321, lng: 19.0408205},
            map: self.map
        })
    },

    nextPage: function() {
      $.fn.fullpage.moveSectionDown();
    },

    prevPage: function() {
      $.fn.fullpage.moveSectionUp();
    },

    onContact: function () {
        $.fn.fullpage.moveTo(5);
    },

    sendMail: function (event) {
        event.preventDefault();

        var self = this;
        var isValidMail = 0;
        var validMail = 3;
        var service_id = "default_service_";
        var template_id = "contact";

        var params = this.myform.serializeArray().reduce(function(obj, item) {
            isValidMail += self.validateMailProp(item.name, item.value);
            obj[item.name] = item.value;
            return obj;
        }, {});

        if(isValidMail===validMail) {
            this.myform.find("button").text("Sending...");

            emailjs.send(service_id,template_id,params)
            .then(
                function(){
                    self.changeButtonText("Sent", true);
                },
                function(err) {
                    self.changeButtonText("Error try later ...", true);
                }
            );
        } else {
            this.changeButtonText("Not valid please correct ...", true);

        }

        return false;
    },

    validateMailProp: function (name, value) {
        var isValid = 0;
        switch(name) {
            case "from_email":
                isValid = this.emailRegx.test(value)|0;
            break;
            case "from_name":
                isValid = (value.length > 3)|0;
            break;
            case "message_html":
                isValid = (value.length > 3)|0;
            break;
        }
        return isValid;
    },

    changeButtonText: function(text, setDefaultLater) {
        this.myform.find("button").text(text);
        if(setDefaultLater)
            setTimeout(this.changeButtonText.bind(this, "SEND MESSAGE"), 3000);
    }
}

function initMap() {
    app.initMap();
}