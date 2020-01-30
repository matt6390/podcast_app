var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to RodCasts!",
      podcasts: [],
      errors:[]
    };
  },
  created: function() {
    // get the podcasts and urls from database
    axios.get("/podcasts").then(function(response) {
      response.data.forEach(function(podcast) {
        this.podcasts.push(podcast);
      }.bind(this));
    }.bind(this)).catch(function(error) {
      // pop errors if errors
      this.errors.push(error.response.data.errors);
      console.log(this.errors);
    }.bind(this)); 
  },
  methods: {},
  computed: {}
};

var PodcastShowPage = {
  template: "#podcasts-show-page",
  data: function() {
    return {
      message: "Loading Podcast...",
      id: this.$route.params.id,
      podcast: {},
      newComment: "",
      replyComment: "",
      errors:[]
    };
  },
  created: function() {
    axios.get("/podcasts/" + this.id).then(function(response) {
      this.podcast = response.data;
    }.bind(this)).catch(function(error) {
      this.errors = error.response.data.errors;
    }.bind(this));
  },
  methods: {
    createPodcastComments: function() {
      var params = {
        body: this.newComment,
        commentable_id: this.id,
        commentable_type: "Podcast"
      };
      axios.post("/comments", params).then(function(response) {
        if (this.podcast.podcast_comments) {
          this.podcast.podcast_comments.push(response.data);
        } else {
          location.reload();
        }
      }.bind(this)).catch(function(error) {
        console.log(error);
      }.bind(this));
    },
    createCommentComments: function(commentId) {
      var params = { body: this.replyComment, commentable_id: commentId, commentable_type: "Comment"};
      axios.post("/comments", params).then(function(response) {
        var reply = document.getElementById(commentId);
        var comment = document.getElementById(commentId + "comment");
        this.setDisplay(reply);
        this.setDisplay(comment);
        location.reload();
      }.bind(this)).catch(function(error) {
        console.log(error.response.data.errors);
      }.bind(this));
    },
    showReplies: function(commentId) {
      var reply = document.getElementById(commentId);
      this.setDisplay(reply);
      var viewReply = document.getElementById(commentId + 'view');
      this.setDisplay(viewReply);
      var seeded = document.getElementById(commentId + 'reply');
      this.setDisplay(seeded);


    },
    replyToComment: function(btnId) {
      var reply = document.getElementById(btnId);
      this.setDisplay(reply);
      var viewReply = document.getElementById(btnId + 'view');
      this.setDisplay(viewReply);
      var comment = document.getElementById(btnId + 'comment');
      this.setDisplay(comment);
    },
    setDisplay: function(div) {
      if (div.style.display === 'none') {
        div.style.display = "block";
      } else {
        div.style.display = "none";
      }
    }
  },
  computed: {}
};

var PodcastCreatePage = {
  template: "#podcasts-create-page",
  data: function() {
    return {
      message: "Welcome to Rod's Podcasts create!",
      errors: [],
      name: "",
      uploadProgress: null,
      video: null
    };
  },
  created: function() {
    axios.get("admins/current").then(function(response) {
    }.bind(this)).catch(function(errors) {
      router.push('/');
    }.bind(this));
  },
  methods: {
    createPodcast: function() {
      this.errors = [];
      this.uploadProgress = null;
      if (this.videoFile()) {
        var podcast = document.getElementById('videoFile').files[0];

        // if a video is uploaded, save as video file
        if (this.podcastFileType(podcast.type) === 'video') {
          var storage = firebase.storage().ref();
          var upload = storage.child("podcasts/" + podcast.name).put(podcast);

          // monitor upload progress
          upload.on('state_changed', function(snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploadProgress = progress.toFixed(2);
          }.bind(this), function(error) {
            // Upload unsuccessful
            this.errors = [error.message_];
          }.bind(this), function() {
            // upload completed
            upload.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              // create podcast ref in Rails database
              var podcastParams = {name: this.videoName(), url: downloadURL, format: "video"};
              axios.post("/podcasts", podcastParams).then(function(response) {
                router.push("/");
              }.bind(this)).catch(function(error) {
                this.errors.push(error.response.data.errors);
              }.bind(this));


            }.bind(this));
          }.bind(this));
        } else {
          // if an audio file is uploaded, save as an audio file
          if (this.podcastFileType(podcast.type) === 'audio') {
            var storage = firebase.storage().ref();
            var upload = storage.child("podcastsAudio/" + podcast.name).put(podcast);

            // monitor upload progress
            upload.on('state_changed', function(snapshot) {
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              this.uploadProgress = progress.toFixed(2);
            }.bind(this), function(error) {
              // Upload unsuccessful
              this.errors = [error.message_];
            }.bind(this), function() {
              // upload completed
              upload.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                // create podcast ref in Rails database
                var podcastParams = {name: this.videoName(), url: downloadURL, format: "audio"};
                axios.post("/podcasts", podcastParams).then(function(response) {
                  router.push("/");
                }.bind(this)).catch(function(error) {
                  this.errors.push(error.response.data.errors);
                }.bind(this));


              }.bind(this));
            }.bind(this));
          } else {
            // something that is not an audio or video file is selected
            this.errors.push("Please choose a video/audio file");
          }
        }
      } else {
        this.errors.push("Please choose a video/audio file");
      }
    },
    podcastFileType: function(file) {
      var regex = file;
      var patt = /audio/i;
      if (regex.match(/audio/i)) {
        return 'audio';
      } else {
        if (regex.match(/video/i)) {
          return 'video';
        } else  {
          return 'uh oh';
        }
      }
    },
    videoFile: function() {
      // determines if a file has been chosen to upload
      if (this.video === 1) {
        return true;
      } else {
        return false;
      }
    },
    videoName: function() {
      // decides name if none was entered
      if (this.name === "") {
        return document.getElementById('videoFile').files[0].name;
      } else {
        return this.name;
      }
    },
    fileChange: function() {
      this.video = 1;
    }
  },
  computed: {}
};

var AdminLoginPage = {
  template: "#admin-login-page",
  data: function() {
    return {
      email: this.$route.params.email,
      password: this.$route.params.password,
      errors: []
    };
  },
  created: function() {
    if (this.email && this.password) {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/admin_token", params)
        .then(function(response) {
          // set jwt for current_user on clients end
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);

          firebase.auth().signInWithEmailAndPassword(params.auth.email, params.auth.password).then(function(response) {
            // when logged into firebase, send to homepage
            router.push("/");

          }).catch(function(error) {
            // firebase login errors
            this.error = error.message;
          });
        })
        .catch(
          function(error) {
            router.push('/login');
          }.bind(this)
        );
    }
  },
  methods: {
    submit: function() {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/admin_token", params)
        .then(function(response) {
          // set jwt for current_user on clients end
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);

          firebase.auth().signInWithEmailAndPassword(params.auth.email, params.auth.password).then(function(response) {
            // when logged into firebase, send to homepage
            router.push("/");

          }).catch(function(error) {
            // firebase login errors
            this.error = error.message;
            console.log(error.code);
            console.log(error.message);
          });

        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    }
  }
};

var AdminSignupPage = {
  template: "#admin-signup-page",
  data: function() {
    return {
      id: this.$route.params.id,
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        id: this.id,
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      // create account on client
      axios
        .post("/admins", params)
        .then(function(response) {
          // when creation successful, create firebase account so only logged in can upload files
          firebase.auth().createUserWithEmailAndPassword(params.email, params.password).then(function(response) {
            // successful account creation
            router.push('/login/admin/' + params.email + "/" + params.password);

          }).catch(function(error) {
            // if didnt work?
            var errorCode = error.code;
            this.errors = error.message;
            console.log(error.message);
          });
        })
        .catch(
          // when initial client account is unsuccessful
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var LoginPage = {
  template: "#login-page",
  data: function() {
    return {
      email: this.$route.params.email,
      password: this.$route.params.password,
      errors: []
    };
  },
  created: function() {
    if (this.email && this.password) {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          // set jwt for current_user on clients end
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          router.push("/");
        })
        .catch(
          function(error) {
            router.push('/login');
          }.bind(this)
        );
    }
  },
  methods: {
    submit: function() {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          // set jwt for current_user on clients end
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    }
  }
};

var SignupPage = {
  template: "#signup-page",
  data: function() {
    return {
      f_n: "",
      l_n: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        f_n: this.f_n,
        l_n: this.l_n,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      // create account on client
      axios
        .post("/users", params)
        .then(function(response) {
          router.push('/login/' + params.email + "/" + params.password);
        })
        .catch(
          // when initial client account is unsuccessful
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var LogoutPage = {
  created: function() {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("jwt");
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      router.push("/");
    }).catch(function(error) {
      // An error happened.
    });
  }
}; 

var router = new VueRouter({
  routes: [
    { path: "/", component: HomePage },
    { path: "/podcasts/:id", component: PodcastShowPage },
    { path: "/create/podcasts", component: PodcastCreatePage },
    // singup pages
    {path: "/signup", component: SignupPage},
    {path: "/signup/admin/:id", component: AdminSignupPage},
    // logins for admins
    {path: "/login/admin", component: AdminLoginPage},
    {path: "/login/admin/:email/:password", component: AdminLoginPage},
    // logins for users
    {path: "/login", component: LoginPage},
    {path: "/login/:email/:password", component: LoginPage},

    {path: "/logout", component: LogoutPage}
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router,
  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
  }
});