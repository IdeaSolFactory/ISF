var app = {
    myform: $("#myform"),
    contact: $(".contact-btn"),
    next: $(".next-btn"),
    prev: $(".prev-btn"),
    emailRegx: new RegExp('.+@.+\..+'),

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

    nextPage: function() {
      $.fn.fullpage.moveSectionDown();
    },

    prevPage: function() {
      $.fn.fullpage.moveSectionUp();
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

    onContact: function () {
        $.fn.fullpage.moveTo(4);
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
