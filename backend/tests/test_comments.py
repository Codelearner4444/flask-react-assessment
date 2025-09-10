import pytest
from app import app, db, Task, Comment

@pytest.fixture
def client():
    app.config["TESTING"] = True
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
    with app.app_context():
        db.create_all()
        task = Task(title="Test Task")
        db.session.add(task)
        db.session.commit()
    with app.test_client() as client:
        yield client

def test_add_comment(client):
    response = client.post("/api/comments/1", json={"content": "First Comment"})
    assert response.status_code == 200
    assert response.get_json()["content"] == "First Comment"

def test_update_comment(client):
    client.post("/api/comments/1", json={"content": "First Comment"})
    response = client.put("/api/comments/1", json={"content": "Updated Comment"})
    assert response.get_json()["content"] == "Updated Comment"

def test_delete_comment(client):
    client.post("/api/comments/1", json={"content": "Delete Me"})
    response = client.delete("/api/comments/1")
    assert response.get_json()["message"] == "Comment deleted"
