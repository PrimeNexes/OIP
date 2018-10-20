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
            el: '#login-form',
          
            // our data
            data: {
              name: '',
              phoneNumber: '',
              password:''
            },
          
            // our methods
            methods: {
              processForm: function() {
                axios.post('http://localhost:8080/api/login', {
                    name: this.name,
                    phoneNumber: this.phoneNumber,
                    password:this.password
                  })
                  .then(function (response) {
                    if(response.data.errors){
                        console.log(response.data.message);
                    }
                    else{
                        phonon.navigator().changePage('menupage');
                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
                
              }
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

//Menu Page
app.on({page: 'menupage', preventClose: true, content: 'menupage.html', readyDelay: 1},function(activity){

    activity.onCreate(function(){
        
    });

    activity.onClose(function(self) {
        self.close();
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

//FillForm Page
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
app.on({page: 'bookpage', preventClose: true, content: 'bookpage.html', readyDelay: 1},function(activity){

    class Books {
        constructor(title,link) {
          this.title = title;
          this.link=link;
        }
      }

    activity.onCreate(function(){

        function myFunction() {
            // Declare variables
            var input, filter, ul, li, a, i;
            input = document.getElementById('myInput');
            filter = input.value.toUpperCase();
            ul = document.getElementById("myUL");
            li = ul.getElementsByTagName('li');
        
            // Loop through all list items, and hide those who don't match the search query
            for (i = 0; i < li.length; i++) {
                a = li[i].getElementsByTagName("a")[0];
                if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        }

        new Vue(
            { el: '#book', 
                data: {
                search: '',
                formList : [
                  new Books('Book 1','#'),
                  new Books('Book 2','#'),
                  new Books('Book 3','#'),
                  new Books('Book 4','#'),
                  new Books('Book 5','#'),
                  new Books('Book 6','#')

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

//Video Page
app.on({page: 'videopage', preventClose: true, content: 'videopage.html', readyDelay: 1},function(activity){
    class Video {
        constructor(title,link) {
          this.title = title;
          this.link=link;
        }
      }

    activity.onCreate(function(){

        function myFunction() {
            // Declare variables
            var input, filter, ul, li, a, i;
            input = document.getElementById('myInput');
            filter = input.value.toUpperCase();
            ul = document.getElementById("myUL");
            li = ul.getElementsByTagName('li');
        
            // Loop through all list items, and hide those who don't match the search query
            for (i = 0; i < li.length; i++) {
                a = li[i].getElementsByTagName("a")[0];
                if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        }

        new Vue(
            { el: '#video', 
                data: {
                search: '',
                formList : [
                    new Video('Videos','#'),
                    new Video('Videos','#'),
                    new Video('Videos','#'),
                    new Video('Videos','#'),
                    new Video('Videos','#'),
                    new Video('Videos','#')
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