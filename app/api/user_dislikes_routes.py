from flask import Blueprint
from app.models import db, UserDislikes, UserLikes, Post
from sqlalchemy.exc import IntegrityError

user_dislikes_routes = Blueprint('user_dislikes', __name__)


@user_dislikes_routes.route("/<int:userId>/post/<int:postId>", methods=["GET"])
def user_dislikes(userId, postId):
    user_dislike = UserDislikes.query.filter(UserDislikes.post_id == postId).filter(UserDislikes.user_id == userId).first()
    if(user_dislike):
        return {'likes': True}
    else:
        return {'likes': False}


# This route create a connection between a user and a post when downvoting a post.
@user_dislikes_routes.route("/<int:userId>/post/<int:postId>", methods=["POST"])
def create_user_dislike(userId, postId):
    post = Post.query.get(postId)
    user_like = UserLikes.query.filter(UserLikes.post_id == postId).filter(UserLikes.user_id == userId).first()
    if user_like:
        post.karma -= 2
        db.session.delete(user_like)
        # db.session.commit()

        user_dislike = UserDislikes(
            user_id=userId,
            post_id=postId,
        )
        db.session.add(user_dislike)
        db.session.commit()
        return {'success': True}
    else:
        post.karma -= 1
        user_dislike = UserDislikes(
            user_id=userId,
            post_id=postId,
        )
        db.session.add(user_dislike)
        db.session.commit()
        return {'success': True}


# This route will remove the connection between a user and a dislike from a post
@user_dislikes_routes.route("/<int:userId>/post/<int:postId>", methods=["DELETE"])
def delete_user_dislike(userId, postId):
    post = Post.query.get(postId)
    user_dislike = UserDislikes.query.filter(UserDislikes.post_id == postId).filter(UserDislikes.user_id == userId).first()
    if user_dislike:
        post.karma += 1
        db.session.delete(user_dislike)
        db.session.commit()
        return {'success': True}
    else:
        post.karma += 1
        return{'success': False}
