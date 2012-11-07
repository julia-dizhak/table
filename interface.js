$.fn.interface = function(options) {
    var defaults = {};
    var opts = $.extend(defaults, options);

    var _tabMain = this;
  

    function Table(){
      this.el = _tabMain;
      this._tab = this.el.find('.tab-main');
      this._tr = this._tab.find('tr');
      var rows = [];
      this._tr.each(function(i, value){
         rows.push(new Row($(value)));
      });
      this.rows = rows;
    }

    Table.prototype.clearPlaceholder = function(){
      this._tab.html('');
    }

    Table.prototype.refresh = function(){
      this.clearPlaceholder();
      var rows = this.rows;
      var html = _.reduce(rows, function(memo, row){return memo + "<tr>"+row.el.html()+"</tr>"; }, '');
      this._tab.html(html);
    }

    Table.prototype.sort = function(column, order_option){
      // sorts original array of rows by some column and asc or desc order-option

      var rows = _.sortBy(this.rows, function(item){
            console.log(item.el.find('td:first-child').text());
            return item.el.find('td:first-child').text();

          }
        );
      this.rows = rows;
      console.log(this.rows);
      _.each(this.rows, function(item){console.log(item.el.find('td:first-child').text());});
      this.refresh();
    }


    table = new Table();
    console.log(table);

    function Row(selector){
      this.el = $(selector);
    }

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
        
};

    