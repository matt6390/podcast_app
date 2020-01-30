User.create!([
  {f_n: "Anonymous", l_n: "Person", email: "no_reply@anonymous.com", password_digest: "$2a$12$z1Htz410DiT6ikDx3WDsoeifyS.BisB.erzaxFNCwdEhpWY7.zC.i"}
])
Admin.create!([
  {name: "Matthew Stone", email: "matthew@gmail.com", password_digest: "$2a$12$KmNRMHpVlgWjlUoVB1V6ou4ahYvepgG/AylPMl/Le0nP8CUEHys92"}
])
Podcast.create!([
  {name: "Vape Vid", url: "https://firebasestorage.googleapis.com/v0/b/rods-podcasts.appspot.com/o/podcasts%2FVaping.mp4?alt=media&token=8041c52b-217e-4403-ae42-807345885ba1", format: 'video'}
])
Comment.create!([
  {body: "This is a ocmment to show what an anonymous comment should look like", commentable_id: 1, commentable_type: "Podcast", user_id: 1},
  {body: "This is a second comment, that should be under the first, to test what a super duper long comment looks like. Mainly for CSS changes, formating, and just to piss off Areesh. Cause why not?", commentable_id: 1, commentable_type: "Podcast", user_id: 1}
])
