phonon.options({
    navigator: {
        defaultPage: 'home',
        animatePages: true,
        enableBrowserBackButton: true,
        templateRootDirectory: './pages'
    },
    i18n: null // for this example, we do not use internationalization
});


var app = phonon.navigator();

/**
 * The activity scope is not mandatory.
 * For the home page, we do not need to perform actions during
 * page events such as onCreate, onReady, etc
*/

// Page one Fucntions

app.on({page: 'home', preventClose: false, content: null},function(activity){

    activity.onCreate(function(){
        new Vue({
            el: '#appTitle',
            data: {
              message: 'Hello Vue.js!'
            },  
        });
        new Vue({
            el: '#appPageTitle',
            data: {
              message: 'It is Vue ' + new Date().toLocaleString()
            }
        });
    })

});

/**
 * However, on the second page, we want to define the activity scope.
 * [1] On the create callback, we add tap events on buttons. The OnCreate callback is called once.
 * [2] If the user does not tap on buttons, we cancel the page transition. preventClose => true
 * [3] The OnReady callback is called every time the user comes on this page,
 * here we did not implement it, but if you do, you can use readyDelay to add a small delay
 * between the OnCreate and the OnReady callbacks
*/

//Page 2 Functions
app.on({page: 'pagetwo', preventClose: true, content: 'pagetwo.html', readyDelay: 1}, function(activity) {

    var action = null;

    var onAction = function(evt) {
        var target = evt.target;
        action = 'ok';

        if(target.getAttribute('data-order') === 'order') {
            phonon.alert('Thank you for your order!', 'Dear customer');

        } else {
            phonon.alert('Your order has been canceled.', 'Dear customer');
        }
    };

    activity.onCreate(function() {
        document.querySelector('.order').on('tap', onAction);
        document.querySelector('.cancel').on('tap', onAction);
    });

    activity.onClose(function(self) {
        if(action !== null) {
            self.close();
        } else {
            phonon.alert('Before leaving this page, you must perform an action.', 'Action required');
        }
    });

    activity.onHidden(function() {
        action = null;
    });

    activity.onHashChanged(function(pizza) {
        document.querySelector('.pizza').textContent = pizza;
    });
});
//Form Page
app.on({page: 'formpage', preventClose: true, content: 'formpage.html', readyDelay: 1},function(activity){

    class Form {
        constructor(title,link) {
          this.title = title;
          this.link=link;
        }
      }
      
    activity.onCreate(function(){
          new Vue(
            { el: '#form', 
                data: {
                search: '',
                formList : [
                  new Form('Form 1','#!fillformpage/Form1'),
                  new Form('Form 2','#!fillformpage/Form2'),
                  new Form('Form 3','#!fillformpage/Form3'),
                  new Form('Form 4','#!fillformpage/Form4'),
                  new Form('Form 5','#!fillformpage/Form5'),
                  new Form('Form 6','#!fillformpage/Form6'),
                  new Form('Form 7','#!fillformpage/Form7')
                ],
                    isSearch:false
                },
                methods: {
                    swaptoSearch: function(swap)
                    {
                    this.isSearch = swap;
                    }
                },
                computed: {
                    filteredList() {
                      return this.formList.filter(form => {
                        return form.title.toLowerCase().includes(this.search.toLowerCase())
                      })
                    }
                  }
            });
            
    });
    activity.onClose(function(self) {
            self.close();
    });

});

app.on({page: 'fillformpage', preventClose: true, content: 'fillformpage.html', readyDelay: 1},function(activity){

    activity.onCreate(function(){
    });
    activity.onClose(function(self) {
        self.close();
    });
    activity.onHashChanged(function(data) {
        phonon.forms.update(document.querySelector('#input-1'))=data;
    });

});

//Music Page
app.on({page: 'musicpage', preventClose: true, content: 'musicpage.html', readyDelay: 1},function(activity){

    activity.onCreate(function(){
        
    });

    activity.onClose(function(self) {
        self.close();
    });

});

//Ebook Page
app.on({page: 'ebookpage', preventClose: true, content: 'ebookpage.html', readyDelay: 1},function(activity){

    activity.onCreate(function(){
        new Vue(
            { el: '#ebook', 
                data: {
                search: '',
                formList : [
                //   new Form('Form 1','#!fillformpage/Form1'),
                //   new Form('Form 2','#!fillformpage/Form2'),
                //   new Form('Form 3','#!fillformpage/Form3'),
                //   new Form('Form 4','#!fillformpage/Form4'),
                //   new Form('Form 5','#!fillformpage/Form5'),
                //   new Form('Form 6','#!fillformpage/Form6'),
                //   new Form('Form 7','#!fillformpage/Form7')
                ],
                    isSearch:false
                },
                methods: {
                    swaptoSearch: function(swap)
                    {
                    this.isSearch = swap;
                    }
                },
                computed: {
                    filteredList() {
                      return this.formList.filter(form => {
                        return form.title.toLowerCase().includes(this.search.toLowerCase())
                      })
                    }
                  }
            });
    });

    activity.onClose(function(self) {
        self.close();
    });

});
// Let's go!
app.start();