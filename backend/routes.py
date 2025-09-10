from flask import Blueprint, request, jsonify
from models import db, Task, Comment

task_bp = Blueprint("tasks", __name__)
comment_bp = Blueprint("comments", __name__)

@task_bp.route("/", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([{"id": t.id, "title": t.title} for t in tasks])

@task_bp.route("/", methods=["POST"])
def add_task():
    data = request.json
    task = Task(title=data["title"])
    db.session.add(task)
    db.session.commit()
    return jsonify({"id": task.id, "title": task.title})

@task_bp.route("/<int:id>", methods=["PUT"])
def update_task(id):
    task = Task.query.get_or_404(id)
    data = request.json
    task.title = data.get("title", task.title)
    db.session.commit()
    return jsonify({"id": task.id, "title": task.title})

@task_bp.route("/<int:id>", methods=["DELETE"])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted"})

@comment_bp.route("/<int:task_id>", methods=["GET"])
def get_comments(task_id):
    comments = Comment.query.filter_by(task_id=task_id).all()
    return jsonify([{"id": c.id, "content": c.content} for c in comments])

@comment_bp.route("/<int:task_id>", methods=["POST"])
def add_comment(task_id):
    data = request.json
    comment = Comment(content=data["content"], task_id=task_id)
    db.session.add(comment)
    db.session.commit()
    return jsonify({"id": comment.id, "content": comment.content})

@comment_bp.route("/<int:id>", methods=["PUT"])
def update_comment(id):
    comment = Comment.query.get_or_404(id)
    data = request.json
    comment.content = data.get("content", comment.content)
    db.session.commit()
    return jsonify({"id": comment.id, "content": comment.content})

@comment_bp.route("/<int:id>", methods=["DELETE"])
def delete_comment(id):
    comment = Comment.query.get_or_404(id)
    db.session.delete(comment)
    db.session.commit()
    return jsonify({"message": "Comment deleted"})
