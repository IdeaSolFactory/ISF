var app = {
    myform: $("#myform"),
    contact: $(".contact-btn"),

    init: function() {
        $(document).ready(function() {
            $('#fullpage').fullpage({
                sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE'],
                css3: true
            });
        });

        emailjs.init("user_jRfXICwtPI5cpqnRTrj5A");
        this.myform.submit(this.sendMail.bind(this));

        this.contact.click(this.onContact.bind(this));
    },

    sendMail: function (event) {
        var self = this;
        event.preventDefault();

        var params = this.myform.serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});

        // Change to your service ID, or keep using the default service
        var service_id = "default_service";
        var template_id = "contact";

        this.myform.find("button").text("Sending...");

        emailjs.send(service_id,template_id,params)
        .then(
            function(){
                self.myform.find("button").text("Send");
            },
            function(err) {
                self.myform.find("button").text("Error try later ...");
            }
        );
        return false;
    },

    onContact: function () {
        $.fn.fullpage.moveSectionDown();
    }
}