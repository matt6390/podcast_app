User.create!([
  {f_n: "Anonymous", l_n: "Person", email: "no_reply@anonymous.com", password_digest: "$2a$12$z1Htz410DiT6ikDx3WDsoeifyS.BisB.erzaxFNCwdEhpWY7.zC.i"}
])
Podcast.create!([
  {name: "Vape Vid", url: "https://firebasestorage.googleapis.com/v0/b/rods-podcasts.appspot.com/o/podcasts%2FVaping.mp4?alt=media&token=8041c52b-217e-4403-ae42-807345885ba1"}
])
Comment.create!([
  {body: "dfasdfasdf", commentable_id: 1, commentable_type: "Podcast", user_id: 1},
  {body: "asfasdf", commentable_id: 1, commentable_type: "Podcast", user_id: 1}
])
