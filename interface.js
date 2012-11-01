$.fn.interface = function(options) {
    var defaults = {};
    var opts = $.extend(defaults, options);

    var _tabMain = this;
  
    //
    _tabMain.each( function(i,value) {

        function Tab() {
            _tabItem = $(value);
            _tab = _tabItem.find('.tab-main');
            _tr = _tab.find('tr');
            _tabNames = _tab.find('.name');
                   
        };

        Tab.prototype.initialize = function() {  
            this.sortNames(); 
            this.editCustomer();
            this.showPopup();
            this.hoverTr();
        };

        Tab.prototype.sortNames = function() {      
            
            _tr.each(function() {
               var name = $(this).children('td.name').text();
               $(this).attr('data-name', name);   
            });
            
            var names = [];

            _tabNames.each(function() {
                names.push([$(this).text()]);
            });


            names.sort(function() {
               $(this).sort();
            });

            //console.log(names.sort());

            for ( var i = 0; i < names.length; i++) {
               //$("#tab").appendChild(names[i]);
            }           
        };

        Tab.prototype.editCustomer = function() {
            _tr.each(function() {
               var name = $(this).find('td.name').text();
               var edit = $(this).find('td').find('.popup').find('.edit');
               
               var nameEdit = edit.find('input#name-company').val(name);

               nameEdit.val(name);

               //console.log(name);
               //console.log(nameEdit);
            });
        };
        
        Tab.prototype.showPopup = function() {
            
            $('.popup').hide();  

             $('.edit-icon').live('click', function() {
                $(this).closest('span').next('.popup').show();    
            });  

            $.fn.hidePopup = function() {
              var self = $(this);
              
              self.live('click', function(){
                  $('.popup').hide();  
              });

              // clicking on the outside of the block
              /*$('body').click(function(event) {
                if (!($(self).offset().left <= event.pageX &&
                event.pageX <= $(self).offset().left + $(self).width() &&
                $(self).offset().top <= event.pageY &&
                event.pageY <= $(self).offset().top + $(self).height()
                ))
                $('.popup').hide();

              });*/
              
              $('.popup .overlay').live('click', function(){
                  $('.popup').hide();  
              });

              $(window).keyup(function(event) {
                if (event.which == 27) {
                    $('.popup').hide(); 
                    return false;
                }
              });

            };

            $('#edit-close').hidePopup();
        };

        Tab.prototype.hoverTr = function(){
           _tr.each(function() {
               var icon = $(this).find('td').find('.edit-icon');

               $(this).hover(
                    function () { icon.show(); },
                    function () { icon.hide(); }
                );           
            }); 
        };

        var tab_interface = new Tab();
        tab_interface.initialize();

    });
        
};

    