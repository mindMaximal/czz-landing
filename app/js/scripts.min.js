document.addEventListener("DOMContentLoaded", ready());


function ready() {

    var popup = (function (selector) {
        return function (selector) {
            var _trigers = document.querySelectorAll(selector);
    
            function popupOpen(elem) {
                var _modal = document.querySelector(elem);
    
                if (_modal.querySelector('.popup__close') != null) {
                    _modal.querySelector('.popup__close').addEventListener('click', function () {
                        popupClose(elem);
                    });
                }
    
                _modal.addEventListener('click', function (e) {
                    if (e.target.classList.contains('popup')) {
                        popupClose(elem);                 
                    }                
                });
    
                _modal.classList.add('popup--open');
    
                return true;
            }
    
            function popupClose (elem) {
                var _modal = document.querySelector(elem);
    
                _modal.classList.remove('popup--open');   
    
                return true;
            }
    
            for (var i = 0; i < _trigers.length; i++) {
               _trigers[i].addEventListener('click', function (e) {
                   e.preventDefault();
                   var id = this.getAttribute('href');             
                   
                   popupOpen(id);                
               });
            }
    
            return {
                open(id) {
                    popupOpen(id);
                },
                close(id) {
                    popupClose(id);
                }
            }
        }
    }());
    
    //Forms
    function submitHandler(e){    
        e.preventDefault();
        var self = this;
        fetch("mail.php", {
            method: "POST",
            body: new FormData(self)
        }).then(function() {
            if (document.querySelector('.popup--open') != null) {
                var id ='#' + document.querySelector('.popup--open').getAttribute('id');       
                popupContacts.close(id);
            }   
            popupContacts.open("#popup-success-massage");
            self.reset();
        })
        .catch(function(error) { console.log(error); });
    } 

    document.querySelectorAll('.form').forEach(function(element) {
        element.addEventListener('submit', submitHandler);
    });

    //Popups
    if (document.querySelector('.popup-trigger') != null) {
        popupContacts = popup('.popup-trigger');        
    }

}

var popupContacts;