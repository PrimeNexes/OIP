
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
                // axios.post('http://192.168.31.99:8080/api/login', {
                //     name: this.name,
                //     phoneNumber: this.phoneNumber,
                //     password:this.password,
                    
                //   })
                //   .then(function (response) {
                //     if(response.data.errors){
                //         phonon.notif(response.data.errors, 3000, true);

                //     }
                //     else{
                //         console.log(response.data);
                        phonon.navigator().changePage('menupage');
                //     }
                //   })
                //   .catch(function (error) {
                //     phonon.notif(error.message, 3000, true);
                //   });
                
              }
            }
          });
    });

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

//Register Page
app.on({page: 'registerpage', preventClose: true, content: 'registerpage.html', readyDelay: 1},function(activity){

    activity.onCreate(function(){
        new Vue({
           el: '#register-form',
         
           // our data
           data: {
             name: '',
             phoneNumber: '',
             password:''
           },
         
           // our methods
           methods: {
             processForm: function() {
               axios.post('http://192.168.31.99:8080/api/register', {
                   name: this.name,
                   phoneNumber: this.phoneNumber,
                   password:this.password
                 })
                 .then(function (response) {
                   if(response.data.errors){
                       phonon.notif(response.data.errors, 3000, true);

                   }
                   else{
                       console.log(response.data);
                       phonon.navigator().changePage('menupage');
                   }
                 })
                 .catch(function (error) {
                    phonon.notif(error.message, 3000, true);
                  });
               
             }
           }
         });
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

        var formList=[];
        formList.push(new Form('Video Link','https://www.youtube.com/watch?v=Iy4G2_nTkRU'));
        axios.get('http://192.168.31.99:8080/api/getForms', {
            name: this.name,
            phoneNumber: this.phoneNumber,
            password:this.password,
          })
          .then(function (response) {
            if(response.data.errors){
                phonon.notif(response.data.errors, 3000, true);

            }
            else{
                response.data.data.forEach(element => {
                    formList.push(new Form(element.title,'#!fillformpage/'+element.title));
                });
                
                console.log();
            }
          })
          .catch(function (error) {
            console.log(error);
             phonon.notif(error.message, 3000, true);
           });

          new Vue(
            { el: '#form', 
                data: {
                search: '',
                formList : formList,
                    isSearch:false
                },
                methods: {
                    openwindow:function(link){
                        window.open(link , '_system');
                    },
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


});

//Music Page
app.on({page: 'musicpage', preventClose: true, content: 'musicpage.html', readyDelay: 1},function(activity){
    class Music {
        constructor(title,link) {
          this.title = title;
          this.link=link;
        }
      }
      
    activity.onCreate(function(){

        var musicList=[];
        axios.get('http://192.168.31.99:8080/api/getMusic', {
            name: this.name,
            phoneNumber: this.phoneNumber,
            password:this.password,
          })
          .then(function (response) {
            if(response.data.errors){
                phonon.notif(response.data.errors, 3000, true);

            }
            else{
                response.data.data.forEach(element => {
                    musicList.push(new Music(element.title,'#!playMusic/'+element.title));
                });
                
                console.log();
            }
          })
          .catch(function (error) {
            console.log(error);
             phonon.notif(error.message, 3000, true);
           });

          new Vue(
            { el: '#music', 
                data: {
                search: '',
                musicList : musicList,
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
                      return this.musicList.filter(music => {
                        return music.title.toLowerCase().includes(this.search.toLowerCase())
                      })
                    }
                  }
            });
            
    });
    activity.onClose(function(self) {
            self.close();
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
        var videoList=[];
        axios.get('http://192.168.31.99:8080/api/getMusic')
          .then(function (response) {
            if(response.data.errors){
                phonon.notif(response.data.errors, 3000, true);

            }
            else{
                response.data.data.forEach(element => {
                    musicList.push(new Video(element.title,element.link));
                });
                
                console.log();
            }
          })
          .catch(function (error) {
            console.log(error);
             phonon.notif(error.message, 3000, true);
           });
        new Vue(
            { el: '#video', 
                data: {
                search: '',
                formList : videoList,
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