var app = {
    myform: $("#myform"),
    contact: $(".contact-btn"),
    aboutUsBtn: $(".aboutUs-btn"),
    testBtn: $(".test-btn"),
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

        this.aboutUsBtn.click(this.aboutUs.bind(this));
        this.testBtn.click(this.test.bind(this));

        this.contact.click(this.onContact.bind(this));
    },

    initMap: function() {
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

    aboutUs: function() {
        $.fn.fullpage.moveTo(2);
    },

    test: function() {
        $.fn.fullpage.moveTo(3);
    },

    onContact: function () {
        $.fn.fullpage.moveTo(4);
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
            this.myform.find("button").text("Küldés...");

            emailjs.send(service_id,template_id,params)
            .then(
                function(){
                    self.changeButtonText("Elküldve", true);
                },
                function(err) {
                    self.changeButtonText("Hiba történt.", true);
                }
            );
        } else {
            this.changeButtonText("Hibás adat.", true);

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
            setTimeout(this.changeButtonText.bind(this, "KÜLDÉS"), 3000);
    }
}

function initMap() {
    app.initMap();
}