from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("profile/<str:username>", views.profile, name="profile"),
    path("following", views.following, name="following"),
    
    path("isfollowing/<str:username>", views.isfollowing, name="isfollowing"),
    path("countfollowing/<str:username>", views.count_following, name="count_following"),
    path("countfollowers/<str:username>", views.count_followers, name="count_followers"),
    path("follow/<str:username>", views.follow, name="follow"), # POST
    path("unfollow/<str:username>", views.unfollow, name="unfollow"), # POST

    path("countlikes/<int:post_id>", views.count_likes, name="count_likes"),
    path("isliked/<int:post_id>", views.isliked, name="isliked"),
    path("like/<int:post_id>", views.like, name="like"), # POST
    path("unlike/<int:post_id>", views.unlike, name="unlike"), # POST

    path("iscreator/<int:post_id>", views.iscreator, name="iscreator"),
    path("posts", views.posts, name="posts"),
    path("posts/following", views.posts_following, name="posts_following"),
    path("countposts", views.count_posts, name="count_posts"),
    path("countposts/following", views.count_posts_following, name="count_posts_following"),
    path("newpost", views.new_post, name="new_post"), # POST
    path("postedit/<int:post_id>", views.post_edit, name="post_edit"), # POST
]