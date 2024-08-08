from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import datetime


class User(AbstractUser):
    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
        }


class Post(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    text = models.CharField(max_length = 512)
    timestamp = models.DateTimeField(default = datetime.now, editable = False)

    def serialize(self):
        return {
            "id": self.id,
            "user": self.user.username,
            "timestamp": self.timestamp.strftime("%d %b %Y, %I:%M %p"),
            "text": self.text,
        }
    
    def __str__(self):
        return f"{self.id}. {self.user.username} posted '{self.text}' on {self.timestamp.strftime('%d %b %Y, %I:%M %p')}"
    

class Follower(models.Model):
    follower = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "followers")
    following = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "followings")
    timestamp = models.DateTimeField(default = datetime.now, editable = False)

    def serialize(self):
        return {
            "id": self.id,
            "follower": self.follower.username,
            "following": self.following.username,
            "timestamp": self.timestamp.strftime("%d %b %Y, %I:%M %p"),
        }
    
    def __str__(self):
        return f"{self.follower.username} follows {self.following.username} since {self.timestamp.strftime('%d %b %Y, %I:%M %p')}"
    

class Like(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "users_liked")
    post = models.ForeignKey(Post, on_delete = models.CASCADE, related_name = "liked_posts")
    timestamp = models.DateTimeField(default = datetime.now, editable = False)

    def serialize(self):
        return {
            "id": self.id,
            "user": self.user,
            "post": self.post,
            "timestamp": self.timestamp.strftime("%d %b %Y, %I:%M %p"),
        }
    
    def __str__(self):
        return f"{self.user.username} liked {self.post} on {self.timestamp.strftime('%d %b %Y, %I:%M %p')}"
    

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    post = models.ForeignKey(Post, on_delete = models.CASCADE)
    text = models.CharField(max_length = 512)
    timestamp = models.DateTimeField(default = datetime.now, editable = False)

    def serialize(self):
        return {
            "id": self.id,
            "user": self.user,
            "post": self.post,
            "text": self.text,
            "timestamp": self.timestamp.strftime("%d %b %Y, %I:%M %p"),
        }

    def __str__(self):
        return f"{self.user.username} replied '{self.text}' to '{self.post}' on {self.timestamp.strftime('%d %b %Y, %I:%M %p')}"