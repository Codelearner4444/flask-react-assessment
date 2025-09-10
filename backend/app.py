from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
from models import db
from routes import task_bp, comment_bp
import os

# Set static folder (for production frontend build if needed)
app = Flask(__name__, static_folder="../frontend/dist", static_url_path="/")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
CORS(app)

with app.app_context():
    db.create_all()

# Register API routes
app.register_blueprint(task_bp, url_prefix="/api/tasks")
app.register_blueprint(comment_bp, url_prefix="/api/comments")

# ✅ NEW: Homepage route
@app.route("/")
def home():
    return jsonify({"message": "Backend is running! Go to /api/tasks/ to use the API."})

# ✅ (Optional) If you want Flask to serve frontend build
@app.route("/<path:path>")
def serve_frontend(path):
    if os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(debug=True)
